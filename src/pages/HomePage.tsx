import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowRight, 
  Sparkles, 
  Percent, 
  Truck, 
  ShieldCheck, 
  Award, 
  Star, 
  ChevronRight, 
  ShoppingBag, 
  Tag, 
  Clock, 
  CheckCircle2, 
  BookOpen, 
  Gift 
} from 'lucide-react';
import { ProductCard } from '../components/ProductCard';

export const HomePage: React.FC = () => {
  const { 
    t, 
    categories, 
    products, 
    setActiveTab, 
    setSelectedCategory, 
    setFilterState 
  } = useApp();

  const [activeProductTab, setActiveProductTab] = useState<'featured' | 'bestsellers' | 'new'>('featured');

  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 8);
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 8);
  const newArrivals = products.filter(p => p.isNewArrival).slice(0, 8);

  const displayedProducts = 
    activeProductTab === 'featured' ? featuredProducts :
    activeProductTab === 'bestsellers' ? bestSellers : newArrivals;

  const brands = ['Classmate', 'Camlin', 'Faber-Castell', 'Doms', 'Casio', 'Wildcraft', 'Cello', 'JK Paper', 'Solo', 'Milton'];

  return (
    <div className="space-y-12 pb-16">
      
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-950 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-4 shadow-xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12 sm:py-20 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-orange-500/20 text-orange-300 border border-orange-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span>Back To School & College Mega Sale</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Quality Stationery & <span className="text-orange-400 underline decoration-orange-500/40">Books</span> For Bright Minds.
            </h1>

            <p className="text-sm sm:text-base text-blue-100 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Explore 500+ premium notebooks, pens, scientific geometry boxes, school bags, office supplies, and competitive exam books at wholesale prices.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => { setActiveTab('shop'); setSelectedCategory(null); }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm shadow-xl shadow-orange-500/25 transition-all flex items-center justify-center space-x-2 active:scale-98"
              >
                <span>{t('shopNow')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('categories')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm backdrop-blur-xs transition-colors border border-white/20"
              >
                {t('exploreCategories')}
              </button>
            </div>

            {/* Micro Badges */}
            <div className="pt-6 border-t border-blue-800/60 grid grid-cols-3 gap-2 text-center lg:text-left text-xs text-blue-200">
              <div>
                <p className="font-extrabold text-white text-base">100%</p>
                <p className="text-[11px] text-blue-300">Original Brands</p>
              </div>
              <div>
                <p className="font-extrabold text-white text-base">Free Delivery</p>
                <p className="text-[11px] text-blue-300">Orders above ₹499</p>
              </div>
              <div>
                <p className="font-extrabold text-white text-base">24 Hr</p>
                <p className="text-[11px] text-blue-300">Dispatch Guarantee</p>
              </div>
            </div>
          </div>

          {/* Hero Visual Card Stack */}
          <div className="relative hidden lg:block">
            <div className="relative z-10 rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl bg-gray-800">
              <img
                src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=1000"
                alt="BaladDev Stationery Collection"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent p-6 flex flex-col justify-end">
                <span className="bg-orange-500 text-white font-extrabold text-xs px-3 py-1 rounded-full w-fit mb-1">
                  FLAT 20% OFF CODE: BALAD20
                </span>
                <h3 className="text-xl font-extrabold text-white">Classmate Pulse Spiral Registers</h3>
              </div>
            </div>

            {/* Floating Offer Pill */}
            <div className="absolute -bottom-6 -left-6 z-20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-4 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                <Gift className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold">Student Offer Active</p>
                <p className="text-[11px] text-gray-500">Free Sharpener with Doms Pencils</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Categories Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight">
              Top Categories
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">Find exactly what you need for school, college, or office</p>
          </div>

          <button
            onClick={() => setActiveTab('categories')}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1"
          >
            <span>View All Categories ({categories.length})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.slice(0, 6).map(cat => (
            <div
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setFilterState(prev => ({ ...prev, category: cat.id }));
                setActiveTab('shop');
              }}
              className="group p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/60 shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer text-center space-y-3"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden mx-auto border-2 border-orange-100 dark:border-orange-900/50 group-hover:scale-110 transition-transform">
                <img src={cat.image} alt={cat.name.en} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-blue-600">
                  {cat.name.en}
                </h3>
                <p className="text-[10px] text-gray-400 mt-0.5">{cat.itemCount} Products</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Tabbed Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight">
              Curated Products
            </h2>
            <p className="text-xs text-gray-500">Handpicked high quality stationery & books</p>
          </div>

          <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => setActiveProductTab('featured')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeProductTab === 'featured'
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900'
              }`}
            >
              {t('featuredProducts')}
            </button>
            <button
              onClick={() => setActiveProductTab('bestsellers')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeProductTab === 'bestsellers'
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900'
              }`}
            >
              {t('bestSellers')}
            </button>
            <button
              onClick={() => setActiveProductTab('new')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeProductTab === 'new'
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900'
              }`}
            >
              {t('newArrivals')}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedProducts.map(prod => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* Special Offer Banner Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-3 z-10 text-center md:text-left">
            <span className="bg-white text-orange-700 font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
              LIMITED TIME FESTIVAL OFFER
            </span>
            <h2 className="text-2xl sm:text-4xl font-black">
              Get 25% OFF On Exam & School Supply Bundles!
            </h2>
            <p className="text-xs sm:text-sm text-orange-100 max-w-lg">
              Use Coupon Code <strong className="bg-orange-700 px-2 py-0.5 rounded text-white font-mono">FESTIVAL25</strong> on checkout for orders over ₹1499.
            </p>
          </div>

          <button
            onClick={() => { setActiveTab('shop'); setSelectedCategory(null); }}
            className="z-10 px-8 py-3.5 rounded-2xl bg-blue-900 hover:bg-blue-950 text-white font-extrabold text-sm shadow-xl transition-all shrink-0 active:scale-95"
          >
            Claim Offer Now
          </button>
        </div>
      </section>

      {/* Popular Brands Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider text-center">
          Authorized Retailer For Top Brands
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 opacity-80 grayscale hover:grayscale-0 transition-all">
          {brands.map(brand => (
            <div
              key={brand}
              onClick={() => {
                setFilterState(prev => ({ ...prev, brand }));
                setActiveTab('shop');
              }}
              className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-black text-xs cursor-pointer hover:bg-blue-600 hover:text-white transition-colors"
            >
              {brand}
            </div>
          ))}
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
            What Our Customers Say
          </h2>
          <p className="text-xs text-gray-500">Trusted by students, teachers, and school administrators</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 space-y-3 shadow-xs">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300 italic">
              "BaladDev Book Stall has been my go-to shop for Classmate notebooks and Casio scientific calculators. Fast 2-day delivery to Anand!"
            </p>
            <div>
              <p className="text-xs font-bold text-gray-900 dark:text-white">Hardik Patel</p>
              <p className="text-[10px] text-gray-400">Engineering Student, BVM College</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 space-y-3 shadow-xs">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300 italic">
              "We ordered bulk school bags and geometry boxes for our annual school distribution. Great GST invoicing and discount prices."
            </p>
            <div>
              <p className="text-xs font-bold text-gray-900 dark:text-white">Sunita Verma</p>
              <p className="text-[10px] text-gray-400">Principal, St. Xavier School</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 space-y-3 shadow-xs">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300 italic">
              "Original Camlin paints and Faber-Castell geometry sets delivered in perfect condition. Excellent WhatsApp support team."
            </p>
            <div>
              <p className="text-xs font-bold text-gray-900 dark:text-white">Kinjal Shah</p>
              <p className="text-[10px] text-gray-400">Art Instructor, Nadiad</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
