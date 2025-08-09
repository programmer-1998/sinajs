"use client";

import ControlBar from "@/components/ControlBar";
import { useI18n } from "@/lib/client/i18nContext";
import { Link } from "@nextui-org/react";

export default function HomePage() {
  const { t } = useI18n();
  const title = t("hello_line", { name: t("author_name") });

  return (
    <main className="min-h-dvh flex items-center justify-center p-6">
      {/* آیکون‌ها بالا-وسط */}
      

      {/* تیتر بزرگ، وسطِ وسط، سفید و لینک‌دار */}
      <Link isExternal href="https://github.com/programmer-1998" className="no-underline">
        <h1 suppressHydrationWarning className="text-white text-center text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight hover:opacity-90 transition-opacity">
          {title}
        </h1>
      </Link>
    </main>
  );
}