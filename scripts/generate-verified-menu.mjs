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
  const sourceSet = html.match(/<img[^>]+srcset="([^"]+)"/i)?.[1];
  const source = sourceSet
    ? sourceSet.split(",").at(-1).trim().split(/\s+/)[0]
    : html.match(/<img[^>]+src="([^"]+)"/i)?.[1];
  const fileLink = html.match(/href="([^"]*\/wiki\/File:[^"]+)"/i)?.[1];
  if (!source || !fileLink) return null;
  const url = `https:${decodeHtml(source)}`;
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
    const englishName = plainText(cells[2]) || translit;
    const englishDescription = plainText(cells[5] || cells.at(-1));
    const photo = photoFromCell(cells[3]);
    if (!photo || !/[\u0E00-\u0E7F]/u.test(thai) || seenThai.has(thai)) continue;
    seenThai.add(thai);
    entries.push({
      thai,
      translit,
      englishName,
      englishDescription,
      category: section === "Drinks" ? "drink" : "dish",
      section: sectionNames[section],
      photo
    });
  }
}

const supplementalDrinks = [
  {
    thai: "โอเลี้ยง",
    translit: "oliang",
    ru: "тайский холодный черный кофе со льдом и сахарным сиропом",
    photo: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Oliang_%E0%B9%82%E0%B8%AD%E0%B9%80%E0%B8%A5%E0%B8%B5%E0%B9%89%E0%B8%A2%E0%B8%87_oleang_olieng_Thai_iced_coffee_at_Ayutthaya.jpg/250px-Oliang_%E0%B9%82%E0%B8%AD%E0%B9%80%E0%B8%A5%E0%B8%B5%E0%B9%89%E0%B8%A2%E0%B8%87_oleang_olieng_Thai_iced_coffee_at_Ayutthaya.jpg",
      page: "https://commons.wikimedia.org/wiki/File:Oliang_%E0%B9%82%E0%B8%AD%E0%B9%80%E0%B8%A5%E0%B8%B5%E0%B9%89%E0%B8%A2%E0%B8%87_oleang_olieng_Thai_iced_coffee_at_Ayutthaya.jpg",
      title: "Oliang Thai iced coffee at Ayutthaya.jpg"
    }
  },
  {
    thai: "ชามะนาว",
    translit: "cha manao",
    ru: "холодный черный чай с соком лайма, сахаром и льдом",
    photo: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Lemon_tea_2.jpg/250px-Lemon_tea_2.jpg",
      page: "https://commons.wikimedia.org/wiki/File:Lemon_tea_2.jpg",
      title: "Lemon tea 2.jpg"
    }
  },
  {
    thai: "น้ำเก๊กฮวย",
    translit: "nam kek huai",
    ru: "сладкий охлажденный настой цветков хризантемы",
    photo: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Chrysanthemum_tea.JPG/250px-Chrysanthemum_tea.JPG",
      page: "https://commons.wikimedia.org/wiki/File:Chrysanthemum_tea.JPG",
      title: "Chrysanthemum tea.JPG"
    }
  },
  {
    thai: "น้ำมะพร้าว",
    translit: "nam maprao",
    ru: "охлажденная кокосовая вода из молодого кокоса",
    photo: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/JP_%E6%B2%96%E7%B9%A9_Okinawa_%E4%BA%9E%E6%B4%B2%E8%88%AA%E7%A9%BA_AirAsia_flying_to_HKG_%E9%A3%9B%E6%A9%9F%E9%A4%90_in-flight_meal_Thail_food_product_Tipco_F%26B_Co_coconut_water_drink_box_February_2026_N13P_01.jpg/250px-JP_%E6%B2%96%E7%B9%A9_Okinawa_%E4%BA%9E%E6%B4%B2%E8%88%AA%E7%A9%BA_AirAsia_flying_to_HKG_%E9%A3%9B%E6%A9%9F%E9%A4%90_in-flight_meal_Thail_food_product_Tipco_F%26B_Co_coconut_water_drink_box_February_2026_N13P_01.jpg",
      page: "https://commons.wikimedia.org/wiki/File:JP_%E6%B2%96%E7%B9%A9_Okinawa_%E4%BA%9E%E6%B4%B2%E8%88%AA%E7%A9%BA_AirAsia_flying_to_HKG_%E9%A3%9B%E6%A9%9F%E9%A4%90_in-flight_meal_Thail_food_product_Tipco_F%26B_Co_coconut_water_drink_box_February_2026_N13P_01.jpg",
      title: "Thai coconut water drink box.jpg"
    }
  }
];

