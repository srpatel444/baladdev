import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Language, 
  Product, 
  Category, 
  CartItem, 
  Coupon, 
  User, 
  Order, 
  FilterState,
  StorePaymentDetails,
  StoreProfileDetails
} from '../types';

import { translations } from '../lib/translations';
import { 
  INITIAL_CATEGORIES, 
  INITIAL_PRODUCTS, 
  INITIAL_COUPONS, 
  INITIAL_ORDERS 
} from '../data/mockData';
import {
  seedInitialFirestoreData,
  subscribeProducts,
  saveProductToFirestore,
  deleteProductFromFirestore,
  subscribeOrders,
  saveOrderToFirestore,
  updateOrderStatusInFirestore,
  subscribeCoupons,
  saveCouponToFirestore,
  subscribeStoreSettings,
  saveStoreProfileToFirestore,
  saveStorePaymentDetailsToFirestore
} from '../services/firebaseService';

const DEFAULT_FILTER_STATE: FilterState = {
  category: 'all',
  minPrice: 0,
  maxPrice: 3000,
  brand: 'all',
  inStockOnly: false,
  minRating: 0,
  searchQuery: '',
  sortBy: 'newest',
};

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  
  // Navigation & UI state
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;
  selectedProductDetail: Product | null;
  setSelectedProductDetail: (product: Product | null) => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isCompareModalOpen: boolean;
  setIsCompareModalOpen: (open: boolean) => void;
  
  // Catalog & Filter
  products: Product[];
  categories: Category[];
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  addProduct: (product: Product) => void;
  editProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  
  // Shopping Cart & Coupons
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  
  // Wishlist & Comparison & History
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  comparedProducts: Product[];
  toggleCompare: (product: Product) => void;
  recentlyViewed: Product[];
  addRecentlyViewed: (product: Product) => void;
  
  // Auth & User Profile
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  loginUser: (email: string, pass: string) => boolean;
  registerUser: (name: string, email: string, phone: string) => void;
  logoutUser: () => void;
  
  // Orders & Admin
  orders: Order[];
  createOrder: (orderData: Partial<Order>) => Order;
  updateOrderStatus: (orderId: string, status: Order['orderStatus']) => void;
  coupons: Coupon[];
  addCoupon: (coupon: Coupon) => void;
  
  // Store Owner Payment & Profile Details
  storePaymentDetails: StorePaymentDetails;
  updateStorePaymentDetails: (details: Partial<StorePaymentDetails>) => void;
  storeProfile: StoreProfileDetails;
  updateStoreProfile: (profile: Partial<StoreProfileDetails>) => void;
  
  // Toast notifications
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProductDetail, setSelectedProductDetail] = useState<Product | null>(null);
  
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);
  
  // Stored state from localStorage if available
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('bdb_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });
  
  const [categories] = useState<Category[]>(INITIAL_CATEGORIES);
  
  const [filterState, setFilterState] = useState<FilterState>(DEFAULT_FILTER_STATE);
  
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('bdb_cart');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    const saved = localStorage.getItem('bdb_coupon');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('bdb_wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [comparedProducts, setComparedProducts] = useState<Product[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('bdb_user');
    return saved ? JSON.parse(saved) : {
      id: 'usr-default',
      name: 'Rohan Patel',
      email: 'rohan.patel@example.com',
      phone: '+91 98980 12345',
      role: 'user',
      addresses: [
        {
          id: 'addr-usr-1',
          fullName: 'Rohan Patel',
          phone: '+91 98980 12345',
          street: '15, Balaji Residency, College Road',
          city: 'Nadiad',
          state: 'Gujarat',
          pincode: '387001',
          type: 'Home',
          isDefault: true
        }
      ]
    };
  });
  
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('bdb_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });
  
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('bdb_coupons');
    return saved ? JSON.parse(saved) : INITIAL_COUPONS;
  });

  const defaultPaymentDetails: StorePaymentDetails = {
    accountHolderName: 'BaladDev Book Stall & Stationers',
    bankName: 'State Bank of India',
    accountNumber: '389201928371',
    ifscCode: 'SBIN0001234',
    branchName: 'Main Branch, Anand, Gujarat',
    upiId: 'baladdev@upi',
    upiName: 'BaladDev Stationers',
    qrCodeUrl: '',
    razorpayKeyId: 'rzp_test_9876543210',
    razorpayKeySecret: 'wXyZ1234567890',
    gstNumber: '24AAAAA0000A1Z5',
    acceptedMethods: {
      upi: true,
      card: true,
      netbanking: true,
      bankTransfer: true,
      cod: true,
    }
  };

  const [storePaymentDetails, setStorePaymentDetails] = useState<StorePaymentDetails>(() => {
    const saved = localStorage.getItem('bdb_store_payment_details');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...defaultPaymentDetails,
          ...parsed,
          acceptedMethods: {
            ...defaultPaymentDetails.acceptedMethods,
            ...(parsed.acceptedMethods || {})
          }
        };
      } catch (e) {
        console.error(e);
      }
    }
    return defaultPaymentDetails;
  });

  const updateStorePaymentDetails = (details: Partial<StorePaymentDetails>) => {
    setStorePaymentDetails(prev => {
      const updated = { 
        ...prev, 
        ...details,
        acceptedMethods: {
          ...prev.acceptedMethods,
          ...(details.acceptedMethods || {})
        }
      };
      localStorage.setItem('bdb_store_payment_details', JSON.stringify(updated));
      saveStorePaymentDetailsToFirestore(updated);
      return updated;
    });
    showToast('Store Payment & Bank Details updated successfully!');
  };

  const defaultStoreProfile: StoreProfileDetails = {
    storeName: 'BaladDev Book Stall & Stationers',
    tagline: 'Your Premier Book Stall & Educational Stationers',
    phonePrimary: '+91 98980 12345',
    phoneSecondary: '+91 2692 234567',
    whatsappNumber: '919898012345',
    email: 'support@baladdevbooks.com',
    addressLine1: 'Shop No. 12-14, College Plaza',
    addressLine2: 'Near BVM Engineering College, V.V. Nagar',
    city: 'Anand',
    state: 'Gujarat',
    pincode: '388120',
    openingHoursWeekday: 'Mon - Sat: 8:30 AM – 9:00 PM',
    openingHoursSunday: 'Sunday: 10:00 AM – 5:00 PM',
  };

  const [storeProfile, setStoreProfile] = useState<StoreProfileDetails>(() => {
    const saved = localStorage.getItem('bdb_store_profile');
    if (saved) {
      try {
        return { ...defaultStoreProfile, ...JSON.parse(saved) };
      } catch (e) {
        console.error(e);
      }
    }
    return defaultStoreProfile;
  });

  const updateStoreProfile = (profile: Partial<StoreProfileDetails>) => {
    setStoreProfile(prev => {
      const updated = { ...prev, ...profile };
      localStorage.setItem('bdb_store_profile', JSON.stringify(updated));
      saveStoreProfileToFirestore(updated);
      return updated;
    });
    showToast('Store Profile & Address settings saved!');
  };
  
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync with Firebase Firestore real-time database
  useEffect(() => {
    seedInitialFirestoreData(defaultStoreProfile, defaultPaymentDetails);

    const unsubProducts = subscribeProducts((items) => {
      if (items && items.length > 0) setProducts(items);
    });
    const unsubOrders = subscribeOrders((items) => {
      if (items) setOrders(items);
    });
    const unsubCoupons = subscribeCoupons((items) => {
      if (items && items.length > 0) setCoupons(items);
    });
    const unsubSettings = subscribeStoreSettings(
      (prof) => setStoreProfile(prev => ({ ...prev, ...prof })),
      (pay) => setStorePaymentDetails(prev => ({ ...prev, ...pay, acceptedMethods: { ...prev.acceptedMethods, ...(pay.acceptedMethods || {}) } }))
    );

    return () => {
      unsubProducts();
      unsubOrders();
      unsubCoupons();
      unsubSettings();
    };
  }, []);


  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('bdb_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('bdb_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem('bdb_coupon', JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem('bdb_coupon');
    }
  }, [appliedCoupon]);

  useEffect(() => {
    localStorage.setItem('bdb_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('bdb_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('bdb_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('bdb_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('bdb_coupons', JSON.stringify(coupons));
  }, [coupons]);

  // Dark mode effect
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  const resetFilters = () => {
    setFilterState(DEFAULT_FILTER_STATE);
  };

  const addProduct = (newProd: Product) => {
    setProducts(prev => [newProd, ...prev]);
    saveProductToFirestore(newProd);
    showToast(`Product "${newProd.name.substring(0, 20)}..." added successfully!`);
  };

  const editProduct = (updatedProd: Product) => {
    setProducts(prev => prev.map(p => (p.id === updatedProd.id ? updatedProd : p)));
    saveProductToFirestore(updatedProd);
    showToast(`Product updated!`);
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    deleteProductFromFirestore(id);
    showToast('Product removed!');
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added ${product.name.substring(0, 22)}... to cart!`);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast('Item removed from cart');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string) => {
    const cleanCode = (code || '').trim().toUpperCase();
    const found = coupons.find(c => (c.code || '').toUpperCase() === cleanCode);
    if (!found) {
      return { success: false, message: 'Invalid coupon code!' };
    }
    setAppliedCoupon(found);
    showToast(`Coupon ${found.code} applied!`);
    return { success: true, message: `Coupon ${found.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed');
  };

  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        showToast('Removed from wishlist');
        return prev.filter(p => p.id !== product.id);
      } else {
        showToast('Added to wishlist!');
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(p => p.id === productId);
  };

  const toggleCompare = (product: Product) => {
    setComparedProducts(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        showToast('Removed from comparison');
        return prev.filter(p => p.id !== product.id);
      } else {
        if (prev.length >= 4) {
          showToast('You can compare up to 4 products at a time.');
          return prev;
        }
        showToast('Added to comparison tool');
        return [...prev, product];
      }
    });
  };

  const addRecentlyViewed = (product: Product) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      return [product, ...filtered].slice(0, 8);
    });
  };

  const loginUser = (email: string, pass: string) => {
    // Simple demo login logic
    const demoUser: User = {
      id: 'usr-1',
      name: email.split('@')[0] || 'Customer',
      email: email,
      phone: '+91 98765 00000',
      role: email.includes('admin') ? 'admin' : 'user',
      addresses: [
        {
          id: 'addr-demo',
          fullName: 'Valued Customer',
          phone: '+91 98765 00000',
          street: '10, Station Road',
          city: 'Vadodara',
          state: 'Gujarat',
          pincode: '390001',
          type: 'Home',
          isDefault: true
        }
      ]
    };
    setCurrentUser(demoUser);
    showToast(`Welcome back, ${demoUser.name}!`);
    return true;
  };

  const registerUser = (name: string, email: string, phone: string) => {
    const newUser: User = {
      id: 'usr-' + Date.now(),
      name,
      email,
      phone,
      role: 'user',
      addresses: []
    };
    setCurrentUser(newUser);
    showToast(`Account created for ${name}!`);
  };

  const logoutUser = () => {
    setCurrentUser(null);
    showToast('Logged out successfully');
  };

  const createOrder = (orderData: Partial<Order>): Order => {
    const newOrder: Order = {
      id: 'ord-' + Date.now(),
      orderNumber: 'BDB-2026-' + Math.floor(1000 + Math.random() * 9000),
      date: new Date().toISOString().split('T')[0],
      customerName: currentUser?.name || orderData.customerName || 'Guest Customer',
      customerEmail: currentUser?.email || orderData.customerEmail || 'guest@example.com',
      customerPhone: currentUser?.phone || orderData.customerPhone || '+91 98000 00000',
      shippingAddress: orderData.shippingAddress || {
        id: 'addr-new',
        fullName: orderData.customerName || 'Customer',
        phone: orderData.customerPhone || '+91 98000 00000',
        street: 'Main Bazaar',
        city: 'Anand',
        state: 'Gujarat',
        pincode: '388001',
        type: 'Home'
      },
      items: orderData.items || cart,
      subtotal: orderData.subtotal || 0,
      gstAmount: orderData.gstAmount || 0,
      shippingFee: orderData.shippingFee || 0,
      discountAmount: orderData.discountAmount || 0,
      couponCode: appliedCoupon?.code,
      totalAmount: orderData.totalAmount || 0,
      paymentMethod: orderData.paymentMethod || 'UPI',
      paymentStatus: 'Paid',
      orderStatus: 'Processing',
      trackingNumber: 'DEL-BD-' + Math.floor(1000000 + Math.random() * 9000000),
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    };

    setOrders(prev => [newOrder, ...prev]);
    saveOrderToFirestore(newOrder);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['orderStatus']) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, orderStatus: status } : o))
    );
    updateOrderStatusInFirestore(orderId, status);
    showToast(`Order status updated to ${status}`);
  };

  const addCoupon = (newCoupon: Coupon) => {
    setCoupons(prev => [newCoupon, ...prev]);
    saveCouponToFirestore(newCoupon);
    showToast(`Coupon code ${newCoupon.code} created!`);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        theme,
        toggleTheme,
        activeTab,
        setActiveTab,
        selectedCategory,
        setSelectedCategory,
        selectedProductDetail,
        setSelectedProductDetail,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isCompareModalOpen,
        setIsCompareModalOpen,
        products,
        categories,
        filterState,
        setFilterState,
        resetFilters,
        addProduct,
        editProduct,
        deleteProduct,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        wishlist,
        toggleWishlist,
        isInWishlist,
        comparedProducts,
        toggleCompare,
        recentlyViewed,
        addRecentlyViewed,
        currentUser,
        setCurrentUser,
        loginUser,
        registerUser,
        logoutUser,
        orders,
        createOrder,
        updateOrderStatus,
        coupons,
        addCoupon,
        storePaymentDetails,
        updateStorePaymentDetails,
        storeProfile,
        updateStoreProfile,
        toastMessage,
        showToast,
      }}
    >
      {children}

      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 px-5 py-3 rounded-full shadow-2xl flex items-center space-x-2 text-sm font-medium animate-bounce border border-gray-700">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
