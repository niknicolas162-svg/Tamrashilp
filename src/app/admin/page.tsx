'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Hammer,
  Package,
  TrendingUp,
  Tag,
  AlertCircle,
  CheckCircle,
  FileText,
  Search,
  Award,
  Sparkles,
  MessageSquare,
  Settings,
  Flame,
  QrCode,
  Layers,
  Save,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { useLanguage } from '@/lib/language-context';
import { PRODUCTS, COUPONS } from '@/lib/mockData';
import { OCCASION_COLLECTIONS } from '@/lib/collections';
import { getSiteSettings, saveSiteSettings, SiteSettings } from '@/lib/siteSettings';

export default function AdminPortalPage() {
  const { user } = useAuth();
  const { language } = useLanguage();

  const [activeTab, setActiveTab] = useState<
    'OVERVIEW' | 'SETTINGS' | 'CERTIFICATES' | 'SERVICES' | 'COLLECTIONS' | 'PRODUCTS'
  >('SETTINGS');

  // Site Settings state
  const [settings, setSettings] = useState<SiteSettings>(getSiteSettings());
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Kalai Service Bookings state
  const [serviceBookings, setServiceBookings] = useState<any[]>([]);

  // Certificates list
  const [certList, setCertList] = useState([
    {
      id: 'TS-2026-0814',
      productName: 'Royal Almora Hammered Pure Copper Bottle (1000ml)',
      artisanName: 'Devendra Kumar Tamta',
      date: '18 Oct 2026',
      hours: 14,
      blows: 2400,
      hasLabReport: false,
      status: 'HAND_CHECKED_PURE',
    },
    {
      id: 'TS-2026-0819',
      productName: 'Bageshwar Heritage Chiseled Jug with Cast Brass Handle (1500ml)',
      artisanName: 'Devendra Kumar Tamta',
      date: '24 Oct 2026',
      hours: 18,
      blows: 3100,
      hasLabReport: false,
      status: 'HAND_CHECKED_PURE',
    },
    {
      id: 'TS-2026-0902',
      productName: 'Traditional Kumaoni Heavy Bottom Culinary Kadhai (2.5L)',
      artisanName: 'Devendra Kumar Tamta',
      date: '02 Nov 2026',
      hours: 22,
      blows: 4200,
      hasLabReport: false,
      status: 'HAND_CHECKED_PURE',
    },
  ]);

  // Product inventory
  const [productList, setProductList] = useState(PRODUCTS);

  useEffect(() => {
    setSettings(getSiteSettings());
    try {
      const stored = localStorage.getItem('tamtashilp_kalai_bookings');
      if (stored) {
        setServiceBookings(JSON.parse(stored));
      } else {
        setServiceBookings([
          {
            bookingRef: 'KALAI-2026-4819',
            vesselName: 'Medium Kadhai / Cooking Pot (2-3.5L)',
            price: 650,
            fullName: 'Aaditya Rawat',
            phone: '+91 98765 43210',
            pickupAddress: 'Sector 4, Dwarka, New Delhi',
            pincode: '110078',
            status: 'CHARCOAL_KALAI_PROGRESS',
            createdAt: '21 Nov 2026',
          },
        ]);
      }
    } catch {}
  }, []);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveSiteSettings(settings);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2500);
  };

  return (
    <div className="bg-[#EFE4CF] min-h-screen text-[#2A1A12] py-12 sm:py-16 font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#B8964F]/30 gap-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B8964F] animate-pulse"></span>
              <span className="text-[10px] text-[#8C4E28] uppercase tracking-[0.25em] font-sans font-semibold">
                Curator Administration Console
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#12302B]">
              Tamrashilp Atelier Admin
            </h1>
            <p className="text-xs text-[#5C3E2C] font-serif">
              Master Craftsman: <strong className="text-[#12302B]">{settings.artisan_name}</strong> • Tamta Mohalla, Almora
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/inbox"
              className="px-4 py-2.5 rounded-xl bg-[#12302B] text-[#FAF4E8] text-xs font-serif flex items-center gap-2 hover:bg-[#0B1F1C] transition-colors border border-[#B8964F]/40"
            >
              <MessageSquare className="w-4 h-4 text-[#B8964F]" />
              <span>WhatsApp Patron Inbox</span>
            </Link>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#B8964F]/30 pb-3 font-serif text-xs">
          {[
            { id: 'SETTINGS', label: 'Site & Artisan Settings', icon: Settings },
            { id: 'CERTIFICATES', label: 'Numbered Certificates', icon: QrCode },
            { id: 'SERVICES', label: 'Kalai Re-tinning Bookings', icon: Flame },
            { id: 'COLLECTIONS', label: 'Occasion Collections', icon: Layers },
            { id: 'PRODUCTS', label: 'Catalog Pieces', icon: Package },
            { id: 'OVERVIEW', label: 'Exchange Overview', icon: TrendingUp },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#12302B] text-[#FAF4E8] shadow-md border border-[#B8964F]/50 font-bold'
                    : 'bg-[#FAF4E8]/60 text-[#2A1A12] hover:bg-[#FAF4E8] border border-transparent'
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-[#B8964F]" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: SITE & ARTISAN SETTINGS */}
        {activeTab === 'SETTINGS' && (
          <form onSubmit={handleSaveSettings} className="space-y-8">
            <div className="bg-[#FAF4E8] rounded-3xl p-6 sm:p-10 border border-[#B8964F]/40 shadow-xl museum-plaque space-y-6">
              <div className="flex items-center justify-between border-b border-[#B8964F]/30 pb-4">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-serif tracking-[0.2em] text-[#8C4E28]">
                    Master Craftsman Profile Configuration
                  </span>
                  <h2 className="font-serif text-2xl text-[#12302B]">
                    Artisan Name & Provenance Setting
                  </h2>
                </div>
                {settingsSaved && (
                  <span className="text-xs text-[#4E6E58] font-serif font-bold flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    Settings Saved
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-serif">
                <div className="space-y-1">
                  <label className="text-[#2A1A12]/80 uppercase tracking-wider text-[10px] block">
                    Master Artisan Name (English)
                  </label>
                  <input
                    type="text"
                    value={settings.artisan_name}
                    onChange={(e) => setSettings({ ...settings, artisan_name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#EFE4CF]/60 border border-[#B8964F]/40 font-sans text-xs focus:outline-none focus:border-[#8C4E28]"
                    required
                  />
                  <p className="text-[11px] text-[#5C3E2C]">
                    Displayed on all product pages, certificates, and QR provenance records.
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-[#2A1A12]/80 uppercase tracking-wider text-[10px] block">
                    Master Artisan Name (Hindi Devanagari)
                  </label>
                  <input
                    type="text"
                    value={settings.artisan_name_hi}
                    onChange={(e) => setSettings({ ...settings, artisan_name_hi: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#EFE4CF]/60 border border-[#B8964F]/40 font-sans text-xs focus:outline-none focus:border-[#8C4E28]"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#2A1A12]/80 uppercase tracking-wider text-[10px] block">
                    Coppersmith Lineage
                  </label>
                  <input
                    type="text"
                    value={settings.artisan_lineage}
                    onChange={(e) => setSettings({ ...settings, artisan_lineage: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#EFE4CF]/60 border border-[#B8964F]/40 font-sans text-xs focus:outline-none focus:border-[#8C4E28]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#2A1A12]/80 uppercase tracking-wider text-[10px] block">
                    Region
                  </label>
                  <input
                    type="text"
                    value={settings.artisan_region}
                    onChange={(e) => setSettings({ ...settings, artisan_region: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#EFE4CF]/60 border border-[#B8964F]/40 font-sans text-xs focus:outline-none focus:border-[#8C4E28]"
                  />
                </div>
              </div>

              {/* Photo Consent & Image Credit Section */}
              <div className="p-4 rounded-2xl bg-[#EFE4CF]/50 border border-[#B8964F]/30 space-y-3 text-xs font-serif">
                <span className="font-bold text-[#8C4E28] uppercase tracking-wider text-[10px] block">
                  Media Ethics & Portrait Consent Registry
                </span>
                <label className="flex items-center gap-2 cursor-pointer font-medium text-[#12302B]">
                  <input
                    type="checkbox"
                    checked={settings.has_photo_consent}
                    onChange={(e) => setSettings({ ...settings, has_photo_consent: e.target.checked })}
                    className="rounded text-[#8C4E28]"
                  />
                  <span>
                    Devendra Kumar Tamta has provided formal written consent to display his photograph.
                  </span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <input
                    type="text"
                    value={settings.photo_credit}
                    onChange={(e) => setSettings({ ...settings, photo_credit: e.target.value })}
                    placeholder="Photo license credit (e.g. Studio archival portrait...)"
                    className="w-full p-2.5 rounded-lg bg-[#FAF4E8] border border-[#B8964F]/30 text-xs font-sans"
                  />
                  <input
                    type="text"
                    value={settings.photo_url}
                    onChange={(e) => setSettings({ ...settings, photo_url: e.target.value })}
                    placeholder="Portrait image URL path..."
                    className="w-full p-2.5 rounded-lg bg-[#FAF4E8] border border-[#B8964F]/30 text-xs font-sans"
                  />
                </div>
                <p className="text-[11px] text-[#5C3E2C]">
                  If consent is disabled, the public site displays a quiet museum-grade line-art placeholder slot.
                </p>
              </div>

              {/* Announcement Bar & Commercial Controls */}
              <div className="space-y-4 pt-4 border-t border-[#B8964F]/25">
                <h3 className="font-serif text-lg text-[#12302B]">
                  Announcement Bar & Store Policies
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-serif">
                  <div className="space-y-1">
                    <label className="text-[#2A1A12]/80 uppercase tracking-wider text-[10px] block">
                      Announcement Bar (English)
                    </label>
                    <input
                      type="text"
                      value={settings.announcement_text_en}
                      onChange={(e) => setSettings({ ...settings, announcement_text_en: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#EFE4CF]/60 border border-[#B8964F]/40 font-sans text-xs focus:outline-none focus:border-[#8C4E28]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[#2A1A12]/80 uppercase tracking-wider text-[10px] block">
                      Announcement Bar (Hindi)
                    </label>
                    <input
                      type="text"
                      value={settings.announcement_text_hi}
                      onChange={(e) => setSettings({ ...settings, announcement_text_hi: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#EFE4CF]/60 border border-[#B8964F]/40 font-sans text-xs focus:outline-none focus:border-[#8C4E28]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[#2A1A12]/80 uppercase tracking-wider text-[10px] block">
                      Free Insured Shipping Threshold (₹)
                    </label>
                    <input
                      type="number"
                      value={settings.free_shipping_threshold}
                      onChange={(e) => setSettings({ ...settings, free_shipping_threshold: Number(e.target.value) })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#EFE4CF]/60 border border-[#B8964F]/40 font-sans text-xs focus:outline-none focus:border-[#8C4E28]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[#2A1A12]/80 uppercase tracking-wider text-[10px] block">
                      Heraldic Engraving Rate per Character (₹)
                    </label>
                    <input
                      type="number"
                      value={settings.engraving_char_price}
                      onChange={(e) => setSettings({ ...settings, engraving_char_price: Number(e.target.value) })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#EFE4CF]/60 border border-[#B8964F]/40 font-sans text-xs focus:outline-none focus:border-[#8C4E28]"
                    />
                  </div>
                </div>
              </div>

              {/* Multi-Seller Marketplace Feature Flag */}
              <div className="p-4 rounded-2xl bg-[#EFE4CF]/40 border border-[#B8964F]/30 space-y-2 text-xs font-serif">
                <span className="font-bold text-[#8C4E28] uppercase tracking-wider text-[10px] block">
                  Marketplace Mode Feature Flag
                </span>
                <label className="flex items-center gap-2 cursor-pointer font-medium text-[#12302B]">
                  <input
                    type="checkbox"
                    checked={settings.enable_multi_seller}
                    onChange={(e) => setSettings({ ...settings, enable_multi_seller: e.target.checked })}
                    className="rounded text-[#8C4E28]"
                  />
                  <span>
                    Enable Multi-Seller Marketplace (Currently Disabled for Single Master Craftsman Atelier)
                  </span>
                </label>
                <p className="text-[11px] text-[#5C3E2C]">
                  When disabled, all public seller registration links and non-artisan profiles remain hidden.
                </p>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-3 rounded-xl bg-[#8C4E28] hover:bg-[#723F20] text-[#FAF4E8] font-serif text-xs uppercase tracking-widest transition-colors flex items-center gap-2 shadow"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Atelier Configuration</span>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* TAB 2: CERTIFICATES */}
        {activeTab === 'CERTIFICATES' && (
          <div className="bg-[#FAF4E8] rounded-3xl p-6 sm:p-10 border border-[#B8964F]/40 shadow-xl museum-plaque space-y-6 font-serif">
            <div className="flex items-center justify-between border-b border-[#B8964F]/30 pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#8C4E28]">
                  Numbered Certificate Registry
                </span>
                <h2 className="text-2xl text-[#12302B]">
                  Archival Provenance Folios
                </h2>
              </div>
              <span className="text-xs text-[#5C3E2C]">{certList.length} Registered Folios</span>
            </div>

            <div className="divide-y divide-[#B8964F]/20 text-xs">
              {certList.map((cert) => (
                <div key={cert.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-[#8C4E28]">{cert.id}</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#EFE4CF] text-[10px] text-[#4E6E58]">
                        Hand-Checked Pure Copper
                      </span>
                    </div>
                    <p className="font-medium text-[#12302B]">{cert.productName}</p>
                    <p className="text-[11px] text-[#5C3E2C]">
                      Forged by {cert.artisanName} • {cert.date} • {cert.hours} hrs hand work • {cert.blows} hammer strikes
                    </p>
                  </div>

                  <Link
                    href={`/certificate/${cert.id}`}
                    target="_blank"
                    className="px-4 py-2 rounded-lg border border-[#B8964F]/50 text-[#8C4E28] hover:bg-[#EFE4CF] text-xs font-serif shrink-0 transition-colors"
                  >
                    View Live Certificate QR ↗
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: KALAI SERVICES */}
        {activeTab === 'SERVICES' && (
          <div className="bg-[#FAF4E8] rounded-3xl p-6 sm:p-10 border border-[#B8964F]/40 shadow-xl museum-plaque space-y-6 font-serif">
            <div className="flex items-center justify-between border-b border-[#B8964F]/30 pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#8C4E28]">
                  Almora Hearth Service Registry
                </span>
                <h2 className="text-2xl text-[#12302B]">
                  Kalai (Re-Tinning) Active Bookings
                </h2>
              </div>
              <span className="text-xs text-[#5C3E2C]">{serviceBookings.length} Active Service Orders</span>
            </div>

            <div className="divide-y divide-[#B8964F]/20 text-xs">
              {serviceBookings.map((b, idx) => (
                <div key={idx} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-[#8C4E28]">{b.bookingRef}</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#4E6E58]/10 text-[10px] text-[#4E6E58] font-bold">
                        {b.status}
                      </span>
                    </div>
                    <p className="font-medium text-[#12302B]">{b.vesselName} (₹{b.price})</p>
                    <p className="text-[11px] text-[#5C3E2C]">
                      Patron: {b.fullName} ({b.phone}) • Pickup: {b.pickupAddress} ({b.pincode})
                    </p>
                  </div>

                  <span className="text-[11px] text-[#5C3E2C] shrink-0">
                    Booked on {b.createdAt}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: COLLECTIONS */}
        {activeTab === 'COLLECTIONS' && (
          <div className="bg-[#FAF4E8] rounded-3xl p-6 sm:p-10 border border-[#B8964F]/40 shadow-xl museum-plaque space-y-6 font-serif">
            <div className="flex items-center justify-between border-b border-[#B8964F]/30 pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#8C4E28]">
                  Occasion Folios
                </span>
                <h2 className="text-2xl text-[#12302B]">
                  Curated Milestone Collections
                </h2>
              </div>
              <Link href="/collections" target="_blank" className="text-xs text-[#8C4E28] hover:underline">
                View Public Occasions Page ↗
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {OCCASION_COLLECTIONS.map((c) => (
                <div key={c.id} className="p-4 rounded-2xl bg-[#EFE4CF]/60 border border-[#B8964F]/30 space-y-2">
                  <h3 className="font-bold text-[#12302B] text-base">{c.name}</h3>
                  <p className="text-xs text-[#8C4E28] italic">&ldquo;{c.tagline}&rdquo;</p>
                  <p className="text-xs text-[#5C3E2C] font-body line-clamp-2">{c.description}</p>
                  <Link
                    href={`/collections/${c.slug}`}
                    target="_blank"
                    className="text-[11px] text-[#8C4E28] hover:underline block pt-1"
                  >
                    Manage Curated Items →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: PRODUCTS */}
        {activeTab === 'PRODUCTS' && (
          <div className="bg-[#FAF4E8] rounded-3xl p-6 sm:p-10 border border-[#B8964F]/40 shadow-xl museum-plaque space-y-6 font-serif">
            <div className="flex items-center justify-between border-b border-[#B8964F]/30 pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#8C4E28]">
                  Inventory & Anvil Status
                </span>
                <h2 className="text-2xl text-[#12302B]">
                  Catalog Pieces ({productList.length})
                </h2>
              </div>
            </div>

            <div className="divide-y divide-[#B8964F]/20 text-xs">
              {productList.map((p) => (
                <div key={p.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img src={p.images[0]} alt={p.title} className="w-12 h-12 object-cover rounded-lg border border-[#B8964F]/30" />
                    <div>
                      <h4 className="font-bold text-[#12302B] text-sm">{p.title}</h4>
                      <p className="text-[11px] text-[#5C3E2C]">
                        ₹{p.basePrice.toLocaleString('en-IN')} • Stock: {p.stock} units • {p.weightGrams}g
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/product/${p.slug}`}
                    target="_blank"
                    className="text-xs text-[#8C4E28] hover:underline"
                  >
                    View Piece ↗
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: OVERVIEW */}
        {activeTab === 'OVERVIEW' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="museum-plaque bg-[#FAF4E8] p-6 space-y-3">
              <span className="text-[10px] uppercase tracking-wider text-[#8C4E28] font-sans font-semibold">
                Gross Exchange (Month of November)
              </span>
              <p className="font-serif text-3xl text-[#12302B]">₹18,45,200</p>
              <p className="text-xs text-[#5C3E2C] font-serif">
                88% direct remittance to Devendra Kumar Tamta atelier forge in Almora.
              </p>
            </div>
            <div className="museum-plaque bg-[#FAF4E8] p-6 space-y-3">
              <span className="text-[10px] uppercase tracking-wider text-[#8C4E28] font-sans font-semibold">
                WhatsApp Concierge Volume
              </span>
              <p className="font-serif text-3xl text-[#4E6E58]">142 Inquiries</p>
              <p className="text-xs text-[#5C3E2C] font-serif">
                Direct WhatsApp assistance with 24-hour Meta service window active.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
