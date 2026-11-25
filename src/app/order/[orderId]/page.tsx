'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle,
  Truck,
  Package,
  Calendar,
  FileText,
  Clock,
  Printer,
  RotateCcw,
  ShieldCheck,
  MapPin,
  Hammer,
  HelpCircle,
  Phone,
  Sparkles,
} from 'lucide-react';
import { Order } from '@/types';
import { useLanguage } from '@/lib/language-context';

export default function OrderTrackingPage({ params }: { params: { orderId: string } }) {
  const { orderId } = params;
  const { language } = useLanguage();

  const [order, setOrder] = useState<Order | null>(null);
  const [activeTab, setActiveTab] = useState<'TRACKING' | 'INVOICE'>('TRACKING');
  const [returnRequested, setReturnRequested] = useState(false);

  useEffect(() => {
    // Try reading order from localStorage
    try {
      const orders: Order[] = JSON.parse(localStorage.getItem('tamtashilp_orders') || '[]');
      const found = orders.find((o) => o.orderNumber === orderId || o.id === orderId);
      if (found) {
        setOrder(found);
        return;
      }
    } catch {
      // fallback
    }

    // Default mock order if direct link is accessed
    setOrder({
      id: orderId,
      orderNumber: orderId,
      createdAt: '23 Nov 2026',
      status: 'CONFIRMED',
      items: [
        {
          productId: 'tamta-p1',
          title: 'Royal Almora Hammered Copper Water Bottle (1000ml)',
          variantName: '1000ml - Hammered Classic',
          price: 1699,
          quantity: 1,
          finish: 'HAMMERED',
          image: '/images/tamta/product-02.jpg',
          artisanName: 'Devendra Kumar Tamta',
        },
      ],
      subtotal: 1699,
      discount: 0,
      shippingFee: 0,
      giftWrapFee: 0,
      isGift: false,
      totalAmount: 1699,
      paymentMethod: 'RAZORPAY',
      paymentStatus: 'PAID',
      paymentId: 'pay_rzp_mock_123',
      shippingAddress: {
        id: 'a1',
        name: 'Aaditya Rawat',
        phone: '+91 98765 43210',
        addressLine1: 'Flat 402, Kumaon Enclave',
        city: 'Almora',
        state: 'Uttarakhand',
        pincode: '263601',
        type: 'HOME',
      },
      carrier: 'Shiprocket (BlueDart Express)',
      trackingNumber: 'BD89234190IN',
      trackingTimeline: [
        {
          status: 'PLACED',
          timestamp: '23 Nov 2026, 11:30 AM',
          description: 'Order confirmed and verified with Almora workshop.',
          location: 'Tamrashilp Desk, Almora',
          completed: true,
        },
        {
          status: 'CONFIRMED',
          timestamp: '23 Nov 2026, 11:35 AM',
          description: 'Purity certification allocated (NABL-MET-2026-0814).',
          location: 'Tamta Mohalla Shilp Kendra',
          completed: true,
        },
        {
          status: 'PACKED',
          timestamp: 'Estimated: Today, 5:00 PM',
          description: 'Hand-buffed with tamarind, foam wrapped in craft carton.',
          location: 'Tamta Mohalla Dispatch',
          completed: false,
        },
        {
          status: 'SHIPPED',
          timestamp: 'Estimated: 24 Nov 2026',
          description: 'Handed over to BlueDart Air courier.',
          location: 'Kathgodam Hub, UK',
          completed: false,
        },
        {
          status: 'DELIVERED',
          timestamp: 'Estimated: 26 Nov 2026',
          description: 'Delivered to your doorstep.',
          location: 'Almora, Uttarakhand',
          completed: false,
        },
      ],
    });
  }, [orderId]);

  if (!order) {
    return (
      <div className="bg-[#EFE4CF] min-h-screen py-24 text-center text-xs font-serif text-[#2A1A12]">
        Loading Archival Order Registry...
      </div>
    );
  }

  // GST Breakdown (12% copper utensils: 6% CGST + 6% SGST)
  const gstBaseAmount = Math.round((order.totalAmount / 1.12) * 100) / 100;
  const gstTotal = Math.round((order.totalAmount - gstBaseAmount) * 100) / 100;
  const cgst = Math.round((gstTotal / 2) * 100) / 100;
  const sgst = cgst;

  return (
    <div className="bg-[#EFE4CF] min-h-screen text-[#2A1A12] py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header Card */}
        <div className="museum-plaque bg-[#FAF4E8] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4E6E58] animate-pulse"></span>
              <span className="text-[10px] text-[#4E6E58] uppercase tracking-[0.25em] font-sans font-semibold">
                Status: {order.status}
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-4xl font-normal text-[#12302B]">
              Acquisition #{order.orderNumber}
            </h1>
            <p className="text-xs text-[#5C3E2C] font-light font-sans">
              Registered on {order.createdAt} • Carrier:{' '}
              <strong className="text-[#12302B] font-semibold">{order.carrier}</strong>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('TRACKING')}
              className={`px-5 py-2.5 text-xs font-sans tracking-widest uppercase transition-all ${activeTab === 'TRACKING'
                ? 'btn-atelier'
                : 'btn-atelier-outline'
                }`}
            >
              Artisan Journey
            </button>
            <button
              onClick={() => setActiveTab('INVOICE')}
              className={`px-5 py-2.5 text-xs font-sans tracking-widest uppercase inline-flex items-center gap-2 transition-all ${activeTab === 'INVOICE'
                ? 'btn-atelier'
                : 'btn-atelier-outline'
                }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Tax Folio</span>
            </button>
          </div>
        </div>

        {activeTab === 'TRACKING' ? (
          <div className="space-y-8">
            {/* Timeline */}
            <div className="museum-plaque bg-[#FAF4E8] p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-[#B8964F]/25 pb-4">
                <div>
                  <h3 className="font-serif text-xl font-normal text-[#12302B]">
                    Dispatch & Forge Journey
                  </h3>
                  <p className="text-xs text-[#5C3E2C] font-sans">
                    Tracking Passport: <span className="font-mono text-[#B26A3C]">{order.trackingNumber}</span>
                  </p>
                </div>
                <span className="text-[10px] text-[#4E6E58] font-sans uppercase tracking-widest bg-[#E8EFEA] px-3 py-1 border border-[#4E6E58]/30">
                  En Route
                </span>
              </div>

              <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3 before:top-2 before:bottom-2 before:w-[1px] before:bg-[#B8964F]/40">
                {order.trackingTimeline.map((step, idx) => (
                  <div key={idx} className="relative flex items-start gap-4">
                    <div
                      className={`absolute -left-6 sm:-left-8 w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step.completed
                        ? 'bg-[#12302B] text-[#B8964F] border border-[#B8964F]'
                        : 'bg-[#FAF4E8] text-[#8C4E28] border border-[#B8964F]/40'
                        }`}
                    >
                      {step.completed ? '✓' : '○'}
                    </div>
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-serif text-sm font-semibold text-[#12302B]">{step.status}</h4>
                        <span className="text-[11px] text-[#8C4E28] font-sans font-light">
                          ({step.timestamp})
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#4A3223] font-light leading-relaxed">
                        {step.description}
                      </p>
                      <p className="text-[11px] text-[#6B4B35] font-sans flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-[#B8964F]" />
                        <span>{step.location}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Items & Shipping Address Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="museum-plaque bg-[#FAF4E8] p-6 space-y-4">
                <h4 className="font-serif text-base font-normal text-[#12302B]">
                  Vessels in this Consignment
                </h4>
                <div className="divide-y divide-[#B8964F]/20">
                  {order.items.map((item, i) => (
                    <div key={i} className="py-3 flex items-center gap-3.5">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-14 h-14 object-cover border border-[#B8964F]/40"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-serif text-xs font-medium text-[#12302B] truncate">
                          {item.title}
                        </p>
                        <p className="text-[11px] text-[#5C3E2C] font-sans">
                          Qty: {item.quantity} • Forged by {item.artisanName}
                        </p>
                      </div>
                      <span className="font-serif text-xs font-semibold text-[#12302B]">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="museum-plaque bg-[#FAF4E8] p-6 space-y-4">
                <h4 className="font-serif text-base font-normal text-[#12302B]">
                  Patron & Destination
                </h4>
                <div className="text-xs text-[#4A3223] font-sans space-y-1.5 leading-relaxed">
                  <p className="font-serif font-bold text-sm text-[#12302B]">
                    {order.shippingAddress.name}
                  </p>
                  <p>{order.shippingAddress.addressLine1}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state} -{' '}
                    {order.shippingAddress.pincode}
                  </p>
                  <p className="text-[#8C4E28] pt-1 font-mono">
                    Phone: {order.shippingAddress.phone}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#B8964F]/25 flex items-center justify-between text-xs">
                  {returnRequested ? (
                    <div className="bg-[#E8EFEA] px-3 py-2 border border-[#4E6E58]/30 space-y-0.5">
                      <span className="text-[10px] text-[#4E6E58] font-sans uppercase tracking-wider font-semibold block">
                        Guild Exchange Ticket Registered
                      </span>
                      <span className="text-[11px] text-[#12302B]/80 font-serif block">
                        Our Almora artisan desk will contact you via WhatsApp (+91 95570 58767) to coordinate pickup.
                      </span>
                    </div>
                  ) : (
                    <button
                      onClick={() => setReturnRequested(true)}
                      className="text-xs font-sans tracking-wider uppercase text-[#B26A3C] hover:text-[#12302B] font-medium transition-colors"
                    >
                      Request 15-Day Safe Exchange →
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Printable GST Tax Invoice */
          <div className="museum-plaque bg-[#FAF4E8] p-8 sm:p-12 space-y-8">
            <div className="flex justify-between items-start border-b border-[#B8964F]/30 pb-6">
              <div>
                <span className="text-[10px] font-sans text-[#B8964F] uppercase tracking-[0.25em]">
                  Official Tax Invoice (Form GST INV-1)
                </span>
                <h2 className="font-serif text-3xl font-normal text-[#12302B]">
                  Tamrashilp Collective
                </h2>
                <p className="text-xs text-[#5C3E2C] font-sans">
                  Tamta Mohalla, Almora, Uttarakhand - 263601
                </p>
                <p className="text-xs text-[#5C3E2C] font-sans">
                  GSTIN: 05AAACT8492J1Z3 • PAN: AAACT8492J
                </p>
              </div>
              <div className="text-right space-y-2">
                <button
                  onClick={() => window.print()}
                  className="btn-atelier px-4 py-2 text-[10px] tracking-widest uppercase inline-flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Document</span>
                </button>
                <p className="text-xs font-mono font-bold text-[#12302B]">
                  INV-2026-{order.orderNumber}
                </p>
                <p className="text-[11px] text-[#8C4E28] font-sans">{order.createdAt}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-sans text-[#4A3223]">
              <div>
                <span className="text-[#8C4E28] uppercase tracking-wider text-[10px] block mb-1">
                  Billed To (Patron):
                </span>
                <p className="font-serif font-bold text-sm text-[#12302B]">
                  {order.shippingAddress.name}
                </p>
                <p>{order.shippingAddress.addressLine1}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                </p>
                <p>Mobile: {order.shippingAddress.phone}</p>
              </div>
              <div className="text-right">
                <span className="text-[#8C4E28] uppercase tracking-wider text-[10px] block mb-1">
                  Settlement Details:
                </span>
                <p>Method: {order.paymentMethod}</p>
                <p>Status: {order.paymentStatus}</p>
                {order.paymentId && <p className="font-mono text-[10px]">Ref: {order.paymentId}</p>}
              </div>
            </div>

            <table className="w-full text-xs text-left border-collapse font-sans">
              <thead>
                <tr className="border-y border-[#B8964F]/30 bg-[#FAF3E8]">
                  <th className="py-3 px-3 font-serif text-sm">Vessel Description & Craftsman</th>
                  <th className="py-3 px-3">HSN Code</th>
                  <th className="py-3 px-3 text-center">Qty</th>
                  <th className="py-3 px-3 text-right">Taxable Value</th>
                  <th className="py-3 px-3 text-right">Total (INR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#B8964F]/20">
                {order.items.map((it, idx) => (
                  <tr key={idx}>
                    <td className="py-3.5 px-3">
                      <p className="font-serif font-medium text-sm text-[#12302B]">{it.title}</p>
                      <p className="text-[10px] text-[#8C4E28]">Forged by {it.artisanName}</p>
                    </td>
                    <td className="py-3.5 px-3 font-mono text-[11px]">7418 (Copper Utensils)</td>
                    <td className="py-3.5 px-3 text-center">{it.quantity}</td>
                    <td className="py-3.5 px-3 text-right font-mono">
                      ₹{Math.round((it.price / 1.12) * it.quantity).toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-3 text-right font-serif font-medium text-sm text-[#12302B]">
                      ₹{(it.price * it.quantity).toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-end pt-2 text-xs font-sans">
              <div className="w-72 space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#5C3E2C]">Taxable Amount:</span>
                  <span className="font-mono">₹{gstBaseAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[#8C4E28]">
                  <span>CGST (6%):</span>
                  <span className="font-mono">₹{cgst.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[#8C4E28]">
                  <span>SGST (6%):</span>
                  <span className="font-mono">₹{sgst.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5C3E2C]">Shipping:</span>
                  <span className="font-mono">₹{order.shippingFee}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-[#B8964F]/40 font-serif text-lg text-[#12302B]">
                  <span>Total Amount:</span>
                  <span className="text-[#B26A3C] font-semibold">
                    ₹{order.totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
