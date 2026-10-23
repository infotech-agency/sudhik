


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
//                     {/* Step number circle */}
//                     <div className="w-12 h-12 rounded-full bg-gradient-to-br from-saffron-500 to-maroon-500 text-ivory font-royal text-xl font-bold flex items-center justify-center shadow-gold"> {/* ✅ bigger & bold */}
//                       {s.step}
//                     </div>
//                     {/* Icon box */}
//                     <div className="w-10 h-10 rounded-xl bg-gold-50 border border-gold-400/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
//                       <Icon size={18} className="text-saffron-500" strokeWidth={1.5} />
//                     </div>
//                   </div>
//                   <h3 className="font-display text-2xl font-bold text-ink"> {/* ✅ bigger & bold */}
//                     {s.title}
//                   </h3>
//                   <p className="font-serif text-lg sm:text-xl font-medium text-black leading-relaxed mt-2"> {/* ✅ bigger + bold + darker */}
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
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import { getIcon } from '@/components/ui/iconMap';
import { howToSteps } from '@/data/content';

// A node counts as "reached" once it is in the upper ~55% of the screen
const NODE_VIEWPORT = { once: false, margin: '0px 0px -45% 0px' } as const;
const LIT_GLOW = 'shadow-[0_0_24px_6px_rgba(255,166,64,0.45)]';

export default function HowToUse() {
  const listRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // The gold thread fills as you read down the steps
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 70%', 'end 60%'],
  });
  const spring = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const fill = reduce ? scrollYProgress : spring;

  return (
    <section
      id="how-to-use"
      className="relative py-24 sm:py-32 bg-gradient-to-b from-sand/40 to-ivory overflow-hidden scroll-mt-24"
    >
      <div className="absolute inset-0 bg-gold-radial opacity-40 pointer-events-none" />
      <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
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

        <div ref={listRef} className="relative mt-16 pb-14">
          {/* the thread: dim track + gold fill that follows your scroll */}
          <div
            aria-hidden
            className="absolute bottom-12 left-5 top-0 w-[2px] -translate-x-1/2 bg-gold-400/25 md:left-1/2"
          >
            <motion.div
              style={{ scaleY: fill }}
              className="absolute inset-0 origin-top bg-gradient-to-b from-saffron-500 via-gold-400 to-maroon-500"
            />
          </div>

          <ol className="relative list-none">
            {howToSteps.map((s, i) => {
              const Icon = getIcon(s.icon);
              const left = i % 2 === 0; // even steps sit left of the thread on desktop

              const pointer = left
                ? '-left-2 border-b border-l md:left-auto md:-right-2 md:border-b-0 md:border-l-0 md:border-r md:border-t'
                : '-left-2 border-b border-l';

              return (
                <li
                  key={s.step}
                  className="relative mb-8 pl-14 md:mb-0 md:-mt-12 md:grid md:grid-cols-2 md:pl-0 md:first:mt-0"
                >
                  {/* numbered node – unlit until the thread reaches it */}
                  <div className="absolute left-5 top-8 z-10 h-12 w-12 -translate-x-1/2 md:left-1/2">
                    <div className="flex h-full w-full items-center justify-center rounded-full border border-gold-400/40 bg-white font-royal text-xl font-bold text-gold-400/70">
                      {s.step}
                    </div>
                    <motion.div
                      aria-hidden
                      initial={{ opacity: 0, scale: 0.6 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={NODE_VIEWPORT}
                      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                      className={`absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-br from-saffron-500 to-maroon-500 font-royal text-xl font-bold text-ivory ${LIT_GLOW}`}
                    >
                      {s.step}
                    </motion.div>
                  </div>

                  <div className={left ? 'md:col-start-1 md:pr-12' : 'md:col-start-2 md:pl-12'}>
                    <motion.div
                      initial={{ opacity: 0, x: left ? -32 : 32 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="group relative rounded-3xl border border-gold-400/15 bg-white p-7 lg:p-8 lift hover:border-gold-400/40 hover:shadow-premium"
                    >
                      {/* small arrow pointing at the thread */}
                      <span
                        aria-hidden
                        className={`absolute top-12 h-4 w-4 rotate-45 border-gold-400/15 bg-white transition-colors duration-500 group-hover:border-gold-400/40 ${pointer}`}
                      />

                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gold-400/30 bg-gold-50 transition-transform duration-500 group-hover:scale-110">
                          <Icon size={22} className="text-saffron-500" strokeWidth={1.5} />
                        </div>
                        <h3 className="font-display text-2xl font-bold text-ink">{s.title}</h3>
                      </div>
                      <p className="mt-4 font-serif text-lg font-medium leading-relaxed text-black sm:text-xl">
                        {s.description}
                      </p>
                    </motion.div>
                  </div>
                </li>
              );
            })}
          </ol>

          {/* end of the ritual – the final diya lights when the thread arrives */}
          <div aria-hidden className="absolute bottom-0 left-5 h-12 w-12 -translate-x-1/2 md:left-1/2">
            <div className="flex h-full w-full items-center justify-center rounded-full border border-gold-400/40 bg-white text-xl opacity-60">
              🪔
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={NODE_VIEWPORT}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              className={`absolute inset-0 flex items-center justify-center rounded-full border border-gold-400/60 bg-ivory text-xl ${LIT_GLOW}`}
            >
              🪔
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}