const letters = [
  { glyph: "ก", name: "ก ไก่", sound: "средний класс · нач. k/g · фин. k", cue: "курица и базовая буква для меню", word: "ไก่", translit: "gai", ru: "курица" },
  { glyph: "ข", name: "ข ไข่", sound: "высокий класс · нач. kh · фин. k", cue: "яйцо часто встречается в блюдах с рисом", word: "ไข่", translit: "khai", ru: "яйцо" },
  { glyph: "ฃ", name: "ฃ ขวด", sound: "высокий класс · устаревшая · kh/k", cue: "устаревшая буква, но остается в полном алфавите", word: "ขวด", translit: "khuat", ru: "бутылка" },
  { glyph: "ค", name: "ค ควาย", sound: "низкий класс · нач. kh · фин. k", cue: "запомни через овощ в уличной еде", word: "คะน้า", translit: "khana", ru: "китайская брокколи" },
  { glyph: "ฅ", name: "ฅ คน", sound: "низкий класс · устаревшая · kh/k", cue: "устаревшая буква, в современных словах почти не используется", word: "ฅน", translit: "khon", ru: "человек" },
  { glyph: "ฆ", name: "ฆ ระฆัง", sound: "низкий класс · нач. kh · фин. k", cue: "редкая буква, полезна для узнавания вывесок и слов", word: "ระฆัง", translit: "ra-khang", ru: "колокол" },
  { glyph: "ง", name: "ง งู", sound: "низкий класс · ng", cue: "как в слове про кунжут", word: "งา", translit: "nga", ru: "кунжут" },
  { glyph: "จ", name: "จ จาน", sound: "средний класс · нач. ch/j · фин. t", cue: "слово для тарелки в кафе", word: "จาน", translit: "chan", ru: "тарелка" },
  { glyph: "ฉ", name: "ฉ ฉิ่ง", sound: "высокий класс · ch", cue: "встречается в названии рыбного карри", word: "ฉู่ฉี่ปลา", translit: "chu chi pla", ru: "рыба в густом карри" },
  { glyph: "ช", name: "ช ช้าง", sound: "низкий класс · нач. ch · фин. t", cue: "чай и холодные напитки", word: "ชาเย็น", translit: "cha yen", ru: "тайский холодный чай" },
  { glyph: "ซ", name: "ซ โซ่", sound: "низкий класс · нач. s · фин. t", cue: "соевый соус в меню", word: "ซีอิ๊ว", translit: "si-io", ru: "соевый соус" },
  { glyph: "ฌ", name: "ฌ เฌอ", sound: "низкий класс · нач. ch · фин. t", cue: "редкая буква, чаще учится по традиционному слову", word: "เฌอ", translit: "choe", ru: "дерево" },
  { glyph: "ญ", name: "ญ หญิง", sound: "низкий класс · нач. y · фин. n", cue: "в меню встречается в заимствованных и формальных словах", word: "หญิง", translit: "ying", ru: "женщина" },
  { glyph: "ฎ", name: "ฎ ชฎา", sound: "средний класс · нач. d · фин. t", cue: "редкая буква для чтения вывесок и названий", word: "ชฎา", translit: "chada", ru: "тайский головной убор" },
  { glyph: "ฏ", name: "ฏ ปฏัก", sound: "средний класс · нач. t · фин. t", cue: "редкая буква, важна для полного алфавита", word: "ปฏัก", translit: "patak", ru: "стрекало" },
  { glyph: "ฐ", name: "ฐ ฐาน", sound: "высокий класс · нач. th · фин. t", cue: "полезна для слов вроде основы или базы", word: "ฐาน", translit: "than", ru: "основание" },
  { glyph: "ฑ", name: "ฑ มณโฑ", sound: "низкий класс · нач. th/d · фин. t", cue: "редкая буква, чаще запоминается по традиционному имени", word: "มณโฑ", translit: "montho", ru: "Монтхо, персонаж эпоса" },
  { glyph: "ฒ", name: "ฒ ผู้เฒ่า", sound: "низкий класс · нач. th · фин. t", cue: "редкая буква, но входит в учебный алфавит", word: "ผู้เฒ่า", translit: "phu thao", ru: "старец" },
  { glyph: "ณ", name: "ณ เณร", sound: "низкий класс · n", cue: "встречается в формальных словах и именах", word: "เณร", translit: "nen", ru: "послушник" },
  { glyph: "ด", name: "ด เด็ก", sound: "средний класс · нач. d · фин. t", cue: "как в слове пить", word: "ดื่ม", translit: "duem", ru: "пить" },
  { glyph: "ต", name: "ต เต่า", sound: "средний класс · нач. t · фин. t", cue: "как в любимом супе", word: "ต้มยำ", translit: "tom yam", ru: "кисло-острый суп" },
  { glyph: "ถ", name: "ถ ถุง", sound: "высокий класс · нач. th · фин. t", cue: "слово для заказа с собой", word: "ถุง", translit: "thung", ru: "пакет" },
  { glyph: "ท", name: "ท ทหาร", sound: "низкий класс · нач. th · фин. t", cue: "как в жареных блюдах", word: "ทอด", translit: "thot", ru: "жарить во фритюре" },
  { glyph: "ธ", name: "ธ ธง", sound: "низкий класс · нач. th · фин. t", cue: "встречается в словах про злаки и продукты", word: "ธัญพืช", translit: "than-yaphuet", ru: "злаки" },
  { glyph: "น", name: "น หนู", sound: "низкий класс · n", cue: "вода, напитки и супы", word: "น้ำ", translit: "nam", ru: "вода" },
  { glyph: "บ", name: "บ ใบไม้", sound: "средний класс · нач. b · фин. p", cue: "тайский десерт с кокосовым молоком", word: "บัวลอย", translit: "bua loi", ru: "рисовые шарики в кокосовом молоке" },
  { glyph: "ป", name: "ป ปลา", sound: "средний класс · нач. p · фин. p", cue: "рыба в меню", word: "ปลา", translit: "pla", ru: "рыба" },
  { glyph: "ผ", name: "ผ ผึ้ง", sound: "высокий класс · ph", cue: "основа многих жареных блюд", word: "ผัดไทย", translit: "phat thai", ru: "жареная лапша" },
  { glyph: "ฝ", name: "ฝ ฝา", sound: "высокий класс · f", cue: "как фрукт, который продают на рынках", word: "ฝรั่ง", translit: "farang", ru: "гуава" },
  { glyph: "พ", name: "พ พาน", sound: "низкий класс · нач. ph · фин. p", cue: "чили и острота", word: "พริก", translit: "phrik", ru: "чили" },
  { glyph: "ฟ", name: "ฟ ฟัน", sound: "низкий класс · нач. f · фин. p", cue: "тыква в карри и десертах", word: "ฟักทอง", translit: "fak thong", ru: "тыква" },
  { glyph: "ภ", name: "ภ สำเภา", sound: "низкий класс · нач. ph · фин. p", cue: "формальное слово для ресторана", word: "ภัตตาคาร", translit: "phattakhan", ru: "ресторан" },
  { glyph: "ม", name: "ม ม้า", sound: "низкий класс · m", cue: "манго на рынке", word: "มะม่วง", translit: "ma muang", ru: "манго" },
  { glyph: "ย", name: "ย ยักษ์", sound: "низкий класс · y", cue: "кисло-острые салаты", word: "ยำ", translit: "yam", ru: "острый салат" },
  { glyph: "ร", name: "ร เรือ", sound: "низкий класс · нач. r · фин. n", cue: "главное слово для поиска кафе", word: "ร้านอาหาร", translit: "ran ahan", ru: "ресторан" },
  { glyph: "ล", name: "ล ลิง", sound: "низкий класс · нач. l · фин. n", cue: "северо-восточный салат", word: "ลาบ", translit: "lap", ru: "лааб, рубленое мясо с травами" },
  { glyph: "ว", name: "ว แหวน", sound: "низкий класс · w", cue: "стеклянная лапша", word: "วุ้นเส้น", translit: "wun sen", ru: "стеклянная лапша" },
  { glyph: "ศ", name: "ศ ศาลา", sound: "высокий класс · нач. s · фин. t", cue: "как в слове про фудкорт", word: "ศูนย์อาหาร", translit: "sun ahan", ru: "фудкорт" },
  { glyph: "ษ", name: "ษ ฤๅษี", sound: "высокий класс · нач. s · фин. t", cue: "редкая буква, важна для чтения формальных слов", word: "ฤๅษี", translit: "ruesi", ru: "отшельник" },
  { glyph: "ส", name: "ส เสือ", sound: "высокий класс · нач. s · фин. t", cue: "папайя-салат", word: "ส้มตำ", translit: "som tam", ru: "салат из папайи" },
  { glyph: "ห", name: "ห หีบ", sound: "высокий класс · h", cue: "морепродукты и ракушки", word: "หอย", translit: "hoi", ru: "моллюски" },
  { glyph: "ฬ", name: "ฬ จุฬา", sound: "низкий класс · нач. l · фин. n", cue: "редкая буква, учится по традиционному имени", word: "จุฬา", translit: "chula", ru: "воздушный змей" },
  { glyph: "อ", name: "อ อ่าง", sound: "средний класс · носитель гласной / ʔ", cue: "главное слово еды", word: "อาหาร", translit: "ahan", ru: "еда" },
  { glyph: "ฮ", name: "ฮ นกฮูก", sound: "низкий класс · h", cue: "димсам, который можно встретить в тайско-китайских кафе", word: "ฮะเก๋า", translit: "ha kao", ru: "хакау, креветочные пельмени" }
];

