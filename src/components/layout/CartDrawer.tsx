'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, Trash2, Gift, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { useLanguage } from '@/lib/language-context';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    isGiftWrap,
    setIsGiftWrap,
    giftMessage,
    setGiftMessage,
    subtotal,
    discount,
    shippingFee,
    giftWrapFee,
    total,
  } = useCart();

  const { t, language } = useLanguage();
  const [couponCode, setCouponCode] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode);
    setCouponFeedback(res);
    if (res.success) {
      setCouponCode('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-body">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-patina-950/80 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-full sm:max-w-md bg-parchment-200 border-l border-brass-600/40 shadow-2xl flex flex-col text-walnut-900">
          {/* Header */}
          <div className="p-5 bg-parchment-300 border-b border-brass-600/30 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <span className="w-2 h-2 rounded-full bg-copper-600"></span>
              <h2 className="font-serif text-lg font-bold tracking-wide text-walnut-950">
                {t('cartTitle')}
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 rounded-full text-walnut-800 hover:text-copper-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-12 h-12 rounded-full wax-seal mx-auto flex items-center justify-center text-ivory">
                  ✦
                </div>
                <p className="font-serif text-base text-walnut-950">{t('cartEmpty')}</p>
                <p className="text-xs text-walnut-800/80 max-w-xs mx-auto">
                  Explore our permanent collection of hand-raised water carafes, kadhais, and prayer vessels.
                </p>
                <Link
                  href="/shop"
                  onClick={() => setIsCartOpen(false)}
                  className="inline-block mt-3 px-6 py-2 rounded-lg btn-atelier text-xs"
                >
                  {t('cartContinueShopping')}
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-brass-600/20">
                {cart.map((item) => (
                  <div key={`${item.productId}-${item.variantId || 'base'}`} className="py-3.5 flex gap-3.5">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.title}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-brass-600/30 shadow-xs"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-xs sm:text-sm font-bold text-walnut-950 truncate">
                        {language === 'hi' ? item.product.titleHi : item.product.title}
                      </h4>
                      <p className="text-[11px] text-brass-700 mt-0.5">
                        {item.selectedFinish} • {item.selectedCapacity || item.product.capacity}
                      </p>
                      <p className="text-[10px] text-walnut-700 italic">Handcrafted in Almora, Uttarakhand</p>
                      {item.customEngraving && (
                        <div className="mt-1 px-2 py-0.5 rounded bg-parchment-200 border border-[#B8964F]/30 text-[10px] font-serif text-[#8C4E28]">
                          ✦ Chiseled: &ldquo;{item.customEngraving.text}&rdquo; (+₹{item.customEngraving.cost})
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity */}
                        <div className="flex items-center border border-brass-600/40 rounded bg-parchment-100 text-xs font-sans">
                          <button
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity - 1, item.variantId)
                            }
                            className="w-8 h-8 flex items-center justify-center text-walnut-900 hover:bg-parchment-300 active:bg-parchment-400 touch-manipulation"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="px-2.5 font-bold min-w-[20px] text-center">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity + 1, item.variantId)
                            }
                            className="w-8 h-8 flex items-center justify-center text-walnut-900 hover:bg-parchment-300 active:bg-parchment-400 touch-manipulation"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-serif font-bold text-copper-700">
                            ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.productId, item.variantId)}
                            className="block ml-auto text-[10px] text-red-700 hover:underline mt-0.5"
                          >
                            <Trash2 className="w-3 h-3 inline" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Gift Presentation Packaging */}
            {cart.length > 0 && (
              <div className="bg-parchment-100 border border-brass-600/35 rounded-xl p-3.5 space-y-2 mt-4">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isGiftWrap}
                    onChange={(e) => setIsGiftWrap(e.target.checked)}
                    className="mt-0.5 text-copper-600 focus:ring-copper-500 rounded"
                  />
                  <div>
                    <span className="text-xs font-serif font-bold text-walnut-950 flex items-center gap-1.5">
                      <Gift className="w-3.5 h-3.5 text-copper-600" />
                      {t('giftWrapOption')}
                    </span>
                    <p className="text-[11px] text-walnut-700 mt-0.5 leading-snug">
                      {t('giftWrapSubtitle')}
                    </p>
                  </div>
                </label>

                {isGiftWrap && (
                  <textarea
                    rows={2}
                    value={giftMessage}
                    onChange={(e) => setGiftMessage(e.target.value)}
                    placeholder={t('giftMessagePlaceholder')}
                    className="w-full text-xs p-2 rounded-lg bg-parchment-50 border border-brass-600/40 text-walnut-900 focus:outline-none focus:border-copper-600 font-body"
                  />
                )}
              </div>
            )}

            {/* Privilege Voucher Code */}
            {cart.length > 0 && (
              <div className="pt-2">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-patina-800 text-ivory p-2.5 rounded-lg text-xs font-serif border border-brass-600/40">
                    <div className="flex items-center space-x-1.5 text-brass-300">
                      <Tag className="w-3.5 h-3.5" />
                      <span>{appliedCoupon.code}</span>
                      <span className="text-[11px] text-brass-400">(-₹{discount})</span>
                    </div>
                    <button onClick={removeCoupon} className="text-red-300 font-bold hover:underline">
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="space-y-1">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="VOUCHER (e.g. HERITAGE10)"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        className="flex-1 bg-parchment-50 border border-brass-600/40 rounded-lg px-3 py-1.5 text-xs text-walnut-900 uppercase font-sans tracking-wider focus:outline-none focus:border-copper-600"
                      />
                      <button
                        type="submit"
                        className="px-4 py-1.5 btn-atelier text-xs rounded-lg"
                      >
                        {t('applyCoupon')}
                      </button>
                    </div>
                    {couponFeedback && (
                      <p
                        className={`text-[11px] ${couponFeedback.success ? 'text-patina-800 font-bold' : 'text-red-700'
                          }`}
                      >
                        {couponFeedback.message}
                      </p>
                    )}
                  </form>
                )}
              </div>
            )}
          </div>

          {/* Footer & Acquisition Button */}
          {cart.length > 0 && (
            <div className="p-5 bg-parchment-300 border-t border-brass-600/30 space-y-3 font-serif">
              <div className="space-y-1 text-xs text-walnut-900">
                <div className="flex justify-between">
                  <span className="text-walnut-700">{t('subtotal')}</span>
                  <span className="font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-copper-700 font-bold">
                    <span>Privilege Concession</span>
                    <span>-₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                {isGiftWrap && (
                  <div className="flex justify-between text-walnut-700">
                    <span>Heirloom Packaging</span>
                    <span>+₹99</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-walnut-700">{t('shipping')}</span>
                  <span>{shippingFee === 0 ? <strong className="text-copper-700 font-bold">COMPLIMENTARY</strong> : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-brass-600/30 text-sm font-bold text-walnut-950">
                  <span>Total (Incl. 12% GST)</span>
                  <span className="text-copper-700 text-base">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full py-3 px-4 rounded-xl btn-atelier flex items-center justify-center space-x-2 shadow-lg"
              >
                <span>{t('proceedToCheckout')}</span>
                <ArrowRight className="w-4 h-4 text-brass-300" />
              </Link>

              <p className="text-center text-[10px] text-walnut-700 flex items-center justify-center gap-1 font-body">
                <ShieldCheck className="w-3.5 h-3.5 text-brass-600" />
                White-glove insured delivery • Direct artisan support
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
