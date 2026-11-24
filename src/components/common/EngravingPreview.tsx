'use client';

import React, { useState } from 'react';
import { Hammer, Sparkles, Check } from 'lucide-react';
import { atelierAudio } from '@/lib/audio';

interface EngravingPreviewProps {
  initialText?: string;
  onApply?: (text: string, cost?: number) => void;
}

export const EngravingPreview: React.FC<EngravingPreviewProps> = ({
  initialText = 'RAWAT • HEIRLOOM • 2026',
  onApply,
}) => {
  const [text, setText] = useState(initialText);
  const [script, setScript] = useState<'ROMAN' | 'DEVANAGARI'>('ROMAN');
  const [copied, setCopied] = useState(false);

  const RATE_PER_CHAR = 15;
  const charCount = text.length;
  const totalCost = charCount * RATE_PER_CHAR;

  const presets = [
    { label: 'Family Heirloom', roman: 'THE JOSHI HEIRLOOM', hi: 'जोशी परिवार • परम्परा' },
    { label: 'Sacred Mantra', roman: 'OM NAMAH SHIVAYA', hi: 'ॐ नमः शिवाय' },
    { label: 'Wedding Endowment', roman: 'A & M • ESTD. 2026', hi: 'शुभ विवाह • २०२६' },
  ];

  const handlePreset = (preset: { roman: string; hi: string }) => {
    setText(script === 'ROMAN' ? preset.roman : preset.hi);
    atelierAudio.playAnvilStrike();
  };

  const handleApply = () => {
    if (onApply) onApply(text, totalCost);
    atelierAudio.playHammerChime();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="museum-plaque bg-[#FAF4E8] p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#B8964F]/30 gap-3">
        <div>
          <span className="text-[10px] text-[#B8964F] uppercase tracking-[0.25em] font-sans">
            Artisan Chisel Commission
          </span>
          <h4 className="font-serif text-xl sm:text-2xl font-normal text-[#12302B]">
            Interactive Heraldic Inscription
          </h4>
        </div>

        <div className="flex items-center gap-2 font-sans text-xs">
          <button
            onClick={() => {
              setScript('ROMAN');
              setText('RAWAT • HEIRLOOM • 2026');
            }}
            className={`px-3 py-1 text-[11px] uppercase tracking-wider border ${
              script === 'ROMAN'
                ? 'border-[#B26A3C] bg-[#FAF3E8] text-[#8C4E28] font-bold'
                : 'border-[#B8964F]/30 text-[#6B4B35]'
            }`}
          >
            Serif Roman
          </button>
          <button
            onClick={() => {
              setScript('DEVANAGARI');
              setText('शुभ लाभ • अल्मोड़ा');
            }}
            className={`px-3 py-1 text-[11px] uppercase tracking-wider border ${
              script === 'DEVANAGARI'
                ? 'border-[#B26A3C] bg-[#FAF3E8] text-[#8C4E28] font-bold'
                : 'border-[#B8964F]/30 text-[#6B4B35]'
            }`}
          >
            देवनागरी
          </button>
        </div>
      </div>

      {/* Visual Chasing Showcase & Live Plaque Display */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* The Master's Hands on the Anvil */}
        <div className="md:col-span-5 relative aspect-square rounded-2xl overflow-hidden border border-[#B8964F]/40 candle-vignette shadow-lg group">
          <img
            src="/images/artisan-chasing-copper.jpg"
            alt="Master Tamta Coppersmith hand-chiseled stippling on copper plate"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute bottom-3 left-3 right-3 bg-[#12302B]/90 backdrop-blur-sm border border-[#B8964F]/50 p-2.5 text-center">
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#B8964F] block font-sans">
              Tamta Mohalla Anvil
            </span>
            <p className="font-serif text-xs text-[#F7F0E1]">
              Cold-Chiseled Stipple & Inscription
            </p>
          </div>
        </div>

        {/* Live Chiseled Copper Plaque Display */}
        <div className="md:col-span-7 space-y-4">
          <div className="relative p-8 sm:p-10 hammered-copper-surface border-2 border-[#B8964F] shadow-2xl flex flex-col items-center justify-center text-center min-h-[170px] overflow-hidden rounded-xl">
            {/* Subtle decorative inner brass border */}
            <div className="absolute inset-2 border border-[#B8964F]/40 pointer-events-none rounded-lg"></div>

            {/* Chiseled debossed text */}
            <p
              className="text-xl sm:text-2xl font-semibold uppercase tracking-[0.22em] font-serif"
              style={{
                color: '#3B1C0B',
                textShadow: '0 1px 1px rgba(255, 230, 200, 0.6), 0 -1px 1px rgba(10, 5, 2, 0.8)',
              }}
            >
              {text || 'YOUR INSCRIPTION HERE'}
            </p>

            <span className="text-[9px] uppercase tracking-[0.25em] text-[#F7F0E1]/85 mt-3 font-sans">
              Hand-chiseled with hardened steel burin in Almora
            </span>
          </div>

          <p className="text-[11px] text-[#5C3E2C] font-light leading-relaxed font-sans">
            Every letter is physically punched and stippled into virgin copper using hand-held steel stakes and a light brass hammer.
          </p>
        </div>
      </div>

      {/* Input & Presets */}
      <div className="space-y-4 font-sans text-xs">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs uppercase tracking-wider text-[#4A3223]">
              Type Custom Crest, Monogram, or Name (Max 36 Characters)
            </label>
            <span className="text-xs text-[#8C4E28] font-bold">
              ₹15 / char • Total: ₹{totalCost}
            </span>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              maxLength={36}
              value={text}
              onChange={(e) => setText(e.target.value.toUpperCase())}
              placeholder="e.g. THE AGRAWAL HEIRLOOM • 2026"
              className="flex-1 bg-[#EFE4CF]/70 border border-[#B8964F]/50 p-3 text-xs text-[#2A1A12] focus:outline-none focus:border-[#8C4E28]"
            />
            <button
              onClick={handleApply}
              className="btn-atelier px-5 py-3 text-xs tracking-wider uppercase flex items-center gap-1.5 shrink-0"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Hammer className="w-3.5 h-3.5" />}
              <span>{copied ? 'Engraving Added' : 'Add engraving'}</span>
            </button>
          </div>
        </div>

        {/* Preset chips */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[#8C4E28] uppercase tracking-wider font-semibold">Examples:</span>
            {presets.map((p, i) => (
              <button
                key={i}
                onClick={() => handlePreset(p)}
                className="px-2.5 py-1 bg-[#FAF3E8] hover:bg-[#FAF4E8] border border-[#B8964F]/30 text-[#4A3223] transition-colors rounded"
              >
                {p.label}
              </button>
            ))}
          </div>

          <span className="text-[10px] text-[#2A1A12]/60 font-serif italic">
            Saved to order upon checkout
          </span>
        </div>
      </div>
    </div>
  );
};

