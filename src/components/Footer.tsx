import React, { useState } from 'react';
import { PageView } from '../types';
import { Mail, Check, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageView, brand?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="w-full bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-20">
      {/* Upper Footer: Newsletter & Brand Value */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4285F4]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#EA4335]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#FBBC05]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#34A853]"></span>
              </div>
              <span className="text-white font-semibold text-base tracking-tight">
                Google Merchandise Store
              </span>
            </div>
            <p className="text-slate-400 text-xs max-w-md leading-relaxed">
              Official merchandise from Google, Android, Pixel, Chrome, and YouTube.
              Designed with sustainable materials, clean aesthetics, and purpose.
            </p>
          </div>

          <div className="md:col-span-6">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md ml-auto">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email for new drops..."
                  required
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 text-xs focus:outline-none focus:border-blue-500"
                />
                <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
              </div>
              <button
                type="submit"
                className="py-2.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap"
              >
                {subscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Subscribed</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('apparel')}
                  className="hover:text-white transition-colors"
                >
                  Apparel & Outerwear
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('drinkware')}
                  className="hover:text-white transition-colors"
                >
                  Drinkware & Bottles
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('accessories')}
                  className="hover:text-white transition-colors"
                >
                  Bags & Accessories
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('stationery')}
                  className="hover:text-white transition-colors"
                >
                  Stationery & Writing
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('lifestyle')}
                  className="hover:text-white transition-colors"
                >
                  Lifestyle & Desk Decor
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('collections')}
                  className="hover:text-white transition-colors"
                >
                  Exclusive Collections
                </button>
              </li>
            </ul>
          </div>

          {/* Brands */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">
              Shop by Brand
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('brand', 'Google')}
                  className="hover:text-white transition-colors"
                >
                  Google Core
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('brand', 'Android')}
                  className="hover:text-white transition-colors"
                >
                  Android
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('brand', 'Pixel')}
                  className="hover:text-white transition-colors"
                >
                  Google Pixel
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('brand', 'Chrome')}
                  className="hover:text-white transition-colors"
                >
                  Chrome
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('brand', 'YouTube')}
                  className="hover:text-white transition-colors"
                >
                  YouTube
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('brand', 'Google Cloud')}
                  className="hover:text-white transition-colors"
                >
                  Google Cloud
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5">
              <li className="hover:text-white cursor-pointer">Order Tracking</li>
              <li className="hover:text-white cursor-pointer">Shipping & Delivery</li>
              <li className="hover:text-white cursor-pointer">Returns & Exchanges</li>
              <li className="hover:text-white cursor-pointer">Size Guide</li>
              <li className="hover:text-white cursor-pointer">Frequently Asked Questions</li>
              <li className="hover:text-white cursor-pointer">Contact Support</li>
            </ul>
          </div>

          {/* Trust & Sustainability */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">
              Our Commitment
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">
              We strive to create high-quality merchandise using recycled, certified organic, and low-impact materials.
            </p>
            <div className="flex items-center gap-2 text-slate-300 text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Official 100% Genuine Merchandise</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
        <div className="flex items-center gap-2">
          <span>© {new Date().getFullYear()} Google LLC. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
          <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
          <span className="hover:text-slate-400 cursor-pointer">Cookie Preferences</span>
        </div>
      </div>
    </footer>
  );
};
