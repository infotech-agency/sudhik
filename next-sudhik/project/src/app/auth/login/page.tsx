// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { useAuth } from '@/lib/auth-context';
// import { Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react';
// import Image from 'next/image';
// import Button from '@/components/ui/Button';

// export default function LoginPage() {
//   const router = useRouter();
//   const { login, loginWithGoogle } = useAuth();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!email.trim() || !password.trim()) {
//       setError('Please fill in all fields.');
//       return;
//     }
//     setError('');
//     setLoading(true);

//     try {
//       await login(email, password);

//       // Successful login redirect
//       const redirectPath = sessionStorage.getItem('auth_redirect') || '/products';
//       sessionStorage.removeItem('auth_redirect');
//       router.push(redirectPath);
//       router.refresh();
//     } catch (err: any) {
//       if (err.status === 403) {
//         // Redirect to OTP verification page if email is registered but unverified
//         router.push(`/auth/verify?email=${encodeURIComponent(email)}`);
//       } else {
//         setError(err.message || 'Login failed. Please check your credentials.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="pt-28 pb-16 min-h-screen bg-ivory flex items-center justify-center px-4 relative overflow-hidden">
//       {/* Decorative gradients */}
//       <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-saffron-500/10 blur-[120px] pointer-events-none" />
//       <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-maroon-600/10 blur-[120px] pointer-events-none" />

//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
//         className="w-full max-w-md bg-ivory-dim/60 backdrop-blur-xl border border-gold-400/20 p-8 rounded-3xl shadow-premium relative z-10"
//       >
//         <div className="text-center mb-8">
//           <Link href="/" className="inline-block mb-4">
//             <Image src="/assets/logo.png" height={60} width={60} alt="logo" className="mx-auto" />
//           </Link>
//           <h1 className="font-royal text-2xl tracking-royal text-ink font-bold uppercase">
//             Sign In
//           </h1>
//           <p className="font-sans text-xs uppercase tracking-widest text-ink-soft/60 mt-1">
//             Connect to your Shuddhik Profile
//           </p>
//         </div>

//         {error && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="mb-6 p-4 rounded-xl bg-maroon-950/5 border border-maroon-600/20 text-maroon-600 flex items-start gap-3"
//           >
//             <AlertCircle size={18} className="shrink-0 mt-0.5" />
//             <span className="font-sans text-sm font-medium">{error}</span>
//           </motion.div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-ink-soft mb-1.5">
//               Email Address
//             </label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="e.g. arjun@example.com"
//               disabled={loading}
//               className="w-full px-4 py-3 rounded-xl border border-gold-400/30 bg-ivory focus:border-saffron-500 focus:outline-none transition-all font-sans text-ink text-sm shadow-inner disabled:opacity-50"
//             />
//           </div>

//           <div>
//             <div className="flex justify-between items-center mb-1.5">
//               <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-ink-soft">
//                 Password
//               </label>
//               <Link
//                 href="/auth/forgot-password"
//                 className="font-sans text-xs text-saffron-600 hover:text-saffron-700 hover:underline transition-all"
//               >
//                 Forgot Password?
//               </Link>
//             </div>
//             <div className="relative">
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="••••••••"
//                 disabled={loading}
//                 className="w-full px-4 py-3 pr-10 rounded-xl border border-gold-400/30 bg-ivory focus:border-saffron-500 focus:outline-none transition-all font-sans text-ink text-sm shadow-inner disabled:opacity-50"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink/65 transition-colors"
//               >
//                 {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//               </button>
//             </div>
//           </div>

//           <Button
//             type="submit"
//             variant="maroon"
//             fullWidth
//             disabled={loading}
//             className="py-3.5 mt-2 rounded-xl text-sm font-sans tracking-royal uppercase shadow-gold hover:shadow-glow transition-all"
//           >
//             {loading ? (
//               <span className="flex items-center justify-center gap-2">
//                 <Loader2 size={16} className="animate-spin" />
//                 Signing In...
//               </span>
//             ) : (
//               'Sign In'
//             )}
//           </Button>
//         </form>

//         <div className="relative my-7">
//           <div className="absolute inset-0 flex items-center">
//             <div className="w-full border-t border-gold-400/20"></div>
//           </div>
//           <div className="relative flex justify-center text-xs uppercase">
//             <span className="bg-ivory-dim/60 px-3 text-ink-soft/40 font-sans tracking-widest">Or continue with</span>
//           </div>
//         </div>

//         <button
//           type="button"
//           onClick={loginWithGoogle}
//           disabled={loading}
//           className="w-full py-3 px-4 rounded-xl border border-gold-400/30 bg-ivory hover:bg-gold-50/20 text-ink font-sans text-sm font-semibold flex items-center justify-center gap-2.5 transition-all shadow-sm hover:shadow-sm"
//         >
//           <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
//             <path
//               fill="#EA4335"
//               d="M12 5.04c1.67 0 3.17.58 4.35 1.7l3.25-3.25C17.65 1.63 15.02 1 12 1 7.37 1 3.4 3.63 1.4 7.51l3.83 2.97C6.18 7.35 8.87 5.04 12 5.04z"
//             />
//             <path
//               fill="#4285F4"
//               d="M23.49 12.27c0-.81-.07-1.59-.2-2.35H12v4.51h6.44c-.28 1.48-1.12 2.73-2.38 3.58l3.71 2.87c2.17-2 3.72-4.94 3.72-8.61z"
//             />
//             <path
//               fill="#FBBC05"
//               d="M5.23 14.81c-.24-.72-.38-1.49-.38-2.31s.14-1.59.38-2.31L1.4 7.21C.51 9 .01 10.94.01 13c0 2.06.5 4 1.39 5.79l3.83-2.98z"
//             />
//             <path
//               fill="#34A853"
//               d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.71-2.87c-1.03.69-2.35 1.1-4.25 1.1-3.13 0-5.82-2.31-6.77-5.44L1.4 15.86C3.4 19.74 7.37 23.1 12 23z"
//             />
//           </svg>
//           Google
//         </button>

