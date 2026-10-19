const WINDOW_SECONDS = 0.05;
const ATTACK_FIT_DELAY = 0.3;
const AUDIBLE_DROP_DB = 55;
const AUDIBLE_FLOOR_DBFS = -78;
const MIN_SUSTAIN_SECONDS = 0.8;
const MIN_LOOP_SECONDS = 0.4;
const ATTACK_SETTLE = 0.15;
const LOOP_TARGET_SECONDS = 1.2;
const LOOP_END_MARGIN = 0.05;
const MIN_DB_PER_SEC = 0.5;
const MAX_DB_PER_SEC = 60;

const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);

/**
 * Measure a decoded sample's sustain envelope.
 * buffer: { numberOfChannels, length, sampleRate, getChannelData(ch) }.
 * Returns times in seconds: { peakTime, audibleEnd, decayDbPerSec,
 * loopStart, loopEnd, sustaining }.
 */
export function analyzeSustain(buffer) {
  const { numberOfChannels, length, sampleRate } = buffer;
  const win = Math.max(1, Math.floor(WINDOW_SECONDS * sampleRate));
  const count = Math.floor(length / win);
  const levelDb = new Float64Array(count);

  for (let w = 0; w < count; w++) {
    let sum = 0;
    const from = w * win;
    for (let ch = 0; ch < numberOfChannels; ch++) {
      const data = buffer.getChannelData(ch);
      for (let i = from; i < from + win; i++) {
        sum += data[i] * data[i];
      }
    }
    const rms = Math.sqrt(sum / (win * numberOfChannels));
    levelDb[w] = 20 * Math.log10(Math.max(rms, 1e-9));
  }

  let peak = 0;
  for (let w = 1; w < count; w++) {
    if (levelDb[w] > levelDb[peak]) {
      peak = w;
    }
  }
  const peakTime = (peak + 0.5) * WINDOW_SECONDS;
  const peakDb = levelDb[peak];

  const threshold = Math.max(peakDb - AUDIBLE_DROP_DB, AUDIBLE_FLOOR_DBFS);
  let last = count - 1;
  while (last > peak && levelDb[last] <= threshold) {
    last--;
  }
  const audibleEnd = Math.min((last + 1) * WINDOW_SECONDS, length / sampleRate);

  // least-squares fit of level vs time over the settled decay region
  const t0 = peakTime + ATTACK_FIT_DELAY;
  let n = 0, sx = 0, sy = 0, sxx = 0, sxy = 0;
  for (let w = 0; w <= last; w++) {
    const t = (w + 0.5) * WINDOW_SECONDS;
    if (t < t0) {
      continue;
    }
    n++;
    sx += t;
    sy += levelDb[w];
    sxx += t * t;
    sxy += t * levelDb[w];
  }
  let decayDbPerSec = MIN_DB_PER_SEC;
  if (n >= 2) {
    const denom = n * sxx - sx * sx;
    if (denom > 0) {
      const slope = (n * sxy - sx * sy) / denom;
      decayDbPerSec = clamp(-slope, MIN_DB_PER_SEC, MAX_DB_PER_SEC);
    }
  }

  const loopStart = Math.max(peakTime + ATTACK_SETTLE, audibleEnd - LOOP_TARGET_SECONDS);
  const loopEnd = audibleEnd - LOOP_END_MARGIN;
  const sustaining = (audibleEnd - peakTime >= MIN_SUSTAIN_SECONDS)
    && (loopEnd - loopStart >= MIN_LOOP_SECONDS);

  return { peakTime, audibleEnd, decayDbPerSec, loopStart, loopEnd, sustaining };
}
