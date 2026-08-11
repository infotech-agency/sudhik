// // // 'use client';

// // // import { useState } from 'react';
// // // import { useRouter } from 'next/navigation';
// // // import { motion, AnimatePresence } from 'framer-motion';
// // // import { X, Check, Lock, Truck, ShieldCheck, Loader2, AlertCircle } from 'lucide-react';
// // // import Button from '@/components/ui/Button';
// // // import { useBuyNow } from '@/lib/buynow-context';
// // // import { useAuth } from '@/lib/auth-context';
// // // import { api, ApiError } from '@/lib/api';
// // // import type { OrderResponse, PaymentMethod, ShippingAddress } from '@/lib/types';

// // // type Step = 'form' | 'placing' | 'success' | 'online-redirect' | 'error';

// // // export default function BuyNowModal() {
// // //   const { isOpen, product, quantity, close } = useBuyNow();
// // //   const { isAuthenticated, loginWithGoogle } = useAuth();
// // //   const router = useRouter();

// // //   const [method, setMethod] = useState<PaymentMethod>('COD');
// // //   const [form, setForm] = useState<ShippingAddress>({
// // //     name: '',
// // //     phone: '',
// // //     email: '',
// // //     address: '',
// // //     city: '',
// // //     state: '',
// // //     pincode: '',
// // //   });
// // //   const [step, setStep] = useState<Step>('form');
// // //   const [order, setOrder] = useState<OrderResponse | null>(null);
// // //   const [error, setError] = useState('');

// // //   const total = product ? product.price * quantity : 0;

// // //   const handleClose = () => {
// // //     close();
// // //     // reset after close animation
// // //     setTimeout(() => {
// // //       setStep('form');
// // //       setOrder(null);
// // //       setError('');
// // //     }, 300);
// // //   };

// // //   const handleSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     if (!product) return;
// // //     setStep('placing');
// // //     setError('');

// // //     try {
// // //       const res = await api.post<OrderResponse>('/api/orders', {
// // //         items: [{ productId: product.id, quantity }],
// // //         paymentMethod: method,
// // //         shippingAddress: form,
// // //       }, isAuthenticated);

// // //       if (method === 'ONLINE' && res.paymentUrl) {
// // //         setStep('online-redirect');
// // //         // store merchant transaction id for verification on return
// // //         if (res.merchantTransactionId) {
// // //           sessionStorage.setItem('pending_merchant_txn', res.merchantTransactionId);
// // //         }
// // //         setTimeout(() => {
// // //           window.location.href = res.paymentUrl!;
// // //         }, 1500);
// // //         return;
// // //       }

// // //       setOrder(res);
// // //       setStep('success');
// // //     } catch (err) {
// // //       const msg = err instanceof ApiError ? err.message : 'Something went wrong. Please try again.';
// // //       setError(msg);
// // //       setStep('error');
// // //     }
// // //   };

// // //   return (
// // //     <AnimatePresence>
// // //       {isOpen && product && (
// // //         <motion.div
// // //           initial={{ opacity: 0 }}
// // //           animate={{ opacity: 1 }}
// // //           exit={{ opacity: 0 }}
// // //           className="fixed inset-0 z-[80] bg-ink/60 backdrop-blur-md flex items-start sm:items-center justify-center p-4 sm:p-6 overflow-y-auto"
// // //           onClick={handleClose}
// // //         >
// // //           <motion.div
// // //             initial={{ opacity: 0, y: 40, scale: 0.97 }}
// // //             animate={{ opacity: 1, y: 0, scale: 1 }}
// // //             exit={{ opacity: 0, y: 40, scale: 0.97 }}
// // //             transition={{ type: 'spring', stiffness: 260, damping: 28 }}
// // //             onClick={(e) => e.stopPropagation()}
// // //             className="relative w-full max-w-3xl bg-ivory rounded-3xl shadow-premium my-8 overflow-hidden"
// // //           >
// // //             {/* header */}
// // //             <div className="flex items-center justify-between p-6 border-b border-gold-400/20">
// // //               <span className="font-royal text-sm tracking-royal-sm uppercase text-ink font-bold">
// // //                 Checkout · Buy Now
// // //               </span>
// // //               <button onClick={handleClose} aria-label="Close" className="p-2 rounded-full hover:bg-gold-400/10 transition-colors">
// // //                 <X size={20} className="text-ink" />
// // //               </button>
// // //             </div>

// // //             <AnimatePresence mode="wait">
// // //               {/* ---------- FORM ---------- */}
// // //               {step === 'form' && (
// // //                 <motion.div
// // //                   key="form"
// // //                   initial={{ opacity: 0 }}
// // //                   animate={{ opacity: 1 }}
// // //                   exit={{ opacity: 0 }}
// // //                   className="grid md:grid-cols-5 gap-0"
// // //                 >
// // //                   {/* form */}
// // //                   <form onSubmit={handleSubmit} className="md:col-span-3 p-6 sm:p-8 space-y-5">
// // //                     {/* auth options */}
// // //                     <div>
// // //                       <p className="font-royal text-[10px] tracking-royal uppercase text-saffron-500 mb-3">
// // //                         Account
// // //                       </p>
// // //                       {isAuthenticated ? (
// // //                         <div className="flex items-center gap-2 p-3 rounded-xl bg-saffron-50 border border-saffron-500/20">
// // //                           <Check size={16} className="text-saffron-500" />
// // //                           <span className="font-serif text-sm text-ink/75">Signed in — your order will be saved to your account.</span>
// // //                         </div>
// // //                       ) : (
// // //                         <div className="grid sm:grid-cols-2 gap-3">
// // //                           <div className="p-3 rounded-xl bg-gold-50 border border-gold-400/25 text-center">
// // //                             <p className="font-royal text-[10px] tracking-royal uppercase text-saffron-500 mb-1">Guest</p>
// // //                             <p className="font-serif text-xs text-ink/60">Just fill the form below — no account needed.</p>
// // //                           </div>
// // //                           <button
// // //                             type="button"
// // //                             onClick={loginWithGoogle}
// // //                             className="p-3 rounded-xl border border-gold-400/30 hover:bg-gold-50 transition-all text-center"
// // //                           >
// // //                             <p className="font-royal text-[10px] tracking-royal uppercase text-maroon-500 mb-1">Continue with Google</p>
// // //                             <p className="font-serif text-xs text-ink/60">Sign in to save your order.</p>
// // //                           </button>
// // //                         </div>
// // //                       )}
// // //                     </div>

// // //                     <div>
// // //                       <p className="font-royal text-[10px] tracking-royal uppercase text-saffron-500 mb-3">Shipping Details</p>
// // //                       <div className="grid sm:grid-cols-2 gap-4">
// // //                         <Field label="Full Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
// // //                         <Field label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} required />
// // //                       </div>
// // //                       <div className="mt-4">
// // //                         <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
// // //                       </div>
// // //                       <div className="mt-4">
// // //                         <Field label="Address" value={form.address} onChange={(v) => setForm({ ...form, address: v })} required />
// // //                       </div>
// // //                       <div className="grid sm:grid-cols-3 gap-4 mt-4">
// // //                         <Field label="City" value={form.city} onChange={(v) => setForm({ ...form, city: v })} required />
// // //                         <Field label="State" value={form.state} onChange={(v) => setForm({ ...form, state: v })} required />
// // //                         <Field label="Pincode" value={form.pincode} onChange={(v) => setForm({ ...form, pincode: v })} required />
// // //                       </div>
// // //                     </div>

// // //                     <div>
// // //                       <p className="font-royal text-[10px] tracking-royal uppercase text-saffron-500 mb-3">Payment Method</p>
// // //                       <div className="space-y-2">
// // //                         {([
// // //                           ['COD', 'Cash on Delivery', 'Pay when it arrives'],
// // //                           ['ONLINE', 'Online Payment', 'UPI / Cards via PhonePe'],
// // //                         ] as const).map(([val, title, sub]) => (
// // //                           <label
// // //                             key={val}
// // //                             className="flex items-center gap-3 p-4 rounded-xl border border-gold-400/20 bg-white cursor-pointer hover:border-gold-400/50 transition-all has-[:checked]:border-saffron-500 has-[:checked]:bg-saffron-50"
// // //                           >
// // //                             <input
// // //                               type="radio"
// // //                               name="pay"
// // //                               value={val}
// // //                               checked={method === val}
// // //                               onChange={() => setMethod(val)}
// // //                               className="accent-saffron-500"
// // //                             />
// // //                             <div>
// // //                               <p className="font-serif text-ink/80">{title}</p>
// // //                               <p className="font-sans text-xs text-ink/45">{sub}</p>
// // //                             </div>
// // //                           </label>
// // //                         ))}
// // //                       </div>
// // //                     </div>

// // //                     <Button type="submit" variant="primary" size="lg" fullWidth>
// // //                       {method === 'COD' ? `Place Order · ₹${total}` : `Pay ₹${total} Online`}
// // //                     </Button>

// // //                     <p className="flex items-center justify-center gap-2 font-sans text-xs text-ink/40">
// // //                       <Lock size={12} /> Secure checkout · your details are protected
// // //                     </p>
// // //                   </form>

// // //                   {/* summary */}
// // //                   <div className="md:col-span-2 bg-sand/40 border-t md:border-t-0 md:border-l border-gold-400/20 p-6 sm:p-8">
// // //                     <p className="font-royal text-[10px] tracking-royal uppercase text-ink/45 mb-5">Order Summary</p>
// // //                     <div className="flex gap-3">
// // //                       {product.image && (
// // //                         <img src={product.image} alt={product.title} className="w-16 h-20 rounded-lg object-cover border border-gold-400/20" />
// // //                       )}
// // //                       <div>
// // //                         <p className="font-display text-lg text-ink leading-tight">{product.title}</p>
// // //                         <p className="font-sans text-xs text-ink/45">Qty {quantity}</p>
// // //                         <p className="font-display text-lg text-ink mt-1">₹{total}</p>
// // //                       </div>
// // //                     </div>
// // //                     <div className="mt-6 pt-5 border-t border-gold-400/20 space-y-2">
// // //                       <Row label="Subtotal" value={`₹${total}`} />
// // //                       <Row label="Shipping" value="Free" />
// // //                       <div className="flex justify-between items-baseline pt-3 border-t border-gold-400/15 mt-3">
// // //                         <span className="font-royal text-xs tracking-royal uppercase text-ink/50">Total</span>
// // //                         <span className="font-display text-2xl text-ink">₹{total}</span>
// // //                       </div>
// // //                     </div>
// // //                     <div className="mt-6 space-y-2.5">
// // //                       <span className="flex items-center gap-2 font-sans text-xs text-ink/55"><Truck size={14} className="text-saffron-500" /> Delivered in 3–6 days</span>
// // //                       <span className="flex items-center gap-2 font-sans text-xs text-ink/55"><ShieldCheck size={14} className="text-saffron-500" /> Natural &amp; safe formula</span>
// // //                     </div>
// // //                   </div>
// // //                 </motion.div>
// // //               )}

// // //               {/* ---------- PLACING ---------- */}
// // //               {step === 'placing' && (
// // //                 <motion.div key="placing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-16 text-center">
// // //                   <Loader2 size={40} className="text-saffron-500 animate-spin mx-auto mb-6" />
// // //                   <h3 className="font-display text-2xl text-ink">Placing your order…</h3>
// // //                   <p className="font-serif text-ink/55 mt-2">Please wait while we prepare your seva.</p>
// // //                 </motion.div>
// // //               )}

// // //               {/* ---------- ONLINE REDIRECT ---------- */}
// // //               {step === 'online-redirect' && (
// // //                 <motion.div key="redirect" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-16 text-center">
// // //                   <Loader2 size={40} className="text-saffron-500 animate-spin mx-auto mb-6" />
// // //                   <h3 className="font-display text-2xl text-ink">Redirecting to payment…</h3>
// // //                   <p className="font-serif text-ink/55 mt-2">Taking you to PhonePe securely.</p>
// // //                 </motion.div>
// // //               )}

// // //               {/* ---------- ERROR ---------- */}
// // //               {step === 'error' && (
// // //                 <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-12 text-center">
// // //                   <div className="w-16 h-16 rounded-full bg-maroon-50 border border-maroon-500/30 text-maroon-500 flex items-center justify-center mx-auto mb-6">
// // //                     <AlertCircle size={28} />
// // //                   </div>
// // //                   <h3 className="font-display text-2xl text-ink">Order could not be placed</h3>
// // //                   <p className="font-serif text-ink/55 mt-2 max-w-md mx-auto">{error}</p>
// // //                   <Button variant="outline" className="mt-6" onClick={() => setStep('form')}>Try Again</Button>
// // //                 </motion.div>
// // //               )}

