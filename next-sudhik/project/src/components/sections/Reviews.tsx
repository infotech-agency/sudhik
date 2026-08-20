// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import { motion } from 'framer-motion';
// import { BadgeCheck, ThumbsUp, MapPin, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
// import Stars from '@/components/ui/Stars';
// import SectionHeading from '@/components/ui/SectionHeading';
// import WriteReview from './WriteReview';
// import { api, ApiError } from '@/lib/api';
// import { useAuth } from '@/lib/auth-context';
// import type { Review } from '@/lib/types';

// export default function Reviews({ productId }: { productId: string }) {
//   const [reviews, setReviews] = useState<Review[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [helpful, setHelpful] = useState<Record<string, boolean>>({});
//   const { isAuthenticated } = useAuth();

//   const fetchReviews = useCallback(async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const data = await api.get<Review[]>(`/api/reviews/product/${productId}`);
//       setReviews(Array.isArray(data) ? data : []);
//     } catch (err) {
//       const msg = err instanceof ApiError ? err.message : 'Could not load reviews.';
//       setError(msg);
//     } finally {
//       setLoading(false);
//     }
//   }, [productId]);

//   useEffect(() => {
//     fetchReviews();
//   }, [fetchReviews]);

//   const avg =
//     reviews.length > 0
//       ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
//       : 0;

//   const distribution = [5, 4, 3, 2, 1].map((stars) => {
//     const count = reviews.filter((r) => r.rating === stars).length;
//     return { stars, count, percent: reviews.length ? (count / reviews.length) * 100 : 0 };
//   });

//   return (
//     <section id="reviews" className="relative py-24 sm:py-32 bg-gradient-to-b from-sand/30 via-maroon-50/40 to-sand/30">
//       <div className="absolute inset-0 bg-lotus-fade opacity-50 pointer-events-none" />
//       <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
//         <SectionHeading
//           eyebrow="Devoted Voices"
//           hindiTitle="भक्तजनों की अभिव्यक्ति"
//           title={<>What the <span className="text-saffron-gradient">Devoted</span> Say</>}
//           subtitle="Verified buyers share their experience."
//         />

//         {loading ? (
//           <div className="flex flex-col items-center justify-center py-20">
//             <Loader2 size={32} className="text-saffron-500 animate-spin mb-4" />
//             <p className="font-serif text-ink/55">Loading reviews…</p>
//           </div>
//         ) : error ? (
//           <div className="flex flex-col items-center justify-center py-20 text-center">
//             <AlertCircle size={32} className="text-maroon-500 mb-4" />
//             <p className="font-serif text-ink/65 max-w-md">{error}</p>
//             <button onClick={fetchReviews} className="mt-5 inline-flex items-center gap-2 font-royal text-xs tracking-royal uppercase text-saffron-500 hover:text-saffron-600">
//               <RefreshCw size={14} /> Try Again
//             </button>
//           </div>
//         ) : (
//           <>
//             {/* summary */}
//             <div className="grid lg:grid-cols-3 gap-8 mt-16">
//               <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="p-8 rounded-3xl bg-white border border-gold-400/20 shadow-premium flex flex-col items-center text-center">
//                 <span className="font-display text-6xl text-ink">{avg.toFixed(1)}</span>
//                 <Stars rating={avg} size={20} className="mt-3" />
//                 <p className="font-serif text-ink/60 mt-3">Based on {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}</p>
//               </motion.div>

//               <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} className="p-8 rounded-3xl bg-white border border-gold-400/20 shadow-premium lg:col-span-2">
//                 <p className="font-royal text-[10px] tracking-royal uppercase text-ink/40 mb-5">Rating Distribution</p>
//                 <div className="space-y-3">
//                   {distribution.map((d) => (
//                     <div key={d.stars} className="flex items-center gap-4">
//                       <span className="font-serif text-sm text-ink/60 w-12 flex items-center gap-1">{d.stars} <span className="text-gold-400">★</span></span>
//                       <div className="flex-1 h-2.5 rounded-full bg-gold-50 overflow-hidden">
//                         <motion.div initial={{ width: 0 }} whileInView={{ width: `${d.percent}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }} className="h-full rounded-full bg-gradient-to-r from-saffron-500 to-gold-400" />
//                       </div>
//                       <span className="font-serif text-sm text-ink/60 w-16 text-right">{d.count}</span>
//                     </div>
//                   ))}
//                 </div>
//               </motion.div>
//             </div>

