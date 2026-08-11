'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Button from '@/components/ui/Button';

function VerifyOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { verifyOtp, resendOtp } = useAuth();
  
  const email = searchParams.get('email') || '';
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Resend cooldown timer (60s)
  const [cooldown, setCooldown] = useState(0);
  const [resendLoading, setResendLoading] = useState(false);

  useEffect(() => {
    if (!email) {
      setError('No email address provided for verification.');
    }
  }, [email]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.trim() || otp.trim().length !== 6) {
      setError('Please enter a valid 6-digit OTP code.');
      return;
    }
    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      await verifyOtp(email, otp.trim());
      setSuccessMessage('Email verified successfully! Logging you in...');
      
      // Successful registration login redirect
      const redirectPath = sessionStorage.getItem('auth_redirect') || '/products';
      sessionStorage.removeItem('auth_redirect');
      setTimeout(() => {
        router.push(redirectPath);
        router.refresh();
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Verification failed. Please check the code.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (cooldown > 0 || resendLoading) return;
    setError('');
    setSuccessMessage('');
    setResendLoading(true);

    try {
      await resendOtp(email);
      setSuccessMessage('A new verification code has been sent to your email.');
      setCooldown(60); // 60s cooldown
    } catch (err: any) {
      setError(err.message || 'Failed to resend code. Please try again.');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-16 min-h-screen bg-ivory flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-saffron-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-maroon-600/10 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md bg-ivory-dim/60 backdrop-blur-xl border border-gold-400/20 p-8 rounded-3xl shadow-premium relative z-10"
      >
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <Image src="/assets/logo.png" height={60} width={60} alt="logo" className="mx-auto" />
          </div>
          <h1 className="font-royal text-2xl tracking-royal text-ink font-bold uppercase">
            Verify Email
          </h1>
          <p className="font-sans text-xs uppercase tracking-widest text-ink-soft/60 mt-1">
            Enter the 6-Digit Code
          </p>
          {email && (
            <p className="font-serif text-sm text-ink-soft/75 mt-3">
              We sent a verification code to <span className="font-sans font-semibold text-ink">{email}</span>
            </p>
          )}
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-xl bg-maroon-950/5 border border-maroon-600/20 text-maroon-600 flex items-start gap-3"
          >
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <span className="font-sans text-sm font-medium">{error}</span>
          </motion.div>
        )}

        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-xl bg-gold-50/40 border border-gold-400/30 text-ink flex items-start gap-3"
          >
            <CheckCircle size={18} className="shrink-0 mt-0.5 text-saffron-600" />
            <span className="font-sans text-sm font-medium text-[#c97a1a]">{successMessage}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-ink-soft mb-2 text-center">
              Verification Code
            </label>
            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              placeholder="123456"
              disabled={loading || !email}
              className="w-full text-center tracking-[0.75em] pl-3 font-sans text-2xl font-bold py-3.5 rounded-xl border border-gold-400/30 bg-ivory focus:border-saffron-500 focus:outline-none transition-all text-ink shadow-inner disabled:opacity-50"
            />
          </div>

          <Button
            type="submit"
            variant="maroon"
            fullWidth
            disabled={loading || !email || otp.length !== 6}
            className="py-3.5 rounded-xl text-sm font-sans tracking-royal uppercase shadow-gold hover:shadow-glow transition-all"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 size={16} className="animate-spin" />
                Verifying...
              </span>
            ) : (
              'Verify & Sign In'
            )}
          </Button>
        </form>

        <div className="text-center mt-8">
          <p className="font-sans text-sm text-ink-soft/75">
            Didn't receive the code?{' '}
            <button
              type="button"
              onClick={handleResend}
              disabled={cooldown > 0 || resendLoading || !email}
              className="text-saffron-600 font-semibold hover:text-saffron-700 disabled:opacity-55 disabled:cursor-not-allowed hover:underline transition-all"
            >
              {resendLoading ? (
                <span className="flex items-center gap-1">
                  <Loader2 size={12} className="animate-spin" />
                  Sending...
                </span>
              ) : cooldown > 0 ? (
                `Resend in ${cooldown}s`
              ) : (
                'Resend Code'
              )}
            </button>
          </p>
          <Link
            href="/auth/login"
            className="inline-block mt-6 font-royal text-xs uppercase tracking-royal text-ink/50 hover:text-ink transition-colors"
          >
            ← Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={
      <div className="pt-28 pb-16 min-h-screen bg-ivory flex items-center justify-center">
        <Loader2 size={40} className="text-saffron-500 animate-spin" />
      </div>
    }>
      <VerifyOtpContent />
    </Suspense>
  );
}
