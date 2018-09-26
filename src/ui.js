import Piano from './index';

import './ui.css';

export default class PianoUI {
  constructor() {
    this.piano = new Piano();
  }

  initPiano() {
    return new Promise((resolve, reject) => {
      this.piano.resume().then(() => {
        return this.piano.initAllSound();
      }).then(() => {
        resolve(this.piano);
      }).catch(() => {
        reject();
      });
    });
  }

  bindDomEvent(element) {
    const self = this;
    element.addEventListener('click', e => {
      if (!e || !e.target) {
        return;
      }
      const step = e.target.getAttribute('data-step');
      const octave = parseInt(e.target.getAttribute('data-octave'));
      const alter = parseInt(e.target.getAttribute('data-alter'));
      self.piano.oneShot(step, octave, alter);
    });
  }

  render(element) {
    if (!element) {
      return;
    }
    const keyboard = this.piano.keyboard;
    let html = '<div class="lite-piano-ui-container">';
    keyboard.forEach(item => {
      html += `<div class="piano-key-outer ${item.alter ? 'alter' : ''}">`
      html += `<div class="piano-key"
                data-step="${item.step}" 
                data-octave="${item.octave}" 
                data-alter="${item.alter}">
                  ${item.step}
              </div></div>`;
    });
    html += '</div>';
    element.innerHTML = html;
  }
}

window.PianoUI = PianoUI;