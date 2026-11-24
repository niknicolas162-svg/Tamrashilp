'use client';

import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { X, Award, CheckCircle, Hammer, MapPin } from 'lucide-react';
import { Product } from '@/types';

interface AuthenticityModalProps {
  product: Product | null;
  onClose: () => void;
}

export const AuthenticityModal: React.FC<AuthenticityModalProps> = ({ product, onClose }) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  useEffect(() => {
    if (product) {
      const verificationUrl = `${typeof window !== 'undefined' ? window.location.origin : 'https://tamtashilp.in'}/authenticity?cert=${product.purityCertificationNo}&sku=${product.slug}`;
      QRCode.toDataURL(verificationUrl, {
        width: 180,
        margin: 2,
        color: {
          dark: '#12302B',
          light: '#F7F0E1',
        },
      })
        .then((url) => setQrDataUrl(url))
        .catch((err) => console.error(err));
    }
  }, [product]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto font-body">
      <div
        className="fixed inset-0 bg-patina-950/85 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative bg-parchment-200 rounded-2xl max-w-lg w-full border-2 border-brass-500/70 shadow-2xl p-6 sm:p-8 overflow-hidden text-walnut-900">
          {/* Ornamental corner accents */}
          <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-brass-600 pointer-events-none"></div>
          <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-brass-600 pointer-events-none"></div>
          <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-brass-600 pointer-events-none"></div>
          <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-brass-600 pointer-events-none"></div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full text-walnut-800 hover:text-copper-700"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Certificate Header */}
          <div className="text-center space-y-2 border-b border-brass-600/30 pb-5">
            <span className="wax-seal inline-flex items-center gap-1.5 text-[10px] font-serif font-bold px-3 py-1 rounded-full">
              <Award className="w-3.5 h-3.5 text-brass-300" />
              The Tamta Archival Guild Guarantee
            </span>
            <h3 className="font-serif text-2xl font-normal text-walnut-950 tracking-wider">
              Certificate of Provenance
            </h3>
            <p className="text-xs text-brass-700 font-serif">
              Archival Registry No:{' '}
              <span className="font-mono font-bold text-walnut-950">{product.purityCertificationNo}</span>
            </p>
          </div>

          {/* Certificate Body */}
          <div className="py-5 space-y-4 text-xs text-walnut-900">
            <div className="flex items-center gap-4 bg-parchment-100 p-3.5 rounded-xl border border-brass-600/30">
              {qrDataUrl && (
                <img
                  src={qrDataUrl}
                  alt="Authenticity QR"
                  className="w-20 h-20 rounded border border-brass-600/40 p-1 bg-white shadow-xs flex-shrink-0"
                />
              )}
              <div className="space-y-1">
                <p className="font-serif font-bold text-sm text-walnut-950">{product.title}</p>
                <div className="flex items-center gap-1.5 text-xs text-[#8C4E28] font-semibold">
                  <CheckCircle className="w-3.5 h-3.5 text-[#4E6E58]" />
                  <span>Hand-Checked Pure Copper</span>
                </div>
                <p className="text-[11px] text-walnut-700">
                  {product.hoursOfLabor ? `${product.hoursOfLabor} Hours Anvil Labor` : '14 Hours Anvil Labor'} • Autumn 2026
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-parchment-50 border border-brass-600/30 space-y-1">
                <span className="text-[10px] text-brass-700 uppercase font-sans tracking-wider">
                  Master Coppersmith
                </span>
                <p className="font-serif font-bold text-walnut-950 flex items-center gap-1">
                  <Hammer className="w-3.5 h-3.5 text-copper-600" />
                  {product.artisan.name}
                </p>
                <p className="text-[11px] text-walnut-700">{product.artisan.workshopName}</p>
              </div>

              <div className="p-3 rounded-lg bg-parchment-50 border border-brass-600/30 space-y-1">
                <span className="text-[10px] text-brass-700 uppercase font-sans tracking-wider">
                  Origin Village & Date
                </span>
                <p className="font-serif font-bold text-walnut-950 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-copper-600" />
                  {product.village || 'Almora, Uttarakhand'}
                </p>
                <p className="text-[11px] text-walnut-700">500-Year Ancestral Lineage</p>
              </div>
            </div>

            <div className="bg-patina-900 text-ivory p-3.5 rounded-xl border border-brass-600/40 text-xs font-serif leading-relaxed">
              <span className="text-brass-300 font-bold block uppercase text-[10px] tracking-wider mb-0.5">
                Guild Provenance Attestation:
              </span>
              Hand-checked pure copper. Beaten from a virgin sheet over mountain oak charcoal without mechanical pressing or chemical dyes. Every hammer facet is stamped by hand on the anvil.
            </div>
          </div>

          <div className="pt-2 text-center">
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-lg btn-atelier text-xs"
            >
              Close Archival Certificate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
