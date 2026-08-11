import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Home, ArrowLeft, Calendar } from 'lucide-react';
import { api, ApiError } from '@/lib/api';
import type { Blog } from '@/lib/types';
import CTA from '@/components/sections/CTA';

export const dynamic = 'force-dynamic';

async function getBlog(idOrSlug: string): Promise<Blog | null> {
  try {
    return await api.get<Blog>(`/api/blogs/slug/${idOrSlug}`);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) return null;
    return null;
  }
}

export default async function BlogDetailPage({
  params,
}: {
  params: { idOrSlug: string };
}) {
  const blog = await getBlog(params.idOrSlug);
  console.log("blog", blog)
  if (!blog) notFound();

  return (
    <div className="pt-24 min-h-screen bg-ivory">
      <div className="absolute inset-x-0 top-20 h-96 bg-lotus-fade opacity-40 pointer-events-none" />
      <div className="relative mx-auto max-w-3xl px-5 sm:px-8 py-12">
        {/* breadcrumb */}
        <nav className="flex items-center gap-1.5 font-royal text-[10px] sm:text-xs tracking-royal-sm uppercase text-ink/45 mb-10">
          <Link href="/" className="inline-flex items-center gap-1 hover:text-saffron-500 transition-colors">
            <Home size={12} /> Home
          </Link>
          <ChevronRight size={12} className="text-gold-400/60" />
          <Link href="/blog" className="hover:text-saffron-500 transition-colors">Blog</Link>
          <ChevronRight size={12} className="text-gold-400/60" />
          <span className="text-saffron-500 truncate max-w-[200px]">{blog.title}</span>
        </nav>

        <article>
          <div className="flex items-center gap-2 font-sans text-xs text-ink/40 mb-4">
            <Calendar size={12} className="text-saffron-500" />
            {blog.publishedAt || blog.createdAt
              ? new Date(blog.publishedAt || blog.createdAt!).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
              : 'Recently'}
            {blog.author && <span>· by {blog.author}</span>}
          </div>

          <h1 className="font-display text-4xl sm:text-5xl text-ink leading-tight">{blog.title}</h1>

          {blog.excerpt && <p className="font-serif text-xl text-ink/65 mt-5 leading-relaxed">{blog.excerpt}</p>}

          <div className="h-px w-24 bg-gold-line my-8" />

          {blog.featuredImage?.url && (
            <div className="rounded-3xl overflow-hidden mb-10 border border-gold-400/20">
              <img src={blog.featuredImage?.url} alt={blog.title} className="w-full h-full object-cover" />
            </div>
          )}

          {blog.content && (
            <div className="prose prose-lg max-w-none">
              {blog.content.split('\n').map((para, i) => (
                <p key={i} className="font-serif text-lg text-ink/75 leading-relaxed mb-6">
                  {para}
                </p>
              ))}
            </div>
          )}

          <div className="mt-12">
            <Link href="/blog" className="inline-flex items-center gap-2 font-royal text-xs tracking-royal uppercase text-saffron-500 hover:text-saffron-600 transition-colors">
              <ArrowLeft size={14} /> Back to all stories
            </Link>
          </div>
        </article>
      </div>

      <CTA />
    </div>
  );
}
