

// "use client"

// import { motion } from 'framer-motion';
// import SectionHeading from '@/components/ui/SectionHeading';
// import Divider from '@/components/ui/Divider';
// import { getIcon } from '@/components/ui/iconMap';
// import { whyFeatures } from '@/data/content';

// export default function WhyShuddhik() {
//   return (
//     <section className="relative pt-24 sm:pt-32 bg-gradient-to-br from-maroon-600 to-maroon-700">
//       <div className="mx-auto max-w-7xl px-5 sm:px-8">
//         <SectionHeading
//           eyebrow="Why SHUDDHIK"
//           hindiTitle="क्यों शुद्धिक"
//           title={
//             <>
//               <p className='text-ivory'>Six Reasons It Is <span className="text-gold-400">Not Ordinary</span></p>
//             </>
//           }
//           subtitle={
//             <>
//               <p className='text-ivory text-lg sm:text-xl font-medium'> {/* ✅ bigger + medium weight */}
//                 Every detail is an act of devotion — from the botanicals we choose to the stones we protect.
//               </p>
//             </>
//           }
//         />

//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-16">
//           {whyFeatures.map((f, i) => {
//             const Icon = getIcon(f.icon);
//             return (
//               <motion.div
//                 key={f.id}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, margin: '-60px' }}
//                 transition={{ duration: 0.6, delay: i * 0.08 }}
//                 className="group relative p-8 lg:p-10 rounded-3xl bg-white border border-gold-400/15 lift hover:shadow-premium hover:border-gold-400/40"
//               >
//                 {/* corner glow on hover */}
//                 <div className="absolute inset-0 rounded-3xl bg-gold-radial opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

//                 <div className="relative">
//                   <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-maroon-500 to-maroon-700 border border-gold-400/30 shadow-gold flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
//                     <Icon size={24} className="text-[#B28331]" strokeWidth={1.9} />
//                   </div>
//                   <h3 className="font-display text-2xl font-bold text-ink mb-3"> {/* ✅ added bold */}
//                     {f.title}
//                   </h3>
//                   <p className="font-sans text-lg sm:text-xl font-medium text-ink/90 leading-relaxed"> {/* ✅ bigger + bold + darker */}
//                     {f.description}
//                   </p>
//                 </div>

//                 {/* bottom hairline */}
//                 <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-0 group-hover:w-2/3 bg-gold-line transition-all duration-700" />
//               </motion.div>
//             );
//           })}
//         </div>
// <Divider maroon className="mt-24" />
//         {/* full-width banner image — breaks out of the max-w-7xl container to span the full viewport */}
        

        
//       </div>
//     </section>
//   );
// }

"use client"

import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import Divider from '@/components/ui/Divider';
import { getIcon } from '@/components/ui/iconMap';
import { whyFeatures } from '@/data/content';

const NUMERALS = ['१', '२', '३', '४', '५', '६'];

// Built only from what the brand already says elsewhere on the site
const TRUST = [
  'Tested on real temple stones',
  'Made with ahimsa',
  'pH balanced',
  'Biodegradable',
];

const fadeMask = 'radial-gradient(ellipse at 50% 25%, black 15%, transparent 75%)';

// Temple "jaali" lattice, very faint, fading out from the top centre
function Jaali() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full text-gold-400 opacity-[0.1]"
      style={{ maskImage: fadeMask, WebkitMaskImage: fadeMask }}
    >
      <defs>
        <pattern id="why-jaali" width="72" height="72" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth="0.8">
            <path d="M36 4 L50 22 L68 36 L50 50 L36 68 L22 50 L4 36 L22 22 Z" />
            <circle cx="36" cy="36" r="9" />
            <circle cx="0" cy="0" r="5" />
            <circle cx="72" cy="0" r="5" />
            <circle cx="0" cy="72" r="5" />
            <circle cx="72" cy="72" r="5" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#why-jaali)" />
    </svg>
  );
}

