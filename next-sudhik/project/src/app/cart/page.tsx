// // 'use client';

// // import { useState } from 'react';
// // import Link from 'next/link';
// // import { Minus, Plus, Trash2 } from 'lucide-react';
// // import { useCart, type CartItem } from '@/lib/cart-context';

// // const rupees = (n: number) => `₹${n.toLocaleString('en-IN')}`;

// // export default function CartPage() {
// //   const { cart, loading, updateQty, removeItem } = useCart();
// //   const [busyKey, setBusyKey] = useState<string | null>(null);
// //   const [error, setError] = useState('');

// //   const keyOf = (it: CartItem) => `${it.productId}:${it.variantLabel ?? ''}`;

// //   const run = async (it: CartItem, fn: () => Promise<void>) => {
// //     setBusyKey(keyOf(it));
// //     setError('');
// //     try {
// //       await fn();
// //     } catch (e: any) {
// //       setError(e?.message || 'Something went wrong');
// //     } finally {
// //       setBusyKey(null);
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <main className="mx-auto max-w-4xl px-5 pb-20 pt-32 sm:px-8">
// //         <p className="font-sans text-sm text-ink/60">Loading your cart...</p>
// //       </main>
// //     );
// //   }

// //   if (cart.items.length === 0) {
// //     return (
// //       <main className="mx-auto max-w-4xl px-5 pb-20 pt-32 text-center sm:px-8">
// //         <h1 className="font-serif text-3xl text-ink">Your cart is empty</h1>
// //         <p className="mt-3 font-sans text-sm text-ink/60">
// //           Add a product to see it here.
// //         </p>
// //         <Link
// //           href="/products/shuddhik-temple-sacred-surface-cleaner"
// //           className="mt-8 inline-block rounded-full border border-saffron-500 px-6 py-3 font-sans text-sm font-medium text-saffron-600 transition-colors hover:bg-saffron-50"
// //         >
// //           Shop the cleaner
// //         </Link>
// //       </main>
// //     );
// //   }

// //   const hasUnavailable = cart.items.some((it) => !it.available);

// //   return (
// //     <main className="mx-auto max-w-4xl px-5 pb-20 pt-32 sm:px-8">
// //       <h1 className="font-serif text-3xl text-ink">Your cart</h1>

// //       <ul className="mt-8 divide-y divide-gold-400/20 border-y border-gold-400/20">
// //         {cart.items.map((it) => {
// //           const busy = busyKey === keyOf(it);
// //           return (
// //             <li key={keyOf(it)} className="flex gap-4 py-5">
// //               <Link href={`/products/${it.slug}`} className="shrink-0">
// //                 {it.image ? (
// //                   // eslint-disable-next-line @next/next/no-img-element
// //                   <img
// //                     src={it.image}
// //                     alt={it.title}
// //                     className="h-24 w-24 rounded-lg bg-gold-50 object-cover"
// //                   />
// //                 ) : (
// //                   <div className="h-24 w-24 rounded-lg bg-gold-50" />
// //                 )}
// //               </Link>

// //               <div className="flex min-w-0 flex-1 flex-col">
// //                 <div className="flex items-start justify-between gap-3">
// //                   <div className="min-w-0">
// //                     <Link
// //                       href={`/products/${it.slug}`}
// //                       className="block truncate font-serif text-lg text-ink hover:text-saffron-500"
// //                     >
// //                       {it.title}
// //                     </Link>
// //                     {it.variantLabel && (
// //                       <p className="font-sans text-sm text-ink/60">{it.variantLabel}</p>
// //                     )}
// //                   </div>
// //                   <p className="shrink-0 font-sans text-base font-medium text-ink">
// //                     {it.available ? rupees(it.lineTotal) : '-'}
// //                   </p>
// //                 </div>

// //                 <div className="mt-1 font-sans text-sm text-ink/60">
// //                   {rupees(it.unitPrice)}
// //                   {it.originalPrice > it.unitPrice && (
// //                     <span className="ml-2 text-ink/40 line-through">
// //                       {rupees(it.originalPrice)}
// //                     </span>
// //                   )}
// //                 </div>

