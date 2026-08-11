import {
  SprayCan,
  Droplets,
  Timer,
  Sparkles as SparkleWipe,
  Sparkles,
  Check,
  X,
} from "lucide-react";
import Image from "next/image";

/**
 * SHUDDHIK™ — "How to Use" page section
 * (header + footer intentionally excluded — drop this between your own)
 *
 * Uses the theme tokens already defined in globals.css:
 * --color-maroon-*, --color-saffron-*, --color-gold-*, --color-ivory*, --color-ink*
 * .text-gold-gradient / .shadow-premium / .shadow-gold / .lift / .gold-divider
 *
 * Fonts: 'Cinzel' (font-royal) for display, 'Mukta' for body — both loaded globally.
 *
 * Adds two subtle animated SVG background layers:
 * 1) A slow-rotating mandala watermark in the hero (pure CSS animation).
 * 2) Drifting ember/gold-dust particles across the hero for warmth + depth.
 * Both respect prefers-reduced-motion.
 */

const STEPS = [
  {
    icon: SprayCan,
    step: "Step 1",
    title: "Shake the Bottle Well",
    body: "Shake 3–4 times before use so the formula mixes evenly.",
  },
  {
    icon: Droplets,
    step: "Step 2",
    title: "Spray the Surface",
    body: "Hold about 15–20 cm away and spray directly on the stain or full surface. For statues: spray onto a soft cloth first, then wipe — never spray directly.",
  },
  {
    icon: Timer,
    step: "Step 3",
    title: "Wait 30–60 Seconds",
    body: "Let the formula break down oil and soot. For stubborn stains, wait up to 60 seconds.",
  },
  {
    icon: SparkleWipe,
    step: "Step 4",
    title: "Wipe with a Soft Cloth",
    body: "Gently wipe with a microfiber or soft cotton cloth. No scrubbing needed.",
  },
  {
    icon: Sparkles,
    step: "Step 5",
    title: "Clean & Sacred",
    body: "Your sacred space is now clean — and fragrant with pure sandalwood.",
  },
];

const DOS = [
  "Use on marble, granite, tiles, wood and glass",
  "Use 2–3 times a week for regular cleaning",
  "Use only soft / microfiber cloths",
  "Store in a cool, dry place",
];

const DONTS = [
  "Don't use on antique/fragile idols without a patch test",
  "Don't leave open near food items",
  "Keep out of reach of children",
  "Don't mix with other cleaners",
];

const WHERE_TO_USE = [
  { emoji: "🏠", label: "Home altar surfaces and shelves" },
  { emoji: "🛕", label: "Temple floors, steps and pillars" },
  { emoji: "🪔", label: "Around diya placements and the aarti thali" },
  { emoji: "🚪", label: "Temple doors and wooden lattice work" },
  { emoji: "🏨", label: "Hotel/resort prayer areas" },
];

