export type Ingredient = {
  id: string;
  name: string;
  hindiName?: string;
  description: string;
  icon: string; // lucide icon key, mapped in component
};

export const ingredients: Ingredient[] = [
  {
    id: 'chandan',
    name: 'Chandan',
    hindiName: 'चंदन',
    description:
      'Sacred sandalwood essence, revered in temples for millennia. Imparts a calm, grounding fragrance that deepens the atmosphere of devotion.',
    icon: 'sparkles',
  },
  {
    id: 'kapur',
    name: 'Kapur Extract',
    hindiName: 'कपूर',
    description:
      'A whisper of camphor, traditionally offered during aarti. Purifies surfaces and lifts residual soot with a clean, devotional freshness.',
    icon: 'wind',
  },
  {
    id: 'guggal',
    name: 'Guggal Resin',
    hindiName: 'गुग्गल',
    description:
      'A holy resin used in homam and dhoop. Its warm, resinous character helps dissolve dhoop and diya soot from sacred surfaces.',
    icon: 'flame',
  },
  {
    id: 'lotus',
    name: 'Lotus Distillate',
    hindiName: 'कमल',
    description:
      'A gentle floral water drawn from the lotus — symbol of purity rising unsullied from mud. Conditions marble and granite without harshness.',
    icon: 'flower',
  },
  {
    id: 'tulsipatra',
    name: 'Tulsi Extract',
    hindiName: 'तुलसी',
    description:
      'Sacred basil, the queen of devotional herbs. Naturally antimicrobial, it keeps pooja surfaces clean without chemical interference.',
    icon: 'leaf',
  },
  {
    id: 'plant-surfactant',
    name: 'Plant Surfactants',
    hindiName: 'वनस्पति',
    description:
      'Mild, biodegradable cleansing agents derived from plants. Lifts soot and oil gently — safe for the hands that clean the mandir.',
    icon: 'droplet',
  },
];
