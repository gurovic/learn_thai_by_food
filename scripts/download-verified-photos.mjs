import { mkdir, readdir, rename, stat, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, "..");
const imageDir = path.join(rootDir, "images", "menu");
globalThis.window = {};
await import(pathToFileURL(path.join(rootDir, "verified-menu-data.js")));

await mkdir(imageDir, { recursive: true });
const entries = window.verifiedMenuItems;
let cursor = 0;
let downloaded = 0;
const failures = [];

async function fileIsReady(filePath) {
  try {
    return (await stat(filePath)).size > 800;
  } catch {
    return false;
  }
}

async function download(entry) {
  const filename = path.basename(entry.photo.url);
  const filePath = path.join(imageDir, filename);
  if (await fileIsReady(filePath)) return false;
  const tempPath = `${filePath}.part`;
  const originalUrl = entry.photo.remoteUrl.replace("/thumb/", "/").replace(/\/[^/]+$/, "");

  for (let attempt = 1; attempt <= 8; attempt += 1) {
    try {
      const sourceUrl = attempt > 4 && originalUrl !== entry.photo.remoteUrl ? originalUrl : entry.photo.remoteUrl;
      const response = await fetch(sourceUrl, {
        headers: { "User-Agent": "ThaiMenuReader/1.0 (educational project)" },
        signal: AbortSignal.timeout(30000)
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const bytes = new Uint8Array(await response.arrayBuffer());
      if (bytes.length < 800) throw new Error(`short response: ${bytes.length}`);
      await writeFile(tempPath, bytes);
      await rename(tempPath, filePath);
      downloaded += 1;
      return true;
    } catch (error) {
      try { await unlink(tempPath); } catch {}
      if (attempt === 8) throw error;
      await new Promise((resolve) => setTimeout(resolve, attempt * 1800));
    }
  }
}

async function worker() {
  while (cursor < entries.length) {
    const entry = entries[cursor];
    cursor += 1;
    let requested = false;
    try {
      requested = await download(entry);
    } catch (error) {
      failures.push(`${entry.thai}: ${error.message}`);
      requested = true;
    }
    if (cursor % 25 === 0 || cursor === entries.length) {
      console.log(`${cursor}/${entries.length}, downloaded ${downloaded}, failed ${failures.length}`);
    }
    if (requested) await new Promise((resolve) => setTimeout(resolve, 1200));
  }
}

await worker();

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  const activeFiles = new Set(entries.map((entry) => path.basename(entry.photo.url)));
  const storedFiles = await readdir(imageDir);
  const staleFiles = storedFiles.filter((filename) => !activeFiles.has(filename));
  await Promise.all(staleFiles.map((filename) => unlink(path.join(imageDir, filename))));
  console.log(`Photo library ready: ${entries.length} files, removed ${staleFiles.length} stale files.`);
}
