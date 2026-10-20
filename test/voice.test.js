import { test } from 'node:test';
import assert from 'node:assert';
import LitePiano from '../src/index.js';

function mockParam() {
  return {
    value: 1,
    events: [],
    cancelScheduledValues(t) { this.events.push(['cancel', t]); },
    setValueAtTime(v, t) { this.events.push(['set', v, t]); },
    exponentialRampToValueAtTime(v, t) { this.events.push(['exp', v, t]); },
    linearRampToValueAtTime(v, t) { this.events.push(['lin', v, t]); }
  };
}

function mockContext() {
  return {
    currentTime: 0,
    destination: {},
    createBuffer(channels, length, sampleRate) {
      return { numberOfChannels: channels, length, sampleRate, getChannelData: () => new Float32Array(length) };
    },
    createBufferSource() {
      return {
        buffer: null, loop: false, loopStart: 0, loopEnd: 0,
        startArgs: null, stops: [], onended: null,
        connect() {},
        start(...a) { this.startArgs = a; },
        stop(t) { this.stops.push(t); }
      };
    },
    createGain() {
      return { gain: mockParam(), connect() {} };
    }
  };
}

function fakeVoice(piano, context, seconds) {
  const source = context.createBufferSource();
  const gain = context.createGain();
  return { name: 'C4', startedAt: 0, seconds, source, gain, timer: null, released: false };
}

const ANALYSIS = { peakTime: 0.05, audibleEnd: 2.0, decayDbPerSec: 10, loopStart: 0.8, loopEnd: 1.95, sustaining: true };

test('pedal extension keeps the same source and only re-aims the envelope', () => {
  const piano = new LitePiano();
  const context = mockContext();
  piano.context = context;
  const buffer = context.createBuffer(1, 1000, 8000);
  piano._loopVoiceData = () => ({ analysis: ANALYSIS, buffer });

  context.currentTime = 0.45; // caught before loopStart (0.8)
  const voice = fakeVoice(piano, context, 0.5);
  const source = voice.source;
  piano._extendVoice(voice);

  assert.equal(voice.source, source); // no mid-playback swap
  assert.deepEqual(source.startArgs, null); // never restarted
  // gain stays flat until loopStart, then decays at the measured rate
  const events = voice.gain.gain.events;
  assert.deepEqual(events[0], ['cancel', 0.45]);
  assert.deepEqual(events[1], ['set', 1, 0.45]);
  assert.deepEqual(events[2], ['set', 1, 0.8]);
  assert.equal(events[3][0], 'exp');
  assert.ok(Math.abs(events[3][2] - 6.8) < 1e-9); // decayEnd = inaudibleAt = 0.8 + 60/10
  assert.deepEqual(source.stops, [6.8 + 0.02]);
});

test('pedal extension past loopStart re-anchors at the natural level', () => {
  const piano = new LitePiano();
  const context = mockContext();
  piano.context = context;
  const buffer = context.createBuffer(1, 1000, 8000);
  piano._loopVoiceData = () => ({ analysis: ANALYSIS, buffer });

  context.currentTime = 2.0; // past loopStart (0.8), decay already under way
  const voice = fakeVoice(piano, context, 0.5);
  piano._extendVoice(voice);

  const events = voice.gain.gain.events;
  assert.deepEqual(events[0], ['cancel', 2.0]);
  assert.equal(events[1][0], 'set');
  assert.equal(events[1][2], 2.0);
  // natural level at 2s elapsed: 10^(-10 * (2.0 - 0.8) / 20)
  assert.ok(Math.abs(events[1][1] - Math.pow(10, -0.6)) < 1e-9);
  assert.equal(events[2][0], 'exp'); // straight into the decay ramp, no flat re-anchor
  assert.ok(Math.abs(events[2][1] - 0.001) < 1e-9); // -60 dB at inaudibleAt
  assert.ok(Math.abs(events[2][2] - 6.8) < 1e-9);
});

test('note-off timer never pushes a loop voice past its inaudible stop', () => {
  const piano = new LitePiano();
  const context = mockContext();
  piano.context = context;
  piano.status = 'ready';
  const raw = { duration: 3.13, numberOfChannels: 1, length: 25040, sampleRate: 8000, getChannelData: () => new Float32Array(25040) };
  piano._buffers.C4 = raw;
  piano._sustainInfo.C4 = ANALYSIS;
  piano._loopBuffers.C4 = raw;

  const originalSetTimeout = global.setTimeout;
  let timerFn = null;
  global.setTimeout = (fn) => { timerFn = fn; return 0; };
  let source;
  try {
    source = piano.oneShot('C', 4, 0, 30); // endAt=30, inaudibleAt=6.8
  } finally {
    global.setTimeout = originalSetTimeout;
  }
  assert.deepEqual(source.stops, [6.8 + 0.02]);

  context.currentTime = 29.95;
  timerFn(); // pedal up: must not re-stop later than the inaudible stop
  assert.deepEqual(source.stops, [6.8 + 0.02]);
});
