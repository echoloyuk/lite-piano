# 自然延音实现计划

> **致执行 agent：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 executing-plans 逐任务实现本计划。步骤用 checkbox（`- [ ]`）语法跟踪。

**目标：** 让长 duration 音符听起来自然：按音实测衰减、去倾斜无缝循环、短鸣高音真实消亡。

**架构：** 全部 DSP 数学放在新的纯模块 `src/sustain.js`（不依赖 Web Audio——操作 `{numberOfChannels, length, sampleRate, getChannelData}` 形状的 buffer-like），用 Node 内置 `node --test` 做单元测试。`src/index.js` 只保留音频图接线，调用纯模块。

**技术栈：** ES6 JavaScript、Web Audio API、Node 26 `node --test`（零新依赖）、webpack 4 构建。

**Spec：** `docs/superpowers/specs/2026-10-19-natural-sustain-design.md`

## 全局约束

- 纯 ES6，2 空格缩进，单引号，分号（仓库风格）。
- 公开 API 不变：`oneShot(step, octave, alter = 0, duration)`、`pedalDown()`、`pedalUp()`、`resume()`、`load()`；`window.LitePiano` 全局保留。
- 短音路径（`seconds ≤ 0.9 × natural`）、不传 duration 路径、断奏淡化行为：不变。
- 分析与处理后的循环缓冲按音懒构建、首次长音使用时构建并缓存。
- `dist/` 需要提交：最后一个任务跑 `npm run build` 并把 `dist/` 与源码一起提交。
- `npm test` 目前按设计退出码为 1；本计划把它替换为 `node --test`。

## Review Focus（评审重点关注）

1. **边界 duration**（`seconds` 恰好等于 `0.9 × natural` 或恰好等于 `audibleEnd`）：预期分支选择稳定、不崩溃、包络不叠加——Task 4 人工冒烟步骤覆盖。
2. **循环中的同音重复触发**：旧 voice 必须释放/停掉它的循环 source（走现有 `_releaseVoice` 路径）——Task 4 人工冒烟步骤覆盖。
3. **消亡型音符被 `pedalDown` 接住**：必须被延长逻辑忽略，音符仍在原 `endAt` 结束——Task 5 人工冒烟步骤覆盖。
4. **非完全一致立体声的通道形状**（两通道电平不同）：`buildLoopChannels` 必须独立处理每个通道——Task 2 单元测试覆盖。
5. **提前不可闻的停止**：快衰减音配超长 duration 时，source 必须在 `loopStart + 60/decayDbPerSec` 处停止，而不是 `endAt`——Task 3 单元测试（`inaudibleAfter`）+ Task 4 接线冒烟覆盖。

---

### Task 1: `analyzeSustain` —— 按音包络分析

**文件：**
- 新建：`src/sustain.js`
- 新建：`test/sustain.test.js`
- 修改：`package.json`（test 脚本）

**接口：**
- 消费：无。
- 产出：`analyzeSustain(buffer) -> { peakTime, audibleEnd, decayDbPerSec, loopStart, loopEnd, sustaining }`，其中 `buffer` 为 `{ numberOfChannels, length, sampleRate, getChannelData(ch) }`，时间单位均为秒，`decayDbPerSec` 为正数，`sustaining` 为布尔。后续任务完全依赖这组命名。

常量（模块内部，文件顶部）：`WINDOW_SECONDS = 0.05`、`ATTACK_FIT_DELAY = 0.3`、`AUDIBLE_DROP_DB = 55`、`AUDIBLE_FLOOR_DBFS = -78`、`MIN_SUSTAIN_SECONDS = 0.8`、`MIN_LOOP_SECONDS = 0.4`、`ATTACK_SETTLE = 0.15`、`LOOP_TARGET_SECONDS = 1.2`、`LOOP_END_MARGIN = 0.05`、`MIN_DB_PER_SEC = 0.5`、`MAX_DB_PER_SEC = 60`。

