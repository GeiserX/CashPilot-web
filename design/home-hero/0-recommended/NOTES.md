# Design 0: recommended

The base is **2-split**. The words sit on the left and the real dashboard sits on the right, so a visitor sees the product before reading a word. The grafts from the other three designs and every defect the judges listed are applied here.

The biggest change from 2-split: the three text chips no longer sit on top of the screenshot. Each claim now has two parts:

- a small icon marker (30 px) on an empty spot of the screenshot;
- the same icon, with its words, in a claims row under the window.

So nothing covers the legend or the chart. The claims fill the empty band under the window. On a phone, the same list moves up under the lead.

Files:

- `index.html` is the mockup. It is `base-index.html` (a copy of `base/index.html`) with the hero swapped out and `hero.css` added in a `<style>` block. `python3 build.py` rebuilds it from `hero.html` and `hero.css`.
- `shot-1440.png`, `shot-1024.png` and `shot-390.png` show the full page. `top-1440.png`, `top-1024.png`, `top-768.png`, `top-390.png` and `top-320.png` show the first 900 px. All of them were rendered on the MacMini. In the full-page shots the window looks dimmer, because the shooter replays the 200 ms rise. The `top-*` shots show the real look. The base shots have the same effect.

## 1. Final English copy, key by key

| Key | Status | Text |
| --- | --- | --- |
| `home.hero.pill` | unchanged (adversarial check) | Free and open source, GPL-3.0 |
| `home.hero.title` | rewrite (first sentence only) | Put your idle hardware to work. |
| `home.hero.titleAccent` | **new** (second sentence of the old title) | See every payout in one dashboard. |
| `home.hero.lead` | rewrite: 55 words become 24 | CashPilot sets up bandwidth sharing, DePIN, mining, GPU and storage apps on the computers you already own, and tracks what each one pays you. |
| `home.hero.claims.machines` | **new** | All your machines in one view |
| `home.hero.claims.fence` | **new** | Can keep apps off your home network |
| `home.hero.claims.history` | **new** | Your history stays on your machine |
| `home.hero.download` | unchanged | Download |
| `home.hero.selfhost` | unchanged | Self-host with Docker |
| `home.hero.expect` | unchanged text, new place and style | CashPilot does not pay you. The providers do. Earnings depend on your country, connection and hardware. |
| `home.hero.imageAlt`, `home.hero.imageAltMobile` | unchanged | |
| `home.stats.label` | unchanged | CashPilot in numbers (the `aria-label` of the `<dl>`) |
| `home.stats.services` | unchanged (adversarial check) | supported services |
| `home.stats.pulls`, `home.stats.stars` | unchanged | Docker pulls, GitHub stars (stars shown at every width again) |
| `home.stats.note` | unchanged | From GitHub and Docker Hub on {date}. |

After the adversarial check: 4 new keys (`titleAccent` and the three claims) and 2 rewritten values (`title`, `lead`). No key is deleted, because every old hero and stats key is still used. Above the buttons, the visible prose drops from 72 words (pill, title and lead) to 41.

## 2. Base and grafts

