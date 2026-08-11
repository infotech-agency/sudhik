

// "use client"

// import { motion } from 'framer-motion';
// import SectionHeading from '@/components/ui/SectionHeading';
// import Divider from '@/components/ui/Divider';
// import { getIcon } from '@/components/ui/iconMap';
// import { whyFeatures } from '@/data/content';

// export default function WhyShuddhik() {
//   return (
//     <section className="relative py-24 sm:py-32 bg-gradient-to-br from-maroon-600 to-maroon-700">
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
//             <p className='text-ivory'>Every detail is an act of devotion — from the botanicals we choose to the stones we protect.</p>
//             </>
//             }
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
//                     <Icon size={24} className="text-ivory" strokeWidth={1.5} />
//                   </div>
//                   <h3 className="font-display text-2xl text-ink mb-3">{f.title}</h3>
//                   <p className="font-sans text-base sm:text-lg text-ink/65 leading-relaxed">
//                     {f.description}
//                   </p>
//                 </div>

//                 {/* bottom hairline */}
//                 <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-0 group-hover:w-2/3 bg-gold-line transition-all duration-700" />
//               </motion.div>
//             );
//           })}
//         </div>

//         <Divider maroon className="mt-24" />
//       </div>
//     </section>
//   );
// }

// "use client"

// import { motion } from 'framer-motion';
// import SectionHeading from '@/components/ui/SectionHeading';
// import Divider from '@/components/ui/Divider';
// import { getIcon } from '@/components/ui/iconMap';
// import { whyFeatures } from '@/data/content';

// export default function WhyShuddhik() {
//   return (
//     <section className="relative py-24 sm:py-32 bg-gradient-to-br from-maroon-600 to-maroon-700">
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
//             <p className='text-ivory'>Every detail is an act of devotion — from the botanicals we choose to the stones we protect.</p>
//             </>
//             }
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
//                     <Icon size={24} className="text-ivory" strokeWidth={1.5} />
//                   </div>
//                   <h3 className="font-display text-2xl text-ink mb-3">{f.title}</h3>
//                   <p className="font-sans text-base sm:text-lg text-ink/65 leading-relaxed">
//                     {f.description}
//                   </p>
//                 </div>

//                 {/* bottom hairline */}
//                 <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-0 group-hover:w-2/3 bg-gold-line transition-all duration-700" />
//               </motion.div>
//             );
//           })}
//         </div>

//         {/* full-width banner image — breaks out of the max-w-7xl container to span the full viewport */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, margin: '-60px' }}
//           transition={{ duration: 0.7 }}
//           className="relative mt-16 lg:mt-20 left-1/2 right-1/2 -mx-[50vw] w-screen"
//         >
//           <img
//             src="/assets/temple_banner.png"
//             alt="SHUDDHIK devotion in practice"
//             className="w-full h-[280px] sm:h-[380px] lg:h-[460px] object-cover"
//           />
//         </motion.div>

//         <Divider maroon className="mt-24" />
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

export default function WhyShuddhik() {
  return (
    <section className="relative pt-24 sm:pt-32 bg-gradient-to-br from-maroon-600 to-maroon-700">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Why SHUDDHIK"
          hindiTitle="क्यों शुद्धिक"
          title={
            <>
              <p className='text-ivory'>Six Reasons It Is <span className="text-gold-400">Not Ordinary</span></p>
            </>
          }
          subtitle={
            <>
              <p className='text-ivory text-lg sm:text-xl font-medium'> {/* ✅ bigger + medium weight */}
                Every detail is an act of devotion — from the botanicals we choose to the stones we protect.
              </p>
            </>
          }
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-16">
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

                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-maroon-500 to-maroon-700 border border-gold-400/30 shadow-gold flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <Icon size={24} className="text-[#B28331]" strokeWidth={1.9} />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-ink mb-3"> {/* ✅ added bold */}
                    {f.title}
                  </h3>
                  <p className="font-sans text-lg sm:text-xl font-medium text-ink/90 leading-relaxed"> {/* ✅ bigger + bold + darker */}
                    {f.description}
                  </p>
                </div>

                {/* bottom hairline */}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-0 group-hover:w-2/3 bg-gold-line transition-all duration-700" />
              </motion.div>
            );
          })}
        </div>
<Divider maroon className="mt-24" />
        {/* full-width banner image — breaks out of the max-w-7xl container to span the full viewport */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="relative mt-16 lg:mt-20 left-1/2 right-1/2 -mx-[50vw] w-screen"
        >
          <img
            src="/assets/temple_banner.png"
            alt="SHUDDHIK devotion in practice"
            className="w-full h-[280px] sm:h-[380px] lg:h-[460px] object-cover"
          />
        </motion.div>

        
      </div>
    </section>
  );
}