// //                 {!it.available && (
// //                   <p className="mt-1 font-sans text-sm text-red-600">
// //                     {it.stock > 0
// //                       ? `Only ${it.stock} left. Reduce the quantity to continue.`
// //                       : 'Out of stock. Remove this item to continue.'}
// //                   </p>
// //                 )}

// //                 <div className="mt-auto flex items-center justify-between pt-3">
// //                   <div className="flex items-center rounded-full border border-gold-400/40">
// //                     <button
// //                       type="button"
// //                       aria-label="Decrease quantity"
// //                       disabled={busy || it.quantity <= 1}
// //                       onClick={() =>
// //                         run(it, () => updateQty(it.productId, it.variantLabel, it.quantity - 1))
// //                       }
// //                       className="p-2 text-ink disabled:opacity-30"
// //                     >
// //                       <Minus size={14} />
// //                     </button>
// //                     <span className="w-8 text-center font-sans text-sm">{it.quantity}</span>
// //                     <button
// //                       type="button"
// //                       aria-label="Increase quantity"
// //                       disabled={busy || it.quantity >= Math.min(10, it.stock)}
// //                       onClick={() =>
// //                         run(it, () => updateQty(it.productId, it.variantLabel, it.quantity + 1))
// //                       }
// //                       className="p-2 text-ink disabled:opacity-30"
// //                     >
// //                       <Plus size={14} />
// //                     </button>
// //                   </div>

// //                   <button
// //                     type="button"
// //                     disabled={busy}
// //                     onClick={() => run(it, () => removeItem(it.productId, it.variantLabel))}
// //                     className="flex items-center gap-1.5 font-sans text-sm text-ink/60 hover:text-red-600 disabled:opacity-40"
// //                   >
// //                     <Trash2 size={15} />
// //                     Remove
// //                   </button>
// //                 </div>
// //               </div>
// //             </li>
// //           );
// //         })}
// //       </ul>

// //       {error && <p className="mt-4 font-sans text-sm text-red-600">{error}</p>}

// //       <div className="mt-8 ml-auto max-w-sm">
// //         <div className="flex items-center justify-between font-sans text-base text-ink">
// //           <span>Subtotal</span>
// //           <span className="font-medium">{rupees(cart.subtotal)}</span>
// //         </div>
// //         <p className="mt-1 font-sans text-xs text-ink/50">
// //           Shipping and any coupon are applied at checkout.
// //         </p>

// //         {hasUnavailable ? (
// //           <button
// //             disabled
// //             className="mt-5 w-full cursor-not-allowed rounded-full bg-saffron-500 px-6 py-3.5 font-sans text-sm font-medium text-ivory opacity-50"
// //           >
// //             Fix unavailable items to checkout
// //           </button>
// //         ) : (
// //           <Link
// //             href="/checkout"
// //             className="mt-5 block w-full rounded-full bg-saffron-500 px-6 py-3.5 text-center font-sans text-sm font-medium text-ivory transition-colors hover:bg-saffron-600"
// //           >
// //             Proceed to checkout
// //           </Link>
// //         )}
// //       </div>
// //     </main>
// //   );
// // }

// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import { Minus, Plus, Trash2 } from 'lucide-react';
// import { useCart, type CartItem } from '@/lib/cart-context';

// const rupees = (n: number) => `₹${n.toLocaleString('en-IN')}`;

// export default function CartPage() {
//   const { cart, loading, updateQty, removeItem } = useCart();
//   const [busyKey, setBusyKey] = useState<string | null>(null);
//   const [error, setError] = useState('');

//   const keyOf = (it: CartItem) => `${it.productId}:${it.variantLabel ?? ''}`;