const letterDishExamples = {
  "ก": [{ thai: "ไก่ย่าง", ru: "курица гриль", icon: "🍗" }, { thai: "ก๋วยเตี๋ยว", ru: "суп-лапша", icon: "🍜" }, { thai: "กะทิ", ru: "кокосовое молоко", icon: "🥥" }],
  "ข": [{ thai: "ข้าวผัด", ru: "жареный рис", icon: "🍚" }, { thai: "ไข่เจียว", ru: "омлет", icon: "🍳" }, { thai: "ขนมจีน", ru: "рисовая лапша", icon: "🍜" }],
  "ฃ": [{ thai: "ขวดน้ำ", ru: "бутылка воды", icon: "🧴" }, { thai: "ขวดชา", ru: "бутылка чая", icon: "🧋" }, { thai: "ขวดซอส", ru: "бутылка соуса", icon: "🥫" }],
  "ค": [{ thai: "คะน้าหมูกรอบ", ru: "брокколи со свининой", icon: "🥬" }, { thai: "คั่วไก่", ru: "жареная лапша с курицей", icon: "🍜" }, { thai: "คอหมูย่าง", ru: "свиная шея гриль", icon: "🥩" }],
  "ฅ": [{ thai: "ฅนขายอาหาร", ru: "продавец еды", icon: "🧑‍🍳" }, { thai: "ฅนครัว", ru: "повар", icon: "🍳" }, { thai: "ฅนกิน", ru: "едок", icon: "🥢" }],
  "ฆ": [{ thai: "ระฆังตลาด", ru: "рыночный колокол", icon: "🔔" }, { thai: "ฆ้องวง", ru: "гонг у храма", icon: "🥁" }, { thai: "ฆ่าเชื้อ", ru: "стерилизация", icon: "🧼" }],
  "ง": [{ thai: "งาดำ", ru: "черный кунжут", icon: "⚫" }, { thai: "งาขาว", ru: "белый кунжут", icon: "⚪" }, { thai: "น้ำมันงา", ru: "кунжутное масло", icon: "🫙" }],
  "จ": [{ thai: "จานข้าว", ru: "тарелка риса", icon: "🍽️" }, { thai: "จับฉ่าย", ru: "овощное рагу", icon: "🥘" }, { thai: "จิ้มจุ่ม", ru: "тайский хот-пот", icon: "🍲" }],
  "ฉ": [{ thai: "ฉู่ฉี่ปลา", ru: "рыба в карри", icon: "🐟" }, { thai: "ฉลามผัดฉ่า", ru: "акула с травами", icon: "🍛" }, { thai: "ฉาบกล้วย", ru: "банановые чипсы", icon: "🍌" }],
  "ช": [{ thai: "ชาเย็น", ru: "холодный чай", icon: "🧋" }, { thai: "ชานม", ru: "молочный чай", icon: "🥛" }, { thai: "ชะอมไข่", ru: "акация с яйцом", icon: "🥚" }],
  "ซ": [{ thai: "ซีอิ๊ว", ru: "соевый соус", icon: "🥫" }, { thai: "ซุปไก่", ru: "куриный суп", icon: "🍲" }, { thai: "ซาลาเปา", ru: "паровая булочка", icon: "🥟" }],
  "ฌ": [{ thai: "เฌอ", ru: "дерево", icon: "🌳" }, { thai: "ฌาน", ru: "медитация", icon: "🧘" }, { thai: "เฌอเอม", ru: "вид дерева", icon: "🌿" }],
  "ญ": [{ thai: "หญ้าหวาน", ru: "стевия", icon: "🌿" }, { thai: "ก๋วยเตี๋ยวญวน", ru: "вьетнамская лапша", icon: "🍜" }, { thai: "หญิงขายผลไม้", ru: "продавщица фруктов", icon: "🍍" }],
  "ฎ": [{ thai: "ชฎาทอง", ru: "золотой головной убор", icon: "👑" }, { thai: "กฎ", ru: "правило", icon: "📋" }, { thai: "มงกุฎ", ru: "корона", icon: "👑" }],
  "ฏ": [{ thai: "ปฏัก", ru: "стрекало", icon: "🪵" }, { thai: "ปฏิทินตลาด", ru: "календарь рынка", icon: "🗓️" }, { thai: "ปฏิบัติครัว", ru: "кухонная практика", icon: "🔪" }],
  "ฐ": [{ thai: "ฐานจาน", ru: "подставка тарелки", icon: "🍽️" }, { thai: "ฐานหม้อ", ru: "дно кастрюли", icon: "🍲" }, { thai: "ฐานเตา", ru: "основание плиты", icon: "🔥" }],
  "ฑ": [{ thai: "มณโฑ", ru: "Монтхо, героиня эпоса", icon: "🎭" }, { thai: "กรีฑา", ru: "лёгкая атлетика", icon: "🏃" }, { thai: "บัณฑิต", ru: "выпускник", icon: "🎓" }],
  "ฒ": [{ thai: "ผู้เฒ่า", ru: "старец", icon: "👴" }, { thai: "เฒ่าแก่ร้าน", ru: "хозяин лавки", icon: "🏪" }, { thai: "ผู้เฒ่ากินชา", ru: "старик пьет чай", icon: "🍵" }],
  "ณ": [{ thai: "เณรกินข้าว", ru: "послушник ест рис", icon: "🍚" }, { thai: "ณ ร้านอาหาร", ru: "в ресторане", icon: "🏪" }, { thai: "มะนาวคุณภาพ", ru: "лайм качества", icon: "🍋" }],
  "ด": [{ thai: "ดื่มน้ำ", ru: "пить воду", icon: "🥤" }, { thai: "ดอกกะหล่ำ", ru: "цветная капуста", icon: "🥦" }, { thai: "เดือด", ru: "кипит", icon: "🍲" }],
  "ต": [{ thai: "ต้มยำ", ru: "том-ям", icon: "🍲" }, { thai: "ต้มข่าไก่", ru: "кокосовый суп", icon: "🥥" }, { thai: "ตำไทย", ru: "папайя-салат", icon: "🥗" }],
  "ถ": [{ thai: "ถุงแกง", ru: "пакет карри", icon: "🛍️" }, { thai: "ถั่วลิสง", ru: "арахис", icon: "🥜" }, { thai: "ถ้วยน้ำจิ้ม", ru: "чаша соуса", icon: "🥣" }],
  "ท": [{ thai: "ทอดมันปลา", ru: "рыбные котлеты", icon: "🐟" }, { thai: "ทุเรียน", ru: "дуриан", icon: "🍈" }, { thai: "ทองหยิบ", ru: "тайский десерт", icon: "🍮" }],
  "ธ": [{ thai: "ธัญพืช", ru: "злаки", icon: "🌾" }, { thai: "ชาอู่หลง", ru: "улун", icon: "🍵" }, { thai: "ธงร้าน", ru: "флажок лавки", icon: "🚩" }],
  "น": [{ thai: "น้ำเปล่า", ru: "вода", icon: "💧" }, { thai: "น้ำปลา", ru: "рыбный соус", icon: "🥫" }, { thai: "น้ำมะพร้าว", ru: "кокосовая вода", icon: "🥥" }],
  "บ": [{ thai: "บัวลอย", ru: "кокосовый десерт", icon: "🍡" }, { thai: "บะหมี่", ru: "пшеничная лапша", icon: "🍜" }, { thai: "ใบกะเพรา", ru: "базилик", icon: "🌿" }],
  "ป": [{ thai: "ปลาเผา", ru: "рыба на гриле", icon: "🐟" }, { thai: "ปูผัดผงกะหรี่", ru: "краб карри", icon: "🦀" }, { thai: "ปอเปี๊ยะ", ru: "спринг-роллы", icon: "🌯" }],
  "ผ": [{ thai: "ผัดไทย", ru: "пад-тай", icon: "🍜" }, { thai: "ผักบุ้งไฟแดง", ru: "утренняя слава", icon: "🥬" }, { thai: "ผัดกะเพรา", ru: "базилик stir-fry", icon: "🍛" }],
  "ฝ": [{ thai: "ฝรั่ง", ru: "гуава", icon: "🍏" }, { thai: "ฝอยทอง", ru: "яичный десерт", icon: "🍮" }, { thai: "ฝักทอง", ru: "тыква", icon: "🎃" }],
  "พ": [{ thai: "พริก", ru: "чили", icon: "🌶️" }, { thai: "พะแนง", ru: "пананг карри", icon: "🍛" }, { thai: "พะโล้", ru: "тушеные яйца", icon: "🥚" }],
  "ฟ": [{ thai: "ฟักทอง", ru: "тыква", icon: "🎃" }, { thai: "ฟองเต้าหู้", ru: "юба", icon: "🥢" }, { thai: "กาแฟ", ru: "кофе", icon: "☕" }],
  "ภ": [{ thai: "ภัตตาคาร", ru: "ресторан", icon: "🏪" }, { thai: "อาหารภาคใต้", ru: "южная кухня", icon: "🍛" }, { thai: "ภูเขาทอง", ru: "название десерта", icon: "🍮" }],
  "ม": [{ thai: "มะม่วง", ru: "манго", icon: "🥭" }, { thai: "หมูปิ้ง", ru: "свинина гриль", icon: "🍢" }, { thai: "มะพร้าว", ru: "кокос", icon: "🥥" }],
  "ย": [{ thai: "ยำวุ้นเส้น", ru: "салат со стеклянной лапшой", icon: "🥗" }, { thai: "ยำทะเล", ru: "морской салат", icon: "🦐" }, { thai: "ย่าง", ru: "гриль", icon: "🔥" }],
  "ร": [{ thai: "ร้านอาหาร", ru: "ресторан", icon: "🏪" }, { thai: "โรตี", ru: "роти", icon: "🥞" }, { thai: "ราดหน้า", ru: "лапша в соусе", icon: "🍜" }],
  "ล": [{ thai: "ลาบหมู", ru: "лааб со свининой", icon: "🥗" }, { thai: "ลอดช่อง", ru: "кокосовый десерт", icon: "🍧" }, { thai: "ลิ้นจี่", ru: "личи", icon: "🍒" }],
  "ว": [{ thai: "วุ้นเส้น", ru: "стеклянная лапша", icon: "🍜" }, { thai: "หวานเย็น", ru: "сладкий лед", icon: "🍧" }, { thai: "ข้าวเหนียว", ru: "клейкий рис", icon: "🍚" }],
  "ศ": [{ thai: "ศูนย์อาหาร", ru: "фудкорт", icon: "🏬" }, { thai: "อาหารมังสวิรัติ", ru: "вегетарианская еда", icon: "🥗" }, { thai: "เทศกาลอาหาร", ru: "фестиваль еды", icon: "🎪" }],
  "ษ": [{ thai: "เกษตรอินทรีย์", ru: "органические продукты", icon: "🌾" }, { thai: "พืชผักเกษตร", ru: "фермерские овощи", icon: "🥬" }, { thai: "พิเศษ", ru: "особый, специальный", icon: "⭐" }],
  "ส": [{ thai: "ส้มตำ", ru: "сом-там", icon: "🥗" }, { thai: "สุกี้", ru: "суки", icon: "🍲" }, { thai: "สับปะรด", ru: "ананас", icon: "🍍" }],
  "ห": [{ thai: "หอยทอด", ru: "омлет с моллюсками", icon: "🦪" }, { thai: "หมูกรอบ", ru: "хрустящая свинина", icon: "🥓" }, { thai: "ห่อหมก", ru: "рыбное карри в листе", icon: "🍃" }],
  "ฬ": [{ thai: "จุฬา", ru: "макушка, хохолок", icon: "👑" }, { thai: "กีฬา", ru: "спорт", icon: "🏃" }, { thai: "ปลาวาฬ", ru: "кит", icon: "🐋" }],
  "อ": [{ thai: "อาหาร", ru: "еда", icon: "🍽️" }, { thai: "อร่อย", ru: "вкусно", icon: "😋" }, { thai: "โอเลี้ยง", ru: "черный кофе со льдом", icon: "☕" }],
  "ฮ": [{ thai: "ฮะเก๋า", ru: "креветочные пельмени", icon: "🥟" }, { thai: "ฮ่อยจ๊อ", ru: "крабовые рулеты", icon: "🦀" }, { thai: "ฮอทดอก", ru: "хот-дог", icon: "🌭" }]
};

