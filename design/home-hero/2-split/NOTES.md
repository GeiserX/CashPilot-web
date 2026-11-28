# Design 2: split hero

The words go on the left. The product goes on the right. The long lead becomes one short sentence, and the other three things it tried to say become three labels on the screenshot. Each label points at the part of the dashboard it describes.

Files:

- `index.html`: the mockup. It is `base-index.html` with the hero swapped out and `hero.css` added in a `<style>` block. `build.py` rebuilds it from `hero.html` and `hero.css`.
- `shot-1440.png`, `shot-1024.png`, `shot-390.png`: full page. `top-*.png`: first 900 px. Extra checks: `top-768.png`, `top-660.png` (tablet band), `top-320.png`, `tall-390.png` (first 1250 px on a phone). All were rendered on the MacMini.

## 1. The copy, key by key

| Key | Old text (words) | New text (words) |
| --- | --- | --- |
| `home.hero.pill` | Free and open source, GPL-3.0 (5) | Free, open source, no sign-up (5) |
| `home.hero.title` | Put your idle hardware to work. See every payout in one dashboard. (12) | Put your idle hardware to work. (6) |
| `home.hero.titleAccent` **new** | (the second sentence of the old title) | See every payout in one dashboard. (6) |
| `home.hero.lead` | CashPilot sets up bandwidth sharing, DePIN, mining, GPU and storage services on your computers, home servers and Raspberry Pi. It can fence these apps off from your home network, so they reach the internet and nothing else. It reads your balance from each provider and keeps the history in one place, on your own machine. (55 words, 321 characters) | CashPilot runs bandwidth sharing, DePIN, mining and GPU apps on the computers you already own, and tracks what each one pays you. (22 words, 129 characters) |
| `home.hero.download` | Download | unchanged |
| `home.hero.selfhost` | Self-host with Docker | unchanged |
| `home.hero.expect` | CashPilot does not pay you. The providers do. Earnings depend on your country, connection and hardware. (16) | unchanged text, new placement and style |
| `home.hero.callouts.services` **new** | none | One dashboard for {count} services (5), `{count}` = live service count, 50 today |
| fence label | none | reuses `home.control.lan.title`: Kept off your home network (5) |
| `home.hero.callouts.history` **new** | none | History stays on your machine (5) |
| `home.stats.*`, `home.stats.note` | unchanged | unchanged text, new layout |
| `home.hero.imageAlt`, `imageAltMobile` | unchanged | unchanged |

Total visible hero words: about 120 before, about 85 after. The lead goes from 55 words to 22.

## 2. What changed and why

- **Two columns at 901 px and up.** On the left: the pill, the title, the lead, the buttons, the honesty note, and the numbers. On the right: the desktop window. It is twice the column width and runs off the right edge of the page, so the dashboard is big enough to read: at 1440 px it is about 1180 px wide and shows the tiles, the whole Placement grid and the start of the chart. The phone overlaps the lower right corner. The whole hero fits in the first 900 px at 1440 and 1024 (hero 823 px and 715 px tall). Today, only the top 236 px of the screenshot shows at 1440.
- **The title has two lines of different colour.** "Put your idle hardware to work." is white. "See every payout in one dashboard." uses the rose-to-orange of the logo (CSS gradient on the text, with `--accent` as fallback colour). The first line says what you do. The second says what CashPilot gives you.
- **The lead says only what CashPilot is.** It lists the four big groups and says "tracks what each one pays you". Storage (2 services), the network fence and the local history leave the lead:
  - the fence and the history move to the labels on the screenshot;
  - the platform list is in the "Runs on" strip right below;
  - storage is in the category counts in "How it works".
- **Three labels on the screenshot.** Each one has a dot on a real element, a short dashed line and a chip. The labels are an HTML `<ul>` with real text:
  - "One dashboard for 50 services" points at the Placement grid title, the services-by-machine table.
  - "Kept off your home network" points at a container cell in the grid (EarnApp on box-c), one of the apps that gets fenced.
  - "History stays on your machine" points at "Earned all time $59.32 ($25.00 cashed out)", the history line in the Balance tile. Between 641 and 900 px the screenshot is shorter, so this label moves up to the balance figure and the three chips stay apart.
- **The honesty line is a note, not a leftover.** It has an info icon, `--muted` colour instead of `--faint`, and it sits right under the buttons. The text did not change.
- **The numbers are a proper row.** It has a hairline above it. Each figure is 1.5 rem bold, with its label under it and thin dividers between the three. The source line (`home.stats.note`) sits under them in small type. The figures stay live from the build.
- **The pill earns its place.** "Free, open source, no sign-up" swaps the licence name for the strongest trust fact the site has: "No account with us", from the "What's the catch?" section. GPL-3.0 is still in that section and in the footer.

## 3. How it answers each problem

| Problem | Answer |
| --- | --- |
| Lead too long and dense (4 topics, 55 words) | 22 words, one topic. The other topics are labels on the picture or sit in the strip right below. |
| A wall of centred text | Left-aligned text in a 26-28 rem column with the product beside it. Nothing is centred. |
| Disclaimer and stats look like leftovers | The disclaimer is an icon note under the buttons. The stats are a ruled row of big numbers with labels. |
| Weak hierarchy | From top to bottom: a small pill, a big two-colour title, a short muted lead, buttons, a small note, then the numbers row. Each step changes size or colour. |
| Product shot mostly below the fold | It shares the first screen with the text at 1440 and 1024. On a phone it starts at y 800 at 390 px. |

