// 'use client';

// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import type { Product } from '@/lib/types';
// import { splitList } from '@/lib/product-utils';

// const tabs = ['Overview', 'Benefits', 'Ingredients', 'Usage', 'Specifications'] as const;
// type Tab = (typeof tabs)[number];

// export default function ProductInfoTabs({ product }: { product: Product }) {
//   const [active, setActive] = useState<Tab>('Overview');

//   return (
//     <div className="mt-16">
//       <div className="flex flex-wrap gap-1 sm:gap-2 border-b border-gold-400/20">
//         {tabs.map((t) => (
//           <button
//             key={t}
//             onClick={() => setActive(t)}
//             className={`relative px-4 sm:px-6 py-3.5 font-royal text-xs sm:text-sm tracking-royal-sm uppercase transition-colors ${active === t ? 'text-saffron-500' : 'text-ink/50 hover:text-ink'}`}
//           >
//             {t}
//             {active === t && (
//               <motion.span layoutId="tab-underline" className="absolute -bottom-px left-0 right-0 h-0.5 bg-gradient-to-r from-saffron-500 to-gold-400" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
//             )}
//           </button>
//         ))}
//       </div>

//       <div className="pt-10 min-h-[280px]">
//         <AnimatePresence mode="wait">
//           <motion.div key={active} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
//             {active === 'Overview' && (
//               <div className="grid lg:grid-cols-2 gap-10 items-center">
//                 <div>
//                   <p className="font-deva text-xl text-saffron-600/70 mb-4">शुद्धि</p>
//                   <h3 className="font-display text-3xl text-ink mb-5">{product.title}</h3>
//                   <p className="font-serif text-lg text-ink/70 leading-relaxed">{product.description}</p>
//                 </div>
//                 <div className="rounded-2xl border border-gold-400/20 bg-gradient-to-br from-gold-50/40 to-sand/30 p-8">
//                   <p className="font-royal text-[10px] tracking-royal uppercase text-saffron-500 mb-4">At a Glance</p>
//                   <dl className="space-y-3">
//                     {[
//                       ['Price', `₹${product.price}`],
//                       ['Stock', `${product.stock} available`],
//                       ['Specifications', product.specifications || '—'],
//                       ['Shipping', product.shippingInfo || 'Ships in 1–2 days'],
//                     ].map(([k, v]) => (
//                       <div key={k} className="flex justify-between gap-4 py-2 border-b border-gold-400/10">
//                         <dt className="font-royal text-[10px] tracking-royal uppercase text-ink/45">{k}</dt>
//                         <dd className="font-serif text-sm text-ink/80 text-right">{v}</dd>
//                       </div>
//                     ))}
//                   </dl>
//                 </div>
//               </div>
//             )}

//             {active === 'Benefits' && (
//               <div className="grid sm:grid-cols-2 gap-4">
//                 {splitList(product.benefits).map((b, i) => (
//                   <motion.div key={b} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="flex gap-4 p-6 rounded-2xl bg-white border border-gold-400/15">
//                     <span className="shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-saffron-500 to-maroon-500 text-ivory font-royal text-sm flex items-center justify-center">{i + 1}</span>
//                     <p className="font-serif text-lg text-ink/75 pt-1">{b}</p>
//                   </motion.div>
//                 ))}
//               </div>
//             )}

//             {active === 'Ingredients' && (
//               <p className="font-serif text-lg text-ink/70 leading-relaxed max-w-3xl">{product.ingredients || 'Ingredient details coming soon.'}</p>
//             )}

//             {active === 'Usage' && (
//               <p className="font-serif text-lg text-ink/70 leading-relaxed max-w-3xl">{product.howToUse || 'Usage instructions coming soon.'}</p>
//             )}

//             {active === 'Specifications' && (
//               <dl className="grid sm:grid-cols-2 gap-x-10 gap-y-2">
//                 {[
//                   ['Specifications', product.specifications || '—'],
//                   ['Product Information', product.productInformation || '—'],
//                   ['Shipping Info', product.shippingInfo || '—'],
//                 ].map(([k, v]) => (
//                   <div key={k} className="flex justify-between gap-4 py-3 border-b border-gold-400/10">
//                     <dt className="font-royal text-[10px] tracking-royal uppercase text-ink/45">{k}</dt>
//                     <dd className="font-serif text-base text-ink/80 text-right max-w-[60%]">{v}</dd>
//                   </div>
//                 ))}
//               </dl>
//             )}
//           </motion.div>
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }


