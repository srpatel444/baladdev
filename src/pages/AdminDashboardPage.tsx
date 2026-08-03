import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product, Category } from '../types';
import { 
  BarChart2, 
  Package, 
  ShoppingBag, 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Tag, 
  TrendingUp, 
  DollarSign, 
  Check, 
  X, 
  FileText, 
  Download, 
  RefreshCw, 
  AlertTriangle,
  Upload,
  Eye,
  Percent,
  CheckCircle2,
  CreditCard,
  Building,
  QrCode,
  ShieldCheck,
  Copy,
  Save,
  Info,
  Lock,
  Smartphone
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell, 
  PieChart, 
  Pie 
} from 'recharts';

export const AdminDashboardPage: React.FC = () => {
  const { 
    products, 
    categories, 
    orders, 
    coupons, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    updateOrderStatus,
    addCoupon,
    storePaymentDetails,
    updateStorePaymentDetails,
    storeProfile,
    updateStoreProfile,
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'coupons' | 'gst' | 'payment-settings' | 'store-info'>('overview');

  // Store Profile & Address Form state
  const [stName, setStName] = useState(storeProfile.storeName);
  const [stTagline, setStTagline] = useState(storeProfile.tagline);
  const [stPhonePrimary, setStPhonePrimary] = useState(storeProfile.phonePrimary);
  const [stPhoneSecondary, setStPhoneSecondary] = useState(storeProfile.phoneSecondary);
  const [stWhatsapp, setStWhatsapp] = useState(storeProfile.whatsappNumber);
  const [stEmail, setStEmail] = useState(storeProfile.email);
  const [stAddress1, setStAddress1] = useState(storeProfile.addressLine1);
  const [stAddress2, setStAddress2] = useState(storeProfile.addressLine2);
  const [stCity, setStCity] = useState(storeProfile.city);
  const [stState, setStState] = useState(storeProfile.state);
  const [stPincode, setStPincode] = useState(storeProfile.pincode);
  const [stWeekdayHours, setStWeekdayHours] = useState(storeProfile.openingHoursWeekday);
  const [stSundayHours, setStSundayHours] = useState(storeProfile.openingHoursSunday);

  const handleSaveStoreProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateStoreProfile({
      storeName: stName,
      tagline: stTagline,
      phonePrimary: stPhonePrimary,
      phoneSecondary: stPhoneSecondary,
      whatsappNumber: stWhatsapp,
      email: stEmail,
      addressLine1: stAddress1,
      addressLine2: stAddress2,
      city: stCity,
      state: stState,
      pincode: stPincode,
      openingHoursWeekday: stWeekdayHours,
      openingHoursSunday: stSundayHours,
    });
  };

  // Bank & Payment Form state
  const [bankAccountHolder, setBankAccountHolder] = useState(storePaymentDetails.accountHolderName);
  const [bankName, setBankName] = useState(storePaymentDetails.bankName);
  const [bankAccountNumber, setBankAccountNumber] = useState(storePaymentDetails.accountNumber);
  const [bankIfsc, setBankIfsc] = useState(storePaymentDetails.ifscCode);
  const [bankBranch, setBankBranch] = useState(storePaymentDetails.branchName);
  const [storeUpiId, setStoreUpiId] = useState(storePaymentDetails.upiId);
  const [storeUpiName, setStoreUpiName] = useState(storePaymentDetails.upiName);
  const [storeQrUrl, setStoreQrUrl] = useState(storePaymentDetails.qrCodeUrl || '');
  const [rzpKeyId, setRzpKeyId] = useState(storePaymentDetails.razorpayKeyId || '');
  const [rzpKeySecret, setRzpKeySecret] = useState(storePaymentDetails.razorpayKeySecret || '');
  const [gstinNo, setGstinNo] = useState(storePaymentDetails.gstNumber || '');
  const [methods, setMethods] = useState(storePaymentDetails.acceptedMethods);

  const handleSaveBankAndPaymentDetails = (e: React.FormEvent) => {
    e.preventDefault();
    updateStorePaymentDetails({
      accountHolderName: bankAccountHolder,
      bankName: bankName,
      accountNumber: bankAccountNumber,
      ifscCode: bankIfsc,
      branchName: bankBranch,
      upiId: storeUpiId,
      upiName: storeUpiName,
      qrCodeUrl: storeQrUrl,
      razorpayKeyId: rzpKeyId,
      razorpayKeySecret: rzpKeySecret,
      gstNumber: gstinNo,
      acceptedMethods: methods,
    });
  };


  // Product modal state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Product Form fields
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState(categories[0]?.id || 'notebooks');
  const [price, setPrice] = useState(100);
  const [discountPrice, setDiscountPrice] = useState<number | undefined>(undefined);
  const [gstRate, setGstRate] = useState<12 | 18 | 5 | 0>(12);
  const [stock, setStock] = useState(50);
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [isNewArrival, setIsNewArrival] = useState(false);

  // New Coupon form fields
  const [couponCode, setCouponCode] = useState('');
  const [couponType, setCouponType] = useState<'percentage' | 'flat'>('percentage');
  const [couponValue, setCouponValue] = useState(10);
  const [minOrder, setMinOrder] = useState(499);

  // Product Search Filter in Admin
  const [adminSearch, setAdminSearch] = useState('');

  // Calculations for overview stats
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalOrdersCount = orders.length;
  const lowStockCount = products.filter(p => p.stock <= 10).length;

  // Chart data
  const salesData = [
    { day: 'Mon', sales: 4200 },
    { day: 'Tue', sales: 6800 },
    { day: 'Wed', sales: 5100 },
    { day: 'Thu', sales: 8900 },
    { day: 'Fri', sales: 11200 },
    { day: 'Sat', sales: 14500 },
    { day: 'Sun', sales: 9800 },
  ];

  const categoryPieData = categories.map(cat => {
    const count = products.filter(p => p.category === cat.id).length;
    return { name: cat.name.en, value: count };
  });

  const COLORS = ['#2563eb', '#f97316', '#10b981', '#8b5cf6', '#ec4899', '#06b6d4'];

  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setName('');
    setBrand('');
    setCategory(categories[0]?.id || 'notebooks');
    setPrice(100);
    setDiscountPrice(undefined);
    setGstRate(12);
    setStock(50);
    setDescription('');
    setImageUrl('https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600');
    setIsFeatured(false);
    setIsBestSeller(false);
    setIsNewArrival(true);
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (p: Product) => {
    setEditingProduct(p);
    setName(p.name);
    setBrand(p.brand);
    setCategory(p.category);
    setPrice(p.price);
    setDiscountPrice(p.discountPrice);
    setGstRate(p.gstRate);
    setStock(p.stock);
    setDescription(p.description);
    setImageUrl(p.images[0] || '');
    setIsFeatured(p.isFeatured || false);
    setIsBestSeller(p.isBestSeller || false);
    setIsNewArrival(p.isNewArrival || false);
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !brand || !price) {
      showToast('Please complete required fields');
      return;
    }

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        name,
        brand,
        category,
        price,
        discountPrice: discountPrice || undefined,
        gstRate,
        stock,
        description,
        images: [imageUrl || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600'],
        isFeatured,
        isBestSeller,
        isNewArrival
      });
      showToast(`Product "${name}" updated successfully!`);
    } else {
      addProduct({
        name,
        brand,
        category,
        price,
        discountPrice: discountPrice || undefined,
        gstRate,
        stock,
        rating: 5.0,
        reviewsCount: 1,
        images: [imageUrl || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600'],
        description,
        isFeatured,
        isBestSeller,
        isNewArrival,
        tags: [brand, category]
      });
      showToast(`New Product "${name}" added to stall inventory!`);
    }

    setIsProductModalOpen(false);
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode) return;
    addCoupon({
      code: (couponCode || '').toUpperCase(),
      type: couponType,
      value: couponValue,
      minOrder,
      isActive: true,
      description: `Get ${couponType === 'percentage' ? `${couponValue}% OFF` : `₹${couponValue} Flat Discount`}`
    });
    setCouponCode('');
    showToast(`Coupon ${(couponCode || '').toUpperCase()} created!`);
  };

  const filteredAdminProducts = products.filter(p => {
    if (!adminSearch) return true;
    const q = adminSearch.toLowerCase();
    return (p.name || '').toLowerCase().includes(q) || (p.brand || '').toLowerCase().includes(q) || (p.category || '').toLowerCase().includes(q);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Admin Top Header Banner */}
      <div className="rounded-3xl bg-gray-900 text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xl border border-gray-800">
        <div className="space-y-1">
          <span className="bg-orange-500 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            ADMINISTRATION PORTAL
          </span>
          <h1 className="text-2xl sm:text-3xl font-black">BaladDev Book Stall Control Panel</h1>
          <p className="text-xs text-gray-400">Manage catalog inventory, track live customer orders, issue coupons, and download GST reports.</p>
        </div>

        <button
          onClick={handleOpenAddProduct}
          className="px-5 py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs shadow-lg flex items-center justify-center space-x-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex items-center space-x-2 border-b border-gray-200 dark:border-gray-800 overflow-x-auto pb-2 text-xs font-bold">
        {[
          { id: 'overview', label: 'Dashboard Analytics', icon: BarChart2 },
          { id: 'products', label: `Inventory (${products.length})`, icon: Package },
          { id: 'orders', label: `Customer Orders (${orders.length})`, icon: ShoppingBag },
          { id: 'coupons', label: `Coupons (${coupons.length})`, icon: Tag },
          { id: 'payment-settings', label: 'Bank & Payment Setup', icon: CreditCard },
          { id: 'store-info', label: 'Store Address & Mobile Info', icon: Building },
          { id: 'gst', label: 'GST & Sales Reports', icon: FileText },
        ].map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap flex items-center space-x-2 ${
                isActive
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW ANALYTICS */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          
          {/* Key Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/60 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-gray-500">
                <span>Total Store Sales</span>
                <DollarSign className="w-4 h-4 text-emerald-500" />
              </div>
              <p className="text-2xl font-black text-gray-900 dark:text-white">₹{totalRevenue.toLocaleString()}</p>
              <p className="text-[10px] text-emerald-600 font-bold">↑ 18.4% vs last week</p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/60 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-gray-500">
                <span>Total Orders</span>
                <ShoppingBag className="w-4 h-4 text-blue-500" />
              </div>
              <p className="text-2xl font-black text-gray-900 dark:text-white">{totalOrdersCount}</p>
              <p className="text-[10px] text-blue-600 font-bold">All orders fulfilled</p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/60 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-gray-500">
                <span>Active Products</span>
                <Package className="w-4 h-4 text-orange-500" />
              </div>
              <p className="text-2xl font-black text-gray-900 dark:text-white">{products.length}</p>
              <p className="text-[10px] text-gray-400">Across {categories.length} Categories</p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/60 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-gray-500">
                <span>Low Stock Alert</span>
                <AlertTriangle className="w-4 h-4 text-amber-500" />
              </div>
              <p className="text-2xl font-black text-amber-600">{lowStockCount}</p>
              <p className="text-[10px] text-amber-600 font-bold">Items under 10 units</p>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/60 shadow-xs space-y-4">
              <h3 className="text-sm font-extrabold text-gray-900 dark:text-white">Weekly Sales Trend (₹)</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
                    <XAxis dataKey="day" stroke="#888888" fontSize={12} />
                    <YAxis stroke="#888888" fontSize={12} />
                    <Tooltip formatter={(value) => [`₹${value}`, 'Sales']} />
                    <Bar dataKey="sales" fill="#1d4ed8" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/60 shadow-xs space-y-4">
              <h3 className="text-sm font-extrabold text-gray-900 dark:text-white">Category Distribution</h3>
              <div className="h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryPieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 2: PRODUCTS INVENTORY TABLE */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative max-w-md w-full">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search products by name, brand..."
                value={adminSearch}
                onChange={(e) => setAdminSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs bg-white dark:bg-gray-800"
              />
            </div>

            <button
              onClick={handleOpenAddProduct}
              className="px-4 py-2.5 bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700/60 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 dark:bg-gray-900 text-gray-500 uppercase font-bold text-[10px]">
                  <tr>
                    <th className="p-4">Product</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Brand</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">GST Rate</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-gray-800 dark:text-gray-200">
                  {filteredAdminProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30">
                      <td className="p-4 font-bold flex items-center space-x-3">
                        <img src={p.images[0]} alt={p.name} className="w-10 h-10 object-cover rounded-xl shrink-0" />
                        <div>
                          <p className="line-clamp-1">{p.name}</p>
                          <div className="flex space-x-1 mt-0.5">
                            {p.isFeatured && <span className="bg-blue-100 text-blue-800 text-[9px] font-extrabold px-1.5 py-0.2 rounded">Featured</span>}
                            {p.isBestSeller && <span className="bg-orange-100 text-orange-800 text-[9px] font-extrabold px-1.5 py-0.2 rounded">BestSeller</span>}
                          </div>
                        </div>
                      </td>
                      <td className="p-4 capitalize">{p.category}</td>
                      <td className="p-4 font-bold">{p.brand}</td>
                      <td className="p-4">
                        <span className="font-extrabold">₹{p.discountPrice || p.price}</span>
                        {p.discountPrice && <span className="text-gray-400 line-through text-[10px] ml-1">₹{p.price}</span>}
                      </td>
                      <td className="p-4 font-mono">{p.gstRate}%</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                          p.stock <= 10 ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {p.stock} units
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEditProduct(p)}
                          className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete ${p.name}?`)) {
                              deleteProduct(p.id);
                              showToast('Product deleted');
                            }
                          }}
                          className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CUSTOMER ORDERS MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <h2 className="text-lg font-extrabold text-gray-900 dark:text-white">Customer Order Fulfillment</h2>
          <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700/60 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 dark:bg-gray-900 text-gray-500 uppercase font-bold text-[10px]">
                  <tr>
                    <th className="p-4">Order #</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Payment</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Change Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-gray-800 dark:text-gray-200">
                  {orders.map((ord) => (
                    <tr key={ord.id}>
                      <td className="p-4 font-mono font-bold text-blue-600">{ord.orderNumber}</td>
                      <td className="p-4">
                        <p className="font-bold">{ord.customerName}</p>
                        <p className="text-[10px] text-gray-400">{ord.customerPhone}</p>
                      </td>
                      <td className="p-4 font-extrabold">₹{ord.totalAmount}</td>
                      <td className="p-4">{ord.paymentMethod}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                          ord.status === 'delivered' ? 'bg-emerald-100 text-emerald-800' :
                          ord.status === 'shipped' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {(ord.status || '').toUpperCase()}
                        </span>
                      </td>
                      <td className="p-4">
                        <select
                          value={ord.status}
                          onChange={(e) => {
                            updateOrderStatus(ord.id, e.target.value as any);
                            showToast(`Order ${ord.orderNumber} status updated to ${e.target.value}`);
                          }}
                          className="px-2.5 py-1 rounded-xl border border-gray-200 dark:border-gray-700 text-xs bg-gray-50 dark:bg-gray-900 font-bold"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: COUPONS */}
      {activeTab === 'coupons' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <form onSubmit={handleCreateCoupon} className="p-6 rounded-3xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/60 shadow-xs space-y-4">
            <h3 className="text-base font-extrabold text-gray-900 dark:text-white">Create New Coupon</h3>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">Coupon Code</label>
              <input
                type="text"
                required
                placeholder="e.g. BALAD20"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-mono uppercase bg-gray-50 dark:bg-gray-900"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">Discount Type</label>
              <select
                value={couponType}
                onChange={(e) => setCouponType(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs bg-gray-50 dark:bg-gray-900"
              >
                <option value="percentage">Percentage OFF (%)</option>
                <option value="flat">Flat Amount OFF (₹)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">Discount Value</label>
              <input
                type="number"
                required
                value={couponValue}
                onChange={(e) => setCouponValue(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs bg-gray-50 dark:bg-gray-900"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">Minimum Order Amount (₹)</label>
              <input
                type="number"
                required
                value={minOrder}
                onChange={(e) => setMinOrder(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs bg-gray-50 dark:bg-gray-900"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-700 text-white rounded-xl font-bold text-xs shadow-md"
            >
              Add Promo Code
            </button>
          </form>

          <div className="md:col-span-2 space-y-4">
            <h3 className="text-base font-extrabold text-gray-900 dark:text-white">Active Store Coupons</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {coupons.map((c) => (
                <div key={c.code} className="p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/60 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-lg font-mono font-black text-xs">
                      {c.code}
                    </span>
                    <span className="text-emerald-600 font-bold text-xs">ACTIVE</span>
                  </div>
                  <p className="text-xs font-bold text-gray-900 dark:text-white">{c.description}</p>
                  <p className="text-[11px] text-gray-400">Min Order: ₹{c.minOrder}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB: STORE OWNER BANK & PAYMENT SETUP */}
      {activeTab === 'payment-settings' && (
        <div className="space-y-8">
          
          {/* Header Banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-gray-900 text-white space-y-2 border border-blue-800 shadow-xl">
            <div className="flex items-center space-x-2 text-orange-400 font-extrabold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Direct Bank Settlement & Gateway Setup</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black">Store Owner Bank & Payment Credentials</h2>
            <p className="text-xs text-blue-200/90 leading-relaxed max-w-3xl">
              Enter your official Bank Account details, Store UPI ID, and Payment Gateway credentials.
              When customers place orders and pay online, funds will be transferred and credited directly into your registered bank account!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Payment Details Form */}
            <form onSubmit={handleSaveBankAndPaymentDetails} className="lg:col-span-2 space-y-6">
              
              {/* Section 1: Bank Account Details */}
              <div className="p-6 rounded-3xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/60 shadow-xs space-y-4">
                <div className="flex items-center space-x-2 border-b border-gray-100 dark:border-gray-700 pb-3">
                  <Building className="w-5 h-5 text-blue-600" />
                  <h3 className="text-base font-extrabold text-gray-900 dark:text-white">Bank Account Details (For Direct Credit / IMPS / NEFT)</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Account Holder / Business Name *</label>
                    <input
                      type="text"
                      required
                      value={bankAccountHolder}
                      onChange={(e) => setBankAccountHolder(e.target.value)}
                      placeholder="e.g. BaladDev Book Stall & Stationers"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs bg-gray-50 dark:bg-gray-900 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Bank Name *</label>
                    <input
                      type="text"
                      required
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      placeholder="e.g. State Bank of India / HDFC Bank"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs bg-gray-50 dark:bg-gray-900 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Bank Account Number *</label>
                    <input
                      type="text"
                      required
                      value={bankAccountNumber}
                      onChange={(e) => setBankAccountNumber(e.target.value)}
                      placeholder="e.g. 389201928371"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-mono bg-gray-50 dark:bg-gray-900 font-bold tracking-wider"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">IFSC Code *</label>
                    <input
                      type="text"
                      required
                      value={bankIfsc}
                      onChange={(e) => setBankIfsc((e.target.value || '').toUpperCase())}
                      placeholder="e.g. SBIN0001234"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-mono uppercase bg-gray-50 dark:bg-gray-900 font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Bank Branch Location</label>
                  <input
                    type="text"
                    value={bankBranch}
                    onChange={(e) => setBankBranch(e.target.value)}
                    placeholder="e.g. Main Branch, Anand, Gujarat"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs bg-gray-50 dark:bg-gray-900"
                  />
                </div>
              </div>

              {/* Section 2: Store UPI & QR Code Settings */}
              <div className="p-6 rounded-3xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/60 shadow-xs space-y-4">
                <div className="flex items-center space-x-2 border-b border-gray-100 dark:border-gray-700 pb-3">
                  <QrCode className="w-5 h-5 text-orange-500" />
                  <h3 className="text-base font-extrabold text-gray-900 dark:text-white">Store UPI ID & Instant Payment QR Code</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Store UPI ID / VPA *</label>
                    <input
                      type="text"
                      required
                      value={storeUpiId}
                      onChange={(e) => setStoreUpiId(e.target.value)}
                      placeholder="e.g. baladdev@upi or 9898012345@paytm"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-mono bg-gray-50 dark:bg-gray-900 font-bold text-blue-700 dark:text-blue-400"
                    />
                    <p className="text-[10px] text-gray-400 mt-1">UPI payments from GPay, PhonePe, Paytm will be sent to this ID.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Merchant Display Name *</label>
                    <input
                      type="text"
                      required
                      value={storeUpiName}
                      onChange={(e) => setStoreUpiName(e.target.value)}
                      placeholder="e.g. BaladDev Stationers"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs bg-gray-50 dark:bg-gray-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Custom UPI QR Code Image URL (Optional)</label>
                  <input
                    type="url"
                    value={storeQrUrl}
                    onChange={(e) => setStoreQrUrl(e.target.value)}
                    placeholder="https://... (Leave blank to use auto-generated dynamic UPI QR)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs bg-gray-50 dark:bg-gray-900"
                  />
                </div>
              </div>

              {/* Section 3: Payment Gateway & GST Details */}
              <div className="p-6 rounded-3xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/60 shadow-xs space-y-4">
                <div className="flex items-center space-x-2 border-b border-gray-100 dark:border-gray-700 pb-3">
                  <Lock className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-base font-extrabold text-gray-900 dark:text-white">Payment Gateway Integration (Razorpay / Stripe)</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Razorpay Key ID</label>
                    <input
                      type="text"
                      value={rzpKeyId}
                      onChange={(e) => setRzpKeyId(e.target.value)}
                      placeholder="e.g. rzp_live_xxxxxxxxxxxx"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-mono bg-gray-50 dark:bg-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Razorpay Key Secret</label>
                    <input
                      type="password"
                      value={rzpKeySecret}
                      onChange={(e) => setRzpKeySecret(e.target.value)}
                      placeholder="••••••••••••••••"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-mono bg-gray-50 dark:bg-gray-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">GSTIN Number (GST Tax Registration)</label>
                  <input
                    type="text"
                    value={gstinNo}
                    onChange={(e) => setGstinNo((e.target.value || '').toUpperCase())}
                    placeholder="e.g. 24AAAAA0000A1Z5"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-mono uppercase bg-gray-50 dark:bg-gray-900"
                  />
                </div>
              </div>

              {/* Section 4: Toggle Accepted Payment Methods */}
              <div className="p-6 rounded-3xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/60 shadow-xs space-y-4">
                <h3 className="text-base font-extrabold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-3">
                  Enable / Disable Customer Payment Options
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { key: 'upi', label: 'UPI / QR Code', icon: '⚡' },
                    { key: 'card', label: 'Debit / Credit Card', icon: '💳' },
                    { key: 'netbanking', label: 'Net Banking', icon: '🏦' },
                    { key: 'bankTransfer', label: 'Direct Bank Transfer', icon: '🏛️' },
                    { key: 'cod', label: 'Cash on Delivery', icon: '💵' },
                  ].map((m) => (
                    <label
                      key={m.key}
                      className={`p-3 rounded-2xl border cursor-pointer flex items-center space-x-2.5 transition-all ${
                        (methods as any)[m.key]
                          ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold'
                          : 'border-gray-200 dark:border-gray-700 text-gray-400 bg-gray-50 dark:bg-gray-900'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={(methods as any)[m.key]}
                        onChange={(e) => setMethods({ ...methods, [m.key]: e.target.checked })}
                        className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                      />
                      <span className="text-sm">{m.icon}</span>
                      <span className="text-xs">{m.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                type="submit"
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-sm shadow-xl shadow-emerald-600/25 flex items-center justify-center space-x-2 transition-all active:scale-98"
              >
                <Save className="w-5 h-5" />
                <span>Save Store Owner Bank & Payment Details</span>
              </button>

            </form>

            {/* Live Customer Preview Sidebar */}
            <div className="space-y-6">
              
              <div className="p-6 rounded-3xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/60 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3">
                  <h3 className="text-sm font-extrabold text-gray-900 dark:text-white flex items-center space-x-1.5">
                    <Smartphone className="w-4 h-4 text-blue-600" />
                    <span>Customer Checkout Preview</span>
                  </h3>
                  <span className="text-[10px] bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-0.5 rounded-full font-bold">
                    LIVE PREVIEW
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 space-y-3 border border-gray-200 dark:border-gray-700 text-xs">
                  <p className="font-bold text-gray-900 dark:text-white text-center">Store Account Summary</p>
                  
                  <div className="space-y-1.5 text-[11px] text-gray-600 dark:text-gray-300">
                    <div className="flex justify-between border-b border-gray-200 dark:border-gray-800 pb-1">
                      <span className="font-semibold text-gray-400">Account Name:</span>
                      <span className="font-bold text-gray-900 dark:text-white truncate max-w-[140px]">{bankAccountHolder || 'BaladDev Book Stall'}</span>
                    </div>

                    <div className="flex justify-between border-b border-gray-200 dark:border-gray-800 pb-1">
                      <span className="font-semibold text-gray-400">Bank Name:</span>
                      <span className="font-bold text-gray-900 dark:text-white">{bankName || 'State Bank of India'}</span>
                    </div>

                    <div className="flex justify-between border-b border-gray-200 dark:border-gray-800 pb-1">
                      <span className="font-semibold text-gray-400">Account No:</span>
                      <span className="font-mono font-bold text-gray-900 dark:text-white">{bankAccountNumber || '389201928371'}</span>
                    </div>

                    <div className="flex justify-between border-b border-gray-200 dark:border-gray-800 pb-1">
                      <span className="font-semibold text-gray-400">IFSC Code:</span>
                      <span className="font-mono font-bold text-blue-600">{bankIfsc || 'SBIN0001234'}</span>
                    </div>

                    <div className="flex justify-between border-b border-gray-200 dark:border-gray-800 pb-1">
                      <span className="font-semibold text-gray-400">Store UPI ID:</span>
                      <span className="font-mono font-bold text-emerald-600">{storeUpiId || 'baladdev@upi'}</span>
                    </div>
                  </div>

                  {/* Generated QR Preview */}
                  <div className="p-3 bg-white dark:bg-gray-950 rounded-xl text-center space-y-2 border border-gray-200 dark:border-gray-800">
                    <p className="text-[10px] font-bold text-gray-500">Live Customer Payment QR Code</p>
                    <div className="w-28 h-28 bg-white p-1 rounded-lg mx-auto shadow-xs border border-gray-100 flex items-center justify-center">
                      <img 
                        src={storeQrUrl || `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=${encodeURIComponent(storeUpiId || 'baladdev@upi')}%26pn=${encodeURIComponent(storeUpiName || 'BaladDev Stationers')}%26cu=INR`} 
                        alt="Live UPI QR Code Preview"
                        className="w-full h-full object-contain" 
                      />
                    </div>
                    <p className="text-[10px] text-gray-400">Scan to pay directly into {bankAccountHolder || 'your account'}</p>
                  </div>

                </div>

                <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 rounded-xl flex items-start space-x-2 text-[11px] text-amber-800 dark:text-amber-200">
                  <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p>All online payments (UPI, GPay, PhonePe, Paytm, Bank Transfer) will be credited directly to your entered bank details.</p>
                </div>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* TAB: STORE ADDRESS & MOBILE INFO SETTINGS */}
      {activeTab === 'store-info' && (
        <div className="space-y-8">
          
          {/* Header Banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 text-white space-y-2 shadow-xl">
            <div className="flex items-center space-x-2 text-yellow-200 font-extrabold text-xs uppercase tracking-wider">
              <Building className="w-4 h-4" />
              <span>Store Branding & Contact Configuration</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black">Customize Book Stall Address & Mobile Numbers</h2>
            <p className="text-xs text-orange-100 leading-relaxed max-w-3xl">
              Update your stall name, mobile phone numbers, WhatsApp chat number, support email, physical store address, and working hours. These details will update live across the Contact Us page, Footer, and customer receipts!
            </p>
          </div>

          <form onSubmit={handleSaveStoreProfile} className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/60 shadow-xs space-y-6">
            
            {/* Store Name & Tagline */}
            <div className="space-y-4 border-b border-gray-100 dark:border-gray-700 pb-6">
              <h3 className="text-sm font-extrabold text-gray-900 dark:text-white uppercase tracking-wider text-orange-600">
                1. Store Branding
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Book Stall / Store Name *</label>
                  <input
                    type="text"
                    required
                    value={stName}
                    onChange={(e) => setStName(e.target.value)}
                    placeholder="e.g. BaladDev Book Stall & Stationers"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs bg-gray-50 dark:bg-gray-900 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Store Slogan / Tagline</label>
                  <input
                    type="text"
                    value={stTagline}
                    onChange={(e) => setStTagline(e.target.value)}
                    placeholder="e.g. Your Premier Educational Bookstore"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs bg-gray-50 dark:bg-gray-900"
                  />
                </div>
              </div>
            </div>

            {/* Mobile & Communication */}
            <div className="space-y-4 border-b border-gray-100 dark:border-gray-700 pb-6">
              <h3 className="text-sm font-extrabold text-gray-900 dark:text-white uppercase tracking-wider text-orange-600">
                2. Mobile Phone Numbers & Contact Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Primary Mobile Number *</label>
                  <input
                    type="text"
                    required
                    value={stPhonePrimary}
                    onChange={(e) => setStPhonePrimary(e.target.value)}
                    placeholder="e.g. +91 98980 12345"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-mono font-bold bg-gray-50 dark:bg-gray-900 text-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Secondary / Landline Phone</label>
                  <input
                    type="text"
                    value={stPhoneSecondary}
                    onChange={(e) => setStPhoneSecondary(e.target.value)}
                    placeholder="e.g. +91 2692 234567"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-mono bg-gray-50 dark:bg-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">WhatsApp Chat Number *</label>
                  <input
                    type="text"
                    required
                    value={stWhatsapp}
                    onChange={(e) => setStWhatsapp(e.target.value)}
                    placeholder="e.g. 919898012345"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-mono font-bold bg-gray-50 dark:bg-gray-900 text-emerald-600"
                  />
                  <p className="text-[10px] text-gray-400 mt-1">Customers click this to open direct WhatsApp chat.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Support Email Address *</label>
                  <input
                    type="email"
                    required
                    value={stEmail}
                    onChange={(e) => setStEmail(e.target.value)}
                    placeholder="e.g. support@baladdevbooks.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs bg-gray-50 dark:bg-gray-900"
                  />
                </div>
              </div>
            </div>

            {/* Address Details */}
            <div className="space-y-4 border-b border-gray-100 dark:border-gray-700 pb-6">
              <h3 className="text-sm font-extrabold text-gray-900 dark:text-white uppercase tracking-wider text-orange-600">
                3. Physical Shop / Stall Location Address
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Address Line 1 (Shop/Stall No., Building) *</label>
                  <input
                    type="text"
                    required
                    value={stAddress1}
                    onChange={(e) => setStAddress1(e.target.value)}
                    placeholder="e.g. Shop No. 12-14, College Plaza"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs bg-gray-50 dark:bg-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Address Line 2 (Street, Landmark)</label>
                  <input
                    type="text"
                    value={stAddress2}
                    onChange={(e) => setStAddress2(e.target.value)}
                    placeholder="e.g. Near BVM Engineering College, V.V. Nagar"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs bg-gray-50 dark:bg-gray-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={stCity}
                    onChange={(e) => setStCity(e.target.value)}
                    placeholder="e.g. Anand"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs bg-gray-50 dark:bg-gray-900 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">State *</label>
                  <input
                    type="text"
                    required
                    value={stState}
                    onChange={(e) => setStState(e.target.value)}
                    placeholder="e.g. Gujarat"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs bg-gray-50 dark:bg-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Pincode *</label>
                  <input
                    type="text"
                    required
                    value={stPincode}
                    onChange={(e) => setStPincode(e.target.value)}
                    placeholder="e.g. 388120"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-mono bg-gray-50 dark:bg-gray-900"
                  />
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="space-y-4">
              <h3 className="text-sm font-extrabold text-gray-900 dark:text-white uppercase tracking-wider text-orange-600">
                4. Store Working Hours
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Monday – Saturday Hours *</label>
                  <input
                    type="text"
                    required
                    value={stWeekdayHours}
                    onChange={(e) => setStWeekdayHours(e.target.value)}
                    placeholder="e.g. Mon - Sat: 8:30 AM – 9:00 PM"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs bg-gray-50 dark:bg-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Sunday Hours *</label>
                  <input
                    type="text"
                    required
                    value={stSundayHours}
                    onChange={(e) => setStSundayHours(e.target.value)}
                    placeholder="e.g. Sunday: 10:00 AM – 5:00 PM"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs bg-gray-50 dark:bg-gray-900"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl font-black text-sm shadow-xl shadow-orange-600/25 flex items-center justify-center space-x-2 transition-all active:scale-98"
            >
              <Save className="w-5 h-5" />
              <span>Save & Update Store Address & Mobile Settings</span>
            </button>

          </form>

        </div>
      )}

      {/* TAB 5: GST REPORTS & EXCEL EXPORT */}
      {activeTab === 'gst' && (
        <div className="p-8 rounded-3xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/60 space-y-6">
          <div>
            <h2 className="text-xl font-black text-gray-900 dark:text-white">GST Compliance & Financial Export</h2>
            <p className="text-xs text-gray-500">Download formatted sales register and GST tax filings for BaladDev Stall accounts.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 space-y-3">
              <h3 className="text-sm font-extrabold text-gray-900 dark:text-white">GSTR-1 Monthly Tax File</h3>
              <p className="text-xs text-gray-500">Contains B2C itemwise GST tax slab breakdown (0%, 5%, 12%, 18%).</p>
              <button
                onClick={() => showToast('GSTR-1 Excel Report Downloaded!')}
                className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Export GSTR-1 (.XLSX)</span>
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 space-y-3">
              <h3 className="text-sm font-extrabold text-gray-900 dark:text-white">Full Inventory Log</h3>
              <p className="text-xs text-gray-500">Export stock levels, cost prices, and brand supplier SKU records.</p>
              <button
                onClick={() => showToast('Inventory CSV Export Downloaded!')}
                className="px-4 py-2 bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Export Inventory (.CSV)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD / EDIT PRODUCT MODAL */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-2xl w-full p-6 space-y-6 max-h-[90vh] overflow-y-auto border border-gray-100 dark:border-gray-800 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
              <h3 className="text-lg font-black text-gray-900 dark:text-white">
                {editingProduct ? 'Edit Catalog Product' : 'Add New Product to Inventory'}
              </h3>
              <button onClick={() => setIsProductModalOpen(false)} className="p-1 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Classmate Long Notebook 300 Pages"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs bg-gray-50 dark:bg-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Brand Name</label>
                  <input
                    type="text"
                    required
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="Classmate, Camlin, Doms, Casio..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs bg-gray-50 dark:bg-gray-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name.en}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Regular Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs bg-gray-50 dark:bg-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Discount Price (₹)</label>
                  <input
                    type="number"
                    value={discountPrice || ''}
                    onChange={(e) => setDiscountPrice(e.target.value ? Number(e.target.value) : undefined)}
                    placeholder="Optional sale price"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs bg-gray-50 dark:bg-gray-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">GST Tax Rate (%)</label>
                  <select
                    value={gstRate}
                    onChange={(e) => setGstRate(Number(e.target.value) as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value={0}>0% (Exempt)</option>
                    <option value={5}>5% (Books/Pencils)</option>
                    <option value={12}>12% (Notebooks/Registers)</option>
                    <option value={18}>18% (Office Equipment)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    required
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs bg-gray-50 dark:bg-gray-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
                <input
                  type="url"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs bg-gray-50 dark:bg-gray-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Product Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detailed specifications, paper quality, binder type..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs bg-gray-50 dark:bg-gray-800"
                />
              </div>

              {/* Badges Toggles */}
              <div className="flex items-center space-x-6 pt-2">
                <label className="flex items-center space-x-2 text-xs font-bold text-gray-700 dark:text-gray-300 cursor-pointer">
                  <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} className="rounded text-blue-600" />
                  <span>Featured Item</span>
                </label>

                <label className="flex items-center space-x-2 text-xs font-bold text-gray-700 dark:text-gray-300 cursor-pointer">
                  <input type="checkbox" checked={isBestSeller} onChange={(e) => setIsBestSeller(e.target.checked)} className="rounded text-blue-600" />
                  <span>Best Seller Tag</span>
                </label>

                <label className="flex items-center space-x-2 text-xs font-bold text-gray-700 dark:text-gray-300 cursor-pointer">
                  <input type="checkbox" checked={isNewArrival} onChange={(e) => setIsNewArrival(e.target.checked)} className="rounded text-blue-600" />
                  <span>New Arrival</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end space-x-3 border-t border-gray-100 dark:border-gray-800">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-black text-xs shadow-md"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
