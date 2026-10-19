import { test } from 'node:test';
import assert from 'node:assert';
import { analyzeSustain } from '../src/sustain.js';

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
