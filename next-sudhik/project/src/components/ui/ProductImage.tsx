import { productImage, productImageAlt } from '@/data/product';
import Image from 'next/image';

interface ProductImageProps {
  className?: string;
  aura?: boolean;
  float?: boolean;
  /** image url override (defaults to the primary product image) */
  src?: string;
  alt?: string;
}

/**
 * Reusable product image used across hero, CTA, cart, checkout and gallery.
 * Replaces the earlier hand-drawn SVG bottle with real photography that can
 * be swapped for the user's own product shots later.
 */
export default function ProductImage({
  className = '',
  aura = false,
  float = false,
  src = productImage,
  alt = productImageAlt,
}: ProductImageProps) {
  return (
    <div className={`relative ${className}`}>
      {aura && (
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <div className="h-[80%] w-[80%] rounded-full bg-gold-radial animate-auraPulse" />
          <div
            className="absolute h-[60%] w-[60%] rounded-full bg-lotus-fade animate-auraPulse"
            style={{ animationDelay: '1.5s' }}
          />
        </div>
      )}
      {/* <Image
        src={src}
        alt={alt}
        className={`w-full h-full object-contain drop-shadow-premium ${float ? 'animate-floatY' : ''}`}
        draggable={false}
      /> */}
      <Image
  src={src}
  alt={alt}
  width={600}
  height={600}
  className={`w-full h-auto object-contain drop-shadow-premium ${float ? 'animate-floatY' : ''}`}
  draggable={false}
  priority
/>
    </div>
  );
}