// // //               {/* ---------- SUCCESS ---------- */}
// // //               {step === 'success' && order && (
// // //                 <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-10 text-center">
// // //                   <motion.div
// // //                     initial={{ scale: 0 }}
// // //                     animate={{ scale: 1 }}
// // //                     transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
// // //                     className="w-20 h-20 rounded-full bg-gradient-to-br from-saffron-500 to-maroon-500 text-ivory flex items-center justify-center mx-auto mb-6 shadow-gold"
// // //                   >
// // //                     <Check size={36} />
// // //                   </motion.div>
// // //                   <h3 className="font-display text-3xl text-ink">Order Placed with Devotion</h3>
// // //                   <p className="font-serif text-lg text-ink/65 mt-3 max-w-md mx-auto">
// // //                     Your order has been received. We will deliver it with the care it deserves.
// // //                   </p>
// // //                   <div className="mt-6 inline-flex flex-col gap-1 px-6 py-4 rounded-2xl bg-gold-50 border border-gold-400/25">
// // //                     <span className="font-royal text-[10px] tracking-royal uppercase text-ink/45">Order ID</span>
// // //                     <span className="font-display text-lg text-ink">{order._id}</span>
// // //                     <span className="font-royal text-[10px] tracking-royal uppercase text-saffron-500 mt-1">Status: {order.status}</span>
// // //                   </div>
// // //                   <p className="font-deva text-2xl text-saffron-500/70 mt-6">ईश्वर आपका भला करे</p>
// // //                   <div className="mt-8 flex items-center justify-center gap-3">
// // //                     <Button variant="outline" onClick={handleClose}>Continue Shopping</Button>
// // //                   </div>
// // //                 </motion.div>
// // //               )}
// // //             </AnimatePresence>
// // //           </motion.div>
// // //         </motion.div>
// // //       )}
// // //     </AnimatePresence>
// // //   );
// // // }

// // // function Field({
// // //   label,
// // //   value,
// // //   onChange,
// // //   placeholder,
// // //   type = 'text',
// // //   required,
// // // }: {
// // //   label: string;
// // //   value: string;
// // //   onChange: (v: string) => void;
// // //   placeholder?: string;
// // //   type?: string;
// // //   required?: boolean;
// // // }) {
// // //   return (
// // //     <label className="block">
// // //       <span className="font-royal text-[10px] tracking-royal uppercase text-ink/45 block mb-2">{label}</span>
// // //       <input
// // //         required={required}
// // //         type={type}
// // //         value={value}
// // //         onChange={(e) => onChange(e.target.value)}
// // //         placeholder={placeholder}
// // //         className="w-full px-4 py-2.5 rounded-xl bg-white border border-gold-400/25 font-serif text-ink placeholder:text-ink/30 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
// // //       />
// // //     </label>
// // //   );
// // // }

// // // function Row({ label, value }: { label: string; value: string }) {
// // //   return (
// // //     <div className="flex justify-between items-center">
// // //       <span className="font-serif text-sm text-ink/60">{label}</span>
// // //       <span className="font-serif text-sm text-ink/80">{value}</span>
// // //     </div>
// // //   );
// // // }


// // 'use client';

// // import { useState } from 'react';
// // import { useRouter } from 'next/navigation';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { X, Check, Lock, Truck, ShieldCheck, Loader2, AlertCircle, Tag } from 'lucide-react';
// // import Button from '@/components/ui/Button';
// // import { useBuyNow } from '@/lib/buynow-context';
// // import { useAuth } from '@/lib/auth-context';
// // import { api, ApiError, setToken } from '@/lib/api';
// // import type { OrderResponse, PaymentMethod, ShippingAddress } from '@/lib/types';

// // type Step = 'form' | 'placing' | 'success' | 'online-redirect' | 'error';

// // export default function BuyNowModal() {
// //   const { isOpen, product, quantity, coupon, close } = useBuyNow();
// //   const { isAuthenticated, loginWithGoogle } = useAuth();
// //   const router = useRouter();

// //   const [method, setMethod] = useState<PaymentMethod>('COD');
// //   const [form, setForm] = useState<ShippingAddress>({
// //     name: '',
// //     phone: '',
// //     email: '',
// //     address: '',
// //     city: '',
// //     state: '',
// //     pincode: '',
// //   });
// //   const [step, setStep] = useState<Step>('form');
// //   const [order, setOrder] = useState<OrderResponse | null>(null);
// //   const [error, setError] = useState('');

// //   const subtotal = product ? product.price * quantity : 0;
// //   const discount = coupon ? coupon.discount : 0;
// //   const total = Math.max(subtotal - discount, 0);

// //   const handleClose = () => {
// //     close();
// //     // reset after close animation
// //     setTimeout(() => {
// //       setStep('form');
// //       setOrder(null);
// //       setError('');
// //     }, 300);
// //   };

// //   // const handleSubmit = async (e: React.FormEvent) => {
// //   //   e.preventDefault();
// //   //   if (!product) return;
// //   //   setStep('placing');
// //   //   setError('');

// //   //   try {
// //   //     const res = await api.post<OrderResponse>('/api/orders', {
// //   //       items: [{ productId: product.id, quantity }],
// //   //       paymentMethod: method,
// //   //       shippingAddress: form,
// //   //       couponCode: coupon?.code,
// //   //     }, isAuthenticated);

// //   //     if (method === 'ONLINE' && res.paymentUrl) {
// //   //       setStep('online-redirect');
// //   //       // store merchant transaction id for verification on return
// //   //       if (res.merchantTransactionId) {
// //   //         sessionStorage.setItem('pending_merchant_txn', res.merchantTransactionId);
// //   //       }
// //   //       setTimeout(() => {
// //   //         window.location.href = res.paymentUrl!;
// //   //       }, 1500);
// //   //       return;
// //   //     }

// //   //     setOrder(res);
// //   //     setStep('success');
// //   //   } catch (err) {
// //   //     const msg = err instanceof ApiError ? err.message : 'Something went wrong. Please try again.';
// //   //     setError(msg);
// //   //     setStep('error');
// //   //   }
// //   // };
// //   const handleSubmit = async (e: React.FormEvent) => {
// //   e.preventDefault();
// //   if (!product) return;
// //   setStep('placing');
// //   setError('');

// //   try {
// //     const res = await api.post<OrderResponse>('/api/orders', {
// //       items: [{ productId: product.id, quantity }],
// //       paymentMethod: method,
// //       shippingAddress: form,
// //       couponCode: coupon?.code,
// //     }, isAuthenticated);

// //     // Naya guest account bana to token save karo — session bann jaayega.
// //     // Agar user pehle se logged in (Google) tha, authToken null aayega,
// //     // uska existing session bilkul untouched rahega.
// //     if (res.authToken) {
// //       setToken(res.authToken);
// //     }

// //     if (method === 'ONLINE' && res.paymentUrl) {
// //       setStep('online-redirect');
// //       if (res.merchantTransactionId) {
// //         sessionStorage.setItem('pending_merchant_txn', res.merchantTransactionId);
// //       }
// //       setTimeout(() => {
// //         window.location.href = res.paymentUrl!;
// //       }, 1500);
// //       return;
// //     }

// //     setOrder(res);
// //     setStep('success');
// //   } catch (err) {
// //     const msg = err instanceof ApiError ? err.message : 'Something went wrong. Please try again.';
// //     setError(msg);
// //     setStep('error');
// //   }
// // };
// //   return (
// //     <AnimatePresence>
// //       {isOpen && product && (
// //         <motion.div
// //           initial={{ opacity: 0 }}
// //           animate={{ opacity: 1 }}
// //           exit={{ opacity: 0 }}
// //           className="fixed inset-0 z-[80] bg-ink/60 backdrop-blur-md flex items-start sm:items-center justify-center p-4 sm:p-6 overflow-y-auto"
// //           onClick={handleClose}
// //         >
// //           <motion.div
// //             initial={{ opacity: 0, y: 40, scale: 0.97 }}
// //             animate={{ opacity: 1, y: 0, scale: 1 }}
// //             exit={{ opacity: 0, y: 40, scale: 0.97 }}
// //             transition={{ type: 'spring', stiffness: 260, damping: 28 }}
// //             onClick={(e) => e.stopPropagation()}
// //             className="relative w-full max-w-3xl bg-ivory rounded-3xl shadow-premium my-8 overflow-hidden"
// //           >
// //             {/* header */}
// //             <div className="flex items-center justify-between p-6 border-b border-gold-400/20">
// //               <span className="font-royal text-sm tracking-royal-sm uppercase text-ink font-bold">
// //                 Checkout · Buy Now
// //               </span>
// //               <button onClick={handleClose} aria-label="Close" className="p-2 rounded-full hover:bg-gold-400/10 transition-colors">
// //                 <X size={20} className="text-ink" />
// //               </button>
// //             </div>

// //             <AnimatePresence mode="wait">
// //               {/* ---------- FORM ---------- */}
// //               {step === 'form' && (
// //                 <motion.div
// //                   key="form"
// //                   initial={{ opacity: 0 }}
// //                   animate={{ opacity: 1 }}
// //                   exit={{ opacity: 0 }}
// //                   className="grid md:grid-cols-5 gap-0"
// //                 >
// //                   {/* form */}
// //                   <form onSubmit={handleSubmit} className="md:col-span-3 p-6 sm:p-8 space-y-5">
// //                     {/* auth options */}
// //                     <div>
// //                       <p className="font-royal text-[10px] tracking-royal uppercase text-saffron-500 mb-3">
// //                         Account
// //                       </p>
// //                       {isAuthenticated ? (
// //                         <div className="flex items-center gap-2 p-3 rounded-xl bg-saffron-50 border border-saffron-500/20">
// //                           <Check size={16} className="text-saffron-500" />
// //                           <span className="font-serif text-sm text-ink/75">Signed in — your order will be saved to your account.</span>
// //                         </div>
// //                       ) : (
// //                         <div className="grid sm:grid-cols-2 gap-3">
// //                           <div className="p-3 rounded-xl bg-gold-50 border border-gold-400/25 text-center">
// //                             <p className="font-royal text-[10px] tracking-royal uppercase text-saffron-500 mb-1">Guest</p>
// //                             <p className="font-serif text-xs text-ink/60">Just fill the form below — no account needed.</p>
// //                           </div>
// //                           <button
// //                             type="button"
// //                             onClick={loginWithGoogle}
// //                             className="p-3 rounded-xl border border-gold-400/30 hover:bg-gold-50 transition-all text-center"
// //                           >
// //                             <p className="font-royal text-[10px] tracking-royal uppercase text-maroon-500 mb-1">Continue with Google</p>
// //                             <p className="font-serif text-xs text-ink/60">Sign in to save your order.</p>
// //                           </button>
// //                         </div>
// //                       )}
// //                     </div>

// //                     <div>
// //                       <p className="font-royal text-[10px] tracking-royal uppercase text-saffron-500 mb-3">Shipping Details</p>
// //                       <div className="grid sm:grid-cols-2 gap-4">
// //                         <Field label="Full Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
// //                         <Field label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} required />
// //                       </div>
// //                       <div className="mt-4">
// //                         <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
// //                       </div>
// //                       <div className="mt-4">
// //                         <Field label="Address" value={form.address} onChange={(v) => setForm({ ...form, address: v })} required />
// //                       </div>
// //                       <div className="grid sm:grid-cols-3 gap-4 mt-4">
// //                         <Field label="City" value={form.city} onChange={(v) => setForm({ ...form, city: v })} required />
// //                         <Field label="State" value={form.state} onChange={(v) => setForm({ ...form, state: v })} required />
// //                         <Field label="Pincode" value={form.pincode} onChange={(v) => setForm({ ...form, pincode: v })} required />
// //                       </div>
// //                     </div>

// //                     <div>
// //                       <p className="font-royal text-[10px] tracking-royal uppercase text-saffron-500 mb-3">Payment Method</p>
// //                       <div className="space-y-2">
// //                         {([
// //                           ['COD', 'Cash on Delivery', 'Pay when it arrives'],
// //                           ['ONLINE', 'Online Payment', 'UPI / Cards via PhonePe'],
// //                         ] as const).map(([val, title, sub]) => (
// //                           <label
// //                             key={val}
// //                             className="flex items-center gap-3 p-4 rounded-xl border border-gold-400/20 bg-white cursor-pointer hover:border-gold-400/50 transition-all has-[:checked]:border-saffron-500 has-[:checked]:bg-saffron-50"
// //                           >
// //                             <input
// //                               type="radio"
// //                               name="pay"
// //                               value={val}
// //                               checked={method === val}
// //                               onChange={() => setMethod(val)}
// //                               className="accent-saffron-500"
// //                             />
// //                             <div>
// //                               <p className="font-serif text-ink/80">{title}</p>
// //                               <p className="font-sans text-xs text-ink/45">{sub}</p>
// //                             </div>
// //                           </label>
// //                         ))}
// //                       </div>
// //                     </div>

// //                     <Button type="submit" variant="primary" size="lg" fullWidth>
// //                       {method === 'COD' ? `Place Order · ₹${total}` : `Pay ₹${total} Online`}
// //                     </Button>

// //                     <p className="flex items-center justify-center gap-2 font-sans text-xs text-ink/40">
// //                       <Lock size={12} /> Secure checkout · your details are protected
// //                     </p>
// //                   </form>

// //                   {/* summary */}
// //                   <div className="md:col-span-2 bg-sand/40 border-t md:border-t-0 md:border-l border-gold-400/20 p-6 sm:p-8">
// //                     <p className="font-royal text-[10px] tracking-royal uppercase text-ink/45 mb-5">Order Summary</p>
// //                     <div className="flex gap-3">
// //                       {product.image && (
// //                         <img src={product.image} alt={product.title} className="w-16 h-20 rounded-lg object-cover border border-gold-400/20" />
// //                       )}
// //                       <div>
// //                         <p className="font-display text-lg text-ink leading-tight">{product.title}</p>
// //                         <p className="font-sans text-xs text-ink/45">Qty {quantity}</p>
// //                         <p className="font-display text-lg text-ink mt-1">₹{subtotal}</p>
// //                       </div>
// //                     </div>
// //                     <div className="mt-6 pt-5 border-t border-gold-400/20 space-y-2">
// //                       <Row label="Subtotal" value={`₹${subtotal}`} />
// //                       {coupon && (
// //                         <div className="flex justify-between items-center">
// //                           <span className="flex items-center gap-1.5 font-serif text-sm text-saffron-600">
// //                             <Tag size={13} /> {coupon.code}
// //                           </span>
// //                           <span className="font-serif text-sm text-saffron-600">− ₹{discount}</span>
// //                         </div>
// //                       )}
// //                       <Row label="Shipping" value="Free" />
// //                       <div className="flex justify-between items-baseline pt-3 border-t border-gold-400/15 mt-3">
// //                         <span className="font-royal text-xs tracking-royal uppercase text-ink/50">Total</span>
// //                         <span className="font-display text-2xl text-ink">₹{total}</span>
// //                       </div>
// //                     </div>
// //                     <div className="mt-6 space-y-2.5">
// //                       <span className="flex items-center gap-2 font-sans text-xs text-ink/55"><Truck size={14} className="text-saffron-500" /> Delivered in 3–6 days</span>
// //                       <span className="flex items-center gap-2 font-sans text-xs text-ink/55"><ShieldCheck size={14} className="text-saffron-500" /> Natural &amp; safe formula</span>
// //                     </div>
// //                   </div>
// //                 </motion.div>
// //               )}

