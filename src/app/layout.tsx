import type { Metadata, Viewport } from 'next';
import './globals.css';
import { LanguageProvider } from '@/lib/language-context';
import { AuthProvider } from '@/lib/auth-context';
import { CartProvider } from '@/lib/cart-context';
import { WishlistProvider } from '@/lib/wishlist-context';
import { CompareProvider } from '@/lib/compare-context';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { CompareModal } from '@/components/common/CompareModal';
import { WhatsAppButton } from '@/components/common/WhatsAppButton';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#12302B',
};

export const metadata: Metadata = {
  title: 'Tamrashilp | Handcrafted Copper Utensils of Almora, Uttarakhand',
  description:
    'Handcrafted Copper. Heritage in Every Hammer Mark. Authentic Ayurvedic water bottles, hammered kadhais, jugs, and sacred pooja utensils handcrafted by generational Kumaoni coppersmiths.',
  keywords: [
    'copper utensils',
    'handcrafted copper bottle',
    'Almora copper',
    'Tamta coppersmith',
    'Tamrashilp',
    'Ayurvedic water jug',
    'copper kadhai kalai',
    'pure copper utensils India',
    'Uttarakhand handicrafts',
    'pooja thali copper',
  ],
  authors: [{ name: 'Tamrashilp Artisan Guild' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://tamrashilp.in'),
  openGraph: {
    title: 'Tamrashilp | Handcrafted Copper. Heritage in Every Hammer Mark.',
    description:
      'Buy genuine 99.2% lab-certified pure copper water bottles, heavy kadhais, and prayer vessels made by Uttarakhand master artisans.',
    url: 'https://tamrashilp.in',
    siteName: 'Tamrashilp',
    images: [
      {
        url: 'https://tamrashilp.in/images/tamta/product-03.jpg',
        width: 1200,
        height: 630,
        alt: 'Tamrashilp Handcrafted Copper Utensils',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'OnlineStore',
    name: 'Tamrashilp',
    description: 'Heritage handcrafted copper utensils made by Almora coppersmith artisans of Uttarakhand',
    url: 'https://tamrashilp.in',
    logo: 'https://tamtashilp.in/images/artisan-chasing-copper.jpg',
    priceRange: '₹1299 - ₹4899',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, Credit Card, UPI, NetBanking',
    telephone: '+919557057767',
    email: 'tamrashilpstore@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Tamta Mohalla',
      addressLocality: 'Almora',
      addressRegion: 'Uttarakhand',
      postalCode: '263601',
      addressCountry: 'IN',
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-cream-50 text-umber-950 selection:bg-copper-200 selection:text-umber-900">
        <LanguageProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <CompareProvider>
                  <Navbar />
                  <CartDrawer />
                  <CompareModal />
                  <WhatsAppButton />
                  <main className="flex-1">{children}</main>
                  <Footer />
                </CompareProvider>
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

