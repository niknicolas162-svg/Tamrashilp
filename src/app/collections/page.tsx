'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Building2, Gift, Send, CheckCircle2 } from 'lucide-react';
import { OCCASION_COLLECTIONS } from '@/lib/collections';
import { useLanguage } from '@/lib/language-context';

export default function CollectionsPage() {
  const { language } = useLanguage();

  return (
    <div className="bg-[#FAF4E8] text-[#2A1A12] min-h-screen font-body selection:bg-[#8C4E28] selection:text-[#FAF4E8]">
      {/* Editorial Header */}
      <section className="bg-[#12302B] text-[#FAF4E8] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#B8964F]/30 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#B8964F]/40 bg-[#0B1F1C] text-[#B8964F] text-xs font-serif uppercase tracking-[0.2em]">
            <span>✦</span>
            <span>{language === 'hi' ? 'अवसर एवं संस्कार संग्रह' : 'Occasion Collections'}</span>
            <span>✦</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-wide text-[#FAF4E8] leading-tight">
            {language === 'hi' ? 'जीवन के पावन उत्सव' : 'Heirlooms for Every Milestone'}
          </h1>

          <div className="kumaoni-divider my-2">
            <span className="text-[#B8964F] text-xs">✦</span>
          </div>

          <p className="text-sm sm:text-base text-[#EFE4CF]/90 max-w-xl mx-auto font-light leading-relaxed">
            {language === 'hi'
              ? 'गृह प्रवेश, विवाह संस्कार, वैदिक पूजा, नवजात शिशु एवं संस्थागत सम्मान हेतु हाथ से गढ़े गए शुद्ध ताम्रपात्र।'
              : 'Enduring gifts struck by hand to commemorate housewarmings, sacred weddings, Vedic pujas, and corporate honours.'}
          </p>
        </div>
      </section>

      {/* Occasion Cards Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {OCCASION_COLLECTIONS.map((occ) => (
            <Link
              key={occ.id}
              href={`/collections/${occ.slug}`}
              className="group bg-[#EFE4CF] rounded-3xl border border-[#B8964F]/40 overflow-hidden shadow-lg hover:shadow-2xl hover:border-[#8C4E28] transition-all flex flex-col justify-between museum-plaque"
            >
              <div>
                <div className="aspect-[16/10] overflow-hidden relative bg-[#12302B]">
                  <img
                    src={occ.image}
                    alt={occ.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12302B]/80 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-4 text-[10px] uppercase font-serif tracking-[0.25em] text-[#B8964F]">
                    Occasion Folio
                  </span>
                </div>

                <div className="p-6 space-y-3 font-serif">
                  <h3 className="text-xl text-[#12302B] font-normal group-hover:text-[#8C4E28] transition-colors">
                    {language === 'hi' ? occ.nameHi : occ.name}
                  </h3>
                  <p className="text-xs text-[#8C4E28] italic font-serif">
                    &ldquo;{language === 'hi' ? occ.taglineHi : occ.tagline}&rdquo;
                  </p>
                  <p className="text-xs text-[#2A1A12]/80 leading-relaxed font-body">
                    {language === 'hi' ? occ.descriptionHi : occ.description}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-[#B8964F]/25 flex items-center justify-between text-xs font-serif text-[#8C4E28]">
                <span>Explore ceremonial folio</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* Bulk and Corporate Orders Enquiry Form */}
        <section id="corporate-enquiry" className="bg-[#FAF4E8] rounded-3xl border-2 border-[#B8964F]/60 p-8 sm:p-12 shadow-xl space-y-8 museum-plaque">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#B8964F]/30 gap-4">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-[#8C4E28] font-sans font-semibold">
                Bespoke Atelier Volume Commissions
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#12302B]">
                Bulk & Corporate Orders Consultation
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EFE4CF] border border-[#B8964F]/40 text-xs font-serif text-[#12302B]">
              <Building2 className="w-3.5 h-3.5 text-[#8C4E28]" />
              <span>Starting from 15 units</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#2A1A12]/80 leading-relaxed max-w-2xl font-light">
            We partner with institutions, weddings, and patron organizations to craft bespoke monogrammed copperware with custom heraldic engravings and archival gift packaging.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Thank you. Your corporate inquiry has been transmitted to our Almora desk.');
            }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-serif"
          >
            <div className="space-y-1">
              <label className="text-[#2A1A12]/80 uppercase tracking-wider text-[10px]">Contact Person</label>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#EFE4CF]/60 border border-[#B8964F]/40 focus:outline-none focus:border-[#8C4E28] text-xs font-sans"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[#2A1A12]/80 uppercase tracking-wider text-[10px]">Organization / Family</label>
              <input
                type="text"
                placeholder="Company or Family Name"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#EFE4CF]/60 border border-[#B8964F]/40 focus:outline-none focus:border-[#8C4E28] text-xs font-sans"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[#2A1A12]/80 uppercase tracking-wider text-[10px]">Email Address</label>
              <input
                type="email"
                placeholder="contact@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#EFE4CF]/60 border border-[#B8964F]/40 focus:outline-none focus:border-[#8C4E28] text-xs font-sans"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[#2A1A12]/80 uppercase tracking-wider text-[10px]">WhatsApp / Phone</label>
              <input
                type="tel"
                placeholder="+91 94120 XXXXX"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#EFE4CF]/60 border border-[#B8964F]/40 focus:outline-none focus:border-[#8C4E28] text-xs font-sans"
                required
              />
            </div>

            <div className="sm:col-span-2 space-y-1">
              <label className="text-[#2A1A12]/80 uppercase tracking-wider text-[10px]">Estimated Quantity & Requirements</label>
              <textarea
                rows={3}
                placeholder="e.g. 50 Diamond Hammered Water Bottles with engraved company crest for annual patron gala..."
                className="w-full p-3.5 rounded-xl bg-[#EFE4CF]/60 border border-[#B8964F]/40 focus:outline-none focus:border-[#8C4E28] text-xs font-sans"
              />
            </div>

            <div className="sm:col-span-2 pt-2 flex items-center justify-between">
              <span className="text-[11px] text-[#4E6E58]">
                ✓ Direct consultation with Almora master smith workshop within 24 hours.
              </span>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#8C4E28] hover:bg-[#723F20] text-[#FAF4E8] uppercase tracking-widest transition-colors flex items-center gap-2 shadow"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Volume Inquiry</span>
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

