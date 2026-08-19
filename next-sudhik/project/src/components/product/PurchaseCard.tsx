
'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Droplet,
  Leaf,
  FlaskConical,
  Ban,
  Flame,
  Wind,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Stars from '@/components/ui/Stars';
import { useBuyNow } from '@/lib/buynow-context';
import { productImageUrls } from '@/lib/product-utils';
import type { Product, Variant } from '@/lib/types';

interface PurchaseCardProps {
  product: Product;
  rating: number;
  reviewCount: number;
}

export default function PurchaseCard({ product, rating, reviewCount }: PurchaseCardProps) {
  const hasVariants = (product.variants?.length ?? 0) > 0;

  // const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
  //   hasVariants ? product.variants![0] : null
  // );
  // Highlight text ke keywords ke hisaab se sahi icon return karta hai
// Highlight text ke content ke hisaab se sahi icon return karta hai
const getHighlightIcon = (text: string) => {
  const t = text.toLowerCase();

  if (/dhoop|diya|soot|incense/.test(t)) return Flame;
  if (/residue|oil mark|stain/.test(t)) return Droplet;
  if (/gentle|marble|granite|surface/.test(t)) return ShieldCheck;
  if (/ph[- ]?balanced|formula/.test(t)) return FlaskConical;
  if (/non-?toxic|cruelty-?free|chemical.?free/.test(t)) return Ban;
  if (/chandan|sandalwood|fragrance|scent|aroma/.test(t)) return Wind;
  if (/natural|organic|herbal/.test(t)) return Leaf;

  return Sparkles; // fallback
};
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [qty, setQty] = useState(1);
  const [wished, setWished] = useState(false);
  const [shared, setShared] = useState(false);
  const { open } = useBuyNow();

  // --- coupon state ---
  const [couponInput, setCouponInput] = useState('');
  const [couponStatus, setCouponStatus] = useState<'idle' | 'checking' | 'valid' | 'invalid'>('idle');
  const [couponMessage, setCouponMessage] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);

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

  // Active price/stock depends on selected variant, falls back to base product
  const activePrice = selectedVariant
    ? (selectedVariant.discountPrice || selectedVariant.price)
    : product.price;
  const activeStock = selectedVariant ? selectedVariant.stock : product.stock;

  const inStock = activeStock > 0;
  const images = productImageUrls(product);

  const orderAmount = activePrice * qty;
  const finalAmount = appliedCoupon ? Math.max(orderAmount - appliedCoupon.discount, 0) : orderAmount;

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput('');
    setCouponStatus('idle');
    setCouponMessage('');
  };

  const handleSelectVariant = (v: Variant | null) => {
    setSelectedVariant(v);
    setQty(1); // reset qty jab variant change ho, taaki naye stock se conflict na ho
  };

  
  const handleBuyNow = () => {
  open(
    {
      id: product._id,
      title: product.title,   // simple rakho, variant badge Modal me alag se dikhega
      price: activePrice,
      image: images[0],
    },
    qty,
    appliedCoupon ? { code: appliedCoupon.code, discount: appliedCoupon.discount } : null,
    selectedVariant ? { label: selectedVariant.label, sku: selectedVariant.sku } : null
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
            <span className={`font-royal text-xs tracking-royal uppercase font-medium ${inStock ? 'text-saffron-600' : 'text-maroon-500'}`}>
              {inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </span>
          <span className="font-royal text-xs tracking-royal uppercase text-ink/60">
            {activeStock} left
          </span>
        </div>

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
          {appliedCoupon ? (
            <>
              <span className="font-display text-2xl text-ink/35 line-through">₹{orderAmount}</span>
              <span className="font-display text-4xl text-saffron-600">₹{finalAmount}</span>
            </>
          ) : (
            <span className="font-display text-4xl text-ink">₹{activePrice}</span>
          )}
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
      {/* Base/Single option — represents product.price directly */}
      <button
        type="button"
        disabled={product.stock <= 0}
        onClick={() => handleSelectVariant(null)}
        className={`px-4 py-3 rounded-xl border text-left transition-all min-w-[110px]
          ${!selectedVariant
            ? 'border-saffron-500 bg-saffron-50 ring-1 ring-saffron-500'
            : 'border-gold-400/25 bg-ivory hover:border-gold-400/60'}
          ${product.stock <= 0 ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <p className="text-lg font-semibold text-marron">Single Pack</p>
        {/* <p className="font-display text-base text-ink mt-0.5">₹{product.price}</p> */}
      </button>

      {product.variants!.map((v) => {
        const isSelected = selectedVariant?.label === v.label;
        const variantOutOfStock = v.stock <= 0;
        return (
          <button
            key={v.label}
            type="button"
            disabled={variantOutOfStock}
            onClick={() => handleSelectVariant(v)}
            className={`px-4 py-3 rounded-xl border text-left transition-all min-w-[110px]
              ${isSelected
                ? 'border-saffron-500 bg-saffron-50 ring-1 ring-saffron-500'
                : 'border-gold-400/25 bg-ivory hover:border-gold-400/60'}
              ${variantOutOfStock ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <p className=" text-lg font-semibold text-marron ">{v.label}</p>
            {/* <p className="font-display text-base text-ink mt-0.5">
              ₹{v.discountPrice || v.price}
            </p> */}
            {variantOutOfStock && (
              <p className="font-sans text-[11px] text-maroon-500 mt-0.5">Out of stock</p>
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
        .map((s) => s.trim())
        .filter(Boolean)
        .slice(0, 6)
        .map((h) => {
          const Icon = getHighlightIcon(h);
          return (
            <span
              key={h}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold-50 border border-gold-400/25 font-sans text-sm font-medium text-ink/80"
            >
              <Icon size={13} className="text-gold-500 shrink-0" strokeWidth={2} />
              {h}
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
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" className="w-11 h-11 flex items-center justify-center text-ink hover:text-saffron-500 transition-colors">
              <Minus size={16} />
            </button>
            <span className="w-12 text-center font-display text-xl text-ink">{qty}</span>
            <button onClick={() => setQty((q) => Math.min(activeStock, q + 1))} aria-label="Increase quantity" className="w-11 h-11 flex items-center justify-center text-ink hover:text-saffron-500 transition-colors">
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
                  <span className="font-sans text-sm font-medium tracking-royal-sm uppercase">
                    Shared
                  </span>
                </motion.span>
              ) : (
                <motion.span key="share" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
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
            { icon: ShieldCheck, label: 'Natural & Safe' },
            { icon: Truck, label: 'Free Shipping' },
            { icon: Check, label: 'Made in India' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-1.5">
              <Icon size={18} className="text-saffron-500" strokeWidth={1.5} />
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