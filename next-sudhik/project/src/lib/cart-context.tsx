// 'use client';

// import {
//   createContext,
//   useCallback,
//   useContext,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
//   type ReactNode,
// } from 'react';
// import { apiRequest } from '@/lib/api';
// import { useAuth } from '@/lib/auth-context';

// const CART_TOKEN_KEY = 'shuddhik_cart_token';

// export type CartItem = {
//   productId: string;
//   slug: string;
//   title: string;
//   image: string | null;
//   variantLabel: string | null;
//   quantity: number;
//   unitPrice: number;
//   originalPrice: number;
//   lineTotal: number;
//   stock: number;
//   available: boolean;
// };

// export type Cart = {
//   cartToken: string | null;
//   items: CartItem[];
//   itemCount: number;
//   subtotal: number;
// };

// const EMPTY_CART: Cart = { cartToken: null, items: [], itemCount: 0, subtotal: 0 };

// type CartContextValue = {
//   cart: Cart;
//   loading: boolean;
//   itemCount: number;
//   subtotal: number;
//   addToCart: (productId: string, variantLabel?: string | null, quantity?: number) => Promise<void>;
//   updateQty: (productId: string, variantLabel: string | null, quantity: number) => Promise<void>;
//   removeItem: (productId: string, variantLabel: string | null) => Promise<void>;
//   clearCart: () => Promise<void>;
//   refresh: () => Promise<void>;
// };

// const CartContext = createContext<CartContextValue | null>(null);

// function getCartToken(): string | null {
//   if (typeof window === 'undefined') return null;
//   return localStorage.getItem(CART_TOKEN_KEY);
// }
// function setCartToken(token: string) {
//   if (typeof window !== 'undefined') localStorage.setItem(CART_TOKEN_KEY, token);
// }
// function clearCartToken() {
//   if (typeof window !== 'undefined') localStorage.removeItem(CART_TOKEN_KEY);
// }

// /** Har cart request me auth token + guest cart token dono jaate hain. */
// function cartRequest<T>(
//   method: 'GET' | 'POST' | 'PUT' | 'DELETE',
//   path: string,
//   body?: unknown
// ) {
//   const token = getCartToken();
//   return apiRequest<T>(path, {
//     method,
//     body,
//     auth: true,
//     headers: token ? { 'x-cart-token': token } : {},
//   });
// }

// export function CartProvider({ children }: { children: ReactNode }) {
//   const { user } = useAuth();
//   const [cart, setCart] = useState<Cart>(EMPTY_CART);
//   const [loading, setLoading] = useState(true);
//   const wasLoggedIn = useRef(false);

//   // Server response ko state me daalo; guest ka token save karo.
//   const applyCart = useCallback((data: Cart, isLoggedIn: boolean) => {
//     if (!isLoggedIn && data.cartToken) setCartToken(data.cartToken);
//     setCart(data);
//   }, []);

//   const refresh = useCallback(async () => {
//     // Guest ke paas token nahi hai to cart abhi bana hi nahi, API call mat karo
//     // (warna har visit pe naya khali cart ban jayega).
//     if (!user && !getCartToken()) {
//       setCart(EMPTY_CART);
//       setLoading(false);
//       return;
//     }
//     try {
//       const data = await cartRequest<Cart>('GET', '/api/cart');
//       applyCart(data, !!user);
//     } catch {
//       setCart(EMPTY_CART);
//     } finally {
//       setLoading(false);
//     }
//   }, [user, applyCart]);

//   // Login/logout ke hisaab se cart sync.
//   const userKey = user ? String((user as any)._id ?? (user as any).id ?? 'user') : null;
//   useEffect(() => {
//     let cancelled = false;

//     (async () => {
//       if (userKey) {
//         wasLoggedIn.current = true;
//         const guestToken = getCartToken();
//         try {
//           if (guestToken) {
//             // Login ke baad guest cart merge karo, phir token hata do.
//             const merged = await cartRequest<Cart>('POST', '/api/cart/merge', {
//               cartToken: guestToken,
//             });
//             clearCartToken();
//             if (!cancelled) setCart(merged);
//           } else {
//             const data = await cartRequest<Cart>('GET', '/api/cart');
//             if (!cancelled) setCart(data);
//           }
//         } catch {
//           if (!cancelled) setCart(EMPTY_CART);
//         } finally {
//           if (!cancelled) setLoading(false);
//         }
//       } else {
//         if (wasLoggedIn.current) {
//           // Logout hua: cart state saaf karo.
//           wasLoggedIn.current = false;
//           clearCartToken();
//           setCart(EMPTY_CART);
//           setLoading(false);
//         } else {
//           await refresh();
//         }
//       }
//     })();

//     return () => {
//       cancelled = true;
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [userKey]);

//   const addToCart = useCallback(
//     async (productId: string, variantLabel: string | null = null, quantity = 1) => {
//       const data = await cartRequest<Cart>('POST', '/api/cart', {
//         productId,
//         variantLabel,
//         quantity,
//       });
//       applyCart(data, !!user);
//     },
//     [user, applyCart]
//   );

//   const updateQty = useCallback(
//     async (productId: string, variantLabel: string | null, quantity: number) => {
//       const data = await cartRequest<Cart>('PUT', '/api/cart', {
//         productId,
//         variantLabel,
//         quantity,
//       });
//       applyCart(data, !!user);
//     },
//     [user, applyCart]
//   );

//   const removeItem = useCallback(
//     async (productId: string, variantLabel: string | null) => {
//       const data = await cartRequest<Cart>('DELETE', '/api/cart', {
//         productId,
//         variantLabel,
//       });
//       applyCart(data, !!user);
//     },
//     [user, applyCart]
//   );

