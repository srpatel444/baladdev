import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Building 
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { storeProfile, showToast } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your message has been sent successfully! Our store team will reply shortly.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Page Title Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
          Get In Touch With BaladDev Book Stall
        </h1>
        <p className="text-xs text-gray-500">
          Have questions about book availability, bulk stationery orders, or order tracking? We are here to help!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Store Info Cards */}
        <div className="space-y-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/60 shadow-xs space-y-4">
            <h2 className="text-base font-extrabold text-gray-900 dark:text-white flex items-center space-x-2">
              <Building className="w-5 h-5 text-blue-600" />
              <span>Store Location</span>
            </h2>

            <div className="space-y-3 text-xs text-gray-600 dark:text-gray-300">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <p>
                  <strong>{storeProfile.storeName}</strong><br />
                  {storeProfile.addressLine1}{storeProfile.addressLine2 ? `, ${storeProfile.addressLine2}` : ''}<br />
                  {storeProfile.city}, {storeProfile.state} - {storeProfile.pincode}
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <p>{storeProfile.phonePrimary} {storeProfile.phoneSecondary ? `/ ${storeProfile.phoneSecondary}` : ''}</p>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                <p>{storeProfile.email}</p>
              </div>

              <div className="flex items-start space-x-3 pt-2 border-t border-gray-100 dark:border-gray-700">
                <Clock className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">Opening Hours:</p>
                  <p>{storeProfile.openingHoursWeekday}</p>
                  <p>{storeProfile.openingHoursSunday}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick WhatsApp Action Box */}
          <div className="p-6 rounded-3xl bg-emerald-600 text-white space-y-3 shadow-lg">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-6 h-6" />
              <h3 className="font-extrabold text-sm">Need Instant Assistance?</h3>
            </div>
            <p className="text-xs text-emerald-100">
              Chat directly with our book store representative on WhatsApp for quick book stock checks.
            </p>
            <a
              href={`https://wa.me/${storeProfile.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(storeProfile.storeName)},%20I%20have%20an%20inquiry.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full py-2.5 bg-white text-emerald-800 rounded-xl font-black text-xs text-center shadow-sm hover:bg-emerald-50"
            >
              Open WhatsApp Chat
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/60 shadow-xs">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
              <h2 className="text-2xl font-black text-gray-900 dark:text-white">Message Sent Successfully!</h2>
              <p className="text-xs text-gray-500 max-w-md mx-auto">
                Thank you for contacting BaladDev Book Stall. Our team will review your inquiry and reach back via phone/email within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 bg-blue-700 text-white text-xs font-bold rounded-xl"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-lg font-extrabold text-gray-900 dark:text-white">Send Us A Direct Message</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Priyansh Patel"
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
                    placeholder="+91 98980 xxxxx"
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
                  placeholder="your.email@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs bg-gray-50 dark:bg-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Inquiry Type</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Book Stock Inquiry">Book Stock Availability</option>
                  <option value="Bulk School/Office Order">Bulk School / Office Supply Quote</option>
                  <option value="Order Support">Existing Order Support</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Your Message</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe the books or stationery items you are looking for..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs bg-gray-50 dark:bg-gray-900"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>

      </div>

      {/* Embedded Location Map Section */}
      <div className="rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-md">
        <iframe
          title="BaladDev Book Stall Google Map Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14736.812328151322!2d72.9238!3d22.5532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDMzJzExLjUiTiA3MsKwNTUnMjUuNyJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
          width="100%"
          height="320"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
        />
      </div>

    </div>
  );
};