//   const run = async (it: CartItem, fn: () => Promise<void>) => {
//     setBusyKey(keyOf(it));
//     setError('');
//     try {
//       await fn();
//     } catch (e: any) {
//       setError(e?.message || 'Something went wrong');
//     } finally {
//       setBusyKey(null);
//     }
//   };

//   if (loading) {
//     return (
//       <main className="mx-auto max-w-4xl px-5 pb-20 pt-32 sm:px-8">
//         <p className="font-sans text-sm text-ink/60">Loading your cart...</p>
//       </main>
//     );
//   }

//   if (cart.items.length === 0) {
//     return (
//       <main className="mx-auto max-w-4xl px-5 pb-20 pt-32 text-center sm:px-8">
//         <h1 className="font-serif text-3xl text-ink">Your cart is empty</h1>
//         <p className="mt-3 font-sans text-sm text-ink/60">
//           Add a product to see it here.
//         </p>
//         <Link
//           href="/products/shuddhik-temple-sacred-surface-cleaner"
//           className="mt-8 inline-block rounded-full border border-saffron-500 px-6 py-3 font-sans text-sm font-medium text-saffron-600 transition-colors hover:bg-saffron-50"
//         >
//           Shop the cleaner
//         </Link>
//       </main>
//     );
//   }

//   const hasUnavailable = cart.items.some((it) => !it.available);

//   return (
//     <main className="mx-auto max-w-4xl px-5 pb-20 pt-32 sm:px-8">
//       <h1 className="font-serif text-3xl text-ink">Your cart</h1>

//       <ul className="mt-8 divide-y divide-gold-400/20 border-y border-gold-400/20">
//         {cart.items.map((it) => {
//           const busy = busyKey === keyOf(it);
//           return (
//             <li key={keyOf(it)} className="flex gap-4 py-5">
//               <Link href={`/products/${it.slug}`} className="shrink-0">
//                 {it.image ? (
//                   // eslint-disable-next-line @next/next/no-img-element
//                   <img
//                     src={it.image}
//                     alt={it.title}
//                     className="h-24 w-24 rounded-lg bg-gold-50 object-cover"
//                   />
//                 ) : (
//                   <div className="h-24 w-24 rounded-lg bg-gold-50" />
//                 )}
//               </Link>

//               <div className="flex min-w-0 flex-1 flex-col">
//                 <div className="flex items-start justify-between gap-3">
//                   <div className="min-w-0">
//                     <Link
//                       href={`/products/${it.slug}`}
//                       className="block truncate font-serif text-lg text-ink hover:text-saffron-500"
//                     >
//                       {it.title}
//                     </Link>
//                     {it.variantLabel && (
//                       <p className="font-sans text-sm text-ink/60">{it.variantLabel}</p>
//                     )}
//                   </div>
//                   <p className="shrink-0 font-sans text-base font-medium text-ink">
//                     {it.available ? rupees(it.lineTotal) : '-'}
//                   </p>
//                 </div>

//                 <div className="mt-1 font-sans text-sm text-ink/60">
//                   {rupees(it.unitPrice)}
//                   {it.originalPrice > it.unitPrice && (
//                     <span className="ml-2 text-ink/40 line-through">
//                       {rupees(it.originalPrice)}
//                     </span>
//                   )}
//                 </div>

//                 {!it.available && (
//                   <p className="mt-1 font-sans text-sm text-red-600">
//                     {it.stock > 0
//                       ? `Only ${it.stock} left. Reduce the quantity to continue.`
//                       : 'Out of stock. Remove this item to continue.'}
//                   </p>
//                 )}