'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from '@/lib/types';
import { splitList } from '@/lib/product-utils';

const tabs = ['Overview', 'Benefits', 'Ingredients', 'Usage', 'Specifications'] as const;
type Tab = (typeof tabs)[number];

export default function ProductInfoTabs({ product }: { product: Product }) {
  const [active, setActive] = useState<Tab>('Overview');

  return (
    <div className="mt-16">
      {/* Tab buttons – already legible, can keep as is */}
      <div className="flex flex-wrap gap-1 sm:gap-2 border-b border-gold-400/20">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={`relative px-4 sm:px-6 py-3.5 font-royal text-xs sm:text-sm tracking-royal-sm uppercase transition-colors ${
              active === t ? 'text-saffron-500' : 'text-ink/50 hover:text-ink'
            }`}
          >
            {t}
            {active === t && (
              <motion.span
                layoutId="tab-underline"
                className="absolute -bottom-px left-0 right-0 h-0.5 bg-gradient-to-r from-saffron-500 to-gold-400"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="pt-10 min-h-[280px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            {/* ---------- OVERVIEW ---------- */}
            {active === 'Overview' && (
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                <div>
                  <p className="font-deva text-2xl text-saffron-600/80 mb-4"> {/* ✅ size + color */}
                    शुद्धि
                  </p>
                  <h3 className="font-display text-4xl font-bold text-ink mb-5"> {/* ✅ bigger & bold */}
                    {product.title}
                  </h3>
                  <p className="font-serif text-xl font-medium text-ink/90 leading-relaxed"> {/* ✅ size + weight + darker */}
                    {product.description}
                  </p>
                </div>
                <div className="rounded-2xl border border-gold-400/20 bg-gradient-to-br from-gold-50/40 to-sand/30 p-8">
                  <p className="font-royal text-xs tracking-royal uppercase text-saffron-500 mb-4"> {/* ✅ size slightly bigger */}
                    At a Glance
                  </p>
                  <dl className="space-y-3">
                    {[
                      ['Price', `₹${product.price}`],
                      ['Stock', `${product.stock} available`],
                      ['Specifications', product.specifications || '—'],
                      ['Shipping', product.shippingInfo || 'Ships in 1–2 days'],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between gap-4 py-2 border-b border-gold-400/10">
                        <dt className="font-royal text-xs tracking-royal uppercase text-ink/60"> {/* ✅ darker */}
                          {k}
                        </dt>
                        <dd className="font-serif text-base font-medium text-ink/90 text-right"> {/* ✅ darker & bold */}
                          {v}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            )}

            {/* ---------- BENEFITS ---------- */}
            {active === 'Benefits' && (
              <div className="grid sm:grid-cols-2 gap-4">
                {splitList(product.benefits).map((b, i) => (
                  <motion.div
                    key={b}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex gap-4 p-6 rounded-2xl bg-white border border-gold-400/15"
                  >
                    <span className="shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-saffron-500 to-maroon-500 text-ivory font-royal text-sm flex items-center justify-center">
                      {i + 1}
                    </span>
                    <p className="font-serif text-xl font-medium text-ink/90 pt-1"> {/* ✅ bigger, bold, darker */}
                      {b}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}

            {/* ---------- INGREDIENTS ---------- */}
            {active === 'Ingredients' && (
              <p className="font-serif text-xl font-medium text-ink/90 leading-relaxed max-w-3xl"> {/* ✅ bigger, bold, darker */}
                {product.ingredients || 'Ingredient details coming soon.'}
              </p>
            )}

            {/* ---------- USAGE ---------- */}
            {active === 'Usage' && (
              <p className="font-serif text-xl font-medium text-ink/90 leading-relaxed max-w-3xl"> {/* ✅ bigger, bold, darker */}
                {product.howToUse || 'Usage instructions coming soon.'}
              </p>
            )}

            {/* ---------- SPECIFICATIONS ---------- */}
            {active === 'Specifications' && (
              <dl className="grid sm:grid-cols-2 gap-x-10 gap-y-2">
                {[
                  ['Specifications', product.specifications || '—'],
                  ['Product Information', product.productInformation || '—'],
                  ['Shipping Info', product.shippingInfo || '—'],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 py-3 border-b border-gold-400/10">
                    <dt className="font-royal text-xs tracking-royal uppercase text-ink/60"> {/* ✅ darker */}
                      {k}
                    </dt>
                    <dd className="font-serif text-lg font-medium text-ink/90 text-right max-w-[60%]"> {/* ✅ bigger, bold, darker */}
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}