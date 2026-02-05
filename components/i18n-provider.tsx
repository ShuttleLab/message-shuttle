"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { translations, type Language } from "@/lib/i18n";

interface I18nContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  toggle: () => void;
  t: typeof translations["zh"];
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("zh");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? (localStorage.getItem("lang") as Language | null) : null;
    if (stored === "zh" || stored === "en") {
      setLangState(stored);
    }
  }, []);

  const setLang = (next: Language) => {
    setLangState(next);
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", next);
      document.documentElement.lang = next === "zh" ? "zh" : "en";
    }
  };

  const toggle = () => setLang(lang === "zh" ? "en" : "zh");

  const value = useMemo<I18nContextValue>(() => ({
    lang,
    setLang,
    toggle,
    t: translations[lang],
  }), [lang, toggle]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
