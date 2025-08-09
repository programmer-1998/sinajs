import fs from "fs";
import path from "path";
import { LocaleFile, LocaleMeta } from "@/utils/types";

const localesDir = path.join(process.cwd(), "src", "locales");

export async function loadAllLocales(): Promise<Record<string, LocaleFile>> {
  const result: Record<string, LocaleFile> = {};
  const files = fs.readdirSync(localesDir).filter(f => f.endsWith(".json"));

  for (const file of files) {
    const full = path.join(localesDir, file);
    const raw = fs.readFileSync(full, "utf-8");
    const parsed = JSON.parse(raw) as LocaleFile;
    const code = parsed.code || path.basename(file, ".json");
    result[code] = { ...parsed, code, name: parsed.name || code };
  }
  return result;
}

export async function getLocaleList(): Promise<LocaleMeta[]> {
  const all = await loadAllLocales();
  return Object.values(all).map(l => ({
    code: l.code,
    name: l.name || l.code,
    dir: l.dir,
  }));
}

