'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Gift,
  ArrowRight,
  CheckCircle,
  MapPin,
  Lock,
  Tag,
  Sparkles,
} from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { useAuth } from '@/lib/auth-context';
import { useLanguage } from '@/lib/language-context';
import { PINCODES } from '@/lib/mockData';

export default function CheckoutPage() {
  const router = useRouter();
  const {
    cart,
    subtotal,
    discount,
    shippingFee,
    giftWrapFee,
    total,
    isGiftWrap,
    giftMessage,
    appliedCoupon,
    clearCart,
  } = useCart();
  const { user } = useAuth();
  const { language, t } = useLanguage();

  const [isGuest, setIsGuest] = useState(!user);
  const [guestEmail, setGuestEmail] = useState(user?.email || '');
  const [guestPhone, setGuestPhone] = useState(user?.phone || '');
  const [recipientName, setRecipientName] = useState(user?.name || '');
  const [addressLine1, setAddressLine1] = useState('Flat 402, Kumaon Enclave');
  const [addressLine2, setAddressLine2] = useState('Near Mall Road');
  const [city, setCity] = useState('Almora');
  const [state, setState] = useState('Uttarakhand');
  const [pincode, setPincode] = useState('263601');
  const [paymentMethod, setPaymentMethod] = useState<'RAZORPAY' | 'COD'>('RAZORPAY');
  const [whatsappOptIn, setWhatsappOptIn] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Check pincode for COD
  const codServiceable = PINCODES[pincode] ? PINCODES[pincode].cod : true;

  if (cart.length === 0) {
    return (
      <div className="bg-[#EFE4CF] min-h-screen py-24 text-[#2A1A12]">
        <div className="max-w-xl mx-auto px-4 text-center space-y-6 museum-plaque bg-[#FAF4E8] p-10">
          <div className="wax-seal w-12 h-12 rounded-full flex items-center justify-center mx-auto text-xs font-serif font-bold">
            TM
          </div>
          <h2 className="font-serif text-3xl font-normal text-[#12302B]">
            Your Atelier Folio is Empty
          </h2>
          <p className="text-xs sm:text-sm text-[#5C3E2C] font-light leading-relaxed">
            Select a handcrafted vessel shaped by the master coppersmiths of Almora before proceeding to acquisition.
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="btn-atelier inline-block px-8 py-3 text-xs tracking-widest uppercase"
            >
              Explore the Collection
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const generatedOrderNumber = `TS-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder = {
      id: generatedOrderNumber,
      orderNumber: generatedOrderNumber,
      createdAt: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      status: 'CONFIRMED',
      items: cart.map((item) => ({
        productId: item.productId,
        title: item.product.title,
        variantName: item.selectedCapacity || item.product.capacity,
        price: item.unitPrice,
        quantity: item.quantity,
        finish: item.selectedFinish || item.product.finish,
        image: item.product.images[0],
        artisanName: item.product.artisan.name,
      })),
      subtotal,
      discount,
      shippingFee,
      giftWrapFee,
      isGift: isGiftWrap,
      giftMessage: giftMessage || undefined,
      totalAmount: total,
      paymentMethod,
      paymentStatus: paymentMethod === 'RAZORPAY' ? 'PAID' : 'PENDING',
      paymentId: paymentMethod === 'RAZORPAY' ? `pay_rzp_${Date.now()}` : undefined,
      shippingAddress: {
        id: 'addr-temp',
        name: recipientName,
        phone: guestPhone,
        addressLine1,
        addressLine2,
        city,
        state,
        pincode,
        type: 'HOME' as const,
      },
      carrier: 'Shiprocket (BlueDart Express)',
      trackingNumber: `BD${Math.floor(100000000 + Math.random() * 900000000)}IN`,
      trackingTimeline: [
        {
          status: 'PLACED' as const,
          timestamp: 'Just Now',
          description: 'Order registered in guild archives and numbered certificate generated.',
          location: 'Tamrashilp Digital Desk, Almora',
          completed: true,
        },
        {
          status: 'CONFIRMED' as const,
          timestamp: 'Within 10 mins',
          description: 'Artisan workshop assigned & raw ingot purity verified.',
          location: 'Almora Artisan Collective, UK',
          completed: true,
        },
        {
          status: 'PACKED' as const,
          timestamp: 'Expected within 24 hours',
          description: 'Hand-buffed with tamarind, secured in sealed craft carton.',
          location: 'Tamta Mohalla Dispatch',
          completed: false,
        },
        {
          status: 'SHIPPED' as const,
          timestamp: 'Pending Dispatch',
          description: 'Handed to BlueDart Express for transit.',
          location: 'Kathgodam Hub, UK',
          completed: false,
        },
        {
          status: 'DELIVERED' as const,
          timestamp: 'Expected in 3-4 days',
          description: 'Safely delivered to your hearth.',
          location: `${city}, ${state}`,
          completed: false,
        },
      ],
    };

    // Store in localStorage for instant tracking
    try {
      const existingOrders = JSON.parse(localStorage.getItem('tamtashilp_orders') || '[]');
      localStorage.setItem('tamtashilp_orders', JSON.stringify([newOrder, ...existingOrders]));
    } catch {
      localStorage.setItem('tamtashilp_orders', JSON.stringify([newOrder]));
    }

    // Persist to backend and dispatch WhatsApp confirmation alert if opted in
    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        guestEmail,
        guestPhone,
        shippingAddress: {
          name: recipientName,
          phone: guestPhone,
          addressLine1,
          addressLine2,
          city,
          state,
          pincode,
        },
        subtotal,
        shippingFee,
        discount,
        giftWrapFee,
        isGift: isGiftWrap,
        giftMessage,
        totalAmount: total,
        paymentMethod,
        whatsappOptIn,
      }),
    }).catch((err) => console.error('Failed to create order record:', err));

    // Trigger celebration confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#B26A3C', '#B8964F', '#12302B', '#EFE4CF'],
    });

    setTimeout(() => {
      clearCart();
      setIsProcessing(false);
      router.push(`/order/${generatedOrderNumber}`);
    }, 1200);
  };

  return (
    <div className="bg-[#EFE4CF] min-h-screen text-[#2A1A12] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Archival Header */}
        <div className="border-b border-[#B8964F]/30 pb-6 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-[#B8964F] uppercase tracking-[0.25em] font-sans">
              Provenance & Acquisition Folio
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#12302B]">
            {language === 'hi' ? 'अधिग्रहण एवं भुगतान' : 'Acquire Handcrafted Vessels'}
          </h1>
          <p className="text-xs sm:text-sm text-[#5C3E2C] font-light">
            Encrypted 256-bit archival registry • Direct fair compensation to Kumaoni metalsmith families
          </p>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Form Details */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Contact Information */}
            <div className="museum-plaque bg-[#FAF4E8] p-6 sm:p-8 space-y-5">
              <div className="flex items-center justify-between border-b border-[#B8964F]/25 pb-3">
                <h3 className="font-serif text-lg font-normal text-[#12302B] flex items-center gap-2">
                  <span className="text-xs text-[#B8964F] font-sans">I.</span>
                  <span>Patron Information</span>
                </h3>
                {user && (
                  <span className="text-[10px] text-[#8C4E28] uppercase tracking-wider font-sans">
                    Enrolled as {user.name}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-sans tracking-wider uppercase text-[#4A3223]">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    placeholder="patron@domain.com"
                    className="w-full bg-[#EFE4CF]/60 border border-[#B8964F]/40 p-3 text-xs text-[#2A1A12] focus:outline-none focus:border-[#B26A3C]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-sans tracking-wider uppercase text-[#4A3223]">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#EFE4CF]/60 border border-[#B8964F]/40 p-3 text-xs text-[#2A1A12] focus:outline-none focus:border-[#B26A3C]"
                  />
                </div>
              </div>

              {/* WhatsApp Order Updates Consent Checkbox (Unchecked by default) */}
              <div className="pt-2 border-t border-[#B8964F]/20 flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="whatsapp-updates-optin"
                  checked={whatsappOptIn}
                  onChange={(e) => setWhatsappOptIn(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-[#B8964F]/60 text-[#8C4E28] focus:ring-[#8C4E28] bg-[#FAF4E8]"
                />
                <label
                  htmlFor="whatsapp-updates-optin"
                  className="text-xs text-[#2A1A12]/85 cursor-pointer leading-relaxed select-none"
                >
                  <span className="font-semibold text-[#12302B] block">
                    Send me order updates on WhatsApp
                  </span>
                  <span className="text-[11px] text-[#2A1A12]/65 block mt-0.5">
                    Receive dispatch alerts, AWB courier tracking, and delivery notifications. Reply STOP anytime to opt out.
                  </span>
                </label>
              </div>
            </div>

            {/* 2. Delivery Address */}
            <div className="museum-plaque bg-[#FAF4E8] p-6 sm:p-8 space-y-5">
              <div className="flex items-center justify-between border-b border-[#B8964F]/25 pb-3">
                <h3 className="font-serif text-lg font-normal text-[#12302B] flex items-center gap-2">
                  <span className="text-xs text-[#B8964F] font-sans">II.</span>
                  <span>Destination & Hearth</span>
                </h3>
                <MapPin className="w-4 h-4 text-[#B8964F]" />
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-sans tracking-wider uppercase text-[#4A3223]">
                    Recipient Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="e.g. Aaditya Rawat"
                    className="w-full bg-[#EFE4CF]/60 border border-[#B8964F]/40 p-3 text-xs text-[#2A1A12] focus:outline-none focus:border-[#B26A3C]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-sans tracking-wider uppercase text-[#4A3223]">
                    Premises / Street Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={addressLine1}
                    onChange={(e) => setAddressLine1(e.target.value)}
                    placeholder="e.g. 402, Himalayan Heights, Lal Bazaar"
                    className="w-full bg-[#EFE4CF]/60 border border-[#B8964F]/40 p-3 text-xs text-[#2A1A12] focus:outline-none focus:border-[#B26A3C]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-sans tracking-wider uppercase text-[#4A3223]">City *</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-[#EFE4CF]/60 border border-[#B8964F]/40 p-3 text-xs text-[#2A1A12] focus:outline-none focus:border-[#B26A3C]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-sans tracking-wider uppercase text-[#4A3223]">State *</label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full bg-[#EFE4CF]/60 border border-[#B8964F]/40 p-3 text-xs text-[#2A1A12] focus:outline-none focus:border-[#B26A3C]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-sans tracking-wider uppercase text-[#4A3223]">
                      6-Digit Pincode *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full bg-[#EFE4CF]/60 border border-[#B8964F]/40 p-3 text-xs text-[#2A1A12] focus:outline-none focus:border-[#B26A3C]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Payment Method */}
            <div className="museum-plaque bg-[#FAF4E8] p-6 sm:p-8 space-y-5">
              <div className="flex items-center justify-between border-b border-[#B8964F]/25 pb-3">
                <h3 className="font-serif text-lg font-normal text-[#12302B] flex items-center gap-2">
                  <span className="text-xs text-[#B8964F] font-sans">III.</span>
                  <span>Method of Remittance</span>
                </h3>
                <CreditCard className="w-4 h-4 text-[#B8964F]" />
              </div>

              <div className="space-y-3">
                {/* Razorpay Online */}
                <label
                  className={`p-4 border flex items-start gap-3.5 cursor-pointer transition-all ${
                    paymentMethod === 'RAZORPAY'
                      ? 'border-[#B26A3C] bg-[#FAF3E8] ring-1 ring-[#B26A3C]'
                      : 'border-[#B8964F]/40 bg-[#FAF4E8] hover:bg-[#FAF3E8]'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'RAZORPAY'}
                    onChange={() => setPaymentMethod('RAZORPAY')}
                    className="mt-1 accent-[#B26A3C]"
                  />
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-sm font-medium text-[#12302B]">
                        Razorpay Secure (UPI, GPay, Cards & NetBanking)
                      </span>
                      <span className="text-[10px] text-[#4E6E58] font-sans uppercase tracking-wider bg-[#E8EFEA] px-2 py-0.5 border border-[#4E6E58]/30">
                        Recommended
                      </span>
                    </div>
                    <p className="text-xs text-[#5C3E2C] font-light leading-relaxed">
                      Instant verification. Bank-grade 256-bit encrypted gateway.
                    </p>
                  </div>
                </label>

                {/* Cash on Delivery (COD) */}
                <label
                  className={`p-4 border flex items-start gap-3.5 cursor-pointer transition-all ${
                    paymentMethod === 'COD'
                      ? 'border-[#B26A3C] bg-[#FAF3E8] ring-1 ring-[#B26A3C]'
                      : 'border-[#B8964F]/40 bg-[#FAF4E8] hover:bg-[#FAF3E8]'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'COD'}
                    onChange={() => setPaymentMethod('COD')}
                    disabled={!codServiceable}
                    className="mt-1 accent-[#B26A3C]"
                  />
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-sm font-medium text-[#12302B]">
                        Remit on Delivery (Doorstep Cash / QR)
                      </span>
                      <span
                        className={`text-[10px] font-sans uppercase tracking-wider px-2 py-0.5 border ${
                          codServiceable
                            ? 'text-[#8C4E28] bg-[#FAF3E8] border-[#8C4E28]/30'
                            : 'text-red-700 bg-red-50 border-red-200'
                        }`}
                      >
                        {codServiceable ? 'Pincode Verified' : 'Pincode Excluded'}
                      </span>
                    </div>
                    <p className="text-xs text-[#5C3E2C] font-light leading-relaxed">
                      Inspect the Almora sealed carton before rendering payment to the delivery courier.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Atelier Folio Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="museum-plaque bg-[#FAF4E8] p-6 sm:p-8 space-y-6 sticky top-24">
              <div className="border-b border-[#B8964F]/30 pb-3 flex items-center justify-between">
                <h3 className="font-serif text-xl font-normal text-[#12302B]">
                  Atelier Folio ({cart.length} {cart.length === 1 ? 'Piece' : 'Pieces'})
                </h3>
                <span className="text-[10px] text-[#B8964F] uppercase tracking-wider font-sans">
                  Certified Pure Cu
                </span>
              </div>

              {/* Vessels List */}
              <div className="divide-y divide-[#B8964F]/20 max-h-64 overflow-y-auto space-y-3 pr-1">
                {cart.map((item) => (
                  <div key={item.productId} className="pt-3 first:pt-0 flex gap-3.5 items-center">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.title}
                      className="w-14 h-14 object-cover border border-[#B8964F]/40"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-serif text-xs font-medium text-[#12302B] truncate">
                        {item.product.title}
                      </p>
                      <p className="text-[11px] text-[#5C3E2C] font-sans">
                        Qty: {item.quantity} • {item.selectedFinish}
                      </p>
                      <p className="text-[10px] text-[#8C4E28] font-sans">
                        Forged by {item.product.artisan.name}
                      </p>
                    </div>
                    <span className="font-serif text-xs font-semibold text-[#12302B]">
                      ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Calculations */}
              <div className="border-t border-[#B8964F]/30 pt-4 space-y-2.5 text-xs text-[#4A3223]">
                <div className="flex justify-between font-sans">
                  <span>Subtotal Value</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-[#4E6E58] font-medium font-sans">
                    <span>Privilege Folio ({appliedCoupon?.code})</span>
                    <span>-₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                {isGiftWrap && (
                  <div className="flex justify-between font-sans text-[#8C4E28]">
                    <span>Handmade Calligraphy & Seal</span>
                    <span>+₹99</span>
                  </div>
                )}

                <div className="flex justify-between font-sans">
                  <span>Safe Courier (BlueDart Air)</span>
                  <span>
                    {shippingFee === 0 ? (
                      <strong className="text-[#4E6E58] uppercase tracking-wider text-[11px]">
                        Complimentary
                      </strong>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between pt-3 border-t border-[#B8964F]/40 font-serif text-lg text-[#12302B]">
                  <span>Total Remittance</span>
                  <span className="text-[#B26A3C] font-normal">₹{total.toLocaleString('en-IN')}</span>
                </div>
                <p className="text-[10px] text-[#8C4E28] font-sans text-right">
                  Includes 12% GST (6% CGST + 6% SGST)
                </p>
              </div>

              {/* Place Order CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="btn-atelier w-full py-4 text-xs tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Registering Guild Order...</span>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5 text-[#F7F0E1]" />
                    <span>Authorize Acquisition (₹{total.toLocaleString('en-IN')})</span>
                  </>
                )}
              </button>

              <div className="pt-2 text-center text-[10px] text-[#6B4B35] font-sans space-y-1">
                <p className="flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#B8964F]" />
                  15-Day Safe Exchange • Traceable Numbered Certificate
                </p>
                <p>Preserving the 500-Year-Old Tamta Coppersmith Guild of Almora</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