算法（签名和测试无法钉死拟合细节，在此固定）：
1. 每 50ms 窗口算单声道 RMS（所有通道均方平均），`levelDb[i] = 20 * log10(max(rms, 1e-9))`。
2. `peakTime` = 最大电平窗口的中心时间；`peakDb` 为其电平。
3. `threshold = max(peakDb - AUDIBLE_DROP_DB, AUDIBLE_FLOOR_DBFS)`；`audibleEnd` = 高于 `threshold` 的最后一个窗口的结束时间。
4. 对中心时间在 `[peakTime + ATTACK_FIT_DELAY, audibleEnd]` 内的窗口做电平-时间最小二乘线性拟合；`decayDbPerSec = clamp(-slope, MIN_DB_PER_SEC, MAX_DB_PER_SEC)`。
5. `loopStart = max(peakTime + ATTACK_SETTLE, audibleEnd - LOOP_TARGET_SECONDS)`；`loopEnd = audibleEnd - LOOP_END_MARGIN`。
6. `sustaining = (audibleEnd - peakTime >= MIN_SUSTAIN_SECONDS) && (loopEnd - loopStart >= MIN_LOOP_SECONDS)`。

- [ ] **Step 1: 写失败的测试**

在 `test/sustain.test.js` 中，`makeBuffer(channels)` 辅助函数从 `Float32Array` 数组构造 buffer-like。合成信号：`sr = 8000`，3 秒，`y(t) = sin(2π·220·t) · 10^(-rate·t/20)`。

```js
test('measures a steady 10 dB/s decay', () => {
  const a = analyzeSustain(makeBuffer([decayingSine(10)]));
  assert.ok(a.decayDbPerSec > 9 && a.decayDbPerSec < 11);
  assert.equal(a.sustaining, true);
  assert.ok(Math.abs(a.audibleEnd - 3.0) < 0.06);
  assert.ok(Math.abs(a.loopStart - 1.8) < 0.06);   // audibleEnd - 1.2
  assert.ok(Math.abs(a.loopEnd - 2.95) < 0.06);    // audibleEnd - 0.05
});

test('classifies a fast-dying note as non-sustaining', () => {
  // 100 dB/s：约 0.55s 处跌破 (peak - 55 dB)，不足 0.8s 延音下限
  const a = analyzeSustain(makeBuffer([decayingSine(100)]));
  assert.equal(a.sustaining, false);
});

test('finds the attack peak after a 0.1s ramp', () => {
  // 0.1s 线性起音，然后 10 dB/s 衰减
  const a = analyzeSustain(makeBuffer([attackThenDecay(0.1, 10)]));
  assert.ok(a.peakTime >= 0.075 && a.peakTime <= 0.15);
});

test('processes channels independently of count', () => {
  const a = analyzeSustain(makeBuffer([decayingSine(10), decayingSine(10).map(v => v * 0.5)]));
  assert.equal(a.sustaining, true);
  assert.ok(a.decayDbPerSec > 9 && a.decayDbPerSec < 11);
});
```

- [ ] **Step 2: 跑测试确认失败**

运行：`node --test test/sustain.test.js`
预期：FAIL，`analyzeSustain is not defined`（import 错误）。

- [ ] **Step 3: 在 `src/sustain.js` 实现 `analyzeSustain`**

严格按上面的算法实现；导出 `analyzeSustain`。

- [ ] **Step 4: 跑测试确认通过**

运行：`node --test test/sustain.test.js`
预期：4 个通过。

- [ ] **Step 5: 接上 test 脚本并提交**

`package.json`：`"test": "node --test test/sustain.test.js"`。跑 `npm test` → 通过。

```bash
git add package.json src/sustain.js test/sustain.test.js
git commit -m "add per-note sustain envelope analysis"
```

### Task 2: `buildLoopChannels` —— 去倾斜无缝循环素材

**文件：**
- 修改：`src/sustain.js`
- 修改：`test/sustain.test.js`

**接口：**
- 消费：Task 1 的 analysis 对象。
- 产出：`buildLoopChannels(buffer, analysis) -> Float32Array[]`——每通道一份全长拷贝，循环区已去倾斜、接缝已形变混合；输入永不被修改。常量 `BLEND_SECONDS = 0.08`（模块内部）。

算法（在此固定）：每个通道拷贝采样。对 `[loopStartFrame, loopEndFrame)` 内的帧 `f` 乘以 `10^(decayDbPerSec · (f - loopStartFrame) / sampleRate / 20)`（斜坡在 `loopStart` 处为 1.0）。然后把 `loopEndFrame` 前最后 `blend = floor(BLEND_SECONDS · sampleRate)` 帧与**去倾斜后**副本中 `loopStartFrame` 前的素材做形变混合，交叉淡化与现有 `_createSustainBuffer` 相同：`out[loopEnd - blend + i] = out[loopEnd - blend + i]·(1-t) + out[loopStart - blend + i]·t`，`t = i/blend`。