const exampleTransliterations = {
  "ก": ["kai yang", "kuai tiao", "kathi"], "ข": ["khao phat", "khai chiao", "khanom chin"],
  "ฃ": ["khuat nam", "khuat cha", "khuat sot"], "ค": ["khana mu krop", "khua kai", "kho mu yang"],
  "ฅ": ["khon khai ahan", "khon khrua", "khon kin"], "ฆ": ["rakhang talat", "khong wong", "kha chuea"],
  "ง": ["nga dam", "nga khao", "namman nga"], "จ": ["chan khao", "chap chai", "chim chum"],
  "ฉ": ["chu chi pla", "chalam phat cha", "chap kluai"], "ช": ["cha yen", "cha nom", "cha-om khai"],
  "ซ": ["si-iu", "sup kai", "salapao"], "ฌ": ["choe", "chan", "choe-oem"],
  "ญ": ["ya wan", "kuai tiao yuan", "ying khai phonlamai"], "ฎ": ["chada thong", "kot", "mongkut"],
  "ฏ": ["patak", "patithin talat", "patibat khrua"], "ฐ": ["than chan", "than mo", "than tao"],
  "ฑ": ["montho", "kritha", "bandit"], "ฒ": ["phu thao", "thao kae ran", "phu thao kin cha"],
  "ณ": ["nen kin khao", "na ran ahan", "manao khunnaphap"], "ด": ["duem nam", "dok kalam", "dueat"],
  "ต": ["tom yam", "tom kha kai", "tam thai"], "ถ": ["thung kaeng", "thua lisong", "thuai nam chim"],
  "ท": ["thot man pla", "thurian", "thong yip"], "ธ": ["thanyaphuet", "cha u-long", "thong ran"],
  "น": ["nam plao", "nam pla", "nam maphao"], "บ": ["bua loi", "bami", "bai kaphrao"],
  "ป": ["pla phao", "pu phat phong kari", "po pia"], "ผ": ["phat thai", "phak bung fai daeng", "phat kaphrao"],
  "ฝ": ["farang", "foi thong", "fak thong"], "พ": ["phrik", "phanaeng", "phalo"],
  "ฟ": ["fak thong", "fong tao-hu", "kafae"], "ภ": ["phattakhan", "ahan phak tai", "phukhao thong"],
  "ม": ["mamuang", "mu ping", "maphao"], "ย": ["yam wun sen", "yam thale", "yang"],
  "ร": ["ran ahan", "roti", "rat na"], "ล": ["lap mu", "lot chong", "linchi"],
  "ว": ["wun sen", "wan yen", "khao niao"], "ศ": ["sun ahan", "ahan mangsawirat", "thetsakan ahan"],
  "ษ": ["kaset insi", "phuet phak kaset", "phiset"], "ส": ["som tam", "suki", "sapparot"],
  "ห": ["hoi thot", "mu krop", "ho mok"], "ฬ": ["chula", "kila", "pla wan"],
  "อ": ["ahan", "aroi", "o-liang"], "ฮ": ["ha kao", "hoi cho", "hot-dok"]
};

