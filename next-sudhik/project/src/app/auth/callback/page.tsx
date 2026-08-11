'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, Loader2, AlertCircle } from 'lucide-react';
import { setToken } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';

function OAuthCallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { refresh } = useAuth();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      setToken(token);
      refresh().then(() => {
        setStatus('success');
        const redirectPath = sessionStorage.getItem('auth_redirect') || '/products';
        sessionStorage.removeItem('auth_redirect');
        setTimeout(() => router.push(redirectPath), 1800);
      });
    } else {
      setStatus('error');
      setError('No authentication token received. Please try again.');
    }
  }, [searchParams, refresh, router]);

  return (
    <div className="pt-24 min-h-screen bg-ivory flex items-center justify-center px-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        {status === 'loading' && (
          <>
            <Loader2 size={40} className="text-saffron-500 animate-spin mx-auto mb-6" />
            <h1 className="font-display text-3xl text-ink">Completing sign in…</h1>
            <p className="font-serif text-ink/55 mt-3">Welcoming you to the SHUDDHIK parivaar.</p>
          </>
        )}
        {status === 'success' && (
          <>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }} className="w-20 h-20 rounded-full bg-gradient-to-br from-saffron-500 to-maroon-500 text-ivory flex items-center justify-center mx-auto mb-6 shadow-gold">
              <Check size={36} />
            </motion.div>
            <h1 className="font-display text-3xl text-ink">Welcome back</h1>
            <p className="font-serif text-ink/65 mt-3">You are signed in. Taking you to the product…</p>
          </>
        )}
        {status === 'error' && (
          <>
            <div className="w-16 h-16 rounded-full bg-maroon-50 border border-maroon-500/30 text-maroon-500 flex items-center justify-center mx-auto mb-6">
              <AlertCircle size={28} />
            </div>
            <h1 className="font-display text-3xl text-ink">Sign in failed</h1>
            <p className="font-serif text-ink/55 mt-3">{error}</p>
            <button onClick={() => router.push('/products')} className="mt-6 font-royal text-xs tracking-royal uppercase text-saffron-500 hover:text-saffron-600">
              Continue as guest →
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default function OAuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="pt-24 min-h-screen bg-ivory flex items-center justify-center">
        <Loader2 size={40} className="text-saffron-500 animate-spin" />
      </div>
    }>
      <OAuthCallbackContent />
    </Suspense>
  );
}
