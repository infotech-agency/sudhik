// // 'use client';

// // import { useState } from 'react';
// // import { useRouter, usePathname, useSearchParams } from 'next/navigation';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import {
// //   Heart,
// //   Share2,
// //   Minus,
// //   Plus,
// //   Check,
// //   Truck,
// //   ShieldCheck,
// //   Sparkles,
// //   Tag,
// //   X,
// // } from 'lucide-react';
// // import Button from '@/components/ui/Button';
// // import Stars from '@/components/ui/Stars';
// // import { useBuyNow } from '@/lib/buynow-context';
// // import { useAuth } from '@/lib/auth-context';
// // import { productImageUrls } from '@/lib/product-utils';
// // import type { Product } from '@/lib/types';

// // interface PurchaseCardProps {
// //   product: Product;
// //   rating: number;
// //   reviewCount: number;
// // }

// // export default function PurchaseCard({ product, rating, reviewCount }: PurchaseCardProps) {
// //   const [qty, setQty] = useState(1);
// //   const [wished, setWished] = useState(false);
// //   const [shared, setShared] = useState(false);
// //   const { open } = useBuyNow();
// //   const { isAuthenticated, loading: authLoading } = useAuth();
// //   const router = useRouter();
// //   const pathname = usePathname();
// //   const searchParams = useSearchParams();

// //   // --- coupon state ---
// //   const [couponInput, setCouponInput] = useState('');
// //   const [couponStatus, setCouponStatus] = useState<'idle' | 'checking' | 'valid' | 'invalid'>('idle');
// //   const [couponMessage, setCouponMessage] = useState('');
// //   const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);

// //   const handleShare = () => {
// //     setShared(true);
// //     setTimeout(() => setShared(false), 2200);
// //   };

// //   const inStock = product.stock > 0;
// //   const images = productImageUrls(product);

// //   const orderAmount = product.price * qty;
// //   const finalAmount = appliedCoupon ? Math.max(orderAmount - appliedCoupon.discount, 0) : orderAmount;


// //   const removeCoupon = () => {
// //     setAppliedCoupon(null);
// //     setCouponInput('');
// //     setCouponStatus('idle');
// //     setCouponMessage('');
// //   };

// //   const handleBuyNow = () => {
// //     if (authLoading) return; // auth state abhi resolve ho raha hai, tab tak wait karo

// //     if (!isAuthenticated) {
// //       const query = searchParams?.toString();
// //       const redirectPath = pathname + (query ? `?${query}` : '');
// //       if (typeof window !== 'undefined') {
// //         sessionStorage.setItem('auth_redirect', redirectPath);
// //       }
// //       router.push(`/auth/login?redirect=${encodeURIComponent(redirectPath)}`);
// //       return;
// //     }

// //     open(
// //       { id: product._id, title: product.title, price: product.price, image: images[0] },
// //       qty,
// //       appliedCoupon ? { code: appliedCoupon.code, discount: appliedCoupon.discount } : undefined
// //     );
// //   };

// //   return (
// //     <div className="lg:sticky lg:top-24 self-start">
// //       <motion.div
// //         initial={{ opacity: 0, y: 30 }}
// //         whileInView={{ opacity: 1, y: 0 }}
// //         viewport={{ once: true }}
// //         transition={{ duration: 0.7 }}
// //         className="relative p-7 sm:p-8 rounded-3xl bg-white border border-gold-400/20 shadow-premium"
// //       >
// //         <div className="flex items-center justify-between">
// //           <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${inStock ? 'bg-saffron-50 border-saffron-500/20' : 'bg-maroon-50 border-maroon-500/20'}`}>
// //             <span className={`w-1.5 h-1.5 rounded-full ${inStock ? 'bg-saffron-500 animate-auraPulse' : 'bg-maroon-500'}`} />
// //             <span className={`font-royal text-[10px] tracking-royal uppercase ${inStock ? 'text-saffron-600' : 'text-maroon-500'}`}>
// //               {inStock ? 'In Stock' : 'Out of Stock'}
// //             </span>
// //           </span>
// //           <span className="font-royal text-[10px] tracking-royal uppercase text-ink/40">
// //             {product.stock} left
// //           </span>
// //         </div>