const foods = [
  { thai: "ข้าวผัด", translit: "khao phat", ru: "жареный рис", tags: ["рис", "мягко", "кафе"] },
  { thai: "ผัดไทย", translit: "phat thai", ru: "жареная лапша с тамариндом", tags: ["лапша", "классика", "улица"] },
  { thai: "ต้มยำกุ้ง", translit: "tom yam kung", ru: "острый суп с креветками", tags: ["суп", "остро", "креветки"] },
  { thai: "ส้มตำ", translit: "som tam", ru: "салат из зеленой папайи", tags: ["салат", "остро", "рынок"] },
  { thai: "ข้าวมันไก่", translit: "khao man gai", ru: "курица с рисом", tags: ["рис", "курица", "завтрак"] },
  { thai: "แกงเขียวหวาน", translit: "kaeng khiao wan", ru: "зеленое карри", tags: ["карри", "кокос", "остро"] },
  { thai: "หมูปิ้ง", translit: "mu ping", ru: "свинина на шпажках", tags: ["гриль", "рынок", "быстро"] },
  { thai: "ชาเย็น", translit: "cha yen", ru: "холодный тайский чай", tags: ["напиток", "сладко", "лед"] },
  { thai: "น้ำมะพร้าว", translit: "nam ma phrao", ru: "кокосовая вода", tags: ["напиток", "кокос", "жара"] }
];

const menuItems = Array.isArray(window.menuItems) ? window.menuItems : foods;
const menuCategoryCounts = menuItems.reduce((counts, item) => {
  counts[item.category] = (counts[item.category] || 0) + 1;
  return counts;
}, {});
menuCategoryCounts.noodle = menuItems.filter((item) => item.category === "noodle" || item.categories?.includes("noodle")).length;
const menuCategoryLabels = {
  dish: "Блюдо",
  drink: "Напиток",
  noodle: "Лапша",
  ingredient: "Ингредиент",
  method: "Приготовление"
};
function getMenuPhoto(food) {
  return food.photo || null;
}

