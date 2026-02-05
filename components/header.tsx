"use client";

import Link from 'next/link';
import { useI18n } from "@/components/i18n-provider";

export default function Header() {
  const { t, toggle, lang } = useI18n();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {t.common.appName}
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 font-medium">
                    {t.common.sendReceive}
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
                    {t.common.about}
                  </Link>
                </li>
              </ul>
            </nav>
            <button
              type="button"
              onClick={toggle}
              className="inline-flex items-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 shadow-sm"
            >
              {lang === 'zh' ? '中 / EN' : 'EN / 中'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}