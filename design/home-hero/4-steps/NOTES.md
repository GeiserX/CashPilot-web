# Design 4: Three steps

The hero explains CashPilot by showing how to use it. A short title and one line say what it is. Then a strip of three steps on one rail: install, pick, watch. Each step has a tiny drawing, a bold title and one short line. The buttons follow right after. The proof sits under them as one bordered trust bar. The product shot follows, unchanged.

Files: `index.html` (the base page with only the hero text block replaced; the CSS is in a `<style>` block in `<head>`), `hero.css` (the same CSS, for reading), `shot-{1440,1024,390}.png` (full page), `top-{1440,1024,390,320}.png` (first 900 px). All shots were rendered on the MacMini.

## 1. The new English copy

| Key | Before | Words | After | Words |
| --- | --- | --- | --- | --- |
| `home.hero.pill` | Free and open source, GPL-3.0 | 5 | removed: the licence moves into the trust bar | 0 |
| `home.hero.title` | Put your idle hardware to work. See every payout in one dashboard. | 12 | Put your idle hardware to work. | 6 |
| `home.hero.lead` | CashPilot sets up bandwidth sharing, DePIN, mining, GPU and storage services on your computers, home servers and Raspberry Pi. It can fence these apps off from your home network, so they reach the internet and nothing else. It reads your balance from each provider and keeps the history in one place, on your own machine. | 55 | CashPilot runs bandwidth sharing, DePIN, mining, GPU and storage services on your own machines. | 15 |
| step 1 title | (none) | | Install CashPilot (reuses `home.how.steps.install.title`) | 2 |
| `home.hero.steps.install` (new) | (none) | | On a PC, a home server or a Raspberry Pi. | 9 |
| step 2 title | (none) | | Pick your services (reuses `home.how.steps.pick.title`) | 3 |
| `home.hero.steps.pick` (new) | (none) | | Choose from {count}. CashPilot starts them and can keep them off your home network. | 13 |
| step 3 title | (none) | | Watch every payout (reuses `home.how.steps.watch.title`) | 3 |
| `home.hero.steps.watch` (new) | (none) | | Every balance in one dashboard, with the history kept on your machine. | 12 |
| `home.hero.expect` | CashPilot does not pay you. The providers do. Earnings depend on your country, connection and hardware. | 16 | unchanged text, moved into step 3 | 16 |
| `home.hero.download`, `home.hero.selfhost` | Download / Self-host with Docker | 1 / 3 | unchanged | 1 / 3 |
| `home.stats.license` (new) | (none) | | free and open source (value shown: GPL-3.0) | 4 |
| `home.stats.stars`, `home.stats.pulls` | GitHub stars / Docker pulls | 2 / 2 | unchanged | 2 / 2 |
| `home.stats.services` | supported services | 2 | services | 1 |
| `home.stats.languages` (new) | (none) | | languages (value: number of locales, 20) | 1 |
| `home.stats.note` | From GitHub and Docker Hub on {date}. (visible line) | 7 | same text, now the `title` tooltip of the trust bar, not a visible line | 0 visible |
| `home.stats.label` | CashPilot in numbers (aria-label) | | unchanged | |
| `home.hero.imageAlt`, `imageAltMobile` | | | unchanged | |

Visible words: about 105 before, about 94 after. The real gain is not the count. Before, 55 of those words were one centred block. After, no block is longer than 16 words, and each one sits in its own place: the title, one line, three steps, one note, the bar.

The step titles are the same text as the "How it works" section, on purpose, so they reuse its keys and need no new translations.

## 2. What changed and why

- **Title cut to one sentence.** "Put your idle hardware to work." is the promise. "See every payout in one dashboard" was the second half of the old title; it is now step 3, where it belongs. At 1440 the title is one line.
- **The lead is one line of facts: what it runs, and where.** The five service groups stay, because those names are what a visitor recognises. Setup, the network fence and balance reading moved into the steps.
- **The three steps replace the lead.** They carry the same content, split by time: install, then pick, then watch. Each step is a title plus one short line, and each has a tiny drawing made of HTML and CSS (an install window with a progress bar, five service-group tiles with three picked, a bar chart with the last bar lit). The drawings hold no text and no figures, so nothing needs translating and the chart claims no amount.
- **No cards around the steps.** The steps are open columns joined by a thin rose-to-orange rail through the numbered badges. A first try put them in one bordered box; step 3 is taller because of the note, so steps 1 and 2 showed empty boxes. Open columns hide the uneven lengths.
- **The disclaimer sits under step 3**, in a small box with an info icon, right where money first comes up. It reads as part of "watch every payout", not as a grey line below the buttons.
- **Buttons right after the steps.** The visitor reads what to do, then sees where to start.
- **The proof is one bordered trust bar:** GPL-3.0, stars, pulls, services, languages, each with a rose icon and a bold value. The licence pill folded into it, so the first screen has one proof element, not a pill above and a grey row below.
- **The product shot, its frame, glow, mask and rise effect are unchanged**, and the hero still ends in the platforms strip.

## 3. How it answers each problem

| Problem | Answer |
| --- | --- |
| The lead is one long, dense, centred paragraph | Gone. Its four topics are split into a 15-word line and three steps of 9 to 13 words. |
| The hero reads as a wall of centred text | The steps are a row of three columns with drawings and a rail; the eye moves left to right, not down a block. On a phone they are a left-aligned list with a vertical rail. |
| The disclaimer looks like a leftover | It is now attached to step 3, in its own small box with an icon. |
| The stats row looks like a leftover | It is a bordered bar with icons in the accent colour and bold values, the same weight as the buttons above it. |
| Weak hierarchy | Clear order: big title, one line, three steps, two buttons, proof bar, product shot. Each level has its own size and treatment. |

