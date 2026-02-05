# Message Shuttle

Temporary message transfer app: send and pick up messages with one-time retrieval. i18n (zh/en), share links. Use as a **template** for other Next.js + Cloudflare projects.

---

## Template & tech (at a glance)

| Aspect | Choice |
|--------|--------|
| **Framework** | Next.js 15 (App Router), React 19 |
| **Rendering** | **SSG** (pages built at deploy) + **Edge API** (dynamic, per request) |
| **Hosting** | Cloudflare Pages; API runs on Workers (Functions) |
| **Storage** | Cloudflare Workers KV (`message-kv` binding) |
| **UI** | **shadcn/ui** (New York, Tailwind v4), semantic tokens, OKLCH colors |
| **Styling** | Tailwind CSS v4, `@theme inline`, light/dark via system (`prefers-color-scheme`) |
| **Icons** | Lucide React (via shadcn) |

**Good for:** Apps that need static front-end + serverless API and KV; base for new projects with consistent UI and Cloudflare deployment.

---

## Features

- **i18n** — Chinese / English, preference stored in browser
- **Temporary messages** — Default 24h TTL, configurable
- **One-time pickup** — Message deleted after retrieval; copy content easily
- **Share** — Copy receive URL + pickup code for sharing
- **Cloudflare KV** — Edge storage, binding name: `message-kv`

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Local dev uses integrated Cloudflare env simulation; no separate `wrangler dev` needed.

Optional: run Next.js + Wrangler together with `npm run local` (Next.js on 3000, Wrangler on 8787).

## Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Start Next.js dev server (recommended) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run local` | Next.js + Wrangler together |
| `npm run wrangler:dev` | Wrangler dev only |
| `npm run wrangler:deploy` | Deploy to Cloudflare Workers/Pages |
| `npm run wrangler:login` | Log in to Cloudflare |
| `npm run wrangler:kv:local` | Create local KV namespace |
| `npm run wrangler:kv:sync` | Inspect local KV data |

## API

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/messages` | Create message (body: `content`, optional `expirationTtl`, `metadata`) |
| GET | `/api/messages/{id}` | Get message |
| GET | `/api/messages/{id}/retrieve` | One-time retrieve (deletes after) |
| PUT | `/api/messages/{id}` | Update message |
| DELETE | `/api/messages/{id}` | Delete message |
| GET | `/api/messages?limit=100&prefix=message:` | List messages |

## Deploy to Cloudflare Pages

1. Create a Pages project from this repo in the [Cloudflare dashboard](https://dash.cloudflare.com/).
2. **Build**: Framework **Next.js**, build command `npx @cloudflare/next-on-pages@1`, output `.vercel/output/static`.
3. **KV**: In **Settings → Functions → KV namespace bindings**, add variable `message-kv` and attach a KV namespace.
4. Push to `main` to deploy.

## Tech stack (detail)

- **Next.js 15** (App Router), **React 19**, **TypeScript**
- **Tailwind CSS v4** (`@theme inline`, CSS-first config)
- **shadcn/ui** (canary, Tailwind v4) — Button, Card, Input, Label, Textarea, Dialog, etc.
- **Cloudflare**: [@cloudflare/next-on-pages](https://github.com/cloudflare/next-on-pages), **Workers KV**
- **Fonts**: Geist Sans / Mono (next/font)

## Docs

- [Next.js](https://nextjs.org/docs) · [shadcn/ui](https://ui.shadcn.com) · [Cloudflare Workers](https://developers.cloudflare.com/workers/) · [Cloudflare KV](https://developers.cloudflare.com/kv/) · [next-on-pages](https://github.com/cloudflare/next-on-pages)
