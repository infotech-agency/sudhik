'use client';
import { motion } from 'framer-motion';

interface DividerProps {
  className?: string;
  light?: boolean;
  maroon?: boolean;
  symbol?: 'lotus' | 'om' | 'kalash';
}

export default function Divider({
  className = '',
  light = false,
  maroon = false,
  symbol = 'lotus',
}: DividerProps) {
  return (
    <div className={`flex items-center justify-center gap-6 ${className}`}>
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className={`block h-px w-20 sm:w-32 bg-gold-line origin-right`}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className={light ? 'text-gold-300' : maroon ? 'text-maroon-500' : 'text-saffron-500'}
        aria-hidden
      >
        {symbol === 'lotus' && <Lotus />}
        {symbol === 'om' && <span className="font-deva text-2xl">ॐ</span>}
        {symbol === 'kalash' && <Kalash />}
      </motion.div>
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className={`block h-px w-20 sm:w-32 bg-gold-line origin-left`}
      />
    </div>
  );
}

function Lotus() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="drop-shadow-sm">
      <path
        d="M12 2c-1.5 2.5-1.5 5.5 0 8 1.5-2.5 1.5-5.5 0-8Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="currentColor"
        fillOpacity="0.18"
      />
      <path
        d="M12 22c1.5-2.5 1.5-5.5 0-8-1.5 2.5-1.5 5.5 0 8Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="currentColor"
        fillOpacity="0.18"
      />
      <path
        d="M2 12c2.5 1.5 5.5 1.5 8 0-2.5-1.5-5.5-1.5-8 0Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="currentColor"
        fillOpacity="0.18"
      />
      <path
        d="M22 12c-2.5 1.5-5.5 1.5-8 0 2.5-1.5 5.5-1.5 8 0Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="currentColor"
        fillOpacity="0.18"
      />
      <path
        d="M5 5c2 2 4 3.5 7 4-2-2-4-3.5-7-4ZM19 5c-2 2-4 3.5-7 4 2-2 4-3.5 7-4ZM5 19c2-2 4-3.5 7-4-2 2-4 3.5-7 4ZM19 19c-2-2-4-3.5-7-4 2 2 4 3.5 7 4Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="currentColor"
        fillOpacity="0.12"
      />
      <circle cx="12" cy="12" r="2" fill="currentColor" fillOpacity="0.5" />
    </svg>
  );
}

function Kalash() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="drop-shadow-sm">
      <path
        d="M9 3h6v2H9zM10 5h4v2h-4zM8 7h8v2H8zM7 9h10v10a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V9Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="currentColor"
        fillOpacity="0.18"
      />
      <circle cx="12" cy="14" r="1.5" fill="currentColor" fillOpacity="0.4" />
    </svg>
  );
}