- [ ] **Step 1: 写失败的测试**

复用 `decayingSine(10)`；`rmsDb(arr, from, to)` 辅助函数。

```js
test('loop window is level-stationary after de-tilt', () => {
  const buf = makeBuffer([decayingSine(10)]);
  const a = analyzeSustain(buf);
  const out = buildLoopChannels(buf, a)[0];
  const sr = buf.sampleRate;
  const head = rmsDb(out, a.loopStart * sr, a.loopStart * sr + 0.05 * sr);
  const tail = rmsDb(out, (a.loopEnd - 0.15) * sr, (a.loopEnd - 0.1) * sr); // 接缝之前
  assert.ok(Math.abs(head - tail) < 1.0);
});

test('wrap is click-free: seam level matches loop start', () => {
  const buf = makeBuffer([decayingSine(10)]);
  const a = analyzeSustain(buf);
  const out = buildLoopChannels(buf, a)[0];
  const sr = buf.sampleRate;
  const seamEnd = rmsDb(out, (a.loopEnd - 0.01) * sr, a.loopEnd * sr);
  const wrapIn = rmsDb(out, a.loopStart * sr, (a.loopStart + 0.01) * sr);
  assert.ok(Math.abs(seamEnd - wrapIn) < 1.5);
  assert.ok(out.every(Number.isFinite));
});

test('regions outside window and seam are untouched', () => {
  const buf = makeBuffer([decayingSine(10)]);
  const a = analyzeSustain(buf);
  const src = buf.getChannelData(0);
  const out = buildLoopChannels(buf, a)[0];
  const sr = buf.sampleRate;
  for (let i = 0; i < Math.floor(0.5 * sr); i++) assert.equal(out[i], src[i]);
  assert.notEqual(out, src);
});
```

- [ ] **Step 2: 跑测试确认失败**

运行：`node --test test/sustain.test.js`
预期：FAIL，`buildLoopChannels is not defined`。

- [ ] **Step 3: 在 `src/sustain.js` 实现 `buildLoopChannels`**

按上面的算法；导出。守住 `blend <= loopStartFrame`（窗口短于 blend 时钳到 `loopStartFrame`）。

- [ ] **Step 4: 跑测试确认通过**

运行：`node --test test/sustain.test.js`
预期：全部通过（共 7 个）。

- [ ] **Step 5: 提交**

```bash
git add src/sustain.js test/sustain.test.js
git commit -m "add de-tilted seamless loop buffer builder"
```

### Task 3: `naturalGainAt` / `inaudibleAfter` —— 包络辅助函数

**文件：**
- 修改：`src/sustain.js`
- 修改：`test/sustain.test.js`

**接口：**
- 消费：Task 1 的 analysis 对象。
- 产出：
  - `naturalGainAt(analysis, elapsed) -> number`：`elapsed <= loopStart` 时为 `1`，否则 `10^(-decayDbPerSec · (elapsed - loopStart) / 20)`，钳制在 `[0.001, 1]`。
  - `inaudibleAfter(analysis) -> number`：增益降到 `0.001` 时距音符开始的秒数——`loopStart + 60 / decayDbPerSec`。

- [ ] **Step 1: 写失败的测试**

使用字面量 analysis 对象 `{ loopStart: 1.8, decayDbPerSec: 10 }`。

```js
test('gain is 1 before loopStart and decays at the measured rate', () => {
  const a = { loopStart: 1.8, decayDbPerSec: 10 };
  assert.equal(naturalGainAt(a, 1.0), 1);
  assert.equal(naturalGainAt(a, 1.8), 1);
  assert.ok(Math.abs(naturalGainAt(a, 3.8) - 0.01) < 1e-6); // 2s · 10 dB/s = -20 dB
});

test('inaudibleAfter hits -60 dB then clamps', () => {
  const a = { loopStart: 1.8, decayDbPerSec: 10 };
  assert.ok(Math.abs(inaudibleAfter(a) - 7.8) < 1e-9); // 1.8 + 60/10
  assert.equal(naturalGainAt(a, 100), 0.001);
});
```

