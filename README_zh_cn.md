# Lite-piano

基于JavaScript Web Audio API编写的迷你钢琴组件，该组件用于在Web APP中使用Audio Context播放钢琴的基本琴键的声音。

当然这只是一个基础库，你可以使用它来做很多上层应用。这里补充一个[在线Demo](https://www.himachi.cn/demo/lite-piano/index.html)。Demo页面引入了一个《卡农D大调》的[musicXML](https://en.wikipedia.org/wiki/MusicXML)乐谱，并解析成lite-piano可识别的参数，再使用setTimeout将它演奏出来。（Demo示例没有做更深入的网络优化，可能需要大约3.5M网络流量来加载音频和乐谱，请耐心等待加载完毕后点击Play）

## How to install

### 直接使用源码

下载源代码，将`/dist/index.js`放到你需要的地方，直接加载`/dist/index.js`中的内容到页面上即可。

### 本地运行

- `git clone`
- `cd lite-piano`
- `npm install`
- `npm run start` 启动本地服务器。
- 访问`127.0.0.1:9090/demo/index.html`即可

## How to use

首先，加载index.js到您的页面上，加载完毕后，构造函数会挂载到`window`全局变量上。于是你可以按照如下方法使用：

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

## 常用属性&方法

### `resume()`

该方法返回一个Promise对象，在IOS上，所有的声音上下文被自动挂起，需要用户手动触发事件才能解锁。因此执行该方法后，可以直接关注用户解锁后的逻辑实现。

```
piano.resume().then(() => {
  // you can do something after user interact. and the web audio api is ok.
});
```

### `initAllSound()`

该方法返回一个Promise对象，由于7个基础音阶的加载和处理是异步的，因此，您需要执行该方法来保证所有钢琴上的音调都可以正确播放。

```
piano.initAllSound().then(() => {
  // all sound is inited, now you can play it.
});
```

### `oneShot(step, octave, alter)`

该方法返回一个audio source对象。播放一个按键的声音，step表示音调名，分别有：C, D, E, F, G, A, B。octave表示八度，标准的钢琴键C的octave为4，最大为8，最小为0。alter为1时，表示升调，例如：C#, F#等。升调就是钢琴上的黑键。

```
piano.oneShot('C', 4, 0);
```

## 兼容性

由于使用原生的JavaScript Web Audio API, 因此不兼容IE系列浏览器，十分抱歉

- Chrome: up to 49
- FireFox: up to 61
- Edge: 17
- Safari: 11.1
- iOS Safari: up to 10.3
- Chrome for Android: up to 69
