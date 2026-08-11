// 'use client';
// import { type ButtonHTMLAttributes, type ReactNode } from 'react';
// import { motion } from 'framer-motion';

// type Variant = 'primary' | 'gold' | 'outline' | 'ghost' | 'dark' | 'maroon';
// type Size = 'sm' | 'md' | 'lg';

// interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
//   variant?: Variant;
//   size?: Size;
//   children: ReactNode;
//   fullWidth?: boolean;
// }

// const base =
//   'relative inline-flex items-center justify-center gap-2 font-sans font-semibold tracking-royal-sm uppercase rounded-full transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed select-none';

// const variants: Record<Variant, string> = {
//   primary:
//     'bg-gradient-to-r from-saffron-500 to-saffron-600 text-ivory shadow-gold hover:shadow-glow hover:from-saffron-600 hover:to-saffron-700',
//   gold:
//     'bg-gradient-to-r from-gold-400 to-gold-500 text-ink shadow-glow hover:shadow-glow-soft hover:from-gold-300 hover:to-gold-400',
//   outline:
//     'border border-gold-400/60 text-ink hover:bg-gold-400/10 hover:border-gold-400 bg-transparent',
//   ghost: 'text-ink hover:text-saffron-500 bg-transparent',
//   dark: 'bg-ink text-ivory hover:bg-ink/90 shadow-premium',
//   maroon:
//     'bg-gradient-to-r from-maroon-500 to-maroon-600 text-ivory shadow-gold hover:shadow-glow hover:from-maroon-600 hover:to-maroon-700',
// };

// const sizes: Record<Size, string> = {
//   sm: 'text-xs px-5 py-2.5',
//   md: 'text-sm px-7 py-3.5',
//   lg: 'text-sm px-9 py-4',
// };

// export default function Button({
//   variant = 'primary',
//   size = 'md',
//   children,
//   fullWidth,
//   className = '',
//   ...props
// }: ButtonProps) {
//   return (
//     <motion.button
//       whileHover={{ scale: 1.03 }}
//       whileTap={{ scale: 0.97 }}
//       transition={{ type: 'spring', stiffness: 400, damping: 18 }}
//       className={`${base} ${variants[variant]} ${sizes[size]} ${
//         fullWidth ? 'w-full' : ''
//       } ${className}`}
//       {...(props as object)}
//     >
//       {children}
//     </motion.button>
//   );
// }

'use client';
import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { motion } from 'framer-motion';

type Variant = 'primary' | 'gold' | 'outline' | 'ghost' | 'dark' | 'maroon';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  fullWidth?: boolean;
}

// place the uploaded PNG at public/backgrounds/button.png (or update this path)
const primaryBgImage = '/backgrounds/button.png';
// sampled from the image's own fill so any gap is invisible
const primaryFallbackColor = '#5c161a';

const base =
  'relative inline-flex items-center justify-center gap-2 font-sans font-semibold tracking-royal-sm uppercase transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed select-none overflow-hidden';

const variants: Record<Variant, string> = {
  // rounded-none: this variant uses a rectangular textured image, rounding would clip its corners.
  // backgroundSize below (set inline) stretches the image to the button's exact width.
  primary: 'rounded-none text-gold-200 shadow-gold hover:shadow-glow bg-no-repeat bg-center',
  gold:
    'rounded-full bg-gradient-to-r from-gold-400 to-gold-500 text-ink shadow-glow hover:shadow-glow-soft hover:from-gold-300 hover:to-gold-400',
  outline:
    'rounded-full border border-gold-400/60 text-ink hover:bg-gold-400/10 hover:border-gold-400 bg-transparent',
  ghost: 'rounded-full text-ink hover:text-saffron-500 bg-transparent',
  dark: 'rounded-full bg-ink text-ivory hover:bg-ink/90 shadow-premium',
  maroon:
    'rounded-full bg-gradient-to-r from-maroon-500 to-maroon-600 text-ivory shadow-gold hover:shadow-glow hover:from-maroon-600 hover:to-maroon-700',
};

const sizes: Record<Size, string> = {
  sm: 'text-xs px-6 py-3',
  md: 'text-sm px-8 py-4',
  lg: 'text-sm px-10 py-5',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth,
  className = '',
  style,
  ...props
}: ButtonProps) {
  const isPrimary = variant === 'primary';

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
      className={`${base} ${variants[variant]} ${sizes[size]} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      style={
        isPrimary
          ? {
              backgroundImage: `url(${primaryBgImage})`,
              // width always matches the button exactly (100%); height scales
              // proportionally with it, so the texture is never squeezed narrower
              // than the button — it always spans full width edge to edge.
              backgroundSize: '100% auto',
              backgroundPosition: 'center',
              backgroundColor: primaryFallbackColor,
              ...style,
            }
          : style
      }
      {...(props as object)}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}