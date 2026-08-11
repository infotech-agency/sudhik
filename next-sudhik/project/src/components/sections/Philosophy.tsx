// 'use client';
// import { motion } from 'framer-motion';
// import { useScroll, useTransform } from 'framer-motion';
// import { useRef } from 'react';
// import SectionHeading from '@/components/ui/SectionHeading';

// export default function Philosophy() {
//   const ref = useRef<HTMLDivElement>(null);
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ['start end', 'end start'],
//   });
//   const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

//   return (
//     <section
//       id="philosophy"
//       ref={ref}
//       className="relative py-24 sm:py-32 bg-gradient-to-b from-ink via-[#241810] to-ink text-ivory overflow-hidden"
//     >
//       <div className="absolute inset-0 bg-temple-dark opacity-70 pointer-events-none" />
//       {/* faint stars / diya lights */}
//       <div className="absolute inset-0 pointer-events-none">
//         {Array.from({ length: 18 }).map((_, i) => (
//           <motion.span
//             key={i}
//             className="absolute w-1 h-1 rounded-full bg-gold-300/60"
//             style={{
//               left: `${(i * 53) % 100}%`,
//               top: `${(i * 37) % 100}%`,
//             }}
//             animate={{ opacity: [0.2, 0.8, 0.2] }}
//             transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: i * 0.3 }}
//           />
//         ))}
//       </div>

//       <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
//         <SectionHeading
//           light
//           eyebrow="Our Philosophy"
//           hindiTitle="हमारा दर्शन"
//           title={
//             <>
//               Purity Is Not a Task. <br className="hidden sm:block" />
//               It Is <span className="text-gold-gradient">Seva.</span>
//             </>
//           }
//         />

//         <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mt-20">
//           {/* Imagery side */}
//           <motion.div
//             initial={{ opacity: 0, x: -40 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true, margin: '-80px' }}
//             transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
//             className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-gold-400/25 shadow-premium"
//           >
//             <motion.img
//               style={{ y }}
//               src="https://images.pexels.com/photos/2902488/pexels-photo-2902488.jpeg?auto=compress&cs=tinysrgb&w=1200"
//               alt="Temple interior with diya lamps and sacred ambience"
//               className="absolute inset-0 w-full h-[116%] object-cover"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
//             <div className="absolute bottom-0 left-0 right-0 p-8">
//               <p className="font-deva text-2xl text-gold-200">शुद्धि</p>
//               <p className="font-serif text-ivory/70 mt-1">
//                 Purity — the first offering, before the prayer begins.
//               </p>
//             </div>
//           </motion.div>

//           {/* Text side */}
//           <motion.div
//             initial={{ opacity: 0, x: 40 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true, margin: '-80px' }}
//             transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
//             className="flex flex-col"
//           >
//             <p className="font-serif text-xl sm:text-2xl leading-relaxed text-ivory/85">
//               In every temple, the first seva is silence. The wiping of marble
//               before the first diya is lit. The cleaning of the sanctum before
//               the first mantra is spoken.
//             </p>
//             <div className="my-8 flex items-center gap-4">
//               <span className="font-deva text-3xl text-gold-300">ॐ</span>
//               <span className="h-px flex-1 bg-gold-line" />
//             </div>
//             <p className="font-serif text-lg sm:text-xl leading-relaxed text-ivory/70">
//               For generations, this sacred act was performed with water, ash,
//               and the hands of the devoted. We asked a quiet question: could a
//               modern formulation honour that same shraddha — without the harsh,
//               chemical soul of an ordinary cleaner?
//             </p>
//             <p className="font-serif text-lg sm:text-xl leading-relaxed text-ivory/70 mt-6">
//               SHUDDHIK is our answer. Chandan, kapur, guggal, tulsi and lotus —
//               blended with ahimsa, tested on the stones of real temples, and
//               offered to every mandir in Bharat.
//             </p>

//             <blockquote className="mt-10 pl-6 border-l-2 border-gold-400/50">
//               <p className="font-display italic text-2xl sm:text-3xl text-gold-gradient leading-snug">
//                 “Cleanliness is the first prayer. Everything else follows.”
//               </p>
//               <footer className="font-royal text-xs tracking-royal uppercase text-ivory/50 mt-4">
//                 — The SHUDDHIK Vrata
//               </footer>
//             </blockquote>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }


'use client';
import { motion } from 'framer-motion';
import { useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';

export default function Philosophy() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section
      id="philosophy"
      ref={ref}
      className="relative py-24 sm:py-32 bg-gradient-to-b from-ink via-[#241810] to-ink text-ivory overflow-hidden"
    >
      <div className="absolute inset-0 bg-temple-dark opacity-70 pointer-events-none" />
      {/* faint stars / diya lights */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-1 h-1 rounded-full bg-gold-300/60"
            style={{
              left: `${(i * 53) % 100}%`,
              top: `${(i * 37) % 100}%`,
            }}
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          light
          eyebrow="Our Philosophy"
          hindiTitle="हमारा दर्शन"
          title={
            <>
              Purity Is Not a Task. <br className="hidden sm:block" />
              It Is <span className="text-gold-gradient">Seva.</span>
            </>
          }
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mt-20">
          {/* Imagery side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-gold-400/25 shadow-premium"
          >
            <motion.img
              style={{ y }}
              src="/assets/producthero.png"
              alt="Temple interior with diya lamps and sacred ambience"
              className="absolute inset-0 w-full h-[116%] object-contain"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="font-deva text-3xl font-semibold text-gold-200"> {/* ✅ bigger + bold */}
                शुद्धि
              </p>
              <p className="font-serif text-lg font-medium text-ivory/80 mt-1"> {/* ✅ bigger + bold + brighter */}
                Purity — the first offering, before the prayer begins.
              </p>
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col"
          >
            <p className="font-serif text-2xl sm:text-3xl font-medium leading-relaxed text-ivory/90"> {/* ✅ larger + bolder + brighter */}
              In every temple, the first seva is silence. The wiping of marble
              before the first diya is lit. The cleaning of the sanctum before
              the first mantra is spoken.
            </p>
            <div className="my-8 flex items-center gap-4">
              <span className="font-deva text-4xl text-gold-300"> {/* ✅ bigger */}
                ॐ
              </span>
              <span className="h-px flex-1 bg-gold-line" />
            </div>
            <p className="font-serif text-xl sm:text-2xl font-medium leading-relaxed text-ivory/85"> {/* ✅ larger + bolder + brighter */}
              For generations, this sacred act was performed with water, ash,
              and the hands of the devoted. We asked a quiet question: could a
              modern formulation honour that same shraddha — without the harsh,
              chemical soul of an ordinary cleaner?
            </p>
            <p className="font-serif text-xl sm:text-2xl font-medium leading-relaxed text-ivory/85 mt-6"> {/* ✅ larger + bolder + brighter */}
              SHUDDHIK is our answer. Chandan, kapur, guggal, tulsi and lotus —
              blended with ahimsa, tested on the stones of real temples, and
              offered to every mandir in Bharat.
            </p>

            <blockquote className="mt-10 pl-6 border-l-2 border-gold-400/50">
              <p className="font-display italic text-3xl sm:text-4xl font-semibold text-gold-gradient leading-snug"> {/* ✅ larger + bolder */}
                “Cleanliness is the first prayer. Everything else follows.”
              </p>
              <footer className="font-royal text-sm tracking-royal uppercase text-ivory/60 mt-4"> {/* ✅ larger + brighter */}
                — The SHUDDHIK Vrata
              </footer>
            </blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
}