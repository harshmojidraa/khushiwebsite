import React from 'react';
import { Filter, X, RotateCcw } from 'lucide-react';
import { ProductCategory, ProductBrand } from '../types';

export interface FilterCriteria {
  category: string;
  brand: string;
  maxPrice: number;
  onSaleOnly: boolean;
  minRating: number;
}

interface FilterSidebarProps {
  filters: FilterCriteria;
  onFilterChange: (newFilters: FilterCriteria) => void;
  onResetFilters: () => void;
  totalResults: number;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

const CATEGORIES: ('All' | ProductCategory)[] = [
  'All',
  'Apparel',
  'Drinkware',
  'Accessories',
  'Stationery',
  'Lifestyle',
  'Collections',
];

const BRANDS: ('All' | ProductBrand)[] = [
  'All',
  'Google',
  'Android',
  'Pixel',
  'Chrome',
  'YouTube',
  'Google Cloud',
];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults,
  isMobileOpen,
  onCloseMobile,
}) => {
  const content = (
    <div className="flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-600" />
          <h3 className="font-semibold text-slate-900 text-sm">Filters</h3>
          <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
            {totalResults} items
          </span>
        </div>
        <button
          type="button"
          onClick={onResetFilters}
          className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Category Filter */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2.5">
          Category
        </label>
        <div className="flex flex-col gap-1">
          {CATEGORIES.map((cat) => {
            const isSelected = filters.category === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onFilterChange({ ...filters, category: cat })}
                className={`text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                  isSelected
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span>{cat}</span>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Brand Filter */}
      <div className="pt-3 border-t border-slate-100">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2.5">
          Brand
        </label>
        <div className="flex flex-wrap gap-1.5">
          {BRANDS.map((brand) => {
            const isSelected = filters.brand === brand;
            return (
              <button
                key={brand}
                type="button"
                onClick={() => onFilterChange({ ...filters, brand })}
                className={`px-2.5 py-1 rounded-full text-xs transition-colors border ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 font-medium'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                }`}
              >
                {brand}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Limit */}
      <div className="pt-3 border-t border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Max Price
          </label>
          <span className="text-xs font-bold text-slate-800">
            ${filters.maxPrice}
          </span>
        </div>
        <input
          type="range"
          min={20}
          max={150}
          step={5}
          value={filters.maxPrice}
          onChange={(e) => onFilterChange({ ...filters, maxPrice: Number(e.target.value) })}
          className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-slate-400 mt-1">
          <span>$20</span>
          <span>$150</span>
        </div>
      </div>

      {/* Toggles */}
      <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
        <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={filters.onSaleOnly}
            onChange={(e) => onFilterChange({ ...filters, onSaleOnly: e.target.checked })}
            className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 accent-blue-600"
          />
          <span className="font-medium">Special Offers & Sale Items Only</span>
        </label>
      </div>

      {/* Rating Filter */}
      <div className="pt-3 border-t border-slate-100">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
          Minimum Rating
        </label>
        <div className="flex gap-1.5">
          {[0, 4.5, 4.8].map((ratingVal) => (
            <button
              key={ratingVal}
              type="button"
              onClick={() => onFilterChange({ ...filters, minRating: ratingVal })}
              className={`flex-1 py-1 rounded-md text-xs border text-center font-medium transition-colors ${
                filters.minRating === ratingVal
                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                  : 'border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              {ratingVal === 0 ? 'All' : `${ratingVal}★+`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="p-4 bg-white rounded-2xl border border-slate-200 sticky top-36">
          {content}
        </div>
      </aside>

      {/* Mobile Drawer / Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity" 
            onClick={onCloseMobile}
          />
          <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-2xl p-5 overflow-y-auto z-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
                <span className="font-bold text-slate-900 text-base">Filter Products</span>
                <button
                  type="button"
                  onClick={onCloseMobile}
                  className="p-1 rounded-lg text-slate-500 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {content}
            </div>
            <div className="pt-4 border-t border-slate-200 mt-6">
              <button
                type="button"
                onClick={onCloseMobile}
                className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-medium text-sm hover:bg-blue-700"
              >
                Show {totalResults} Results
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