| Graft | From | Done here |
| --- | --- | --- |
| Pill says "no account with us", not "no sign-up" or "no account needed" | 3-motion (judges 1, 2) | Reverted in section 7: it repeated the "How it works" lead. |
| Fence claim is honest ("can") at every width, and it does not point at a running container | 4-steps, 1-tight (all three judges) | "Can keep apps off your home network". The marker sits between the machine names at the top of the Placement grid, not on a container cell. |
| The history marker never points at a dollar figure | judge 1 | The marker sits above the first bar of the "Earned per day" chart. Nothing points at "Earned all time $59.32" any more. |
| Licence and "20 languages" join the numbers row | 4-steps (all three judges) | Reverted in section 7: "20 languages" is not true of the server UI, and the pill carries GPL-3.0. |
| Services first, in rose; the duplicate star count leaves | 3-motion (judge 2) | Services lead, in `--accent`. The header shows the star count above 520 px. The row shows its own star cell only at 520 px and below, where the header hides the count. So the number appears once on every screen. |
| Date: tooltip (judges 1, 2) or visible (judge 3) | 1-tight / 2-split | These grafts conflict, so I did both halves. The date stays **visible**, because touch and keyboard users never see a tooltip. It moves above the figures, as a small source line under a hairline, so the column ends on the numbers, not on a grey line. |
| Disclaimer in `--muted` with an info icon, right under the buttons | 2-split (judge 3) | Yes. The icon is rose, so the line reads as a note on purpose. |
| On a phone, the three claims come into the first screen | 1-tight (judge 1) | They sit under the lead at y 447-555 on a 390 px screen, as a compact list. |
| A thin rail joins the three icon discs on a phone | 4-steps (judge 2) | Yes. |
| Phone shot next to the claims list | 2-split (judge 3) | Not done, because it conflicts with the graft above. A list beside the phone shot cannot also sit in the first screen. The claims now sit under the lead, and the phone shot follows the numbers, centred, as on the live site. |
| No count-up, and no new continuous motion | 3-motion (judge 3) | Yes. The only motion is the site's 200 ms rise on the window, plus a 200 ms fade on the markers. Both run only with `prefers-reduced-motion: no-preference`. |
| No second accent colour | judge 3 | Yes. Only the existing rose is used, plus the logo's rose-to-orange gradient on the second title line. |
| Long locales and RTL rendered before building | judge 3 | Done for French (the longest locale, per the brief) and Arabic at 1440, 1024 and 390, and for French at 320. The results are in section 4. German and Russian were not rendered, but French is longer than both. |

## 3. Every listed defect of 2-split, and its fix

| Defect | Fix |
| --- | --- |
| The pill says "no sign-up", which is misleading | "Free, open source, no account with us". |
| The fence label is stated as always on, and pinned to EarnApp on box-c | The words are "Can keep…". The marker sits between the machine names, not on a container. |
| The history label points at "Earned all time $59.32" | The marker sits over the chart. |
| At 1440 the phone covers the chart, and a dead dark band sits on the right at 680-880 px | The phone overlay is gone at 641 px and up. The claims row fills the band under the window (y 647-686), and the hero now ends at y 856. The platforms strip starts inside the first screen at 1440 and 1024 (y 856 and 751). |
| The window top lines up with nothing on the left | The window starts level with the pill: y 137 at 1440 and y 116 at 1024. |
| The chips cover the Placement legend and the chart bars | The chips are gone from the screenshot. Each marker is a 30 px disc on an empty spot. |
| The label positions are percentages of `hero.png`, so a re-crop moves them silently | The positions stay percentages, but a build guard now fails loudly when the image changes (section 5). |
| At 390 the labels start below the fold | They sit at y 447-555, inside the first screen. |
| At 1440 the phone overlay repeats the same numbers ($34.32 twice) | The phone overlay is gone at 641 px and up. |
| The pill drops GPL-3.0, so the first screen has no licence | GPL-3.0 is a figure in the numbers row. |
| The stars number shows twice in the first screen | It shows once at every width (see the grafts table). |
| `sizes` is wrong for the larger image, so the browser can pick a soft image on 2x screens | `sizes="(min-width: 1160px) 1056px, (min-width: 901px) calc((100vw - 4rem - 29rem) * 1.8), calc(100vw - 2.2rem)"`. This matches the rendered width of the window: 1152 px at 1440 and 893 px at 1024. |
| The CTA at the bottom shares `.hero__actions` | The hero uses its own class for the button row. The CTA's `.hero__actions` rule stays untouched. |
| The mask fade ends in the middle of the grid, under the phone | The fade now covers only the last 12%, and the claims row sits right under it. |
| The gradient title may come back from axe as "needs review" | Measured: axe (WCAG 2.0, 2.1 and 2.2 A/AA) on `.hero` gives **0 violations** at 1440, 1024, 768, 390 and 320. It gives 1 "needs review", `color-contrast`, for the gradient title line and the claim text over the glow. `scripts/a11y.ts` counts only violations. The fallback colour of the title is `--accent` (7.6:1), and the claim text is `--text` (17:1 on `--bg`). |
| RTL and 1.5x-length locales not rendered | Rendered (section 4). RTL needed one fix: separate marker positions. |
| The CSS is large (about 375 lines) | `hero.css` is 435 lines, including comments, the RTL positions and five breakpoints. In the real file it replaces about 145 lines (`:439-566` and the hero part of `:914-930`). That is the cost of a two-column hero. No new component is needed. |

