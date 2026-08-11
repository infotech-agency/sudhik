import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Home, Loader2 } from 'lucide-react';
import { api, ApiError } from '@/lib/api';
import type { Product, Review } from '@/lib/types';
import ProductDetails from '@/components/product/ProductDetails';
import Reviews from '@/components/sections/Reviews';
import Trust from '@/components/sections/Trust';
import FAQ from '@/components/sections/FAQ';
import CTA from '@/components/sections/CTA';

export const dynamic = 'force-dynamic';

// async function getProduct(idOrSlug: string): Promise<Product | null> {
//   try {
//     return await api.get<Product>(`/api/products/${idOrSlug}`);
//   } catch (err) {
//     if (err instanceof ApiError && err.status === 404) return null;
//     return null;
//   }
// }
async function getProduct(idOrSlug: string): Promise<Product | null> {
  try {
    return await api.get<Product>(`/api/products/${idOrSlug}`);
  } catch (err) {
    console.error('getProduct error for', idOrSlug, err); // <-- ye add karo
    if (err instanceof ApiError && err.status === 404) return null;
    return null;
  }
}

async function getReviews(productId: string): Promise<Review[]> {
  try {
    const data = await api.get<Review[]>(`/api/reviews/product/${productId}`);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: { idOrSlug: string };
}) {
  const product = await getProduct(params.idOrSlug);
  if (!product) notFound();

  const reviews = await getReviews(product._id);
  const avg =
    reviews.length > 0
      ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
      : 5;
  // use product faqs in the FAQ section if available, else a fallback
  const faqItems =
    product.faqs && product.faqs.length > 0
      ? product.faqs
      : [
          { question: 'Is this safe on marble?', answer: 'Yes — gentle and pH balanced for marble, granite, brass and stone.' },
          { question: 'Does it contain bleach?', answer: 'No. 100% natural, non-toxic and biodegradable.' },
        ];

  return (
    <>
      {/* Breadcrumb */}
      <div className="pt-24 pb-2 bg-ivory">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <nav className="flex items-center gap-1.5 font-royal text-[10px] sm:text-xs tracking-royal-sm uppercase text-ink/45">
            <Link href="/" className="inline-flex items-center gap-1 hover:text-saffron-500 transition-colors">
              <Home size={12} /> Home
            </Link>
            <ChevronRight size={12} className="text-gold-400/60" />
            <Link href="/products" className="hover:text-saffron-500 transition-colors">Products</Link>
            <ChevronRight size={12} className="text-gold-400/60" />
            <span className="text-saffron-500 truncate max-w-[200px]">{product.title}</span>
          </nav>
        </div>
      </div>

      <ProductDetails product={product} rating={avg} reviewCount={reviews.length} />
      <Reviews productId={product._id} />
      <Trust />
      <FAQ items={faqItems} />
      <CTA />
    </>
  );
}
