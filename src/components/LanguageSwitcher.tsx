"use client";

import React, {useEffect, useRef, useState} from "react";
import { useI18n } from "@/lib/client/i18nContext";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const { list, lang, setLang, locales } = useI18n();

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
        aria-label="Language"
        onClick={() => setOpen(v => !v)}
        className="h-11 w-11 flex items-center justify-center rounded-full text-white
                   bg-gradient-to-b from-white/30 to-white/10 dark:from-white/15 dark:to-white/5
                   border border-white/30 dark:border-white/15 shadow-lg
                   hover:from-white/40 hover:to-white/20"
      >
        <Globe size={18}/>
      </button>

      {open && (
        <div
          className="absolute left-1/2 -translate-x-1/2 mt-2 z-50 min-w-48
                     rounded-2xl border border-white/30 dark:border-white/10
                     bg-white/85 dark:bg-neutral-900/85 backdrop-blur-2xl shadow-2xl p-1.5"
        >
          {list.map(l => {
            const selected = l.code === lang;
            const label = locales[l.code]?.name ?? l.name;
            return (
              <button
                key={l.code}
                onClick={() => { setLang(l.code); setOpen(false); }}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-neutral-800 dark:text-neutral-200
                  hover:bg-black/5 dark:hover:bg-white/5 ${selected ? "bg-gradient-to-r from-violet-500/15 to-fuchsia-500/15" : ""}`}
              >
                <span className="flex-1 text-left">{label}</span>
                {selected && <span className="h-2 w-2 rounded-full bg-violet-500" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
