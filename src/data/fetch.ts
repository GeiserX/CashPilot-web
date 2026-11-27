// Fetches everything the site shows from GitHub and Docker Hub. Used at build
// time (src/data/index.ts) and by `bun run data:snapshot`, which writes the
// committed fallback in src/data/snapshot.json.
import { createHash } from "node:crypto";
import { parse as parseYaml } from "yaml";
import pins from "./pins.json";
import { LOCALES, DEFAULT_LOCALE } from "../i18n/locales";

export const OWNER = "GeiserX";
export const REPOS = {
  web: "CashPilot",
  desktop: "CashPilot-Desktop",
  android: "CashPilot-android",
  mcp: "cashpilot-mcp",
  ha: "cashpilot-ha",
} as const;
export type RepoKey = keyof typeof REPOS;

export interface Service {
  slug: string;
  name: string;
  category: string;
  status: string;
  priority: number | null;
  website: string;
  shortDescription: string;
  signupUrl: string | null;
  code: string | null;
  codeEntry: string | null;
  bonusReferee: string | null;
  bonusReferrer: string | null;
  residentialIp: boolean | null;
  devicesPerIp: number | null;
  paymentMethods: string[];
  minimumPayout: string | null;
  docker: boolean;
  platforms: string[];
}

export interface Asset {
  name: string;
  size: number;
}

export interface Release {
  tag: string;
  publishedAt: string;
  assets: Asset[];
}

/**
 * Translated catalog strings, by locale code, then by catalog key
 * (`<slug>.<YAML path>`, e.g. `iproyal.payment.minimum_payout`). Holds only
 * translations whose source hash matches today's English, so a stale or
 * missing one shows English.
 */
export type CatalogI18n = Record<string, Record<string, string>>;

/** The catalog fields the site shows, as YAML paths inside a service file. */
export const CATALOG_I18N_FIELDS = ["referral.bonus.referee", "payment.minimum_payout"] as const;
export type CatalogField = (typeof CATALOG_I18N_FIELDS)[number];

export interface SiteData {
  fetchedAt: string;
  services: Service[];
  catalogI18n: CatalogI18n;
  stars: Record<RepoKey, number>;
  pulls: { ui: number; worker: number };
  releases: Record<"web" | "desktop" | "android" | "mcp", Release>;
  desktopSha256: Record<string, string>;
  images: { ui: string; worker: string };
  /** Whether the docs page "For AI agents" is published yet. */
  agentsDoc: boolean;
}

const TIMEOUT_MS = 20_000;
export const AGENTS_DOC_URL = "https://geiserx.github.io/CashPilot/for-ai-agents/";

function ghHeaders(): Record<string, string> {
  const h: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "cashpilot-web-build",
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) h.Authorization = `Bearer ${token}`;
  return h;
}

async function get(url: string, headers: Record<string, string> = {}, tries = 3): Promise<Response> {
  for (let i = 1; ; i++) {
    try {
      const res = await fetch(url, { headers, signal: AbortSignal.timeout(TIMEOUT_MS) });
      if (res.ok) return res;
      if (res.status < 500 || i >= tries) throw new Error(`${res.status} ${res.statusText} for ${url}`);
    } catch (e) {
      if (i >= tries || String(e).includes(" for http")) throw e;
    }
    await new Promise((r) => setTimeout(r, 500 * i));
  }
}

/** Runs fn over items with at most `limit` calls in flight. */
async function pool<T, R>(items: T[], limit: number, fn: (t: T) => Promise<R>): Promise<R[]> {
  const out: R[] = new Array(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (next < items.length) {
        const i = next++;
        out[i] = await fn(items[i]!);
      }
    }),
  );
  return out;
}

const gh = async (path: string) => (await get(`https://api.github.com/${path}`, ghHeaders())).json() as Promise<any>;
const raw = async (repo: string, ref: string, path: string) =>
  (await get(`https://raw.githubusercontent.com/${OWNER}/${repo}/${ref}/${path}`)).text();

const str = (v: unknown): string | null => (typeof v === "string" && v.trim() ? v.trim() : null);
const num = (v: unknown): number | null => (typeof v === "number" && Number.isFinite(v) ? v : null);

