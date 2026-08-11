'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Button from '@/components/ui/Button';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { forgotPassword, verifyForgotOtp } = useAuth();
  
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<1 | 2>(1); // 1: Send OTP, 2: Verify OTP
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      await forgotPassword(email.trim());
      setSuccessMessage('A password recovery code has been sent to your email.');
      setStep(2);
    } catch (err: any) {
      setError(err.message || 'Failed to send recovery code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.trim() || otp.trim().length !== 6) {
      setError('Please enter a valid 6-digit OTP code.');
      return;
    }
    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      const resetToken = await verifyForgotOtp(email.trim(), otp.trim());
      setSuccessMessage('OTP verified successfully!');
      
      // Redirect to reset password page with the cryptographically secure token
      setTimeout(() => {
        router.push(`/auth/reset-password?token=${encodeURIComponent(resetToken)}`);
      }, 1000);
    } catch (err: any) {
      setError(err.message || 'Invalid code. Please try again.');
    } finally {
      setLoading(false);
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
            Recover Account
          </h1>
          <p className="font-sans text-xs uppercase tracking-widest text-ink-soft/60 mt-1">
            Reset your password
          </p>
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

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.form
              key="step-email"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSendOtp}
              className="space-y-6"
            >
              <div>
                <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-ink-soft mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. arjun@example.com"
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-xl border border-gold-400/30 bg-ivory focus:border-saffron-500 focus:outline-none transition-all font-sans text-ink text-sm shadow-inner disabled:opacity-50"
                />
              </div>

              <Button
                type="submit"
                variant="maroon"
                fullWidth
                disabled={loading}
                className="py-3.5 rounded-xl text-sm font-sans tracking-royal uppercase shadow-gold hover:shadow-glow transition-all"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 size={16} className="animate-spin" />
                    Sending Code...
                  </span>
                ) : (
                  'Send Code'
                )}
              </Button>
            </motion.form>
          ) : (
            <motion.form
              key="step-otp"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleVerifyOtp}
              className="space-y-6"
            >
              <div>
                <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-ink-soft mb-1.5 text-center">
                  Verification Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="123456"
                  disabled={loading}
                  className="w-full text-center tracking-[0.75em] pl-3 font-sans text-2xl font-bold py-3.5 rounded-xl border border-gold-400/30 bg-ivory focus:border-saffron-500 focus:outline-none transition-all text-ink shadow-inner disabled:opacity-50"
                />
              </div>

              <Button
                type="submit"
                variant="maroon"
                fullWidth
                disabled={loading || otp.length !== 6}
                className="py-3.5 rounded-xl text-sm font-sans tracking-royal uppercase shadow-gold hover:shadow-glow transition-all"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 size={16} className="animate-spin" />
                    Verifying...
                  </span>
                ) : (
                  'Verify Code'
                )}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>

        <div className="text-center mt-8 border-t border-gold-400/10 pt-6">
          <Link
            href="/auth/login"
            className="font-royal text-xs uppercase tracking-royal text-ink/50 hover:text-ink transition-colors"
          >
            ← Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
