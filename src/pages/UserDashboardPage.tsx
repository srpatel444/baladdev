import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  User, 
  ShoppingBag, 
  Heart, 
  MapPin, 
  Bell, 
  LogOut, 
  PackageCheck, 
  Truck, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import { ProductCard } from '../components/ProductCard';

export const UserDashboardPage: React.FC = () => {
  const { 
    currentUser, 
    orders, 
    wishlist, 
    products, 
    logoutUser, 
    setActiveTab, 
    showToast 
  } = useApp();

  const [activeTab, setActiveDashboardTab] = useState<'orders' | 'wishlist' | 'address' | 'profile'>('orders');

  const userOrders = orders; // currently populated mock orders

  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* User Header Profile Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-950 p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-black text-2xl border-2 border-white/20 shadow-md">
            {currentUser?.name.charAt(0) || 'U'}
          </div>
          <div>
            <span className="bg-orange-500/20 text-orange-300 border border-orange-500/30 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
              {currentUser?.role === 'admin' ? 'Store Administrator' : 'Valued Student / Member'}
            </span>
            <h1 className="text-xl sm:text-2xl font-black mt-1">{currentUser?.name || 'Customer Account'}</h1>
            <p className="text-xs text-blue-200">{currentUser?.email || 'customer@example.com'}</p>
          </div>
        </div>

        <button
          onClick={logoutUser}
          className="px-5 py-2.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-500/30 text-xs font-bold transition-colors flex items-center space-x-2 shrink-0"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Dashboard Sub-navigation Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-b border-gray-100 dark:border-gray-800 pb-4">
        {[
          { id: 'orders', label: 'My Orders', icon: ShoppingBag, count: userOrders.length },
          { id: 'wishlist', label: 'Wishlist', icon: Heart, count: wishlist.length },
          { id: 'address', label: 'Saved Addresses', icon: MapPin, count: 1 },
          { id: 'profile', label: 'Account Profile', icon: User },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveDashboardTab(tab.id as any)}
              className={`p-3.5 rounded-2xl flex items-center justify-center space-x-2 text-xs font-bold transition-all ${
                isActive
                  ? 'bg-blue-700 text-white shadow-md'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-gray-700/60 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${isActive ? 'bg-blue-900 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600'}`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content Display */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <h2 className="text-lg font-extrabold text-gray-900 dark:text-white">Order History & Tracking</h2>

          {userOrders.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700/60 space-y-3">
              <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto" />
              <p className="text-xs text-gray-500">You haven't placed any orders yet.</p>
              <button onClick={() => setActiveTab('shop')} className="px-5 py-2 bg-blue-700 text-white rounded-xl text-xs font-bold">
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {userOrders.map((order) => (
                <div key={order.id} className="p-6 rounded-3xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/60 shadow-xs space-y-4">
                  
                  {/* Order Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 dark:border-gray-700 pb-3">
                    <div>
                      <span className="text-xs font-extrabold text-blue-700 dark:text-blue-400 font-mono">
                        {order.orderNumber}
                      </span>
                      <p className="text-[11px] text-gray-400">Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        order.status === 'delivered' ? 'bg-emerald-100 text-emerald-800' :
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {(order.status || '').toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={item.product.id} className="flex items-center space-x-3 text-xs">
                        <img src={item.product.images[0]} alt={item.product.name} className="w-12 h-12 object-cover rounded-xl" />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-gray-900 dark:text-white truncate">{item.product.name}</p>
                          <p className="text-gray-400">Qty: {item.quantity} × ₹{item.product.discountPrice || item.product.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer & Tracking */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-gray-100 dark:border-gray-700 text-xs">
                    <div>
                      <span className="text-gray-500">Tracking AWB: </span>
                      <strong className="font-mono text-gray-800 dark:text-gray-200">{order.trackingNumber || 'N/A'}</strong>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <span className="text-gray-500 block text-[10px]">Total Paid</span>
                        <span className="font-extrabold text-blue-700 dark:text-blue-400 text-sm">₹{order.totalAmount}</span>
                      </div>

                      <button
                        onClick={() => showToast(`Downloading GST Invoice for ${order.orderNumber}...`)}
                        className="px-3.5 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold hover:bg-gray-200"
                      >
                        GST Invoice
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'wishlist' && (
        <div className="space-y-6">
          <h2 className="text-lg font-extrabold text-gray-900 dark:text-white">Saved Wishlist Items</h2>
          {wishlistedProducts.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700/60 space-y-3">
              <Heart className="w-12 h-12 text-gray-300 mx-auto" />
              <p className="text-xs text-gray-500">Your wishlist is currently empty.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {wishlistedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'address' && (
        <div className="space-y-6">
          <h2 className="text-lg font-extrabold text-gray-900 dark:text-white">Saved Shipping Addresses</h2>
          <div className="p-6 rounded-3xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/60 space-y-2 text-xs">
            <span className="bg-blue-100 text-blue-800 font-bold px-2.5 py-0.5 rounded-full text-[10px]">Default Home</span>
            <p className="font-bold text-gray-900 dark:text-white text-sm pt-1">{currentUser?.name}</p>
            <p className="text-gray-500">15, Balaji Residency, College Road, Nadiad, Gujarat - 387001</p>
            <p className="text-gray-500">Phone: +91 98980 12345</p>
          </div>
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="max-w-xl p-6 rounded-3xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/60 space-y-4 text-xs">
          <h2 className="text-lg font-extrabold text-gray-900 dark:text-white">Personal Account Information</h2>
          <div className="space-y-3">
            <div>
              <label className="block font-bold text-gray-500 mb-1">Full Name</label>
              <input type="text" readOnly value={currentUser?.name} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 font-bold" />
            </div>
            <div>
              <label className="block font-bold text-gray-500 mb-1">Email Address</label>
              <input type="text" readOnly value={currentUser?.email} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 font-bold" />
            </div>
            <div>
              <label className="block font-bold text-gray-500 mb-1">Registered Phone</label>
              <input type="text" readOnly value={currentUser?.phone || '+91 98980 12345'} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 font-bold" />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
