"use client";

import { useState } from 'react';
import { useI18n } from '@/components/i18n-provider';

interface PickupItem {
  id: string;
  content: string;
  metadata?: {
    createdAt?: number;
  };
}

export default function PickupPage() {
  const { t, lang } = useI18n();
  const [pickupCode, setPickupCode] = useState('');
  const [pickupItem, setPickupItem] = useState<PickupItem | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePickup = async () => {
    setError('');
    setPickupItem(null);

    if (!pickupCode.trim()) {
      setError(t.pickup.codeRequired);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/messages/${pickupCode}/retrieve`);
      const data = await response.json() as { success: boolean; error?: string; data?: PickupItem };

      if (!response.ok || !data.success) {
        setError(data.error === 'Message not found' ? t.pickup.notFound : t.pickup.fail);
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
        console.error('复制失败:', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{t.pickup.title}</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">{t.pickup.subtitle}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          {!pickupItem ? (
            <div>
              <div className="mb-4">
                <label htmlFor="pickupCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.pickup.codeLabel}
                </label>
                <input
                  type="text"
                  id="pickupCode"
                  value={pickupCode}
                  onChange={(e) => setPickupCode(e.target.value.toUpperCase())}
                  placeholder={t.pickup.codePlaceholder}
                  maxLength={4}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-center text-xl tracking-widest bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-md text-sm">
                  {error}
                </div>
              )}

              <button
                onClick={handlePickup}
                disabled={loading}
                className="w-full bg-indigo-600 dark:bg-indigo-500 text-white py-3 px-4 rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? t.pickup.confirming : t.pickup.confirm}
              </button>
            </div>
          ) : (
            <div>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{t.pickup.success}</h2>
              </div>

              <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-md p-4 mb-4">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-500 dark:text-indigo-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div className="flex-1">
                    <p className="text-sm text-indigo-600 dark:text-indigo-400 mb-1">{t.pickup.contentLabel}</p>
                    <p className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap">{pickupItem.content}</p>
                  </div>
                </div>
              </div>

              {pickupItem.metadata?.createdAt && (
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-6">
                  <span>{t.pickup.createdAt}: {new Date(pickupItem.metadata.createdAt).toLocaleString(lang === 'zh' ? 'zh-CN' : 'en-US')}</span>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => copyToClipboard(pickupItem.content)}
                  className="flex-1 bg-indigo-600 dark:bg-indigo-500 text-white py-2.5 px-4 rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 font-medium flex items-center justify-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  {copied ? t.pickup.copied : t.pickup.copyContent}
                </button>
                <button
                  onClick={() => {
                    setPickupItem(null);
                    setPickupCode('');
                    setCopied(false);
                  }}
                  className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 py-2.5 px-4 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 font-medium"
                >
                  {t.pickup.continue}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
