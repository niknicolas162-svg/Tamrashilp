'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
  ShoppingBag,
  Heart,
  Search,
  Globe,
  Menu,
  X,
  ChevronDown,
  Hammer,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { useCart } from '@/lib/cart-context';
import { useWishlist } from '@/lib/wishlist-context';
import { useAuth } from '@/lib/auth-context';
import { CATEGORIES, PRODUCTS } from '@/lib/mockData';
import { OCCASION_COLLECTIONS } from '@/lib/collections';
import { AvatarIcon } from '@/components/common/AvatarIcon';
import { CommandKSearch } from '@/components/common/CommandKSearch';
import { getSiteSettings, SiteSettings } from '@/lib/siteSettings';
import { buildWhatsAppClickUrl, getPreFilledMessage } from '@/lib/whatsapp/config';

export const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const { totalItemCount, setIsCartOpen } = useCart();
  const { wishlist } = useWishlist();
  const { user } = useAuth();

  const [settings, setSettings] = useState<SiteSettings>(getSiteSettings());
  const [isAnnouncementDismissed, setIsAnnouncementDismissed] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<'shop' | 'collections' | null>(null);

  // Scroll dynamics
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isHomePage = pathname === '/';

  useEffect(() => {
    setSettings(getSiteSettings());
    const handleUpdate = () => setSettings(getSiteSettings());
    window.addEventListener('tamtashilp:settings_updated', handleUpdate);
    return () => window.removeEventListener('tamtashilp:settings_updated', handleUpdate);
  }, []);

  // Handle header scroll transparency and reveal/hide
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Solid patina ground after 40px
      if (currentScrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide on scroll down, show on scroll up (unless reduced motion preferred)
      if (!prefersReducedMotion && currentScrollY > 120) {
        if (currentScrollY > lastScrollY.current && currentScrollY - lastScrollY.current > 6) {
          // Scrolling down: hide header
          setIsHeaderVisible(false);
          setActiveMegaMenu(null);
        } else if (lastScrollY.current - currentScrollY > 6) {
          // Scrolling up: reveal header
          setIsHeaderVisible(true);
        }
      } else {
        setIsHeaderVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard navigation for mega-menu
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setActiveMegaMenu(null);
    }
  };

  const handleMouseEnter = (menu: 'shop' | 'collections') => {
    if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
    setActiveMegaMenu(menu);
  };

  const handleMouseLeave = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 200);
  };

  const featuredShopProduct = PRODUCTS.find((p) => p.isBestseller) || PRODUCTS[0];
  const featuredOccasion = OCCASION_COLLECTIONS[0];

  return (
    <>
      {/* Skip to main content accessibility link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#12302B] focus:text-[#FAF4E8] focus:border focus:border-[#B8964F] focus:outline-none focus:ring-2 focus:ring-[#B8964F] rounded-lg font-serif text-xs uppercase tracking-wider"
      >
        Skip to main content
      </a>

      {/* Persistent wrapper for header */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ease-out font-sans ${
          isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
        onKeyDown={handleKeyDown}
      >
        {/* Top Dismissible Announcement Bar (One line, no countdowns) */}
        {!isAnnouncementDismissed && settings.announcement_enabled && (
          <aside
            aria-label="Atelier Announcement"
            className="bg-[#0B1F1C] text-[#EFE4CF] text-[11px] py-1.5 px-3 sm:px-6 border-b border-[#B8964F]/25 flex items-center justify-between gap-4 font-serif relative z-50"
          >
            <div className="flex-1 text-center truncate">
              <span className="text-[#B8964F] mr-2">✦</span>
              <span className="tracking-wide">
                {language === 'hi'
                  ? settings.announcement_text_hi
                  : settings.announcement_text_en}
              </span>
              <span className="text-[#B8964F] ml-2">✦</span>
            </div>

            <button
              onClick={() => setIsAnnouncementDismissed(true)}
              className="text-[#B8964F] hover:text-[#FAF4E8] p-1 rounded transition-colors shrink-0"
              aria-label="Dismiss announcement banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </aside>
        )}

        {/* Main Header Container: 3 Zones with thin brass bottom line */}
        <nav
          aria-label="Primary Navigation"
          className={`transition-colors duration-300 border-b border-[#B8964F]/35 ${
            isScrolled || !isHomePage
              ? 'bg-[#12302B] text-[#FAF4E8] shadow-xl'
              : 'bg-gradient-to-b from-[#0B1F1C]/90 via-[#12302B]/60 to-transparent text-[#FAF4E8]'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
              {/* ZONE 1 (LEFT): Main Desktop Nav in sentence-case Jost */}
              <div className="hidden lg:flex items-center space-x-7 text-xs tracking-wider text-[#FAF4E8]/90 font-sans font-normal">
                {/* Shop Mega-Menu Trigger */}
                <div
                  className="relative py-4"
                  onMouseEnter={() => handleMouseEnter('shop')}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    onClick={() => setActiveMegaMenu(activeMegaMenu === 'shop' ? null : 'shop')}
                    onFocus={() => setActiveMegaMenu('shop')}
                    aria-expanded={activeMegaMenu === 'shop'}
                    className="flex items-center gap-1 hover:text-[#B8964F] transition-colors focus:outline-none focus:text-[#B8964F]"
                  >
                    <span>{language === 'hi' ? 'शॉप' : 'Shop'}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        activeMegaMenu === 'shop' ? 'rotate-180 text-[#B8964F]' : 'text-[#B8964F]/80'
                      }`}
                    />
                  </button>
                </div>

                {/* Collections Mega-Menu Trigger */}
                <div
                  className="relative py-4"
                  onMouseEnter={() => handleMouseEnter('collections')}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    onClick={() => setActiveMegaMenu(activeMegaMenu === 'collections' ? null : 'collections')}
                    onFocus={() => setActiveMegaMenu('collections')}
                    aria-expanded={activeMegaMenu === 'collections'}
                    className="flex items-center gap-1 hover:text-[#B8964F] transition-colors focus:outline-none focus:text-[#B8964F]"
                  >
                    <span>{language === 'hi' ? 'संग्रह' : 'Collections'}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        activeMegaMenu === 'collections' ? 'rotate-180 text-[#B8964F]' : 'text-[#B8964F]/80'
                      }`}
                    />
                  </button>
                </div>

                {/* The Making */}
                <Link
                  href="/craft-process"
                  className="hover:text-[#B8964F] transition-colors focus:outline-none focus:text-[#B8964F]"
                >
                  {language === 'hi' ? 'निर्माण प्रक्रिया' : 'The Making'}
                </Link>

                {/* The Master Craftsman */}
                <Link
                  href="/master-craftsman"
                  className="hover:text-[#B8964F] transition-colors focus:outline-none focus:text-[#B8964F]"
                >
                  {language === 'hi' ? 'मुख्य शिल्पकार' : 'The Master Craftsman'}
                </Link>

                {/* Custom Orders */}
                <Link
                  href="/custom-order"
                  className="hover:text-[#B8964F] transition-colors focus:outline-none focus:text-[#B8964F]"
                >
                  {language === 'hi' ? 'कस्टम ऑर्डर्स' : 'Custom Orders'}
                </Link>
              </div>

              {/* Mobile Hamburger Trigger (Left on mobile) */}
              <div className="lg:hidden flex items-center">
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="min-w-[44px] min-h-[44px] p-2 flex items-center justify-center text-[#B8964F] hover:text-[#FAF4E8] focus:outline-none focus:ring-1 focus:ring-[#B8964F] rounded-lg"
                  aria-label="Open primary menu drawer"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </div>

              {/* ZONE 2 (CENTRE): Tamtashilp Brand Logo (Cinzel, tracked caps, Centred & Fixed) */}
              <div className="flex-1 lg:flex-initial text-center flex flex-col items-center justify-center">
                <Link
                  href="/"
                  className="group flex flex-col items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#B8964F]/50 rounded-lg px-2"
                >
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {/* Small refined hammer-and-anvil line icon */}
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-[#B8964F] group-hover:text-[#FAF4E8] transition-colors shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      {/* Anvil base */}
                      <path d="M5 19 C8 17.5, 16 17.5, 19 19 L21 16 L17 12 L7 12 L3 16 Z" />
                      {/* Hammer head striking */}
                      <path d="M11 5 L16 3 L18 7 L13 9 Z" />
                      {/* Hammer handle */}
                      <path d="M13.5 7.5 L8 13" />
                    </svg>

                    <span className="font-display text-xl sm:text-2xl lg:text-3xl tracking-[0.24em] text-[#FAF4E8] group-hover:text-[#B8964F] transition-colors uppercase font-normal">
                      Tamrashilp
                    </span>
                  </div>

                  <span className="text-[9px] sm:text-[10px] font-serif tracking-[0.25em] text-[#B8964F] uppercase block mt-0.5">
                    {language === 'hi' ? 'अल्मोड़ा ताम्रशिल्प कार्यशाला' : 'The Antique Atelier • Almora'}
                  </span>
                </Link>
              </div>

              {/* ZONE 3 (RIGHT): Search, Language, Wishlist, Account Avatar, Cart Drawer */}
              <div className="flex items-center space-x-1 sm:space-x-2 text-[#FAF4E8]">
                {/* Search Icon Trigger */}
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="min-w-[44px] min-h-[44px] p-2 rounded-full text-[#B8964F] hover:text-[#FAF4E8] hover:bg-[#0B1F1C]/50 flex items-center justify-center transition-colors focus:outline-none focus:ring-1 focus:ring-[#B8964F]"
                  title="Search Atelier Archive (Cmd + K)"
                  aria-label="Search collection and archives"
                >
                  <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                {/* Language Toggle (EN | हिन्दी) */}
                <div className="hidden sm:flex items-center px-2 py-1 rounded-full border border-[#B8964F]/35 bg-[#0B1F1C]/70 text-[10px] font-serif tracking-wider">
                  <button
                    onClick={() => setLanguage('en')}
                    className={`px-1.5 transition-colors ${
                      language === 'en' ? 'text-[#FAF4E8] font-bold underline' : 'text-[#B8964F] hover:text-[#FAF4E8]'
                    }`}
                  >
                    EN
                  </button>
                  <span className="text-[#B8964F]/50">|</span>
                  <button
                    onClick={() => setLanguage('hi')}
                    className={`px-1.5 transition-colors ${
                      language === 'hi' ? 'text-[#FAF4E8] font-bold underline' : 'text-[#B8964F] hover:text-[#FAF4E8]'
                    }`}
                  >
                    हिन्दी
                  </button>
                </div>

                {/* Wishlist Icon with count badge */}
                <Link
                  href="/wishlist"
                  className="min-w-[44px] min-h-[44px] p-2 rounded-full text-[#B8964F] hover:text-[#FAF4E8] hover:bg-[#0B1F1C]/50 flex items-center justify-center transition-colors relative focus:outline-none focus:ring-1 focus:ring-[#B8964F]"
                  title="Saved Pieces"
                  aria-label={`Wishlist with ${wishlist.length} saved pieces`}
                >
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                  {wishlist.length > 0 && (
                    <span className="absolute top-2 right-2 bg-[#8C4E28] text-[#FAF4E8] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#12302B]">
                      {wishlist.length}
                    </span>
                  )}
                </Link>

                {/* Account Avatar Icon */}
                <Link
                  href={user ? '/profile' : '/login'}
                  className="min-w-[44px] min-h-[44px] p-1.5 flex items-center justify-center rounded-full hover:bg-[#0B1F1C]/50 transition-colors focus:outline-none focus:ring-1 focus:ring-[#B8964F]"
                  title={user ? `Signed in as ${user.name}` : 'Sign In to Patron Sanctuary'}
                  aria-label={user ? 'Patron Account' : 'Sign in'}
                >
                  {user ? (
                    <AvatarIcon
                      styleName={user.avatarStyle || 'lota'}
                      initial={user.name ? user.name[0] : 'P'}
                      size="sm"
                      variant="dark"
                    />
                  ) : (
                    <AvatarIcon styleName="monogram" size="sm" variant="dark" />
                  )}
                </Link>

                {/* Cart Drawer Trigger */}
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="min-w-[44px] min-h-[44px] p-2 rounded-full text-[#B8964F] hover:text-[#FAF4E8] hover:bg-[#0B1F1C]/50 flex items-center justify-center transition-colors relative focus:outline-none focus:ring-1 focus:ring-[#B8964F]"
                  aria-label={`Open shopping cart with ${totalItemCount} items`}
                >
                  <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                  {totalItemCount > 0 && (
                    <span className="absolute top-2 right-2 bg-[#8C4E28] text-[#FAF4E8] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#12302B]">
                      {totalItemCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Mega-Menu for "Shop" */}
          {activeMegaMenu === 'shop' && (
            <div
              className="hidden lg:block absolute left-0 right-0 top-full bg-[#12302B] text-[#FAF4E8] border-b border-[#B8964F]/40 shadow-2xl z-50 animate-in fade-in duration-200"
              onMouseEnter={() => handleMouseEnter('shop')}
              onMouseLeave={handleMouseLeave}
            >
              <div className="max-w-7xl mx-auto px-8 py-8 grid grid-cols-12 gap-8 items-center">
                {/* Left 7 Columns: Categories Grid */}
                <div className="col-span-8 space-y-4">
                  <div className="flex items-center justify-between border-b border-[#B8964F]/20 pb-2">
                    <span className="text-[10px] font-serif uppercase tracking-[0.25em] text-[#B8964F]">
                      Atelier Utensil Folios
                    </span>
                    <Link
                      href="/shop"
                      onClick={() => setActiveMegaMenu(null)}
                      className="text-xs text-[#EFE4CF] hover:text-[#B8964F] font-serif flex items-center gap-1 group"
                    >
                      <span>View entire collection ({PRODUCTS.length} pieces)</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/shop?category=${cat.slug}`}
                        onClick={() => setActiveMegaMenu(null)}
                        className="p-3 rounded-xl hover:bg-[#0B1F1C]/70 border border-transparent hover:border-[#B8964F]/30 transition-all group flex items-start gap-3"
                      >
                        <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#B8964F]/40 shrink-0">
                          <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-serif text-sm text-[#FAF4E8] group-hover:text-[#B8964F] transition-colors font-medium">
                            {cat.name}
                          </p>
                          <p className="text-[11px] text-[#EFE4CF]/70 line-clamp-1 font-body">
                            {cat.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Right 4 Columns: Single Featured Product Card */}
                <div className="col-span-4 pl-6 border-l border-[#B8964F]/25">
                  <Link
                    href={`/product/${featuredShopProduct.slug}`}
                    onClick={() => setActiveMegaMenu(null)}
                    className="group block bg-[#0B1F1C] rounded-2xl border border-[#B8964F]/40 overflow-hidden shadow-xl"
                  >
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img
                        src={featuredShopProduct.images[0]}
                        alt={featuredShopProduct.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-2 left-2 bg-[#8C4E28] text-[#FAF4E8] text-[9px] font-serif uppercase tracking-widest px-2.5 py-0.5 rounded-full">
                        Atelier Signature
                      </span>
                    </div>
                    <div className="p-4 space-y-1 font-serif">
                      <h4 className="text-sm font-medium text-[#FAF4E8] group-hover:text-[#B8964F] transition-colors line-clamp-1">
                        {featuredShopProduct.title}
                      </h4>
                      <p className="text-[11px] text-[#B8964F]">
                        ₹{featuredShopProduct.basePrice.toLocaleString('en-IN')} • 2,400 Hand Hammer Strikes
                      </p>
                      <span className="text-[10px] text-[#EFE4CF]/60 flex items-center gap-1 pt-1">
                        Explore piece details →
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Desktop Mega-Menu for "Collections" */}
          {activeMegaMenu === 'collections' && (
            <div
              className="hidden lg:block absolute left-0 right-0 top-full bg-[#12302B] text-[#FAF4E8] border-b border-[#B8964F]/40 shadow-2xl z-50 animate-in fade-in duration-200"
              onMouseEnter={() => handleMouseEnter('collections')}
              onMouseLeave={handleMouseLeave}
            >
              <div className="max-w-7xl mx-auto px-8 py-8 grid grid-cols-12 gap-8 items-center">
                {/* Left 7 Columns: 6 Occasion Collections */}
                <div className="col-span-8 space-y-4">
                  <div className="flex items-center justify-between border-b border-[#B8964F]/20 pb-2">
                    <span className="text-[10px] font-serif uppercase tracking-[0.25em] text-[#B8964F]">
                      Occasion & Milestone Heirlooms
                    </span>
                    <Link
                      href="/collections"
                      onClick={() => setActiveMegaMenu(null)}
                      className="text-xs text-[#EFE4CF] hover:text-[#B8964F] font-serif flex items-center gap-1 group"
                    >
                      <span>Explore all 6 curated occasions</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {OCCASION_COLLECTIONS.map((occ) => (
                      <Link
                        key={occ.id}
                        href={`/collections/${occ.slug}`}
                        onClick={() => setActiveMegaMenu(null)}
                        className="p-3 rounded-xl hover:bg-[#0B1F1C]/70 border border-transparent hover:border-[#B8964F]/30 transition-all group flex items-start gap-3"
                      >
                        <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#B8964F]/40 shrink-0">
                          <img src={occ.image} alt={occ.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-serif text-sm text-[#FAF4E8] group-hover:text-[#B8964F] transition-colors font-medium">
                            {occ.name}
                          </p>
                          <p className="text-[11px] text-[#EFE4CF]/70 line-clamp-1 font-body">
                            {occ.tagline}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Right 4 Columns: Featured Occasion Showcase */}
                <div className="col-span-4 pl-6 border-l border-[#B8964F]/25">
                  <Link
                    href={`/collections/${featuredOccasion.slug}`}
                    onClick={() => setActiveMegaMenu(null)}
                    className="group block bg-[#0B1F1C] rounded-2xl border border-[#B8964F]/40 overflow-hidden shadow-xl"
                  >
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img
                        src={featuredOccasion.image}
                        alt={featuredOccasion.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-2 left-2 bg-[#8C4E28] text-[#FAF4E8] text-[9px] font-serif uppercase tracking-widest px-2.5 py-0.5 rounded-full">
                        Housewarming Curations
                      </span>
                    </div>
                    <div className="p-4 space-y-1 font-serif">
                      <h4 className="text-sm font-medium text-[#FAF4E8] group-hover:text-[#B8964F] transition-colors line-clamp-1">
                        {featuredOccasion.name}
                      </h4>
                      <p className="text-[11px] text-[#B8964F]">
                        {featuredOccasion.suggestedBlessing.split('—')[0]}
                      </p>
                      <span className="text-[10px] text-[#EFE4CF]/60 flex items-center gap-1 pt-1">
                        View ceremonial pieces →
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Mobile Slide-Out Drawer (Full height, large serif links, WhatsApp button, language toggle, avatar sign-in) */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#0B1F1C]/80 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="w-4/5 max-w-sm h-full bg-[#12302B] text-[#FAF4E8] border-r border-[#B8964F]/40 shadow-2xl flex flex-col justify-between p-6 overflow-y-auto font-body"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            {/* Top Bar inside Drawer: Search & Close */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#B8964F]/25">
                <span className="font-display text-lg tracking-[0.2em] text-[#FAF4E8] uppercase">
                  Tamrashilp
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="min-w-[44px] min-h-[44px] p-2 rounded-full text-[#B8964F] hover:text-[#FAF4E8] flex items-center justify-center"
                  aria-label="Close menu drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search Trigger at Top of Menu */}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSearchOpen(true);
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-[#0B1F1C] border border-[#B8964F]/40 text-xs text-[#EFE4CF]/70 font-serif flex items-center gap-2 text-left"
              >
                <Search className="w-4 h-4 text-[#B8964F]" />
                <span>Search vessels & lore...</span>
              </button>

              {/* Large Serif Links */}
              <nav className="space-y-1 font-serif text-base pt-2">
                <Link
                  href="/shop"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2.5 px-3 rounded-xl hover:bg-[#0B1F1C] text-[#FAF4E8] hover:text-[#B8964F] transition-colors"
                >
                  Shop the Collection
                </Link>
                <Link
                  href="/collections"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2.5 px-3 rounded-xl hover:bg-[#0B1F1C] text-[#FAF4E8] hover:text-[#B8964F] transition-colors"
                >
                  Occasion Collections
                </Link>
                <Link
                  href="/craft-process"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2.5 px-3 rounded-xl hover:bg-[#0B1F1C] text-[#FAF4E8] hover:text-[#B8964F] transition-colors"
                >
                  The Making: Six Steps
                </Link>
                <Link
                  href="/master-craftsman"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2.5 px-3 rounded-xl hover:bg-[#0B1F1C] text-[#FAF4E8] hover:text-[#B8964F] transition-colors"
                >
                  The Master Craftsman
                </Link>
                <Link
                  href="/custom-order"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2.5 px-3 rounded-xl hover:bg-[#0B1F1C] text-[#FAF4E8] hover:text-[#B8964F] transition-colors"
                >
                  Bespoke Engraving Studio
                </Link>
                <Link
                  href="/services/kalai"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2.5 px-3 rounded-xl hover:bg-[#0B1F1C] text-[#FAF4E8] hover:text-[#B8964F] transition-colors"
                >
                  Re-tinning (Kalai) Service
                </Link>
                <Link
                  href="/authenticity"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2.5 px-3 rounded-xl hover:bg-[#0B1F1C] text-[#FAF4E8] hover:text-[#B8964F] transition-colors text-xs text-[#B8964F]"
                >
                  Provenance Certificate QR
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2.5 px-3 rounded-xl hover:bg-[#0B1F1C] text-[#FAF4E8] hover:text-[#B8964F] transition-colors text-xs text-[#B8964F]"
                >
                  Contact Almora Atelier
                </Link>
              </nav>
            </div>

            {/* Bottom Section: WhatsApp, Language Toggle, and Avatar Sign-In */}
            <div className="pt-6 border-t border-[#B8964F]/25 space-y-4">
              {/* WhatsApp Support Button */}
              <a
                href={buildWhatsAppClickUrl(getPreFilledMessage({ type: 'general' }))}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-[#4E6E58] hover:bg-[#3D5645] text-[#FAF4E8] text-xs font-serif flex items-center justify-center gap-2 transition-colors shadow"
              >
                <MessageCircle className="w-4 h-4 text-[#FAF4E8]" />
                <span>Chat on WhatsApp</span>
              </a>

              {/* Language Switcher */}
              <div className="flex items-center justify-between p-2 rounded-xl bg-[#0B1F1C] border border-[#B8964F]/30 text-xs font-serif">
                <span className="text-[#B8964F] flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" />
                  Language
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setLanguage('en')}
                    className={`px-2 py-0.5 rounded ${
                      language === 'en' ? 'bg-[#8C4E28] text-[#FAF4E8] font-bold' : 'text-[#B8964F]'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setLanguage('hi')}
                    className={`px-2 py-0.5 rounded ${
                      language === 'hi' ? 'bg-[#8C4E28] text-[#FAF4E8] font-bold' : 'text-[#B8964F]'
                    }`}
                  >
                    हिन्दी
                  </button>
                </div>
              </div>

              {/* Avatar Sign-In / Account at Bottom */}
              <div className="pt-1">
                {user ? (
                  <Link
                    href="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0B1F1C] border border-[#B8964F]/30 hover:border-[#B8964F] transition-colors"
                  >
                    <AvatarIcon
                      styleName={user.avatarStyle || 'lota'}
                      initial={user.name ? user.name[0] : 'P'}
                      size="sm"
                      variant="dark"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-serif text-[#FAF4E8] font-medium truncate">{user.name}</p>
                      <p className="text-[10px] text-[#B8964F] truncate">{user.email}</p>
                    </div>
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-[#B8964F]/60 text-xs font-serif text-[#FAF4E8] hover:bg-[#0B1F1C] transition-colors"
                  >
                    <AvatarIcon styleName="monogram" size="sm" variant="dark" />
                    <span>Sign In to Patron Sanctuary</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Command-K Search Overlay */}
      <CommandKSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
