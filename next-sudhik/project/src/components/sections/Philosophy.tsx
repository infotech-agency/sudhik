

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
//               src="/product/product.png"
//               alt="Temple interior with diya lamps and sacred ambience"
//               className="absolute inset-0 w-full h-[116%] object-contain"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
//             <div className="absolute bottom-0 left-0 right-0 p-8">
//               <p className="font-deva text-3xl font-semibold text-gold-200">
//                 शुद्धि
//               </p>
//               <p className="font-serif text-lg font-medium text-ivory/80 mt-1">
//                 Purity — the first offering, before the prayer begins.
//               </p>
//               <p className="font-deva text-base sm:text-lg font-medium text-gold-200/90 mt-4 leading-relaxed border-t border-gold-400/25 pt-4">
//                 "जिस प्रकार माँ गंगा का पावन जल शुद्धता और आस्था का प्रतीक है,
//                 उसी भावना से SHUDDHIK™ हर पूजा स्थल की स्वच्छता को सेवा और
//                 श्रद्धा का एक पावन माध्यम मानता है।"
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
//             <p className="font-serif text-2xl sm:text-3xl font-medium leading-relaxed text-ivory/90">
//               In every temple, the first seva is silence. The wiping of marble
//               before the first diya is lit. The cleaning of the sanctum before
//               the first mantra is spoken.
//             </p>
//             <div className="my-8 flex items-center gap-4">
//               <span className="font-deva text-4xl text-gold-300">
//                 ॐ
//               </span>
//               <span className="h-px flex-1 bg-gold-line" />
//             </div>
//             <p className="font-serif text-xl sm:text-2xl font-medium leading-relaxed text-ivory/85">
//               For generations, this sacred act was performed with water, ash,
//               and the hands of the devoted. We asked a quiet question: could a
//               modern formulation honour that same shraddha — without the harsh,
//               chemical soul of an ordinary cleaner?
//             </p>
//             <p className="font-serif text-xl sm:text-2xl font-medium leading-relaxed text-ivory/85 mt-6">
//               SHUDDHIK is our answer. Chandan, kapur, guggal, tulsi and lotus —
//               blended with ahimsa, tested on the stones of real temples, and
//               offered to every mandir in Bharat.
//             </p>

//             <blockquote className="mt-10 pl-6 border-l-2 border-gold-400/50">
//               <p className="font-display italic text-3xl sm:text-4xl font-semibold text-gold-gradient leading-snug">
//                 "Cleanliness is the first prayer. Everything else follows."
//               </p>
//               <footer className="font-royal text-sm tracking-royal uppercase text-ivory/60 mt-4">
//                 — The SHUDDHIK Vrata
//               </footer>
//             </blockquote>
//           </motion.div>
//         </div>

//         {/* हमारे मूल्य — values */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, margin: '-80px' }}
//           transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
//           className="mt-24 sm:mt-32"
//         >
//           <p className="font-deva text-2xl sm:text-3xl font-semibold text-gold-gradient text-center">
//             हमारे मूल्य
//           </p>
//           <div className="mt-10 grid sm:grid-cols-3 gap-6">
//             {[
//               {
//                 icon: '🪔',
//                 title: 'श्रद्धा',
//                 desc: 'हमारा हर उत्पाद इस भावना से बनता है कि वह पूजा स्थल की सेवा में उपयोग होगा।',
//               },
//               {
//                 icon: '🤍',
//                 title: 'शुद्धता',
//                 desc: 'pH संतुलित, सौम्य और सुरक्षित संरचना — मूर्तियों, मार्बल और श्रद्धा के लिए।',
//               },
//               {
//                 icon: '🌿',
//                 title: 'प्रकृति',
//                 desc: 'बायोडिग्रेडेबल संरचना, ताकि सेवा करते हुए प्रकृति का भी सम्मान बना रहे।',
//               },
//             ].map((value) => (
//               <div
//                 key={value.title}
//                 className="rounded-2xl border border-gold-400/20 bg-ivory/5 px-6 py-8 text-center backdrop-blur-sm"
//               >
//                 <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold-400/10 text-2xl">
//                   {value.icon}
//                 </span>
//                 <p className="font-deva text-xl font-semibold text-gold-200 mt-4">
//                   {value.title}
//                 </p>
//                 <p className="font-serif text-sm text-ivory/70 mt-2 leading-relaxed">
//                   {value.desc}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

