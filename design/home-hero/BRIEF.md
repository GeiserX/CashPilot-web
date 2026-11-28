# Home hero: brief

Facts about the hero of https://cashpilot.club as built from `origin/main` f3ed12a on 2026-11-28. Line numbers refer to this worktree. All data in this build came live from GitHub and Docker Hub (`[data] all live` in the build log).

## 1. The mockup base

- `base/` is the built home page: `index.html`, `_astro/` (CSS, Onest fonts, every image variant), `favicon.svg`, `apple-touch-icon.png`, `og.png`. Asset URLs are relative, so it renders from `file://`. Page links (`/download/` and others) stay absolute and do not resolve locally; that is expected.
- `base/index.html` has 74 lines. The hero is on line 42: from `<section class="hero"` to `<section class="platforms"`. That line also holds the header markup before it.
- The hero CSS is in `_astro/index.uoNOPErF.css`, scoped as `.hero[data-astro-cid-ba372snk]`. New markup without that attribute gets none of the scoped rules. Put your CSS in a `<style>` block in `<head>`, or give your elements the attribute.
- Global classes (`.container`, `.btn`, `.btn--primary`, `.btn--ghost`, `.num`, `.card`, `.visually-hidden`) are unscoped in `_astro/Base.Dq4D8C3q.css` and work on new markup.
- Line 8-9 of `index.html` is the first-visit language script. A browser whose language is not English is sent to `/<locale>/`, which does not exist in `base/`. The headless shooter runs in English, so this does not trigger.
- Shots of the base: `base/shot-{1440,1024,390}.png` (full page) and `base/top-{1440,1024,390}.png` (first 900 px).
- First-screen helper: `node /Volumes/Data/scratch/site-hero/shoot-top.cjs index.html top-<w>.png <w> [height]` on the MacMini (same as `shoot.cjs`, without `fullPage`).

## 2. The hero, element by element

Markup: `src/pages/[...locale]/index.astro:106-139`. Strings: `src/i18n/en.json:38-54`.

| # | Element | Markup | Key | English text | Words |
| --- | --- | --- | --- | --- | --- |
| 1 | Pill (check icon + text) | `:108` | `home.hero.pill` (en.json:39) | Free and open source, GPL-3.0 | 5 |
| 2 | H1 | `:109` | `home.hero.title` (:40) | Put your idle hardware to work. See every payout in one dashboard. | 12, 2 sentences |
| 3 | Lead | `:110` | `home.hero.lead` (:41) | CashPilot sets up bandwidth sharing, DePIN, mining, GPU and storage services on your computers, home servers and Raspberry Pi. It can fence these apps off from your home network, so they reach the internet and nothing else. It reads your balance from each provider and keeps the history in one place, on your own machine. | 55, 3 sentences, 321 characters |
| 4 | Primary button | `:112` | `home.hero.download` (:42) | Download, links `/download/` | 1 |
| 5 | Ghost button (Docker logo) | `:113` | `home.hero.selfhost` (:43) | Self-host with Docker, links `/download/docker/` | 3 |
| 6 | Expect line | `:115` | `home.hero.expect` (:44) | CashPilot does not pay you. The providers do. Earnings depend on your country, connection and hardware. | 16, 3 sentences |
| 7 | Stats `<dl>` | `:116-130` | `home.stats.label` (:49) "CashPilot in numbers" (aria-label); `home.stats.stars` "GitHub stars", `.pulls` "Docker pulls", `.services` "supported services" | 90 GitHub stars · 94,354 Docker pulls · 50 supported services | |
| 8 | Stats note | `:131` | `home.stats.note` (:53) | From GitHub and Docker Hub on {date}. (renders "November 28, 2026") | 7 |
| 9 | Desktop shot | `:136` | `home.hero.imageAlt` (:45) | WindowFrame, title bar `localhost:8080`, eager | alt 21 |
| 10 | Phone shot | `:137` | `home.hero.imageAltMobile` (:46) | PhoneFrame, shown only at 640 px and below | alt 15 |
| 11 | Glow | `:135` | none | Two blurred radial gradients behind the shot | |

