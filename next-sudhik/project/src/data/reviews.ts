export type Review = {
  id: string;
  name: string;
  avatar: string;
  date: string;
  rating: number;
  title: string;
  body: string;
  verified: boolean;
  helpful: number;
  photos: string[];
  location: string;
};

export const reviewStats = {
  average: 4.9,
  total: 2148,
  distribution: [
    { stars: 5, count: 1872, percent: 87 },
    { stars: 4, count: 214, percent: 10 },
    { stars: 3, count: 43, percent: 2 },
    { stars: 2, count: 11, percent: 0.5 },
    { stars: 1, count: 8, percent: 0.5 },
  ],
};

const avatars = [
  'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
  'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
  'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
  'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
  'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
  'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
];

export const reviews: Review[] = [
  {
    id: 'r1',
    name: 'Aarav Mehta',
    avatar: avatars[0],
    date: '12 June 2024',
    rating: 5,
    title: 'My mandir has never felt this pure',
    body: 'The chandan fragrance lingers for hours after cleaning. The marble of my home mandir looks like it did the day we installed it. SHUDDHIK has become part of my daily pooja ritual.',
    verified: true,
    helpful: 142,
    photos: [],
    location: 'Mumbai, Maharashtra',
  },
  {
    id: 'r2',
    name: 'Sneha Iyer',
    avatar: avatars[1],
    date: '03 June 2024',
    rating: 5,
    title: 'Removed years of diya soot from granite',
    body: 'I had almost given up on the granite floor near our temple. Two gentle wipes with SHUDDHIK and the soot lifted effortlessly. No chemical smell, only the calm of chandan.',
    verified: true,
    helpful: 98,
    photos: [],
    location: 'Bengaluru, Karnataka',
  },
  {
    id: 'r3',
    name: 'Pandit Ramesh Shukla',
    avatar: avatars[2],
    date: '28 May 2024',
    rating: 5,
    title: 'Trusted by our temple trust',
    body: 'As the head purohit of a 200-year-old temple, I am cautious about what touches our deities\' surfaces. SHUDDHIK is the only product I now permit the sevadars to use. Devotion in a bottle.',
    verified: true,
    helpful: 211,
    photos: [],
    location: 'Varanasi, Uttar Pradesh',
  },
  {
    id: 'r4',
    name: 'Kavita Nair',
    avatar: avatars[3],
    date: '19 May 2024',
    rating: 5,
    title: 'Elegant, premium, and genuinely effective',
    body: 'From the packaging to the fragrance, everything feels sacred and considered. It does not feel like a cleaner at all — it feels like an offering.',
    verified: true,
    helpful: 76,
    photos: [],
    location: 'Kochi, Kerala',
  },
  {
    id: 'r5',
    name: 'Rohan Deshpande',
    avatar: avatars[4],
    date: '11 May 2024',
    rating: 4,
    title: 'Beautiful product, wish the bottle were bigger',
    body: '500ml lasts about a month for our ashram. The cleaning is gentle and the chandan aroma is divine. I would happily buy a 1L seva size.',
    verified: true,
    helpful: 34,
    photos: [],
    location: 'Pune, Maharashtra',
  },
  {
    id: 'r6',
    name: 'Ananya Ghosh',
    avatar: avatars[5],
    date: '02 May 2024',
    rating: 5,
    title: 'A sacred ritual, not a chore',
    body: 'Cleaning the pooja room used to feel like a task. With SHUDDHIK it feels like seva. The fragrance alone is worth every rupee.',
    verified: true,
    helpful: 51,
    photos: [],
    location: 'Kolkata, West Bengal',
  },
];
