# Builds index.html from base-index.html: swaps the hero section and adds hero.css.
import re, pathlib
d = pathlib.Path(__file__).parent
s = (d / 'base-index.html').read_text()
h = re.search(r'<section class="hero".*?(?=<section class="platforms")', s, re.S).group(0)
win = re.search(r'<div class="window hero__desktop".*?</picture></div></div>', h, re.S).group(0).replace(' hero__desktop', ' sh-desktop')
ph = re.search(r'<div class="phone hero__phone".*?</picture></div></div>', h, re.S).group(0).replace(' hero__phone', ' sh-phone')
docker = re.search(r'<svg class="platform-icon".*?</svg>', h, re.S).group(0)
dl = re.search(r'<a class="btn btn--primary"[^>]*>(<svg.*?</svg>)', h, re.S).group(1)
new = (d / 'hero.html').read_text()
for k, v in {'{{WINDOW}}': win, '{{PHONE}}': ph, '{{DOCKER}}': docker, '{{DLICON}}': dl}.items():
    new = new.replace(k, v)
new = re.sub(r'>\s+<', '><', new.strip())
out = s.replace(h, new).replace('</head>', '<style>' + (d / 'hero.css').read_text() + '</style></head>', 1)
(d / 'index.html').write_text(out)