The lead covers four topics in three sentences: what it sets up, where it runs, the network fence, and balance reading with local history.

Translated hero strings are longer than English in some locales: the French title is 99 characters (English 66) and the French lead 381 (English 321); German 78 and 370. A design must survive about 1.5 times the English length.

### Measured boxes (base, viewport height 900)

| Element | 1440 | 1024 | 390 |
| --- | --- | --- | --- |
| Header | 0-65 | 0-65 | 0-65 |
| Pill | y 129, h 36 | y 116 | y 101 |
| H1 | y 185, h 112 (2 lines), 52.8 px | y 172, h 91 (2 lines), 43 px | y 157, h 153 (4 lines), 36 px |
| Lead | y 316, h 152 (5 lines), 19 px, 672 px wide | y 282, h 136 (5 lines), 17 px | y 328, h 218 (8 lines), 17 px |
| Buttons | y 496, h 48 | y 446 | y 574, h 108 (stacked) |
| Expect | y 560, h 24 | y 510 | y 698, h 72 (3 lines) |
| Stats + note | y 596, h 24 | y 546 | y 782, h 77 (3 lines) |
| Shot starts | y 664 | y 611 | y 891 |
| Platforms strip | y 1131 | y 1025 | y 1166 |

At 1440 the first screen shows the text block and only the top 236 px of the product shot. At 390 the first screen ends at the stats; the phone shot starts below the fold.

### CSS that sizes and places it

All in `src/pages/[...locale]/index.astro` (scoped `<style>` from line 438):

- `.hero` `:440-444`: `position: relative; padding-top: clamp(2.25rem, 5vw, 4rem); overflow: hidden`.
- `.hero__inner` `:445-450`: flex column, `align-items: center; text-align: center`. Inside `.container` (max 1160 px, gutter `clamp(1.1rem, 4vw, 2rem)`).
- `.pill` `:451-467`: inline-flex, `padding: .35rem .85rem`, `border: 1px solid var(--accent-line)`, radius 999px, `background: var(--accent-soft)`, 0.875rem/500; icon 1rem in `--accent`.
- `.hero__title` `:468-474`: `margin-top: 1.25rem; max-width: 34ch; font-size: clamp(2.25rem, 4.2vw, 3.3rem); line-height: 1.06; letter-spacing: -0.035em`. Global h1: weight 700, `text-wrap: balance`.
- `.hero__lead` `:475-480`: `margin-top: 1.2rem; max-width: 42rem; color: var(--muted); font-size: clamp(1.0625rem, 1.5vw, 1.1875rem)`. Global p: `text-wrap: pretty`.
- `.hero__actions` `:481-487`: flex wrap, centred, gap .75rem, `margin-top: 1.75rem`. **The CTA section reuses this class** (`:428`, override at `:897-899`), so a change here also changes the CTA at the bottom of the page.
- `.hero__expect` `:488-493`: `margin-top: 1rem; max-width: 52rem; color: var(--faint); font-size: .9375rem`.
- `.stats-line`, `.stats`, `.stats dt/dd`, `.stats__note` `:494-527`: flex wrap centred; each stat is `row-reverse` so the number (700, `--text`) shows before the label (`--muted`); note `.8125rem` in `--faint`.
- `.hero__shot` `:528-531`: `margin-top: clamp(2rem, 4vw, 2.75rem)`.
- `.hero__glow` `:532-541`: `inset: -10% 5% auto; height: 70%`; rose `rgb(251 113 133 / .22)` at 30% 40% and orange `rgb(255 152 0 / .14)` at 75% 35%; `blur(30px)`.
- `.hero__shot .window` `:545-549`: mask fades the bottom 22% of the screenshot to transparent, so it melts into the platforms strip.
- Motion `:550-566`: "the one effect on the site": the window and phone rise 8 px and fade in over 200 ms, only with `prefers-reduced-motion: no-preference`.
- At 640 px and below `:914-930`: desktop frame hidden, phone shown centred at max 280 px, phone masked at 80%.
- There is no hero rule at 1024 px.

