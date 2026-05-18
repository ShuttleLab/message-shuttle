import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import VibeKanbanWrapper from "@/components/vibe-kanban-wrapper";
import { I18nProvider } from "@/components/i18n-provider";
import { ThemeSync } from "@/components/theme-sync";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fdf2f8" },
    { media: "(prefers-color-scheme: dark)", color: "#2a0a1a" },
  ],
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Message Shuttle",
  applicationCategory: "WebApplication",
  operatingSystem: "Web",
  description: "Secure, private and easy message delivery service.",
  url: "https://msg.shuttlelab.org",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export const metadata: Metadata = {
  metadataBase: new URL("https://msg.shuttlelab.org"),
  title: "消息穿梭机 | Message Shuttle",
  description: "安全、私密、便捷的消息传递服务 | Secure, private and easy message delivery",
  alternates: {
    canonical: "/",
  },
  // verification: {
  //   google: "<paste-google-search-console-verification-code-here>",
  // },
  openGraph: {
    title: "消息穿梭机 | Message Shuttle",
    description: "安全、私密、便捷的消息传递服务 | Secure, private and easy message delivery",
    siteName: "Message Shuttle",
    type: "website",
    locale: "zh_CN",
    alternateLocale: ["en_US"],
  },
  twitter: {
    card: "summary_large_image",
    title: "消息穿梭机 | Message Shuttle",
    description: "安全、私密、便捷的消息传递服务 | Secure, private and easy message delivery",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeSync />
        <I18nProvider>
          <VibeKanbanWrapper />
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}