'use client';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

// Deterministic (no Math.random) so SSR and client always match
const EMBERS = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: (i * 29 + 7) % 100,
  size: 2 + (i % 3),
  duration: 10 + (i % 5) * 2.5,
  delay: (i * 1.1) % 9,
  drift: (i % 2 ? 1 : -1) * (10 + (i % 4) * 6),
}));

const INGREDIENTS = [
  { hi: 'चंदन', en: 'Chandan' },
  { hi: 'कपूर', en: 'Kapur' },
  { hi: 'गुग्गल', en: 'Guggal' },
  { hi: 'तुलसी', en: 'Tulsi' },
  { hi: 'कमल', en: 'Lotus' },
];

const VALUES = [
  {
    icon: '🪔',
    title: 'श्रद्धा',
    desc: 'हमारा हर उत्पाद इस भावना से बनता है कि वह पूजा स्थल की सेवा में उपयोग होगा।',
  },
  {
    icon: '🤍',
    title: 'शुद्धता',
    desc: 'pH संतुलित, सौम्य और सुरक्षित संरचना — मूर्तियों, मार्बल और श्रद्धा के लिए।',
  },
  {
    icon: '🌿',
    title: 'प्रकृति',
    desc: 'बायोडिग्रेडेबल संरचना, ताकि सेवा करते हुए प्रकृति का भी सम्मान बना रहे।',
  },
];

/* ------------------------------------------------------------------ */
/*  Decorative pieces                                                  */
/* ------------------------------------------------------------------ */

// Slow-turning line-art mandala that sits behind the product arch
function Mandala({ className, reduce }: { className?: string; reduce: boolean | null }) {
  return (
    <motion.div
      aria-hidden
      className={className}
      animate={reduce ? undefined : { rotate: 360 }}
      transition={{ duration: 140, repeat: Infinity, ease: 'linear' }}
    >
      <svg
        viewBox="-100 -100 200 200"
        className="h-full w-full"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.4"
      >
        {[96, 78, 52, 26].map((r) => (
          <circle key={r} r={r} />
        ))}
        {Array.from({ length: 16 }).map((_, i) => (
          <ellipse key={`o${i}`} cx="0" cy="-65" rx="8" ry="13" transform={`rotate(${i * 22.5})`} />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <ellipse key={`i${i}`} cx="0" cy="-39" rx="7" ry="13" transform={`rotate(${i * 45 + 22.5})`} />
        ))}
        {Array.from({ length: 48 }).map((_, i) => (
          <circle
            key={`d${i}`}
            r="0.9"
            cy="-87"
            fill="currentColor"
            stroke="none"
            transform={`rotate(${i * 7.5})`}
          />
        ))}
      </svg>
    </motion.div>
  );
}

// Round seal with turning text, pinned to the corner of the arch
function Seal({ reduce }: { reduce: boolean | null }) {
  return (
    <div className="relative h-28 w-28 sm:h-32 sm:w-32" aria-hidden>
      <motion.svg
        viewBox="0 0 120 120"
        className="absolute inset-0 h-full w-full text-gold-300"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        <defs>
          <path id="seal-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
        </defs>
        <text fontSize="10.5" fill="currentColor" className="font-royal">
          <textPath href="#seal-circle" textLength="286" lengthAdjust="spacing">
            SEVA • SHRADDHA • SHUDDHI •{' '}
          </textPath>
        </text>
      </motion.svg>
      <div className="absolute inset-3 flex items-center justify-center rounded-full border border-gold-400/50 bg-ink text-2xl shadow-premium">
        🪔
      </div>
    </div>
  );
}

