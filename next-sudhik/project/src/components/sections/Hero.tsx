// "use client";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import Button from "@/components/ui/Button";
// import ProductImage from "@/components/ui/ProductImage";
// import { productInfo } from "@/data/product";
// import { useEffect, useState } from "react";
// import { api } from "@/lib/api";

// export default function Hero() {
//    const [productSlug, setProductSlug] = useState("");

//   useEffect(() => {
//     api.get("/api/products")
//       .then((products: any) => {
//         if (Array.isArray(products) && products.length > 0) {
//           setProductSlug(products[0].slug || products[0]._id);
//         }
//       })
//       .catch(() => {});
//   }, []);
//   return (
//     <section 
//       className="relative min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden bg-cover bg-center bg-no-repeat pt-16 sm:pt-20"
//       style={{
//         backgroundImage: "url('/backgrounds/bannersoft.webp')",
//       }}
//     >
//       {/* Full-width grid – no overlay filters */}
//       <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 w-full lg:min-h-screen">
        
//         {/* Left – Text content */}
//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//           className="flex flex-col justify-center p-6 sm:p-8 lg:p-12 xl:p-16"
//         >
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.1 }}
//             className="font-deva text-lg sm:text-xl md:text-2xl text-white mb-2 sm:mb-3"
//           >
//             {productInfo.taglineHindi}
//           </motion.p>

//           <motion.h1
//             initial={{ opacity: 0, y: 24 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
//             className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] leading-[1.05] sm:leading-[0.95] text-white"
//           >
//             {productInfo.name.replace("™", "")}
//             <sup className="font-royal text-base sm:text-lg md:text-2xl align-super text-gold-400">™</sup>
//           </motion.h1>

//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.3 }}
//             className="font-sans text-xs sm:text-sm md:text-base font-semibold tracking-royal uppercase text-white/90 mt-3 sm:mt-4"
//           >
//             {productInfo.subtitle}
//           </motion.p>

//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//             className="font-sans text-base sm:text-lg md:text-xl text-white leading-relaxed mt-4 sm:mt-6 max-w-xl"
//           >
//             A sacred surface cleaner born of devotion. It lifts dhoop and diya
//             soot with the calm of chandan — and leaves your mandir as pure as
//             your prayer.
//           </motion.p>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.6 }}
//             className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mt-6 sm:mt-9"
//           >
//             <Link href={`/products/${productSlug}`} className="w-full sm:w-auto">
//               <Button size="sm" className="lg:hidden w-full sm:w-auto">
//                 Buy Now
//               </Button>
//               <Button size="lg" variant="primary" className="hidden lg:inline-flex w-full sm:w-auto">
//                 Buy Now
//               </Button>
//             </Link>
//             <Link href="/products" className="w-full sm:w-auto">
//               <Button size="sm" className="lg:hidden w-full sm:w-auto">
//                 All Products
//               </Button>
//               <Button size="lg" variant="primary" className="hidden lg:inline-flex w-full sm:w-auto">
//                 All Products
//               </Button>
//             </Link>
//           </motion.div>
//         </motion.div>

//         {/* Right – Product image */}
//         <motion.div
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//           className="flex items-center justify-center p-2 sm:p-6 md:p-8 lg:p-12 xl:p-16"
//         >
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9, y: 30 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
//             className="relative w-[160px] xs:w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] xl:w-[380px]"
//           >
//             <ProductImage 
//               className="w-full h-[220px] xs:h-[280px] sm:h-[350px] md:h-[420px] lg:h-[480px] xl:h-[560px]" 
//             />
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";
import ProductImage from "@/components/ui/ProductImage";
import { productInfo } from "@/data/product";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

/* ------------------------------------------------------------------ */
/*  Falling petals & blossoms                                          */
/*                                                                     */
/*  Why this is faster than before:                                    */
/*   1. Petals are generated at module level with a SEEDED random, so  */
/*      server and client get identical values -> they are in the      */
/*      server HTML and visible on first paint (no waiting for JS).    */
/*   2. Pure CSS keyframes instead of 28 framer-motion components:     */
/*      runs on the GPU, no JS per frame.                              */
/*   3. Negative animation-delay: every petal starts already "mid-fall" */
/*      so the screen is full immediately instead of filling up slowly */
/* ------------------------------------------------------------------ */

type Petal = {
  id: number;
  kind: "petal" | "blossom";
  color: string;
  left: number; // % from left
  size: number; // px
  duration: number; // seconds for one full fall
  delay: number; // seconds, NEGATIVE = already in flight at load
  sway: number; // px, horizontal drift
  spin: number; // degrees of rotation during the fall
  blur: number; // px – near petals are softer
  layer: "back" | "front";
};

// Marigold, rose, saffron, jasmine – the flowers you'd actually offer in a mandir
const COLORS = ["#F5A623", "#FFB627", "#E8618C", "#F28BA8", "#FF8A3D", "#FFF4E0"];

const PETAL_COUNT = 28;
const MOBILE_COUNT = 14; // petals with id >= this are hidden below the sm breakpoint

