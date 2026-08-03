import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  User as UserIcon, 
  Sun, 
  Moon, 
  Globe, 
  Menu, 
  X, 
  Sparkles, 
  SlidersHorizontal,
  BookOpen,
  PhoneCall,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { Language } from '../types';

export const Header: React.FC = () => {
  const { 
    language, 
    setLanguage, 
    t, 
    theme, 
    toggleTheme, 
    activeTab, 
    setActiveTab,
    cart, 
    wishlist, 
    comparedProducts,
    setIsCartDrawerOpen,
    setIsAuthModalOpen,
    setIsCompareModalOpen,
    currentUser,
    filterState,
    setFilterState,
    setSelectedCategory,
    products
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(filterState.searchQuery || '');
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilterState(prev => ({ ...prev, searchQuery: searchQuery.trim() }));
    setActiveTab('shop');
    setShowSearchSuggestions(false);
  };

  const suggestions = searchQuery.trim().length > 1
    ? products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5)
    : [];

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-xs transition-colors">
      {/* Top Banner Bar */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white text-xs py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center space-y-1 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-orange-500 text-white font-semibold text-[10px]">
              SPECIAL OFFER
            </span>
            <span>📚 Free Express Shipping on stationery & books over ₹499!</span>
          </div>

          <div className="flex items-center space-x-5 text-blue-100">
            <a href="tel:+919876543210" className="hover:text-white flex items-center space-x-1">
              <PhoneCall className="w-3 h-3 text-orange-400" />
              <span>+91 98765 43210</span>
            </a>
            
            {/* Language Selector */}
            <div className="flex items-center space-x-1.5 bg-blue-950/60 px-2 py-0.5 rounded-md border border-blue-700/50">
              <Globe className="w-3 h-3 text-orange-400" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="bg-transparent text-white font-medium focus:outline-hidden cursor-pointer text-xs"
              >
                <option value="en" className="bg-gray-800 text-white">English</option>
                <option value="hi" className="bg-gray-800 text-white">हिंदी (Hindi)</option>
                <option value="gu" className="bg-gray-800 text-white">ગુજરાતી (Gujarati)</option>
              </select>
            </div>

            {/* Dark mode toggle */}
            <button
              onClick={toggleTheme}
              className="p-1 hover:bg-blue-800 rounded-full transition-colors text-orange-300 hover:text-white"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo & Branding */}
          <div 
            onClick={() => { setActiveTab('home'); setFilterState(prev => ({ ...prev, searchQuery: '' })); }} 
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <BookOpen className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-blue-950 dark:text-white">
                  BaladDev
                </span>
                <span className="text-xs px-2 py-0.5 rounded-md bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-400 font-bold uppercase tracking-wider">
                  Book Stall
                </span>
              </div>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 hidden sm:block font-medium">
                Stationery, Books & Office Supplies
              </p>
            </div>
          </div>

          {/* Search Bar with Live Suggestions */}
          <div className="hidden md:block flex-1 max-w-xl relative">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchSuggestions(true);
                }}
                onFocus={() => setShowSearchSuggestions(true)}
                className="w-full pl-11 pr-24 py-2.5 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white dark:focus:bg-gray-900 transition-all"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-blue-700 hover:bg-blue-800 text-white rounded-full text-xs font-semibold shadow-xs transition-colors flex items-center space-x-1"
              >
                <span>Search</span>
              </button>
            </form>

            {/* Suggestions Dropdown */}
            {showSearchSuggestions && suggestions.length > 0 && (
              <div 
                className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50"
                onMouseLeave={() => setShowSearchSuggestions(false)}
              >
                <div className="p-2 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700">
                  Quick Product Suggestions
                </div>
                {suggestions.map(item => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setFilterState(prev => ({ ...prev, searchQuery: item.name }));
                      setActiveTab('shop');
                      setShowSearchSuggestions(false);
                    }}
                    className="flex items-center space-x-3 p-3 hover:bg-blue-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
                  >
                    <img src={item.images[0]} alt={item.name} className="w-10 h-10 object-cover rounded-md" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-900 dark:text-white truncate">{item.name}</p>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400">{item.brand} • <span className="text-orange-600 font-bold">₹{item.discountPrice || item.price}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center space-x-3 sm:space-x-4">

            {/* Product Comparison Button */}
            {comparedProducts.length > 0 && (
              <button
                onClick={() => setIsCompareModalOpen(true)}
                className="relative p-2 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors hidden sm:flex items-center space-x-1 text-xs font-semibold"
                title="Compare Products"
              >
                <SlidersHorizontal className="w-5 h-5 text-blue-600" />
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                  {comparedProducts.length}
                </span>
              </button>
            )}

            {/* Wishlist Button */}
            <button
              onClick={() => setActiveTab('dashboard')}
              className="relative p-2 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title={t('wishlist')}
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white shadow-md shadow-blue-700/20 transition-all font-semibold text-xs"
            >
              <ShoppingBag className="w-4 h-4 text-orange-400" />
              <span className="hidden sm:inline">{t('cart')}</span>
              <span className="bg-orange-500 text-white text-[11px] font-extrabold px-1.5 py-0.5 rounded-md">
                {totalCartCount}
              </span>
            </button>

            {/* User Account / Admin Switch */}
            <div className="relative">
              {currentUser ? (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setActiveTab(currentUser.role === 'admin' ? 'admin' : 'dashboard')}
                    className="flex items-center space-x-2 p-1.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 font-bold text-xs flex items-center justify-center">
                      {(currentUser?.name || 'U').charAt(0).toUpperCase()}
                    </div>
                    <div className="text-left hidden lg:block">
                      <p className="text-xs font-semibold text-gray-900 dark:text-white line-clamp-1">{currentUser.name}</p>
                      <p className="text-[10px] text-blue-600 dark:text-blue-400 capitalize">{currentUser.role}</p>
                    </div>
                  </button>

                  {/* Fast Admin Toggle button for testing */}
                  <button
                    onClick={() => setActiveTab(activeTab === 'admin' ? 'home' : 'admin')}
                    className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-colors hidden sm:block"
                    title="Toggle Admin View"
                  >
                    {activeTab === 'admin' ? 'User Store' : 'Admin Portal'}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="flex items-center space-x-1 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-xs font-semibold"
                >
                  <UserIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">{t('login')}</span>
                </button>
              )}
            </div>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-gray-700 dark:text-gray-200 md:hidden hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-3 md:hidden">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:outline-hidden"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </form>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-blue-900 text-white hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-11 text-xs font-medium">
            <div className="flex items-center space-x-6">
              <button
                onClick={() => { setActiveTab('home'); setFilterState(prev => ({ ...prev, searchQuery: '' })); }}
                className={`px-3 py-1.5 rounded-md transition-colors ${activeTab === 'home' ? 'bg-orange-500 font-bold text-white' : 'hover:bg-blue-800 text-blue-100'}`}
              >
                {t('home')}
              </button>

              <button
                onClick={() => { setActiveTab('shop'); setSelectedCategory(null); }}
                className={`px-3 py-1.5 rounded-md transition-colors ${activeTab === 'shop' ? 'bg-orange-500 font-bold text-white' : 'hover:bg-blue-800 text-blue-100'}`}
              >
                {t('shop')}
              </button>

              <button
                onClick={() => setActiveTab('categories')}
                className={`px-3 py-1.5 rounded-md transition-colors ${activeTab === 'categories' ? 'bg-orange-500 font-bold text-white' : 'hover:bg-blue-800 text-blue-100'}`}
              >
                {t('categories')}
              </button>

              <button
                onClick={() => setActiveTab('about')}
                className={`px-3 py-1.5 rounded-md transition-colors ${activeTab === 'about' ? 'bg-orange-500 font-bold text-white' : 'hover:bg-blue-800 text-blue-100'}`}
              >
                {t('aboutUs')}
              </button>

              <button
                onClick={() => setActiveTab('contact')}
                className={`px-3 py-1.5 rounded-md transition-colors ${activeTab === 'contact' ? 'bg-orange-500 font-bold text-white' : 'hover:bg-blue-800 text-blue-100'}`}
              >
                {t('contact')}
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setActiveTab('dashboard')}
                className="hover:text-orange-300 transition-colors flex items-center space-x-1"
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span>{t('myAccount')}</span>
              </button>

              <button
                onClick={() => setActiveTab('admin')}
                className="bg-blue-950 hover:bg-orange-600 px-3 py-1 rounded-md text-orange-300 hover:text-white transition-colors flex items-center space-x-1 font-semibold border border-blue-700"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{t('adminDashboard')}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 pt-2 pb-4 space-y-2 text-sm">
          <button
            onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
            className="block w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 font-medium text-gray-800 dark:text-gray-200"
          >
            {t('home')}
          </button>
          <button
            onClick={() => { setActiveTab('shop'); setMobileMenuOpen(false); }}
            className="block w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 font-medium text-gray-800 dark:text-gray-200"
          >
            {t('shop')}
          </button>
          <button
            onClick={() => { setActiveTab('categories'); setMobileMenuOpen(false); }}
            className="block w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 font-medium text-gray-800 dark:text-gray-200"
          >
            {t('categories')}
          </button>
          <button
            onClick={() => { setActiveTab('about'); setMobileMenuOpen(false); }}
            className="block w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 font-medium text-gray-800 dark:text-gray-200"
          >
            {t('aboutUs')}
          </button>
          <button
            onClick={() => { setActiveTab('contact'); setMobileMenuOpen(false); }}
            className="block w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 font-medium text-gray-800 dark:text-gray-200"
          >
            {t('contact')}
          </button>
          <button
            onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }}
            className="block w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 font-medium text-gray-800 dark:text-gray-200"
          >
            {t('myAccount')}
          </button>
          <button
            onClick={() => { setActiveTab('admin'); setMobileMenuOpen(false); }}
            className="block w-full text-left px-3 py-2 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold"
          >
            🔑 {t('adminDashboard')}
          </button>
        </div>
      )}
    </header>
  );
};
