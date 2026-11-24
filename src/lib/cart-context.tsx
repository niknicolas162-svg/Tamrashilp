'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, Coupon, FinishType } from '@/types';
import { COUPONS } from './mockData';

interface CartContextType {
  cart: CartItem[];
  addToCart: (
    product: Product,
    quantity?: number,
    finish?: FinishType,
    capacity?: string,
    variantId?: string,
    price?: number,
    customEngraving?: { text: string; cost: number; script?: string }
  ) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  isGiftWrap: boolean;
  setIsGiftWrap: (val: boolean) => void;
  giftMessage: string;
  setGiftMessage: (msg: string) => void;
  subtotal: number;
  discount: number;
  shippingFee: number;
  giftWrapFee: number;
  total: number;
  totalItemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [isGiftWrap, setIsGiftWrap] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('tamtashilp_cart');
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch {
        setCart([]);
      }
    }
  }, []);

  const saveCart = (items: CartItem[]) => {
    setCart(items);
    localStorage.setItem('tamtashilp_cart', JSON.stringify(items));
  };

  const addToCart = (
    product: Product,
    quantity: number = 1,
    finish?: FinishType,
    capacity?: string,
    variantId?: string,
    customPrice?: number,
    customEngraving?: { text: string; cost: number; script?: string }
  ) => {
    const unitPrice = customPrice ?? product.basePrice;
    const selectedFinish = finish || product.finish;
    const selectedCapacity = capacity || product.capacity;

    const existingIndex = cart.findIndex(
      (item) =>
        item.productId === product.id &&
        item.variantId === variantId &&
        (!item.customEngraving || item.customEngraving.text === customEngraving?.text)
    );

    let updatedCart: CartItem[];
    if (existingIndex > -1 && !customEngraving) {
      updatedCart = [...cart];
      updatedCart[existingIndex].quantity += quantity;
    } else {
      updatedCart = [
        ...cart,
        {
          productId: product.id,
          variantId,
          product,
          quantity,
          selectedFinish,
          selectedCapacity,
          unitPrice,
          customEngraving,
        },
      ];
    }

    saveCart(updatedCart);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, variantId?: string) => {
    const updated = cart.filter(
      (item) => !(item.productId === productId && item.variantId === variantId)
    );
    saveCart(updated);
  };

  const updateQuantity = (productId: string, quantity: number, variantId?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }
    const updated = cart.map((item) => {
      if (item.productId === productId && item.variantId === variantId) {
        return { ...item, quantity };
      }
      return item;
    });
    saveCart(updated);
  };

  const clearCart = () => {
    saveCart([]);
    setAppliedCoupon(null);
    setIsGiftWrap(false);
    setGiftMessage('');
  };

  const applyCoupon = (code: string) => {
    const found = COUPONS.find((c) => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!found) {
      return { success: false, message: 'Invalid heritage voucher code.' };
    }
    if (subtotal < found.minOrderValue) {
      return {
        success: false,
        message: `This coupon requires a minimum cart value of ₹${found.minOrderValue}.`,
      };
    }
    setAppliedCoupon(found);
    return { success: true, message: `Applied: ${found.description}` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity + (item.customEngraving?.cost || 0),
    0
  );
  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Free shipping above ₹1,999, else ₹150
  const shippingFee = subtotal >= 1999 || subtotal === 0 ? 0 : 150;
  const giftWrapFee = isGiftWrap ? 99 : 0;

  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'PERCENTAGE') {
      discount = Math.round((subtotal * appliedCoupon.discountValue) / 100);
    } else {
      discount = appliedCoupon.discountValue;
    }
  }

  const total = Math.max(0, subtotal - discount + shippingFee + giftWrapFee);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
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
        totalItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

