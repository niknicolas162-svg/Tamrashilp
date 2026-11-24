'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { ArrowLeft, Sparkles, ShieldCheck, ArrowRight, Heart } from 'lucide-react';
import { OCCASION_COLLECTIONS } from '@/lib/collections';
import { PRODUCTS } from '@/lib/mockData';
import { useLanguage } from '@/lib/language-context';
import { ProductCard } from '@/components/common/ProductCard';

export default function OccasionDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { language } = useLanguage();

  const occasion = OCCASION_COLLECTIONS.find((o) => o.slug === slug);
  if (!occasion) {
    return notFound();
  }

  // Filter curated products matching occasion categories
  const curatedProducts = PRODUCTS.filter((p) =>
    occasion.curatedCategorySlugs.includes(p.categoryId)
  );

  return (
    <div className="bg-[#FAF4E8] text-[#2A1A12] min-h-screen font-body selection:bg-[#8C4E28] selection:text-[#FAF4E8]">
      {/* Header */}
      <section className="bg-[#12302B] text-[#FAF4E8] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#B8964F]/30 relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-5 text-center relative z-10">
          <Link
            href="/collections"
            className="inline-flex items-center gap-1.5 text-xs text-[#B8964F] hover:text-[#FAF4E8] font-serif transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Occasion Collections</span>
          </Link>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#B8964F]/40 bg-[#0B1F1C] text-[#B8964F] text-xs font-serif uppercase tracking-[0.2em] block mx-auto w-fit">
            <span>✦</span>
            <span>{language === 'hi' ? 'अवसर संग्रह' : 'Curated Occasion'}</span>
            <span>✦</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-wide text-[#FAF4E8]">
            {language === 'hi' ? occasion.nameHi : occasion.name}
          </h1>

          <div className="kumaoni-divider my-2">
            <span className="text-[#B8964F] text-xs">✦</span>
          </div>

          <p className="text-sm sm:text-base text-[#EFE4CF]/90 max-w-xl mx-auto font-light leading-relaxed">
            {language === 'hi' ? occasion.descriptionHi : occasion.description}
          </p>

          {/* Traditional Inscription / Blessing Plaque */}
          <div className="pt-4 max-w-lg mx-auto">
            <div className="p-4 rounded-2xl bg-[#0B1F1C]/80 border border-[#B8964F]/40 text-xs font-serif text-[#B8964F] space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-[#FAF4E8]/60 block font-sans">
                Suggested Heritage Inscription
              </span>
              <p className="italic text-sm text-[#FAF4E8]">
                &ldquo;{language === 'hi' ? occasion.suggestedBlessingHi : occasion.suggestedBlessing}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-12">
        <div className="flex items-center justify-between border-b border-[#B8964F]/30 pb-4">
          <span className="text-xs font-serif uppercase tracking-wider text-[#8C4E28]">
            {curatedProducts.length} Curated Ceremonial Pieces
          </span>
          <Link
            href="/custom-order"
            className="text-xs text-[#8C4E28] hover:text-[#723F20] font-serif underline"
          >
            Add Custom Name Engraving (+₹15/char) →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {curatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bulk Inquiry Link */}
        <div className="p-8 rounded-3xl bg-[#EFE4CF] border border-[#B8964F]/40 text-center space-y-3 museum-plaque">
          <h3 className="font-serif text-xl sm:text-2xl text-[#12302B]">
            Need multiple matching pieces for guests or ceremony?
          </h3>
          <p className="text-xs text-[#2A1A12]/80 max-w-md mx-auto">
            We offer tiered volume pricing and bespoke custom crest engraving for gatherings of 15 or more.
          </p>
          <Link
            href="/collections#corporate-enquiry"
            className="inline-block px-6 py-2.5 rounded-xl bg-[#8C4E28] text-[#FAF4E8] text-xs font-serif uppercase tracking-widest hover:bg-[#723F20] transition-colors"
          >
            Inquire for Volume Ceremony Commission
          </Link>
        </div>
      </div>
    </div>
  );
}

