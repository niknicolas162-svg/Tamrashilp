export type FinishType = 'HAMMERED' | 'PLAIN' | 'ENGRAVED';

export type UserRole = 'CUSTOMER' | 'SELLER' | 'ADMIN';

export type OrderStatus =
  | 'PLACED'
  | 'CONFIRMED'
  | 'PACKED'
  | 'SHIPPED'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'CANCELLED';

export type PaymentMethod = 'RAZORPAY' | 'COD';
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';

export interface Artisan {
  id: string;
  name: string;
  nameHi?: string;
  workshopName: string;
  workshopNameHi?: string;
  region: string;
  regionHi?: string;
  village?: string;
  story: string;
  storyHi?: string;
  avatar: string;
  yearsOfExperience: number;
  specialty: string;
  specialtyHi?: string;
  rating: number;
  totalSales: number;
  craftCertification: string;
  isVerified: boolean;
}

export interface ProductVariant {
  id: string;
  name: string;
  nameHi?: string;
  capacity?: string;
  finish?: FinishType;
  price: number;
  comparePrice?: number;
  stock: number;
  sku: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
  images?: string[];
  artisanReply?: string;
}

export interface Product {
  id: string;
  title: string;
  titleHi: string;
  slug: string;
  categoryId: string;
  categoryName: string;
  categoryNameHi?: string;
  artisanId: string;
  artisan: Artisan;
  basePrice: number;
  comparePrice?: number;
  purityRating: string;
  purityCertificationNo: string;
  finish: FinishType;
  capacity?: string;
  weightGrams: number;
  dimensions: string;
  makingTimeDays: number;
  hoursOfLabor?: number;
  anvilBlows?: number;
  village?: string;
  curatorNote?: string;
  stock: number;
  isFeatured: boolean;
  isBestseller: boolean;
  images: string[];
  videoUrl?: string;
  shortDescription: string;
  shortDescriptionHi: string;
  description: string;
  descriptionHi: string;
  careInstructions: string[];
  careInstructionsHi?: string[];
  safetyNotice: string;
  safetyNoticeHi?: string;
  customOrderAvailable: boolean;
  qrCodeUrl?: string;
  variants?: ProductVariant[];
  reviewsCount: number;
  rating: number;
  reviews?: Review[];
}

export interface Category {
  id: string;
  name: string;
  nameHi: string;
  slug: string;
  description: string;
  descriptionHi: string;
  image: string;
  itemCount: number;
}

export interface CartItem {
  productId: string;
  variantId?: string;
  product: Product;
  quantity: number;
  selectedFinish?: FinishType;
  selectedCapacity?: string;
  unitPrice: number;
  customEngraving?: {
    text: string;
    cost: number;
    script?: string;
  };
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
  type: 'HOME' | 'WORK' | 'OTHER';
}

export interface OrderItemRecord {
  productId: string;
  title: string;
  variantName?: string;
  price: number;
  quantity: number;
  finish?: string;
  capacity?: string;
  image: string;
  artisanName: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  status: OrderStatus;
  items: OrderItemRecord[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  giftWrapFee: number;
  isGift: boolean;
  giftMessage?: string;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paymentId?: string;
  shippingAddress: Address;
  carrier: string;
  trackingNumber: string;
  trackingTimeline: {
    status: OrderStatus;
    timestamp: string;
    description: string;
    location: string;
    completed: boolean;
  }[];
}

export interface Coupon {
  code: string;
  discountType: 'PERCENTAGE' | 'FLAT';
  discountValue: number;
  minOrderValue: number;
  description: string;
}

export interface CustomOrderRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  utensilType: string;
  dimensions: string;
  engravingText?: string;
  quantity: number;
  budgetRange: string;
  notes: string;
  status: 'PENDING' | 'REVIEWED' | 'QUOTED' | 'ACCEPTED' | 'IN_PRODUCTION' | 'COMPLETED';
  quoteAmount?: number;
  quoteNotes?: string;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  titleHi: string;
  excerpt: string;
  excerptHi: string;
  content: string;
  contentHi: string;
  coverImage: string;
  author: string;
  authorRole: string;
  category: string;
  readTime: string;
  date: string;
}
