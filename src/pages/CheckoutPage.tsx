import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  CheckCircle2, 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  Building, 
  ArrowLeft, 
  ShoppingBag, 
  Sparkles,
  QrCode
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CheckoutPage: React.FC = () => {
  const { 
    cart, 
    appliedCoupon, 
    currentUser, 
    createOrder, 
    setActiveTab, 
    storePaymentDetails,
    showToast 
  } = useApp();

  const [step, setStep] = useState<'address' | 'payment' | 'confirmation'>('address');
  
  // Shipping details state
  const [fullName, setFullName] = useState(currentUser?.name || 'Rohan Patel');
  const [email, setEmail] = useState(currentUser?.email || 'rohan.patel@example.com');
  const [phone, setPhone] = useState(currentUser?.phone || '+91 98980 12345');
  const [street, setStreet] = useState('15, Balaji Residency, College Road');
  const [city, setCity] = useState('Nadiad');
  const [state, setState] = useState('Gujarat');
  const [pincode, setPincode] = useState('387001');
  const [addressType, setAddressType] = useState<'Home' | 'Work' | 'School/College'>('Home');

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'GPay' | 'PhonePe' | 'Paytm' | 'Card' | 'NetBanking' | 'COD'>('UPI');
  const [upiId, setUpiId] = useState('rohan@okaxis');

  // Created Order reference
  const [createdOrderNumber, setCreatedOrderNumber] = useState<string>('');

  // Order totals
  const subtotal = cart.reduce((sum, item) => {
    const p = item.product.discountPrice || item.product.price;
    return sum + p * item.quantity;
  }, 0);

  const gstAmount = Math.round(cart.reduce((sum, item) => {
    const p = item.product.discountPrice || item.product.price;
    return sum + (p * item.quantity * item.product.gstRate) / 100;
  }, 0));

  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percentage') {
      discountAmount = Math.round((subtotal * appliedCoupon.value) / 100);
    } else if (appliedCoupon.type === 'flat') {
      discountAmount = appliedCoupon.value;
    }
  }

  const shippingFee = subtotal >= 499 || subtotal === 0 ? 0 : 49;
  const totalAmount = Math.max(0, subtotal + shippingFee - discountAmount);

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !street || !city || !pincode) {
      showToast('Please complete all required shipping fields.');
      return;
    }
    setStep('payment');
  };

  const handlePlaceOrder = () => {
    const newOrder = createOrder({
      customerName: fullName,
      customerEmail: email,
      customerPhone: phone,
      shippingAddress: {
        id: 'addr-' + Date.now(),
        fullName,
        phone,
        street,
        city,
        state,
        pincode,
        type: addressType
      },
      items: cart,
      subtotal,
      gstAmount,
      shippingFee,
      discountAmount,
      totalAmount,
      paymentMethod,
    });

    setCreatedOrderNumber(newOrder.orderNumber);
    setStep('confirmation');

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // ignore
    }
  };

  if (step === 'confirmation') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-lg">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <div className="space-y-2">
          <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full uppercase">
            Order Confirmed!
          </span>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">
            Thank You For Your Purchase
          </h1>
          <p className="text-xs text-gray-500">
            Order ID: <strong className="text-gray-900 dark:text-white font-mono">{createdOrderNumber}</strong>
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-left space-y-3 text-xs">
          <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
            <span className="font-semibold text-gray-500">Shipping Address:</span>
            <span className="font-bold text-gray-800 dark:text-gray-200 text-right">{street}, {city}, {pincode}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
            <span className="font-semibold text-gray-500">Payment Method:</span>
            <span className="font-bold text-emerald-600">{paymentMethod} (Paid)</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
            <span className="font-semibold text-gray-500">Total Amount Paid:</span>
            <span className="font-extrabold text-blue-700 dark:text-blue-400 text-sm">₹{totalAmount}</span>
          </div>
          <div className="flex justify-between pt-1">
            <span className="font-semibold text-gray-500">Estimated Delivery:</span>
            <span className="font-bold text-gray-900 dark:text-white">3 Business Days via Express Courier</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            onClick={() => setActiveTab('dashboard')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-md"
          >
            Track Order Status
          </button>
          <button
            onClick={() => setActiveTab('shop')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-bold text-xs"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your cart is empty</h2>
        <p className="text-xs text-gray-500">Add products to your cart before proceeding to checkout.</p>
        <button
          onClick={() => setActiveTab('shop')}
          className="px-6 py-2.5 bg-blue-700 text-white rounded-xl text-xs font-bold"
        >
          Explore Shop
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Checkout Progress Steps Bar */}
      <div className="flex items-center justify-center space-x-4 max-w-xl mx-auto text-xs font-bold">
        <div className={`flex items-center space-x-2 ${step === 'address' ? 'text-blue-600' : 'text-gray-400'}`}>
          <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center">1</div>
          <span>Shipping Address</span>
        </div>
        <div className="w-12 h-0.5 bg-gray-200 dark:bg-gray-700" />
        <div className={`flex items-center space-x-2 ${step === 'payment' ? 'text-blue-600' : 'text-gray-400'}`}>
          <div className={`w-7 h-7 rounded-full flex items-center justify-center ${step === 'payment' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>2</div>
          <span>Payment</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Step Forms Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {step === 'address' && (
            <form onSubmit={handleAddressSubmit} className="p-6 rounded-3xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/60 shadow-xs space-y-4">
              <h2 className="text-lg font-extrabold text-gray-900 dark:text-white flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span>Customer & Shipping Details</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs bg-gray-50 dark:bg-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs bg-gray-50 dark:bg-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs bg-gray-50 dark:bg-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Street Address / House No. / School Name</label>
                <input
                  type="text"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs bg-gray-50 dark:bg-gray-900"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs bg-gray-50 dark:bg-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">State</label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs bg-gray-50 dark:bg-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Pincode</label>
                  <input
                    type="text"
                    required
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs bg-gray-50 dark:bg-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">Address Type</label>
                <div className="flex space-x-3">
                  {(['Home', 'Work', 'School/College'] as const).map(type => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setAddressType(type)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors ${
                        addressType === type
                          ? 'border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                          : 'border-gray-200 dark:border-gray-700 text-gray-600'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-bold text-xs shadow-md"
                >
                  Continue to Payment Options
                </button>
              </div>
            </form>
          )}

          {step === 'payment' && (
            <div className="p-6 rounded-3xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/60 shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-extrabold text-gray-900 dark:text-white flex items-center space-x-2">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  <span>Select Payment Gateway</span>
                </h2>
                <button
                  onClick={() => setStep('address')}
                  className="text-xs text-blue-600 font-bold hover:underline flex items-center space-x-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Edit Address</span>
                </button>
              </div>

              {/* Payment Methods Selection */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'UPI', label: 'UPI / QR', icon: '⚡' },
                  { id: 'GPay', label: 'Google Pay', icon: '🟢' },
                  { id: 'PhonePe', label: 'PhonePe', icon: '🟣' },
                  { id: 'Paytm', label: 'Paytm Wallet', icon: '🔵' },
                  { id: 'Card', label: 'Debit / Credit Card', icon: '💳' },
                  { id: 'NetBanking', label: 'Net Banking', icon: '🏦' },
                  { id: 'COD', label: 'Cash on Delivery', icon: '💵' },
                ].map((pm) => (
                  <button
                    key={pm.id}
                    onClick={() => setPaymentMethod(pm.id as any)}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      paymentMethod === pm.id
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-white font-extrabold ring-2 ring-blue-500/30'
                        : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-lg block mb-1">{pm.icon}</span>
                    <span className="text-xs">{pm.label}</span>
                  </button>
                ))}
              </div>

              {/* QR Code / Payment Detail Box */}
              {(paymentMethod === 'UPI' || paymentMethod === 'GPay' || paymentMethod === 'PhonePe' || paymentMethod === 'Paytm') && (
                <div className="p-5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 space-y-4 text-center">
                  <div className="flex items-center justify-center space-x-2 text-xs font-bold text-blue-900 dark:text-blue-200">
                    <QrCode className="w-4 h-4 text-orange-500" />
                    <span>Instant Store UPI Payment QR Code</span>
                  </div>

                  <div className="w-36 h-36 bg-white p-2 rounded-xl mx-auto shadow-md border border-gray-200 flex items-center justify-center">
                    <img 
                      src={storePaymentDetails.qrCodeUrl || `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=${encodeURIComponent(storePaymentDetails.upiId)}%26pn=${encodeURIComponent(storePaymentDetails.upiName)}%26am=${totalAmount}%26cu=INR`} 
                      alt="UPI QR Code"
                      className="w-full h-full object-contain" 
                    />
                  </div>

                  <div className="bg-white/80 dark:bg-gray-900 p-3 rounded-xl border border-blue-100 dark:border-blue-900 text-xs space-y-1">
                    <p className="font-extrabold text-gray-900 dark:text-white">Pay to Store UPI ID: <span className="text-blue-700 dark:text-blue-400 font-mono">{storePaymentDetails.upiId}</span></p>
                    <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">Merchant: {storePaymentDetails.upiName}</p>
                    <p className="text-[10px] text-gray-500">Amount to pay: <strong className="text-gray-900 dark:text-white">₹{totalAmount}</strong> (Directly credited to store owner bank account)</p>
                  </div>
                </div>
              )}

              {(paymentMethod === 'NetBanking' || paymentMethod === 'Card') && (
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
                  <div className="flex items-center space-x-2 text-slate-800 dark:text-slate-200 font-bold border-b pb-2">
                    <Building className="w-4 h-4 text-blue-600" />
                    <span>Direct Bank Transfer / NEFT / IMPS Account Details</span>
                  </div>
                  <div className="space-y-1.5 text-gray-700 dark:text-gray-300">
                    <div className="flex justify-between"><span className="text-gray-400">Account Holder:</span> <span className="font-extrabold">{storePaymentDetails.accountHolderName}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Bank Name:</span> <span className="font-bold">{storePaymentDetails.bankName}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Account Number:</span> <span className="font-mono font-bold">{storePaymentDetails.accountNumber}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">IFSC Code:</span> <span className="font-mono font-bold text-blue-600">{storePaymentDetails.ifscCode}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Branch:</span> <span>{storePaymentDetails.branchName}</span></div>
                  </div>
                </div>
              )}

              <button
                onClick={handlePlaceOrder}
                className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-orange-500/25 transition-all active:scale-98"
              >
                Confirm & Pay ₹{totalAmount}
              </button>
            </div>
          )}

        </div>

        {/* Order Summary Sidebar */}
        <div className="p-6 rounded-3xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/60 shadow-xs space-y-4 h-fit">
          <h3 className="text-base font-extrabold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-3">
            Order Summary ({cart.length} items)
          </h3>

          <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
            {cart.map((item) => (
              <div key={item.product.id} className="flex items-center space-x-3 text-xs">
                <img src={item.product.images[0]} alt={item.product.name} className="w-10 h-10 object-cover rounded-lg shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 dark:text-white truncate">{item.product.name}</p>
                  <p className="text-gray-400">Qty: {item.quantity}</p>
                </div>
                <span className="font-extrabold text-gray-900 dark:text-white">
                  ₹{(item.product.discountPrice || item.product.price) * item.quantity}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 dark:border-gray-700 pt-3 space-y-1.5 text-xs text-gray-600 dark:text-gray-300">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-bold">₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>GST Included:</span>
              <span className="font-bold">₹{gstAmount}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping Fee:</span>
              <span className="font-bold text-emerald-600">{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Coupon Savings:</span>
                <span>-₹{discountAmount}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-black text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-gray-700">
              <span>Grand Total:</span>
              <span className="text-blue-700 dark:text-blue-400">₹{totalAmount}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
