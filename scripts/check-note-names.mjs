import assert from 'assert/strict';
import { toNoteName, NOTES } from '../src/note-name.js';

const cases = [
  ['C', 4, 1, 'Db4'],
  ['D', 4, -1, 'Db4'],
  ['E', 4, 1, 'F4'],
  ['B', 3, 1, 'C4'],
  ['C', 4, -1, 'B3'],
  ['F', 4, -1, 'E4'],
  ['c', 4, '1', 'Db4'],
  ['A', 0, 0, 'A0'],
  ['C', 8, 0, 'C8'],
  ['C', 4, 2, null],
  ['B', 7, 1, 'C8'],
  ['C', 8, 1, null],
  ['H', 4, 0, null]
];

let failed = 0;
cases.forEach(([step, octave, alter, expected]) => {
  try {
    assert.equal(toNoteName(step, octave, alter), expected);
    console.log(`ok   toNoteName(${step}, ${octave}, ${alter}) === ${expected}`);
  } catch (e) {
    failed++;
    console.error(`FAIL toNoteName(${step}, ${octave}, ${alter}): expected ${expected}, got ${e.actual}`);
  }
});

try {
  assert.equal(NOTES.length, 88);
  assert.equal(NOTES[0], 'A0');
  assert.equal(NOTES[87], 'C8');
  console.log('ok   NOTES: 88 notes, A0..C8');
} catch (e) {
  failed++;
  console.error(`FAIL NOTES: ${e.message}`);
}

if (failed) {
  console.error(`${failed} case(s) failed`);
  process.exit(1);
}
console.log('all cases passed');