Frames: `src/components/WindowFrame.astro` (radius 12px, border `--border-strong`, background `#0d0d14`, 34 px bar `#15151f` with three `#3a3a50` dots and a mono title, shadow `0 30px 80px -20px rgb(0 0 0 / .75)`; `<Picture>` avif + webp at 640/960/1440/1920/2880). `src/components/PhoneFrame.astro` (max 300px, padding 10px, radius 42px, gradient `#24243a` to `#12121c`; image radius 33px).

## 3. The data behind the stats row

- Read once per build by `getData()` in `src/data/index.ts`. `fetchLive()` in `src/data/fetch.ts:244` fetches everything in parallel.
- **Stars** (`data.stars.web`): `stargazers_count` of GeiserX/CashPilot only, from `api.github.com/repos/...` (`fetch.ts:256-262`). The other repos (desktop 4, android 9, mcp 3, ha 3 in the snapshot) are fetched but not shown here. **The header shows the same number** (`src/layouts/Base.astro:70`, `Header.astro:27`), so it appears twice in the first screen.
- **Docker pulls** (`data.pulls.ui`): `pull_count` of `drumsergio/cashpilot` from `hub.docker.com/v2/repositories/` (`fetch.ts:217`, `:263`). The worker image `drumsergio/cashpilot-worker` (99,024 in the snapshot) is fetched but not shown.
- **Supported services** (`live.length`, `index.astro:37`): catalog services with `status` `active` or `beta` (`isLive`, `src/data/index.ts:49`). The catalog is `services/**/*.yml` of GeiserX/CashPilot. Today 50 of 61 entries; by group 18 bandwidth sharing, 15 DePIN, 8 mining, 7 GPU compute, 2 storage.
- **Date** (`data.fetchedAt`): the build time, as `new Date().toISOString()` (`fetch.ts:286`), shown with `t.date()` in the page locale. Numbers use `Intl.NumberFormat` (`t.num`).
- **How it updates:** `.github/workflows/pages.yml` rebuilds on every push to `main`, daily at 05:17 UTC (`cron: "17 5 * * *"`) and on demand. In CI a part that cannot be fetched fails the build, so the last good deploy stays live. Locally a missing part comes from `src/data/snapshot.json` (last refreshed 2026-11-27T14:58Z: 90 stars, 93,853 pulls), and the page then keeps the snapshot's date. `CASHPILOT_OFFLINE=1` skips the network; `bun run data:snapshot` refreshes the snapshot.

## 4. The hero images

- `src/assets/shots/hero.png`: 2880 x 1135, 132 KB. The web dashboard at `localhost:8080` with demo data: nav (Dashboard, Fleet, Catalog, Payouts, Settings, "+ Add service", $34.32, USD), Balance $34.32 ("Earned all time $59.32 ($25.00 cashed out)"), Today $0.75 (+30.8%), This month $21.48, Containers up 12; a Placement grid (8 services by 5 machines box-a to box-d and phone-a, up/degraded/down, Grass "runs outside the fleet"); an "Earned per day" bar chart for Oct 25-31 ($0 to $1); the top of "Resource use per server". Made by `scripts/prepare-images.ts:45-61`, which joins the top 482 px and a lower 653 px of `docs/images/screenshots/dashboard.png` from the CashPilot repo and leaves out the "Needs attention" list.
- `src/assets/shots/hero-mobile.png`: 780 x 765, 42 KB. The same dashboard on a phone: header, tabs, Balance $34.32, Today $0.75, This month $21.48, Containers up 12. Cropped from `dashboard-mobile.png` (`prepare-images.ts:36`).
- The demo figures are product screenshots, not a claim of typical earnings. Any new figure placed in the hero text would fall under "no earnings figure stated as typical".
- Other shots in `src/assets/shots/` (used by the Tour below): `fleet`, `catalog`, `payouts`, `desktop-dashboard`, `android-home`, each with a `-crop` version.

