'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Hammer, Award, ShieldCheck, MapPin, Sparkles, Flame, CheckCircle2, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { getSiteSettings, formatArtisanProvenance, SiteSettings } from '@/lib/siteSettings';
import { PRODUCTS } from '@/lib/mockData';

export default function MasterCraftsmanPage() {
  const { language } = useLanguage();
  const [settings, setSettings] = useState<SiteSettings>(getSiteSettings());

  useEffect(() => {
    setSettings(getSiteSettings());
    const handleUpdate = () => setSettings(getSiteSettings());
    window.addEventListener('tamtashilp:settings_updated', handleUpdate);
    return () => window.removeEventListener('tamtashilp:settings_updated', handleUpdate);
  }, []);

  const signaturePieces = PRODUCTS.slice(0, 3);

  // Person schema for SEO
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: settings.artisan_name,
    jobTitle: 'Master Coppersmith',
    worksFor: {
      '@type': 'Organization',
      name: 'Tamrashilp Atelier',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Tamta Mohalla',
      addressLocality: 'Almora',
      addressRegion: 'Uttarakhand',
      addressCountry: 'IN',
    },
    knowsAbout: [
      'Hand-hammered copperware',
      'Horn-anvil raising',
      'Traditional Kalai tinning',
      'Vedic Ushapan vessels',
    ],
  };

  return (
    <div className="bg-[#FAF4E8] text-[#2A1A12] min-h-screen font-body selection:bg-[#8C4E28] selection:text-[#FAF4E8]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      {/* Hero Header */}
      <section className="bg-[#12302B] text-[#FAF4E8] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#B8964F]/30 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#B8964F]/40 bg-[#0B1F1C] text-[#B8964F] text-xs font-serif uppercase tracking-[0.2em]">
            <span>✦</span>
            <span>{language === 'hi' ? 'एकमात्र मुख्य शिल्पकार' : 'The Master Craftsman'}</span>
            <span>✦</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-wide text-[#FAF4E8] leading-tight">
            {settings.artisan_name}
          </h1>

          <div className="kumaoni-divider my-2">
            <span className="text-[#B8964F] text-xs">✦</span>
          </div>

          <p className="text-sm sm:text-base text-[#EFE4CF]/90 max-w-xl mx-auto font-light leading-relaxed">
            {formatArtisanProvenance(settings, language)}
          </p>
        </div>
      </section>

      {/* Main Editorial Presentation */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-16">
        {/* Profile Card with Consent Check */}
        <div className="bg-[#EFE4CF] rounded-3xl p-6 sm:p-10 border border-[#B8964F]/40 shadow-xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center museum-plaque">
          {/* Portrait or Styled Placeholder */}
          <div className="md:col-span-5 flex flex-col items-center">
            {settings.has_photo_consent && settings.photo_url ? (
              <div className="relative group text-center">
                <div className="w-64 h-80 sm:w-72 sm:h-96 md:w-80 md:h-[420px] rounded-2xl overflow-hidden border-2 border-[#B8964F]/80 shadow-2xl bg-[#12302B] transition-transform duration-500 group-hover:scale-[1.02]">
                  <img
                    src={settings.photo_url}
                    alt={settings.artisan_name}
                    className="w-full h-full object-cover object-top filter contrast-[1.03]"
                  />
                </div>
                <p className="text-[10px] text-[#2A1A12]/70 font-serif text-center mt-3 max-w-[280px] leading-relaxed mx-auto">
                  {settings.photo_credit}
                </p>
              </div>
            ) : (
              /* Styled Museum Placeholder Slot when consent is pending */
              <div className="w-56 h-72 sm:w-64 sm:h-80 rounded-2xl border-2 border-dashed border-[#B8964F]/70 bg-[#12302B]/10 flex flex-col items-center justify-center p-6 text-center space-y-3">
                <div className="wax-seal w-12 h-12 rounded-full flex items-center justify-center text-xs text-[#FAF4E8] font-serif">
                  DKT
                </div>
                <span className="font-serif text-sm text-[#12302B] font-medium">
                  {settings.artisan_name}
                </span>
                <p className="text-[11px] text-[#8C4E28] font-serif leading-relaxed">
                  [Archival portrait slot: display subject to verified artisan consent registry]
                </p>
              </div>
            )}
          </div>

          {/* Pedigree & Atelier Facts */}
          <div className="md:col-span-7 space-y-5">
            <div className="space-y-1.5 border-b border-[#B8964F]/30 pb-4">
              <span className="text-[10px] uppercase font-serif tracking-[0.2em] text-[#8C4E28]">
                Lineage & Provenance
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#12302B]">
                Keeper of the Almora Anvil
              </h2>
            </div>

            <p className="text-sm leading-relaxed text-[#2A1A12]/90 font-light">
              In the steep stone alleys of Tamta Mohalla, Almora, copper has been hand-raised over iron stakes since the reign of the Chand kings in the 15th century. {settings.artisan_name} carries forward this unbroken lineage without mechanical stamping dies or toxic synthetic varnishes.
            </p>

            {/* Atelier Vitals */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-serif">
              <div className="p-3 rounded-xl bg-[#FAF4E8] border border-[#B8964F]/30 space-y-1">
                <div className="flex items-center gap-1.5 text-[#8C4E28]">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="font-semibold text-[11px] uppercase tracking-wider">Hearth Village</span>
                </div>
                <p className="text-[#2A1A12] font-medium">Tamta Mohalla, Almora</p>
                <p className="text-[10px] text-[#2A1A12]/70">Uttarakhand, 263601</p>
              </div>

              <div className="p-3 rounded-xl bg-[#FAF4E8] border border-[#B8964F]/30 space-y-1">
                <div className="flex items-center gap-1.5 text-[#8C4E28]">
                  <Hammer className="w-3.5 h-3.5" />
                  <span className="font-semibold text-[11px] uppercase tracking-wider">Mastery Method</span>
                </div>
                <p className="text-[#2A1A12] font-medium">Horn-Anvil Raising</p>
                <p className="text-[10px] text-[#2A1A12]/70">Oak charcoal annealing</p>
              </div>
            </div>

            <div className="pt-2 text-xs text-[#4E6E58] font-serif flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Sole designated artisan crafting all Tamrashilp catalog pieces.</span>
            </div>
          </div>
        </div>

        {/* Short Interview & Lore (Clearly marked with placeholder tag) */}
        <div className="space-y-8 font-serif">
          <div className="text-center space-y-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C4E28]">
              From the Anvil Desk
            </span>
            <h2 className="text-2xl sm:text-3xl text-[#12302B]">
              Conversations in the Mountain Forge
            </h2>
            <p className="text-xs text-[#8C4E28] font-sans italic">
              [Note: Biographical anecdotes and transcripts below to be formally confirmed by Devendra Kumar Tamta]
            </p>
          </div>

          <div className="space-y-6">
            {/* Conversation 1 */}
            <div className="bg-[#FAF4E8] p-6 sm:p-8 rounded-2xl border border-[#B8964F]/30 space-y-3 museum-plaque">
              <h3 className="text-lg text-[#12302B] font-medium">
                1. How does a single sheet of flat copper become a curved vessel?
              </h3>
              <p className="text-sm leading-relaxed text-[#2A1A12]/80 font-body">
                &ldquo;We never use machine presses that stretch and thin the metal. Every vessel starts as a circular virgin sheet. We heat it red-hot over oak charcoal embers until it glows cherry red, quench it in cold mountain water, and begin raising the walls over an iron stake. Each hammer strike pushes the grain inward, making the belly dense and resonant.&rdquo;
              </p>
              <span className="text-[11px] text-[#8C4E28] block pt-1">
                — Devendra Kumar Tamta [to be confirmed by Devendra Kumar Tamta]
              </span>
            </div>

            {/* Conversation 2 */}
            <div className="bg-[#FAF4E8] p-6 sm:p-8 rounded-2xl border border-[#B8964F]/30 space-y-3 museum-plaque">
              <h3 className="text-lg text-[#12302B] font-medium">
                2. Why are the diamond hammer marks (Chitai) left visible?
              </h3>
              <p className="text-sm leading-relaxed text-[#2A1A12]/80 font-body">
                &ldquo;Modern factories buff their metals paper-thin with machines to make them glossy like plastic. In our tradition, the faceted hammer mark—the Chitai—is both armor and fingerprint. It work-hardens the surface so the vessel resists dents for sixty or seventy years, while proving to any patron that human hands held the hammer.&rdquo;
              </p>
              <span className="text-[11px] text-[#8C4E28] block pt-1">
                — Devendra Kumar Tamta [to be confirmed by Devendra Kumar Tamta]
              </span>
            </div>

            {/* Conversation 3 */}
            <div className="bg-[#FAF4E8] p-6 sm:p-8 rounded-2xl border border-[#B8964F]/30 space-y-3 museum-plaque">
              <h3 className="text-lg text-[#12302B] font-medium">
                3. What is the traditional Kalai (tinning) process for cookware?
              </h3>
              <p className="text-sm leading-relaxed text-[#2A1A12]/80 font-body">
                &ldquo;Pure copper must never cook sour foods directly. For our kadhais and handis, we fire the pot over live embers, apply sal-ammoniac powder (nausadar) to purify the metal, and rub molten pure 99.9% tin by hand using a cotton pad. When done right, it forms an imperishable mirror that keeps lentils and curries entirely pure.&rdquo;
              </p>
              <span className="text-[11px] text-[#8C4E28] block pt-1">
                — Devendra Kumar Tamta [to be confirmed by Devendra Kumar Tamta]
              </span>
            </div>
          </div>
        </div>

        {/* Signature Heirlooms Forged by Devendra Kumar Tamta */}
        <div className="space-y-6 pt-6 border-t border-[#B8964F]/30">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-serif tracking-[0.2em] text-[#8C4E28]">
                Curated by the Smith
              </span>
              <h2 className="font-serif text-2xl text-[#12302B]">
                Signature Anvil Pieces
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs text-[#8C4E28] hover:text-[#723F20] font-serif flex items-center gap-1 hover:underline"
            >
              <span>Explore full atelier collection</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {signaturePieces.map((p) => (
              <Link
                key={p.id}
                href={`/product/${p.slug}`}
                className="group bg-[#FAF4E8] rounded-2xl border border-[#B8964F]/30 overflow-hidden hover:border-[#8C4E28] transition-all flex flex-col"
              >
                <div className="aspect-square bg-[#EFE4CF] overflow-hidden">
                  <img
                    src={p.images[0]}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between font-serif">
                  <div>
                    <h3 className="text-sm font-medium text-[#12302B] group-hover:text-[#8C4E28] transition-colors truncate">
                      {p.title}
                    </h3>
                    <p className="text-[11px] text-[#2A1A12]/70 font-sans">
                      {formatArtisanProvenance(settings, language)}
                    </p>
                  </div>
                  <p className="text-xs font-semibold text-[#8C4E28] pt-1">
                    ₹{p.basePrice.toLocaleString('en-IN')}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Assurance Banner */}
        <div className="bg-[#12302B] text-[#FAF4E8] rounded-2xl p-6 sm:p-8 border border-[#B8964F]/40 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-serif">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base text-[#FAF4E8] font-normal">
              Have an heirloom question for the workshop?
            </h4>
            <p className="text-[#EFE4CF]/80">
              Message our Almora desk directly via WhatsApp for provenance confirmation or custom anvil commissions.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-6 py-2.5 rounded-xl bg-[#8C4E28] hover:bg-[#723F20] text-[#FAF4E8] uppercase tracking-widest shrink-0 transition-colors shadow"
          >
            Contact Master Artisan
          </Link>
        </div>
      </div>
    </div>
  );
}
