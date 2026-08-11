import Hero from '@/components/sections/Hero';
import WhyShuddhik from '@/components/sections/WhyShuddhik';
import Philosophy from '@/components/sections/Philosophy';
import SacredUses from '@/components/sections/SacredUses';
import Ingredients from '@/components/sections/Ingredients';
import HowToUse from '@/components/sections/HowToUse';
import Voices from '@/components/sections/Voices';
import CTA from '@/components/sections/CTA';
import FAQ from '@/components/sections/FAQ';
import ShortsReels from '@/components/sections/ShortsReels';

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
      <ShortsReels/>
      <FAQ/>
      <CTA />
    </>
  );
}
