# lite-piano 2.0 设计稿

日期：2026-10-16
状态：待评审

## 背景与动机

lite-piano 1.x 用 7 个 base64 内嵌的 WAV（第 4 八度白键音）加 `playbackRate` 变速覆盖 88 键。问题：离第 4 八度越远音质越假；base64 让 bundle 膨胀约 3MB；单一采样无力度与泛音差异。

2.0 改为**逐音直连真实采样**：88 键每个音都有独立采样文件，通过 CDN 按需 URL 加载，不再内嵌、不再变速。

## 已确认的决策（来自需求方）

| 决策点 | 结论 |
| --- | --- |
| 音源 | FluidR3_GM（初选中音色试听的 MusyngKite，因许可宽松度改用 FluidR3_GM），88 个 mp3，共约 2MB |
| 版本 | 升级为 2.0.0，允许破坏性 API 变更 |
| 发音模型 | 每个音直连对应采样文件，彻底移除 `playbackRate` 变音逻辑 |
| 延音踏板 | 真实生效的 API：`pedalDown()` / `pedalUp()`。自动播放（MusicXML）与交互演奏（UI 绑定）两个场景共用这一对核心 API，UI 绑定代码写在 demo 层 |
| 音符时值 | `oneShot` 增加第 4 个可选参数 `duration`（秒），引入"音符结束"语义，踏板才有意义 |
| 升降记号 | `alter` 对齐五线谱/MusicXML 语义：`1`=升号、`0`=还原、`-1`=降号，C# 与 Db 均可表达同一音 |
| 音源存储 | 不再 base64 内嵌，全部放 CDN；`src/data/data.js`（2.9MB）删除 |
| 加载策略 | 默认全量预加载：`load()` 返回 Promise，全部 88 个音解码完成后进入 ready |
| 模块化 | 产物改 UMD，支持 script 标签、React/Vue 打包项目（npm 或 git 依赖）两种消费方式；Node 端做到 SSR 安全（import 不抛错，发声仍仅限浏览器） |
| 状态机 | 暴露加载状态，表明当前是否可用（见下文） |
| CDN 上传 | 使用 `ali-oss-upload` 技能上传到阿里云 OSS，bucket 与 CDN 域名在执行阶段由需求方提供 |

## 许可

FluidR3_GM 为 **CC BY 3.0**（仅需署名，无 Share-Alike）。README 中署名音源名称、作者与许可链接即可。备选过的 MusyngKite 与 FatBoy 均为 CC BY-SA 3.0，为许可宽松度放弃。

## 目标 / 非目标 / 反目标

**目标**
- 88 键每个音都发真实采样音高
- 延音踏板语义正确：踩下时到点音符继续响，抬起时统一止音
- 加载进度与就绪状态对使用者透明可查
- demo 页可在浏览器验证全部新能力

**非目标**
- 力度分层（velocity layers）：MusyngKite 该渲染版每音只有一个采样，不做多力度
- MusicXML 踏板记号解析：现有三份乐谱（cannonD_all / happybirthday / littlestar）均无 pedal 标记，util.js 的踏板解析不纳入本期（我的决定）
- npm 发布流程（维持现状：script 标签引 dist）

**反目标**
- 破坏 `window.LitePiano` 全局挂载、`resume()` 解锁流程、`keyboard.keyborad` 公开字段（含拼写）
- 引入框架依赖或重型音频库

## API 设计（2.0 全貌）

### 构造

```js
const piano = new LitePiano({
  cdnBaseUrl: 'https://<自定义CDN地址>/lite-piano/fluidr3'  // 可选
});
```

- `cdnBaseUrl` 有**默认值**：音源上传 OSS 后，把实际上传地址写死在代码里作为兜底；只有想自托管音源时才需要显式传入。
- 音源 URL 规则：`${cdnBaseUrl}/${noteName}.mp3`，noteName 与音源文件名一致（降号命名，如 `Db4`）。

### 状态机