function escapeMarkup(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

const phraseBreakdowns = {
  "ข้าวผัด": [
    { thai: "ข้าว", translit: "khao", ru: "рис" },
    { thai: "ผัด", translit: "phat", ru: "жарить, обжаренный" }
  ],
  "ผัดไทย": [
    { thai: "ผัด", translit: "phat", ru: "жарить, обжаренный" },
    { thai: "ไทย", translit: "thai", ru: "тайский" }
  ],
  "ต้มยำกุ้ง": [
    { thai: "ต้ม", translit: "tom", ru: "варить, суп" },
    { thai: "ยำ", translit: "yam", ru: "кисло-острый салат/смесь" },
    { thai: "กุ้ง", translit: "kung", ru: "креветка" }
  ],
  "ส้มตำ": [
    { thai: "ส้ม", translit: "som", ru: "кислый" },
    { thai: "ตำ", translit: "tam", ru: "толочь в ступке" }
  ],
  "ข้าวมันไก่": [
    { thai: "ข้าว", translit: "khao", ru: "рис" },
    { thai: "มัน", translit: "man", ru: "жирный, масляный" },
    { thai: "ไก่", translit: "gai", ru: "курица" }
  ],
  "แกงเขียวหวาน": [
    { thai: "แกง", translit: "kaeng", ru: "карри, суп-карри" },
    { thai: "เขียว", translit: "khiao", ru: "зеленый" },
    { thai: "หวาน", translit: "wan", ru: "сладкий" }
  ],
  "หมูปิ้ง": [
    { thai: "หมู", translit: "mu", ru: "свинина" },
    { thai: "ปิ้ง", translit: "ping", ru: "жарить на гриле" }
  ],
  "ชาเย็น": [
    { thai: "ชา", translit: "cha", ru: "чай" },
    { thai: "เย็น", translit: "yen", ru: "холодный" }
  ],
  "น้ำมะพร้าว": [
    { thai: "น้ำ", translit: "nam", ru: "вода, напиток" },
    { thai: "มะพร้าว", translit: "ma phrao", ru: "кокос" }
  ]
};

const spiceBreakdowns = {
  "ไม่เผ็ด": [
    { thai: "ไม่", translit: "mai", ru: "не" },
    { thai: "เผ็ด", translit: "phet", ru: "острый" }
  ],
  "เผ็ดน้อย": [
    { thai: "เผ็ด", translit: "phet", ru: "острый" },
    { thai: "น้อย", translit: "noi", ru: "немного" }
  ],
  "เผ็ดกลาง": [
    { thai: "เผ็ด", translit: "phet", ru: "острый" },
    { thai: "กลาง", translit: "klang", ru: "средний" }
  ],
  "เผ็ดมาก": [
    { thai: "เผ็ด", translit: "phet", ru: "острый" },
    { thai: "มาก", translit: "mak", ru: "очень, много" }
  ]
};

const requestBreakdowns = {
  "ใส่ถุง": [
    { thai: "ใส่", translit: "sai", ru: "положить" },
    { thai: "ถุง", translit: "thung", ru: "пакет" }
  ],
  "กินที่นี่": [
    { thai: "กิน", translit: "kin", ru: "есть" },
    { thai: "ที่นี่", translit: "thi ni", ru: "здесь" }
  ],
  "ไม่ใส่น้ำตาล": [
    { thai: "ไม่", translit: "mai", ru: "не" },
    { thai: "ใส่", translit: "sai", ru: "класть, добавлять" },
    { thai: "น้ำตาล", translit: "nam tan", ru: "сахар" }
  ],
  "ไม่ใส่ผงชูรส": [
    { thai: "ไม่", translit: "mai", ru: "не" },
    { thai: "ใส่", translit: "sai", ru: "класть, добавлять" },
    { thai: "ผงชูรส", translit: "phong chu rot", ru: "глутамат" }
  ],
  "ไม่เอาน้ำแข็ง": [
    { thai: "ไม่", translit: "mai", ru: "не" },
    { thai: "เอา", translit: "ao", ru: "брать, нужно" },
    { thai: "น้ำแข็ง", translit: "nam khaeng", ru: "лёд" }
  ],
  "หวานน้อย": [
    { thai: "หวาน", translit: "wan", ru: "сладкий" },
    { thai: "น้อย", translit: "noi", ru: "немного" }
  ],
  "ไม่ใส่ผักชี": [
    { thai: "ไม่", translit: "mai", ru: "не" },
    { thai: "ใส่", translit: "sai", ru: "добавлять" },
    { thai: "ผักชี", translit: "phak chi", ru: "кинза" }
  ],
  "ไม่ใส่ถั่วลิสง": [
    { thai: "ไม่", translit: "mai", ru: "не" },
    { thai: "ใส่", translit: "sai", ru: "добавлять" },
    { thai: "ถั่วลิสง", translit: "thua lisong", ru: "арахис" }
  ],
  "เพิ่มข้าว": [
    { thai: "เพิ่ม", translit: "phoem", ru: "добавить" },
    { thai: "ข้าว", translit: "khao", ru: "рис" }
  ],
  "แยกน้ำ": [
    { thai: "แยก", translit: "yaek", ru: "отдельно" },
    { thai: "น้ำ", translit: "nam", ru: "соус, жидкость" }
  ],
  "ใส่กล่อง": [
    { thai: "ใส่", translit: "sai", ru: "положить" },
    { thai: "กล่อง", translit: "klong", ru: "контейнер" }
  ],
  "ขอช้อนด้วย": [
    { thai: "ขอ", translit: "kho", ru: "попросить" },
    { thai: "ช้อน", translit: "chon", ru: "ложка" },
    { thai: "ด้วย", translit: "duai", ru: "тоже, пожалуйста" }
  ]
};

const marks = [
  { symbol: "ะ", name: "สระอะ", kind: "краткая гласная", position: "после согласной", sound: "короткое a", pattern: "กะ", word: "กะทิ", translit: "kathi", ru: "кокосовое молоко" },
  { symbol: "า", name: "สระอา", kind: "долгая гласная", position: "после согласной", sound: "долгое aa", pattern: "กา", word: "ปลา", translit: "pla", ru: "рыба" },
  { symbol: "ิ", name: "สระอิ", kind: "надстрочная гласная", position: "над согласной", sound: "короткое i", pattern: "กิ", word: "กิน", translit: "kin", ru: "есть, кушать" },
  { symbol: "ี", name: "สระอี", kind: "надстрочная гласная", position: "над согласной", sound: "долгое ii", pattern: "กี", word: "บะหมี่", translit: "ba mi", ru: "пшеничная лапша" },
  { symbol: "ึ", name: "สระอึ", kind: "надстрочная гласная", position: "над согласной", sound: "короткое ue", pattern: "กึ", word: "ตึก", translit: "tuek", ru: "здание" },
  { symbol: "ื", name: "สระอือ", kind: "надстрочная гласная", position: "над согласной", sound: "долгое uue", pattern: "กือ", word: "ดื่ม", translit: "duem", ru: "пить" },
  { symbol: "ุ", name: "สระอุ", kind: "подстрочная гласная", position: "под согласной", sound: "короткое u", pattern: "กุ", word: "กุ้ง", translit: "kung", ru: "креветка" },
  { symbol: "ู", name: "สระอู", kind: "подстрочная гласная", position: "под согласной", sound: "долгое uu", pattern: "กู", word: "ปู", translit: "pu", ru: "краб" },
  { symbol: "ั", name: "ไม้หันอากาศ", kind: "надстрочная гласная", position: "над согласной", sound: "короткое a перед финальной согласной", pattern: "กัน", word: "ผัด", translit: "phat", ru: "жарить, жареный" },
  { symbol: "็", name: "ไม้ไต่คู้", kind: "надстрочный знак", position: "над согласной", sound: "делает гласную краткой", pattern: "เก็", word: "เผ็ด", translit: "phet", ru: "острый" },
  { symbol: "เ", name: "สระเอ", kind: "предгласная", position: "перед согласной", sound: "ee/e", pattern: "เก", word: "เกี๊ยว", translit: "kiao", ru: "вонтон" },
  { symbol: "แ", name: "สระแอ", kind: "предгласная", position: "перед согласной", sound: "ae", pattern: "แก", word: "แกง", translit: "kaeng", ru: "карри, суп-карри" },
  { symbol: "โ", name: "สระโอ", kind: "предгласная", position: "перед согласной", sound: "oo/o", pattern: "โก", word: "โอเลี้ยง", translit: "oliang", ru: "тайский черный кофе со льдом" },
  { symbol: "ใ", name: "สระใอ", kind: "предгласная", position: "перед согласной", sound: "ai", pattern: "ใก", word: "ใส่", translit: "sai", ru: "класть, добавить" },
  { symbol: "ไ", name: "สระไอ", kind: "предгласная", position: "перед согласной", sound: "ai", pattern: "ไก", word: "ไก่", translit: "gai", ru: "курица" },
  { symbol: "ำ", name: "สระอำ", kind: "комбинированная гласная", position: "над и после согласной", sound: "am", pattern: "กำ", word: "น้ำ", translit: "nam", ru: "вода" },
  { symbol: "่", name: "ไม้เอก", kind: "тоновый знак", position: "над согласной", sound: "меняет тон", pattern: "ก่", word: "ไก่", translit: "gai", ru: "курица" },
  { symbol: "้", name: "ไม้โท", kind: "тоновый знак", position: "над согласной", sound: "меняет тон", pattern: "ก้", word: "ข้าว", translit: "khao", ru: "рис" },
  { symbol: "๊", name: "ไม้ตรี", kind: "тоновый знак", position: "над согласной", sound: "в этом примере высокий тон", pattern: "ก๊", word: "กวยจั๊บ", translit: "kuai chap", ru: "суп с рисовыми рулетами", tone: "high" },
  { symbol: "๋", name: "ไม้จัตวา", kind: "тоновый знак", position: "над согласной", sound: "в этом примере восходящий тон", pattern: "ก๋", word: "ก๋วยเตี๋ยว", translit: "kuai tiao", ru: "лапша с бульоном", tone: "rising" },
  { symbol: "์", name: "ทัณฑฆาต / การันต์", kind: "знак молчания", position: "над согласной", sound: "делает букву непроизносимой", pattern: "ก์", word: "สตาร์บัคส์", translit: "Starbucks", ru: "Starbucks" },
  { symbol: "ๆ", name: "ไม้ยมก", kind: "знак повтора", position: "после слова", sound: "повторяет слово", pattern: "ๆ", word: "เร็วๆ", translit: "reo reo", ru: "быстро-быстро" },
  { symbol: "ฯ", name: "ไปยาลน้อย", kind: "сокращение", position: "после слова", sound: "сокращает устойчивое слово", pattern: "ฯ", word: "กรุงเทพฯ", translit: "Krung Thep", ru: "Бангкок" },
  { symbol: "ฺ", name: "พินทุ", kind: "подстрочный знак", position: "под согласной", sound: "показывает чистую согласную в учебных/пали словах", pattern: "กฺ", word: "พุทฺธ", translit: "phuttha", ru: "Будда, учебная форма" },
  { symbol: "ํ", name: "นิคหิต", kind: "надстрочный знак", position: "над согласной", sound: "носовой оттенок / часть ำ", pattern: "อํ", word: "อำ", translit: "am", ru: "слог am" }
];

const toneContours = {
  mid: { name: "средний", thai: "สามัญ", points: "8,38 98,38", hint: "ровно" },
  low: { name: "низкий", thai: "เอก", points: "8,46 52,52 98,56", hint: "низко и чуть вниз" },
  falling: { name: "падающий", thai: "โท", points: "8,16 48,18 98,58", hint: "сверху вниз" },
  high: { name: "высокий", thai: "ตรี", points: "8,24 52,18 98,16", hint: "высоко" },
  rising: { name: "восходящий", thai: "จัตวา", points: "8,54 46,54 98,16", hint: "снизу вверх" }
};

marks.find((mark) => mark.symbol === "่").tone = "low";
marks.find((mark) => mark.symbol === "้").tone = "falling";

function renderToneSvg(toneKey, compact = false) {
  const tone = toneContours[toneKey];
  if (!tone) return "";
  return `
    <div class="tone-card ${compact ? "is-compact" : ""}">
      <svg class="tone-svg" viewBox="0 0 106 70" role="img" aria-label="Ход тона: ${tone.name}">
        <line x1="8" y1="16" x2="98" y2="16"></line>
        <line x1="8" y1="38" x2="98" y2="38"></line>
        <line x1="8" y1="58" x2="98" y2="58"></line>
        <polyline points="${tone.points}"></polyline>
      </svg>
      <div>
        <strong>${tone.name}</strong>
        <span>${tone.thai} · ${tone.hint}</span>
      </div>
    </div>
  `;
}

const state = {
  knownLetters: new Set(JSON.parse(localStorage.getItem("knownLetters") || "[]")),
  knownMarks: new Set(JSON.parse(localStorage.getItem("knownMarks") || "[]")),
  phraseKnown: localStorage.getItem("phraseKnown") === "true"
};

const letterGrid = document.querySelector("#letterGrid");
const markGrid = document.querySelector("#markGrid");
const toneGuideGrid = document.querySelector("#toneGuideGrid");
const foodGrid = document.querySelector("#foodGrid");
const foodSearch = document.querySelector("#foodSearch");
const foodCategory = document.querySelector("#foodCategory");
const foodLoadMore = document.querySelector("#foodLoadMore");
const menuStats = document.querySelector("#menuStats");
const progressFill = document.querySelector("#progressFill");
const progressPercent = document.querySelector("#progressPercent");
const progressText = document.querySelector("#progressText");
const orderDish = document.querySelector("#orderDish");
const spiceLevel = document.querySelector("#spiceLevel");
const orderRequest = document.querySelector("#orderRequest");
const thaiPhrase = document.querySelector("#thaiPhrase");
const phraseBreakdown = document.querySelector("#phraseBreakdown");
const phraseRu = document.querySelector("#phraseRu");
const markPhrase = document.querySelector("#markPhrase");
const speechStatus = document.querySelector("#speechStatus");
const numberValue = document.querySelector("#numberValue");
const numberArabic = document.querySelector("#numberArabic");
const numberThai = document.querySelector("#numberThai");
const numberTranslit = document.querySelector("#numberTranslit");
const numberRu = document.querySelector("#numberRu");
const numberRange = document.querySelector("#numberRange");
const numberGrid = document.querySelector("#numberGrid");
const numberLoadMore = document.querySelector("#numberLoadMore");
const numberPageSize = 40;
let visibleNumbers = numberPageSize;
const practiceItems = menuItems.filter((item) => item.category === "dish" && item.photo && item.translit);
const practiceImage = document.querySelector("#practiceImage");
const practiceThai = document.querySelector("#practiceThai");
const practiceRu = document.querySelector("#practiceRu");
const practiceForm = document.querySelector("#practiceForm");
const practiceAnswer = document.querySelector("#practiceAnswer");
const practiceResult = document.querySelector("#practiceResult");
const practiceScore = document.querySelector("#practiceScore");
const practiceExpected = document.querySelector("#practiceExpected");
const practiceAttempts = document.querySelector("#practiceAttempts");
const practiceAverage = document.querySelector("#practiceAverage");
const practiceNext = document.querySelector("#practiceNext");
let currentPracticeItem = null;
let lastPracticeIndex = -1;
let practiceTotalScore = 0;
let practiceAttemptCount = 0;

const categoryOptionLabels = {
  dish: "Блюда",
  drink: "Напитки",
  noodle: "Лапша",
  ingredient: "Ингредиенты",
  method: "Приготовление"
};
foodCategory.querySelector('option[value="all"]').textContent = `Все ${menuItems.length}`;
Object.entries(categoryOptionLabels).forEach(([category, label]) => {
  const option = foodCategory.querySelector(`option[value="${category}"]`);
  if (option) option.textContent = `${label} · ${menuCategoryCounts[category] || 0}`;
});

let thaiVoice = null;
let currentUtterance = null;
let currentAudio = null;
let lastSpeechKey = "";
let lastSpeechAt = 0;
const menuPageSize = 24;
let visibleMenuItems = menuPageSize;

function refreshThaiVoice() {
  if (!("speechSynthesis" in window)) return;
  const voices = window.speechSynthesis.getVoices();
  thaiVoice = voices.find((voice) => voice.lang.toLowerCase().startsWith("th"))
    || voices.find((voice) => voice.lang.toLowerCase().includes("th"));
}

function updateSpeechStatus() {
  if (!speechStatus) return;
  refreshThaiVoice();
  speechStatus.textContent = "Озвучка готова. Нажми на динамик рядом с тайским текстом.";
}

function speakWithBrowserVoice(text, label = "тайский текст") {
  if (!("speechSynthesis" in window)) {
    speechStatus.textContent = "Озвучка не поддерживается в этом браузере.";
    return;
  }

  refreshThaiVoice();
  window.speechSynthesis.cancel();
  speechStatus.textContent = `Готовим звук: ${label}`;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "th-TH";
  utterance.rate = 0.72;
  utterance.pitch = 1;
  if (thaiVoice) utterance.voice = thaiVoice;

  utterance.onstart = () => {
    speechStatus.textContent = `Слушаем: ${label}`;
  };
  utterance.onend = () => {
    speechStatus.textContent = thaiVoice
      ? "Готово. Можно повторить еще раз."
      : "Готово. Если произношение звучит странно, добавь тайский голос в настройках системы.";
  };
  utterance.onerror = () => {
    speechStatus.textContent = thaiVoice
      ? "Chrome не смог воспроизвести звук. Проверь громкость вкладки и устройство вывода."
      : "Chrome не нашел тайский голос. Установи Thai language voice в Windows и перезапусти Chrome.";
  };

  currentUtterance = utterance;
  window.setTimeout(() => {
    window.speechSynthesis.speak(currentUtterance);
  }, 80);
}

function audioFileName(text) {
  return text.replaceAll("/", "／");
}

function speakThai(text, label = "тайский текст") {
  const cleanText = text.trim();
  if (!cleanText) return;

  const now = Date.now();
  const speechKey = `${cleanText}|${label}`;
  if (speechKey === lastSpeechKey && now - lastSpeechAt < 900) return;
  lastSpeechKey = speechKey;
  lastSpeechAt = now;

  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }

  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }

  speechStatus.textContent = `Загружаем аудио: ${label}`;

  const url = `audio/${encodeURIComponent(audioFileName(cleanText))}.mp3`;
  const audio = new Audio(url);
  audio.preload = "auto";
  let fallbackStarted = false;
  currentAudio = audio;

  const startFallback = () => {
    if (fallbackStarted || currentAudio !== audio) return;
    fallbackStarted = true;
    currentAudio = null;
    speechStatus.textContent = "Аудиофайл не найден, пробую голос Chrome.";
    speakWithBrowserVoice(cleanText, label);
  };

  audio.onplaying = () => {
    speechStatus.textContent = `Слушаем: ${label}`;
  };
  audio.onended = () => {
    speechStatus.textContent = "Готово. Можно повторить еще раз.";
  };
  audio.onerror = startFallback;

  const playPromise = audio.play();
  if (playPromise) {
    playPromise.catch(startFallback);
  }
}