// //         <h1 className="font-display text-4xl sm:text-5xl text-ink mt-5 leading-tight">
// //           {product.title}
// //         </h1>

// //         <div className="flex items-center gap-3 mt-4">
// //           <Stars rating={rating} size={16} />
// //           <span className="font-serif text-sm text-ink/70">
// //             {rating} · {reviewCount.toLocaleString('en-IN')} reviews
// //           </span>
// //         </div>

// //         <div className="flex items-baseline gap-3 mt-6">
// //           {appliedCoupon ? (
// //             <>
// //               <span className="font-display text-2xl text-ink/35 line-through">₹{orderAmount}</span>
// //               <span className="font-display text-4xl text-saffron-600">₹{finalAmount}</span>
// //             </>
// //           ) : (
// //             <span className="font-display text-4xl text-ink">₹{product.price}</span>
// //           )}
// //           <span className="font-royal text-[10px] tracking-royal uppercase text-ink/40">MRP · incl. all taxes</span>
// //         </div>

// //         <div className="flex items-center gap-2 mt-4 text-ink/65">
// //           <Truck size={16} className="text-saffron-500" />
// //           <span className="font-serif text-sm">Delivered in 3–6 days · Free shipping</span>
// //         </div>

// //         {product.benefits && (
// //           <div className="mt-6">
// //             <p className="font-royal text-[10px] tracking-royal uppercase text-ink/40 mb-3">Highlights</p>
// //             <div className="flex flex-wrap gap-2">
// //               {product.benefits
// //                 .split(/\n|,/)
// //                 .map((s) => s.trim())
// //                 .filter(Boolean)
// //                 .slice(0, 6)
// //                 .map((h) => (
// //                   <span key={h} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold-50 border border-gold-400/25 font-sans text-xs text-ink/75">
// //                     <Sparkles size={11} className="text-gold-400" />
// //                     {h}
// //                   </span>
// //                 ))}
// //             </div>
// //           </div>
// //         )}

// //         <div className="mt-7">
// //           <p className="font-royal text-[10px] tracking-royal uppercase text-ink/40 mb-3">Quantity</p>
// //           <div className="inline-flex items-center rounded-full border border-gold-400/30 bg-ivory">
// //             <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" className="w-11 h-11 flex items-center justify-center text-ink hover:text-saffron-500 transition-colors">
// //               <Minus size={16} />
// //             </button>
// //             <span className="w-12 text-center font-display text-xl text-ink">{qty}</span>
// //             <button onClick={() => setQty((q) => Math.min(product.stock, q + 1))} aria-label="Increase quantity" className="w-11 h-11 flex items-center justify-center text-ink hover:text-saffron-500 transition-colors">
// //               <Plus size={16} />
// //             </button>
// //           </div>
// //         </div>

// //         <div className="grid grid-cols-1 gap-3 mt-7">
// //           <Button
// //             variant="primary"
// //             size="lg"
// //             fullWidth
// //             disabled={!inStock || authLoading}
// //             onClick={handleBuyNow}
// //           >
// //             Buy Now
// //           </Button>
// //         </div>

