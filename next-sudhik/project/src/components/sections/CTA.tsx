
// 'use client';
// import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { useRouter } from 'next/navigation';
// import { ArrowRight } from 'lucide-react';
// import Button from '@/components/ui/Button';
// import ProductImage from '@/components/ui/ProductImage';
// import { api } from '@/lib/api';

// export default function CTA() {
//   const router = useRouter();
//   const [productSlug, setProductSlug] = useState('');

//   useEffect(() => {
//     api
//       .get('/api/products')
//       .then((products: any) => {
//         if (Array.isArray(products) && products.length > 0) {
//           setProductSlug(products[0].slug || products[0]._id);
//         }
//       })
//       .catch(() => {});
//   }, []);

//   const handleBuyNow = () => {
//     router.push(productSlug ? `/products/${productSlug}` : '/products');
//   };

//   return (
//     <section className="relative py-28 sm:py-36 bg-gradient-to-b from-ink via-[#2a1810] to-ink text-ivory overflow-hidden">
//       <div className="absolute inset-0 bg-temple-dark opacity-80 pointer-events-none" />
//       {/* diya glow */}
//       <motion.div
//         animate={{ opacity: [0.3, 0.6, 0.3] }}
//         transition={{ duration: 5, repeat: Infinity }}
//         className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold-radial pointer-events-none"
//       />

//       <div className="relative mx-auto max-w-4xl px-5 sm:px-8 text-center">
//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.7 }}
//           className="font-deva text-2xl text-gold-300/80"
//         >
//           प्रार्थना में शुद्धता लाएं
//         </motion.p>

//         <motion.h2
//           initial={{ opacity: 0, y: 24 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8, delay: 0.1 }}
//           className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.05] mt-4"
//         >
//           Bring Purity to <br className="hidden sm:block" />
//           <span className="text-gold-gradient">Every Prayer</span>
//         </motion.h2>

//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.7, delay: 0.2 }}
//           className="font-serif text-xl text-ivory/70 mt-6 max-w-xl mx-auto"
//         >
//           One bottle. One devotion. Begin your seva with SHUDDHIK today.
//         </motion.p>

//         {/* floating bottle */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.85 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 1, delay: 0.2 }}
//           className="my-12 flex justify-center"
//         >
//           <div className="w-32 sm:w-40 h-44 sm:h-56">
//             <ProductImage aura float className="w-full h-full" />
//           </div>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.7, delay: 0.3 }}
//           className="flex flex-col sm:flex-row items-center justify-center gap-4"
//         >
//           <Button variant="primary" size="lg" onClick={handleBuyNow}>
//             Buy Now
//           </Button>
//           {/* <span className="font-royal text-xs tracking-royal uppercase text-ivory/50">
//             ₹199 · 500ml · Free Shipping
//           </span> */}
//         </motion.div>
//       </div>
//     </section>
//   );
// }

'use client';
import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import ProductImage from '@/components/ui/ProductImage';
import { api } from '@/lib/api';

// Deterministic (no Math.random) so server and client always match
const EMBERS = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  left: (i * 37 + 11) % 100,
  size: 2 + (i % 3),
  duration: 9 + (i % 4) * 2.5,
  delay: (i * 1.3) % 8,
  drift: (i % 2 ? 1 : -1) * (10 + (i % 3) * 7),
}));

const DIYA_COUNT = 7;
const MID = Math.floor(DIYA_COUNT / 2);

