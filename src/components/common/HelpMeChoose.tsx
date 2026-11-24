'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Compass, CheckCircle2, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export const HelpMeChoose: React.FC = () => {
  const { language } = useLanguage();
  const router = useRouter();

  const [useCase, setUseCase] = useState<string>('water');
  const [finish, setFinish] = useState<string>('hammered');
  const [capacity, setCapacity] = useState<string>('1L');

  const useOptions = [
    {
      id: 'water',
      label: 'Daily Hydration & Ushapan',
      labelHi: 'दैनिक जल एवं उषापान',
      desc: 'Pure unlined copper for dawn hydration and resting water',
      category: 'water-bottles-jugs',
    },
    {
      id: 'cookware',
      label: 'Culinary & Cooking',
      labelHi: 'पारंपरिक भोजन पकाना',
      desc: 'Pure tin-lined (Kalai) pots safe for simmering & gravies',
      category: 'cookware',
    },
    {
      id: 'pooja',
      label: 'Sacred Rituals & Tableware',
      labelHi: 'पूजा एवं आतिथ्य',
      desc: 'Aarti thalis, havan patras, and celebratory carafes',
      category: 'pooja-items',
    },
  ];

  const finishOptions = [
    {
      id: 'hammered',
      label: 'Chitai Honeycomb Hammered',
      labelHi: 'छिताई हथौड़ा नक्काशी',
      desc: 'Over 2,400 rhythmic blows for diamond light dispersion',
    },
    {
      id: 'smooth',
      label: 'Heritage Satin Smooth',
      labelHi: 'सैटिन चिकनाई',
      desc: 'Gentle hand-burnished surface showcasing raw copper tone',
    },
    {
      id: 'kalai',
      label: 'Silver-Tinned Interior (Kalai)',
      labelHi: 'शुद्ध रांगा कलाई लेप',
      desc: 'Traditional 99.9% food-grade tin lining inside',
    },
  ];

  const capacityOptions = [
    {
      id: '1L',
      label: 'Personal (500ml – 1000ml)',
      labelHi: 'व्यक्तिगत (500ml - 1 लीटर)',
      desc: 'Ideal for bedside carafes and daily hydration bottles',
    },
    {
      id: '2L',
      label: 'Family Hearth (1.5L – 3L)',
      labelHi: 'पारिवारिक (1.5 - 3 लीटर)',
      desc: 'Dining table jugs, water dispensers, and kadhais',
    },
    {
      id: '5L',
      label: 'Ceremonial & Feast (5L+)',
      labelHi: 'उत्सव व अनुष्ठान (5 लीटर+)',
      desc: 'Traditional mountain cauldrons (Charu) and storage urns',
    },
  ];

  const handleFindVessels = () => {
    const selectedUse = useOptions.find((u) => u.id === useCase);
    const categoryParam = selectedUse ? selectedUse.category : 'water-bottles-jugs';
    router.push(`/shop?category=${categoryParam}&finish=${finish}&capacity=${capacity}`);
  };

  const handleReset = () => {
    setUseCase('water');
    setFinish('hammered');
    setCapacity('1L');
  };

  return (
    <div className="bg-[#FAF4E8] rounded-3xl border border-[#B8964F]/50 p-6 sm:p-10 lg:p-12 shadow-xl museum-plaque text-[#2A1A12] max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 pb-8 border-b border-[#B8964F]/30">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#B8964F]/40 bg-[#EFE4CF] text-[#8C4E28] text-xs font-serif uppercase tracking-[0.2em] font-medium">
          <Compass className="w-3.5 h-3.5 text-[#8C4E28]" />
          <span>{language === 'hi' ? 'पात्र चयन निर्देशिका' : 'Diagnostic Guide'}</span>
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#12302B]">
          {language === 'hi' ? 'अपने लिए उपयुक्त ताम्रपात्र चुनें' : 'Help Me Choose'}
        </h3>

        <p className="text-xs sm:text-sm text-[#2A1A12]/80 leading-relaxed max-w-lg mx-auto font-body">
          {language === 'hi'
            ? 'तीन सरल प्रश्नों के उत्तर दें और अपनी आवश्यकताओं के अनुसार शुद्ध टम्टा ताम्रपात्र खोजें।'
            : 'Answer three quiet questions to find the handcrafted vessel tuned to your hearth, daily wellness, and culinary rituals.'}
        </p>
      </div>

      {/* 3 Questions Grid */}
      <div className="py-8 space-y-8">
        {/* Question 1: Purpose & Use */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-[0.2em] text-[#8C4E28] font-sans font-semibold">
              Step 1 • {language === 'hi' ? 'उपयोग का उद्देश्य' : 'Primary Purpose'}
            </span>
            <span className="text-xs text-[#2A1A12]/60 font-serif italic">
              {language === 'hi' ? 'जल, भोजन या पूजा' : 'Hydration, Cooking or Ritual'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {useOptions.map((opt) => {
              const isSelected = useCase === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setUseCase(opt.id)}
                  className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between min-h-[96px] ${
                    isSelected
                      ? 'border-[#8C4E28] bg-[#EFE4CF] shadow-md ring-1 ring-[#8C4E28]'
                      : 'border-[#B8964F]/30 bg-[#FAF4E8] hover:border-[#8C4E28]/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-serif text-sm font-semibold text-[#12302B]">
                      {language === 'hi' ? opt.labelHi : opt.label}
                    </span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-[#8C4E28] shrink-0 mt-0.5" />}
                  </div>
                  <p className="text-[11px] text-[#2A1A12]/75 font-body mt-1 leading-snug">
                    {opt.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Question 2: Surface Finish */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-[0.2em] text-[#8C4E28] font-sans font-semibold">
              Step 2 • {language === 'hi' ? 'हथौड़ा फिनिश' : 'Surface Finish'}
            </span>
            <span className="text-xs text-[#2A1A12]/60 font-serif italic">
              {language === 'hi' ? 'निहाई की छिताई नक्काशी' : 'Anvil Stipple & Chasing'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {finishOptions.map((opt) => {
              const isSelected = finish === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setFinish(opt.id)}
                  className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between min-h-[96px] ${
                    isSelected
                      ? 'border-[#8C4E28] bg-[#EFE4CF] shadow-md ring-1 ring-[#8C4E28]'
                      : 'border-[#B8964F]/30 bg-[#FAF4E8] hover:border-[#8C4E28]/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-serif text-sm font-semibold text-[#12302B]">
                      {language === 'hi' ? opt.labelHi : opt.label}
                    </span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-[#8C4E28] shrink-0 mt-0.5" />}
                  </div>
                  <p className="text-[11px] text-[#2A1A12]/75 font-body mt-1 leading-snug">
                    {opt.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Question 3: Capacity / Volume */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-[0.2em] text-[#8C4E28] font-sans font-semibold">
              Step 3 • {language === 'hi' ? 'पात्र की क्षमता' : 'Volume & Capacity'}
            </span>
            <span className="text-xs text-[#2A1A12]/60 font-serif italic">
              {language === 'hi' ? 'व्यक्तिगत से उत्सव तक' : 'Personal to Feast Size'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {capacityOptions.map((opt) => {
              const isSelected = capacity === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setCapacity(opt.id)}
                  className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between min-h-[96px] ${
                    isSelected
                      ? 'border-[#8C4E28] bg-[#EFE4CF] shadow-md ring-1 ring-[#8C4E28]'
                      : 'border-[#B8964F]/30 bg-[#FAF4E8] hover:border-[#8C4E28]/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-serif text-sm font-semibold text-[#12302B]">
                      {language === 'hi' ? opt.labelHi : opt.label}
                    </span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-[#8C4E28] shrink-0 mt-0.5" />}
                  </div>
                  <p className="text-[11px] text-[#2A1A12]/75 font-body mt-1 leading-snug">
                    {opt.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-6 border-t border-[#B8964F]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 text-xs text-[#2A1A12]/70 hover:text-[#8C4E28] font-serif transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{language === 'hi' ? 'पुनः चयन करें' : 'Reset selections'}</span>
        </button>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Link
            href="/care"
            className="text-xs font-serif text-[#8C4E28] hover:underline px-3 py-2"
          >
            {language === 'hi' ? 'देखभाल एवं कलाई मार्गदर्शिका →' : 'Read care & re-tinning guide →'}
          </Link>

          <button
            type="button"
            onClick={handleFindVessels}
            className="w-full sm:w-auto px-6 py-3 rounded-lg btn-atelier text-xs font-sans tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg"
          >
            <span>{language === 'hi' ? 'अनुरूप पात्र देखें' : 'Filter vessels'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

