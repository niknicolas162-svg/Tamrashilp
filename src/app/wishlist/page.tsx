'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlist } from '@/lib/wishlist-context';
import { useCart } from '@/lib/cart-context';
import { useLanguage } from '@/lib/language-context';

export default function WishlistPage() {
  const { wishlist, toggleWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { language, t } = useLanguage();

  return (
    <div className="bg-[#EFE4CF] min-h-screen text-[#2A1A12] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#B8964F]/30 pb-6 gap-4">
          <div>
            <span className="text-[10px] text-[#B8964F] uppercase tracking-[0.25em] font-sans">
              Personal Archival Collection
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#12302B] mt-1">
              Reserved Heirlooms ({wishlist.length})
            </h1>
            <p className="text-xs sm:text-sm text-[#5C3E2C] font-light mt-1">
              Hand-hammered vessels preserved for your future acquisition
            </p>
          </div>
          {wishlist.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-xs font-sans tracking-wider uppercase text-[#8C4E28] hover:text-red-700 flex items-center gap-1.5 transition-colors self-start sm:self-auto"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Collection</span>
            </button>
          )}
        </div>

        {wishlist.length === 0 ? (
          <div className="museum-plaque bg-[#FAF4E8] p-12 sm:p-16 text-center space-y-5 max-w-xl mx-auto">
            <div className="wax-seal w-14 h-14 rounded-full flex items-center justify-center mx-auto text-xs font-serif font-bold">
              TM
            </div>
            <h3 className="font-serif text-2xl font-normal text-[#12302B]">
              No Vessels Reserved Yet
            </h3>
            <p className="text-xs sm:text-sm text-[#5C3E2C] font-light max-w-sm mx-auto leading-relaxed">
              Explore our folios to reserve handcrafted copper bottles, heavy kadhais, and temple thalis.
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="btn-atelier inline-block px-8 py-3.5 text-xs tracking-widest uppercase"
              >
                Explore Catalog
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map((prod) => (
              <div
                key={prod.id}
                className="museum-plaque bg-[#FAF4E8] flex flex-col justify-between group transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative aspect-square overflow-hidden candle-vignette border-b border-[#B8964F]/30 bg-[#12302B]">
                  <img
                    src={prod.images[0]}
                    alt={prod.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-[1.03]"
                  />
                  <button
                    onClick={() => toggleWishlist(prod)}
                    className="absolute top-3 right-3 p-2 bg-[#12302B]/80 text-[#FAF4E8] hover:text-red-400 border border-[#B8964F]/40 transition-colors"
                    title="Remove vessel"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] text-[#8C4E28] font-sans tracking-wide uppercase">
                      {prod.village}
                    </span>
                    <Link href={`/product/${prod.slug}`}>
                      <h4 className="font-serif text-base font-normal text-[#12302B] line-clamp-1 hover:text-[#B26A3C] transition-colors">
                        {language === 'hi' ? prod.titleHi : prod.title}
                      </h4>
                    </Link>
                    <p className="font-serif text-base text-[#12302B]">
                      ₹{prod.basePrice.toLocaleString('en-IN')}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      addToCart(prod, 1);
                      toggleWishlist(prod);
                    }}
                    className="btn-atelier w-full py-2.5 text-xs tracking-widest uppercase flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Acquire Vessel</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