function Diya({ index, reduce }: { index: number; reduce: boolean | null }) {
  const dist = Math.abs(index - MID); // 0 for the centre diya
  const delay = 0.5 + dist * 0.3; // centre lights first, then outwards
  const scale = 1.15 - dist * 0.12;
  const hideOnMobile = dist === MID; // outermost two only on larger screens

  return (
    <div
      aria-hidden
      className={`flex flex-col items-center ${hideOnMobile ? 'hidden sm:flex' : ''}`}
      style={{ transform: `scale(${scale})`, transformOrigin: 'bottom center' }}
    >
      {/* flame: pops alight once, then flickers softly */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay, type: 'spring', stiffness: 220, damping: 14 }}
        className="origin-bottom"
      >
        <motion.span
          className="block h-6 w-3.5 bg-gradient-to-t from-saffron-500 via-gold-300 to-ivory shadow-[0_0_20px_7px_rgba(255,170,60,0.5)]"
          style={{ borderRadius: '50% 50% 50% 50% / 65% 65% 35% 35%', transformOrigin: 'bottom center' }}
          animate={
            reduce
              ? undefined
              : { scaleY: [1, 1.18, 0.94, 1.1, 1], scaleX: [1, 0.9, 1.05, 0.94, 1], rotate: [0, -3, 2, -1.5, 0] }
          }
          transition={{
            duration: 2.2 + (index % 3) * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: delay + 0.6,
          }}
        />
      </motion.div>

      {/* the diya bowl */}
      <svg viewBox="0 0 56 22" className="-mt-0.5 h-[22px] w-14 text-gold-400">
        <path d="M2 3 Q28 12 54 3 C52 15 42 21 28 21 C14 21 4 15 2 3Z" fill="currentColor" />
        <path d="M2 3 Q28 12 54 3 C52 15 42 21 28 21 C14 21 4 15 2 3Z" fill="#3a1a08" opacity="0.28" />
        <path d="M2 3 Q28 12 54 3" fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="1" />
      </svg>
    </div>
  );
}

export default function CTA() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [productSlug, setProductSlug] = useState('');

  useEffect(() => {
    api
      .get('/api/products')
      .then((products: any) => {
        if (Array.isArray(products) && products.length > 0) {
          setProductSlug(products[0].slug || products[0]._id);
        }
      })
      .catch(() => {});
  }, []);

  const handleBuyNow = () => {
    router.push(productSlug ? `/products/${productSlug}` : '/products');
  };

  return (
    <section className="relative py-28 sm:py-36 bg-gradient-to-b from-ink via-[#2a1810] to-ink text-ivory overflow-hidden">
      <div className="absolute inset-0 bg-temple-dark opacity-80 pointer-events-none" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gold-line opacity-60" />

      {/* diya glow */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold-radial pointer-events-none"
      />

      {/* embers rising – echoes the Philosophy section */}
      {!reduce && (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {EMBERS.map((e) => (
            <motion.span
              key={e.id}
              className="absolute rounded-full bg-gold-300 shadow-[0_0_8px_2px_rgba(255,190,90,0.55)]"
              style={{ left: `${e.left}%`, width: e.size, height: e.size }}
              initial={{ top: '105%', opacity: 0 }}
              animate={{
                top: ['105%', '-5%'],
                x: [0, e.drift, -e.drift * 0.6, e.drift * 0.3],
                opacity: [0, 0.9, 0.9, 0],
              }}
              transition={{ duration: e.duration, delay: e.delay, repeat: Infinity, ease: 'linear' }}
            />
          ))}
        </div>
      )}

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

        {/* floating bottle, with light rippling outwards like an aarti */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative my-12 flex justify-center"
        >
          {!reduce && (
            <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="absolute h-56 w-56 rounded-full border border-gold-400/40"
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: [0.7, 2.6], opacity: [0.5, 0] }}
                  transition={{ duration: 6, delay: i * 2, repeat: Infinity, ease: 'easeOut' }}
                />
              ))}
            </div>
          )}
          <div className="relative w-32 sm:w-40 h-44 sm:h-56">
            <ProductImage aura float className="w-full h-full" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8"
        >
          <Button variant="primary" size="lg" onClick={handleBuyNow}>
            Buy Now
          </Button>
          <Link
            href="/products"
            className="font-serif text-lg text-ivory/70 underline decoration-gold-400/40 underline-offset-8 transition-colors hover:text-gold-200 hover:decoration-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-offset-4 focus-visible:ring-offset-ink rounded-sm"
          >
            Explore all products
          </Link>
          {/* <span className="font-royal text-xs tracking-royal uppercase text-ivory/50">
            ₹199 · 500ml · Free Shipping
          </span> */}
        </motion.div>

        {/* a row of diyas that light from the centre outwards – the page ends the way a prayer begins */}
        <div className="mt-20 flex items-end justify-center gap-5 sm:gap-9">
          {Array.from({ length: DIYA_COUNT }).map((_, i) => (
            <Diya key={i} index={i} reduce={reduce} />
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 1.6 }}
          className="mt-8 font-deva text-xl text-gold-300/60"
        >
          ॐ शान्तिः शान्तिः शान्तिः
        </motion.p>
      </div>
    </section>
  );
}