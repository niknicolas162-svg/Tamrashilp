'use client';

import React, { useState } from 'react';
import { Sparkles, RefreshCw, Info, ShieldCheck } from 'lucide-react';
import { atelierAudio } from '@/lib/audio';

const STAGES = [
  {
    id: 0,
    label: 'Stage I • Forge Bloom',
    time: 'Day 1 (Fresh)',
    title: 'Radiant Virgin Copper',
    description:
      'Directly off the wood-fire annealing pit, cleansed with organic tamarind and river sand. A warm, golden-red sheen with microscopic crystalline hammer facets.',
    colorFilter: 'hue-rotate(0deg) saturate(1.15) brightness(1.05)',
    surfaceBg: 'linear-gradient(135deg, #E29562 0%, #B26A3C 45%, #753B18 100%)',
    lore: 'At this stage, pure copper quickly ionizes standing water within 8 hours, fulfilling traditional Ayurvedic Ushapan.',
  },
  {
    id: 1,
    label: 'Stage II • The Warm Umber',
    time: 'Month 2 (Living)',
    title: 'Aged Burnished Bronze',
    description:
      'Oxygen and moisture form a protective copper(I) oxide layer. The metal deepens to a noble walnut-bronze hue, developing character unique to your hearth.',
    colorFilter: 'sepia(0.35) contrast(1.1) brightness(0.92) hue-rotate(-15deg)',
    surfaceBg: 'linear-gradient(135deg, #B27042 0%, #753E20 50%, #4A2410 100%)',
    lore: 'True connoisseurs value this living warmth; it marks authentic unlacquered metal that breathes with its surroundings.',
  },
  {
    id: 2,
    label: 'Stage III • Sacred Verdigris',
    time: 'Month 6+ (Heritage)',
    title: 'Deep Patina Green',
    description:
      'Atmospheric minerals enrich the surface into deep verdigris and temple patina (#12302B). The vessel carries the dignified look of a Himalayan temple relic.',
    colorFilter: 'sepia(0.4) saturate(1.4) hue-rotate(95deg) contrast(1.05) brightness(0.85)',
    surfaceBg: 'linear-gradient(135deg, #26594F 0%, #12302B 55%, #0B1F1C 100%)',
    lore: 'The exterior patina is chemically stable and non-porous. The interior, however, should always be kept clean with periodic lemon washing.',
  },
  {
    id: 3,
    label: 'Stage IV • The Natural Reset',
    time: 'Tamarind Wash (60 sec)',
    title: 'Instant Rebirth',
    description:
      'Rubbing with tamarind paste or lemon juice + salt dissolves the oxide layer in seconds, returning the vessel to its original day-one fiery glow.',
    colorFilter: 'hue-rotate(5deg) saturate(1.25) brightness(1.08)',
    surfaceBg: 'linear-gradient(135deg, #F2A979 0%, #C47948 45%, #8C4E28 100%)',
    lore: 'Zero harsh chemicals required. Natural citric and tartaric acids react with copper oxide to restore brilliant virgin luster.',
  },
];

export const PatinaSlider: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);

  const handleStageChange = (idx: number) => {
    setActiveStage(idx);
    atelierAudio.playHammerChime();
  };

  const current = STAGES[activeStage];

  return (
    <div className="museum-plaque bg-[#FAF4E8] p-6 sm:p-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#B8964F]/30 gap-4">
        <div>
          <span className="text-[10px] text-[#B8964F] uppercase tracking-[0.25em] font-sans">
            Interactive Lore & Metallurgy
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#12302B] mt-1">
            The Living Life of Pure Copper
          </h3>
          <p className="text-xs text-[#5C3E2C] font-light font-sans mt-0.5">
            Pure copper is alive. Experience how it naturally oxidizes and how effortlessly it restores.
          </p>
        </div>

        <button
          onClick={() => handleStageChange(3)}
          className="btn-atelier-outline px-4 py-2.5 text-[10px] tracking-widest uppercase flex items-center justify-center gap-2 w-full sm:w-auto active:scale-95 touch-manipulation"
        >
          <RefreshCw className="w-3 h-3 text-[#B8964F]" />
          <span>Simulate Tamarind Cleanse</span>
        </button>
      </div>

      {/* Main Interactive Stage Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Visual Plaque with Dynamic Filter */}
        <div className="lg:col-span-5 relative aspect-square max-w-sm mx-auto w-full overflow-hidden border-2 border-[#B8964F]/40 candle-vignette bg-[#12302B] shadow-2xl transition-all duration-700">
          <img
            src="/images/tamta/product-03.jpg"
            alt="Hand-hammered Copper Aging Simulator"
            className="w-full h-full object-cover transition-all duration-700"
            style={{ filter: current.colorFilter }}
          />

          {/* Dynamic Brass Plate Tag */}
          <div className="absolute bottom-4 left-4 right-4 bg-[#12302B]/90 backdrop-blur-md border border-[#B8964F]/60 p-3 text-center space-y-0.5">
            <span className="text-[9px] text-[#B8964F] uppercase tracking-[0.2em] font-sans">
              Surface State
            </span>
            <p className="font-serif text-sm font-normal text-[#F7F0E1]">
              {current.title} • {current.time}
            </p>
          </div>
        </div>

        {/* Narrative & Timeline Selector */}
        <div className="lg:col-span-7 space-y-6">
          {/* Stage Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-sans text-xs">
            {STAGES.map((st, idx) => (
              <button
                key={st.id}
                onClick={() => handleStageChange(idx)}
                className={`p-3 text-left border transition-all ${
                  activeStage === idx
                    ? 'border-[#B26A3C] bg-[#FAF3E8] shadow-sm ring-1 ring-[#B26A3C]'
                    : 'border-[#B8964F]/25 bg-[#FAF4E8] hover:bg-[#FAF3E8]'
                }`}
              >
                <span className="block text-[10px] text-[#8C4E28] uppercase tracking-wider font-semibold">
                  Stage 0{idx + 1}
                </span>
                <span className="font-serif text-xs font-medium text-[#12302B] block truncate mt-0.5">
                  {st.time}
                </span>
              </button>
            ))}
          </div>

          {/* Description Block */}
          <div className="p-6 bg-[#FAF3E8] border border-[#B8964F]/30 space-y-3 font-serif">
            <div className="flex items-center justify-between border-b border-[#B8964F]/20 pb-2">
              <h4 className="text-xl text-[#12302B] font-normal">{current.title}</h4>
              <span className="text-[11px] font-sans text-[#8C4E28] tracking-widest uppercase">
                {current.label}
              </span>
            </div>
            <p className="text-sm text-[#4A3223] font-light leading-relaxed">
              {current.description}
            </p>
            <div className="pt-2 flex items-start gap-2.5 font-sans text-xs text-[#6B4B35] bg-[#FAF4E8] p-3 border border-[#B8964F]/20">
              <Info className="w-4 h-4 text-[#B8964F] shrink-0 mt-0.5" />
              <p className="leading-snug">{current.lore}</p>
            </div>
          </div>

          {/* Care Fact Box */}
          <div className="flex items-center gap-3 text-xs font-sans text-[#5C3E2C] pt-2">
            <ShieldCheck className="w-4 h-4 text-[#4E6E58]" />
            <span>
              Tamrashilp vessels never use synthetic plastic varnishes. Pure copper interacts honestly with time.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

