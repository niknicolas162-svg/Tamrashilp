'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, XCircle, ShieldCheck, Hammer, Sparkles, Scale, Volume2 } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export default function AuthenticityGuidePage() {
  const { language } = useLanguage();

  const COMPARISONS = [
    {
      feature: 'Hammer Facets (Chitai)',
      authentic: 'Each facet is distinct, slightly irregular, and pressed by human hand blows that work-harden the copper crystal structure.',
      pressed: 'Uniform, shallow dots produced by automated pneumatic roller stamps with perfectly repeating mechanical grids.',
    },
    {
      feature: 'Weight & Gauge Density',
      authentic: 'Substantial heft (360g - 1,200g+). Metal is thickest at base and belly for thermal balance and lifetime dent resistance.',
      pressed: 'Paper-thin stretched foil (often under 200g). Dents with slight finger pressure and easily punctures.',
    },
    {
      feature: 'Acoustic Resonance',
      authentic: 'Deep, lingering bronze-like chime when struck gently with wood, due to crystalline annealing over oak charcoal.',
      pressed: 'Thin, dull, hollow clatter with zero harmonic sustain caused by cold machine strain.',
    },
    {
      feature: 'Seam Construction',
      authentic: 'Hand-raised from a single circular virgin ingot disc. Seamless, zero side welds or solder seams.',
      pressed: 'Often rolled from a sheet and welded longitudinally with visible seams ground down under polishing wheels.',
    },
    {
      feature: 'Surface Finish & Varnish',
      authentic: 'Pure virgin copper buffed with tamarind and wood ash. Never coated with synthetic plastic varnish. Breathes freely.',
      pressed: 'Sprayed with synthetic polyurethane clear-coat to keep artificial shine, which peels and flakes into drinking water over time.',
    },
    {
      feature: 'Tin Lining (Kalai)',
      authentic: 'Lined by hand over live charcoal with 99.9% pure molten food-grade tin and sal-ammoniac flux. Silvery, organic surface.',
      pressed: 'Electro-plated thin wash or industrial tinning containing lead and cadmium solder residues.',
    },
  ];

  return (
    <div className="bg-[#FAF4E8] text-[#2A1A12] min-h-screen font-body selection:bg-[#8C4E28] selection:text-[#FAF4E8]">
      {/* Header */}
      <section className="bg-[#12302B] text-[#FAF4E8] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#B8964F]/30 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
          <Link
            href="/care"
            className="inline-flex items-center gap-1.5 text-xs text-[#B8964F] hover:text-[#FAF4E8] font-serif transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Care & Maintenance Hub</span>
          </Link>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#B8964F]/40 bg-[#0B1F1C] text-[#B8964F] text-xs font-serif uppercase tracking-[0.2em] block mx-auto w-fit">
            <span>✦</span>
            <span>Craft Discrimination Guide</span>
            <span>✦</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-wide text-[#FAF4E8] leading-tight">
            How to Tell Hand-Beaten from Machine-Pressed Copper
          </h1>

          <div className="kumaoni-divider my-2">
            <span className="text-[#B8964F] text-xs">✦</span>
          </div>

          <p className="text-sm sm:text-base text-[#EFE4CF]/90 max-w-xl mx-auto font-light leading-relaxed">
            Six sensory tests to authenticate true mountain coppersmith work from industrialized die-pressings.
          </p>
        </div>
      </section>

      {/* Comparison Grid */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-12">
        <div className="bg-[#EFE4CF] rounded-3xl border border-[#B8964F]/40 overflow-hidden shadow-xl museum-plaque divide-y divide-[#B8964F]/25">
          {/* Header Row */}
          <div className="p-6 bg-[#0B1F1C] text-[#FAF4E8] grid grid-cols-1 md:grid-cols-12 gap-4 font-serif text-xs uppercase tracking-widest text-[#B8964F]">
            <div className="md:col-span-3">Craft Hallmark</div>
            <div className="md:col-span-5 text-[#FAF4E8]">Authentic Tamta Anvil Craft</div>
            <div className="md:col-span-4 text-red-300">Industrial Factory Pressing</div>
          </div>

          {/* Comparison Rows */}
          {COMPARISONS.map((row, idx) => (
            <div key={idx} className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-start text-xs font-body">
              <div className="md:col-span-3 font-serif font-bold text-sm text-[#12302B]">
                {row.feature}
              </div>

              <div className="md:col-span-5 space-y-1.5 p-3 rounded-xl bg-[#FAF4E8] border border-[#4E6E58]/40">
                <div className="flex items-center gap-1.5 text-[#4E6E58] font-serif font-semibold text-[11px] uppercase tracking-wider">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Generational Handcraft</span>
                </div>
                <p className="text-[#2A1A12]/90 leading-relaxed font-light">{row.authentic}</p>
              </div>

              <div className="md:col-span-4 space-y-1.5 p-3 rounded-xl bg-red-50/50 border border-red-200">
                <div className="flex items-center gap-1.5 text-red-700 font-serif font-semibold text-[11px] uppercase tracking-wider">
                  <XCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>Factory Machine Stamp</span>
                </div>
                <p className="text-red-950/80 leading-relaxed font-light">{row.pressed}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-[#FAF4E8] rounded-2xl p-8 border border-[#B8964F]/40 text-center space-y-4 museum-plaque">
          <h3 className="font-serif text-2xl text-[#12302B]">
            Examine our verified virgin pieces
          </h3>
          <p className="text-xs text-[#2A1A12]/80 max-w-md mx-auto">
            Every Tamrashilp utensil comes with its individual numbered provenance certificate and genuine charcoal annealing.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/shop"
              className="btn-atelier px-6 py-2.5 text-xs uppercase tracking-widest inline-block"
            >
              Shop Hand-Beaten Heirlooms
            </Link>
            <Link
              href="/authenticity"
              className="text-xs text-[#8C4E28] hover:underline font-serif"
            >
              Read Provenance Protocol →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