const russianOverrides = {
  "ข้าวกั๊นจิ๊น": "рис со свиной кровью на пару в банановом листе",
  "ข้าวมันไก่": "жирный рис с отварной курицей и бульоном",
  "ข้าวเหนียว": "клейкий рис",
  "น้ำพันช์": "ледяной фруктовый пунш, иногда с алкоголем"
};

for (const drink of supplementalDrinks) {
  if (seenThai.has(drink.thai)) continue;
  seenThai.add(drink.thai);
  entries.push({
    ...drink,
    category: "drink",
    section: "Напитки",
    photo: { ...drink.photo, author: "Wikimedia Commons", license: "источник" }
  });
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
function normalizedName(text = "") {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function firstSentence(text = "") {
  const sentence = text.split(/(?<=[.!?])\s+/)[0].replace(/^(This is|These are)\s+/i, "").trim();
  return sentence.length > 110 ? `${sentence.slice(0, 107).replace(/\s+\S*$/, "")}...` : sentence;
}

function conciseRussian(text = "") {
  let result = text.replace(/[.!?]+$/, "").trim();
  result = result.split(/(?<=[.!?])\s+/)[0];
  result = result.replace(/\s*\(букв.*$/i, "");
  result = result.replace(/^Название буквально означает\s+[«"](.+?)[»"]$/i, "$1");
  if (result.length > 90) {
    const boundaries = [...result.matchAll(/[,;:]/g)]
      .map((match) => match.index)
      .filter((index) => index >= 40 && index <= 90);
    const end = boundaries.at(-1) || result.slice(0, 90).lastIndexOf(" ");
    result = result.slice(0, end).replace(/[,;:]+$/, "");
  }
  return result ? result[0].toUpperCase() + result.slice(1) : result;
}

async function worker() {
  while (cursor < entries.length) {
    const entry = entries[cursor];
    cursor += 1;
    const nameIsTransliteration = normalizedName(entry.englishName) === normalizedName(entry.translit);
    const sourceText = nameIsTransliteration
      ? firstSentence(entry.englishDescription || entry.englishName)
      : entry.englishName;
    entry.ru = russianOverrides[entry.thai] || entry.ru || await translate(sourceText);
    entry.ru = conciseRussian(entry.ru);
    entry.tags = [entry.section, entry.category === "drink" ? "напиток" : "тайское блюдо"];
    delete entry.englishName;
    delete entry.englishDescription;
    delete entry.section;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}

await Promise.all(Array.from({ length: 3 }, () => worker()));
await writeFile(cachePath, JSON.stringify(translations, null, 2), "utf8");
entries.forEach((entry, index) => {
  const remoteUrl = entry.photo.url;
  const extension = remoteUrl.match(/\.([a-z0-9]+)(?:\/[^/]*)?$/i)?.[1]?.toLowerCase() || "jpg";
  const safeExtension = ["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(extension) ? extension : "jpg";
  const filename = `${String(index + 1).padStart(3, "0")}.${safeExtension}`;
  entry.photo.remoteUrl = remoteUrl;
  entry.photo.url = `images/menu/${filename}`;
});
const output = `window.verifiedMenuItems = ${JSON.stringify(entries, null, 2)};\n`;
await writeFile(path.join(rootDir, "verified-menu-data.js"), output, "utf8");

const counts = entries.reduce((result, entry) => {
  result[entry.category] = (result[entry.category] || 0) + 1;
  return result;
}, {});
console.log(`Saved ${entries.length} verified entries: ${JSON.stringify(counts)}`);
