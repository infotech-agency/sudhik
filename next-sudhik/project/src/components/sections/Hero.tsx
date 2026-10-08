"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";
import ProductImage from "@/components/ui/ProductImage";
import { productInfo } from "@/data/product";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function Hero() {
   const [productSlug, setProductSlug] = useState("");

  useEffect(() => {
    api.get("/api/products")
      .then((products: any) => {
        if (Array.isArray(products) && products.length > 0) {
          setProductSlug(products[0].slug || products[0]._id);
        }
      })
      .catch(() => {});
  }, []);
  return (
    <section 
      className="relative min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden bg-cover bg-center bg-no-repeat pt-16 sm:pt-20"
      style={{
        backgroundImage: "url('/backgrounds/bannersoft.webp')",
      }}
    >
      {/* Full-width grid – no overlay filters */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 w-full lg:min-h-screen">
        
        {/* Left – Text content */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center p-6 sm:p-8 lg:p-12 xl:p-16"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-deva text-lg sm:text-xl md:text-2xl text-white mb-2 sm:mb-3"
          >
            {productInfo.taglineHindi}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] leading-[1.05] sm:leading-[0.95] text-white"
          >
            {productInfo.name.replace("™", "")}
            <sup className="font-royal text-base sm:text-lg md:text-2xl align-super text-gold-400">™</sup>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-sans text-xs sm:text-sm md:text-base font-semibold tracking-royal uppercase text-white/90 mt-3 sm:mt-4"
          >
            {productInfo.subtitle}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-sans text-base sm:text-lg md:text-xl text-white leading-relaxed mt-4 sm:mt-6 max-w-xl"
          >
            A sacred surface cleaner born of devotion. It lifts dhoop and diya
            soot with the calm of chandan — and leaves your mandir as pure as
            your prayer.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mt-6 sm:mt-9"
          >
            <Link href={`/products/${productSlug}`} className="w-full sm:w-auto">
              <Button size="sm" className="lg:hidden w-full sm:w-auto">
                Buy Now
              </Button>
              <Button size="lg" variant="primary" className="hidden lg:inline-flex w-full sm:w-auto">
                Buy Now
              </Button>
            </Link>
            <Link href="/products" className="w-full sm:w-auto">
              <Button size="sm" className="lg:hidden w-full sm:w-auto">
                All Products
              </Button>
              <Button size="lg" variant="primary" className="hidden lg:inline-flex w-full sm:w-auto">
                All Products
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right – Product image */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center p-2 sm:p-6 md:p-8 lg:p-12 xl:p-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-[160px] xs:w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] xl:w-[380px]"
          >
            <ProductImage 
              className="w-full h-[220px] xs:h-[280px] sm:h-[350px] md:h-[420px] lg:h-[480px] xl:h-[560px]" 
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}