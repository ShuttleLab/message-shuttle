"use client";

import Image from "next/image";
import { useState } from "react";
import { useI18n } from "@/components/i18n-provider";

export function SupportDonateButton() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-colors shadow-sm"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        {t.donate.donate}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" role="dialog" aria-modal="true">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{t.donate.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{t.donate.desc}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="关闭"
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="border border-gray-200 rounded-lg p-3">
                <p className="font-medium text-gray-800 mb-2 text-sm">{t.donate.wechat}</p>
                <div className="relative mx-auto h-40 w-40">
                  <Image
                    src="/wechat-qr.png"
                    alt="微信收款码"
                    fill
                    sizes="160px"
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-3">
                <p className="font-medium text-gray-800 mb-2 text-sm">{t.donate.alipay}</p>
                <div className="relative mx-auto h-40 w-40">
                  <Image
                    src="/alipay-qr.png"
                    alt="支付宝收款码"
                    fill
                    sizes="160px"
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-3">
                <p className="font-medium text-gray-800 mb-2 text-sm">{t.donate.paypal}</p>
                <div className="relative mx-auto h-40 w-40">
                  <Image
                    src="/paypal-qr.png"
                    alt="PayPal 收款码"
                    fill
                    sizes="160px"
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                {t.donate.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
