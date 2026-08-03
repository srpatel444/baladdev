import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FilterState } from '../types';
import { 
  Filter, 
  X, 
  Grid, 
  List, 
  SlidersHorizontal, 
  RotateCcw, 
  Star, 
  Search 
} from 'lucide-react';
import { ProductCard } from '../components/ProductCard';

export const ShopPage: React.FC = () => {
  const { 
    products, 
    categories, 
    filterState, 
    setFilterState, 
    resetFilters,
    t
  } = useApp();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(12);

  // Available brands in state
  const allBrands = Array.from(new Set(products.map(p => p.brand)));

  // Filter products logic
  const filteredProducts = products.filter(p => {
    // Category filter
    if (filterState.category && filterState.category !== 'all' && p.category !== filterState.category) {
      return false;
    }
    // Price filter
    const effectivePrice = p.discountPrice || p.price;
    if (effectivePrice < filterState.minPrice || effectivePrice > filterState.maxPrice) {
      return false;
    }
    // Brand filter
    if (filterState.brand && filterState.brand !== 'all' && p.brand !== filterState.brand) {
      return false;
    }
    // Stock filter
    if (filterState.inStockOnly && p.stock <= 0) {
      return false;
    }
    // Rating filter
    if (filterState.minRating > 0 && p.rating < filterState.minRating) {
      return false;
    }
    // Search query
    if (filterState.searchQuery) {
      const q = (filterState.searchQuery || '').toLowerCase();
      const matchName = (p.name || '').toLowerCase().includes(q);
      const matchBrand = (p.brand || '').toLowerCase().includes(q);
      const matchTags = (p.tags || []).some(t => (t || '').toLowerCase().includes(q));
      if (!matchName && !matchBrand && !matchTags) return false;
    }
    return true;
  });

  // Sorting logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = a.discountPrice || a.price;
    const priceB = b.discountPrice || b.price;

    if (filterState.sortBy === 'price-low') return priceA - priceB;
    if (filterState.sortBy === 'price-high') return priceB - priceA;
    if (filterState.sortBy === 'top-rated') return b.rating - a.rating;
    if (filterState.sortBy === 'best-selling') return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    return 0; // Default newest
  });

  const displayedList = sortedProducts.slice(0, itemsToShow);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Page Heading & Search Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Stationery & Book Catalog
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Showing {sortedProducts.length} items matching your filters
          </p>
        </div>

        {/* Top Controls Bar */}
        <div className="flex items-center space-x-3">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="md:hidden px-3.5 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs font-bold flex items-center space-x-1.5"
          >
            <Filter className="w-4 h-4 text-blue-600" />
            <span>Filters</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center space-x-2 text-xs font-semibold">
            <span className="text-gray-500 hidden sm:inline">{t('sortBy')}:</span>
            <select
              value={filterState.sortBy}
              onChange={(e) => setFilterState(prev => ({ ...prev, sortBy: e.target.value as FilterState['sortBy'] }))}
              className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-hidden cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="best-selling">Best Selling</option>
              <option value="top-rated">Top Rated</option>
            </select>
          </div>

          {/* Grid vs List toggle */}
          <div className="hidden sm:flex items-center bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-white dark:bg-gray-700 text-blue-600 shadow-xs' : 'text-gray-400'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-white dark:bg-gray-700 text-blue-600 shadow-xs' : 'text-gray-400'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Filter Sidebar (Desktop & Mobile Drawer) */}
        <aside className={`md:block ${mobileFilterOpen ? 'fixed inset-0 z-50 bg-white dark:bg-gray-900 p-6 overflow-y-auto' : 'hidden'}`}>
          <div className="space-y-6">
            
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <h3 className="text-sm font-extrabold text-gray-900 dark:text-white flex items-center space-x-1.5">
                <SlidersHorizontal className="w-4 h-4 text-blue-600" />
                <span>Filter Products</span>
              </h3>

              <div className="flex items-center space-x-2">
                <button
                  onClick={resetFilters}
                  className="text-[11px] text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center space-x-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>

                {mobileFilterOpen && (
                  <button onClick={() => setMobileFilterOpen(false)} className="md:hidden p-1 text-gray-400">
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Categories</label>
              <select
                value={filterState.category}
                onChange={(e) => setFilterState(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs text-gray-900 dark:text-white"
              >
                <option value="all">All Categories</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name.en} ({c.itemCount})</option>
                ))}
              </select>
            </div>

            {/* Price Range Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-gray-700 dark:text-gray-300">
                <span>Max Price:</span>
                <span className="text-orange-600">₹{filterState.maxPrice}</span>
              </div>
              <input
                type="range"
                min="50"
                max="3000"
                step="50"
                value={filterState.maxPrice}
                onChange={(e) => setFilterState(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>

            {/* Brand Filter */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Brand</label>
              <select
                value={filterState.brand}
                onChange={(e) => setFilterState(prev => ({ ...prev, brand: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs text-gray-900 dark:text-white"
              >
                <option value="all">All Brands</option>
                {allBrands.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* In-Stock Toggle */}
            <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
              <label className="flex items-center space-x-2 text-xs font-bold text-gray-700 dark:text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filterState.inStockOnly}
                  onChange={(e) => setFilterState(prev => ({ ...prev, inStockOnly: e.target.checked }))}
                  className="rounded-md border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span>In Stock Items Only</span>
              </label>
            </div>

            {/* Rating Filter */}
            <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-gray-800">
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Minimum Rating</label>
              <div className="space-y-1">
                {[4, 3, 2].map(star => (
                  <label key={star} className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-300 cursor-pointer">
                    <input
                      type="radio"
                      name="minRating"
                      checked={filterState.minRating === star}
                      onChange={() => setFilterState(prev => ({ ...prev, minRating: star }))}
                      className="text-blue-600"
                    />
                    <div className="flex items-center text-amber-400">
                      <span>{star} Stars & Above</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {mobileFilterOpen && (
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 bg-blue-700 text-white rounded-xl font-bold text-xs"
              >
                Apply Filters
              </button>
            )}

          </div>
        </aside>

        {/* Product Grid / List Display */}
        <div className="md:col-span-3 space-y-6">
          
          {/* Active Filter Chips */}
          {(filterState.category !== 'all' || filterState.brand !== 'all' || filterState.searchQuery || filterState.inStockOnly || filterState.minRating > 0) && (
            <div className="flex flex-wrap items-center gap-2 p-3 bg-blue-50/60 dark:bg-blue-950/40 rounded-xl text-xs">
              <span className="font-bold text-blue-900 dark:text-blue-200">Active Filters:</span>
              
              {filterState.category !== 'all' && (
                <span className="bg-white dark:bg-gray-800 px-2.5 py-1 rounded-lg font-semibold text-gray-700 dark:text-gray-200 flex items-center space-x-1 shadow-2xs">
                  <span>Cat: {filterState.category}</span>
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setFilterState(p => ({ ...p, category: 'all' }))} />
                </span>
              )}

              {filterState.brand !== 'all' && (
                <span className="bg-white dark:bg-gray-800 px-2.5 py-1 rounded-lg font-semibold text-gray-700 dark:text-gray-200 flex items-center space-x-1 shadow-2xs">
                  <span>Brand: {filterState.brand}</span>
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setFilterState(p => ({ ...p, brand: 'all' }))} />
                </span>
              )}

              {filterState.searchQuery && (
                <span className="bg-white dark:bg-gray-800 px-2.5 py-1 rounded-lg font-semibold text-gray-700 dark:text-gray-200 flex items-center space-x-1 shadow-2xs">
                  <span>"{filterState.searchQuery}"</span>
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setFilterState(p => ({ ...p, searchQuery: '' }))} />
                </span>
              )}

              <button onClick={resetFilters} className="text-red-600 font-bold hover:underline ml-auto">
                Clear All
              </button>
            </div>
          )}

          {/* Results Grid */}
          {displayedList.length === 0 ? (
            <div className="text-center py-16 space-y-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
              <Search className="w-12 h-12 text-gray-300 mx-auto" />
              <h3 className="text-base font-bold text-gray-800 dark:text-gray-200">No products match your criteria</h3>
              <p className="text-xs text-gray-500">Try adjusting your filters or search keywords.</p>
              <button
                onClick={resetFilters}
                className="px-6 py-2 rounded-xl bg-blue-700 text-white font-bold text-xs"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            }>
              {displayedList.map(prod => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}

          {/* Load More Pagination */}
          {displayedList.length < sortedProducts.length && (
            <div className="text-center pt-8">
              <button
                onClick={() => setItemsToShow(prev => prev + 8)}
                className="px-8 py-3 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-extrabold text-xs shadow-xs hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Load More Products ({sortedProducts.length - displayedList.length} remaining)
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
