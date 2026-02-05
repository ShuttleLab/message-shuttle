"use client";

import { useState } from 'react';
import Button from '@/components/ui/button';
import { useI18n } from '@/components/i18n-provider';

export default function SendPage() {
  const { t } = useI18n();
  const [message, setMessage] = useState('');
  const [pickupCode, setPickupCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSend = async () => {
    if (!message.trim()) {
      setError(t.send.errorRequired);
      return;
    }

    setLoading(true);
    setError('');
    setPickupCode('');

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: message,
          expirationTtl: 86400,
        }),
      });

      const data = await response.json() as { success: boolean; error?: string; data?: { id: string } };

      if (!response.ok || !data.success) {
        throw new Error(data.error || t.send.sendFailed);
      }

      setPickupCode(data.data!.id);
      setMessage('');
    } catch (err) {
      setError(err instanceof Error ? err.message : t.send.sendFailedRetry);
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
        console.error('复制失败:', err);
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
        console.error('转发失败:', err);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{t.send.title}</h1>
      
      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t.send.label}
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t.send.placeholder}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            rows={6}
          />
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {pickupCode && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800 mb-1">{t.send.pickupCode}</p>
                <p className="text-3xl font-bold text-green-600 tracking-wider">{pickupCode}</p>
              </div>
              <div className="flex flex-col gap-2">
                <Button onClick={copyToClipboard} variant="outline">
                  {copied ? t.send.copied : t.send.copyCode}
                </Button>
                <Button onClick={handleShare} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                  {copied ? t.send.shareCopied : t.send.share}
                </Button>
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-3">
              💡 {t.send.shareHint}
            </p>
          </div>
        )}

        {!pickupCode && (
          <Button onClick={handleSend} className="w-full" size="lg" disabled={loading}>
            {loading ? t.send.sending : t.send.send}
          </Button>
        )}
      </div>
    </div>
  );
}
