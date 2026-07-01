(function buildMenuData() {
  const dishMethods = [
    ["ผัด", "phat", "обжаривание в воке", false], ["ทอด", "thot", "жарка во фритюре", true],
    ["ย่าง", "yang", "гриль", true], ["นึ่ง", "nueng", "на пару", true],
    ["ต้ม", "tom", "варка", false], ["อบ", "op", "запекание", true],
    ["ลวก", "luak", "быстрое отваривание", true], ["คั่ว", "khua", "сухая обжарка", false],
    ["ผัดกะเพรา", "phat kaphrao", "обжаривание с базиликом", false],
    ["ผัดกระเทียม", "phat krathiam", "обжаривание с чесноком", true],
    ["ผัดพริกแกง", "phat phrik kaeng", "обжаривание с пастой карри", false],
    ["ผัดขิง", "phat khing", "обжаривание с имбирём", true],
    ["ทอดกระเทียม", "thot krathiam", "жарка с чесноком", true],
    ["ย่างเกลือ", "yang kluea", "гриль с солью", true],
    ["นึ่งมะนาว", "nueng manao", "на пару с лаймом", true]
  ];

  const dishIngredients = [
    ["ไก่", "kai", "курицей"], ["หมู", "mu", "свининой"], ["เนื้อ", "nuea", "говядиной"],
    ["เป็ด", "pet", "уткой"], ["ปลา", "pla", "рыбой"], ["กุ้ง", "kung", "креветками"],
    ["ปลาหมึก", "pla muek", "кальмаром"], ["ปู", "pu", "крабом"], ["หอย", "hoi", "моллюсками"],
    ["ไข่", "khai", "яйцом"], ["เต้าหู้", "tao-hu", "тофу"], ["เห็ด", "het", "грибами"],
    ["ผักรวม", "phak ruam", "овощной смесью"], ["คะน้า", "khana", "китайской брокколи"],
    ["ผักบุ้ง", "phak bung", "водяным шпинатом"], ["กะหล่ำปลี", "kalam pli", "капустой"],
    ["บรอกโคลี", "brokkholi", "брокколи"], ["ดอกกะหล่ำ", "dok kalam", "цветной капустой"],
    ["ฟักทอง", "fak thong", "тыквой"], ["มะเขือ", "makhuea", "баклажаном"],
    ["หน่อไม้", "no mai", "побегами бамбука"], ["ถั่วฝักยาว", "thua fak yao", "длинной фасолью"],
    ["ข้าวโพด", "khao phot", "кукурузой"], ["มันฝรั่ง", "man farang", "картофелем"]
  ];

  const dishBases = [
    ["ข้าวผัด", "khao phat", "жареный рис"], ["ข้าวต้ม", "khao tom", "рисовый суп"],
    ["โจ๊ก", "chok", "рисовая каша"], ["ก๋วยเตี๋ยว", "kuai tiao", "рисовая лапша"],
    ["บะหมี่", "bami", "пшеничная лапша"], ["วุ้นเส้น", "wun sen", "стеклянная лапша"],
    ["ราดหน้า", "rat na", "лапша с густым соусом"], ["ผัดไทย", "phat thai", "лапша пад-тай"],
    ["ข้าวหน้า", "khao na", "рис с топпингом"], ["ข้าวราด", "khao rat", "рис с соусом"]
  ];

  const curryBases = [
    ["แกงเขียวหวาน", "kaeng khiao wan", "зелёное карри"], ["แกงเผ็ด", "kaeng phet", "красное карри"],
    ["แกงพะแนง", "kaeng phanaeng", "карри пананг"], ["แกงมัสมั่น", "kaeng matsaman", "карри массаман"],
    ["แกงกะหรี่", "kaeng kari", "жёлтое карри"], ["ต้มข่า", "tom kha", "суп том-кха"]
  ];

  const dishItems = [];
  const seenDishes = new Set();
  const addDish = (thai, translit, ru, tags) => {
    if (seenDishes.has(thai)) return;
    seenDishes.add(thai);
    dishItems.push({ thai, translit, ru, category: "dish", tags });
  };

  [
    ["ข้าวมันไก่", "khao man kai", "курица с ароматным рисом", ["рис", "курица", "классика"]],
    ["ต้มยำกุ้ง", "tom yam kung", "том-ям с креветками", ["суп", "креветки", "остро"]],
    ["ส้มตำ", "som tam", "салат из зелёной папайи", ["салат", "папайя", "рынок"]],
    ["หมูปิ้ง", "mu ping", "свиные шпажки", ["свинина", "гриль", "улица"]],
    ["ห่อหมกปลา", "ho mok pla", "рыбное карри на пару", ["рыба", "карри", "на пару"]],
    ["ลาบหมู", "lap mu", "острый салат лааб со свининой", ["салат", "свинина", "исан"]],
    ["ข้าวซอยไก่", "khao soi kai", "северная лапша карри с курицей", ["лапша", "карри", "север"]],
    ["ไก่ทอดหาดใหญ่", "kai thot hat yai", "жареная курица по-хатъяйски", ["курица", "жареное", "юг"]]
  ].forEach((item) => addDish(...item));

  dishIngredients.forEach(([ingredientThai, ingredientLatin, ingredientRu]) => {
    dishMethods.forEach(([methodThai, methodLatin, methodRu, ingredientFirst]) => {
      const thai = ingredientFirst ? `${ingredientThai}${methodThai}` : `${methodThai}${ingredientThai}`;
      const translit = ingredientFirst ? `${ingredientLatin} ${methodLatin}` : `${methodLatin} ${ingredientLatin}`;
      addDish(thai, translit, `Блюдо с ${ingredientRu}: ${methodRu}`, [methodRu, ingredientRu, "блюдо"]);
    });
    dishBases.forEach(([baseThai, baseLatin, baseRu]) => {
      addDish(`${baseThai}${ingredientThai}`, `${baseLatin} ${ingredientLatin}`, `${baseRu} с ${ingredientRu}`, [baseRu, ingredientRu, "кафе"]);
    });
    curryBases.forEach(([baseThai, baseLatin, baseRu]) => {
      addDish(`${baseThai}${ingredientThai}`, `${baseLatin} ${ingredientLatin}`, `${baseRu} с ${ingredientRu}`, ["карри", ingredientRu, "блюдо"]);
    });
  });

  const hotDrinkBases = [
    ["ชาไทย", "cha thai", "тайский чай"], ["ชาเขียว", "cha khiao", "зелёный чай"],
    ["ชาดำ", "cha dam", "чёрный чай"], ["ชามะนาว", "cha manao", "чай с лаймом"],
    ["ชาขิง", "cha khing", "имбирный чай"], ["กาแฟ", "kafae", "кофе"],
    ["กาแฟโบราณ", "kafae boran", "традиционный тайский кофе"], ["โอเลี้ยง", "o-liang", "тайский чёрный кофе"],
    ["โกโก้", "koko", "какао"], ["นมสด", "nom sot", "молоко"]
  ];
  const coldDrinkBases = [
    ["น้ำมะพร้าว", "nam maphao", "кокосовая вода"], ["น้ำมะนาว", "nam manao", "лаймовый напиток"],
    ["น้ำส้ม", "nam som", "апельсиновый сок"], ["น้ำแตงโม", "nam taengmo", "арбузный сок"],
    ["น้ำสับปะรด", "nam sapparot", "ананасовый сок"], ["น้ำมะม่วง", "nam mamuang", "манговый сок"],
    ["น้ำลิ้นจี่", "nam linchi", "сок личи"], ["น้ำฝรั่ง", "nam farang", "сок гуавы"],
    ["น้ำอ้อย", "nam oi", "сок сахарного тростника"], ["น้ำเก๊กฮวย", "nam kekhuai", "напиток из хризантемы"]
  ];
  const hotVariants = [
    ["", "", ""], ["เย็น", "yen", "со льдом"], ["ร้อน", "ron", "горячий"],
    ["ใส่นม", "sai nom", "с молоком"], ["หวานน้อย", "wan noi", "менее сладкий"]
  ];
  const coldVariants = [
    ["", "", ""], ["เย็น", "yen", "охлаждённый"], ["ปั่น", "pan", "смузи"],
    ["ไม่หวาน", "mai wan", "без сахара"], ["หวานน้อย", "wan noi", "менее сладкий"]
  ];
  const drinkItems = [];
  const addDrinks = (bases, variants) => bases.forEach(([baseThai, baseLatin, baseRu]) => {
    variants.forEach(([suffixThai, suffixLatin, suffixRu]) => {
      drinkItems.push({
        thai: `${baseThai}${suffixThai}`,
        translit: `${baseLatin} ${suffixLatin}`.trim(),
        ru: suffixRu ? `${baseRu}, ${suffixRu}` : baseRu,
        category: "drink",
        tags: ["напиток", baseRu, suffixRu || "обычный"]
      });
    });
  });
  addDrinks(hotDrinkBases, hotVariants);
  addDrinks(coldDrinkBases, coldVariants);

  const ingredientBases = [
    ["ไก่", "kai", "курица"], ["หมู", "mu", "свинина"], ["เนื้อวัว", "nuea wua", "говядина"],
    ["เป็ด", "pet", "утка"], ["ปลา", "pla", "рыба"], ["กุ้ง", "kung", "креветки"],
    ["ปลาหมึก", "pla muek", "кальмар"], ["ปู", "pu", "краб"], ["หอย", "hoi", "моллюски"],
    ["ไข่", "khai", "яйцо"], ["เต้าหู้", "tao-hu", "тофу"], ["เห็ด", "het", "грибы"],
    ["ข้าวโพด", "khao phot", "кукуруза"], ["ถั่วลันเตา", "thua lantao", "зелёный горошек"],
    ["ผักโขม", "phak khom", "шпинат"], ["คะน้า", "khana", "китайская брокколи"],
    ["บรอกโคลี", "brokkholi", "брокколи"], ["ดอกกะหล่ำ", "dok kalam", "цветная капуста"],
    ["ฟักทอง", "fak thong", "тыква"], ["เผือก", "phueak", "таро"], ["มันฝรั่ง", "man farang", "картофель"],
    ["มันเทศ", "man thet", "батат"], ["มันสำปะหลัง", "man sampalang", "кассава"], ["แครอท", "khaerot", "морковь"],
    ["มะเขือเทศ", "makhuea thet", "помидор"], ["พริก", "phrik", "чили"], ["กระเทียม", "krathiam", "чеснок"],
    ["หอมใหญ่", "hom yai", "репчатый лук"], ["ขิง", "khing", "имбирь"], ["ข่า", "kha", "галангал"],
    ["ตะไคร้", "takhrai", "лемонграсс"], ["มะกรูด", "makrut", "каффир-лайм"], ["มะพร้าว", "maphao", "кокос"],
    ["กล้วย", "kluai", "банан"], ["มะม่วง", "mamuang", "манго"], ["สับปะรด", "sapparot", "ананас"],
    ["ทุเรียน", "thurian", "дуриан"], ["มะละกอ", "malako", "папайя"], ["ฝรั่ง", "farang", "гуава"],
    ["แตงโม", "taengmo", "арбуз"], ["แตงไทย", "taeng thai", "тайская дыня"], ["ลิ้นจี่", "linchi", "личи"],
    ["ลำไย", "lamyai", "лонган"], ["เงาะ", "ngo", "рамбутан"], ["ขนุน", "khanun", "джекфрут"],
    ["หน่อไม้", "no mai", "побеги бамбука"], ["ถั่วงอก", "thua ngok", "ростки фасоли"],
    ["ผักบุ้ง", "phak bung", "водяной шпинат"], ["กะหล่ำปลี", "kalam pli", "капуста"], ["แตงกวา", "taeng kwa", "огурец"]
  ];
  const ingredientItems = ingredientBases.map(([thai, translit, ru]) => ({
    thai,
    translit,
    ru,
    category: "ingredient",
    tags: ["ингредиент", "продукт", ru]
  }));

  const heatMethods = [
    ["ผัด", "phat", "обжаривать в воке"], ["ทอด", "thot", "жарить"], ["ย่าง", "yang", "готовить на гриле"],
    ["ต้ม", "tom", "варить"], ["นึ่ง", "nueng", "готовить на пару"], ["อบ", "op", "запекать"],
    ["คั่ว", "khua", "обжаривать без масла"], ["ลวก", "luak", "быстро отваривать"],
    ["ตุ๋น", "tun", "долго тушить"], ["เคี่ยว", "khiao", "уваривать"], ["รมควัน", "rom khwan", "коптить"],
    ["จี่", "chi", "поджаривать на сковороде"], ["ปิ้ง", "ping", "жарить над углями"],
    ["ผิง", "phing", "печь у жара"], ["เผา", "phao", "обжигать на огне"],
    ["ทอดน้ำมัน", "thot namman", "жарить в масле"], ["ทอดไร้น้ำมัน", "thot rai namman", "готовить без масла"],
    ["ผัดแห้ง", "phat haeng", "обжаривать досуха"], ["ต้มเดือด", "tom dueat", "кипятить"],
    ["นึ่งอบ", "nueng op", "готовить паром и жаром"]
  ];
  const heatLevels = [
    ["", "", ""], ["ไฟอ่อน", "fai on", "на слабом огне"],
    ["ไฟกลาง", "fai klang", "на среднем огне"], ["ไฟแรง", "fai raeng", "на сильном огне"]
  ];
  const prepMethods = [
    ["หั่น", "han", "нарезать"], ["สับ", "sap", "рубить"], ["ซอย", "soi", "тонко шинковать"],
    ["บด", "bot", "измельчать"], ["ตำ", "tam", "толочь в ступке"], ["โขลก", "khlok", "растирать в ступке"],
    ["หมัก", "mak", "мариновать"], ["คลุก", "khluk", "перемешивать"], ["คน", "khon", "размешивать"],
    ["กรอง", "krong", "процеживать"], ["ปอก", "pok", "очищать кожуру"], ["ขูด", "khut", "натирать"],
    ["บีบ", "bip", "выжимать"], ["แช่", "chae", "замачивать"], ["ละลาย", "lalai", "растворять"],
    ["โรย", "roi", "посыпать"], ["ราด", "rat", "поливать соусом"], ["จิ้ม", "chim", "макать в соус"],
    ["ปรุงรส", "prung rot", "приправлять"], ["ชิม", "chim", "пробовать на вкус"]
  ];
  const methodItems = [];
  heatMethods.forEach(([methodThai, methodLatin, methodRu]) => {
    heatLevels.forEach(([suffixThai, suffixLatin, suffixRu]) => {
      methodItems.push({
        thai: `${methodThai}${suffixThai}`,
        translit: `${methodLatin} ${suffixLatin}`.trim(),
        ru: suffixRu ? `${methodRu} ${suffixRu}` : methodRu,
        category: "method",
        tags: ["способ приготовления", methodRu, suffixRu || "кухня"]
      });
    });
  });
  prepMethods.forEach(([thai, translit, ru]) => methodItems.push({
    thai, translit, ru, category: "method", tags: ["подготовка", "способ приготовления", ru]
  }));

  const verifiedMenuItems = Array.isArray(window.verifiedMenuItems) ? window.verifiedMenuItems : [];
  const menuItems = [
    ...verifiedMenuItems,
    ...ingredientItems.slice(0, 50),
    ...methodItems.slice(0, 100)
  ];

  window.menuItems = menuItems;
})();