//         <p className="text-center font-sans text-sm text-ink-soft/75 mt-8">
//           Don't have an account?{' '}
//           <Link
//             href="/auth/signup"
//             className="text-saffron-600 font-semibold hover:text-saffron-700 hover:underline transition-all"
//           >
//             Sign Up
//           </Link>
//         </p>
//       </motion.div>
//     </div>
//   );
// }


'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import { setToken } from '@/lib/api';
import { Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import Button from '@/components/ui/Button';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, loginWithGoogle, refresh } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // --- Handle Google OAuth redirect (?google=1&token=...&userId=...) ---
  useEffect(() => {
    const isGoogle = searchParams.get('google');
    const token = searchParams.get('token');

    if (isGoogle && token) {
      setGoogleLoading(true);
      (async () => {
        try {
          setToken(token);
          await refresh();

          const redirectPath = sessionStorage.getItem('auth_redirect') || '/products';
          sessionStorage.removeItem('auth_redirect');

          router.replace(redirectPath);
          router.refresh();
        } catch {
          setError('Google sign-in failed. Please try again.');
          setGoogleLoading(false);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      await login(email, password);

      // Successful login redirect
      const redirectPath = sessionStorage.getItem('auth_redirect') || '/products';
      sessionStorage.removeItem('auth_redirect');
      router.push(redirectPath);
      router.refresh();
    } catch (err: any) {
      if (err.status === 403) {
        // Redirect to OTP verification page if email is registered but unverified
        router.push(`/auth/verify?email=${encodeURIComponent(email)}`);
      } else {
        setError(err.message || 'Login failed. Please check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  // While Google redirect is being processed, show a loader instead of the form
  if (googleLoading) {
    return (
      <div className="pt-28 pb-16 min-h-screen bg-ivory flex items-center justify-center px-4">
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={28} className="animate-spin text-saffron-500" />
          <p className="font-sans text-sm text-ink-soft/70">Signing you in...</p>
        </div>
      </div>
    );
  }

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
          <Link href="/" className="inline-block mb-4">
            <Image src="/assets/logo.png" height={60} width={60} alt="logo" className="mx-auto" />
          </Link>
          <h1 className="font-royal text-2xl tracking-royal text-ink font-bold uppercase">
            Sign In
          </h1>
          <p className="font-sans text-xs uppercase tracking-widest text-ink-soft/60 mt-1">
            Connect to your Shuddhik Profile
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

        <form onSubmit={handleSubmit} className="space-y-5">
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

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-ink-soft">
                Password
              </label>
              <Link
                href="/auth/forgot-password"
                className="font-sans text-xs text-saffron-600 hover:text-saffron-700 hover:underline transition-all"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={loading}
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

          <Button
            type="submit"
            variant="maroon"
            fullWidth
            disabled={loading}
            className="py-3.5 mt-2 rounded-xl text-sm font-sans tracking-royal uppercase shadow-gold hover:shadow-glow transition-all"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 size={16} className="animate-spin" />
                Signing In...
              </span>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>

        <div className="relative my-7">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gold-400/20"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-ivory-dim/60 px-3 text-ink-soft/40 font-sans tracking-widest">Or continue with</span>
          </div>
        </div>

        <button
          type="button"
          onClick={loginWithGoogle}
          disabled={loading}
          className="w-full py-3 px-4 rounded-xl border border-gold-400/30 bg-ivory hover:bg-gold-50/20 text-ink font-sans text-sm font-semibold flex items-center justify-center gap-2.5 transition-all shadow-sm hover:shadow-sm"
        >
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12 5.04c1.67 0 3.17.58 4.35 1.7l3.25-3.25C17.65 1.63 15.02 1 12 1 7.37 1 3.4 3.63 1.4 7.51l3.83 2.97C6.18 7.35 8.87 5.04 12 5.04z"
            />
            <path
              fill="#4285F4"
              d="M23.49 12.27c0-.81-.07-1.59-.2-2.35H12v4.51h6.44c-.28 1.48-1.12 2.73-2.38 3.58l3.71 2.87c2.17-2 3.72-4.94 3.72-8.61z"
            />
            <path
              fill="#FBBC05"
              d="M5.23 14.81c-.24-.72-.38-1.49-.38-2.31s.14-1.59.38-2.31L1.4 7.21C.51 9 .01 10.94.01 13c0 2.06.5 4 1.39 5.79l3.83-2.98z"
            />
            <path
              fill="#34A853"
              d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.71-2.87c-1.03.69-2.35 1.1-4.25 1.1-3.13 0-5.82-2.31-6.77-5.44L1.4 15.86C3.4 19.74 7.37 23.1 12 23z"
            />
          </svg>
          Google
        </button>

        <p className="text-center font-sans text-sm text-ink-soft/75 mt-8">
          Don't have an account?{' '}
          <Link
            href="/auth/signup"
            className="text-saffron-600 font-semibold hover:text-saffron-700 hover:underline transition-all"
          >
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}