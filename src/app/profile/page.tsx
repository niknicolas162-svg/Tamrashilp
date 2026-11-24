'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  User,
  Package,
  MapPin,
  Heart,
  Globe,
  CheckCircle,
  ExternalLink,
  Plus,
  Trash2,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { useLanguage } from '@/lib/language-context';
import { Order } from '@/types';
import { AvatarIcon, AVATAR_OPTIONS, AvatarStyle } from '@/components/common/AvatarIcon';

export default function ProfilePage() {
  const { user, updateUser, role, switchRole, setAvatarStyle } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  const [name, setName] = useState(user?.name || 'Aaditya Rawat');
  const [email, setEmail] = useState(user?.email || 'aaditya@example.com');
  const [phone, setPhone] = useState(user?.phone || '+91 98765 43210');
  const [whatsappOptIn, setWhatsappOptIn] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [waSaveSuccess, setWaSaveSuccess] = useState(false);

  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState([
    {
      id: 'addr-1',
      type: 'HOME',
      name: 'Aaditya Rawat',
      phone: '+91 98765 43210',
      addressLine1: 'Flat 402, Kumaon Enclave',
      addressLine2: 'Near Mall Road',
      city: 'Almora',
      state: 'Uttarakhand',
      pincode: '263601',
      isDefault: true,
    },
    {
      id: 'addr-2',
      type: 'WORK',
      name: 'Aaditya Rawat (Office)',
      phone: '+91 98765 43210',
      addressLine1: 'Tower B, Tech Park, Sector 48',
      addressLine2: 'Sohna Road',
      city: 'Gurugram',
      state: 'Haryana',
      pincode: '122001',
      isDefault: false,
    },
  ]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('tamtashilp_orders') || '[]');
      setOrders(stored);
    } catch {
      setOrders([]);
    }
  }, []);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name, email, phone });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-copper-200 gap-4">
        <div className="flex items-center space-x-4">
          <AvatarIcon
            styleName={user?.avatarStyle || 'lota'}
            initial={user?.name ? user.name[0] : 'P'}
            variant="light"
            size="xl"
            className="border-2 border-[#B8964F]"
          />
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-umber-950">
              {user?.name || 'Patron Account'}
            </h1>
            <p className="text-xs text-copper-700">{user?.email || 'patron@tamrashilp.in'}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-block text-[10px] font-bold uppercase bg-copper-100 text-copper-800 px-2.5 py-0.5 rounded-full">
                {role} Account
              </span>
              <span className="text-[10px] text-[#2A1A12]/60 font-serif">
                Emblem: {AVATAR_OPTIONS.find(o => o.id === (user?.avatarStyle || 'lota'))?.label}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Role preview buttons */}
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-copper-700 font-medium">Switch View:</span>
          <button
            onClick={() => switchRole('CUSTOMER')}
            className={`px-3 py-1.5 rounded-lg font-bold ${
              role === 'CUSTOMER' ? 'bg-copper-700 text-white' : 'bg-cream-100 text-copper-800'
            }`}
          >
            Patron
          </button>
          <button
            onClick={() => switchRole('SELLER')}
            className={`px-3 py-1.5 rounded-lg font-bold ${
              role === 'SELLER' ? 'bg-copper-700 text-white' : 'bg-cream-100 text-copper-800'
            }`}
          >
            Artisan
          </button>
          <button
            onClick={() => switchRole('ADMIN')}
            className={`px-3 py-1.5 rounded-lg font-bold ${
              role === 'ADMIN' ? 'bg-copper-700 text-white' : 'bg-cream-100 text-copper-800'
            }`}
          >
            Admin
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Personal info & Addresses */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-copper-200/90 shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold text-umber-950">Personal Details</h3>
            <form onSubmit={handleProfileSave} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-umber-950">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-cream-50 border border-copper-300 rounded-xl p-2.5 text-xs text-umber-900 focus:outline-none focus:ring-1 focus:ring-copper-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-umber-950">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-cream-50 border border-copper-300 rounded-xl p-2.5 text-xs text-umber-900 focus:outline-none focus:ring-1 focus:ring-copper-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-umber-950">Mobile Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-cream-50 border border-copper-300 rounded-xl p-2.5 text-xs text-umber-900 focus:outline-none focus:ring-1 focus:ring-copper-500"
                />
              </div>

              <div className="space-y-1.5 pt-2">
                <label className="text-xs font-bold text-umber-950 block">
                  Atelier Line-Art Emblem Motif
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {AVATAR_OPTIONS.map((opt) => (
                    <button
                      type="button"
                      key={opt.id}
                      onClick={() => setAvatarStyle(opt.id)}
                      className={`p-2 rounded-xl border flex flex-col items-center justify-center transition-all ${
                        (user?.avatarStyle || 'lota') === opt.id
                          ? 'border-[#8C4E28] bg-[#FAF4E8] ring-2 ring-[#8C4E28]/30 shadow-sm'
                          : 'border-copper-200 bg-cream-50 hover:border-copper-400'
                      }`}
                      title={opt.label}
                    >
                      <AvatarIcon styleName={opt.id} size="sm" variant="light" />
                      <span className="text-[10px] font-serif text-[#2A1A12]/80 mt-1 truncate max-w-[60px]">
                        {opt.label.split(' ')[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-copper-700 text-white font-bold text-xs hover:bg-copper-800 transition-colors shadow"
                >
                  Save Profile Changes
                </button>
                {saveSuccess && (
                  <span className="text-xs text-sage-800 font-semibold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Updated
                  </span>
                )}
              </div>
            </form>
          </div>

          {/* WhatsApp Communication & Order Alerts (Opt-in / Unsubscribe) */}
          <div className="bg-white rounded-3xl p-6 border border-copper-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-copper-100 pb-3">
              <div>
                <h3 className="font-serif text-lg font-bold text-umber-950">
                  WhatsApp Communication
                </h3>
                <p className="text-xs text-copper-700">Order tracking and courier status alerts</p>
              </div>
              <span
                className={`text-[11px] font-serif px-2.5 py-0.5 rounded-full border ${
                  whatsappOptIn
                    ? 'bg-sage-50 text-sage-800 border-sage-300 font-semibold'
                    : 'bg-parchment-200 text-umber-800 border-copper-200'
                }`}
              >
                {whatsappOptIn ? 'Opted In' : 'Unsubscribed'}
              </span>
            </div>

            <p className="text-xs text-umber-900 leading-relaxed font-body">
              When enabled, our workshop sends automated dispatch, BlueDart AWB tracking, and delivery notifications to your mobile ({phone}). We never send marketing spam.
            </p>

            <div className="pt-1 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setWhatsappOptIn(!whatsappOptIn);
                  setWaSaveSuccess(true);
                  setTimeout(() => setWaSaveSuccess(false), 2000);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-serif font-bold transition-all shadow-sm ${
                  whatsappOptIn
                    ? 'bg-red-50 text-red-700 border border-red-300 hover:bg-red-100'
                    : 'bg-copper-700 text-white hover:bg-copper-800'
                }`}
              >
                {whatsappOptIn ? 'Unsubscribe from WhatsApp' : 'Enable WhatsApp Updates'}
              </button>

              {waSaveSuccess && (
                <span className="text-xs text-sage-800 font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Preferences Saved
                </span>
              )}
            </div>

            <p className="text-[11px] text-copper-700 font-serif italic pt-1 border-t border-copper-100">
              Note: You can also reply &ldquo;STOP&rdquo; to any message on WhatsApp to immediately revoke consent. Compliant with India&apos;s DPDP Act 2023.
            </p>
          </div>

          {/* Saved Addresses */}
          <div className="bg-white rounded-3xl p-6 border border-copper-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-umber-950">Saved Delivery Addresses</h3>
            </div>

            <div className="space-y-3">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  className="p-3.5 rounded-2xl bg-cream-50 border border-copper-200 text-xs text-copper-800 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-umber-950">{addr.name}</span>
                    <span className="bg-copper-100 text-copper-800 px-2 py-0.5 rounded text-[10px] font-bold">
                      {addr.type}
                    </span>
                  </div>
                  <p>{addr.addressLine1}</p>
                  <p>
                    {addr.city}, {addr.state} - {addr.pincode}
                  </p>
                  <p className="text-copper-600">Phone: {addr.phone}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Order History */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-copper-200/90 shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold text-umber-950 flex items-center gap-2">
              <Package className="w-5 h-5 text-copper-600" />
              <span>Artisan Order History</span>
            </h3>

            {orders.length === 0 ? (
              <div className="p-8 text-center text-xs text-copper-700 bg-cream-50 rounded-2xl border border-copper-200">
                <p className="font-bold text-umber-900">No Orders Placed Yet</p>
                <p className="mt-1">When you order handcrafted copperware, live tracking will appear here.</p>
                <Link
                  href="/shop"
                  className="inline-block mt-3 px-4 py-2 rounded-xl bg-copper-600 text-white font-bold text-xs"
                >
                  Browse Catalog
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-4 rounded-2xl bg-cream-50 border border-copper-200 text-xs space-y-2 hover:bg-cream-100/60 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-umber-950">
                        Order #{ord.orderNumber}
                      </span>
                      <span className="bg-sage-100 text-sage-800 px-2 py-0.5 rounded text-[10px] font-bold">
                        {ord.status}
                      </span>
                    </div>

                    <p className="text-copper-700">
                      Placed on {ord.createdAt} • Total: <strong>₹{ord.totalAmount.toLocaleString('en-IN')}</strong>
                    </p>

                    <div className="pt-2 flex items-center justify-between border-t border-copper-200/60">
                      <span className="text-[11px] text-copper-600">
                        {ord.items.length} utensil{ord.items.length > 1 ? 's' : ''}
                      </span>
                      <Link
                        href={`/order/${ord.orderNumber}`}
                        className="font-bold text-copper-700 hover:text-copper-900 flex items-center gap-1"
                      >
                        <span>Track Order & Invoice</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

