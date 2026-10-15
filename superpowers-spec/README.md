# Superpowers Spec（需求规格三件套）

从 [obra/superpowers](https://github.com/obra/superpowers)（作者 Jesse Vincent，MIT License，上游版本 7.0.0）转换的 Qoder 原生插件，只保留需求 spec 工作流核心三个技能，供本仓库的需求讨论与实施计划使用。

## 包含的技能

| 技能 | 作用 | 产出 |
| --- | --- | --- |
| `brainstorming` | 任何创造性工作（新功能、行为变更、新规划）开始前，通过提问澄清真实需求 | 设计文档 `docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md` |
| `writing-plans` | 已有 spec/需求后，把设计拆成 bite-sized 的实施计划 | 计划文档 `docs/superpowers/plans/YYYY-MM-DD-<feature-name>.md` |
| `executing-plans` | 在当前会话内逐任务执行实施计划 | 按任务提交代码 + 最终整分支 review |

支持文件：`brainstorming/`（`builder-check-prompt.md`、`visual-companion.md`、`scripts/` 可视化伴侣服务器）与 `executing-plans/scripts/`（`task-start`、`task-done`）均已按原样复制。

## 脚本依赖说明

`executing-plans/scripts/task-start` 与 `task-done` 在上游通过相对路径 `../../subagent-driven-development/scripts/` 调用 `task-brief`、`sdd-workspace`、`review-package` 三个 bash 脚本。为保证三件套开箱可用，本插件复制了这三个脚本到 `skills/subagent-driven-development/scripts/`（**未**包含该技能本身的 `SKILL.md`，仅为脚本依赖，技能列表中不会出现 subagent-driven-development）。上游文件全部保持原样，未做修改。

## 适配与省略说明

- 命名空间改写：技能间引用 `superpowers:writing-plans` / `superpowers:executing-plans` 已改写为 Qoder 直接可调用的 `writing-plans` / `executing-plans`（共 5 处）。其余 `superpowers:<skill>` 引用（如 `test-driven-development`、`systematic-debugging`、`finishing-a-development-branch` 等）指向**未包含**在本插件中的技能，保留原文以明示来源；在 Qoder 中这些技能不可用，执行到对应步骤时按通用流程继续即可。
- 省略内容：上游其余 12 个技能、`using-superpowers` 引导技能、各平台 manifest（`.claude-plugin/` 等）、hooks、tests。需求 spec 的触发规则由仓库根目录 `AGENTS.md` 中的仓库级规范替代 `using-superpowers` 的引导作用。

## 在本仓库中的启用方式

仓库根目录的 `.qoder/skills` 是指向 `../superpowers-spec/skills` 的相对软链，Qoder 进入本仓库时即可发现三个技能（Windows 克隆若软链失效，可手动重建或直接把 `superpowers-spec/skills/` 下的技能目录复制到 `.qoder/skills/`）。

## 校验

- 已通过 `create-plugin` 离线校验器 `validate_qoder_plugin.py` 检查（0 error）。
- `plugin.json` 仅声明实际存在的 `./skills/` 组件；无 hooks、MCP、commands 声明。
