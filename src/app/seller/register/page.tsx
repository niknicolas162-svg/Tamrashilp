'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Hammer, Upload, ShieldCheck, CheckCircle2, ArrowRight, Award, Sparkles } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export default function SellerRegisterPage() {
  const { language } = useLanguage();
  const [form, setForm] = useState({
    artisanName: '',
    workshopName: '',
    craftCluster: 'Tamta Mohalla, Almora, Uttarakhand',
    experienceYears: 15,
    specialty: 'Hand-hammered Water Bottles & Jugs',
    panNumber: '',
    gstin: '',
    bankAccount: '',
    bankIfsc: '',
    bankName: '',
    story: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#EFE4CF] min-h-screen text-[#2A1A12] py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Curatorial Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#B8964F]/40 bg-[#FAF4E8] text-[#8C4E28] text-xs uppercase tracking-[0.25em] font-sans">
            <Hammer className="w-3.5 h-3.5 text-[#B8964F]" />
            <span>Kumaon Coppersmith Guild</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#12302B] leading-tight">
            Enroll in the Tamta Atelier
          </h1>

          <div className="kumaoni-divider my-2">
            <span className="w-2 h-2 rotate-45 border border-[#B8964F] bg-[#FAF4E8]"></span>
          </div>

          <p className="text-xs sm:text-sm text-[#5C3E2C] font-light leading-relaxed">
            Join the decentralized guild registry. Receive 88% direct patron payouts, subsidized ingot procurement, NABL purity accreditation, and national patronage.
          </p>
        </div>

        {submitted ? (
          <div className="museum-plaque bg-[#FAF4E8] p-8 sm:p-14 text-center space-y-6">
            <div className="wax-seal w-16 h-16 rounded-full flex items-center justify-center mx-auto text-sm font-serif font-bold">
              TM
            </div>
            <h2 className="font-serif text-3xl font-normal text-[#12302B]">
              Artisan Petition Registered
            </h2>
            <p className="text-xs sm:text-sm text-[#5C3E2C] max-w-md mx-auto font-light leading-relaxed">
              Dhanyawad. Your workshop pedigree is now in the custody of the Tamrashilp High Curators. Audit completion requires approximately 24 hours.
            </p>
            <div className="pt-4">
              <Link
                href="/seller"
                className="btn-atelier inline-block px-8 py-3.5 text-xs tracking-widest uppercase"
              >
                Enter Artisan Workshop Ledger
              </Link>
            </div>
          </div>
        ) : (
          <div className="museum-plaque bg-[#FAF4E8] p-6 sm:p-10 space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8 font-sans">
              <div className="border-b border-[#B8964F]/25 pb-4">
                <h3 className="font-serif text-lg font-normal text-[#12302B]">
                  I. Master Lineage & Workshop Pedigree
                </h3>
                <p className="text-xs text-[#6B4B35] font-light">Document your ancestral anvil heritage</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-sans tracking-wider uppercase text-[#4A3223]">
                    Master Craftsman Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.artisanName}
                    onChange={(e) => setForm({ ...form, artisanName: e.target.value })}
                    placeholder="e.g. Anand Tamta"
                    className="w-full bg-[#EFE4CF]/60 border border-[#B8964F]/40 p-3 text-xs text-[#2A1A12] focus:outline-none focus:border-[#B26A3C]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-sans tracking-wider uppercase text-[#4A3223]">
                    Workshop / Kendra Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.workshopName}
                    onChange={(e) => setForm({ ...form, workshopName: e.target.value })}
                    placeholder="e.g. Almora Traditional Copper Kendra"
                    className="w-full bg-[#EFE4CF]/60 border border-[#B8964F]/40 p-3 text-xs text-[#2A1A12] focus:outline-none focus:border-[#B26A3C]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-sans tracking-wider uppercase text-[#4A3223]">
                    Craft Region *
                  </label>
                  <select
                    value={form.craftCluster}
                    onChange={(e) => setForm({ ...form, craftCluster: e.target.value })}
                    className="w-full bg-[#EFE4CF]/60 border border-[#B8964F]/40 p-3 text-xs text-[#2A1A12] focus:outline-none focus:border-[#B26A3C] cursor-pointer"
                  >
                    <option>Tamta Mohalla, Almora, Uttarakhand</option>
                    <option>Saryu Ghat, Bageshwar, Uttarakhand</option>
                    <option>Champawat Foothills, Uttarakhand</option>
                    <option>Pithoragarh Border Valley, Uttarakhand</option>
                    <option>Other Uttarakhand Traditional Cluster</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-sans tracking-wider uppercase text-[#4A3223]">
                    Years of Anvil Experience
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={form.experienceYears}
                    onChange={(e) => setForm({ ...form, experienceYears: Number(e.target.value) })}
                    className="w-full bg-[#EFE4CF]/60 border border-[#B8964F]/40 p-3 text-xs text-[#2A1A12] focus:outline-none focus:border-[#B26A3C]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-sans tracking-wider uppercase text-[#4A3223]">
                  Craft Heritage & Anvil Techniques
                </label>
                <textarea
                  rows={3}
                  value={form.story}
                  onChange={(e) => setForm({ ...form, story: e.target.value })}
                  placeholder="Detail your family's generations of beating copper, brazing joints, and traditional wood-fire annealing..."
                  className="w-full bg-[#EFE4CF]/60 border border-[#B8964F]/40 p-3 text-xs text-[#2A1A12] focus:outline-none focus:border-[#B26A3C]"
                />
              </div>

              {/* Banking & Remittance */}
              <div className="border-b border-[#B8964F]/25 pb-4 pt-4">
                <h3 className="font-serif text-lg font-normal text-[#12302B]">
                  II. Treasury & Remittance Identification
                </h3>
                <p className="text-xs text-[#6B4B35] font-light">
                  For direct 88% weekly patron transfers to your account
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-sans tracking-wider uppercase text-[#4A3223]">
                    PAN Identification *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.panNumber}
                    onChange={(e) => setForm({ ...form, panNumber: e.target.value.toUpperCase() })}
                    placeholder="ABCDE1234F"
                    className="w-full bg-[#EFE4CF]/60 border border-[#B8964F]/40 p-3 text-xs text-[#2A1A12] focus:outline-none focus:border-[#B26A3C]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-sans tracking-wider uppercase text-[#4A3223]">
                    GSTIN (Optional)
                  </label>
                  <input
                    type="text"
                    value={form.gstin}
                    onChange={(e) => setForm({ ...form, gstin: e.target.value.toUpperCase() })}
                    placeholder="05AAAAA0000A1Z5"
                    className="w-full bg-[#EFE4CF]/60 border border-[#B8964F]/40 p-3 text-xs text-[#2A1A12] focus:outline-none focus:border-[#B26A3C]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-sans tracking-wider uppercase text-[#4A3223]">
                    Bank Account Number *
                  </label>
                  <input
                    type="password"
                    required
                    value={form.bankAccount}
                    onChange={(e) => setForm({ ...form, bankAccount: e.target.value })}
                    placeholder="••••••••••••"
                    className="w-full bg-[#EFE4CF]/60 border border-[#B8964F]/40 p-3 text-xs text-[#2A1A12] focus:outline-none focus:border-[#B26A3C]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-sans tracking-wider uppercase text-[#4A3223]">
                    IFSC Branch Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.bankIfsc}
                    onChange={(e) => setForm({ ...form, bankIfsc: e.target.value.toUpperCase() })}
                    placeholder="SBIN0000123"
                    className="w-full bg-[#EFE4CF]/60 border border-[#B8964F]/40 p-3 text-xs text-[#2A1A12] focus:outline-none focus:border-[#B26A3C]"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="btn-atelier w-full py-4 text-xs tracking-[0.2em] uppercase transition-all"
                >
                  Submit Workshop Petition to Council
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
