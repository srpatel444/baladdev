import React from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Eye, 
  SlidersHorizontal, 
  Check 
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    toggleCompare, 
    comparedProducts,
    setSelectedProductDetail,
    addRecentlyViewed
  } = useApp();

  const isWishlisted = isInWishlist(product.id);
  const isCompared = comparedProducts.some(p => p.id === product.id);

  const displayPrice = product.discountPrice || product.price;

  const handleQuickView = () => {
    addRecentlyViewed(product);
    setSelectedProductDetail(product);
  };

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/60 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* Product Image Stage */}
      <div className="relative aspect-4/3 w-full bg-gray-50 dark:bg-gray-900 overflow-hidden cursor-pointer" onClick={handleQuickView}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start z-10">
          {product.discountPercent && (
            <span className="bg-orange-600 text-white font-black text-[10px] uppercase px-2 py-0.5 rounded-md shadow-xs tracking-wider">
              {product.discountPercent}% OFF
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-blue-600 text-white font-bold text-[10px] uppercase px-2 py-0.5 rounded-md shadow-xs">
              BESTSELLER
            </span>
          )}
          {product.isNewArrival && (
            <span className="bg-emerald-600 text-white font-bold text-[10px] uppercase px-2 py-0.5 rounded-md shadow-xs">
              NEW
            </span>
          )}
        </div>

        {/* Action Overlay Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
          {/* Wishlist Button */}
          <button
            onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
            className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all ${
              isWishlisted 
                ? 'bg-rose-500 text-white scale-110' 
                : 'bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-200 hover:bg-rose-500 hover:text-white'
            }`}
            title="Add to Wishlist"
          >
            <Heart className="w-4 h-4 fill-current" />
          </button>

          {/* Quick View Button */}
          <button
            onClick={(e) => { e.stopPropagation(); handleQuickView(); }}
            className="w-8 h-8 rounded-full bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-200 hover:bg-blue-600 hover:text-white flex items-center justify-center shadow-md transition-all"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>

          {/* Compare Button */}
          <button
            onClick={(e) => { e.stopPropagation(); toggleCompare(product); }}
            className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all ${
              isCompared 
                ? 'bg-blue-600 text-white font-bold' 
                : 'bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-200 hover:bg-blue-600 hover:text-white'
            }`}
            title="Compare Product"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Stock Badge */}
        {product.stock <= 0 && (
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-xs flex items-center justify-center">
            <span className="bg-red-600 text-white font-bold text-xs uppercase px-3 py-1 rounded-md">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Information Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
            <span className="font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider text-[11px]">
              {product.brand}
            </span>
            <span>SKU: {product.sku}</span>
          </div>

          <h3 
            onClick={handleQuickView}
            className="text-sm font-bold text-gray-900 dark:text-white line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors leading-snug"
          >
            {product.name}
          </h3>
        </div>

        {/* Ratings */}
        <div className="flex items-center space-x-1 text-xs">
          <div className="flex items-center text-amber-400">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="ml-1 font-bold text-gray-800 dark:text-gray-200">{product.rating}</span>
          </div>
          <span className="text-gray-400">({product.reviewCount})</span>
        </div>

        {/* Price & Cart CTA */}
        <div className="pt-2 border-t border-gray-100 dark:border-gray-700/60 flex items-center justify-between">
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-base font-extrabold text-gray-900 dark:text-white">
                ₹{displayPrice}
              </span>
              {product.discountPrice && (
                <span className="text-xs text-gray-400 line-through">
                  ₹{product.price}
                </span>
              )}
            </div>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">
              Incl. GST ({product.gstRate}%)
            </p>
          </div>

          <button
            disabled={product.stock <= 0}
            onClick={() => addToCart(product, 1)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shadow-xs ${
              product.stock > 0
                ? 'bg-blue-700 hover:bg-blue-800 text-white active:scale-95'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5 text-orange-400" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
