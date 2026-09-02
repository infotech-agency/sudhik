// 'use client';

// import { useEffect, useRef } from 'react';
// import { useSearchParams } from 'next/navigation';
// import Link from 'next/link';
// import { Check } from 'lucide-react';
// import Button from '@/components/ui/Button';

// declare global {
//   interface Window {
//     fbq?: (...args: any[]) => void;
//     gtag?: (...args: any[]) => void;
//     dataLayer?: any[];
//   }
// }

// export default function OrderSuccessPage() {
//   const params = useSearchParams();
//   const orderId = params.get('orderId') || '';
//   const amount = Number(params.get('amount')) || 0;
//   const fired = useRef(false);

//   useEffect(() => {
//     if (fired.current || !orderId) return;
//     fired.current = true;

//     // Prefer GTM dataLayer if it exists — lets the marketing/SEO team manage
//     // Meta, Google Ads and GA4 tags from one place without code changes.
//     if (typeof window !== 'undefined' && Array.isArray(window.dataLayer)) {
//       window.dataLayer.push({
//         event: 'purchase',
//         transaction_id: orderId,
//         value: amount,
//         currency: 'INR',
//       });
//     }

//     // Direct Meta Pixel fallback (only fires if fbq is loaded and GTM isn't handling it)
//     if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
//       window.fbq('track', 'Purchase', {
//         value: amount,
//         currency: 'INR',
//         content_ids: [orderId],
//       });
//     }

//     // Direct GA4 / Google Ads fallback
//     if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
//       window.gtag('event', 'purchase', {
//         transaction_id: orderId,
//         value: amount,
//         currency: 'INR',
//       });
//     }
//   }, [orderId, amount]);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-ivory px-4">
//       <div className="text-center py-16">
//         <div className="w-20 h-20 rounded-full bg-gradient-to-br from-saffron-500 to-maroon-500 text-ivory flex items-center justify-center mx-auto mb-6 shadow-gold">
//           <Check size={36} />
//         </div>
//         <h1 className="font-display text-3xl text-ink font-bold">Order Placed with Devotion</h1>
//         <p className="font-serif text-lg text-ink/90 mt-3 max-w-md mx-auto font-medium">
//           Your order{orderId ? ` #${orderId}` : ''} has been received. We will deliver it with the care it deserves.
//         </p>
//         <div className="mt-8">
//           <Link href="/">
//             <Button variant="outline">Continue Shopping</Button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Check } from 'lucide-react';
import Button from '@/components/ui/Button';

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export default function OrderSuccessPage() {
  const params = useSearchParams();
  const orderId = params.get('orderId') || '';
  const amount = Number(params.get('amount')) || 0;
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current || !orderId) return;
    fired.current = true;

    // Prefer GTM dataLayer if it exists — lets the marketing/SEO team manage
    // Meta, Google Ads and GA4 tags from one place without code changes.
    if (typeof window !== 'undefined' && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: 'purchase',
        transaction_id: orderId,
        value: amount,
        currency: 'INR',
      });
    }

    // Direct Meta Pixel fallback (only fires if fbq is loaded and GTM isn't handling it)
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('track', 'Purchase', {
        value: amount,
        currency: 'INR',
        content_ids: [orderId],
      });
    }

    // Direct GA4 / Google Ads fallback
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'purchase', {
        transaction_id: orderId,
        value: amount,
        currency: 'INR',
      });
    }
  }, [orderId, amount]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-ivory px-4">
      <div className="text-center py-16">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-saffron-500 to-maroon-500 text-ivory flex items-center justify-center mx-auto mb-6 shadow-gold">
          <Check size={36} />
        </div>
        <h1 className="font-display text-3xl text-ink font-bold">Order Placed with Devotion</h1>
        <p className="font-serif text-lg text-ink/90 mt-3 max-w-md mx-auto font-medium">
          Your order{orderId ? ` #${orderId}` : ''} has been received. We will deliver it with the care it deserves.
        </p>
        <div className="mt-8">
          <Link href="/">
            <Button variant="outline">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}