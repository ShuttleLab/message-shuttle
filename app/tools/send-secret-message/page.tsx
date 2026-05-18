import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Send a Secret Message — No Account, One-Time Link | Message Shuttle",
  description:
    "Send passwords, tokens, or private text via a one-time link. Recipient reads it once, message auto-deleted. No signup, free.",
  alternates: { canonical: "/tools/send-secret-message" },
  openGraph: {
    title: "Send a Secret Message — No Account, One-Time Link",
    description:
      "Share sensitive text without leaving a trace in chat history. One-time pickup, 24h expiry, free.",
    type: "article",
  },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to send a secret message with Message Shuttle",
  description:
    "Send a private, self-destructing message that the recipient can read exactly once.",
  totalTime: "PT30S",
  tool: { "@type": "HowToTool", name: "Web browser" },
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Write your secret",
      text: "Open Message Shuttle and paste or type the sensitive content (password, API key, OTP, address) into the text box.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Send and receive a code",
      text: "Click 'Send Message'. Message Shuttle generates a 4-character pickup code (e.g. B7E2).",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Share the code privately",
      text: "Send the pickup code and URL (msg.shuttlelab.org/pickup) to the recipient via any channel — chat, email, or voice.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Recipient retrieves once",
      text: "The recipient enters the code on the pickup page. The message is copied to their clipboard and permanently deleted from the server.",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Can I send a password securely with Message Shuttle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Message Shuttle is suitable for one-time password sharing. The password is stored in Cloudflare KV, deleted after the recipient reads it, and auto-expires in 24 hours. However, it is not end-to-end encrypted — the server can technically read the content during the storage window. For the highest security needs, combine with tools like GPG or Signal.",
      },
    },
    {
      "@type": "Question",
      name: "Why not just send secrets via Slack, WeChat, or email?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Messages in Slack, WeChat, and email persist in chat history, server logs, and backups — often indefinitely. Even 'deleting' a WeChat message does not guarantee the recipient hasn't already seen or cached it. Message Shuttle deletes the message from the server immediately after it is read, leaving no history to search or leak.",
      },
    },
    {
      "@type": "Question",
      name: "Does the recipient need to create an account?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Neither the sender nor the recipient needs to sign up. Open the page, type a message, share the code. The recipient opens the pickup page, enters the code, and reads the message — all in about 30 seconds.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a limit on how many secret messages I can send?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There is no per-user limit. Message Shuttle does not track users or require authentication, so there is no account to rate-limit. Each message is independent and gets its own 4-character code.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if I share the wrong content?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If the recipient has not yet picked up the message, you can delete it via the API using the pickup code (DELETE /api/messages/{id}). Once the message is read, it is already deleted from the server. The current UI does not expose a recall button — only the API supports this.",
      },
    },
    {
      "@type": "Question",
      name: "Can I send files or images?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Message Shuttle currently supports text-only messages. The practical limit is Cloudflare KV's 25 MB per-value maximum, but the tool is designed for short-form text like passwords, codes, addresses, and notes.",
      },
    },
    {
      "@type": "Question",
      name: "Is Message Shuttle open source?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The source code is available on GitHub at github.com/ShuttleLab/message-shuttle. It is built with Next.js 15, React 19, and deployed on Cloudflare Pages.",
      },
    },
  ],
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Send a Secret Message — No Account, One-Time Link",
  description:
    "Guide to sending secret messages safely: why chat apps are risky for passwords, how one-time pickup codes work, and how to use Message Shuttle for sensitive text.",
  author: { "@type": "Organization", name: "ShuttleLab" },
  publisher: {
    "@type": "Organization",
    name: "ShuttleLab",
    url: "https://shuttlelab.org",
  },
  url: "https://msg.shuttlelab.org/tools/send-secret-message",
};

