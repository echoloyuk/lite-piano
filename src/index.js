import SOUND_MAP from './data/data';
import { decode } from 'base64-arraybuffer';
import keyboard from './data/piano-keyboard';

// pitch rate in each octave. standard rate level is in 4 
const PITCH_RATE = [0.0625, 0.125, 0.25, 0.5, 1, 2, 4, 8, 16];

export default class LitePiano {
  constructor() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const context = new AudioContext();
    
    this.context = context;
    this.bufferList = [];
    this._origin = SOUND_MAP;
    this.keyboard = keyboard.keyborad;
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
    const context = this.context;
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
   * Load all pitch data into the buffer.
   */
  initAllSound() {
    const context = this.context;
    const _origin = this._origin;
    const todoList = [];
    Object.keys(_origin).forEach(name => {
      todoList.push(new Promise((resolve, reject) => {
        const ab = decode(_origin[name]);
        context.decodeAudioData(ab, (buffer) => {
          this.bufferList.push({
            name,
            buffer
          });
          console.log(`${name} has finished`);
          resolve();
        }, err => {
          reject(err);
        });
      }));
    });
    return Promise.all(todoList);
  }

  /**
   * Play a pitch sound.
   * @param {string} name The tone name. eg. C, D, E, F, G, A, B 
   * @param {number} rate The octave of each tone is adjusted according to the value of rate.
   */
  play(name, rate = 1) {
    if (!name) {
      return;
    }
    const source = this.context.createBufferSource();
    const dest = this.bufferList.find(item => item.name === name);
    if (!dest) {
      return;
    }
    source.buffer = dest.buffer;
    source.playbackRate.value = rate
    source.connect(this.context.destination);
    source.start(this.context.currentTime);
    source.stop(this.context.currentTime + 3);
    return source;
  }

  /**
   * Play a tone through tone name, octave and alter.
   * eg: oneShot('D', 4) is the basic tone re (C). 4 is octave. 
   * Basic tone is 4. lower octave is 3, 2, 1. Higher is 5, 6, 7
   * @param {string} step 
   * @param {number} octave 
   * @param {number} alter 
   */
  oneShot(step, octave = 4, alter = 1) {
    if (!step) {
      return;
    }
    step = step.toUpperCase();
    if (alter === 1) {
      if (step === 'E') {
        step = 'F';
        alter = 0;
      }
      if (step === 'B') {
        step = 'C';
        alter = 0;
        octave += 1;
      }
    }
    console.log(step, octave, alter);
    return this.play(step, PITCH_RATE[octave]*(alter ? 1.06 : 1));
  }
}

window.LitePiano = LitePiano;