// //         <div className="flex items-center gap-3 mt-4">
// //           <button
// //             onClick={() => setWished((w) => !w)}
// //             className={`flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-full border transition-all ${wished ? 'border-maroon-500/40 bg-maroon-50 text-maroon-500' : 'border-gold-400/30 text-ink/70 hover:bg-gold-50'}`}
// //           >
// //             <Heart size={16} className={wished ? 'fill-maroon-500' : ''} />
// //             <span className="font-sans text-xs font-medium tracking-royal-sm uppercase">{wished ? 'Wishlisted' : 'Wishlist'}</span>
// //           </button>
// //           <button
// //             onClick={handleShare}
// //             className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-full border border-gold-400/30 text-ink/70 hover:bg-gold-50 transition-all"
// //           >
// //             <AnimatePresence mode="wait">
// //               {shared ? (
// //                 <motion.span key="ok" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-2 text-saffron-500">
// //                   <Check size={16} />
// //                   <span className="font-sans text-xs font-medium tracking-royal-sm uppercase">Shared</span>
// //                 </motion.span>
// //               ) : (
// //                 <motion.span key="share" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
// //                   <Share2 size={16} />
// //                   <span className="font-sans text-xs font-medium tracking-royal-sm uppercase">Share</span>
// //                 </motion.span>
// //               )}
// //             </AnimatePresence>
// //           </button>
// //         </div>

// //         <div className="mt-7 pt-6 border-t border-gold-400/15 grid grid-cols-3 gap-2 text-center">
// //           {[
// //             { icon: ShieldCheck, label: 'Natural & Safe' },
// //             { icon: Truck, label: 'Free Shipping' },
// //             { icon: Check, label: 'Made in India' },
// //           ].map(({ icon: Icon, label }) => (
// //             <div key={label} className="flex flex-col items-center gap-1.5">
// //               <Icon size={18} className="text-saffron-500" strokeWidth={1.5} />
// //               <span className="font-sans text-[10px] text-ink/55 leading-tight">{label}</span>
// //             </div>
// //           ))}
// //         </div>
// //       </motion.div>
// //     </div>
// //   );
// // }


// 'use client';

// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Heart,
//   Share2,
//   Minus,
//   Plus,
//   Check,
//   Truck,
//   ShieldCheck,
//   Sparkles,
//   Tag,
//   X,
// } from 'lucide-react';
// import Button from '@/components/ui/Button';
// import Stars from '@/components/ui/Stars';
// import { useBuyNow } from '@/lib/buynow-context';
// import { productImageUrls } from '@/lib/product-utils';
// import type { Product } from '@/lib/types';

// interface PurchaseCardProps {
//   product: Product;
//   rating: number;
//   reviewCount: number;
// }

// export default function PurchaseCard({ product, rating, reviewCount }: PurchaseCardProps) {
//   const [qty, setQty] = useState(1);
//   const [wished, setWished] = useState(false);
//   const [shared, setShared] = useState(false);
//   const { open } = useBuyNow();

//   // --- coupon state ---
//   const [couponInput, setCouponInput] = useState('');
//   const [couponStatus, setCouponStatus] = useState<'idle' | 'checking' | 'valid' | 'invalid'>('idle');
//   const [couponMessage, setCouponMessage] = useState('');
//   const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);

//   const handleShare = () => {
//     setShared(true);
//     setTimeout(() => setShared(false), 2200);
//   };

//   const inStock = product.stock > 0;
//   const images = productImageUrls(product);

//   const orderAmount = product.price * qty;
//   const finalAmount = appliedCoupon ? Math.max(orderAmount - appliedCoupon.discount, 0) : orderAmount;

//   const removeCoupon = () => {
//     setAppliedCoupon(null);
//     setCouponInput('');
//     setCouponStatus('idle');
//     setCouponMessage('');
//   };

//   const handleBuyNow = () => {
//     open(
//       { id: product._id, title: product.title, price: product.price, image: images[0] },
//       qty,
//       appliedCoupon ? { code: appliedCoupon.code, discount: appliedCoupon.discount } : undefined
//     );
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
//         <div className="flex items-center justify-between">
//           <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${inStock ? 'bg-saffron-50 border-saffron-500/20' : 'bg-maroon-50 border-maroon-500/20'}`}>
//             <span className={`w-1.5 h-1.5 rounded-full ${inStock ? 'bg-saffron-500 animate-auraPulse' : 'bg-maroon-500'}`} />
//             <span className={`font-royal text-[10px] tracking-royal uppercase ${inStock ? 'text-saffron-600' : 'text-maroon-500'}`}>
//               {inStock ? 'In Stock' : 'Out of Stock'}
//             </span>
//           </span>
//           <span className="font-royal text-[10px] tracking-royal uppercase text-ink/40">
//             {product.stock} left
//           </span>
//         </div>

