'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Award, FileCheck, CheckCircle2, Hammer, QrCode, Sparkles } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export default function AuthenticityPage() {
  const { language } = useLanguage();

  return (
    <div className="bg-[#EFE4CF] min-h-screen text-[#2A1A12] py-14 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Curatorial Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="wax-seal w-14 h-14 rounded-full flex items-center justify-center mx-auto text-xs font-serif font-bold">
            TM
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#12302B] leading-tight">
            The Provenance Protocol
          </h1>
          <div className="kumaoni-divider my-2">
            <span className="w-2 h-2 rotate-45 border border-[#B8964F] bg-[#FAF4E8]"></span>
          </div>
          <p className="text-xs sm:text-sm text-[#5C3E2C] font-light leading-relaxed">
            How we protect the 500-year legacy of Uttarakhand coppersmiths from machine pressing, scrap adulteration, and industrial shortcuts.
          </p>
        </div>

        <div className="museum-plaque bg-[#FAF4E8] p-8 sm:p-12 space-y-10">
          {/* Core Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 border border-[#B8964F]/30 bg-[#FAF3E8] space-y-3 text-center">
              <div className="w-12 h-12 rounded-full border border-[#B8964F] text-[#8C4E28] flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-base font-normal text-[#12302B]">
                Hand-Checked Pure Copper
              </h3>
              <p className="text-xs text-[#5C3E2C] font-light leading-relaxed">
                Beaten from single virgin sheets over mountain oak charcoal. Zero recycled scrap wire or casting fillers.
              </p>
            </div>

            <div className="p-6 border border-[#B8964F]/30 bg-[#FAF3E8] space-y-3 text-center">
              <div className="w-12 h-12 rounded-full border border-[#B8964F] text-[#8C4E28] flex items-center justify-center mx-auto">
                <Hammer className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-base font-normal text-[#12302B]">
                500-Year Guild Lineage
              </h3>
              <p className="text-xs text-[#5C3E2C] font-light leading-relaxed">
                Every vessel is hand-raised over tapered horn anvils without mechanical dies or industrial stamping.
              </p>
            </div>

            <div className="p-6 border border-[#B8964F]/30 bg-[#FAF3E8] space-y-3 text-center">
              <div className="w-12 h-12 rounded-full border border-[#B8964F] text-[#8C4E28] flex items-center justify-center mx-auto">
                <QrCode className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-base font-normal text-[#12302B]">
                Numbered Provenance QR
              </h3>
              <p className="text-xs text-[#5C3E2C] font-light leading-relaxed">
                Each piece carries a registered certificate QR recording the master artisan, village, hours of work, and making date.
              </p>
            </div>
          </div>

          {/* Archival Certificate Specimen */}
          <div className="border border-[#B8964F] p-6 sm:p-8 bg-[#FAF3E8] space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#B8964F]/30 gap-2">
              <div>
                <span className="text-[10px] text-[#8C4E28] uppercase tracking-[0.25em] font-sans">
                  Specimen Provenance Record
                </span>
                <h4 className="font-serif text-2xl font-normal text-[#12302B]">
                  Archival Provenance Attestation
                </h4>
              </div>
              <span className="font-mono text-xs text-[#12302B] bg-[#EFE4CF] px-3 py-1 border border-[#B8964F]/40">
                Status: Hand-Checked Pure Copper
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-sans">
              <div className="p-3 bg-[#FAF4E8] border border-[#B8964F]/30">
                <span className="text-[#8C4E28] block text-[10px] uppercase">Material</span>
                <strong className="font-serif text-base text-[#12302B]">Virgin Copper</strong>
              </div>
              <div className="p-3 bg-[#FAF4E8] border border-[#B8964F]/30">
                <span className="text-[#8C4E28] block text-[10px] uppercase">Origin</span>
                <strong className="font-serif text-base text-[#12302B]">Almora, Uttarakhand</strong>
              </div>
              <div className="p-3 bg-[#FAF4E8] border border-[#B8964F]/30">
                <span className="text-[#8C4E28] block text-[10px] uppercase">Anvil Labor</span>
                <strong className="font-serif text-base text-[#12302B]">14 Hours by Hand</strong>
              </div>
              <div className="p-3 bg-[#FAF4E8] border border-[#B8964F]/30">
                <span className="text-[#8C4E28] block text-[10px] uppercase">Interior Kalai</span>
                <strong className="font-serif text-base text-[#12302B]">99.9% Food Grade Tin</strong>
              </div>
            </div>

            <div className="text-[11px] text-[#5C3E2C] font-serif leading-relaxed pt-2 border-t border-[#B8964F]/20">
              Note on lab figures: In accordance with our honesty charter, metallurgical or laboratory figures are shown only when an actual lab test report document is uploaded for that specific batch. Otherwise, all pieces are certified as hand-checked pure copper by the Almora Tamta Guild.
            </div>
          </div>

          <div className="text-center pt-2">
            <Link
              href="/shop"
              className="btn-atelier inline-block px-8 py-3.5 text-xs tracking-widest uppercase"
            >
              Explore Verified Pieces
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
