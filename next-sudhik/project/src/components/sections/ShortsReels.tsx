'use client';

import { useEffect, useRef, useState } from 'react';
import { Youtube, Instagram, Loader2 } from 'lucide-react';
import { getEmbedInfo } from '@/lib/video-emed';
// import { getEmbedInfo } from '@/lib/video-embed';

type Video = {
  _id: string;
  title: string;
  url: string;
  platform: 'youtube' | 'instagram';
  isActive: boolean;
};

export default function ShortsReels() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/videos`)
      .then((res) => res.json())
      .then((json) => {
        const active = (json?.data || []).filter((v: Video) => v.isActive);
        setVideos(active);
      })
      .catch(() => setVideos([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-16 flex justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-saffron-500" />
      </section>
    );
  }

  if (videos.length === 0) return null;

  return (
    <section className="relative bg-ivory py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <span className="font-royal text-xs tracking-royal uppercase text-saffron-500">
            Dekhein
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-ink mt-3">
            Shorts &amp; Reels
          </h2>
        </div>

        {/* Mobile: horizontal snap-scroll · Desktop: grid */}
        <div
          className="
            flex sm:grid gap-4 sm:gap-5
            sm:grid-cols-3 lg:grid-cols-4
            overflow-x-auto sm:overflow-visible
            snap-x snap-mandatory sm:snap-none
            -mx-5 px-5 sm:mx-0 sm:px-0
            scrollbar-hide
          "
        >
          {videos.map((v) => (
            <VideoCard key={v._id} video={v} />
          ))}
        </div>
      </div>
    </section>
  );
}

function VideoCard({ video }: { video: Video }) {
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

  return (
    <div
      ref={ref}
      className="
        shrink-0 snap-start
        w-[68vw] xs:w-[55vw] sm:w-auto
        rounded-2xl overflow-hidden border border-gold-400/25 bg-sand/30
      "
    >
      <div className="flex items-center gap-2 px-3 py-2.5 bg-ink text-ivory">
        {info.platform === 'youtube' ? (
          <Youtube size={14} className="text-red-400 shrink-0" />
        ) : (
          <Instagram size={14} className="text-pink-400 shrink-0" />
        )}
        <p className="font-serif text-xs truncate">{video.title}</p>
      </div>

      <div className="relative w-full aspect-[9/16] bg-black">
        {inView ? (
          <iframe
            src={info.embedUrl}
            title={video.title}
            className="absolute inset-0 w-full h-full"
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
  );
}