// 'use client';

// import { createContext, useContext, useState, type ReactNode } from 'react';

// interface BuyNowState {
//   isOpen: boolean;
//   product: { id: string; title: string; price: number; image?: string } | null;
//   quantity: number;
//   open: (product: { id: string; title: string; price: number; image?: string }, quantity: number) => void;
//   close: () => void;
// }

// const BuyNowContext = createContext<BuyNowState | null>(null);

// export function BuyNowProvider({ children }: { children: ReactNode }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [product, setProduct] = useState<BuyNowState['product']>(null);
//   const [quantity, setQuantity] = useState(1);

//   const open: BuyNowState['open'] = (p, qty) => {
//     setProduct(p);
//     setQuantity(qty);
//     setIsOpen(true);
//   };
//   const close = () => setIsOpen(false);

//   return (
//     <BuyNowContext.Provider value={{ isOpen, product, quantity, open, close }}>
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

interface BuyNowState {
  isOpen: boolean;
  product: { id: string; title: string; price: number; image?: string } | null;
  quantity: number;
  coupon: CouponInfo | null;
  open: (
    product: { id: string; title: string; price: number; image?: string },
    quantity: number,
    coupon?: CouponInfo
  ) => void;
  close: () => void;
}

const BuyNowContext = createContext<BuyNowState | null>(null);

export function BuyNowProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<BuyNowState['product']>(null);
  const [quantity, setQuantity] = useState(1);
  const [coupon, setCoupon] = useState<CouponInfo | null>(null);

  const open: BuyNowState['open'] = (p, qty, appliedCoupon) => {
    setProduct(p);
    setQuantity(qty);
    setCoupon(appliedCoupon ?? null);
    setIsOpen(true);
  };
  const close = () => setIsOpen(false);

  return (
    <BuyNowContext.Provider value={{ isOpen, product, quantity, coupon, open, close }}>
      {children}
    </BuyNowContext.Provider>
  );
}

export function useBuyNow() {
  const ctx = useContext(BuyNowContext);
  if (!ctx) throw new Error('useBuyNow must be used within BuyNowProvider');
  return ctx;
}