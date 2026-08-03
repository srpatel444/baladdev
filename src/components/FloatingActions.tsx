import React, { useState, useEffect } from 'react';
import { MessageCircle, Phone, ArrowUp } from 'lucide-react';

export const FloatingActions: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-3">
      {/* Back to top button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="w-11 h-11 rounded-full bg-gray-900 text-white shadow-lg hover:bg-gray-800 transition-all flex items-center justify-center transform hover:scale-110 active:scale-95"
          title="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Floating Call Button */}
      <a
        href="tel:+919876543210"
        className="w-12 h-12 rounded-full bg-blue-700 text-white shadow-xl hover:bg-blue-800 transition-all flex items-center justify-center transform hover:scale-110 active:scale-95 relative group"
        title="Call BaladDev Store"
      >
        <Phone className="w-5 h-5" />
        <span className="absolute right-14 bg-gray-900 text-white text-xs px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
          Call Store
        </span>
      </a>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919876543210?text=Hello%20BaladDev%20Book%20Stall,%20I%20have%20an%20inquiry%20about%20stationery%20and%20books."
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-emerald-500 text-white shadow-xl hover:bg-emerald-600 transition-all flex items-center justify-center transform hover:scale-110 active:scale-95 relative group animate-pulse hover:animate-none"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="absolute right-14 bg-gray-900 text-white text-xs px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
          WhatsApp Chat
        </span>
      </a>
    </div>
  );
};