//                 <div className="mt-auto flex items-center justify-between pt-3">
//                   <div className="flex items-center rounded-full border border-gold-400/40">
//                     <button
//                       type="button"
//                       aria-label="Decrease quantity"
//                       disabled={busy || it.quantity <= 1}
//                       onClick={() =>
//                         run(it, () => updateQty(it.productId, it.variantLabel, it.quantity - 1))
//                       }
//                       className="p-2 text-ink disabled:opacity-30"
//                     >
//                       <Minus size={14} />
//                     </button>
//                     <span className="w-8 text-center font-sans text-sm">{it.quantity}</span>
//                     <button
//                       type="button"
//                       aria-label="Increase quantity"
//                       disabled={busy || it.quantity >= Math.min(10, it.stock)}
//                       onClick={() =>
//                         run(it, () => updateQty(it.productId, it.variantLabel, it.quantity + 1))
//                       }
//                       className="p-2 text-ink disabled:opacity-30"
//                     >
//                       <Plus size={14} />
//                     </button>
//                   </div>

//                   <button
//                     type="button"
//                     disabled={busy}
//                     onClick={() => run(it, () => removeItem(it.productId, it.variantLabel))}
//                     className="flex items-center gap-1.5 font-sans text-sm text-ink/60 hover:text-red-600 disabled:opacity-40"
//                   >
//                     <Trash2 size={15} />
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             </li>
//           );
//         })}
//       </ul>

//       {error && <p className="mt-4 font-sans text-sm text-red-600">{error}</p>}

//       <div className="mt-8 ml-auto max-w-sm">
//         <div className="flex items-center justify-between font-sans text-base text-ink">
//           <span>Subtotal</span>
//           <span className="font-medium">{rupees(cart.subtotal)}</span>
//         </div>
//         <p className="mt-1 font-sans text-xs text-ink/50">
//           Shipping and any coupon are applied at checkout.
//         </p>

//         {hasUnavailable ? (
//           <button
//             disabled
//             className="mt-5 w-full cursor-not-allowed rounded-full bg-saffron-500 px-6 py-3.5 font-sans text-sm font-medium text-ivory opacity-50"
//           >
//             Fix unavailable items to checkout
//           </button>
//         ) : (
//           <Link
//             href="/checkout"
//             className="mt-5 block w-full rounded-full bg-saffron-500 px-6 py-3.5 text-center font-sans text-sm font-medium text-ivory transition-colors hover:bg-saffron-600"
//           >
//             Proceed to checkout
//           </Link>
//         )}
//       </div>
//     </main>
//   );
// }

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart, type CartItem } from '@/lib/cart-context';
import { useBuyNow } from '@/lib/buynow-context';

const rupees = (n: number) => `₹${n.toLocaleString('en-IN')}`;

