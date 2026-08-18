
// 'use client';

// import { useState, useRef, type MouseEvent } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
// import type { Product } from '@/lib/types';
// import { productImageUrls } from '@/lib/product-utils';

// interface GalleryImage {
//   src: string;
//   alt: string;
//   label: string;
// }

// export default function ProductGallery({ product }: { product: Product }) {
//   const urls = productImageUrls(product);
//   const images: GalleryImage[] = urls.length
//     ? urls.map((src, i) => ({
//         src,
//         alt: `${product.title} image ${i + 1}`,
//         label: ['Front', 'Detail', 'Ingredients', 'In Use', 'Packaging'][i] || `Image ${i + 1}`,
//       }))
//     : [{ src: '', alt: product.title, label: 'No image' }];

//   const [active, setActive] = useState(0);
//   const [fullscreen, setFullscreen] = useState(false);
//   const [lens, setLens] = useState<{ x: number; y: number; on: boolean }>({ x: 0, y: 0, on: false });
//   const imgRef = useRef<HTMLDivElement>(null);

//   const activeImg = images[active];

//   const handleMove = (e: MouseEvent<HTMLDivElement>) => {
//     const el = imgRef.current;
//     if (!el) return;
//     const rect = el.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;
//     setLens({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, on: true });
//   };

//   const next = () => setActive((a) => (a + 1) % images.length);
//   const prev = () => setActive((a) => (a - 1 + images.length) % images.length);

//   return (
//     <div className="flex flex-col-reverse sm:flex-row gap-4 lg:gap-6">
//       <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible no-scrollbar">
//         {images.map((img, i) => (
//           <button
//             key={i}
//             onClick={() => setActive(i)}
//             aria-label={`View ${img.label}`}
//             className={`shrink-0 w-20 h-20 sm:w-[88px] sm:h-[88px] rounded-xl overflow-hidden border-2 transition-all duration-300 ${active === i ? 'border-gold-400 shadow-glow-soft' : 'border-gold-400/20 hover:border-gold-400/50 opacity-70 hover:opacity-100'}`}
//           >
//             {img.src ? (
//               <img src={img.src} alt={img.alt} className="w-full h-full object-cover" draggable={false} />
//             ) : (
//               <div className="w-full h-full bg-gradient-to-br from-ivory to-sand" />
//             )}
//           </button>
//         ))}
//       </div>

//       {/* added isolate so the z-40 zoom panel below always stacks above siblings like PurchaseCard */}
//       <div className="flex-1 relative isolate">
//         <div
//           ref={imgRef}
//           onMouseMove={handleMove}
//           onMouseLeave={() => setLens((l) => ({ ...l, on: false }))}
//           onClick={() => setFullscreen(true)}
//           className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-ivory via-sand/30 to-beige/40 border border-gold-400/25 shadow-premium cursor-lens group"
//         >
//           <AnimatePresence mode="wait">
//             {activeImg.src ? (
//               <motion.img
//                 key={active}
//                 src={activeImg.src}
//                 alt={activeImg.alt}
//                 initial={{ opacity: 0, scale: 1.02 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.4 }}
//                 className="absolute inset-0 w-full h-full object-cover"
//                 draggable={false}
//               />
//             ) : (
//               <div className="absolute inset-0 flex items-center justify-center font-serif text-ink/30">No image available</div>
//             )}
//           </AnimatePresence>

//           <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-maroon-500 text-ivory font-royal text-[10px] tracking-royal uppercase shadow-gold">
//             ₹{product.price}
//           </span>

//           {lens.on && (
//             <div className="absolute pointer-events-none w-28 h-28 border-2 border-gold-400/70 bg-gold-400/10 rounded-lg hidden lg:block" style={{ left: `calc(${lens.x}% - 56px)`, top: `calc(${lens.y}% - 56px)` }} />
//           )}

//           {activeImg.src && (
//             <>
//               {/* visible by default on mobile/tablet, fades in on hover only at lg+ */}
//               <button
//                 onClick={(e) => { e.stopPropagation(); setFullscreen(true); }}
//                 aria-label="View fullscreen"
//                 className="absolute top-4 right-4 p-2.5 rounded-full bg-ivory/70 backdrop-blur-sm border border-gold-400/30 text-ink hover:bg-gold-400 hover:text-ink transition-all opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
//               >
//                 <Maximize2 size={16} />
//               </button>
//               <button
//                 onClick={(e) => { e.stopPropagation(); prev(); }}
//                 aria-label="Previous image"
//                 className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-ivory/70 backdrop-blur-sm border border-gold-400/30 text-ink hover:bg-maroon-500 hover:text-ivory transition-all opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
//               >
//                 <ChevronLeft size={18} />
//               </button>
//               <button
//                 onClick={(e) => { e.stopPropagation(); next(); }}
//                 aria-label="Next image"
//                 className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-ivory/70 backdrop-blur-sm border border-gold-400/30 text-ink hover:bg-maroon-500 hover:text-ivory transition-all opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
//               >
//                 <ChevronRight size={18} />
//               </button>
//             </>
//           )}
//         </div>

