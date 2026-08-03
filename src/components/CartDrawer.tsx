import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  Tag, 
  ArrowRight, 
  Truck, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    isCartDrawerOpen, 
    setIsCartDrawerOpen, 
    cart, 
    updateQuantity, 
    removeFromCart, 
    appliedCoupon, 
    applyCoupon, 
    removeCoupon,
    setActiveTab
  } = useApp();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!isCartDrawerOpen) return null;

  // Subtotal calculation
  const subtotal = cart.reduce((sum, item) => {
    const p = item.product.discountPrice || item.product.price;
    return sum + p * item.quantity;
  }, 0);

  // GST calculation (weighted average or estimated)
  const gstAmount = Math.round(cart.reduce((sum, item) => {
    const p = item.product.discountPrice || item.product.price;
    return sum + (p * item.quantity * item.product.gstRate) / 100;
  }, 0));

  // Discount calculation
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percentage') {
      discountAmount = Math.round((subtotal * appliedCoupon.value) / 100);
    } else if (appliedCoupon.type === 'flat') {
      discountAmount = appliedCoupon.value;
    }
  }

  // Free shipping threshold (₹499)
  const shippingFee = subtotal >= 499 || subtotal === 0 ? 0 : 49;
  const grandTotal = Math.max(0, subtotal + shippingFee - discountAmount);

  const freeShippingThreshold = 499;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    if (!couponInput.trim()) return;

    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  const handleProceedCheckout = () => {
    setIsCartDrawerOpen(false);
    setActiveTab('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartDrawerOpen(false)} 
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-gray-900 shadow-2xl border-l border-gray-100 dark:border-gray-800 flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50/50 dark:bg-gray-800/50">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-blue-600" />
              <h2 className="text-base font-extrabold text-gray-900 dark:text-white">Your Shopping Cart</h2>
              <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cart.reduce((a, b) => a + b.quantity, 0)} items
              </span>
            </div>

            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-blue-50 dark:bg-blue-950/60 p-3.5 border-b border-blue-100 dark:border-blue-900/50">
            <div className="flex items-center justify-between text-xs font-semibold text-blue-900 dark:text-blue-200 mb-1.5">
              <span className="flex items-center space-x-1">
                <Truck className="w-4 h-4 text-orange-500" />
                <span>
                  {remainingForFreeShipping > 0
                    ? `Add ₹${remainingForFreeShipping} more for FREE Express Shipping!`
                    : '🎉 You have unlocked FREE Express Shipping!'}
                </span>
              </span>
              <span>{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full h-2 bg-blue-200 dark:bg-blue-900 rounded-full overflow-hidden">
              <div 
                className="h-full bg-orange-500 transition-all duration-500 rounded-full" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-20 h-20 rounded-full bg-blue-50 dark:bg-blue-950 flex items-center justify-center mx-auto text-blue-600">
                  <ShoppingBag className="w-10 h-10 text-orange-400" />
                </div>
                <h3 className="text-base font-bold text-gray-800 dark:text-gray-200">Your cart is empty</h3>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  Explore our wide range of notebooks, pens, school bags, and office supplies!
                </p>
                <button
                  onClick={() => { setIsCartDrawerOpen(false); setActiveTab('shop'); }}
                  className="px-6 py-2.5 rounded-full bg-blue-700 text-white text-xs font-bold hover:bg-blue-800 transition-colors shadow-md"
                >
                  Start Shopping Now
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const itemPrice = item.product.discountPrice || item.product.price;
                return (
                  <div 
                    key={item.product.id}
                    className="flex space-x-3 p-3 rounded-2xl bg-gray-50/60 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 items-center"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-xl border border-gray-200 dark:border-gray-700 shrink-0"
                    />

                    <div className="flex-1 min-w-0 space-y-1">
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white line-clamp-1">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-gray-500">{item.product.brand} • SKU: {item.product.sku}</p>
                      
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-sm font-extrabold text-blue-700 dark:text-blue-400">
                          ₹{itemPrice}
                        </span>

                        <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900 text-xs">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="px-2 py-0.5 hover:bg-gray-100 dark:hover:bg-gray-800 font-bold"
                          >
                            -
                          </button>
                          <span className="px-2.5 py-0.5 font-bold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="px-2 py-0.5 hover:bg-gray-100 dark:hover:bg-gray-800 font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Coupon Code & Summary Section */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900 space-y-4">
              
              {/* Coupon Form */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs">
                  <div className="flex items-center space-x-2 text-emerald-800 dark:text-emerald-300">
                    <Tag className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold">{appliedCoupon.code}</span>
                    <span className="text-[11px]">(-₹{discountAmount})</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-red-600 font-bold text-[11px] hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCouponSubmit} className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Coupon Code (e.g. WELCOME10)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs text-gray-900 dark:text-white uppercase focus:outline-hidden"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-gray-900 dark:bg-gray-700 text-white text-xs font-bold hover:bg-gray-800 transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && <p className="text-[11px] text-red-500">{couponError}</p>}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-gray-600 dark:text-gray-300 border-t border-gray-200 dark:border-gray-800 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-bold text-gray-900 dark:text-white">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated GST ({gstAmount ? 'Included' : '5-18%'}):</span>
                  <span className="font-bold text-gray-900 dark:text-white">₹{gstAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Charge:</span>
                  <span className="font-bold text-emerald-600">
                    {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Coupon Discount:</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-extrabold text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-gray-800">
                  <span>Grand Total:</span>
                  <span className="text-blue-700 dark:text-blue-400">₹{grandTotal}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleProceedCheckout}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-blue-950 text-white font-extrabold text-sm shadow-xl shadow-blue-700/20 transition-all flex items-center justify-center space-x-2 active:scale-98"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 text-orange-400" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
