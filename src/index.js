import keyboard from './data/piano-keyboard.js';
import { toNoteName, NOTES } from './note-name.js';

const DEFAULT_CDN_URL = 'https://mac-blog.oss-cn-beijing.aliyuncs.com/lite-piano/fluidr3';
const LOAD_CONCURRENCY = 6;
const RELEASE_SECONDS = 0.08;

export default class LitePiano {
  constructor(options = {}) {
    this.cdnBaseUrl = (options.cdnBaseUrl || DEFAULT_CDN_URL).replace(/\/+$/, '');
    this.context = null;
    this.keyboard = keyboard.keyborad;
    this.status = 'idle';
    this.progress = { loaded: 0, total: NOTES.length };
    this.onStatusChange = null;
    this._buffers = {};
    this._voices = new Map();
    this._sustained = new Set();
    this._pedalDown = false;
    this._loadPromise = null;
  }

  _ensureContext() {
    if (!this.context) {
      const AudioContext = typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext);
      if (!AudioContext) {
        throw new Error('LitePiano: Web Audio API is not supported in this environment');
      }
      this.context = new AudioContext();
    }
    return this.context;
  }

  _setStatus(status) {
    this.status = status;
    if (typeof this.onStatusChange === 'function') {
      this.onStatusChange(status);
    }
  }

  /**
   * For Note:
   * > On iOS, the Web Audio API requires sounds to be triggered from an explicit user action, such as a tap.
   * > Calling noteOn() from an onload event will not play sound.
   * in https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/PlayingandSynthesizingSounds/PlayingandSynthesizingSounds.html#//apple_ref/doc/uid/TP40009523-CH6-SW1
   *
   * The function encapsulates the automatic processing of the state in which the sound context of the unlocked ios is suspended by user interaction.
   *
   * Returns the Promise object, if executed on the IOS, then resolve will be executed after the user clicks the screen to unlock the audio context.
   */
  resume() {
    const context = this._ensureContext();
    return new Promise((resolve, reject) => {
      if (context.state === 'suspended' && 'ontouchstart' in window) {
        const unlock = () => {
          context.resume().then(() => {
            document.body.removeEventListener('touchstart', unlock);
            document.body.removeEventListener('touchend', unlock);
            resolve();
          }).catch(e => {
            reject(e);
          })
        }
        document.body.addEventListener('touchstart', unlock, false);
        document.body.addEventListener('touchend', unlock, false);
      } else {
        resolve();
      }
    });
  }

  /**
   * Fetch and decode all 88 note samples from the CDN. Idempotent: safe to
   * call repeatedly; after an 'error' it only refetches the missing notes.
   */
  load() {
    if (this._loadPromise) {
      return this._loadPromise;
    }
    const context = this._ensureContext();
    this._setStatus('loading');
    const todo = NOTES.filter(name => !this._buffers[name]);
    const failed = [];
    let cursor = 0;

    const loadOne = (name, retried) => {
      return fetch(`${this.cdnBaseUrl}/${name}.mp3`)
        .then(res => {
          if (!res.ok) {
            throw new Error(`http ${res.status}`);
          }
          return res.arrayBuffer();
        })
        .then(ab => new Promise((resolve, reject) => {
          context.decodeAudioData(ab, resolve, reject);
        }))
        .then(buffer => {
          this._buffers[name] = buffer;
          this.progress.loaded += 1;
        })
        .catch(err => {
          if (!retried) {
            return loadOne(name, true);
          }
          failed.push(name);
          console.warn(`lite-piano: failed to load ${name}`, err);
        });
    };

    const worker = () => {
      if (cursor >= todo.length) {
        return Promise.resolve();
      }
      const name = todo[cursor++];
      return loadOne(name, false).then(worker);
    };

    const workers = [];
    for (let i = 0; i < Math.min(LOAD_CONCURRENCY, todo.length); i++) {
      workers.push(worker());
    }

    this._loadPromise = Promise.all(workers).then(() => {
      if (failed.length) {
        this._setStatus('error');
        this._loadPromise = null;
        throw new Error(`LitePiano: failed to load notes: ${failed.join(', ')}`);
      }
      this._setStatus('ready');
    });
    return this._loadPromise;
  }

  _releaseVoice(voice) {
    if (!voice || voice.released) {
      return;
    }
    voice.released = true;
    if (voice.timer) {
      clearTimeout(voice.timer);
      voice.timer = null;
    }
    this._sustained.delete(voice);
    const t = this._ensureContext().currentTime;
    voice.gain.gain.setValueAtTime(voice.gain.gain.value, t);
    voice.gain.gain.linearRampToValueAtTime(0, t + RELEASE_SECONDS);
    try {
      voice.source.stop(t + RELEASE_SECONDS + 0.01);
    } catch (e) {}
    if (this._voices.get(voice.name) === voice) {
      this._voices.delete(voice.name);
    }
  }

  /**
   * Play a tone through tone name, octave and alter.
   * eg: oneShot('D', 4) plays D4; oneShot('C', 4, 1) plays C#4 (same as oneShot('D', 4, -1)).
   * @param {string} step C D E F G A B
   * @param {number} octave 0..8
   * @param {number} alter 1 = sharp, 0 = natural, -1 = flat
   * @param {number} duration seconds; omitted = ring to natural decay
   */
  oneShot(step, octave, alter = 0, duration) {
    if (this.status !== 'ready') {
      console.warn('lite-piano: sounds are not loaded yet, call load() first');
      return null;
    }
    const name = toNoteName(step, octave, alter);
    if (!name) {
      return null;
    }
    const context = this._ensureContext();
    const old = this._voices.get(name);
    if (old) {
      this._releaseVoice(old);
    }

    const source = context.createBufferSource();
    const gain = context.createGain();
    source.buffer = this._buffers[name];
    source.connect(gain);
    gain.connect(context.destination);

    const voice = { name, source, gain, timer: null, released: false };
    this._voices.set(name, voice);
    source.onended = () => {
      this._sustained.delete(voice);
      if (this._voices.get(name) === voice) {
        this._voices.delete(name);
      }
    };
    source.start(context.currentTime);

    if (duration !== undefined && duration !== null) {
      const seconds = Math.max(0, Number(duration) || 0);
      const endAt = context.currentTime + seconds;
      gain.gain.setValueAtTime(1, endAt);
      gain.gain.linearRampToValueAtTime(0, endAt + RELEASE_SECONDS);
      voice.timer = setTimeout(() => {
        voice.timer = null;
        if (this._pedalDown) {
          gain.gain.cancelScheduledValues(0);
          gain.gain.setValueAtTime(1, this._ensureContext().currentTime);
          this._sustained.add(voice);
        } else {
          this._releaseVoice(voice);
        }
      }, seconds * 1000 + 100);
    }
    return source;
  }

  /**
   * Sustain pedal down. Note-offs arriving while the pedal is down are
   * deferred until pedalUp(). Idempotent.
   */
  pedalDown() {
    this._pedalDown = true;
  }

  /**
   * Sustain pedal up. Releases every voice the pedal was holding. Idempotent.
   */
  pedalUp() {
    this._pedalDown = false;
    this._sustained.forEach(voice => this._releaseVoice(voice));
    this._sustained.clear();
  }
}

if (typeof window !== 'undefined') {
  window.LitePiano = LitePiano;
}