if ("speechSynthesis" in window) {
  refreshThaiVoice();
  if (typeof window.speechSynthesis.addEventListener === "function") {
    window.speechSynthesis.addEventListener("voiceschanged", updateSpeechStatus);
  } else {
    window.speechSynthesis.onvoiceschanged = updateSpeechStatus;
  }
}

function renderLetters() {
  letterGrid.innerHTML = letters.map((letter, index) => {
    const known = state.knownLetters.has(letter.glyph);
    const examples = letterDishExamples[letter.glyph] || [{ thai: letter.word, ru: letter.ru, icon: "🍽️" }];
    const transliterations = exampleTransliterations[letter.glyph] || [letter.translit];
    return `
      <article class="letter-card">
        <div>
          <div class="letter-glyph" aria-hidden="true">${letter.glyph}</div>
          <div class="letter-forms" aria-label="Варианты написания буквы ${letter.glyph}">
            <span class="letter-form is-print" title="Печатное начертание">${letter.glyph}</span>
            <span class="letter-form is-loopless" title="Современное начертание без петель">${letter.glyph}</span>
            <span class="letter-form is-handwritten" title="Рукописное начертание">${letter.glyph}</span>
          </div>
        </div>
        <div>
          <p class="meta">${letter.sound}</p>
          <div class="dish-examples" aria-label="Примеры для буквы ${letter.glyph}">
            ${examples.map((example, exampleIndex) => `
              <button class="dish-example" data-speak="${example.thai}" data-label="${example.thai}" type="button" aria-label="Произнести ${example.thai}">
                <span class="dish-icon" aria-hidden="true">${example.icon}</span>
                <span>
                  <strong>${example.thai}</strong>
                  <em>${transliterations[exampleIndex]}</em>
                  <small>${example.ru}</small>
                </span>
              </button>
            `).join("")}
          </div>
          <button class="card-action ${known ? "is-known" : ""}" data-letter="${letter.glyph}" type="button">
            ${known ? "Уже знаю" : `Запомнить ${index + 1}`}
          </button>
        </div>
      </article>
    `;
  }).join("");
}

function getFilteredMenuItems() {
  const query = foodSearch.value.trim().toLowerCase();
  const category = foodCategory.value;

  return menuItems.filter((food) => {
    if (category !== "all") {
      const inCategory = food.category === category || food.categories?.includes(category);
      if (!inCategory) return false;
    }
    if (!query) return true;
    const text = `${food.thai} ${food.translit} ${food.ru} ${(food.tags || []).join(" ")}`.toLowerCase();
    return text.includes(query);
  });
}

const numberDigits = [
  null,
  { thai: "หนึ่ง", translit: "nueng" },
  { thai: "สอง", translit: "song" },
  { thai: "สาม", translit: "sam" },
  { thai: "สี่", translit: "si" },
  { thai: "ห้า", translit: "ha" },
  { thai: "หก", translit: "hok" },
  { thai: "เจ็ด", translit: "chet" },
  { thai: "แปด", translit: "paet" },
  { thai: "เก้า", translit: "kao" }
];

function thaiNumber(value) {
  const number = Math.max(1, Math.min(1000, Number(value) || 1));
  if (number === 1000) return { value: number, thai: "หนึ่งพัน", translit: "nueng phan" };
  const thai = [];
  const translit = [];
  const hundreds = Math.floor(number / 100);
  const tens = Math.floor((number % 100) / 10);
  const ones = number % 10;
  if (hundreds) {
    thai.push(numberDigits[hundreds].thai, "ร้อย");
    translit.push(numberDigits[hundreds].translit, "roi");
  }
  if (tens === 1) {
    thai.push("สิบ");
    translit.push("sip");
  } else if (tens === 2) {
    thai.push("ยี่สิบ");
    translit.push("yi", "sip");
  } else if (tens > 2) {
    thai.push(numberDigits[tens].thai, "สิบ");
    translit.push(numberDigits[tens].translit, "sip");
  }
  if (ones) {
    const useEt = ones === 1 && number > 10;
    thai.push(useEt ? "เอ็ด" : numberDigits[ones].thai);
    translit.push(useEt ? "et" : numberDigits[ones].translit);
  }
  return { value: number, thai: thai.join(""), translit: translit.join(" ") };
}

