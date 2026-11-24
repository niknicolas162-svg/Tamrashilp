# Tamrashilp (ताम्रशिल्प)
> **"Struck by hand. Kept for generations."**  
> *(हाथों से गढ़ा गया। पीढ़ियों तक संजोया गया।)*

**Tamrashilp** is a luxury heritage marketplace dedicated to handcrafted pure copper utensils forged by master coppersmith **Devendra Kumar Tamta** of Almora, Uttarakhand, India. Designed around the concept of **"The Antique Atelier"**—a quiet, museum-meets-boutique sanctuary honoring 500 years of Kumaoni coppersmith lineage.

---

## 🏛 The Master Craftsman

Every utensil in the atelier is shaped by **Devendra Kumar Tamta**, carrying forward the generational horn-anvil coppersmith lineage of Tamta Mohalla, Almora.
- **Ancestral Workshop**: Shree Tamreshwar Atelier & Guild, Tamta Mohalla, Almora, Uttarakhand.
- **Philosophy**: Hand-raised from single sheets of virgin copper over mountain charcoal embers, without mechanical dies, industrial casting, or toxic synthetic lacquers.
- **Dedicated Profile**: Accessible at [`/master-craftsman`](https://github.com/niknicolas162-svg/Tamrashilp) with archival provenance and Schema.org `Person` structured data.

---

## 🎨 Design System: "The Antique Atelier"

### Color Tokens (Strict Contrast-Checked)
- **Patina (`#12302B`)**: Deep oxidized green, dark ground canvas.
- **Parchment (`#EFE4CF`)**: Warm, non-glare light ground texture.
- **Aged Ivory (`#FAF4E8`)**: Museum card surfaces, text on dark ground.
- **Walnut Ink (`#2A1A12`)**: Primary text on light parchment (12:1 contrast ratio, never harsh pure `#000`).
- **Antique Brass (`#B8964F`)**: Fine rules, borders, and wax-seal badges.
- **Copper-Text (`#8C4E28`)**: Contrast-checked copper text, links, and action button fills (~5:1 on parchment).
- **Sage Green (`#4E6E58`)**: In-stock, authentic pass, and verified states.

### Typography Hierarchy
- **Brand Logo**: *Cinzel* (tracked caps, centred with anvil-and-hammer insignia).
- **Headings**: *Cormorant Garamond* (light, graceful serif).
- **Body Prose**: *EB Garamond* (17.5px, 1.7 line-height, max 70ch).
- **UI Elements**: *Jost* (sentence-case, legible sans-serif).
- **Devanagari (Hindi)**: *Tiro Devanagari Hindi* & *Noto Serif Devanagari* (zero letter-spacing for ligature harmony).

---

## ✨ Key Atelier Features

1. **Live Debossed Engraving Visualizer (`/custom-order` & Product Pages)**:
   - Live debossed simulation on hammered copper in English & Devanagari script.
   - Calculates per-character pricing and saves custom text directly to order items.
2. **Numbered Provenance Certificates (`/certificate/[id]`)**:
   - Digital certificates generated with unique QR codes recording the master artisan, village, hours of work, and making date.
   - Honest "Hand-checked pure copper" disclosure.
3. **The Making: Six Ceremonial Steps (`/craft-process`)**:
   - Slicing virgin ingots, horn-anvil raising, oak charcoal annealing, Chitai stipple hammering, traditional pure Kalai tinning, and mountain tamarind washing.
4. **Occasion Collections (`/collections` & `/collections/[slug]`)**:
   - Curated wedding, Griha Pravesh, sacred pooja, newborn, anniversary, and corporate bulk commission folios.
5. **Re-tinning (Kalai) Service (`/services/kalai`)**:
   - Traditional food-grade tinning service price estimator, doorstep pickup booking, and 4-step status tracker.
6. **Patron Sanctuary & Care Vault (`/profile/collection`)**:
   - Registered piece vault tracking patrons' copperware with 12-month Kalai re-tinning reminders.
7. **Authenticity Guide (`/care/authenticity-guide`)**:
   - 6 sensory hallmarks distinguishing hand-hammered copper from machine-pressed industrial copies.
8. **WhatsApp Concierge & Notifications**:
   - Bottom-right floating WhatsApp button with pre-filled inquiries by page context.
   - Cloud API webhook architecture with support hour detection (IST) and opt-in order status updates.
   - Official atelier Instagram linked to [@tamrasshilp](https://instagram.com/tamrasshilp).
9. **shadcn/ui Component Architecture**:
   - Fully integrated Radix UI primitives (`button`, `sheet`, `input`, `label`, `navigation-menu`) with custom theme tokens.

---

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.6
- **Styling**: Tailwind CSS 3.4 + `tailwindcss-animate` + `class-variance-authority`
- **UI Primitives**: Radix UI & shadcn project structure
- **Database & ORM**: Prisma ORM with SQLite (instantly portable to PostgreSQL)
- **Logistics & QR**: `qrcode`, `canvas-confetti`, `lucide-react`

---

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/niknicolas162-svg/Tamrashilp.git
cd Tamrashilp
npm install
```

### 2. Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 3. Generate Database Client & Seed
```bash
npx prisma generate
npx prisma db push
```

### 4. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Production Build & Deployment (Vercel)

The repository is pre-configured for zero-friction Vercel deployments:
```bash
npm run build
```
During build:
1. `postinstall` runs `prisma generate` to synthesize typed client models.
2. `next build` pre-renders all 40 static folios and server routes with `<Suspense>` boundary protection.

---

## 📜 Guild Charter & License

Crafted with reverence for the ancient metalworking traditions of Kumaon, Uttarakhand.  
© 2026 Tamrashilp Artisanal Atelier. All rights reserved.
