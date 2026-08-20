// 'use client';

// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Star, Check, PenLine, Loader2, AlertCircle } from 'lucide-react';
// import Button from '@/components/ui/Button';
// import { api, ApiError } from '@/lib/api';

// interface WriteReviewProps {
//   productId: string;
//   isAuthenticated: boolean;
//   onSubmitted: () => void;
// }

// export default function WriteReview({ productId, isAuthenticated, onSubmitted }: WriteReviewProps) {
//   const [rating, setRating] = useState(0);
//   const [hover, setHover] = useState(0);
//   const [comment, setComment] = useState('');
//   const [guestName, setGuestName] = useState('');
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (rating === 0) {
//       setError('Please select a rating.');
//       return;
//     }
//     setSubmitting(true);
//     setError('');

//     try {
//       const body: { rating: number; comment: string; guestName?: string } = {
//         rating,
//         comment,
//       };
//       if (!isAuthenticated) {
//         body.guestName = guestName || 'Anonymous';
//       }

//       await api.post(`/api/reviews/product/${productId}`, body, isAuthenticated);
//       setSuccess(true);
//       onSubmitted();
//     } catch (err) {
//       const msg = err instanceof ApiError ? err.message : 'Could not submit review.';
//       setError(msg);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="mt-16 max-w-3xl mx-auto">
//       <div className="relative p-8 sm:p-10 rounded-3xl bg-white border border-gold-400/20 shadow-premium overflow-hidden">
//         <div className="absolute inset-0 bg-gold-radial opacity-30 pointer-events-none" />

//         <AnimatePresence mode="wait">
//           {!success ? (
//             <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }} className="relative">
//               <div className="flex items-center gap-3 mb-2">
//                 <PenLine size={18} className="text-saffron-500" />
//                 <span className="font-royal text-[11px] tracking-royal uppercase text-saffron-500">Share Your Devotion</span>
//               </div>
//               <h3 className="font-display text-2xl sm:text-3xl text-ink">Write a Review</h3>

//               <form onSubmit={handleSubmit} className="mt-8 space-y-5">
//                 <div>
//                   <label className="font-royal text-[10px] tracking-royal uppercase text-ink/45 block mb-2">Your Rating</label>
//                   <div className="flex items-center gap-1.5">
//                     {Array.from({ length: 5 }).map((_, i) => {
//                       const idx = i + 1;
//                       return (
//                         <button key={i} type="button" onClick={() => setRating(idx)} onMouseEnter={() => setHover(idx)} onMouseLeave={() => setHover(0)} aria-label={`${idx} star${idx > 1 ? 's' : ''}`} className="transition-transform hover:scale-125">
//                           <Star size={28} strokeWidth={1.5} className={(hover || rating) >= idx ? 'text-gold-400 fill-gold-400' : 'text-gold-400/30'} />
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 {!isAuthenticated && (
//                   <div>
//                     <label className="font-royal text-[10px] tracking-royal uppercase text-ink/45 block mb-2">Your Name (optional)</label>
//                     <input value={guestName} onChange={(e) => setGuestName(e.target.value)} placeholder="Leave blank to post anonymously" className="w-full px-4 py-3 rounded-xl bg-ivory border border-gold-400/25 font-serif text-ink placeholder:text-ink/30 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all" />
//                   </div>
//                 )}

//                 <div>
//                   <label className="font-royal text-[10px] tracking-royal uppercase text-ink/45 block mb-2">Your Review</label>
//                   <textarea required rows={4} value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Tell us about your experience…" className="w-full px-4 py-3 rounded-xl bg-ivory border border-gold-400/25 font-serif text-ink placeholder:text-ink/30 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all resize-none" />
//                 </div>

//                 {error && (
//                   <div className="flex items-center gap-2 p-3 rounded-xl bg-maroon-50 border border-maroon-500/20 text-maroon-500 font-sans text-sm">
//                     <AlertCircle size={16} /> {error}
//                   </div>
//                 )}

//                 <div className="flex items-center justify-between gap-4 pt-2">
//                   <p className="font-sans text-xs text-ink/40">{isAuthenticated ? 'Posting as a signed-in user.' : 'Posting as a guest.'}</p>
//                   <Button type="submit" variant="primary" size="md" disabled={submitting}>
//                     {submitting ? <Loader2 size={16} className="animate-spin" /> : 'Submit Review'}
//                   </Button>
//                 </div>
//               </form>
//             </motion.div>
//           ) : (
//             <motion.div key="thanks" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative text-center py-10">
//               <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }} className="w-16 h-16 rounded-full bg-gradient-to-br from-saffron-500 to-maroon-500 text-ivory flex items-center justify-center mx-auto mb-6 shadow-gold">
//                 <Check size={28} />
//               </motion.div>
//               <h3 className="font-display text-3xl text-ink">Dhanyavaad.</h3>
//               <p className="font-serif text-lg text-ink/65 mt-3 max-w-md mx-auto">Your review has been received with gratitude.</p>
//               <p className="font-deva text-xl text-saffron-500/70 mt-6">शुभम् भवतु</p>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }


'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Check, PenLine, Loader2, AlertCircle, ImagePlus, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import { api, ApiError } from '@/lib/api';

interface WriteReviewProps {
  productId: string;
  isAuthenticated: boolean;
  onSubmitted: () => void;
}

const MAX_IMAGES = 5;

export default function WriteReview({ productId, isAuthenticated, onSubmitted }: WriteReviewProps) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [guestName, setGuestName] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    const incoming = Array.from(fileList).filter((f) => f.type.startsWith('image/'));
    const combined = [...images, ...incoming].slice(0, MAX_IMAGES);
    setImages(combined);
    setPreviews(combined.map((f) => URL.createObjectURL(f)));
  };

  const removeImage = (idx: number) => {
    const next = images.filter((_, i) => i !== idx);
    setImages(next);
    setPreviews(next.map((f) => URL.createObjectURL(f)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setError('Please select a rating.');
      return;
    }
    setSubmitting(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('rating', String(rating));
      formData.append('comment', comment);
      if (!isAuthenticated) {
        formData.append('guestName', guestName || 'Anonymous');
      }
      images.forEach((file) => formData.append('images', file));

      await api.post(`/api/reviews/product/${productId}`, formData, isAuthenticated);
      setSuccess(true);
      onSubmitted();
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : 'Could not submit review.';
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-16 max-w-3xl mx-auto">
      <div className="relative p-8 sm:p-10 rounded-3xl bg-white border border-gold-400/20 shadow-premium overflow-hidden">
        <div className="absolute inset-0 bg-gold-radial opacity-30 pointer-events-none" />

        <AnimatePresence mode="wait">
          {!success ? (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }} className="relative">
              <div className="flex items-center gap-3 mb-2">
                <PenLine size={18} className="text-saffron-500" />
                <span className="font-royal text-[11px] tracking-royal uppercase text-saffron-500">Share Your Devotion</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl text-ink">Write a Review</h3>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div>
                  <label className="font-royal text-[10px] tracking-royal uppercase text-ink/45 block mb-2">Your Rating</label>
                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: 5 }).map((_, i) => {
                      const idx = i + 1;
                      return (
                        <button key={i} type="button" onClick={() => setRating(idx)} onMouseEnter={() => setHover(idx)} onMouseLeave={() => setHover(0)} aria-label={`${idx} star${idx > 1 ? 's' : ''}`} className="transition-transform hover:scale-125">
                          <Star size={28} strokeWidth={1.5} className={(hover || rating) >= idx ? 'text-gold-400 fill-gold-400' : 'text-gold-400/30'} />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {!isAuthenticated && (
                  <div>
                    <label className="font-royal text-[10px] tracking-royal uppercase text-ink/45 block mb-2">Your Name (optional)</label>
                    <input value={guestName} onChange={(e) => setGuestName(e.target.value)} placeholder="Leave blank to post anonymously" className="w-full px-4 py-3 rounded-xl bg-ivory border border-gold-400/25 font-serif text-ink placeholder:text-ink/30 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all" />
                  </div>
                )}

                <div>
                  <label className="font-royal text-[10px] tracking-royal uppercase text-ink/45 block mb-2">Your Review</label>
                  <textarea required rows={4} value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Tell us about your experience…" className="w-full px-4 py-3 rounded-xl bg-ivory border border-gold-400/25 font-serif text-ink placeholder:text-ink/30 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all resize-none" />
                </div>

                <div>
                  <label className="font-royal text-[10px] tracking-royal uppercase text-ink/45 block mb-2">
                    Photos (optional, up to {MAX_IMAGES})
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {previews.map((src, idx) => (
                      <div key={idx} className="relative w-20 h-20 rounded-xl overflow-hidden border border-gold-400/25 group">
                        <img src={src} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          aria-label="Remove image"
                          className="absolute top-1 right-1 w-5 h-5 rounded-full bg-ink/70 text-ivory flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                    {images.length < MAX_IMAGES && (
                      <label className="w-20 h-20 rounded-xl border border-dashed border-gold-400/40 flex items-center justify-center cursor-pointer text-ink/40 hover:text-saffron-500 hover:border-gold-400 transition-colors">
                        <ImagePlus size={20} />
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={(e) => handleFiles(e.target.files)}
                        />
                      </label>
                    )}
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-maroon-50 border border-maroon-500/20 text-maroon-500 font-sans text-sm">
                    <AlertCircle size={16} /> {error}
                  </div>
                )}

                <div className="flex items-center justify-between gap-4 pt-2">
                  <p className="font-sans text-xs text-ink/40">{isAuthenticated ? 'Posting as a signed-in user.' : 'Posting as a guest.'}</p>
                  <Button type="submit" variant="primary" size="md" disabled={submitting}>
                    {submitting ? <Loader2 size={16} className="animate-spin" /> : 'Submit Review'}
                  </Button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div key="thanks" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative text-center py-10">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }} className="w-16 h-16 rounded-full bg-gradient-to-br from-saffron-500 to-maroon-500 text-ivory flex items-center justify-center mx-auto mb-6 shadow-gold">
                <Check size={28} />
              </motion.div>
              <h3 className="font-display text-3xl text-ink">Dhanyavaad.</h3>
              <p className="font-serif text-lg text-ink/65 mt-3 max-w-md mx-auto">Your review has been received with gratitude.</p>
              <p className="font-deva text-xl text-saffron-500/70 mt-6">शुभम् भवतु</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}