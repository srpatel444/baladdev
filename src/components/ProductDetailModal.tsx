import React, { useState } from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Star, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Check, 
  Truck, 
  ShieldCheck, 
  RefreshCw, 
  CheckCircle2, 
  SlidersHorizontal,
  ThumbsUp,
  Camera
} from 'lucide-react';
import { ProductCard } from './ProductCard';

export const ProductDetailModal: React.FC = () => {
  const { 
    selectedProductDetail, 
    setSelectedProductDetail, 
    addToCart, 
    toggleWishlist, 
    isInWishlist,
    toggleCompare,
    comparedProducts,
    products,
    setActiveTab,
    setIsCartDrawerOpen,
    showToast,
    editProduct
  } = useApp();

  if (!selectedProductDetail) return null;

  const product = selectedProductDetail;
  const isWishlisted = isInWishlist(product.id);
  const isCompared = comparedProducts.some(p => p.id === product.id);

  const [activeImage, setActiveImage] = useState(product.images[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveDetailTab] = useState<'specs' | 'reviews'>('specs');

  // New review state
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [newReviewerName, setNewReviewerName] = useState('');

  const displayPrice = product.discountPrice || product.price;
  const savings = product.discountPrice ? product.price - product.discountPrice : 0;
  const gstAmount = Math.round((displayPrice * product.gstRate) / 100);

  // Related products from same category
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!');
    }
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setSelectedProductDetail(null);
    setActiveTab('checkout');
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !newReviewerName.trim()) {
      showToast('Please fill out your name and review comment.');
      return;
    }

    const newRev = {
      id: 'rev-' + Date.now(),
      userName: newReviewerName,
      rating: newRating,
      date: new Date().toISOString().split('T')[0],
      comment: newComment,
      verifiedPurchase: true
    };

    const updatedReviews = [newRev, ...(product.reviews || [])];
    const totalRating = updatedReviews.reduce((sum, r) => sum + r.rating, 0);
    const avgRating = Number((totalRating / updatedReviews.length).toFixed(1));

    const updatedProd: Product = {
      ...product,
      reviews: updatedReviews,
      rating: avgRating,
      reviewCount: updatedReviews.length
    };

    editProduct(updatedProd);
    setSelectedProductDetail(updatedProd);
    setNewComment('');
    setNewReviewerName('');
    showToast('Thank you for your review!');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden my-auto border border-gray-100 dark:border-gray-800 max-h-[90vh] flex flex-col">
        
        {/* Top Modal Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
          <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
            <span className="font-semibold text-blue-600 dark:text-blue-400 uppercase">{product.brand}</span>
            <span>•</span>
            <span>Category: <strong className="text-gray-700 dark:text-gray-200">{product.category}</strong></span>
          </div>

          <button
            onClick={() => setSelectedProductDetail(null)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-6 space-y-8 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Left Column: Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-4/3 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 overflow-hidden group">
                <img
                  src={activeImage || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 cursor-zoom-in"
                />

                {product.discountPercent && (
                  <span className="absolute top-4 left-4 bg-orange-600 text-white font-extrabold text-xs px-3 py-1 rounded-full shadow-md">
                    SAVE {product.discountPercent}%
                  </span>
                )}
              </div>

              {/* Thumbnail Selector */}
              {product.images.length > 1 && (
                <div className="flex items-center space-x-3 overflow-x-auto pb-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`w-16 h-16 rounded-xl border-2 overflow-hidden shrink-0 transition-all ${
                        activeImage === img
                          ? 'border-blue-600 ring-2 ring-blue-500/30'
                          : 'border-gray-200 dark:border-gray-700 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Security & Service Badges */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100 dark:border-gray-800 text-center">
                <div className="p-2 rounded-xl bg-gray-50 dark:bg-gray-800/60">
                  <Truck className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                  <p className="text-[11px] font-semibold text-gray-800 dark:text-gray-200">Fast Shipping</p>
                  <p className="text-[10px] text-gray-500">2-3 Days</p>
                </div>
                <div className="p-2 rounded-xl bg-gray-50 dark:bg-gray-800/60">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                  <p className="text-[11px] font-semibold text-gray-800 dark:text-gray-200">100% Genuine</p>
                  <p className="text-[10px] text-gray-500">Original Brand</p>
                </div>
                <div className="p-2 rounded-xl bg-gray-50 dark:bg-gray-800/60">
                  <RefreshCw className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                  <p className="text-[11px] font-semibold text-gray-800 dark:text-gray-200">Easy Returns</p>
                  <p className="text-[10px] text-gray-500">7 Days Return</p>
                </div>
              </div>
            </div>

            {/* Right Column: Details & Order CTA */}
            <div className="space-y-6">
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white leading-snug">
                  {product.name}
                </h1>
                
                {/* Product Meta Codes */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mt-2">
                  <span>SKU: <strong className="text-gray-700 dark:text-gray-300">{product.sku}</strong></span>
                  <span>•</span>
                  <span>Barcode: <strong className="text-gray-700 dark:text-gray-300">{product.barcode}</strong></span>
                  <span>•</span>
                  <span>Code: <strong className="text-gray-700 dark:text-gray-300">{product.productCode}</strong></span>
                </div>

                {/* Rating & Stock */}
                <div className="flex items-center space-x-4 mt-3">
                  <div className="flex items-center space-x-1 text-sm bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 px-2.5 py-1 rounded-lg font-bold">
                    <Star className="w-4 h-4 fill-current text-amber-500" />
                    <span>{product.rating}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-normal">({product.reviewCount} reviews)</span>
                  </div>

                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    product.stock > 0
                      ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400'
                      : 'bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-400'
                  }`}>
                    {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                  </span>
                </div>
              </div>

              {/* Pricing Box */}
              <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50">
                <div className="flex items-baseline space-x-3">
                  <span className="text-3xl font-black text-blue-950 dark:text-white">
                    ₹{displayPrice}
                  </span>
                  {product.discountPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      MSRP: ₹{product.price}
                    </span>
                  )}
                  {savings > 0 && (
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/50 px-2 py-0.5 rounded-md">
                      You save ₹{savings}
                    </span>
                  )}
                </div>
                <p className="text-xs text-blue-800 dark:text-blue-300 mt-1 font-medium">
                  Price inclusive of GST tax ({product.gstRate}%) • Approx. GST: ₹{gstAmount}
                </p>
              </div>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {product.description}
              </p>

              {/* Quantity Selector & Action Buttons */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center space-x-4">
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Quantity:</span>
                  <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800">
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 font-bold"
                    >
                      -
                    </button>
                    <span className="px-4 py-1.5 text-sm font-bold text-gray-900 dark:text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                      className="px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    disabled={product.stock <= 0}
                    onClick={() => addToCart(product, quantity)}
                    className="w-full py-3.5 px-4 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2 active:scale-98"
                  >
                    <ShoppingCart className="w-4 h-4 text-orange-400" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    disabled={product.stock <= 0}
                    onClick={handleBuyNow}
                    className="w-full py-3.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-md transition-all active:scale-98"
                  >
                    Buy Now Instant
                  </button>
                </div>

                {/* Auxiliary buttons */}
                <div className="flex items-center space-x-4 text-xs font-semibold text-gray-600 dark:text-gray-300 pt-1">
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="flex items-center space-x-1.5 hover:text-rose-500 transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'text-rose-500 fill-current' : ''}`} />
                    <span>{isWishlisted ? 'In Wishlist' : 'Add to Wishlist'}</span>
                  </button>

                  <button
                    onClick={() => toggleCompare(product)}
                    className="flex items-center space-x-1.5 hover:text-blue-500 transition-colors"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    <span>{isCompared ? 'Comparing' : 'Compare'}</span>
                  </button>

                  <button
                    onClick={handleShare}
                    className="flex items-center space-x-1.5 hover:text-blue-500 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Specifications & Customer Reviews Tabs */}
          <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center space-x-6 border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setActiveDetailTab('specs')}
                className={`pb-3 text-sm font-bold border-b-2 transition-colors ${
                  activeTab === 'specs'
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                Specifications & Features
              </button>

              <button
                onClick={() => setActiveDetailTab('reviews')}
                className={`pb-3 text-sm font-bold border-b-2 transition-colors ${
                  activeTab === 'reviews'
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                Customer Reviews ({product.reviews?.length || 0})
              </button>
            </div>

            <div className="py-6">
              {activeTab === 'specs' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <div key={key} className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700/50 flex justify-between text-xs">
                      <span className="font-semibold text-gray-500 dark:text-gray-400">{key}:</span>
                      <span className="font-bold text-gray-900 dark:text-white">{val}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  
                  {/* Write a review form */}
                  <form onSubmit={handleAddReview} className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 space-y-3">
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">Write a Review for this product</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Your Full Name"
                        value={newReviewerName}
                        onChange={(e) => setNewReviewerName(e.target.value)}
                        className="px-3.5 py-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-xs focus:outline-hidden"
                      />
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">Rating:</span>
                        <div className="flex text-amber-400 cursor-pointer">
                          {[1, 2, 3, 4, 5].map(star => (
                            <Star
                              key={star}
                              onClick={() => setNewRating(star)}
                              className={`w-5 h-5 ${star <= newRating ? 'fill-current' : 'text-gray-300 dark:text-gray-600'}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <textarea
                      rows={2}
                      placeholder="Share details of your experience with this item..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-xs focus:outline-hidden"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-xs"
                    >
                      Submit Review
                    </button>
                  </form>

                  {/* Existing Reviews List */}
                  <div className="space-y-3">
                    {product.reviews && product.reviews.length > 0 ? (
                      product.reviews.map(rev => (
                        <div key={rev.id} className="p-4 rounded-2xl bg-gray-50/50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-xs text-gray-900 dark:text-white">{rev.userName}</span>
                              {rev.verifiedPurchase && (
                                <span className="inline-flex items-center space-x-1 text-[10px] text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full font-semibold">
                                  <CheckCircle2 className="w-3 h-3" />
                                  <span>Verified Buyer</span>
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-gray-400">{rev.date}</span>
                          </div>
                          <div className="flex text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-current' : 'text-gray-300 dark:text-gray-600'}`} />
                            ))}
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-300">{rev.comment}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-gray-400 text-center py-4">No reviews yet. Be the first to review this product!</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Products Recommendations */}
          {relatedProducts.length > 0 && (
            <div className="pt-6 border-t border-gray-100 dark:border-gray-800 space-y-4">
              <h3 className="text-base font-extrabold text-gray-900 dark:text-white">
                Frequently Bought Together / Related Items
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {relatedProducts.map(rel => (
                  <ProductCard key={rel.id} product={rel} />
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