## 4. What the visitor understands in five seconds

1. It puts idle hardware to work: bandwidth sharing, DePIN, mining, GPU, storage.
2. Using it is three moves: install it, pick services, watch the payouts.
3. The money comes from the providers, not from CashPilot, and it varies.
4. It is free, GPL-3.0, used (stars, pulls), covers 50 services, in 20 languages.
5. Click Download, or Self-host with Docker.

## 5. AGENTS.md rules

- **Dark theme only:** only existing tokens (`--bg`, `--surface`, `--border`, `--muted`, `--faint`, `--accent`, `--accent-soft`, `--accent-line`) plus the glow orange already in the hero.
- **Every visible string in i18n:** all text is real text. The drawings are text-free CSS. The new keys are listed in section 7. "GPL-3.0" is a licence identifier and stays the same in every locale, like the number values.
- **No earnings figure stated as typical:** the hero text has no amount. The bar chart has no axis and no values. The product screenshot is unchanged.
- **No trackers, cookies or third-party requests:** nothing external. Icons are inline SVG paths copied from `Icon.astro`; fonts and images are the local build assets.
- **Referral links:** the hero has no provider link.
- **Navbar and sections below unchanged:** only the hero text block was replaced. The shot block keeps its build markup.
- **No sideways scroll:** measured on the MacMini, `scrollWidth` equals the viewport at 320, 390, 768, 1024 and 1440.
- **Accessibility:** the steps are an `<ol>`, so screen readers announce the numbers; the visible numbered badges are `aria-hidden`. Step titles are paragraphs, not headings, so the page outline is unchanged. Each trust icon sits inside its `<dd>`, so the `<dl>` holds only `dt`/`dd` pairs. The note uses `--faint` on a box at about `--surface`; that is about 5:1, but `bun run a11y` must confirm it.
- **Build and screenshot on a build box:** all shots were taken on the MacMini.

## 6. Where the first screen lands

Product shot top, from the MacMini measurement (base in brackets): 1440: 755 px (664); 1024: 723 px (611); 768: 766 px; 390: 923 px (891); 320: 1079 px. The steps cost about 90 px at desktop. At 1440 the first screen still shows the shot's window bar and the dashboard top, as before, just less of it. On a phone the first screen ends at the buttons and the top of the trust bar; the phone shot is below the fold, as it is today.

## 7. Implementation cost

- **`src/pages/[...locale]/index.astro`:** replace the hero text block (lines 107-133 today) with about 45 lines: the title, the lead, an `<ol>` of three `<li>` (drawing, badge, title, text; step 3 adds the note), the existing actions, and the trust `<dl>`. `{count}` in step 2 is `t.num(live.length)`, which the page already computes. The languages value is `LOCALES.length` from `src/i18n/locales.ts`. The shot block does not change.
- **CSS:** about 90 lines in the page's scoped `<style>`, replacing `.pill`, `.hero__lead`, `.hero__expect`, `.stats-line`, `.stats*` (about 85 lines today). Keep the `.hero__actions` rule: the CTA at the bottom reuses it. The mockup uses its own `.h4__actions` class only because base CSS is scoped.
- **New components:** none needed. The three drawings are about 15 lines of markup inline. They could become a `HeroSteps.astro` if the page gets too long.
- **i18n:** 5 new keys in all 20 files (`home.hero.steps.install`, `home.hero.steps.pick`, `home.hero.steps.watch`, `home.stats.license`, `home.stats.languages`). 3 changed values (`home.hero.title`, `home.hero.lead`, `home.stats.services`). 1 removed key (`home.hero.pill`). `home.stats.note` stays, used as the bar's `title`. Step titles reuse `home.how.steps.*.title`, so they need no new work. Also update `meta.ogImageAlt` only if the title change should carry over; it does not have to.
- **Translations are longer:** the design is open columns, so French and German lines just wrap one more line. The step lines are 9 to 13 words in English; at 1.5 times the length they wrap to 3 or 4 lines at 1024 and stay readable. The trust bar wraps into two rows below 1100 px; below 900 px it turns into a rounded box with no dividers, so a wrapped row never starts with a divider.
- **RTL:** the rail uses logical properties (`inset-inline-start`) and flips its gradient under `[dir="rtl"]`; the progress bar fills from the right. Not rendered in Arabic in this mockup.

## 8. On a phone (760 px and below)

- The title wraps to two lines (three at 320), the lead to three.
- The steps become a left-aligned list: the numbered badge on the left, a vertical rail joining 1 to 2 to 3, title and line on the right. The drawings are dropped; the list is short without them.
- The disclaimer sits under step 3, aligned with its text.
- The buttons stack at full width (max 22 rem).
- The trust bar becomes a rounded box; items wrap on their own, centred, never split inside an item.
- The phone frame shot follows, as today.

## 9. One overlap to decide

The section right below, "How it works", has the same three step titles, with longer text. The hero steps are the five-second version; the section is the detail, plus the "50 services in five groups" index. Both can stay. If the repeat feels heavy, a follow-up could drop the three-step list from `HowItWorks.astro` and keep only the group index. That is outside this hero brief, so this design leaves the section as it is.
