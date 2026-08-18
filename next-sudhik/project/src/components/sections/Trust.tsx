// 'use client';
// import { motion } from 'framer-motion';
// import SectionHeading from '@/components/ui/SectionHeading';
// import { getIcon } from '@/components/ui/iconMap';
// import { certifications, trustCards } from '@/data/content';

// export default function Trust() {
//   return (
//     <section className="relative py-24 sm:py-32 bg-ivory">
//       <div className="mx-auto max-w-7xl px-5 sm:px-8">
//         <SectionHeading
//           eyebrow="Why Thousands Trust SHUDDHIK"
//           hindiTitle="विश्वास"
//           title={
//             <>
//               Devotion, <span className="text-saffron-gradient">Verified</span>
//             </>
//           }
//           subtitle="From temple trusts to home mandirs, SHUDDHIK is chosen with faith."
//         />

//         {/* trust stat cards */}
//         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
//           {trustCards.map((t, i) => (
//             <motion.div
//               key={t.id}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, margin: '-60px' }}
//               transition={{ duration: 0.6, delay: i * 0.08 }}
//               className="group p-8 rounded-3xl bg-gradient-to-br from-white to-gold-50/40 border border-gold-400/20 text-center lift hover:shadow-premium"
//             >
//               <p className="font-display text-4xl sm:text-5xl text-saffron-gradient">{t.stat}</p>
//               <h3 className="font-display text-xl text-ink mt-4">{t.title}</h3>
//               <p className="font-serif text-sm text-ink/60 mt-2 leading-relaxed">{t.description}</p>
//             </motion.div>
//           ))}
//         </div>

//         {/* certifications */}
//         <div className="mt-20">
//           <p className="text-center font-royal text-[11px] tracking-royal uppercase text-saffron-500 mb-10">
//             Certifications &amp; Trust Marks
//           </p>
//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
//             {certifications.map((c, i) => {
//               const Icon = getIcon(c.icon);
//               return (
//                 <motion.div
//                   key={c.id}
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   whileInView={{ opacity: 1, scale: 1 }}
//                   viewport={{ once: true, margin: '-50px' }}
//                   transition={{ duration: 0.5, delay: i * 0.06 }}
//                   className="group flex flex-col items-center text-center p-5 rounded-2xl bg-white border border-gold-400/15 hover:border-gold-400/40 transition-all hover:shadow-glow-soft"
//                 >
//                   <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-400 to-saffron-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-500">
//                     <Icon size={20} className="text-ivory" strokeWidth={1.5} />
//                   </div>
//                   <p className="font-display text-sm text-ink leading-tight">{c.title}</p>
//                   <p className="font-serif text-[11px] text-ink/50 mt-1">{c.subtitle}</p>
//                 </motion.div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

'use client';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import { getIcon } from '@/components/ui/iconMap';
import { certifications, trustCards } from '@/data/content';

interface TrustProps {
  rating: number; // e.g. 4.7 — dynamic, poore site me ek hi source of truth se aana chahiye
}

export default function Trust({ rating }: TrustProps) {
  return (
    <section className="relative py-24 sm:py-32 bg-ivory">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Why Thousands Trust SHUDDHIK"
          hindiTitle="विश्वास"
          title={
            <>
              Devotion, <span className="text-saffron-gradient">Verified</span>
            </>
          }
          subtitle="From temple trusts to home mandirs, SHUDDHIK is chosen with faith."
        />

        {/* trust stat cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {trustCards.map((t, i) => {
            // agar ye rating wala card hai to static "4.9★" ke bajaye live rating dikhao
            const isRatingCard = t.id === 'rating';
            const displayStat = isRatingCard ? `${rating.toFixed(1)}★` : t.stat;

            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group p-8 rounded-3xl bg-gradient-to-br from-white to-gold-50/40 border border-gold-400/20 text-center lift hover:shadow-premium"
              >
                <p className="font-display text-4xl sm:text-5xl text-saffron-gradient">{displayStat}</p>
                <h3 className="font-display text-xl text-ink mt-4">{t.title}</h3>
                <p className="font-serif text-sm text-ink/60 mt-2 leading-relaxed">{t.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* certifications */}
        <div className="mt-20">
          <p className="text-center font-royal text-[11px] tracking-royal uppercase text-saffron-500 mb-10">
            Certifications &amp; Trust Marks
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {certifications.map((c, i) => {
              const Icon = getIcon(c.icon);
              return (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="group flex flex-col items-center text-center p-5 rounded-2xl bg-white border border-gold-400/15 hover:border-gold-400/40 transition-all hover:shadow-glow-soft"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-400 to-saffron-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-500">
                    <Icon size={20} className="text-ivory" strokeWidth={1.5} />
                  </div>
                  <p className="font-display text-sm text-ink leading-tight">{c.title}</p>
                  <p className="font-serif text-[11px] text-ink/50 mt-1">{c.subtitle}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}