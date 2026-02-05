"use client";

import { useI18n } from "@/components/i18n-provider";
import { SupportDonateButton } from "@/components/support-donate";
import { ShareButton } from "@/components/share-button";

export default function AboutContent() {
  const { t } = useI18n();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.about.heroTitle}</h1>
        <p className="text-xl text-gray-600">
          {t.about.heroSubtitle}
        </p>
      </div>

      {/* 服务介绍 */}
      <div className="bg-white shadow rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t.about.serviceTitle}</h2>
        <p className="text-gray-600 mb-4">
          {t.about.serviceP1}
        </p>
        <p className="text-gray-600">
          {t.about.serviceP2}
        </p>
      </div>

      {/* 安全特性 */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 ml-4">{t.about.fast}</h3>
          </div>
          <p className="text-gray-600">
            {t.about.fastDesc}
          </p>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 ml-4">{t.about.safe}</h3>
          </div>
          <p className="text-gray-600">
            {t.about.safeDesc}
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 ml-4">{t.about.privacy}</h3>
          </div>
          <p className="text-gray-600">
            {t.about.privacyDesc}
          </p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 ml-4">{t.about.ttl}</h3>
          </div>
          <p className="text-gray-600">
            {t.about.ttlDesc}
          </p>
        </div>
      </div>

      {/* 使用场景 */}
      <div className="bg-white shadow rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t.about.useCases}</h2>
        <ul className="space-y-3 text-gray-600">
          <li className="flex items-start">
            <span className="text-indigo-500 mr-3">✓</span>
            {t.about.use1}
          </li>
          <li className="flex items-start">
            <span className="text-indigo-500 mr-3">✓</span>
            {t.about.use2}
          </li>
          <li className="flex items-start">
            <span className="text-indigo-500 mr-3">✓</span>
            {t.about.use3}
          </li>
          <li className="flex items-start">
            <span className="text-indigo-500 mr-3">✓</span>
            {t.about.use4}
          </li>
        </ul>
      </div>

      {/* 支持我们 */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-8 text-white">
        <h2 className="text-2xl font-semibold mb-4">{t.about.supportTitle}</h2>
        <p className="mb-6 text-indigo-100">
          {t.about.supportDesc}
        </p>
        <div className="flex flex-wrap gap-4">
          <SupportDonateButton />
          <ShareButton />
        </div>
      </div>

      {/* 联系方式 */}
      <div className="mt-8 text-center text-gray-500">
        <p>{t.about.contactDesc}</p>
        <p className="mt-2">
          {t.about.contactEmail}：
          <a
            href="mailto:a.tiling120@slmail.me"
            className="text-indigo-600 hover:text-indigo-700 underline underline-offset-4"
          >
            a.tiling120@slmail.me
          </a>
        </p>
      </div>
    </div>
  );
}