//         <h1 className="font-display text-4xl sm:text-5xl text-ink mt-5 leading-tight">
//           {product.title}
//         </h1>

//         <div className="flex items-center gap-3 mt-4">
//           <Stars rating={rating} size={16} />
//           <span className="font-serif text-sm text-ink/70">
//             {rating} · {reviewCount.toLocaleString('en-IN')} reviews
//           </span>
//         </div>

//         <div className="flex items-baseline gap-3 mt-6">
//           {appliedCoupon ? (
//             <>
//               <span className="font-display text-2xl text-ink/35 line-through">₹{orderAmount}</span>
//               <span className="font-display text-4xl text-saffron-600">₹{finalAmount}</span>
//             </>
//           ) : (
//             <span className="font-display text-4xl text-ink">₹{product.price}</span>
//           )}
//           <span className="font-royal text-[10px] tracking-royal uppercase text-ink/40">MRP · incl. all taxes</span>
//         </div>

//         <div className="flex items-center gap-2 mt-4 text-ink/65">
//           <Truck size={16} className="text-saffron-500" />
//           <span className="font-serif text-sm">Delivered in 3–6 days · Free shipping</span>
//         </div>

//         {product.benefits && (
//           <div className="mt-6">
//             <p className="font-royal text-[10px] tracking-royal uppercase text-ink/40 mb-3">Highlights</p>
//             <div className="flex flex-wrap gap-2">
//               {product.benefits
//                 .split(/\n|,/)
//                 .map((s) => s.trim())
//                 .filter(Boolean)
//                 .slice(0, 6)
//                 .map((h) => (
//                   <span key={h} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold-50 border border-gold-400/25 font-sans text-xs text-ink/75">
//                     <Sparkles size={11} className="text-gold-400" />
//                     {h}
//                   </span>
//                 ))}
//             </div>
//           </div>
//         )}

//         <div className="mt-7">
//           <p className="font-royal text-[10px] tracking-royal uppercase text-ink/40 mb-3">Quantity</p>
//           <div className="inline-flex items-center rounded-full border border-gold-400/30 bg-ivory">
//             <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" className="w-11 h-11 flex items-center justify-center text-ink hover:text-saffron-500 transition-colors">
//               <Minus size={16} />
//             </button>
//             <span className="w-12 text-center font-display text-xl text-ink">{qty}</span>
//             <button onClick={() => setQty((q) => Math.min(product.stock, q + 1))} aria-label="Increase quantity" className="w-11 h-11 flex items-center justify-center text-ink hover:text-saffron-500 transition-colors">
//               <Plus size={16} />
//             </button>
//           </div>
//         </div>

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

//         <div className="flex items-center gap-3 mt-4">
//           <button
//             onClick={() => setWished((w) => !w)}
//             className={`flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-full border transition-all ${wished ? 'border-maroon-500/40 bg-maroon-50 text-maroon-500' : 'border-gold-400/30 text-ink/70 hover:bg-gold-50'}`}
//           >
//             <Heart size={16} className={wished ? 'fill-maroon-500' : ''} />
//             <span className="font-sans text-xs font-medium tracking-royal-sm uppercase">{wished ? 'Wishlisted' : 'Wishlist'}</span>
//           </button>
//           <button
//             onClick={handleShare}
//             className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-full border border-gold-400/30 text-ink/70 hover:bg-gold-50 transition-all"
//           >
//             <AnimatePresence mode="wait">
//               {shared ? (
//                 <motion.span key="ok" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-2 text-saffron-500">
//                   <Check size={16} />
//                   <span className="font-sans text-xs font-medium tracking-royal-sm uppercase">Shared</span>
//                 </motion.span>
//               ) : (
//                 <motion.span key="share" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
//                   <Share2 size={16} />
//                   <span className="font-sans text-xs font-medium tracking-royal-sm uppercase">Share</span>
//                 </motion.span>
//               )}
//             </AnimatePresence>
//           </button>
//         </div>