// Thin line – small lotus – thin line
function Ornament() {
  return (
    <div className="flex items-center justify-center gap-4" aria-hidden>
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold-400/60 sm:w-32" />
      <svg viewBox="-12 -12 24 24" className="h-6 w-6 text-gold-300" fill="none" stroke="currentColor" strokeWidth="0.9">
        {Array.from({ length: 8 }).map((_, i) => (
          <ellipse key={i} cx="0" cy="-6" rx="2.6" ry="5.2" transform={`rotate(${i * 45})`} />
        ))}
        <circle r="1.6" fill="currentColor" stroke="none" />
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold-400/60 sm:w-32" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */

export default function Philosophy() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
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

      {/* faint stars */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-1 h-1 rounded-full bg-gold-300/60"
            style={{ left: `${(i * 53) % 100}%`, top: `${(i * 37) % 100}%` }}
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </div>

      {/* embers rising like sparks from a diya */}
      {!reduce && (
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          {EMBERS.map((e) => (
            <motion.span
              key={e.id}
              className="absolute rounded-full bg-gold-300 shadow-[0_0_8px_2px_rgba(255,190,90,0.55)]"
              style={{ left: `${e.left}%`, width: e.size, height: e.size }}
              initial={{ top: '105%', opacity: 0 }}
              animate={{
                top: ['105%', '-5%'],
                x: [0, e.drift, -e.drift * 0.6, e.drift * 0.3],
                opacity: [0, 0.9, 0.9, 0],
              }}
              transition={{ duration: e.duration, delay: e.delay, repeat: Infinity, ease: 'linear' }}
            />
          ))}
        </div>
      )}

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
          {/* Imagery side – a temple-niche arch with mandala + seal */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <Mandala
              reduce={reduce}
              className="pointer-events-none absolute -inset-10 sm:-inset-20 text-gold-400/20"
            />

            <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2rem] border border-gold-400/25 bg-ink shadow-premium">
              {/* lamp-light glow behind the bottle */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(60% 50% at 50% 45%, rgba(255,170,60,0.28), transparent 70%)',
                }}
              />
              <motion.img
                style={{ y }}
                src="/product/product.png"
                alt="Temple interior with diya lamps and sacred ambience"
                className="absolute inset-0 w-full h-[116%] object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
              {/* inner frame – arch within arch */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-3 rounded-t-[999px] rounded-b-[1.5rem] border border-gold-400/30"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 pb-10">
                <p className="font-deva text-3xl font-semibold text-gold-200">शुद्धि</p>
                <p className="font-serif text-lg font-medium text-ivory/80 mt-1">
                  Purity — the first offering, before the prayer begins.
                </p>
                <p className="font-deva text-base sm:text-lg font-medium text-gold-200/90 mt-4 leading-relaxed border-t border-gold-400/25 pt-4">
                  “जिस प्रकार माँ गंगा का पावन जल शुद्धता और आस्था का प्रतीक है, उसी भावना से
                  SHUDDHIK™ हर पूजा स्थल की स्वच्छता को सेवा और श्रद्धा का एक पावन माध्यम मानता
                  है।”
                </p>
              </div>
            </div>

            <div className="absolute -top-4 -right-2 z-20 sm:-top-6 sm:-right-8">
              <Seal reduce={reduce} />
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
            <p className="font-serif text-2xl sm:text-3xl font-medium leading-relaxed text-ivory/90">
              In every temple, the first seva is silence. The wiping of marble before the first diya
              is lit. The cleaning of the sanctum before the first mantra is spoken.
            </p>
            <div className="my-8 flex items-center gap-4">
              <span className="font-deva text-4xl text-gold-300">ॐ</span>
              <span className="h-px flex-1 bg-gold-line" />
            </div>
            <p className="font-serif text-xl sm:text-2xl font-medium leading-relaxed text-ivory/85">
              For generations, this sacred act was performed with water, ash, and the hands of the
              devoted. We asked a quiet question: could a modern formulation honour that same
              shraddha — without the harsh, chemical soul of an ordinary cleaner?
            </p>
            <p className="font-serif text-xl sm:text-2xl font-medium leading-relaxed text-ivory/85 mt-6">
              SHUDDHIK is our answer. Chandan, kapur, guggal, tulsi and lotus — blended with ahimsa,
              tested on the stones of real temples, and offered to every mandir in Bharat.
            </p>

            <blockquote className="relative mt-10 pl-6 border-l-2 border-gold-400/50">
              <span
                aria-hidden
                className="pointer-events-none absolute -top-8 left-3 select-none font-display text-8xl leading-none text-gold-400/15"
              >
                “
              </span>
              <p className="relative font-display italic text-3xl sm:text-4xl font-semibold text-gold-gradient leading-snug">
                “Cleanliness is the first prayer. Everything else follows.”
              </p>
              <footer className="font-royal text-sm tracking-royal uppercase text-ivory/60 mt-4">
                — The SHUDDHIK Vrata
              </footer>
            </blockquote>
          </motion.div>
        </div>

        {/* Ingredients – five offerings strung on one thread, like a mala */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-24 sm:mt-32"
        >
          <p className="font-deva text-2xl sm:text-3xl font-semibold text-gold-gradient text-center">
            पाँच पवित्र द्रव्य
          </p>
          <p className="font-serif text-base text-ivory/60 text-center mt-2">
            Five sacred offerings, blended with ahimsa.
          </p>

          <div className="relative mt-12">
            <span
              aria-hidden
              className="absolute left-[8%] right-[8%] top-12 hidden h-px bg-gold-line opacity-60 sm:block"
            />
            <ul className="relative grid grid-cols-3 gap-y-10 sm:grid-cols-5">
              {INGREDIENTS.map((item) => (
                <li key={item.en} className="group flex flex-col items-center">
                  <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-gold-400/40 bg-[#241810] transition-all duration-500 group-hover:scale-105 group-hover:border-gold-300 group-hover:shadow-[0_0_28px_rgba(255,190,90,0.3)]">
                    <span
                      aria-hidden
                      className="absolute inset-1.5 rounded-full border border-dashed border-gold-400/30 transition-transform duration-[900ms] group-hover:rotate-90"
                    />
                    <span className="font-deva text-2xl font-semibold text-gold-200">{item.hi}</span>
                  </div>
                  <span className="mt-3 font-serif text-sm text-ivory/70">{item.en}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <div className="mt-20 sm:mt-24">
          <Ornament />
        </div>

        {/* हमारे मूल्य — values */}
        <div className="mt-16 sm:mt-20">
          <p className="font-deva text-2xl sm:text-3xl font-semibold text-gold-gradient text-center">
            हमारे मूल्य
          </p>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
            className="mt-10 grid sm:grid-cols-3 gap-6"
          >
            {VALUES.map((value) => (
              <motion.div
                key={value.title}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
                }}
                whileHover={reduce ? undefined : { y: -6 }}
                className="group relative rounded-2xl border border-gold-400/20 bg-ivory/5 px-6 py-8 text-center backdrop-blur-sm transition-[border-color,box-shadow] duration-500 hover:border-gold-300/60 hover:shadow-[0_18px_50px_-20px_rgba(255,170,60,0.35)]"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-8 top-0 h-px bg-gold-line opacity-60 transition-opacity duration-500 group-hover:opacity-100"
                />
                <span className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold-400/10 text-2xl">
                  <span
                    aria-hidden
                    className="absolute -inset-1.5 rounded-full border border-dashed border-gold-400/30 transition-transform duration-[1200ms] group-hover:rotate-180"
                  />
                  {value.icon}
                </span>
                <p className="font-deva text-xl font-semibold text-gold-200 mt-4">{value.title}</p>
                <p className="font-serif text-sm text-ivory/70 mt-2 leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}