- [ ] **Step 2: 跑测试确认失败**

运行：`node --test test/sustain.test.js`
预期：FAIL，`naturalGainAt is not defined`。

- [ ] **Step 3: 在 `src/sustain.js` 实现两个辅助函数**

导出两者。按签名做纯算术。

- [ ] **Step 4: 跑测试确认通过**

运行：`node --test test/sustain.test.js`
预期：全部通过（共 9 个）。

- [ ] **Step 5: 提交**

```bash
git add src/sustain.js test/sustain.test.js
git commit -m "add natural decay envelope helpers"
```

### Task 4: 在 `oneShot` 接线长音分支

**文件：**
- 修改：`src/index.js`（`oneShot` 的 duration 分支，约 205-249 行；删掉这里对 `_createSustainBuffer` 的使用）

**接口：**
- 消费：`./sustain.js` 的 `analyzeSustain`、`buildLoopChannels`、`naturalGainAt`、`inaudibleAfter`。
- 产出：`LitePiano` 实例上的 `_sustainInfo = {}`（音名 → analysis）和 `_loopBuffers = {}`（音名 → 处理后的 `AudioBuffer`），均懒缓存。另产出私有辅助 `_loopVoiceData(name) -> { analysis, buffer } | null`（消亡型返回 `null`）。Task 5 依赖这三者。

- [ ] **Step 1: 替换长音分支**

在 `oneShot` 中，保留 `seconds = Math.max(Number(duration) || 0, MIN_NOTE_SECONDS)` 钳制和短音路径原样不动，把分支条件改成 `seconds > 0.9 * natural`。新分支内部：

```js
const data = this._loopVoiceData(name); // 首次使用时分析 + 构建处理后缓冲
if (data && seconds > data.analysis.audibleEnd) {
  // 循环路径：处理后的缓冲，loop=true，loopStart/loopEnd 取自 analysis。
  // 包络（绝不为凑 endAt 重调斜率——永远是实测速率）：
  //   const decayEnd = Math.min(endAt, startedAt + inaudibleAfter(analysis));
  //   gain.setValueAtTime(1, startedAt + loopStart);
  //   gain.exponentialRampToValueAtTime(
  //     Math.max(naturalGainAt(analysis, decayEnd - startedAt), 0.001), decayEnd);
  //   if (endAt < startedAt + inaudibleAfter(analysis)) {
  //     gain.linearRampToValueAtTime(0, endAt + RELEASE_SECONDS);
  //   }
  //   source.stop(Math.min(endAt + RELEASE_SECONDS,
  //     startedAt + inaudibleAfter(analysis)) + 0.02);
} else if (seconds < natural) {
  // 中间长度：原始缓冲 + 现有断奏式 endAt 淡化
} else {
  // 消亡型音符配长 duration：原始缓冲，不做淡化——它自己消亡
}
```

`_loopVoiceData(name)`：先查 `_sustainInfo`；未命中则跑 `analyzeSustain(this._buffers[name])` 并缓存。`!analysis.sustaining` 时返回 `null`。首个延音型使用时，用 `context.createBuffer` + `buildLoopChannels` 构建处理后的 `AudioBuffer` 并缓存进 `_loopBuffers`。分支后保留现有踏板判定 timer 块（不变）。

删除不再被引用的 `LOOP_START_RATIO`、`LOOP_END_RATIO`、`LOOP_BLEND_SECONDS`、`LN_AUDIBLE`、`MIN_DECAY_SECONDS` 常量（Task 5 落地前，现有 `_extendVoice` 仍在引用的先保留——删前查引用）。

- [ ] **Step 2: 单测仍通过，构建通过**

运行：`npm test && npm run build`
预期：9 个通过；webpack 构建成功。

- [ ] **Step 3: 人工冒烟（dev server）**

`npm run start`，打开 `http://127.0.0.1:9090/demo.html`，在 console 里：

```js
piano.oneShot('C', 4, 0, 6);   // 循环路径：平滑衰减，无脉动
piano.oneShot('C', 4, 0, 6);   // 循环中重复触发：无叠加/无相位感
piano.oneShot('C', 8, 0, 6);   // 消亡型：约 1s 消亡，之后保持静音
piano.oneShot('C', 4, 0, 3.13 * 0.9);  // 边界：表现得像短音
```

