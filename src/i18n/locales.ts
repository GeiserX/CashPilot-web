// The 20 launch locales. `code` names the file in src/i18n/<code>.json and the
// hreflang value; `path` is the URL segment (/es/, /pt-br/). English lives at /.
// `font: "system"` means the self-hosted Latin/Cyrillic font does not cover the
// script, so the page uses the system font stack for that language.
export interface Locale {
  code: string;
  /** Open Graph locale, language_TERRITORY. */
  ogLocale: string;
  path: string;
  name: string;
  dir: "ltr" | "rtl";
  font: "brand" | "system";
}

export const DEFAULT_LOCALE = "en";

export const LOCALES: Locale[] = [
  { code: "en", ogLocale: "en_US", path: "", name: "English", dir: "ltr", font: "brand" },
  { code: "es", ogLocale: "es_ES", path: "es", name: "Español", dir: "ltr", font: "brand" },
  { code: "pt-BR", ogLocale: "pt_BR", path: "pt-br", name: "Português (Brasil)", dir: "ltr", font: "brand" },
  { code: "fr", ogLocale: "fr_FR", path: "fr", name: "Français", dir: "ltr", font: "brand" },
  { code: "de", ogLocale: "de_DE", path: "de", name: "Deutsch", dir: "ltr", font: "brand" },
  { code: "it", ogLocale: "it_IT", path: "it", name: "Italiano", dir: "ltr", font: "brand" },
  { code: "nl", ogLocale: "nl_NL", path: "nl", name: "Nederlands", dir: "ltr", font: "brand" },
  { code: "pl", ogLocale: "pl_PL", path: "pl", name: "Polski", dir: "ltr", font: "brand" },
  { code: "ru", ogLocale: "ru_RU", path: "ru", name: "Русский", dir: "ltr", font: "brand" },
  { code: "uk", ogLocale: "uk_UA", path: "uk", name: "Українська", dir: "ltr", font: "brand" },
  { code: "tr", ogLocale: "tr_TR", path: "tr", name: "Türkçe", dir: "ltr", font: "brand" },
  { code: "ar", ogLocale: "ar_AR", path: "ar", name: "العربية", dir: "rtl", font: "system" },
  { code: "hi", ogLocale: "hi_IN", path: "hi", name: "हिन्दी", dir: "ltr", font: "system" },
  { code: "id", ogLocale: "id_ID", path: "id", name: "Bahasa Indonesia", dir: "ltr", font: "brand" },
  { code: "vi", ogLocale: "vi_VN", path: "vi", name: "Tiếng Việt", dir: "ltr", font: "system" },
  { code: "th", ogLocale: "th_TH", path: "th", name: "ไทย", dir: "ltr", font: "system" },
  { code: "zh-Hans", ogLocale: "zh_CN", path: "zh-hans", name: "简体中文", dir: "ltr", font: "system" },
  { code: "ja", ogLocale: "ja_JP", path: "ja", name: "日本語", dir: "ltr", font: "system" },
  { code: "ko", ogLocale: "ko_KR", path: "ko", name: "한국어", dir: "ltr", font: "system" },
  { code: "fil", ogLocale: "fil_PH", path: "fil", name: "Filipino", dir: "ltr", font: "brand" },
];