//             {/* review cards */}
//             {reviews.length === 0 ? (
//               <div className="text-center py-16">
//                 <p className="font-display text-2xl text-ink">No reviews yet</p>
//                 <p className="font-serif text-ink/55 mt-2">Be the first to share your devotion.</p>
//               </div>
//             ) : (
//               <div className="grid md:grid-cols-2 gap-6 mt-10">
//                 {reviews.map((r, i) => (
//                   <motion.article key={r._id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.6, delay: i * 0.06 }} className="p-7 rounded-3xl bg-white border border-gold-400/15 hover:border-gold-400/35 hover:shadow-premium transition-all duration-500">
//                     <div className="flex items-start gap-4">
//                       <div className="w-12 h-12 rounded-full bg-gradient-to-br from-saffron-500 to-maroon-500 text-ivory font-display text-lg flex items-center justify-center shrink-0">
//                         {(r.guestName || r.user?.name || 'A').charAt(0).toUpperCase()}
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <div className="flex items-center gap-2 flex-wrap">
//                           <span className="font-display text-lg text-ink">{r.guestName || r.user?.name || 'Anonymous'}</span>
//                           {r.user && (
//                             <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-saffron-50 border border-saffron-500/20 text-saffron-600 font-sans text-[10px] font-semibold">
//                               <BadgeCheck size={11} /> Verified Buyer
//                             </span>
//                           )}
//                         </div>
//                         <div className="flex items-center gap-2 mt-1.5 flex-wrap">
//                           <Stars rating={r.rating} size={13} />
//                           <span className="font-sans text-xs text-ink/40">· {new Date(r.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
//                         </div>
//                       </div>
//                     </div>
//                     <p className="font-serif text-base text-ink/70 leading-relaxed mt-5">{r.comment}</p>
//                     <div className="flex items-center gap-4 mt-6 pt-5 border-t border-gold-400/10">
//                       <button onClick={() => setHelpful((h) => ({ ...h, [r._id]: !h[r._id] }))} className={`inline-flex items-center gap-2 font-sans text-xs transition-colors ${helpful[r._id] ? 'text-saffron-500' : 'text-ink/50 hover:text-saffron-500'}`}>
//                         <ThumbsUp size={14} className={helpful[r._id] ? 'fill-saffron-500' : ''} /> Helpful
//                       </button>
//                     </div>
//                   </motion.article>
//                 ))}
//               </div>
//             )}

//             <WriteReview productId={productId} isAuthenticated={isAuthenticated} onSubmitted={fetchReviews} />
//           </>
//         )}
//       </div>
//     </section>
//   );
// }

'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BadgeCheck, ThumbsUp, MapPin, Loader2, AlertCircle, RefreshCw, X } from 'lucide-react';
import Stars from '@/components/ui/Stars';
import SectionHeading from '@/components/ui/SectionHeading';
import WriteReview from './WriteReview';
import { api, ApiError } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';
import type { Review } from '@/lib/types';

