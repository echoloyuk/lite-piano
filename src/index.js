import SOUND_MAP from './data/data';
import { decode } from 'base64-arraybuffer';

class LitePiano {
  constructor() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const context = new AudioContext();
    
    this.context = context;
    this.bufferList = [];
    this._origin = SOUND_MAP;
  }

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
  }
}

window.LitePiano = LitePiano;