"use client";

import Link from 'next/link';
import { useI18n } from '@/components/i18n-provider';

export default function Home() {
  const { t } = useI18n();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t.home.title}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">{t.home.subtitle}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Link href="/send" className="block group">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-8 hover:shadow-lg transition-shadow border-2 border-transparent hover:border-indigo-500 dark:border-gray-700 dark:hover:border-indigo-500">
            <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 dark:bg-indigo-900/50 rounded-full mb-6 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800/50 transition-colors">
              <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">{t.home.sendTitle}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{t.home.sendDesc}</p>
            <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-medium">
              {t.home.sendCta}
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Link>

        <Link href="/pickup" className="block group">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-8 hover:shadow-lg transition-shadow border-2 border-transparent hover:border-indigo-500 dark:border-gray-700 dark:hover:border-indigo-500">
            <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 dark:bg-indigo-900/50 rounded-full mb-6 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800/50 transition-colors">
              <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">{t.home.recvTitle}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{t.home.recvDesc}</p>
            <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-medium">
              {t.home.recvCta}
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}