// tiny seeded PRNG – same sequence on server and client
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makePetals(count: number): Petal[] {
  const rnd = mulberry32(108);
  const between = (min: number, max: number) => Math.round((rnd() * (max - min) + min) * 10) / 10;

  return Array.from({ length: count }, (_, i) => {
    const layer: Petal["layer"] = rnd() > 0.7 ? "front" : "back";
    const duration = layer === "front" ? between(9, 13) : between(12, 20);
    return {
      id: i,
      kind: rnd() > 0.65 ? "blossom" : "petal",
      color: COLORS[Math.floor(rnd() * COLORS.length)],
      left: between(0, 100),
      size: layer === "front" ? between(26, 40) : between(12, 26),
      duration,
      delay: -between(0, duration), // start somewhere along the path, not at the top
      sway: between(30, 90) * (rnd() > 0.5 ? 1 : -1),
      spin: between(180, 540) * (rnd() > 0.5 ? 1 : -1),
      blur: layer === "front" ? 1.5 : 0,
      layer,
    };
  });
}

const PETALS = makePetals(PETAL_COUNT);

const PETAL_CSS = `
@keyframes petal-fall {
  0%   { transform: translate3d(0, -15vh, 0) rotate(0deg) rotateX(0deg); opacity: 0; }
  8%   { opacity: 1; }
  25%  { transform: translate3d(var(--sway), 22vh, 0) rotate(calc(var(--spin) * 0.25)) rotateX(180deg); }
  50%  { transform: translate3d(calc(var(--sway) * -0.6), 48vh, 0) rotate(calc(var(--spin) * 0.5)) rotateX(0deg); }
  75%  { transform: translate3d(calc(var(--sway) * 0.4), 78vh, 0) rotate(calc(var(--spin) * 0.75)) rotateX(180deg); }
  92%  { opacity: 1; }
  100% { transform: translate3d(0, 110vh, 0) rotate(var(--spin)) rotateX(0deg); opacity: 0; }
}
@keyframes petal-layer-in { from { opacity: 0; } to { opacity: 1; } }
.petal-layer { animation: petal-layer-in 0.9s ease-out both; }
.petal {
  animation-name: petal-fall;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  will-change: transform, opacity;
}
@media (prefers-reduced-motion: reduce) {
  .petal-layer { display: none; }
}
`;

function PetalShape({ kind, color }: { kind: Petal["kind"]; color: string }) {
  if (kind === "blossom") {
    return (
      <svg viewBox="-30 -30 60 60" className="w-full h-full">
        {[0, 72, 144, 216, 288].map((deg) => (
          <ellipse
            key={deg}
            cx="0"
            cy="-12"
            rx="9"
            ry="15"
            fill={color}
            opacity="0.92"
            transform={`rotate(${deg})`}
          />
        ))}
        <circle r="5" fill="#C2410C" opacity="0.85" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 40 60" className="w-full h-full">
      <path d="M20 2 C34 14 38 38 20 58 C2 38 6 14 20 2Z" fill={color} opacity="0.92" />
      <path d="M20 8 L20 50" stroke="#fff" strokeOpacity="0.35" strokeWidth="1.2" />
    </svg>
  );
}

function PetalFall({ layer }: { layer: "back" | "front" }) {
  return (
    <div
      aria-hidden
      className={`petal-layer pointer-events-none absolute inset-0 overflow-hidden ${
        layer === "front" ? "z-20" : "z-[5]"
      }`}
    >
      {PETALS.filter((p) => p.layer === layer).map((p) => (
        <div
          key={p.id}
          className={`petal absolute top-0 ${p.id >= MOBILE_COUNT ? "hidden sm:block" : ""}`}
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.kind === "blossom" ? p.size : p.size * 1.5,
              filter: p.blur ? `blur(${p.blur}px)` : undefined,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              "--sway": `${p.sway}px`,
              "--spin": `${p.spin}deg`,
            } as React.CSSProperties
          }
        >
          <PetalShape kind={p.kind} color={p.color} />
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

export default function Hero() {
  // Default to the known product slug so "Buy Now" works instantly,
  // instead of pointing at "/products/" until the API answers.
  const [productSlug, setProductSlug] = useState("shuddhik-temple-sacred-surface-cleaner");

  useEffect(() => {
    api
      .get("/api/products")
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
      style={{ backgroundImage: "url('/backgrounds/bannersoft.webp')" }}
    >
      <style dangerouslySetInnerHTML={{ __html: PETAL_CSS }} />

      {/* Petals drifting behind the content */}
      <PetalFall layer="back" />

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
            className="font-deva text-lg sm:text-xl md:text-2xl text-white mb-2 sm:mb-3 drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]"
          >
            {productInfo.taglineHindi}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] leading-[1.05] sm:leading-[0.95] text-white drop-shadow-[0_4px_14px_rgba(0,0,0,0.35)]"
          >
            {productInfo.name.replace("™", "")}
            <sup className="font-royal text-base sm:text-lg md:text-2xl align-super text-gold-400">
              ™
            </sup>
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
            className="font-sans text-base sm:text-lg md:text-xl text-white leading-relaxed mt-4 sm:mt-6 max-w-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
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

        {/* Right – Product image with a warm diya glow */}
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
            {/* soft golden halo, like lamp light on the bottle */}
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[170%] h-[130%] rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(255,196,87,0.55), rgba(255,160,60,0.18) 60%, transparent 100%)",
              }}
            />
            <ProductImage className="relative w-full h-[220px] xs:h-[280px] sm:h-[350px] md:h-[420px] lg:h-[480px] xl:h-[560px]" />
          </motion.div>
        </motion.div>
      </div>

      {/* A few larger petals passing in front for depth */}
      <PetalFall layer="front" />
    </section>
  );
}