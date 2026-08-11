import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import { api } from '@/lib/api';
import type { Blog } from '@/lib/types';

export const dynamic = 'force-dynamic';

async function getBlogs() {
  try {
    const data = await api.get<Blog[]>('/api/blogs');
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const blogs = await getBlogs();
   console.log("blog---", blogs)
  return (
    <div className="pt-24 min-h-screen bg-ivory">
      <div className="absolute inset-x-0 top-20 h-96 bg-lotus-fade opacity-50 pointer-events-none" />
      <div className="relative mx-auto max-w-5xl px-5 sm:px-8 py-16">
        <div className="text-center mb-16">
          <span className="font-royal text-[11px] tracking-royal uppercase text-saffron-500">The Journal</span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-ink mt-4">
            Stories of <span className="text-saffron-gradient">Devotion</span>
          </h1>
          <div className="h-px w-24 bg-gold-line mx-auto mt-7" />
          <p className="font-serif text-lg text-ink/65 mt-6 max-w-xl mx-auto">
            Reflections on purity, seva, and the sacred art of keeping a mandir.
          </p>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-24">
            <h2 className="font-display text-2xl text-ink">Stories coming soon</h2>
            <p className="font-serif text-ink/55 mt-2 max-w-md mx-auto">
              Our journal is being written with the same devotion as our product. Please check back soon.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {blogs.map((b) => (
              <Link
                key={b._id}
                href={`/blog/${b.slug || b._id}`}
                className="group rounded-3xl overflow-hidden bg-white border border-gold-400/20 hover:border-gold-400/40 hover:shadow-premium transition-all duration-500 lift"
              >
                {b.featuredImage?.url && (
                  <div className="aspect-[16/9] overflow-hidden">
                    <img src={b.featuredImage?.url} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                )}
                <div className="p-7">
                  <div className="flex items-center gap-2 font-sans text-xs text-ink/40">
                    <Calendar size={12} className="text-saffron-500" />
                    {b.publishedAt || b.createdAt
                      ? new Date(b.publishedAt || b.createdAt!).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
                      : 'Recently'}
                    {b.author && <span>· by {b.author}</span>}
                  </div>
                  <h2 className="font-display text-2xl text-ink mt-3 group-hover:text-saffron-500 transition-colors">{b.title}</h2>
                  {b.excerpt && <p className="font-serif text-ink/65 mt-2 line-clamp-3">{b.excerpt}</p>}
                  <div className="mt-4 inline-flex items-center gap-2 font-royal text-[10px] tracking-royal uppercase text-saffron-500 group-hover:gap-3 transition-all">
                    Read More <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
