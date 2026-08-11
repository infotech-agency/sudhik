import Image from "next/image";
import {
  Droplets,
  Gift,
  Package,
  Sparkles,
  ShieldCheck,
  Leaf,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

/**
 * SHUDDHIK™ — Product page section
 * (header + footer intentionally excluded — drop this between your own)
 *
 * Uses the theme tokens already defined in globals.css:
 * --color-maroon-*, --color-saffron-*, --color-gold-*, --color-ivory*, --color-ink*
 * .text-gold-gradient / .text-saffron-gradient / .glass-ivory / .glass-dark
 * .shadow-premium / .shadow-gold / .shadow-glow / .lift / .gold-divider
 *
 * Fonts: 'Cinzel' (font-royal) for display, 'Mukta' for body — both loaded globally.
 *
 * Drop your real bottle shot at /public/images/shuddhik-bottle.png
 * (falls back gracefully if you swap the src).
 */

const PRODUCT_FEATURES = [
  "Natural sandalwood fragrance",
  "pH-balanced — safe for hands and idols",
  "Marble, tiles, granite & wood — including statues and altars",
  "Biodegradable formula",
  "Proudly Made in India",
];

const PRODUCT_DETAILS = [
  { label: "Product Name", value: "SHUDDHIK™ Temple & Sacred Surface Cleaner" },
  { label: "Volume", value: "500 ml (spray bottle)" },
  { label: "Fragrance", value: "Pure Sandalwood" },
  { label: "Suitable Surfaces", value: "Marble, tiles, granite, wood — statues and puja altars" },
  { label: "Formula", value: "pH-balanced, biodegradable" },
  { label: "Manufactured", value: "Made in India 🇮🇳" },
];

const PACKS = [
  {
    icon: Droplets,
    title: "Single Pack",
    subtitle: "500 ml × 1",
    note: "Perfect for your home altar",
    cta: "Buy Now",
    highlight: false,
  },
  {
    icon: Gift,
    title: "Seva Pack",
    subtitle: "500 ml × 3",
    note: "For temples and gifting",
    cta: "Buy Now",
    highlight: true,
  },
  {
    icon: Package,
    title: "Bulk / Wholesale",
    subtitle: "For temple trusts, retailers & distributors",
    note: "Contact us for special pricing",
    cta: "Contact Us",
    highlight: false,
  },
];

export default function ProductSection() {
  return (
    <>
      {/* ───────────────────────── Hero / breadcrumb band ───────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[rgb(var(--color-maroon-950))] via-[rgb(var(--color-maroon-800))] to-[rgb(var(--color-maroon-950))] py-24 text-center">
        {/* faint mandala backdrop */}
        <svg
          className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] opacity-[0.06]"
          viewBox="0 0 200 200"
          fill="none"
        >
          <circle cx="100" cy="100" r="98" stroke="url(#g1)" strokeWidth="1" />
          <circle cx="100" cy="100" r="76" stroke="url(#g1)" strokeWidth="1" />
          <circle cx="100" cy="100" r="54" stroke="url(#g1)" strokeWidth="1" />
          {Array.from({ length: 16 }).map((_, i) => (
            <line
              key={i}
              x1="100"
              y1="2"
              x2="100"
              y2="20"
              stroke="url(#g1)"
              strokeWidth="1"
              transform={`rotate(${i * 22.5} 100 100)`}
            />
          ))}
          <defs>
            <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#F7ECC2" />
            </linearGradient>
          </defs>
        </svg>

        <p className="mb-3 text-xs tracking-[0.35em] text-[rgb(var(--color-gold-400))]">
          PURITY THAT SHINES
        </p>
        <h1 className="font-royal text-gold-gradient text-5xl sm:text-6xl">Products</h1>
        <p className="mx-auto mt-5 max-w-xl px-6 text-[15px] leading-relaxed text-[rgb(var(--color-gold-200))]/90">
          SHUDDHIK™ Temple &amp; Sacred Surface Cleaner — a specially crafted
          cleaner made for sacred spaces.
        </p>

        <div className="mt-8 flex items-center justify-center gap-4 text-[rgb(var(--color-gold-400))]">
          <Sparkles className="h-4 w-4" />
          <span className="gold-divider h-px w-16" />
          <Sparkles className="h-4 w-4" />
        </div>
      </section>

      {/* ───────────────────────── Product showcase ───────────────────────── */}
      <section className="bg-[rgb(var(--color-ivory))] px-6 py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
          {/* Image */}
          <div className="lift shadow-premium relative overflow-hidden rounded-2xl border border-[rgba(212,175,55,0.28)]">
            <Image
              src="/product/poster.jpg"
              alt="SHUDDHIK Temple & Sacred Surface Cleaner, 500ml spray bottle"
              width={900}
              height={1080}
              className="h-full w-full object-cover"
              priority
            />
          </div>

          {/* Details */}
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-[rgb(var(--color-saffron-600))]">
              TEMPLE &amp; SACRED SURFACE CLEANER
            </p>
            <h2 className="font-royal mt-2 text-4xl text-[rgb(var(--color-maroon-800))] sm:text-5xl">
              SHUDDHIK™
            </h2>
            <div className="gold-divider mt-5 h-px w-24" />

            <p className="mt-6 text-[15px] leading-relaxed text-[rgb(var(--color-ink-soft))]">
              Gently lifts away oil-lamp soot, incense residue and everyday
              puja stains — leaving behind nothing but the pure scent of
              sandalwood.
            </p>

            <ul className="mt-6 space-y-3">
              {PRODUCT_FEATURES.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[rgba(212,175,55,0.18)]">
                    <ShieldCheck className="h-3.5 w-3.5 text-[rgb(var(--color-gold-500))]" />
                  </span>
                  <span className="text-[15px] text-[rgb(var(--color-ink-soft))]">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <p className="text-saffron-gradient font-royal text-3xl">
                ₹___ <span className="text-base text-[rgb(var(--color-ink-soft))]">/ 500 ml</span>
              </p>
              <Link href="/products" className="shadow-gold group inline-flex items-center gap-2 rounded-full bg-[rgb(var(--color-saffron-500))] px-7 py-3 text-sm font-semibold text-[rgb(var(--color-ivory))] transition hover:bg-[rgb(var(--color-saffron-600))]">
                Buy Now
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            </div>
            <p className="mt-3 text-xs text-[rgb(var(--color-ink-soft))]/70">
              * Update pricing here. Amazon/Flipkart links can also be added.
            </p>
          </div>
        </div>
      </section>

      {/* ───────────────────────── Product description table ───────────────────────── */}
      <section className="bg-[rgb(var(--color-ivory-dim))] px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-royal text-3xl text-[rgb(var(--color-maroon-800))] sm:text-4xl">
            Product Details
          </h2>
          <div className="gold-divider mx-auto mt-4 h-px w-28" />
        </div>

        <div className="shadow-premium mx-auto mt-12 max-w-4xl overflow-hidden rounded-2xl border border-[rgba(212,175,55,0.25)]">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-[rgb(var(--color-maroon-800))] text-[rgb(var(--color-gold-200))]">
                <th className="w-1/3 px-6 py-4 font-semibold">Attribute</th>
                <th className="px-6 py-4 font-semibold">Details</th>
              </tr>
            </thead>
            <tbody>
              {PRODUCT_DETAILS.map((row, i) => (
                <tr
                  key={row.label}
                  className={i % 2 === 0 ? "bg-[rgb(var(--color-ivory))]" : "bg-[rgb(var(--color-ivory-dim))]"}
                >
                  <td className="px-6 py-4 font-semibold text-[rgb(var(--color-maroon-600))]">
                    {row.label}
                  </td>
                  <td className="px-6 py-4 text-[rgb(var(--color-ink-soft))]">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ───────────────────────── Pack options ───────────────────────── */}
      <section className="bg-[rgb(var(--color-ivory))] px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-royal text-3xl text-[rgb(var(--color-maroon-800))] sm:text-4xl">
            Pack Options
          </h2>
          <div className="gold-divider mx-auto mt-4 h-px w-28" />
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-3">
          {PACKS.map(({ icon: Icon, title, subtitle, note, cta, highlight }) => (
            <div
              key={title}
              className={`lift flex flex-col items-center rounded-2xl border px-6 py-10 text-center ${
                highlight
                  ? "shadow-glow border-[rgb(var(--color-gold-400))] bg-[rgb(var(--color-ivory))]"
                  : "shadow-premium border-[rgba(212,175,55,0.25)] bg-[rgb(var(--color-ivory))]"
              }`}
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(212,175,55,0.16)]">
                <Icon className="h-6 w-6 text-[rgb(var(--color-maroon-600))]" />
              </span>
              <h3 className="font-royal mt-5 text-xl text-[rgb(var(--color-maroon-800))]">
                {title}
              </h3>
              <p className="mt-1 text-sm font-medium text-[rgb(var(--color-saffron-600))]">
                {subtitle}
              </p>
              <p className="mt-2 text-sm text-[rgb(var(--color-ink-soft))]">{note}</p>
              {/* <button
                className={`mt-6 rounded-full px-6 py-2.5 text-sm font-semibold transition ${
                  highlight
                    ? "shadow-gold bg-[rgb(var(--color-saffron-500))] text-[rgb(var(--color-ivory))] hover:bg-[rgb(var(--color-saffron-600))]"
                    : "bg-[rgb(var(--color-gold-400))] text-[rgb(var(--color-ink))] hover:bg-[rgb(var(--color-gold-500))]"
                }`}
              >
                {cta}
              </button> */}
              <Link href="/products" className="shadow-gold group inline-flex items-center gap-2 rounded-full bg-[rgb(var(--color-saffron-500))] px-7 py-3 text-sm font-semibold text-[rgb(var(--color-ivory))] transition hover:bg-[rgb(var(--color-saffron-600))]">
                Buy Now
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────────────────── Closing CTA banner ───────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[rgb(var(--color-maroon-950))] to-[rgb(var(--color-maroon-800))] px-6 py-20 text-center">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-2 text-[rgb(var(--color-gold-400))]">
          <Leaf className="h-6 w-6" />
        </div>
        <h2 className="font-royal text-gold-gradient mx-auto mt-4 max-w-3xl text-2xl leading-snug sm:text-3xl">
          Ordinary cleaners just clean. SHUDDHIK™ serves.
        </h2>
        <p className="mt-4 text-sm text-[rgb(var(--color-gold-200))]/85">
          Order for your sacred space today.
        </p>
        <Link href="/products" className="shadow-gold group inline-flex items-center gap-2 rounded-full bg-[rgb(var(--color-saffron-500))] px-7 py-3 text-sm font-semibold text-[rgb(var(--color-ivory))] transition hover:bg-[rgb(var(--color-saffron-600))]">
                Buy Now
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
      </section>
    </>
  );
}