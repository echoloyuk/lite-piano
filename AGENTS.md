# AGENTS.md

Guidance for AI coding agents working in this repository. Follow this file before making changes.

## Project Overview

- **lite-piano** is a mini piano sound library built on the JavaScript Web Audio API. Each of the 88 keys plays its own real sample (FluidR3_GM acoustic grand, CC BY 3.0), fetched from a CDN at load time.
- Plain JavaScript (ES6+), no framework. Bundled with webpack 4 + Babel (`@babel/preset-env`) into a UMD build (`dist/index.js`, `library: 'LitePiano'`).
- The library is exposed as a browser global, `window.LitePiano` (see the last line of `src/index.js`), and published to npm (`main: dist/index.js`, `module: src/index.js`).
- Sustain model: each sample's decay rate (dB/s) is measured at runtime (`src/sustain.js`); long notes loop a de-tilted copy of the sustain region seamlessly while a gain envelope re-applies the measured decay. The sustain pedal never swaps the audio source — it only re-aims the envelope and the stop time.

## Repository Layout

| Path | Purpose |
| --- | --- |
| `src/index.js` | The `LitePiano` class — the entire public API: `resume()`, `load()`, `oneShot(step, octave, alter, duration?)`, `pedalDown()`, `pedalUp()`, plus `status` / `progress` / `onStatusChange` / `keyboard`. |
| `src/note-name.js` | `toNoteName(step, octave, alter)` → sample file name (e.g. `Db4`), and `NOTES` — the 88 note names to load. |
| `src/sustain.js` | Sustain analysis and loop building: `analyzeSustain`, `buildLoopChannels`, `naturalGainAt`, `inaudibleAfter`. |
| `src/data/piano-keyboard.js` | Descriptor array for the standard 88 keys. |
| `demo/` | Demo pages (`demo.html`, `ui-demo.html`, `music-demo.html`, `m-music-demo.html`), demo JS (`demojs/ui.js` piano UI, `demojs/util.js` MusicXML → play-params parser), sample MusicXML scores. |
| `dist/` | Build output, **committed to git intentionally** — consumers load `dist/index.js` directly. |
| `test/` | Node test suite (`node --test`): `sustain.test.js`, `voice.test.js`. |
| `scripts/` | `publish.js` (npm release flow with `--dry-run` / `beta`), `check-note-names.mjs`, `dev-sound-server.js`. |

## Commands

- `npm install` — install dependencies.
- `npm run start` — webpack-dev-server at `http://127.0.0.1:9090`, serving `demo/`. Demo pages load `/index.js`, `/ui.js`, `/util.js` from the dev server's in-memory build (webpack `publicPath: '/'`).
- `npm run build` — bundle `src/index.js` + demo entries into `dist/`.
- `npm test` — run the Node test suite (no browser needed; Web Audio is mocked).
- `node scripts/publish.js --dry-run` — validate the npm release flow without publishing.

## Requirement Specs (superpowers-spec)

This repo vendors a converted subset of [obra/superpowers](https://github.com/obra/superpowers) as its requirement-spec toolchain: plugin root `superpowers-spec/`, exposed to the agent host via the `.qoder/skills` symlink (`.qoder/` is git-ignored; after a fresh clone, recreate it with `ln -s ../superpowers-spec/skills .qoder/skills`).

1. **`brainstorming`** — MUST run before any creative work (new features, behavior changes, new plans). Clarify the real requirement through questions first. Output: design doc at `docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md`.
2. **`writing-plans`** — once a spec/design exists, break it into a bite-sized implementation plan. Output: `docs/superpowers/plans/YYYY-MM-DD-<feature-name>.md`.
3. **`executing-plans`** — execute a written plan task by task in the current session.

Rules:

- Do not jump into implementation of a new feature without the brainstorming → spec step.
- Skill references to `superpowers:*` skills not vendored here (TDD, systematic-debugging, finishing-a-development-branch, etc.) are unavailable in this repo — continue with the general flow instead.
- Commit spec docs, plan docs, and the code they describe together in the same change.

## Conventions & Invariants

- Code style: ES modules, 2-space indentation, single quotes, semicolons. Match the existing files.
- `keyboard.keyborad` is a **public typo** — demos and docs depend on the misspelled key. Do not "fix" the spelling without an explicit API-breaking decision.
- Keep the `window.LitePiano = LitePiano;` global assignment in `src/index.js`; it is the consumption contract.
- **`dist/` is committed**: when changing `src/`, run `npm run build` and include the updated `dist/` files in the same change.
- Sustain invariants: sustaining notes play the de-tilted loop buffer with `loop=true` from note-on; the gain envelope reproduces the raw decay (de-tilt × re-tilt), so short notes sound identical to the raw sample. Never swap a playing voice's source mid-playback. A voice's stop time must never move past its inaudible point.
- The E♯→F and B♯→C(next octave) handling in `oneShot` is intentional — preserve it.
- iOS/Safari suspend the `AudioContext` until a user gesture; `resume()` encapsulates that unlock. Demo and usage flows must keep calling `resume()` before playing.
- Web Audio API only — IE is explicitly unsupported; do not add IE-oriented shims.

## Verification

After changes, run `npm test` and `npm run build`, then load a demo page (e.g. `http://127.0.0.1:9090/ui-demo.html`) to confirm keys render and sound plays. If running in a headless environment where audio cannot be verified, say so explicitly instead of claiming success.

## Git

- Commit messages are short, lowercase, and descriptive (see history, e.g. `add babel to solve compatible error`).
- Never commit `node_modules/`. `dist/` *is* committed on purpose (see above).
