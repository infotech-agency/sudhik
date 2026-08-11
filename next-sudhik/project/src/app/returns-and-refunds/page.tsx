import React from 'react';

export default function ReturnsRefunds() {
  return (
    <main className="min-h-screen bg-[rgb(var(--color-ivory))] mt-50 text-[rgb(var(--color-ink))] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8 mt-20">
        
        {/* Header */}
        <div className="text-center space-y-3 border-b border-[rgba(212,175,55,0.3)] pb-8">
          <h1 className="font-royal text-3xl sm:text-4xl font-bold text-gold-gradient">
            Returns & Refunds Policy
          </h1>
          <p className="text-[rgb(var(--color-ink-soft))] text-sm sm:text-base">
            SHUDDHIK™ — Built on Trust and Reverence
          </p>
        </div>

        {/* Content Section */}
        <div className="glass-ivory p-6 sm:p-10 rounded-2xl shadow-premium space-y-6 text-sm sm:text-base leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-royal text-xl font-bold text-[rgb(var(--color-maroon-800))]">
              1. Policy Overview
            </h2>
            <p className="text-[rgb(var(--color-ink-soft))]">
              Due to the nature of our product (temple and sacred surface cleaner), we accept returns or replacements <strong>only in cases of damaged, defective, or incorrect items delivered.</strong>
            </p>
          </section>

          <div className="w-full h-px gold-divider" />

          <section className="space-y-2">
            <h2 className="font-royal text-xl font-bold text-[rgb(var(--color-maroon-800))]">
              2. Eligibility for Return / Replacement
            </h2>
            <p className="text-[rgb(var(--color-ink-soft))]">
              To be eligible for a replacement or refund:
            </p>
            <ul className="list-disc list-inside space-y-1 text-[rgb(var(--color-ink-soft))] pl-2">
              <li>You must intimate us within <strong>48 hours</strong> of package delivery.</li>
              <li>The bottle/packaging must be unused with the seal intact (unless damaged during transit).</li>
              <li>An unboxing video or photograph clearly showing the damaged/defective product is mandatory.</li>
            </ul>
          </section>

          <div className="w-full h-px gold-divider" />

          <section className="space-y-2">
            <h2 className="font-royal text-xl font-bold text-[rgb(var(--color-maroon-800))]">
              3. Refund Process
            </h2>
            <p className="text-[rgb(var(--color-ink-soft))]">
              Once your request is approved and verified, refunds will be initiated to your original payment mode (or bank account for COD) within <strong>5–7 working days</strong>.
            </p>
          </section>

          <div className="w-full h-px gold-divider" />

          <section className="space-y-2">
            <h2 className="font-royal text-xl font-bold text-[rgb(var(--color-maroon-800))]">
              4. Non-Returnable Items
            </h2>
            <p className="text-[rgb(var(--color-ink-soft))]">
              Products that have been unsealed, used, or damaged due to improper storage after delivery cannot be returned or refunded.
            </p>
          </section>

          <div className="w-full h-px gold-divider" />

          <section className="space-y-2">
            <h2 className="font-royal text-xl font-bold text-[rgb(var(--color-maroon-800))]">
              5. How to Initiate a Claim
            </h2>
            <p className="text-[rgb(var(--color-ink-soft))]">
              Send your order ID along with unboxing proof to:
            </p>
            <div className="p-4 rounded-xl bg-[rgb(var(--color-ivory-dim))] border border-[rgba(212,175,55,0.3)] text-xs sm:text-sm">
              <p><strong>WhatsApp:</strong> +91 72900 61140</p>
              <p><strong>Email:</strong> ocbuildwell@gmail.com</p>
            </div>
          </section>
        </div>

      </div>
    </main>
  );
}