import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, "..");
const cachePath = path.join(scriptDir, "verified-menu-translations.json");
const sourceUrl = "https://en.wikipedia.org/w/api.php?action=parse&page=List_of_Thai_dishes&prop=text&formatversion=2&format=json&origin=*";
const sectionNames = {
  Individual_dishes: "Отдельные блюда",
  Rice_dishes: "Рис",
  Noodle_dishes: "Лапша",
  Miscellaneous: "Другие блюда",
  Shared_dishes: "Общие блюда",
  Curries: "Карри",
  Soups: "Супы",
  Salads: "Салаты",
  "Fried_and_stir-fried_dishes": "Вок",
  "Deep-fried_dishes": "Фритюр",
  Grilled_dishes: "Гриль",
  Steamed_or_blanched_dishes: "На пару",
  Stewed_dishes: "Тушёные блюда",
  Dipping_sauces_and_pastes: "Соусы",
  Miscellaneous_2: "Другие блюда",
  Savoury_snacks_and_starters: "Закуски",
  Sweet_snacks_and_desserts: "Десерты",
  Drinks: "Напитки"
};

function decodeHtml(text = "") {
  const named = { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">", nbsp: " " };
  return text.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (_, entity) => {
    if (entity[0] === "#") {
      const hexadecimal = entity[1].toLowerCase() === "x";
      return String.fromCodePoint(Number.parseInt(entity.slice(hexadecimal ? 2 : 1), hexadecimal ? 16 : 10));
    }
    return named[entity.toLowerCase()] || " ";
  });
}

function plainText(html = "") {
  return decodeHtml(html.replace(/<sup[\s\S]*?<\/sup>/gi, "").replace(/<[^>]+>/g, " "))
    .replace(/\[[^\]]+\]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function photoFromCell(html) {
  const source = html.match(/<img[^>]+src="([^"]+)"/i)?.[1];
  const fileLink = html.match(/href="([^"]*\/wiki\/File:[^"]+)"/i)?.[1];
  if (!source || !fileLink) return null;
  const url = `https:${decodeHtml(source)}`.replace(/\/\d+px-/, "/720px-");
  return {
    url,
    page: `https://commons.wikimedia.org${decodeHtml(fileLink)}`,
    title: decodeURIComponent(fileLink.split("File:")[1] || "Wikimedia Commons"),
    author: "Wikimedia Commons",
    license: "источник"
  };
}

const response = await fetch(sourceUrl, {
  headers: { "User-Agent": "ThaiMenuReader/1.0 (educational project)" },
  signal: AbortSignal.timeout(30000)
});
if (!response.ok) throw new Error(`Wikipedia HTTP ${response.status}`);
const payload = await response.json();
const html = payload.parse.text;
const headings = [...html.matchAll(/<h2[^>]*id="([^"]+)"[^>]*>[\s\S]*?<\/h2>/g)];
const entries = [];
const seenThai = new Set();

for (let index = 0; index < headings.length; index += 1) {
  const section = headings[index][1];
  if (!sectionNames[section]) continue;
  const start = headings[index].index + headings[index][0].length;
  const end = headings[index + 1]?.index || html.length;
  const sectionHtml = html.slice(start, end);
  for (const row of sectionHtml.matchAll(/<tr[ >][\s\S]*?<\/tr>/g)) {
    const cells = [...row[0].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((match) => match[1]);
    if (cells.length < 4) continue;
    const translit = plainText(cells[0]);
    const thai = plainText(cells[1]);
    const english = plainText(cells[2]) || translit;
    const photo = photoFromCell(cells[3]);
    if (!photo || !/[\u0E00-\u0E7F]/u.test(thai) || seenThai.has(thai)) continue;
    seenThai.add(thai);
    entries.push({
      thai,
      translit,
      english,
      category: section === "Drinks" ? "drink" : "dish",
      section: sectionNames[section],
      photo
    });
  }
}

let translations = {};
try {
  translations = JSON.parse(await readFile(cachePath, "utf8"));
} catch {}

let translated = 0;
async function translate(text) {
  if (translations[text]) return translations[text];
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ru&dt=t&q=${encodeURIComponent(text)}`;
  for (let attempt = 1; attempt <= 6; attempt += 1) {
    try {
      const result = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0" },
        signal: AbortSignal.timeout(20000)
      });
      if (!result.ok) throw new Error(`Translate HTTP ${result.status}`);
      const json = await result.json();
      translations[text] = json[0].map((part) => part[0]).join("").trim();
      translated += 1;
      if (translated % 25 === 0) {
        await writeFile(cachePath, JSON.stringify(translations, null, 2), "utf8");
        console.log(`Translated ${translated}`);
      }
      return translations[text];
    } catch (error) {
      if (attempt === 6) throw error;
      await new Promise((resolve) => setTimeout(resolve, attempt * 800));
    }
  }
}

let cursor = 0;
async function worker() {
  while (cursor < entries.length) {
    const entry = entries[cursor];
    cursor += 1;
    entry.ru = await translate(entry.english);
    entry.tags = [entry.section, entry.category === "drink" ? "напиток" : "тайское блюдо"];
    delete entry.english;
    delete entry.section;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}

await Promise.all(Array.from({ length: 3 }, () => worker()));
await writeFile(cachePath, JSON.stringify(translations, null, 2), "utf8");
const output = `window.verifiedMenuItems = ${JSON.stringify(entries, null, 2)};\n`;
await writeFile(path.join(rootDir, "verified-menu-data.js"), output, "utf8");

const counts = entries.reduce((result, entry) => {
  result[entry.category] = (result[entry.category] || 0) + 1;
  return result;
}, {});
console.log(`Saved ${entries.length} verified entries: ${JSON.stringify(counts)}`);
