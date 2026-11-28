# 3-motion: "Living hero"

The hero keeps the site's look: centred, the same pill, the Onest headings, one rose accent and the same buttons. The parts that move are a real list of the hardware it runs on and the services it supports. The long paragraph is gone. One short sentence says what CashPilot is. Three ticks say why it is safe.

Files: `index.html` (base page, hero text block swapped), `hero.css` (all new CSS, inlined into `index.html` as a `<style>` block), `make.py` (builds `index.html` from `../base/` and `src/data/snapshot.json`), `check.cjs` (axe, overflow, pause and reduced-motion checks), `shoot-frame.cjs` (first screen after a delay).
Shots: `shot-{1440,1024,390}.png` (full page), `top-{1440,1024,390}.png` (first 900 px), `frame-1440-6s.png` (title on "home server"), `frame-390-9s.png` (title on "Raspberry Pi"), `frame-390-reduce.png` (reduced motion: nothing moves, no pause button). All rendered on the MacMini.

## First screen, top to bottom

1. **Pill**: unchanged. It reads "Free and open source, GPL-3.0".
2. **Title**: three centred lines, "Put your" / **[word]** / "to work.". The middle line uses the logo's rose-to-orange gradient. It cycles through *idle hardware → laptop → home server → Raspberry Pi → GPU*, 2.8 s per word: a short cross-fade with a 0.3 em rise and a light blur. Screen readers get one static H1, "Put your idle hardware to work.". The three visual lines are `aria-hidden`.
3. **Lead**: one sentence, 23 words. It is two lines at 1024 and 1440, and four at 390.
4. **Three ticks**: "Kept off your home network", "History stays on your machine", "No account with us". They use rose check icons in `--text`, so they read as claims and not as fine print. They stack on a phone.
5. **Buttons**: unchanged (Download, Self-host with Docker).
6. **Expect line**: same text as before, fixed directly under the buttons. It now has an info icon and fits on one line at 1024 and wider. It reads as the caption of the buttons, not a separate grey line.
7. **Service band**: all 50 live catalog names, mixed by group (bandwidth, DePIN, GPU, storage, mining in turn). Each name has its group's site icon (`categoryIcon` in `src/lib/catalog.ts`). It is plain text, with no links and no logos. A full loop takes 190 s, about 37 px/s. The edges fade out, and the band pauses on hover. It sits in the content column, with a round pause button at its end.
8. **Counters**: 50 supported services (in rose), 94,354 Docker pulls and 90 GitHub stars, at 36 px and weight 700, split by thin dividers. They are the same build-time numbers as today and do not count up: a count-up shows numbers that are not true for a moment and needs JavaScript.
9. **Date note**: the same "From GitHub and Docker Hub on {date}." with a clock icon, centred under the counters.
10. **Product shot**: the same WindowFrame, PhoneFrame and glow. The glow now drifts slowly (16 s, alternating), and the pause button stops it too.

## Copy: old key → new text

| Key | Before | After | Words before → after |
| --- | --- | --- | --- |
| `home.hero.pill` | Free and open source, GPL-3.0 | unchanged | 5 → 5 |
| `home.hero.title` | Put your idle hardware to work. See every payout in one dashboard. | Put your idle hardware to work. *(H1 text for screen readers and the reduced-motion meaning)* | 12 → 6 |
| `home.hero.titleStart` **new** | | Put your | 2 |
| `home.hero.words.idle` **new** | | idle hardware | 2 |
| `home.hero.words.laptop` **new** | | laptop | 1 |
| `home.hero.words.server` **new** | | home server | 2 |
| `home.hero.words.pi` **new** | | Raspberry Pi | 2 |
| `home.hero.words.gpu` **new** | | GPU | 1 |
| `home.hero.titleEnd` **new** | | to work. | 2 |
| `home.hero.lead` | CashPilot sets up bandwidth sharing, DePIN, mining, GPU and storage services on your computers, home servers and Raspberry Pi. It can fence these apps off from your home network, so they reach the internet and nothing else. It reads your balance from each provider and keeps the history in one place, on your own machine. | CashPilot runs bandwidth sharing, DePIN, mining, GPU and storage apps on the machines you already own, and shows every payout in one dashboard. | 55 → 23 (321 → 143 characters, 3 sentences → 1) |
| `home.hero.points.fence` **new** | | Kept off your home network | 5 |
| `home.hero.points.local` **new** | | History stays on your machine | 5 |
| `home.hero.points.account` **new** | | No account with us | 4 |
| `home.hero.pause` **new** | | Pause the animation | 3 (accessible name of the pause control) |
| `home.hero.download`, `.selfhost`, `.expect` | | unchanged | 1, 3, 16 |
| `home.stats.*` | | unchanged; `home.stats.services` is also the `aria-label` of the service band | |