function updateNumberDisplay(value = numberValue.value) {
  const number = thaiNumber(value);
  numberValue.value = number.value;
  numberArabic.textContent = number.value;
  numberThai.textContent = `${number.thai} บาท`;
  numberTranslit.textContent = `${number.translit} bat`;
  numberRu.textContent = `${number.value} бат`;
}

function selectedNumberRange() {
  return numberRange.value.split("-").map(Number);
}

function renderNumbers() {
  const [start, end] = selectedNumberRange();
  const values = Array.from({ length: end - start + 1 }, (_, index) => start + index);
  const shown = values.slice(0, visibleNumbers);
  numberGrid.innerHTML = shown.map((value) => {
    const number = thaiNumber(value);
    return `
      <button class="number-card" data-number="${value}" type="button">
        <strong>${value}</strong>
        <span>${number.thai}</span>
        <small>${number.translit}</small>
      </button>
    `;
  }).join("");
  numberLoadMore.hidden = shown.length >= values.length;
}

function getMenuWordBlocks(food) {
  const words = food.words || [];
  const syllables = food.translit.trim().split(/\s+/).filter(Boolean);
  if (!words.length || !syllables.length) return [];
  if (words.length === 1) return [{ ...words[0], translit: syllables.join(" ") }];

  if (syllables.length >= words.length) {
    let syllableIndex = 0;
    return words.map((word, wordIndex) => {
      const wordsLeft = words.length - wordIndex;
      const syllablesLeft = syllables.length - syllableIndex;
      const thaiLeft = words.slice(wordIndex).reduce((sum, item) => sum + item.thai.length, 0);
      const proportional = Math.round(syllablesLeft * word.thai.length / thaiLeft);
      const take = wordIndex === words.length - 1
        ? syllablesLeft
        : Math.max(1, Math.min(syllablesLeft - wordsLeft + 1, proportional));
      const translit = syllables.slice(syllableIndex, syllableIndex + take).join(" ");
      syllableIndex += take;
      return { ...word, translit };
    });
  }

  let wordIndex = 0;
  return syllables.map((translit, syllableIndex) => {
    const syllablesLeft = syllables.length - syllableIndex;
    const wordsLeft = words.length - wordIndex;
    const take = syllableIndex === syllables.length - 1
      ? wordsLeft
      : Math.max(1, Math.floor(wordsLeft / syllablesLeft));
    const group = words.slice(wordIndex, wordIndex + take);
    wordIndex += take;
    return {
      thai: group.map((word) => word.thai).join(""),
      translit,
      ru: group.map((word) => word.ru).join(" + ")
    };
  });
}

function normalizedTranscription(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "");
}

function transcriptionScore(answer, expected) {
  const left = normalizedTranscription(answer);
  const right = normalizedTranscription(expected);
  if (!right) return 0;
  const previous = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let leftIndex = 1; leftIndex <= left.length; leftIndex += 1) {
    const current = [leftIndex];
    for (let rightIndex = 1; rightIndex <= right.length; rightIndex += 1) {
      const substitution = previous[rightIndex - 1] + (left[leftIndex - 1] === right[rightIndex - 1] ? 0 : 1);
      current[rightIndex] = Math.min(previous[rightIndex] + 1, current[rightIndex - 1] + 1, substitution);
    }
    previous.splice(0, previous.length, ...current);
  }
  const distance = previous[right.length];
  return Math.max(0, Math.round((1 - distance / Math.max(left.length, right.length)) * 100));
}

function preloadPracticeImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(src);
    image.onerror = reject;
    image.src = src;
  });
}

async function renderPracticeItem() {
  if (!practiceItems.length) return;
  practiceNext.disabled = true;
  practiceAnswer.disabled = true;
  practiceImage.closest(".practice-photo").classList.add("is-loading");
  practiceImage.removeAttribute("src");
  practiceImage.alt = "";

  const startIndex = Math.floor(Math.random() * practiceItems.length);
  let loadedItem = null;
  let loadedPhoto = null;
  let loadedIndex = -1;
  for (let offset = 0; offset < practiceItems.length; offset += 1) {
    const candidateIndex = (startIndex + offset) % practiceItems.length;
    if (practiceItems.length > 1 && candidateIndex === lastPracticeIndex) continue;
    const candidate = practiceItems[candidateIndex];
    const photo = getMenuPhoto(candidate);
    try {
      await preloadPracticeImage(photo.url);
      loadedItem = candidate;
      loadedPhoto = photo;
      loadedIndex = candidateIndex;
      break;
    } catch {}
  }

  practiceImage.closest(".practice-photo").classList.remove("is-loading");
  if (!loadedItem) {
    currentPracticeItem = null;
    practiceThai.textContent = "Фото недоступно";
    practiceRu.textContent = "Обновите страницу, чтобы попробовать загрузить задания снова.";
    practiceNext.disabled = false;
    return;
  }

  lastPracticeIndex = loadedIndex;
  currentPracticeItem = loadedItem;
  practiceImage.src = loadedPhoto.url;
  practiceImage.alt = currentPracticeItem.ru;
  practiceThai.textContent = currentPracticeItem.thai;
  practiceRu.textContent = currentPracticeItem.ru;
  practiceAnswer.value = "";
  practiceAnswer.disabled = false;
  practiceForm.querySelector("button").disabled = false;
  practiceNext.disabled = false;
  practiceResult.hidden = true;
}

function checkPracticeAnswer() {
  if (!currentPracticeItem || !practiceAnswer.value.trim()) {
    practiceAnswer.focus();
    return;
  }
  const score = transcriptionScore(practiceAnswer.value, currentPracticeItem.translit);
  practiceAttemptCount += 1;
  practiceTotalScore += score;
  practiceScore.textContent = `${score}% правильных букв`;
  practiceScore.dataset.level = score === 100 ? "perfect" : score >= 70 ? "close" : "retry";
  practiceExpected.textContent = currentPracticeItem.translit;
  practiceAttempts.textContent = practiceAttemptCount;
  practiceAverage.textContent = `${Math.round(practiceTotalScore / practiceAttemptCount)}%`;
  practiceResult.hidden = false;
  practiceAnswer.disabled = true;
  practiceForm.querySelector("button").disabled = true;
  practiceNext.focus();
}

function renderFoods() {
  const items = getFilteredMenuItems();
  const shownItems = items.slice(0, visibleMenuItems);
  foodGrid.innerHTML = shownItems.map((food) => {
    const photo = getMenuPhoto(food);
    return `
    <article class="food-card ${photo ? "has-photo" : ""}">
      ${photo ? `
        <figure class="food-photo">
          <a href="${escapeMarkup(photo.page)}" target="_blank" rel="noopener noreferrer" title="Источник фотографии: ${escapeMarkup(photo.title)}">
            <img src="${escapeMarkup(photo.url)}" alt="${escapeMarkup(food.ru)}" loading="lazy" decoding="async" width="720" height="420">
          </a>
        </figure>
      ` : ""}
      <div class="speak-line">
        <p class="thai-name">${food.thai}</p>
        <button class="speak-button" data-speak="${food.thai}" data-label="${food.thai}" type="button" aria-label="Произнести ${food.thai}">🔊</button>
      </div>
      ${["ingredient", "method", "noodle"].includes(food.category) ? `<p class="menu-item-translit">${escapeMarkup(food.translit)}</p>` : ""}
      <h4>${food.ru}</h4>
      ${food.words?.length ? `
        <div class="food-breakdown" aria-label="Перевод слов в названии">
          ${getMenuWordBlocks(food).map((word) => `
            <span class="food-word">
              <strong>${escapeMarkup(word.thai)}</strong>
              <em>${escapeMarkup(word.translit)}</em>
              <small>${escapeMarkup(word.ru)}</small>
            </span>
          `).join("")}
        </div>
      ` : ""}
    </article>
  `;
  }).join("");

  foodGrid.querySelectorAll(".food-photo img").forEach((image) => {
    image.addEventListener("error", () => image.closest(".food-photo")?.classList.add("is-broken"), { once: true });
  });

  const categoryText = foodCategory.value === "all"
    ? "во всех категориях"
    : `в категории «${menuCategoryLabels[foodCategory.value]}»`;
  menuStats.textContent = items.length === menuItems.length
    ? `${menuItems.length} позиций: ${menuCategoryCounts.dish || 0} блюд, ${menuCategoryCounts.drink || 0} напитков, ${menuCategoryCounts.ingredient || 0} ингредиентов и ${menuCategoryCounts.method || 0} способов приготовления. В разделе «Лапша» — ${menuCategoryCounts.noodle || 0} позиций.`
    : `Найдено ${items.length} ${categoryText}. Показано ${shownItems.length}.`;
  foodLoadMore.hidden = shownItems.length >= items.length;
}

