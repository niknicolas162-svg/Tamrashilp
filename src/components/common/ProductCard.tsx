'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, Scale, ShoppingBag, Star, QrCode, Check } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/lib/cart-context';
import { useWishlist } from '@/lib/wishlist-context';
import { useCompare } from '@/lib/compare-context';
import { useLanguage } from '@/lib/language-context';

interface ProductCardProps {
  product: Product;
  onOpenQR?: (product: Product) => void;
  darkVariant?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenQR,
  darkVariant = false,
}) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();
  const { language, t } = useLanguage();

  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const inWish = isInWishlist(product.id);
  const inComp = isInCompare(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  const handleCompareToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inComp) {
      removeFromCompare(product.id);
    } else {
      addToCompare(product);
    }
  };

  return (
    <div
      className={`group flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-500 ${
        darkVariant
          ? 'bg-patina-900 text-ivory museum-plaque-dark'
          : 'bg-[#FDFBF7] text-walnut-900 museum-plaque'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Floating Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
        {product.isBestseller && (
          <span className="wax-seal text-[9px] font-serif font-bold px-2.5 py-0.5 rounded-full uppercase tracking-atelier shadow">
            Archival Heirloom
          </span>
        )}
      </div>

      {/* Action floating buttons */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5 opacity-95 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          aria-label={inWish ? 'Remove from Wishlist' : 'Save to Patron Folio'}
          className={`p-2 rounded-full shadow-md backdrop-blur-md transition-all min-w-[34px] min-h-[34px] flex items-center justify-center ${
            inWish
              ? 'bg-patina-950 text-copper-400 border border-copper-500'
              : 'bg-patina-950/80 text-brass-400 hover:text-ivory border border-brass-600/40'
          }`}
          title="Save to Patron Folio"
        >
          <Heart className={`w-3.5 h-3.5 ${inWish ? 'fill-copper-400 text-copper-400' : ''}`} />
        </button>

        <button
          onClick={handleCompareToggle}
          aria-label={inComp ? 'Remove from comparison' : 'Compare vessels side by side'}
          className={`p-2 rounded-full shadow-md backdrop-blur-md transition-all min-w-[34px] min-h-[34px] flex items-center justify-center ${
            inComp
              ? 'bg-patina-950 text-copper-400 border border-copper-500 font-bold'
              : 'bg-patina-950/80 text-brass-400 hover:text-ivory border border-brass-600/40'
          }`}
          title={inComp ? 'Remove from examination' : 'Compare vessels side by side'}
        >
          <Scale className="w-3.5 h-3.5" />
        </button>

        {onOpenQR && (
          <button
            onClick={(e) => {
              e.preventDefault();
              onOpenQR(product);
            }}
            aria-label="Inspect Numbered Provenance Certificate"
            className="p-2 rounded-full shadow-md backdrop-blur-md bg-patina-950/80 text-brass-400 hover:text-ivory border border-brass-600/40 transition-all min-w-[34px] min-h-[34px] flex items-center justify-center"
            title="Inspect Numbered Provenance Certificate"
          >
            <QrCode className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Image with Vignette & Candle-lit tone */}
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-4/3 overflow-hidden bg-patina-950 candle-vignette"
      >
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out sepia-[0.12] contrast-[1.03]"
        />
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={product.title}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            } sepia-[0.12] contrast-[1.03]`}
          />
        )}
        <div className="hidden sm:flex items-center justify-between absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-patina-950/80 via-patina-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <span className="text-[10px] font-serif text-parchment-200 tracking-wider uppercase">
            {product.stock > 0 ? '● Ready to Ship' : `● Made in ${product.makingTimeDays}d`}
          </span>
          <span className="text-[10px] font-sans uppercase tracking-widest text-brass-300 font-medium">
            Inspect Piece →
          </span>
        </div>
      </Link>

      {/* Card Body styled like Museum Plaque */}
      <div className="p-3.5 sm:p-5 flex-1 flex flex-col justify-between space-y-2.5 sm:space-y-3">
        <div className="space-y-1.5 sm:space-y-2">
          {/* Small Plaque Tag showing Artisan & Village */}
          <div className="plaque-tag py-0.5 sm:py-1 px-2 rounded text-[9px] font-sans font-medium flex items-center justify-between">
            <span className="truncate">
              {language === 'hi' && product.artisan.nameHi ? product.artisan.nameHi : product.artisan.name}
            </span>
            <span className="text-walnut-800/80 lowercase italic font-serif">
              {product.village || 'Almora, Uttarakhand'}
            </span>
          </div>

          {/* Title */}
          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="font-serif text-sm sm:text-lg font-normal tracking-wide text-inherit hover:text-copper-600 transition-colors line-clamp-2 leading-snug">
              {language === 'hi' ? product.titleHi : product.title}
            </h3>
          </Link>

          {/* Discreet Specifications */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] text-brass-600 font-serif">
            <span>{product.finish}</span>
            <span>✦</span>
            <span>{product.capacity || `${product.weightGrams}g`}</span>
            <span>✦</span>
            <span className="text-copper-700 font-medium">99.2% Pure Copper</span>
          </div>
        </div>

        {/* Pricing & Acquisition */}
        <div className="pt-2.5 sm:pt-3 border-t border-brass-600/20 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline space-x-1.5 sm:space-x-2 tabular-nums">
              <span className="text-base sm:text-lg font-serif font-bold text-copper-600">
                ₹{product.basePrice.toLocaleString('en-IN')}
              </span>
              {product.comparePrice && (
                <span className="text-[10px] sm:text-xs text-brass-600/70 line-through font-serif">
                  ₹{product.comparePrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <span className="text-[9px] sm:text-[10px] text-brass-700 uppercase tracking-widest font-sans block">
              {product.hoursOfLabor ? `${product.hoursOfLabor} hrs anvil work` : 'Hand-hammered'}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className={`px-3 py-2 sm:px-3 sm:py-2 rounded-lg text-xs font-sans tracking-wider uppercase transition-all shadow-sm active:scale-95 touch-manipulation min-h-[36px] ${
              justAdded
                ? 'bg-patina-800 text-ivory border border-brass-500'
                : 'btn-atelier'
            }`}
          >
            {justAdded ? (
              <span className="flex items-center gap-1 text-[10px]">
                <Check className="w-3 h-3 text-brass-400" />
                Added
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[10px]">
                <ShoppingBag className="w-3 h-3 text-brass-400" />
                Add to cart
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
