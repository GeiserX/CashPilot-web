// node check.cjs  (on the MacMini, from this folder): axe WCAG 2.2 AA on the page, sideways overflow at
// 320-1440 px with English and with 1.5x-long hero strings, and the pause control stopping every animation.
const M = "/Volumes/Data/scratch/site-hero/src/node_modules/";
const { chromium } = require(M + "playwright");
const { AxeBuilder } = require(M + "@axe-core/playwright");
const url = "file://" + require("path").resolve("index.html");
const LONG = {
  ".mh__line": ["Faites travailler votre", "pour vous, sans effort."],
  ".mh__rot > span": ["matériel inutilisé", "ordinateur portable", "serveur domestique", "Raspberry Pi", "carte graphique"],
  ".mh__lead": ["CashPilot exécute des applications de partage de bande passante, DePIN, minage, GPU et stockage sur les machines que vous possédez déjà, et affiche chaque paiement dans un seul tableau de bord."],
  ".mh__points li": ["Tenu à l'écart de votre réseau domestique", "L'historique reste sur votre machine", "Aucun compte chez nous"],
};
(async () => {
  const b = await chromium.launch();
  let fail = 0;
  for (const w of [1440, 390]) {
    const p = await (await b.newContext({ viewport: { width: w, height: 900 }, colorScheme: "dark" })).newPage();
    await p.goto(url);
    await p.waitForTimeout(1000); // let the site's 200 ms rise finish, as the repo check does with networkidle
    const r = await new AxeBuilder({ page: p }).include(".hero").withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
    for (const v of r.violations) { fail++; console.log(`axe ${w}: ${v.id} ${v.help} ${v.nodes.map(n => n.target.join(" ")).slice(0, 3).join(" | ")}`); }
    console.log(`axe ${w}: ${r.violations.length} violations, ${r.passes.length} rules passed`);
  }
  for (const long of [false, true]) for (const w of [320, 360, 375, 390, 414, 768, 1024, 1440]) {
    const p = await (await b.newContext({ viewport: { width: w, height: 900 }, colorScheme: "dark" })).newPage();
    await p.goto(url);
    if (long) await p.evaluate((L) => { for (const [sel, txt] of Object.entries(L)) document.querySelectorAll(sel).forEach((el, i) => { const svg = el.querySelector("svg"); el.textContent = txt[i] ?? txt[0]; if (svg) el.prepend(svg); }); }, LONG);
    const o = await p.evaluate(() => {
      const h = document.querySelector(".mh__title").getBoundingClientRect().height;
      const shot = document.querySelector(".hero__shot").getBoundingClientRect().top;
      return { sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth, h: Math.round(h), shot: Math.round(shot) };
    });
    if (o.sw > o.cw) fail++;
    console.log(`${long ? "long" : "en  "} ${w}: scrollWidth ${o.sw}/${o.cw} title ${o.h}px shot at ${o.shot}${o.sw > o.cw ? "  OVERFLOW" : ""}`);
  }
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "dark" })).newPage();
  await p.goto(url);
  const states = () => p.evaluate(() => [...new Set(document.querySelector(".hero").getAnimations({ subtree: true }).filter(a => a.animationName?.startsWith("mh-")).map(a => a.playState))]);
  const before = await states();
  await p.keyboard.press("Tab"); // reach the checkbox by keyboard
  for (let i = 0; i < 12; i++) { if (await p.evaluate(() => document.activeElement?.id) === "mh-pause") break; await p.keyboard.press("Tab"); }
  const focused = await p.evaluate(() => document.activeElement?.id);
  await p.keyboard.press("Space");
  const after = await states();
  console.log(`pause: before ${before} -> after ${after}, focused by keyboard: ${focused}`);
  if (!after.every(s => s === "paused") || focused !== "mh-pause") fail++;
  const rp = await (await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "dark", reducedMotion: "reduce" })).newPage();
  await rp.goto(url);
  const n = await rp.evaluate(() => document.querySelector(".hero").getAnimations({ subtree: true }).filter(a => a.animationName?.startsWith("mh-")).length);
  const btn = await rp.evaluate(() => getComputedStyle(document.querySelector(".mh__pause")).display);
  console.log(`reduced motion: ${n} mh animations, pause button display ${btn}`);
  if (n) fail++;
  await b.close();
  console.log(fail ? `${fail} FAILED` : "all checks passed");
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