//   const clearCart = useCallback(async () => {
//     const data = await cartRequest<Cart>('DELETE', '/api/cart/clear');
//     applyCart(data, !!user);
//   }, [user, applyCart]);

//   const value = useMemo<CartContextValue>(
//     () => ({
//       cart,
//       loading,
//       itemCount: cart.itemCount,
//       subtotal: cart.subtotal,
//       addToCart,
//       updateQty,
//       removeItem,
//       clearCart,
//       refresh,
//     }),
//     [cart, loading, addToCart, updateQty, removeItem, clearCart, refresh]
//   );

//   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// }

// export function useCart() {
//   const ctx = useContext(CartContext);
//   if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
//   return ctx;
// }

'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { apiRequest } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';

const CART_TOKEN_KEY = 'shuddhik_cart_token';

export type CartItem = {
  productId: string;
  slug: string;
  title: string;
  image: string | null;
  variantLabel: string | null;
  quantity: number;
  unitPrice: number;
  originalPrice: number;
  lineTotal: number;
  stock: number;
  available: boolean;
};

export type Cart = {
  cartToken: string | null;
  items: CartItem[];
  itemCount: number;
  subtotal: number;
};

const EMPTY_CART: Cart = { cartToken: null, items: [], itemCount: 0, subtotal: 0 };

type CartContextValue = {
  cart: Cart;
  loading: boolean;
  itemCount: number;
  subtotal: number;
  addToCart: (productId: string, variantLabel?: string | null, quantity?: number) => Promise<void>;
  updateQty: (productId: string, variantLabel: string | null, quantity: number) => Promise<void>;
  removeItem: (productId: string, variantLabel: string | null) => Promise<void>;
  clearCart: () => Promise<void>;
  refresh: () => Promise<void>;
};

const CartContext = createContext<CartContextValue | null>(null);

export function getCartToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(CART_TOKEN_KEY);
}
function setCartToken(token: string) {
  if (typeof window !== 'undefined') localStorage.setItem(CART_TOKEN_KEY, token);
}
function clearCartToken() {
  if (typeof window !== 'undefined') localStorage.removeItem(CART_TOKEN_KEY);
}

/** Har cart request me auth token + guest cart token dono jaate hain. */
function cartRequest<T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  path: string,
  body?: unknown
) {
  const token = getCartToken();
  return apiRequest<T>(path, {
    method,
    body,
    auth: true,
    headers: token ? { 'x-cart-token': token } : {},
  });
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [cart, setCart] = useState<Cart>(EMPTY_CART);
  const [loading, setLoading] = useState(true);
  const wasLoggedIn = useRef(false);

  // Server response ko state me daalo; guest ka token save karo.
  const applyCart = useCallback((data: Cart, isLoggedIn: boolean) => {
    if (!isLoggedIn && data.cartToken) setCartToken(data.cartToken);
    setCart(data);
  }, []);

  const refresh = useCallback(async () => {
    // Guest ke paas token nahi hai to cart abhi bana hi nahi, API call mat karo
    // (warna har visit pe naya khali cart ban jayega).
    if (!user && !getCartToken()) {
      setCart(EMPTY_CART);
      setLoading(false);
      return;
    }
    try {
      const data = await cartRequest<Cart>('GET', '/api/cart');
      applyCart(data, !!user);
    } catch {
      setCart(EMPTY_CART);
    } finally {
      setLoading(false);
    }
  }, [user, applyCart]);

  // Login/logout ke hisaab se cart sync.
  const userKey = user ? String((user as any)._id ?? (user as any).id ?? 'user') : null;
  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (userKey) {
        wasLoggedIn.current = true;
        const guestToken = getCartToken();
        try {
          if (guestToken) {
            // Login ke baad guest cart merge karo, phir token hata do.
            const merged = await cartRequest<Cart>('POST', '/api/cart/merge', {
              cartToken: guestToken,
            });
            clearCartToken();
            if (!cancelled) setCart(merged);
          } else {
            const data = await cartRequest<Cart>('GET', '/api/cart');
            if (!cancelled) setCart(data);
          }
        } catch {
          if (!cancelled) setCart(EMPTY_CART);
        } finally {
          if (!cancelled) setLoading(false);
        }
      } else {
        if (wasLoggedIn.current) {
          // Logout hua: cart state saaf karo.
          wasLoggedIn.current = false;
          clearCartToken();
          setCart(EMPTY_CART);
          setLoading(false);
        } else {
          await refresh();
        }
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userKey]);

  const addToCart = useCallback(
    async (productId: string, variantLabel: string | null = null, quantity = 1) => {
      const data = await cartRequest<Cart>('POST', '/api/cart', {
        productId,
        variantLabel,
        quantity,
      });
      applyCart(data, !!user);
    },
    [user, applyCart]
  );

  const updateQty = useCallback(
    async (productId: string, variantLabel: string | null, quantity: number) => {
      const data = await cartRequest<Cart>('PUT', '/api/cart', {
        productId,
        variantLabel,
        quantity,
      });
      applyCart(data, !!user);
    },
    [user, applyCart]
  );

  const removeItem = useCallback(
    async (productId: string, variantLabel: string | null) => {
      const data = await cartRequest<Cart>('DELETE', '/api/cart', {
        productId,
        variantLabel,
      });
      applyCart(data, !!user);
    },
    [user, applyCart]
  );

  const clearCart = useCallback(async () => {
    const data = await cartRequest<Cart>('DELETE', '/api/cart/clear');
    applyCart(data, !!user);
  }, [user, applyCart]);

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      loading,
      itemCount: cart.itemCount,
      subtotal: cart.subtotal,
      addToCart,
      updateQty,
      removeItem,
      clearCart,
      refresh,
    }),
    [cart, loading, addToCart, updateQty, removeItem, clearCart, refresh]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}