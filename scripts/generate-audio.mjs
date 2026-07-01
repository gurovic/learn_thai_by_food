import { access, mkdir, readFile, rename, stat, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, "..");
const audioDir = path.join(rootDir, "audio");
const appSource = await readFile(path.join(rootDir, "app.js"), "utf8");
const indexSource = await readFile(path.join(rootDir, "index.html"), "utf8");

globalThis.window = {};
await import(pathToFileURL(path.join(rootDir, "menu-data.js")));

const texts = new Set(window.menuItems.map((item) => item.thai));
const thaiLiteral = /"([^"\r\n]*[\u0E00-\u0E7F][^"\r\n]*)"/gu;
const onlyThai = /^[\u0E00-\u0E7F\s]+$/u;

for (const match of appSource.matchAll(thaiLiteral)) {
  const text = match[1].trim();
  if (text && onlyThai.test(text)) texts.add(text);
}

function extractValues(source, startMarker, endMarker) {
  const start = source.indexOf(startMarker);
  const end = source.indexOf(endMarker, start);
  if (start < 0 || end < 0) return [];
  return [...source.slice(start, end).matchAll(/value="([^"]+)"/g)].map((match) => match[1]);
}

const foodsStart = appSource.indexOf("const foods = [");
const foodsEnd = appSource.indexOf("const menuItems", foodsStart);
const orderDishes = [...appSource.slice(foodsStart, foodsEnd).matchAll(/thai:\s*"([^"]+)"/g)]
  .map((match) => match[1]);
const spiceLevels = extractValues(indexSource, 'id="spiceLevel"', "</select>");
const orderRequests = extractValues(indexSource, 'id="orderRequest"', "</select>");

for (const dish of orderDishes) {
  for (const spice of spiceLevels) {
    for (const request of orderRequests) {
      texts.add(`ขอ ${dish} ${spice} ${request}`);
    }
  }
}

await mkdir(audioDir, { recursive: true });
const queue = [...texts].sort((a, b) => a.localeCompare(b, "th"));
console.log(`Checking ${queue.length} Thai audio files...`);
let cursor = 0;
let completed = 0;
let downloaded = 0;
const failures = [];

async function fileIsReady(filePath) {
  try {
    return (await stat(filePath)).size > 800;
  } catch {
    return false;
  }
}

async function downloadSpeech(text) {
  const filePath = path.join(audioDir, `${text}.mp3`);
  if (await fileIsReady(filePath)) return;

  const endpoint = "https://translate.googleapis.com/translate_tts";
  const url = `${endpoint}?ie=UTF-8&client=gtx&tl=th&q=${encodeURIComponent(text)}`;
  const tempPath = `${filePath}.part`;

  for (let attempt = 1; attempt <= 6; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0" },
        signal: AbortSignal.timeout(20000)
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const bytes = new Uint8Array(await response.arrayBuffer());
      if (bytes.length < 800) throw new Error(`short response: ${bytes.length}`);
      await writeFile(tempPath, bytes);
      await rename(tempPath, filePath);
      downloaded += 1;
      return;
    } catch (error) {
      try {
        await access(tempPath);
        await unlink(tempPath);
      } catch {}
      if (attempt === 6) throw error;
      await new Promise((resolve) => setTimeout(resolve, attempt * 700));
    }
  }
}

async function worker() {
  while (cursor < queue.length) {
    const index = cursor;
    cursor += 1;
    const text = queue[index];
    try {
      await downloadSpeech(text);
    } catch (error) {
      failures.push(`${text}: ${error.message}`);
    }
    completed += 1;
    if (completed % 50 === 0 || completed === queue.length) {
      console.log(`${completed}/${queue.length}, downloaded ${downloaded}, failed ${failures.length}`);
    }
    await new Promise((resolve) => setTimeout(resolve, 80));
  }
}

await Promise.all(Array.from({ length: 4 }, () => worker()));

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Audio library ready: ${queue.length} files.`);
}
