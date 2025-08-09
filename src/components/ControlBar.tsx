"use client";

import React from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function ControlBar() {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-3 rounded-full border border-white/25 dark:border-white/10
                      bg-white/60 dark:bg-neutral-900/60 backdrop-blur-2xl shadow-2xl px-3 py-2">
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>
    </div>
  );
}
