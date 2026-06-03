"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";

export default function PrivacyPage() {
  const { lang } = useI18n();
  const zh = lang === "zh";
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8"
      >
        <ArrowLeft className="size-4" />
        {zh ? "返回首页" : "Back to Home"}
      </Link>
      <h1 className="text-3xl font-bold mb-6">
        {zh ? "隐私政策" : "Privacy Policy"}
      </h1>
      <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground space-y-4">
        <p>{zh ? "最后更新：2026 年 5 月" : "Last updated: May 2026"}</p>

        <h2 className="text-foreground">
          {zh ? "1. 我们如何处理你的消息" : "1. How we handle your messages"}
        </h2>
        <p>
          {zh
            ? "消息穿梭机是一个临时消息传递工具，支持阅后即焚。你发送的消息会通过加密连接传输到服务器，并在接收者阅读后自动删除。我们不会查看、分析或长期存储你的消息内容。"
            : "Message Shuttle is a temporary message transfer tool supporting burn-after-reading. Your messages are transmitted to the server over an encrypted connection and automatically deleted after being read by the recipient. We never view, analyze, or permanently store your message content."}
        </p>

        <h2 className="text-foreground">
          {zh ? "2. 数据保留" : "2. Data retention"}
        </h2>
        <p>
          {zh
            ? "消息有 24 小时的自动过期时间，到期后自动删除。接收者阅读消息后也会立即删除。消息 ID 不与任何用户身份关联。"
            : "Messages have a 24-hour auto-expiry and are deleted automatically. Messages are also deleted immediately after being read by the recipient. Message IDs are not associated with any user identity."}
        </p>

        <h2 className="text-foreground">
          {zh ? "3. 无追踪、无 Cookie" : "3. No tracking, no cookies"}
        </h2>
        <p>
          {zh
            ? "我们不使用 Cookie，不嵌入第三方分析或追踪脚本。"
            : "We don't use cookies and don't embed any third-party analytics or tracking scripts."}
        </p>

        <h2 className="text-foreground">
          {zh ? "4. 第三方服务" : "4. Third-party services"}
        </h2>
        <p>
          {zh
            ? "网站托管在 Cloudflare Pages 上，消息存储在 Cloudflare KV 中。Cloudflare 会按其隐私政策记录基础的访问日志（如 IP、UA），用于安全与可用性保护。"
            : "The site is hosted on Cloudflare Pages, with messages stored in Cloudflare KV. Cloudflare records basic access logs (IP, UA) per its own privacy policy, used for security and reliability."}
        </p>

        <h2 className="text-foreground">
          {zh ? "5. 联系我们" : "5. Contact"}
        </h2>
        <p>
          {zh ? "隐私相关问题请联系：" : "For privacy inquiries, contact:"}{" "}
          <a href="mailto:support@shuttlelab.org" className="text-primary">
            support@shuttlelab.org
          </a>
        </p>
      </div>
    </div>
  );
}