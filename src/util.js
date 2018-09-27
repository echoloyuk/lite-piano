import convert from 'xml-js';

export function xmlToJson(xml, option) {
  const res = convert.xml2json(xml, {
    compact: true,
    ...option
  });
  return JSON.parse(res);
}

window.PianoUtil = {
  xmlToJson
};