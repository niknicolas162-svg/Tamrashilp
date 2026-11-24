'use client';

import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, ArrowLeft, Share2, Sparkles, BookOpen, ShieldCheck } from 'lucide-react';
import { BLOG_POSTS, PRODUCTS } from '@/lib/mockData';
import { useLanguage } from '@/lib/language-context';

export default function BlogPostDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = BLOG_POSTS.find((b) => b.slug === slug);

  if (!post) {
    notFound();
  }

  const { language } = useLanguage();

  return (
    <article className="bg-[#EFE4CF] min-h-screen text-[#2A1A12] py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Back Link */}
        <div>
          <Link
            href="/blog"
            className="inline-flex items-center text-xs font-sans tracking-widest uppercase text-[#8C4E28] hover:text-[#12302B] gap-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Archival Folio</span>
          </Link>
        </div>

        {/* Monograph Header */}
        <header className="space-y-6 border-b border-[#B8964F]/30 pb-8">
          <div className="flex items-center gap-3 text-xs text-[#8C4E28] font-sans">
            <span className="uppercase tracking-[0.2em] font-medium border-b border-[#B8964F]/50 pb-0.5">
              {post.category}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 font-light">
              <Clock className="w-3.5 h-3.5 text-[#B8964F]" />
              {post.readTime}
            </span>
            <span>•</span>
            <span className="font-light">{post.date}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#12302B] leading-tight tracking-wide">
            {language === 'hi' ? post.titleHi : post.title}
          </h1>

          <div className="flex items-center space-x-4 pt-2">
            <div className="w-10 h-10 rounded-full bg-[#12302B] text-[#B8964F] border border-[#B8964F]/50 flex items-center justify-center font-serif text-base font-bold">
              {post.author[0]}
            </div>
            <div>
              <p className="font-serif text-sm font-semibold text-[#12302B]">{post.author}</p>
              <p className="text-xs font-sans text-[#6B4B35]">{post.authorRole}</p>
            </div>
          </div>
        </header>

        {/* Museum Plaque Cover Image */}
        <div className="museum-plaque bg-[#FAF4E8] overflow-hidden candle-vignette aspect-16/9 bg-[#12302B]">
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover filter contrast-[1.03]" />
        </div>

        {/* Content Body with Classical Drop Cap */}
        <div className="bg-[#FAF4E8] border border-[#B8964F]/40 p-8 sm:p-12 space-y-6 text-[#2A1A12] leading-relaxed">
          {post.content.split('\n\n').map((paragraph, idx) => {
            if (paragraph.startsWith('###')) {
              return (
                <div key={idx} className="pt-6 pb-2">
                  <h3 className="font-serif text-2xl font-normal text-[#12302B] tracking-wide border-b border-[#B8964F]/30 pb-2">
                    {paragraph.replace('###', '').trim()}
                  </h3>
                </div>
              );
            }
            if (paragraph.startsWith('-')) {
              return (
                <ul key={idx} className="space-y-3 font-serif text-base text-[#4A3223] pl-2">
                  {paragraph
                    .split('\n')
                    .map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="text-[#B8964F] mt-1.5 text-xs">◆</span>
                        <span>{item.replace('-', '').trim()}</span>
                      </li>
                    ))}
                </ul>
              );
            }
            return (
              <p
                key={idx}
                className={`font-serif text-base sm:text-lg text-[#3B251A] leading-[1.8] font-light ${
                  idx === 0 ? 'drop-cap' : ''
                }`}
              >
                {paragraph.trim()}
              </p>
            );
          })}
        </div>

        {/* Curated Heirlooms Banner */}
        <div className="border border-[#B8964F]/50 bg-[#FAF4E8] p-8 space-y-5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#B8964F]" />
            <h3 className="font-serif text-xl font-normal text-[#12302B]">
              Vessels Referenced in this Treatises
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {PRODUCTS.slice(0, 2).map((prod) => (
              <Link
                key={prod.id}
                href={`/product/${prod.slug}`}
                className="museum-plaque bg-[#FAF4E8] p-4 flex items-center gap-4 hover:shadow-lg transition-all group"
              >
                <img
                  src={prod.images[0]}
                  alt={prod.title}
                  className="w-18 h-18 w-20 h-20 object-cover border border-[#B8964F]/40 filter contrast-[1.03]"
                />
                <div className="space-y-1">
                  <p className="font-serif text-sm font-medium text-[#12302B] group-hover:text-[#B26A3C] transition-colors line-clamp-1">
                    {prod.title}
                  </p>
                  <p className="font-serif text-xs text-[#B26A3C]">
                    ₹{prod.basePrice.toLocaleString('en-IN')}
                  </p>
                  <span className="text-[10px] text-[#6B4B35] font-sans tracking-wide uppercase">
                    Hand-hammered • {prod.village}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