// //               {/* ---------- PLACING ---------- */}
// //               {step === 'placing' && (
// //                 <motion.div key="placing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-16 text-center">
// //                   <Loader2 size={40} className="text-saffron-500 animate-spin mx-auto mb-6" />
// //                   <h3 className="font-display text-2xl text-ink">Placing your order…</h3>
// //                   <p className="font-serif text-ink/55 mt-2">Please wait while we prepare your seva.</p>
// //                 </motion.div>
// //               )}

// //               {/* ---------- ONLINE REDIRECT ---------- */}
// //               {step === 'online-redirect' && (
// //                 <motion.div key="redirect" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-16 text-center">
// //                   <Loader2 size={40} className="text-saffron-500 animate-spin mx-auto mb-6" />
// //                   <h3 className="font-display text-2xl text-ink">Redirecting to payment…</h3>
// //                   <p className="font-serif text-ink/55 mt-2">Taking you to PhonePe securely.</p>
// //                 </motion.div>
// //               )}

// //               {/* ---------- ERROR ---------- */}
// //               {step === 'error' && (
// //                 <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-12 text-center">
// //                   <div className="w-16 h-16 rounded-full bg-maroon-50 border border-maroon-500/30 text-maroon-500 flex items-center justify-center mx-auto mb-6">
// //                     <AlertCircle size={28} />
// //                   </div>
// //                   <h3 className="font-display text-2xl text-ink">Order could not be placed</h3>
// //                   <p className="font-serif text-ink/55 mt-2 max-w-md mx-auto">{error}</p>
// //                   <Button variant="outline" className="mt-6" onClick={() => setStep('form')}>Try Again</Button>
// //                 </motion.div>
// //               )}

// //               {/* ---------- SUCCESS ---------- */}
// //               {step === 'success' && order && (
// //                 <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-10 text-center">
// //                   <motion.div
// //                     initial={{ scale: 0 }}
// //                     animate={{ scale: 1 }}
// //                     transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
// //                     className="w-20 h-20 rounded-full bg-gradient-to-br from-saffron-500 to-maroon-500 text-ivory flex items-center justify-center mx-auto mb-6 shadow-gold"
// //                   >
// //                     <Check size={36} />
// //                   </motion.div>
// //                   <h3 className="font-display text-3xl text-ink">Order Placed with Devotion</h3>
// //                   <p className="font-serif text-lg text-ink/65 mt-3 max-w-md mx-auto">
// //                     Your order has been received. We will deliver it with the care it deserves.
// //                   </p>
// //                   <div className="mt-6 inline-flex flex-col gap-1 px-6 py-4 rounded-2xl bg-gold-50 border border-gold-400/25">
// //                     <span className="font-royal text-[10px] tracking-royal uppercase text-ink/45">Order ID</span>
// //                     <span className="font-display text-lg text-ink">{order._id}</span>
// //                     <span className="font-royal text-[10px] tracking-royal uppercase text-saffron-500 mt-1">Status: {order.status}</span>
// //                   </div>
// //                   <p className="font-deva text-2xl text-saffron-500/70 mt-6">ईश्वर आपका भला करे</p>
// //                   <div className="mt-8 flex items-center justify-center gap-3">
// //                     <Button variant="outline" onClick={handleClose}>Continue Shopping</Button>
// //                   </div>
// //                   <div className="mt-8 flex items-center justify-center gap-3">
// //       <Button variant="outline" onClick={handleClose}>Continue Shopping</Button>
// //       <Button
// //         variant="primary"
// //         onClick={() => {
// //           handleClose();
// //           router.push('/profile');
// //         }}
// //       >
// //         View My Orders
// //       </Button>
// //     </div>
// //                 </motion.div>
// //               )}
// //             </AnimatePresence>
// //           </motion.div>
// //         </motion.div>
// //       )}
// //     </AnimatePresence>
// //   );
// // }

// // function Field({
// //   label,
// //   value,
// //   onChange,
// //   placeholder,
// //   type = 'text',
// //   required,
// // }: {
// //   label: string;
// //   value: string;
// //   onChange: (v: string) => void;
// //   placeholder?: string;
// //   type?: string;
// //   required?: boolean;
// // }) {
// //   return (
// //     <label className="block">
// //       <span className="font-royal text-[10px] tracking-royal uppercase text-ink/45 block mb-2">{label}</span>
// //       <input
// //         required={required}
// //         type={type}
// //         value={value}
// //         onChange={(e) => onChange(e.target.value)}
// //         placeholder={placeholder}
// //         className="w-full px-4 py-2.5 rounded-xl bg-white border border-gold-400/25 font-serif text-ink placeholder:text-ink/30 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
// //       />
// //     </label>
// //   );
// // }

// // function Row({ label, value }: { label: string; value: string }) {
// //   return (
// //     <div className="flex justify-between items-center">
// //       <span className="font-serif text-sm text-ink/60">{label}</span>
// //       <span className="font-serif text-sm text-ink/80">{value}</span>
// //     </div>
// //   );
// // }


// // 'use client';

// // import { useState } from 'react';
// // import { useRouter } from 'next/navigation';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { X, Check, Lock, Truck, ShieldCheck, Loader2, AlertCircle, Tag } from 'lucide-react';
// // import Button from '@/components/ui/Button';
// // import { useBuyNow } from '@/lib/buynow-context';
// // import { useAuth } from '@/lib/auth-context';
// // import { api, ApiError, setToken } from '@/lib/api';
// // import type { OrderResponse, PaymentMethod, ShippingAddress } from '@/lib/types';

// // type Step = 'form' | 'placing' | 'success' | 'online-redirect' | 'error';

// // export default function BuyNowModal() {
// //   const { isOpen, product, quantity, close } = useBuyNow();
// //   const { isAuthenticated, loginWithGoogle } = useAuth();
// //   const router = useRouter();

// //   const [method, setMethod] = useState<PaymentMethod>('COD');
// //   const [form, setForm] = useState<ShippingAddress>({
// //     name: '',
// //     phone: '',
// //     email: '',
// //     address: '',
// //     city: '',
// //     state: '',
// //     pincode: '',
// //   });
// //   const [step, setStep] = useState<Step>('form');
// //   const [order, setOrder] = useState<OrderResponse | null>(null);
// //   const [error, setError] = useState('');

// //   // --- coupon state (ab modal ke andar hai) ---
// //   const [couponInput, setCouponInput] = useState('');
// //   const [couponStatus, setCouponStatus] = useState<'idle' | 'checking' | 'valid' | 'invalid'>('idle');
// //   const [couponMessage, setCouponMessage] = useState('');
// //   const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);

// //   const subtotal = product ? product.price * quantity : 0;
// //   const discount = appliedCoupon ? appliedCoupon.discount : 0;
// //   const total = Math.max(subtotal - discount, 0);

// //   const handleClose = () => {
// //     close();
// //     setTimeout(() => {
// //       setStep('form');
// //       setOrder(null);
// //       setError('');
// //       setCouponInput('');
// //       setCouponStatus('idle');
// //       setCouponMessage('');
// //       setAppliedCoupon(null);
// //     }, 300);
// //   };

// //   const handleApplyCoupon = async () => {
// //     const code = couponInput.trim().toUpperCase();
// //     if (!code) return;
// //     setCouponStatus('checking');
// //     setCouponMessage('');
// //     try {
// //       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/coupons/validate`, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ code, orderAmount: subtotal }),
// //       });
// //       const data = await res.json();
// //       if (data.success) {
// //         setAppliedCoupon({ code: data.data.code, discount: data.data.discount });
// //         setCouponStatus('valid');
// //         setCouponMessage(`Coupon applied — ₹${data.data.discount} off`);
// //       } else {
// //         setAppliedCoupon(null);
// //         setCouponStatus('invalid');
// //         setCouponMessage(data.message || 'Invalid coupon');
// //       }
// //     } catch {
// //       setAppliedCoupon(null);
// //       setCouponStatus('invalid');
// //       setCouponMessage('Something went wrong, try again');
// //     }
// //   };

// //   const removeCoupon = () => {
// //     setAppliedCoupon(null);
// //     setCouponInput('');
// //     setCouponStatus('idle');
// //     setCouponMessage('');
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (!product) return;
// //     setStep('placing');
// //     setError('');

// //     try {
// //       const res = await api.post<OrderResponse>('/api/orders', {
// //         items: [{ productId: product.id, quantity }],
// //         paymentMethod: method,
// //         shippingAddress: form,
// //         couponCode: appliedCoupon?.code,
// //       }, isAuthenticated);

// //       if (res.authToken) {
// //         setToken(res.authToken);
// //       }

// //       if (method === 'ONLINE' && res.paymentUrl) {
// //         setStep('online-redirect');
// //         if (res.merchantTransactionId) {
// //           sessionStorage.setItem('pending_merchant_txn', res.merchantTransactionId);
// //         }
// //         setTimeout(() => {
// //           window.location.href = res.paymentUrl!;
// //         }, 1500);
// //         return;
// //       }

// //       setOrder(res);
// //       setStep('success');
// //     } catch (err) {
// //       const msg = err instanceof ApiError ? err.message : 'Something went wrong. Please try again.';
// //       setError(msg);
// //       setStep('error');
// //     }
// //   };

// //   return (
// //     <AnimatePresence>
// //       {isOpen && product && (
// //         <motion.div
// //           initial={{ opacity: 0 }}
// //           animate={{ opacity: 1 }}
// //           exit={{ opacity: 0 }}
// //           className="fixed inset-0 z-[80] bg-ink/60 backdrop-blur-md flex items-start sm:items-center justify-center p-4 sm:p-6 overflow-y-auto"
// //           onClick={handleClose}
// //         >
// //           <motion.div
// //             initial={{ opacity: 0, y: 40, scale: 0.97 }}
// //             animate={{ opacity: 1, y: 0, scale: 1 }}
// //             exit={{ opacity: 0, y: 40, scale: 0.97 }}
// //             transition={{ type: 'spring', stiffness: 260, damping: 28 }}
// //             onClick={(e) => e.stopPropagation()}
// //             className="relative w-full max-w-3xl bg-ivory rounded-3xl shadow-premium my-8 overflow-hidden"
// //           >
// //             {/* header */}
// //             <div className="flex items-center justify-between p-6 border-b border-gold-400/20">
// //               <span className="font-royal text-sm tracking-royal-sm uppercase text-ink font-bold">
// //                 Checkout · Buy Now
// //               </span>
// //               <button onClick={handleClose} aria-label="Close" className="p-2 rounded-full hover:bg-gold-400/10 transition-colors">
// //                 <X size={20} className="text-ink" />
// //               </button>
// //             </div>

// //             <AnimatePresence mode="wait">
// //               {/* ---------- FORM ---------- */}
// //               {step === 'form' && (
// //                 <motion.div
// //                   key="form"
// //                   initial={{ opacity: 0 }}
// //                   animate={{ opacity: 1 }}
// //                   exit={{ opacity: 0 }}
// //                   className="grid md:grid-cols-5 gap-0"
// //                 >
// //                   {/* form */}
// //                   <form onSubmit={handleSubmit} className="md:col-span-3 p-6 sm:p-8 space-y-5">
// //                     {/* auth options */}
// //                     <div>
// //                       <p className="font-royal text-[10px] tracking-royal uppercase text-saffron-500 mb-3">
// //                         Account
// //                       </p>
// //                       {isAuthenticated ? (
// //                         <div className="flex items-center gap-2 p-3 rounded-xl bg-saffron-50 border border-saffron-500/20">
// //                           <Check size={16} className="text-saffron-500" />
// //                           <span className="font-serif text-sm text-ink/75">Signed in — your order will be saved to your account.</span>
// //                         </div>
// //                       ) : (
// //                         <div className="grid sm:grid-cols-2 gap-3">
// //                           <div className="p-3 rounded-xl bg-gold-50 border border-gold-400/25 text-center">
// //                             <p className="font-royal text-[10px] tracking-royal uppercase text-saffron-500 mb-1">Guest</p>
// //                             <p className="font-serif text-xs text-ink/60">Just fill the form below — no account needed.</p>
// //                           </div>
// //                           <button
// //                             type="button"
// //                             onClick={loginWithGoogle}
// //                             className="p-3 rounded-xl border border-gold-400/30 hover:bg-gold-50 transition-all text-center"
// //                           >
// //                             <p className="font-royal text-[10px] tracking-royal uppercase text-maroon-500 mb-1">Continue with Google</p>
// //                             <p className="font-serif text-xs text-ink/60">Sign in to save your order.</p>
// //                           </button>
// //                         </div>
// //                       )}
// //                     </div>

