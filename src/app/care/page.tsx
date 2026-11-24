'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ShieldCheck,
  Hammer,
  AlertTriangle,
  CheckCircle,
  MessageSquare,
  ArrowRight,
  Droplet,
  Flame,
} from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export default function CarePage() {
  const { language } = useLanguage();
  const [retinningSubmitted, setRetinningSubmitted] = useState(false);
  const [vesselType, setVesselType] = useState('Cookware Handi / Kadhai');
  const [pincode, setPincode] = useState('');
  const [phone, setPhone] = useState('');

  const handleRetinningSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRetinningSubmitted(true);
  };

  return (
    <div className="bg-[#FAF4E8] text-[#2A1A12] min-h-screen font-body selection:bg-[#8C4E28] selection:text-[#FAF4E8]">
      {/* Editorial Header */}
      <section className="bg-[#12302B] text-[#FAF4E8] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#B8964F]/30 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#B8964F]/40 bg-[#0B1F1C] text-[#B8964F] text-xs font-serif uppercase tracking-[0.2em]">
            <span>✦</span>
            <span>{language === 'hi' ? 'ताम्र पात्र संरक्षण एवं कलाई' : 'Atelier Conservation'}</span>
            <span>✦</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-wide text-[#FAF4E8] leading-tight">
            {language === 'hi' ? 'देखभाल एवं कलाई सेवा' : 'Care & Re-tinning Guide'}
          </h1>

          <div className="kumaoni-divider my-3">
            <span className="text-[#B8964F] text-xs">✦</span>
          </div>

          <p className="text-sm sm:text-base text-[#EFE4CF]/90 max-w-2xl mx-auto font-light leading-relaxed">
            {language === 'hi'
              ? 'तांबा एक जीवित धातु है। समय के साथ यह गहरा होता है और हवा से अपनी सुरक्षा कवच बनाता है। जानिए इसकी पारंपरिक सफाई और कलाई की विधि।'
              : 'Pure copper is a living metal. Over time it breathes, darkens, and builds an organic protective patina. Read our plain-spoken guide to traditional cleaning and our Almora hearth re-tinning (Kalai) service.'}
          </p>
        </div>
      </section>

      {/* Main Guide Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-16">
        {/* Section 1: The Nature of Living Copper & Patina */}
        <section className="space-y-4 border-b border-[#B8964F]/30 pb-12">
          <span className="text-xs uppercase tracking-[0.2em] text-[#8C4E28] font-sans font-semibold">
            Principle 01
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#12302B] font-normal">
            The Living Patina: Pure Metal Breathes
          </h2>
          <p className="drop-cap text-base sm:text-lg leading-relaxed text-[#2A1A12]/90">
            Unlike chrome-plated or factory-lacquered utensils, our pieces are beaten from raw 99.2% virgin copper with no synthetic coatings. When copper meets air, water, and touch, it forms a natural warm patina—shifting from bright rose-gold to rich chestnut.
          </p>
          <p className="text-sm sm:text-base leading-relaxed text-[#2A1A12]/80">
            This darkening is not dirt or tarnishing; it is copper protecting itself from deep corrosion. Many connoisseurs cherish this aged antique lustre and leave the exterior unpolished, cleaning only the inside.
          </p>
        </section>

        {/* Section 2: Classical Ushapan & Food Safety */}
        <section className="space-y-6 border-b border-[#B8964F]/30 pb-12">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] text-[#8C4E28] font-sans font-semibold">
              Principle 02
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#12302B] font-normal">
              Classical Ushapan & Culinary Safety Guidance
            </h2>
          </div>

          <p className="text-sm sm:text-base leading-relaxed text-[#2A1A12]/90">
            Traditionally used in Ayurveda, copper vessels are revered for resting dawn drinking water (Ushapan). To use your water vessel properly, keep these rules in mind:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#FAF4E8] border border-[#4E6E58]/40 p-5 rounded-2xl space-y-2.5 shadow-sm">
              <div className="flex items-center gap-2 text-[#4E6E58] font-serif font-bold text-sm">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>What is Safe: Plain Filtered Water</span>
              </div>
              <p className="text-xs sm:text-sm text-[#2A1A12]/80 leading-relaxed font-body">
                Fill with plain, room-temperature drinking water and let it rest overnight (6 to 8 hours). Drink 1–2 glasses upon waking.
              </p>
            </div>

            <div className="bg-[#FAF4E8] border border-[#8C4E28]/40 p-5 rounded-2xl space-y-2.5 shadow-sm">
              <div className="flex items-center gap-2 text-[#8C4E28] font-serif font-bold text-sm">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Never Store Acidic Foods in Plain Copper</span>
              </div>
              <p className="text-xs sm:text-sm text-[#2A1A12]/80 leading-relaxed font-body">
                Plain unlined copper must never hold citrus juice, tamarind drinks, curd, buttermilk, tomato gravies, or vinegar. Acid reacts with raw copper and turns bitter. For acidic food and cooking, use tin-lined (Kalai) cookware only.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: The Traditional Tamarind & Sand Wash */}
        <section className="space-y-6 border-b border-[#B8964F]/30 pb-12">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] text-[#8C4E28] font-sans font-semibold">
              Principle 03
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#12302B] font-normal">
              Traditional Cleansing with Tamarind & Coarse Salt
            </h2>
          </div>

          <p className="text-sm sm:text-base leading-relaxed text-[#2A1A12]/90">
            Never use steel wool, wire brushes, or harsh synthetic dishwashing detergents. They scratch the hand-hammered stipples and strip the metal. The ancestral Kumaoni method is gentle, organic, and effective:
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-[#EFE4CF] border border-[#B8964F]/30">
              <span className="w-7 h-7 rounded-full bg-[#8C4E28] text-[#FAF4E8] flex items-center justify-center font-serif text-xs font-bold shrink-0 mt-0.5">
                1
              </span>
              <div>
                <h4 className="font-serif text-base font-semibold text-[#12302B]">
                  Mix Natural Tamarind or Lemon with Coarse Salt
                </h4>
                <p className="text-xs sm:text-sm text-[#2A1A12]/80 mt-0.5 leading-relaxed">
                  Soak a small lemon-sized ball of dried tamarind in warm water, or cut a fresh lemon in half and dip it in coarse rock salt.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-[#EFE4CF] border border-[#B8964F]/30">
              <span className="w-7 h-7 rounded-full bg-[#8C4E28] text-[#FAF4E8] flex items-center justify-center font-serif text-xs font-bold shrink-0 mt-0.5">
                2
              </span>
              <div>
                <h4 className="font-serif text-base font-semibold text-[#12302B]">
                  Gently Rub Along the Hammer Stipples
                </h4>
                <p className="text-xs sm:text-sm text-[#2A1A12]/80 mt-0.5 leading-relaxed">
                  Rub gently in circular motions with a soft cotton cloth. Within seconds, the natural mild citric acid dissolves surface oxidation, unveiling radiant rose copper.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-[#EFE4CF] border border-[#B8964F]/30">
              <span className="w-7 h-7 rounded-full bg-[#8C4E28] text-[#FAF4E8] flex items-center justify-center font-serif text-xs font-bold shrink-0 mt-0.5">
                3
              </span>
              <div>
                <h4 className="font-serif text-base font-semibold text-[#12302B]">
                  Rinse with Running Water and Wipe Completely Dry
                </h4>
                <p className="text-xs sm:text-sm text-[#2A1A12]/80 mt-0.5 leading-relaxed">
                  Rinse thoroughly with clean water. Dry immediately with a clean cotton towel. Leaving standing water droplets on the surface will create small mineral spots.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Kalai (Pure Tinning) Re-tinning Service */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] text-[#8C4E28] font-sans font-semibold">
              The Artisan Service
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#12302B] font-normal">
              Traditional Kalai (Pure Tin Lining) Re-tinning Service
            </h2>
          </div>

          <p className="text-sm sm:text-base leading-relaxed text-[#2A1A12]/90">
            For centuries, copper cookware used for dal, vegetables, and curries has been lined inside with pure 99.9% food-grade tin (Kalai). With regular cooking and wooden spoons, this silvery tin layer gradually thins out over 12 to 24 months. When you begin to see patches of pink copper peek through inside your pot, it is time for re-tinning.
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-[#2A1A12]/80">
            Tamrashilp runs an authentic Kalai re-tinning service at our Almora workshop. Patrons can send their cookware to our artisans to be cleansed over charcoal, treated with sal-ammoniac (nausadar), and relined by hand with pure molten tin.
          </p>

          {/* Booking Card */}
          <div className="bg-[#FAF4E8] border-2 border-[#B8964F]/60 rounded-3xl p-6 sm:p-8 museum-plaque shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#B8964F]/30 gap-2">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#8C4E28] font-sans font-semibold">
                  Almora Hearth Service
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#12302B]">
                  Book a Kalai Re-tinning Order
                </h3>
              </div>
              <span className="text-xs font-serif text-[#8C4E28] font-bold">
                ₹450 – ₹950 per vessel + return transit
              </span>
            </div>

            {retinningSubmitted ? (
              <div className="p-6 rounded-2xl bg-[#4E6E58]/10 border border-[#4E6E58] text-center space-y-3">
                <CheckCircle className="w-8 h-8 text-[#4E6E58] mx-auto" />
                <h4 className="font-serif text-xl text-[#12302B]">
                  Re-tinning Request Received
                </h4>
                <p className="text-xs sm:text-sm text-[#2A1A12]/80 max-w-md mx-auto">
                  Our Almora workshop concierge will contact you on WhatsApp / phone ({phone || 'provided'}) within 24 hours with packing instructions and pickup courier arrangements.
                </p>
                <button
                  onClick={() => setRetinningSubmitted(false)}
                  className="mt-3 px-4 py-2 rounded-lg border border-[#8C4E28] text-xs font-sans uppercase tracking-wider text-[#8C4E28] hover:bg-[#8C4E28] hover:text-[#FAF4E8] transition-colors"
                >
                  Submit another vessel
                </button>
              </div>
            ) : (
              <form onSubmit={handleRetinningSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs uppercase tracking-wider text-[#2A1A12]/80 font-sans font-medium">
                      Vessel Type
                    </label>
                    <select
                      value={vesselType}
                      onChange={(e) => setVesselType(e.target.value)}
                      className="w-full bg-[#EFE4CF] border border-[#B8964F]/40 rounded-lg p-2.5 text-xs text-[#2A1A12] focus:outline-none focus:border-[#8C4E28]"
                    >
                      <option>Cookware Handi / Kadhai</option>
                      <option>Cooking Pot / Degchi</option>
                      <option>Large Mountain Cauldron (Charu)</option>
                      <option>Water Carafe or Jug Interior</option>
                      <option>Other Antique Vessel</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs uppercase tracking-wider text-[#2A1A12]/80 font-sans font-medium">
                      Pickup Pincode
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 263601"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      maxLength={6}
                      className="w-full bg-[#EFE4CF] border border-[#B8964F]/40 rounded-lg p-2.5 text-xs text-[#2A1A12] placeholder:text-[#2A1A12]/40 focus:outline-none focus:border-[#8C4E28]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs uppercase tracking-wider text-[#2A1A12]/80 font-sans font-medium">
                      Mobile / WhatsApp
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      maxLength={10}
                      className="w-full bg-[#EFE4CF] border border-[#B8964F]/40 rounded-lg p-2.5 text-xs text-[#2A1A12] placeholder:text-[#2A1A12]/40 focus:outline-none focus:border-[#8C4E28]"
                    />
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-[11px] text-[#2A1A12]/70 font-serif">
                    Insured pickup and return delivery available across India via Shiprocket.
                  </span>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 rounded-lg btn-atelier text-xs font-sans uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
                  >
                    <span>Request Re-tinning Pickup</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>

        {/* Support & Assistance */}
        <section className="bg-[#EFE4CF] rounded-2xl border border-[#B8964F]/40 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-serif text-xl text-[#12302B]">
              Questions about maintaining your heirloom?
            </h3>
            <p className="text-xs sm:text-sm text-[#2A1A12]/80">
              Message our master artisan workshop team directly with a photo of your vessel.
            </p>
          </div>

          <a
            href="https://wa.me/919412000000?text=Hello%20Tamrashilp%20Artisan%20team,%20I%20have%20a%20question%20about%20cleaning%20and%20re-tinning%20my%20copper%20vessel."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-3 rounded-lg bg-[#4E6E58] text-[#FAF4E8] text-xs font-sans uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#3D5645] transition-colors shrink-0 shadow"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </section>
      </div>
    </div>
  );
}

