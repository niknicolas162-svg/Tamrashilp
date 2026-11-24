'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  SlidersHorizontal,
  X,
  Search,
  ArrowUpDown,
  Filter,
  RotateCcw,
} from 'lucide-react';
import { ProductCard } from '@/components/common/ProductCard';
import { AuthenticityModal } from '@/components/common/AuthenticityModal';
import { PRODUCTS, CATEGORIES, ARTISANS } from '@/lib/mockData';
import { useLanguage } from '@/lib/language-context';
import { Product } from '@/types';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialSearch = searchParams.get('q') || '';

  const { t, language } = useLanguage();

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedFinish, setSelectedFinish] = useState<string>('');
  const [selectedArtisan, setSelectedArtisan] = useState<string>('');
  const [priceMax, setPriceMax] = useState<number>(5000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('popular');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [selectedProductQR, setSelectedProductQR] = useState<Product | null>(null);

  // Filter products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(q) || p.titleHi.toLowerCase().includes(q);
        const matchesArtisan = p.artisan.name.toLowerCase().includes(q);
        const matchesCategory = p.categoryName.toLowerCase().includes(q);
        if (!matchesTitle && !matchesArtisan && !matchesCategory) return false;
      }
      if (selectedCategory) {
        const matchCat = CATEGORIES.find((c) => c.id === selectedCategory || c.slug === selectedCategory);
        const targetId = matchCat ? matchCat.id : selectedCategory;
        if (p.categoryId !== targetId) return false;
      }
      if (selectedFinish && p.finish !== selectedFinish) return false;
      if (selectedArtisan && p.artisanId !== selectedArtisan) return false;
      if (p.basePrice > priceMax) return false;
      if (inStockOnly && p.stock <= 0) return false;
      if (minRating > 0 && p.rating < minRating) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.basePrice - b.basePrice;
      if (sortBy === 'price-desc') return b.basePrice - a.basePrice;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'bestseller') return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
      return 0;
    });
  }, [
    searchQuery,
    selectedCategory,
    selectedFinish,
    selectedArtisan,
    priceMax,
    inStockOnly,
    minRating,
    sortBy,
  ]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedFinish('');
    setSelectedArtisan('');
    setPriceMax(5000);
    setInStockOnly(false);
    setMinRating(0);
    setSortBy('popular');
  };

  const hasActiveFilters =
    Boolean(searchQuery) ||
    Boolean(selectedCategory) ||
    Boolean(selectedFinish) ||
    Boolean(selectedArtisan) ||
    priceMax < 5000 ||
    inStockOnly ||
    minRating > 0;

  return (
    <div className="bg-parchment-texture text-walnut-900 min-h-screen py-10 sm:py-16 font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest2 text-brass-700 font-sans font-semibold">
            {t('navShop')}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-walnut-950">
            {t('shopTitle')}
          </h1>
          <div className="kumaoni-divider my-2">
            <span className="text-brass-600 text-xs">✦</span>
          </div>
          <p className="text-xs sm:text-sm text-walnut-800 leading-relaxed max-w-xl mx-auto">
            {t('shopSubtitle')}
          </p>
        </div>

        {/* Search & Arrangement Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-parchment-100 p-3 rounded-2xl border border-brass-600/30 museum-plaque shadow-xs">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by vessel name, village, or artisan…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-parchment-50 border border-brass-600/30 rounded-xl py-2 pl-9 pr-8 text-xs text-walnut-900 placeholder:text-brass-700/60 focus:outline-none focus:border-copper-600 font-serif"
            />
            <Search className="w-3.5 h-3.5 text-brass-600 absolute left-3 top-2.5" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2 text-brass-700 hover:text-walnut-950"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="md:hidden flex-1 py-2 px-3 rounded-xl border border-brass-600/40 bg-parchment-50 text-xs font-serif text-walnut-900 flex items-center justify-center gap-1.5"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filter {hasActiveFilters ? '• Active' : ''}</span>
            </button>

            <div className="flex items-center gap-1.5 bg-parchment-50 border border-brass-600/35 rounded-xl px-3 py-2 text-xs font-serif">
              <ArrowUpDown className="w-3 h-3 text-brass-700" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-walnut-950 focus:outline-none cursor-pointer"
              >
                <option value="popular">Curator’s Choice</option>
                <option value="bestseller">Heirlooms First</option>
                <option value="price-asc">Price: Modest to Significant</option>
                <option value="price-desc">Price: Significant to Modest</option>
                <option value="rating">Patron Acclaim</option>
              </select>
            </div>
          </div>
        </div>

        {/* Gallery Grid + Sidebar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Sidebar */}
          <aside className="hidden md:block md:col-span-3 space-y-6 bg-parchment-100 p-5 rounded-2xl border border-brass-600/30 museum-plaque sticky top-24 font-serif">
            <div className="flex items-center justify-between pb-3 border-b border-brass-600/25">
              <h3 className="text-xs uppercase tracking-atelier font-bold text-walnut-950 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-brass-600" />
                <span>{t('filterTitle')}</span>
              </h3>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-[11px] text-copper-700 hover:underline flex items-center gap-1 font-bold"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              )}
            </div>

            {/* Folio Categories */}
            <div className="space-y-2">
              <label className="text-[10px] font-sans font-bold uppercase tracking-widest text-brass-800 block">
                {t('filterCategory')}
              </label>
              <div className="space-y-1 text-xs">
                <button
                  onClick={() => setSelectedCategory('')}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${!selectedCategory
                    ? 'bg-patina-800 text-ivory font-bold'
                    : 'text-walnut-800 hover:bg-parchment-200'
                    }`}
                >
                  <span>All Permanent Folios</span>
                  <span className="text-[10px] font-sans text-brass-500">{PRODUCTS.length}</span>
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${selectedCategory === cat.slug
                      ? 'bg-patina-800 text-ivory font-bold'
                      : 'text-walnut-800 hover:bg-parchment-200'
                      }`}
                  >
                    <span className="truncate">{language === 'hi' ? cat.nameHi : cat.name}</span>
                    <span className="text-[10px] font-sans text-brass-500">{cat.itemCount}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Hammer Finish */}
            <div className="space-y-2 pt-3 border-t border-brass-600/20">
              <label className="text-[10px] font-sans font-bold uppercase tracking-widest text-brass-800 block">
                {t('filterFinish')}
              </label>
              <div className="space-y-1 text-xs">
                {['', 'HAMMERED', 'PLAIN', 'ENGRAVED'].map((f) => (
                  <button
                    key={f || 'all'}
                    onClick={() => setSelectedFinish(f)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors ${selectedFinish === f
                      ? 'bg-patina-800 text-ivory font-bold'
                      : 'text-walnut-800 hover:bg-parchment-200'
                      }`}
                  >
                    {f === ''
                      ? 'All Finishes'
                      : f === 'HAMMERED'
                        ? 'Diamond Hammered'
                        : f === 'PLAIN'
                          ? 'Mirror Polished'
                          : 'Hand-Engraved'}
                  </button>
                ))}
              </div>
            </div>

            {/* Master Craftsman Provenance Badge */}
            <div className="space-y-2 pt-3 border-t border-brass-600/20">
              <label className="text-[10px] font-sans font-bold uppercase tracking-widest text-brass-800 block">
                The Master Craftsman
              </label>
              <div className="p-3 rounded-xl bg-parchment-200/70 border border-brass-600/30 text-xs space-y-1.5">
                <div className="font-serif font-bold text-walnut-950 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-copper-600" />
                  <span>Devendra Kumar Tamta</span>
                </div>
                <p className="text-[11px] text-walnut-700 leading-relaxed font-body">
                  Sole master coppersmith. Every piece is hand-hammered in Almora, Uttarakhand.
                </p>
                <Link
                  href="/master-craftsman"
                  className="text-[11px] text-copper-700 hover:text-copper-900 font-serif font-semibold inline-flex items-center gap-1 underline pt-0.5"
                >
                  Read atelier story →
                </Link>
              </div>
            </div>

            {/* Price Ceiling */}
            <div className="space-y-2 pt-3 border-t border-brass-600/20">
              <div className="flex justify-between items-center text-xs">
                <label className="text-[10px] font-sans font-bold uppercase tracking-widest text-brass-800">
                  Value Ceiling
                </label>
                <span className="font-bold text-copper-700">₹{priceMax.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="5000"
                step="100"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-copper-600 cursor-pointer"
              />
            </div>
          </aside>

          {/* Gallery Works Grid */}
          <main className="col-span-1 md:col-span-9 space-y-4">
            <div className="flex items-center justify-between text-xs text-brass-700 font-serif pb-2 border-b border-brass-600/20">
              <span>
                Displaying <strong>{filteredProducts.length}</strong> authenticated vessels
              </span>
              {hasActiveFilters && (
                <span className="text-[11px] text-walnut-800 bg-parchment-300 px-2.5 py-0.5 rounded border border-brass-600/20">
                  Curated View
                </span>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-parchment-100 rounded-2xl border border-brass-600/30 p-16 text-center space-y-3 museum-plaque">
                <p className="font-serif text-lg font-bold text-walnut-950">
                  No matching vessels found in this folio.
                </p>
                <p className="text-xs text-walnut-700 max-w-sm mx-auto">
                  Expand your value ceiling or reset finish and category filters to view all works.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2 btn-atelier text-xs rounded-lg mt-2"
                >
                  Reset Curation
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                {filteredProducts.map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    onOpenQR={(p) => setSelectedProductQR(p)}
                  />
                ))}
              </div>
            )}
          </main>
        </div>

        {/* QR Authenticity Modal */}
        <AuthenticityModal
          product={selectedProductQR}
          onClose={() => setSelectedProductQR(null)}
        />

        {/* Mobile Filter Drawer */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden font-serif md:hidden">
            <div
              className="absolute inset-0 bg-patina-950/80 backdrop-blur-xs transition-opacity"
              onClick={() => setIsMobileFilterOpen(false)}
            />
            <div className="fixed inset-y-0 right-0 max-w-full flex">
              <div className="w-screen max-w-xs sm:max-w-sm bg-parchment-200 border-l border-brass-600/40 shadow-2xl flex flex-col text-walnut-900">
                {/* Header */}
                <div className="p-4 bg-parchment-300 border-b border-brass-600/30 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-brass-700" />
                    <h3 className="text-xs uppercase tracking-atelier font-bold text-walnut-950">
                      Curate Folio
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-1 rounded-full text-walnut-800 hover:text-copper-700"
                    aria-label="Close filters"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs">
                  {/* Category */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-sans font-bold uppercase tracking-widest text-brass-800 block">
                      {t('filterCategory')}
                    </label>
                    <div className="space-y-1">
                      <button
                        onClick={() => setSelectedCategory('')}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                          !selectedCategory
                            ? 'bg-patina-800 text-ivory font-bold'
                            : 'text-walnut-800 bg-parchment-100 hover:bg-parchment-300'
                        }`}
                      >
                        <span>All Permanent Folios</span>
                        <span className="text-[10px] font-sans text-brass-500">{PRODUCTS.length}</span>
                      </button>
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.slug)}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                            selectedCategory === cat.slug
                              ? 'bg-patina-800 text-ivory font-bold'
                              : 'text-walnut-800 bg-parchment-100 hover:bg-parchment-300'
                          }`}
                        >
                          <span className="truncate">{language === 'hi' ? cat.nameHi : cat.name}</span>
                          <span className="text-[10px] font-sans text-brass-500">{cat.itemCount}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Finish */}
                  <div className="space-y-2 pt-3 border-t border-brass-600/20">
                    <label className="text-[10px] font-sans font-bold uppercase tracking-widest text-brass-800 block">
                      {t('filterFinish')}
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {['', 'HAMMERED', 'PLAIN', 'ENGRAVED'].map((f) => (
                        <button
                          key={f || 'all'}
                          onClick={() => setSelectedFinish(f)}
                          className={`p-2 rounded-lg text-center transition-colors border ${
                            selectedFinish === f
                              ? 'bg-patina-800 text-ivory border-brass-500 font-bold'
                              : 'bg-parchment-100 text-walnut-800 border-brass-600/20'
                          }`}
                        >
                          {f === ''
                            ? 'All'
                            : f === 'HAMMERED'
                            ? 'Hammered'
                            : f === 'PLAIN'
                            ? 'Polished'
                            : 'Engraved'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Master Craftsman Provenance Badge */}
                  <div className="space-y-2 pt-3 border-t border-brass-600/20">
                    <label className="text-[10px] font-sans font-bold uppercase tracking-widest text-brass-800 block">
                      The Master Craftsman
                    </label>
                    <div className="p-3 rounded-xl bg-parchment-200/80 border border-brass-600/30 text-xs space-y-1.5">
                      <div className="font-serif font-bold text-walnut-950 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-copper-600" />
                        <span>Devendra Kumar Tamta</span>
                      </div>
                      <p className="text-[11px] text-walnut-700 leading-relaxed font-body">
                        Sole master coppersmith of the atelier. Hand-hammered in Almora.
                      </p>
                      <Link
                        href="/master-craftsman"
                        onClick={() => setIsMobileFilterOpen(false)}
                        className="text-[11px] text-copper-700 hover:text-copper-900 font-serif font-semibold inline-flex items-center gap-1 underline pt-0.5"
                      >
                        Read atelier story →
                      </Link>
                    </div>
                  </div>

                  {/* Price Slider */}
                  <div className="space-y-2 pt-3 border-t border-brass-600/20">
                    <div className="flex justify-between items-center text-xs">
                      <label className="text-[10px] font-sans font-bold uppercase tracking-widest text-brass-800">
                        Value Ceiling
                      </label>
                      <span className="font-bold text-copper-700">₹{priceMax.toLocaleString('en-IN')}</span>
                    </div>
                    <input
                      type="range"
                      min="1000"
                      max="5000"
                      step="100"
                      value={priceMax}
                      onChange={(e) => setPriceMax(Number(e.target.value))}
                      className="w-full accent-copper-600 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="p-4 bg-parchment-300 border-t border-brass-600/30 flex gap-2">
                  <button
                    onClick={clearAllFilters}
                    className="px-4 py-2.5 rounded-lg border border-brass-600/40 text-walnut-800 hover:bg-parchment-100 text-xs flex-1"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="px-4 py-2.5 rounded-lg btn-atelier text-xs flex-2 font-bold"
                  >
                    View {filteredProducts.length} Vessels
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-16 text-center font-serif text-xs">Opening Atelier Folio…</div>}>
      <ShopContent />
    </Suspense>
  );
}
