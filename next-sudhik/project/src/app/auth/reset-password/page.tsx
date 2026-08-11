'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import { Loader2, AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import Button from '@/components/ui/Button';

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { resetPassword } = useAuth();
  
  const token = searchParams.get('token') || '';
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      setError('Invalid or expired reset session. Please request a new code.');
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim() || !confirmPassword.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    if (password.trim().length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    
    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      await resetPassword(token, password.trim());
      setSuccessMessage('Password changed successfully! Redirecting you to login...');
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to reset password. The link may have expired.');
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
            Reset Password
          </h1>
          <p className="font-sans text-xs uppercase tracking-widest text-ink-soft/60 mt-1">
            Choose a new password
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

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-ink-soft mb-1.5">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                disabled={loading || !token}
                className="w-full px-4 py-3 pr-10 rounded-xl border border-gold-400/30 bg-ivory focus:border-saffron-500 focus:outline-none transition-all font-sans text-ink text-sm shadow-inner disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink/65 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-ink-soft mb-1.5">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              disabled={loading || !token}
              className="w-full px-4 py-3 rounded-xl border border-gold-400/30 bg-ivory focus:border-saffron-500 focus:outline-none transition-all font-sans text-ink text-sm shadow-inner disabled:opacity-50"
            />
          </div>

          <Button
            type="submit"
            variant="maroon"
            fullWidth
            disabled={loading || !token}
            className="py-3.5 mt-2 rounded-xl text-sm font-sans tracking-royal uppercase shadow-gold hover:shadow-glow transition-all"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 size={16} className="animate-spin" />
                Resetting Password...
              </span>
            ) : (
              'Reset Password'
            )}
          </Button>
        </form>

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

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="pt-28 pb-16 min-h-screen bg-ivory flex items-center justify-center">
        <Loader2 size={40} className="text-saffron-500 animate-spin" />
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}
