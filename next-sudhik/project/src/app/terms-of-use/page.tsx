import React from 'react';

export default function TermsOfUse() {
  return (
    <main className="min-h-screen bg-[rgb(var(--color-ivory))] text-[rgb(var(--color-ink))] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8 mt-20">
        
        {/* Header */}
        <div className="text-center space-y-3 border-b border-[rgba(212,175,55,0.3)] pb-8">
          <h1 className="font-royal text-3xl sm:text-4xl font-bold text-gold-gradient">
            Terms of Use
          </h1>
          <p className="text-[rgb(var(--color-ink-soft))] text-sm sm:text-base">
            OC Build Well Private Ltd. — Official Guidelines
          </p>
        </div>

        {/* Content Section */}
        <div className="glass-ivory p-6 sm:p-10 rounded-2xl shadow-premium space-y-6 text-sm sm:text-base leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-royal text-xl font-bold text-[rgb(var(--color-maroon-800))]">
              1. Agreement to Terms
            </h2>
            <p className="text-[rgb(var(--color-ink-soft))]">
              By accessing and purchasing from this website, you agree to comply with and be bound by these Terms of Use. SHUDDHIK™ is a registered product brand under <strong>OC Build Well Private Ltd.</strong>
            </p>
          </section>

          <div className="w-full h-px gold-divider" />

          <section className="space-y-2">
            <h2 className="font-royal text-xl font-bold text-[rgb(var(--color-maroon-800))]">
              2. Intellectual Property Rights
            </h2>
            <p className="text-[rgb(var(--color-ink-soft))]">
              All content, logos, bottle designs, graphics, and trademarks (including Trademark Application No. 7817516) displayed on this site are the exclusive property of OC Build Well Private Ltd. Unauthorized duplication or distribution is strictly prohibited.
            </p>
          </section>

          <div className="w-full h-px gold-divider" />

          <section className="space-y-2">
            <h2 className="font-royal text-xl font-bold text-[rgb(var(--color-maroon-800))]">
              3. Product Usage Guidelines
            </h2>
            <p className="text-[rgb(var(--color-ink-soft))]">
              SHUDDHIK™ is formulated specifically for temples, marble, granite, and sacred surface care. Customers are advised to strictly follow the recommended directions of use provided on the packaging label.
            </p>
          </section>

          <div className="w-full h-px gold-divider" />

          <section className="space-y-2">
            <h2 className="font-royal text-xl font-bold text-[rgb(var(--color-maroon-800))]">
              4. Pricing & Modifications
            </h2>
            <p className="text-[rgb(var(--color-ink-soft))]">
              Prices for products are subject to change without notice. We reserve the right to modify or discontinue any product or service at any time.
            </p>
          </section>

          <div className="w-full h-px gold-divider" />

          <section className="space-y-2">
            <h2 className="font-royal text-xl font-bold text-[rgb(var(--color-maroon-800))]">
              5. Governing Law
            </h2>
            <p className="text-[rgb(var(--color-ink-soft))]">
              These terms shall be governed by and construed in accordance with the laws of India, and any disputes shall be subject to the exclusive jurisdiction of the courts in Uttar Pradesh, India.
            </p>
          </section>

          <div className="w-full h-px gold-divider" />

          <section className="space-y-2">
            <h2 className="font-royal text-xl font-bold text-[rgb(var(--color-maroon-800))]">
              6. Contact Information
            </h2>
            <div className="p-4 rounded-xl bg-[rgb(var(--color-ivory-dim))] border border-[rgba(212,175,55,0.3)] text-xs sm:text-sm">
              <p><strong>OC Build Well Private Ltd.</strong></p>
              <p>Sector 63, Noida, Uttar Pradesh</p>
              <p>GSTIN: 07AAEC00061J2C</p>
              <p>Email: ocbuildwell@gmail.com</p>
            </div>
          </section>
        </div>

      </div>
    </main>
  );
}