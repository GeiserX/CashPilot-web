#!/usr/bin/env python3
"""Build 3-motion/index.html from ../base/index.html: swap the hero text block, add the style block.

Service names come from src/data/snapshot.json (the same catalog the real page reads), live ones only.
"""
import html, json, pathlib, re

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parents[2]
base = (HERE.parent / "base" / "index.html").read_text()
snap = json.loads((ROOT / "src/data/snapshot.json").read_text())

ICON = {
    "check": '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    "info": '<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 7.5v.5"/>',
    "clock": '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    "download": '<path d="M12 4v11"/><path d="m7 10 5 5 5-5"/><path d="M5 20h14"/>',
    "wifi": '<path d="M2.5 9a14 14 0 0 1 19 0"/><path d="M5.5 12.5a9.5 9.5 0 0 1 13 0"/><path d="M8.7 16a5 5 0 0 1 6.6 0"/><path d="M12 19.5h.01"/>',
    "network": '<circle cx="12" cy="5" r="2.2"/><circle cx="5" cy="18" r="2.2"/><circle cx="19" cy="18" r="2.2"/><path d="M12 7.2v4.3M12 11.5 6.6 16.3M12 11.5l5.4 4.8"/>',
    "chip": '<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9.5" y="9.5" width="5" height="5"/><path d="M9 2.5V6M15 2.5V6M9 18v3.5M15 18v3.5M2.5 9H6M2.5 15H6M18 9h3.5M18 15h3.5"/>',
    "disk": '<ellipse cx="12" cy="6" rx="8" ry="2.8"/><path d="M4 6v12c0 1.5 3.6 2.8 8 2.8s8-1.3 8-2.8V6"/><path d="M4 12c0 1.5 3.6 2.8 8 2.8s8-1.3 8-2.8"/>',
    "pickaxe": '<path d="M14.5 6.5 4 17l3 3L17.5 9.5"/><path d="M8.5 3.5c4.5-.8 8.8.6 12 4"/><path d="M12 6l6 6"/>',
    "pause": '<path d="M9 6v12"/><path d="M15 6v12"/>',
    "play": '<path d="M8 5.5v13l10.5-6.5z"/>',
}
CAT_ICON = {"bandwidth": "wifi", "depin": "network", "compute": "chip", "storage": "disk", "mining": "pickaxe"}
ORDER = ["bandwidth", "depin", "compute", "storage", "mining"]


def icon(name, cls="icon"):
    return (f'<svg class="{cls}" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" '
            f'stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">'
            f'{ICON[name]}</svg>')


# Live services, interleaved by group so the band mixes them; the catalog's parenthetical is dropped.
live = [s for s in snap["services"] if s.get("status") in ("active", "beta")]
groups = {c: sorted((s for s in live if s["category"] == c), key=lambda s: s["name"].lower()) for c in ORDER}
mixed = []
while any(groups.values()):
    for c in ORDER:
        if groups[c]:
            mixed.append(groups[c].pop(0))
items = "".join(
    f'<li>{icon(CAT_ICON[s["category"]])}{html.escape(s["name"].split(" (")[0])}</li>' for s in mixed
)

# en.json strings (proposed). Numbers and date as the live build rendered them in base/.
S = {
    "pill": "Free and open source, GPL-3.0",
    "title": "Put your idle hardware to work.",
    "titleStart": "Put your",
    "titleWords": ["idle hardware", "laptop", "home server", "Raspberry Pi", "GPU"],
    "titleEnd": "to work.",
    "lead": "CashPilot runs bandwidth sharing, DePIN, mining, GPU and storage apps on the machines you already own, and shows every payout in one dashboard.",
    "points": ["Kept off your home network", "History stays on your machine", "No account with us"],
    "download": "Download",
    "selfhost": "Self-host with Docker",
    "expect": "CashPilot does not pay you. The providers do. Earnings depend on your country, connection and hardware.",
    "servicesLabel": "Supported services",
    "pause": "Pause the animation",
    "statsLabel": "CashPilot in numbers",
}

docker_svg = re.search(r'<svg class="platform-icon".*?</svg>', base[base.index('class="btn btn--ghost" href="/download/docker/"'):]).group(0)
stats = re.search(r'<dl class="stats".*?</dl>', base).group(0)
nums = re.findall(r'<dd class="num"[^>]*>([^<]+)</dd>', stats)
note = re.search(r'<p class="stats__note"[^>]*>([^<]+)</p>', base).group(1)
labels = ["GitHub stars", "Docker pulls", "supported services"]
stars, pulls, services = nums

words = "".join(f'<span style="--i:{i}">{html.escape(w)}</span>' for i, w in enumerate(S["titleWords"]))
points = "".join(f"<li>{icon('check')}{html.escape(p)}</li>" for p in S["points"])
cid = 'data-astro-cid-ba372snk'

hero_inner = f'''<div class="container hero__inner mh" {cid}>
<input type="checkbox" id="mh-pause" class="mh__pause-input visually-hidden">
<p class="pill mh__pill" {cid}>{icon('check')}{S["pill"]}</p>
<h1 class="mh__title"><span class="visually-hidden">{S["title"]}</span><span class="mh__line" aria-hidden="true">{S["titleStart"]}</span><span class="mh__rot" aria-hidden="true">{words}</span><span class="mh__line" aria-hidden="true">{S["titleEnd"]}</span></h1>
<p class="mh__lead">{S["lead"]}</p>
<ul class="mh__points">{points}</ul>
<div class="hero__actions mh__actions" {cid}>
<a class="btn btn--primary" href="/download/" {cid}>{icon('download')}{S["download"]}</a>
<a class="btn btn--ghost" href="/download/docker/" {cid}>{docker_svg}{S["selfhost"]}</a>
</div>
<p class="mh__expect">{icon('info')}<span>{S["expect"]}</span></p>
</div>
<div class="container mh__band">
<div class="mh__marquee" role="region" aria-label="{S["servicesLabel"]}">
<div class="mh__track"><ul class="mh__names">{items}</ul><ul class="mh__names" aria-hidden="true">{items}</ul></div>
</div>
<label class="mh__pause" for="mh-pause" title="{S["pause"]}">{icon('pause', 'icon mh__i-pause')}{icon('play', 'icon mh__i-play')}<span class="visually-hidden">{S["pause"]}</span></label>
</div>
<div class="container mh__proof">
<dl class="mh__stats" aria-label="{S["statsLabel"]}">
<div class="mh__stat mh__stat--lead"><dt>{labels[2]}</dt><dd class="num">{services}</dd></div>
<div class="mh__stat"><dt>{labels[1]}</dt><dd class="num">{pulls}</dd></div>
<div class="mh__stat"><dt>{labels[0]}</dt><dd class="num">{stars}</dd></div>
</dl>
<p class="mh__note">{icon('clock')}{note}</p>
</div>
'''

css = (HERE / "hero.css").read_text()
start = base.index('<div class="container hero__inner"')
end = base.index('<div class="container hero__shot"')
out = base[:start] + hero_inner + base[end:]
# The pause control must be a sibling before everything it pauses; it sits first inside .mh, and the
# band/proof/shot are reached through :has() on the section.
out = out.replace("</head>", f"<style>{css}</style></head>", 1)
(HERE / "index.html").write_text(out)
print("ok", len(mixed), "services;", stars, pulls, services, note)
