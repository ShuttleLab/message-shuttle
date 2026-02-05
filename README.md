# Message Shuttle

基于 Next.js 15 + Cloudflare Pages/Workers 的临时消息传输应用，支持发送、收取与一次性销毁，提供中英文切换与一键转发分享。

## ✨ 特性

- **多语言**：内置中 / 英切换，状态保存在浏览器
- **临时消息**：默认 24 小时过期，可设置自定义 TTL
- **一次性收取**：取件后自动删除，支持内容复制
- **一键转发**：自动复制“接收地址 + 取件码”文本，便于分享
- **Cloudflare KV**：边缘存储，低延迟；统一绑定名 `message-kv`
- **现代栈**：Next.js 15 App Router、TypeScript、Tailwind CSS

## 📁 项目结构

```
message-shuttle/
├── app/                    # Next.js App Router 页面
│   ├── api/messages/       # 消息 CRUD 与一次性取回 (Edge Runtime)
│   ├── send/               # 发送消息页面
│   ├── pickup/             # 收取消息页面
│   └── about/              # 关于页面
├── components/             # React 组件
│   ├── i18n-provider.tsx   # 语言上下文
│   ├── share-button.tsx    # 一键分享
│   ├── support-donate.tsx  # 捐赠弹窗
│   └── ui/                 # UI 组件库
├── lib/
│   ├── i18n.ts             # 文案字典 (zh/en)
│   ├── kv.ts               # KV 操作封装
│   ├── utils.ts            # 工具函数
│   └── worker-types.d.ts   # Cloudflare 环境类型
├── wrangler.toml           # 生产/Pages 配置（binding: message-kv）
├── wrangler.dev.toml       # 本地 Wrangler 开发配置
└── next.config.ts          # Next.js + Cloudflare 适配
```

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 本地开发

直接启动 Next.js 开发服务器（已集成 Cloudflare 模拟环境）：

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

> **说明**：本地开发无需单独运行 `wrangler dev`，`@cloudflare/next-on-pages` 已自动集成 Cloudflare 环境模拟。

### 3. 同时运行 Next.js 和 Wrangler（可选）

如需独立的 Workers 开发环境：

```bash
npm run local
```

这将同时启动：
- Next.js 开发服务器（端口 3000）
- Wrangler 开发服务器（端口 8787）

## 📜 可用脚本

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动 Next.js 开发服务器（推荐） |
| `npm run build` | 构建生产版本 |
| `npm run start` | 启动生产服务器 |
| `npm run lint` | 运行 ESLint 检查 |
| `npm run local` | 同时运行 Next.js 和 Wrangler |
| `npm run wrangler:dev` | 单独启动 Wrangler 开发服务器 |
| `npm run wrangler:deploy` | 部署到 Cloudflare Workers / Pages Functions |
| `npm run wrangler:login` | 登录 Cloudflare 账户 |
| `npm run wrangler:kv:local` | 创建本地 KV 命名空间 |
| `npm run wrangler:kv:sync` | 查看本地 KV 数据 |

## 🔧 API 接口

### 创建消息
```bash
POST /api/messages
Content-Type: application/json

{
  "content": "Hello World",
  "expirationTtl": 3600,  # 可选，秒数；不填默认 86400 (24 小时)
  "metadata": {}          # 可选
}
```

### 查看消息
```bash
GET /api/messages/{id}
```

### 取回消息（一次性）
```bash
GET /api/messages/{id}/retrieve
```

### 更新消息
```bash
PUT /api/messages/{id}
Content-Type: application/json

{
  "content": "Updated content"
}
```

### 删除消息
```bash
DELETE /api/messages/{id}
```

### 列出消息
```bash
GET /api/messages?limit=100&prefix=message:
```

## 🌐 部署到 Cloudflare Pages

### 1. 连接 GitHub 仓库

在 [Cloudflare Pages 控制台](https://dash.cloudflare.com/) 创建新项目，选择此仓库。

### 2. 配置构建设置

- **Framework preset**: Next.js
- **Build command**: `npx @cloudflare/next-on-pages@1`
- **Build output directory**: `.vercel/output/static`

### 3. 配置 KV 绑定

在 Pages 项目的 **Settings** → **Functions** → **KV namespace bindings** 中：
- **Variable name**: `message-kv`
- **KV namespace**: 选择或创建一个 KV 实例

### 4. 部署

推送到 main 分支即可自动部署。

## 🔑 本地 KV 模拟

本地开发时，KV 数据走内存模拟，重启后会清空：

```toml
# wrangler.toml (生产 / Pages)
name = "message-shuttle"
pages_build_output_dir = "./.vercel/output/static"

[[kv_namespaces]]
binding = "message-kv"
id = "<你的 KV 实例 ID>"

# wrangler.dev.toml (本地 Wrangler 开发)
[dev]
local = true
[[kv_namespaces]]
binding = "message-kv"
id = "00000000000000000000000000000000"
preview_id = "00000000000000000000000000000000"
```

使用 `npm run local` 启动 Next.js + Wrangler，本地即可模拟 KV 读写，无需真实实例。

## 🛠️ 技术栈

- **Next.js 15** - React 框架
- **Cloudflare Workers** - 边缘计算平台
- **Cloudflare KV** - 分布式键值存储
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **@cloudflare/next-on-pages** - Next.js 到 Cloudflare 的适配器

## 📚 相关文档

- [Next.js 文档](https://nextjs.org/docs)
- [Cloudflare Workers 文档](https://developers.cloudflare.com/workers/)
- [Cloudflare KV 文档](https://developers.cloudflare.com/kv/)
- [next-on-pages 文档](https://github.com/cloudflare/next-on-pages)


