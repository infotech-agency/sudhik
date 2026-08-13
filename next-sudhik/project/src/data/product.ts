// Product imagery — premium placeholder photography. Swap these URLs for
// real SHUDDHIK product photography when available.
export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  label: string;
};

export const galleryImages: GalleryImage[] = [
  {
    id: 'g1',
    src: '/product/product.png',
    alt: 'SHUDDHIK bottle front — temple & sacred surface cleaner',
    label: 'Front',
  },
  {
    id: 'g2',
    src: 'https://images.pexels.com/photos/4467687/pexels-photo-4467687.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'SHUDDHIK bottle — amber glass detail',
    label: 'Detail',
  },
  {
    id: 'g3',
    src: 'https://images.pexels.com/photos/6621337/pexels-photo-6621337.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'SHUDDHIK among sacred ingredients',
    label: 'Ingredients',
  },
  {
    id: 'g4',
    src: 'https://images.pexels.com/photos/6621339/pexels-photo-6621339.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'SHUDDHIK in a home mandir setting',
    label: 'In Use',
  },
  {
    id: 'g5',
    src: 'https://images.pexels.com/photos/3737599/pexels-photo-3737599.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'SHUDDHIK packaging and seal',
    label: 'Packaging',
  },
];

// Primary product hero image (used on homepage hero, CTA, cart, checkout).
export const productImage = galleryImages[0].src;
export const productImageAlt = galleryImages[0].alt;

export const productInfo = {
  name: 'SHUDDHIK™',
  subtitle: 'Temple & Sacred Surface Cleaner',
  tagline: 'Shraddha Se Safai',
  taglineHindi: 'श्रद्धा से सफाई',
  price: 199,
  mrp: 199,
  volume: '500 ml',
  rating: 4.9,
  reviewCount: 2148,
  inStock: true,
  deliveryEstimate: 'Delivered in 3–6 days · Free shipping',
  highlights: [
    '500 ml',
    'Chandan Fragrance',
    'Temple Safe',
    'Natural Formula',
    'Marble Safe',
    'Granite Safe',
  ],
  description:
    'SHUDDHIK™ is a premium temple and sacred surface cleaner born from the belief that the surfaces that hold our devotion deserve more than ordinary cleaning. Crafted with chandan, kapur, guggal, tulsi and lotus distillate, it gently lifts dhoop and diya soot from marble, granite, brass and stone — leaving behind only the calm fragrance of sandalwood and the quiet of a sanctified space.',
  benefits: [
    'Gently removes dhoop, diya soot and oil residue',
    'Safe on marble, granite, brass and natural stone',
    'Natural, non-toxic and biodegradable formula',
    'Calming chandan fragrance enhances devotion',
    'pH balanced — gentle on the hands that serve',
    'Made in India with ahimsa and seva at its heart',
  ],
};

export const trustBadges = [
  'Made in India',
  'Natural Formula',
  'Sacred Surface Safe',
  'Chandan Fragrance',
];
