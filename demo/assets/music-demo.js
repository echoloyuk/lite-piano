function renderMusicObj(obj, panel) {
  let html = '<div class="music-demo-panel">';
    obj.forEach(item => {
      html += `<div class="music-item" data-played="${item.played}">${item.step} ${item.octave} ${item.timeStamp}</div>`;
    })
  html += '</div>';

  panel.innerHTML = html;
}

function renderMusicObjTest(obj, panel) {
  let html = '<div class="music-test-panel">';

  obj.playingList.forEach((listItem, listIndex) => {
    html += `<div class="music-test-measure" data-index="${listIndex}">`;
    Object.keys(listItem).forEach(staffItemName => {
      html += '<div class="music-test-staff">';
      listItem[staffItemName].forEach(noteItem => {
        html += `<div class="music-test-note">`;
        html += `${noteItem.step} ${noteItem.octave} ${noteItem.alter} ${noteItem.timeStamp}`
        html += '</div>'
      })
      html += '</div>';
    })
    html += '</div>';
  });

  html += '</div>'

  panel.innerHTML = html;
}