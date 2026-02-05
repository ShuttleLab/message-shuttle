import type { NextConfig } from "next";
import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

// 直接跑 npm run dev 能成功，是因为本项目用的是 Cloudflare 的 Next 集成，在开发模式下会把 Workers 环境（包含 KV 绑定）直接嵌进 Next 的 dev 服务器里，不需要单独起 wrangler dev。
// 核心原因: 在开发环境里，next.config.ts 调用了 setupDevPlatform()，它会为 Edge Runtime 注入 Cloudflare 平台模拟（Miniflare），从而让 @cloudflare/next-on-pages 的 getRequestContext().env 在 next dev 下就可用。你的 API 路由都设置了 export const runtime = 'edge'，因此在本地也按 Workers 方式执行并能访问 env.KV。
// KV 绑定来源: 本地会读取 wrangler.toml 的 kv_namespaces 配置，local = true/local_only 会启用本地模拟存储，因此无需额外起 Wrangler 进程，KV 也能工作。
// 何时需要 wrangler dev:
// 想独立以 Workers 形态运行/调试（不经过 Next dev）。
// 需要使用 Wrangler 的 CLI 功能或更接近生产的 Workers 预览。
// 多项目/路由在 Workers 层做联调。
// 推荐用法:
// 日常前端 + API 开发：直接 npm run dev（最快）。
// 若确实要同时起独立的 Workers 开发服务：用 npm run local（并发跑 next dev 与 wrangler dev）。
// 部署或登录：用 npm run wrangler:deploy / npm run wrangler:login。
// Setup Cloudflare bindings for local development
if (process.env.NODE_ENV === 'development') {
  setupDevPlatform();
}

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
