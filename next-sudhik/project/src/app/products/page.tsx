import Link from 'next/link';
import { ArrowRight, Star, IndianRupee, Package } from 'lucide-react';
import { api } from '@/lib/api';
import type { Product } from '@/lib/types';
import { productImageUrls } from '@/lib/product-utils';
import ProductImage from '@/components/ui/ProductImage';

export const dynamic = 'force-dynamic';

async function getProducts() {
  try {
    const data = await api.get<Product[]>('/api/products');
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export default async function ProductsPage() {
  const products = await getProducts();
  console.log("products", products);

  return (
    <div className="pt-24 min-h-screen bg-ivory">
      <div className="absolute inset-x-0 top-20 h-96 bg-lotus-fade opacity-50 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 py-16">
        {/* heading */}
        <div className="text-center mb-16">
          <span className="font-royal text-[11px] tracking-royal uppercase text-saffron-500">The Collection</span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-ink mt-4">
            Bring Purity to <span className="text-saffron-gradient">Every Prayer</span>
          </h1>
          <div className="h-px w-24 bg-gold-line mx-auto mt-7" />
          <p className="font-serif text-lg text-ink/65 mt-6 max-w-xl mx-auto">
            Each SHUDDHIK product is crafted with devotion — temple-safe, natural, and made in Bharat.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-24">
            <Package size={40} className="text-gold-400/50 mx-auto mb-5" />
            <h2 className="font-display text-2xl text-ink">Products are on their way</h2>
            <p className="font-serif text-ink/55 mt-2 max-w-md mx-auto">
              Our sacred collection is being prepared. Please check back soon.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {products.map((p) => {
              const urls = productImageUrls(p);
              return (
                <Link
                  key={p._id}
                  href={`/products/${p.slug || p._id}`}
                  className="group relative overflow-hidden rounded-3xl bg-white border border-gold-400/20 hover:border-gold-400/40 hover:shadow-premium transition-all duration-500 lift"
                >
                  {/* image */}
                  <div className="aspect-square overflow-hidden bg-gradient-to-br from-ivory via-sand/30 to-beige/40 relative">
                    {urls[0] ? (
                      <img src={urls[0]} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center p-12">
                        <ProductImage className="w-full h-full opacity-40" />
                      </div>
                    )}
                    {p.stock === 0 && (
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-maroon-500 text-ivory font-royal text-[10px] tracking-royal uppercase">
                        Out of Stock
                      </span>
                    )}
                  </div>

                  {/* body */}
                  <div className="p-6">
                    <h3 className="font-display text-xl text-ink group-hover:text-saffron-500 transition-colors">{p.title}</h3>
                    <p className="font-serif text-sm text-ink/60 mt-2 line-clamp-2">{p.description}</p>
                    <div className="flex items-center justify-between mt-5">
                      <div className="flex items-center gap-1.5">
                        <Star size={14} className="text-gold-400 fill-gold-400" />
                        <span className="font-serif text-sm text-ink/60">New</span>
                      </div>
                      <div className="flex items-center font-display text-xl text-ink">
                        <IndianRupee size={16} className="text-saffron-500" />
                        {p.price}
                      </div>
                    </div>
                    <div className="mt-4 inline-flex items-center gap-2 font-royal text-[10px] tracking-royal uppercase text-saffron-500 group-hover:gap-3 transition-all">
                      View Product <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
