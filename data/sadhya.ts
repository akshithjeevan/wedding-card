export interface SadhyaDish {
  id: string;
  name: string;
  malayalam: string;
  category: "crunchy" | "curry" | "main" | "sweet";
  courseTitle: string;
  tagline: string;
  description: string;
  taste: string;
  color: string;
  icon: string;
  // Percentage coordinates on the traditional banana leaf (0-100%)
  leafPosition: {
    top: number; // Y position in %
    left: number; // X position in %
  };
}

export const sadhyaDishes: SadhyaDish[] = [
  // Upper Rim - Crunchy, Pickles & Relishes (Left to Right)
  {
    id: "chips",
    name: "Banana Chips (Upperi)",
    malayalam: "നേന്ത്രക്കായ ഉപ്പേരി",
    category: "crunchy",
    courseTitle: "Crunchy Bites & Pickles",
    tagline: "Golden Kerala Nendran Crispies",
    description:
      "Thin-sliced raw Nendran bananas fried to fragrant gold in virgin coconut oil with a pinch of sea salt.",
    taste: "Crisp, Salty & Fragrant",
    color: "#E5C67C",
    icon: "🍌",
    leafPosition: { top: 22, left: 14 },
  },
  {
    id: "sharkara-varatti",
    name: "Sharkara Varatti",
    malayalam: "ശർക്കര വരട്ടി",
    category: "crunchy",
    courseTitle: "Crunchy Bites & Pickles",
    tagline: "Spiced Jaggery Glazed Plantain",
    description:
      "Thick-cut plantain chunks coated in roasted dried ginger (Chukku), powdered cumin, and crystallized dark jaggery syrup.",
    taste: "Sweet, Crunchy & Gingery",
    color: "#8B4513",
    icon: "🍯",
    leafPosition: { top: 18, left: 24 },
  },
  {
    id: "inji-puli",
    name: "Inji Puli (Pulinji)",
    malayalam: "ഇഞ്ചിപ്പുളി",
    category: "crunchy",
    courseTitle: "Crunchy Bites & Pickles",
    tagline: "The Royal 100-Curry Digestive",
    description:
      "Ancient digestive relish slow-cooked with roasted dark ginger, aged tamarind, green chilies, and melted jaggery.",
    taste: "Piquant, Sweet, Sour & Fiery",
    color: "#5C2C16",
    icon: "🫚",
    leafPosition: { top: 16, left: 34 },
  },

  // Upper Mid - Traditional Curries & Stir-Fries (Left to Right)
  {
    id: "thoran",
    name: "Seasonal Thoran",
    malayalam: "പച്ചക്കറി തോരൻ",
    category: "curry",
    courseTitle: "Traditional Feast Curries",
    tagline: "Tempered Coconut Stir-Fry",
    description:
      "Finely diced garden vegetables lightly sauteed with fresh grated coconut, shallots, curry leaves, and crackling mustard seeds.",
    taste: "Fresh, Savory & Crunchy",
    color: "#2E7D32",
    icon: "🥬",
    leafPosition: { top: 15, left: 45 },
  },
  {
    id: "olan",
    name: "Delicate Olan",
    malayalam: "ഓലൻ",
    category: "curry",
    courseTitle: "Traditional Feast Curries",
    tagline: "Ash Gourd in Fresh Coconut Milk",
    description:
      "Tender white pumpkin and red cowpeas simmered gently in light coconut milk, finished with fresh green chilies and raw coconut oil.",
    taste: "Subtle, Soothing & Fragrant",
    color: "#F5F5DC",
    icon: "🥥",
    leafPosition: { top: 16, left: 56 },
  },
  {
    id: "avial",
    name: "Classic Avial",
    malayalam: "നാടൻ അവിയൽ",
    category: "curry",
    courseTitle: "Traditional Feast Curries",
    tagline: "Melody of Indigenous Vegetables",
    description:
      "Yam, plantain, drumstick, and carrots cooked in a coarse blend of fresh coconut, cumin seeds, sour curd, and virgin coconut oil.",
    taste: "Rich, Earthy & Mildly Tangy",
    color: "#D4A373",
    icon: "🥕",
    leafPosition: { top: 18, left: 67 },
  },
  {
    id: "kaalan",
    name: "Rich Kurukku Kaalan",
    malayalam: "കുറുക്കു കാളൻ",
    category: "curry",
    courseTitle: "Traditional Feast Curries",
    tagline: "Velvety Sour Yogurt & Yam",
    description:
      "Thick, luscious reduction of cultured yogurt, elephant yam, raw plantains, crushed black pepper, and fenugreek.",
    taste: "Velvety, Tangy & Peppery",
    color: "#E9C46A",
    icon: "🍲",
    leafPosition: { top: 22, left: 78 },
  },

  // Lower Half - Rice, Parippu, Ghee, Sambar & Pappadam
  {
    id: "parippu-ghee",
    name: "Nadan Parippu & Ghee",
    malayalam: "നെയ്യും പരിപ്പും",
    category: "main",
    courseTitle: "The Rice & Main Courses",
    tagline: "The Golden First Course",
    description:
      "Creamy yellow lentils slow-cooked with coconut and tempered with golden melted country ghee, poured over piping hot rice.",
    taste: "Nutty, Comforting & Buttery",
    color: "#F4A261",
    icon: "🧈",
    leafPosition: { top: 58, left: 24 },
  },
  {
    id: "sambar",
    name: "Varutharacha Sambar",
    malayalam: "വറുത്തരച്ച സാമ്പാർ",
    category: "main",
    courseTitle: "The Rice & Main Courses",
    tagline: "The Aromatic Feast Crown",
    description:
      "Drumsticks, ash gourd, and shallots simmered in a roasted coconut-spice paste, tamarind, and aromatic curry leaf tempering.",
    taste: "Robust, Tangy & Fragrant",
    color: "#E76F51",
    icon: "🥘",
    leafPosition: { top: 56, left: 52 },
  },
  {
    id: "pappadam",
    name: "Guruvayur Pappadam",
    malayalam: "പപ്പടം",
    category: "crunchy",
    courseTitle: "The Rice & Main Courses",
    tagline: "Crushed with Ghee & Payasam",
    description:
      "Puffed golden lentil crisps, hand-crushed into rice and parippu for the first course, and later mixed into sweet payasams.",
    taste: "Airy, Crisp & Savory",
    color: "#FFE8D6",
    icon: "🫓",
    leafPosition: { top: 68, left: 14 },
  },

  // Sweet Finale - Payasams (Bottom Right Corner)
  {
    id: "paal-payasam",
    name: "Palada / Paal Payasam",
    malayalam: "പാലട / പാൽപായസം",
    category: "sweet",
    courseTitle: "The Grand Payasam Finale",
    tagline: "Temple-Style Blush Pink Nectar",
    description:
      "Slow-condensed milk, special rice flakes, and sugar reduced patiently over hours to an irresistible golden-pink sweetness.",
    taste: "Creamy, Milky & Pure Ambrosia",
    color: "#F8EDEB",
    icon: "🥣",
    leafPosition: { top: 60, left: 74 },
  },
  {
    id: "ada-pradhaman",
    name: "Ada Pradhaman",
    malayalam: "അട പ്രഥമൻ",
    category: "sweet",
    courseTitle: "The Grand Payasam Finale",
    tagline: "The King of Kerala Payasams",
    description:
      "Steamed rice ribbons stewed in dark coconut jaggery syrup, thick coconut milk, cardamom, roasted coconut chips, and cashews.",
    taste: "Decadent, Caramelized & Heavenly",
    color: "#6F4E37",
    icon: "✨",
    leafPosition: { top: 66, left: 86 },
  },
];