export default function CartPage() {
  const { cart, loading, updateQty, removeItem } = useCart();
  const { openCart } = useBuyNow();
  const [busyKey, setBusyKey] = useState<string | null>(null);
  const [error, setError] = useState('');

  const keyOf = (it: CartItem) => `${it.productId}:${it.variantLabel ?? ''}`;

  const run = async (it: CartItem, fn: () => Promise<void>) => {
    setBusyKey(keyOf(it));
    setError('');
    try {
      await fn();
    } catch (e: any) {
      setError(e?.message || 'Something went wrong');
    } finally {
      setBusyKey(null);
    }
  };

  if (loading) {
    return (
      <main className="mx-auto max-w-4xl px-5 pb-20 pt-32 sm:px-8">
        <p className="font-sans text-sm text-ink/60">Loading your cart...</p>
      </main>
    );
  }

  if (cart.items.length === 0) {
    return (
      <main className="mx-auto max-w-4xl px-5 pb-20 pt-32 text-center sm:px-8">
        <h1 className="font-serif text-3xl text-ink">Your cart is empty</h1>
        <p className="mt-3 font-sans text-sm text-ink/60">
          Add a product to see it here.
        </p>
        <Link
          href="/products/shuddhik-temple-sacred-surface-cleaner"
          className="mt-8 inline-block rounded-full border border-saffron-500 px-6 py-3 font-sans text-sm font-medium text-saffron-600 transition-colors hover:bg-saffron-50"
        >
          Shop the cleaner
        </Link>
      </main>
    );
  }

  const hasUnavailable = cart.items.some((it) => !it.available);

  return (
    <main className="mx-auto max-w-4xl px-5 pb-20 pt-32 sm:px-8">
      <h1 className="font-serif text-3xl text-ink">Your cart</h1>

      <ul className="mt-8 divide-y divide-gold-400/20 border-y border-gold-400/20">
        {cart.items.map((it) => {
          const busy = busyKey === keyOf(it);
          return (
            <li key={keyOf(it)} className="flex gap-4 py-5">
              <Link href={`/products/${it.slug}`} className="shrink-0">
                {it.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={it.image}
                    alt={it.title}
                    className="h-24 w-24 rounded-lg bg-gold-50 object-cover"
                  />
                ) : (
                  <div className="h-24 w-24 rounded-lg bg-gold-50" />
                )}
              </Link>

              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <Link
                      href={`/products/${it.slug}`}
                      className="block truncate font-serif text-lg text-ink hover:text-saffron-500"
                    >
                      {it.title}
                    </Link>
                    {it.variantLabel && (
                      <p className="font-sans text-sm text-ink/60">{it.variantLabel}</p>
                    )}
                  </div>
                  <p className="shrink-0 font-sans text-base font-medium text-ink">
                    {it.available ? rupees(it.lineTotal) : '-'}
                  </p>
                </div>

                <div className="mt-1 font-sans text-sm text-ink/60">
                  {rupees(it.unitPrice)}
                  {it.originalPrice > it.unitPrice && (
                    <span className="ml-2 text-ink/40 line-through">
                      {rupees(it.originalPrice)}
                    </span>
                  )}
                </div>

                {!it.available && (
                  <p className="mt-1 font-sans text-sm text-red-600">
                    {it.stock > 0
                      ? `Only ${it.stock} left. Reduce the quantity to continue.`
                      : 'Out of stock. Remove this item to continue.'}
                  </p>
                )}

                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="flex items-center rounded-full border border-gold-400/40">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      disabled={busy || it.quantity <= 1}
                      onClick={() =>
                        run(it, () => updateQty(it.productId, it.variantLabel, it.quantity - 1))
                      }
                      className="p-2 text-ink disabled:opacity-30"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center font-sans text-sm">{it.quantity}</span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      disabled={busy || it.quantity >= Math.min(10, it.stock)}
                      onClick={() =>
                        run(it, () => updateQty(it.productId, it.variantLabel, it.quantity + 1))
                      }
                      className="p-2 text-ink disabled:opacity-30"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => run(it, () => removeItem(it.productId, it.variantLabel))}
                    className="flex items-center gap-1.5 font-sans text-sm text-ink/60 hover:text-red-600 disabled:opacity-40"
                  >
                    <Trash2 size={15} />
                    Remove
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {error && <p className="mt-4 font-sans text-sm text-red-600">{error}</p>}

      <div className="mt-8 ml-auto max-w-sm">
        <div className="flex items-center justify-between font-sans text-base text-ink">
          <span>Subtotal</span>
          <span className="font-medium">{rupees(cart.subtotal)}</span>
        </div>
        <p className="mt-1 font-sans text-xs text-ink/50">
          Shipping and any coupon are applied at checkout.
        </p>

        {hasUnavailable ? (
          <button
            disabled
            className="mt-5 w-full cursor-not-allowed rounded-full bg-saffron-500 px-6 py-3.5 font-sans text-sm font-medium text-ivory opacity-50"
          >
            Fix unavailable items to checkout
          </button>
        ) : (
          <button
            type="button"
            onClick={() =>
              openCart(
                cart.items.map((it) => ({
                  productId: it.productId,
                  title: it.title,
                  image: it.image,
                  variantLabel: it.variantLabel,
                  quantity: it.quantity,
                  unitPrice: it.unitPrice,
                }))
              )
            }
            className="mt-5 block w-full rounded-full bg-saffron-500 px-6 py-3.5 text-center font-sans text-sm font-medium text-ivory transition-colors hover:bg-saffron-600"
          >
            Proceed to checkout
          </button>
        )}
      </div>
    </main>
  );
}