


// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Share2,
//   Minus,
//   Plus,
//   Check,
//   Truck,
//   ShieldCheck,
//   Sparkles,
//   Droplet,
//   Leaf,
//   FlaskConical,
//   Ban,
//   Flame,
//   Wind,
// } from 'lucide-react';
// import Button from '@/components/ui/Button';
// import Stars from '@/components/ui/Stars';
// import { useBuyNow } from '@/lib/buynow-context';
// import { productImageUrls } from '@/lib/product-utils';
// import type { Product, Variant } from '@/lib/types';
// import AddToCartButton from '@/components/cart/AddToCartButton';

// interface PurchaseCardProps {
//   product: Product;
//   rating: number;
//   reviewCount: number;
// }

// // Highlight text ke content ke hisaab se sahi icon return karta hai
// const getHighlightIcon = (text: string) => {
//   const t = text.toLowerCase();

//   if (/dhoop|diya|soot|incense/.test(t)) return Flame;
//   if (/residue|oil mark|stain/.test(t)) return Droplet;
//   if (/gentle|marble|granite|surface/.test(t)) return ShieldCheck;
//   if (/ph[- ]?balanced|formula/.test(t)) return FlaskConical;
//   if (/non-?toxic|cruelty-?free|chemical.?free/.test(t)) return Ban;
//   if (/chandan|sandalwood|fragrance|scent|aroma/.test(t)) return Wind;
//   if (/natural|organic|herbal/.test(t)) return Leaf;

//   return Sparkles; // fallback
// };

// export default function PurchaseCard({ product, rating, reviewCount }: PurchaseCardProps) {
//   const router = useRouter();
//   const { open } = useBuyNow();

//   const hasVariants = (product.variants?.length ?? 0) > 0;

//   const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
//   const [qty, setQty] = useState(1);
//   const [shared, setShared] = useState(false);

//   const handleShare = async () => {
//     const shareData = {
//       title: product.title,
//       text: `Check out this product: ${product.title}`,
//       url: window.location.href,
//     };

//     try {
//       if (navigator.share) {
//         await navigator.share(shareData);
//         setShared(true);
//         setTimeout(() => setShared(false), 2000);
//       } else {
//         await navigator.clipboard.writeText(window.location.href);
//         setShared(true);
//         setTimeout(() => setShared(false), 2000);
//         alert('Link copied to clipboard!');
//       }
//     } catch (error) {
//       console.log('Share cancelled', error);
//     }
//   };

//   // Active price/stock depends on selected variant, falls back to base product
//   const activePrice = selectedVariant
//     ? selectedVariant.discountPrice || selectedVariant.price
//     : product.price;
//   const activeStock = selectedVariant ? selectedVariant.stock : product.stock;

//   const inStock = activeStock > 0;
//   const images = productImageUrls(product);

//   const handleSelectVariant = (v: Variant | null) => {
//     setSelectedVariant(v);
//     setQty(1); // reset qty jab variant change ho, taaki naye stock se conflict na ho
//   };

//   const handleBuyNow = () => {
//     open(
//       {
//         id: product._id,
//         title: product.title,
//         price: activePrice,
//         image: images[0],
//       },
//       qty,
//       null, // coupon ab checkout page pe apply hota hai
//       selectedVariant ? { label: selectedVariant.label, sku: selectedVariant.sku } : null
//     );
//     router.push('/checkout');
//   };

//   return (
//     <div className="lg:sticky lg:top-24 self-start">
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.7 }}
//         className="relative p-7 sm:p-8 rounded-3xl bg-white border border-gold-400/20 shadow-premium"
//       >
//         {/* Title */}
//         <h1 className="font-display text-4xl sm:text-5xl text-ink mt-5 leading-tight">
//           {product.title}
//         </h1>

//         {/* Rating */}
//         <div className="flex items-center gap-3 mt-4">
//           <Stars rating={rating} size={16} />
//           <span className="font-serif text-base font-medium text-ink/80">
//             {rating} · {reviewCount.toLocaleString('en-IN')} reviews
//           </span>
//         </div>

