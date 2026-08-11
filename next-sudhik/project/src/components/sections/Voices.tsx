'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import Stars from '@/components/ui/Stars';
import { reviews } from '@/data/reviews';

import 'swiper/css';
import 'swiper/css/pagination';

export default function Voices() {
  return (
    <section className="relative py-24 sm:py-32 bg-ivory overflow-hidden">
      <div className="absolute inset-0 bg-gold-radial opacity-40 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Voices of Devotion"
          hindiTitle="भक्ति स्वर"
          title={
            <>
              Whispers from the <span className="text-saffron-gradient">Parivaar</span>
            </>
          }
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16"
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{ delay: 4200, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="!pb-14"
          >
            {reviews.map((r) => (
              <SwiperSlide key={r.id} className="h-auto">
                <div className="h-full p-7 rounded-3xl bg-white border border-gold-400/20 shadow-premium flex flex-col">
                  <span className="font-deva text-3xl text-saffron-500/30 leading-none">"</span>
                  <p className="font-serif text-lg text-black leading-relaxed flex-1 -mt-3">
                    {r.body}
                  </p>
                  <div className="flex items-center gap-3 mt-6 pt-5 border-t border-gold-400/10">
                    <img
                      src={r.avatar}
                      alt={r.name}
                      className="w-10 h-10 rounded-full object-cover border border-gold-400/40"
                    />
                    <div>
                      <p className="font-display text-base text-ink leading-tight">{r.name}</p>
                      <Stars rating={r.rating} size={11} className="mt-0.5" />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