//         {/* z-40 fixes it rendering behind PurchaseCard; unchanged otherwise, desktop-only as before */}
//         {lens.on && activeImg.src && (
//           <div className="hidden lg:block absolute -right-[440px] top-0 w-[400px] h-[400px] rounded-2xl overflow-hidden border border-gold-400/40 shadow-premium pointer-events-none bg-ivory z-40" aria-hidden>
//             <img src={activeImg.src.replace('w=1200', 'w=1600')} alt={activeImg.alt} className="absolute inset-0 w-[250%] h-[250%] max-w-none object-cover" style={{ transform: `translate(-${lens.x}%, -${lens.y}%)` }} draggable={false} />
//           </div>
//         )}

//         <p className="text-center font-royal text-[10px] tracking-royal uppercase text-ink/40 mt-4">
//           <span className="hidden lg:inline">Hover to zoom</span>
//           <span className="lg:hidden">Tap to zoom</span>
//           {' '}· {activeImg.label} · {active + 1} / {images.length}
//         </p>
//       </div>

//       <AnimatePresence>
//         {fullscreen && activeImg.src && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-[80] bg-ink/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
//             onClick={() => setFullscreen(false)}
//           >
//             <button className="absolute top-4 right-4 sm:top-6 sm:right-6 p-3 rounded-full bg-ivory/10 text-ivory hover:bg-gold-400 hover:text-ink transition-all" aria-label="Close fullscreen">
//               <X size={22} />
//             </button>
//             <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-2 sm:left-8 p-3 rounded-full bg-ivory/10 text-ivory hover:bg-gold-400 hover:text-ink transition-all" aria-label="Previous">
//               <ChevronLeft size={24} />
//             </button>
//             <motion.img key={active} src={activeImg.src} alt={activeImg.alt} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-[88vw] sm:max-w-[85vw] max-h-[75vh] sm:max-h-[82vh] rounded-2xl object-contain border border-gold-400/30" onClick={(e) => e.stopPropagation()} draggable={false} />
//             <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-2 sm:right-8 p-3 rounded-full bg-ivory/10 text-ivory hover:bg-gold-400 hover:text-ink transition-all" aria-label="Next">
//               <ChevronRight size={24} />
//             </button>
//             <span className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 font-royal text-xs tracking-royal uppercase text-ivory/60">
//               {active + 1} / {images.length} · {activeImg.label}
//             </span>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

'use client';

import { useState, useRef, type MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Product } from '@/lib/types';
import { productImageUrls } from '@/lib/product-utils';

interface GalleryImage {
  src: string;
  alt: string;
  label: string;
}

