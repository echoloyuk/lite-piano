import { test } from 'node:test';
import assert from 'node:assert';
import { analyzeSustain, buildLoopChannels } from '../src/sustain.js';

const SR = 8000;

function makeBuffer(channels) {
  return {
    numberOfChannels: channels.length,
    length: channels[0].length,
    sampleRate: SR,
    getChannelData(i) {
      return channels[i];
    }
  };
}

function decayingSine(rate) {
  const n = 3 * SR;
  const out = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    out[i] = Math.sin(2 * Math.PI * 220 * t) * Math.pow(10, -rate * t / 20);
  }
  return out;
}

function attackThenDecay(attack, rate) {
  const n = 3 * SR;
  const out = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const env = t < attack ? t / attack : Math.pow(10, -rate * (t - attack) / 20);
    out[i] = Math.sin(2 * Math.PI * 220 * t) * env;
  }
  return out;
}

test('measures a steady 10 dB/s decay', () => {
  const a = analyzeSustain(makeBuffer([decayingSine(10)]));
  assert.ok(a.decayDbPerSec > 9 && a.decayDbPerSec < 11);
  assert.equal(a.sustaining, true);
  assert.ok(Math.abs(a.audibleEnd - 3.0) < 0.06);
  assert.ok(Math.abs(a.loopStart - 1.8) < 0.06);   // audibleEnd - 1.2
  assert.ok(Math.abs(a.loopEnd - 2.95) < 0.06);    // audibleEnd - 0.05
});

test('classifies a fast-dying note as non-sustaining', () => {
  // 100 dB/s：约 0.55s 处跌破 (peak - 55 dB)，不足 0.8s 延音下限
  const a = analyzeSustain(makeBuffer([decayingSine(100)]));
  assert.equal(a.sustaining, false);
});

test('finds the attack peak after a 0.1s ramp', () => {
  // 0.1s 线性起音，然后 10 dB/s 衰减
  const a = analyzeSustain(makeBuffer([attackThenDecay(0.1, 10)]));
  assert.ok(a.peakTime >= 0.075 && a.peakTime <= 0.15);
});

test('processes channels independently of count', () => {
  const a = analyzeSustain(makeBuffer([decayingSine(10), decayingSine(10).map(v => v * 0.5)]));
  assert.equal(a.sustaining, true);
  assert.ok(a.decayDbPerSec > 9 && a.decayDbPerSec < 11);
});

function rmsDb(arr, from, to) {
  let s = 0;
  const a = Math.floor(from);
  const b = Math.floor(to);
  for (let i = a; i < b; i++) {
    s += arr[i] * arr[i];
  }
  return 20 * Math.log10(Math.max(Math.sqrt(s / (b - a)), 1e-9));
}

test('loop window is level-stationary after de-tilt', () => {
  const buf = makeBuffer([decayingSine(10)]);
  const a = analyzeSustain(buf);
  const out = buildLoopChannels(buf, a)[0];
  const sr = buf.sampleRate;
  const head = rmsDb(out, a.loopStart * sr, a.loopStart * sr + 0.05 * sr);
  const tail = rmsDb(out, (a.loopEnd - 0.15) * sr, (a.loopEnd - 0.1) * sr); // 接缝之前
  assert.ok(Math.abs(head - tail) < 1.0);
});

test('wrap is click-free: seam level matches loop start', () => {
  const buf = makeBuffer([decayingSine(10)]);
  const a = analyzeSustain(buf);
  const out = buildLoopChannels(buf, a)[0];
  const sr = buf.sampleRate;
  const seamEnd = rmsDb(out, (a.loopEnd - 0.01) * sr, a.loopEnd * sr);
  const wrapIn = rmsDb(out, a.loopStart * sr, (a.loopStart + 0.01) * sr);
  assert.ok(Math.abs(seamEnd - wrapIn) < 1.5);
  assert.ok(out.every(Number.isFinite));
});

test('regions outside window and seam are untouched', () => {
  const buf = makeBuffer([decayingSine(10)]);
  const a = analyzeSustain(buf);
  const src = buf.getChannelData(0);
  const out = buildLoopChannels(buf, a)[0];
  const sr = buf.sampleRate;
  for (let i = 0; i < Math.floor(0.5 * sr); i++) assert.equal(out[i], src[i]);
  assert.notEqual(out, src);
});
