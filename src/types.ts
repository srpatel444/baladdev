export type Language = 'en' | 'hi' | 'gu';

export type CategoryId = 
  | 'notebooks' 
  | 'pens' 
  | 'pencils' 
  | 'erasers' 
  | 'geometry-box' 
  | 'school-bags' 
  | 'water-bottles' 
  | 'lunch-boxes' 
  | 'art-craft' 
  | 'drawing-books' 
  | 'files-folders' 
  | 'office-supplies' 
  | 'books' 
  | 'calculators' 
  | 'printer-paper';

export interface Category {
  id: CategoryId;
  name: { en: string; hi: string; gu: string };
  iconName: string;
  image: string;
  itemCount: number;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
  images?: string[];
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  barcode: string;
  productCode: string;
  brand: string;
  category: CategoryId;
  description: string;
  specifications: Record<string, string>;
  price: number; // Regular price
  discountPrice?: number; // Sale price
  discountPercent?: number;
  gstRate: number; // e.g. 5, 12, 18
  stock: number;
  rating: number;
  reviewCount: number;
  images: string[];
  tags: string[];
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  reviews?: Review[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Coupon {
  code: string;
  type: 'percentage' | 'flat' | 'bogo';
  value: number; // percentage off or flat amount in INR
  minSpend?: number;
  description: string;
  expiryDate?: string;
  isFestivalOffer?: boolean;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  type: 'Home' | 'Work' | 'School/College';
  isDefault?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: 'user' | 'admin';
  addresses: Address[];
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: Address;
  items: CartItem[];
  subtotal: number;
  gstAmount: number;
  shippingFee: number;
  discountAmount: number;
  couponCode?: string;
  totalAmount: number;
  paymentMethod: 'UPI' | 'GPay' | 'PhonePe' | 'Paytm' | 'Card' | 'NetBanking' | 'COD';
  paymentStatus: 'Paid' | 'Pending';
  orderStatus: 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  trackingNumber: string;
  estimatedDelivery: string;
}

export interface FilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
  brand: string;
  inStockOnly: boolean;
  minRating: number;
  searchQuery: string;
  sortBy: 'newest' | 'price-low' | 'price-high' | 'best-selling' | 'top-rated';
}

export interface AdminStats {
  totalSales: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
}

export interface StoreProfileDetails {
  storeName: string;
  tagline: string;
  phonePrimary: string;
  phoneSecondary: string;
  whatsappNumber: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  openingHoursWeekday: string;
  openingHoursSunday: string;
}

export interface StorePaymentDetails {
  accountHolderName: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  branchName: string;
  upiId: string;
  upiName: string;
  qrCodeUrl?: string;
  razorpayKeyId?: string;
  razorpayKeySecret?: string;
  gstNumber?: string;
  acceptedMethods: {
    upi: boolean;
    card: boolean;
    netbanking: boolean;
    bankTransfer: boolean;
    cod: boolean;
  };
}

