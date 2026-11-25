'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/lib/language-context';
import { PRODUCTS } from '@/lib/mockData';
import {
  buildWhatsAppClickUrl,
  getPreFilledMessage,
  WhatsAppMessageContext,
} from '@/lib/whatsapp/config';

export const WhatsAppButton: React.FC = () => {
  const pathname = usePathname();
  const { language } = useLanguage();
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, [pathname]);

  // Hide on checkout payment step to prevent distraction during transaction
  if (pathname === '/checkout') {
    return null;
  }

  // Determine page context and construct pre-filled message
  let context: WhatsAppMessageContext = { type: 'home' };

  if (pathname.startsWith('/product/')) {
    const slug = pathname.replace('/product/', '').split('?')[0];
    const product = PRODUCTS.find((p) => p.slug === slug);
    context = {
      type: 'product',
      productName: product?.title || 'Handcrafted Copper Vessel',
      sku: product?.id ? `TS-${product.id.toUpperCase()}` : slug,
      pageUrl: currentUrl || `https://tamrashilp.in/product/${slug}`,
    };
  } else if (pathname.startsWith('/order/')) {
    const orderId = pathname.replace('/order/', '').split('/')[0];
    context = {
      type: 'order',
      orderId: orderId || 'Recent Order',
    };
  } else if (pathname === '/cart') {
    context = { type: 'cart' };
  } else if (pathname === '/custom-order') {
    context = {
      type: 'custom',
      customDetails: 'bespoke hand-engraved copper commission',
    };
  } else if (pathname === '/care') {
    context = { type: 'care' };
  } else {
    context = { type: 'home' };
  }

  const messageText = getPreFilledMessage(context);
  const waUrl = buildWhatsAppClickUrl(messageText);

  const handleClick = () => {
    // Dispatch anonymous analytics event without any personal data
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('tamtashilp:analytics', {
          detail: {
            event: 'whatsapp_click',
            page: pathname,
            contextType: context.type,
            timestamp: new Date().toISOString(),
          },
        })
      );
    }
  };

  const labelText = language === 'hi' ? 'शिल्पी से चैट करें' : 'Chat with us';

  return (
    <aside
      aria-label="WhatsApp Support"
      className="fixed z-40 right-4 sm:right-6 bottom-20 sm:bottom-6 transition-all duration-300 font-sans print:hidden"
    >
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        aria-label="Chat with Tamrashilp on WhatsApp"
        className="group flex items-center justify-center min-w-[48px] min-h-[48px] p-2.5 rounded-full bg-patina-900/95 hover:bg-patina-950 border border-brass-500/60 hover:border-brass-400 text-ivory shadow-xl shadow-patina-950/40 focus:outline-none focus:ring-2 focus:ring-brass-400/80 focus:ring-offset-2 focus:ring-offset-patina-950 transition-all duration-300"
      >
        {/* Refined Line WhatsApp Icon */}
        <svg
          className="w-6 h-6 text-brass-300 group-hover:text-copper-300 transition-colors shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {/* Chat speech bubble */}
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          {/* Inner handset curves */}
          <path d="M9.5 9.5c.3-.3.8-.3 1.1 0l1 1c.3.3.3.8 0 1.1l-.6.6c.4.8 1.1 1.5 1.9 1.9l.6-.6c.3-.3.8-.3 1.1 0l1 1c.3.3.3.8 0 1.1l-.8.8c-.8.8-2.1.8-3.4-.5-1.5-1.5-2-3-1.2-3.8l.3-.6z" />
        </svg>

        {/* Elegant expanding label on hover and focus */}
        <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-xs group-hover:opacity-100 group-focus:max-w-xs group-focus:opacity-100 group-hover:ml-2.5 group-focus:ml-2.5 transition-all duration-300 ease-out text-xs font-serif tracking-wider text-parchment-200 whitespace-nowrap pr-1 select-none">
          {labelText}
        </span>
      </a>
    </aside>
  );
};
