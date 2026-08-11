'use client';
import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  hindiTitle?: string;
  // subtitle?: string;
  subtitle?: ReactNode;
  align?: 'center' | 'left';
  light?: boolean;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  hindiTitle,
  subtitle,
  align = 'center',
  light = false,
  className = '',
}: SectionHeadingProps) {
  const isCenter = align === 'center';
  return (
    <div
      className={`flex flex-col ${
        isCenter ? 'items-center text-center' : 'items-start text-left'
      } ${className}`}
    >
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className={`font-royal text-[11px] sm:text-xs tracking-royal uppercase mb-5 ${
            light ? 'text-gold-300' : 'text-saffron-500'
          }`}
        >
          {eyebrow}
        </motion.span>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.1] ${
          light ? 'text-ivory' : 'text-ink'
        }`}
      >
        {title}
      </motion.h2>

      {hindiTitle && (
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className={`font-deva text-lg sm:text-xl mt-3 ${
            light ? 'text-gold-200/80' : 'text-saffron-600/80'
          }`}
        >
          {hindiTitle}
        </motion.span>
      )}

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={`h-px bg-gold-line mt-7 ${
          isCenter ? 'w-24' : 'w-20'
        }`}
        style={{ transformOrigin: isCenter ? 'center' : 'left' }}
      />

      {subtitle && (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className={`mt-6 max-w-2xl font-serif text-lg sm:text-xl leading-relaxed ${
            light ? 'text-ivory/70' : 'text-ink/70'
          }`}
        >
          {subtitle}
        </motion.div>
      )}
    </div>
  );
}