// //                     <div>
// //                       <p className="font-royal text-[10px] tracking-royal uppercase text-saffron-500 mb-3">Shipping Details</p>
// //                       <div className="grid sm:grid-cols-2 gap-4">
// //                         <Field label="Full Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
// //                         <Field label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} required />
// //                       </div>
// //                       <div className="mt-4">
// //                         <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
// //                       </div>
// //                       <div className="mt-4">
// //                         <Field label="Address" value={form.address} onChange={(v) => setForm({ ...form, address: v })} required />
// //                       </div>
// //                       <div className="grid sm:grid-cols-3 gap-4 mt-4">
// //                         <Field label="City" value={form.city} onChange={(v) => setForm({ ...form, city: v })} required />
// //                         <Field label="State" value={form.state} onChange={(v) => setForm({ ...form, state: v })} required />
// //                         <Field label="Pincode" value={form.pincode} onChange={(v) => setForm({ ...form, pincode: v })} required />
// //                       </div>
// //                     </div>

// //                     {/* --- Coupon block --- */}
// //                     <div>
// //                       <p className="font-royal text-[10px] tracking-royal uppercase text-saffron-500 mb-3">Have a coupon?</p>

// //                       {appliedCoupon ? (
// //                         <div className="flex items-center justify-between px-4 py-3 rounded-full bg-saffron-50 border border-saffron-500/20">
// //                           <div className="flex items-center gap-2">
// //                             <Tag size={14} className="text-saffron-600" />
// //                             <span className="font-sans text-xs font-medium text-saffron-700">
// //                               {appliedCoupon.code} applied
// //                             </span>
// //                           </div>
// //                           <button type="button" onClick={removeCoupon} aria-label="Remove coupon" className="text-ink/40 hover:text-maroon-500 transition-colors">
// //                             <X size={14} />
// //                           </button>
// //                         </div>
// //                       ) : (
// //                         <div className="flex gap-2">
// //                           <input
// //                             type="text"
// //                             value={couponInput}
// //                             onChange={(e) => {
// //                               setCouponInput(e.target.value.toUpperCase());
// //                               if (couponStatus === 'invalid') {
// //                                 setCouponStatus('idle');
// //                                 setCouponMessage('');
// //                               }
// //                             }}
// //                             onKeyDown={(e) => {
// //                               if (e.key === 'Enter') {
// //                                 e.preventDefault();
// //                                 handleApplyCoupon();
// //                               }
// //                             }}
// //                             placeholder="Enter coupon code"
// //                             className="flex-1 min-w-0 px-4 py-3 rounded-full border border-gold-400/30 bg-white font-sans text-sm uppercase placeholder:normal-case placeholder:text-ink/35 focus:outline-none focus:border-saffron-500/40"
// //                           />
// //                           <button
// //                             type="button"
// //                             onClick={handleApplyCoupon}
// //                             disabled={couponStatus === 'checking' || !couponInput.trim()}
// //                             className="px-5 py-3 rounded-full bg-ink text-ivory font-sans text-xs font-medium tracking-royal-sm uppercase disabled:opacity-40 transition-opacity"
// //                           >
// //                             {couponStatus === 'checking' ? 'Checking…' : 'Apply'}
// //                           </button>
// //                         </div>
// //                       )}

// //                       {couponMessage && couponStatus === 'invalid' && (
// //                         <p className="font-sans text-xs text-maroon-500 mt-2">{couponMessage}</p>
// //                       )}
// //                     </div>

// //                     <div>
// //                       <p className="font-royal text-[10px] tracking-royal uppercase text-saffron-500 mb-3">Payment Method</p>
// //                       <div className="space-y-2">
// //                         {([
// //                           ['COD', 'Cash on Delivery', 'Pay when it arrives'],
// //                           ['ONLINE', 'Online Payment', 'UPI / Cards via PhonePe'],
// //                         ] as const).map(([val, title, sub]) => (
// //                           <label
// //                             key={val}
// //                             className="flex items-center gap-3 p-4 rounded-xl border border-gold-400/20 bg-white cursor-pointer hover:border-gold-400/50 transition-all has-[:checked]:border-saffron-500 has-[:checked]:bg-saffron-50"
// //                           >
// //                             <input
// //                               type="radio"
// //                               name="pay"
// //                               value={val}
// //                               checked={method === val}
// //                               onChange={() => setMethod(val)}
// //                               className="accent-saffron-500"
// //                             />
// //                             <div>
// //                               <p className="font-serif text-ink/80">{title}</p>
// //                               <p className="font-sans text-xs text-ink/45">{sub}</p>
// //                             </div>
// //                           </label>
// //                         ))}
// //                       </div>
// //                     </div>

// //                     <Button type="submit" variant="primary" size="lg" fullWidth>
// //                       {method === 'COD' ? `Place Order · ₹${total}` : `Pay ₹${total} Online`}
// //                     </Button>

// //                     <p className="flex items-center justify-center gap-2 font-sans text-xs text-ink/40">
// //                       <Lock size={12} /> Secure checkout · your details are protected
// //                     </p>
// //                   </form>

// //                   {/* summary */}
// //                   <div className="md:col-span-2 bg-sand/40 border-t md:border-t-0 md:border-l border-gold-400/20 p-6 sm:p-8">
// //                     <p className="font-royal text-[10px] tracking-royal uppercase text-ink/45 mb-5">Order Summary</p>
// //                     <div className="flex gap-3">
// //                       {product.image && (
// //                         <img src={product.image} alt={product.title} className="w-16 h-20 rounded-lg object-cover border border-gold-400/20" />
// //                       )}
// //                       <div>
// //                         <p className="font-display text-lg text-ink leading-tight">{product.title}</p>
// //                         <p className="font-sans text-xs text-ink/45">Qty {quantity}</p>
// //                         <p className="font-display text-lg text-ink mt-1">₹{subtotal}</p>
// //                       </div>
// //                     </div>
// //                     <div className="mt-6 pt-5 border-t border-gold-400/20 space-y-2">
// //                       <Row label="Subtotal" value={`₹${subtotal}`} />
// //                       {appliedCoupon && (
// //                         <div className="flex justify-between items-center">
// //                           <span className="flex items-center gap-1.5 font-serif text-sm text-saffron-600">
// //                             <Tag size={13} /> {appliedCoupon.code}
// //                           </span>
// //                           <span className="font-serif text-sm text-saffron-600">− ₹{discount}</span>
// //                         </div>
// //                       )}
// //                       <Row label="Shipping" value="Free" />
// //                       <div className="flex justify-between items-baseline pt-3 border-t border-gold-400/15 mt-3">
// //                         <span className="font-royal text-xs tracking-royal uppercase text-ink/50">Total</span>
// //                         <span className="font-display text-2xl text-ink">₹{total}</span>
// //                       </div>
// //                     </div>
// //                     <div className="mt-6 space-y-2.5">
// //                       <span className="flex items-center gap-2 font-sans text-xs text-ink/55"><Truck size={14} className="text-saffron-500" /> Delivered in 3–6 days</span>
// //                       <span className="flex items-center gap-2 font-sans text-xs text-ink/55"><ShieldCheck size={14} className="text-saffron-500" /> Natural &amp; safe formula</span>
// //                     </div>
// //                   </div>
// //                 </motion.div>
// //               )}

// //               {/* ---------- PLACING ---------- */}
// //               {step === 'placing' && (
// //                 <motion.div key="placing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-16 text-center">
// //                   <Loader2 size={40} className="text-saffron-500 animate-spin mx-auto mb-6" />
// //                   <h3 className="font-display text-2xl text-ink">Placing your order…</h3>
// //                   <p className="font-serif text-ink/55 mt-2">Please wait while we prepare your seva.</p>
// //                 </motion.div>
// //               )}

// //               {/* ---------- ONLINE REDIRECT ---------- */}
// //               {step === 'online-redirect' && (
// //                 <motion.div key="redirect" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-16 text-center">
// //                   <Loader2 size={40} className="text-saffron-500 animate-spin mx-auto mb-6" />
// //                   <h3 className="font-display text-2xl text-ink">Redirecting to payment…</h3>
// //                   <p className="font-serif text-ink/55 mt-2">Taking you to PhonePe securely.</p>
// //                 </motion.div>
// //               )}

// //               {/* ---------- ERROR ---------- */}
// //               {step === 'error' && (
// //                 <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-12 text-center">
// //                   <div className="w-16 h-16 rounded-full bg-maroon-50 border border-maroon-500/30 text-maroon-500 flex items-center justify-center mx-auto mb-6">
// //                     <AlertCircle size={28} />
// //                   </div>
// //                   <h3 className="font-display text-2xl text-ink">Order could not be placed</h3>
// //                   <p className="font-serif text-ink/55 mt-2 max-w-md mx-auto">{error}</p>
// //                   <Button variant="outline" className="mt-6" onClick={() => setStep('form')}>Try Again</Button>
// //                 </motion.div>
// //               )}

// //               {/* ---------- SUCCESS ---------- */}
// //               {step === 'success' && order && (
// //                 <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-10 text-center">
// //                   <motion.div
// //                     initial={{ scale: 0 }}
// //                     animate={{ scale: 1 }}
// //                     transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
// //                     className="w-20 h-20 rounded-full bg-gradient-to-br from-saffron-500 to-maroon-500 text-ivory flex items-center justify-center mx-auto mb-6 shadow-gold"
// //                   >
// //                     <Check size={36} />
// //                   </motion.div>
// //                   <h3 className="font-display text-3xl text-ink">Order Placed with Devotion</h3>
// //                   <p className="font-serif text-lg text-ink/65 mt-3 max-w-md mx-auto">
// //                     Your order has been received. We will deliver it with the care it deserves.
// //                   </p>
// //                   <div className="mt-6 inline-flex flex-col gap-1 px-6 py-4 rounded-2xl bg-gold-50 border border-gold-400/25">
// //                     <span className="font-royal text-[10px] tracking-royal uppercase text-ink/45">Order ID</span>
// //                     <span className="font-display text-lg text-ink">{order._id}</span>
// //                     <span className="font-royal text-[10px] tracking-royal uppercase text-saffron-500 mt-1">Status: {order.status}</span>
// //                   </div>
// //                   <p className="font-deva text-2xl text-saffron-500/70 mt-6">ईश्वर आपका भला करे</p>
// //                   <div className="mt-8 flex items-center justify-center gap-3">
// //                     <Button variant="outline" onClick={handleClose}>Continue Shopping</Button>
// //                     <Button
// //                       variant="primary"
// //                       onClick={() => {
// //                         handleClose();
// //                         router.push('/profile');
// //                       }}
// //                     >
// //                       View My Orders
// //                     </Button>
// //                   </div>
// //                 </motion.div>
// //               )}
// //             </AnimatePresence>
// //           </motion.div>
// //         </motion.div>
// //       )}
// //     </AnimatePresence>
// //   );
// // }

// // function Field({
// //   label,
// //   value,
// //   onChange,
// //   placeholder,
// //   type = 'text',
// //   required,
// // }: {
// //   label: string;
// //   value: string;
// //   onChange: (v: string) => void;
// //   placeholder?: string;
// //   type?: string;
// //   required?: boolean;
// // }) {
// //   return (
// //     <label className="block">
// //       <span className="font-royal text-[10px] tracking-royal uppercase text-ink/45 block mb-2">{label}</span>
// //       <input
// //         required={required}
// //         type={type}
// //         value={value}
// //         onChange={(e) => onChange(e.target.value)}
// //         placeholder={placeholder}
// //         className="w-full px-4 py-2.5 rounded-xl bg-white border border-gold-400/25 font-serif text-ink placeholder:text-ink/30 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
// //       />
// //     </label>
// //   );
// // }

// // function Row({ label, value }: { label: string; value: string }) {
// //   return (
// //     <div className="flex justify-between items-center">
// //       <span className="font-serif text-sm text-ink/60">{label}</span>
// //       <span className="font-serif text-sm text-ink/80">{value}</span>
// //     </div>
// //   );
// // }


// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { motion, AnimatePresence } from 'framer-motion';
// import { X, Check, Lock, Truck, ShieldCheck, Loader2, AlertCircle, Tag } from 'lucide-react';
// import Button from '@/components/ui/Button';
// import { useBuyNow } from '@/lib/buynow-context';
// import { useAuth } from '@/lib/auth-context';
// import { api, ApiError, setToken } from '@/lib/api';
// import type { Order, OrderResponse, PaymentMethod, ShippingAddress } from '@/lib/types';

// type Step = 'form' | 'placing' | 'success' | 'online-redirect' | 'error';

// const emptyForm: ShippingAddress = {
//   name: '',
//   phone: '',
//   email: '',
//   address: '',
//   city: '',
//   state: '',
//   pincode: '',
// };

// export default function BuyNowModal() {
//   const { isOpen, product, quantity, close } = useBuyNow();
//   const { isAuthenticated, user, loginWithGoogle } = useAuth();
//   const router = useRouter();

//   const [method, setMethod] = useState<PaymentMethod>('COD');
//   const [form, setForm] = useState<ShippingAddress>(emptyForm);
//   const [prefilled, setPrefilled] = useState(false);
//   const [step, setStep] = useState<Step>('form');
//   const [order, setOrder] = useState<OrderResponse | null>(null);
//   const [error, setError] = useState('');

//   // --- coupon state ---
//   const [couponInput, setCouponInput] = useState('');
//   const [couponStatus, setCouponStatus] = useState<'idle' | 'checking' | 'valid' | 'invalid'>('idle');
//   const [couponMessage, setCouponMessage] = useState('');
//   const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);