export default function SendSecretMessagePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header className="mb-8 sm:mb-12">
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Send a Secret Message — No Account, One-Time Link
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed sm:text-xl">
            Share passwords, tokens, or private text without leaving a trace in
            chat history. One-time pickup, auto-deleted after reading. Free, no
            signup.
          </p>
        </header>

        <section className="prose prose-base max-w-none space-y-12 text-foreground">
          <div>
            <h2 className="text-2xl font-bold mb-3">
              Why send secrets through Message Shuttle?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              When you share a password, API key, or one-time code through
              Slack, WeChat, email, or SMS, that message sits in chat history,
              server logs, and backups — often for years. Even if you
              &ldquo;delete&rdquo; it, the recipient may have already
              screenshot it, and the platform may retain a copy.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Message Shuttle takes a different approach: the message exists on
              the server for exactly one read. When the recipient enters the
              4-character pickup code, the server executes a{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                getAndDelete
              </code>{" "}
              operation — read and destroy in a single atomic call. After that,
              the content is gone. There is no chat history, no search index,
              and no backup to leak.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              The pickup code is a 4-character uppercase hex string (0–9, A–F)
              generated from <code className="text-sm bg-muted px-1.5 py-0.5 rounded">crypto.randomUUID()</code>,
              giving 65,536 possible combinations. Even if someone has the
              link to the pickup page, they still need the code to retrieve
              the message. And because the code is short, you can easily read
              it aloud over a phone call or write it on a sticky note.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">
              Use cases for secret messages
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Any time you need to share a piece of sensitive text and you do
              not want it to persist in someone&apos;s chat history, email
              inbox, or company Slack workspace, a one-time message is the
              right tool. Here are the most common scenarios:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed">
              <li>
                <strong>Share a Wi-Fi password</strong> with a visitor without
                it sitting in your office Slack channel forever.
              </li>
              <li>
                <strong>Send an API key or token</strong> to a co-developer for
                a one-time setup — it disappears after they use it.
              </li>
              <li>
                <strong>Transfer a one-time password (OTP)</strong> or
                verification code to a client without email trails.
              </li>
              <li>
                <strong>Share a home address or phone number</strong> with a
                friend without it being cached in cloud chat history.
              </li>
              <li>
                <strong>Send bank account details</strong> to a family member
                for a single transfer — auto-deleted in 24 hours.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">
              How to send a secret message with Message Shuttle
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-muted-foreground leading-relaxed">
              <li>
                <strong>Write your secret.</strong> Open{" "}
                <Link href="/send" className="text-primary underline">
                  msg.shuttlelab.org/send
                </Link>{" "}
                and paste or type the sensitive content into the text box.
              </li>
              <li>
                <strong>Click &ldquo;Send Message&rdquo;.</strong> Message
                Shuttle generates a 4-character uppercase hex pickup code (for
                example, <code className="text-sm bg-muted px-1.5 py-0.5 rounded">B7E2</code>
                ). The code comes from{" "}
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  crypto.randomUUID()
                </code>{" "}
                and has 65,536 possible combinations.
              </li>
              <li>
                <strong>Share the code privately.</strong> Use the &ldquo;Share
                with code&rdquo; button to copy the pickup URL and code to
                your clipboard, then paste them into any channel — chat,
                email, or voice call.
              </li>
              <li>
                <strong>Recipient retrieves once.</strong> The recipient opens{" "}
                <Link href="/pickup" className="text-primary underline">
                  msg.shuttlelab.org/pickup
                </Link>
                , enters the code, and clicks &ldquo;Confirm&rdquo;. The
                message is copied to their clipboard and permanently deleted
                from the server.
              </li>
            </ol>
            <p className="mt-3 text-muted-foreground leading-relaxed text-sm">
              The entire process takes about 30 seconds. No accounts, no app
              installations, no browser extensions. Works on desktop and mobile
              browsers. For an extra layer of security, share the pickup code
              through a different channel than the URL — for example, send the
              link via email and the code via SMS.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">
              Privacy and threat model
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Being honest about what Message Shuttle does and does not protect
              against:
            </p>
            <dl className="space-y-4">
              <div>
                <dt className="font-semibold mb-1">
                  Message Shuttle protects: server-side data retention
                </dt>
                <dd className="text-muted-foreground leading-relaxed text-sm">
                  Messages are deleted immediately on read via{" "}
                  <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                    getAndDelete
                  </code>
                  . Unread messages expire after 24 hours (86,400 seconds).
                  There is no chat history, no search index, and no permanent
                  storage.
                </dd>
              </div>
              <div>
                <dt className="font-semibold mb-1">
                  Message Shuttle protects: accidental oversharing
                </dt>
                <dd className="text-muted-foreground leading-relaxed text-sm">
                  Unlike a message in a group chat, the secret is only visible
                  to whoever has the pickup code. It is not broadcast to a
                  channel or stored in a shared workspace.
                </dd>
              </div>
              <div>
                <dt className="font-semibold mb-1">
                  Message Shuttle does NOT protect: content during storage
                </dt>
                <dd className="text-muted-foreground leading-relaxed text-sm">
                  Messages are stored in Cloudflare KV without
                  application-level encryption. Cloudflare encrypts data at
                  rest at the infrastructure level, but the server can
                  technically read message content. Message Shuttle does not
                  log message content, but it is not end-to-end encrypted.
                </dd>
              </div>
              <div>
                <dt className="font-semibold mb-1">
                  Message Shuttle does NOT protect: recipient-side capture
                </dt>
                <dd className="text-muted-foreground leading-relaxed text-sm">
                  The recipient can screenshot, copy, or photograph the message
                  before it is deleted. No web tool can prevent this.
                </dd>
              </div>
              <div>
                <dt className="font-semibold mb-1">
                  Message Shuttle does NOT protect: code interception
                </dt>
                <dd className="text-muted-foreground leading-relaxed text-sm">
                  The 4-character pickup code is transmitted in plain text.
                  Anyone who intercepts the code (e.g. from a forwarded chat
                  message) can retrieve the content. For high-security
                  scenarios, share the code through a different channel than
                  the URL.
                </dd>
              </div>
            </dl>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">
              Common issues when sharing secrets
            </h2>
            <dl className="space-y-4">
              <div>
                <dt className="font-semibold mb-1">
                  &ldquo;I sent a password in Slack and now it&apos;s in the
                  search index forever&rdquo;
                </dt>
                <dd className="text-muted-foreground leading-relaxed text-sm">
                  Slack, Microsoft Teams, and similar platforms index every
                  message for search. Even if you delete your copy, the
                  recipient&apos;s workspace may retain it in compliance
                  archives. Use a one-time message instead — it never enters
                  the chat system.
                </dd>
              </div>
              <div>
                <dt className="font-semibold mb-1">
                  &ldquo;I emailed an API key and now it&apos;s in my sent
                  folder&rdquo;
                </dt>
                <dd className="text-muted-foreground leading-relaxed text-sm">
                  Email is stored on multiple servers (sender, recipient,
                  backup). Deleting an email does not guarantee removal from
                  all copies. Message Shuttle stores the content in one place
                  (Cloudflare KV) and deletes it on read.
                </dd>
              </div>
              <div>
                <dt className="font-semibold mb-1">
                  &ldquo;I shared a code over WeChat but the recipient didn&apos;t
                  read it in time&rdquo;
                </dt>
                <dd className="text-muted-foreground leading-relaxed text-sm">
                  WeChat recall has a 2-minute limit and does not guarantee
                  the message is gone. Message Shuttle gives the recipient a
                  full 24-hour window, after which the message is
                  automatically deleted by Cloudflare KV — no manual recall
                  needed.
                </dd>
              </div>
              <div>
                <dt className="font-semibold mb-1">
                  &ldquo;Someone forwarded my secret message to a group
                  chat&rdquo;
                </dt>
                <dd className="text-muted-foreground leading-relaxed text-sm">
                  With Message Shuttle, there is no message to forward. The
                  recipient sees the content on a web page; there is no
                  embeddable card, no preview, and no message object that can
                  be forwarded to another conversation.
                </dd>
              </div>
            </dl>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">
              Frequently Asked Questions</h2>
            <dl className="space-y-6">
              {faqSchema.mainEntity.map((q) => (
                <div key={q.name}>
                  <dt className="font-semibold mb-2">{q.name}</dt>
                  <dd className="text-muted-foreground leading-relaxed">
                    {q.acceptedAnswer.text}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="border-t border-border pt-8">
            <h2 className="text-xl font-bold mb-3">Related tools</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/send" className="text-primary underline">
                  Send a Message
                </Link>{" "}
                — create a one-time secret message now
              </li>
              <li>
                <Link href="/pickup" className="text-primary underline">
                  Pick Up a Message
                </Link>{" "}
                — have a code? Retrieve your message here
              </li>
              <li>
                <Link
                  href="/tools/burn-after-reading"
                  className="text-primary underline"
                >
                  Burn-After-Reading Guide
                </Link>{" "}
                — technical deep-dive on how self-destructing messages work
              </li>
              <li>
                <Link href="/about" className="text-primary underline">
                  About Message Shuttle
                </Link>{" "}
                — full FAQ, use cases, and comparison with PrivNote,
                OneTimeSecret, and Signal
              </li>
            </ul>
          </div>
        </section>
      </article>
    </>
  );
}
