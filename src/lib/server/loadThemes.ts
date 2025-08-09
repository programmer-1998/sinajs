import fs from "fs";
import path from "path";
import { ThemeFile, ThemeMeta } from "@/utils/types";

const themesDir = path.join(process.cwd(), "src", "themes");

export async function loadAllThemes(): Promise<Record<string, ThemeFile>> {
  const result: Record<string, ThemeFile> = {};
  const files = fs.readdirSync(themesDir).filter(f => f.endsWith(".json"));

  for (const file of files) {
    const full = path.join(themesDir, file);
    const raw = fs.readFileSync(full, "utf-8");
    const parsed = JSON.parse(raw) as ThemeFile;
    const key = parsed.key || path.basename(file, ".json");
    result[key] = { ...parsed, key, name: parsed.name || key };
  }
  return result;
}

export async function getThemeList(): Promise<ThemeMeta[]> {
  const all = await loadAllThemes();
  return Object.values(all).map(t => ({
    key: t.key,
    name: t.name || t.key,
  }));
}