//   // Modal khulne par, agar user pehle se known hai (login ya guest token se),
//   // uski last shipping details auto-fill kar do.
//   useEffect(() => {
//     if (!isOpen || prefilled) return;

//     async function prefill() {
//       // Step 1: turant available info (name/email/phone) user object se
//       if (user) {
//         setForm((prev) => ({
//           ...prev,
//           name: user.name || prev.name,
//           email: user.email || prev.email,
//           phone: user.phone || prev.phone,
//         }));
//       }

//       // Step 2: address/city/state/pincode ke liye last order fetch karo
//       try {
//         const orders = await api.get<Order[]>('/api/orders/me', undefined, true);
//         const last = orders?.[0];
//         if (last?.shippingAddress) {
//           setForm((prev) => ({
//             ...prev,
//             name: last.shippingAddress.name || prev.name,
//             email: last.shippingAddress.email || prev.email,
//             phone: last.shippingAddress.phone || prev.phone,
//             address: last.shippingAddress.address || prev.address,
//             city: last.shippingAddress.city || prev.city,
//             state: last.shippingAddress.state || prev.state,
//             pincode: last.shippingAddress.pincode || prev.pincode,
//           }));
//         }
//       } catch {
//         // token nahi hai ya koi order nahi mila — bas silently ignore, form khali rahega
//       } finally {
//         setPrefilled(true);
//       }
//     }

//     prefill();
//   }, [isOpen, user, prefilled]);

//   const subtotal = product ? product.price * quantity : 0;
//   const discount = appliedCoupon ? appliedCoupon.discount : 0;
//   const total = Math.max(subtotal - discount, 0);

//   const handleClose = () => {
//     close();
//     setTimeout(() => {
//       setStep('form');
//       setOrder(null);
//       setError('');
//       setCouponInput('');
//       setCouponStatus('idle');
//       setCouponMessage('');
//       setAppliedCoupon(null);
//       setForm(emptyForm);
//       setPrefilled(false); // agli baar modal khule to dobara prefill try ho
//     }, 300);
//   };

//   const handleApplyCoupon = async () => {
//     const code = couponInput.trim().toUpperCase();
//     if (!code) return;
//     setCouponStatus('checking');
//     setCouponMessage('');
//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/coupons/validate`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ code, orderAmount: subtotal }),
//       });
//       const data = await res.json();
//       if (data.success) {
//         setAppliedCoupon({ code: data.data.code, discount: data.data.discount });
//         setCouponStatus('valid');
//         setCouponMessage(`Coupon applied — ₹${data.data.discount} off`);
//       } else {
//         setAppliedCoupon(null);
//         setCouponStatus('invalid');
//         setCouponMessage(data.message || 'Invalid coupon');
//       }
//     } catch {
//       setAppliedCoupon(null);
//       setCouponStatus('invalid');
//       setCouponMessage('Something went wrong, try again');
//     }
//   };

//   const removeCoupon = () => {
//     setAppliedCoupon(null);
//     setCouponInput('');
//     setCouponStatus('idle');
//     setCouponMessage('');
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!product) return;
//     setStep('placing');
//     setError('');

//     try {
//       const res = await api.post<OrderResponse>('/api/orders', {
//         items: [{ productId: product.id, quantity }],
//         paymentMethod: method,
//         shippingAddress: form,
//         couponCode: appliedCoupon?.code,
//       }, isAuthenticated);

//       if (res.authToken) {
//         setToken(res.authToken);
//       }

//       if (method === 'ONLINE' && res.paymentUrl) {
//         setStep('online-redirect');
//         if (res.merchantTransactionId) {
//           sessionStorage.setItem('pending_merchant_txn', res.merchantTransactionId);
//         }
//         setTimeout(() => {
//           window.location.href = res.paymentUrl!;
//         }, 1500);
//         return;
//       }

//       setOrder(res);
//       setStep('success');
//     } catch (err) {
//       const msg = err instanceof ApiError ? err.message : 'Something went wrong. Please try again.';
//       setError(msg);
//       setStep('error');
//     }
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && product && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 z-[80] bg-ink/60 backdrop-blur-md flex items-start sm:items-center justify-center p-4 sm:p-6 overflow-y-auto"
//           onClick={handleClose}
//         >
//           <motion.div
//             initial={{ opacity: 0, y: 40, scale: 0.97 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: 40, scale: 0.97 }}
//             transition={{ type: 'spring', stiffness: 260, damping: 28 }}
//             onClick={(e) => e.stopPropagation()}
//             className="relative w-full max-w-3xl bg-ivory rounded-3xl shadow-premium my-8 overflow-hidden"
//           >
//             {/* header */}
//             <div className="flex items-center justify-between p-6 border-b border-gold-400/20">
//               <span className="font-royal text-sm tracking-royal-sm uppercase text-ink font-bold">
//                 Checkout · Buy Now
//               </span>
//               <button onClick={handleClose} aria-label="Close" className="p-2 rounded-full hover:bg-gold-400/10 transition-colors">
//                 <X size={20} className="text-ink" />
//               </button>
//             </div>

//             <AnimatePresence mode="wait">
//               {/* ---------- FORM ---------- */}
//               {step === 'form' && (
//                 <motion.div
//                   key="form"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   className="grid md:grid-cols-5 gap-0"
//                 >
//                   {/* form */}
//                   <form onSubmit={handleSubmit} className="md:col-span-3 p-6 sm:p-8 space-y-5">
//                     {/* auth options */}
//                     <div>
//                       <p className="font-royal text-[10px] tracking-royal uppercase text-saffron-500 mb-3">
//                         Account
//                       </p>
//                       {isAuthenticated ? (
//                         <div className="flex items-center gap-2 p-3 rounded-xl bg-saffron-50 border border-saffron-500/20">
//                           <Check size={16} className="text-saffron-500" />
//                           <span className="font-serif text-sm text-ink/75">
//                             Welcome back{user?.name ? `, ${user.name}` : ''} — your details are pre-filled below.
//                           </span>
//                         </div>
//                       ) : (
//                         <div className="grid sm:grid-cols-2 gap-3">
//                           <div className="p-3 rounded-xl bg-gold-50 border border-gold-400/25 text-center">
//                             <p className="font-royal text-[10px] tracking-royal uppercase text-saffron-500 mb-1">Guest</p>
//                             <p className="font-serif text-xs text-ink/60">Just fill the form below — no account needed.</p>
//                           </div>
//                           <button
//                             type="button"
//                             onClick={loginWithGoogle}
//                             className="p-3 rounded-xl border border-gold-400/30 hover:bg-gold-50 transition-all text-center"
//                           >
//                             <p className="font-royal text-[10px] tracking-royal uppercase text-maroon-500 mb-1">Continue with Google</p>
//                             <p className="font-serif text-xs text-ink/60">Sign in to save your order.</p>
//                           </button>
//                         </div>
//                       )}
//                     </div>

//                     <div>
//                       <p className="font-royal text-[10px] tracking-royal uppercase text-saffron-500 mb-3">Shipping Details</p>
//                       <div className="grid sm:grid-cols-2 gap-4">
//                         <Field label="Full Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
//                         <Field label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} required />
//                       </div>
//                       <div className="mt-4">
//                         <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
//                       </div>
//                       <div className="mt-4">
//                         <Field label="Address" value={form.address} onChange={(v) => setForm({ ...form, address: v })} required />
//                       </div>
//                       <div className="grid sm:grid-cols-3 gap-4 mt-4">
//                         <Field label="City" value={form.city} onChange={(v) => setForm({ ...form, city: v })} required />
//                         <Field label="State" value={form.state} onChange={(v) => setForm({ ...form, state: v })} required />
//                         <Field label="Pincode" value={form.pincode} onChange={(v) => setForm({ ...form, pincode: v })} required />
//                       </div>
//                     </div>

//                     {/* --- Coupon block --- */}
//                     <div>
//                       <p className="font-royal text-[10px] tracking-royal uppercase text-saffron-500 mb-3">Have a coupon?</p>

//                       {appliedCoupon ? (
//                         <div className="flex items-center justify-between px-4 py-3 rounded-full bg-saffron-50 border border-saffron-500/20">
//                           <div className="flex items-center gap-2">
//                             <Tag size={14} className="text-saffron-600" />
//                             <span className="font-sans text-xs font-medium text-saffron-700">
//                               {appliedCoupon.code} applied
//                             </span>
//                           </div>
//                           <button type="button" onClick={removeCoupon} aria-label="Remove coupon" className="text-ink/40 hover:text-maroon-500 transition-colors">
//                             <X size={14} />
//                           </button>
//                         </div>
//                       ) : (
//                         <div className="flex gap-2">
//                           <input
//                             type="text"
//                             value={couponInput}
//                             onChange={(e) => {
//                               setCouponInput(e.target.value.toUpperCase());
//                               if (couponStatus === 'invalid') {
//                                 setCouponStatus('idle');
//                                 setCouponMessage('');
//                               }
//                             }}
//                             onKeyDown={(e) => {
//                               if (e.key === 'Enter') {
//                                 e.preventDefault();
//                                 handleApplyCoupon();
//                               }
//                             }}
//                             placeholder="Enter coupon code"
//                             className="flex-1 min-w-0 px-4 py-3 rounded-full border border-gold-400/30 bg-white font-sans text-sm uppercase placeholder:normal-case placeholder:text-ink/35 focus:outline-none focus:border-saffron-500/40"
//                           />
//                           <button
//                             type="button"
//                             onClick={handleApplyCoupon}
//                             disabled={couponStatus === 'checking' || !couponInput.trim()}
//                             className="px-5 py-3 rounded-full bg-ink text-ivory font-sans text-xs font-medium tracking-royal-sm uppercase disabled:opacity-40 transition-opacity"
//                           >
//                             {couponStatus === 'checking' ? 'Checking…' : 'Apply'}
//                           </button>
//                         </div>
//                       )}

//                       {couponMessage && couponStatus === 'invalid' && (
//                         <p className="font-sans text-xs text-maroon-500 mt-2">{couponMessage}</p>
//                       )}
//                     </div>

//                     <div>
//                       <p className="font-royal text-[10px] tracking-royal uppercase text-saffron-500 mb-3">Payment Method</p>
//                       <div className="space-y-2">
//                         {([
//                           ['COD', 'Cash on Delivery', 'Pay when it arrives'],
//                           ['ONLINE', 'Online Payment', 'UPI / Cards via PhonePe'],
//                         ] as const).map(([val, title, sub]) => (
//                           <label
//                             key={val}
//                             className="flex items-center gap-3 p-4 rounded-xl border border-gold-400/20 bg-white cursor-pointer hover:border-gold-400/50 transition-all has-[:checked]:border-saffron-500 has-[:checked]:bg-saffron-50"
//                           >
//                             <input
//                               type="radio"
//                               name="pay"
//                               value={val}
//                               checked={method === val}
//                               onChange={() => setMethod(val)}
//                               className="accent-saffron-500"
//                             />
//                             <div>
//                               <p className="font-serif text-ink/80">{title}</p>
//                               <p className="font-sans text-xs text-ink/45">{sub}</p>
//                             </div>
//                           </label>
//                         ))}
//                       </div>
//                     </div>

//                     <Button type="submit" variant="primary" size="lg" fullWidth>
//                       {method === 'COD' ? `Place Order · ₹${total}` : `Pay ₹${total} Online`}
//                     </Button>

//                     <p className="flex items-center justify-center gap-2 font-sans text-xs text-ink/40">
//                       <Lock size={12} /> Secure checkout · your details are protected
//                     </p>
//                   </form>

//                   {/* summary */}
//                   <div className="md:col-span-2 bg-sand/40 border-t md:border-t-0 md:border-l border-gold-400/20 p-6 sm:p-8">
//                     <p className="font-royal text-[10px] tracking-royal uppercase text-ink/45 mb-5">Order Summary</p>
//                     <div className="flex gap-3">
//                       {product.image && (
//                         <img src={product.image} alt={product.title} className="w-16 h-20 rounded-lg object-cover border border-gold-400/20" />
//                       )}
//                       <div>
//                         <p className="font-display text-lg text-ink leading-tight">{product.title}</p>
//                         <p className="font-sans text-xs text-ink/45">Qty {quantity}</p>
//                         <p className="font-display text-lg text-ink mt-1">₹{subtotal}</p>
//                       </div>
//                     </div>
//                     <div className="mt-6 pt-5 border-t border-gold-400/20 space-y-2">
//                       <Row label="Subtotal" value={`₹${subtotal}`} />
//                       {appliedCoupon && (
//                         <div className="flex justify-between items-center">
//                           <span className="flex items-center gap-1.5 font-serif text-sm text-saffron-600">
//                             <Tag size={13} /> {appliedCoupon.code}
//                           </span>
//                           <span className="font-serif text-sm text-saffron-600">− ₹{discount}</span>
//                         </div>
//                       )}
//                       <Row label="Shipping" value="Free" />
//                       <div className="flex justify-between items-baseline pt-3 border-t border-gold-400/15 mt-3">
//                         <span className="font-royal text-xs tracking-royal uppercase text-ink/50">Total</span>
//                         <span className="font-display text-2xl text-ink">₹{total}</span>
//                       </div>
//                     </div>
//                     <div className="mt-6 space-y-2.5">
//                       <span className="flex items-center gap-2 font-sans text-xs text-ink/55"><Truck size={14} className="text-saffron-500" /> Delivered in 3–6 days</span>
//                       <span className="flex items-center gap-2 font-sans text-xs text-ink/55"><ShieldCheck size={14} className="text-saffron-500" /> Natural &amp; safe formula</span>
//                     </div>
//                   </div>
//                 </motion.div>
//               )}

