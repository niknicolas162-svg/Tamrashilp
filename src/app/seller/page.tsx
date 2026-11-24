'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Hammer,
  DollarSign,
  Package,
  Plus,
  Trash2,
  CheckCircle,
  Truck,
  Printer,
  Calendar,
  AlertCircle,
  TrendingUp,
  Tag,
  Star,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { useLanguage } from '@/lib/language-context';
import { PRODUCTS, ARTISANS, CATEGORIES } from '@/lib/mockData';
import { Product, FinishType } from '@/types';

export default function SellerDashboardPage() {
  const { user, switchRole } = useAuth();
  const { language } = useLanguage();

  const [activeTab, setActiveTab] = useState<'PRODUCTS' | 'ORDERS' | 'PAYOUTS' | 'QUOTES'>('PRODUCTS');
  const [artisanProducts, setArtisanProducts] = useState<Product[]>(
    PRODUCTS.filter((p) => p.artisanId === 'artisan-1' || p.artisanId === 'artisan-3')
  );

  // New Product Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('water-bottles-jugs');
  const [newPrice, setNewPrice] = useState(1899);
  const [newFinish, setNewFinish] = useState<FinishType>('HAMMERED');
  const [newCapacity, setNewCapacity] = useState('1000ml');
  const [newWeight, setNewWeight] = useState(450);
  const [newMakingDays, setNewMakingDays] = useState(4);
  const [newStock, setNewStock] = useState(15);

  // Workshop Orders
  const [orders, setOrders] = useState([
    {
      id: 'ORD-9821',
      customer: 'Priya Sharma (Bengaluru)',
      product: 'Royal Almora Hammered Copper Water Bottle (1000ml)',
      qty: 2,
      total: 3398,
      status: 'CONFIRMED',
      date: 'Today, 10:15 AM',
      tracking: 'Pending BlueDart Pickup',
    },
    {
      id: 'ORD-9754',
      customer: 'Vikas Rawat (Dehradun)',
      product: 'Traditional Kumaoni Heavy Copper Kadhai (2.5L)',
      qty: 1,
      total: 3899,
      status: 'PACKED',
      date: 'Yesterday',
      tracking: 'BD89123490IN',
    },
    {
      id: 'ORD-9610',
      customer: 'Amitabh Sengupta (Kolkata)',
      product: 'Ayurvedic Pure Copper Water Dispenser (5L)',
      qty: 1,
      total: 3499,
      status: 'SHIPPED',
      date: '21 Nov 2026',
      tracking: 'BD89004561IN',
    },
  ]);

  // Custom order quotes
  const [customQuotes, setCustomQuotes] = useState([
    {
      id: 'CUST-849',
      customer: 'Maj. General R. Mehta',
      vessel: 'Bespoke 15L Water Urn with Regimental Crest Engraving',
      budget: '₹12,000 - ₹18,000',
      status: 'PENDING_QUOTE',
      quotedPrice: '',
    },
  ]);

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newProd: Product = {
      id: `tamta-custom-${Date.now()}`,
      title: newTitle,
      titleHi: newTitle,
      slug: newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      categoryId: newCategory,
      categoryName: CATEGORIES.find((c) => c.id === newCategory)?.name || 'Water Bottles & Jugs',
      artisanId: 'artisan-1',
      artisan: ARTISANS[0],
      basePrice: newPrice,
      comparePrice: Math.round(newPrice * 1.3),
      purityRating: '99.2% Lab-Certified Pure Copper (Grade A)',
      purityCertificationNo: `NABL-MET-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      finish: newFinish,
      capacity: newCapacity,
      weightGrams: newWeight,
      dimensions: 'Custom Dimensions',
      makingTimeDays: newMakingDays,
      stock: newStock,
      isFeatured: false,
      isBestseller: false,
      images: [
        '/images/tamta/product-01.jpg',
      ],
      shortDescription: 'Freshly listed handcrafted copper vessel from Almora workshop.',
      shortDescriptionHi: 'अल्मोड़ा कार्यशाला से हाल ही में सूचीबद्ध हस्तनिर्मित ताम्र पात्र।',
      description: 'Hand-beaten over horn-anvils in Tamta Mohalla, Almora. 100% pure virgin copper.',
      descriptionHi: 'टम्टा मोहल्ला, अल्मोड़ा में निहाई पर हाथ से गढ़ा गया। 100% शुद्ध तांबा।',
      careInstructions: ['Wash with mild lemon-salt solution.', 'Dry immediately with soft cloth.'],
      safetyNotice: 'Store drinking water only. Avoid acidic foods in unlined copper.',
      customOrderAvailable: true,
      reviewsCount: 0,
      rating: 5.0,
      hoursOfLabor: 14,
      anvilBlows: 3800,
      village: 'Tamta Mohalla, Almora',
      curatorNote: 'Forged from virgin electrolytic copper with traditional wood-fired annealing.',
    };

    setArtisanProducts([newProd, ...artisanProducts]);
    setIsAddModalOpen(false);
    setNewTitle('');
    alert('New copper vessel listed successfully in the atelier archives!');
  };

  const handleUpdateOrderStatus = (orderId: string, nextStatus: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: nextStatus } : o))
    );
  };

  return (
    <div className="bg-[#EFE4CF] min-h-screen text-[#2A1A12] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#B8964F]/30 gap-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4E6E58] animate-pulse"></span>
              <span className="text-[10px] text-[#8C4E28] uppercase tracking-[0.25em] font-sans">
                Master Craftsman Ledger
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#12302B]">
              Shree Tamreshwar Shilp Kendra
            </h1>
            <p className="text-xs text-[#5C3E2C] font-sans">
              Founder & Lead Artisan Devendra Kumar Tamta • Tamta Mohalla, Almora • Guild Folio: UK-COP-1984
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="btn-atelier px-5 py-2.5 text-xs tracking-widest uppercase flex items-center gap-2"
            >
              <Plus className="w-3.5 h-3.5 text-[#F7F0E1]" />
              <span>Inscribe New Vessel</span>
            </button>

            <Link
              href="/artisans"
              className="btn-atelier-outline px-4 py-2.5 text-xs tracking-widest uppercase flex items-center gap-1.5"
            >
              <span>Public Archive</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* KPI Plaques */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="museum-plaque bg-[#FAF4E8] p-6 space-y-2">
            <span className="text-[10px] text-[#8C4E28] uppercase tracking-wider font-sans block">
              Cumulative Realized
            </span>
            <p className="font-serif text-3xl font-normal text-[#12302B]">₹8,40,000</p>
            <span className="text-[11px] text-[#5C3E2C] font-light font-sans">
              1,420 vessels struck by hand
            </span>
          </div>

          <div className="museum-plaque bg-[#FAF4E8] p-6 space-y-2">
            <span className="text-[10px] text-[#8C4E28] uppercase tracking-wider font-sans block">
              Awaiting Hearth Dispatch
            </span>
            <p className="font-serif text-3xl font-normal text-[#B26A3C]">
              {orders.filter((o) => o.status !== 'SHIPPED').length} Pieces
            </p>
            <span className="text-[11px] text-[#5C3E2C] font-light font-sans">
              BlueDart pickup within 24h
            </span>
          </div>

          <div className="museum-plaque bg-[#FAF4E8] p-6 space-y-2">
            <span className="text-[10px] text-[#8C4E28] uppercase tracking-wider font-sans block">
              Next Guild Remittance (88%)
            </span>
            <p className="font-serif text-3xl font-normal text-[#4E6E58]">₹48,200</p>
            <span className="text-[11px] text-[#5C3E2C] font-light font-sans">
              Direct NEFT on Friday
            </span>
          </div>

          <div className="museum-plaque bg-[#FAF4E8] p-6 space-y-2">
            <span className="text-[10px] text-[#8C4E28] uppercase tracking-wider font-sans block">
              Patron Acclamation
            </span>
            <p className="font-serif text-3xl font-normal text-[#12302B] flex items-center gap-1.5">
              4.95 <Star className="w-5 h-5 fill-[#B8964F] text-[#B8964F]" />
            </p>
            <span className="text-[11px] text-[#5C3E2C] font-light font-sans">
              Across 142 documented reviews
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-3 border-b border-[#B8964F]/30 pb-3 font-sans text-xs">
          <button
            onClick={() => setActiveTab('PRODUCTS')}
            className={`px-5 py-2.5 tracking-widest uppercase transition-all ${
              activeTab === 'PRODUCTS'
                ? 'btn-atelier'
                : 'btn-atelier-outline'
            }`}
          >
            Catalogued Pieces ({artisanProducts.length})
          </button>
          <button
            onClick={() => setActiveTab('ORDERS')}
            className={`px-5 py-2.5 tracking-widest uppercase transition-all ${
              activeTab === 'ORDERS'
                ? 'btn-atelier'
                : 'btn-atelier-outline'
            }`}
          >
            Patron Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('PAYOUTS')}
            className={`px-5 py-2.5 tracking-widest uppercase transition-all ${
              activeTab === 'PAYOUTS'
                ? 'btn-atelier'
                : 'btn-atelier-outline'
            }`}
          >
            Treasury Ledger
          </button>
          <button
            onClick={() => setActiveTab('QUOTES')}
            className={`px-5 py-2.5 tracking-widest uppercase transition-all ${
              activeTab === 'QUOTES'
                ? 'btn-atelier'
                : 'btn-atelier-outline'
            }`}
          >
            Bespoke Inquiries ({customQuotes.length})
          </button>
        </div>

        {/* Tab 1: Products */}
        {activeTab === 'PRODUCTS' && (
          <div className="museum-plaque bg-[#FAF4E8] p-6 sm:p-8 space-y-6">
            <div className="flex justify-between items-center border-b border-[#B8964F]/25 pb-4">
              <h3 className="font-serif text-xl font-normal text-[#12302B]">
                Active Copper Utensils in Forge Registry
              </h3>
              <span className="text-xs text-[#8C4E28] font-sans">All values inclusive of 12% GST</span>
            </div>

            <div className="overflow-x-auto font-sans text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#B8964F]/30 bg-[#FAF3E8]">
                    <th className="py-3 px-3 font-serif text-sm">Vessel</th>
                    <th className="py-3 px-3">Finish & Capacity</th>
                    <th className="py-3 px-3">Valuation</th>
                    <th className="py-3 px-3">Inventory</th>
                    <th className="py-3 px-3">Anvil Time</th>
                    <th className="py-3 px-3 text-right">Ledger</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#B8964F]/20">
                  {artisanProducts.map((p) => (
                    <tr key={p.id}>
                      <td className="py-3.5 px-3 flex items-center gap-3.5">
                        <img
                          src={p.images[0]}
                          alt={p.title}
                          className="w-12 h-12 object-cover border border-[#B8964F]/40"
                        />
                        <div>
                          <Link
                            href={`/product/${p.slug}`}
                            className="font-serif text-sm font-medium text-[#12302B] hover:text-[#B26A3C] line-clamp-1"
                          >
                            {p.title}
                          </Link>
                          <span className="text-[10px] text-[#8C4E28] font-mono">
                            {p.purityCertificationNo}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-3">
                        {p.finish} • {p.capacity || 'N/A'}
                      </td>
                      <td className="py-3.5 px-3 font-serif font-medium text-sm text-[#12302B]">
                        ₹{p.basePrice.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="bg-[#E8EFEA] text-[#4E6E58] px-2.5 py-0.5 border border-[#4E6E58]/30 uppercase text-[10px] tracking-wider">
                          {p.stock} units
                        </span>
                      </td>
                      <td className="py-3.5 px-3">{p.makingTimeDays} Days</td>
                      <td className="py-3.5 px-3 text-right">
                        <button
                          onClick={() =>
                            setArtisanProducts(artisanProducts.filter((item) => item.id !== p.id))
                          }
                          className="text-[#8C4E28] hover:text-red-700 p-1"
                          title="Archive piece"
                        >
                          <Trash2 className="w-4 h-4 inline" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Orders */}
        {activeTab === 'ORDERS' && (
          <div className="museum-plaque bg-[#FAF4E8] p-6 sm:p-8 space-y-6">
            <h3 className="font-serif text-xl font-normal text-[#12302B] border-b border-[#B8964F]/25 pb-4">
              Incoming Consignments to Pack & Dispatch
            </h3>

            <div className="overflow-x-auto font-sans text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#B8964F]/30 bg-[#FAF3E8]">
                    <th className="py-3 px-3">Consignment ID</th>
                    <th className="py-3 px-3">Patron & Inscription</th>
                    <th className="py-3 px-3">Utensils</th>
                    <th className="py-3 px-3">Remittance</th>
                    <th className="py-3 px-3">Journey</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#B8964F]/20">
                  {orders.map((ord) => (
                    <tr key={ord.id}>
                      <td className="py-3.5 px-3 font-mono text-[#B26A3C] font-semibold">{ord.id}</td>
                      <td className="py-3.5 px-3">
                        <p className="font-serif font-medium text-sm text-[#12302B]">{ord.customer}</p>
                        <p className="text-[10px] text-[#8C4E28]">{ord.date}</p>
                      </td>
                      <td className="py-3.5 px-3">
                        {ord.product} (x{ord.qty})
                      </td>
                      <td className="py-3.5 px-3 font-serif font-medium text-sm text-[#12302B]">
                        ₹{ord.total.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="bg-[#FAF3E8] border border-[#B8964F]/40 text-[#8C4E28] px-2.5 py-0.5 text-[10px] uppercase tracking-wider">
                          {ord.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-right space-x-2">
                        {ord.status === 'CONFIRMED' && (
                          <button
                            onClick={() => handleUpdateOrderStatus(ord.id, 'PACKED')}
                            className="btn-atelier px-3 py-1.5 text-[10px] tracking-wider uppercase"
                          >
                            Mark Packed
                          </button>
                        )}
                        {ord.status === 'PACKED' && (
                          <button
                            onClick={() => handleUpdateOrderStatus(ord.id, 'SHIPPED')}
                            className="btn-atelier px-3 py-1.5 text-[10px] tracking-wider uppercase"
                          >
                            Hand to Courier
                          </button>
                        )}
                        {ord.status === 'SHIPPED' && (
                          <span className="text-[10px] text-[#4E6E58] font-sans uppercase tracking-widest">
                            In Transit
                          </span>
                        )}
                        <button
                          onClick={() => alert(`Printing BlueDart Waybill for ${ord.id}...`)}
                          className="btn-atelier-outline px-2.5 py-1.5 text-[10px] tracking-wider uppercase"
                          title="Print Shipping Waybill"
                        >
                          <Printer className="w-3 h-3 inline" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Payouts */}
        {activeTab === 'PAYOUTS' && (
          <div className="museum-plaque bg-[#FAF4E8] p-6 sm:p-8 space-y-6">
            <div className="border-b border-[#B8964F]/25 pb-4 space-y-1">
              <h3 className="font-serif text-xl font-normal text-[#12302B]">
                Artisan Guild Settlement Ledger
              </h3>
              <p className="text-xs text-[#5C3E2C] font-sans">
                Transparent 12% collective upkeep fee • 88% direct artisan disbursement
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="p-5 bg-[#FAF3E8] border border-[#B8964F]/30 space-y-1.5">
                <span className="text-[10px] text-[#8C4E28] uppercase tracking-wider font-sans block">
                  Gross Realized
                </span>
                <p className="font-serif text-2xl font-normal text-[#12302B]">₹8,40,000</p>
              </div>
              <div className="p-5 bg-[#FAF3E8] border border-[#B8964F]/30 space-y-1.5">
                <span className="text-[10px] text-[#8C4E28] uppercase tracking-wider font-sans block">
                  Guild Commission (12%)
                </span>
                <p className="font-serif text-2xl font-normal text-[#B26A3C]">₹1,00,800</p>
              </div>
              <div className="p-5 bg-[#FAF3E8] border border-[#B8964F]/30 space-y-1.5">
                <span className="text-[10px] text-[#8C4E28] uppercase tracking-wider font-sans block">
                  Net Disbursed to Workshop
                </span>
                <p className="font-serif text-2xl font-normal text-[#4E6E58]">₹7,39,200</p>
              </div>
            </div>

            <div className="space-y-3 pt-3">
              <h4 className="font-serif text-base font-normal text-[#12302B]">
                Past Disbursal Records
              </h4>
              <div className="divide-y divide-[#B8964F]/20 font-sans text-xs">
                <div className="py-3 flex justify-between">
                  <span>15 Nov 2026 • NEFT-SBIN98124901</span>
                  <span className="font-medium text-[#4E6E58]">₹42,500 Disbursed</span>
                </div>
                <div className="py-3 flex justify-between">
                  <span>08 Nov 2026 • NEFT-SBIN87123002</span>
                  <span className="font-medium text-[#4E6E58]">₹51,800 Disbursed</span>
                </div>
                <div className="py-3 flex justify-between">
                  <span>01 Nov 2026 • NEFT-SBIN76120914</span>
                  <span className="font-medium text-[#4E6E58]">₹38,200 Disbursed</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Quotes */}
        {activeTab === 'QUOTES' && (
          <div className="museum-plaque bg-[#FAF4E8] p-6 sm:p-8 space-y-6">
            <h3 className="font-serif text-xl font-normal text-[#12302B] border-b border-[#B8964F]/25 pb-4">
              Bespoke Commission Requests
            </h3>

            {customQuotes.map((q) => (
              <div
                key={q.id}
                className="p-6 bg-[#FAF3E8] border border-[#B8964F]/40 space-y-4 font-sans text-xs"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-mono text-[#B26A3C] font-semibold">{q.id}</span>
                    <h4 className="font-serif text-base font-normal text-[#12302B] mt-1">{q.vessel}</h4>
                    <p className="text-[#5C3E2C] mt-0.5">
                      Patron: {q.customer} • Budget Scope: {q.budget}
                    </p>
                  </div>
                  <span className="bg-[#FAF3E8] border border-[#B8964F]/40 text-[#8C4E28] px-3 py-1 text-[10px] uppercase tracking-wider">
                    Awaiting Artisan Quote
                  </span>
                </div>

                <div className="flex gap-3 pt-2">
                  <input
                    type="number"
                    placeholder="Quoted Amount (₹)"
                    className="w-56 bg-[#FAF4E8] border border-[#B8964F]/40 p-2.5 text-xs text-[#2A1A12] focus:outline-none focus:border-[#B26A3C]"
                  />
                  <button
                    onClick={() => alert('Artisan bespoke quote submitted to patron!')}
                    className="btn-atelier px-5 py-2.5 text-xs tracking-widest uppercase"
                  >
                    Submit Inscribed Quote
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal: List Vessel */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#12302B]/80 backdrop-blur-sm">
            <div className="museum-plaque bg-[#FAF4E8] max-w-lg w-full p-8 space-y-5 max-h-[90vh] overflow-y-auto">
              <h3 className="font-serif text-2xl font-normal text-[#12302B] border-b border-[#B8964F]/25 pb-3">
                Inscribe New Copper Vessel
              </h3>

              <form onSubmit={handleCreateProduct} className="space-y-4 font-sans text-xs">
                <div className="space-y-1.5">
                  <label className="text-xs font-sans tracking-wider uppercase text-[#4A3223]">
                    Vessel Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Almora Hammered Copper Milk Lota (600ml)"
                    className="w-full bg-[#EFE4CF]/60 border border-[#B8964F]/40 p-3 text-xs text-[#2A1A12] focus:outline-none focus:border-[#B26A3C]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-sans tracking-wider uppercase text-[#4A3223]">
                      Collection Folio
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full bg-[#EFE4CF]/60 border border-[#B8964F]/40 p-3 text-xs text-[#2A1A12] focus:outline-none focus:border-[#B26A3C] cursor-pointer"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-sans tracking-wider uppercase text-[#4A3223]">
                      Hammer Finish
                    </label>
                    <select
                      value={newFinish}
                      onChange={(e) => setNewFinish(e.target.value as FinishType)}
                      className="w-full bg-[#EFE4CF]/60 border border-[#B8964F]/40 p-3 text-xs text-[#2A1A12] focus:outline-none focus:border-[#B26A3C] cursor-pointer"
                    >
                      <option value="HAMMERED">Diamond Hammered</option>
                      <option value="PLAIN">Mirror Polished</option>
                      <option value="ENGRAVED">Hand-Engraved</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-sans tracking-wider uppercase text-[#4A3223]">
                      Price (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      value={newPrice}
                      onChange={(e) => setNewPrice(Number(e.target.value))}
                      className="w-full bg-[#EFE4CF]/60 border border-[#B8964F]/40 p-3 text-xs text-[#2A1A12] focus:outline-none focus:border-[#B26A3C]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-sans tracking-wider uppercase text-[#4A3223]">
                      Capacity
                    </label>
                    <input
                      type="text"
                      value={newCapacity}
                      onChange={(e) => setNewCapacity(e.target.value)}
                      className="w-full bg-[#EFE4CF]/60 border border-[#B8964F]/40 p-3 text-xs text-[#2A1A12] focus:outline-none focus:border-[#B26A3C]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-sans tracking-wider uppercase text-[#4A3223]">
                      Stock Qty *
                    </label>
                    <input
                      type="number"
                      value={newStock}
                      onChange={(e) => setNewStock(Number(e.target.value))}
                      className="w-full bg-[#EFE4CF]/60 border border-[#B8964F]/40 p-3 text-xs text-[#2A1A12] focus:outline-none focus:border-[#B26A3C]"
                    />
                  </div>
                </div>

                <div className="pt-3 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="btn-atelier-outline px-4 py-2.5 text-xs tracking-widest uppercase"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-atelier px-6 py-2.5 text-xs tracking-widest uppercase"
                  >
                    Commit to Archives
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
