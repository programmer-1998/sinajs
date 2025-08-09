"use client";

import React, {useEffect, useRef, useState} from "react";
import { useI18n } from "@/lib/client/i18nContext";
import { useThemeCtx } from "@/lib/client/themeContext";
import { Moon, SunMedium, Monitor } from "lucide-react";

export default function ThemeSwitcher() {
  const { t } = useI18n();
  const { list, themeKey, setThemeKey } = useThemeCtx();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const safeKey = mounted ? themeKey : "system";

  const options = [
    { key: "system", label: t("theme_system"), icon: <Monitor size={16}/> },
    { key: "light",  label: t("theme_light"),  icon: <SunMedium size={16}/> },
    { key: "dark",   label: t("theme_dark"),   icon: <Moon size={16}/> },
    ...list.filter(x => !["light","dark"].includes(x.key)).map(x => ({ key: x.key, label: x.name, icon: <Monitor size={16}/> }))
  ];

  const triggerIcon =
    safeKey === "dark" ? <Moon size={18}/> : safeKey === "light" ? <SunMedium size={18}/> : <Monitor size={18}/>;

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        aria-label="Theme"
        onClick={() => setOpen(v => !v)}
        className="h-11 w-11 flex items-center justify-center rounded-full text-white
                   bg-gradient-to-b from-white/30 to-white/10 dark:from-white/15 dark:to-white/5
                   border border-white/30 dark:border-white/15 shadow-lg
                   hover:from-white/40 hover:to-white/20"
      >
        {triggerIcon}
      </button>

      {open && (
        <div
          className="absolute left-1/2 -translate-x-1/2 mt-2 z-50 min-w-48
                     rounded-2xl border border-white/30 dark:border-white/10
                     bg-white/85 dark:bg-neutral-900/85 backdrop-blur-2xl shadow-2xl p-1.5"
        >
          {options.map(o => {
            const selected = o.key === themeKey;
            return (
              <button
                key={o.key}
                onClick={() => { setThemeKey(String(o.key)); setOpen(false); }}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-neutral-800 dark:text-neutral-200
                  hover:bg-black/5 dark:hover:bg-white/5 ${selected ? "bg-gradient-to-r from-violet-500/15 to-fuchsia-500/15" : ""}`}
              >
                <span className="shrink-0">{o.icon}</span>
                <span className="flex-1 text-left">{o.label}</span>
                {selected && <span className="h-2 w-2 rounded-full bg-violet-500" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
