'use client';

import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import {
  MessageCircle,
  Clock,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Instagram,
} from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import {
  formatDisplayNumber,
  isWithinSupportHours,
  buildWhatsAppClickUrl,
  getPreFilledMessage,
  SupportHoursStatus,
} from '@/lib/whatsapp/config';

export default function ContactPage() {
  const { language } = useLanguage();
  const [supportStatus, setSupportStatus] = useState<SupportHoursStatus>({
    isOnline: true,
    hoursText: 'Mon-Sat 10:00-19:00 IST',
    nextOpeningText: 'Tomorrow at 10:00 IST',
  });
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  const preFilledText = getPreFilledMessage({ type: 'home' });
  const waUrl = buildWhatsAppClickUrl(preFilledText);
  const displayNumber = formatDisplayNumber();

  useEffect(() => {
    // Evaluate support hours in India Standard Time
    const status = isWithinSupportHours();
    setSupportStatus(status);

    // Generate QR code for desktop patrons to scan with their mobile
    QRCode.toDataURL(waUrl, {
      width: 220,
      margin: 2,
      color: {
        dark: '#12302B',
        light: '#FAF4E8',
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('Failed to generate WhatsApp QR code', err));
  }, [waUrl]);

  return (
    <div className="bg-[#FAF4E8] text-[#2A1A12] min-h-screen font-body selection:bg-[#8C4E28] selection:text-[#FAF4E8]">
      {/* Editorial Masthead */}
      <section className="bg-[#12302B] text-[#FAF4E8] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#B8964F]/30 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#B8964F]/40 bg-[#0B1F1C] text-[#B8964F] text-xs font-serif uppercase tracking-[0.2em]">
            <span>✦</span>
            <span>{language === 'hi' ? 'कारीगर कार्यशाला संपर्क' : 'Atelier Concierge'}</span>
            <span>✦</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-wide text-[#FAF4E8] leading-tight">
            {language === 'hi' ? 'हमसे संपर्क करें' : 'Contact the Atelier'}
          </h1>

          <div className="kumaoni-divider my-2">
            <span className="text-[#B8964F] text-xs">✦</span>
          </div>

          <p className="text-sm sm:text-base text-[#EFE4CF]/90 max-w-xl mx-auto font-light leading-relaxed">
            {language === 'hi'
              ? 'हमारे अल्मोड़ा शिल्पियों से सीधे संवाद करें। पात्र चयन, कलाई सेवा अथवा कस्टम नक्काशी के लिए परामर्श उपलब्ध है।'
              : 'Speak directly with our Almora coppersmith workshop. Inquire about raw purity, Kalai re-tinning, or bespoke heraldic engravings.'}
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: WhatsApp Primary Card */}
          <div className="lg:col-span-7 bg-[#EFE4CF] rounded-3xl p-6 sm:p-10 border border-[#B8964F]/40 shadow-xl space-y-6 museum-plaque">
            <div className="flex items-center justify-between pb-4 border-b border-[#B8964F]/30">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-[#8C4E28] font-sans font-semibold">
                  Primary Patron Channel
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#12302B]">
                  WhatsApp Support
                </h2>
              </div>

              {/* Online/Offline Status Pill based on IST Support Hours */}
              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-serif tracking-wide border ${
                  supportStatus.isOnline
                    ? 'bg-[#4E6E58]/15 border-[#4E6E58] text-[#4E6E58]'
                    : 'bg-[#B8964F]/15 border-[#B8964F] text-[#8C4E28]'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    supportStatus.isOnline ? 'bg-[#4E6E58]' : 'bg-[#B8964F]'
                  }`}
                />
                <span className="font-medium">
                  {supportStatus.isOnline ? 'Online now' : 'We reply during support hours'}
                </span>
              </div>
            </div>

            {/* Direct Number & Hours Details */}
            <div className="space-y-4 text-xs sm:text-sm text-[#2A1A12]/90">
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#FAF4E8] border border-[#B8964F]/30">
                <Phone className="w-4 h-4 text-[#8C4E28] shrink-0" />
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#8C4E28] block font-sans font-semibold">
                    Direct Support Number
                  </span>
                  <a
                    href={`tel:${displayNumber.replace(/\s+/g, '')}`}
                    className="font-serif text-base font-bold text-[#12302B] hover:text-[#8C4E28] transition-colors"
                  >
                    {displayNumber}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#FAF4E8] border border-[#B8964F]/30">
                <Clock className="w-4 h-4 text-[#8C4E28] shrink-0" />
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#8C4E28] block font-sans font-semibold">
                    Support Hours
                  </span>
                  <span className="font-serif text-xs text-[#12302B]">
                    {supportStatus.hoursText}
                  </span>
                  {!supportStatus.isOnline && (
                    <span className="block text-[11px] text-[#8C4E28] mt-0.5 font-serif italic">
                      Replies resume {supportStatus.nextOpeningText}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-2 space-y-3">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-lg btn-atelier text-xs font-sans uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Message us on WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <p className="text-[11px] text-[#2A1A12]/70 text-center font-serif">
                Opens directly in WhatsApp with an archival inquiry greeting.
              </p>
            </div>
          </div>

          {/* Right Column: QR Code + Fallback Contact Channels */}
          <div className="lg:col-span-5 space-y-6">
            {/* QR Code Plaque */}
            <div className="bg-[#FAF4E8] rounded-3xl p-6 border border-[#B8964F]/50 shadow-md text-center space-y-4 museum-plaque">
              <span className="text-[10px] uppercase tracking-wider text-[#8C4E28] font-sans font-semibold block">
                Instant Mobile Scan
              </span>
              <h3 className="font-serif text-xl text-[#12302B]">
                Scan to Chat
              </h3>

              {qrDataUrl ? (
                <div className="inline-block p-3 rounded-2xl bg-[#FAF4E8] border-2 border-[#B8964F]/50 shadow-inner">
                  <img
                    src={qrDataUrl}
                    alt="WhatsApp Chat QR Code"
                    className="w-44 h-44 mx-auto rounded-lg"
                  />
                </div>
              ) : (
                <div className="w-44 h-44 mx-auto bg-[#EFE4CF] rounded-lg animate-pulse" />
              )}

              <p className="text-xs text-[#2A1A12]/80 font-body leading-relaxed max-w-xs mx-auto">
                Scan with your phone camera to start a direct WhatsApp conversation with our Almora workshop.
              </p>
            </div>

            {/* Fallback Channels */}
            <div className="bg-[#EFE4CF] rounded-2xl p-5 border border-[#B8964F]/30 space-y-3 text-xs text-[#2A1A12]">
              <span className="text-[10px] uppercase tracking-wider text-[#8C4E28] font-sans font-semibold block">
                Alternative Inquiries
              </span>

              <div className="space-y-2">
                <a
                  href="https://instagram.com/tamrasshilp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-[#FAF4E8] transition-colors group"
                >
                  <Instagram className="w-4 h-4 text-[#8C4E28] shrink-0 group-hover:scale-110 transition-transform" />
                  <div className="flex flex-col">
                    <span className="font-serif font-medium text-xs text-[#12302B]">@tamrasshilp</span>
                    <span className="text-[10px] text-[#2A1A12]/60">Follow our atelier on Instagram</span>
                  </div>
                </a>

                <a
                  href="mailto:concierge@tamrashilp.in"
                  className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-[#FAF4E8] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#8C4E28] shrink-0" />
                  <span>concierge@tamrashilp.in</span>
                </a>

                <div className="flex items-start gap-2.5 p-2 rounded-lg">
                  <MapPin className="w-4 h-4 text-[#8C4E28] shrink-0 mt-0.5" />
                  <span>Tamta Mohalla, Almora, Uttarakhand 263601</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quiet Reassurance Banner */}
        <div className="bg-[#FAF4E8] rounded-2xl p-6 border border-[#B8964F]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-serif text-[#2A1A12]/80">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#4E6E58] shrink-0" />
            <span>
              Patron Privacy Assured: We never send unsolicited promotions. Your phone number is strictly used for requested assistance and opted-in order updates.
            </span>
          </div>
          <span className="shrink-0 text-[11px] text-[#8C4E28]">
            DPDP Act 2023 Compliant
          </span>
        </div>
      </div>
    </div>
  );
}

