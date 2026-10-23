// // 'use client';
// // import { motion } from 'framer-motion';
// // import SectionHeading from '@/components/ui/SectionHeading';
// // import Divider from '@/components/ui/Divider';
// // import { getIcon } from '@/components/ui/iconMap';
// // import { ingredients } from '@/data/ingredients';

// // export default function Ingredients() {
// //   return (
// //     <section className="relative py-24 sm:py-32 bg-ivory">
// //       <div className="mx-auto max-w-7xl px-5 sm:px-8">
// //         <SectionHeading
// //           eyebrow="Sacred Ingredients"
// //           hindiTitle="पवित्र सामग्री"
// //           title={
// //             <>
// //               Devotion, <span className="text-saffron-gradient">Distilled</span>
// //             </>
// //           }
// //           subtitle="Six botanicals, each held sacred for centuries, blended into a single act of seva."
// //         />

// //         <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mt-16">
// //           {ingredients.map((ing, i) => {
// //             const Icon = getIcon(ing.icon);
// //             return (
// //               <motion.div
// //                 key={ing.id}
// //                 initial={{ opacity: 0, y: 30 }}
// //                 whileInView={{ opacity: 1, y: 0 }}
// //                 viewport={{ once: true, margin: '-60px' }}
// //                 transition={{ duration: 0.7, delay: i * 0.07 }}
// //                 className="group relative flex gap-6 p-7 lg:p-8 rounded-3xl bg-white border border-gold-400/15 hover:border-gold-400/40 lift hover:shadow-premium"
// //               >
// //                 {/* number */}
// //                 <div className="shrink-0 flex flex-col items-center">
// //                   <span className="font-royal text-xs tracking-royal text-maroon-500/70">
// //                     0{i + 1}
// //                   </span>
// //                   <div className="mt-3 w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-50 via-sand to-beige border border-gold-400/30 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
// //                     <Icon size={26} className="text-saffron-500" strokeWidth={1.5} />
// //                   </div>
// //                 </div>

// //                 <div className="flex-1">
// //                   <div className="flex items-baseline gap-3 flex-wrap">
// //                     <h3 className="font-display text-2xl text-ink">{ing.name}</h3>
// //                     {ing.hindiName && (
// //                       <span className="font-deva text-lg text-saffron-600/70">
// //                         {ing.hindiName}
// //                       </span>
// //                     )}
// //                   </div>
// //                   <p className="font-serif text-base sm:text-lg text-ink/65 leading-relaxed mt-2">
// //                     {ing.description}
// //                   </p>
// //                 </div>
// //               </motion.div>
// //             );
// //           })}
// //         </div>

// //         <Divider maroon className="mt-24" />
// //       </div>
// //     </section>
// //   );
// // }

// 'use client';
// import { motion } from 'framer-motion';
// import SectionHeading from '@/components/ui/SectionHeading';
// import Divider from '@/components/ui/Divider';
// import { getIcon } from '@/components/ui/iconMap';
// import { ingredients } from '@/data/ingredients';

// export default function Ingredients() {
//   return (
//     <section className="relative py-24 sm:py-32 bg-ivory">
//       <div className="mx-auto max-w-7xl px-5 sm:px-8">
//         <SectionHeading
//           eyebrow="Sacred Ingredients"
//           hindiTitle="पवित्र सामग्री"
//           title={
//             <>
//               Devotion, <span className="text-saffron-gradient">Distilled</span>
//             </>
//           }
//           subtitle="Six botanicals, each held sacred for centuries, blended into a single act of seva."
//         />

//         <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mt-16">
//           {ingredients.map((ing, i) => {
//             const Icon = getIcon(ing.icon);
//             return (
//               <motion.div
//                 key={ing.id}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, margin: '-60px' }}
//                 transition={{ duration: 0.7, delay: i * 0.07 }}
//                 className="group relative flex gap-6 p-7 lg:p-8 rounded-3xl bg-white border border-gold-400/15 hover:border-gold-400/40 lift hover:shadow-premium"
//               >
//                 {/* number */}
//                 <div className="shrink-0 flex flex-col items-center">
//                   <span className="font-royal text-sm font-medium tracking-royal text-maroon-600"> {/* ✅ bigger + bold + darker */}
//                     0{i + 1}
//                   </span>
//                   <div className="mt-3 w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-50 via-sand to-beige border border-gold-400/30 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
//                     <Icon size={26} className="text-saffron-500" strokeWidth={1.5} />
//                   </div>
//                 </div>

//                 <div className="flex-1">
//                   <div className="flex items-baseline gap-3 flex-wrap">
//                     <h3 className="font-display text-2xl font-bold text-ink"> {/* ✅ added bold */}
//                       {ing.name}
//                     </h3>
//                     {ing.hindiName && (
//                       <span className="font-deva text-xl font-medium text-saffron-700"> {/* ✅ bigger + bold + darker */}
//                         {ing.hindiName}
//                       </span>
//                     )}
//                   </div>
//                   <p className="font-serif text-lg sm:text-xl font-medium text-black leading-relaxed mt-2"> {/* ✅ bigger + bold + darker */}
//                     {ing.description}
//                   </p>
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>

//         <Divider maroon className="mt-24" />
//       </div>
//     </section>
//   );
// }

'use client';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import Divider from '@/components/ui/Divider';
import { getIcon } from '@/components/ui/iconMap';
import { ingredients } from '@/data/ingredients';

