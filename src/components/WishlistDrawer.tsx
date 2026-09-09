import React from 'react';
import { X, Trash2, ShoppingBag, Heart } from 'lucide-react';
import { Product } from '../types';
import { FALLBACK_PRODUCT_IMAGE } from '../data/products';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (productId: string) => void;
  onClearWishlist: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onAddToCart,
  onSelectProduct,
  onClearWishlist,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              <h2 className="text-lg font-bold text-slate-900">Saved Wishlist</h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                {wishlistProducts.length} items
              </span>
            </div>
            <button
              id="wishlist-drawer-close-btn"
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List or Empty State */}
          {wishlistProducts.length === 0 ? (
            <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center mb-4">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-1">No saved items</h3>
              <p className="text-sm text-slate-500 max-w-xs mb-6">
                Tap the heart on any product card to save your favorite Google gear for later.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-5 rounded-xl bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition-colors"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 divide-y divide-slate-100 space-y-4">
                {wishlistProducts.map((product) => (
                  <div key={product.id} className="pt-4 first:pt-0 flex gap-4">
                    <div 
                      onClick={() => {
                        onSelectProduct(product.id);
                        onClose();
                      }}
                      className="w-20 h-20 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200 cursor-pointer"
                    >
                      <img
                        src={product.image || FALLBACK_PRODUCT_IMAGE}
                        alt={product.name}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = FALLBACK_PRODUCT_IMAGE;
                        }}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-[10px] uppercase font-semibold text-slate-400">
                            {product.brand} · {product.category}
                          </div>
                          <h4 
                            onClick={() => {
                              onSelectProduct(product.id);
                              onClose();
                            }}
                            className="text-xs font-semibold text-slate-900 line-clamp-1 cursor-pointer hover:text-blue-600"
                          >
                            {product.name}
                          </h4>
                          <span className="text-xs font-bold text-slate-900 mt-0.5 block">
                            ${product.price.toFixed(2)}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemoveFromWishlist(product)}
                          className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                          aria-label="Remove from wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            onAddToCart(product);
                          }}
                          className="w-full py-1.5 px-3 rounded-lg bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Move to Cart</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Actions */}
              <div className="p-4 sm:p-6 border-t border-slate-200 bg-slate-50/70 flex items-center justify-between">
                <button
                  type="button"
                  onClick={onClearWishlist}
                  className="text-xs text-slate-500 hover:text-rose-600 font-medium"
                >
                  Clear Wishlist
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-xs font-medium hover:bg-slate-300"
                >
                  Continue Browsing
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
