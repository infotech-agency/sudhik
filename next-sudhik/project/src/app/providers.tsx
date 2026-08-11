'use client';

import { AuthProvider } from '@/lib/auth-context';
import { BuyNowProvider } from '@/lib/buynow-context';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BuyNowModal from '@/components/checkout/BuyNowModal';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <BuyNowProvider>
        <Header />
        <main>{children}</main>
        <Footer />
        <BuyNowModal />
      </BuyNowProvider>
    </AuthProvider>
  );
}