- `piano.status`：`'idle' | 'loading' | 'ready' | 'error'`，构造后为 `'idle'`
- `piano.progress`：`{ loaded: number, total: 88 }`
- `piano.onStatusChange(status)`：赋值即注册回调，状态每次迁移时调用
- `load()`：开始加载全部 88 音（并发 fetch + decodeAudioData，并发数约 6–8），返回 Promise；全部成功 → `'ready'` 并 resolve；任一失败 → `'error'` 并 reject（附失败音清单）
- `'ready'` 之前调用发声：忽略并 `console.warn`（我的决定）

### 发声

```js
piano.oneShot(step, octave, alter, duration?)
```

- `step`/`octave` 语义与 1.x 相同
- `alter` 重新设计，对齐五线谱/MusicXML 语义：`1`=升号、`0`=还原、`-1`=降号；内部统一 `parseInt`，兼容字符串入参（1.x 的 util.js 传的是字符串，旧版 `alter === 1` 严格判断实际从未命中，2.0 顺带修正，写入迁移说明）
- 升号映射：C#→Db、D#→Eb、F#→Gb、G#→Ab、A#→Bb；E#→F；B#→C 且 octave+1（沿用 1.x 规则）
- 降号映射：Db/Eb/Gb/Ab/Bb 直接对应同名文件；Cb→B 且 octave-1；Fb→E
- 即 `oneShot('C',4,1)` 与 `oneShot('D',4,-1)` 指向同一文件 `Db4.mp3`
- `alter` 为 ±2（重升/重降）：不支持，warn 并忽略（我的决定）
- 映射结果超出 A0–C8 范围：warn 并忽略
- `duration` 不传：音符响到采样自然衰减结束（**移除** 1.x 的 3 秒强停）
- `duration` 传入：在 `currentTime + duration` 处做快速 release（增益 80ms 线性渐出后 stop）
- 到点止音时若踏板踩下：不止音，该发声体进入延音集合；`pedalUp()` 时对集合内所有发声体统一做快速 release
- 同一音重复触发：旧发声体立即快速 release 后再发新音（防叠音浑浊）
- 每个发声体 = BufferSource + GainNode（release 用）；返回值保持 1.x 惯例，返回 source 节点
- 实现细节：`play(name, rate)` 公开方法删除，内部改为按 noteName 直取 buffer

### 踏板

```js
piano.pedalDown();  // 幂等
piano.pedalUp();    // 幂等；抬起时释放延音集合
```

### 其余公开面

- `resume()`：不变
- `keyboard`（`keyborad` 数组）：不变
- `initAllSound()`：**删除**，由 `load()` 替代（2.0 破坏性变更，README 写迁移说明）

## 模块化与运行环境

现状：`dist/index.js` 仅靠 `window.LitePiano = LitePiano` 全局挂载，`package.json` 的 `main` 指向不存在的文件，构建工具与 Node 均无法消费。

2.0 目标矩阵：

| 环境 | 支持程度 |
| --- | --- |
| 原生 HTML（script 标签引 dist） | 完整支持，UMD wrapper 自动挂 `window.LitePiano`（消费契约不变） |
| 带构建的前端（React/Vue + webpack/vite/rollup） | 完整支持，`import LitePiano from 'lite-piano'` |
| Node 服务端 | 不能发声（Web Audio API 是浏览器能力，fetch 在 Node 18+ 有但不是瓶颈）；做到 **SSR 安全**：`import`/构造不抛错，真正发声调用时抛语义明确的错误 |

实现要点：

- webpack：`dist/index.js` 以 UMD 输出（`libraryTarget: 'umd'`，`globalObject` 用兼容 Node 的写法）；demo 的 ui/util 产物形态不限
- `package.json`：`main` → `dist/index.js`，`module` → `src/index.js`（源码即 ES module，bundler 直接打包），补 `files` 字段；version → 2.0.0
- `src/index.js`：`window` 赋值加环境守卫；`AudioContext` 惰性创建（首次 `resume()`/`load()`/发声时），无 Web Audio 环境抛清晰错误
- 安装途径：`dist/` 本来就提交在 git，不发 npm 也能以 git URL 依赖；**支持 npm 发布**：提供 `scripts/publish.js` 发布脚本（beta / 正式两种模式），实际发版由维护者手动执行该脚本完成（需求方决定）