//               {/* ---------- PLACING ---------- */}
//               {step === 'placing' && (
//                 <motion.div key="placing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-16 text-center">
//                   <Loader2 size={40} className="text-saffron-500 animate-spin mx-auto mb-6" />
//                   <h3 className="font-display text-2xl text-ink">Placing your order…</h3>
//                   <p className="font-serif text-ink/55 mt-2">Please wait while we prepare your seva.</p>
//                 </motion.div>
//               )}

//               {/* ---------- ONLINE REDIRECT ---------- */}
//               {step === 'online-redirect' && (
//                 <motion.div key="redirect" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-16 text-center">
//                   <Loader2 size={40} className="text-saffron-500 animate-spin mx-auto mb-6" />
//                   <h3 className="font-display text-2xl text-ink">Redirecting to payment…</h3>
//                   <p className="font-serif text-ink/55 mt-2">Taking you to PhonePe securely.</p>
//                 </motion.div>
//               )}

//               {/* ---------- ERROR ---------- */}
//               {step === 'error' && (
//                 <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-12 text-center">
//                   <div className="w-16 h-16 rounded-full bg-maroon-50 border border-maroon-500/30 text-maroon-500 flex items-center justify-center mx-auto mb-6">
//                     <AlertCircle size={28} />
//                   </div>
//                   <h3 className="font-display text-2xl text-ink">Order could not be placed</h3>
//                   <p className="font-serif text-ink/55 mt-2 max-w-md mx-auto">{error}</p>
//                   <Button variant="outline" className="mt-6" onClick={() => setStep('form')}>Try Again</Button>
//                 </motion.div>
//               )}

//               {/* ---------- SUCCESS ---------- */}
//               {step === 'success' && order && (
//                 <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-10 text-center">
//                   <motion.div
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
//                     className="w-20 h-20 rounded-full bg-gradient-to-br from-saffron-500 to-maroon-500 text-ivory flex items-center justify-center mx-auto mb-6 shadow-gold"
//                   >
//                     <Check size={36} />
//                   </motion.div>
//                   <h3 className="font-display text-3xl text-ink">Order Placed with Devotion</h3>
//                   <p className="font-serif text-lg text-ink/65 mt-3 max-w-md mx-auto">
//                     Your order has been received. We will deliver it with the care it deserves.
//                   </p>
//                   <div className="mt-6 inline-flex flex-col gap-1 px-6 py-4 rounded-2xl bg-gold-50 border border-gold-400/25">
//                     <span className="font-royal text-[10px] tracking-royal uppercase text-ink/45">Order ID</span>
//                     <span className="font-display text-lg text-ink">{order._id}</span>
//                     <span className="font-royal text-[10px] tracking-royal uppercase text-saffron-500 mt-1">Status: {order.status}</span>
//                   </div>
//                   <p className="font-deva text-2xl text-saffron-500/70 mt-6">ईश्वर आपका भला करे</p>
//                   <div className="mt-8 flex items-center justify-center gap-3">
//                     <Button variant="outline" onClick={handleClose}>Continue Shopping</Button>
//                     <Button
//                       variant="primary"
//                       onClick={() => {
//                         handleClose();
//                         router.push('/profile');
//                       }}
//                     >
//                       View My Orders
//                     </Button>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }

// function Field({
//   label,
//   value,
//   onChange,
//   placeholder,
//   type = 'text',
//   required,
// }: {
//   label: string;
//   value: string;
//   onChange: (v: string) => void;
//   placeholder?: string;
//   type?: string;
//   required?: boolean;
// }) {
//   return (
//     <label className="block">
//       <span className="font-royal text-[10px] tracking-royal uppercase text-ink/45 block mb-2">{label}</span>
//       <input
//         required={required}
//         type={type}
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         placeholder={placeholder}
//         className="w-full px-4 py-2.5 rounded-xl bg-white border border-gold-400/25 font-serif text-ink placeholder:text-ink/30 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
//       />
//     </label>
//   );
// }

// function Row({ label, value }: { label: string; value: string }) {
//   return (
//     <div className="flex justify-between items-center">
//       <span className="font-serif text-sm text-ink/60">{label}</span>
//       <span className="font-serif text-sm text-ink/80">{value}</span>
//     </div>
//   );
// }


// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link'; // Add this import
// import { motion, AnimatePresence } from 'framer-motion';
// import { X, Check, Lock, Truck, ShieldCheck, Loader2, AlertCircle, Tag } from 'lucide-react';
// import Button from '@/components/ui/Button';
// import { useBuyNow } from '@/lib/buynow-context';
// import { useAuth } from '@/lib/auth-context';
// import { api, ApiError, setToken } from '@/lib/api';
// import type { Order, OrderResponse, PaymentMethod, ShippingAddress } from '@/lib/types';

// type Step = 'form' | 'placing' | 'success' | 'online-redirect' | 'error';

// const emptyForm: ShippingAddress = {
//   name: '',
//   phone: '',
//   email: '',
//   address: '',
//   landmark: '',
//   city: '',
//   state: '',
//   pincode: '',
// };

// export default function BuyNowModal() {
//   const { isOpen, product, quantity, close } = useBuyNow();
//   const { isAuthenticated, user, loginWithGoogle } = useAuth();
//   const router = useRouter();

//   const [method, setMethod] = useState<PaymentMethod>('COD');
//   const [form, setForm] = useState<ShippingAddress>(emptyForm);
//   const [prefilled, setPrefilled] = useState(false);
//   const [step, setStep] = useState<Step>('form');
//   const [order, setOrder] = useState<OrderResponse | null>(null);
//   const [error, setError] = useState('');

//   // --- coupon state ---
//   const [couponInput, setCouponInput] = useState('');
//   const [couponStatus, setCouponStatus] = useState<'idle' | 'checking' | 'valid' | 'invalid'>('idle');
//   const [couponMessage, setCouponMessage] = useState('');
//   const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);

//   // Page khulne par, agar user pehle se known hai (login ya guest token se),
//   // uski last shipping details auto-fill kar do.
//   useEffect(() => {
//     if (!isOpen || prefilled) return;

//     async function prefill() {
//       // Step 1: turant available info (name/email/phone) user object se
//       if (user) {
//         setForm((prev) => ({
//           ...prev,
//           name: user.name || prev.name,
//           email: user.email || prev.email,
//           phone: user.phone || prev.phone,
//         }));
//       }

//       // Step 2: address/city/state/pincode ke liye last order fetch karo
//       try {
//         const orders = await api.get<Order[]>('/api/orders/me', undefined, true);
//         const last = orders?.[0];
//         if (last?.shippingAddress) {
//           setForm((prev) => ({
//             ...prev,
//             name: last.shippingAddress.name || prev.name,
//             email: last.shippingAddress.email || prev.email,
//             phone: last.shippingAddress.phone || prev.phone,
//             address: last.shippingAddress.address || prev.address,
//             landmark: last.shippingAddress.landmark || prev.landmark,
//             city: last.shippingAddress.city || prev.city,
//             state: last.shippingAddress.state || prev.state,
//             pincode: last.shippingAddress.pincode || prev.pincode,
//           }));
//         }
//       } catch {
//         // token nahi hai ya koi order nahi mila — bas silently ignore, form khali rahega
//       } finally {
//         setPrefilled(true);
//       }
//     }

//     prefill();
//   }, [isOpen, user, prefilled]);

//   // Body scroll lock jab page-checkout khula ho
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = '';
//     }
//     return () => {
//       document.body.style.overflow = '';
//     };
//   }, [isOpen]);

//   const subtotal = product ? product.price * quantity : 0;
//   const discount = appliedCoupon ? appliedCoupon.discount : 0;
//   const total = Math.max(subtotal - discount, 0);

//   const handleClose = () => {
//     close();
//     setTimeout(() => {
//       setStep('form');
//       setOrder(null);
//       setError('');
//       setCouponInput('');
//       setCouponStatus('idle');
//       setCouponMessage('');
//       setAppliedCoupon(null);
//       setForm(emptyForm);
//       setPrefilled(false); // agli baar page khule to dobara prefill try ho
//     }, 300);
//   };

//   const handleApplyCoupon = async () => {
//     const code = couponInput.trim().toUpperCase();
//     if (!code) return;
//     setCouponStatus('checking');
//     setCouponMessage('');
//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/coupons/validate`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ code, orderAmount: subtotal }),
//       });
//       const data = await res.json();
//       if (data.success) {
//         setAppliedCoupon({ code: data.data.code, discount: data.data.discount });
//         setCouponStatus('valid');
//         setCouponMessage(`Coupon applied — ₹${data.data.discount} off`);
//       } else {
//         setAppliedCoupon(null);
//         setCouponStatus('invalid');
//         setCouponMessage(data.message || 'Invalid coupon');
//       }
//     } catch {
//       setAppliedCoupon(null);
//       setCouponStatus('invalid');
//       setCouponMessage('Something went wrong, try again');
//     }
//   };

//   const removeCoupon = () => {
//     setAppliedCoupon(null);
//     setCouponInput('');
//     setCouponStatus('idle');
//     setCouponMessage('');
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!product) return;
//     setStep('placing');
//     setError('');

//     try {
//       const res = await api.post<OrderResponse>('/api/orders', {
//         items: [{ productId: product.id, quantity }],
//         paymentMethod: method,
//         shippingAddress: form,
//         couponCode: appliedCoupon?.code,
//       }, isAuthenticated);

//       if (res.authToken) {
//         setToken(res.authToken);
//       }

//       if (method === 'ONLINE' && res.paymentUrl) {
//         setStep('online-redirect');
//         if (res.merchantTransactionId) {
//           sessionStorage.setItem('pending_merchant_txn', res.merchantTransactionId);
//         }
//         setTimeout(() => {
//           window.location.href = res.paymentUrl!;
//         }, 1500);
//         return;
//       }

//       setOrder(res);
//       setStep('success');
//     } catch (err) {
//       const msg = err instanceof ApiError ? err.message : 'Something went wrong. Please try again.';
//       setError(msg);
//       setStep('error');
//     }
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && product && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.25 }}
//           className="fixed inset-0 z-[80] bg-ivory overflow-y-auto"
//         >
//           {/* sticky page header */}
//           <div className="sticky top-0 z-10 flex items-center justify-between px-4 sm:px-8 py-4 sm:py-5 border-b border-gold-400/20 bg-ivory/95 backdrop-blur-md">
//             <span className="font-royal text-sm tracking-royal-sm uppercase text-ink font-bold">
//               Checkout · Buy Now
//             </span>
//             <button onClick={handleClose} aria-label="Close" className="p-2 rounded-full hover:bg-gold-400/10 transition-colors">
//               <X size={20} className="text-ink" />
//             </button>
//           </div>

//           <div className="max-w-6xl mx-auto w-full px-4 sm:px-8 py-8 sm:py-12">
//             <AnimatePresence mode="wait">
//               {/* ---------- FORM ---------- */}
//               {step === 'form' && (
//                 <motion.div
//                   key="form"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0 }}
//                   className="grid md:grid-cols-5 gap-8 md:gap-10"
//                 >
//                   {/* form */}
//                   <form onSubmit={handleSubmit} className="md:col-span-3 space-y-6">
//                     {/* auth options */}
//                     <div>
//                       <p className="font-royal text-[10px] tracking-royal uppercase text-saffron-500 mb-3">
//                         Account
//                       </p>
//                       {isAuthenticated ? (
//                         <div className="flex items-center gap-2 p-3 rounded-xl bg-saffron-50 border border-saffron-500/20">
//                           <Check size={16} className="text-saffron-500" />
//                           <span className="font-serif text-md text-ink/75">
//                             Welcome back{user?.name ? `, ${user.name}` : ''} — your details are pre-filled below.
//                           </span>
//                         </div>
//                       ) : (
//                         <div className="space-y-2">
//                           <p className="text-center font-sans text-xs text-ink/45">
//                             Already have an account?{' '}
//                             {/* <Link
//                               href="/auth/login"
//                               className="text-saffron-600 font-semibold hover:text-saffron-700 hover:underline transition-all"
//                             >
//                               Sign in
//                             </Link>
//                             {' '}or{' '}
//                             <Link
//                               href="/auth/signup"
//                               className="text-saffron-600 font-semibold hover:text-saffron-700 hover:underline transition-all"
//                             >
//                               create an account
//                             </Link> */}
//                             <Link
//                               href="/auth/login"
//                               onClick={handleClose}
//                               className="text-saffron-600 font-semibold hover:text-saffron-700 hover:underline transition-all"
//                             >
//                               Sign in
//                             </Link>

//                             {' '}or{' '}

//                             <Link
//                               href="/auth/signup"
//                               onClick={handleClose}
//                               className="text-saffron-600 font-semibold hover:text-saffron-700 hover:underline transition-all"
//                             >
//                               Create an account
//                             </Link>
//                             {' '}— optional.
//                           </p>
//                         </div>
//                       )}
//                     </div>

