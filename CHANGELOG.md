# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2026-10-20

### Added

- Every one of the 88 keys now plays its own real sample (the FluidR3_GM acoustic grand piano soundfont, CC BY 3.0), fetched from a configurable CDN via the `cdnBaseUrl` option — no more pitch shifting from 7 embedded base64 tones.
- `load()` with a loading state machine: `status`, `progress`, and the `onStatusChange` callback.
- Sustain pedal API: `pedalDown()` / `pedalUp()`. A note whose `duration` ends while the pedal is down keeps sounding for up to 10 seconds from note-on, following its own decay curve; `pedalUp()` releases all held notes together.
- Natural sustain model: each sample's decay rate (dB/s) is measured per note. Long notes loop a de-tilted copy of the sustain region seamlessly while a gain envelope re-applies the measured decay, so notes ring on and die at their natural speed. Notes whose real sustain is too short to loop simply die out.
- `oneShot(step, octave, alter, duration?)`: `alter` accepts `-1` (flat) in addition to `1` (sharp); the optional `duration` is the note's lifetime — short values cut the sample with a smooth fade, giving staccato.
- `resume()` encapsulates the iOS/Safari AudioContext unlock after a user gesture.
- UMD build output (`dist/index.js`, `window.LitePiano`) and npm packaging with ESM/CJS entry points.
- `scripts/publish.js` release flow with `--dry-run` and `beta` modes.
- Demo pages: `ui-demo.html` (clickable 88-key UI with sustain-pedal and staccato toggles), `music-demo.html` / `m-music-demo.html` (MusicXML autoplay), `demo.html` (minimal).
- Node test suite (`npm test`) covering sustain analysis and the voice/pedal envelopes.

### Changed

- **BREAKING**: `initAllSound()` renamed to `load()`; observe it via `status` / `progress` / `onStatusChange`.
- **BREAKING**: `play(name, rate)` removed — use `oneShot(step, octave, alter, duration?)`.
- Audio data is no longer embedded in the bundle as base64; first load requires network access to the sample CDN.
- String `alter` values (e.g. `'1'`) are now parsed correctly; 1.x compared with `=== 1` and silently treated them as natural.

### Fixed

- Pedal extension no longer swaps the audio source mid-playback — sustained notes loop from note-on and only the gain envelope and stop time move, removing the audible stitch when the pedal caught a note-off.
- Pedal-held notes can never be pushed past the point where their decay becomes inaudible.

## [0.1.0]

- Initial release: 7 base64-encoded base tones (C4–B4) pitch-shifted across the 88-key range via `playbackRate`.
