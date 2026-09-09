import React, { useState } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  Menu, 
  X, 
  Tag, 
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { PageView } from '../types';

interface HeaderProps {
  currentPage: PageView;
  selectedBrand?: string;
  cartCount: number;
  wishlistCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onNavigate: (page: PageView, brand?: string) => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  selectedBrand,
  cartCount,
  wishlistCount,
  searchQuery,
  onSearchChange,
  onNavigate,
  onOpenCart,
  onOpenWishlist,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [brandDropdownOpen, setBrandDropdownOpen] = useState(false);

  const navItems: { label: string; page: PageView; icon?: React.ReactNode; isSale?: boolean }[] = [
    { label: 'Home', page: 'home' },
    { label: 'New', page: 'new', icon: <Sparkles className="w-3.5 h-3.5 text-blue-500" /> },
    { label: 'Apparel', page: 'apparel' },
    { label: 'Drinkware', page: 'drinkware' },
    { label: 'Accessories', page: 'accessories' },
    { label: 'Stationery', page: 'stationery' },
    { label: 'Lifestyle', page: 'lifestyle' },
    { label: 'Collections', page: 'collections' },
    { label: 'Sale', page: 'sale', icon: <Tag className="w-3.5 h-3.5 text-rose-500" />, isSale: true },
  ];

  const brands = [
    { name: 'All Brands', value: 'All' },
    { name: 'Google', value: 'Google' },
    { name: 'Android', value: 'Android' },
    { name: 'Pixel', value: 'Pixel' },
    { name: 'Chrome', value: 'Chrome' },
    { name: 'YouTube', value: 'YouTube' },
    { name: 'Google Cloud', value: 'Google Cloud' },
  ];

  const handleNavClick = (page: PageView) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    setBrandDropdownOpen(false);
  };

  const handleBrandSelect = (brandName: string) => {
    onNavigate('brand', brandName);
    setBrandDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Announcement Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 text-center font-normal flex items-center justify-center gap-2">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          Free standard shipping on all orders over $50
        </span>
        <span className="hidden sm:inline text-slate-500">|</span>
        <span className="hidden sm:inline text-slate-400">Official Google Merchandise Catalogue</span>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              id="mobile-menu-toggle-btn"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Logo */}
          <button
            id="brand-logo-btn"
            type="button"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left group"
          >
            {/* Iconic Google 4-Color Mark */}
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-[#4285F4]"></span>
              <span className="w-3 h-3 rounded-full bg-[#EA4335]"></span>
              <span className="w-3 h-3 rounded-full bg-[#FBBC05]"></span>
              <span className="w-3 h-3 rounded-full bg-[#34A853]"></span>
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-semibold tracking-tight text-slate-900">
                Google
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 -mt-1">
                Merchandise Store
              </span>
            </div>
          </button>

          {/* Search Bar - Center Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                id="header-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search apparel, drinkware, accessories..."
                className="w-full pl-10 pr-9 py-2 rounded-full border border-slate-300 bg-slate-50/80 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition-all"
              />
              <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Right Action Icons: Wishlist & Cart */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Wishlist Button */}
            <button
              id="header-wishlist-btn"
              type="button"
              onClick={onOpenWishlist}
              className="relative p-2.5 text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors"
              aria-label="View Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              id="header-cart-btn"
              type="button"
              onClick={onOpenCart}
              className="relative flex items-center gap-2 py-2 px-3 sm:px-4 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-xs"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline text-xs font-semibold">Cart</span>
              <span className="w-5 h-5 rounded-full bg-blue-500 text-white text-[11px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="pb-3 md:hidden">
          <div className="relative w-full">
            <input
              id="mobile-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-9 pr-8 py-2 rounded-full border border-slate-300 bg-slate-50 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Desktop Primary Navigation Bar */}
        <nav className="hidden lg:flex items-center gap-1 py-2 border-t border-slate-100 overflow-x-auto text-sm font-medium">
          {navItems.map((item) => {
            const isActive = currentPage === item.page;
            return (
              <button
                key={item.page}
                id={`nav-link-${item.page}`}
                type="button"
                onClick={() => handleNavClick(item.page)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  isActive
                    ? 'text-blue-600 bg-blue-50/80 font-semibold'
                    : item.isSale
                    ? 'text-rose-600 hover:bg-rose-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            );
          })}

          {/* Shop by Brand Dropdown */}
          <div className="relative">
            <button
              id="nav-brand-dropdown-btn"
              type="button"
              onClick={() => setBrandDropdownOpen(!brandDropdownOpen)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1 ${
                currentPage === 'brand'
                  ? 'text-blue-600 bg-blue-50 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span>Shop by Brand</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {brandDropdownOpen && (
              <div 
                className="absolute left-0 mt-1 w-48 rounded-xl bg-white border border-slate-200 shadow-lg py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100"
                onMouseLeave={() => setBrandDropdownOpen(false)}
              >
                <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Select Brand
                </div>
                {brands.map((b) => (
                  <button
                    key={b.value}
                    id={`brand-select-${b.value.toLowerCase().replace(/\s+/g, '-')}`}
                    type="button"
                    onClick={() => handleBrandSelect(b.value)}
                    className={`w-full text-left px-3 py-2 text-xs hover:bg-slate-50 transition-colors flex items-center justify-between ${
                      selectedBrand === b.value && currentPage === 'brand'
                        ? 'font-semibold text-blue-600 bg-blue-50/50'
                        : 'text-slate-700'
                    }`}
                  >
                    <span>{b.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2">
            Categories
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {navItems.map((item) => (
              <button
                key={item.page}
                id={`mobile-nav-${item.page}`}
                type="button"
                onClick={() => handleNavClick(item.page)}
                className={`px-3 py-2 text-left text-sm rounded-lg flex items-center gap-2 ${
                  currentPage === item.page
                    ? 'bg-blue-50 text-blue-600 font-semibold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 mb-2">
              Shop By Brand
            </div>
            <div className="flex flex-wrap gap-1.5">
              {brands.map((b) => (
                <button
                  key={b.value}
                  type="button"
                  onClick={() => handleBrandSelect(b.value)}
                  className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                    selectedBrand === b.value && currentPage === 'brand'
                      ? 'border-blue-600 bg-blue-50 text-blue-700 font-medium'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {b.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
