'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How do I know my Tamrashilp vessel is made of pure copper?',
      a: 'Every piece is crafted from 99.2%+ Grade A virgin electrolytic copper. We do not use scrap or cast alloys. Each vessel comes with an individual numbered certificate linking to its batch spectrochemical assay and NABL metallurgy pass.',
    },
    {
      q: 'Can I drink citrus juices, tea, or milk from pure copper bottles?',
      a: 'No. Classical Ayurvedic treatises and modern chemistry strictly counsel against storing acidic liquids (lemon water, orange juice, vinegar, alcohol, curd, or milk) in unlined copper vessels. Plain room-temperature drinking water only is intended for unlined copper.',
    },
    {
      q: 'What is Kalai (Tin Lining) and is it safe for cooking?',
      a: 'Kalai is the 500-year-old artisanal method of coating the interior of copper cookware with 99.9% food-grade virgin tin over hot hearths. This creates a non-reactive barrier that lets you cook Indian tomato curries, gravies, and dals safely while enjoying the remarkable heat conduction of copper.',
    },
    {
      q: 'How often should I clean the copper vessel?',
      a: 'Clean the inside once a week with lukewarm water and a squeeze of fresh lemon with a pinch of rock salt. Rinse and dry thoroughly. For the exterior, you can allow it to develop an antique natural patina, or restore radiant warm sheen in seconds with Pitambari powder or lemon rub.',
    },
    {
      q: 'How does shipping and transit insurance work?',
      a: 'We ship across 28,000+ Indian pincodes via BlueDart Air Express. All vessels are nestled in custom multi-layer foam and reinforced craft cartons. If any item is damaged in transit, we provide a 100% free artisan replacement under our 15-Day Safe Exchange guarantee.',
    },
    {
      q: 'How does the custom heraldic engraving commission work?',
      a: 'You can submit custom monogramming, family names, or corporate crests via our Bespoke Commission page. Master coppersmith Devendra Kumar Tamta hand-chisels your text into the metal over the horn anvil before final tamarind polishing.',
    },
  ];

  return (
    <div className="bg-[#EFE4CF] min-h-screen text-[#2A1A12] py-14 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#B8964F]/40 bg-[#FAF4E8] text-[#8C4E28] text-xs uppercase tracking-[0.25em] font-sans">
            <HelpCircle className="w-3.5 h-3.5 text-[#B8964F]" />
            <span>Patron Inquiries & Lore</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#12302B] leading-tight">
            Frequently Asked Inquiries
          </h1>

          <div className="kumaoni-divider my-2">
            <span className="w-2 h-2 rotate-45 border border-[#B8964F] bg-[#FAF4E8]"></span>
          </div>

          <p className="text-xs sm:text-sm text-[#5C3E2C] font-light leading-relaxed">
            Guidance on traditional Almora coppersmithing, classical Ayurvedic Ushapan, care, and delivery.
          </p>
        </div>

        <div className="museum-plaque bg-[#FAF4E8] p-6 sm:p-10 space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="border border-[#B8964F]/30 bg-[#FAF3E8] overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between font-serif text-base font-normal text-[#12302B] hover:text-[#B26A3C] transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#B8964F] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#B8964F] flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="p-5 pt-0 font-serif text-sm sm:text-base text-[#4A3223] font-light leading-relaxed border-t border-[#B8964F]/20">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
