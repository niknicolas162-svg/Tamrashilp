'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/mockData';
import { useLanguage } from '@/lib/language-context';

export default function BlogIndexPage() {
  const { language, t } = useLanguage();

  return (
    <div className="bg-[#EFE4CF] min-h-screen text-[#2A1A12] py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Archival Journal Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#B8964F]/40 bg-[#FAF4E8] text-[#8C4E28] text-xs uppercase tracking-[0.25em] font-sans">
            <BookOpen className="w-3.5 h-3.5 text-[#B8964F]" />
            <span>The Tamta Guild Monograph</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#12302B] tracking-wide leading-tight">
            The Copper Journal
          </h1>

          <div className="kumaoni-divider my-4">
            <span className="w-2 h-2 rotate-45 border border-[#B8964F] bg-[#FAF4E8]"></span>
          </div>

          <p className="text-sm sm:text-base text-[#4A3223] font-light leading-relaxed max-w-2xl mx-auto">
            Historical treatises on Kumaon metalsmithing, classical Ayurvedic dawn water traditions (Ushapan), and authentic natural cleaning methods.
          </p>
        </div>

        {/* Featured Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, idx) => (
            <article
              key={post.id}
              className="museum-plaque bg-[#FAF4E8] flex flex-col justify-between group transition-all duration-300 hover:shadow-xl"
            >
              <Link href={`/blog/${post.slug}`} className="block relative aspect-16/10 overflow-hidden candle-vignette border-b border-[#B8964F]/30 bg-[#12302B]">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter contrast-[1.03]"
                />
                <div className="absolute top-3 left-3 bg-[#12302B]/90 backdrop-blur-sm text-[#F7F0E1] text-[10px] tracking-widest font-sans uppercase px-2.5 py-1 border border-[#B8964F]/60">
                  Vol. {idx + 1}
                </div>
              </Link>

              <div className="p-7 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[11px] text-[#8C4E28] font-sans">
                    <span className="uppercase tracking-wider font-semibold border-b border-[#B8964F]/40 pb-0.5">
                      {post.category}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-light">
                      <Clock className="w-3 h-3 text-[#B8964F]" />
                      {post.readTime}
                    </span>
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#12302B] group-hover:text-[#B26A3C] transition-colors leading-snug">
                      {language === 'hi' ? post.titleHi : post.title}
                    </h2>
                  </Link>

                  <p className="text-xs sm:text-sm text-[#5C3E2C] font-light line-clamp-3 leading-relaxed">
                    {language === 'hi' ? post.excerptHi : post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#B8964F]/25 flex items-center justify-between text-xs">
                  <span className="text-[#8C4E28] font-sans font-light tracking-wide">
                    By {post.author}
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="font-sans text-xs tracking-widest uppercase font-medium text-[#B26A3C] hover:text-[#12302B] flex items-center gap-1 transition-colors group-hover:translate-x-0.5"
                  >
                    <span>Read Monograph</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Archival Quotation Card */}
        <div className="border border-[#B8964F]/50 bg-[#12302B] text-[#F7F0E1] p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-4 rounded-none shadow-xl">
          <div className="wax-seal w-12 h-12 rounded-full flex items-center justify-center mx-auto text-xs font-serif font-bold">
            TM
          </div>
          <h3 className="font-serif text-2xl text-[#EFE4CF] font-normal tracking-wide">
            &ldquo;Tamra Patram: The Sacred Vessel&rdquo;
          </h3>
          <p className="text-xs sm:text-sm text-[#EFE4CF]/85 font-light leading-relaxed max-w-xl mx-auto">
            Traditional Ayurvedic texts describe copper as <em>Tamra</em>, noting its gentle ionizing property when water is rested overnight in clean, unlined vessels. Acidic contents, however, must always be prepared in tin-lined (Kalai) cookware.
          </p>
        </div>
      </div>
    </div>
  );
}
