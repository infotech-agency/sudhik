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
//                   <span className="font-royal text-xs tracking-royal text-maroon-500/70">
//                     0{i + 1}
//                   </span>
//                   <div className="mt-3 w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-50 via-sand to-beige border border-gold-400/30 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
//                     <Icon size={26} className="text-saffron-500" strokeWidth={1.5} />
//                   </div>
//                 </div>

//                 <div className="flex-1">
//                   <div className="flex items-baseline gap-3 flex-wrap">
//                     <h3 className="font-display text-2xl text-ink">{ing.name}</h3>
//                     {ing.hindiName && (
//                       <span className="font-deva text-lg text-saffron-600/70">
//                         {ing.hindiName}
//                       </span>
//                     )}
//                   </div>
//                   <p className="font-serif text-base sm:text-lg text-ink/65 leading-relaxed mt-2">
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

export default function Ingredients() {
  return (
    <section className="relative py-24 sm:py-32 bg-ivory">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
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

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mt-16">
          {ingredients.map((ing, i) => {
            const Icon = getIcon(ing.icon);
            return (
              <motion.div
                key={ing.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.07 }}
                className="group relative flex gap-6 p-7 lg:p-8 rounded-3xl bg-white border border-gold-400/15 hover:border-gold-400/40 lift hover:shadow-premium"
              >
                {/* number */}
                <div className="shrink-0 flex flex-col items-center">
                  <span className="font-royal text-sm font-medium tracking-royal text-maroon-600"> {/* ✅ bigger + bold + darker */}
                    0{i + 1}
                  </span>
                  <div className="mt-3 w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-50 via-sand to-beige border border-gold-400/30 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <Icon size={26} className="text-saffron-500" strokeWidth={1.5} />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <h3 className="font-display text-2xl font-bold text-ink"> {/* ✅ added bold */}
                      {ing.name}
                    </h3>
                    {ing.hindiName && (
                      <span className="font-deva text-xl font-medium text-saffron-700"> {/* ✅ bigger + bold + darker */}
                        {ing.hindiName}
                      </span>
                    )}
                  </div>
                  <p className="font-serif text-lg sm:text-xl font-medium text-black leading-relaxed mt-2"> {/* ✅ bigger + bold + darker */}
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