## 工程改动范围

- `src/index.js`：按上述 API 重写
- `src/data/data.js`：删除；`base64-arraybuffer` 依赖从 package.json 移除
- `src/data/piano-keyboard.js`：不动
- `demo/demojs/ui.js`：适配新 API；新增踏板交互（空格键 keydown/keyup 绑定 `pedalDown/pedalUp`，附屏幕踏板按钮供触屏用）
- `demo/demojs/util.js`：仅把已解析的 `stay` 字段透传到扁平播放对象（一行），不解析踏板记号
- 各 demo html：加载状态提示（进度条或百分比）
- `README.md` / `README_zh_cn.md`：2.0 用法、迁移说明、FluidR3_GM 署名
- `webpack.config.js`：UMD 输出配置
- `package.json`：version → 2.0.0，补 `main`/`module`/`files`，移除 `base64-arraybuffer` 依赖
- `dist/`：构建后随同一变更提交（仓库约定）
- 音源 mp3 不进 git；`soundfont-audition/` 上传到 CDN 并验证后删除（我的决定），上传前本地验证可用本地静态服务充当 cdnBaseUrl

## 约束与不变量（沿用 AGENTS.md）

- ES modules、2 空格缩进、单引号、分号
- `window.LitePiano = LitePiano` 保留
- `dist/` 提交
- iOS/Safari 需 `resume()` 解锁；demo 流程保持先 resume 后 load
- 不支持 IE，不加 shim

## 执行顺序（已与需求方确认）

1. 先用 `ali-oss-upload` 把 88 个 mp3 上传到 OSS（endpoint `oss-cn-beijing.aliyuncs.com`，bucket `mac-blog`）。**OSS 必须配置 CORS 响应头**，否则浏览器跨域 fetch 会被拦截；bucket 需允许公共读。
2. 验证公网 URL 可访问后，把真实地址作为**默认 `cdnBaseUrl`** 写进代码、写进 README，构建 `dist/`，一次性提交（不做占位符提交）。

## 留给实现者的判断

- 并发加载的具体并发数、失败重试次数
- release 渐出的具体曲线与时长（目标 60–100ms 内无爆音）
- demo 页面加载进度的具体样式

## 验证方案

仓库无测试套件（`npm test` 为空跑），本期不引入测试框架，验收以 demo 页浏览器实测 + Node 冒烟检查组合进行（我的决定）。音名映射做成纯函数，不依赖 AudioContext，可用 Node 直接验证。

| 能力 | 验收方式 | 通过标准 |
| --- | --- | --- |
| CDN 音源可用 | 上传后 `curl -I` 抽查若干音 URL；带 `Origin` 头验证 CORS 响应头 | 200 且有 `access-control-allow-origin` |
| 加载与状态机 | demo 页观察状态与进度 | idle→loading→ready 迁移正确，进度 0→88；故意配错 cdnBaseUrl 进入 error |
| 逐音真实发声 | demo 键盘点击 A0、C4、C8、黑键等试听 | 音高正确，无变速失真 |
| alter 升降映射 | Node 直接调映射纯函数跑用例 | C#4 与 Db4 同指 Db4；E#→F、B#→C+1、Cb→B-1、Fb→E；±2 与超范围 warn 忽略 |
| duration 时值 | demo 页实测 | 传 duration 到点快速止音；不传则自然衰减完毕，无 3 秒强停 |
| 延音踏板 | demo 页实测（空格键/按钮） | pedalDown 期间到点音符继续响；pedalUp 统一止音；重复触发同音不浑浊 |
| UMD / script 标签 | `npm run build` 后 demo 页正常 | window.LitePiano 可用 |
| UMD / CommonJS | `node -e "require('./dist/index.js')"` | 不抛错（SSR 安全） |
| ESM 源码 | Node 以 ESM 方式 import `src/index.js` | 不抛错（SSR 安全） |
| dist 提交 | 构建产物与源码同一次变更提交 | 符合仓库约定 |

每项能力在实施计划中对应任务的尾部逐项执行；浏览器实测若受环境限制无法听音，明确说明而不是声称成功。