export default function HowToUseSection() {
  return (
    <>
      {/* ───────────────────────── Hero band (with animated SVG bg) ───────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[rgb(var(--color-maroon-950))] via-[rgb(var(--color-maroon-800))] to-[rgb(var(--color-maroon-950))] py-24 text-center">
        {/* Slow-rotating mandala watermark */}
        <svg
          className="pointer-events-none absolute -right-32 -top-32 h-[460px] w-[460px] opacity-[0.07] motion-safe:animate-[spin_60s_linear_infinite]"
          viewBox="0 0 200 200"
          fill="none"
        >
          <circle cx="100" cy="100" r="98" stroke="url(#mandala)" strokeWidth="1" />
          <circle cx="100" cy="100" r="76" stroke="url(#mandala)" strokeWidth="1" />
          <circle cx="100" cy="100" r="54" stroke="url(#mandala)" strokeWidth="1" />
          {Array.from({ length: 16 }).map((_, i) => (
            <line
              key={i}
              x1="100"
              y1="2"
              x2="100"
              y2="20"
              stroke="url(#mandala)"
              strokeWidth="1"
              transform={`rotate(${i * 22.5} 100 100)`}
            />
          ))}
          <defs>
            <linearGradient id="mandala" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#F7ECC2" />
            </linearGradient>
          </defs>
        </svg>

        {/* Counter-rotating second mandala, lower-left, for depth */}
        <svg
          className="pointer-events-none absolute -bottom-40 -left-32 h-[380px] w-[380px] opacity-[0.05] motion-safe:animate-[spin_80s_linear_infinite_reverse]"
          viewBox="0 0 200 200"
          fill="none"
        >
          <circle cx="100" cy="100" r="90" stroke="url(#mandala2)" strokeWidth="1" />
          <circle cx="100" cy="100" r="64" stroke="url(#mandala2)" strokeWidth="1" />
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={i}
              x1="100"
              y1="10"
              x2="100"
              y2="26"
              stroke="url(#mandala2)"
              strokeWidth="1"
              transform={`rotate(${i * 30} 100 100)`}
            />
          ))}
          <defs>
            <linearGradient id="mandala2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#C97A1A" />
              <stop offset="100%" stopColor="#D4AF37" />
            </linearGradient>
          </defs>
        </svg>

        {/* Drifting gold-dust / ember particles */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
          viewBox="0 0 1280 400"
          preserveAspectRatio="xMidYMid slice"
        >
          {[
            { cx: 120, cy: 340, r: 2.4, dur: "9s", delay: "0s" },
            { cx: 260, cy: 120, r: 1.6, dur: "12s", delay: "1.2s" },
            { cx: 420, cy: 300, r: 2, dur: "10s", delay: "2.4s" },
            { cx: 560, cy: 80, r: 1.4, dur: "14s", delay: "0.6s" },
            { cx: 700, cy: 260, r: 2.2, dur: "11s", delay: "3s" },
            { cx: 840, cy: 140, r: 1.8, dur: "9.5s", delay: "1.8s" },
            { cx: 980, cy: 320, r: 2.4, dur: "13s", delay: "0.3s" },
            { cx: 1120, cy: 100, r: 1.6, dur: "10.5s", delay: "2.1s" },
            { cx: 1200, cy: 260, r: 2, dur: "12.5s", delay: "1s" },
          ].map((p, i) => (
            <circle
              key={i}
              cx={p.cx}
              cy={p.cy}
              r={p.r}
              fill="#F7ECC2"
              className="motion-safe:animate-[ember-float_var(--dur)_ease-in-out_infinite]"
              style={{
                // @ts-ignore custom property for animation-duration/delay
                "--dur": p.dur,
                animationDelay: p.delay,
              }}
            />
          ))}
        </svg>

        <style>{`
          @keyframes ember-float {
            0%, 100% { transform: translateY(0px); opacity: 0.25; }
            50% { transform: translateY(-22px); opacity: 0.9; }
          }
        `}</style>

        <div className="relative">
          <p className="mb-3 text-xs tracking-[0.35em] text-[rgb(var(--color-gold-400))]">
            HOW TO USE
          </p>
          <h1 className="font-royal text-gold-gradient text-5xl sm:text-6xl">
            How to Use
          </h1>
          <p className="mx-auto mt-5 max-w-xl px-6 text-[15px] leading-relaxed text-[rgb(var(--color-gold-200))]/90">
            Just 5 easy steps — and your sacred space is clean, pure and
            fragrant.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4 text-[rgb(var(--color-gold-400))]">
            <Sparkles className="h-4 w-4" />
            <span className="gold-divider h-px w-16" />
            <Sparkles className="h-4 w-4" />
          </div>
        </div>
      </section>

      {/* ───────────────────────── Steps ───────────────────────── */}
      <section className="bg-[rgb(var(--color-ivory))] px-6 py-20">
        <div className="mx-auto flex max-w-4xl flex-col gap-6">
          {STEPS.map(({ icon: Icon, step, title, body }) => (
            <div
              key={step}
              className="lift shadow-premium flex items-start gap-6 rounded-2xl border border-[rgba(212,175,55,0.25)] bg-[rgb(var(--color-ivory))] px-8 py-7"
            >
              <span className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-[rgba(212,175,55,0.16)]">
                <Icon className="h-6 w-6 text-[rgb(var(--color-maroon-600))]" />
              </span>
              <div>
                <p className="text-xs font-semibold tracking-[0.25em] text-[rgb(var(--color-saffron-600))]">
                  {step.toUpperCase()}
                </p>
                <h3 className="font-royal mt-1 text-xl text-[rgb(var(--color-maroon-800))]">
                  {title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[rgb(var(--color-ink-soft))]">
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────────────────── Do's & Don'ts ───────────────────────── */}
      <section className="bg-[rgb(var(--color-ivory-dim))] px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-royal text-3xl text-[rgb(var(--color-maroon-800))] sm:text-4xl">
            Do&rsquo;s &amp; Don&rsquo;ts
          </h2>
          <div className="gold-divider mx-auto mt-4 h-px w-28" />
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
          <div className="shadow-premium rounded-2xl border border-[rgba(212,175,55,0.25)] bg-[rgb(var(--color-ivory))] p-8">
            <p className="flex items-center gap-2 font-semibold text-[rgb(var(--color-gold-500))]">
              <Check className="h-5 w-5" /> Do
            </p>
            <ul className="mt-4 space-y-3">
              {DOS.map((item) => (
                <li key={item} className="flex items-start gap-2 text-[15px] text-[rgb(var(--color-ink-soft))]">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[rgb(var(--color-gold-500))]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="shadow-premium rounded-2xl border border-[rgba(212,175,55,0.25)] bg-[rgb(var(--color-ivory))] p-8">
            <p className="flex items-center gap-2 font-semibold text-[rgb(var(--color-maroon-600))]">
              <X className="h-5 w-5" /> Don&rsquo;t
            </p>
            <ul className="mt-4 space-y-3">
              {DONTS.map((item) => (
                <li key={item} className="flex items-start gap-2 text-[15px] text-[rgb(var(--color-ink-soft))]">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[rgb(var(--color-maroon-600))]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ───────────────────────── Where to Use ───────────────────────── */}
      <section className="bg-[rgb(var(--color-ivory))] px-6 py-20">
        <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-royal text-3xl text-[rgb(var(--color-maroon-800))] sm:text-4xl">
              Where to Use
            </h2>
            <div className="gold-divider mt-4 h-px w-28" />
            <p className="mt-6 text-[15px] text-[rgb(var(--color-ink-soft))]">
              SHUDDHIK™ is suited for all of these spaces:
            </p>
            <ul className="mt-4 space-y-3">
              {WHERE_TO_USE.map(({ emoji, label }) => (
                <li key={label} className="flex items-center gap-3 text-[15px] text-[rgb(var(--color-ink-soft))]">
                  <span className="text-lg">{emoji}</span>
                  {label}
                </li>
              ))}
            </ul>
          </div>

          {/* Image placeholder */}
        <div className="shadow-premium relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-[rgb(var(--color-maroon-800))] to-[rgb(var(--color-maroon-950))]">
  <Image
    src="/product/use-case.png"
    alt="SHUDDHIK in use on a temple surface"
    fill
    className="object-cover"
  />
</div>
        </div>
      </section>

      {/* ───────────────────────── Closing CTA banner ───────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[rgb(var(--color-maroon-950))] to-[rgb(var(--color-maroon-800))] px-6 py-20 text-center">
        <h2 className="font-royal text-gold-gradient mx-auto max-w-3xl text-2xl leading-snug sm:text-3xl">
          Now cleaning becomes seva too.
        </h2>
        <p className="mt-4 text-sm text-[rgb(var(--color-gold-200))]/85">
          Get SHUDDHIK™ today and experience purity through devotion.
        </p>
        <button className="shadow-gold mt-8 inline-flex items-center gap-2 rounded-full bg-[rgb(var(--color-saffron-500))] px-8 py-3 text-sm font-semibold text-[rgb(var(--color-ivory))] transition hover:bg-[rgb(var(--color-saffron-600))]">
          Buy Now
        </button>
      </section>
    </>
  );
}