import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  BookOpen, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  ShieldCheck, 
  CreditCard, 
  CheckCircle2, 
  Heart 
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, setActiveTab, showToast, storeProfile } = useApp();

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Subscribed to BaladDev newsletter successfully!');
  };

  return (
    <footer className="bg-gray-950 text-gray-300 border-t border-gray-800 transition-colors">
      {/* Upper Newsletter Section */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-950 to-blue-900 border-b border-blue-800/50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Subscribe to BaladDev Book Stall Offers
            </h3>
            <p className="text-xs sm:text-sm text-blue-200 mt-1">
              Get 10% OFF coupon code and weekly stationery discounts directly in your inbox.
            </p>
          </div>

          <form onSubmit={handleNewsletter} className="flex w-full md:w-auto max-w-md">
            <input
              type="email"
              placeholder="Enter your email address..."
              required
              className="px-4 py-2.5 rounded-l-xl bg-gray-900 border border-gray-700 text-white placeholder-gray-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500 w-full"
            />
            <button
              type="submit"
              className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-r-xl font-semibold text-sm transition-colors flex items-center space-x-2 shrink-0"
            >
              <span>Subscribe</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-lg bg-orange-500 flex items-center justify-center text-white">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                BaladDev <span className="text-orange-500">Book Stall</span>
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Your one-stop destination for notebooks, pens, geometry boxes, office stationery, school supplies, engineering drawing sets, and competitive exam books. Serving students and institutions since 2012.
            </p>
            <div className="flex items-center space-x-3 pt-2 text-gray-400">
              <span className="inline-flex items-center space-x-1 text-xs text-emerald-400 font-semibold bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>GST Registered Store</span>
              </span>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-gray-800 pb-2">
              Popular Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('shop')} className="hover:text-orange-400 transition-colors">
                  Notebooks & Spiral Registers
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('shop')} className="hover:text-orange-400 transition-colors">
                  Pens, Markers & Highlighters
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('shop')} className="hover:text-orange-400 transition-colors">
                  Geometry Box & Scientific Tools
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('shop')} className="hover:text-orange-400 transition-colors">
                  School Bags & Ergonomic Backpacks
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('shop')} className="hover:text-orange-400 transition-colors">
                  Office Files & Transparent Folders
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('shop')} className="hover:text-orange-400 transition-colors">
                  Scientific Calculators & A4 Paper
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-gray-800 pb-2">
              Customer Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-orange-400 transition-colors">
                  About BaladDev Stall
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('contact')} className="hover:text-orange-400 transition-colors">
                  Contact Us & Store Map
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('dashboard')} className="hover:text-orange-400 transition-colors">
                  Order Tracking & Delivery Status
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('dashboard')} className="hover:text-orange-400 transition-colors">
                  Saved Addresses & Wishlist
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('admin')} className="hover:text-orange-400 transition-colors flex items-center space-x-1 text-orange-400 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Control Portal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Store Contact & Hours */}
          <div className="space-y-3 text-xs">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-gray-800 pb-2">
              Store Location & Hours
            </h4>
            <div className="flex items-start space-x-2.5">
              <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
              <span>{storeProfile.addressLine1}{storeProfile.addressLine2 ? `, ${storeProfile.addressLine2}` : ''}, {storeProfile.city}, {storeProfile.state} - {storeProfile.pincode}</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <Phone className="w-4 h-4 text-orange-400 shrink-0" />
              <span>{storeProfile.phonePrimary} {storeProfile.phoneSecondary ? `/ ${storeProfile.phoneSecondary}` : ''}</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <Mail className="w-4 h-4 text-orange-400 shrink-0" />
              <span>{storeProfile.email}</span>
            </div>
            <div className="flex items-start space-x-2.5 text-gray-400 pt-1">
              <Clock className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-medium">{storeProfile.openingHoursWeekday}</p>
                <p className="text-[11px] text-gray-500">{storeProfile.openingHoursSunday}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright & payment methods */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© 2026 BaladDev Book Stall. All rights reserved. Designed for excellence.</p>

          <div className="flex items-center space-x-3 text-gray-300">
            <span className="text-[11px]">Accepted Payments:</span>
            <span className="px-2 py-1 rounded-sm bg-gray-800 font-mono font-bold text-[10px] text-blue-400">UPI</span>
            <span className="px-2 py-1 rounded-sm bg-gray-800 font-mono font-bold text-[10px] text-emerald-400">GPay</span>
            <span className="px-2 py-1 rounded-sm bg-gray-800 font-mono font-bold text-[10px] text-purple-400">PhonePe</span>
            <span className="px-2 py-1 rounded-sm bg-gray-800 font-mono font-bold text-[10px] text-amber-400">Cards</span>
            <span className="px-2 py-1 rounded-sm bg-gray-800 font-mono font-bold text-[10px] text-gray-300">COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
