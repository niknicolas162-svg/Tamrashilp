'use client';

import React from 'react';
import Link from 'next/link';
import { Truck, RotateCcw, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function ShippingReturnsPage() {
  return (
    <div className="bg-[#EFE4CF] min-h-screen text-[#2A1A12] py-14 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#B8964F]/40 bg-[#FAF4E8] text-[#8C4E28] text-xs uppercase tracking-[0.25em] font-sans">
            <Truck className="w-3.5 h-3.5 text-[#B8964F]" />
            <span>Transit & Assurance</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#12302B] leading-tight">
            Shipping & 15-Day Safe Exchange
          </h1>

          <div className="kumaoni-divider my-2">
            <span className="w-2 h-2 rotate-45 border border-[#B8964F] bg-[#FAF4E8]"></span>
          </div>

          <p className="text-xs sm:text-sm text-[#5C3E2C] font-light leading-relaxed">
            Dispatch protocols from the Shree Tamreshwar atelier of master coppersmith Devendra Kumar Tamta in Almora, Uttarakhand.
          </p>
        </div>

        <div className="museum-plaque bg-[#FAF4E8] p-8 sm:p-12 space-y-8 font-serif text-sm sm:text-base text-[#4A3223] leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-normal text-[#12302B] border-b border-[#B8964F]/30 pb-2">
              1. Shipping Logistics & Dispatch Timelines
            </h2>
            <p className="font-light">
              All Tamrashilp vessels originate from the workshop of master coppersmith Devendra Kumar Tamta in Tamta Mohalla, Almora. Each utensil is thoroughly hand-buffed with tamarind, inspected against structural flaws, and secured inside reinforced honeycomb paper cushioning.
            </p>
            <ul className="space-y-2 pt-2">
              <li className="flex items-start gap-2">
                <span className="text-[#B8964F]">◆</span>
                <span><strong>Complimentary Express Shipping:</strong> Provided on all consignments of ₹1,999 and above across India.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#B8964F]">◆</span>
                <span><strong>Orders Below ₹1,999:</strong> Flat ₹150 subsidized transit and handling fee.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#B8964F]">◆</span>
                <span><strong>Dispatch Window:</strong> Catalogued vessels depart within 24–48 hours. Bespoke engraved pieces require 3–5 working days for chisel work.</span>
              </li>
            </ul>
          </section>

          <section className="space-y-3 pt-6 border-t border-[#B8964F]/25">
            <h2 className="font-serif text-2xl font-normal text-[#12302B] border-b border-[#B8964F]/30 pb-2">
              2. 15-Day Safe Exchange Guarantee
            </h2>
            <p className="font-light">
              Pure copper vessels are heavy and prized. Should transit deliver a damaged piece or defect, notify our artisan desk at tamrashilpstore@gmail.com or WhatsApp +91 95570 58767 within 15 days of arrival.
            </p>
            <p className="font-light">
              We arrange immediate reverse pickup and commission a fresh replacement from the same workshop at zero cost.
            </p>
          </section>

          <section className="space-y-3 pt-6 border-t border-[#B8964F]/25">
            <h2 className="font-serif text-2xl font-normal text-[#12302B] border-b border-[#B8964F]/30 pb-2">
              3. Doorstep Remittance (Cash on Delivery)
            </h2>
            <p className="font-light">
              Doorstep payment is available for serviceable pincodes up to ₹10,000. For bespoke heraldic works exceeding ₹10,000, 50% online deposit is required to allocate raw electrolytic ingot bullion.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
