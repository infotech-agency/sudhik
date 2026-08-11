'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, Loader2, AlertCircle, X } from 'lucide-react';
import { api, ApiError } from '@/lib/api';
import Button from '@/components/ui/Button';

function PaymentCallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'verifying' | 'success' | 'failed'>('verifying');
  const [orderId, setOrderId] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const merchantTxn =
      searchParams.get('merchantTransactionId') ||
      searchParams.get('merchant_transaction_id') ||
      sessionStorage.getItem('pending_merchant_txn');

    if (!merchantTxn) {
      setStatus('failed');
      setError('No transaction reference found. If you completed payment, your order is still being processed.');
      return;
    }

    sessionStorage.removeItem('pending_merchant_txn');

    (async () => {
      try {
        const res = await api.post<{ _id?: string; orderId?: string; status: string }>('/api/orders/verify-payment', {
          merchantTransactionId: merchantTxn,
        });
        setOrderId(res._id || res.orderId || merchantTxn);
        setStatus('success');
      } catch (err) {
        const msg = err instanceof ApiError ? err.message : 'Payment verification failed.';
        setError(msg);
        setStatus('failed');
      }
    })();
  }, [searchParams]);

  return (
    <div className="pt-24 min-h-screen bg-ivory flex items-center justify-center px-5">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-md">
        {status === 'verifying' && (
          <>
            <Loader2 size={40} className="text-saffron-500 animate-spin mx-auto mb-6" />
            <h1 className="font-display text-3xl text-ink">Verifying your payment…</h1>
            <p className="font-serif text-ink/55 mt-3">Please wait while we confirm your order.</p>
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
            <p className="font-deva text-2xl text-saffron-500/70 mt-6">ईश्वर आपका भला करे</p>
            <div className="mt-8">
              <Button variant="outline" onClick={() => router.push('/products')}>Continue Shopping</Button>
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
