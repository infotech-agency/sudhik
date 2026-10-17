// 'use client';

// import { useEffect, useState, Suspense } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import { motion } from 'framer-motion';
// import { Check, Loader2, AlertCircle, X } from 'lucide-react';
// import { api, ApiError } from '@/lib/api';
// import Button from '@/components/ui/Button';

// function PaymentCallbackContent() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const [status, setStatus] = useState<'verifying' | 'success' | 'failed'>('verifying');
//   const [orderId, setOrderId] = useState('');
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const merchantTxn =
//       searchParams.get('merchantTransactionId') ||
//       searchParams.get('merchant_transaction_id') ||
//       sessionStorage.getItem('pending_merchant_txn');

//     if (!merchantTxn) {
//       setStatus('failed');
//       setError('No transaction reference found. If you completed payment, your order is still being processed.');
//       return;
//     }

//     sessionStorage.removeItem('pending_merchant_txn');

//     (async () => {
//       try {
//         const res = await api.post<{ _id?: string; orderId?: string; status: string }>('/api/orders/verify-payment', {
//           merchantTransactionId: merchantTxn,
//         });
//         setOrderId(res._id || res.orderId || merchantTxn);
//         setStatus('success');
//       } catch (err) {
//         const msg = err instanceof ApiError ? err.message : 'Payment verification failed.';
//         setError(msg);
//         setStatus('failed');
//       }
//     })();
//   }, [searchParams]);

//   return (
//     <div className="pt-24 min-h-screen bg-ivory flex items-center justify-center px-5">
//       <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-md">
//         {status === 'verifying' && (
//           <>
//             <Loader2 size={40} className="text-saffron-500 animate-spin mx-auto mb-6" />
//             <h1 className="font-display text-3xl text-ink">Verifying your payment…</h1>
//             <p className="font-serif text-ink/55 mt-3">Please wait while we confirm your order.</p>
//           </>
//         )}
//         {status === 'success' && (
//           <>
//             <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }} className="w-20 h-20 rounded-full bg-gradient-to-br from-saffron-500 to-maroon-500 text-ivory flex items-center justify-center mx-auto mb-6 shadow-gold">
//               <Check size={36} />
//             </motion.div>
//             <h1 className="font-display text-3xl text-ink">Payment Successful</h1>
//             <p className="font-serif text-ink/65 mt-3">Your order has been confirmed with gratitude.</p>
//             {orderId && (
//               <div className="mt-6 inline-flex flex-col gap-1 px-6 py-4 rounded-2xl bg-gold-50 border border-gold-400/25">
//                 <span className="font-royal text-[10px] tracking-royal uppercase text-ink/45">Order Reference</span>
//                 <span className="font-display text-lg text-ink">{orderId}</span>
//               </div>
//             )}
//             {/* <p className="font-deva text-2xl text-saffron-500/70 mt-6">ईश्वर आपका भला करे</p> */}
//             <div className="mt-8">
//               <Button variant="outline" onClick={() => router.push('/products')}>Continue Shopping</Button>
//             </div>
//           </>
//         )}
//         {status === 'failed' && (
//           <>
//             <div className="w-16 h-16 rounded-full bg-maroon-50 border border-maroon-500/30 text-maroon-500 flex items-center justify-center mx-auto mb-6">
//               <X size={28} />
//             </div>
//             <h1 className="font-display text-3xl text-ink">Payment could not be verified</h1>
//             <p className="font-serif text-ink/55 mt-3 max-w-sm mx-auto">{error}</p>
//             <p className="font-serif text-ink/45 mt-2 text-sm">If money was deducted, it will be refunded within 5–7 days.</p>
//             <div className="mt-8 flex items-center justify-center gap-3">
//               <Button variant="outline" onClick={() => router.push('/products')}>Back to Products</Button>
//             </div>
//           </>
//         )}
//       </motion.div>
//     </div>
//   );
// }

// export default function PaymentCallbackPage() {
//   return (
//     <Suspense fallback={
//       <div className="pt-24 min-h-screen bg-ivory flex items-center justify-center">
//         <Loader2 size={40} className="text-saffron-500 animate-spin" />
//       </div>
//     }>
//       <PaymentCallbackContent />
//     </Suspense>
//   );
// }


'use client';

import { useEffect, useRef, useState, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, Loader2, Clock, X } from 'lucide-react';
import { api, ApiError } from '@/lib/api';
import Button from '@/components/ui/Button';

// PhonePe se wapas aate waqt status kai baar kuch second tak PENDING rehta hai,
// isliye pehle retry karte hain, tab "failed" dikhate hain jab PhonePe ne final fail bola ho.
const MAX_ATTEMPTS = 8;
const RETRY_MS = 3000;

type Status = 'verifying' | 'success' | 'delayed' | 'failed';

function PaymentCallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<Status>('verifying');
  const [orderId, setOrderId] = useState('');
  const [error, setError] = useState('');
  const [txn, setTxn] = useState('');
  const started = useRef(false);

  const verify = useCallback(
    async (merchantTxn: string) => {
      setStatus('verifying');
      setError('');

      for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
        try {
          const res = await api.post<{
            _id?: string;
            orderId?: string;
            totalAmount?: number;
            status: string;
          }>('/api/orders/verify-payment', { merchantTransactionId: merchantTxn });

          const id = res._id || res.orderId || merchantTxn;
          setOrderId(id);
          setStatus('success');

          // COD ki tarah /order-success par bhejo, taaki Purchase conversion
          // (Meta Pixel / GA4 / Google Ads) online orders ke liye bhi fire ho.
          const search = new URLSearchParams({
            orderId: String(id),
            amount: String(res.totalAmount ?? ''),
          });
          setTimeout(() => router.replace(`/order-success?${search.toString()}`), 800);
          return;
        } catch (err) {
          const message = err instanceof ApiError ? err.message : '';
          const code = err instanceof ApiError ? err.status : 0;
          const isPending = code === 402 && /PENDING/i.test(message);

          // PhonePe ne final fail bola (402, pending nahi) ya order hi nahi mila
          if ((code === 402 && !isPending) || code === 404) {
            setError(message || 'Payment verification failed.');
            setStatus('failed');
            return;
          }

          // pending ya network/server error: thodi der baad dobara
          if (attempt < MAX_ATTEMPTS) {
            await new Promise((r) => setTimeout(r, RETRY_MS));
          }
        }
      }

      // Itni der baad bhi confirm nahi hua: paisa kata ho to order apne aap confirm ho jayega.
      setStatus('delayed');
    },
    [router]
  );

  useEffect(() => {
    if (started.current) return; // React strict mode me double call se bachao
    started.current = true;

    const merchantTxn =
      searchParams.get('merchantTransactionId') ||
      searchParams.get('merchant_transaction_id') ||
      sessionStorage.getItem('pending_merchant_txn');

    if (!merchantTxn) {
      setStatus('failed');
      setError('No transaction reference found. If you completed payment, your order is still being processed.');
      return;
    }

    setTxn(merchantTxn);
    sessionStorage.removeItem('pending_merchant_txn');
    verify(merchantTxn);
  }, [searchParams, verify]);

  return (
    <div className="pt-24 min-h-screen bg-ivory flex items-center justify-center px-5">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-md">
        {status === 'verifying' && (
          <>
            <Loader2 size={40} className="text-saffron-500 animate-spin mx-auto mb-6" />
            <h1 className="font-display text-3xl text-ink">Verifying your payment…</h1>
            <p className="font-serif text-ink/55 mt-3">Please wait while we confirm your order. Do not close this page.</p>
          </>
        )}

        {status === 'success' && (
          <>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }} className="w-20 h-20 rounded-full bg-gradient-to-br from-saffron-500 to-maroon-500 text-ivory flex items-center justify-center mx-auto mb-6 shadow-gold">
              <Check size={36} />
            </motion.div>
            <h1 className="font-display text-3xl text-ink">Payment Successful</h1>
            <p className="font-serif text-ink/65 mt-3">Your order has been confirmed with gratitude.</p>
            {orderId && (
              <div className="mt-6 inline-flex flex-col gap-1 px-6 py-4 rounded-2xl bg-gold-50 border border-gold-400/25">
                <span className="font-royal text-[10px] tracking-royal uppercase text-ink/45">Order Reference</span>
                <span className="font-display text-lg text-ink">{orderId}</span>
              </div>
            )}
            <p className="font-serif text-ink/45 mt-4 text-sm">Taking you to your confirmation…</p>
          </>
        )}

        {status === 'delayed' && (
          <>
            <div className="w-16 h-16 rounded-full bg-gold-50 border border-gold-400/30 text-saffron-600 flex items-center justify-center mx-auto mb-6">
              <Clock size={28} />
            </div>
            <h1 className="font-display text-3xl text-ink">Still confirming your payment</h1>
            <p className="font-serif text-ink/55 mt-3 max-w-sm mx-auto">
              This is taking longer than usual. If money was deducted, your order will be confirmed
              automatically within a few minutes. You do not need to pay again.
            </p>
            {txn && <p className="font-serif text-ink/45 mt-2 text-xs">Reference: {txn}</p>}
            <div className="mt-8 flex items-center justify-center gap-3">
              <Button variant="primary" onClick={() => txn && verify(txn)}>Check again</Button>
              <Button variant="outline" onClick={() => router.push('/products')}>Back to Products</Button>
            </div>
          </>
        )}

        {status === 'failed' && (
          <>
            <div className="w-16 h-16 rounded-full bg-maroon-50 border border-maroon-500/30 text-maroon-500 flex items-center justify-center mx-auto mb-6">
              <X size={28} />
            </div>
            <h1 className="font-display text-3xl text-ink">Payment could not be verified</h1>
            <p className="font-serif text-ink/55 mt-3 max-w-sm mx-auto">{error}</p>
            <p className="font-serif text-ink/45 mt-2 text-sm">If money was deducted, it will be refunded within 5–7 days.</p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <Button variant="outline" onClick={() => router.push('/products')}>Back to Products</Button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default function PaymentCallbackPage() {
  return (
    <Suspense fallback={
      <div className="pt-24 min-h-screen bg-ivory flex items-center justify-center">
        <Loader2 size={40} className="text-saffron-500 animate-spin" />
      </div>
    }>
      <PaymentCallbackContent />
    </Suspense>
  );
}