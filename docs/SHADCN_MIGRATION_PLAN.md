# shadcn/ui 迁移计划（分析稿，不直接改代码）

本文档说明：**Tailwind v4 + shadcn 兼容性结论** 与 **在当前 message-shuttle 项目上接入 shadcn 的步骤清单**（先做什么、后做什么、哪些可延后）。不包含具体代码修改，仅作规划与参考。

---

## 一、Tailwind v4 + shadcn 兼容性结论

- **结论：可以放心用。**  
  shadcn/ui 已正式支持 Tailwind v4（2025 年 2 月），文档见 [Tailwind v4 - shadcn/ui](https://ui.shadcn.com/docs/tailwind-v4)。

- **你当前技术栈**  
  - Next.js 15、React 19、Tailwind v4、已有 `@theme inline` 和少量 CSS 变量（`--background` / `--foreground`）。  
  - 与 shadcn 的 Tailwind v4 + React 19 路线一致，无需降级。

- **两种使用方式**  
  - **新项目**：用 `npx shadcn@canary init` 从零生成 Tailwind v4 + React 19 的 Next 项目。  
  - **现有项目（本仓库）**：在现有 Next.js 15 + Tailwind v4 上做「接入」：先 init，再按需添加组件并逐步替换现有 UI。

- **注意事项**  
  - Tailwind v4 使用较新的浏览器特性，需面向现代浏览器。  
  - 若使用 shadcn 的 canary CLI，建议在单独分支或备份后再执行 init，避免误覆盖现有配置。

---

## 二、迁移步骤清单（推荐顺序）

以下按「先准备 → 再接入 → 再替换 → 最后收尾」的顺序列出，便于你或他人按步骤执行。

### 阶段 0：准备（必做）

| 步骤 | 内容 | 说明 |
|------|------|------|
| 0.1 | 提交当前所有修改 | 避免 init 或后续步骤覆盖未提交更改。 |
| 0.2 | 阅读 [Tailwind v4 Upgrade Guide](https://tailwindcss.com/docs/upgrade-guide)（可选） | 你已是 v4，仅作参考即可。 |
| 0.3 | 确认 Node / pnpm 或 npm 版本 | 满足 Next 15 与 shadcn 要求即可。 |

### 阶段 1：在现有项目中接入 shadcn（必做）

| 步骤 | 内容 | 说明 |
|------|------|------|
| 1.1 | 在项目根目录执行 `npx shadcn@canary init` | 使用 **canary** 以支持 Tailwind v4。选择「Existing project」或等效选项。 |
| 1.2 | 按 CLI 提示选择：Style 选 **New York**，Base color 自选，CSS variables 选 **Yes**，Tailwind 选 **v4**（若有），React 选 **19**（若有） | 与当前栈一致。 |
| 1.3 | 检查生成/修改的文件 | 通常包括：`components.json`、`app/globals.css`（或对现有 globals 的修改）、可能新增/修改 `lib/utils.ts`（会引入 `tailwind-merge` + `clsx` 的 `cn`）。 |
| 1.4 | 合并 `globals.css` | 当前项目已有 `:root` 的 `--background` / `--foreground` 和 `@theme inline`。需把 shadcn 生成的主题变量（如 `--card`、`--popover`、`--muted` 等）与现有变量合并，并保留现有 `@keyframes`、`animate-fade-in-out` 等。若 shadcn 使用 `.dark` 类切换深色，而你目前用 `prefers-color-scheme`，可保留 media 或统一改为 class，二选一即可。 |
| 1.5 | 安装/确认依赖 | init 通常会加 `tailwind-merge`、`clsx`、`class-variance-authority` 等；若未自动安装，按 `components.json` 或文档补装。 |

### 阶段 2：按需添加组件并替换现有 UI（建议分步）

| 步骤 | 内容 | 说明 |
|------|------|------|
| 2.1 | 添加基础组件 | `npx shadcn@canary add button card input label textarea`。与当前页面用到的元素对应。 |
| 2.2 | 替换首页与导航 | 用 shadcn 的 **Button**、**Card** 替换 `app/page.tsx` 和 `components/header.tsx` 中的按钮与卡片样式（可先保留原有结构，只换组件与 class）。 |
| 2.3 | 替换发送页 / 取件页 | 用 **Input**、**Textarea**、**Label**、**Button**、**Card** 等替换 `app/send/page.tsx`、`app/pickup/page.tsx` 中的表单与卡片。 |
| 2.4 | 替换关于页与捐赠弹窗 | 用 **Card**、**Button**，弹窗用 **Dialog**（`npx shadcn@canary add dialog`）替换 `components/about-content.tsx`、`components/support-donate.tsx` 中的自定义样式。 |
| 2.5 | 删除或兼容旧 Button | 当前 `components/ui/button.tsx` 为自定义。可在全部替换为 shadcn Button 后删除该文件，或保留为别名再逐步迁移。 |

### 阶段 3：主题与深色模式统一（建议）

| 步骤 | 内容 | 说明 |
|------|------|------|
| 3.1 | 统一深色模式策略 | 若 shadcn 默认用 `class` 策略（`html.dark`），而你当前用 `prefers-color-scheme`，选其一：要么全局改为 class 并在布局中根据系统/用户设置切换 `dark` 类，要么在 shadcn 主题中保留 media 并确保变量在 media 下也生效。 |
| 3.2 | 检查对比度与可访问性 | 在亮/暗主题下检查重点页面文字与背景对比度，必要时微调 shadcn 的 CSS 变量。 |

### 阶段 4：收尾与后续（可延后）

| 步骤 | 内容 | 说明 |
|------|------|------|
| 4.1 | 移除冗余的 `dark:` 类 | 若已全面采用 shadcn 的语义化 token（如 `bg-background`、`text-foreground`），可逐步移除之前为修深色模式加的大量 `dark:` Tailwind 类，减少重复。 |
| 4.2 | 按需再添加组件 | 例如 Sheet、Dropdown、Toast（或 Sonner）、Form 等，随新功能需要再 `add`。 |
| 4.3 | 文档与「基础模板」说明 | 在 README 或内部文档中注明：本仓库为 Next.js 15 + Tailwind v4 + shadcn 基础模板，新项目可基于此仓库复制后改业务逻辑。 |

---

## 三、可延后或可选的事项

- **forwardRef 迁移**：当前自定义 Button 若未用 `forwardRef`，可忽略；若将来从别处拷贝了带 forwardRef 的组件，再按 [shadcn Tailwind v4 文档](https://ui.shadcn.com/docs/tailwind-v4) 的「Remove forwardRef」部分或 React codemod 处理。
- **chart 颜色**：未使用 Chart 组件时可忽略「Update colors for charts」。
- **tw-animate-css**：若 shadcn 新版本推荐用 `tw-animate-css` 替代 `tailwindcss-animate`，可在 init 后按官方文档或生成的 globals 中的注释处理，属可选优化。
- **一次性替换所有页面**：不必强求。可先完成阶段 1，再只替换首页或发送页，其余页面逐步替换，降低风险。

---

## 四、参考链接

- [shadcn/ui - Tailwind v4](https://ui.shadcn.com/docs/tailwind-v4)  
- [shadcn/ui - Next.js Installation](https://ui.shadcn.com/docs/installation/next)  
- [Tailwind v4 Upgrade Guide](https://tailwindcss.com/docs/upgrade-guide)  

---

*文档仅作分析与规划，不包含自动改代码。实际执行时请按项目情况调整顺序与范围。*
