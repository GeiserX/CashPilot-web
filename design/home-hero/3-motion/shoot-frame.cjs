// usage: node shoot-frame.cjs <html> <out png> <width> <wait ms> [height] [reduce]
// First screen after <wait ms>, to show a later word of the title cycle; "reduce" emulates prefers-reduced-motion.
const { chromium } = require("/Volumes/Data/scratch/pw/node_modules/playwright");
(async () => {
  const [html, out, w, wait, h, reduce] = process.argv.slice(2);
  const b = await chromium.launch();
  const c = await b.newContext({ colorScheme: "dark", reducedMotion: reduce ? "reduce" : "no-preference", viewport: { width: Number(w), height: Number(h || 900) } });
  const p = await c.newPage();
  await p.goto("file://" + require("path").resolve(html));
  await p.waitForTimeout(Number(wait));
  await p.screenshot({ path: out });
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
