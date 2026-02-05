"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useI18n } from "@/components/i18n-provider";

export default function SendPage() {
  const { t } = useI18n();
  const [message, setMessage] = useState("");
  const [pickupCode, setPickupCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSend = async () => {
    if (!message.trim()) {
      setError(t.send.errorRequired);
      return;
    }

    setLoading(true);
    setError("");
    setPickupCode("");

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: message,
          expirationTtl: 86400,
        }),
      });

      const data = (await response.json()) as {
        success: boolean;
        error?: string;
        data?: { id: string };
      };

      if (!response.ok || !data.success) {
        throw new Error(data.error || t.send.sendFailed);
      }

      setPickupCode(data.data!.id);
      setMessage("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : t.send.sendFailedRetry
      );
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (pickupCode) {
      try {
        await navigator.clipboard.writeText(pickupCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("复制失败:", err);
      }
    }
  };

  const handleShare = async () => {
    if (pickupCode) {
      try {
        const shareText = `${t.send.shareUrlLabel}：${window.location.origin}/pickup\n${t.send.shareCodeLabel}：${pickupCode}`;
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("转发失败:", err);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-foreground mb-8">{t.send.title}</h1>

      <Card>
        <CardContent className="pt-6">
          <div className="mb-6">
            <Label htmlFor="message" className="mb-2 block">
              {t.send.label}
            </Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t.send.placeholder}
              rows={6}
              className="resize-none"
            />
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-lg border border-destructive/50 bg-destructive/10 text-destructive text-sm">
              {error}
            </div>
          )}

          {pickupCode && (
            <div className="mb-6 p-4 rounded-lg border bg-muted/50">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {t.send.pickupCode}
                  </p>
                  <p className="text-3xl font-bold text-foreground tracking-wider">
                    {pickupCode}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Button onClick={copyToClipboard} variant="outline">
                    {copied ? t.send.copied : t.send.copyCode}
                  </Button>
                  <Button onClick={handleShare}>
                    {copied ? t.send.shareCopied : t.send.share}
                  </Button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                💡 {t.send.shareHint}
              </p>
            </div>
          )}

          {!pickupCode && (
            <Button
              onClick={handleSend}
              className="w-full"
              size="lg"
              disabled={loading}
            >
              {loading ? t.send.sending : t.send.send}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