## 4. Checks run (all on the MacMini)

- **Sideways overflow:** `scrollWidth` equals the viewport width at 320, 360, 390, 640, 641, 768, 1024 and 1440.
- **Measured boxes (English):**

  | Width | Window top / pill top | Claims | Buttons | Numbers row | Platforms strip |
  | --- | --- | --- | --- | --- | --- |
  | 1440 | 137 / 137 | 647-686 | 560 | 694-792 | 856 |
  | 1024 | 116 / 116 | 523-635 | 468 | 602-700 | 751 |
  | 390 | window hidden | 447-555 | 577 | 788-943 | 1274 |

- **French** (title 99 characters, lead about 170): at 1024 the title takes 5 lines, the two buttons wrap to two rows, and the numbers row ends at about y 860. That is still inside the first 900 px. At 390, the claims stay in the first screen. "Peut tenir les applications à l'écart de votre réseau domestique" wraps to two lines, and the rail still joins the discs.
- **Arabic** (`dir="rtl"`): the columns mirror and the window runs off the left edge. The screenshot itself is not mirrored, so the right half of the dashboard is the part on screen. In RTL the markers therefore move to elements there: the "Containers up" tile, the container filter under "Resource use per server", and the Oct 27 bar. All three show at 1440 and 1024. The phone layout mirrors cleanly, with the rail on the right.
- **Third-party requests:** none added. `index.html` has the same 3 script tags and the same 54 external URLs as `base/index.html`. Everything outside the hero section is byte-identical to the base.
- The French and Arabic test pages were throwaway files and were deleted after the render.

## 5. Implementation plan

**`src/pages/[...locale]/index.astro`**

1. Replace the hero markup at `:106-139`. Rename `rh__*` to `hero__*`, and name the button row `hero__buttons` so the CTA keeps `.hero__actions`. The structure:
   - `.hero__copy`: the pill (`Icon check`), then the `h1` with `<span class="hero__title-main">{t("home.hero.title")}</span> <span class="hero__title-accent">{t("home.hero.titleAccent")}</span>`, the lead, the buttons, the expect `<p>` (`Icon info`), and the proof `<div>`. The proof holds the note `<p>`, then the `<dl aria-label>` with three cells: services, pulls and stars (section 7).
   - `.hero__product`: the stage (`WindowFrame` with the new `sizes`, plus an `aria-hidden` markers layer with three `Icon` spans: `devices`, `shield`, `clock`), then the claims `<ul>` with the same three icons, then `PhoneFrame`.
   - Values: services `t.num(live.length)`, pulls `t.num(data.pulls.ui)`, stars `t.num(data.stars.web)`.
2. Replace the hero CSS at `:439-566` and the hero rules inside `@media (max-width: 640px)` at `:914-930` with `hero.css`, renamed. Keep the `.hero__actions` rule at `:481-487` and the CTA override at `:897-899`, because the CTA still uses them. Three Astro details:
   - The window mask needs `.hero__stage :global(.window)`, as the current `.hero__shot .window` rule does.
   - The RTL marker rules need `:global([dir="rtl"]) .hero__marker--fleet` and so on.
   - At 640 px and below, `display: contents` on `.hero__copy` and `.hero__product` lets the claims list move up under the lead with `order`. The list holds no links or buttons, so the focus order does not change. Screen readers read the claims after the numbers, which still makes sense.

