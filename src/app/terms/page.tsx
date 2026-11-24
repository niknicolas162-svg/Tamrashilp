'use client';

import React from 'react';

export default function TermsPage() {
  return (
    <div className="bg-[#EFE4CF] min-h-screen text-[#2A1A12] py-14 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#12302B] leading-tight">
            Terms & Guild Charter
          </h1>
          <div className="kumaoni-divider my-2">
            <span className="w-2 h-2 rotate-45 border border-[#B8964F] bg-[#FAF4E8]"></span>
          </div>
          <p className="text-xs sm:text-sm text-[#5C3E2C] font-light leading-relaxed">
            Our solemn covenant of fair artisan livelihood, assay transparency, and genuine human craft.
          </p>
        </div>

        <div className="museum-plaque bg-[#FAF4E8] p-8 sm:p-12 space-y-8 font-serif text-sm sm:text-base text-[#4A3223] leading-relaxed">
          <section className="space-y-2">
            <h3 className="font-serif text-2xl font-normal text-[#12302B]">
              1. The Nature of Handcrafted Form
            </h3>
            <p className="font-light">
              Every utensil at Tamrashilp is hand-beaten over iron stakes. Micro-variations in hammer impressions, dimensional tolerances (±5%), and surface patina are the defining hallmarks of genuine human craft, distinguishing our work from cold industrial die-pressings.
            </p>
          </section>

          <section className="space-y-2 pt-6 border-t border-[#B8964F]/25">
            <h3 className="font-serif text-2xl font-normal text-[#12302B]">
              2. Purity & Scientific Integrity
            </h3>
            <p className="font-light">
              We pledge 99.2%+ Grade A pure electrolytic copper verified by NABL metallurgical spectroscopy. In accordance with honest craft principles, we make no exaggerated medical claims; our recommendations reflect authentic classical Ayurvedic texts for Ushapan alongside scientific safety advice.
            </p>
          </section>

          <section className="space-y-2 pt-6 border-t border-[#B8964F]/25">
            <h3 className="font-serif text-2xl font-normal text-[#12302B]">
              3. Direct Fair Guild Remittance
            </h3>
            <p className="font-light">
              88% of net retail realization is disbursed directly into verified artisan bank accounts on rolling weekly cycles, safeguarding sustainable livelihoods for Uttarakhand metalsmith families.
            </p>
          </section>

          <section className="space-y-3 pt-6 border-t border-[#B8964F]/25">
            <h3 className="font-serif text-2xl font-normal text-[#12302B]">
              4. WhatsApp Communication Policy & DPDP Act 2023 Compliance
            </h3>
            <p className="font-light">
              Tamrashilp communicates over WhatsApp strictly under India&apos;s Digital Personal Data Protection Act, 2023 (DPDP Act) and Meta&apos;s WhatsApp Business Platform policies:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm list-disc pl-5 font-light">
              <li>
                <strong>Purpose Limitation:</strong> WhatsApp messaging is employed solely for transactional order confirmation, BlueDart courier dispatch tracking, delivery verification, and direct customer care initiated by the patron. We never send unsolicited marketing spam or broadcast promotions.
              </li>
              <li>
                <strong>Explicit Consent Record:</strong> Order notifications are dispatched only when a patron explicitly checks the consent checkbox at checkout or activates the toggle in their Profile. Consent timestamps and phone numbers are securely logged in our database.
              </li>
              <li>
                <strong>Immediate Opt-Out (STOP):</strong> You may revoke consent at any moment by texting &ldquo;STOP&rdquo;, &ldquo;UNSUBSCRIBE&rdquo;, or &ldquo;CANCEL&rdquo; to our WhatsApp support number (+91 94120 54321), or by toggling off alerts in your Account Profile.
              </li>
              <li>
                <strong>Retention & Delete-My-Data Requests:</strong> Support transcripts are stored for a maximum of 180 days to fulfill warranty and repair obligations, after which they are purged. Patrons may exercise their right to erasure under the DPDP Act by emailing <a href="mailto:privacy@tamtashilp.in" className="text-[#8C4E28] underline">privacy@tamtashilp.in</a>; all chat logs will be erased within 72 hours.
              </li>
              <li>
                <strong>Transparent Automation:</strong> Inbound queries may be processed by an automated assistant calibrated strictly on approved workshop facts. Patrons can transition immediately to a live Almora artisan by asking for a person or replying with &ldquo;5&rdquo;.
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
