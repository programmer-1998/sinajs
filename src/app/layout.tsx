import type { Metadata } from "next";
import "./globals.css";

import Providers from "./providers";
import { loadAllLocales, getLocaleList } from "@/lib/server/loadLocales";
import { loadAllThemes, getThemeList } from "@/lib/server/loadThemes";
import ControlBar from "@/components/ControlBar";

export const metadata: Metadata = {
  title: "SinaJS",
  description: "SinaJS starter by Sina Khanzadeh",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locales = await loadAllLocales();
  const localeList = await getLocaleList();
  const themes = await loadAllThemes();
  const themeList = await getThemeList();

  const initialLang = "en";
  const initialDir = "ltr";

  return (
    <html lang={initialLang} dir={initialDir} suppressHydrationWarning>
    <body className="min-h-dvh antialiased">
        <Providers
          locales={locales}
          localeList={localeList}
          themes={themes}
          themeList={themeList}
          initialLang={initialLang}     // ← اینجا
        >
          <ControlBar />    {/* ← نوار آیکون‌ها اینجاست */}
          {children}
        </Providers>
      </body>
    </html>
  );
}