Visible hero text, not counting buttons and numbers: 5 + 12 + 55 + 16 + 7 = 95 words before, and 5 + 6 + 23 + 14 + 16 + 7 = 71 after. The 6 words of the title are the ones on screen at one time.

Note for translators: each `words.*` string may carry its own article or possessive, and `titleStart` or `titleEnd` may be empty (an empty line is hidden with `.mh__line:empty`). German, for example, can use "Lass" / "deinen Laptop", "deine Grafikkarte" / "arbeiten.". Japanese can leave `titleStart` empty.

## How it answers each problem

- **The lead is long and dense.** It is now one sentence, down from 55 words to 23. The four topics are split out. *What and where* goes in the lead. *The network fence*, *local history* and *no account* become three ticks you can scan in one look. The "Runs on" strip and "How it works" right below cover the device list and the setup steps.
- **A wall of centred text.** The title has three short lines with a coloured middle line. Under the lead there is a row of icons, and further down a moving band and big numbers. Each line has its own job and its own look, so the column is no longer one grey block.
- **The disclaimer and stats look like leftovers.** The expect line sits directly under the buttons with an icon, as their caption. The stats become large counters with dividers, like the rest of the site's figures. The date note is anchored under them with a clock icon.
- **Weak hierarchy.** The order is now title (the largest, with colour and motion), then lead (19 px, muted), ticks (15 px, bright, with icons), buttons, caption, then proof (band and counters). The eye has one clear path.

## What a visitor understands in five seconds

The cycling word answers "what does it run on?" with the visitor's own device: *my laptop, my home server, my Pi, my GPU*. The lead answers "what is it?": earning apps on machines I own, every payout in one dashboard. The ticks answer "is it safe?": off my home network, my data stays with me, no account. The band and the counters answer "is it real?": 50 named services, about 94 thousand Docker pulls. The primary action is the one rose button.

## AGENTS.md rules

- **Dark theme only**: the existing tokens only (`--text`, `--muted`, `--faint`, `--accent`, `--border`, `--bg`). The gradient stops are the logo's rose `#fda4af`/`#fb7185` and orange `#ff9800`, all above 7:1 on `--bg`.
- **Every visible string in i18n**: every hero string has a key (table above). The service names are catalog data, read at build time like the "Popular services" table. They are proper nouns and do not get translated. The catalog's own parenthetical is cut for the band, for example "XMRig (Monero CPU mining)" becomes "XMRig". No text is inside an image.
- **No earnings figure stated as typical**: the hero has no money figure. The only numbers are services, pulls and stars, with their date. The product screenshot is unchanged demo data, as today.
- **No trackers, cookies or third-party requests**: everything is CSS, with no JavaScript. The icons are the site's own inline SVGs, and fonts and images stay local.
- **Provider links carry the referral code**: the band has no links at all.
- **Navbar unchanged, sections below unchanged, the hero flows into them**: the header markup is byte-identical to base. The product shot still fades into the "Runs on" strip.
- **Pinned versions, build box**: the build, shots and checks all ran on the MacMini.
- **a11y and overflow** (`check.cjs`, run on the MacMini):
  - axe WCAG 2.2 AA on `.hero`: 0 violations at 1440 and 390, with 21 rules passed. The check waits 1 s so the site's own 200 ms rise ends first. Without that wait, base shows the same contrast hit on `localhost:8080` in the middle of the fade.
  - No sideways scroll at 320, 360, 375, 390, 414, 768, 1024 and 1440 px, with English and with French-length strings (title words such as "ordinateur portable" and "serveur domestique", and a lead of 190 characters, about 1.3 times the new English).
  - Pause: the checkbox can be reached with Tab, and Space sets every `mh-*` animation to `paused`.
  - Reduced motion: 0 `mh-*` animations, and the pause button is hidden.
  - Both checks can fail. A copy with a 2000 px element failed overflow. A copy without the pause rule failed the pause check.
