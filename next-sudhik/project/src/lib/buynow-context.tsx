// // // 'use client';

// // // import { createContext, useContext, useState, type ReactNode } from 'react';

// // // interface BuyNowState {
// // //   isOpen: boolean;
// // //   product: { id: string; title: string; price: number; image?: string } | null;
// // //   quantity: number;
// // //   open: (product: { id: string; title: string; price: number; image?: string }, quantity: number) => void;
// // //   close: () => void;
// // // }

// // // const BuyNowContext = createContext<BuyNowState | null>(null);

// // // export function BuyNowProvider({ children }: { children: ReactNode }) {
// // //   const [isOpen, setIsOpen] = useState(false);
// // //   const [product, setProduct] = useState<BuyNowState['product']>(null);
// // //   const [quantity, setQuantity] = useState(1);

// // //   const open: BuyNowState['open'] = (p, qty) => {
// // //     setProduct(p);
// // //     setQuantity(qty);
// // //     setIsOpen(true);
// // //   };
// // //   const close = () => setIsOpen(false);

// // //   return (
// // //     <BuyNowContext.Provider value={{ isOpen, product, quantity, open, close }}>
// // //       {children}
// // //     </BuyNowContext.Provider>
// // //   );
// // // }

// // // export function useBuyNow() {
// // //   const ctx = useContext(BuyNowContext);
// // //   if (!ctx) throw new Error('useBuyNow must be used within BuyNowProvider');
// // //   return ctx;
// // // }


// // 'use client';

// // import { createContext, useContext, useState, type ReactNode } from 'react';

// // interface CouponInfo {
// //   code: string;
// //   discount: number;
// // }

// // interface BuyNowState {
// //   isOpen: boolean;
// //   product: { id: string; title: string; price: number; image?: string } | null;
// //   quantity: number;
// //   coupon: CouponInfo | null;
// //   open: (
// //     product: { id: string; title: string; price: number; image?: string },
// //     quantity: number,
// //     coupon?: CouponInfo
// //   ) => void;
// //   close: () => void;
// // }

// // const BuyNowContext = createContext<BuyNowState | null>(null);

// // export function BuyNowProvider({ children }: { children: ReactNode }) {
// //   const [isOpen, setIsOpen] = useState(false);
// //   const [product, setProduct] = useState<BuyNowState['product']>(null);
// //   const [quantity, setQuantity] = useState(1);
// //   const [coupon, setCoupon] = useState<CouponInfo | null>(null);

// //   const open: BuyNowState['open'] = (p, qty, appliedCoupon) => {
// //     setProduct(p);
// //     setQuantity(qty);
// //     setCoupon(appliedCoupon ?? null);
// //     setIsOpen(true);
// //   };
// //   const close = () => setIsOpen(false);

// //   return (
// //     <BuyNowContext.Provider value={{ isOpen, product, quantity, coupon, open, close }}>
// //       {children}
// //     </BuyNowContext.Provider>
// //   );
// // }

// // export function useBuyNow() {
// //   const ctx = useContext(BuyNowContext);
// //   if (!ctx) throw new Error('useBuyNow must be used within BuyNowProvider');
// //   return ctx;
// // }

// 'use client';

// import { createContext, useContext, useState, type ReactNode } from 'react';

// interface CouponInfo {
//   code: string;
//   discount: number;
// }

// interface VariantInfo {
//   label: string;
//   sku?: string;
// }

// interface BuyNowState {
//   isOpen: boolean;
//   product: { id: string; title: string; price: number; image?: string } | null;
//   quantity: number;
//   coupon: CouponInfo | null;
//   variant: VariantInfo | null;
//   open: (
//     product: { id: string; title: string; price: number; image?: string },
//     quantity: number,
//     coupon?: CouponInfo | null,
//     variant?: VariantInfo | null
//   ) => void;
//   close: () => void;
// }

// const BuyNowContext = createContext<BuyNowState | null>(null);

// export function BuyNowProvider({ children }: { children: ReactNode }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [product, setProduct] = useState<BuyNowState['product']>(null);
//   const [quantity, setQuantity] = useState(1);
//   const [coupon, setCoupon] = useState<CouponInfo | null>(null);
//   const [variant, setVariant] = useState<VariantInfo | null>(null);

//   const open: BuyNowState['open'] = (p, qty, appliedCoupon, selectedVariant) => {
//     setProduct(p);
//     setQuantity(qty);
//     setCoupon(appliedCoupon ?? null);
//     setVariant(selectedVariant ?? null);
//     setIsOpen(true);
//   };
//   const close = () => setIsOpen(false);

//   return (
//     <BuyNowContext.Provider value={{ isOpen, product, quantity, coupon, variant, open, close }}>
//       {children}
//     </BuyNowContext.Provider>
//   );
// }

// export function useBuyNow() {
//   const ctx = useContext(BuyNowContext);
//   if (!ctx) throw new Error('useBuyNow must be used within BuyNowProvider');
//   return ctx;
// }

'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

interface CouponInfo {
  code: string;
  discount: number;
}

interface VariantInfo {
  label: string;
  sku?: string;
}

/** Modal ki ek line: Buy Now me 1 line, Cart checkout me cart ki saari lines. */
export interface CheckoutItem {
  productId: string;
  title: string;
  image?: string | null;
  variantLabel: string | null;
  variantSku?: string | null;
  quantity: number;
  unitPrice: number; // sirf display ke liye, server price khud nikalta hai
}

interface BuyNowState {
  isOpen: boolean;
  /** 'buynow' = ek product direct, 'cart' = server cart se order */
  source: 'buynow' | 'cart';
  items: CheckoutItem[];
  coupon: CouponInfo | null;
  // Buy Now button (PurchaseCard) ka purana signature same hai
  open: (
    product: { id: string; title: string; price: number; image?: string },
    quantity: number,
    coupon?: CouponInfo | null,
    variant?: VariantInfo | null
  ) => void;
  // Cart page ka "Proceed to checkout"
  openCart: (items: CheckoutItem[]) => void;
  close: () => void;
}

const BuyNowContext = createContext<BuyNowState | null>(null);

export function BuyNowProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState<BuyNowState['source']>('buynow');
  const [items, setItems] = useState<CheckoutItem[]>([]);
  const [coupon, setCoupon] = useState<CouponInfo | null>(null);

  const open: BuyNowState['open'] = (p, qty, appliedCoupon, selectedVariant) => {
    setSource('buynow');
    setItems([
      {
        productId: p.id,
        title: p.title,
        image: p.image ?? null,
        variantLabel: selectedVariant?.label ?? null,
        variantSku: selectedVariant?.sku ?? null,
        quantity: qty,
        unitPrice: p.price,
      },
    ]);
    setCoupon(appliedCoupon ?? null);
    setIsOpen(true);
  };

  const openCart: BuyNowState['openCart'] = (cartItems) => {
    setSource('cart');
    setItems(cartItems);
    setCoupon(null);
    setIsOpen(true);
  };

  const close = () => setIsOpen(false);

  return (
    <BuyNowContext.Provider value={{ isOpen, source, items, coupon, open, openCart, close }}>
      {children}
    </BuyNowContext.Provider>
  );
}

export function useBuyNow() {
  const ctx = useContext(BuyNowContext);
  if (!ctx) throw new Error('useBuyNow must be used within BuyNowProvider');
  return ctx;
}