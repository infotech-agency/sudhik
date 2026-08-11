'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { faqs } from '@/data/faq';

interface FaqItem {
  question: string;
  answer: string;
}

export default function FAQ({ items }: { items?: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const list: FaqItem[] =
    items && items.length > 0
      ? items
      : faqs.map((f) => ({ question: f.q, answer: f.a }));

  return (
    <section id="faq" className="relative py-24 sm:py-32 bg-sand/30">
      <div className="absolute inset-0 bg-lotus-fade opacity-50 pointer-events-none" />
      <div className="relative mx-auto max-w-3xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Frequently Asked"
          hindiTitle="प्रश्न"
          title={
            <>
              Your <span className="text-saffron-gradient">Questions</span>, Answered
            </>
          }
        />

        <div className="mt-14 space-y-3">
          {list.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={f.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className={`rounded-2xl border transition-all duration-500 ${
                  isOpen
                    ? 'bg-white border-maroon-500/40 shadow-glow-soft'
                    : 'bg-white/70 border-gold-400/15 hover:border-maroon-500/30'
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className={`font-display font-semibold text-lg sm:text-xl transition-colors ${isOpen ? 'text-saffron-500' : 'text-black'}`}>
                    {f.question}
                  </span>
                  <span
                    className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 ${
                      isOpen
                        ? 'border-maroon-500 bg-maroon-500 text-ivory rotate-45'
                        : 'border-gold-400/30 text-maroon-500'
                    }`}
                  >
                    <Plus size={16} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 font-serif text-base sm:text-lg text-black leading-relaxed">
                        {f.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