//         <div className="mt-7 pt-6 border-t border-gold-400/15 grid grid-cols-3 gap-2 text-center">
//           {[
//             { icon: ShieldCheck, label: 'Natural & Safe' },
//             { icon: Truck, label: 'Free Shipping' },
//             { icon: Check, label: 'Made in India' },
//           ].map(({ icon: Icon, label }) => (
//             <div key={label} className="flex flex-col items-center gap-1.5">
//               <Icon size={18} className="text-saffron-500" strokeWidth={1.5} />
//               <span className="font-sans text-[10px] text-ink/55 leading-tight">{label}</span>
//             </div>
//           ))}
//         </div>
//       </motion.div>
//     </div>
//   );
// }


'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  Share2,
  Minus,
  Plus,
  Check,
  Truck,
  ShieldCheck,
  Sparkles,
  Tag,
  X,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Stars from '@/components/ui/Stars';
import { useBuyNow } from '@/lib/buynow-context';
import { productImageUrls } from '@/lib/product-utils';
import type { Product } from '@/lib/types';

interface PurchaseCardProps {
  product: Product;
  rating: number;
  reviewCount: number;
}

export default function PurchaseCard({ product, rating, reviewCount }: PurchaseCardProps) {
  const [qty, setQty] = useState(1);
  const [wished, setWished] = useState(false);
  const [shared, setShared] = useState(false);
  const { open } = useBuyNow();

  // --- coupon state ---
  const [couponInput, setCouponInput] = useState('');
  const [couponStatus, setCouponStatus] = useState<'idle' | 'checking' | 'valid' | 'invalid'>('idle');
  const [couponMessage, setCouponMessage] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);

  // const handleShare = () => {
  //   setShared(true);
  //   setTimeout(() => setShared(false), 2200);
  // };
 

