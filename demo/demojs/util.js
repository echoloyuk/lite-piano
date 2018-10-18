import convert from 'xml-js';

export function xmlToJson(xml, option) {
  const res = convert.xml2json(xml, {
    compact: true,
    ...option
  });
  return JSON.parse(res);
}

export function getPlayingObject(sourceObj) {
  if (!sourceObj) {
    return;
  }
  const result = {
    playingList: []
  };

  // get division
  const division = parseInt(sourceObj['score-partwise']['part']['measure'][0]['attributes']['divisions']._text);

  // get all notes
  const measures = sourceObj['score-partwise']['part']['measure'];
  measures.forEach(measureItem => {
    const currMeasure = {};
    if (!measureItem.note) {
      return;
    }
    measureItem.note.forEach(noteItem => {
      let staffName = 'default';
      if (noteItem.staff) {
        staffName = noteItem.staff._text;
      }
      if (!currMeasure[staffName]) {
        currMeasure[staffName] = [];
      }
      currMeasure[staffName].push({
        step: noteItem.pitch.step._text,
        octave: noteItem.pitch.octave._text,
        alter: (noteItem.pitch.alter && noteItem.pitch.alter._text) || '0',
        duration: noteItem.duration._text,
        stay: parseInt(noteItem.duration._text) / division,
        chord: noteItem.chord ? true : false
      });
    });
    result.playingList.push(currMeasure);
  });

  return result;
}

export function dealPlayingTimeObject(sourceObj, quaterTime) {
  sourceObj.playingList.forEach(listItem => {
    Object.keys(listItem).forEach(staffName => {
      const curStaffList = listItem[staffName];
      let time = 0;
      curStaffList.forEach(note => {
        note.timeStamp = time;
        note.played = false;
        time += quaterTime * note.stay;
      });
    });
  });

  return sourceObj;
}

export function getPlayingTimeObject(sourceObj, quaterTime) {
  const result = [];
  let totalTime = 0;
  let uid = 0;
  sourceObj.playingList.forEach((listItem, listIndex) => {
    let listTime = totalTime;
    Object.keys(listItem).forEach(staffName => {
      const curStaffList = listItem[staffName];
      let time = totalTime;
      let oldTime = time;
      curStaffList.forEach(note => {
        if (note.chord) {
          note.timeStamp = oldTime;
        } else {
          note.timeStamp = time;
        }
        note.played = false;
        note.uid = uid;
        uid++;

        result.push({
          step: note.step,
          octave: note.octave,
          alter: note.alter,
          timeStamp: note.timeStamp,
          played: false,
          uid: note.uid,
          measureNumber: listIndex
        });
        if (!note.chord) {
          oldTime = time;
          time += quaterTime * note.stay;
        }
        if (time > listTime) {
          listTime = time;
        }
        
      });
    });
    totalTime = listTime;
  });

  return result;
}

window.PianoUtil = {
  xmlToJson,
  getPlayingObject,
  dealPlayingTimeObject,
  getPlayingTimeObject
};