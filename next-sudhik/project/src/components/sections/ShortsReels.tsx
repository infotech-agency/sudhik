// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import { Youtube, Instagram, Loader2 } from 'lucide-react';
// import { getEmbedInfo } from '@/lib/video-emed';
// // import { getEmbedInfo } from '@/lib/video-embed';

// type Video = {
//   _id: string;
//   title: string;
//   url: string;
//   platform: 'youtube' | 'instagram';
//   isActive: boolean;
// };

// export default function ShortsReels() {
//   const [videos, setVideos] = useState<Video[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(`https://api.shuddhik.com/api/videos`)
//       .then((res) => res.json())
//       .then((json) => {
//         const active = (json?.data || []).filter((v: Video) => v.isActive);
//         setVideos(active);
//       })
//       .catch(() => setVideos([]))
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading) {
//     return (
//       <section className="py-16 flex justify-center">
//         <Loader2 className="h-6 w-6 animate-spin text-saffron-500" />
//       </section>
//     );
//   }

//   if (videos.length === 0) return null;

//   return (
//     <section className="relative bg-ivory py-16 sm:py-24">
//       <div className="mx-auto max-w-7xl px-5 sm:px-8">
//         {/* <div className="text-center mb-10 sm:mb-14">
//           <span className="font-royal text-xs tracking-royal uppercase text-saffron-500">
//             Dekhein
//           </span>
//           <h2 className="font-display text-3xl sm:text-4xl text-ink mt-3">
//             Shorts &amp; Reels
//           </h2>
//         </div> */}
//         <div className="text-center mb-10 sm:mb-14">
//   <span className="font-royal text-xs tracking-royal uppercase text-saffron-500">
//     What People Say
//   </span>
//   <h2 className="font-display text-3xl sm:text-4xl text-ink mt-3">
//     Reviews &amp; Testimonials
//   </h2>
// </div>
//         {/* Mobile: horizontal snap-scroll · Desktop: grid */}
//         <div
//           className="
//             flex sm:grid gap-4 sm:gap-5
//             sm:grid-cols-3 lg:grid-cols-4
//             overflow-x-auto sm:overflow-visible
//             snap-x snap-mandatory sm:snap-none
//             -mx-5 px-5 sm:mx-0 sm:px-0
//             scrollbar-hide
//           "
//         >
//           {videos.map((v) => (
//             <VideoCard key={v._id} video={v} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// function VideoCard({ video }: { video: Video }) {
//   const info = getEmbedInfo(video.url);
//   const ref = useRef<HTMLDivElement>(null);
//   const [inView, setInView] = useState(false);

//   // Lazy-load iframe only when card scrolls into view
//   useEffect(() => {
//     if (!ref.current) return;
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setInView(true);
//           observer.disconnect();
//         }
//       },
//       { rootMargin: '200px' }
//     );
//     observer.observe(ref.current);
//     return () => observer.disconnect();
//   }, []);

//   if (!info) return null;

//   return (
//     <div
//       ref={ref}
//       className="
//         shrink-0 snap-start
//         w-[68vw] xs:w-[55vw] sm:w-auto
//         rounded-2xl overflow-hidden border border-gold-400/25 bg-sand/30
//       "
//     >
//       <div className="flex items-center gap-2 px-3 py-2.5 bg-ink text-ivory">
//         {info.platform === 'youtube' ? (
//           <Youtube size={14} className="text-red-400 shrink-0" />
//         ) : (
//           <Instagram size={14} className="text-pink-400 shrink-0" />
//         )}
//         <p className="font-serif text-xs truncate">{video.title}</p>
//       </div>

//       <div className="relative w-full aspect-[9/16] bg-black">
//         {inView ? (
//           <iframe
//             src={info.embedUrl}
//             title={video.title}
//             className="absolute inset-0 w-full h-full"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//             loading="lazy"
//             frameBorder="0"
//           />
//         ) : (
//           <div className="absolute inset-0 flex items-center justify-center">
//             <Loader2 className="h-5 w-5 animate-spin text-gold-300" />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Youtube, Instagram, Loader2 } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { getEmbedInfo } from '@/lib/video-emed';
// import { getEmbedInfo } from '@/lib/video-embed';

type Video = {
  _id: string;
  title: string;
  url: string;
  platform: 'youtube' | 'instagram';
  isActive: boolean;
};

const dotFade = 'radial-gradient(ellipse at 50% 40%, black 20%, transparent 75%)';

// same layout classes for the real row and the loading row, so nothing jumps
const ROW =
  'flex sm:grid gap-4 sm:gap-5 sm:grid-cols-3 lg:grid-cols-4 overflow-x-auto sm:overflow-visible snap-x snap-mandatory sm:snap-none -mx-5 px-5 pt-2 pb-8 sm:mx-0 sm:px-0 sm:pt-0 sm:pb-0 scrollbar-hide';
const CARD_W = 'shrink-0 snap-start w-[68vw] xs:w-[55vw] sm:w-auto';

export default function ShortsReels() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.shuddhik.com/api/videos`)
      .then((res) => res.json())
      .then((json) => {
        const active = (json?.data || []).filter((v: Video) => v.isActive);
        setVideos(active);
      })
      .catch(() => setVideos([]))
      .finally(() => setLoading(false));
  }, []);

  if (!loading && videos.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-ivory py-16 sm:py-24">
      {/* faint dot grid (like a screen) + warm light behind the phones */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(178,131,49,0.22) 1px, transparent 1px)',
            backgroundSize: '22px 22px',
            maskImage: dotFade,
            WebkitMaskImage: dotFade,
          }}
        />
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-saffron-300/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="What People Say"
          hindiTitle="भक्तों के अनुभव"
          title="Reviews & Testimonials"
        />

        <div className="relative mt-12 sm:mt-14">
          {loading ? (
            <div className={ROW} aria-busy="true" aria-label="Loading videos">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className={CARD_W}>
                  <div className="rounded-[2rem] border-[6px] border-ink/90 bg-ink/90">
                    <div className="aspect-[9/16] animate-pulse rounded-[1.5rem] bg-ink/60" />
                  </div>
                  <div className="mt-3 h-4 w-2/3 animate-pulse rounded bg-gold-400/20" />
                </div>
              ))}
            </div>
          ) : (
            <div className={ROW}>
              {videos.map((v, i) => (
                <VideoCard key={v._id} video={v} index={i} />
              ))}
            </div>
          )}

          {/* mobile hint: more cards to the right */}
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 right-[-1.25rem] top-0 w-10 bg-gradient-to-l from-ivory to-transparent sm:hidden"
          />
        </div>
      </div>
    </section>
  );
}

function VideoCard({ video, index }: { video: Video; index: number }) {
  const info = getEmbedInfo(video.url);
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  // Lazy-load iframe only when card scrolls into view
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  if (!info) return null;

  const isYoutube = info.platform === 'youtube';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`group ${CARD_W}`}
    >
      {/* phone frame */}
      <div className="relative overflow-hidden rounded-[2rem] border-[6px] border-ink bg-ink shadow-premium transition-all duration-500 group-hover:-translate-y-1.5 group-hover:shadow-[0_26px_50px_-18px_rgba(120,60,10,0.45)]">
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1.5 z-10 h-1.5 w-12 -translate-x-1/2 rounded-full bg-ink"
        />
        <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[1.5rem] bg-black">
          {inView ? (
            <iframe
              src={info.embedUrl}
              title={video.title}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              frameBorder="0"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="h-5 w-5 animate-spin text-gold-300" />
            </div>
          )}
        </div>
      </div>

      {/* title sits under the phone, with a small platform badge */}
      <div className="mt-3 flex items-start gap-2.5 px-1">
        <span
          className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white ${
            isYoutube ? 'bg-red-500' : 'bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600'
          }`}
        >
          {isYoutube ? <Youtube size={12} /> : <Instagram size={12} />}
        </span>
        <p className="line-clamp-2 font-serif text-base font-medium leading-snug text-ink/85">{video.title}</p>
      </div>
    </motion.div>
  );
}