const r = (v: number) => Math.round(v * 10) / 10;

// Line-art botanical sprig – leaves get smaller towards the tip
function Sprig({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 120 320"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M60 320 C57 240 63 160 58 80 C56 50 59 20 60 0" />
      {[260, 215, 170, 125, 80, 38].map((y, i) => {
        const s = 1 - i * 0.09;
        return (
          <g key={y}>
            <path
              d={`M60 ${y} C${r(60 - 30 * s)} ${r(y - 6 * s)} ${r(60 - 46 * s)} ${r(y - 24 * s)} ${r(60 - 50 * s)} ${r(y - 40 * s)} C${r(60 - 24 * s)} ${r(y - 34 * s)} ${r(60 - 6 * s)} ${r(y - 20 * s)} 60 ${y}Z`}
            />
            <path
              d={`M60 ${y} C${r(60 + 30 * s)} ${r(y - 6 * s)} ${r(60 + 46 * s)} ${r(y - 24 * s)} ${r(60 + 50 * s)} ${r(y - 40 * s)} C${r(60 + 24 * s)} ${r(y - 34 * s)} ${r(60 + 6 * s)} ${r(y - 20 * s)} 60 ${y}Z`}
            />
          </g>
        );
      })}
    </svg>
  );
}

const DROP_PATH = 'M8 1 C8 1 1 9.5 1 14 a7 7 0 0 0 14 0 C15 9.5 8 1 8 1Z';

// Thin line – single drop – thin line (the "distilled" in Devotion, Distilled)
function DropOrnament() {
  return (
    <div className="flex items-center justify-center gap-4" aria-hidden>
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-saffron-500/50 sm:w-32" />
      <svg viewBox="0 0 16 22" className="h-6 w-[1.1rem] text-saffron-500">
        <path d={DROP_PATH} fill="currentColor" />
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-saffron-500/50 sm:w-32" />
    </div>
  );
}

export default function Ingredients() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32 bg-ivory">
      {/* botanical sprigs at the edges + warm light from above */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(55% 35% at 50% 0%, rgba(255,190,90,0.16), transparent 70%)',
          }}
        />
        <Sprig className="absolute -left-8 top-28 hidden h-[420px] rotate-[14deg] text-maroon-600/[0.09] sm:block" />
        <Sprig className="absolute -right-8 bottom-32 hidden h-[420px] -rotate-[14deg] -scale-x-100 text-maroon-600/[0.09] sm:block" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Sacred Ingredients"
          hindiTitle="पवित्र सामग्री"
          title={
            <>
              Devotion, <span className="text-saffron-gradient">Distilled</span>
            </>
          }
          subtitle="Six botanicals, each held sacred for centuries, blended into a single act of seva."
        />

        <div className="mt-12">
          <DropOrnament />
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mt-12">
          {ingredients.map((ing, i) => {
            const Icon = getIcon(ing.icon);
            return (
              <motion.div
                key={ing.id}
                // left column slides in from the left, right column from the right
                initial={{ opacity: 0, x: i % 2 === 0 ? -28 : 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: Math.floor(i / 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex overflow-hidden rounded-3xl bg-white border border-gold-400/15 hover:border-gold-400/40 lift hover:shadow-premium"
              >
                {/* left stub – like the tear-off end of an apothecary label */}
                <div className="relative flex w-24 shrink-0 flex-col items-center justify-center gap-3 border-r border-dashed border-gold-400/40 bg-gradient-to-b from-gold-50 via-sand to-beige px-3 py-7 transition-colors duration-500 group-hover:from-saffron-100 group-hover:via-gold-50 sm:w-28">
                  {/* ticket notches */}
                  <span aria-hidden className="absolute -right-2 -top-2 h-4 w-4 rounded-full border border-gold-400/25 bg-ivory" />
                  <span aria-hidden className="absolute -bottom-2 -right-2 h-4 w-4 rounded-full border border-gold-400/25 bg-ivory" />

                  <span className="font-royal text-sm font-medium tracking-royal text-maroon-600">
                    0{i + 1}
                  </span>
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-gold-400/40 bg-white/80 shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <span
                      aria-hidden
                      className="absolute -inset-1.5 rounded-full border border-dashed border-gold-400/40 transition-transform duration-[1200ms] group-hover:rotate-180"
                    />
                    <Icon size={26} className="text-saffron-500" strokeWidth={1.5} />
                  </div>
                </div>

                <div className="relative flex-1 p-6 lg:p-8">
                  {/* a single drop that settles a little on hover */}
                  <svg
                    aria-hidden
                    viewBox="0 0 16 22"
                    className="absolute right-5 top-5 h-5 w-4 text-gold-400/50 transition-all duration-500 group-hover:translate-y-1 group-hover:text-saffron-500"
                  >
                    <path d={DROP_PATH} fill="currentColor" />
                  </svg>

                  <div className="flex flex-wrap items-baseline gap-3 pr-7">
                    <h3 className="font-display text-2xl font-bold text-ink">{ing.name}</h3>
                    {ing.hindiName && (
                      <span className="font-deva text-xl font-medium text-saffron-700">{ing.hindiName}</span>
                    )}
                  </div>
                  <p className="font-serif text-lg sm:text-xl font-medium text-black leading-relaxed mt-2">
                    {ing.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <Divider maroon className="mt-24" />
      </div>
    </section>
  );
}