## 5. What the sections right below already say

In page order (`index.astro`):

1. **Platforms strip** `:141-157`, flush under the hero (border top and bottom, `--bg-alt`): "Runs on" + Windows, macOS, Linux, Android, Docker, Raspberry Pi, each a pill link to its download page.
2. **How it works** `:159-161` (`src/components/HowItWorks.astro`): "Three steps, and no account with us." Install CashPilot (desktop app, or Docker on a home server, NAS or Pi), Pick your services (catalog, sign up with the provider, paste your login; own container per service, or balance reading only), Watch every payout (reads balances every hour, keeps the history, asks whether a drop was a payout). Then "50 services in five groups" with the counts per group.
3. **A look inside** `:163-170` (`Tour.astro`, alt background): tabs with real screens: Fleet, Catalog, Payouts, Desktop app, Android companion.
4. **What's the catch?** `:172-192`: Free (no price, no paid plan, no ads), Open source (GPL-3.0), Runs on your hardware (we run no servers for you), No account with us; plus the referral funding line.
5. **You stay in control** + **What changes your earnings** `:194-264`: logins encrypted on your machine, each service in its own container, kept off your home network, stop anything; provider grades A to F. Six earnings factors (country, IP type, connection, uptime, devices, GPU) and "Some setups earn very little."
6. **Popular services** table `:266-344`, **Questions** (FAQ) `:346-365`, **How CashPilot compares** `:367-421`, **Ready to try it?** CTA `:423-435` (Download + View the source on GitHub).

So these are already covered below the hero: the platform list, the setup steps, the category counts, the screens, "free / open / no account", the network fence and container isolation, and the earnings factors.

## 6. Design tokens (`src/styles/global.css`)

- Colours (`:5-20`): `--bg #07070c`, `--bg-alt #0b0b12`, `--surface #101019`, `--surface-2 #161622`, `--border #23233a`, `--border-strong #34344f`, `--text #ededf4` (17:1), `--muted #b0aec3` (8.4:1), `--faint #8a889f` (5.0:1), `--accent #fb7185` (rose of the wordmark, 7.6:1), `--accent-hover #fda4af`, `--accent-ink #22070f`, `--accent-soft rgb(251 113 133 / .12)`, `--accent-line rgb(251 113 133 / .35)`. One accent only. The glow adds orange `rgb(255 152 0)`; the logo is a rose-orange-violet sunset.
- Fonts (`:22-26`): `--font-brand` "Onest Variable" (self-hosted through `@fontsource-variable/onest`, Latin and Cyrillic); `--font-system` for Arabic, Hindi, Vietnamese, Thai, Chinese, Japanese, Korean (`html[data-font="system"]`, set per locale in `src/i18n/locales.ts`); `--font-mono` for commands, codes and URLs only. Body 1.0625rem (17 px), line-height 1.6. Headings 700, line-height 1.15, `-0.02em`, `text-wrap: balance`. `.num` = tabular figures in the page font.
- Sizes (`:28-33`): `--radius 14px`, `--radius-sm 9px`, `--container 1160px`, `--gutter clamp(1.1rem, 4vw, 2rem)`, `--section clamp(3.5rem, 7vw, 5.5rem)`, `--header-h 64px`.
- Buttons (`:218-268`): `.btn` pill (radius 999px), min-height 48px, padding `.7rem 1.35rem`, 600 weight, 1rem, icon 1.15em; `.btn--primary` rose background with `--accent-ink` text; `.btn--ghost` transparent with `--border-strong`, hover rose border and `--accent-soft`; `.btn--sm` 40px.
- Cards (`:287-303`): `--surface`, `--border`, radius 14px, padding `1.4rem 1.5rem`.
- Sections: `.section` padding `--section`; `.section + .section` gets a top border; `.section--alt` uses `--bg-alt`; `.section-head` max 46rem, h2 `clamp(1.75rem, 3.4vw, 2.5rem)`, lead 1.125rem `--muted`.
- Icons: `src/components/Icon.astro`, 24x24 stroke icons drawn for the site: download, arrow, check, dash, copy, globe, chevron, star, info, lock, box, home, power, shield, map, wifi, clock, devices, chip, router, server, coin, disk, pickaxe, network, bot, book, external. `PlatformIcon.astro`: windows, macos, linux, android, docker, pi, github, homeassistant.
- Motion: only the hero rise (200 ms, 8 px), plus 150 ms colour transitions on buttons and cards, all behind `prefers-reduced-motion: no-preference`.