export default function Reviews({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [helpful, setHelpful] = useState<Record<string, boolean>>({});
  const [lightbox, setLightbox] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await api.get<Review[]>(`/api/reviews/product/${productId}`);
      setReviews(Array.isArray(data) ? data : []);
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : 'Could not load reviews.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const avg =
    reviews.length > 0
      ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
      : 0;

  const distribution = [5, 4, 3, 2, 1].map((stars) => {
    const count = reviews.filter((r) => r.rating === stars).length;
    return { stars, count, percent: reviews.length ? (count / reviews.length) * 100 : 0 };
  });

  return (
    <section id="reviews" className="relative py-24 sm:py-32 bg-gradient-to-b from-sand/30 via-maroon-50/40 to-sand/30">
      <div className="absolute inset-0 bg-lotus-fade opacity-50 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Devoted Voices"
          hindiTitle="भक्तजनों की अभिव्यक्ति"
          title={<>What the <span className="text-saffron-gradient">Devoted</span> Say</>}
          subtitle="Verified buyers share their experience."
        />

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 size={32} className="text-saffron-500 animate-spin mb-4" />
            <p className="font-serif text-ink/55">Loading reviews…</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <AlertCircle size={32} className="text-maroon-500 mb-4" />
            <p className="font-serif text-ink/65 max-w-md">{error}</p>
            <button onClick={fetchReviews} className="mt-5 inline-flex items-center gap-2 font-royal text-xs tracking-royal uppercase text-saffron-500 hover:text-saffron-600">
              <RefreshCw size={14} /> Try Again
            </button>
          </div>
        ) : (
          <>
            {/* summary */}
            <div className="grid lg:grid-cols-3 gap-8 mt-16">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="p-8 rounded-3xl bg-white border border-gold-400/20 shadow-premium flex flex-col items-center text-center">
                <span className="font-display text-6xl text-ink">{avg.toFixed(1)}</span>
                <Stars rating={avg} size={20} className="mt-3" />
                <p className="font-serif text-ink/60 mt-3">Based on {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} className="p-8 rounded-3xl bg-white border border-gold-400/20 shadow-premium lg:col-span-2">
                <p className="font-royal text-[10px] tracking-royal uppercase text-ink/40 mb-5">Rating Distribution</p>
                <div className="space-y-3">
                  {distribution.map((d) => (
                    <div key={d.stars} className="flex items-center gap-4">
                      <span className="font-serif text-sm text-ink/60 w-12 flex items-center gap-1">{d.stars} <span className="text-gold-400">★</span></span>
                      <div className="flex-1 h-2.5 rounded-full bg-gold-50 overflow-hidden">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: `${d.percent}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }} className="h-full rounded-full bg-gradient-to-r from-saffron-500 to-gold-400" />
                      </div>
                      <span className="font-serif text-sm text-ink/60 w-16 text-right">{d.count}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* review cards */}
            {reviews.length === 0 ? (
              <div className="text-center py-16">
                <p className="font-display text-2xl text-ink">No reviews yet</p>
                <p className="font-serif text-ink/55 mt-2">Be the first to share your devotion.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6 mt-10">
                {reviews.map((r, i) => (
                  <motion.article key={r._id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.6, delay: i * 0.06 }} className="p-7 rounded-3xl bg-white border border-gold-400/15 hover:border-gold-400/35 hover:shadow-premium transition-all duration-500">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-saffron-500 to-maroon-500 text-ivory font-display text-lg flex items-center justify-center shrink-0">
                        {(r.guestName || r.user?.name || 'A').charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-display text-lg text-ink">{r.guestName || r.user?.name || 'Anonymous'}</span>
                          {r.user && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-saffron-50 border border-saffron-500/20 text-saffron-600 font-sans text-[10px] font-semibold">
                              <BadgeCheck size={11} /> Verified Buyer
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                          <Stars rating={r.rating} size={13} />
                          <span className="font-sans text-xs text-ink/40">· {new Date(r.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        </div>
                      </div>
                    </div>
                    <p className="font-serif text-base text-ink/70 leading-relaxed mt-5">{r.comment}</p>

                    {/* review photos, agar user ne upload ki hon */}
                    {r.images && r.images.length > 0 && (
                      <div className="flex gap-2 mt-4 flex-wrap">
                        {r.images.map((src, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setLightbox(src)}
                            className="w-16 h-16 rounded-lg overflow-hidden border border-gold-400/20 hover:border-gold-400/50 transition-colors"
                          >
                            <img src={src} alt={`Review photo ${idx + 1}`} className="w-full h-full object-cover" draggable={false} />
                          </button>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-4 mt-6 pt-5 border-t border-gold-400/10">
                      <button onClick={() => setHelpful((h) => ({ ...h, [r._id]: !h[r._id] }))} className={`inline-flex items-center gap-2 font-sans text-xs transition-colors ${helpful[r._id] ? 'text-saffron-500' : 'text-ink/50 hover:text-saffron-500'}`}>
                        <ThumbsUp size={14} className={helpful[r._id] ? 'fill-saffron-500' : ''} /> Helpful
                      </button>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}

            <WriteReview productId={productId} isAuthenticated={isAuthenticated} onSubmitted={fetchReviews} />
          </>
        )}
      </div>

      {/* fullscreen preview for review photos */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-ink/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setLightbox(null)}
          >
            <button className="absolute top-4 right-4 sm:top-6 sm:right-6 p-3 rounded-full bg-ivory/10 text-ivory hover:bg-gold-400 hover:text-ink transition-all" aria-label="Close">
              <X size={22} />
            </button>
            <motion.img
              src={lightbox}
              alt="Review photo"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-[88vw] sm:max-w-[85vw] max-h-[75vh] sm:max-h-[82vh] rounded-2xl object-contain border border-gold-400/30"
              onClick={(e) => e.stopPropagation()}
              draggable={false}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}