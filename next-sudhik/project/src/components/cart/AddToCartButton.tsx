'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart-context';

type Props = {
  productId: string;
  /** Variants wale product me selected variant ka label, warna null/undefined. */
  variantLabel?: string | null;
  /** Product me variants hain to true bhejo, tab tak button disabled rahega jab tak variant select na ho. */
  hasVariants?: boolean;
  quantity?: number;
  outOfStock?: boolean;
  className?: string;
};

export default function AddToCartButton({
  productId,
  variantLabel = null,
  hasVariants = false,
  quantity = 1,
  outOfStock = false,
  className = '',
}: Props) {
  const { addToCart } = useCart();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState('');

  const needsVariant = hasVariants && !variantLabel;
  const disabled = busy || outOfStock || needsVariant;

  const onClick = async () => {
    setBusy(true);
    setError('');
    try {
      await addToCart(productId, variantLabel, quantity);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (e: any) {
      setError(e?.message || 'Could not add to cart');
    } finally {
      setBusy(false);
    }
  };

  const label = outOfStock
    ? 'Out of stock'
    : needsVariant
    ? 'Select a pack'
    : busy
    ? 'Adding...'
    : added
    ? 'Added to cart'
    : 'Add to cart';

  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={`w-full rounded-full border border-saffron-500 px-6 py-3 font-sans text-sm font-medium text-saffron-600 transition-colors hover:bg-saffron-50 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      >
        {label}
      </button>
      {added && (
        <button
          type="button"
          onClick={() => router.push('/cart')}
          className="mt-2 w-full text-center font-sans text-xs text-ink/60 underline"
        >
          View cart
        </button>
      )}
      {error && <p className="mt-2 font-sans text-xs text-red-600">{error}</p>}
    </div>
  );
}