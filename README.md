# Tamtashilp (टम्टाशिल्प)
> **"Handcrafted Copper. Heritage in Every Hammer Mark."**
> *(हस्तनिर्मित तांबा। हर हथौड़े की चोट में विरासत।)*

Tamtashilp is a production-ready, authentic e-commerce marketplace dedicated to traditional copper utensils handcrafted by generational Kumaoni coppersmiths (the **Tamta** community) of Almora, Bageshwar, and Champawat in Uttarakhand, India.

---

## 🎨 Brand Identity & Design System

- **Palette**:
  - Primary Copper: `#B87333`
  - Deep Burnt Umber: `#3B1F14`
  - Warm Cream: `#FAF3E8`
  - Antique Gold Accent: `#C9A24B`
  - Soft Sage Green (Success/Safe): `#4E6E58`
- **Typography**:
  - Headings: Serif (*Playfair Display* & *Cormorant Garamond*)
  - Body: Modern Sans (*Inter*)
  - Devanagari Support: *Rozha One* & *Yatra One* for Hindi
- **Textures & Details**:
  - Subtle hammered-copper ambient patterns (`.bg-hammered`)
  - Hand-drawn ornamental dividers (`.artisan-divider`)
  - Tactile card micro-animations and QR provenance certification badges
- **Bilingual Experience**:
  - 100% full English (`en`) and Hindi (`hi`) translation dictionary with persistent toggle.
- **Scientific & Ayurvedic Integrity**:
  - Clear traditional guidance regarding *Ushapan* (morning hydration).
  - Explicit safety guidance: never store acidic liquids (citrus, tamarind, yogurt, tomato) in unlined copper vessels.
  - Safe 99.9% food-grade tin lining (*Kalai*) for culinary cookware (kadhais, handis, topes).

---

## 🚀 Complete Feature Implementation (Phases 1 - 5)

### Phase 1: Brand Design, Catalog, Product Detail & Cart
- **Home Page**: Hero with anvil craft visual, craft video player modal, Almora tradition banner, featured collections, heirloom bestsellers, 4-stage interactive anvil journey, customer testimonials, and newsletter signup.
- **Shop Catalog**: Multi-filtering by Category, Price Range slider (₹1,000 - ₹5,000), Finish (Hammered / Plain Mirror / Engraved), Master Artisan, Rating 4.9★+, In-Stock Only, Sorting (Popularity, Price Low/High, Rating), Search with live suggestions.
- **Categories**: Water Bottles & Jugs, Lotas & Glasses, Cookware (Kadhai, Handi, Tope), Serveware & Tableware, Sacred Pooja Items, Heritage Gift Sets, Custom & Engraved Pieces.
- **Product Detail**: Image gallery with zoom and thumbnails, craft video embed, 12% GST breakdown, variant switchers (Capacity / Finish), stock status, Artisan Card with craft lineage, certified material specs, traditional cleaning guide, real-time Indian Pincode delivery estimator, verified customer reviews with photo submission, related pieces, and wishlist/compare shortcuts.
- **Slide-out Cart Drawer**: Quantity controls, Heirloom Eco-Gift Wrapping option (+₹99) with calligraphy note input, promo coupon validator (`HERITAGE10`, `TAMTAFREE`), GST calculation, and instant checkout link.

### Phase 2: Checkout, Payments, Order Tracking & Profile
- **Checkout**: Guest checkout or logged-in profile, address validation with Indian 6-digit Pincode check, online payment simulation (Razorpay UPI, GPay, Cards, NetBanking) and Cash on Delivery (COD) with pincode limit checks.
- **Order Tracking**: Live status journey (`Placed` → `Confirmed` → `Packed` → `Shipped` → `Out for Delivery` → `Delivered`), Shiprocket / BlueDart AWB tracking number, printable GST Tax Invoice (Form GST INV-1) with CGST (6%) and SGST (6%) breakups, and 15-day exchange request.
- **Patron Profile**: Personal profile details, saved addresses (Home / Work), order history with tracking links, and role switcher.

### Phase 3: Seller / Artisan Portal ("Sell on Tamtashilp")
- **Artisan Onboarding**: Workshop registration with craft cluster, years of experience, PAN, optional GSTIN, bank details, and artisan card upload.
- **Artisan Dashboard**:
  - Gross sales metrics and weekly scheduled payout tracker (88% artisan realization, 12% marketplace commission).
  - Product Catalog Manager: list new handcrafted vessels with stock, weight, dimensions, and making time.
  - Workshop Order Management: accept, mark packed, print BlueDart shipping labels, and enter tracking numbers.
  - Custom Commission Quotes: respond to patron bespoke orders.

### Phase 4: Master Administration & Content Management
- **Admin Console**: Platform GMV, net revenue, active artisans, pending workshop approvals, and logistics on-time performance.
- **Artisan Moderation**: Review and approve/suspend artisan workshop applications.
- **Catalog Moderation**: Purity certificate audits and bestsellers curation.
- **Promotions & Coupons**: Create and toggle discount voucher codes.
- **Dispute Resolution**: Customer sanctuary tickets for transit replacements.

