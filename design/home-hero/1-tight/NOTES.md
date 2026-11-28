# Design 1: tight and centred

The hero keeps its centred layout and the product shot. The copy is cut hard. A visitor now reads one short promise, one plain sentence, three scannable points, two buttons and the proof, in that order. The navbar and every section below the hero are untouched (`index.html` differs from `base/` only in the hero section and one added `<style>` block in `<head>`).

Files: `index.html` (the new hero section plus a `<style>` block at the end of `<head>`), `shot-{1440,1024,390}.png` (full page), `top-{1440,1024,390}.png` (first 900 px). All shots rendered on the MacMini.

## The new English copy

| Key | Old text (words) | New text (words) |
| --- | --- | --- |
| `home.hero.pill` | Free and open source, GPL-3.0 (5) | Free, open source, no account needed (6) |
| `home.hero.title` | Put your idle hardware to work. See every payout in one dashboard. (12, 2 sentences) | Put your idle hardware to work. (6) |
| `home.hero.lead` | CashPilot sets up bandwidth sharing, DePIN, mining, GPU and storage services on your computers, home servers and Raspberry Pi. It can fence these apps off from your home network, so they reach the internet and nothing else. It reads your balance from each provider and keeps the history in one place, on your own machine. (55, 3 sentences) | CashPilot runs earning apps on your own machines and shows every payout in one dashboard. (15, 1 sentence) |
| `home.hero.points.setup.title` (new) | | Sets up the apps (4) |
| `home.hero.points.setup.text` (new) | | Bandwidth, DePIN, mining, GPU, storage (5) |
| `home.hero.points.fence.title` (new) | | Fences them off (3) |
| `home.hero.points.fence.text` (new) | | Optional: internet only, never your home network (7) |
| `home.hero.points.payouts.title` (new) | | Tracks every payout (3) |
| `home.hero.points.payouts.text` (new) | | Balances each hour, history on your machine (7) |
| `home.hero.download` | Download | unchanged |
| `home.hero.selfhost` | Self-host with Docker | unchanged |
| `home.hero.expect` | CashPilot does not pay you. The providers do. Earnings depend on your country, connection and hardware. (16) | unchanged text, now a footnote with an info icon |
| `home.stats.label`, `.stars`, `.pulls`, `.services` | | unchanged, now pill badges |
| `home.stats.note` | From GitHub and Docker Hub on {date}. (7, visible) | unchanged text, now visually hidden and in the badge row's `title` tooltip |
| `home.hero.imageAlt`, `.imageAltMobile` | | unchanged |

Prose above the buttons: 72 words before (pill + title + lead), 27 words after (pill + title + subtitle). Point text adds 29 words, but in six short fragments that read at a glance, not as a paragraph. At 1440 the shot still starts slightly higher than before (y 646, base y 664) even with the new points band in between, because the title is one line and the lead two.

## What changed and why

1. **Title cut to one sentence.** "Put your idle hardware to work." is the promise; it fits on one line at 1024 and up, at up to 4.1rem. "See every payout in one dashboard" moved into the subtitle and the third point, where it is explained instead of shouted.
2. **The lead became one sentence of 15 words**: what CashPilot is (runs earning apps), where (your own machines), what you get (every payout in one dashboard). It is set two balanced lines wide (max 34rem).
3. **The four topics of the old lead became three points in a row**, each a rose icon tile, a bold label and one muted line: set-up (with the five groups), the network fence (marked "Optional", because the site says the fence is something CashPilot *can* do), and payout tracking (hourly balances, history on your machine). Hairlines above, below and between frame them as one band, so they read as a unit and not as three floating cards. "Where it runs" left the hero: the platforms strip directly under the shot already lists every platform.
4. **The pill says "no account needed" instead of the licence name.** GPL-3.0 is meaningful to developers only; "no account" is a trust signal for everyone and matches the site's "no account with us" line. The licence is stated again in "What's the catch?" below.
5. **Proof became three pill badges right under the buttons**: star icon in amber, Docker logo, a grid icon, each number bold before its label. They now look deliberate rather than like a stray grey line. The fetch date stays in the page for screen readers and as a hover tooltip, but no longer takes a visible line.
6. **The disclaimer kept its exact text** (no retranslation) and became a quiet footnote with an info icon, the last line before the shot.

## How it answers each problem

