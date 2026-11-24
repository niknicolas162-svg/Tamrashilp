'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Gift, Sparkles, ShieldCheck, CheckCircle2, Copy, ArrowRight, Share2 } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export default function GiftCardsPage() {
  const { language } = useLanguage();
  const [selectedAmount, setSelectedAmount] = useState(2500);
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [blessingMessage, setBlessingMessage] = useState('');
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const AMOUNTS = [1000, 2500, 5000, 10000];

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `TS-GIFT-${selectedAmount}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    setGeneratedCode(code);
  };

  const copyCode = () => {
    if (!generatedCode) return;
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#FAF4E8] text-[#2A1A12] min-h-screen font-body selection:bg-[#8C4E28] selection:text-[#FAF4E8]">
      {/* Header */}
      <section className="bg-[#12302B] text-[#FAF4E8] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#B8964F]/30 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#B8964F]/40 bg-[#0B1F1C] text-[#B8964F] text-xs font-serif uppercase tracking-[0.2em]">
            <span>✦</span>
            <span>Atelier Endowments</span>
            <span>✦</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-wide text-[#FAF4E8] leading-tight">
            Gifts of Generational Heritage
          </h1>

          <div className="kumaoni-divider my-2">
            <span className="text-[#B8964F] text-xs">✦</span>
          </div>

          <p className="text-sm sm:text-base text-[#EFE4CF]/90 max-w-xl mx-auto font-light leading-relaxed">
            Bestow the freedom to select a hand-raised heirloom. Digital gift cards delivered with personal blessings and lifelong validity.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-16">
        {/* Gift Card Creator Card */}
        <div className="bg-[#EFE4CF] rounded-3xl p-6 sm:p-10 border border-[#B8964F]/40 shadow-xl museum-plaque space-y-8">
          <div className="flex items-center justify-between border-b border-[#B8964F]/30 pb-4">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-serif tracking-[0.2em] text-[#8C4E28]">
                Sanctum Endowment
              </span>
              <h2 className="font-serif text-2xl text-[#12302B]">
                Select Gift Card Valuation
              </h2>
            </div>
            <Gift className="w-6 h-6 text-[#8C4E28]" />
          </div>

          {/* Amount Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {AMOUNTS.map((amt) => (
              <button
                type="button"
                key={amt}
                onClick={() => setSelectedAmount(amt)}
                className={`py-3 px-4 rounded-2xl border text-center font-serif transition-all ${
                  selectedAmount === amt
                    ? 'border-[#8C4E28] bg-[#FAF4E8] text-[#8C4E28] ring-2 ring-[#8C4E28]/30 shadow-md font-bold'
                    : 'border-[#B8964F]/30 bg-[#FAF4E8]/60 text-[#12302B] hover:border-[#B8964F]'
                }`}
              >
                <span className="text-base sm:text-lg">₹{amt.toLocaleString('en-IN')}</span>
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleGenerate} className="space-y-4 text-xs font-serif">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[#2A1A12]/80 uppercase tracking-wider text-[10px]">Recipient Name</label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="e.g. Priyanshu Joshi"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF4E8] border border-[#B8964F]/40 text-xs font-sans focus:outline-none focus:border-[#8C4E28]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#2A1A12]/80 uppercase tracking-wider text-[10px]">Recipient Email</label>
                <input
                  type="email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  placeholder="recipient@example.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF4E8] border border-[#B8964F]/40 text-xs font-sans focus:outline-none focus:border-[#8C4E28]"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[#2A1A12]/80 uppercase tracking-wider text-[10px]">Blessing Message on Folio</label>
              <textarea
                rows={2}
                value={blessingMessage}
                onChange={(e) => setBlessingMessage(e.target.value)}
                placeholder="May this handcrafted copper vessel bring health, purity, and memories to your hearth..."
                className="w-full p-3 rounded-xl bg-[#FAF4E8] border border-[#B8964F]/40 text-xs font-sans focus:outline-none focus:border-[#8C4E28]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 rounded-xl bg-[#8C4E28] hover:bg-[#723F20] text-[#FAF4E8] text-xs uppercase tracking-widest transition-colors shadow"
            >
              Issue Digital Gift Voucher (₹{selectedAmount.toLocaleString('en-IN')})
            </button>
          </form>

          {/* Generated Card Display */}
          {generatedCode && (
            <div className="p-6 rounded-2xl bg-[#12302B] text-[#FAF4E8] border-2 border-[#B8964F] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#B8964F]/30">
                <span className="text-[10px] font-serif uppercase tracking-[0.25em] text-[#B8964F]">
                  Tamrashilp Digital Endowment Folio
                </span>
                <span className="font-serif text-lg font-bold text-[#FAF4E8]">
                  ₹{selectedAmount.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex items-center justify-between bg-[#0B1F1C] p-3 rounded-xl border border-[#B8964F]/30">
                <span className="font-mono text-sm tracking-widest text-[#B8964F]">
                  {generatedCode}
                </span>
                <button
                  onClick={copyCode}
                  className="px-3 py-1 rounded bg-[#8C4E28] hover:bg-[#723F20] text-xs font-serif flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Voucher Code'}</span>
                </button>
              </div>

              {blessingMessage && (
                <p className="text-xs italic text-[#EFE4CF]/80 font-serif">
                  &ldquo;{blessingMessage}&rdquo;
                </p>
              )}
            </div>
          )}
        </div>

        {/* Quiet Referral Reward Section (No intrusive popups) */}
        <div className="bg-[#FAF4E8] rounded-3xl p-8 border border-[#B8964F]/40 museum-plaque space-y-4">
          <div className="flex items-center gap-2 text-[#8C4E28] font-serif uppercase tracking-widest text-xs font-semibold">
            <Share2 className="w-4 h-4" />
            <span>Patron Hearth Circle Invitation</span>
          </div>

          <h3 className="font-serif text-xl sm:text-2xl text-[#12302B]">
            Introduce a Friend to Pure Copper Craft
          </h3>

          <p className="text-xs sm:text-sm text-[#2A1A12]/80 leading-relaxed font-light max-w-xl">
            Share the timeless heritage of Almora coppersmiths. When your friend orders their first handcrafted heirloom using your invite code, they enjoy ₹300 courtesy reduction, and your account receives ₹300 atelier credit.
          </p>

          <div className="inline-flex items-center gap-3 p-3 rounded-xl bg-[#EFE4CF] border border-[#B8964F]/40 text-xs font-serif">
            <span className="text-[#2A1A12]/70">Your Patron Invite Code:</span>
            <strong className="font-mono text-sm text-[#8C4E28] tracking-wider">TAMTA-PATRON-300</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