## 7. What the product offers that a hero could show

From the site README, `home.description`, and the page's own sections and FAQ:

- **What it is:** free, open-source software (GPL-3.0-or-later) that runs bandwidth sharing, DePIN, mining, GPU compute and storage services on your own machines and shows every payout in one dashboard.
- **Three ways to run it:** desktop app for Windows, macOS and Linux (pinned v2.0.0; works with Docker or Podman, a setup wizard helps install Docker; can also join a server you already run); server with Docker on a home server, NAS or Raspberry Pi 3/4/5 64-bit (pinned v3.0.1, images `drumsergio/cashpilot:3.0` and `drumsergio/cashpilot-worker:3.0`); Android companion (pinned v1.0.3) that watches the earning apps on the phone and reports them to the server or desktop app, without Docker. An MCP server for AI agents also exists (v0.4.0), listed on the download pages.
- **50 supported services** in five groups (18 bandwidth sharing, 15 DePIN, 8 mining in beta, 7 GPU compute, 2 storage), each with a setup guide in the docs. Services with a Docker image are started in their own container; for the others CashPilot reads the balance.
- **Network fence:** it can fence the apps off from the home network, so they reach the internet and nothing else. The comparison table marks this as unique among the four open-source alternatives checked on 2026-11-04 (money4band, income-generator, InternetIncome, CashFactory).
- **Container lock-down:** each started service runs apart from the others, with extra rights dropped and a process limit; control of containers is filtered.
- **Balances and history:** reads balances from provider accounts every hour, keeps the history on your own machine, asks you when a balance drops whether you were paid. Earned per day, per machine, cashed out.
- **Fleet:** one dashboard for many machines; a machine that stops reporting turns red.
- **Privacy:** no account with the project, no sign-up, no email; logins stored encrypted in its own database; sends nothing to the project. The site itself has no cookies, analytics or third-party requests.
- **Provider grades:** every provider graded A to F on the same ten questions, each answer linked to its source.
- **Honesty lines already used:** "CashPilot does not pay you. The providers do." and "Nobody can promise you a figure." and "Some setups earn very little."
- **20 languages** on the site (English plus 19 locale files), with right-to-left Arabic.
- **Proof numbers available at build time:** stars per repo, Docker pulls for the UI and worker images, service counts per group, release versions, file sizes and checksums.
- **Funding:** some provider links are referral links; the reward does not come out of the user's earnings.

## 8. Rules that bind every design

From `AGENTS.md` and `README.md`:

- Dark theme only.
- Every visible string in `src/i18n/<locale>.json`, a new key in all 20 files in the same change, so no text inside images. `en.json` is the source.
- No earnings figure stated as typical.
- No trackers, cookies or third-party requests: no external fonts, CDNs or remote images.
- Every provider link carries the project's referral code, with a referral note next to it. Avoid provider links in the hero.
- The navbar (`src/components/Header.astro`) stays as it is. The sections below stay as they are; the hero must flow into the platforms strip.
- Must pass `bun run a11y` (axe WCAG 2.2 AA) and `bun run overflow` (no sideways scroll from 320 to 1440 px).
- Build and screenshot on a build box, never the MacBook.