export function toService(d: any): Service {
  const r = d.referral ?? {};
  const req = d.requirements ?? {};
  const pay = d.payment ?? {};
  return {
    slug: String(d.slug),
    name: String(d.name),
    category: String(d.category),
    status: String(d.status),
    priority: num(d.priority),
    website: String(d.website ?? ""),
    shortDescription: str(d.short_description) ?? "",
    signupUrl: str(r.signup_url),
    code: r.code == null ? null : String(r.code),
    codeEntry: r.code_entry == null ? null : String(r.code_entry),
    bonusReferee: str(r.bonus?.referee),
    bonusReferrer: str(r.bonus?.referrer),
    residentialIp: typeof req.residential_ip === "boolean" ? req.residential_ip : null,
    devicesPerIp: num(req.devices_per_ip),
    paymentMethods: Array.isArray(pay.methods) ? pay.methods.map(String) : [],
    minimumPayout: str(pay.minimum_payout),
    docker: Boolean(d.docker?.image),
    platforms: Array.isArray(d.platforms) ? d.platforms.map(String) : [],
  };
}

/** First 12 hex characters of SHA-256 over the UTF-8 English string: the catalog's `source` hash. */
export const sourceHash = (english: string) => createHash("sha256").update(english, "utf8").digest("hex").slice(0, 12);

function atPath(doc: any, path: string): unknown {
  return path.split(".").reduce((cur, k) => (cur && typeof cur === "object" ? cur[k] : undefined), doc);
}

/**
 * Keeps the entries of one `services/_i18n/<locale>.yml` that are fresh: a
 * non-empty `text` whose `source` hash matches the English string in today's
 * service file. Everything else falls back to English.
 */
export function freshTranslations(file: unknown, english: Map<string, string>): Record<string, string> {
  const out: Record<string, string> = {};
  if (!file || typeof file !== "object") return out;
  for (const [key, entry] of Object.entries(file as Record<string, any>)) {
    const en = english.get(key);
    const text = typeof entry?.text === "string" ? entry.text.trim() : "";
    if (en !== undefined && text && entry.source === sourceHash(en)) out[key] = text;
  }
  return out;
}

/**
 * The catalog and its translations. Translations live beside the service files
 * in `services/_i18n/<locale>.yml`; a locale without a file has none yet, which
 * is an answer, not a failure.
 */
export async function fetchCatalog(): Promise<{ services: Service[]; catalogI18n: CatalogI18n }> {
  const tree = await gh(`repos/${OWNER}/${REPOS.web}/git/trees/main?recursive=1`);
  const all: string[] = tree.tree.map((t: any) => t.path as string);
  const paths = all.filter((p) => /^services\/[^_/][^/]*\/[^/]+\.ya?ml$/.test(p));
  if (paths.length < 10) throw new Error(`catalog looks empty (${paths.length} files)`);
  const docs = await pool(paths, 6, async (p) => parseYaml(await raw(REPOS.web, "main", p)));
  const services = docs.map(toService).sort((a, b) => a.name.localeCompare(b.name, "en"));

  // The English strings, exactly as the YAML parser returns them.
  const english = new Map<string, string>();
  for (const d of docs)
    for (const field of CATALOG_I18N_FIELDS) {
      const v = atPath(d, field);
      if (typeof v === "string") english.set(`${d.slug}.${field}`, v);
    }
  const catalogI18n: CatalogI18n = {};
  const targets = LOCALES.filter((l) => l.code !== DEFAULT_LOCALE && all.includes(`services/_i18n/${l.code}.yml`));
  await pool(targets, 6, async (l) => {
    const fresh = freshTranslations(parseYaml(await raw(REPOS.web, "main", `services/_i18n/${l.code}.yml`)), english);
    if (Object.keys(fresh).length) catalogI18n[l.code] = fresh;
  });
  return { services, catalogI18n };
}

/**
 * A release by tag, or the latest one. Desktop, Android and the web app are
 * read at the tag pinned in pins.json, so their download links change only
 * through a PR (scripts/bump-pins.ts checks every linked file first).
 */
async function fetchRelease(repo: string, tag?: string): Promise<Release> {
  const r = await gh(`repos/${OWNER}/${repo}/releases/${tag ? `tags/${tag}` : "latest"}`);
  return {
    tag: r.tag_name,
    publishedAt: r.published_at,
    assets: (r.assets ?? []).map((a: any) => ({ name: a.name, size: a.size })),
  };
}

