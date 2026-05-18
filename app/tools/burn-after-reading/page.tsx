import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Burn-After-Reading Messages — One-Time Pickup Code | Message Shuttle",
  description:
    "Send self-destructing messages with a one-time pickup code. Message deleted on read, auto-expires in 24 hours. No signup, free.",
  alternates: { canonical: "/tools/burn-after-reading" },
  openGraph: {
    title: "Burn-After-Reading Messages — One-Time Pickup Code",
    description:
      "Send a message, get a 4-character code. Recipient reads it once, then it's gone forever. Free, no account needed.",
    type: "article",
  },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to send a burn-after-reading message with Message Shuttle",
  description:
    "Create a self-destructing message that is deleted after the recipient reads it once.",
  totalTime: "PT30S",
  tool: { "@type": "HowToTool", name: "Web browser" },
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Write your message",
      text: "Open Message Shuttle and type or paste the message you want to send into the text box.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Send and get a code",
      text: "Click 'Send Message'. The system generates a 4-character uppercase hex pickup code (e.g. A3F1).",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Share the code",
      text: "Copy the code or use the share button to send the pickup URL and code to the recipient via any messaging app.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Recipient picks up",
      text: "The recipient opens the pickup page, enters the 4-character code, and clicks 'Confirm'. The message is copied to their clipboard and deleted from the server.",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is the message really deleted after reading?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Message Shuttle uses a getAndDelete operation — the server reads and deletes the message in a single atomic call. The same pickup code cannot be used twice; a second attempt returns a 404 error.",
      },
    },
    {
      "@type": "Question",
      name: "What if the recipient never reads the message?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every message has a 24-hour time-to-live (86,400 seconds). If the recipient does not pick it up within that window, Cloudflare KV automatically deletes the message. No manual cleanup is needed.",
      },
    },
    {
      "@type": "Question",
      name: "How secure is the 4-character pickup code?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The code is 4 uppercase hexadecimal characters (0–9, A–F), giving 65,536 possible combinations. It is generated from the first 4 characters of crypto.randomUUID(). A single random guess has about a 0.0015% chance of success.",
      },
    },
    {
      "@type": "Question",
      name: "Is burn-after-reading the same as end-to-end encryption?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Burn-after-reading deletes the message after it is read; end-to-end encryption prevents the server from reading the content in the first place. Message Shuttle provides deletion-on-read and auto-expiry, but the message is stored in Cloudflare KV without application-level encryption. The server can technically read it.",
      },
    },
    {
      "@type": "Question",
      name: "Can someone screenshot the message before it is deleted?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Burn-after-reading protects against the message persisting on the server — it does not prevent the recipient from taking a screenshot, copying the text, or photographing their screen. This is a fundamental limitation of any web-based burn-after-reading tool.",
      },
    },
    {
      "@type": "Question",
      name: "Is Message Shuttle's burn-after-reading free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Message Shuttle is completely free with no signup, no ads, and no usage limits. It is maintained independently by ShuttleLab.",
      },
    },
  ],
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Burn-After-Reading Messages — One-Time Pickup Code",
  description:
    "Complete guide to burn-after-reading messages: what they are, how they work, what they protect against, and how to send one with Message Shuttle.",
  author: { "@type": "Organization", name: "ShuttleLab" },
  publisher: {
    "@type": "Organization",
    name: "ShuttleLab",
    url: "https://shuttlelab.org",
  },
  url: "https://msg.shuttlelab.org/tools/burn-after-reading",
};

