
// 'use client';
// import { motion } from 'framer-motion';
// import SectionHeading from '@/components/ui/SectionHeading';
// import { getIcon } from '@/components/ui/iconMap';
// import { sacredUses } from '@/data/content';

// export default function SacredUses() {
//   return (
//     <section id="uses" className="relative py-24 sm:py-32 bg-sand/40 overflow-hidden">
//       {/* full-width background image */}
//       {/* <div className="absolute inset-0 z-0">
//         <img
//           src="/backgrounds/banner1.webp"
//           alt=""
//           className="w-full h-full object-cover"
//         />
//       </div> */}

//       {/* existing lotus-fade overlay, now sits above the bg image */}
//       <div className="absolute inset-0 z-[1] bg-lotus-fade opacity-50 pointer-events-none" />

//       <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
//         <SectionHeading
//           eyebrow="Sacred Uses"
//           hindiTitle="पावन उपयोग"
//           title={
//             <>
//                 For Every Sacred <span className="text-black">Space</span>
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
//                   <span className="font-deva text-xl font-medium text-saffron-700 group-hover:text-saffron-800 transition-colors"> {/* ✅ bigger + bold + darker */}
//                     {u.hindi}
//                   </span>
//                 </div>

//                 <h3 className="relative font-display text-2xl font-bold text-ink mt-6"> {/* ✅ added bold */}
//                   {u.title}
//                 </h3>
//                 <p className="relative font-serif text-lg sm:text-xl font-medium text-black leading-relaxed mt-3"> {/* ✅ bigger + bold + darker */}
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

const archFade = 'linear-gradient(to bottom, black 30%, transparent 100%)';

// A row of ogee temple arches (jharokha style) along the top, fading downwards
function Colonnade() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-[120px] w-full text-maroon-600 opacity-[0.09]"
      style={{ maskImage: archFade, WebkitMaskImage: archFade }}
    >
      <defs>
        <pattern id="uses-arches" width="64" height="120" patternUnits="userSpaceOnUse">
          <path
            d="M8 120 V56 C8 34 32 26 32 4 C32 26 56 34 56 56 V120"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            d="M16 120 V58 C16 42 32 34 32 18 C32 34 48 42 48 58 V120"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#uses-arches)" />
    </svg>
  );
}

// Thin line – small lotus – thin line
function Ornament() {
  return (
    <div className="flex items-center justify-center gap-4" aria-hidden>
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-saffron-500/50 sm:w-32" />
      <svg viewBox="-12 -12 24 24" className="h-6 w-6 text-saffron-600" fill="none" stroke="currentColor" strokeWidth="0.9">
        {Array.from({ length: 8 }).map((_, i) => (
          <ellipse key={i} cx="0" cy="-6" rx="2.6" ry="5.2" transform={`rotate(${i * 45})`} />
        ))}
        <circle r="1.6" fill="currentColor" stroke="none" />
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-saffron-500/50 sm:w-32" />
    </div>
  );
}

export default function SacredUses() {
  return (
    <section id="uses" className="relative py-24 sm:py-32 bg-sand/40 overflow-hidden scroll-mt-24">
      {/* existing lotus-fade overlay */}
      <div className="absolute inset-0 z-[1] bg-lotus-fade opacity-50 pointer-events-none" />

      {/* temple arches + two soft pools of lamp light */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <Colonnade />
        <div className="absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-saffron-300/30 blur-3xl" />
        <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-gold-300/25 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Sacred Uses"
          hindiTitle="पावन उपयोग"
          title={
            <>
              For Every Sacred <span className="text-black">Space</span>
            </>
          }
        />

        <div className="mt-12">
          <Ornament />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {sacredUses.map((u, i) => {
            const Icon = getIcon(u.icon);
            return (
              <motion.article
                key={u.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-sm border border-gold-400/20 p-8 lift hover:shadow-premium hover:border-gold-400/50"
              >
                {/* lamp light rising from the bottom edge on hover */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  style={{
                    background:
                      'radial-gradient(70% 50% at 50% 100%, rgba(255,190,90,0.28), transparent 70%)',
                  }}
                />

                {/* top gold line draws outward from the centre */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-8 top-0 h-px origin-center scale-x-0 bg-gold-line transition-transform duration-700 group-hover:scale-x-100"
                />

                {/* lotus watermark, cropped by the card corner; turns a little on hover */}
                <svg
                  aria-hidden
                  viewBox="-30 -30 60 60"
                  className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 text-saffron-500/[0.12] transition-all duration-[1200ms] group-hover:rotate-45 group-hover:text-saffron-500/20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.6"
                >
                  {Array.from({ length: 8 }).map((_, k) => (
                    <ellipse key={`o${k}`} cx="0" cy="-14" rx="6" ry="13" transform={`rotate(${k * 45})`} />
                  ))}
                  {Array.from({ length: 8 }).map((_, k) => (
                    <ellipse key={`i${k}`} cx="0" cy="-8" rx="4" ry="8" transform={`rotate(${k * 45 + 22.5})`} />
                  ))}
                  <circle r="3" />
                </svg>

                <div className="relative flex items-start justify-between">
                  {/* icon sits in a small arched niche, like a diya alcove */}
                  <div className="relative flex h-16 w-14 items-center justify-center rounded-t-[999px] rounded-b-xl bg-gradient-to-br from-maroon-500 to-saffron-500 pt-3 shadow-gold transition-transform duration-500 group-hover:-translate-y-1">
                    <span
                      aria-hidden
                      className="absolute inset-1 rounded-t-[999px] rounded-b-lg border border-ivory/30"
                    />
                    <Icon size={20} className="relative text-ivory" strokeWidth={1.5} />
                  </div>
                  <span className="pt-1 font-deva text-xl font-medium text-saffron-700 transition-colors group-hover:text-saffron-800">
                    {u.hindi}
                  </span>
                </div>

                <h3 className="relative font-display text-2xl font-bold text-ink mt-6">{u.title}</h3>
                <p className="relative font-serif text-lg sm:text-xl font-medium text-black leading-relaxed mt-3">
                  {u.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}