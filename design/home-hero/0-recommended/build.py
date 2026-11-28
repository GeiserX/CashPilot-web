# Builds index.html from base-index.html: swaps the hero section and adds hero.css.
import re, pathlib
d = pathlib.Path(__file__).parent
s = (d / 'base-index.html').read_text()
h = re.search(r'<section class="hero".*?(?=<section class="platforms")', s, re.S).group(0)
SIZES = '(min-width: 1160px) 1056px, (min-width: 901px) calc((100vw - 4rem - 29rem) * 1.8), calc(100vw - 2.2rem)'
win = re.search(r'<div class="window hero__desktop".*?</picture></div></div>', h, re.S).group(0).replace(' hero__desktop', ' rh-desktop')
win = re.sub(r'sizes="[^"]*"', f'sizes="{SIZES}"', win)
ph = re.search(r'<div class="phone hero__phone".*?</picture></div></div>', h, re.S).group(0).replace(' hero__phone', ' rh-phone')
docker = re.search(r'<svg class="platform-icon".*?</svg>', h, re.S).group(0)
dl = re.search(r'<a class="btn btn--primary"[^>]*>(<svg.*?</svg>)', h, re.S).group(1)
def icon(body):
    return ('<svg class="icon" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" '
            'stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">'
            + body + '</svg>')
icons = {
    '{{I_CHECK}}': icon('<path d="m5 12.5 4.5 4.5L19 7.5"/>'),
    '{{I_INFO}}': icon('<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 7.5v.5"/>'),
    '{{I_DEVICES}}': icon('<rect x="3" y="5" width="13" height="10" rx="1.5"/><path d="M7 19h5"/><path d="M9.5 15v4"/><rect x="17" y="9" width="4.5" height="10" rx="1"/>'),
    '{{I_SHIELD}}': icon('<path d="M12 3 5 6v5.5c0 4.3 3 7.9 7 9.5 4-1.6 7-5.2 7-9.5V6z"/><path d="m9 12 2.2 2.2L15.5 10"/>'),
    '{{I_CLOCK}}': icon('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
}
new = (d / 'hero.html').read_text()
for k, v in {'{{WINDOW}}': win, '{{PHONE}}': ph, '{{DOCKER}}': docker, '{{DLICON}}': dl, **icons}.items():
    new = new.replace(k, v)
new = re.sub(r'>\s+<', '><', new.strip())
out = s.replace(h, new).replace('</head>', '<style>' + (d / 'hero.css').read_text() + '</style></head>', 1)
(d / 'index.html').write_text(out)
print('ok', len(out))
