'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Flame, ShieldCheck, CheckCircle2, ArrowRight, Truck, Sparkles, Clock, MapPin } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export default function KalaiServicePage() {
  const { language } = useLanguage();
  const [vesselType, setVesselType] = useState('kadhai-medium');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [bookingRef, setBookingRef] = useState<string | null>(null);

  const PRICE_LIST = [
    { id: 'tumbler', name: 'Tumbler or Lota (up to 750ml)', price: 250, time: '3-4 working days' },
    { id: 'kadhai-small', name: 'Small Culinary Handi / Saucepot (1-1.5L)', price: 450, time: '4-5 working days' },
    { id: 'kadhai-medium', name: 'Medium Kadhai / Cooking Pot (2-3.5L)', price: 650, time: '4-5 working days' },
    { id: 'kadhai-large', name: 'Large Banquet Kadhai / Feast Pot (4L+)', price: 950, time: '5-6 working days' },
    { id: 'polish-only', name: 'Tamarind Acid-Free Hearth Polish & Buffing', price: 350, time: '2-3 working days' },
  ];

  const selectedItem = PRICE_LIST.find((p) => p.id === vesselType) || PRICE_LIST[2];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedRef = `KALAI-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingRef(generatedRef);

    // Save to user's registered bookings in localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('tamtashilp_kalai_bookings') || '[]');
      existing.unshift({
        bookingRef: generatedRef,
        vesselName: selectedItem.name,
        price: selectedItem.price,
        fullName,
        phone,
        pickupAddress,
        pincode,
        status: 'PICKUP_SCHEDULED',
        createdAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      });
      localStorage.setItem('tamtashilp_kalai_bookings', JSON.stringify(existing));
    } catch {}
  };

  return (
    <div className="bg-[#FAF4E8] text-[#2A1A12] min-h-screen font-body selection:bg-[#8C4E28] selection:text-[#FAF4E8]">
      {/* Header */}
      <section className="bg-[#12302B] text-[#FAF4E8] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#B8964F]/30 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#B8964F]/40 bg-[#0B1F1C] text-[#B8964F] text-xs font-serif uppercase tracking-[0.2em]">
            <span>✦</span>
            <span>Hearth Re-Tinning Service</span>
            <span>✦</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-wide text-[#FAF4E8] leading-tight">
            Traditional Kalai & Polishing
          </h1>

          <div className="kumaoni-divider my-2">
            <span className="text-[#B8964F] text-xs">✦</span>
          </div>

          <p className="text-sm sm:text-base text-[#EFE4CF]/90 max-w-xl mx-auto font-light leading-relaxed">
            Send your prized copper cookware directly to our Almora forge. Relined by hand over charcoal embers with pure 99.9% virgin food-grade tin and sal-ammoniac flux.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-16">
        {/* Transparent Price List */}
        <div className="space-y-6">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[10px] uppercase font-serif tracking-[0.2em] text-[#8C4E28]">
              Standard Workshop Tariffs
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#12302B]">
              Transparent Kalai Price Schedule
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRICE_LIST.map((item) => (
              <div
                key={item.id}
                onClick={() => setVesselType(item.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                  vesselType === item.id
                    ? 'border-[#8C4E28] bg-[#FAF4E8] ring-2 ring-[#8C4E28]/30 shadow-md'
                    : 'border-[#B8964F]/30 bg-[#EFE4CF]/60 hover:border-[#B8964F]'
                }`}
              >
                <div>
                  <h3 className="font-serif text-sm font-medium text-[#12302B]">{item.name}</h3>
                  <p className="text-[11px] text-[#2A1A12]/60 pt-1">Hearth turnaround: {item.time}</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-[#B8964F]/20">
                  <span className="text-base font-serif font-bold text-[#8C4E28]">₹{item.price}</span>
                  <span className="text-[10px] text-[#8C4E28] font-serif uppercase tracking-wider">
                    {vesselType === item.id ? 'Selected ✓' : 'Select'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Form or Success Receipt */}
        <div className="bg-[#EFE4CF] rounded-3xl p-6 sm:p-10 border border-[#B8964F]/40 shadow-xl museum-plaque space-y-6">
          {bookingRef ? (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-[#4E6E58]/10 border-2 border-[#4E6E58] text-[#4E6E58] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-serif uppercase tracking-widest text-[#8C4E28]">
                  Atelier Courier Registered
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#12302B]">
                  Kalai Booking Reference #{bookingRef}
                </h3>
                <p className="text-xs text-[#2A1A12]/80 max-w-md mx-auto pt-1">
                  Our BlueDart Air courier will collect your safely padded parcel from {pincode}. It will arrive at our Almora workshop within 48 hours for hand-cleansing and pure molten tin lining.
                </p>
              </div>

              {/* Status Tracking Step Visualizer */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-serif pt-4 max-w-2xl mx-auto text-left">
                <div className="p-3 bg-[#FAF4E8] rounded-xl border border-[#4E6E58]">
                  <span className="text-[#4E6E58] block font-bold">1. Scheduled</span>
                  <span className="text-[10px] text-[#2A1A12]/70">Courier pickup pending</span>
                </div>
                <div className="p-3 bg-[#FAF4E8] rounded-xl border border-[#B8964F]/30 opacity-60">
                  <span className="block font-bold">2. Transit</span>
                  <span className="text-[10px] text-[#2A1A12]/70">Almora forge transfer</span>
                </div>
                <div className="p-3 bg-[#FAF4E8] rounded-xl border border-[#B8964F]/30 opacity-60">
                  <span className="block font-bold">3. Charcoal Kalai</span>
                  <span className="text-[10px] text-[#2A1A12]/70">Pure tin molten lining</span>
                </div>
                <div className="p-3 bg-[#FAF4E8] rounded-xl border border-[#B8964F]/30 opacity-60">
                  <span className="block font-bold">4. Returned</span>
                  <span className="text-[10px] text-[#2A1A12]/70">Insured home handover</span>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-center gap-4 text-xs font-serif">
                <button
                  onClick={() => setBookingRef(null)}
                  className="px-6 py-2.5 rounded-xl border border-[#B8964F]/50 text-[#8C4E28] hover:bg-[#FAF4E8]"
                >
                  Book another vessel
                </button>
                <Link
                  href="/profile"
                  className="px-6 py-2.5 rounded-xl bg-[#8C4E28] text-[#FAF4E8] hover:bg-[#723F20]"
                >
                  View in My Orders
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              <div className="border-b border-[#B8964F]/30 pb-4">
                <span className="text-[10px] uppercase font-serif tracking-[0.2em] text-[#8C4E28]">
                  Almora Hearth Service Booking
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#12302B]">
                  Schedule Workshop Pickup & Re-Tinning
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-serif">
                <div className="space-y-1">
                  <label className="text-[#2A1A12]/80 uppercase tracking-wider text-[10px]">Patron Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Aaditya Rawat"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF4E8] border border-[#B8964F]/40 focus:outline-none focus:border-[#8C4E28] font-sans"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#2A1A12]/80 uppercase tracking-wider text-[10px]">WhatsApp / Mobile</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 94120 XXXXX"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF4E8] border border-[#B8964F]/40 focus:outline-none focus:border-[#8C4E28] font-sans"
                    required
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[#2A1A12]/80 uppercase tracking-wider text-[10px]">Pickup Doorstep Address</label>
                  <textarea
                    rows={2}
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                    placeholder="House number, street, landmark, city..."
                    className="w-full p-3 rounded-xl bg-[#FAF4E8] border border-[#B8964F]/40 focus:outline-none focus:border-[#8C4E28] font-sans"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#2A1A12]/80 uppercase tracking-wider text-[10px]">Pincode (India)</label>
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="e.g. 110001 or 263601"
                    maxLength={6}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF4E8] border border-[#B8964F]/40 focus:outline-none focus:border-[#8C4E28] font-sans"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#2A1A12]/80 uppercase tracking-wider text-[10px]">Selected Vessel Tier</label>
                  <div className="p-2.5 rounded-xl bg-[#FAF4E8] border border-[#B8964F]/40 font-serif text-[#8C4E28] font-semibold">
                    {selectedItem.name} — ₹{selectedItem.price}
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#B8964F]/20 text-xs font-serif">
                <div className="flex items-center gap-2 text-[#4E6E58]">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>Certified 99.9% Virgin Food-Grade Pure Tin (Zero Lead).</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#8C4E28] hover:bg-[#723F20] text-[#FAF4E8] uppercase tracking-widest transition-colors shadow"
                >
                  Book Courier Pickup (₹{selectedItem.price})
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

