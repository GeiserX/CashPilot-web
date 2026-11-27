// Shared by the inline first-visit redirect (lang-redirect.ts) and the site
// bundle (site.ts). No imports, so the browser bundle stays small.

/** localStorage key for the language the visitor picked. */
export const STORE_KEY = "cashpilot.lang";
/** localStorage key set once the first-visit guess has run. */
export const SEEN_KEY = "cashpilot.langSeen";
/** Language subtags browsers send for a language we file under another code. */
export const LANG_ALIASES: Record<string, string> = { tl: "fil" };