//         {/* Price */}
//         <div className="flex items-baseline gap-3 mt-6">
//           <span className="font-display text-4xl text-ink">₹{activePrice}</span>
//           <span className="font-royal text-xs tracking-royal uppercase text-ink/60">
//             MRP · incl. all taxes
//           </span>
//         </div>

//         {/* Shipping */}
//         <div className="flex items-center gap-2 mt-4 text-ink/80">
//           <Truck size={16} className="text-saffron-500" />
//           <span className="font-serif text-base font-medium">
//             Delivered in 3–6 days · Free shipping
//           </span>
//         </div>

//         {/* Variant selector */}
//         {hasVariants && (
//           <div className="mt-7">
//             <p className="font-royal text-xs tracking-royal uppercase text-ink/60 mb-3">
//               Choose Pack
//             </p>
//             <div className="flex flex-wrap gap-2.5">
//               {/* Base/Single option — represents product.price directly */}
//               <button
//                 type="button"
//                 disabled={product.stock <= 0}
//                 onClick={() => handleSelectVariant(null)}
//                 className={`px-4 py-3 rounded-xl border text-left transition-all min-w-[110px]
//                   ${
//                     !selectedVariant
//                       ? 'border-saffron-500 bg-saffron-50 ring-1 ring-saffron-500'
//                       : 'border-gold-400/25 bg-ivory hover:border-gold-400/60'
//                   }
//                   ${product.stock <= 0 ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
//                 `}
//               >
//                 <p className="text-lg font-semibold text-marron">Single Pack</p>
//               </button>

//               {product.variants!.map((v) => {
//                 const isSelected = selectedVariant?.label === v.label;
//                 const variantOutOfStock = v.stock <= 0;
//                 return (
//                   <button
//                     key={v.label}
//                     type="button"
//                     disabled={variantOutOfStock}
//                     onClick={() => handleSelectVariant(v)}
//                     className={`px-4 py-3 rounded-xl border text-left transition-all min-w-[110px]
//                       ${
//                         isSelected
//                           ? 'border-saffron-500 bg-saffron-50 ring-1 ring-saffron-500'
//                           : 'border-gold-400/25 bg-ivory hover:border-gold-400/60'
//                       }
//                       ${variantOutOfStock ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
//                     `}
//                   >
//                     <p className="text-lg font-semibold text-marron">{v.label}</p>
//                     {variantOutOfStock && (
//                       <p className="font-sans text-[11px] text-maroon-500 mt-0.5">Out of stock</p>
//                     )}
//                   </button>
//                 );
//               })}
//             </div>
//           </div>
//         )}

//         {/* Highlights */}
//         {product.benefits && (
//           <div className="mt-6">
//             <p className="font-royal text-xs tracking-royal uppercase text-ink/60 mb-3">
//               Highlights
//             </p>
//             <div className="flex flex-wrap gap-2">
//               {product.benefits
//                 .split(/\n|,/)
//                 .map((s) => s.trim())
//                 .filter(Boolean)
//                 .slice(0, 6)
//                 .map((h) => {
//                   const Icon = getHighlightIcon(h);
//                   return (
//                     <span
//                       key={h}
//                       className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold-50 border border-gold-400/25 font-sans text-sm font-medium text-ink/80"
//                     >
//                       <Icon size={13} className="text-gold-500 shrink-0" strokeWidth={2} />
//                       {h}
//                     </span>
//                   );
//                 })}
//             </div>
//           </div>
//         )}

