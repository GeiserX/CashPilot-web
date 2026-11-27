<p align="center">
  <img src="docs/images/banner.svg" alt="cashpilot.club" width="100%">
</p>

<h1 align="center">cashpilot.club</h1>

<p align="center">
  <a href="https://github.com/GeiserX/CashPilot-web/actions/workflows/pages.yml"><img src="https://img.shields.io/github/actions/workflow/status/GeiserX/CashPilot-web/pages.yml?style=flat-square&label=deploy" alt="Deploy"></a>
  <a href="https://github.com/GeiserX/CashPilot-web/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/GeiserX/CashPilot-web/ci.yml?style=flat-square&label=CI" alt="CI"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-GPL--3.0--or--later-blue?style=flat-square" alt="License: GPL-3.0-or-later"></a>
</p>

The website of [CashPilot](https://github.com/GeiserX/CashPilot): a landing page, downloads for every system, the referral disclosure, privacy and disclaimer pages. Static, dark only, no cookies, no analytics, and no request to any other host at runtime.

## Build

Needs Bun 1.3 and Node 22.23 or newer.

```sh
bun install
bun run build          # type check, then build to dist/
bun run preview        # serve dist/ the way GitHub Pages does
```

The build reads live data from GitHub and Docker Hub: the service catalog, star counts, Docker pulls, release versions, file sizes and checksums. Set `GITHUB_TOKEN` to avoid the API rate limit. Locally, any part it cannot fetch comes from `src/data/snapshot.json`, so the build also works offline. In CI (`CI` set) a part that cannot be fetched fails the build, so the last good deploy stays live. `CASHPILOT_OFFLINE=1` skips the network. `bun run data:snapshot` refreshes the snapshot.

Download buttons point at the exact release the page was built from, so the version, sizes and checksums on the page always match the file.

### Checks

```sh
bun run i18n:check     # placeholder and HTML mismatches; --strict: no missing keys; --all: all 20 files
bun run screenshots    # full-page shots at 1440 and 390 px into screenshots/; fails on any third-party request
bun run a11y           # axe-core WCAG 2.2 AA on every page; fails on any violation
bun run overflow       # fails when a page scrolls sideways, from 320 to 1440 px
```

`screenshots` and `a11y` need a Playwright Chromium (`bunx playwright install chromium`) and a build in `dist/`.

## Languages

Every visible string lives in `src/i18n/<locale>.json`, with the same keys as `en.json`. `en.json` is frozen: translators add locale files only. The 20 locales are listed in `src/i18n/locales.ts`. A locale is built when its file exists, at `/<locale>/` (English at `/`). A key missing from a locale shows in English, and `i18n:check` lists it. Keep `{placeholders}`, HTML tags and link targets exactly as in English: the check fails otherwise.

The picker shows once a second locale exists. It remembers the choice in `localStorage` only. The site suggests the stored language, or else the browser's, when the page exists in it, and never redirects.

## Layout

| Path | What |
| --- | --- |
| `src/pages/[...locale]/` | The pages, generated once per locale |
| `src/components/` | Header, footer, download panels, frames, small parts |
| `src/data/` | Build-time data fetcher and the offline snapshot |
| `src/lib/links.ts` | Every outside URL |
| `src/assets/shots/` | Product screenshots, cropped by `scripts/prepare-images.ts` |
| `public/` | `CNAME`, favicon, link preview image (`scripts/make-og.ts`) |

## Deploy

`.github/workflows/pages.yml` builds and deploys to GitHub Pages on every push to `main`, once a day, on demand, and on a `release` repository dispatch. The custom domain is `cashpilot.club` (`public/CNAME`).

The Desktop and Android release workflows should send that dispatch (`event_type: release`, a token with `repo` scope), so a new release reaches the site at once instead of up to a day later. GitHub turns off the daily schedule after 60 days without a commit here; re-enable it in the Actions tab.

## Rules for content

- No earnings figure stated as typical.
- A referral note next to every block of provider links, and every referral link listed on `/referrals/`.
- No personal data about anyone. Credit "CashPilot contributors".
- No trackers, cookies, newsletters or third-party requests.

## License

[GPL-3.0-or-later](LICENSE). CashPilot contributors.
