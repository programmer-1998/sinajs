"use client";

import { useEffect } from "react";
import { useTheme as useNextTheme } from "next-themes";
import { useThemeCtx } from "@/lib/client/themeContext";

export default function ThemeVarsBridge() {
  const { themes, themeKey } = useThemeCtx();
  const { resolvedTheme } = useNextTheme(); // "light" | "dark"

  useEffect(() => {
    const active = themeKey === "system" ? (resolvedTheme ?? "light") : themeKey;
    const colors = themes[active]?.colors || {};
    const root = document.documentElement;

    // همه‌ی کلیدها رو به --var تبدیل کن (بدون تکرار دستی)
    for (const [k, v] of Object.entries(colors)) {
      root.style.setProperty(`--${k}`, String(v));
    }

    // اگر accent هگز بود، نسخه‌ی RGB برای گرادینت بده
    const hex = String(colors.accent || "");
    const m = /^#?([0-9a-f]{6}|[0-9a-f]{3})$/i.exec(hex);
    if (m) {
      const c = hex.replace("#", "");
      const x = c.length === 3 ? c.split("").map(ch => ch + ch).join("") : c;
      const n = parseInt(x, 16);
      root.style.setProperty("--tint-rgb", `${(n>>16)&255}, ${(n>>8)&255}, ${n&255}`);
    }
  }, [themes, themeKey, resolvedTheme]);

  return null;
}
