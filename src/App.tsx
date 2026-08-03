import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { AuthModal } from './components/AuthModal';
import { CompareModal } from './components/CompareModal';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { UserDashboardPage } from './pages/UserDashboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

const AppContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col font-sans transition-colors duration-200 selection:bg-orange-500 selection:text-white">
      {/* Top Navbar */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && <HomePage />}
        {activeTab === 'shop' && <ShopPage />}
        {activeTab === 'categories' && <CategoriesPage />}
        {activeTab === 'about' && <AboutPage />}
        {activeTab === 'contact' && <ContactPage />}
        {activeTab === 'checkout' && <CheckoutPage />}
        {activeTab === 'dashboard' && <UserDashboardPage />}
        {activeTab === 'admin' && <AdminDashboardPage />}
      </main>

      {/* Floating Actions (WhatsApp, Phone Call, Back to Top) */}
      <FloatingActions />

      {/* Modals & Slide-over Drawers */}
      <CartDrawer />
      <ProductDetailModal />
      <AuthModal />
      <CompareModal />

      {/* Store Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
