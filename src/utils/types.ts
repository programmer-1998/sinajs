export type Dir = "ltr" | "rtl";

export type LocaleFile = {
  code: string;
  name?: string;
  dir: Dir;
  strings: Record<string, string>;
};

export type LocaleMeta = {
  code: string;
  name: string;
  dir: Dir;
};

export type ThemeFile = {
  key: string;      // light | dark | custom...
  name?: string;
  colors: Record<string, string>;
};

export type ThemeMeta = {
  key: string;
  name: string;
};

