import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  BookOpen, 
  Award, 
  CheckCircle2, 
  Users, 
  Heart, 
  Building2, 
  ShieldCheck, 
  Truck, 
  Sparkles 
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="bg-orange-100 text-orange-800 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
          ESTABLISHED IN 2012
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
          Empowering Education Through Quality Supplies
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          BaladDev Book Stall is Anand & Nadiad’s premier trusted stationery supplier, notebook manufacturer distributor, and educational bookstore catering to over 50,000+ students, teachers, and professionals across Gujarat.
        </p>
      </div>

      {/* Image Banner */}
      <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800 relative h-72 sm:h-96">
        <img
          src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1600"
          alt="BaladDev Book Stall Storefront"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent flex items-end p-8">
          <div className="text-white space-y-1">
            <h2 className="text-xl font-bold">100% Genuine Branded Stationery Guarantee</h2>
            <p className="text-xs text-gray-300">Authorized seller for Classmate, Faber-Castell, Camlin, Casio & Doms</p>
          </div>
        </div>
      </div>

      {/* Story & Mission Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white">Our Journey</h2>
          <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
            Started in 2012 as a small physical bookstore near college campuses in Anand, BaladDev Book Stall grew rapidly due to our relentless commitment to fair student pricing, genuine quality products, and complete exam preparation book availability.
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
            Today, our digital e-commerce stall allows students, parents, schools, and offices to order Classmate registers, Camlin paints, scientific geometry boxes, competitive exam guides (GPSC, GATE, NEET, JEE), and office paper at wholesale prices with fast doorstep delivery.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/60 shadow-xs space-y-2">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <h3 className="text-2xl font-black text-gray-900 dark:text-white">500+</h3>
            <p className="text-xs text-gray-500">Products Cataloged</p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/60 shadow-xs space-y-2">
            <Users className="w-8 h-8 text-orange-500" />
            <h3 className="text-2xl font-black text-gray-900 dark:text-white">50k+</h3>
            <p className="text-xs text-gray-500">Happy Students & Schools</p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/60 shadow-xs space-y-2">
            <Award className="w-8 h-8 text-emerald-500" />
            <h3 className="text-2xl font-black text-gray-900 dark:text-white">100%</h3>
            <p className="text-xs text-gray-500">Original Brands</p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/60 shadow-xs space-y-2">
            <Truck className="w-8 h-8 text-purple-500" />
            <h3 className="text-2xl font-black text-gray-900 dark:text-white">24hr</h3>
            <p className="text-xs text-gray-500">Fast Dispatch</p>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white">Why Choose BaladDev Book Stall?</h2>
          <p className="text-xs text-gray-500">Built on values of authenticity, affordability, and student success.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/60 space-y-3 shadow-xs">
            <ShieldCheck className="w-8 h-8 text-blue-600" />
            <h3 className="text-sm font-extrabold text-gray-900 dark:text-white">Wholesale Student Pricing</h3>
            <p className="text-xs text-gray-500">We source directly from manufacturer distributors to provide students with flat discounts and coupon rewards.</p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/60 space-y-3 shadow-xs">
            <Building2 className="w-8 h-8 text-orange-500" />
            <h3 className="text-sm font-extrabold text-gray-900 dark:text-white">Bulk School & Office Orders</h3>
            <p className="text-xs text-gray-500">Custom GST invoices and bulk supply arrangements for educational institutes, coaching centers, and corporate offices.</p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/60 space-y-3 shadow-xs">
            <Sparkles className="w-8 h-8 text-emerald-500" />
            <h3 className="text-sm font-extrabold text-gray-900 dark:text-white">Dedicated WhatsApp Support</h3>
            <p className="text-xs text-gray-500">Instant answers for syllabus book queries, special order requests, and quick tracking status via WhatsApp.</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="rounded-3xl bg-blue-900 text-white p-8 text-center space-y-4">
        <h2 className="text-2xl font-black">Need Bulk Stationery For Your School or Office?</h2>
        <p className="text-xs text-blue-200 max-w-lg mx-auto">Get custom quotations with official GST billing and priority dispatch.</p>
        <button
          onClick={() => setActiveTab('contact')}
          className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-bold text-xs shadow-lg"
        >
          Contact Our B2B Sales Team
        </button>
      </div>

    </div>
  );
};
