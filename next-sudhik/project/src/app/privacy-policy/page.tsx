import React from 'react';

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[rgb(var(--color-ivory))] text-[rgb(var(--color-ink))] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8 mt-20">
        
        {/* Header */}
        <div className="text-center space-y-3 border-b border-[rgba(212,175,55,0.3)] pb-8">
          <h1 className="font-royal text-3xl sm:text-4xl font-bold text-gold-gradient">
            Privacy Policy
          </h1>
          <p className="text-[rgb(var(--color-ink-soft))] text-sm sm:text-base">
            Your Privacy and Trust Are Sacred To Us
          </p>
        </div>

        {/* Content Section */}
        <div className="glass-ivory p-6 sm:p-10 rounded-2xl shadow-premium space-y-6 text-sm sm:text-base leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-royal text-xl font-bold text-[rgb(var(--color-maroon-800))]">
              1. Information We Collect
            </h2>
            <p className="text-[rgb(var(--color-ink-soft))]">
              When you visit or place an order on the <strong>SHUDDHIK™</strong> platform, we collect personal information necessary to fulfill your order, including:
            </p>
            <ul className="list-disc list-inside space-y-1 text-[rgb(var(--color-ink-soft))] pl-2">
              <li>Full Name and Contact Number</li>
              <li>Shipping Address & Billing Address</li>
              <li>Email address for invoices and tracking updates</li>
            </ul>
          </section>

          <div className="w-full h-px gold-divider" />

          <section className="space-y-2">
            <h2 className="font-royal text-xl font-bold text-[rgb(var(--color-maroon-800))]">
              2. How We Use Your Information
            </h2>
            <p className="text-[rgb(var(--color-ink-soft))]">
              We strictly use your information to:
            </p>
            <ul className="list-disc list-inside space-y-1 text-[rgb(var(--color-ink-soft))] pl-2">
              <li>Process, fulfill, and ship your product orders.</li>
              <li>Send transaction updates, tracking links, and customer support messages.</li>
              <li>Improve our website performance and user experience.</li>
            </ul>
          </section>

          <div className="w-full h-px gold-divider" />

          <section className="space-y-2">
            <h2 className="font-royal text-xl font-bold text-[rgb(var(--color-maroon-800))]">
              3. Data Protection & Sharing
            </h2>
            <p className="text-[rgb(var(--color-ink-soft))]">
              We do <strong>not sell, rent, or trade</strong> your personal details to any third-party marketers. Your details are only shared with trusted partners (such as logistics networks and payment gateways) strictly for order fulfillment.
            </p>
          </section>

          <div className="w-full h-px gold-divider" />

          <section className="space-y-2">
            <h2 className="font-royal text-xl font-bold text-[rgb(var(--color-maroon-800))]">
              4. Cookies
            </h2>
            <p className="text-[rgb(var(--color-ink-soft))]">
              We use minimal cookies to enhance website navigation, save your shopping cart session, and analyze aggregated web traffic.
            </p>
          </section>

          <div className="w-full h-px gold-divider" />

          <section className="space-y-2">
            <h2 className="font-royal text-xl font-bold text-[rgb(var(--color-maroon-800))]">
              5. Contact Us
            </h2>
            <p className="text-[rgb(var(--color-ink-soft))]">
              If you have any questions regarding your personal data, please reach out to:
            </p>
            <div className="p-4 rounded-xl bg-[rgb(var(--color-ivory-dim))] border border-[rgba(212,175,55,0.3)] text-xs sm:text-sm">
              <p><strong>OC Build Well Private Ltd.</strong></p>
              <p>Sector 63, Noida, Uttar Pradesh</p>
              <p>Email: ocbuildwell@gmail.com</p>
            </div>
          </section>
        </div>

      </div>
    </main>
  );
}