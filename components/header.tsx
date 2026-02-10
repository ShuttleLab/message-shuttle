"use client";

import Link from "next/link";
import { Github } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { Button } from "@/components/ui/button";

const GITHUB_URL = "https://github.com/ShuttleLab/message-shuttle";

export default function Header() {
  const { t, toggle, lang } = useI18n();

  return (
    <header className="bg-card border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="https://shuttlelab.org" target="_blank" className="text-xl font-bold text-foreground">
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
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center"
              aria-label="GitHub"
            >
              <Github className="size-5" />
            </a>
            <Button type="button" variant="outline" size="sm" onClick={toggle}>
              {lang === "zh" ? "中 / EN" : "EN / 中"}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
