'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '@/lib/mockData';
import { useLanguage } from '@/lib/language-context';

export default function CategoriesPage() {
  const { language, t } = useLanguage();

  return (
    <div className="bg-[#EFE4CF] min-h-screen text-[#2A1A12] py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Curatorial Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#B8964F]/40 bg-[#FAF4E8] text-[#8C4E28] text-xs uppercase tracking-[0.25em] font-sans">
            <Sparkles className="w-3.5 h-3.5 text-[#B8964F]" />
            <span>{language === 'hi' ? 'ताम्र संग्रह श्रेणियां' : 'Archival Folios & Guild Collections'}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#12302B] tracking-wide leading-tight">
            {language === 'hi' ? 'दैनिक जीवन और पूजा के लिए पावन ताम्रशिल्प' : 'Heirlooms of Daily Ritual & Sacred Water'}
          </h1>

          <div className="kumaoni-divider my-4">
            <span className="w-2 h-2 rotate-45 border border-[#B8964F] bg-[#FAF4E8]"></span>
          </div>

          <p className="text-sm sm:text-base text-[#4A3223] font-light leading-relaxed max-w-2xl mx-auto">
            {language === 'hi'
              ? 'प्रत्येक श्रेणी अल्मोड़ा के तामता शिल्पकारों के हथौड़े की चोट, अग्नि शोधन और पीढ़ियों की साधना का प्रमाण है।'
              : 'Every collection represents specialized anvil work, wood-fired annealing cycles, and the noble legacy of Uttarakhand’s copper masters.'}
          </p>
        </div>

        {/* Collections Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES.map((cat, idx) => {
            const catProducts = PRODUCTS.filter((p) => p.categoryId === cat.id);
            return (
              <div
                key={cat.id}
                className="museum-plaque bg-[#FAF4E8] flex flex-col justify-between group transition-all duration-300 hover:shadow-xl"
              >
                {/* Visual Plaque with Candle Vignette */}
                <div className="relative aspect-16/11 overflow-hidden candle-vignette border-b border-[#B8964F]/30 bg-[#12302B]">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter contrast-[1.03]"
                  />
                  {/* Brass Badge */}
                  <div className="absolute top-3 left-3 bg-[#12302B]/90 backdrop-blur-sm text-[#F7F0E1] text-[11px] font-sans tracking-widest uppercase px-3 py-1 border border-[#B8964F]/60">
                    Folio 0{idx + 1}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-[#FAF4E8]/95 text-[#2A1A12] text-[10px] tracking-wider font-sans uppercase px-2.5 py-1 border border-[#B8964F]/50">
                    {catProducts.length} {language === 'hi' ? 'कृतियां' : 'Catalogued Pieces'}
                  </div>
                </div>

                {/* Content Plaque */}
                <div className="p-7 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <h3 className="font-serif text-2xl font-normal text-[#12302B] group-hover:text-[#B26A3C] transition-colors">
                      {language === 'hi' ? cat.nameHi : cat.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5C3E2C] font-light leading-relaxed">
                      {language === 'hi' ? cat.descriptionHi : cat.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#B8964F]/25 flex items-center justify-between">
                    <span className="text-[11px] text-[#8C4E28] uppercase tracking-wider font-sans">
                      {language === 'hi' ? 'शुद्ध ताम्र • हस्तनिर्मित' : '99.2% Pure • Hand-beaten'}
                    </span>
                    <Link
                      href={`/shop?category=${cat.slug}`}
                      className="text-xs font-sans tracking-widest uppercase text-[#B26A3C] hover:text-[#12302B] flex items-center gap-1.5 transition-colors font-medium"
                    >
                      <span>{language === 'hi' ? 'संग्रह देखें' : 'View Folio'}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Curator Guild Note */}
        <div className="border border-[#B8964F]/50 bg-[#FAF4E8] p-8 sm:p-10 text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[11px] text-[#B8964F] uppercase tracking-[0.2em] font-sans">
            Provenance & Care Notice
          </span>
          <p className="font-serif text-lg sm:text-xl text-[#12302B] italic">
            &ldquo;A vessel beaten from raw copper lives with you. It darkens with time, cleans with tamarind, and endures for generations without loss of grace.&rdquo;
          </p>
          <p className="text-xs text-[#6B4B35] font-sans">
            — Tamta Guild Registry of Almora, Established c. 16th Century
          </p>
        </div>
      </div>
    </div>
  );
}
