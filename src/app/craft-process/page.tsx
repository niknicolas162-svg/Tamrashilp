'use client';

import React from 'react';
import Link from 'next/link';
import { Hammer, Sparkles, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export default function CraftProcessPage() {
  const { language, t } = useLanguage();

  const sixSteps = [
    {
      num: 'I',
      stepName: 'Cut',
      title: 'Virgin Ingot Calibrated Slicing',
      titleHi: 'कटाई: समतल चादर',
      desc: 'Beaten from a single circular sheet of 99.2% virgin electrolytic copper. We never melt secondary scrap wire or lead alloys. Calibrated to 3.2mm for heavy culinary cookware, and 1.2mm for hydration carafes.',
      image: '/images/tamta/process-01.jpg',
    },
    {
      num: 'II',
      stepName: 'Beat',
      title: 'Horn-Anvil Seamless Raising',
      titleHi: 'ढलाई: निहाई पर उभारना',
      desc: 'The smith strikes the flat disc from the center outward over tapered steel stakes called sabals. Over thousands of deliberate blows, the cold disc raises into a spherical belly with zero weld seams.',
      image: '/images/tamta/process-03.jpg',
    },
    {
      num: 'III',
      stepName: 'Fire',
      title: 'Oak Charcoal Hearth Annealing',
      titleHi: 'तापन: कोयले की भट्टी',
      desc: 'Repeated striking hardens copper until brittle. To restore atomic ductility, the vessel is fired to a cherry-red 650°C over oak charcoal embers, then quenched in icy mountain water.',
      image: '/images/tamta/tool-04.jpg',
    },
    {
      num: 'IV',
      stepName: 'Shape & Chasing',
      title: 'The Signature Chitai Stipple Strike & Hand-Chasing',
      titleHi: 'छिताई: हथौड़े और छेनी की बारीक नक्काशी',
      desc: 'Over 2,400 rhythmic blows with a rounded ball-peen hammer and cold-chisel punches cover the vessel. Each blow work-hardens the metal grain, giving the piece its reflective stippled warmth and generational durability.',
      image: '/images/artisan-chasing-copper.jpg',
    },
    {
      num: 'V',
      stepName: 'Braze & Tin',
      title: 'Traditional Pure Kalai Over Embers',
      titleHi: 'कलाई: शुद्ध टिन कोटिंग',
      desc: 'For culinary pots, molten 99.9% food-grade tin is wiped inside over sal-ammoniac powder. The silvery tin bonds permanently with the red copper, allowing safe cooking of acidic gravies and curds.',
      image: '/images/tamta/process-04.jpg',
    },
    {
      num: 'VI',
      stepName: 'Polish',
      title: 'Mountain Tamarind & River Sand Wash',
      titleHi: 'सफाई: प्राकृतिक इमली और रेत',
      desc: 'No synthetic lacquers or chemicals touch the interior. Tamarind pulp, wood ash, and fine river sand strip the annealing scale, revealing the quiet, deep golden fire of genuine Kumaoni copper.',
      image: '/images/tamta/intro-06.jpg',
    },
  ];

  return (
    <div className="bg-parchment-texture text-walnut-900 py-12 sm:py-20 font-body">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-widest2 text-brass-700 font-sans font-semibold">
            The Ancestral Anvil
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-walnut-950">
            The Making
          </h1>
          <div className="kumaoni-divider my-2">
            <span className="text-brass-600 text-xs">✦</span>
          </div>
          <p className="text-xs sm:text-sm text-walnut-800 leading-relaxed max-w-lg mx-auto">
            Six disciplined ceremonies through which unformed virgin copper becomes a generational heirloom.
          </p>
        </div>

        {/* Master Anvil Film Document */}
        <div className="bg-patina-atelier text-ivory rounded-3xl p-6 sm:p-10 border border-brass-600/40 museum-plaque-dark space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-brass-600/30 pb-4">
            <div>
              <span className="text-[10px] uppercase tracking-widest2 text-brass-400 font-sans font-semibold">
                Living Archive • Almora Workshop
              </span>
              <h2 className="font-serif text-xl sm:text-2xl text-ivory font-normal">
                The Rhythm of the Forge
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 text-xs text-brass-300 font-serif">
              <Sparkles className="w-3.5 h-3.5 text-brass-400" />
              <span>Authentic Coppersmith Documentation</span>
            </div>
          </div>
          <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black/60 border border-brass-500/30 candle-vignette shadow-2xl">
            <video
              src="/videos/intro-craft.mp4"
              controls
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-xs sm:text-sm text-parchment-300 font-body leading-relaxed">
            Witness the continuous rhythm of the horn anvil: where thousand-year-old muscle memory turns a flat disk of 99.2% virgin copper into an acoustically resonant heirloom without a single machine weld.
          </p>
        </div>

        {/* Vertical Scroll Story */}
        <div className="space-y-16 sm:space-y-24">
          {sixSteps.map((step, idx) => (
            <article
              key={step.num}
              className="bg-parchment-100 rounded-3xl overflow-hidden border border-brass-600/35 museum-plaque space-y-6 p-6 sm:p-10"
            >
              <div className="flex items-center justify-between border-b border-brass-600/20 pb-4">
                <span className="wax-seal text-xs font-serif px-3.5 py-1 rounded-full uppercase tracking-atelier font-bold">
                  Ceremony {step.num}: {step.stepName}
                </span>
                <span className="text-[11px] font-sans uppercase tracking-widest text-brass-700">
                  Step {idx + 1} of 6
                </span>
              </div>

              <div className="relative aspect-16/10 rounded-2xl overflow-hidden candle-vignette bg-patina-950">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover sepia-[0.15] contrast-[1.04]"
                />
              </div>

              <div className="space-y-2 pt-2">
                <h3 className="font-serif text-2xl sm:text-3xl text-walnut-950 font-normal">
                  {language === 'hi' ? step.titleHi : step.title}
                </h3>
                <p className="drop-cap text-sm sm:text-base text-walnut-900 leading-relaxed font-body">
                  {step.desc}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Closing Atelier Note */}
        <div className="bg-patina-atelier text-ivory rounded-3xl p-8 sm:p-12 text-center space-y-4 museum-plaque-dark">
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-ivory">
            Handled by Generations to Come
          </h2>
          <p className="text-xs sm:text-sm text-parchment-300 max-w-lg mx-auto font-body">
            Every piece is certified free of toxic heavy metals, tested under NABL metallurgy protocols, and backed by our lifelong artisan repair and re-kalai service.
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-block px-8 py-3 rounded-lg btn-atelier text-xs tracking-atelier"
            >
              Explore the Permanent Collection
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
