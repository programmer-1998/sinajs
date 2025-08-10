
# SinaJS — Frontend Starter (Next.js + TypeScript + Tailwind)

A batteries-included starter kit to kick off web apps fast — opinionated, clean, and extensible.

- **Next.js (App Router) + TypeScript**
- **Tailwind CSS** (utility-first, dark-mode via class)
- **i18n via JSON** (RTL/LTR aware)
- **Themes via JSON** (light/dark by default, add more in minutes)
- **Axios API service** (pre-configured, with example)
- **Icon-only Theme/Language switchers** (options auto-populate from your JSON files)
- **CSS variables that match your JSON keys** (e.g., `--bg`, `--fg`, `--accent`)

---

## Table of Contents
- [Why SinaJS](#why-sinajs)
- [Quick Start](#quick-start)
- [Scripts / CLI](#scripts--cli)
- [Requirements](#requirements)
- [Project Structure](#project-structure)
- [Files You Usually Don’t Need to Touch](#files-you-usually-dont-need-to-touch)
- [What You WILL Edit Most](#what-you-will-edit-most)
- [Internationalization (Locales)](#internationalization-locales)
- [Theming (Colors from JSON)](#theming-colors-from-json)
- [Using Theme Colors in CSS](#using-theme-colors-in-css)
- [API Service (Axios)](#api-service-axios)
- [Design System & UI](#design-system--ui)
- [Roadmap](#roadmap)
- [Author & Contact](#author--contact)
- [License](#license)

---

## Why SinaJS
- **Same skeleton every time** → no more boilerplate wiring.
- **JSON-driven content** → drop a new locale or theme file and the UI picks it up.
- **RTL/LTR aware** → set `dir` in locale JSON and the whole app flips correctly.
- **Tailwind-first** styling with tiny, reusable UI pieces.

---

## Quick Start

```bash
# Scaffold a new project
npx create-sina-web my-project

cd my-project

# Develop
sina dev

# Build for production
sina build

# Start production server
sina start
```

> Prefer npm scripts? Use the standard Next.js scripts instead:
>
> ```bash
> npm run dev
> npm run build
> npm run start
> ```

---

## Scripts / CLI

- `sina dev` → run the dev server (alias of `next dev`).
- `sina build` → build the app (alias of `next build`).
- `sina start` → run production server (alias of `next start`).

These shortcuts are provided so your workflow stays consistent across projects.

---

## Requirements

- **Node.js 18+** (recommended 20+)
- **npm** (or `pnpm`/`yarn`, but examples use npm)
- A modern browser for dev

---

## Project Structure

```
sina-js/
├─ app/
│  ├─ layout.tsx           # HTML shell + providers (theme, i18n)
│  ├─ page.tsx             # Landing page (link + toggles)
│  └─ globals.css          # Tailwind + global CSS variables
│
├─ src/
│  ├─ components/
│  │  ├─ ControlBar.tsx        # Top-center dock for toggles
│  │  ├─ LanguageSwitcher.tsx  # Language toggle (icon-only)
│  │  └─ ThemeSwitcher.tsx     # Theme toggle (icon-only)
│  │
│  ├─ lib/
│  │  ├─ client/
│  │  │  ├─ i18nContext.tsx     # Locale context (client)
│  │  │  └─ themeContext.tsx    # Theme context (client, next-themes)
│  │  ├─ server/
│  │  │  ├─ loadLocales.ts      # Reads *.json under /locales
│  │  │  └─ loadThemes.ts       # Reads *.json under /themes
│  │  └─ utils/types.ts         # Shared types for locales/themes
│  │
│  ├─ locales/
│  │  ├─ en.json                # Default EN locale
│  │  └─ fa.json                # Default FA locale (rtl)
│  │
│  ├─ themes/
│  │  ├─ light.json             # Default light theme
│  │  └─ dark.json              # Default dark theme
│  │
│  ├─ api/axios.ts              # Axios instance + example
│  └─ fonts/                    # (empty for now)
│
├─ tailwind.config.ts
├─ tsconfig.json
└─ package.json
```

---

## Files You Usually Don’t Need to Touch

These are “runtime wiring” and just work out of the box:

- `src/lib/client/i18nContext.tsx` — locale context + persistence
- `src/lib/client/themeContext.tsx` — theme context + persistence + system mode
- `src/lib/server/loadLocales.ts` — auto-loads `src/locales/*.json`
- `src/lib/server/loadThemes.ts` — auto-loads `src/themes/*.json`
- `app/layout.tsx` — wires providers + HTML `lang/dir`
- `tailwind.config.ts` — Tailwind + scan paths
- `tsconfig.json` — TS config + `@/*` import alias

> You *can* tweak these, but for 95% of projects you won’t need to.

---

## What You WILL Edit Most

- `src/locales/*.json` — add/update copy, set `"dir": "ltr" | "rtl"`.
- `src/themes/*.json` — add/update colors, add new theme files.
- `src/api/axios.ts` — set `baseURL`, interceptors, headers.
- `app/page.tsx` and `src/components/**` — your actual UI.
- `app/globals.css` — global styles (uses CSS variables that match your theme keys).

---

## Internationalization (Locales)

Each locale is a JSON file in `src/locales`:

```json
{
  "code": "en",
  "name": "English",
  "dir": "ltr",
  "strings": {
    "hello_line": "Hello, This is a platform created by {name}",
    "author_name": "Sina Khanzadeh",
    "github_label": "github.com/programmer-1998"
  }
}
```

- **Add a language**: copy `en.json` → `de.json`, translate `strings`, set `dir`.
- **Switching**: the Language switcher auto-lists all locale files. The choice is saved to `localStorage`.
- **RTL/LTR**: `dir` updates the entire page (`<html dir="...">`).

---

## Theming (Colors from JSON)

Themes live in `src/themes`. Example `light.json`:

```json
{
  "key": "light",
  "name": "Light",
  "colors": {
    "bg": "#F7F7FB",
    "fg": "#0F1115",
    "accent": "#7C3AED",
    "muted": "#64748B",
    "gradientA": "#A78BFA",
    "gradientB": "#60A5FA",
    "glass": "rgba(255,255,255,0.6)"
  }
}
```

- **Add a theme**: copy `light.json` → `brand.json`, edit colors, done.
- **Add a new color key**: add the key to *both* `light.json` and `dark.json` (e.g., `"sina": "#9B5CF6"`).  
  You can then reference it as `var(--sina)` in CSS (see below).

Default theme = **system** (follows OS). The theme switcher persists choice to `localStorage`.

---

## Using Theme Colors in CSS

This starter is Tailwind-first, plus **CSS variables** that match your JSON keys.

**Default mode (simple):** We define variables in `app/globals.css` that mirror your theme keys:

```css
:root {
  --bg: #F7F7FB;
  --fg: #0F1115;
  --accent: #7C3AED;
  --muted: #64748B;
  --gradientA: #A78BFA;
  --gradientB: #60A5FA;
  --glass: rgba(255,255,255,0.6);
}
html.dark {
  --bg: #0B0E14;
  --fg: #E6EAF2;
  --accent: #8B5CF6;
  --muted: #94A3B8;
  --gradientA: #0EA5E9;
  --gradientB: #8B5CF6;
  --glass: rgba(17,24,39,0.6);
}

html {
  background:
    radial-gradient(60% 60% at 50% 12%, color-mix(in srgb, var(--gradientA) 12%, transparent), transparent 60%),
    radial-gradient(60% 60% at 50% 88%, color-mix(in srgb, var(--gradientB) 10%, transparent), transparent 60%),
    var(--bg);
  color: var(--fg);
}
```

Use anywhere:
```css
.text-accent { color: var(--accent); }
.text-muted  { color: var(--muted); }
.bg-glass {
  background: var(--glass);
  backdrop-filter: blur(16px) saturate(120%);
  -webkit-backdrop-filter: blur(16px) saturate(120%);
  border: 1px solid color-mix(in srgb, var(--fg) 12%, transparent);
  border-radius: 9999px;
}
```

**Optional advanced mode (zero duplication):** Add a tiny bridge that **automatically** maps all keys in your JSON theme to CSS variables at runtime. Then any new key (e.g., `sina`) becomes immediately usable as `var(--sina)` without touching CSS. (Ask for `ThemeVars` if you want this; ~20 lines.)

---

## API Service (Axios)

Pre-configured Axios instance at `src/api/axios.ts`:

```ts
import axios from "axios";

export const api = axios.create({
  baseURL: "https://example.com/api", // change me
  timeout: 15000,
});

// Example:
/*
import { api } from "@/src/api/axios";

export async function fetchUsers() {
  const res = await api.get("/users");
  return res.data;
}
*/
```

- Add interceptors, headers, or auth once here; reuse everywhere.

---

## Design System & UI

- **Tailwind CSS** for utility-first styling.
- Minimal, clean **top-center dock** with icon-only toggles.
- **Locales/Themes are file-driven** — adding files auto-populates the menus.
- **RTL/LTR**: controlled via `dir` in the active locale JSON.
- You can bring **HeroUI/NextUI/shadcn** later if you prefer — the starter doesn’t lock you in.

---

## Roadmap
- ✅ JSON-driven locales (auto RTL/LTR)
- ✅ JSON-driven themes (light/dark)
- ✅ Theme/Language switchers (icon-only)
- ⏳ Optional bridge to auto-sync **all** JSON color keys → CSS vars
- ⏳ Ready-made pages (Auth, Dashboard, Settings)
- ⏳ Component library presets (HeroUI / shadcn)

---

## Author & Contact

**Sina Khanzadeh**

[![GitHub](https://img.shields.io/badge/GitHub-programmer__1998-181717?logo=github)](https://github.com/programmer-1998)
[![Telegram](https://img.shields.io/badge/Telegram-@programmer__1998-26A5E4?logo=telegram)](https://t.me/programmer_1998)
[![Instagram](https://img.shields.io/badge/Instagram-@programmer__1998-E4405F?logo=instagram)](https://instagram.com/programmer_1998)
[![Website](https://img.shields.io/badge/Website-sina--khanzadeh.ir-0F1115?logo=firefox)](https://sina-khanzadeh.ir)

---

## License

MIT © 2025 Sina Khanzadeh
>>>>>>> 6ed76b9 (Initial commit: SinaJS)
>>>>>>> 8b01ece (Initial commit: SinaJS)