| Problem | Answer |
| --- | --- |
| The lead is one long, dense paragraph of four topics | One 15-word sentence; the topics went into three labelled points, one topic each |
| The hero reads as a wall of centred text | Centred text is now at most two short lines at a time; the points are left-aligned inside their cells and broken by icons and hairlines |
| The disclaimer and stats look like leftovers | Stats are framed badges with icons; the disclaimer has an info icon and footnote position, clearly separate in role |
| Weak hierarchy | Five clear steps in size and weight: small accent pill, very large one-line title, muted subtitle, the points band, the rose primary button, then small badges and a faint footnote |

## What the visitor understands in five seconds

"This puts my idle machines to work (title). It runs earning apps and shows the payouts in one place (subtitle). It installs them, keeps them off my network, and tracks the money (points). It is free, needs no account, and real people use it (pill, badges). Download is the button." The product shot right under it shows the dashboard the subtitle promised.

## AGENTS.md rules

- **Dark theme only:** uses only the existing tokens (`--text`, `--muted`, `--faint`, `--accent`, `--accent-soft`, `--accent-line`, `--border`, `--border-strong`, `--surface`). The one extra colour is the amber of the star icon (`#fbbf24`), decorative only; drop it to `--faint` if one accent must be strict.
- **Every visible string in i18n:** all text is real HTML text; six new keys, listed above. No text in images.
- **No earnings figure stated as typical:** the hero text has no figure. The only figures are the existing demo screenshot and the live stars, pulls and service count.
- **No trackers or third-party requests:** no new assets at all; icons are inline SVGs from `Icon.astro` and `PlatformIcon.astro`, fonts are the self-hosted Onest already loaded.
- **No provider links:** none in the hero.
- **Navbar and sections below unchanged:** only the hero section changed; the shot, its glow, mask and rise animation are the original markup and CSS, so the hero still melts into the platforms strip.
- **a11y and overflow:** axe (WCAG 2.0/2.1/2.2 A and AA) over the new hero reports 0 violations at 1440 and 390. `scrollWidth - innerWidth` is 0 at 320, 360, 390, 640, 768, 820, 1024, 1280 and 1440. Badges stay a valid `<dl>` (each `div` holds `dt` then `dd`; CSS `order` puts the number first visually, as today). The point details hidden on phones stay readable to screen readers.
- **Build box:** every render and check ran on the MacMini.

## Implementation cost

- **`src/pages/[...locale]/index.astro`:** replace lines 108-131 (pill to stats note) with the new markup: pill, h1, subtitle `<p>`, a `<ul>` of three points (`Icon` box, shield, coin), the unchanged `.hero__actions` div, the badge `<dl>` and the footnote `<p>` with `Icon info`. The shot block (133-138) stays as it is. About 30 lines of markup. Keep the class `.hero__actions` (the CTA at the bottom reuses it; this design does not change its rules).
- **CSS:** about 45 lines in the scoped `<style>`: replace the `.hero__title`, `.hero__lead`, `.hero__expect`, `.stats-line`, `.stats*` rules (about 70 lines today) with the point, badge and footnote rules, plus a few lines at 820, 640 and 520 px. Net change in CSS is close to zero.
- **Components:** none new. `Icon.astro` needs one new icon, `grid` (four rounded squares, one line), for the services badge; or reuse `box`.
- **i18n:** six new keys (`home.hero.points.{setup,fence,payouts}.{title,text}`) in all 20 locales, and new text for `home.hero.pill`, `home.hero.title` and `home.hero.lead` in all 20. `expect`, `download`, `selfhost`, `stats.*` and the alts are unchanged. Translations are short fragments, so the 1.5x length of French and German is safe: the title wraps to two balanced lines, each point label to two lines, and the band keeps its shape.
- **Data:** none. The same `data.stars.web`, `data.pulls.ui`, `live.length` and `data.fetchedAt`.

## Phone behaviour

- **At 820 px and below** the three points stay in one row but stack each cell vertically: icon tile on top, then label and detail, centred.
- **At 640 px and below** the buttons go full width and stack (as today), the title balances on two lines, and the shot switches to the phone frame (the original rule).
- **At 520 px and below** the point detail lines are visually hidden; each cell shows only its icon and label ("Sets up the apps", "Fences them off", "Tracks every payout") in a compact 110 px band. The badges wrap to two rows (stars and pulls, then services), and the footnote is three lines.
- **First screen at 390 x 900:** pill, title (2 lines), subtitle (3 lines), points band, both buttons, badges, footnote, and the top 120 px of the phone shot (shot starts at y 782; base: y 891, below the fold).
- **At 320 px** the title takes three lines and nothing overflows.

Caveat: in the full-page shots the dashboard window looks dimmer than in the `top-*` shots. That comes from the shooter (the rise animation replays during the full-page capture), and the base shots show the same; the `top-*` shots show the real look.