//         {/* Quantity */}
//         <div className="mt-7">
//           <p className="font-royal text-xs tracking-royal uppercase text-ink/60 mb-3">
//             Quantity
//           </p>
//           <div className="inline-flex items-center rounded-full border border-gold-400/30 bg-ivory">
//             <button
//               onClick={() => setQty((q) => Math.max(1, q - 1))}
//               aria-label="Decrease quantity"
//               className="w-11 h-11 flex items-center justify-center text-ink hover:text-saffron-500 transition-colors"
//             >
//               <Minus size={16} />
//             </button>
//             <span className="w-12 text-center font-display text-xl text-ink">{qty}</span>
//             <button
//               onClick={() => setQty((q) => Math.min(activeStock, q + 1))}
//               aria-label="Increase quantity"
//               className="w-11 h-11 flex items-center justify-center text-ink hover:text-saffron-500 transition-colors"
//             >
//               <Plus size={16} />
//             </button>
//           </div>
//         </div>

//         {/* Buy Now */}
//         <div className="grid grid-cols-1 gap-3 mt-7">
//           <Button
//             variant="primary"
//             size="lg"
//             fullWidth
//             disabled={!inStock}
//             onClick={handleBuyNow}
//           >
//             Buy Now
//           </Button>
//         </div>

//         {/* Add to cart */}
//         <div className="grid grid-cols-1 gap-3 mt-7">
//           <AddToCartButton
//             productId={product._id}
//             hasVariants={false}
//             variantLabel={selectedVariant?.label ?? null}
//             quantity={qty}
//             outOfStock={!inStock}
//           />
//         </div>

//         {/* Share */}
//         <div className="flex items-center gap-3 mt-4">
//           <button
//             onClick={handleShare}
//             className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-full border border-gold-400/30 text-ink/70 hover:bg-gold-50 transition-all"
//           >
//             <AnimatePresence mode="wait">
//               {shared ? (
//                 <motion.span
//                   key="ok"
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   exit={{ scale: 0 }}
//                   className="flex items-center gap-2 text-saffron-500"
//                 >
//                   <Check size={16} />
//                   <span className="font-sans text-sm font-medium tracking-royal-sm uppercase">
//                     Shared
//                   </span>
//                 </motion.span>
//               ) : (
//                 <motion.span
//                   key="share"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   className="flex items-center gap-2"
//                 >
//                   <Share2 size={16} />
//                   <span className="font-sans text-sm font-medium tracking-royal-sm uppercase">
//                     Share
//                   </span>
//                 </motion.span>
//               )}
//             </AnimatePresence>
//           </button>
//         </div>

//         {/* Footer features */}
//         <div className="mt-7 pt-6 border-t border-gold-400/15 grid grid-cols-3 gap-2 text-center">
//           {[
//             { icon: ShieldCheck, label: 'Trusted Formula' },
//             { icon: Truck, label: 'Free Shipping' },
//             { icon: Check, label: 'Made in India' },
//           ].map(({ icon: Icon, label }) => (
//             <div key={label} className="flex flex-col items-center gap-1.5">
//               <Icon size={18} className="text-saffron-500" strokeWidth={1.5} />
//               <span className="font-sans text-sm font-medium text-ink/70 leading-tight">
//                 {label}
//               </span>
//             </div>
//           ))}
//         </div>
//       </motion.div>
//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Share2,
  Minus,
  Plus,
  Check,
  Truck,
  ShieldCheck,
  Sparkles,
  Droplet,
  Leaf,
  FlaskConical,
  Ban,
  Flame,
  Wind,
} from 'lucide-react';

// import Button from '@/components/ui/Button';
// import { useBuyNow } from '@/lib/buynow-context';

import Stars from '@/components/ui/Stars';
import type { Product, Variant } from '@/lib/types';
import AddToCartButton from '@/components/cart/AddToCartButton';

interface PurchaseCardProps {
  product: Product;
  rating: number;
  reviewCount: number;
}

const getHighlightIcon = (text: string) => {
  const t = text.toLowerCase();

  if (/dhoop|diya|soot|incense/.test(t)) return Flame;
  if (/residue|oil mark|stain/.test(t)) return Droplet;
  if (/gentle|marble|granite|surface/.test(t)) return ShieldCheck;
  if (/ph[- ]?balanced|formula/.test(t)) return FlaskConical;
  if (/non-?toxic|cruelty-?free|chemical.?free/.test(t)) return Ban;
  if (/chandan|sandalwood|fragrance|scent|aroma/.test(t)) return Wind;
  if (/natural|organic|herbal/.test(t)) return Leaf;

  return Sparkles;
};

