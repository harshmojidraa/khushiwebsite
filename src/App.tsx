/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { 
  PageView, 
  Product, 
  CartItem, 
  SortOption 
} from './types';
import { 
  MASTER_PRODUCTS, 
  getTrendingProducts, 
  getBestSellers, 
  getRecommendedProducts,
  getProductById 
} from './data/products';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetail } from './components/ProductDetail';
import { FilterSidebar, FilterCriteria } from './components/FilterSidebar';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  Award, 
  SlidersHorizontal, 
  Check, 
  ShieldCheck, 
  Leaf, 
  Truck, 
  RefreshCw 
} from 'lucide-react';

const INITIAL_FILTERS: FilterCriteria = {
  category: 'All',
  brand: 'All',
  maxPrice: 150,
  onSaleOnly: false,
  minRating: 0,
};

export default function App() {
  // Navigation State
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filters, setFilters] = useState<FilterCriteria>(INITIAL_FILTERS);
  const [sortOption, setSortOption] = useState<SortOption>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Cart & Wishlist State (synced with localStorage for persistence)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('google_merch_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlistIds, setWishlistIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('google_merch_wishlist');
      return saved ? new Set(JSON.parse(saved)) : new Set<string>();
    } catch {
      return new Set<string>();
    }
  });

  // UI Drawers & Notifications
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [wishlistOpen, setWishlistOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('google_merch_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  // Save wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('google_merch_wishlist', JSON.stringify(Array.from(wishlistIds)));
    } catch (e) {
      console.error(e);
    }
  }, [wishlistIds]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 2400);
  };

  // Cart Actions - NEVER mutate MASTER_PRODUCTS
  const handleAddToCart = (
    product: Product, 
    quantity: number = 1, 
    selectedColor?: string, 
    selectedSize?: string
  ) => {
    const itemKey = `${product.id}-${selectedColor || 'default'}-${selectedSize || 'default'}`;
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === itemKey);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            id: itemKey,
            product,
            quantity,
            selectedColor,
            selectedSize,
          },
        ];
      }
    });
    showToast(`Added "${product.name}" to cart`);
  };

  const handleUpdateCartQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveCartItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist Actions - NEVER mutate MASTER_PRODUCTS
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const next = new Set(prev);
      if (next.has(product.id)) {
        next.delete(product.id);
        showToast(`Removed "${product.name}" from wishlist`);
      } else {
        next.add(product.id);
        showToast(`Saved "${product.name}" to wishlist`);
      }
      return next;
    });
  };

  const handleRemoveFromWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const next = new Set(prev);
      next.delete(product.id);
      return next;
    });
  };

  const handleClearWishlist = () => {
    setWishlistIds(new Set());
  };

  // Navigation handlers
  const handleNavigate = (page: PageView, brand?: string) => {
    setCurrentPage(page);
    setSelectedProductId(null);
    if (brand) {
      setSelectedBrand(brand);
      setFilters((prev) => ({ ...prev, brand }));
    }
    // Automatically preset category filter based on page
    if (page === 'apparel') setFilters((prev) => ({ ...prev, category: 'Apparel' }));
    else if (page === 'drinkware') setFilters((prev) => ({ ...prev, category: 'Drinkware' }));
    else if (page === 'accessories') setFilters((prev) => ({ ...prev, category: 'Accessories' }));
    else if (page === 'stationery') setFilters((prev) => ({ ...prev, category: 'Stationery' }));
    else if (page === 'lifestyle') setFilters((prev) => ({ ...prev, category: 'Lifestyle' }));
    else if (page === 'collections') setFilters((prev) => ({ ...prev, category: 'Collections' }));
    else if (page === 'sale') setFilters((prev) => ({ ...prev, onSaleOnly: true, category: 'All' }));
    else if (page === 'home' || page === 'new') setFilters(INITIAL_FILTERS);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (productId: string) => {
    // If product ID exists in master list, navigate to it; if not, fallback to first valid product
    const valid = getProductById(productId);
    setSelectedProductId(valid ? valid.id : MASTER_PRODUCTS[0].id);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query.trim() && currentPage !== 'search' && currentPage !== 'product-detail') {
      setCurrentPage('search');
    } else if (!query.trim() && currentPage === 'search') {
      setCurrentPage('home');
    }
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
    setSearchQuery('');
    setSelectedBrand('All');
  };

  // Derived Products for Listing Pages - Master Catalogue is NEVER modified!
  const displayedProducts = useMemo(() => {
    // Always start with a shallow copy of MASTER_PRODUCTS
    let list = [...MASTER_PRODUCTS];

    // Page-specific base filtering
    if (currentPage === 'new') {
      list = list.filter((p) => p.isNew);
    } else if (currentPage === 'sale') {
      list = list.filter((p) => p.onSale);
    } else if (currentPage === 'apparel') {
      list = list.filter((p) => p.category === 'Apparel');
    } else if (currentPage === 'drinkware') {
      list = list.filter((p) => p.category === 'Drinkware');
    } else if (currentPage === 'accessories') {
      list = list.filter((p) => p.category === 'Accessories');
    } else if (currentPage === 'stationery') {
      list = list.filter((p) => p.category === 'Stationery');
    } else if (currentPage === 'lifestyle') {
      list = list.filter((p) => p.category === 'Lifestyle');
    } else if (currentPage === 'collections') {
      list = list.filter((p) => p.category === 'Collections');
    } else if (currentPage === 'brand') {
      if (selectedBrand && selectedBrand !== 'All') {
        list = list.filter((p) => p.brand.toLowerCase() === selectedBrand.toLowerCase());
      }
    }

    // Additional dynamic sidebar filters (if not already applied by category page)
    if (
      filters.category !== 'All' && 
      !['apparel', 'drinkware', 'accessories', 'stationery', 'lifestyle', 'collections'].includes(currentPage)
    ) {
      list = list.filter((p) => p.category.toLowerCase() === filters.category.toLowerCase());
    }

    if (filters.brand !== 'All' && currentPage !== 'brand') {
      list = list.filter((p) => p.brand.toLowerCase() === filters.brand.toLowerCase());
    }

    if (filters.maxPrice < 150) {
      list = list.filter((p) => p.price <= filters.maxPrice);
    }

    if (filters.onSaleOnly && currentPage !== 'sale') {
      list = list.filter((p) => p.onSale);
    }

    if (filters.minRating > 0) {
      list = list.filter((p) => p.rating >= filters.minRating);
    }

    // Search query filtering
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.tags && p.tags.some((t) => t.toLowerCase().includes(q)))
      );
    }

    // Sorting without mutating
    const sorted = [...list];
    if (sortOption === 'price-low') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating') {
      sorted.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === 'newest') {
      sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return sorted;
  }, [currentPage, selectedBrand, filters, searchQuery, sortOption]);

  // Wishlist products for the drawer
  const wishlistProducts = useMemo(() => {
    return MASTER_PRODUCTS.filter((p) => wishlistIds.has(p.id));
  }, [wishlistIds]);

  // Total cart count
  const totalCartCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  // Page title and subtitle helpers
  const getPageMeta = () => {
    switch (currentPage) {
      case 'new':
        return {
          title: 'New Arrivals',
          subtitle: 'Fresh drops, newly engineered gear, and limited seasonal merchandise.',
        };
      case 'apparel':
        return {
          title: 'Apparel & Outerwear',
          subtitle: 'Comfortable organic cotton tees, fleece hoodies, and weatherproof shells.',
        };
      case 'drinkware':
        return {
          title: 'Drinkware & Hydration',
          subtitle: 'Vacuum-insulated stainless steel bottles, stoneware mugs, and commuter tumblers.',
        };
      case 'accessories':
        return {
          title: 'Accessories & Bags',
          subtitle: 'Everyday tech backpacks, heavy canvas totes, caps, and organizer pouches.',
        };
      case 'stationery':
        return {
          title: 'Stationery & Workspace',
          subtitle: 'Premium dot-grid notebooks, brass rollerball pens, and desk pads.',
        };
      case 'lifestyle':
        return {
          title: 'Lifestyle & Home',
          subtitle: 'Acoustic bamboo audio, plush Android companions, and desk decor.',
        };
      case 'collections':
        return {
          title: 'Exclusive Collections',
          subtitle: 'Collectible Chrome Dino enamel pins, coasters, and heritage Google pieces.',
        };
      case 'sale':
        return {
          title: 'Special Offers & Sale',
          subtitle: 'Limited-time pricing on authentic Google branded merchandise.',
        };
      case 'brand':
        return {
          title: selectedBrand === 'All' ? 'Shop by Brand' : `${selectedBrand} Merchandise`,
          subtitle: `Explore official gear and accessories designed for ${selectedBrand === 'All' ? 'every Google brand' : selectedBrand}.`,
        };
      case 'search':
        return {
          title: `Search Results for "${searchQuery}"`,
          subtitle: `Showing ${displayedProducts.length} matching products from the master catalogue.`,
        };
      default:
        return {
          title: 'All Products',
          subtitle: 'Explore our complete merchandise catalogue.',
        };
    }
  };

  const pageMeta = getPageMeta();

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFD] text-slate-800 font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-medium px-4 py-3 rounded-xl shadow-lg border border-slate-700 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        currentPage={currentPage}
        selectedBrand={selectedBrand}
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.size}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onNavigate={handleNavigate}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* VIEW 1: PRODUCT DETAIL PAGE */}
        {currentPage === 'product-detail' && selectedProductId && (
          <ProductDetail
            productId={selectedProductId}
            wishlistIds={wishlistIds}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            onBack={() => setCurrentPage('home')}
          />
        )}

        {/* VIEW 2: HOMEPAGE */}
        {currentPage === 'home' && !searchQuery.trim() && (
          <div className="flex flex-col gap-12 sm:gap-16">
            {/* Clean Google Store Hero */}
            <section className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-100 py-12 sm:py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl flex flex-col items-start gap-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Official Google Merchandise Store</span>
                  </div>

                  <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15]">
                    Thoughtfully crafted gear for developers, creators & fans.
                  </h1>

                  <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                    Explore sustainably sourced apparel, insulated drinkware, ergonomic tech accessories, and limited edition collections.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      id="hero-shop-new-btn"
                      type="button"
                      onClick={() => handleNavigate('new')}
                      className="py-3 px-6 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 active:scale-[0.99] transition-all flex items-center gap-2 shadow-xs"
                    >
                      <span>Explore New Drops</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      id="hero-shop-apparel-btn"
                      type="button"
                      onClick={() => handleNavigate('apparel')}
                      className="py-3 px-6 rounded-xl bg-white border border-slate-300 text-slate-800 text-sm font-semibold hover:bg-slate-50 transition-colors shadow-2xs"
                    >
                      Shop Apparel
                    </button>
                  </div>
                </div>

                {/* Quick Category Chips */}
                <div className="mt-10 pt-8 border-t border-slate-200/80 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mr-2 shrink-0">
                    Explore:
                  </span>
                  {[
                    { label: 'All Apparel', page: 'apparel' as PageView },
                    { label: 'Drinkware & Mugs', page: 'drinkware' as PageView },
                    { label: 'Bags & Accessories', page: 'accessories' as PageView },
                    { label: 'Stationery & Pens', page: 'stationery' as PageView },
                    { label: 'Lifestyle & Audio', page: 'lifestyle' as PageView },
                    { label: 'Chrome & Dino Pins', page: 'collections' as PageView },
                    { label: 'Special Sale', page: 'sale' as PageView },
                  ].map((chip) => (
                    <button
                      key={chip.label}
                      type="button"
                      onClick={() => handleNavigate(chip.page)}
                      className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-700 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50/50 whitespace-nowrap transition-colors shadow-2xs"
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* HOMEPAGE SECTION 1: TRENDING PRODUCTS (4-6 Products) */}
            <section id="trending-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                      Trending Products
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500">
                      Most viewed and popular items across the Google campus this week
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleNavigate('new')}
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800"
                >
                  <span>View more</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 4 products per row desktop, 3 tablet, 2 mobile */}
              <ProductGrid
                products={getTrendingProducts(4)}
                wishlistIds={wishlistIds}
                onSelectProduct={handleSelectProduct}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
              />
            </section>

            {/* HOMEPAGE SECTION 2: BEST SELLERS (4-6 Products) */}
            <section id="bestsellers-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                      Best Sellers
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500">
                      Customer favorites with the highest ratings and repeat orders
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleNavigate('apparel')}
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800"
                >
                  <span>View all</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 4 products per row desktop, 3 tablet, 2 mobile */}
              <ProductGrid
                products={getBestSellers(4)}
                wishlistIds={wishlistIds}
                onSelectProduct={handleSelectProduct}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
              />
            </section>

            {/* Brand Banner Strip */}
            <section className="bg-slate-900 text-white py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-8">
                  <h3 className="text-2xl font-bold tracking-tight mb-2">
                    Official Brands Under One Roof
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Discover curated gear tailored to your favorite Google ecosystems.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {[
                    { name: 'Google Core', brand: 'Google' },
                    { name: 'Android', brand: 'Android' },
                    { name: 'Google Pixel', brand: 'Pixel' },
                    { name: 'Chrome', brand: 'Chrome' },
                    { name: 'YouTube', brand: 'YouTube' },
                    { name: 'Google Cloud', brand: 'Google Cloud' },
                  ].map((item) => (
                    <button
                      key={item.brand}
                      type="button"
                      onClick={() => handleNavigate('brand', item.brand)}
                      className="p-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 text-center transition-all group"
                    >
                      <span className="block font-semibold text-sm text-white group-hover:text-blue-400 transition-colors">
                        {item.name}
                      </span>
                      <span className="text-[11px] text-slate-400 mt-1 inline-flex items-center gap-1">
                        <span>Shop Brand</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* HOMEPAGE SECTION 3: RECOMMENDED PRODUCTS (4-6 Products) */}
            <section id="recommended-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                      Recommended For You
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500">
                      Handpicked workspace essentials and everyday carry favorites
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleNavigate('lifestyle')}
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800"
                >
                  <span>Explore lifestyle</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 4 products per row desktop, 3 tablet, 2 mobile */}
              <ProductGrid
                products={getRecommendedProducts(4)}
                wishlistIds={wishlistIds}
                onSelectProduct={handleSelectProduct}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
              />
            </section>

            {/* Value Props Strip */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">100% Genuine Merchandise</h4>
                    <p className="text-[11px] text-slate-500">Direct from Google campus store</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-emerald-600 shrink-0">
                    <Leaf className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Sustainable Materials</h4>
                    <p className="text-[11px] text-slate-500">Organic cotton & recycled polymers</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-purple-600 shrink-0">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Free $50+ Shipping</h4>
                    <p className="text-[11px] text-slate-500">Fast, carbon-neutral fulfillment</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-rose-600 shrink-0">
                    <RefreshCw className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">30-Day Hassle-Free Returns</h4>
                    <p className="text-[11px] text-slate-500">Quick refunds and size exchanges</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* VIEW 3: CATEGORY / BRAND / SEARCH / LISTING PAGES */}
        {(currentPage !== 'home' || searchQuery.trim()) && currentPage !== 'product-detail' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
            {/* Page Title & Breadcrumbs */}
            <div className="mb-8">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-2">
                <button 
                  type="button" 
                  onClick={() => handleNavigate('home')} 
                  className="hover:text-slate-800"
                >
                  Home
                </button>
                <span>/</span>
                <span className="text-slate-900 font-semibold">{pageMeta.title}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                    {pageMeta.title}
                  </h1>
                  <p className="text-sm text-slate-500 mt-1">
                    {pageMeta.subtitle}
                  </p>
                </div>

                {/* Mobile Filter Toggle & Sort Bar */}
                <div className="flex items-center gap-2.5">
                  <button
                    id="mobile-filter-open-btn"
                    type="button"
                    onClick={() => setMobileFilterOpen(true)}
                    className="lg:hidden px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-700 flex items-center gap-1.5 shadow-2xs hover:bg-slate-50"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
                    <span>Filter</span>
                  </button>

                  {/* Sort Option Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 hidden sm:inline">Sort:</span>
                    <select
                      id="product-sort-select"
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value as SortOption)}
                      className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
                    >
                      <option value="featured">Featured First</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                      <option value="newest">Newest First</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Brand Selector Tabs (if on brand page) */}
              {currentPage === 'brand' && (
                <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-2">
                  {['All', 'Google', 'Android', 'Pixel', 'Chrome', 'YouTube', 'Google Cloud'].map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => {
                        setSelectedBrand(b);
                        setFilters((prev) => ({ ...prev, brand: b }));
                      }}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors border ${
                        selectedBrand === b
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {b === 'All' ? 'All Brands' : b}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Main Listing Layout: Sidebar + Product Grid */}
            <div className="flex gap-8 items-start">
              {/* Sidebar Filters */}
              <FilterSidebar
                filters={filters}
                onFilterChange={setFilters}
                onResetFilters={handleResetFilters}
                totalResults={displayedProducts.length}
                isMobileOpen={mobileFilterOpen}
                onCloseMobile={() => setMobileFilterOpen(false)}
              />

              {/* Responsive Product Grid */}
              <div className="flex-1 w-full min-w-0">
                <ProductGrid
                  products={displayedProducts}
                  wishlistIds={wishlistIds}
                  onSelectProduct={handleSelectProduct}
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                  onClearFilters={handleResetFilters}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onContinueShopping={() => handleNavigate('home')}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onAddToCart={(p) => {
          handleAddToCart(p, 1);
        }}
        onSelectProduct={handleSelectProduct}
        onClearWishlist={handleClearWishlist}
      />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
