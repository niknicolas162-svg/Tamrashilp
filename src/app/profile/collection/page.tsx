'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookmarkPlus, ShieldCheck, Clock, Flame, Calendar, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { PRODUCTS } from '@/lib/mockData';

interface RegisteredPiece {
  certId: string;
  productTitle: string;
  productSlug: string;
  registeredAt: string;
  makingDate: string;
  reTinningDueMonths: number;
}

export default function MyCollectionPage() {
  const { user } = useAuth();
  const [collection, setCollection] = useState<RegisteredPiece[]>([]);
  const [newCertId, setNewCertId] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('tamtashilp_my_collection');
      if (stored) {
        setCollection(JSON.parse(stored));
      } else {
        // Seed initial sample piece for registered patrons
        const initialPiece: RegisteredPiece = {
          certId: 'TS-2026-0814',
          productTitle: 'Royal Almora Hammered Pure Copper Water Bottle (1000ml)',
          productSlug: 'royal-almora-hammered-pure-copper-water-bottle-1000ml',
          registeredAt: new Date().toISOString(),
          makingDate: 'October 2026',
          reTinningDueMonths: 12,
        };
        setCollection([initialPiece]);
        localStorage.setItem('tamtashilp_my_collection', JSON.stringify([initialPiece]));
      }
    } catch {
      setCollection([]);
    }
  }, []);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = newCertId.trim().toUpperCase();
    if (!cleanId) return;

    const newPiece: RegisteredPiece = {
      certId: cleanId,
      productTitle: 'Handcrafted Tamta Heirloom Vessel',
      productSlug: 'royal-almora-hammered-pure-copper-water-bottle-1000ml',
      registeredAt: new Date().toISOString(),
      makingDate: 'Autumn 2026',
      reTinningDueMonths: 12,
    };

    const updated = [newPiece, ...collection.filter((p) => p.certId !== cleanId)];
    setCollection(updated);
    localStorage.setItem('tamtashilp_my_collection', JSON.stringify(updated));
    setNewCertId('');
    setSuccessMessage(`Folio #${cleanId} registered into your collection ledger.`);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="bg-[#FAF4E8] text-[#2A1A12] min-h-screen font-body selection:bg-[#8C4E28] selection:text-[#FAF4E8] py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex items-center justify-between">
          <Link
            href="/profile"
            className="inline-flex items-center gap-1.5 text-xs text-[#8C4E28] hover:text-[#723F20] font-serif transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Account Sanctuary</span>
          </Link>
          <span className="text-xs text-[#5C3E2C] font-serif">
            {collection.length} Registered {collection.length === 1 ? 'Piece' : 'Pieces'}
          </span>
        </div>

        {/* Header Plaque */}
        <div className="space-y-2 border-b border-[#B8964F]/30 pb-4">
          <span className="text-[10px] uppercase font-serif tracking-[0.25em] text-[#8C4E28] font-semibold">
            Patron Vault
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#12302B] font-normal">
            My Handcrafted Collection & Care Ledger
          </h1>
          <p className="text-xs sm:text-sm text-[#5C3E2C] font-light">
            Keep track of the pieces you own, monitor upcoming Kalai re-tinning schedules, and access permanent certificates.
          </p>
        </div>

        {/* Register New Certificate Card */}
        <div className="bg-[#EFE4CF] rounded-2xl p-6 border border-[#B8964F]/40 museum-plaque space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-base text-[#12302B] font-medium">
              Enroll a Piece via Certificate Folio
            </h2>
            <span className="text-[10px] font-mono text-[#8C4E28]">QR Certificate Record</span>
          </div>

          <form onSubmit={handleRegister} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={newCertId}
              onChange={(e) => setNewCertId(e.target.value)}
              placeholder="e.g. TS-2026-0814"
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#FAF4E8] border border-[#B8964F]/50 text-xs font-mono tracking-wider focus:outline-none focus:border-[#8C4E28]"
              required
            />
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#8C4E28] hover:bg-[#723F20] text-[#FAF4E8] text-xs font-serif uppercase tracking-widest transition-colors flex items-center justify-center gap-1.5"
            >
              <BookmarkPlus className="w-4 h-4" />
              <span>Enroll Piece</span>
            </button>
          </form>

          {successMessage && (
            <p className="text-xs text-[#4E6E58] font-serif flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{successMessage}</span>
            </p>
          )}
        </div>

        {/* Registered Pieces List */}
        <div className="space-y-4">
          <h2 className="font-serif text-lg text-[#12302B]">Active Heirlooms Under Care</h2>

          {collection.length === 0 ? (
            <div className="p-8 text-center bg-[#EFE4CF] rounded-2xl border border-[#B8964F]/30 space-y-2">
              <p className="text-sm font-serif text-[#12302B]">No pieces registered yet.</p>
              <p className="text-xs text-[#5C3E2C]">
                Scan your certificate QR code or enter your folio number above to enroll.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {collection.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#FAF4E8] rounded-2xl border border-[#B8964F]/40 p-6 museum-plaque space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#B8964F]/20 pb-3">
                    <div>
                      <span className="text-[10px] font-mono text-[#8C4E28] uppercase tracking-wider">
                        Folio #{item.certId}
                      </span>
                      <h3 className="font-serif text-lg font-medium text-[#12302B]">
                        {item.productTitle}
                      </h3>
                    </div>
                    <Link
                      href={`/certificate/${item.certId}`}
                      className="text-xs text-[#8C4E28] hover:underline font-serif shrink-0"
                    >
                      View Numbered Certificate QR →
                    </Link>
                  </div>

                  {/* Care & Maintenance Schedule */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-serif">
                    <div className="p-3 bg-[#EFE4CF]/60 rounded-xl border border-[#B8964F]/25 space-y-1">
                      <span className="text-[#8C4E28] text-[10px] uppercase font-sans flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Forged / Registered
                      </span>
                      <p className="text-[#12302B] font-medium">{item.makingDate}</p>
                    </div>

                    <div className="p-3 bg-[#EFE4CF]/60 rounded-xl border border-[#B8964F]/25 space-y-1">
                      <span className="text-[#8C4E28] text-[10px] uppercase font-sans flex items-center gap-1">
                        <Flame className="w-3 h-3 text-[#B8964F]" />
                        Kalai Re-Tinning Due
                      </span>
                      <p className="text-[#12302B] font-medium">In {item.reTinningDueMonths} months</p>
                    </div>

                    <div className="p-3 bg-[#EFE4CF]/60 rounded-xl border border-[#B8964F]/25 space-y-1">
                      <span className="text-[#4E6E58] text-[10px] uppercase font-sans flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        Guild Warranty
                      </span>
                      <p className="text-[#4E6E58] font-medium">Generational Anvil Guarantee</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs font-serif">
                    <span className="text-[#5C3E2C] text-[11px]">
                      Handcrafted by Devendra Kumar Tamta, Tamta coppersmith lineage, Uttarakhand.
                    </span>
                    <Link
                      href="/services/kalai"
                      className="px-4 py-2 rounded-lg bg-[#4E6E58] hover:bg-[#3D5645] text-[#FAF4E8] text-center transition-colors"
                    >
                      Book Kalai Re-tinning
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

