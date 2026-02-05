"use client";

import Link from "next/link";
import { useI18n } from "@/components/i18n-provider";
import { Button } from "@/components/ui/button";

export default function Header() {
  const { t, toggle, lang } = useI18n();

  return (
    <header className="bg-card border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-foreground">
              {t.common.appName}
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <Link href="/" className="text-muted-foreground hover:text-foreground font-medium transition-colors">
                    {t.common.sendReceive}
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                    {t.common.about}
                  </Link>
                </li>
              </ul>
            </nav>
            <Button type="button" variant="outline" size="sm" onClick={toggle}>
              {lang === "zh" ? "中 / EN" : "EN / 中"}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
