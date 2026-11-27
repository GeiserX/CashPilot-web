// Refreshes src/data/snapshot.json, the fallback the build uses when GitHub or
// Docker Hub cannot be reached. Fails if any part could not be fetched.
import { fetchLive } from "../src/data/fetch";

const live = await fetchLive((m) => console.error(m));
const need = ["services", "catalogI18n", "stars", "pulls", "releases", "desktopSha256", "images", "agentsDoc"] as const;
const missing = need.filter((k) => live[k] === undefined);
if (missing.length) {
  console.error(`snapshot not written, missing: ${missing.join(", ")}`);
  process.exit(1);
}
await Bun.write("src/data/snapshot.json", JSON.stringify(live, null, 2) + "\n");
console.log(`snapshot written: ${live.services!.length} services, ${Object.keys(live.catalogI18n!).length} catalog locales, fetched ${live.fetchedAt}`);
