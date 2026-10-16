# Lite-piano

A mini piano component based on the JavaScript Web Audio API, for playing real piano key sounds in a web app.

Since 2.0, every one of the 88 keys plays its own real sample (the [FluidR3_GM](https://musical-artifacts.com/artifacts/794) acoustic grand piano soundfont, [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/)) loaded from a CDN — no more pitch shifting from a handful of base tones. 2.0 also adds a sustain pedal API and a loading state machine.

This is a [Demo](https://www.himachi.cn/demo/lite-piano/index.html), which introduces a [musicXML](https://en.wikipedia.org/wiki/MusicXML) score of "Canon D Major" and parses it into lite-piano recognizable parameters to play automatically.

See Readme with [中文版](./README_zh_cn.md)

![](http://oq4op0hf5.bkt.clouddn.com/20181010193120.png)

## How to install

### Script tag

Load `/dist/index.js` (a UMD bundle) into your page. The constructor mounts to `window.LitePiano`.

### npm / bundler (React, Vue, ...)

```
npm install lite-piano
```

```js
import LitePiano from 'lite-piano'; // ESM
// or: const LitePiano = require('lite-piano'); // CommonJS
```

Node.js (SSR) can import the package safely — the constructor does not touch any browser API — but no sound can play there, since Web Audio API does not exist on the server.

### Use for localhost

- `git clone`
- `cd lite-piano`
- `npm install`
- `npm run start` start webpack-dev-server.
- Open the browser `127.0.0.1:9090/demo/index.html`

## How to use

```js
const piano = new LitePiano(); // samples load from the built-in CDN by default

piano.onStatusChange = (status) => {
  // 'idle' | 'loading' | 'ready' | 'error'
  console.log(status, piano.progress.loaded, '/', piano.progress.total);
};

piano.resume() // unlock the AudioContext after a user gesture (required on iOS)
  .then(() => piano.load()) // fetch & decode all 88 samples
  .then(() => {
    piano.oneShot('C', 4, 0); // play middle C
  });
```

Use your own sample host if you prefer: `new LitePiano({ cdnBaseUrl: 'https://your.cdn/piano' })` — it must serve `<cdnBaseUrl>/<NoteName>.mp3` (e.g. `C4.mp3`, `Db4.mp3`) with CORS enabled.

## Attributes & Functions

| API | Description |
| --- | --- |
| `resume()` | Returns a Promise. Unlocks the AudioContext; call it from a user gesture before playing. |
| `load()` | Returns a Promise. Loads all 88 samples; safe to call again to retry after an `error`. |
| `oneShot(step, octave, alter, duration?)` | Plays a key and returns the audio source. `step`: `C`–`B`. `octave`: 0–8. `alter`: `1` sharp, `-1` flat, `0` natural — `oneShot('C', 4, 1)` and `oneShot('D', 4, -1)` are the same key (Db4). Optional `duration` (seconds): the note is stopped after it elapses; omit it to let the sample decay naturally. |
| `pedalDown()` / `pedalUp()` | Sustain pedal. While down, notes whose `duration` ends keep sounding; `pedalUp()` releases them together. Idempotent and safe in any status. |
| `status` | `'idle' \| 'loading' \| 'ready' \| 'error'`. |
| `progress` | `{ loaded, total }` — `total` is 88. |
| `onStatusChange` | Assign a callback `(status) => {}` to watch loading state. |

```js
piano.oneShot('C', 4, 0);          // middle C, natural decay
piano.oneShot('F', 3, 1, 1.5);     // F#3, stopped after 1.5s
piano.pedalDown();
piano.oneShot('G', 4, 0, 0.5);     // still sustained after 0.5s
piano.pedalUp();                   // released now
```

## Migrating from 1.x

- `initAllSound()` → `load()`, with `status` / `progress` / `onStatusChange` to observe it.
- `play(name, rate)` is removed — use `oneShot(step, octave, alter, duration?)`.
- `alter` now accepts `-1` (flat) in addition to `1` (sharp), aligning with staff notation. `0` stays natural.
- String `alter` values (e.g. `'1'`) are now parsed correctly; 1.x compared with `=== 1` and silently treated them as natural.
- Audio data is no longer embedded as base64; samples are fetched from a CDN, so first load needs network.

## For maintainers: publishing

```
node scripts/publish.js --dry-run   # check the stable release flow without publishing
node scripts/publish.js beta        # publish a beta (x.y.z-beta.N, npm dist-tag beta)
node scripts/publish.js             # publish the stable version in package.json
```

The script checks npm login, runs the note-name self-check and a full build before publishing.

## Compatibility

It is not compatible for IE series, due to using JavaScript Web Audio API to implement. Sorry to see that.

- Chrome: up to 49
- FireFox: up to 61
- Edge: 17
- Safari: 11.1
- iOS Safari: up to 10.3
- Chrome for Android: up to 69
