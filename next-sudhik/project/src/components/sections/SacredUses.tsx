// 'use client';
// import { motion } from 'framer-motion';
// import SectionHeading from '@/components/ui/SectionHeading';
// import { getIcon } from '@/components/ui/iconMap';
// import { sacredUses } from '@/data/content';

// export default function SacredUses() {
//   return (
//     <section id="uses" className="relative py-24 sm:py-32 bg-sand/40">
//       <div className="absolute inset-0 bg-lotus-fade opacity-50 pointer-events-none" />
//       <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
//         <SectionHeading
//           eyebrow="Sacred Uses"
//           hindiTitle="पावन उपयोग"
//           title={
//             <>
//               For Every Sacred <span className="text-saffron-gradient">Space</span>
//             </>
//           }
//           subtitle="From the quiet corner of a home mandir to the grand stone sanctums of Bharat."
//         />

//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
//           {sacredUses.map((u, i) => {
//             const Icon = getIcon(u.icon);
//             return (
//               <motion.article
//                 key={u.id}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, margin: '-60px' }}
//                 transition={{ duration: 0.6, delay: i * 0.08 }}
//                 className="group relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-sm border border-gold-400/20 p-8 lift hover:shadow-premium"
//               >
//                 {/* hover gradient */}
//                 <div className="absolute inset-0 bg-gradient-to-br from-gold-50/0 to-saffron-100/0 group-hover:from-gold-50/60 group-hover:to-saffron-100/30 transition-all duration-700" />

//                 <div className="relative flex items-start justify-between">
//                   <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-maroon-500 to-saffron-500 flex items-center justify-center shadow-gold group-hover:scale-110 transition-transform duration-500">
//                     <Icon size={20} className="text-ivory" strokeWidth={1.5} />
//                   </div>
//                   <span className="font-deva text-lg text-saffron-500/60 group-hover:text-saffron-500 transition-colors">
//                     {u.hindi}
//                   </span>
//                 </div>

//                 <h3 className="relative font-display text-2xl text-ink mt-6">{u.title}</h3>
//                 <p className="relative font-serif text-base sm:text-lg text-ink/65 leading-relaxed mt-3">
//                   {u.description}
//                 </p>

//                 <span className="absolute bottom-6 right-6 text-gold-400/40 group-hover:text-gold-400 group-hover:translate-x-1 transition-all duration-500">
//                   →
//                 </span>
//               </motion.article>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }


// 'use client';
// import { motion } from 'framer-motion';
// import SectionHeading from '@/components/ui/SectionHeading';
// import { getIcon } from '@/components/ui/iconMap';
// import { sacredUses } from '@/data/content';

// export default function SacredUses() {
//   return (
//     <section id="uses" className="relative py-24 sm:py-32 bg-sand/40 overflow-hidden">
//       {/* full-width background image */}
//       <div className="absolute inset-0 z-0">
//         <img
//           src="/backgrounds/banner.png"
//           alt=""
//           className="w-full h-full object-cover"
//         />
//       </div>

//       {/* existing lotus-fade overlay, now sits above the bg image */}
//       <div className="absolute inset-0 z-[1] bg-lotus-fade opacity-50 pointer-events-none" />

//       <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
//         <SectionHeading
//           eyebrow="Sacred Uses"
//           hindiTitle="पावन उपयोग"
//           title={
//             <>
//               For Every Sacred <span className="text-saffron-gradient">Space</span>
//             </>
//           }
//           // subtitle="From the quiet corner of a home mandir to the grand stone sanctums of Bharat."
//         />

//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
//           {sacredUses.map((u, i) => {
//             const Icon = getIcon(u.icon);
//             return (
//               <motion.article
//                 key={u.id}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, margin: '-60px' }}
//                 transition={{ duration: 0.6, delay: i * 0.08 }}
//                 className="group relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-sm border border-gold-400/20 p-8 lift hover:shadow-premium"
//               >
//                 {/* hover gradient */}
//                 <div className="absolute inset-0 bg-gradient-to-br from-gold-50/0 to-saffron-100/0 group-hover:from-gold-50/60 group-hover:to-saffron-100/30 transition-all duration-700" />

//                 <div className="relative flex items-start justify-between">
//                   <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-maroon-500 to-saffron-500 flex items-center justify-center shadow-gold group-hover:scale-110 transition-transform duration-500">
//                     <Icon size={20} className="text-ivory" strokeWidth={1.5} />
//                   </div>
//                   <span className="font-deva text-lg text-saffron-500/60 group-hover:text-saffron-500 transition-colors">
//                     {u.hindi}
//                   </span>
//                 </div>

//                 <h3 className="relative font-display text-2xl text-ink mt-6">{u.title}</h3>
//                 <p className="relative font-serif text-base sm:text-lg text-ink/65 leading-relaxed mt-3">
//                   {u.description}
//                 </p>

//                 <span className="absolute bottom-6 right-6 text-gold-400/40 group-hover:text-gold-400 group-hover:translate-x-1 transition-all duration-500">
//                   →
//                 </span>
//               </motion.article>
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
import { sacredUses } from '@/data/content';

export default function SacredUses() {
  return (
    <section id="uses" className="relative py-24 sm:py-32 bg-sand/40 overflow-hidden">
      {/* full-width background image */}
      {/* <div className="absolute inset-0 z-0">
        <img
          src="/backgrounds/banner1.webp"
          alt=""
          className="w-full h-full object-cover"
        />
      </div> */}

      {/* existing lotus-fade overlay, now sits above the bg image */}
      <div className="absolute inset-0 z-[1] bg-lotus-fade opacity-50 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Sacred Uses"
          hindiTitle="पावन उपयोग"
          title={
            <>
                For Every Sacred <span className="text-black">Space</span>
            </>
          }
          // subtitle="From the quiet corner of a home mandir to the grand stone sanctums of Bharat."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {sacredUses.map((u, i) => {
            const Icon = getIcon(u.icon);
            return (
              <motion.article
                key={u.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-sm border border-gold-400/20 p-8 lift hover:shadow-premium"
              >
                {/* hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold-50/0 to-saffron-100/0 group-hover:from-gold-50/60 group-hover:to-saffron-100/30 transition-all duration-700" />

                <div className="relative flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-maroon-500 to-saffron-500 flex items-center justify-center shadow-gold group-hover:scale-110 transition-transform duration-500">
                    <Icon size={20} className="text-ivory" strokeWidth={1.5} />
                  </div>
                  <span className="font-deva text-xl font-medium text-saffron-700 group-hover:text-saffron-800 transition-colors"> {/* ✅ bigger + bold + darker */}
                    {u.hindi}
                  </span>
                </div>

                <h3 className="relative font-display text-2xl font-bold text-ink mt-6"> {/* ✅ added bold */}
                  {u.title}
                </h3>
                <p className="relative font-serif text-lg sm:text-xl font-medium text-black leading-relaxed mt-3"> {/* ✅ bigger + bold + darker */}
                  {u.description}
                </p>

                <span className="absolute bottom-6 right-6 text-gold-400/40 group-hover:text-gold-400 group-hover:translate-x-1 transition-all duration-500">
                  →
                </span>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}