import React from 'react';

export default function ShippingPolicy() {
  return (
    <main className="min-h-screen bg-[rgb(var(--color-ivory))] text-[rgb(var(--color-ink))] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8 mt-20">
        
        {/* Header */}
        <div className="text-center space-y-3 border-b border-[rgba(212,175,55,0.3)] pb-8">
          <h1 className="font-royal text-3xl sm:text-4xl font-bold text-gold-gradient">
            Shipping & Delivery Policy
          </h1>
          <p className="text-[rgb(var(--color-ink-soft))] text-sm sm:text-base">
            SHUDDHIK™ — Temple & Sacred Surface Cleaner
          </p>
        </div>

        {/* Content Section */}
        <div className="glass-ivory p-6 sm:p-10 rounded-2xl shadow-premium space-y-6 text-sm sm:text-base leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-royal text-xl font-bold text-[rgb(var(--color-maroon-800))]">
              1. Processing Time
            </h2>
            <p className="text-[rgb(var(--color-ink-soft))]">
              All orders placed for <strong>SHUDDHIK™</strong> products are processed within 1–2 business days. Orders are not dispatched or delivered on Sundays or national holidays.
            </p>
          </section>

          <div className="w-full h-px gold-divider" />

          <section className="space-y-2">
            <h2 className="font-royal text-xl font-bold text-[rgb(var(--color-maroon-800))]">
              2. Shipping Charges & Timeline
            </h2>
            <p className="text-[rgb(var(--color-ink-soft))]">
              We offer Pan-India delivery through trusted courier partners. Standard delivery timelines are:
            </p>
            <ul className="list-disc list-inside space-y-1 text-[rgb(var(--color-ink-soft))] pl-2">
              <li><strong>Metro Cities:</strong> 3 to 5 business days</li>
              <li><strong>Rest of India:</strong> 5 to 7 business days</li>
            </ul>
            <p className="text-[rgb(var(--color-ink-soft))] text-xs italic mt-1">
              *Shipping fees (if applicable) are calculated at checkout based on order quantity and delivery pin code.
            </p>
          </section>

          <div className="w-full h-px gold-divider" />

          <section className="space-y-2">
            <h2 className="font-royal text-xl font-bold text-[rgb(var(--color-maroon-800))]">
              3. Order Tracking
            </h2>
            <p className="text-[rgb(var(--color-ink-soft))]">
              Once your order is shipped, you will receive an SMS and email notification containing your tracking details and courier link.
            </p>
          </section>

          <div className="w-full h-px gold-divider" />

          <section className="space-y-2">
            <h2 className="font-royal text-xl font-bold text-[rgb(var(--color-maroon-800))]">
              4. Bulk & B2B Orders
            </h2>
            <p className="text-[rgb(var(--color-ink-soft))]">
              For temples, ashrams, and trade inquiries, bulk shipping schedules and custom logistics support will be arranged directly upon order confirmation.
            </p>
          </section>

          <div className="w-full h-px gold-divider" />

          <section className="space-y-2">
            <h2 className="font-royal text-xl font-bold text-[rgb(var(--color-maroon-800))]">
              5. Contact Us
            </h2>
            <p className="text-[rgb(var(--color-ink-soft))]">
              For any shipping-related queries, reach out to us at:
            </p>
            <div className="p-4 rounded-xl bg-[rgb(var(--color-ivory-dim))] border border-[rgba(212,175,55,0.3)] text-xs sm:text-sm">
              <p><strong>OC Build Well Private Ltd.</strong></p>
              <p>Sector 63, Noida, Uttar Pradesh</p>
              <p>Email: ocbuildwell@gmail.com | Phone: +91 72900 61140</p>
            </div>
          </section>
        </div>

      </div>
    </main>
  );
}