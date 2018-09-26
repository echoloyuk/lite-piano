# Lite-piano

A mini piano component based on the JavaScript Web Audio API, for playing the basic tone of a piano using the Audio Context in a web app.

## How to install

### Use source

Download the source code, put `/dist/index.js` where you need it, and load the contents of `/dist/index.js` directly onto the page.

### Use for localhost

- `git clone`
- `cd lite-piano`
- `npm install`
- `npm run start` start webpack-dev-server。
- Open the browser `127.0.0.1:8080/demo/index.html`

## How to use

You should load index.js into your page. After loading, the constructor will be mounted to the `window` global variable. So you can use it as follows:

```
const LitePiano = window.LitePiano;
const piano = new LitePiano();
piano.resume().then(() => {
  piano.initAllSound(); // load all basic on shot sound.
}).then(() => {
  document.getElementById('button').addEventListener('click', () => {
    piano.oneShot('C', 4, 0); // play a DO pitch.
  });
});
```

## Attributes & Functions

### `resume()`

This method returns a Promise. On the IOS, the audio contexts are automatically suspended, requiring the user to manually trigger an event to unlock. Therefore, after executing this function, the logic implementation after the user interaction is unlocked can be directly concerned.

```
piano.resume().then(() => {
  // you can do something after user interact. and the web audio api is ok.
});
```

### `initAllSound()`

This function returns a Promise. Since the loading and processing of the 7 basic scales is asynchronous, you need to perform this method to ensure that the tones on all pianos are played correctly.

```
piano.initAllSound().then(() => {
  // all sound is inited, now you can play it.
});
```

### `oneShot(step, octave, alter)`

This function returns an audio source object. This function will play a pitch sound.
Step indicates the tone name, respectively: C, D, E, F, G, A, B. 
Octave represents octave, the standard piano key C has an octave of 4, a maximum of 8, and a minimum of 0. 
When alter is 1, it indicates an upgrade, for example: C#, F#, etc. The up tone is the black key on the piano.

```
piano.oneShot('C', 4, 0);
```

## Compatibility

It is not compatible for IE series, due to using JavaScript Web Audio API to implement. Sorry to see that.

- Chrome: up to 49
- FireFox: up to 61
- Edge: 17
- Safari: 11.1
- iOS Safari: up to 10.3
- Chrome for Android: up to 69