- **Motion and WCAG 2.2.2 (Pause, Stop, Hide)**: the title and the band move for more than 5 seconds, so they need a way to stop them. A visually hidden checkbox and its label, a round pause/play button, pause the title, the band and the glow through `:has(#mh-pause:checked)`. It works with no JavaScript, from the keyboard, and has a visible focus ring. Hovering the band also pauses it. With `prefers-reduced-motion: reduce`, nothing animates at all. The title shows "idle hardware", the band is a still, faded row, and the button is gone.
- **RTL**: the band uses its own `mh-scroll-rtl` keyframes (`translateX(50%)`). It was tested with `dir="rtl"`: the track covers the box at 0%, 50% and 99.9% of the loop, in both directions.

## Implementation cost

- **`src/pages/[...locale]/index.astro`**: replace lines 108-131 (the pill stays) with the new markup, about 35 lines.
  - The title has a visually hidden H1 sentence, plus three `aria-hidden` spans. The middle span maps over the five `words.*` keys with `style="--i:N"`.
  - The ticks are a `<ul>` of three `<Icon name="check" />` items.
  - The buttons are unchanged.
  - The expect line gets `<Icon name="info" />`.
  - The band reuses the `live` array that already exists at `:37`. Mix it by `CATEGORY_ORDER` and use `categoryIcon` from `src/lib/catalog.ts`. Render the `<ul>` twice, with the second one `aria-hidden`. Add the checkbox and label.
  - The counters reuse the existing `<dl>`, reordered with services first.
  - No new components. A `HeroBand.astro` would be optional tidiness.
- **CSS**: about 195 lines in the scoped `<style>` (`hero.css` is the full set). It replaces `.hero__title`, `.hero__lead`, `.hero__expect` and `.stats*`. `.hero__actions` is not changed: the margin override is on `.mh__actions`, so the CTA at the bottom, which reuses `.hero__actions`, is untouched. The existing `.hero__shot`, glow and 640 px rules stay. Only the shot's top margin and the hero's top padding are tightened.
- **i18n**: 11 new keys (`titleStart`, `titleEnd`, five `words.*`, three `points.*`, `pause`) and 2 changed keys (`title`, `lead`) in all 20 locale files. `bun run i18n:check --strict --all` gates this.
- **Data**: nothing new. The stars, pulls, service count, date and catalog names are what the page already fetches.

## Phone (390 px)

- The title is three lines at 40 px, and every word in the cycle fits on one line ("Raspberry Pi" is the widest). Long translations wrap inside the middle line, and the line grows without overflow.
- The lead is 4 lines. The ticks stack as three centred lines.
- The buttons are full width and stacked, as today.
- The expect line is centred over 3 lines with its icon.
- The band fills the column with the pause button at its end.
- The counters keep three columns, with labels at 13 px that wrap to two lines.
- The first screen ends at the date note, as base ends at its stats. The phone screenshot starts just below the fold, then the "Runs on" strip.

## Trade-off

The title is three lines and the hero has a proof block, so the product shot starts lower:

| Width | Shot starts (new) | Shot starts (base) | Visible in the first 900 px (new) |
| --- | --- | --- | --- |
| 1440 | y 809 | y 664 | the window bar and the app's nav |
| 1024 | y 758 | y 611 | the window bar, the app's nav and "Dashboard" |

In exchange, the first screen holds the whole story: what it is, why it is safe, what to click and proof that it is real. If the judges want more of the screenshot above the fold, there are two cheap levers: drop the date note into a `title` attribute (saves 30 px), or put the counters to the side of the band at 1440 (saves about 90 px).