export default function BurnAfterReadingPage() {
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
            Burn-After-Reading Messages — One-Time Pickup Code
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed sm:text-xl">
            Send a message, get a 4-character code. The recipient reads it once,
            then it&apos;s gone from the server forever. No signup, no ads, free.
          </p>
        </header>

        <section className="prose prose-base max-w-none space-y-12 text-foreground">
          <div>
            <h2 className="text-2xl font-bold mb-3">
              What is a burn-after-reading message?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              A burn-after-reading message (also called a{" "}
              <em>self-destructing message</em> or <em>one-time message</em>) is
              a piece of text that is automatically deleted from the server the
              moment someone reads it. The sender writes a message, receives a
              short pickup code, and shares that code with the recipient. When
              the recipient enters the code, the message is retrieved and
              immediately destroyed — there is no second read.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Message Shuttle implements this with a single{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                getAndDelete
              </code>{" "}
              operation on Cloudflare KV: the read and the delete happen in one
              atomic call, so there is no window where the message exists after
              being viewed. Additionally, every message has a 24-hour
              time-to-live (86,400 seconds). If nobody picks it up, it is
              automatically purged.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              This model is useful any time you need to share something
              sensitive — a password, a verification code, a bank account
              number — and you want it gone the moment the other person reads
              it. Unlike a message in a group chat or email thread, there is no
              permanent record to search, leak, or accidentally forward.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">
              Why use burn-after-reading?
            </h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed">
              <li>
                <strong>No chat history residue</strong> — passwords, API keys,
                or OTPs shared via Slack, WeChat, or email persist indefinitely
                in logs and backups. A burn-after-reading message leaves no
                trace on the server after pickup.
              </li>
              <li>
                <strong>Cross-device, cross-platform</strong> — works in any
                web browser. The recipient does not need to install an app or
                create an account.
              </li>
              <li>
                <strong>Simple sharing model</strong> — a 4-character code is
                easy to read aloud, type manually, or paste into any chat. No
                deep links or QR codes required.
              </li>
              <li>
                <strong>Automatic expiry</strong> — even if the recipient never
                opens the message, it is deleted after 24 hours. You do not
                need to remember to clean up.
              </li>
              <li>
                <strong>No registration friction</strong> — the sender and
                recipient both use the tool without creating an account. Open
                the page, type, send.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">
              How to send a burn-after-reading message with Message Shuttle
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-muted-foreground leading-relaxed">
              <li>
                <strong>Write your message.</strong> Open{" "}
                <Link href="/send" className="text-primary underline">
                  msg.shuttlelab.org/send
                </Link>{" "}
                and type or paste the message you want to send into the text
                box.
              </li>
              <li>
                <strong>Click &ldquo;Send Message&rdquo;.</strong> The system
                generates a 4-character uppercase hex pickup code (for
                example, <code className="text-sm bg-muted px-1.5 py-0.5 rounded">A3F1</code>
                ). The code is derived from{" "}
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  crypto.randomUUID()
                </code>{" "}
                and has 65,536 possible combinations.
              </li>
              <li>
                <strong>Share the code.</strong> Use the &ldquo;Share with
                code&rdquo; button to copy the pickup URL and code to your
                clipboard, then paste them into any messaging app. Or just
                tell the recipient the code verbally.
              </li>
              <li>
                <strong>Recipient picks up.</strong> The recipient opens{" "}
                <Link href="/pickup" className="text-primary underline">
                  msg.shuttlelab.org/pickup
                </Link>
                , enters the 4-character code, and clicks
                &ldquo;Confirm&rdquo;. The message content is automatically
                copied to their clipboard and simultaneously deleted from the
                server.
              </li>
            </ol>
            <p className="mt-3 text-muted-foreground leading-relaxed text-sm">
              The entire process takes about 30 seconds. No accounts, no app
              installations, no browser extensions. Works on any device with a
              web browser.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">
              What burn-after-reading does and does NOT protect against
            </h2>
            <dl className="space-y-4">
              <div>
                <dt className="font-semibold mb-1">
                  Protects against: server-side message retention
                </dt>
                <dd className="text-muted-foreground leading-relaxed text-sm">
                  After the recipient reads the message, it is deleted from
                  Cloudflare KV. There is no server-side copy, no backup, and
                  no log of the message content. The{" "}
                  <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                    getAndDelete
                  </code>{" "}
                  operation is atomic.
                </dd>
              </div>
              <div>
                <dt className="font-semibold mb-1">
                  Protects against: forgotten messages lingering indefinitely
                </dt>
                <dd className="text-muted-foreground leading-relaxed text-sm">
                  Every message expires after 24 hours (86,400 seconds) by
                  default. Even if no one reads it, Cloudflare KV removes it
                  automatically.
                </dd>
              </div>
              <div>
                <dt className="font-semibold mb-1">
                  Does NOT protect against: screenshots and screen recording
                </dt>
                <dd className="text-muted-foreground leading-relaxed text-sm">
                  The recipient can take a screenshot, copy the text before it
                  is deleted, photograph their screen, or use screen recording
                  software. No web-based tool can prevent this.
                </dd>
              </div>
              <div>
                <dt className="font-semibold mb-1">
                  Does NOT protect against: server-side access during storage
                </dt>
                <dd className="text-muted-foreground leading-relaxed text-sm">
                  Messages are stored in Cloudflare KV without
                  application-level encryption. While Cloudflare encrypts data
                  at rest, the server can technically read message content
                  during the storage window. Message Shuttle does not log
                  message content, but it is not end-to-end encrypted.
                </dd>
              </div>
              <div>
                <dt className="font-semibold mb-1">
                  Does NOT protect against: brute-force code guessing
                </dt>
                <dd className="text-muted-foreground leading-relaxed text-sm">
                  The 4-character hex code has 65,536 possible combinations.
                  There is no rate limiting on the pickup endpoint in the
                  current version. For highly sensitive content, consider
                  sharing the code through a separate channel from the message
                  link.
                </dd>
              </div>
            </dl>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">
              Message Shuttle vs PrivNote vs OneTimeSecret
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              All three tools follow the same core model: write a message, get
              a link or code, message is deleted after reading. Here are the
              key differences:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed">
              <li>
                <strong>Message Shuttle</strong> — completely free, no signup,
                4-character pickup code, bilingual (Chinese/English), deployed
                on Cloudflare edge. Open source (
                <a
                  href="https://github.com/ShuttleLab/message-shuttle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  GitHub
                </a>
                ).
              </li>
              <li>
                <strong>PrivNote (privnote.com)</strong> — established since
                2010, uses a URL-based model (no separate code). Free tier
                supported by ads. English only. Not open source.
              </li>
              <li>
                <strong>OneTimeSecret (onetimesecret.com)</strong> — open
                source, supports optional passphrase protection. Free tier
                has limits; paid plans available. English only.
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              None of the three offer end-to-end encryption. All rely on
              server-side deletion after reading. Signal&apos;s disappearing
              messages and WhatsApp&apos;s view-once feature provide end-to-end
              encryption but require both parties to install the app and add
              each other as contacts.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">
              Frequently Asked Questions
            </h2>
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
                — create a burn-after-reading message now
              </li>
              <li>
                <Link href="/pickup" className="text-primary underline">
                  Pick Up a Message
                </Link>{" "}
                — have a code? Retrieve your message here
              </li>
              <li>
                <Link
                  href="/tools/send-secret-message"
                  className="text-primary underline"
                >
                  Send a Secret Message
                </Link>{" "}
                — privacy-focused guide for sensitive content
              </li>
              <li>
                <Link href="/about" className="text-primary underline">
                  About Message Shuttle
                </Link>{" "}
                — full FAQ, use cases, and comparison with alternatives
              </li>
            </ul>
          </div>
        </section>
      </article>
    </>
  );
}
