import Piano from '../../src/index.js';

import './ui.css';

export default class PianoUI {
  constructor() {
    this.piano = new Piano();
    this.aniTimmer = {};
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
      console.log(step, octave, alter);
      self.playOneShot(step, octave, alter);
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
                id="${item.step}-${item.octave}-${item.alter}"
                data-step="${item.step}" 
                data-octave="${item.octave}" 
                data-alter="${item.alter}">
              </div></div>`;
    });
    html += '</div>';
    element.innerHTML = html;

    const onResize = () => {
      this.refreshAlterKey(element);
    }
    
    // resize to calculate black key to show.
    window.removeEventListener('resize', onResize);
    window.addEventListener('resize', onResize);

    this.refreshAlterKey(element);
  }

  playOneShot(step, octave, alter) {
    if (!step || !octave) {
      return;
    }
    const id = `${step}-${octave}-${alter ? 1 : 0}`;
    const keyDom = document.getElementById(id);
    if (!keyDom) {
      return;
    }

    keyDom.classList.add('playing');
    this.piano.oneShot(step, octave, alter);
    try {
      clearTimeout(this.aniTimmer[id]);
    } catch (e) {}
    this.aniTimmer[id] = setTimeout(() => {
      keyDom.classList.remove('playing');
    }, 300);
  }

  refreshAlterKey(element) {
    if (!element) {
      return;
    }
    const alterKeyWidth = element.offsetWidth / 86;
    const keys = element.querySelectorAll('.piano-key-outer.alter .piano-key');
    keys && keys.forEach(key => {
      key.style.width = alterKeyWidth + 'px';
    });
  }

  renderMusicObj(obj, panel) {
    let html = '<div class="music-demo-panel">';
      obj.forEach(item => {
        html += `<div class="music-item" data-played="${item.played}">${item.step} ${item.octave} ${item.timeStamp}</div>`;
      })
    html += '</div>';
  
    panel.innerHTML = html;
  }
  
  renderMusicObjTest(obj, panel) {
    let html = '<div class="music-test-panel">';
  
    obj.playingList.forEach((listItem, listIndex) => {
      html += `<div class="music-test-measure-panel" id="measure_${listIndex}">`;
      html += `<div class="music-test-measure-title">No.${listIndex + 1} measure.</div>`;
      html += `<div class="music-test-measure" data-index="${listIndex}">`;
      Object.keys(listItem).forEach(staffItemName => {
        html += '<div class="music-test-staff">';
        listItem[staffItemName].forEach(noteItem => {
          html += `<div class="music-test-note" id="note_${noteItem.uid}">`;
          html += `${noteItem.step} ${noteItem.octave} ${noteItem.alter} ${noteItem.timeStamp}`
          html += '</div>'
        })
        html += '</div>';
      })
      html += '</div>';
      html += '</div>';
    });
  
    html += '</div>'
  
    panel.innerHTML = html;
  }
}

window.PianoUI = PianoUI;