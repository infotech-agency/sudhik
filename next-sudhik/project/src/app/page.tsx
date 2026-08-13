// import Hero from '@/components/sections/Hero';
// import WhyShuddhik from '@/components/sections/WhyShuddhik';
// import Philosophy from '@/components/sections/Philosophy';
// import SacredUses from '@/components/sections/SacredUses';
// import Ingredients from '@/components/sections/Ingredients';
// import HowToUse from '@/components/sections/HowToUse';
// import Voices from '@/components/sections/Voices';
// import CTA from '@/components/sections/CTA';
// import FAQ from '@/components/sections/FAQ';
// import ShortsReels from '@/components/sections/ShortsReels';

// export default function HomePage() {
//   return (
//     <>
//       <Hero />
//       <WhyShuddhik />
//       <Philosophy />
//       <SacredUses />
//       <Ingredients />
//       <HowToUse />
//       <Voices />
//       <ShortsReels/>
//       <FAQ/>
//       <CTA />
//     </>
//   );
// }

import Hero from '@/components/sections/Hero';
import WhyShuddhik from '@/components/sections/WhyShuddhik';
import dynamic from 'next/dynamic';

// Keep above-the-fold content eager — these need to be in the initial paint
import Philosophy from '@/components/sections/Philosophy';

// Defer everything below the fold — not needed for LCP/FCP
const SacredUses = dynamic(() => import('@/components/sections/SacredUses'));
const Ingredients = dynamic(() => import('@/components/sections/Ingredients'));
const HowToUse = dynamic(() => import('@/components/sections/HowToUse'));
const Voices = dynamic(() => import('@/components/sections/Voices'), { ssr: false }); // if it's a client carousel
const ShortsReels = dynamic(() => import('@/components/sections/ShortsReels'), { ssr: false });
const FAQ = dynamic(() => import('@/components/sections/FAQ'));
const CTA = dynamic(() => import('@/components/sections/CTA'));

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyShuddhik />
      <Philosophy />
      <SacredUses />
      <Ingredients />
      <HowToUse />
      <Voices />
      <ShortsReels />
      <FAQ />
      <CTA />
    </>
  );
}