function renderMarks() {
  markGrid.innerHTML = marks.map((mark, index) => {
    const known = state.knownMarks.has(mark.symbol);
    const toneMarkup = mark.tone ? renderToneSvg(mark.tone, true) : "";
    return `
      <article class="mark-card">
        <div class="mark-topline">
          <div class="mark-symbol" aria-hidden="true">${mark.pattern}</div>
          <span class="mark-kind">${mark.kind}</span>
        </div>
        <div>
          <h4>${mark.symbol} · ${mark.name}</h4>
          <p class="meta">${mark.position} · ${mark.sound}</p>
          <div class="speak-line">
            <p class="sample">${mark.word}</p>
            <button class="speak-button" data-speak="${mark.word}" data-label="${mark.word}" type="button" aria-label="Произнести ${mark.word}">🔊</button>
          </div>
          <p class="meta">${mark.translit} · ${mark.ru}</p>
          ${toneMarkup}
          <button class="card-action ${known ? "is-known" : ""}" data-mark="${mark.symbol}" type="button">
            ${known ? "Уже знаю" : `Запомнить ${index + 1}`}
          </button>
        </div>
      </article>
    `;
  }).join("");
}

function renderToneGuide() {
  toneGuideGrid.innerHTML = ["mid", "low", "falling", "high", "rising"]
    .map((tone) => renderToneSvg(tone))
    .join("");
}

function renderOrderOptions() {
  orderDish.innerHTML = foods.map((food) => (
    `<option value="${food.thai}" data-translit="${food.translit}" data-ru="${food.ru}">${food.thai} · ${food.ru}</option>`
  )).join("");
}

function updatePhrase() {
  const selected = orderDish.selectedOptions[0];
  const dish = selected.value;
  const spice = spiceLevel.value;
  const request = orderRequest.value;
  const parts = [
    { thai: "ขอ", translit: "kho", ru: "попросить, пожалуйста" },
    ...(phraseBreakdowns[dish] || [{ thai: dish, translit: selected.dataset.translit, ru: selected.dataset.ru }]),
    ...(spiceBreakdowns[spice] || [{ thai: spice, translit: spiceLevel.selectedOptions[0].textContent, ru: spiceLevel.selectedOptions[0].textContent }]),
    ...(requestBreakdowns[request] || [{ thai: request, translit: orderRequest.selectedOptions[0].textContent, ru: orderRequest.selectedOptions[0].textContent }])
  ];
  thaiPhrase.textContent = `ขอ ${dish} ${spice} ${request}`;
  phraseBreakdown.innerHTML = parts.map((part) => `
    <div class="phrase-token">
      <strong>${part.thai}</strong>
      <span>${part.translit}</span>
      <small>${part.ru}</small>
    </div>
  `).join("");
  phraseRu.textContent = `Пожалуйста: ${selected.dataset.ru}, ${spiceLevel.selectedOptions[0].textContent}, ${orderRequest.selectedOptions[0].textContent}.`;
  markPhrase.classList.toggle("is-known", state.phraseKnown);
  markPhrase.textContent = state.phraseKnown ? "Фраза в копилке" : "Я могу это прочитать";
}

function updateProgress() {
  const letterScore = state.knownLetters.size;
  const markScore = state.knownMarks.size;
  const phraseScore = state.phraseKnown ? 1 : 0;
  const total = letters.length + marks.length + 1;
  const percent = Math.round(((letterScore + markScore + phraseScore) / total) * 100);
  progressFill.style.width = `${percent}%`;
  progressPercent.textContent = `${percent}%`;
  progressText.textContent = letterScore || markScore
    ? `В копилке ${letterScore} из ${letters.length} букв и ${markScore} из ${marks.length} знаков.`
    : "Начни с первой согласной: ก помогает читать слова про курицу, рис и лапшу.";
}

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((item) => item.classList.remove("is-active"));
    document.querySelectorAll(".view").forEach((view) => view.classList.remove("is-active"));
    tab.classList.add("is-active");
    document.querySelector(`#${tab.dataset.view}`).classList.add("is-active");
  });
});

letterGrid.addEventListener("click", (event) => {
  const speakButton = event.target.closest("[data-speak]");
  if (speakButton) {
    speakThai(speakButton.dataset.speak, speakButton.dataset.label);
    return;
  }

  const button = event.target.closest("[data-letter]");
  if (!button) return;
  const glyph = button.dataset.letter;
  if (state.knownLetters.has(glyph)) {
    state.knownLetters.delete(glyph);
  } else {
    state.knownLetters.add(glyph);
  }
  localStorage.setItem("knownLetters", JSON.stringify([...state.knownLetters]));
  renderLetters();
  updateProgress();
});

markGrid.addEventListener("click", (event) => {
  const speakButton = event.target.closest("[data-speak]");
  if (speakButton) {
    speakThai(speakButton.dataset.speak, speakButton.dataset.label);
    return;
  }

  const button = event.target.closest("[data-mark]");
  if (!button) return;
  const symbol = button.dataset.mark;
  if (state.knownMarks.has(symbol)) {
    state.knownMarks.delete(symbol);
  } else {
    state.knownMarks.add(symbol);
  }
  localStorage.setItem("knownMarks", JSON.stringify([...state.knownMarks]));
  renderMarks();
  updateProgress();
});

foodGrid.addEventListener("click", (event) => {
  const speakButton = event.target.closest("[data-speak]");
  if (!speakButton) return;
  speakThai(speakButton.dataset.speak, speakButton.dataset.label);
});

document.querySelector("#resetProgress").addEventListener("click", () => {
  state.knownLetters.clear();
  state.knownMarks.clear();
  state.phraseKnown = false;
  localStorage.removeItem("knownLetters");
  localStorage.removeItem("knownMarks");
  localStorage.removeItem("phraseKnown");
  renderLetters();
  renderMarks();
  updatePhrase();
  updateProgress();
});

foodSearch.addEventListener("input", () => {
  visibleMenuItems = menuPageSize;
  renderFoods();
});

foodCategory.addEventListener("change", () => {
  visibleMenuItems = menuPageSize;
  renderFoods();
});

foodLoadMore.addEventListener("click", () => {
  visibleMenuItems += menuPageSize;
  renderFoods();
});

numberValue.addEventListener("input", () => updateNumberDisplay());

document.querySelector("#randomNumber").addEventListener("click", () => {
  updateNumberDisplay(Math.floor(Math.random() * 1000) + 1);
});

document.querySelector("#numberSpeak").addEventListener("click", () => {
  speakThai(numberThai.textContent, `цена ${numberArabic.textContent} бат`);
});

numberRange.addEventListener("change", () => {
  visibleNumbers = numberPageSize;
  renderNumbers();
});

numberGrid.addEventListener("click", (event) => {
  const card = event.target.closest("[data-number]");
  if (!card) return;
  updateNumberDisplay(card.dataset.number);
});

numberLoadMore.addEventListener("click", () => {
  visibleNumbers += numberPageSize;
  renderNumbers();
});

practiceForm.addEventListener("submit", (event) => {
  event.preventDefault();
  checkPracticeAnswer();
});

practiceNext.addEventListener("click", async () => {
  await renderPracticeItem();
  practiceAnswer.focus();
});

[orderDish, spiceLevel, orderRequest].forEach((control) => {
  control.addEventListener("change", updatePhrase);
});

markPhrase.addEventListener("click", () => {
  state.phraseKnown = !state.phraseKnown;
  localStorage.setItem("phraseKnown", String(state.phraseKnown));
  updatePhrase();
  updateProgress();
});

document.querySelector("#speakPhrase").addEventListener("click", () => {
  speakThai(thaiPhrase.textContent, "фраза заказа");
});

renderLetters();
renderToneGuide();
renderMarks();
renderFoods();
updateNumberDisplay();
renderNumbers();
renderPracticeItem();
renderOrderOptions();
updatePhrase();
updateProgress();
updateSpeechStatus();