### Phase 5: Extra Features, Authenticity & SEO
- **QR Provenance Passport**: Generates genuine scannable QR code linking to spectrochemical purity assay (99.2% Cu, lead/cadmium free) and artisan identity.
- **Product Comparison**: Side-by-side spec comparison table for up to 3 products (Purity, Capacity, Weight, Finish, Making time, Price, Artisan).
- **Direct WhatsApp Consultation**: Floating button for live artisan queries.
- **SEO & Performance**: OpenGraph metadata, JSON-LD Schema.org structured data for online stores, dynamic XML sitemap (`/sitemap.xml`), and robots configuration (`/robots.txt`).

---

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (App Router) + React 18 + Tailwind CSS
- **Icons**: Lucide React
- **QR Codes**: `qrcode`
- **Confetti**: `canvas-confetti`
- **Database & ORM**: Prisma ORM with SQLite (zero-dependency immediate local development, seamlessly switchable to PostgreSQL/Neon/Supabase)

---

## 📁 Project Structure

```
Tamtashilp/
├── prisma/
│   ├── schema.prisma       # Prisma schema (User, ArtisanProfile, Product, Order, etc.)
│   └── seed.js             # Seed dataset with 12 authentic copper vessels & artisans
├── src/
│   ├── app/
│   │   ├── admin/          # Admin Portal & Governance
│   │   ├── api/            # API Route handlers (products, orders, pincode, custom-order)
│   │   ├── artisans/       # Master Artisan profiles & workshop stories
│   │   ├── authenticity/   # NABL Purity & Provenance Guarantee
│   │   ├── blog/           # Heritage articles, cleaning guides, Ushapan rituals
│   │   ├── categories/     # Category showcase
│   │   ├── checkout/       # Secure checkout flow
│   │   ├── craft-process/  # 6-Stage Ancestral Anvil Journey
│   │   ├── custom-order/   # Bespoke commission request form
│   │   ├── faq/            # Frequently Asked Questions
│   │   ├── order/[orderId]/# Live order tracking & printable GST invoice
│   │   ├── product/[slug]/ # Product detail page with gallery & reviews
│   │   ├── profile/        # Customer profile & order history
│   │   ├── seller/         # Seller dashboard & registration
│   │   ├── shipping-returns# Shipping & 15-day return policies
│   │   ├── shop/           # Full catalog with multi-filters & search
│   │   ├── terms/          # Artisan Guild Charter & Terms
│   │   ├── wishlist/       # Saved items collection
│   │   ├── globals.css     # Hammered textures, gradients, typography
│   │   ├── layout.tsx      # Root layout, metadata, JSON-LD, global providers
│   │   ├── page.tsx        # Homepage
│   │   ├── robots.ts       # Dynamic robots.txt
│   │   └── sitemap.ts      # Dynamic XML sitemap
│   ├── components/
│   │   ├── common/         # ProductCard, TrustBadges, CompareModal, AuthenticityModal, WhatsApp
│   │   └── layout/         # Navbar with live search, Footer, CartDrawer
│   ├── lib/
│   │   ├── auth-context.tsx    # Role-based authentication & demo switchers
│   │   ├── cart-context.tsx    # Cart, gift wrap, coupons, GST calculations
│   │   ├── compare-context.tsx # 3-item product comparison drawer
│   │   ├── db.ts               # Prisma client singleton
│   │   ├── language-context.tsx# English / Hindi translation context
│   │   ├── mockData.ts         # 12 copper products, artisans, pincodes, coupons, blogs
│   │   ├── translations.ts     # Bilingual dictionary
│   │   └── wishlist-context.tsx# Wishlist management
│   └── types/
│       └── index.ts        # TypeScript definitions
├── .env.example            # Environment variables template
├── tailwind.config.js      # Custom copper palette and typography
└── package.json
```

---

## ⚙️ Environment Variables

Create `.env` in the root directory:

```env
# Database (SQLite out-of-the-box, or PostgreSQL)
DATABASE_URL="file:./dev.db"
# Or PostgreSQL:
# DATABASE_URL="postgresql://user:password@localhost:5432/tamtashilp?schema=public"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Razorpay Payments
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_tamtashilp_mock"
RAZORPAY_KEY_SECRET="mock_secret_copper_artisan_2026"

# Shiprocket Logistics
SHIPROCKET_API_EMAIL="logistics@tamtashilp.in"
SHIPROCKET_API_PASSWORD="secure_shiprocket_pass"

# Resend Email
RESEND_API_KEY="re_mock_resend_tamta"

# MSG91 SMS / OTP
MSG91_AUTH_KEY="mock_msg91_key"
MSG91_SENDER_ID="TAMTA"

# Auth Secret
NEXTAUTH_SECRET="tamtashilp_super_secret_jwt_salt_heritage_copper_12345"
NEXTAUTH_URL="http://localhost:3000"
```

---

## 💻 Local Setup & Execution Instructions

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Generate Database & Seed Data**:
   ```bash
   npm run prisma:generate
   npm run prisma:push
   npm run prisma:seed
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Production Build**:
   ```bash
   npm run build
   npm run start
   ```

---

## 🏷️ Test Coupons & Demo Credentials

- **Promo Coupons**:
  - `HERITAGE10`: 10% off orders above ₹1,499
  - `TAMTAFREE`: Flat ₹150 off (Equivalent to Free Express Shipping)
  - `DIWALI20`: 20% privilege savings on orders above ₹4,000
- **Demo Role Switcher**:
  - Built into the top navbar: instantly toggle between **Patron** (Customer), **Artisan** (Harish Tamta / Seller), and **Admin** (Curator Console) without signing in or out.

