'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import QRCode from 'qrcode';
import { ShieldCheck, Award, Hammer, Clock, MapPin, CheckCircle2, BookmarkPlus, ArrowLeft } from 'lucide-react';
import { PRODUCTS } from '@/lib/mockData';
import { getSiteSettings, formatArtisanProvenance } from '@/lib/siteSettings';

export default function CertificatePage() {
  const params = useParams();
  const certId = (params?.id as string) || 'TS-2026-0814';
  const settings = getSiteSettings();

  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [isRegistered, setIsRegistered] = useState(false);

  // Link to matching product or fallback
  const product = PRODUCTS[0];
  const hasRealLabReport = false; // By rule: only show lab figures if real document exists

  useEffect(() => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://tamrashilp.in/certificate/${certId}`;
    QRCode.toDataURL(currentUrl, {
      width: 200,
      margin: 1,
      color: { dark: '#12302B', light: '#FAF4E8' },
    }).then(setQrCodeDataUrl).catch(console.error);

    // Check if already in my collection
    try {
      const collection = JSON.parse(localStorage.getItem('tamtashilp_my_collection') || '[]');
      if (collection.some((item: any) => item.certId === certId)) {
        setIsRegistered(true);
      }
    } catch {}
  }, [certId]);

  const handleAddToMyCollection = () => {
    try {
      const collection = JSON.parse(localStorage.getItem('tamtashilp_my_collection') || '[]');
      if (!collection.some((item: any) => item.certId === certId)) {
        collection.push({
          certId,
          productTitle: product.title,
          productSlug: product.slug,
          registeredAt: new Date().toISOString(),
          makingDate: 'October 2026',
          reTinningDueMonths: 12,
        });
        localStorage.setItem('tamtashilp_my_collection', JSON.stringify(collection));
      }
      setIsRegistered(true);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-[#EFE4CF] min-h-screen text-[#2A1A12] py-12 sm:py-20 font-body">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-[#8C4E28] hover:text-[#723F20] font-serif transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Tamrashilp Atelier</span>
        </Link>

        {/* Master Certificate Plaque */}
        <div className="bg-[#FAF4E8] rounded-3xl border-2 border-[#B8964F] p-8 sm:p-12 shadow-2xl space-y-8 museum-plaque relative overflow-hidden">
          {/* Subtle archival watermark border */}
          <div className="absolute top-3 left-3 text-brass-500/30 text-xs font-serif pointer-events-none">✦</div>
          <div className="absolute top-3 right-3 text-brass-500/30 text-xs font-serif pointer-events-none">✦</div>
          <div className="absolute bottom-3 left-3 text-brass-500/30 text-xs font-serif pointer-events-none">✦</div>
          <div className="absolute bottom-3 right-3 text-brass-500/30 text-xs font-serif pointer-events-none">✦</div>

          {/* Certificate Header */}
          <div className="text-center space-y-2 border-b border-[#B8964F]/30 pb-6">
            <div className="wax-seal w-12 h-12 rounded-full flex items-center justify-center mx-auto text-xs font-serif font-bold text-[#FAF4E8]">
              DKT
            </div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C4E28] font-sans font-semibold block">
              Official Certificate of Provenance
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl text-[#12302B] font-normal">
              Folio #{certId}
            </h1>
            <p className="text-xs text-[#5C3E2C] font-serif">
              Archival Metalcraft Registry • Tamta Mohalla, Almora, Uttarakhand
            </p>
          </div>

          {/* Master Craftsman Attestation Rule: Every product page & certificate reads this */}
          <div className="p-4 rounded-2xl bg-[#EFE4CF]/60 border border-[#B8964F]/40 text-center space-y-1">
            <span className="text-[10px] uppercase tracking-widest text-[#8C4E28] font-sans font-semibold">
              Sole Artisan Attestation
            </span>
            <p className="font-serif text-base sm:text-lg text-[#12302B] font-medium">
              &ldquo;{formatArtisanProvenance(settings, 'en')}&rdquo;
            </p>
            <p className="text-[11px] text-[#5C3E2C] font-serif">
              Hand-raised over iron stakes without mechanical die-pressing.
            </p>
          </div>

          {/* Grid of Provenance Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-serif">
            <div className="p-3 rounded-xl bg-[#FAF4E8] border border-[#B8964F]/30 space-y-1">
              <span className="text-[#8C4E28] text-[10px] uppercase font-sans">Making Date</span>
              <p className="text-[#12302B] font-medium">October 2026</p>
            </div>
            <div className="p-3 rounded-xl bg-[#FAF4E8] border border-[#B8964F]/30 space-y-1">
              <span className="text-[#8C4E28] text-[10px] uppercase font-sans">Anvil Labor</span>
              <p className="text-[#12302B] font-medium">14 Hours of Hand Work</p>
            </div>
            <div className="p-3 rounded-xl bg-[#FAF4E8] border border-[#B8964F]/30 space-y-1">
              <span className="text-[#8C4E28] text-[10px] uppercase font-sans">Anvil Blows</span>
              <p className="text-[#12302B] font-medium">2,400 Strikes</p>
            </div>
            <div className="p-3 rounded-xl bg-[#FAF4E8] border border-[#B8964F]/30 space-y-1">
              <span className="text-[#8C4E28] text-[10px] uppercase font-sans">Metallurgy</span>
              <p className="text-[#12302B] font-medium">
                {hasRealLabReport ? '99.2% NABL Certified' : 'Hand-checked pure copper'}
              </p>
            </div>
          </div>

          {/* Honest Metallurgy Disclosure */}
          <div className="p-4 rounded-xl bg-[#FAF4E8] border border-[#B8964F]/25 text-[11px] text-[#5C3E2C] font-serif leading-relaxed space-y-1">
            <span className="font-bold text-[#8C4E28] block">Craft Honesty Protocol:</span>
            <p>
              Metallurgical assay figures or NABL certification badges are displayed only when an official laboratory report document is physically filed for that forging lot. This vessel is certified as virgin electrolytic copper hand-checked by the master artisan.
            </p>
          </div>

          {/* QR Code and Registration */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-[#B8964F]/30">
            <div className="flex items-center gap-4">
              {qrCodeDataUrl ? (
                <img
                  src={qrCodeDataUrl}
                  alt={`QR code for certificate ${certId}`}
                  className="w-24 h-24 rounded-lg border border-[#B8964F]/50 p-1 bg-[#FAF4E8]"
                />
              ) : (
                <div className="w-24 h-24 bg-[#EFE4CF] rounded-lg animate-pulse" />
              )}
              <div className="space-y-1 text-xs">
                <span className="font-serif font-bold text-[#12302B]">Permanent Ledger QR</span>
                <p className="text-[#5C3E2C] text-[11px]">
                  Scan anytime to verify making origin or transfer ownership.
                </p>
              </div>
            </div>

            {/* Add to My Collection Action */}
            <div>
              {isRegistered ? (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#4E6E58]/10 border border-[#4E6E58] text-[#4E6E58] text-xs font-serif">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Enrolled in My Collection</span>
                </div>
              ) : (
                <button
                  onClick={handleAddToMyCollection}
                  className="px-5 py-2.5 rounded-xl bg-[#8C4E28] hover:bg-[#723F20] text-[#FAF4E8] text-xs font-serif uppercase tracking-widest transition-colors flex items-center gap-2 shadow"
                >
                  <BookmarkPlus className="w-4 h-4" />
                  <span>Enroll in My Collection</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

