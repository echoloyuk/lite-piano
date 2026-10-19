import keyboard from './data/piano-keyboard.js';
import { toNoteName, NOTES } from './note-name.js';
import { analyzeSustain, buildLoopChannels, naturalGainAt, inaudibleAfter } from './sustain.js';

const DEFAULT_CDN_URL = 'https://mac-blog.oss-cn-beijing.aliyuncs.com/lite-piano/fluidr3';
const LOAD_CONCURRENCY = 6;
const RELEASE_SECONDS = 0.3;
const MIN_FADE_SECONDS = 0.05;
const MIN_NOTE_SECONDS = 0.1;
const MIN_DECAY_SECONDS = 0.3;
const SUSTAIN_SECONDS = 10;
const LOOP_START_RATIO = 0.45;
const LOOP_END_RATIO = 0.95;
const LOOP_BLEND_SECONDS = 0.08;
const SWAP_SECONDS = 0.06;
const DECIDE_BEFORE_END_SECONDS = 0.05;
const LN_AUDIBLE = Math.log(1000);

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
    this._sustainInfo = {};
    this._loopBuffers = {};
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

  /**
   * Lazily analyze a note's sustain envelope and build its processed loop
   * buffer on first long-duration use; both are cached per note. Returns
   * null for dead-type notes whose real sustain dies inside the sample.
   */
  _loopVoiceData(name) {
    if (!(name in this._sustainInfo)) {
      this._sustainInfo[name] = analyzeSustain(this._buffers[name]);
    }
    const analysis = this._sustainInfo[name];
    if (!analysis.sustaining) {
      return null;
    }
    if (!this._loopBuffers[name]) {
      const raw = this._buffers[name];
      const context = this._ensureContext();
      const buffer = context.createBuffer(raw.numberOfChannels, raw.length, raw.sampleRate);
      buildLoopChannels(raw, analysis).forEach((data, ch) => {
        buffer.getChannelData(ch).set(data);
      });
      this._loopBuffers[name] = buffer;
    }
    return { analysis, buffer: this._loopBuffers[name] };
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
    voice.gain.gain.cancelScheduledValues(t);
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
   * @param {number} duration seconds the note lasts. Shorter than the sample =
   * cut with a smooth fade (staccato); longer = the de-tilted sustain region
   * loops seamlessly while the note's measured decay rate carries it toward
   * silence (high notes whose real sustain is short simply die naturally).
   * Pedal down at note-off extends it to SUSTAIN_SECONDS.
   * Omitted = ring to natural decay.
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
    if (duration === undefined || duration === null) {
      source.buffer = this._buffers[name];
    } else {
      const seconds = Math.max(Number(duration) || 0, MIN_NOTE_SECONDS);
      const startedAt = context.currentTime;
      const natural = this._buffers[name].duration;
      const endAt = startedAt + seconds;
      voice.startedAt = startedAt;
      voice.seconds = seconds;
      voice.natural = natural;

      if (seconds > 0.9 * natural) {
        const data = this._loopVoiceData(name);
        if (data && seconds > data.analysis.audibleEnd) {
          // longer than the note really sustains: loop the de-tilted sustain
          // region while the gain envelope keeps the measured decay rate
          const analysis = data.analysis;
          source.buffer = data.buffer;
          source.loop = true;
          source.loopStart = analysis.loopStart;
          source.loopEnd = analysis.loopEnd;
          const inaudibleAt = startedAt + inaudibleAfter(analysis);
          const decayEnd = Math.min(endAt, inaudibleAt);
          gain.gain.setValueAtTime(1, startedAt + analysis.loopStart);
          gain.gain.exponentialRampToValueAtTime(
            Math.max(naturalGainAt(analysis, decayEnd - startedAt), 0.001), decayEnd);
          if (endAt < inaudibleAt) {
            voice.fade = RELEASE_SECONDS;
            gain.gain.linearRampToValueAtTime(0, endAt + RELEASE_SECONDS);
          }
          try {
            source.stop(Math.min(endAt + RELEASE_SECONDS, inaudibleAt) + 0.02);
          } catch (e) {}
        } else if (seconds < natural) {
          // ends inside the audible region: raw sample + fade at note-off
          source.buffer = this._buffers[name];
          const fade = Math.min(RELEASE_SECONDS, Math.max(MIN_FADE_SECONDS, seconds / 2));
          voice.fade = fade;
          gain.gain.setValueAtTime(1, endAt);
          gain.gain.linearRampToValueAtTime(0, endAt + fade);
        } else {
          // dead-type note with a long duration: plays out and dies on its own
          source.buffer = this._buffers[name];
        }
      } else {
        // shorter than the sample: hold full level until note-off, then fade
        source.buffer = this._buffers[name];
        const fade = Math.min(RELEASE_SECONDS, Math.max(MIN_FADE_SECONDS, seconds / 2));
        voice.fade = fade;
        gain.gain.setValueAtTime(1, endAt);
        gain.gain.linearRampToValueAtTime(0, endAt + fade);
      }

      // decide slightly before the fade runs so a held pedal cancels it seamlessly
      voice.timer = setTimeout(() => {
        voice.timer = null;
        if (this._pedalDown) {
          this._extendVoice(voice);
          this._sustained.add(voice);
        } else {
          voice.released = true;
          try {
            voice.source.stop(endAt + (voice.fade || 0) + 0.02);
          } catch (e) {}
        }
      }, Math.max(0, seconds - DECIDE_BEFORE_END_SECONDS) * 1000);
    }

    source.start(context.currentTime);
    return source;
  }

  /**
   * Copy of the sample with an 80ms crossfade baked in just before
   * loopEnd, morphing the loop tail into the material right before
   * loopStart, so a [loopStart, loopEnd) loop wraps seamlessly.
   */
  _createSustainBuffer(buffer) {
    const context = this._ensureContext();
    const loopStart = Math.floor(buffer.length * LOOP_START_RATIO);
    const loopEnd = Math.floor(buffer.length * LOOP_END_RATIO);
    const blend = Math.min(Math.floor(buffer.sampleRate * LOOP_BLEND_SECONDS), loopStart);
    const out = context.createBuffer(buffer.numberOfChannels, buffer.length, buffer.sampleRate);
    for (let ch = 0; ch < buffer.numberOfChannels; ch++) {
      const data = buffer.getChannelData(ch);
      const target = out.getChannelData(ch);
      target.set(data);
      for (let i = 0; i < blend; i++) {
        const t = i / blend;
        const idx = loopEnd - blend + i;
        target[idx] = data[idx] * (1 - t) + data[loopStart - blend + i] * t;
      }
    }
    return out;
  }

  /**
   * A held pedal turns the note into a long one: keep it sounding for
   * SUSTAIN_SECONDS from note-on. Swaps to the seamless loop if the
   * voice is not looping yet, then re-shapes the decay to the new end.
   */
  _extendVoice(voice) {
    const context = this._ensureContext();
    const now = context.currentTime;
    const endAt = voice.startedAt + Math.max(voice.seconds, SUSTAIN_SECONDS);
    const remaining = Math.max(endAt - now, MIN_DECAY_SECONDS);

    if (!voice.source.loop) {
      const oldSource = voice.source;
      const oldGain = voice.gain;
      const source = context.createBufferSource();
      source.buffer = this._createSustainBuffer(oldSource.buffer);
      source.loop = true;
      source.loopStart = voice.natural * LOOP_START_RATIO;
      source.loopEnd = voice.natural * LOOP_END_RATIO;
      const gain = context.createGain();
      source.connect(gain);
      gain.connect(context.destination);
      source.onended = () => {
        this._sustained.delete(voice);
        if (this._voices.get(voice.name) === voice) {
          this._voices.delete(voice.name);
        }
      };
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(1, now + SWAP_SECONDS);
      oldGain.gain.cancelScheduledValues(now);
      oldGain.gain.setValueAtTime(1, now);
      oldGain.gain.linearRampToValueAtTime(0, now + SWAP_SECONDS);
      oldSource.onended = null;
      try {
        oldSource.stop(now + SWAP_SECONDS + 0.01);
      } catch (e) {}
      source.start(now, voice.natural * LOOP_START_RATIO);
      voice.source = source;
      voice.gain = gain;
      gain.gain.setTargetAtTime(0, now + SWAP_SECONDS, remaining / LN_AUDIBLE);
    } else {
      const param = voice.gain.gain;
      param.cancelScheduledValues(now);
      param.setValueAtTime(param.value, now);
      param.setTargetAtTime(0, now, remaining / LN_AUDIBLE);
    }
    try {
      voice.source.stop(endAt + 0.02);
    } catch (e) {}
  }

  /**
   * Sustain pedal down. Notes whose note-off arrives while the pedal is
   * down are held for SUSTAIN_SECONDS, or until pedalUp(). Idempotent.
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