export default function ProductGallery({ product }: { product: Product }) {
  const urls = productImageUrls(product);
  const images: GalleryImage[] = urls.length
    ? urls.map((src, i) => ({
        src,
        alt: `${product.title} image ${i + 1}`,
        label: ['Front', 'Detail', 'Ingredients', 'In Use', 'Packaging'][i] || `Image ${i + 1}`,
      }))
    : [{ src: '', alt: product.title, label: 'No image' }];

  const [active, setActive] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [lens, setLens] = useState<{ x: number; y: number; on: boolean }>({ x: 0, y: 0, on: false });
  const imgRef = useRef<HTMLDivElement>(null);

  const activeImg = images[active];

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = imgRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setLens({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, on: true });
  };

  const next = () => setActive((a) => (a + 1) % images.length);
  const prev = () => setActive((a) => (a - 1 + images.length) % images.length);

  return (
    <div className="flex flex-col-reverse sm:flex-row gap-4 lg:gap-6 w-full min-w-0">
      {/* min-w-0 = ye scroll strip ab apni content-width se page ko wide nahi karegi */}
      <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible no-scrollbar min-w-0 shrink-0">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`View ${img.label}`}
            className={`shrink-0 w-20 h-20 sm:w-[88px] sm:h-[88px] rounded-xl overflow-hidden border-2 transition-all duration-300 ${active === i ? 'border-gold-400 shadow-glow-soft' : 'border-gold-400/20 hover:border-gold-400/50 opacity-70 hover:opacity-100'}`}
          >
            {img.src ? (
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover" draggable={false} />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-ivory to-sand" />
            )}
          </button>
        ))}
      </div>

      {/* added isolate so the z-40 zoom panel below always stacks above siblings like PurchaseCard */}
      <div className="flex-1 relative isolate min-w-0">
        <div
          ref={imgRef}
          onMouseMove={handleMove}
          onMouseLeave={() => setLens((l) => ({ ...l, on: false }))}
          onClick={() => setFullscreen(true)}
          className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-ivory via-sand/30 to-beige/40 border border-gold-400/25 shadow-premium cursor-lens group"
        >
          <AnimatePresence mode="wait">
            {activeImg.src ? (
              <motion.img
                key={active}
                src={activeImg.src}
                alt={activeImg.alt}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center font-serif text-ink/30">No image available</div>
            )}
          </AnimatePresence>

          <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-maroon-500 text-ivory font-royal text-[10px] tracking-royal uppercase shadow-gold">
            ₹{product.price}
          </span>

          {lens.on && (
            <div className="absolute pointer-events-none w-28 h-28 border-2 border-gold-400/70 bg-gold-400/10 rounded-lg hidden lg:block" style={{ left: `calc(${lens.x}% - 56px)`, top: `calc(${lens.y}% - 56px)` }} />
          )}

          {activeImg.src && (
            <>
              {/* visible by default on mobile/tablet, fades in on hover only at lg+ */}
              <button
                onClick={(e) => { e.stopPropagation(); setFullscreen(true); }}
                aria-label="View fullscreen"
                className="absolute top-4 right-4 p-2.5 rounded-full bg-ivory/70 backdrop-blur-sm border border-gold-400/30 text-ink hover:bg-gold-400 hover:text-ink transition-all opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
              >
                <Maximize2 size={16} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-ivory/70 backdrop-blur-sm border border-gold-400/30 text-ink hover:bg-maroon-500 hover:text-ivory transition-all opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-ivory/70 backdrop-blur-sm border border-gold-400/30 text-ink hover:bg-maroon-500 hover:text-ivory transition-all opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
        </div>

        {/* z-40 fixes it rendering behind PurchaseCard; unchanged otherwise, desktop-only as before */}
        {lens.on && activeImg.src && (
          <div className="hidden lg:block absolute -right-[440px] top-0 w-[400px] h-[400px] rounded-2xl overflow-hidden border border-gold-400/40 shadow-premium pointer-events-none bg-ivory z-40" aria-hidden>
            <img src={activeImg.src.replace('w=1200', 'w=1600')} alt={activeImg.alt} className="absolute inset-0 w-[250%] h-[250%] max-w-none object-cover" style={{ transform: `translate(-${lens.x}%, -${lens.y}%)` }} draggable={false} />
          </div>
        )}

        <p className="text-center font-royal text-[10px] tracking-royal uppercase text-ink/40 mt-4">
          <span className="hidden lg:inline">Hover to zoom</span>
          <span className="lg:hidden">Tap to zoom</span>
          {' '}· {activeImg.label} · {active + 1} / {images.length}
        </p>
      </div>

      <AnimatePresence>
        {fullscreen && activeImg.src && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-ink/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setFullscreen(false)}
          >
            <button className="absolute top-4 right-4 sm:top-6 sm:right-6 p-3 rounded-full bg-ivory/10 text-ivory hover:bg-gold-400 hover:text-ink transition-all" aria-label="Close fullscreen">
              <X size={22} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-2 sm:left-8 p-3 rounded-full bg-ivory/10 text-ivory hover:bg-gold-400 hover:text-ink transition-all" aria-label="Previous">
              <ChevronLeft size={24} />
            </button>
            <motion.img key={active} src={activeImg.src} alt={activeImg.alt} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-[88vw] sm:max-w-[85vw] max-h-[75vh] sm:max-h-[82vh] rounded-2xl object-contain border border-gold-400/30" onClick={(e) => e.stopPropagation()} draggable={false} />
            <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-2 sm:right-8 p-3 rounded-full bg-ivory/10 text-ivory hover:bg-gold-400 hover:text-ink transition-all" aria-label="Next">
              <ChevronRight size={24} />
            </button>
            <span className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 font-royal text-xs tracking-royal uppercase text-ivory/60">
              {active + 1} / {images.length} · {activeImg.label}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}