//                     <div>
//                       <p className="font-royal text-[13px] font-semibold tracking-royal uppercase text-saffron-500 mb-3">Shipping Details</p>
//                       <div className="grid sm:grid-cols-2 gap-4">
//                         <Field label="Full Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
//                         <Field label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} required />
//                       </div>
//                       <div className="mt-4">
//                         <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
//                       </div>
//                       <div className="mt-4">
//                         <Field label="Address" value={form.address} onChange={(v) => setForm({ ...form, address: v })} required />
//                           <Field label="Landmark (optional)" value={form.landmark || ''} onChange={(v) => setForm({ ...form, landmark: v })} />
//                       </div>
//                       <div className="grid sm:grid-cols-3 gap-4 mt-4">
//                         <Field label="City" value={form.city} onChange={(v) => setForm({ ...form, city: v })} required />
//                         <Field label="State" value={form.state} onChange={(v) => setForm({ ...form, state: v })} required />
//                         <Field label="Pincode" value={form.pincode} onChange={(v) => setForm({ ...form, pincode: v })} required />
//                       </div>
//                     </div>

//                     {/* --- Coupon block --- */}
//                     <div>
//                       <p className="font-royal text-[13px] font-semibold tracking-royal uppercase text-saffron-500 mb-3">Have a coupon?</p>

//                       {appliedCoupon ? (
//                         <div className="flex items-center justify-between px-4 py-3 rounded-full bg-saffron-50 border border-saffron-500/20">
//                           <div className="flex items-center gap-2">
//                             <Tag size={14} className="text-saffron-600" />
//                             <span className="font-sans text-xs font-medium text-saffron-700">
//                               {appliedCoupon.code} applied
//                             </span>
//                           </div>
//                           <button type="button" onClick={removeCoupon} aria-label="Remove coupon" className="text-ink/40 hover:text-maroon-500 transition-colors">
//                             <X size={14} />
//                           </button>
//                         </div>
//                       ) : (
//                         <div className="flex gap-2">
//                           <input
//                             type="text"
//                             value={couponInput}
//                             onChange={(e) => {
//                               setCouponInput(e.target.value.toUpperCase());
//                               if (couponStatus === 'invalid') {
//                                 setCouponStatus('idle');
//                                 setCouponMessage('');
//                               }
//                             }}
//                             onKeyDown={(e) => {
//                               if (e.key === 'Enter') {
//                                 e.preventDefault();
//                                 handleApplyCoupon();
//                               }
//                             }}
//                             placeholder="Enter coupon code"
//                             className="flex-1 min-w-0 px-4 py-3 rounded-full border border-gold-400/30 bg-white font-sans text-sm uppercase placeholder:normal-case placeholder:text-ink/35 focus:outline-none focus:border-saffron-500/40"
//                           />
//                           <button
//                             type="button"
//                             onClick={handleApplyCoupon}
//                             disabled={couponStatus === 'checking' || !couponInput.trim()}
//                             className="px-5 py-3 rounded-full bg-ink text-ivory font-sans text-xs font-medium tracking-royal-sm uppercase disabled:opacity-40 transition-opacity"
//                           >
//                             {couponStatus === 'checking' ? 'Checking…' : 'Apply'}
//                           </button>
//                         </div>
//                       )}

//                       {couponMessage && couponStatus === 'invalid' && (
//                         <p className="font-sans text-xs text-maroon-500 mt-2">{couponMessage}</p>
//                       )}
//                     </div>

//                     <div>
//                       <p className="font-royal text-[10px] tracking-royal uppercase text-saffron-500 mb-3">Payment Method</p>
//                       <div className="space-y-2">
//                         {([
//                           ['COD', 'Cash on Delivery', 'Pay when it arrives'],
//                           ['ONLINE', 'Online Payment', 'UPI / Cards via PhonePe'],
//                         ] as const).map(([val, title, sub]) => (
//                           <label
//                             key={val}
//                             className="flex items-center gap-3 p-4 rounded-xl border border-gold-400/20 bg-white cursor-pointer hover:border-gold-400/50 transition-all has-[:checked]:border-saffron-500 has-[:checked]:bg-saffron-50"
//                           >
//                             <input
//                               type="radio"
//                               name="pay"
//                               value={val}
//                               checked={method === val}
//                               onChange={() => setMethod(val)}
//                               className="accent-saffron-500"
//                             />
//                             <div>
//                               <p className="font-serif text-ink/80">{title}</p>
//                               <p className="font-sans text-xs text-ink/45">{sub}</p>
//                             </div>
//                           </label>
//                         ))}
//                       </div>
//                     </div>

//                     <Button type="submit" variant="primary" size="lg" fullWidth>
//                       {method === 'COD' ? `Place Order · ₹${total}` : `Pay ₹${total} Online`}
//                     </Button>

//                     <p className="flex items-center justify-center gap-2 font-sans text-xs text-ink/40">
//                       <Lock size={12} /> Secure checkout · your details are protected
//                     </p>
//                   </form>

//                   {/* summary */}
//                   <div className="md:col-span-2">
//                     <div className="md:sticky md:top-28 bg-sand/40 border border-gold-400/20 rounded-3xl p-6 sm:p-8">
//                       <p className="font-royal font-semibold text-[13px] tracking-royal uppercase text-black mb-5">Order Summary</p>
//                       <div className="flex gap-3">
//                         {product.image && (
//                           <img src={product.image} alt={product.title} className="w-16 h-20 rounded-lg object-cover border border-gold-400/20" />
//                         )}
//                         <div>
//                           <p className="font-display text-lg text-ink leading-tight">{product.title}</p>
//                           <p className="font-sans text-xs text-ink/45">Qty {quantity}</p>
//                           <p className="font-display text-lg text-ink mt-1">₹{subtotal}</p>
//                         </div>
//                       </div>
//                       <div className="mt-6 pt-5 border-t border-gold-400/20 space-y-2">
//                         <Row label="Subtotal" value={`₹${subtotal}`} />
//                         {appliedCoupon && (
//                           <div className="flex justify-between items-center">
//                             <span className="flex items-center gap-1.5 font-serif text-sm text-saffron-600">
//                               <Tag size={13} /> {appliedCoupon.code}
//                             </span>
//                             <span className="font-serif text-sm text-saffron-600">− ₹{discount}</span>
//                           </div>
//                         )}
//                         <Row label="Shipping" value="Free" />
//                         <div className="flex justify-between items-baseline pt-3 border-t border-gold-400/15 mt-3">
//                           <span className="font-royal text-xs tracking-royal uppercase text-ink/50">Total</span>
//                           <span className="font-display text-2xl text-ink">₹{total}</span>
//                         </div>
//                       </div>
//                       <div className="mt-6 space-y-2.5">
//                         <span className="flex items-center gap-2 font-sans text-xs text-ink/55"><Truck size={14} className="text-saffron-500" /> Delivered in 3–6 days</span>
//                         <span className="flex items-center gap-2 font-sans text-xs text-ink/55"><ShieldCheck size={14} className="text-saffron-500" /> Natural &amp; safe formula</span>
//                       </div>
//                     </div>
//                   </div>
//                 </motion.div>
//               )}

//               {/* ---------- PLACING ---------- */}
//               {step === 'placing' && (
//                 <motion.div key="placing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-24 text-center">
//                   <Loader2 size={40} className="text-saffron-500 animate-spin mx-auto mb-6" />
//                   <h3 className="font-display text-2xl text-ink">Placing your order…</h3>
//                   <p className="font-serif text-ink/55 mt-2">Please wait while we prepare your seva.</p>
//                 </motion.div>
//               )}

//               {/* ---------- ONLINE REDIRECT ---------- */}
//               {step === 'online-redirect' && (
//                 <motion.div key="redirect" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-24 text-center">
//                   <Loader2 size={40} className="text-saffron-500 animate-spin mx-auto mb-6" />
//                   <h3 className="font-display text-2xl text-ink">Redirecting to payment…</h3>
//                   <p className="font-serif text-ink/55 mt-2">Taking you to PhonePe securely.</p>
//                 </motion.div>
//               )}

//               {/* ---------- ERROR ---------- */}
//               {step === 'error' && (
//                 <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center">
//                   <div className="w-16 h-16 rounded-full bg-maroon-50 border border-maroon-500/30 text-maroon-500 flex items-center justify-center mx-auto mb-6">
//                     <AlertCircle size={28} />
//                   </div>
//                   <h3 className="font-display text-2xl text-ink">Order could not be placed</h3>
//                   <p className="font-serif text-ink/55 mt-2 max-w-md mx-auto">{error}</p>
//                   <Button variant="outline" className="mt-6" onClick={() => setStep('form')}>Try Again</Button>
//                 </motion.div>
//               )}

//               {/* ---------- SUCCESS ---------- */}
//               {step === 'success' && order && (
//                 <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-16 text-center">
//                   <motion.div
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
//                     className="w-20 h-20 rounded-full bg-gradient-to-br from-saffron-500 to-maroon-500 text-ivory flex items-center justify-center mx-auto mb-6 shadow-gold"
//                   >
//                     <Check size={36} />
//                   </motion.div>
//                   <h3 className="font-display text-3xl text-ink">Order Placed with Devotion</h3>
//                   <p className="font-serif text-lg text-ink/65 mt-3 max-w-md mx-auto">
//                     Your order has been received. We will deliver it with the care it deserves.
//                   </p>
//                   <div className="mt-6 inline-flex flex-col gap-1 px-6 py-4 rounded-2xl bg-gold-50 border border-gold-400/25">
//                     <span className="font-royal text-[10px] tracking-royal uppercase text-ink/45">Order ID</span>
//                     <span className="font-display text-lg text-ink">{order._id}</span>
//                     <span className="font-royal text-[10px] tracking-royal uppercase text-saffron-500 mt-1">Status: {order.status}</span>
//                   </div>
//                   <p className="font-deva text-2xl text-saffron-500/70 mt-6">ईश्वर आपका भला करे</p>
//                   <div className="mt-8 flex items-center justify-center gap-3">
//                     <Button variant="outline" onClick={handleClose}>Continue Shopping</Button>
//                     {/* <Button
//                       variant="primary"
//                       onClick={() => {
//                         handleClose();
//                         router.push('/profile');
//                       }}
//                     >
//                       View My Orders
//                     </Button> */}
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }

// function Field({
//   label,
//   value,
//   onChange,
//   placeholder,
//   type = 'text',
//   required,
// }: {
//   label: string;
//   value: string;
//   onChange: (v: string) => void;
//   placeholder?: string;
//   type?: string;
//   required?: boolean;
// }) {
//   return (
//     <label className="block">
//       <span className="font-royal text-[10px] tracking-royal uppercase text-ink/45 block mb-2">{label}</span>
//       <input
//         required={required}
//         type={type}
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         placeholder={placeholder}
//         className="w-full px-4 py-2.5 rounded-xl bg-white border border-gold-400/25 font-serif text-ink placeholder:text-ink/30 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
//       />
//     </label>
//   );
// }

// function Row({ label, value }: { label: string; value: string }) {
//   return (
//     <div className="flex justify-between items-center">
//       <span className="font-serif text-sm text-ink/60">{label}</span>
//       <span className="font-serif text-sm text-ink/80">{value}</span>
//     </div>
//   );
// }


'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';   // ✅ this line is critical
import { X, Check, Lock, Truck, ShieldCheck, Loader2, AlertCircle, Tag } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useBuyNow } from '@/lib/buynow-context';
import { useAuth } from '@/lib/auth-context';
import { api, ApiError, setToken } from '@/lib/api';
import type { Order, OrderResponse, PaymentMethod, ShippingAddress } from '@/lib/types';

type Step = 'form' | 'placing' | 'success' | 'online-redirect' | 'error';

const emptyForm: ShippingAddress = {
  name: '',
  phone: '',
  email: '',
  address: '',
  landmark: '',
  city: '',
  state: '',
  pincode: '',
};

