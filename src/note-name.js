const PC = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
const NAMES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

// 88 keys range in absolute semitones: A0 = 9, C8 = 96
const MIN_ABS = 9;
const MAX_ABS = 96;

/**
 * Map (step, octave, alter) to a sample file note name like 'Db4'.
 * alter: 1 = sharp, 0 = natural, -1 = flat (aligned with MusicXML).
 * Returns null (and warns) for unsupported input.
 */
export function toNoteName(step, octave, alter = 0) {
  const s = String(step).toUpperCase();
  const oct = parseInt(octave, 10);
  const alt = alter === undefined || alter === null ? 0 : parseInt(alter, 10);

  if (!Object.prototype.hasOwnProperty.call(PC, s) || isNaN(oct) || isNaN(alt) || Math.abs(alt) > 1) {
    console.warn(`lite-piano: unsupported note ${step} ${octave} ${alter}`);
    return null;
  }

  let semitone = PC[s] + alt;
  let o = oct;
  if (semitone < 0) {
    semitone += 12;
    o -= 1;
  } else if (semitone > 11) {
    semitone -= 12;
    o += 1;
  }

  const abs = o * 12 + semitone;
  if (abs < MIN_ABS || abs > MAX_ABS) {
    console.warn(`lite-piano: note out of 88-key range ${step} ${octave} ${alter}`);
    return null;
  }
  return NAMES[semitone] + o;
}

// A0..C8 ascending, flat names
export const NOTES = [];
for (let abs = MIN_ABS; abs <= MAX_ABS; abs++) {
  NOTES.push(NAMES[abs % 12] + Math.floor(abs / 12));
}
