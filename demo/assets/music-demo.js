function renderMusicObj(obj, panel) {
  let html = '<div class="music-demo-panel">';
    obj.forEach(item => {
      html += `<div class="music-item" data-played="${item.played}">${item.step} ${item.octave} ${item.timeStamp}</div>`;
    })
  html += '</div>';

  panel.innerHTML = html;
}