import { Noto_Serif_Devanagari, Mukta } from "next/font/google";

/**
 * Fonts: load here (or move to your layout and pass the CSS variables down).
 * Your globals.css already sets body to 'Mukta', so Mukta is only needed
 * if you haven't loaded it elsewhere.
 */
const devanagariSerif = Noto_Serif_Devanagari({
  subsets: ["devanagari", "latin"],
  weight: ["600", "700"],
  display: "swap",
});
const mukta = Mukta({
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

/* ---------- Icons (stroke = currentColor, so they inherit maroon) ---------- */

const iconProps = {
  viewBox: "0 0 96 80",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  className: "h-16 w-auto sm:h-[72px]",
};

function LotusIcon() {
  return (
    <svg {...iconProps}>
      {/* centre petal */}
      <path d="M48 10c-9 9-13 20-13 30 0 7 5 12 13 12s13-5 13-12c0-10-4-21-13-30Z" />
      <path d="M48 24c-3 6-4 12-4 18" />
      <path d="M48 24c3 6 4 12 4 18" />
      {/* inner side petals */}
      <path d="M35 34c-8-3-17-1-24 6 4 12 14 19 28 19" />
      <path d="M61 34c8-3 17-1 24 6-4 12-14 19-28 19" />
      {/* outer side petals */}
      <path d="M26 46c-8 1-14 5-18 11 8 6 18 8 28 5" />
      <path d="M70 46c8 1 14 5 18 11-8 6-18 8-28 5" />
      {/* base */}
      <path d="M30 66c12 6 24 6 36 0" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg {...iconProps}>
      <path d="M8 40 48 8l40 32" />
      <path d="M18 34v38h60V34" />
      <path d="M40 72V50h16v22" />
      <path d="M70 20V10h8v16" />
    </svg>
  );
}

function TempleIcon() {
  return (
    <svg {...iconProps}>
      {/* spire */}
      <path d="M48 4v10" />
      <path d="M44 8h8" />
      {/* dome */}
      <path d="M34 36c0-12 6-20 14-22 8 2 14 10 14 22" />
      <path d="M30 36h36" />
      {/* side towers */}
      <path d="M18 36c0-6 3-9 6-10 3 1 6 4 6 10" />
      <path d="M66 36c0-6 3-9 6-10 3 1 6 4 6 10" />
      {/* body */}
      <path d="M14 36h68v36H14Z" />
      {/* central arch door */}
      <path d="M40 72V54c0-6 3-9 8-9s8 3 8 9v18" />
      {/* side arches */}
      <path d="M20 72V58c0-4 2-6 5-6s5 2 5 6v14" />
      <path d="M66 72V58c0-4 2-6 5-6s5 2 5 6v14" />
      {/* plinth */}
      <path d="M8 72h80" />
    </svg>
  );
}

/* ---------- Ornamental divider ---------- */

function Ornament() {
  return (
    <div className="mx-auto flex w-full max-w-[420px] items-center gap-3" aria-hidden>
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[rgb(var(--color-gold-400))]" />
      <svg viewBox="0 0 40 20" className="h-5 w-10 text-[rgb(var(--color-gold-500))]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <path d="M20 2 26 10 20 18 14 10Z" />
        <path d="M14 10C9 10 6 7 2 10c4 3 7 0 12 0Z" />
        <path d="M26 10c5 0 8-3 12 0-4 3-7 0-12 0Z" />
        <circle cx="20" cy="10" r="1.6" fill="currentColor" />
      </svg>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[rgb(var(--color-gold-400))]" />
    </div>
  );
}

/* ---------- Data ---------- */

const pillars = [
  { icon: <LotusIcon />, hi: "शुद्ध सुगंध", en: "Pure Fragrance" },
  { icon: <HomeIcon />, hi: "शुद्ध घर", en: "Pure Home" },
  { icon: <TempleIcon />, hi: "शुद्ध भावना", en: "Pure Living" },
];

/* ---------- Component ---------- */

export default function PurityPromise() {
  return (
    <section
      className={`${mukta.className} relative overflow-hidden px-5 py-14 sm:py-20`}
      style={{
        background:
          "radial-gradient(120% 90% at 50% 0%, rgb(var(--color-ivory)) 0%, rgb(var(--color-ivory-dim)) 55%, #F1DFC0 100%)",
      }}
      aria-labelledby="purity-heading"
    >
      <div className="mx-auto max-w-4xl text-center">
        {/* Hindi headline */}
        <h2
          id="purity-heading"
          className={`${devanagariSerif.className} text-balance text-[1.7rem] font-bold leading-[1.45] text-[rgb(var(--color-maroon-800))] sm:text-4xl sm:leading-[1.5]`}
        >
          शुद्धता केवल सफाई नहीं,
          <br />
          यह हमारे रहने की जगहों की देखभाल है।
        </h2>

        {/* English subline */}
        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-[rgb(var(--color-ink-soft))] sm:text-lg">
          Purity is more than clean.
          <br className="hidden sm:block" /> It is how we care for the spaces we live in.
        </p>

        <div className="mt-8 sm:mt-10">
          <Ornament />
        </div>

        {/* Three pillars */}
        <ul className="mt-10 grid grid-cols-3 sm:mt-12">
          {pillars.map((p, i) => (
            <li
              key={p.en}
              className={`flex flex-col items-center px-2 sm:px-6 ${
                i > 0 ? "border-l border-[rgb(var(--color-gold-400)/0.6)]" : ""
              }`}
            >
              <span className="text-[rgb(var(--color-maroon-600))]">{p.icon}</span>

              <span
                className={`${devanagariSerif.className} mt-4 text-lg font-semibold leading-tight text-[rgb(var(--color-maroon-800))] sm:text-2xl`}
              >
                {p.hi}
              </span>

              <span className="mt-1.5 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-[rgb(var(--color-maroon-800))] sm:text-sm">
                {p.en}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}