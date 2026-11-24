'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ShieldCheck,
  Truck,
  Heart,
  Share2,
  Check,
  ShoppingBag,
  Award,
  Play,
  QrCode,
  Scale,
  MapPin,
  Hammer,
  Clock,
  Flame,
  MessageCircle,
} from 'lucide-react';
import { PRODUCTS, PINCODES } from '@/lib/mockData';
import { buildWhatsAppClickUrl, getPreFilledMessage } from '@/lib/whatsapp/config';
import { useCart } from '@/lib/cart-context';
import { useWishlist } from '@/lib/wishlist-context';
import { useCompare } from '@/lib/compare-context';
import { useLanguage } from '@/lib/language-context';
import { ProductCard } from '@/components/common/ProductCard';
import { AuthenticityModal } from '@/components/common/AuthenticityModal';
import { EngravingPreview } from '@/components/common/EngravingPreview';
import { FinishType, ProductVariant } from '@/types';
import { getSiteSettings, formatArtisanProvenance, SiteSettings } from '@/lib/siteSettings';
import { AvatarIcon } from '@/components/common/AvatarIcon';

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();
  const { language, t } = useLanguage();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants ? product.variants[0] : null
  );
  const [selectedFinish, setSelectedFinish] = useState<FinishType>(product.finish);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Pincode transit check
  const [pincodeInput, setPincodeInput] = useState('');
  const [pincodeResult, setPincodeResult] = useState<{
    city: string;
    state: string;
    cod: boolean;
    days: number;
    checked: boolean;
  } | null>(null);

  // Review submission
  const [reviewList, setReviewList] = useState(product.reviews || []);
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const currentPrice = selectedVariant ? selectedVariant.price : product.basePrice;
  const currentComparePrice = selectedVariant?.comparePrice || product.comparePrice;
  const currentStock = selectedVariant ? selectedVariant.stock : product.stock;

  const [settings, setSettings] = useState<SiteSettings>(getSiteSettings());
  const [isGiftWrap, setIsGiftWrap] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');
  const [isGiftWhatsApp, setIsGiftWhatsApp] = useState(false);
  const [customEngraving, setCustomEngraving] = useState<{ text: string; cost: number; script?: string } | null>(null);

  const inWish = isInWishlist(product.id);
  const inComp = isInCompare(product.id);

  const handleAddToCart = () => {
    addToCart(
      product,
      quantity,
      selectedFinish,
      selectedVariant?.capacity || product.capacity,
      selectedVariant?.id,
      currentPrice,
      customEngraving || undefined
    );
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const pin = pincodeInput.trim();
    if (PINCODES[pin]) {
      setPincodeResult({ ...PINCODES[pin], checked: true });
    } else if (pin.length === 6 && /^\d+$/.test(pin)) {
      setPincodeResult({
        city: 'Verified Postal Hearth',
        state: 'India',
        cod: true,
        days: 4,
        checked: true,
      });
    } else {
      alert('Please enter a valid 6-digit Indian Pincode.');
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim()) return;

    const newRev = {
      id: `rev-${Date.now()}`,
      productId: product.id,
      userName: newReviewName,
      rating: newReviewRating,
      date: 'Just now',
      title: 'Appraisal of Work',
      comment: newReviewComment,
      verifiedPurchase: true,
      helpfulCount: 1,
    };

    setReviewList([newRev, ...reviewList]);
    setReviewSubmitted(true);
    setNewReviewName('');
    setNewReviewComment('');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: `Handcrafted Almora copper utensil: ${product.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Archival link inscribed to clipboard.');
    }
  };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.categoryId === product.categoryId || p.artisanId === product.artisanId)
  ).slice(0, 4);

  return (
    <div className="bg-parchment-texture text-walnut-900 py-8 sm:py-16 pb-28 md:pb-16 font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Breadcrumb */}
        <nav className="text-xs font-serif text-brass-700 flex items-center space-x-2">
          <Link href="/" className="hover:text-walnut-950">
            Atelier
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-walnut-950">
            Collection
          </Link>
          <span>/</span>
          <Link href={`/shop?category=${product.categoryId}`} className="hover:text-walnut-950">
            {product.categoryName}
          </Link>
          <span>/</span>
          <span className="text-walnut-950 font-bold truncate max-w-xs">{product.title}</span>
        </nav>

        {/* Hero Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Gallery with Macro Detail */}
          <div className="lg:col-span-7 space-y-5">
            <div className="relative aspect-square sm:aspect-4/3 rounded-2xl overflow-hidden museum-plaque bg-patina-950 candle-vignette">
              <img
                src={product.images[activeImageIndex]}
                alt={product.title}
                className="w-full h-full object-cover object-center sepia-[0.12] contrast-[1.03] transition-transform duration-700 hover:scale-105"
              />

              {product.videoUrl && (
                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="absolute bottom-4 left-4 bg-patina-950/85 text-ivory px-3.5 py-1.5 rounded-lg text-xs font-serif flex items-center gap-1.5 border border-brass-600/40 hover:bg-patina-900 transition-colors shadow-lg"
                >
                  <Play className="w-3.5 h-3.5 text-brass-400" />
                  <span>Anvil Craft Video</span>
                </button>
              )}

              <button
                onClick={() => setIsQRModalOpen(true)}
                className="absolute top-4 right-4 bg-patina-950/85 text-brass-400 hover:text-ivory p-2.5 rounded-full border border-brass-500/40 shadow transition-all"
                title="Inspect Numbered Provenance Certificate"
              >
                <QrCode className="w-4 h-4" />
              </button>
            </div>

            {/* Thumbnail Strip with Hammer Detail Close-up */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${activeImageIndex === idx
                      ? 'border-copper-600 ring-2 ring-copper-500/30'
                      : 'border-brass-600/30 opacity-75 hover:opacity-100'
                    }`}
                >
                  <img src={img} alt={`Detail ${idx}`} className="w-full h-full object-cover sepia-[0.1]" />
                  {idx === 1 && (
                    <span className="absolute bottom-0 inset-x-0 bg-patina-950/90 text-[8px] font-serif text-brass-400 text-center uppercase py-0.5">
                      Chitai Detail
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Artisan Plaque Tag: Devendra Kumar Tamta Only */}
            <div className="bg-parchment-100 border border-brass-600/35 rounded-2xl p-4 sm:p-5 flex items-center justify-between text-xs museum-plaque">
              <div className="flex items-center space-x-3.5">
                {settings.has_photo_consent && settings.photo_url ? (
                  <img
                    src={settings.photo_url}
                    alt={settings.artisan_name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-brass-500/70"
                  />
                ) : (
                  <AvatarIcon styleName="monogram" size="md" variant="light" className="border-2 border-brass-500/70" />
                )}
                <div>
                  <p className="font-serif font-bold text-walnut-950 text-sm">{settings.artisan_name}</p>
                  <p className="text-brass-700 font-sans text-[11px] uppercase tracking-wider">
                    {formatArtisanProvenance(settings, language)}
                  </p>
                  <p className="text-[11px] text-walnut-700 italic font-body">
                    Master of Horn-Anvil Raising & Pure Tinning (Kalai)
                  </p>
                </div>
              </div>
              <Link
                href="/master-craftsman"
                className="font-serif text-xs uppercase tracking-atelier text-copper-700 hover:text-copper-900 underline shrink-0"
              >
                The Master Craftsman →
              </Link>
            </div>
          </div>

          {/* Details & Acquisition Controls */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3 border-b border-brass-600/25 pb-6">
              <div className="flex items-center justify-between">
                <span className="plaque-tag py-0.5 px-3 rounded text-[9px] font-sans">
                  {product.finish} • NABL LAB ASSAYED
                </span>
                <div className="flex items-center space-x-2 text-brass-700">
                  <button onClick={handleShare} className="p-1.5 hover:text-walnut-950" title="Share">
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-1.5 transition-colors ${inWish ? 'text-copper-600' : 'hover:text-walnut-950'}`}
                    title="Save Work"
                  >
                    <Heart className={`w-4 h-4 ${inWish ? 'fill-copper-600' : ''}`} />
                  </button>
                  <button
                    onClick={() => (inComp ? removeFromCompare(product.id) : addToCompare(product))}
                    className={`p-1.5 transition-colors ${inComp ? 'text-copper-600' : 'hover:text-walnut-950'}`}
                    title="Compare"
                  >
                    <Scale className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-walnut-950 leading-tight">
                {language === 'hi' ? product.titleHi : product.title}
              </h1>

              {/* Metallurgical purity & rating */}
              <div className="flex flex-wrap items-center gap-3 text-xs font-serif text-brass-700 pt-1">
                <span className="text-copper-700 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {product.purityRating}
                </span>
                <span>✦</span>
                <span className="font-mono text-walnut-800">{product.purityCertificationNo}</span>
              </div>

              {/* Price */}
              <div className="pt-2">
                <div className="flex items-baseline space-x-3">
                  <span className="text-3xl font-serif font-bold text-copper-700">
                    ₹{currentPrice.toLocaleString('en-IN')}
                  </span>
                  {currentComparePrice && (
                    <span className="text-sm font-serif text-brass-600/70 line-through">
                      ₹{currentComparePrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-walnut-700 mt-1 font-body">
                  {t('inclusiveOfGst')} • Complimentary insured white-glove transit above ₹1,999
                </p>
              </div>
            </div>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-2 font-serif">
                <label className="text-[10px] font-sans font-bold uppercase tracking-widest text-brass-800 block">
                  Select Dimension / Finish
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => {
                        setSelectedVariant(v);
                        if (v.finish) setSelectedFinish(v.finish);
                      }}
                      className={`p-3 rounded-xl border text-left transition-all ${selectedVariant?.id === v.id
                          ? 'border-copper-600 bg-parchment-100 ring-1 ring-copper-500/30'
                          : 'border-brass-600/30 bg-parchment-50 hover:bg-parchment-100'
                        }`}
                    >
                      <p className="font-bold text-walnut-950">{language === 'hi' ? v.nameHi : v.name}</p>
                      <p className="text-[11px] text-copper-700 mt-0.5">
                        ₹{v.price.toLocaleString('en-IN')}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Reserve CTA */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-brass-600/40 rounded-lg bg-parchment-100 p-1 text-xs font-sans">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 font-bold hover:bg-parchment-300 rounded"
                  >
                    -
                  </button>
                  <span className="px-3 font-bold text-walnut-950">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 font-bold hover:bg-parchment-300 rounded"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3 px-6 rounded-lg text-xs tracking-atelier uppercase transition-all shadow-md ${justAdded ? 'bg-patina-800 text-ivory border border-brass-400' : 'btn-atelier'
                    }`}
                >
                  {justAdded ? (
                    <span className="flex items-center justify-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-brass-300" />
                      Added to cart
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <ShoppingBag className="w-3.5 h-3.5 text-brass-300" />
                      <span>{t('reservePiece')}</span>
                    </span>
                  )}
                </button>
              </div>

              {/* Made-to-Order & Honest Shipping Estimate */}
              <div className="p-3 rounded-xl bg-parchment-50 border border-[#B8964F]/30 space-y-1 text-xs font-serif">
                <div className="flex items-center justify-between">
                  <span className="text-[#4E6E58] font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {currentStock > 0 ? 'Ready to Ship (Almora Atelier)' : `Made to Order: ready in ${product.makingTimeDays} days`}
                  </span>
                  <span className="text-[11px] text-[#8C4E28]">
                    {currentStock > 0 ? 'Departs within 24–48 hours' : 'Hand-raised over oak charcoal'}
                  </span>
                </div>
                <p className="text-[11px] text-[#2A1A12]/70 font-sans">
                  Insured BlueDart Air dispatch from Tamta Mohalla, Almora • Free transit on ₹1,999+
                </p>
              </div>

              {/* Gifting Options */}
              <div className="p-3.5 rounded-xl bg-parchment-100 border border-brass-600/30 space-y-2 text-xs font-serif">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-walnut-950">
                  <input
                    type="checkbox"
                    checked={isGiftWrap}
                    onChange={(e) => setIsGiftWrap(e.target.checked)}
                    className="rounded text-[#8C4E28] focus:ring-[#8C4E28]"
                  />
                  <span>Send as a Gift: Handcrafted Wrap & Wax Seal Card (+₹150)</span>
                </label>
                {isGiftWrap && (
                  <div className="pt-2 space-y-2 pl-6">
                    <textarea
                      rows={2}
                      placeholder="Write your personal blessing or message for recipient..."
                      value={giftMessage}
                      onChange={(e) => setGiftMessage(e.target.value)}
                      className="w-full p-2.5 rounded-lg bg-parchment-50 border border-brass-600/30 text-xs font-sans text-walnut-900 focus:outline-none"
                    />
                    <label className="flex items-center gap-2 text-[11px] text-walnut-800">
                      <input
                        type="checkbox"
                        checked={isGiftWhatsApp}
                        onChange={(e) => setIsGiftWhatsApp(e.target.checked)}
                        className="rounded text-[#8C4E28]"
                      />
                      <span>Send recipient delivery updates on WhatsApp (Opt-in only)</span>
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Pincode Estimator */}
            <div className="bg-parchment-100 rounded-2xl p-4 border border-brass-600/35 space-y-2.5 museum-plaque">
              <div className="flex items-center gap-2 text-xs font-serif font-bold text-walnut-950">
                <Truck className="w-4 h-4 text-brass-700" />
                <span>{t('checkPincodeTitle')}</span>
              </div>
              <form onSubmit={handlePincodeCheck} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  placeholder={t('checkPincodePlaceholder')}
                  value={pincodeInput}
                  onChange={(e) => setPincodeInput(e.target.value)}
                  className="flex-1 bg-parchment-50 border border-brass-600/35 rounded-lg px-3 py-2 text-xs text-walnut-900 focus:outline-none focus:border-copper-600 font-serif"
                />
                <button type="submit" className="px-4 py-2 btn-atelier text-xs rounded-lg">
                  {t('checkPincodeButton')}
                </button>
              </form>

              {pincodeResult && (
                <div className="bg-parchment-50 p-2.5 rounded-lg text-xs space-y-1 text-walnut-900 border border-brass-600/20 font-body">
                  <p className="font-serif font-semibold text-patina-800 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    Express transit to {pincodeResult.city}, {pincodeResult.state}
                  </p>
                  <p className="text-[11px] text-walnut-700">
                    Estimated Transit: <strong>{pincodeResult.days} business days</strong> via BlueDart Air
                  </p>
                  <p className="text-[11px] text-walnut-700">
                    Handover COD:{' '}
                    <strong>{pincodeResult.cod ? 'Eligible' : 'Not Eligible'}</strong>
                  </p>
                </div>
              )}

              {/* Questions? Ask on WhatsApp */}
              <div className="pt-2 border-t border-brass-600/20 flex items-center justify-between text-xs text-brass-800 font-serif px-1">
                <span className="text-walnut-800">Questions?</span>
                <a
                  href={buildWhatsAppClickUrl(
                    getPreFilledMessage({
                      type: 'product',
                      productName: product.title,
                      sku: `TS-${product.id.toUpperCase()}`,
                      pageUrl: typeof window !== 'undefined' ? window.location.href : `https://tamtashilp.in/product/${product.slug}`,
                    })
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-copper-700 hover:text-copper-800 font-bold hover:underline transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-copper-600" />
                  <span>Ask on WhatsApp →</span>
                </a>
              </div>
            </div>

            {/* Traditional Care & Safety Notice */}
            <div className="bg-patina-900 text-ivory rounded-2xl p-4 border border-brass-600/40 space-y-1.5 text-xs font-body">
              <span className="text-[10px] uppercase tracking-wider font-serif text-brass-300 block font-bold">
                Classical Care Guidance:
              </span>
              <p className="text-parchment-300 leading-snug">
                {product.safetyNotice}
              </p>
            </div>
          </div>
        </div>

        {/* "STORY OF THIS PIECE" & SPECIFICATIONS */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pt-10 border-t border-brass-600/30">
          {/* Story with Drop Cap */}
          <div className="md:col-span-7 bg-parchment-100 rounded-3xl p-6 sm:p-10 border border-brass-600/35 museum-plaque space-y-4">
            <span className="text-xs uppercase tracking-widest2 text-brass-700 font-sans font-semibold">
              Archival Provenance
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-walnut-950">
              The Story of this Piece
            </h3>
            <p className="drop-cap text-sm sm:text-base text-walnut-900 leading-relaxed font-body">
              {language === 'hi' ? product.descriptionHi : product.description}
            </p>

            <div className="pt-4 border-t border-brass-600/20 grid grid-cols-3 gap-3 text-center text-xs font-serif">
              <div className="p-3 bg-parchment-50 rounded-xl border border-brass-600/20">
                <span className="text-[10px] text-brass-700 uppercase block font-sans">Craftsman</span>
                <strong className="text-walnut-950">{settings.artisan_name}</strong>
              </div>
              <div className="p-3 bg-parchment-50 rounded-xl border border-brass-600/20">
                <span className="text-[10px] text-brass-700 uppercase block font-sans">Anvil Labor</span>
                <strong className="text-walnut-950">{product.hoursOfLabor || 14} Hours</strong>
              </div>
              <div className="p-3 bg-parchment-50 rounded-xl border border-brass-600/20">
                <span className="text-[10px] text-brass-700 uppercase block font-sans">Hammer Blows</span>
                <strong className="text-walnut-950">{product.anvilBlows || 2400}+ Strikes</strong>
              </div>
            </div>
          </div>

          {/* Metallurgical Specs & Maintenance */}
          <div className="md:col-span-5 bg-parchment-100 rounded-3xl p-6 sm:p-10 border border-brass-600/35 museum-plaque space-y-5">
            <h3 className="font-serif text-xl font-bold text-walnut-950 flex items-center gap-2">
              <Award className="w-5 h-5 text-brass-600" />
              <span>{t('materialDetails')}</span>
            </h3>

            <div className="divide-y divide-brass-600/20 text-xs font-serif">
              <div className="py-2 flex justify-between">
                <span className="text-walnut-700">Certified Purity</span>
                <span className="font-bold text-walnut-950">{product.purityRating}</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-walnut-700">Assay Registry</span>
                <span className="font-mono text-copper-700 font-bold">{product.purityCertificationNo}</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-walnut-700">Physical Weight</span>
                <span className="text-walnut-950">{product.weightGrams} grams</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-walnut-700">Outer Dimensions</span>
                <span className="text-walnut-950">{product.dimensions}</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-walnut-700">Origin Atelier</span>
                <span className="text-walnut-950">{product.village || 'Almora, Uttarakhand'}</span>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <h4 className="font-serif text-sm font-bold text-walnut-950">Traditional Care Protocol</h4>
              <ul className="space-y-1.5 text-xs text-walnut-800 font-body">
                {product.careInstructions.slice(0, 3).map((instr, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-copper-700 font-serif font-bold">•</span>
                    <span>{instr}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* "BEHIND THE PIECE" ANVIL TIMELINE */}
        <div className="bg-parchment-100 rounded-3xl p-6 sm:p-10 border border-brass-600/35 museum-plaque space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-brass-600/25 gap-2">
            <div>
              <span className="text-[10px] text-brass-700 uppercase tracking-widest font-sans font-semibold">
                Ancestral Craftsmanship
              </span>
              <h3 className="font-serif text-2xl font-normal text-walnut-950">
                Behind the Piece: Six Anvil Stages
              </h3>
            </div>
            <span className="text-xs text-[#8C4E28] font-serif">
              Master Smith Devendra Kumar Tamta
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs font-serif">
            {[
              { step: '01', title: 'Virgin Cut', desc: 'Single 99.2% copper disc slicing' },
              { step: '02', title: 'Horn Raising', desc: 'Seamless shaping on anvil stake' },
              { step: '03', title: 'Oak Annealing', desc: 'Charcoal heating & mountain quench' },
              { step: '04', title: 'Chitai Facets', desc: 'Work-hardening hand hammer blows' },
              { step: '05', title: 'Pure Kalai', desc: '99.9% molten food-grade tinning' },
              { step: '06', title: 'Tamarind Buff', desc: 'Acid-free luster with wood ash' },
            ].map((s) => (
              <div key={s.step} className="p-3 rounded-xl bg-parchment-50 border border-brass-600/25 text-center space-y-1">
                <span className="text-xs text-[#8C4E28] font-bold block">{s.step}</span>
                <strong className="block text-walnut-950 text-xs">{s.title}</strong>
                <span className="text-[10px] text-[#2A1A12]/70 font-sans block leading-tight">{s.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Heraldic Inscription Preview */}
        <div className="space-y-4">
          <div className="border-b border-brass-600/25 pb-3">
            <span className="text-[10px] text-brass-700 uppercase tracking-widest font-sans font-semibold">
              Personalized Monogram
            </span>
            <h3 className="font-serif text-2xl font-normal text-walnut-950">
              Inscribe this Piece Before Dispatch
            </h3>
          </div>
          <EngravingPreview />
        </div>

        {/* Patron Appraisals Section */}
        <div className="bg-parchment-100 rounded-3xl p-6 sm:p-10 border border-brass-600/35 museum-plaque space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-brass-600/25 gap-3">
            <div>
              <h3 className="font-serif text-2xl font-normal text-walnut-950">{t('verifiedReviews')}</h3>
              <p className="text-xs text-walnut-700">
                Inscriptions from patrons who have welcomed this piece into their hearths.
              </p>
            </div>
            <div className="text-right">
              <span className="font-serif text-2xl font-bold text-copper-700">{product.rating}</span>
              <span className="text-xs text-brass-700"> / 5.0</span>
            </div>
          </div>

          <div className="divide-y divide-brass-600/20 space-y-4">
            {reviewList.map((rev) => (
              <div key={rev.id} className="pt-4 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-serif">
                  <span className="font-bold text-walnut-950">{rev.userName}</span>
                  <span className="text-brass-700 font-sans text-[11px]">{rev.date}</span>
                </div>
                <p className="text-xs text-copper-800 font-serif font-semibold">{rev.title}</p>
                <p className="text-xs text-walnut-800 font-body leading-relaxed">{rev.comment}</p>
                {rev.artisanReply && (
                  <div className="bg-parchment-200 p-3 rounded-lg border border-brass-600/20 text-xs font-body mt-2">
                    <span className="font-serif font-bold text-copper-700 block text-[11px] uppercase">
                      Artisan Inscription:
                    </span>
                    <p className="italic text-walnut-900">{rev.artisanReply}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="pt-4 border-t border-brass-600/20 space-y-3 font-serif">
            <h4 className="text-sm font-bold text-walnut-950">Inscribe Your Appraisal</h4>
            {reviewSubmitted ? (
              <p className="text-xs text-patina-800 font-bold bg-patina-900/10 p-3 rounded-lg">
                Dhanyawad. Your appraisal has been inscribed into the permanent record.
              </p>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-3 text-xs">
                <input
                  type="text"
                  required
                  placeholder="Your Name (e.g. Ramesh Chandra, Nainital)"
                  value={newReviewName}
                  onChange={(e) => setNewReviewName(e.target.value)}
                  className="w-full bg-parchment-50 border border-brass-600/35 rounded-lg p-2.5 text-xs text-walnut-900 focus:outline-none focus:border-copper-600"
                />
                <textarea
                  required
                  rows={3}
                  placeholder="Appraise the hammer marks, density, thermal conduct, and water taste…"
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  className="w-full bg-parchment-50 border border-brass-600/35 rounded-lg p-2.5 text-xs text-walnut-900 focus:outline-none focus:border-copper-600 font-body"
                />
                <button type="submit" className="px-6 py-2 btn-atelier text-xs rounded-lg">
                  Inscribe Appraisal
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Companion Works */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6">
            <h3 className="font-serif text-2xl font-normal text-walnut-950">
              {t('relatedProducts')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
              {relatedProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  onOpenQR={() => setIsQRModalOpen(true)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Video Modal */}
        {isVideoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-patina-950/90 backdrop-blur-xs">
            <div className="relative bg-patina-900 rounded-2xl overflow-hidden max-w-3xl w-full border border-brass-500/60 shadow-2xl">
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-ivory hover:bg-black"
              >
                ✕
              </button>
              <div className="aspect-video w-full">
                <video src={product.videoUrl} controls autoPlay className="w-full h-full object-cover" />
              </div>
              <div className="p-4 bg-patina-950 text-ivory font-serif">
                <p className="text-xs font-bold">{product.title}</p>
                <p className="text-[11px] text-brass-400 font-body">Anvil shaping by {settings.artisan_name}</p>
              </div>
            </div>
          </div>
        )}

        {/* QR Authenticity Modal */}
        <AuthenticityModal product={product} onClose={() => setIsQRModalOpen(false)} />

        {/* Mobile Sticky Action Bar */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-patina-950/95 backdrop-blur-md border-t border-brass-600/40 p-3 px-4 flex items-center justify-between gap-3 shadow-2xl">
          <div className="min-w-0">
            <span className="text-[10px] text-brass-400 font-sans uppercase tracking-widest block truncate">
              {selectedVariant ? selectedVariant.name : product.finish}
            </span>
            <span className="text-lg font-serif font-bold text-copper-400">
              ₹{currentPrice.toLocaleString('en-IN')}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className={`flex-1 max-w-[210px] py-3 px-4 rounded-xl text-xs font-serif tracking-wider uppercase transition-all shadow-lg active:scale-95 touch-manipulation ${
              justAdded
                ? 'bg-patina-800 text-ivory border border-brass-400'
                : 'btn-atelier'
            }`}
          >
            {justAdded ? (
              <span className="flex items-center justify-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-brass-300" />
                <span>Added</span>
              </span>
            ) : (
              <span className="flex items-center justify-center gap-1.5">
                <ShoppingBag className="w-3.5 h-3.5 text-brass-300" />
                <span>{t('reservePiece')}</span>
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
