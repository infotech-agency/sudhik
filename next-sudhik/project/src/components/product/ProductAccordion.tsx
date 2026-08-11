'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import type { Product } from '@/lib/types';
import { splitList } from '@/lib/product-utils';

type Item = { title: string; content: React.ReactNode };

export default function ProductAccordion({ product }: { product: Product }) {
  const [open, setOpen] = useState<string | null>('description');

  const items: Item[] = [
    {
      title: 'Description',
      content: <p className="font-serif text-base sm:text-lg text-ink/70 leading-relaxed">{product.description}</p>,
    },
    {
      title: 'Benefits',
      content: (
        <ul className="space-y-2.5">
          {splitList(product.benefits).map((b) => (
            <li key={b} className="flex items-start gap-3 font-serif text-base sm:text-lg text-ink/70">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gold-400 shrink-0" />
              {b}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Ingredients',
      content: <p className="font-serif text-base sm:text-lg text-ink/70 leading-relaxed">{product.ingredients}</p>,
    },
    {
      title: 'How to Use',
      content: <p className="font-serif text-base sm:text-lg text-ink/70 leading-relaxed">{product.howToUse}</p>,
    },
    {
      title: 'Specifications',
      content: <p className="font-serif text-base sm:text-lg text-ink/70 leading-relaxed">{product.specifications}</p>,
    },
    {
      title: 'Shipping',
      content: <p className="font-serif text-base sm:text-lg text-ink/70 leading-relaxed">{product.shippingInfo || 'Ships in 1–2 business days. Free shipping across India.'}</p>,
    },
    {
      title: 'FAQ',
      content:
        product.faqs && product.faqs.length > 0 ? (
          <ul className="space-y-4">
            {product.faqs.map((f, i) => (
              <li key={i}>
                <p className="font-display text-lg text-ink">{f.question}</p>
                <p className="font-serif text-sm text-ink/65 mt-1">{f.answer}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="font-serif text-ink/55">No FAQs yet for this product.</p>
        ),
    },
  ];

  return (
    <div className="divide-y divide-gold-400/15 border-y border-gold-400/20">
      {items.map((item) => {
        const isOpen = open === item.title;
        return (
          <div key={item.title}>
            <button
              onClick={() => setOpen(isOpen ? null : item.title)}
              className="w-full flex items-center justify-between gap-4 py-5 text-left group"
              aria-expanded={isOpen}
            >
              <span className={`font-display text-xl sm:text-2xl transition-colors ${isOpen ? 'text-saffron-500' : 'text-ink group-hover:text-saffron-500'}`}>{item.title}</span>
              <span className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all ${isOpen ? 'border-saffron-500 bg-saffron-500 text-ivory rotate-180' : 'border-gold-400/30 text-saffron-500'}`}>
                {isOpen ? <Minus size={16} /> : <Plus size={16} />}
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
                  <div className="pb-6 pr-12">{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
