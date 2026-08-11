import { FaInstagram, FaFacebookF, FaYoutube, FaXTwitter } from 'react-icons/fa6';
import { Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const quickLinks = [
  { label: 'The Product', href: '/products' },
  { label: 'Philosophy', href: '/#philosophy' },
  { label: 'How To Use', href: '/#how-to-use' },
  { label: 'Reviews', href: '/products#reviews' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/products#faq' },
];

const policyLinks = [
  { label: 'Shipping Policy', href: '/shipping-policy' },
  { label: 'Returns & Refunds', href: '/returns-and-refunds' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Use', href: '/terms-of-use' },
];

export default function Footer() {
  return (
    <footer className="relative bg-ink text-ivory overflow-hidden">
      <div className="h-px bg-gold-line" />
      <div className="absolute inset-0 bg-temple-dark opacity-60 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
  <Link
    href="/"
    className="relative flex flex-col leading-none"
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
  >
    {/* Glow */}
    <div className="absolute inset-0 rounded-full bg-gold-400/20 blur-2xl scale-125 -z-10" />

    <Image
      src="/assets/full-logo.png"
      width={130}
      height={130}
      alt="Logo"
      className="relative z-10 drop-shadow-[0_0_18px_rgba(255,215,0,0.8)]"
    />
  </Link>
</div>
            <p className="font-serif text-ivory/60 text-base leading-relaxed max-w-xs">
              A premium temple &amp; sacred surface cleaner. Crafted with devotion
              in Bharat, for every mandir and every heart that serves.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[
                { Icon: FaInstagram, label: 'Instagram' },
                { Icon: FaFacebookF, label: 'Facebook' },
                
              ].map(({ Icon, label }) => (
                <a key={label} href="#" aria-label={label} className="w-10 h-10 rounded-full border border-gold-400/30 flex items-center justify-center text-gold-300 hover:bg-gold-400 hover:text-ink transition-all duration-500 hover:scale-110">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-royal text-xs tracking-royal uppercase text-gold-300 mb-6">Explore</h4>
            <ul className="space-y-3.5">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="font-serif text-ivory/65 hover:text-gold-300 transition-colors text-base">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-royal text-xs tracking-royal uppercase text-gold-300 mb-6">Policies</h4>
            <ul className="space-y-3.5">
              {policyLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="font-serif text-ivory/65 hover:text-gold-300 transition-colors text-base">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-royal text-xs tracking-royal uppercase text-gold-300 mb-6">Connect</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={17} className="text-gold-300 mt-0.5 shrink-0" />
                <a href="mailto:ocbuildwell@gmail.com" className="font-serif text-ivory/65 hover:text-gold-300 transition-colors text-base">ocbuildwell@gmail.com</a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={17} className="text-gold-300 mt-0.5 shrink-0" />
                <a href="tel:917290061140" className="font-serif text-ivory/65 hover:text-gold-300 transition-colors text-base">+91 72900 61140</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={17} className="text-gold-300 mt-0.5 shrink-0" />
                <span className="font-serif text-ivory/65 text-base">Haridwar, Uttarakhand<br />Bharat (India)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gold-400/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-serif text-ivory/40 text-sm text-center sm:text-left">
            © {new Date().getFullYear()} SHUDDHIK™. All rights reserved. Made with shraddha in Bharat.
          </p>
          <p className="font-deva text-gold-300/60 text-lg">श्रद्धा से सफाई</p>
        </div>
      </div>
    </footer>
  );
}
