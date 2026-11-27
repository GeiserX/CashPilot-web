// The first-visit language redirect, inlined in the <head> of English pages so
// it runs before the page paints. It is plain JavaScript in a string because it
// must not wait for the site bundle.
//
// - A visitor who picked a language (stored by the picker or the suggestion)
//   goes to that language whenever they open an English page.
// - A visitor who never picked goes, on the first visit only, to the best match
//   for navigator.languages: exact code first, then the language alone, so
//   es-MX gets es, pt-PT gets pt-BR and zh-TW gets zh-Hans. English, or no
//   match, stays here.
// - Bots, visitors without JavaScript and browsers that block storage get
//   English: no storage means no redirect, so nobody can loop.
import { AVAILABLE, DEFAULT_LOCALE } from "../i18n";
import { LANG_ALIASES, SEEN_KEY, STORE_KEY } from "./lang-keys";

export function redirectScript(): string {
  // [code, path] for every built locale; English has the empty path.
  const locales = AVAILABLE.map((l) => [l.code, l.path]);
  return `(function(){try{
var L=${JSON.stringify(locales)},A=${JSON.stringify(LANG_ALIASES)},K=${JSON.stringify(STORE_KEY)},S=${JSON.stringify(SEEN_KEY)},s=localStorage;
function best(prefs){for(var i=0;i<prefs.length;i++){var p=String(prefs[i]).toLowerCase(),b=p.split("-")[0];b=A[b]||b;
for(var j=0;j<L.length;j++)if(L[j][0].toLowerCase()===p)return L[j];
for(j=0;j<L.length;j++)if(L[j][0].split("-")[0].toLowerCase()===b)return L[j];}return null}
var saved=s.getItem(K),hit=null;
if(saved)hit=best([saved]);
else if(!s.getItem(S)){s.setItem(S,"1");if(!/bot|crawl|spider|slurp|preview|lighthouse/i.test(navigator.userAgent))hit=best(navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||""]);}
if(hit&&hit[0]!==${JSON.stringify(DEFAULT_LOCALE)}&&hit[1])location.replace("/"+hit[1]+location.pathname+location.search+location.hash);
}catch(e){}})();`;
}
