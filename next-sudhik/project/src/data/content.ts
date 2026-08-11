export type Feature = {
  id: string;
  title: string;
  description: string;
  icon: string; // lucide icon key
};

export const whyFeatures: Feature[] = [
  {
    id: 'soot',
    title: 'Removes Dhoop & Diya Soot',
    description:
      'Formulated to gently lift stubborn soot, oil residue and dhoop marks from sacred surfaces — without scrubbing.',
    icon: 'flame',
  },
  {
    id: 'natural',
    title: 'Natural & Non-Toxic',
    description:
      'No bleach. No ammonia. No harsh solvents. Only devotional botanicals, crafted with ahimsa.',
    icon: 'leaf',
  },
  {
    id: 'chandan',
    title: 'Chandan Fragrance',
    description:
      'A pure, calming sandalwood aroma that lingers gently and deepens the atmosphere of every prayer.',
    icon: 'sparkles',
  },
  {
    id: 'biodegradable',
    title: 'Biodegradable',
    description:
      'Returns to the earth without harm. Every rinse honours the soil that gave us these botanicals.',
    icon: 'droplet',
  },
  {
    id: 'marble',
    title: 'Safe for Marble & Granite',
    description:
      'Mild, pH-balanced and tested on the very stones that build our temples. Gentle on the sacred, tough on soot.',
    icon: 'gem',
  },
  {
    id: 'india',
    title: 'Made in India',
    description:
      'Crafted by hands that understand seva. Proudly made in Bharat, for every temple and every home mandir.',
    icon: 'flag',
  },
];

export const sacredUses = [
  {
    id: 'mandir',
    title: 'Home Mandir',
    hindi: 'गृह मंदिर',
    description: 'The quiet corner of every home where the day begins and ends with prayer.',
    icon: 'home',
  },
  {
    id: 'temple',
    title: 'Temple',
    hindi: 'मंदिर',
    description: 'Grand stone sanctums where thousands gather — and where purity must endure.',
    icon: 'landmark',
  },
  {
    id: 'ashram',
    title: 'Ashram',
    hindi: 'आश्रम',
    description: 'Spaces of learning, meditation and seva, kept sacred by daily devotion.',
    icon: 'tree',
  },
  {
    id: 'dharmshala',
    title: 'Dharmshala',
    hindi: 'धर्मशाला',
    description: 'Shelters for pilgrims — where cleanliness is the first form of hospitality.',
    icon: 'building',
  },
  {
    id: 'pooja',
    title: 'Pooja Room',
    hindi: 'पूजा कक्ष',
    description: 'The intimate space where the family offers its daily shraddha.',
    icon: 'heart',
  },
  {
    id: 'sacred',
    title: 'Sacred Spaces',
    hindi: 'पावन स्थल',
    description: 'Any surface held sacred — meditation rooms, yagna shalas, homam grounds.',
    icon: 'sun',
  },
];

export const howToSteps = [
  {
    step: 1,
    title: 'Shake Gently',
    description: 'Hold the bottle with reverence and shake gently to awaken the botanicals.',
    icon: 'shuffle',
  },
  {
    step: 2,
    title: 'Dilute with Devotion',
    description: 'Add two caps of SHUDDHIK to a bowl of clean water. A little is enough.',
    icon: 'droplet',
  },
  {
    step: 3,
    title: 'Dip a Soft Cloth',
    description: 'Soak a soft cotton cloth in the sacred solution and wring out the excess.',
    icon: 'shirt',
  },
  {
    step: 4,
    title: 'Wipe with Seva',
    description: 'Gently wipe the mandir, idols and surfaces in slow, circular motions.',
    icon: 'hand',
  },
  {
    step: 5,
    title: 'Let the Soot Lift',
    description: 'For stubborn soot, let the surface stay damp for a minute before wiping.',
    icon: 'clock',
  },
  {
    step: 6,
    title: 'Dry & Offer',
    description: 'Pat dry with a clean cloth. Light your diya. The space is ready for prayer.',
    icon: 'sparkles',
  },
];

export const certifications = [
  { id: 'trademark', title: 'Trademark', subtitle: 'SHUDDHIK™', icon: 'badge-check' },
  { id: 'india', title: 'Made in India', subtitle: 'Crafted in Bharat', icon: 'flag' },
  { id: 'bio', title: 'Biodegradable', subtitle: 'Returns to earth', icon: 'leaf' },
  { id: 'cruelty', title: 'Cruelty Free', subtitle: 'Ahimsa assured', icon: 'rabbit' },
  { id: 'ph', title: 'pH Balanced', subtitle: 'Gentle on stone', icon: 'scale' },
  { id: 'sacred', title: 'Safe for Sacred Spaces', subtitle: 'Temple approved', icon: 'shield-check' },
];

export const trustCards = [
  {
    id: 't1',
    title: '2,148 Devoted Families',
    description: 'Have made SHUDDHIK part of their daily pooja ritual across India.',
    stat: '2,148+',
  },
  {
    id: 't2',
    title: '127 Temples Served',
    description: 'From Varanasi to Rameswaram, temple trusts rely on SHUDDHIK for seva.',
    stat: '127',
  },
  {
    id: 't3',
    title: '4.9 / 5 Rating',
    description: 'Verified buyers consistently describe SHUDDHIK as devotion in a bottle.',
    stat: '4.9★',
  },
  {
    id: 't4',
    title: '100% Natural Formula',
    description: 'No bleach, no ammonia, no compromise. Only devotional botanicals.',
    stat: '100%',
  },
];

export const productSpecs = [
  { label: 'Brand', value: 'SHUDDHIK™' },
  { label: 'Product', value: 'Temple & Sacred Surface Cleaner' },
  { label: 'Volume', value: '500 ml' },
  { label: 'Fragrance', value: 'Chandan (Sandalwood)' },
  { label: 'Formula', value: 'Natural, Non-Toxic, Biodegradable' },
  { label: 'Safe For', value: 'Marble, Granite, Brass, Stone' },
  { label: 'pH', value: 'Balanced (7.0–7.5)' },
  { label: 'Shelf Life', value: '24 months from manufacture' },
  { label: 'Country of Origin', value: 'India (Bharat)' },
  { label: 'MRP', value: '₹199 (incl. of all taxes)' },
];
