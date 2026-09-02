export const locales = ["fa", "ps", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fa";
export const localeNames: Record<Locale, string> = {
  fa: "دری",
  ps: "پښتو",
  en: "English",
};
export const rtlLocales: Locale[] = ["fa", "ps"];

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}
