import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { PackageOpen } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  wishlistIds: Set<string>;
  onSelectProduct: (productId: string) => void;
  onAddToCart: (product: Product, e?: React.MouseEvent) => void;
  onToggleWishlist: (product: Product, e?: React.MouseEvent) => void;
  onClearFilters?: () => void;
  title?: string;
  subtitle?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  wishlistIds,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  onClearFilters,
  title,
  subtitle,
}) => {
  return (
    <div className="w-full">
      {/* Optional Header */}
      {(title || subtitle) && (
        <div className="mb-6 flex flex-col gap-1">
          {title && (
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-sm text-slate-500">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Empty State Guard */}
      {(!products || products.length === 0) ? (
        <div className="py-16 px-4 text-center rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
            <PackageOpen className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-slate-800 mb-1">
            No matching products found
          </h3>
          <p className="text-sm text-slate-500 max-w-sm mb-5">
            Try adjusting your search query, clearing specific filters, or browsing other categories.
          </p>
          {onClearFilters && (
            <button
              id="empty-grid-clear-filters-btn"
              type="button"
              onClick={onClearFilters}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors shadow-xs"
            >
              Reset All Filters
            </button>
          )}
        </div>
      ) : (
        /* Responsive Grid: 2 cols Mobile, 3 cols Tablet (md), 4 cols Desktop (lg) */
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlistIds.has(product.id)}
              onSelectProduct={onSelectProduct}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      )}
    </div>
  );
};