export default function BuyNowModal() {
  const { isOpen, product, quantity, close } = useBuyNow();
  const { isAuthenticated, user } = useAuth();   // removed unused loginWithGoogle
  const router = useRouter();

  const [method, setMethod] = useState<PaymentMethod>('COD');
  const [form, setForm] = useState<ShippingAddress>(emptyForm);
  const [prefilled, setPrefilled] = useState(false);
  const [step, setStep] = useState<Step>('form');
  const [order, setOrder] = useState<OrderResponse | null>(null);
  const [error, setError] = useState('');

  const [couponInput, setCouponInput] = useState('');
  const [couponStatus, setCouponStatus] = useState<'idle' | 'checking' | 'valid' | 'invalid'>('idle');
  const [couponMessage, setCouponMessage] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);

  useEffect(() => {
    if (!isOpen || prefilled) return;

    async function prefill() {
      if (user) {
        setForm((prev) => ({
          ...prev,
          name: user.name || prev.name,
          email: user.email || prev.email,
          phone: user.phone || prev.phone,
        }));
      }

      try {
        const orders = await api.get<Order[]>('/api/orders/me', undefined, true);
        const last = orders?.[0];
        if (last?.shippingAddress) {
          setForm((prev) => ({
            ...prev,
            name: last.shippingAddress.name || prev.name,
            email: last.shippingAddress.email || prev.email,
            phone: last.shippingAddress.phone || prev.phone,
            address: last.shippingAddress.address || prev.address,
            landmark: last.shippingAddress.landmark || prev.landmark,
            city: last.shippingAddress.city || prev.city,
            state: last.shippingAddress.state || prev.state,
            pincode: last.shippingAddress.pincode || prev.pincode,
          }));
        }
      } catch {
        // ignore
      } finally {
        setPrefilled(true);
      }
    }

    prefill();
  }, [isOpen, user, prefilled]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const subtotal = product ? product.price * quantity : 0;
  const discount = appliedCoupon ? appliedCoupon.discount : 0;
  const total = Math.max(subtotal - discount, 0);

  const handleClose = () => {
    close();
    setTimeout(() => {
      setStep('form');
      setOrder(null);
      setError('');
      setCouponInput('');
      setCouponStatus('idle');
      setCouponMessage('');
      setAppliedCoupon(null);
      setForm(emptyForm);
      setPrefilled(false);
    }, 300);
  };

  const handleApplyCoupon = async () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) return;
    setCouponStatus('checking');
    setCouponMessage('');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/coupons/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, orderAmount: subtotal }),
      });
      const data = await res.json();
      if (data.success) {
        setAppliedCoupon({ code: data.data.code, discount: data.data.discount });
        setCouponStatus('valid');
        setCouponMessage(`Coupon applied — ₹${data.data.discount} off`);
      } else {
        setAppliedCoupon(null);
        setCouponStatus('invalid');
        setCouponMessage(data.message || 'Invalid coupon');
      }
    } catch {
      setAppliedCoupon(null);
      setCouponStatus('invalid');
      setCouponMessage('Something went wrong, try again');
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput('');
    setCouponStatus('idle');
    setCouponMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    setStep('placing');
    setError('');

    try {
      const res = await api.post<OrderResponse>('/api/orders', {
        items: [{ productId: product.id, quantity }],
        paymentMethod: method,
        shippingAddress: form,
        couponCode: appliedCoupon?.code,
      }, isAuthenticated);

      if (res.authToken) {
        setToken(res.authToken);
      }

      if (method === 'ONLINE' && res.paymentUrl) {
        setStep('online-redirect');
        if (res.merchantTransactionId) {
          sessionStorage.setItem('pending_merchant_txn', res.merchantTransactionId);
        }
        setTimeout(() => {
          window.location.href = res.paymentUrl!;
        }, 1500);
        return;
      }

      setOrder(res);
      setStep('success');
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : 'Something went wrong. Please try again.';
      setError(msg);
      setStep('error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[80] bg-ivory overflow-y-auto"
        >
          {/* sticky header */}
          <div className="sticky top-0 z-10 flex items-center justify-between px-4 sm:px-8 py-4 sm:py-5 border-b border-gold-400/20 bg-ivory/95 backdrop-blur-md">
            <span className="font-royal text-sm tracking-royal-sm uppercase text-ink font-bold">
              Checkout · Buy Now
            </span>
            <button onClick={handleClose} aria-label="Close" className="p-2 rounded-full hover:bg-gold-400/10 transition-colors">
              <X size={20} className="text-ink" />
            </button>
          </div>

          <div className="max-w-6xl mx-auto w-full px-4 sm:px-8 py-8 sm:py-12">
            <AnimatePresence mode="wait">
              {step === 'form' && (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="grid md:grid-cols-5 gap-8 md:gap-10"
                >
                  {/* left side – form */}
                  <form onSubmit={handleSubmit} className="md:col-span-3 space-y-6">
                    {/* Account section */}
                    <div>
                      <p className="font-royal text-sm font-bold tracking-royal uppercase text-saffron-500 mb-3">
                        Account
                      </p>
                      {isAuthenticated ? (
                        <div className="flex items-center gap-2 p-3 rounded-xl bg-saffron-50 border border-saffron-500/20">
                          <Check size={16} className="text-saffron-500" />
                          <span className="font-serif text-md text-ink/80">
                            Welcome back{user?.name ? `, ${user.name}` : ''} — your details are pre‑filled below.
                          </span>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <p className="text-center font-sans text-sm text-ink/70">
                            Already have an account?{' '}
                            <Link
                              href="/auth/login"
                              onClick={handleClose}
                              className="text-saffron-600 font-semibold hover:text-saffron-700 hover:underline transition-all"
                            >
                              Sign in
                            </Link>
                            {' '}or{' '}
                            <Link
                              href="/auth/signup"
                              onClick={handleClose}
                              className="text-saffron-600 font-semibold hover:text-saffron-700 hover:underline transition-all"
                            >
                              Create an account
                            </Link>
                            {' '}— optional.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Shipping Details */}
                    <div>
                      <p className="font-royal text-sm font-bold tracking-royal uppercase text-saffron-500 mb-3">
                        Shipping Details
                      </p>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <Field label="Full Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
                        <Field
                          label="Phone"
                          value={form.phone}
                          onChange={(v) => setForm({ ...form, phone: v })}
                          required
                          maxLength={10}
                          inputMode="numeric"
                        />
                      </div>
                      <div className="mt-4">
                        <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
                      </div>
                      <div className="mt-4">
                        <Field label="Address" value={form.address} onChange={(v) => setForm({ ...form, address: v })} required />
                        <Field label="Landmark (optional)" value={form.landmark || ''} onChange={(v) => setForm({ ...form, landmark: v })} />
                      </div>
                      <div className="grid sm:grid-cols-3 gap-4 mt-4">
                        <Field label="City" value={form.city} onChange={(v) => setForm({ ...form, city: v })} required />
                        <Field label="State" value={form.state} onChange={(v) => setForm({ ...form, state: v })} required />
                        <Field
                          label="Pincode"
                          value={form.pincode}
                          onChange={(v) => setForm({ ...form, pincode: v })}
                          required
                          maxLength={6}
                          inputMode="numeric"
                        />
                      </div>
                    </div>

                    {/* Coupon */}
                    <div>
                      <p className="font-royal text-sm font-bold tracking-royal uppercase text-saffron-500 mb-3">
                        Have a coupon?
                      </p>
                      {appliedCoupon ? (
                        <div className="flex items-center justify-between px-4 py-3 rounded-full bg-saffron-50 border border-saffron-500/20">
                          <div className="flex items-center gap-2">
                            <Tag size={14} className="text-saffron-600" />
                            <span className="font-sans text-sm font-medium text-saffron-700">
                              {appliedCoupon.code} applied
                            </span>
                          </div>
                          <button type="button" onClick={removeCoupon} aria-label="Remove coupon" className="text-ink/40 hover:text-maroon-500 transition-colors">
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={couponInput}
                            onChange={(e) => {
                              setCouponInput(e.target.value.toUpperCase());
                              if (couponStatus === 'invalid') {
                                setCouponStatus('idle');
                                setCouponMessage('');
                              }
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleApplyCoupon();
                              }
                            }}
                            placeholder="Enter coupon code"
                            className="flex-1 min-w-0 px-4 py-3 rounded-full border border-gold-400/30 bg-white font-sans text-sm uppercase placeholder:normal-case placeholder:text-ink/35 focus:outline-none focus:border-saffron-500/40"
                          />
                          <button
                            type="button"
                            onClick={handleApplyCoupon}
                            disabled={couponStatus === 'checking' || !couponInput.trim()}
                            className="px-5 py-3 rounded-full bg-ink text-ivory font-sans text-xs font-medium tracking-royal-sm uppercase disabled:opacity-40 transition-opacity"
                          >
                            {couponStatus === 'checking' ? 'Checking…' : 'Apply'}
                          </button>
                        </div>
                      )}
                      {couponMessage && couponStatus === 'invalid' && (
                        <p className="font-sans text-sm text-maroon-500 mt-2">{couponMessage}</p>
                      )}
                    </div>

                    {/* Payment */}
                    <div>
                      <p className="font-royal text-sm font-bold tracking-royal uppercase text-saffron-500 mb-3">
                        Payment Method
                      </p>
                      <div className="space-y-2">
                        {([
                          ['COD', 'Cash on Delivery', 'Pay when it arrives'],
                          ['ONLINE', 'Online Payment', 'UPI / Cards via PhonePe'],
                        ] as const).map(([val, title, sub]) => (
                          <label
                            key={val}
                            className="flex items-center gap-3 p-4 rounded-xl border border-gold-400/20 bg-white cursor-pointer hover:border-gold-400/50 transition-all has-[:checked]:border-saffron-500 has-[:checked]:bg-saffron-50"
                          >
                            <input
                              type="radio"
                              name="pay"
                              value={val}
                              checked={method === val}
                              onChange={() => setMethod(val)}
                              className="accent-saffron-500"
                            />
                            <div>
                              <p className="font-serif text-ink/90">{title}</p>
                              <p className="font-sans text-sm text-ink/60">{sub}</p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <Button type="submit" variant="primary" size="lg" fullWidth>
                      {method === 'COD' ? `Place Order · ₹${total}` : `Pay ₹${total} Online`}
                    </Button>

                    <p className="flex items-center justify-center gap-2 font-sans text-sm text-ink/60">
                      <Lock size={12} /> Secure checkout · your details are protected
                    </p>
                  </form>

                  {/* right side – summary */}
                  <div className="md:col-span-2">
                    <div className="md:sticky md:top-28 bg-sand/40 border border-gold-400/20 rounded-3xl p-6 sm:p-8">
                      <p className="font-royal font-bold text-base tracking-royal uppercase text-black mb-5">
                        Order Summary
                      </p>
                      <div className="flex gap-3">
                        {product.image && (
                          <img src={product.image} alt={product.title} className="w-16 h-20 rounded-lg object-cover border border-gold-400/20" />
                        )}
                        <div>
                          <p className="font-display text-lg text-ink leading-tight">{product.title}</p>
                          <p className="font-sans text-sm text-ink/60">Qty {quantity}</p>
                          <p className="font-display text-lg text-ink mt-1">₹{subtotal}</p>
                        </div>
                      </div>
                      <div className="mt-6 pt-5 border-t border-gold-400/20 space-y-2">
                        <Row label="Subtotal" value={`₹${subtotal}`} />
                        {appliedCoupon && (
                          <div className="flex justify-between items-center">
                            <span className="flex items-center gap-1.5 font-serif text-sm text-saffron-600">
                              <Tag size={13} /> {appliedCoupon.code}
                            </span>
                            <span className="font-serif text-sm text-saffron-600">− ₹{discount}</span>
                          </div>
                        )}
                        <Row label="Shipping" value="Free" />
                        <div className="flex justify-between items-baseline pt-3 border-t border-gold-400/15 mt-3">
                          <span className="font-royal text-sm tracking-royal uppercase text-ink/70">Total</span>
                          <span className="font-display text-2xl text-ink">₹{total}</span>
                        </div>
                      </div>
                      <div className="mt-6 space-y-2.5">
                        <span className="flex items-center gap-2 font-sans text-sm text-ink/70">
                          <Truck size={14} className="text-saffron-500" /> Delivered in 3–6 days
                        </span>
                        <span className="flex items-center gap-2 font-sans text-sm text-ink/70">
                          <ShieldCheck size={14} className="text-saffron-500" /> Natural &amp; safe formula
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 'placing' && (
                <motion.div key="placing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-24 text-center">
                  <Loader2 size={40} className="text-saffron-500 animate-spin mx-auto mb-6" />
                  <h3 className="font-display text-2xl text-ink">Placing your order…</h3>
                  <p className="font-serif text-lg text-ink/70 mt-2">Please wait while we prepare your seva.</p>
                </motion.div>
              )}

              {step === 'online-redirect' && (
                <motion.div key="redirect" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-24 text-center">
                  <Loader2 size={40} className="text-saffron-500 animate-spin mx-auto mb-6" />
                  <h3 className="font-display text-2xl text-ink">Redirecting to payment…</h3>
                  <p className="font-serif text-lg text-ink/70 mt-2">Taking you to PhonePe securely.</p>
                </motion.div>
              )}

              {step === 'error' && (
                <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center">
                  <div className="w-16 h-16 rounded-full bg-maroon-50 border border-maroon-500/30 text-maroon-500 flex items-center justify-center mx-auto mb-6">
                    <AlertCircle size={28} />
                  </div>
                  <h3 className="font-display text-2xl text-ink">Order could not be placed</h3>
                  <p className="font-serif text-lg text-ink/70 mt-2 max-w-md mx-auto">{error}</p>
                  <Button variant="outline" className="mt-6" onClick={() => setStep('form')}>Try Again</Button>
                </motion.div>
              )}

              {step === 'success' && order && (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-16 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-saffron-500 to-maroon-500 text-ivory flex items-center justify-center mx-auto mb-6 shadow-gold"
                  >
                    <Check size={36} />
                  </motion.div>
                  <h3 className="font-display text-3xl text-ink">Order Placed with Devotion</h3>
                  <p className="font-serif text-lg text-ink/80 mt-3 max-w-md mx-auto">
                    Your order has been received. We will deliver it with the care it deserves.
                  </p>
                  <div className="mt-6 inline-flex flex-col gap-1 px-6 py-4 rounded-2xl bg-gold-50 border border-gold-400/25">
                    <span className="font-royal text-xs tracking-royal uppercase text-ink/60">Order ID</span>
                    <span className="font-display text-lg text-ink">{order._id}</span>
                    <span className="font-royal text-xs tracking-royal uppercase text-saffron-500 mt-1">Status: {order.status}</span>
                  </div>
                  <p className="font-deva text-2xl text-saffron-500/70 mt-6">ईश्वर आपका भला करे</p>
                  <div className="mt-8 flex items-center justify-center gap-3">
                    <Button variant="outline" onClick={handleClose}>Continue Shopping</Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// --- Helper components ---
function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required,
  maxLength,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  maxLength?: number;
  inputMode?: 'text' | 'numeric' | 'tel' | 'email' | 'none' | 'search' | 'url' | 'decimal';
}) {
  return (
    <label className="block">
      <span className="font-royal text-sm font-semibold tracking-royal uppercase text-ink/80 block mb-2">
        {label}
      </span>
      <input
        required={required}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        inputMode={inputMode}
        className="w-full px-4 py-2.5 rounded-xl bg-white border border-gold-400/25 font-serif text-ink placeholder:text-ink/30 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all"
      />
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="font-serif text-sm text-ink/70">{label}</span>
      <span className="font-serif text-sm text-ink/90">{value}</span>
    </div>
  );
}