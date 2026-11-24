'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Upload, CheckCircle2, Hammer, Send, Award } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export default function CustomOrderPage() {
  const { language } = useLanguage();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    utensilType: 'The Water Vessels & Carafes',
    dimensions: 'Approx. 1000ml or 10-inch diameter',
    engravingText: '',
    quantity: 1,
    budgetRange: '₹2,500 - ₹5,000',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [requestId, setRequestId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const reqCode = `TS-BESPOKE-${Math.floor(100000 + Math.random() * 900000)}`;
    setRequestId(reqCode);
    setSubmitted(true);
  };

  return (
    <div className="bg-parchment-texture text-walnut-900 py-12 sm:py-20 font-body">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="wax-seal text-[10px] font-serif px-3.5 py-1 rounded-full uppercase tracking-atelier inline-block font-bold">
            The Tamta Bespoke Atelier
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-walnut-950">
            Commission a Custom Work
          </h1>
          <div className="kumaoni-divider my-2">
            <span className="text-brass-600 text-xs">✦</span>
          </div>
          <p className="text-xs sm:text-sm text-walnut-800 max-w-lg mx-auto leading-relaxed">
            Have an ancestral family crest, personalized Sanskrit mantra, or bespoke architectural copperware requirement? Our Almora master coppersmiths forge commissioned pieces to your exact specifications.
          </p>
        </div>

        {/* Artisan Anvil Chasing Showcase Card */}
        <div className="museum-plaque bg-[#FAF4E8] overflow-hidden rounded-2xl grid grid-cols-1 md:grid-cols-12 items-center border border-[#B8964F]/40 shadow-xl">
          <div className="md:col-span-5 aspect-4/3 md:aspect-square relative overflow-hidden candle-vignette bg-[#12302B]">
            <img
              src="/images/artisan-chasing-copper.jpg"
              alt="Artisan Chasing Handcrafted Inscription on Copper"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:col-span-7 p-6 sm:p-8 space-y-3 font-serif">
            <span className="text-[10px] text-[#B8964F] uppercase tracking-[0.25em] font-sans">
              Hand-Chiseled & Cold-Punched
            </span>
            <h3 className="text-2xl font-normal text-[#12302B]">
              Every Stroke Driven by Hand
            </h3>
            <p className="text-xs sm:text-sm text-[#4A3223] font-light leading-relaxed font-body">
              Unlike commercial laser etching that merely scratches the surface, our artisans use hardened steel punches and iron anvils to raise and gouge heraldic relief directly into the heavy copper bullion.
            </p>
            <div className="pt-2 text-[11px] text-[#8C4E28] font-sans uppercase tracking-wider">
              ✦ Almora Guild Guaranteed • 99.2%+ Virgin Copper
            </div>
          </div>
        </div>

        {submitted ? (
          <div className="bg-parchment-100 rounded-3xl p-8 sm:p-14 border border-brass-600/40 museum-plaque text-center space-y-4">
            <div className="w-14 h-14 rounded-full wax-seal mx-auto flex items-center justify-center text-ivory text-xl">
              ✓
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-walnut-950">
              Bespoke Commission Inscribed
            </h2>
            <p className="text-xs text-brass-700 font-serif">
              Commission Registry Code:{' '}
              <span className="font-mono font-bold text-walnut-950 bg-parchment-200 px-2.5 py-1 rounded border border-brass-600/30">
                {requestId}
              </span>
            </p>
            <p className="text-xs sm:text-sm text-walnut-800 max-w-md mx-auto leading-relaxed font-body">
              Founder and Lead Artisan Devendra Kumar Tamta will review your ingot allocation, calculate making hours, and transmit a formal archival quote and delivery timeline within 24 hours.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-lg btn-atelier-outline text-xs"
              >
                Inscribe Another Commission
              </button>
              <Link
                href="/shop"
                className="px-6 py-2.5 rounded-lg btn-atelier text-xs"
              >
                Return to the Collection
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-parchment-100 rounded-3xl p-6 sm:p-10 border border-brass-600/35 museum-plaque">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1 font-serif">
                  <label className="text-xs font-bold text-walnut-950">Patron Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Anirudh Bhatt"
                    className="w-full bg-parchment-50 border border-brass-600/35 rounded-lg p-2.5 text-xs text-walnut-900 focus:outline-none focus:border-copper-600"
                  />
                </div>

                <div className="space-y-1 font-serif">
                  <label className="text-xs font-bold text-walnut-950">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="name@domain.com"
                    className="w-full bg-parchment-50 border border-brass-600/35 rounded-lg p-2.5 text-xs text-walnut-900 focus:outline-none focus:border-copper-600"
                  />
                </div>

                <div className="space-y-1 font-serif">
                  <label className="text-xs font-bold text-walnut-950">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-parchment-50 border border-brass-600/35 rounded-lg p-2.5 text-xs text-walnut-900 focus:outline-none focus:border-copper-600"
                  />
                </div>

                <div className="space-y-1 font-serif">
                  <label className="text-xs font-bold text-walnut-950">Vessel Category *</label>
                  <select
                    value={form.utensilType}
                    onChange={(e) => setForm({ ...form, utensilType: e.target.value })}
                    className="w-full bg-parchment-50 border border-brass-600/35 rounded-lg p-2.5 text-xs text-walnut-900 focus:outline-none focus:border-copper-600 cursor-pointer"
                  >
                    <option>The Water Vessels & Carafes</option>
                    <option>Grand Ceremonial Water Urn (5L - 20L)</option>
                    <option>Heavy-Gauge Cooking Kadhai or Handi with Kalai</option>
                    <option>Sacred Temple Thali & Kalash Ensemble</option>
                    <option>Corporate / Wedding Personalized Heirloom Sets</option>
                    <option>Architectural Heritage Copper Work</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1 font-serif">
                  <label className="text-xs font-bold text-walnut-950">Commission Quantity *</label>
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    value={form.quantity}
                    onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
                    className="w-full bg-parchment-50 border border-brass-600/35 rounded-lg p-2.5 text-xs text-walnut-900 focus:outline-none focus:border-copper-600"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2 font-serif">
                  <label className="text-xs font-bold text-walnut-950">Estimated Value Range</label>
                  <select
                    value={form.budgetRange}
                    onChange={(e) => setForm({ ...form, budgetRange: e.target.value })}
                    className="w-full bg-parchment-50 border border-brass-600/35 rounded-lg p-2.5 text-xs text-walnut-900 focus:outline-none focus:border-copper-600"
                  >
                    <option>Under ₹2,500</option>
                    <option>₹2,500 - ₹5,000</option>
                    <option>₹5,000 - ₹15,000</option>
                    <option>₹15,000 - ₹50,000 (Archival / Corporate)</option>
                    <option>Above ₹50,000 (Temple / Guild Project)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1 font-serif">
                <label className="text-xs font-bold text-walnut-950">
                  Custom Inscription or Monogram Text (Optional)
                </label>
                <input
                  type="text"
                  value={form.engravingText}
                  onChange={(e) => setForm({ ...form, engravingText: e.target.value })}
                  placeholder="e.g. Om Namah Shivaya, initials 'R.S. 2026', or crest motto"
                  className="w-full bg-parchment-50 border border-brass-600/35 rounded-lg p-2.5 text-xs text-walnut-900 focus:outline-none focus:border-copper-600"
                />
              </div>

              <div className="space-y-1 font-serif">
                <label className="text-xs font-bold text-walnut-950">
                  Reference Sketch or Family Motif (Optional)
                </label>
                <div className="border border-dashed border-brass-600/50 rounded-xl p-5 text-center bg-parchment-50 hover:bg-parchment-200 cursor-pointer transition-colors">
                  <Upload className="w-5 h-5 text-brass-700 mx-auto mb-1.5" />
                  <p className="text-xs font-serif text-walnut-950 font-bold">
                    Attach motif sketch or reference drawing
                  </p>
                  <p className="text-[10px] text-brass-700">PNG, JPG, PDF up to 10MB</p>
                </div>
              </div>

              <div className="space-y-1 font-serif">
                <label className="text-xs font-bold text-walnut-950">
                  Detailed Commission Requirements *
                </label>
                <textarea
                  rows={3}
                  required
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Specify finish (hammered/plain/engraved), whether internal food-grade tin lining (kalai) is required, and target delivery milestone…"
                  className="w-full bg-parchment-50 border border-brass-600/35 rounded-lg p-2.5 text-xs text-walnut-900 focus:outline-none focus:border-copper-600 font-body"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-lg btn-atelier text-xs flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5 text-brass-300" />
                <span>Submit Bespoke Commission Request</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
