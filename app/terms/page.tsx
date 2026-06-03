"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";

export default function TermsPage() {
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
        {zh ? "服务条款" : "Terms of Service"}
      </h1>
      <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground space-y-4">
        <p>{zh ? "最后更新：2026 年 5 月" : "Last updated: May 2026"}</p>

        <h2 className="text-foreground">
          {zh ? "1. 服务说明" : "1. Service description"}
        </h2>
        <p>
          {zh
            ? "消息穿梭机是一个免费的临时消息传递工具，支持阅后即焚功能。本工具按「现状」提供，不对传输的完整性或可靠性作出保证。"
            : "Message Shuttle is a free temporary message transfer tool with burn-after-reading functionality. The service is provided \"as is\" without warranties of completeness or reliability."}
        </p>

        <h2 className="text-foreground">
          {zh ? "2. 用户责任" : "2. User responsibilities"}
        </h2>
        <p>
          {zh
            ? "请仅发送你拥有合法权利处理的内容。请勿使用本工具发送违法、有害或侵权的消息。你应对通过本工具发送的所有消息负责。"
            : "Only send content you have the legal right to handle. Do not use this tool to send illegal, harmful, or infringing messages. You are responsible for all messages sent through this tool."}
        </p>

        <h2 className="text-foreground">
          {zh ? "3. 免责声明" : "3. Disclaimer"}
        </h2>
        <p>
          {zh
            ? "本工具不对因使用本服务而产生的任何直接或间接损失负责，包括但不限于因消息传递失败或数据丢失而产生的损失。"
            : "We are not liable for any direct or indirect damages arising from the use of the service, including but not limited to losses caused by failed message delivery or data loss."}
        </p>

        <h2 className="text-foreground">
          {zh ? "4. 条款变更" : "4. Changes"}
        </h2>
        <p>
          {zh
            ? "我们保留随时更新本条款的权利。继续使用本服务即视为接受更新后的条款。"
            : "We reserve the right to update these terms. Continued use of the service constitutes acceptance of the updated terms."}
        </p>

        <h2 className="text-foreground">
          {zh ? "5. 联系我们" : "5. Contact"}
        </h2>
        <p>
          <a href="mailto:support@shuttlelab.org" className="text-primary">
            support@shuttlelab.org
          </a>
        </p>
      </div>
    </div>
  );
}