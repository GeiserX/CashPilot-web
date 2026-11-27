// The only JavaScript on every page: the language picker, the language
// suggestion and the copy buttons. Everything works without it. The
// first-visit redirect runs earlier, inline in the <head> (lang-redirect.ts).
import { LANG_ALIASES, STORE_KEY } from "../lib/lang-keys";

function store(code: string) {
  try {
    localStorage.setItem(STORE_KEY, code);
  } catch {
    /* storage blocked: the choice is simply not remembered */
  }
}

function stored(): string | null {
  try {
    return localStorage.getItem(STORE_KEY);
  } catch {
    return null;
  }
}

// Language picker: remember the choice, close on Escape and outside clicks.
for (const picker of document.querySelectorAll<HTMLDetailsElement>("[data-lang-picker]")) {
  picker.addEventListener("click", (e) => {
    const a = (e.target as Element).closest<HTMLAnchorElement>("[data-lang-choice]");
    if (a) store(a.dataset.langChoice!);
  });
  picker.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && picker.open) {
      picker.open = false;
      picker.querySelector("summary")?.focus();
    }
  });
  document.addEventListener("click", (e) => {
    if (picker.open && !picker.contains(e.target as Node)) picker.open = false;
  });
}

// Language suggestion, for the visits the first-visit redirect leaves alone. A
// visitor who picked a language before is offered that language again when
// this page is in another one. A visitor who never picked is offered their
// browser's language, when the page exists in it.
const suggest = document.querySelector<HTMLElement>("[data-lang-suggest]");
if (suggest) {
  const offers = JSON.parse(suggest.querySelector("script")!.textContent || "{}") as Record<
    string,
    { href: string; dir: string; text: string; switch: string; dismiss: string }
  >;
  const current = suggest.dataset.current!;
  const saved = stored();
  let match: string | undefined;
  if (saved) {
    match = saved in offers ? saved : undefined;
  } else {
    const codes = [current, ...Object.keys(offers)];
    const base = (c: string) => {
      const b = c.split("-")[0]!.toLowerCase();
      return LANG_ALIASES[b] ?? b;
    };
    // The visitor's first preference that this page exists in, exact match first.
    for (const pref of navigator.languages?.length ? navigator.languages : [navigator.language]) {
      match = codes.find((c) => c.toLowerCase() === pref.toLowerCase()) ?? codes.find((c) => base(c) === base(pref));
      if (match) break;
    }
  }
  if (match && match !== current) {
    const chosen = match;
    const offer = offers[chosen]!;
    const text = suggest.querySelector<HTMLElement>("[data-text]")!;
    const sw = suggest.querySelector<HTMLAnchorElement>("[data-switch]")!;
    const dismiss = suggest.querySelector<HTMLButtonElement>("[data-dismiss]")!;
    suggest.lang = chosen;
    suggest.dir = offer.dir;
    text.textContent = offer.text;
    sw.textContent = offer.switch;
    sw.href = offer.href;
    sw.hreflang = chosen;
    dismiss.textContent = offer.dismiss;
    sw.addEventListener("click", () => store(chosen));
    dismiss.addEventListener("click", () => {
      store(current);
      suggest.hidden = true;
    });
    suggest.hidden = false;
  }
}

// Copy buttons: hidden in the HTML, shown once we know copying can work.
for (const btn of document.querySelectorAll<HTMLButtonElement>("[data-copy]")) {
  if (!navigator.clipboard) continue;
  btn.hidden = false;
  const label = btn.querySelector<HTMLElement>("[data-copy-label]")!;
  const idle = label.textContent;
  btn.addEventListener("click", async () => {
    const target = document.getElementById(btn.dataset.copy!);
    if (!target) return;
    try {
      await navigator.clipboard.writeText(target.textContent!.trim());
      label.textContent = btn.dataset.done!;
    } catch {
      label.textContent = btn.dataset.failed!;
    }
    setTimeout(() => (label.textContent = idle), 2000);
  });
}