// Thin line – small lotus – thin line
function Ornament() {
  return (
    <div className="flex items-center justify-center gap-4" aria-hidden>
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold-400/60 sm:w-32" />
      <svg viewBox="-12 -12 24 24" className="h-6 w-6 text-gold-400" fill="none" stroke="currentColor" strokeWidth="0.9">
        {Array.from({ length: 8 }).map((_, i) => (
          <ellipse key={i} cx="0" cy="-6" rx="2.6" ry="5.2" transform={`rotate(${i * 45})`} />
        ))}
        <circle r="1.6" fill="currentColor" stroke="none" />
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold-400/60 sm:w-32" />
    </div>
  );
}

export default function WhyShuddhik() {
  return (
    <section className="relative overflow-hidden pt-24 sm:pt-32 bg-gradient-to-br from-maroon-600 to-maroon-700">
      {/* background: lattice + warm light from above */}
      <Jaali />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(60% 40% at 50% 0%, rgba(255,190,90,0.18), transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Why SHUDDHIK"
          hindiTitle="क्यों शुद्धिक"
          title={
            // <span>, not <p> – a <p> inside a heading is invalid HTML and can trigger hydration warnings
            <span className="text-ivory">
              Six Reasons It Is <span className="text-gold-400">Not Ordinary</span>
            </span>
          }
          subtitle={
            <span className="block text-ivory text-lg sm:text-xl font-medium">
              Every detail is an act of devotion — from the botanicals we choose to the stones we protect.
            </span>
          }
        />

        <div className="mt-12">
          <Ornament />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-12">
          {whyFeatures.map((f, i) => {
            const Icon = getIcon(f.icon);
            return (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group relative p-8 lg:p-10 rounded-3xl bg-white border border-gold-400/15 lift hover:shadow-premium hover:border-gold-400/40"
              >
                {/* corner glow on hover */}
                <div className="absolute inset-0 rounded-3xl bg-gold-radial opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Devanagari numeral watermark – six reasons, १ to ६ */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-7 top-4 select-none font-deva text-7xl font-bold leading-none text-maroon-600/[0.06] transition-colors duration-500 group-hover:text-maroon-600/[0.13]"
                >
                  {NUMERALS[i]}
                </span>

                {/* temple-frame corner brackets that draw in on hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-4 top-4 h-5 w-5 rounded-tl-lg border-l border-t border-gold-400/0 transition-all duration-500 group-hover:left-3 group-hover:top-3 group-hover:border-gold-400/70"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute bottom-4 right-4 h-5 w-5 rounded-br-lg border-b border-r border-gold-400/0 transition-all duration-500 group-hover:bottom-3 group-hover:right-3 group-hover:border-gold-400/70"
                />

                <div className="relative">
                  <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-maroon-500 to-maroon-700 border border-gold-400/30 shadow-gold flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    {/* thin halo ring around the icon tile */}
                    <span
                      aria-hidden
                      className="absolute -inset-1.5 rounded-[1.15rem] border border-dashed border-gold-400/0 transition-colors duration-500 group-hover:border-gold-400/50"
                    />
                    <Icon size={24} className="text-[#B28331]" strokeWidth={1.9} />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-ink mb-3">{f.title}</h3>
                  <p className="font-sans text-lg sm:text-xl font-medium text-ink/90 leading-relaxed">
                    {f.description}
                  </p>
                </div>

                {/* bottom hairline */}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-0 group-hover:w-2/3 bg-gold-line transition-all duration-700" />
              </motion.div>
            );
          })}
        </div>

        {/* trust chips */}
        <motion.ul
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 flex flex-wrap justify-center gap-3"
        >
          {TRUST.map((t) => (
            <li
              key={t}
              className="flex items-center gap-2 rounded-full border border-gold-400/30 bg-ivory/5 px-4 py-2 font-sans text-sm font-medium text-ivory/90 backdrop-blur-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400 shadow-[0_0_8px_rgba(255,190,90,0.8)]" />
              {t}
            </li>
          ))}
        </motion.ul>

        <Divider maroon className="mt-24" />
        {/* full-width banner image — breaks out of the max-w-7xl container to span the full viewport */}
      </div>
    </section>
  );
}