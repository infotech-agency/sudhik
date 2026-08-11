// 'use client';
// import { motion } from 'framer-motion';
// import SectionHeading from '@/components/ui/SectionHeading';
// import { getIcon } from '@/components/ui/iconMap';
// import { howToSteps } from '@/data/content';

// export default function HowToUse() {
//   return (
//     <section
//       id="how-to-use"
//       className="relative py-24 sm:py-32 bg-gradient-to-b from-sand/40 to-ivory overflow-hidden"
//     >
//       <div className="absolute inset-0 bg-gold-radial opacity-40 pointer-events-none" />
//       <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
//         <SectionHeading
//           eyebrow="The Ritual"
//           hindiTitle="विधि"
//           title={
//             <>
//               Six Steps of <span className="text-saffron-gradient">Seva</span>
//             </>
//           }
//           subtitle="Cleaning a sacred space is a ritual, not a chore. Follow it slowly, with shraddha."
//         />

//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-16">
//           {howToSteps.map((s, i) => {
//             const Icon = getIcon(s.icon);
//             return (
//               <motion.div
//                 key={s.step}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, margin: '-60px' }}
//                 transition={{ duration: 0.6, delay: i * 0.08 }}
//                 className="group relative p-8 rounded-3xl bg-white border border-gold-400/15 hover:border-gold-400/40 lift hover:shadow-premium"
//               >
//                 {/* big number watermark */}
//                 <span className="absolute top-4 right-6 font-display text-7xl text-gold-400/10 group-hover:text-gold-400/20 transition-colors duration-500 select-none">
//                   {s.step}
//                 </span>

//                 <div className="relative">
//                   <div className="flex items-center gap-4 mb-5">
//                     <div className="w-12 h-12 rounded-full bg-gradient-to-br from-saffron-500 to-maroon-500 text-ivory font-royal text-lg flex items-center justify-center shadow-gold">
//                       {s.step}
//                     </div>
//                     <div className="w-10 h-10 rounded-xl bg-gold-50 border border-gold-400/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
//                       <Icon size={18} className="text-saffron-500" strokeWidth={1.5} />
//                     </div>
//                   </div>
//                   <h3 className="font-display text-xl text-ink">{s.title}</h3>
//                   <p className="font-serif text-base text-ink/65 leading-relaxed mt-2">
//                     {s.description}
//                   </p>
//                 </div>

//                 {/* connector line for desktop */}
//                 {i < howToSteps.length - 1 && (
//                   <span className="hidden lg:block absolute top-1/2 -right-4 lg:-right-5 w-8 h-px bg-gold-line z-10" />
//                 )}
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }


'use client';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import { getIcon } from '@/components/ui/iconMap';
import { howToSteps } from '@/data/content';

export default function HowToUse() {
  return (
    <section
      id="how-to-use"
      className="relative py-24 sm:py-32 bg-gradient-to-b from-sand/40 to-ivory overflow-hidden"
    >
      <div className="absolute inset-0 bg-gold-radial opacity-40 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="The Ritual"
          hindiTitle="विधि"
          title={
            <>
              Six Steps of <span className="text-saffron-gradient">Seva</span>
            </>
          }
          subtitle="Cleaning a sacred space is a ritual, not a chore. Follow it slowly, with shraddha."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-16">
          {howToSteps.map((s, i) => {
            const Icon = getIcon(s.icon);
            return (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group relative p-8 rounded-3xl bg-white border border-gold-400/15 hover:border-gold-400/40 lift hover:shadow-premium"
              >
                {/* big number watermark */}
                <span className="absolute top-4 right-6 font-display text-7xl text-gold-400/10 group-hover:text-gold-400/20 transition-colors duration-500 select-none">
                  {s.step}
                </span>

                <div className="relative">
                  <div className="flex items-center gap-4 mb-5">
                    {/* Step number circle */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-saffron-500 to-maroon-500 text-ivory font-royal text-xl font-bold flex items-center justify-center shadow-gold"> {/* ✅ bigger & bold */}
                      {s.step}
                    </div>
                    {/* Icon box */}
                    <div className="w-10 h-10 rounded-xl bg-gold-50 border border-gold-400/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <Icon size={18} className="text-saffron-500" strokeWidth={1.5} />
                    </div>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-ink"> {/* ✅ bigger & bold */}
                    {s.title}
                  </h3>
                  <p className="font-serif text-lg sm:text-xl font-medium text-black leading-relaxed mt-2"> {/* ✅ bigger + bold + darker */}
                    {s.description}
                  </p>
                </div>

                {/* connector line for desktop */}
                {i < howToSteps.length - 1 && (
                  <span className="hidden lg:block absolute top-1/2 -right-4 lg:-right-5 w-8 h-px bg-gold-line z-10" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}