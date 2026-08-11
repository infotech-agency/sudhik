import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="pt-24 min-h-screen bg-ivory flex items-center justify-center px-5">
      <div className="text-center max-w-md">
        <p className="font-deva text-6xl text-saffron-500/30">ॐ</p>
        <h1 className="font-display text-6xl text-ink mt-4">404</h1>
        <h2 className="font-display text-2xl text-ink mt-2">This path is not sacred</h2>
        <p className="font-serif text-ink/55 mt-3 max-w-sm mx-auto">
          The page you seek has wandered. Let us guide you back.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-saffron-500 to-saffron-600 text-ivory font-sans text-sm font-semibold tracking-royal-sm uppercase shadow-gold hover:shadow-glow transition-all"
        >
          <Home size={16} /> Return Home
        </Link>
      </div>
    </div>
  );
}
