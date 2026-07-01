import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, "..");
const searches = {
  thaiFood: "Thai food dish",
  noodles: "Thai noodles food",
  curry: "Thai curry food",
  rice: "Thai rice dish",
  soup: "Thai soup food",
  salad: "Thai salad food",
  chicken: "Thai chicken dish",
  pork: "Thai pork dish",
  beef: "Thai beef dish",
  fish: "Thai fish dish",
  seafood: "Thai seafood dish",
  vegetables: "Thai vegetable dish",
  fried: "Thai fried food",
  grilled: "Thai grilled food",
  tea: "Thai iced tea drink",
  coffee: "Thai coffee drink",
  coconut: "coconut water drink",
  juice: "tropical fruit juice drink",
  smoothie: "tropical fruit smoothie",
  milk: "milk drink glass",
  cocoa: "iced cocoa drink"
};

function plainText(value = "") {
  return value.replace(/<[^>]+>/g, " ").replace(/&[^;]+;/g, " ").replace(/\s+/g, " ").trim();
}

async function fetchPhotos(search) {
  const params = new URLSearchParams({
    action: "query",
    generator: "search",
    gsrsearch: search,
    gsrnamespace: "6",
    gsrlimit: "10",
    prop: "imageinfo",
    iiprop: "url|extmetadata",
    iiurlwidth: "720",
    format: "json",
    origin: "*"
  });
  let response;
  for (let attempt = 1; attempt <= 6; attempt += 1) {
    response = await fetch(`https://commons.wikimedia.org/w/api.php?${params}`, {
      headers: { "User-Agent": "ThaiMenuReader/1.0 (educational project)" },
      signal: AbortSignal.timeout(30000)
    });
    if (response.ok) break;
    if (response.status !== 429 || attempt === 6) throw new Error(`Commons HTTP ${response.status}`);
    await new Promise((resolve) => setTimeout(resolve, attempt * 2500));
  }
  const payload = await response.json();
  return Object.values(payload.query?.pages || {})
    .map((page) => {
      const info = page.imageinfo?.[0];
      if (!info?.thumburl) return null;
      return {
        url: info.thumburl,
        page: info.descriptionurl,
        title: page.title.replace(/^File:/, ""),
        author: plainText(info.extmetadata?.Artist?.value),
        license: plainText(info.extmetadata?.LicenseShortName?.value)
      };
    })
    .filter(Boolean);
}

const pools = {};
for (const [key, search] of Object.entries(searches)) {
  pools[key] = await fetchPhotos(search);
  console.log(`${key}: ${pools[key].length}`);
  await new Promise((resolve) => setTimeout(resolve, 1000));
}

const output = `window.menuPhotoPools = ${JSON.stringify(pools, null, 2)};\n`;
await writeFile(path.join(rootDir, "photo-data.js"), output, "utf8");
console.log(`Saved ${Object.values(pools).flat().length} photo references.`);
