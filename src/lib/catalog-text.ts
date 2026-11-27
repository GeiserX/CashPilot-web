// A catalog string in the page's language. The catalog is English; its
// translations come from CashPilot's services/_i18n/<locale>.yml (see
// fetchCatalog). A missing or stale translation shows the English string,
// marked lang="en" so screen readers read it right.
import type { CatalogField, Service, SiteData } from "../data/fetch";
import type { Translator } from "../i18n";
import { typedCode } from "./typed-codes";

export interface CatalogText {
  text: string;
  /** "en" when the English string is shown on a page in another language. */
  lang?: "en";
}

const ENGLISH: Record<CatalogField, (s: Service) => string | null> = {
  "referral.bonus.referee": (s) => s.bonusReferee,
  "payment.minimum_payout": (s) => s.minimumPayout,
};

export function catalogText(data: SiteData, t: Translator, s: Service, field: CatalogField): CatalogText | null {
  const english = ENGLISH[field](s);
  if (english === null) return null;
  const code = t.locale.code;
  if (code === "en") return { text: english };
  const translated = data.catalogI18n?.[code]?.[`${s.slug}.${field}`];
  // A referral code named in the English text must survive the translation
  // byte for byte, or the visitor types the wrong code. If not, show English.
  const codes = [s.code, s.codeEntry, typedCode(s)?.code].filter((c): c is string => Boolean(c) && english.includes(c!));
  if (translated && codes.every((c) => translated.includes(c))) return { text: translated };
  return { text: english, lang: "en" };
}