**`src/assets/shots/hero-anchors.ts` (new)**

- Exports `HERO_SHA256 = "cd9cdd5b7ca874a2dde5e4f3c53623bd11ad0cbf2afc7f26511ee19471cbb3c5"` (the hash of today's `hero.png`).
- Exports the three marker positions as `{ x, y, xRtl, yRtl }` in percent: machines 20.6/68.6 and 86/27, fence 23.1/56.4 and 67.4/96, history 50.3/54 and 65.1/55.5.
- The page sets them as CSS variables on each marker (`style={`--x:${a.x}%;--y:${a.y}%;--x-rtl:…`}`). The CSS reads `left: var(--x)`, and in RTL `left: var(--x-rtl)`.

**`scripts/check-hero-anchors.ts` (new, about 15 lines)**

- Hashes `src/assets/shots/hero.png` and fails when the hash differs from `HERO_SHA256`. The failure message says to recheck the marker positions and then update the hash.
- In `package.json`, change `"build"` to `bun scripts/check-hero-anchors.ts && astro check && astro build`.
- In `scripts/prepare-images.ts`, add one comment line beside the hero crop that points at the guard.
- Prove the guard can fail before trusting it: change one byte of a copy of the image, or the stored hash, and watch the build go red.

**Components:** no new component. `WindowFrame` gets the `sizes` prop, which it already accepts. `PhoneFrame` is unchanged. The `Icon.astro` set already has every icon used here (check, info, devices, shield, clock).

**i18n (all 20 files: ar, de, en, es, fil, fr, hi, id, it, ja, ko, nl, pl, pt-BR, ru, th, tr, uk, vi, zh-Hans)**

- **Add:** `home.hero.titleAccent`, `home.hero.claims.machines`, `home.hero.claims.fence`, `home.hero.claims.history`.
- **Rewrite:** `home.hero.title`, `home.hero.lead`.
- **Delete:** none.
- **Title split:** split each current `home.hero.title` into `title` and `titleAccent` at its first sentence end. 16 locales end their first sentence with `.` or `。`. Three need care:
  - Arabic is one sentence: split it at the comma (`شغّل أجهزتك الخاملة،` / `وتابع كل الدفعات في لوحة واحدة.`).
  - Hindi splits at the danda `।`.
  - Thai splits at the space between its two clauses.
- **Fence wording:** every locale must keep the "can" (the fence is optional). Do not reuse `home.control.lan.title`, which says "Kept off…".
- Run `bun run i18n:check --strict --all`.

**Gates (on a build box):** `bun install --frozen-lockfile`, `bun run i18n:check --strict --all`, `bun run build`, `bun run a11y`, `bun run overflow`. Then render `/`, `/fr/` and `/ar/` at 1440, 1024 and 390, and compare them with these shots.

## 6. AGENTS.md compliance

- **Dark theme only:** the design uses only the site tokens (`--bg`, `--surface`, `--border`, `--text`, `--muted`, `--faint`, `--accent`, `--accent-soft`, `--accent-line`), plus the existing glow and the logo gradient.
- **Every visible string in i18n:** every word is HTML text, with nothing inside an image. There are 6 new keys, and each goes into all 20 files in the same change. `GPL-3.0` and `20` are values, not words.
- **No earnings figure stated as typical:** the hero text holds no money figure. No marker points at a dollar amount. The demo figures stay only inside the existing screenshot, as today. "CashPilot does not pay you" now sits right under the buttons, in a stronger colour.
- **No trackers, cookies or third-party requests:** no new assets, fonts or URLs (checked against the base).
- **Referral links:** the hero has no provider links.
- **Navbar and sections below:** unchanged and byte-identical. The hero ends with its bottom padding and flows into the platforms strip, as now.
- **a11y and overflow:** axe shows 0 violations at five widths, and nothing scrolls sideways from 320 to 1440. The H1 is one heading, made of two spans. The markers are `aria-hidden`, because the claims list carries the same words.
- **Build box:** every render and check ran on the MacMini.

## 7. Adversarial check (changes after the judges' pass)

Each gap below was found by trying to prove this design worse than today, fixed in `hero.html`/`hero.css`/`build.py`, and re-rendered on the MacMini. Sections 1-6 above still describe the design; where they disagree with this section, this section wins.

| Gap | Fix |
| --- | --- |
| The pill "Free, open source, no account with us" repeated the lead of the very next section ("How it works: Three steps, and no account with us"), two screens apart. | The pill is today's text again, "Free and open source, GPL-3.0". It carries the licence, needs no translation, and the no-account idea stays where it is argued, in "How it works". |
| "20 languages" was shown as proof under "From GitHub and Docker Hub on {date}". It is neither a GitHub nor a Docker Hub number, and the self-hosted server UI is English only on CashPilot `main` today (only `app/i18n/en.json`); only the desktop app has 20 locales. | The cell is gone, and so is the separate licence cell (the pill has it). The row is today's three figures: 50 supported services, 94,354 Docker pulls, 90 GitHub stars, at every width. The source line now matches every figure under it. The header star badge repeats the 90, as it does on the live site today. |
| The lead dropped storage, one of the five groups listed one screen below, and said "runs" where the product only reads the balance of services without a Docker image. | "sets up bandwidth sharing, DePIN, mining, GPU and storage apps": today's verb and all five groups. 24 words, 3 lines at 1440, 1024 and 390. |
| German +30% at 1440: the title took 8 lines in the 28 rem column, and both buttons fell below the first screen (y 847-955). | Copy column 31 rem, title `clamp(2.25rem, 3.6vw, 3.25rem)` with `text-wrap: balance`, lead `text-wrap: pretty`. German +30% now puts the buttons at y 687-795 at 1440 and 519-627 at 1024; English at 1440 has the platforms strip at y 845. `sizes` follows: 1056 px at 1160 px and up. |
| `.btn` is `white-space: nowrap` site-wide, so a long label ran off a 320 px screen: the German +30% ghost button was 350 px wide in a 285 px column. The Russian label "Развернуть у себя через Docker" also wraps at 320, so it overflows the live site too. | `.rh__actions .btn { max-width: 100%; white-space: normal; text-align: center }`. The button wraps to two lines (63 px tall), `scrollWidth` = 320. |
| On small phones a figure that wrapped to a new line started with a stray divider and indent (seen at 320 px). | At 520 px and below the dividers go away, and the cells use a plain gap. |

Checks after the fixes (MacMini, Playwright Chromium, dark):

- Lead: **24 words** (today: 55).
- Kept from today: the GPL-3.0 pill (same text), Download (`/download/`) and Self-host with Docker (`/download/docker/`), the providers-pay line (same text, `--muted` 9.3:1 instead of `--faint`), the three numbers with their source date, the desktop window and the phone shot, with their alt texts.
- No money figure in the hero text. No marker points at a dollar amount.
- No third-party request: the hero has no `http(s)://` URL. Outside the hero, `index.html` is byte-identical to `base/index.html`, so the navbar is untouched.
- Motion: 2 animations in the hero with `prefers-reduced-motion: no-preference` and **0** with `reduce`, at 1440 and 390.
- Contrast on `--bg`: `--text` 17.3:1, `--muted` (lead, disclaimer, labels) 9.3:1, `--faint` (source line only) 5.8:1, `--accent` 7.5:1. On the brightest glow pixel behind the phone lead (rgb 25,17,11), `--muted` stays above 8:1.
- No sideways scroll (`scrollWidth` = viewport) at 320, 360, 390, 768, 1024, 1101, 1160, 1280 and 1440 in English, at 320, 390, 1024 and 1440 with German +30%, and at 320 and 390 with the Russian button label. Both buttons are 48 px tall or more at every width, and full-width (285-355 px) on phones.
- Flow: the hero ends on its bottom padding, and the platforms strip starts at y 845 (1440) and y 737 (1024), inside the first screen.
