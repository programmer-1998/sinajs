"use client";

import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { I18nProvider } from "@/lib/client/i18nContext";
import { ThemeProvider } from "@/lib/client/themeContext";
import type { LocaleFile, LocaleMeta, ThemeFile, ThemeMeta } from "@/utils/types";

export default function Providers({
  children,
  locales,
  localeList,
  themes,
  themeList,
  initialLang,                         // ← جدید
}: {
  children: React.ReactNode;
  locales: Record<string, LocaleFile>;
  localeList: LocaleMeta[];
  themes: Record<string, ThemeFile>;
  themeList: ThemeMeta[];
  initialLang: string;                 // ← جدید
}) {
  return (
    <NextUIProvider>
      <ThemeProvider initialThemes={themes} initialList={themeList}>
        <I18nProvider
          initialLocales={locales}
          initialList={localeList}
          initialLang={initialLang}     // ← پاس بده
        >
          {children}
        </I18nProvider>
      </ThemeProvider>
    </NextUIProvider>
  );
}
