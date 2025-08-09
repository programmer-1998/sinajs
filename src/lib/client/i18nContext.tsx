"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Dir, LocaleFile, LocaleMeta } from "@/utils/types";
import { APP_CONFIG } from "@/config/app.config";

type I18nValue = {
  lang: string;
  dir: Dir;
  locales: Record<string, LocaleFile>;
  list: LocaleMeta[];
  t: (key: string, vars?: Record<string, string>) => string;
  setLang: (code: string) => void;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({
  children,
  initialLocales,
  initialList,
  initialLang,               // ← جدید
}: {
  children: React.ReactNode;
  initialLocales: Record<string, LocaleFile>;
  initialList: LocaleMeta[];
  initialLang: string;       // ← جدید
}) {
  // به جای localStorage، از مقدار سرور شروع کن
  const [lang, setLang] = useState<string>(initialLang);

  // بعد از mount از localStorage سینک کن
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem(APP_CONFIG.storageKeys.lang);
    if (saved && saved !== lang) setLang(saved);
  // فقط یکبار کافیست:
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // هر بار تغییر زبان → html[lang/dir] و ذخیره در localStorage
  const dir: Dir = initialLocales[lang]?.dir || "ltr";
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("lang", lang);
      document.documentElement.setAttribute("dir", dir);
    }
    if (typeof window !== "undefined") {
      localStorage.setItem(APP_CONFIG.storageKeys.lang, lang);
    }
  }, [lang, dir]);

  const value = useMemo<I18nValue>(() => {
    const strings = initialLocales[lang]?.strings || {};
    const t = (key: string, vars?: Record<string, string>) => {
      let out = strings[key] ?? key;
      if (vars) for (const [k, v] of Object.entries(vars)) out = out.replace(new RegExp(`\\{${k}\\}`, "g"), v);
      return out;
    };
    return { lang, dir, locales: initialLocales, list: initialList, t, setLang };
  }, [lang, dir, initialLocales, initialList]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
