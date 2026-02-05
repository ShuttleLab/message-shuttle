"use client";

import { useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PickupItem {
  id: string;
  content: string;
  metadata?: {
    createdAt?: number;
  };
}

export default function PickupPage() {
  const { t, lang } = useI18n();
  const [pickupCode, setPickupCode] = useState("");
  const [pickupItem, setPickupItem] = useState<PickupItem | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePickup = async () => {
    setError("");
    setPickupItem(null);

    if (!pickupCode.trim()) {
      setError(t.pickup.codeRequired);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/messages/${pickupCode}/retrieve`);
      const data = (await response.json()) as {
        success: boolean;
        error?: string;
        data?: PickupItem;
      };

      if (!response.ok || !data.success) {
        setError(
          data.error === "Message not found" ? t.pickup.notFound : t.pickup.fail
        );
        return;
      }

      setPickupItem(data.data!);
      copyToClipboard(data.data!.content);
    } catch {
      setError(t.pickup.fail);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("复制失败:", err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">{t.pickup.title}</h1>
          <p className="mt-2 text-muted-foreground">{t.pickup.subtitle}</p>
        </div>

        <Card>
          <CardContent className="pt-6">
            {!pickupItem ? (
              <div>
                <div className="mb-4">
                  <Label htmlFor="pickupCode" className="mb-2 block">
                    {t.pickup.codeLabel}
                  </Label>
                  <Input
                    type="text"
                    id="pickupCode"
                    value={pickupCode}
                    onChange={(e) =>
                      setPickupCode(e.target.value.toUpperCase())
                    }
                    placeholder={t.pickup.codePlaceholder}
                    maxLength={4}
                    className="text-center text-xl tracking-widest h-12"
                  />
                </div>

                {error && (
                  <div className="mb-4 p-3 rounded-md border border-destructive/50 bg-destructive/10 text-destructive text-sm">
                    {error}
                  </div>
                )}

                <Button
                  onClick={handlePickup}
                  disabled={loading}
                  className="w-full h-12"
                >
                  {loading ? t.pickup.confirming : t.pickup.confirm}
                </Button>
              </div>
            ) : (
              <div>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-success/20 text-success">
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">
                    {t.pickup.success}
                  </h2>
                </div>

                <div className="rounded-md border border-success/30 bg-success/5 p-4 mb-4">
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-success mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-muted-foreground mb-1">
                        {t.pickup.contentLabel}
                      </p>
                      <p className="text-foreground whitespace-pre-wrap">
                        {pickupItem.content}
                      </p>
                    </div>
                  </div>
                </div>

                {pickupItem.metadata?.createdAt && (
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
                    <span>
                      {t.pickup.createdAt}:{" "}
                      {new Date(pickupItem.metadata.createdAt).toLocaleString(
                        lang === "zh" ? "zh-CN" : "en-US"
                      )}
                    </span>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button
                    onClick={() => copyToClipboard(pickupItem.content)}
                    className="flex-1"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                      />
                    </svg>
                    {copied ? t.pickup.copied : t.pickup.copyContent}
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setPickupItem(null);
                      setPickupCode("");
                      setCopied(false);
                    }}
                    className="flex-1"
                  >
                    {t.pickup.continue}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
