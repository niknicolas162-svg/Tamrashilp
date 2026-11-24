'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Hammer,
  ShieldCheck,
  Star,
  Play,
  Pause,
  Award,
  ChevronRight,
  Sparkles,
  Compass,
  Volume2,
  VolumeX,
  Maximize2,
} from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { TrustBadges } from '@/components/common/TrustBadges';
import { ProductCard } from '@/components/common/ProductCard';
import { AuthenticityModal } from '@/components/common/AuthenticityModal';
import { HelpMeChoose } from '@/components/common/HelpMeChoose';
import { EngravingPreview } from '@/components/common/EngravingPreview';
import { CuratorQuizModal } from '@/components/common/CuratorQuizModal';
import { PRODUCTS, ARTISANS, CATEGORIES } from '@/lib/mockData';
import { Product } from '@/types';

export default function HomePage() {
  const { t, language } = useLanguage();
  const [selectedProductQR, setSelectedProductQR] = useState<Product | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeStepTab, setActiveStepTab] = useState(0);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleAudio = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
      if (!nextMuted && videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery.matches && videoRef.current) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, []);

  const curatedHeirlooms = PRODUCTS.filter((p) => p.isBestseller).slice(0, 4);
  const founder = ARTISANS[0];

  const sixSteps = [
    {
      num: '01',
      title: 'Cut: Virgin Ingot Sheet Slicing',
      titleHi: 'कटाई: शुद्ध तांबे की चादर',
      desc: 'Beaten from a single circular sheet of 99.2% virgin copper. No scrap, no recycled lead contaminants.',
      descHi: 'शुद्ध तांबे की चादर से काटा गया। कोई कबाड़ या लेड मिश्रण नहीं।',
      image: '/images/tamta/process-01.jpg',
    },
    {
      num: '02',
      title: 'Beat: Seamless Horn-Anvil Raising',
      titleHi: 'ढलाई: निहाई पर हाथों से उभारना',
      desc: 'The coppersmith curves the flat disc from the center outward over tapered steel stakes. Zero weld seams.',
      descHi: 'समतल चादर को बिना किसी जोड़ के गोल आकार में ढाला जाता है।',
      image: '/images/tamta/process-03.jpg',
    },
    {
      num: '03',
      title: 'Fire: Oak Charcoal Hearth Annealing',
      titleHi: 'तापन: कोयले की भट्टी पर तपाना',
      desc: 'Heated to a cherry glow over mountain oak embers, then plunged into icy spring water to soften the metal crystal.',
      descHi: 'कोयले की आंच पर लाल होने तक तपाया जाता है और ठंडे पानी में बुझाया जाता है।',
      image: '/images/tamta/tool-04.jpg',
    },
    {
      num: '04',
      title: 'Shape: The Chitai Honeycomb Strike & Chasing',
      titleHi: 'छिताई: हथौड़े और छेनी की नक्काशी',
      desc: 'Over 2,400 rhythmic blows and hand-chiseled stipples harden the exterior, creating the iconic diamond reflection and structural endurance.',
      descHi: '2,400 से अधिक हथौड़ी और छेनी की चोटें तांबे को मजबूत और अलंकृत बनाती हैं।',
      image: '/images/artisan-chasing-copper.jpg',
    },
    {
      num: '05',
      title: 'Braze & Tin: Traditional Pure Kalai',
      titleHi: 'कलाई: शुद्ध टिन की सुरक्षा',
      desc: 'For culinary cookware, molten 99.9% food-grade tin is swirled inside over sal-ammoniac embers.',
      descHi: 'कुकवेयर के भीतर शुद्ध रांगा (टिन) की कलाई की जाती है।',
      image: '/images/tamta/process-04.jpg',
    },
    {
      num: '06',
      title: 'Polish: Mountain Tamarind & River Sand',
      titleHi: 'सफाई: इमली और नदी की रेत',
      desc: 'Tamarind pulp and wood ash cleanse fire-scale, unveiling the radiant golden warmth of virgin copper.',
      descHi: 'इमली और राख से प्राकृतिक चमक उभारी जाती है।',
      image: '/images/tamta/intro-06.jpg',
    },
  ];

  return (
    <div className="font-body selection:bg-copper-700 selection:text-ivory">
      {/* 1. HERO SECTION (The One Bold Moment: Editorial Asymmetric Atelier Showcase) */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-patina-atelier text-ivory overflow-hidden px-4 sm:px-6 lg:px-8 border-b border-brass-600/35 py-14 sm:py-20">
        {/* Subtle candlelit warm glow */}
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[450px] bg-copper-600/10 rounded-full blur-[140px] pointer-events-none" />

        {/* Atmospheric spark animation */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-brass-300 animate-spark blur-[1px]"></span>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Brand Thesis & Curator Invitation */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brass-500/40 bg-patina-900/90 text-brass-300 text-xs font-serif tracking-[0.2em] uppercase">
              <span>✦</span>
              <span>The Tamta Coppersmith Atelier • Almora</span>
              <span>✦</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-normal tracking-[0.05em] text-ivory leading-[1.08]">
              {language === 'hi' ? (
                <>
                  हाथों से गढ़ा गया। <br />
                  <span className="text-copper-400 italic font-serif">पीढ़ियों तक संजोया गया।</span>
                </>
              ) : (
                <>
                  Struck by hand. <br />
                  <span className="text-copper-400 italic font-serif">Kept for generations.</span>
                </>
              )}
            </h1>

            <p className="text-parchment-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 font-body font-light leading-relaxed">
              {t('brandSubtext')}
            </p>

            {/* Central Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 max-w-sm sm:max-w-none mx-auto lg:mx-0">
              <Link
                href="/shop"
                className="w-full sm:w-auto px-7 py-3.5 rounded-lg btn-atelier text-xs tracking-atelier shadow-xl text-center"
              >
                {t('heroCtaShop')}
              </Link>

              <Link
                href="/craft-process"
                className="w-full sm:w-auto px-6 py-3.5 rounded-lg btn-atelier-outline text-xs tracking-atelier flex items-center justify-center space-x-2 border-brass-400 text-brass-300 hover:text-ivory text-center"
              >
                <Hammer className="w-3.5 h-3.5 text-copper-400" />
                <span>{t('heroCtaCraft')}</span>
              </Link>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs font-serif text-brass-400 tracking-wider">
              <span>99.2% Virgin Copper</span>
              <span>✦</span>
              <span>No Factory Presses</span>
              <span>✦</span>
              <span>Almora Guild Certified</span>
            </div>
          </div>

          {/* Right Column: Archival Intro Reel (Video with Poster & Opt-in Sound) */}
          <div className="lg:col-span-5 max-w-md mx-auto w-full">
            <div
              className="relative aspect-[4/5] sm:aspect-[3/4] w-full rounded-2xl overflow-hidden border border-brass-500/50 shadow-2xl bg-patina-950 group cursor-pointer museum-plaque-dark"
              onClick={togglePlay}
            >
              {/* Authentic Coppersmith Video */}
              <video
                ref={videoRef}
                src="/videos/intro-craft.mp4"
                poster="/images/artisan-chasing-copper.jpg"
                preload="metadata"
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              />

              {/* Seamless Candlelit & Film Vignette Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-patina-950 via-patina-950/20 to-patina-950/60 pointer-events-none" />

              {/* Top Film Reel Info & Opt-in Sound Toggle */}
              <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                <div className="flex items-center space-x-2 bg-patina-950/85 backdrop-blur-md px-3 py-1 rounded-full border border-brass-500/35">
                  <span className="w-1.5 h-1.5 rounded-full bg-copper-400 animate-pulse" />
                  <span className="text-[10px] font-serif uppercase tracking-[0.2em] text-ivory">
                    Atelier Reel • Almora
                  </span>
                </div>

                {/* Sound Button (Opt-in, off by default) */}
                <button
                  type="button"
                  onClick={toggleAudio}
                  className={`px-3 py-1 rounded-full text-[10px] font-sans tracking-wider backdrop-blur-md transition-all flex items-center gap-1.5 border ${
                    !isMuted
                      ? 'bg-copper-700/90 text-ivory border-copper-400 shadow-md'
                      : 'bg-patina-950/85 text-brass-300 border-brass-600/40 hover:text-ivory hover:border-brass-400'
                  }`}
                  aria-label={isMuted ? 'Unmute forge audio' : 'Mute forge audio'}
                >
                  {!isMuted ? (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-copper-300 animate-pulse" />
                      <span className="font-medium">Sound: Live</span>
                    </>
                  ) : (
                    <>
                      <VolumeX className="w-3.5 h-3.5 text-brass-400" />
                      <span>Sound: Off</span>
                    </>
                  )}
                </button>
              </div>

              {/* Center Play Indicator (When Paused) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                {!isPlaying ? (
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-patina-950/90 border border-brass-400/80 text-brass-300 flex items-center justify-center shadow-2xl backdrop-blur-sm transition-transform scale-100">
                    <Play className="w-6 h-6 fill-current ml-1 text-brass-300" />
                  </div>
                ) : (
                  <div className="w-11 h-11 rounded-full bg-patina-950/40 border border-brass-500/30 text-brass-300/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
                    <Pause className="w-4 h-4 text-brass-300" />
                  </div>
                )}
              </div>

              {/* Bottom Documentary Title Plate */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-10 space-y-1.5 pointer-events-none">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-copper-400 font-semibold">
                    The Horn Anvil Ceremony
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsVideoModalOpen(true);
                    }}
                    className="pointer-events-auto p-1.5 rounded-full bg-patina-950/80 text-brass-400 hover:text-ivory border border-brass-600/40 transition-colors"
                    title="Expand Full Screen"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h3 className="font-serif text-lg sm:text-2xl text-ivory font-normal leading-snug">
                  {language === 'hi' ? 'हथौड़े की हर चोट में जीवित इतिहास' : 'Living Heritage in Every Hammer Strike'}
                </h3>

                <p className="text-[11px] sm:text-xs text-parchment-300/90 font-body font-light leading-relaxed line-clamp-2">
                  Tamta Mohalla, Almora • Hand-forged over mountain oak embers with 2,400 rhythmic blows.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ARCHIVAL HALLMARKS (Dark Patina Ground) */}
      <TrustBadges />

      {/* 3. THE HERITAGE FOLIOS (Parchment Ground: Feels like opening an illuminated archive) */}
      <section className="bg-parchment-texture text-walnut-900 py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-brass-600/30">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest2 text-brass-700 font-sans font-semibold">
              {t('featuredCollectionsTitle')}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-walnut-950 font-normal">
              {language === 'hi' ? 'विरासत ताम्र खंड' : 'Vessels of Daily Ritual & Feast'}
            </h2>
            <div className="kumaoni-divider my-3">
              <span className="text-brass-600 text-xs">✦</span>
            </div>
            <p className="text-xs sm:text-sm text-walnut-800 leading-relaxed max-w-md mx-auto">
              {t('featuredCollectionsSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {CATEGORIES.slice(0, 6).map((cat) => (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.slug}`}
                className="group relative rounded-2xl overflow-hidden museum-plaque bg-parchment-100 aspect-4/3 flex flex-col justify-end p-6"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out sepia-[0.12] contrast-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-patina-950/90 via-patina-950/40 to-transparent pointer-events-none" />

                <div className="relative z-10 space-y-1 text-ivory">
                  <span className="text-[10px] font-sans uppercase tracking-atelier text-brass-400">
                    Folio • {cat.itemCount} Works
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-ivory group-hover:text-brass-300 transition-colors font-normal">
                    {language === 'hi' ? cat.nameHi : cat.name}
                  </h3>
                  <p className="text-xs text-parchment-300 line-clamp-2 font-body font-light pt-1">
                    {cat.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CURATED HEIRLOOMS (Parchment Folio with Plaque Cards) */}
      <section className="bg-parchment-200 text-walnut-900 py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-brass-600/30">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-brass-600/30 pb-6">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest2 text-brass-700 font-sans font-semibold">
                {t('bestsellersTitle')}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-walnut-950 font-normal">
                {language === 'hi' ? 'कालजयी धरोहर रचनाएं' : 'Individual Works of Note'}
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs font-serif uppercase tracking-atelier text-copper-700 hover:text-copper-900 font-semibold flex items-center gap-1 group"
            >
              <span>Examine the Full Permanent Collection</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {curatedHeirlooms.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onOpenQR={(p) => setSelectedProductQR(p)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. "THE MAKING" (Dark Patina Ground: Anvil & Hearth Journey) */}
      <section className="bg-patina-atelier text-ivory py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-brass-600/35">
        <div className="max-w-7xl mx-auto space-y-14">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest2 text-brass-400 font-sans font-semibold">
              {t('craftProcessTitle')}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-ivory font-normal">
              {language === 'hi' ? 'अग्नि और निहाई का अनुशासन' : 'The Six Anvil Ceremonies'}
            </h2>
            <div className="kumaoni-divider my-3">
              <span className="text-brass-400 text-xs">✦</span>
            </div>
            <p className="text-xs sm:text-sm text-parchment-300 font-body max-w-md mx-auto">
              Hydraulic industrial presses stamp a thin vessel in ten seconds. At the Almora anvil, every contour demands hours of muscle, patience, and charcoal flame.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Mobile horizontal tab pills (visible on < lg screens) */}
            <div className="lg:hidden flex overflow-x-auto gap-2 pb-2 -mx-4 px-4 snap-x">
              {sixSteps.map((s, idx) => (
                <button
                  key={s.num}
                  onClick={() => setActiveStepTab(idx)}
                  className={`shrink-0 px-3.5 py-2 rounded-lg border text-xs font-serif transition-all snap-start flex items-center gap-2 ${
                    activeStepTab === idx
                      ? 'bg-patina-900 border-brass-400 text-ivory shadow-md font-bold'
                      : 'bg-patina-950/70 border-brass-700/30 text-parchment-400 hover:text-ivory'
                  }`}
                >
                  <span className="text-copper-400 font-bold">{s.num}</span>
                  <span>{s.title.split(':')[0]}</span>
                </button>
              ))}
            </div>

            {/* Desktop Step navigation tabs */}
            <div className="hidden lg:block lg:col-span-5 space-y-3">
              {sixSteps.map((s, idx) => (
                <button
                  key={s.num}
                  onClick={() => setActiveStepTab(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 font-body ${
                    activeStepTab === idx
                      ? 'bg-patina-900 border-brass-500 shadow-md ring-1 ring-brass-500/30'
                      : 'bg-patina-950/60 border-brass-700/25 hover:bg-patina-900/60 text-parchment-300'
                  }`}
                >
                  <span
                    className={`font-serif text-lg font-bold ${
                      activeStepTab === idx ? 'text-copper-400' : 'text-brass-600'
                    }`}
                  >
                    {s.num}
                  </span>
                  <div>
                    <h4 className="font-serif text-sm text-ivory font-medium">
                      {language === 'hi' ? s.titleHi : s.title}
                    </h4>
                    <p className="text-xs text-parchment-400 line-clamp-2 mt-0.5 leading-snug">
                      {language === 'hi' ? s.descHi : s.desc}
                    </p>
                  </div>
                </button>
              ))}

              <div className="pt-2">
                <Link
                  href="/craft-process"
                  className="inline-flex items-center text-xs font-serif uppercase tracking-atelier text-brass-400 hover:text-ivory gap-1.5"
                >
                  <span>Read Complete Vertical Craft Scroll</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Visual display of active step */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden museum-plaque-dark aspect-16/10 bg-patina-950">
                <img
                  src={sixSteps[activeStepTab].image}
                  alt={sixSteps[activeStepTab].title}
                  className="w-full h-full object-cover sepia-[0.15] contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-patina-950 via-patina-950/30 to-transparent p-6 sm:p-8 flex flex-col justify-end">
                  <span className="wax-seal text-[10px] font-serif font-bold px-3 py-0.5 rounded-full uppercase tracking-atelier w-fit mb-2">
                    Ceremony {sixSteps[activeStepTab].num}
                  </span>
                  <h3 className="font-serif text-2xl text-ivory font-normal">
                    {language === 'hi' ? sixSteps[activeStepTab].titleHi : sixSteps[activeStepTab].title}
                  </h3>
                  <p className="text-xs sm:text-sm text-parchment-300 font-body max-w-xl mt-1 leading-relaxed">
                    {language === 'hi' ? sixSteps[activeStepTab].descHi : sixSteps[activeStepTab].desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5B. HELP ME CHOOSE: 3-QUESTION DIAGNOSTIC HELPER */}
      <section className="bg-parchment-200 text-walnut-900 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-brass-600/30">
        <div className="max-w-7xl mx-auto">
          <HelpMeChoose />
        </div>
      </section>

      {/* 6. THE MASTER CRAFTSMAN (Sole Artisan of the Atelier) */}
      <section className="bg-parchment-texture text-walnut-900 py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-brass-600/30">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest2 text-brass-700 font-sans font-semibold">
              {language === 'hi' ? 'एकमात्र मुख्य शिल्पकार' : 'The Master Craftsman'}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-walnut-950 font-normal">
              {founder?.name || 'Devendra Kumar Tamta'}
            </h2>
            <div className="kumaoni-divider my-3">
              <span className="text-brass-600 text-xs">✦</span>
            </div>
            <p className="text-xs sm:text-sm text-walnut-800 leading-relaxed max-w-md mx-auto">
              Every utensil in the Tamrashilp atelier is hand-hammered from certified virgin copper over the horn anvil by Devendra Kumar Tamta, honouring 500 years of Kumaoni coppersmith lineage.
            </p>
          </div>

          {/* Grand Centerpiece Founder Showcase - Majestic & Centered */}
          {founder && (
            <div className="max-w-5xl mx-auto w-full">
              <div className="bg-parchment-100 rounded-3xl border-2 border-brass-500/80 p-8 sm:p-12 lg:p-16 museum-plaque shadow-2xl relative overflow-hidden text-center">
                {/* Subtle corner floral flourish accents */}
                <div className="absolute top-4 left-4 text-brass-600/50 text-sm font-serif pointer-events-none">✦</div>
                <div className="absolute top-4 right-4 text-brass-600/50 text-sm font-serif pointer-events-none">✦</div>
                <div className="absolute bottom-4 left-4 text-brass-600/50 text-sm font-serif pointer-events-none">✦</div>
                <div className="absolute bottom-4 right-4 text-brass-600/50 text-sm font-serif pointer-events-none">✦</div>

                <div className="max-w-3xl mx-auto space-y-8 flex flex-col items-center">
                  {/* Founder Lineage Crest */}
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brass-600/60 bg-parchment-200/90 text-copper-800 text-xs font-serif uppercase tracking-[0.25em] font-semibold shadow-sm">
                    <span className="text-brass-600">✦</span>
                    <span>Founder & Sole Master Craftsman</span>
                    <span className="text-brass-600">✦</span>
                  </div>

                  {/* Grand Centered Founder Portrait */}
                  <div className="relative group my-2">
                    <div className="relative w-72 h-96 sm:w-84 sm:h-[420px] md:w-[420px] md:h-[480px] rounded-2xl overflow-hidden border-4 border-brass-500 shadow-2xl candle-vignette bg-patina-950 mx-auto transition-transform duration-700 ease-out group-hover:scale-[1.02]">
                      <img
                        src={founder.avatar}
                        alt={founder.name}
                        className="w-full h-full object-cover object-top sepia-[0.05] contrast-[1.03]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-patina-950/85 via-patina-950/15 to-transparent pointer-events-none" />
                      <div className="absolute bottom-4 left-4 right-4 text-center">
                        <span className="text-xs uppercase font-sans tracking-[0.28em] text-brass-300 font-semibold drop-shadow-md">
                          Tamta Mohalla • Almora, Uttarakhand
                        </span>
                      </div>
                    </div>

                    {/* Wax Seal Badge floating at portrait base */}
                    <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full wax-seal text-xs font-serif uppercase tracking-atelier font-bold shadow-lg">
                      <Award className="w-4 h-4 text-brass-300" />
                      <span>Tamta Coppersmith Lineage • 500-Year Heritage</span>
                    </div>
                  </div>

                  {/* Narrative & Pedigree */}
                  <div className="space-y-4 max-w-2xl mx-auto">
                    <div className="space-y-1">
                      <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-walnut-950 font-normal leading-tight tracking-wide">
                        {founder.name}
                      </h3>
                      <p className="font-serif text-base sm:text-lg text-copper-700 italic">
                        {founder.nameHi} • {founder.workshopName}
                      </p>
                    </div>

                    <div className="kumaoni-divider my-3">
                      <span className="text-brass-600 text-xs">✦</span>
                    </div>

                    <p className="drop-cap text-sm sm:text-base text-walnut-800 leading-relaxed font-body text-justify sm:text-center">
                      {language === 'hi' ? founder.storyHi : founder.story}
                    </p>

                    {/* Accolades & Lineage Grid Centered */}
                    <div className="grid grid-cols-3 gap-3 sm:gap-4 py-4 my-4 border-y border-brass-600/30 text-center font-serif">
                      <div className="p-3 rounded-xl bg-parchment-50 border border-brass-600/25 shadow-sm">
                        <span className="block text-xl sm:text-2xl font-bold text-copper-700">Almora</span>
                        <span className="text-[10px] sm:text-xs uppercase tracking-wider text-brass-800 block font-sans mt-0.5">
                          Ancestral Village
                        </span>
                      </div>
                      <div className="p-3 rounded-xl bg-parchment-50 border border-brass-600/25 shadow-sm">
                        <span className="block text-xl sm:text-2xl font-bold text-copper-700">500 yr</span>
                        <span className="text-[10px] sm:text-xs uppercase tracking-wider text-brass-800 block font-sans mt-0.5">
                          Tamta Lineage
                        </span>
                      </div>
                      <div className="p-3 rounded-xl bg-parchment-50 border border-brass-600/25 shadow-sm">
                        <span className="block text-xl sm:text-2xl font-bold text-copper-700">100%</span>
                        <span className="text-[10px] sm:text-xs uppercase tracking-wider text-brass-800 block font-sans mt-0.5">
                          Struck by Hand
                        </span>
                      </div>
                    </div>

                    {/* Call to Actions Centered */}
                    <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
                      <Link
                        href="/master-craftsman"
                        className="w-full sm:w-auto px-8 py-3 rounded-lg btn-atelier text-xs sm:text-sm tracking-atelier inline-flex items-center justify-center gap-2 shadow-lg"
                      >
                        <span>The Master Craftsman story</span>
                        <ArrowRight className="w-4 h-4 text-brass-300" />
                      </Link>

                      <Link
                        href="/shop"
                        className="w-full sm:w-auto px-7 py-3 rounded-lg btn-atelier-outline text-xs sm:text-sm tracking-atelier inline-flex items-center justify-center gap-2 border-brass-600/60 text-walnut-900 bg-parchment-50"
                      >
                        <span>Shop the collection</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 6B. THE HERALDIC ENGRAVING VISUALIZER */}
      <section className="bg-parchment-100 text-walnut-900 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-brass-600/30">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-widest2 text-brass-700 font-sans font-semibold">
              Bespoke Heraldic Commission
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-walnut-950 font-normal">
              Chiseled Inscriptions for Heirlooms
            </h2>
            <p className="text-xs sm:text-sm text-walnut-800 font-light max-w-lg mx-auto">
              Immortalize clan crests, marriage dates, or family names into pure copper using traditional Almora cold-chiseling.
            </p>
          </div>
          <EngravingPreview />
        </div>
      </section>

      {/* 7. CLASSICAL AYURVEDIC WISDOM & SAFETY (Dark Patina Sanctuary) */}
      <section className="bg-patina-950 text-ivory py-16 px-4 sm:px-6 lg:px-8 border-b border-brass-600/35">
        <div className="max-w-4xl mx-auto museum-plaque-dark rounded-2xl p-8 sm:p-12 text-center space-y-4 relative">
          <span className="wax-seal text-[10px] font-serif px-3 py-1 rounded-full uppercase tracking-atelier inline-block">
            Vedic Metallurgical Sanctuary
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-ivory font-normal">
            Ushapan: Conscious Morning Hydration
          </h3>
          <p className="text-xs sm:text-sm text-parchment-300 font-body max-w-2xl mx-auto leading-relaxed">
            In classical texts such as <em>Charaka Samhita</em>, pure room-temperature drinking water is rested overnight in unlined copper vessels (approx. 8–10 hours) to balance the three doshas. For everyday health, keep the vessel clean. Always observe safe metallurgical care: never store acidic citrus juices, vinegar, curd, or milk in unlined copper.
          </p>
          <div className="pt-2">
            <Link
              href="/blog/ushapan-ayurvedic-morning-water-ritual"
              className="text-xs font-serif uppercase tracking-atelier text-brass-400 hover:text-ivory underline"
            >
              Read the Complete Ayurvedic Care Protocol
            </Link>
          </div>
        </div>
      </section>

      {/* 8. PATRON CHRONICLES & APPRAISALS (Parchment Folio) */}
      <section className="bg-parchment-texture text-walnut-900 py-20 px-4 sm:px-6 lg:px-8 border-b border-brass-600/30">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest2 text-brass-700 font-sans font-semibold">
              {t('testimonialsTitle')}
            </span>
            <h2 className="font-serif text-3xl text-walnut-950 font-normal">
              Appraisals from Patrons
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            <div className="p-6 rounded-2xl bg-parchment-100 museum-plaque space-y-3">
              <p className="text-xs text-walnut-800 leading-relaxed font-body italic">
                “The Royal Almora carafe possesses a quiet, heavy nobility. You feel the presence of the smith with every sip. It sits like a sculpture on my walnut desk.”
              </p>
              <div className="pt-2 border-t border-brass-600/20 text-xs font-serif">
                <p className="font-bold text-walnut-950">Devendra Singh Rawat</p>
                <p className="text-[11px] text-brass-700">Dehradun • Verified Patron</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-parchment-100 museum-plaque space-y-3">
              <p className="text-xs text-walnut-800 leading-relaxed font-body italic">
                “The Heavy Kumaoni Kadhai with pure tin lining conducts flame with astonishing sensitivity. Gravies cook evenly without sticking to the bottom.”
              </p>
              <div className="pt-2 border-t border-brass-600/20 text-xs font-serif">
                <p className="font-bold text-walnut-950">Pooja Nambiar</p>
                <p className="text-[11px] text-brass-700">Bengaluru • Verified Patron</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-parchment-100 museum-plaque space-y-3">
              <p className="text-xs text-walnut-800 leading-relaxed font-body italic">
                “Gifted the Velvet Presentation Box for my daughter’s wedding. The handwritten calligraphy note and natural lokta wrapping made it unforgettable.”
              </p>
              <div className="pt-2 border-t border-brass-600/20 text-xs font-serif">
                <p className="font-bold text-walnut-950">Dr. Rajesh Khanna</p>
                <p className="text-[11px] text-brass-700">New Delhi • Verified Patron</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. THE TAMTA ARCHIVAL CIRCLE NEWSLETTER (Dark Patina Ground) */}
      <section className="bg-patina-atelier text-ivory py-20 px-4 text-center space-y-4">
        <div className="max-w-xl mx-auto space-y-3">
          <span className="w-8 h-8 rounded-full wax-seal flex items-center justify-center mx-auto text-ivory text-xs">
            ✦
          </span>
          <h2 className="font-serif text-3xl font-normal text-ivory">
            {t('newsletterTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-parchment-300 font-body">
            {t('newsletterSubtitle')}
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Dhanyawad. You have been inscribed in the Tamta Archival Circle. Check your inbox for our welcoming heritage story.');
            }}
            className="space-y-3 max-w-md mx-auto pt-3 text-xs font-serif"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
              <input
                type="email"
                required
                placeholder={t('newsletterPlaceholder')}
                className="w-full sm:flex-1 px-4 py-2.5 rounded-lg text-xs bg-patina-950 border border-brass-600/50 text-ivory placeholder:text-brass-500/60 focus:outline-none focus:border-brass-400 font-serif"
              />
              <button type="submit" className="w-full sm:w-auto px-6 py-2.5 rounded-lg btn-atelier text-xs">
                {t('newsletterButton')}
              </button>
            </div>
            <p className="text-[11px] text-parchment-400 text-center font-light">
              One care-and-heritage story each month. Strictly opt-in. You may{' '}
              <span className="underline cursor-pointer hover:text-ivory">unsubscribe anytime</span>.
            </p>
          </form>
        </div>
      </section>

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
            <div className="aspect-video w-full bg-black">
              <video
                src="/videos/intro-craft.mp4"
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 bg-patina-950 text-ivory flex items-center justify-between font-serif">
              <div>
                <p className="text-xs font-bold">The Living Heritage of Tamta Coppersmiths</p>
                <p className="text-[11px] text-brass-400 font-body">Authentic hand-forging & chasing in Uttarakhand workshops</p>
              </div>
              <Link
                href="/shop"
                onClick={() => setIsVideoModalOpen(false)}
                className="px-4 py-1.5 rounded btn-atelier text-xs"
              >
                Explore Works
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* QR Authenticity Modal */}
      <AuthenticityModal
        product={selectedProductQR}
        onClose={() => setSelectedProductQR(null)}
      />

      {/* Curator Concierge Quiz Modal */}
      <CuratorQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
      />
    </div>
  );
}
