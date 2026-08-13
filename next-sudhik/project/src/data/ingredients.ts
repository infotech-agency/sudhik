export type Ingredient = {
  id: string;
  name: string;
  hindiName?: string;
  description: string;
  icon: string; // lucide icon key, mapped in component
};

// export const ingredients: Ingredient[] = [
//   {
//     id: 'chandan',
//     name: 'Chandan',
//     hindiName: 'चंदन',
//     description:
//       'Sacred sandalwood essence, revered in temples for millennia. Imparts a calm, grounding fragrance that deepens the atmosphere of devotion.',
//     icon: 'sparkles',
//   },
//   {
//     id: 'kapur',
//     name: 'Kapur Extract',
//     hindiName: 'कपूर',
//     description:
//       'A whisper of camphor, traditionally offered during aarti. Purifies surfaces and lifts residual soot with a clean, devotional freshness.',
//     icon: 'wind',
//   },
//   {
//     id: 'guggal',
//     name: 'Guggal Resin',
//     hindiName: 'गुग्गल',
//     description:
//       'A holy resin used in homam and dhoop. Its warm, resinous character helps dissolve dhoop and diya soot from sacred surfaces.',
//     icon: 'flame',
//   },
//   {
//     id: 'lotus',
//     name: 'Lotus Distillate',
//     hindiName: 'कमल',
//     description:
//       'A gentle floral water drawn from the lotus — symbol of purity rising unsullied from mud. Conditions marble and granite without harshness.',
//     icon: 'flower',
//   },
//   {
//     id: 'tulsipatra',
//     name: 'Tulsi Extract',
//     hindiName: 'तुलसी',
//     description:
//       'Sacred basil, the queen of devotional herbs. Naturally antimicrobial, it keeps pooja surfaces clean without chemical interference.',
//     icon: 'leaf',
//   },
//   {
//     id: 'plant-surfactant',
//     name: 'Plant Surfactants',
//     hindiName: 'वनस्पति',
//     description:
//       'Mild, biodegradable cleansing agents derived from plants. Lifts soot and oil gently — safe for the hands that clean the mandir.',
//     icon: 'droplet',
//   },
// ];

export const ingredients: Ingredient[] = [
  {
    id: 'purified-water',
    name: 'Purified Water',
    hindiName: 'शुद्ध जल',
    description:
      'The clear, mineral-free base that carries every sacred extract — clean water, offered first, as every seva begins.',
    icon: 'droplet',
  },
  {
    id: 'gangajal',
    name: 'Gangajal',
    hindiName: 'गंगाजल',
    description:
      'A few sacred drops drawn purely for purification — the holiest water in Sanatan tradition, carried into every bottle.',
    icon: 'sparkles',
  },
  {
    id: 'citric-acid',
    name: 'Citric Acid',
    hindiName: 'साइट्रिक अम्ल',
    description:
      'A gentle, naturally derived acid that lifts mineral deposits and water spots without harming marble or metal.',
    icon: 'leaf',
  },
  {
    id: 'non-ionic-surfactant',
    name: 'Non-Ionic Surfactant',
    hindiName: 'सौम्य क्लींजर',
    description:
      'A mild, plant-friendly cleansing agent that lifts soot and oil gently — safe for the hands that clean the mandir.',
    icon: 'wind',
  },
  {
    id: 'chelating-agent',
    name: 'Chelating Agent (EDTA)',
    hindiName: 'जल शुद्धिकारक',
    description:
      'Binds hard-water minerals so every wipe rinses away clean, leaving idols and marble free of streaks.',
    icon: 'shield',
  },
  {
    id: 'fragrance-complex',
    name: 'Natural Fragrance Complex',
    hindiName: 'चंदन',
    description:
      'A warm, sandalwood-led fragrance that lingers softly, deepening the atmosphere of devotion long after cleaning.',
    icon: 'flame',
  },
  {
    id: 'preservative',
    name: 'Preservative (Euxyl PE 9010)',
    hindiName: 'परिरक्षक',
    description:
      'Keeps the blend stable and safe over time, protecting its purity from bottle to sanctum.',
    icon: 'lock',
  },
  {
    id: 'ph-balancer',
    name: 'pH Balancer',
    hindiName: 'पीएच संतुलक',
    description:
      'Holds the blend gentle and neutral, so it stays kind to stone, metal and skin with every use.',
    icon: 'flower',
  },
];