## 4. What a visitor understands in five seconds

1. The title: this puts my spare computers to work, and I see what they pay in one place.
2. The picture: a real dashboard with services across several machines, on desktop and phone.
3. The labels: 50 services, my home network is protected, my data stays with me.
4. The pill and the numbers: free, no sign-up, and real people use it (90 stars, 94,354 pulls).
5. What to click: the rose Download button. Docker users get the second button.

## 5. AGENTS.md rules

- **Dark theme only:** same tokens as the site (`--bg`, `--surface`, `--accent`, `--accent-line`, `--muted`, `--faint`, `--border`). No light surfaces.
- **Every string in i18n:** every visible word is HTML text. The labels are real text, not part of the image. There are 2 new keys plus 1 key split from the old title. The fence label reuses `home.control.lan.title`, which all 20 locales already have.
- **No earnings figure stated as typical:** the hero text has no figure. The dollar amounts are only the demo data inside the existing screenshot, as today. The "does not pay you" note stays, and it is more visible than before.
- **No trackers or third-party requests:** no new assets. The design uses the Onest font that is already there, the two existing screenshots, and inline SVG icons copied from `Icon.astro` (check, info, devices, shield, clock).
- **Referral links:** the hero has no provider links.
- **Navbar and sections below:** not touched. The hero ends with bottom padding and goes straight into the platforms strip, as now.
- **a11y and overflow:**
  - Page `scrollWidth` equals the viewport at 320, 360, 390, 640, 641, 768, 900, 901, 1024, 1100, 1280 and 1440 (measured with Playwright on the MacMini). The window that runs past the edge is clipped by `overflow: hidden` on the hero.
  - Label text is `#ededf4` on a 92% opaque `#101019` chip. The note is `--muted` (8.4:1).
  - The gradient title may come back from axe as "needs review" for colour contrast, not as a violation. The fallback colour `--accent` is 7.6:1. `bun run a11y` has not been run: this is a mockup, not a build.
- **Build box:** every shot was rendered on the MacMini.

## 6. Implementation cost

- **`index.astro` markup:** replace lines 106-139 with about 45 lines. `WindowFrame` and `PhoneFrame` are used unchanged; pass `class="sh-desktop"` / `"sh-phone"`. Give `WindowFrame` a `sizes` value that matches its larger size, for example `(min-width: 1101px) 1200px, (min-width: 901px) 900px, 100vw`. The labels are a `<ul>` of 3 items with icons from `Icon.astro` (`devices`, `shield`, `clock`). The services label uses `t("home.hero.callouts.services", { count: t.num(live.length) })`.
- **CSS:** `hero.css` is about 375 lines and replaces about 130 lines of hero CSS (`:439-566` and the hero rules at `:914-930`). Watch one trap: the CTA section at the bottom reuses `.hero__actions` (`:428`, `:897-899`). Either keep a `.hero__actions` rule for the CTA, or give the CTA its own class. The mockup uses `.sh__actions`, so the CTA is untouched.
- **New components:** none.
- **i18n:** across all 20 files:
  - add `home.hero.titleAccent`, made by splitting each locale's current `home.hero.title` at its first sentence (every locale checked so far is already two sentences);
  - add `home.hero.callouts.services` and `home.hero.callouts.history`;
  - rewrite `home.hero.pill` and `home.hero.lead`.
- **Risk:** the label positions are percentages of `hero.png`. If `scripts/prepare-images.ts` crops a different screenshot, the dots move. Put a comment beside the image import, and recheck the positions when the image changes.
- **RTL (Arabic):** the grid mirrors, so the window runs off the left edge. The phone uses `inset-inline-end`. The label layer keeps `direction: ltr` and physical `left` positions, because the screenshot is not mirrored. I have not rendered this in Arabic.
- **Longer languages:** the labels do not wrap on desktop. At 1.5x English length (about 40 characters) a chip is about 290 px wide, and that still fits on the visible part of the window at 1024 and 1440. A French or German title gets 1-2 more lines in the left column, so the hero grows by about 60-120 px. This has not been rendered.

## 7. Phones and tablets

- **901 px and up:** split, as described.
- **641-900 px:** one column. The text block is capped at 38 rem. Below it, the full-width window with the three labels, and the phone at 150 px overlapping the lower right corner.
- **640 px and below:** the window is hidden. Below the text, a two-column row: on the left, the phone screenshot (at most 11.5 rem, or 44% of the width), faded at the bottom; on the right, the three labels as a list, each with a round rose icon. The text is left-aligned and the buttons are full width, Download first. The three numbers stay in one row with dividers. At 390 px the phone row starts at y 800, so it peeks into the first screen. At 320 px every label wraps cleanly and nothing scrolls sideways.
- The 200 ms rise on the window and phone is kept. The labels fade in 150 ms later. Both run only with `prefers-reduced-motion: no-preference`.
