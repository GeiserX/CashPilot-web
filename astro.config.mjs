// @ts-check
import { readdirSync } from "node:fs";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { LOCALES } from "./src/i18n/locales.ts";

// Only locales with a translation file are built, so only they go in the sitemap.
const built = new Set(readdirSync(new URL("./src/i18n/", import.meta.url)).map((f) => f.replace(/\.json$/, "")));
const sitemapLocales = Object.fromEntries(
  LOCALES.filter((l) => built.has(l.code)).map((l) => [l.path || "en", l.code]),
);

export default defineConfig({
  site: "https://cashpilot.club",
  output: "static",
  trailingSlash: "always",
  build: {
    format: "directory",
    inlineStylesheets: "auto",
  },
  devToolbar: { enabled: false },
  integrations: [
    sitemap({
      // /en/... and /zh-cn/... only redirect, and the 404 page is not a page to list.
      filter: (page) => !/^\/(en|zh-cn)\//.test(new URL(page).pathname) && !/\/404\/?$/.test(page),
      i18n: { defaultLocale: "en", locales: sitemapLocales },
    }),
  ],
});