export default function PurchaseCard({
  product,
  rating,
  reviewCount,
}: PurchaseCardProps) {
  const router = useRouter();

  // const { open } = useBuyNow();

  const hasVariants = (product.variants?.length ?? 0) > 0;

  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [qty, setQty] = useState(1);
  const [shared, setShared] = useState(false);

  const activePrice = selectedVariant
    ? selectedVariant.discountPrice || selectedVariant.price
    : product.price;

  const activeStock = selectedVariant
    ? selectedVariant.stock
    : product.stock;

  const inStock = activeStock > 0;

  const handleSelectVariant = (variant: Variant | null) => {
    setSelectedVariant(variant);
    setQty(1);
  };

  const handleShare = async () => {
    const shareData = {
      title: product.title,
      text: `Check out this product: ${product.title}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }

      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } catch (error) {
      console.log('Share cancelled', error);
    }
  };

  const handleAddedToCart = () => {
    router.push('/cart');
  };

  return (
    <div className="lg:sticky lg:top-24 self-start">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative p-7 sm:p-8 rounded-3xl bg-white border border-gold-400/20 shadow-premium"
      >
        {/* Title */}
        <h1 className="font-display text-4xl sm:text-5xl text-ink mt-5 leading-tight">
          {product.title}
        </h1>

        {/* Rating */}
        <div className="flex items-center gap-3 mt-4">
          <Stars rating={rating} size={16} />

          <span className="font-serif text-base font-medium text-ink/80">
            {rating} · {reviewCount.toLocaleString('en-IN')} reviews
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-3 mt-6">
          <span className="font-display text-4xl text-ink">
            ₹{activePrice}
          </span>

          <span className="font-royal text-xs tracking-royal uppercase text-ink/60">
            MRP · incl. all taxes
          </span>
        </div>

        {/* Shipping */}
        <div className="flex items-center gap-2 mt-4 text-ink/80">
          <Truck size={16} className="text-saffron-500" />

          <span className="font-serif text-base font-medium">
            Delivered in 3–6 days · Free shipping
          </span>
        </div>

        {/* Variant selector */}
        {hasVariants && (
          <div className="mt-7">
            <p className="font-royal text-xs tracking-royal uppercase text-ink/60 mb-3">
              Choose Pack
            </p>

            <div className="flex flex-wrap gap-2.5">
              <button
                type="button"
                disabled={product.stock <= 0}
                onClick={() => handleSelectVariant(null)}
                className={`px-4 py-3 rounded-xl border text-left transition-all min-w-[110px]
                  ${
                    !selectedVariant
                      ? 'border-saffron-500 bg-saffron-50 ring-1 ring-saffron-500'
                      : 'border-gold-400/25 bg-ivory hover:border-gold-400/60'
                  }
                  ${
                    product.stock <= 0
                      ? 'opacity-40 cursor-not-allowed'
                      : 'cursor-pointer'
                  }
                `}
              >
                <p className="text-lg font-semibold text-marron">
                  Single Pack
                </p>
              </button>

              {product.variants?.map((variant) => {
                const isSelected =
                  selectedVariant?.label === variant.label;

                const variantOutOfStock = variant.stock <= 0;

                return (
                  <button
                    key={variant.label}
                    type="button"
                    disabled={variantOutOfStock}
                    onClick={() => handleSelectVariant(variant)}
                    className={`px-4 py-3 rounded-xl border text-left transition-all min-w-[110px]
                      ${
                        isSelected
                          ? 'border-saffron-500 bg-saffron-50 ring-1 ring-saffron-500'
                          : 'border-gold-400/25 bg-ivory hover:border-gold-400/60'
                      }
                      ${
                        variantOutOfStock
                          ? 'opacity-40 cursor-not-allowed'
                          : 'cursor-pointer'
                      }
                    `}
                  >
                    <p className="text-lg font-semibold text-marron">
                      {variant.label}
                    </p>

                    {variantOutOfStock && (
                      <p className="font-sans text-[11px] text-maroon-500 mt-0.5">
                        Out of stock
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Highlights */}
        {product.benefits && (
          <div className="mt-6">
            <p className="font-royal text-xs tracking-royal uppercase text-ink/60 mb-3">
              Highlights
            </p>

            <div className="flex flex-wrap gap-2">
              {product.benefits
                .split(/\n|,/)
                .map((text) => text.trim())
                .filter(Boolean)
                .slice(0, 6)
                .map((highlight) => {
                  const Icon = getHighlightIcon(highlight);

                  return (
                    <span
                      key={highlight}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold-50 border border-gold-400/25 font-sans text-sm font-medium text-ink/80"
                    >
                      <Icon
                        size={13}
                        className="text-gold-500 shrink-0"
                        strokeWidth={2}
                      />

                      {highlight}
                    </span>
                  );
                })}
            </div>
          </div>
        )}

        {/* Quantity */}
        <div className="mt-7">
          <p className="font-royal text-xs tracking-royal uppercase text-ink/60 mb-3">
            Quantity
          </p>

          <div className="inline-flex items-center rounded-full border border-gold-400/30 bg-ivory">
            <button
              type="button"
              onClick={() => setQty((current) => Math.max(1, current - 1))}
              disabled={qty <= 1}
              aria-label="Decrease quantity"
              className="w-11 h-11 flex items-center justify-center text-ink hover:text-saffron-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Minus size={16} />
            </button>

            <span className="w-12 text-center font-display text-xl text-ink">
              {qty}
            </span>

            <button
              type="button"
              onClick={() =>
                setQty((current) => Math.min(activeStock, current + 1))
              }
              disabled={!inStock || qty >= activeStock}
              aria-label="Increase quantity"
              className="w-11 h-11 flex items-center justify-center text-ink hover:text-saffron-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Buy Now temporarily disabled
        <div className="grid grid-cols-1 gap-3 mt-7">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            disabled={!inStock}
            onClick={handleBuyNow}
          >
            Buy Now
          </Button>
        </div>
        */}

        {/* Add to cart */}
        <div className="grid grid-cols-1 gap-3 mt-7">
          <AddToCartButton
            productId={product._id}
            hasVariants={false}
            variantLabel={selectedVariant?.label ?? null}
            quantity={qty}
            outOfStock={!inStock}
            onAdded={handleAddedToCart}
          />
        </div>

        {/* Share */}
        <div className="flex items-center gap-3 mt-4">
          <button
            type="button"
            onClick={handleShare}
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-full border border-gold-400/30 text-ink/70 hover:bg-gold-50 transition-all"
          >
            <AnimatePresence mode="wait">
              {shared ? (
                <motion.span
                  key="ok"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="flex items-center gap-2 text-saffron-500"
                >
                  <Check size={16} />

                  <span className="font-sans text-sm font-medium tracking-royal-sm uppercase">
                    Shared
                  </span>
                </motion.span>
              ) : (
                <motion.span
                  key="share"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <Share2 size={16} />

                  <span className="font-sans text-sm font-medium tracking-royal-sm uppercase">
                    Share
                  </span>
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Footer features */}
        <div className="mt-7 pt-6 border-t border-gold-400/15 grid grid-cols-3 gap-2 text-center">
          {[
            { icon: ShieldCheck, label: 'Trusted Formula' },
            { icon: Truck, label: 'Free Shipping' },
            { icon: Check, label: 'Made in India' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-1.5">
              <Icon
                size={18}
                className="text-saffron-500"
                strokeWidth={1.5}
              />

              <span className="font-sans text-sm font-medium text-ink/70 leading-tight">
                {label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}