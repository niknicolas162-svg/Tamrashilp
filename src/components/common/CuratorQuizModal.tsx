'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, Sparkles, Check, ArrowRight, ShieldCheck, Compass } from 'lucide-react';
import { PRODUCTS } from '@/lib/mockData';
import { atelierAudio } from '@/lib/audio';

interface CuratorQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CuratorQuizModal: React.FC<CuratorQuizModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [ritual, setRitual] = useState<'WATER' | 'COOKING' | 'PUJA' | 'GIFT'>('WATER');
  const [finish, setFinish] = useState<'HAMMERED' | 'PLAIN' | 'ENGRAVED'>('HAMMERED');
  const [capacity, setCapacity] = useState<'INDIVIDUAL' | 'FAMILY' | 'SACRED'>('INDIVIDUAL');

  if (!isOpen) return null;

  // Determine recommendation based on choices
  let recommendedProduct = PRODUCTS[0];
  if (ritual === 'COOKING') {
    recommendedProduct = PRODUCTS.find((p) => p.categoryId === 'cookware-kadhai-handi') || PRODUCTS[1];
  } else if (ritual === 'PUJA') {
    recommendedProduct = PRODUCTS.find((p) => p.categoryId === 'pooja-items') || PRODUCTS[4];
  } else if (ritual === 'GIFT') {
    recommendedProduct = PRODUCTS.find((p) => p.categoryId === 'gift-sets') || PRODUCTS[5];
  } else if (capacity === 'FAMILY') {
    recommendedProduct = PRODUCTS.find((p) => p.capacity?.includes('5L')) || PRODUCTS[2];
  }

  const handleSelectOption = (setter: (val: any) => void, val: any) => {
    setter(val);
    atelierAudio.playHammerChime();
  };

  const handleReset = () => {
    setStep(1);
    setRitual('WATER');
    setFinish('HAMMERED');
    setCapacity('INDIVIDUAL');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1F1C]/80 backdrop-blur-md">
      <div className="museum-plaque bg-[#FAF4E8] max-w-2xl w-full p-8 sm:p-12 space-y-8 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-[#8C4E28] hover:text-[#12302B] transition-colors"
          aria-label="Close Quiz"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 border-b border-[#B8964F]/30 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#B8964F]/40 bg-[#FAF3E8] text-[#8C4E28] text-[10px] uppercase tracking-[0.25em] font-sans">
            <Compass className="w-3.5 h-3.5 text-[#B8964F]" />
            <span>Atelier Curator Concierge</span>
          </div>
          <h3 className="font-serif text-3xl font-normal text-[#12302B]">
            Discover Your Hearth Vessel
          </h3>
          <p className="text-xs text-[#5C3E2C] font-sans font-light">
            Step {step} of 3 • Guided by the traditional principles of the Tamta Coppersmith Guild
          </p>
        </div>

        {/* Step 1: Ritual */}
        {step === 1 && (
          <div className="space-y-6">
            <h4 className="font-serif text-xl text-[#12302B] text-center">
              Which daily ritual will this vessel grace?
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-xs">
              <button
                onClick={() => {
                  handleSelectOption(setRitual, 'WATER');
                  setStep(2);
                }}
                className={`p-5 text-left border transition-all ${
                  ritual === 'WATER'
                    ? 'border-[#B26A3C] bg-[#FAF3E8] ring-1 ring-[#B26A3C]'
                    : 'border-[#B8964F]/30 bg-[#FAF4E8] hover:bg-[#FAF3E8]'
                }`}
              >
                <span className="font-serif text-base font-medium text-[#12302B] block">
                  Dawn Water (Ushapan)
                </span>
                <p className="text-[#5C3E2C] mt-1 font-light leading-relaxed">
                  Overnight water resting for morning vitality. Pure unlined copper bottles and jugs.
                </p>
              </button>

              <button
                onClick={() => {
                  handleSelectOption(setRitual, 'COOKING');
                  setStep(2);
                }}
                className={`p-5 text-left border transition-all ${
                  ritual === 'COOKING'
                    ? 'border-[#B26A3C] bg-[#FAF3E8] ring-1 ring-[#B26A3C]'
                    : 'border-[#B8964F]/30 bg-[#FAF4E8] hover:bg-[#FAF3E8]'
                }`}
              >
                <span className="font-serif text-base font-medium text-[#12302B] block">
                  Slow Cooking & Feasts
                </span>
                <p className="text-[#5C3E2C] mt-1 font-light leading-relaxed">
                  Traditional heavy kadhais and handis tin-lined (Kalai) for safe cooking.
                </p>
              </button>

              <button
                onClick={() => {
                  handleSelectOption(setRitual, 'PUJA');
                  setStep(2);
                }}
                className={`p-5 text-left border transition-all ${
                  ritual === 'PUJA'
                    ? 'border-[#B26A3C] bg-[#FAF3E8] ring-1 ring-[#B26A3C]'
                    : 'border-[#B8964F]/30 bg-[#FAF4E8] hover:bg-[#FAF3E8]'
                }`}
              >
                <span className="font-serif text-base font-medium text-[#12302B] block">
                  Sacred Altar (Pooja)
                </span>
                <p className="text-[#5C3E2C] mt-1 font-light leading-relaxed">
                  Sacred lotas, Panchamrit thalis, and Kalash vessels beaten from consecrated sheets.
                </p>
              </button>

              <button
                onClick={() => {
                  handleSelectOption(setRitual, 'GIFT');
                  setStep(2);
                }}
                className={`p-5 text-left border transition-all ${
                  ritual === 'GIFT'
                    ? 'border-[#B26A3C] bg-[#FAF3E8] ring-1 ring-[#B26A3C]'
                    : 'border-[#B8964F]/30 bg-[#FAF4E8] hover:bg-[#FAF3E8]'
                }`}
              >
                <span className="font-serif text-base font-medium text-[#12302B] block">
                  Heirloom Endowment / Gift
                </span>
                <p className="text-[#5C3E2C] mt-1 font-light leading-relaxed">
                  Commemorative wedding boxes, wax-sealed sets, and boxed master sets.
                </p>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Anvil Finish */}
        {step === 2 && (
          <div className="space-y-6">
            <h4 className="font-serif text-xl text-[#12302B] text-center">
              What hammer finish resonates with your aesthetic?
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-sans text-xs">
              <button
                onClick={() => {
                  handleSelectOption(setFinish, 'HAMMERED');
                  setStep(3);
                }}
                className="p-5 text-left border border-[#B8964F]/30 bg-[#FAF4E8] hover:bg-[#FAF3E8] transition-all"
              >
                <span className="font-serif text-base font-medium text-[#12302B] block">
                  Diamond Hammered
                </span>
                <p className="text-[#5C3E2C] mt-1 font-light">
                  4,000+ hand anvil blows catching candlelight.
                </p>
              </button>

              <button
                onClick={() => {
                  handleSelectOption(setFinish, 'PLAIN');
                  setStep(3);
                }}
                className="p-5 text-left border border-[#B8964F]/30 bg-[#FAF4E8] hover:bg-[#FAF3E8] transition-all"
              >
                <span className="font-serif text-base font-medium text-[#12302B] block">
                  Classical Smooth
                </span>
                <p className="text-[#5C3E2C] mt-1 font-light">
                  Deep wood-buffed sheen showing natural metal grain.
                </p>
              </button>

              <button
                onClick={() => {
                  handleSelectOption(setFinish, 'ENGRAVED');
                  setStep(3);
                }}
                className="p-5 text-left border border-[#B8964F]/30 bg-[#FAF4E8] hover:bg-[#FAF3E8] transition-all"
              >
                <span className="font-serif text-base font-medium text-[#12302B] block">
                  Hand-Chiseled
                </span>
                <p className="text-[#5C3E2C] mt-1 font-light">
                  Intricate Kumaoni floral or heraldic relief engraving.
                </p>
              </button>
            </div>

            <div className="flex justify-start">
              <button
                onClick={() => setStep(1)}
                className="text-xs font-sans text-[#8C4E28] hover:underline"
              >
                ← Back to Ritual
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Capacity / Result */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center space-y-1">
              <span className="text-[10px] text-[#B8964F] uppercase tracking-[0.2em] font-sans">
                Curator Verdict
              </span>
              <h4 className="font-serif text-2xl text-[#12302B]">
                Your Ideal Guild Vessel
              </h4>
            </div>

            {/* Recommended Plaque Card */}
            <div className="border border-[#B8964F] bg-[#FAF3E8] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-md">
              <img
                src={recommendedProduct.images[0]}
                alt={recommendedProduct.title}
                className="w-32 h-32 object-cover border border-[#B8964F]/40 shrink-0"
              />
              <div className="space-y-2 text-center sm:text-left flex-1">
                <span className="text-[10px] text-[#8C4E28] uppercase tracking-wider font-sans">
                  {recommendedProduct.village} • {recommendedProduct.hoursOfLabor}h Hand Anvil Labor
                </span>
                <h5 className="font-serif text-xl font-normal text-[#12302B]">
                  {recommendedProduct.title}
                </h5>
                <p className="text-xs text-[#5C3E2C] font-light leading-relaxed">
                  {recommendedProduct.curatorNote || recommendedProduct.description}
                </p>
                <p className="font-serif text-lg text-[#B26A3C]">
                  ₹{recommendedProduct.basePrice.toLocaleString('en-IN')}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <button
                onClick={handleReset}
                className="text-xs font-sans text-[#8C4E28] hover:underline"
              >
                ↻ Retake Questionnaire
              </button>

              <Link
                href={`/product/${recommendedProduct.slug}`}
                onClick={onClose}
                className="btn-atelier px-8 py-3.5 text-xs tracking-widest uppercase flex items-center gap-2"
              >
                <span>View & Inscribe Piece</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

