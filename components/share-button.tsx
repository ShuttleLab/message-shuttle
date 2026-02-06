"use client";

import { useState } from "react";
import { Share2 } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { Button } from "@/components/ui/button";

export function ShareButton() {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      const url = window.location.origin;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("复制失败:", err);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="lg"
      onClick={handleShare}
      className="border-2 border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground/10 text-base font-semibold transition-colors duration-200"
    >
      <Share2 className="size-5 mr-2" />
      {copied ? t.share.copied : t.share.share}
    </Button>
  );
}
