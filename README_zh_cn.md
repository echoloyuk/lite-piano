# Lite-piano

基于 JavaScript Web Audio API 编写的迷你钢琴组件，用于在 Web App 中播放真实的钢琴琴键声音。

2.0 起，88 个琴键各自播放独立的真实采样（音源为 [FluidR3_GM](https://musical-artifacts.com/artifacts/794) 三角钢琴音色库，[CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) 许可），通过 CDN 加载，不再从少量基础音变调。同时新增延音踏板 API 与加载状态机。

这里有一个[在线 Demo](https://www.himachi.cn/demo/lite-piano/index.html)。Demo 页面引入了一份《卡农 D 大调》的 [musicXML](https://en.wikipedia.org/wiki/MusicXML) 乐谱，解析成 lite-piano 可识别的参数并自动演奏。

## 如何安装

### script 标签直接引入

把 `/dist/index.js`（UMD 包）加载到页面中，构造函数会挂载到 `window.LitePiano`。

### npm / 构建工具（React、Vue 等）

```
npm install lite-piano
```

```js
import LitePiano from 'lite-piano'; // ESM
// 或：const LitePiano = require('lite-piano'); // CommonJS
```

Node.js 服务端（SSR）可以安全 import 本包——构造函数不触碰任何浏览器 API——但服务端没有 Web Audio API，无法发声。

### 本地运行

- `git clone`
- `cd lite-piano`
- `npm install`
- `npm run start` 启动本地服务器。
- 访问 `127.0.0.1:9090/demo/index.html` 即可

## 如何使用

```js
const piano = new LitePiano(); // 默认从内置 CDN 加载采样

piano.onStatusChange = (status) => {
  // 'idle' | 'loading' | 'ready' | 'error'
  console.log(status, piano.progress.loaded, '/', piano.progress.total);
};

piano.resume() // 在用户手势中调用，解锁 AudioContext（iOS 必需）
  .then(() => piano.load()) // 拉取并解码全部 88 个采样
  .then(() => {
    piano.oneShot('C', 4, 0); // 播放中央 C
  });
```

也可以自建采样托管：`new LitePiano({ cdnBaseUrl: 'https://your.cdn/piano' })`，要求能以 `<cdnBaseUrl>/<音名>.mp3`（如 `C4.mp3`、`Db4.mp3`）访问，且已配置 CORS。

## 常用属性 & 方法

| API | 说明 |
| --- | --- |
| `resume()` | 返回 Promise。解锁 AudioContext，请在用户手势中、播放之前调用。 |
| `load()` | 返回 Promise。加载全部 88 个采样；`error` 后可再次调用重试。 |
| `oneShot(step, octave, alter, duration?)` | 播放一个琴键，返回 audio source 对象。`step`：`C`–`B`；`octave`：0–8；`alter`：`1` 升半音、`-1` 降半音、`0` 本音——`oneShot('C', 4, 1)` 与 `oneShot('D', 4, -1)` 是同一个键（Db4），对齐五线谱升降记号。可选 `duration`（秒）：到点止音；不传则采样自然衰减。 |
| `pedalDown()` / `pedalUp()` | 延音踏板。踩下期间，`duration` 到点的音符继续延留；抬起时统一止音。幂等，任意状态下调用都安全。 |
| `status` | `'idle' \| 'loading' \| 'ready' \| 'error'`。 |
| `progress` | `{ loaded, total }`，`total` 为 88。 |
| `onStatusChange` | 赋值回调 `(status) => {}` 观察加载状态变化。 |

```js
piano.oneShot('C', 4, 0);          // 中央 C，自然衰减
piano.oneShot('F', 3, 1, 1.5);     // F#3，1.5 秒后止音
piano.pedalDown();
piano.oneShot('G', 4, 0, 0.5);     // 0.5 秒后仍延留
piano.pedalUp();                   // 此刻统一止音
```

## 从 1.x 迁移

- `initAllSound()` → `load()`，并可用 `status` / `progress` / `onStatusChange` 观察加载。
- `play(name, rate)` 已移除——请使用 `oneShot(step, octave, alter, duration?)`。
- `alter` 新增 `-1`（降号），与 `1`（升号）对齐五线谱记法；`0` 仍为本音。
- 字符串形式的 `alter`（如 `'1'`）现在会被正确解析；1.x 用 `=== 1` 比较，字符串会被静默当作本音。
- 音频不再以 base64 内嵌；采样走 CDN 加载，首次使用需要网络。

## 维护者：发布

```
node scripts/publish.js --dry-run   # 演练正式版发布流程（不真正发布）
node scripts/publish.js beta        # 发布 beta 版（x.y.z-beta.N，npm dist-tag beta）
node scripts/publish.js             # 按 package.json 中的版本号发布正式版
```

发布前脚本会依次检查 npm 登录态、音名自测脚本与完整构建。

## 兼容性

由于使用原生的 JavaScript Web Audio API，因此不兼容 IE 系列浏览器，十分抱歉。

- Chrome: up to 49
- FireFox: up to 61
- Edge: 17
- Safari: 11.1
- iOS Safari: up to 10.3
- Chrome for Android: up to 69
