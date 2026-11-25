'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Hammer, Award, ShieldCheck, MapPin, Volume2, VolumeX, MessageSquare, RefreshCw, Instagram, Mail, Phone } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { buildWhatsAppClickUrl, getPreFilledMessage } from '@/lib/whatsapp/config';

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();
  const [isAudioMuted, setIsAudioMuted] = useState(true);

  const toggleFooterAudio = () => {
    setIsAudioMuted(!isAudioMuted);
    // Find any active video or audio and sync
    const video = document.querySelector('video');
    if (video) {
      video.muted = !isAudioMuted;
    }
  };

  return (
    <footer className="bg-patina-950 text-parchment-200 border-t border-brass-600/35 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-brass-700/20">
          {/* Brand Philosophy & Provenance */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <span className="w-8 h-8 rounded-full wax-seal flex items-center justify-center">
                <Hammer className="w-4 h-4 text-ivory" />
              </span>
              <span className="font-display text-2xl tracking-[0.2em] text-ivory uppercase">
                {t('brandName')}
              </span>
            </div>

            <p className="text-parchment-300 text-xs sm:text-sm leading-relaxed max-w-md font-body">
              {t('footerAbout')}
            </p>

            <div className="pt-1 flex items-center space-x-2 text-xs text-brass-400 font-serif">
              <Award className="w-4 h-4 text-brass-500" />
              <span>Registered Uttarakhand Metalcraft Cluster • Almora & Bageshwar</span>
            </div>

            <div className="pt-0.5">
              <a
                href="https://instagram.com/tamrashilp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-brass-300 hover:text-ivory transition-colors font-serif"
              >
                <Instagram className="w-3.5 h-3.5 text-copper-400" />
                <span>Follow our workshop story: <strong className="text-copper-300 font-semibold">@tamrashilp</strong></span>
              </a>
            </div>

            {/* Ayurvedic Notice in Footer */}
            <div className="bg-patina-900/90 border border-brass-700/30 rounded-xl p-3 text-xs text-parchment-300 space-y-1 font-body">
              <span className="font-serif font-bold text-brass-400 block tracking-wider uppercase text-[10px]">
                Classical Care Guidance:
              </span>
              <p className="leading-snug">
                Traditionally used in Ayurveda for resting dawn drinking water (Ushapan). Store plain water only. Do not store acidic liquids (citrus, tamarind, yogurt, tomato) in unlined copper vessels.
              </p>
            </div>
          </div>

          {/* Catalog Folios */}
          <div className="space-y-3 font-serif">
            <h4 className="text-xs uppercase tracking-[0.2em] text-brass-400 font-semibold">
              The Folios
            </h4>
            <ul className="space-y-2 text-xs text-parchment-300 font-body">
              <li>
                <Link href="/shop?category=water-bottles-jugs" className="hover:text-ivory transition-colors">
                  Water Vessels & Carafes
                </Link>
              </li>
              <li>
                <Link href="/shop?category=lotas-glasses" className="hover:text-ivory transition-colors">
                  Drinking Tumblers & Lotas
                </Link>
              </li>
              <li>
                <Link href="/shop?category=cookware" className="hover:text-ivory transition-colors">
                  The Kitchen Heirlooms (Kalai)
                </Link>
              </li>
              <li>
                <Link href="/shop?category=serveware" className="hover:text-ivory transition-colors">
                  Tableware & Banquet Steins
                </Link>
              </li>
              <li>
                <Link href="/shop?category=pooja-items" className="hover:text-ivory transition-colors">
                  Sacred Pooja Sanctum
                </Link>
              </li>
              <li>
                <Link href="/shop?category=gift-sets" className="hover:text-ivory transition-colors">
                  Gifts of Heritage
                </Link>
              </li>
            </ul>
          </div>

          {/* The Guild & The Making */}
          <div className="space-y-3 font-serif">
            <h4 className="text-xs uppercase tracking-[0.2em] text-brass-400 font-semibold">
              The Guild
            </h4>
            <ul className="space-y-2 text-xs text-parchment-300 font-body">
              <li>
                <Link href="/master-craftsman" className="hover:text-ivory transition-colors">
                  The Master Craftsman
                </Link>
              </li>
              <li>
                <Link href="/craft-process" className="hover:text-ivory transition-colors">
                  The Making: Six Steps
                </Link>
              </li>
              <li>
                <Link href="/custom-order" className="hover:text-ivory transition-colors">
                  Bespoke Commission
                </Link>
              </li>
              <li>
                <Link href="/services/kalai" className="hover:text-ivory transition-colors">
                  Re-tinning (Kalai) Service
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-ivory transition-colors">
                  The Copper Journal
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-ivory transition-colors">
                  Curator Administration
                </Link>
              </li>
            </ul>
          </div>

          {/* Patron Trust & Policies */}
          <div className="space-y-3 font-serif">
            <h4 className="text-xs uppercase tracking-[0.2em] text-brass-400 font-semibold">
              Patron Sanctuary
            </h4>
            <ul className="space-y-2 text-xs text-parchment-300 font-body">
              <li>
                <Link href="/faq" className="hover:text-ivory transition-colors">
                  Patron FAQ & Inquiries
                </Link>
              </li>
              <li>
                <Link href="/care" className="text-copper-400 hover:text-copper-300 font-medium transition-colors">
                  Care & Re-tinning (Kalai)
                </Link>
              </li>
              <li>
                <Link href="/shipping-returns" className="hover:text-ivory transition-colors">
                  Returns & Repair Promise
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-ivory transition-colors">
                  Track order
                </Link>
              </li>
              <li>
                <Link href="/authenticity" className="hover:text-ivory transition-colors">
                  Certificate of Provenance
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-ivory transition-colors">
                  Contact the Atelier
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-ivory transition-colors">
                  The Guild Charter & Terms
                </Link>
              </li>
              <li>
                <a
                  href="mailto:tamrashilpstore@gmail.com"
                  className="flex items-center gap-1.5 text-parchment-300 hover:text-ivory transition-colors pt-1"
                >
                  <Mail className="w-3.5 h-3.5 text-brass-400" />
                  <span>tamrashilpstore@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+919557058767"
                  className="flex items-center gap-1.5 text-parchment-300 hover:text-ivory transition-colors pt-0.5"
                >
                  <Phone className="w-3.5 h-3.5 text-brass-400" />
                  <span>+91 95570 58767</span>
                </a>
              </li>
              <li>
                <a
                  href={buildWhatsAppClickUrl(getPreFilledMessage({ type: 'care' }))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sage-400 hover:text-sage-300 transition-colors pt-1"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Concierge</span>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/tamrasshilp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-copper-400 hover:text-copper-300 transition-colors pt-1"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Instagram (@tamrasshilp)</span>
                </a>
              </li>
              <li className="pt-2 text-brass-400 flex items-center space-x-1.5 text-xs font-serif">
                <MapPin className="w-3.5 h-3.5 text-brass-500 shrink-0" />
                <span>Tamta Mohalla, Almora, Uttarakhand</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar with Audio Mute Control */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-brass-500/80 gap-4 font-serif">
          <p>{t('footerCopyright')}</p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-parchment-400">
            {/* Audio Mute Control */}
            <button
              onClick={toggleFooterAudio}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-brass-600/40 bg-patina-900/80 text-[11px] text-brass-300 hover:text-ivory transition-colors"
              title={isAudioMuted ? 'Sound is currently muted' : 'Sound is currently live'}
            >
              {isAudioMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-brass-400" />
                  <span>Audio: Muted</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-copper-400 animate-pulse" />
                  <span>Audio: Live</span>
                </>
              )}
            </button>

            <span className="flex items-center space-x-1.5 text-brass-400">
              <ShieldCheck className="w-4 h-4 text-brass-500" />
              <span>Razorpay 256-bit Encrypted Settlement</span>
            </span>
            <span className="hidden md:inline">UPI • GPay • Cards • NetBanking • Handover COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
