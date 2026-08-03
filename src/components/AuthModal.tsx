import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Lock, Mail, User as UserIcon, Phone, KeyRound, ShieldCheck, Sparkles } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, loginUser, registerUser, showToast } = useApp();

  const [mode, setMode] = useState<'login' | 'register' | 'otp' | 'forgot'>('login');
  
  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please enter both email and password.');
      return;
    }
    loginUser(email, password);
    setIsAuthModalOpen(false);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      showToast('Please fill in all required fields.');
      return;
    }
    registerUser(name, email, phone);
    setIsAuthModalOpen(false);
  };

  const handleDemoUser = () => {
    loginUser('customer.rohan@gmail.com', 'password123');
    setIsAuthModalOpen(false);
  };

  const handleDemoAdmin = () => {
    loginUser('admin.baladdev@stall.com', 'admin123');
    setIsAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        
        {/* Top Header */}
        <div className="p-6 bg-gradient-to-br from-blue-900 to-blue-950 text-white relative">
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-blue-800 text-blue-200 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2 text-orange-400 font-bold text-xs uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>BaladDev Account</span>
          </div>

          <h2 className="text-xl font-black">
            {mode === 'login' && 'Welcome Back'}
            {mode === 'register' && 'Create Your Account'}
            {mode === 'otp' && 'OTP Verification'}
            {mode === 'forgot' && 'Reset Password'}
          </h2>
          <p className="text-xs text-blue-200 mt-1">
            Access your orders, wishlist, and exclusive member discounts.
          </p>

          {/* Quick Demo Credentials */}
          <div className="mt-4 pt-3 border-t border-blue-800/60 flex items-center gap-2">
            <button
              onClick={handleDemoUser}
              className="flex-1 py-1.5 px-2 bg-blue-800/80 hover:bg-orange-500 rounded-lg text-[11px] font-semibold transition-colors"
            >
              👤 Demo Customer
            </button>
            <button
              onClick={handleDemoAdmin}
              className="flex-1 py-1.5 px-2 bg-blue-800/80 hover:bg-orange-500 rounded-lg text-[11px] font-semibold transition-colors"
            >
              🔑 Demo Admin
            </button>
          </div>
        </div>

        {/* Modal Form Body */}
        <div className="p-6 space-y-4">
          
          {mode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-600"
                  />
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Password</label>
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                  >
                    Forgot?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-600"
                  />
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-md transition-all"
              >
                Sign In
              </button>

              <div className="relative my-4 text-center text-xs text-gray-400">
                <span className="bg-white dark:bg-gray-900 px-3 z-10 relative">OR CONTINUE WITH</span>
                <div className="absolute top-1/2 inset-x-0 border-t border-gray-200 dark:border-gray-800"></div>
              </div>

              <button
                type="button"
                onClick={handleDemoUser}
                className="w-full py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-xs font-bold text-gray-700 dark:text-gray-200 flex items-center justify-center space-x-2 transition-colors"
              >
                <span>Google Sign In</span>
              </button>

              <p className="text-center text-xs text-gray-500 pt-2">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className="text-blue-600 font-bold hover:underline"
                >
                  Register Now
                </button>
              </p>
            </form>
          )}

          {mode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Rohan Patel"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white"
                  />
                  <UserIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="rohan@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white"
                  />
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white"
                  />
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md transition-all"
              >
                Create Account
              </button>

              <p className="text-center text-xs text-gray-500 pt-2">
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-blue-600 font-bold hover:underline"
                >
                  Login Here
                </button>
              </p>
            </form>
          )}

          {mode === 'forgot' && (
            <div className="space-y-4">
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Enter your registered phone or email address to receive a 6-digit OTP code.
              </p>
              <input
                type="text"
                placeholder="Email or Mobile number"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs"
              />
              <button
                onClick={() => setMode('otp')}
                className="w-full py-2.5 rounded-xl bg-blue-700 text-white text-xs font-bold"
              >
                Send OTP
              </button>
              <button
                onClick={() => setMode('login')}
                className="w-full text-center text-xs text-gray-500 font-bold hover:underline"
              >
                Back to Login
              </button>
            </div>
          )}

          {mode === 'otp' && (
            <div className="space-y-4 text-center">
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Enter the 4-digit verification code sent to your phone.
              </p>
              <input
                type="text"
                maxLength={4}
                placeholder="4421"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-32 mx-auto text-center tracking-widest text-lg font-bold py-2 rounded-xl border border-gray-300 dark:border-gray-700"
              />
              <button
                onClick={() => { loginUser('user@baladdev.com', 'pass'); setIsAuthModalOpen(false); }}
                className="w-full py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold"
              >
                Verify & Login
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
