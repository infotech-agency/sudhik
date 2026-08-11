'use client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import ProductImage from '@/components/ui/ProductImage';

export default function CTA() {
  const router = useRouter();
  return (
    <section className="relative py-28 sm:py-36 bg-gradient-to-b from-ink via-[#2a1810] to-ink text-ivory overflow-hidden">
      <div className="absolute inset-0 bg-temple-dark opacity-80 pointer-events-none" />
      {/* diya glow */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold-radial pointer-events-none"
      />

      <div className="relative mx-auto max-w-4xl px-5 sm:px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-deva text-2xl text-gold-300/80"
        >
          प्रार्थना में शुद्धता लाएं
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.05] mt-4"
        >
          Bring Purity to <br className="hidden sm:block" />
          <span className="text-gold-gradient">Every Prayer</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-serif text-xl text-ivory/70 mt-6 max-w-xl mx-auto"
        >
          One bottle. One devotion. Begin your seva with SHUDDHIK today.
        </motion.p>

        {/* floating bottle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="my-12 flex justify-center"
        >
          <div className="w-32 sm:w-40 h-44 sm:h-56">
            <ProductImage aura float className="w-full h-full" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button variant="primary" size="lg" onClick={() => router.push('/products')}>
            Buy Now 
          </Button>
          {/* <span className="font-royal text-xs tracking-royal uppercase text-ivory/50">
            ₹199 · 500ml · Free Shipping
          </span> */}
        </motion.div>
      </div>
    </section>
  );
}