async function fetchPulls(image: string): Promise<number> {
  const r: any = await (await get(`https://hub.docker.com/v2/repositories/${image}/`)).json();
  if (typeof r.pull_count !== "number") throw new Error(`no pull_count for ${image}`);
  return r.pull_count;
}

export function parseSha256Sums(text: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const line of text.split("\n")) {
    const m = line.trim().match(/^([0-9a-f]{64})\s+\*?(.+)$/i);
    if (m) out[m[2]!.trim()] = m[1]!.toLowerCase();
  }
  return out;
}

/** The image references in the compose file of the given web release, e.g. drumsergio/cashpilot:3.0 */
async function fetchImages(tag: string): Promise<{ ui: string; worker: string }> {
  const compose = await raw(REPOS.web, tag, "docker-compose.yml");
  const ui = compose.match(/image:\s*(drumsergio\/cashpilot:[^\s"']+)/)?.[1];
  const worker = compose.match(/image:\s*(drumsergio\/cashpilot-worker:[^\s"']+)/)?.[1];
  if (!ui || !worker) throw new Error("image tags not found in docker-compose.yml");
  return { ui, worker };
}

/**
 * Fetches every part on its own. A part that fails comes back as undefined, so
 * the caller can take that part from the snapshot and keep the rest live.
 */
export async function fetchLive(log: (m: string) => void = console.warn): Promise<Partial<SiteData>> {
  const attempt = async <T>(label: string, fn: () => Promise<T>): Promise<T | undefined> => {
    try {
      return await fn();
    } catch (e) {
      log(`[data] ${label}: ${(e as Error).message}`);
      return undefined;
    }
  };

  const [catalog, starsList, pullsUi, pullsWorker, web, desktop, android, mcp] = await Promise.all([
    attempt("catalog", fetchCatalog),
    attempt("stars", async () =>
      Object.fromEntries(
        await Promise.all(
          (Object.keys(REPOS) as RepoKey[]).map(async (k) => [k, (await gh(`repos/${OWNER}/${REPOS[k]}`)).stargazers_count]),
        ),
      ) as Record<RepoKey, number>,
    ),
    attempt("pulls ui", () => fetchPulls("drumsergio/cashpilot")),
    attempt("pulls worker", () => fetchPulls("drumsergio/cashpilot-worker")),
    attempt("release web", () => fetchRelease(REPOS.web, pins.web)),
    attempt("release desktop", () => fetchRelease(REPOS.desktop, pins.desktop)),
    attempt("release android", () => fetchRelease(REPOS.android, pins.android)),
    attempt("release mcp", () => fetchRelease(REPOS.mcp)),
  ]);
  // The checksums of the exact release whose sizes we show, not of "latest".
  const sums = desktop
    ? await attempt("desktop SHA256SUMS", async () =>
        parseSha256Sums(
          await (await get(`https://github.com/${OWNER}/${REPOS.desktop}/releases/download/${desktop.tag}/SHA256SUMS`)).text(),
        ),
      )
    : undefined;
  const images = web ? await attempt("compose images", () => fetchImages(web.tag)) : undefined;
  // A 404 means "not published yet", which is an answer, not a failure.
  const agentsDoc = await attempt("docs for-ai-agents", async () => {
    const res = await fetch(AGENTS_DOC_URL, { method: "HEAD", signal: AbortSignal.timeout(TIMEOUT_MS) });
    if (res.status >= 500) throw new Error(`${res.status} for ${AGENTS_DOC_URL}`);
    return res.ok;
  });

  const out: Partial<SiteData> = { fetchedAt: new Date().toISOString() };
  if (catalog) {
    out.services = catalog.services;
    out.catalogI18n = catalog.catalogI18n;
  }
  if (starsList) out.stars = starsList;
  if (pullsUi !== undefined && pullsWorker !== undefined) out.pulls = { ui: pullsUi, worker: pullsWorker };
  // The releases, their checksums and the compose images go together or not at
  // all: live hashes next to a snapshot version would look like a tampered file.
  if (web && desktop && android && mcp && sums && Object.keys(sums).length && images) {
    out.releases = { web, desktop, android, mcp };
    out.desktopSha256 = sums;
    out.images = images;
  }
  if (agentsDoc !== undefined) out.agentsDoc = agentsDoc;
  return out;
}
