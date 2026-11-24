'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, X, Clock, ArrowRight, Sparkles, BookOpen, Layers } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '@/lib/mockData';

export interface CommandKSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const RECENT_SEARCHES_KEY = 'tamtashilp_recent_searches';

export const CommandKSearch: React.FC<CommandKSearchProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (stored) {
        setRecentSearches(JSON.parse(stored));
      }
    } catch {
      setRecentSearches(['Copper Water Bottle', 'Kalai Kadhai', 'Sacred Kalash', 'Re-tinning']);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Global Cmd+K / Escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const saveRecentSearch = (term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    const updated = [trimmed, ...recentSearches.filter((s) => s.toLowerCase() !== trimmed.toLowerCase())].slice(0, 5);
    setRecentSearches(updated);
    try {
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    } catch {}
  };

  const handleSelectSearch = (term: string) => {
    saveRecentSearch(term);
    onClose();
    router.push(`/shop?q=${encodeURIComponent(term)}`);
  };

  const handleClearRecents = () => {
    setRecentSearches([]);
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  };

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  // Search results
  const matchingProducts = q
    ? PRODUCTS.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.finish.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q)
      ).slice(0, 4)
    : [];

  const matchingCategories = q
    ? CATEGORIES.filter(
        (c) => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];

  // Occasions keywords
  const OCCASIONS_LIST = [
    { title: 'Griha Pravesh (Housewarming)', href: '/collections/griha-pravesh', desc: 'Auspicious Kalash & Carafes' },
    { title: 'Wedding & Heirloom Troussseau', href: '/collections/wedding', desc: 'Heavy Handis & Serving Steins' },
    { title: 'Pooja & Spiritual Sanctum', href: '/collections/pooja', desc: 'Sacred Hammered Pooja Thalis' },
    { title: 'Newborn & Annaprashan', href: '/collections/newborn', desc: 'Tin-Lined Katoris & Gentle Cups' },
    { title: 'Bespoke Corporate Gifts', href: '/collections/corporate', desc: 'Custom Chiseled Crests & Boxes' },
  ];

  const matchingOccasions = q
    ? OCCASIONS_LIST.filter(
        (o) => o.title.toLowerCase().includes(q) || o.desc.toLowerCase().includes(q)
      )
    : [];

  const CARE_ARTICLES = [
    { title: 'The Natural Maintenance Ritual: Tamarind & Rock Salt', href: '/care' },
    { title: 'How to Tell Hand-Beaten from Machine-Pressed Copper', href: '/care/authenticity-guide' },
    { title: 'Traditional Kalai (Pure Tinning) Hearth Re-lining Service', href: '/services/kalai' },
    { title: 'Ushapan: Classical Dawn Hydration Guidance', href: '/care' },
  ];

  const matchingArticles = q
    ? CARE_ARTICLES.filter((a) => a.title.toLowerCase().includes(q))
    : [];

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0B1F1C]/80 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4 transition-all"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#12302B] text-[#FAF4E8] rounded-3xl border border-[#B8964F]/50 shadow-2xl overflow-hidden flex flex-col max-h-[80vh] font-body"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Atelier Search Archive"
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[#B8964F]/30 flex items-center gap-3 bg-[#0B1F1C]">
          <Search className="w-5 h-5 text-[#B8964F] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && query.trim()) {
                handleSelectSearch(query);
              }
            }}
            placeholder="Search vessels, finishes, occasions, or care guides..."
            className="w-full bg-transparent text-sm sm:text-base text-[#FAF4E8] placeholder:text-[#EFE4CF]/50 focus:outline-none font-serif tracking-wide"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-[#B8964F] hover:text-[#FAF4E8]"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-2 py-0.5 rounded border border-[#B8964F]/40 text-[10px] text-[#B8964F] font-mono">
              ESC
            </kbd>
          )}
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 divide-y divide-[#B8964F]/15">
          {/* If no query: show Recent Searches and Popular Prompts */}
          {!q ? (
            <div className="space-y-5">
              {recentSearches.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-serif uppercase tracking-widest text-[#B8964F]">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      Recent Searches
                    </span>
                    <button
                      onClick={handleClearRecents}
                      className="text-[#EFE4CF]/60 hover:text-[#FAF4E8] lowercase text-[10px]"
                    >
                      clear
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term, i) => (
                      <button
                        key={i}
                        onClick={() => handleSelectSearch(term)}
                        className="px-3 py-1.5 rounded-full bg-[#0B1F1C] border border-[#B8964F]/30 text-xs text-[#EFE4CF] hover:border-[#B8964F] hover:text-[#FAF4E8] transition-colors flex items-center gap-1.5"
                      >
                        <span>{term}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Curations */}
              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-serif uppercase tracking-widest text-[#B8964F] block">
                  Signature Inquiries
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-serif">
                  <button
                    onClick={() => handleSelectSearch('Hammered Water Bottle')}
                    className="p-2.5 rounded-xl bg-[#0B1F1C] border border-[#B8964F]/20 hover:border-[#B8964F] text-left transition-colors text-[#FAF4E8]"
                  >
                    ✦ Diamond Hammered Bottles (1000ml)
                  </button>
                  <button
                    onClick={() => handleSelectSearch('Kalai Cookware Kadhai')}
                    className="p-2.5 rounded-xl bg-[#0B1F1C] border border-[#B8964F]/20 hover:border-[#B8964F] text-left transition-colors text-[#FAF4E8]"
                  >
                    ✦ Heavy Kalai (Tin-Lined) Kadhais
                  </button>
                  <button
                    onClick={() => handleSelectSearch('Sacred Kalash Pooja')}
                    className="p-2.5 rounded-xl bg-[#0B1F1C] border border-[#B8964F]/20 hover:border-[#B8964F] text-left transition-colors text-[#FAF4E8]"
                  >
                    ✦ Chiseled Temple Kalash
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      router.push('/services/kalai');
                    }}
                    className="p-2.5 rounded-xl bg-[#0B1F1C] border border-[#B8964F]/20 hover:border-[#B8964F] text-left transition-colors text-[#FAF4E8]"
                  >
                    ✦ Book Re-tinning (Kalai) Service
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Results when query is active */
            <div className="space-y-6">
              {matchingProducts.length === 0 &&
              matchingCategories.length === 0 &&
              matchingOccasions.length === 0 &&
              matchingArticles.length === 0 ? (
                <div className="text-center py-8 space-y-2">
                  <p className="text-sm font-serif text-[#EFE4CF]">No direct results found for &ldquo;{query}&rdquo;</p>
                  <p className="text-xs text-[#EFE4CF]/60">
                    Try &ldquo;bottle&rdquo;, &ldquo;kadhai&rdquo;, &ldquo;kalai&rdquo;, or &ldquo;lota&rdquo;.
                  </p>
                </div>
              ) : null}

              {/* Matching Products */}
              {matchingProducts.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] font-serif uppercase tracking-[0.2em] text-[#B8964F] block">
                    Vessels & Utensils ({matchingProducts.length})
                  </span>
                  <div className="space-y-1.5">
                    {matchingProducts.map((p) => (
                      <Link
                        key={p.id}
                        href={`/product/${p.slug}`}
                        onClick={() => {
                          saveRecentSearch(query);
                          onClose();
                        }}
                        className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0B1F1C] hover:bg-[#0B1F1C]/80 border border-[#B8964F]/20 hover:border-[#B8964F] transition-colors"
                      >
                        <img
                          src={p.images[0]}
                          alt={p.title}
                          className="w-11 h-11 object-cover rounded-lg border border-[#B8964F]/30 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-serif text-[#FAF4E8] truncate font-medium">{p.title}</p>
                          <p className="text-[10px] text-[#B8964F]">
                            ₹{p.basePrice.toLocaleString('en-IN')} • Handcrafted pure copper
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#B8964F] shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Matching Occasions */}
              {matchingOccasions.length > 0 && (
                <div className="space-y-2 pt-4">
                  <span className="text-[10px] font-serif uppercase tracking-[0.2em] text-[#B8964F] block">
                    Occasion Collections
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {matchingOccasions.map((o, idx) => (
                      <Link
                        key={idx}
                        href={o.href}
                        onClick={() => {
                          saveRecentSearch(query);
                          onClose();
                        }}
                        className="p-3 rounded-xl bg-[#0B1F1C] border border-[#B8964F]/20 hover:border-[#B8964F] transition-colors"
                      >
                        <p className="text-xs font-serif text-[#FAF4E8] font-medium">{o.title}</p>
                        <p className="text-[10px] text-[#EFE4CF]/60">{o.desc}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Matching Care Guides */}
              {matchingArticles.length > 0 && (
                <div className="space-y-2 pt-4">
                  <span className="text-[10px] font-serif uppercase tracking-[0.2em] text-[#B8964F] block">
                    Journal & Care Wisdom
                  </span>
                  <div className="space-y-1">
                    {matchingArticles.map((a, idx) => (
                      <Link
                        key={idx}
                        href={a.href}
                        onClick={() => {
                          saveRecentSearch(query);
                          onClose();
                        }}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-[#0B1F1C] border border-[#B8964F]/20 hover:border-[#B8964F] text-xs font-serif text-[#FAF4E8] transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-3.5 h-3.5 text-[#B8964F]" />
                          <span>{a.title}</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[#B8964F]" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="p-3 bg-[#0B1F1C] border-t border-[#B8964F]/20 flex items-center justify-between text-[11px] text-[#B8964F] font-serif px-6">
          <span>Struck by hand. Kept for generations.</span>
          <span className="hidden sm:inline">Use ↑ ↓ to navigate, ESC to close</span>
        </div>
      </div>
    </div>
  );
};

