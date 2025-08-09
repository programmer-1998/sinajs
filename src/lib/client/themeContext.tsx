"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from "next-themes";
import { ThemeFile, ThemeMeta } from "@/utils/types";
import { APP_CONFIG } from "@/config/app.config";

type ThemeCtxValue = {
  themeKey: "system" | string; // system | light | dark | custom...
  setThemeKey: (key: string) => void;
  list: ThemeMeta[];            // از فایل‌ها
  themes: Record<string, ThemeFile>;
  colors: Record<string, string>; // رنگ‌های تم فعال
};

const ThemeCtx = createContext<ThemeCtxValue | null>(null);

function InnerThemeProvider({
  children,
  initialThemes,
  initialList,
}: {
  children: React.ReactNode;
  initialThemes: Record<string, ThemeFile>;
  initialList: ThemeMeta[];
}) {
  const { setTheme } = useNextTheme();
  const [themeKey, setThemeKeyState] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(APP_CONFIG.storageKeys.theme) || APP_CONFIG.defaultTheme;
    }
    return APP_CONFIG.defaultTheme;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(APP_CONFIG.storageKeys.theme, themeKey);
    }
    // If it's one of "light" or "dark" or "system", also notify next-themes:
    if (["light", "dark", "system"].includes(themeKey)) {
      setTheme(themeKey as "light" | "dark" | "system");
    } else {
      // custom theme classes/colors می‌تونی بعداً اضافه کنی
      setTheme("light"); // fallback
    }
  }, [themeKey, setTheme]);

  const colors = useMemo(() => {
    const k = ["system"].includes(themeKey) ? undefined : themeKey;
    if (!k) return {}; // وقتی system هستیم، NextThemes کلاس dark/light رو می‌گذاره
    return initialThemes[k]?.colors || {};
  }, [themeKey, initialThemes]);

  const value = useMemo<ThemeCtxValue>(() => ({
    themeKey: themeKey as any,
    setThemeKey: setThemeKeyState,
    list: initialList,
    themes: initialThemes,
    colors,
  }), [themeKey, initialList, initialThemes, colors]);

  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

export function ThemeProvider({
  children,
  initialThemes,
  initialList,
}: {
  children: React.ReactNode;
  initialThemes: Record<string, ThemeFile>;
  initialList: ThemeMeta[];
}) {
  return (
    <NextThemesProvider attribute="class" defaultTheme={APP_CONFIG.defaultTheme}>
      <InnerThemeProvider initialThemes={initialThemes} initialList={initialList}>
        {children}
      </InnerThemeProvider>
    </NextThemesProvider>
  );
}

export function useThemeCtx() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useThemeCtx must be used within ThemeProvider");
  return ctx;
}