const handleShare = async () => {
  const shareData = {
    title: product.name,
    text: `Check out this product: ${product.name}`,
    url: window.location.href,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);

      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } else {
      await navigator.clipboard.writeText(window.location.href);

      setShared(true);
      setTimeout(() => setShared(false), 2000);

      alert("Link copied to clipboard!");
    }
  } catch (error) {
    console.log("Share cancelled", error);
  }
};

  const inStock = product.stock > 0;
  const images = productImageUrls(product);

  const orderAmount = product.price * qty;
  const finalAmount = appliedCoupon ? Math.max(orderAmount - appliedCoupon.discount, 0) : orderAmount;

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput('');
    setCouponStatus('idle');
    setCouponMessage('');
  };

  const handleBuyNow = () => {
    open(
      { id: product._id, title: product.title, price: product.price, image: images[0] },
      qty,
      appliedCoupon ? { code: appliedCoupon.code, discount: appliedCoupon.discount } : undefined
    );
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
        {/* Stock status */}
        <div className="flex items-center justify-between">
          <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${inStock ? 'bg-saffron-50 border-saffron-500/20' : 'bg-maroon-50 border-maroon-500/20'}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${inStock ? 'bg-saffron-500 animate-auraPulse' : 'bg-maroon-500'}`} />
            <span className={`font-royal text-xs tracking-royal uppercase font-medium ${inStock ? 'text-saffron-600' : 'text-maroon-500'}`}> {/* ✅ bigger + font-medium */}
              {inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </span>
          <span className="font-royal text-xs tracking-royal uppercase text-ink/60"> {/* ✅ bigger + darker */}
            {product.stock} left
          </span>
        </div>

        {/* Title */}
        <h1 className="font-display text-4xl sm:text-5xl text-ink mt-5 leading-tight">
          {product.title}
        </h1>

        {/* Rating */}
        <div className="flex items-center gap-3 mt-4">
          <Stars rating={rating} size={16} />
          <span className="font-serif text-base font-medium text-ink/80"> {/* ✅ bigger + bold + darker */}
            {rating} · {reviewCount.toLocaleString('en-IN')} reviews
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-3 mt-6">
          {appliedCoupon ? (
            <>
              <span className="font-display text-2xl text-ink/35 line-through">₹{orderAmount}</span>
              <span className="font-display text-4xl text-saffron-600">₹{finalAmount}</span>
            </>
          ) : (
            <span className="font-display text-4xl text-ink">₹{product.price}</span>
          )}
          <span className="font-royal text-xs tracking-royal uppercase text-ink/60"> {/* ✅ bigger + darker */}
            MRP · incl. all taxes
          </span>
        </div>

        {/* Shipping */}
        <div className="flex items-center gap-2 mt-4 text-ink/80"> {/* ✅ darker */}
          <Truck size={16} className="text-saffron-500" />
          <span className="font-serif text-base font-medium"> {/* ✅ bigger + bold */}
            Delivered in 3–6 days · Free shipping
          </span>
        </div>

        {/* Highlights */}
        {product.benefits && (
          <div className="mt-6">
            <p className="font-royal text-xs tracking-royal uppercase text-ink/60 mb-3"> {/* ✅ bigger + darker */}
              Highlights
            </p>
            <div className="flex flex-wrap gap-2">
              {product.benefits
                .split(/\n|,/)
                .map((s) => s.trim())
                .filter(Boolean)
                .slice(0, 6)
                .map((h) => (
                  <span key={h} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold-50 border border-gold-400/25 font-sans text-sm font-medium text-ink/80"> {/* ✅ bigger + bold + darker */}
                    <Sparkles size={11} className="text-gold-400" />
                    {h}
                  </span>
                ))}
            </div>
          </div>
        )}

        {/* Quantity */}
        <div className="mt-7">
          <p className="font-royal text-xs tracking-royal uppercase text-ink/60 mb-3"> {/* ✅ bigger + darker */}
            Quantity
          </p>
          <div className="inline-flex items-center rounded-full border border-gold-400/30 bg-ivory">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" className="w-11 h-11 flex items-center justify-center text-ink hover:text-saffron-500 transition-colors">
              <Minus size={16} />
            </button>
            <span className="w-12 text-center font-display text-xl text-ink">{qty}</span>
            <button onClick={() => setQty((q) => Math.min(product.stock, q + 1))} aria-label="Increase quantity" className="w-11 h-11 flex items-center justify-center text-ink hover:text-saffron-500 transition-colors">
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Buy Now */}
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

        {/* Wishlist & Share */}
        <div className="flex items-center gap-3 mt-4">
          
          <button
            onClick={handleShare}
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-full border border-gold-400/30 text-ink/70 hover:bg-gold-50 transition-all"
          >
            <AnimatePresence mode="wait">
              {shared ? (
                <motion.span key="ok" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-2 text-saffron-500">
                  <Check size={16} />
                  <span className="font-sans text-sm font-medium tracking-royal-sm uppercase"> {/* ✅ bigger + bold */}
                    Shared
                  </span>
                </motion.span>
              ) : (
                <motion.span key="share" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                  <Share2 size={16} />
                  <span className="font-sans text-sm font-medium tracking-royal-sm uppercase"> {/* ✅ bigger + bold */}
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
            { icon: ShieldCheck, label: 'Natural & Safe' },
            { icon: Truck, label: 'Free Shipping' },
            { icon: Check, label: 'Made in India' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-1.5">
              <Icon size={18} className="text-saffron-500" strokeWidth={1.5} />
              <span className="font-sans text-sm font-medium text-ink/70 leading-tight"> {/* ✅ bigger + bold + darker */}
                {label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}