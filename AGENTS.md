# AGENTS.md

Guidance for AI coding agents working in this repository. Follow this file before making changes.

## Project Overview

- **lite-piano** is a mini piano sound library built on the JavaScript Web Audio API. It decodes 7 base64-encoded base tones (C through B at octave 4) and shifts `playbackRate` to cover the full 88-key piano range.
- Plain JavaScript (ES6+), no framework. Bundled with webpack 4 + Babel (`@babel/preset-env`).
- The library is exposed as a browser global, `window.LitePiano` (see the last line of `src/index.js`). Consumers script-tag the bundle; there is no npm package publishing flow.

## Repository Layout

| Path | Purpose |
| --- | --- |
| `src/index.js` | The `LitePiano` class — the entire public API: `resume()`, `initAllSound()`, `play(name, rate)`, `oneShot(step, octave, alter)`, `keyboard`. |
| `src/data/data.js` | `SOUND_MAP`: ~2.9 MB of base64 audio data. **Do not read this file into context or edit it by hand** — treat it as a binary asset. |
| `src/data/piano-keyboard.js` | Descriptor array for the standard 88 keys. |
| `demo/` | Demo pages (`demo.html`, `ui-demo.html`, `music-demo.html`, `m-music-demo.html`), demo JS (`demojs/ui.js` piano UI, `demojs/util.js` MusicXML → play-params parser), sample MusicXML scores. |
| `dist/` | Build output, **committed to git intentionally** — consumers load `dist/index.js` directly. |

## Commands

- `npm install` — install dependencies.
- `npm run start` — webpack-dev-server at `http://127.0.0.1:9090`, serving `demo/`. Demo pages load `/index.js`, `/ui.js`, `/util.js` from the dev server's in-memory build (webpack `publicPath: '/'`).
- `npm run build` — bundle `src/index.js` + demo entries into `dist/`.
- `npm test` — **no test suite exists**; the script exits 1. Do not claim test coverage. Verify behavior manually in a browser via the demo pages.

## Requirement Specs (superpowers-spec)

This repo vendors a converted subset of [obra/superpowers](https://github.com/obra/superpowers) as its requirement-spec toolchain: plugin root `superpowers-spec/`, exposed to the agent host via the `.qoder/skills` symlink.

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
- Pitch model: 7 recorded tones shifted by `PITCH_RATE` per octave; `alter === 1` multiplies the rate by 1.06. The E♯→F and B♯→C(next octave) handling in `oneShot` is intentional — preserve it.
- iOS/Safari suspend the `AudioContext` until a user gesture; `resume()` encapsulates that unlock. Demo and usage flows must keep calling `resume()` before playing.
- Web Audio API only — IE is explicitly unsupported; do not add IE-oriented shims.

## Verification

After changes, run `npm run build` and load a demo page (e.g. `http://127.0.0.1:9090/demo.html`) to confirm keys render and sound plays. If running in a headless environment where audio cannot be verified, say so explicitly instead of claiming success.

## Git

- Commit messages are short, lowercase, and descriptive (see history, e.g. `add babel to solve compatible error`).
- Never commit `node_modules/`. `dist/` *is* committed on purpose (see above).