预期：console 无报错；边界行为如上。（听感判断属于用户；执行者只查报错和分支行为是否正确。）

- [ ] **Step 4: 提交**

```bash
git add src/index.js
git commit -m "route long notes through measured-decay seamless loops"
```

### Task 5: 踏板路径接入新机制

**文件：**
- 修改：`src/index.js`（`_extendVoice`；移除 `_createSustainBuffer` 和遗留常量）

**接口：**
- 消费：Task 4 的 `_loopVoiceData(name)`、`naturalGainAt`、`inaudibleAfter`。
- 产出：无（没有后续任务）。

- [ ] **Step 1: 重写 `_extendVoice`**

按 spec §4：

- `data = this._loopVoiceData(voice.name)`；若为 `null`（消亡型）→ 直接返回，不改 voice（原有释放 timer 照常）。
- 已在循环的 voice：不动衰减斜率。重算 `endAt = voice.startedAt + Math.max(voice.seconds, SUSTAIN_SECONDS)`；从 `now` 取消已排增益，`setValueAtTime(naturalGainAt(analysis, now - voice.startedAt), now)`，然后完全按 Task 4 Step 1 循环路径的排期、用新 `endAt` 继续实测速率（ramp 到 `decayEnd = min(endAt, startedAt + inaudibleAfter(analysis))`，仅当 `endAt` 先来时才接释放淡化）；source 停止时间同样重排。
- 尚未循环的 voice（原短音/中间长度音仍在发声）：照旧换到处理后的循环缓冲，但新增益从 `naturalGainAt(analysis, now - voice.startedAt)` 起（而不是 0→1），旧 voice 以当前电平做 `SWAP_SECONDS` 交叉淡化；source 从 `analysis.loopStart` 偏移处开始；随后包络按实测速率走向新 `endAt`，同上。

删除 `_createSustainBuffer` 和剩余废弃常量。

- [ ] **Step 2: 测试与构建**

运行：`npm test && npm run build`
预期：9 个通过；构建成功。

- [ ] **Step 3: 人工冒烟**

demo 页 console：

```js
piano.pedalDown(); piano.oneShot('C', 4, 0, 0.5);  // 被踏板接住的短音：继续鸣响，自然衰减
piano.pedalDown(); piano.oneShot('C', 8, 0, 0.5);  // 消亡型 + 踏板：照样消亡
```

预期：console 无报错；第一个音越过 0.5s 继续响，第二个不会。

- [ ] **Step 4: 提交**

```bash
git add src/index.js
git commit -m "decay-rate-preserving pedal extension"
```

### Task 6: 最终验证与 dist 提交

**文件：**
- 修改：`dist/`（构建产物）

- [ ] **Step 1: 完整门禁**

运行：`npm test && npm run build`
预期：全部测试通过，构建成功，`dist/index.js` 与 demo bundle 更新。

- [ ] **Step 2: 给用户打印试听清单**

来自 spec 的验证一节：C4 按住约 6s（平滑衰减、无脉动）、A0 按住（鸣响久、衰减晚）、C7 以上配长 duration（快速消亡）、踏板接住的和弦（衰减与按住琴键一致），外加完整跑一首 `music-demo.html` 的曲子查回归。

- [ ] **Step 3: 提交**

```bash
git add dist docs/superpowers/specs/2026-10-19-natural-sustain-design.md docs/superpowers/plans/2026-10-19-natural-sustain.md
git commit -m "natural sustain for long notes: spec, plan, and rebuilt dist"
```

---

## 自评记录

- Spec 覆盖：§1 分析 → Task 1；§2 循环缓冲 → Task 2；§3 分支/包络 → Task 3+4；§4 踏板 → Task 5；§5 不变路径 → Task 4 Step 1 保留短音/无 duration 代码原样来守护；验证 → Task 6。
- 类型一致性：`analyzeSustain`/`buildLoopChannels`/`naturalGainAt`/`inaudibleAfter`/`_loopVoiceData` 在所有任务中命名一致。
- spec 早期的"本底 + 8 dB"可听规则已在 spec 中修正（会把仍在鸣响时被裁剪的低音误判）；本计划实现的是修正后的规则。
