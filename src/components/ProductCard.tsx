import React, { useState } from 'react';
import { Star, Heart, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../types';
import { FALLBACK_PRODUCT_IMAGE } from '../data/products';

interface ProductCardProps {
  product: Product;
  isWishlisted?: boolean;
  onSelectProduct: (productId: string) => void;
  onAddToCart: (product: Product, e?: React.MouseEvent) => void;
  onToggleWishlist: (product: Product, e?: React.MouseEvent) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted = false,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
}) => {
  const [imageSrc, setImageSrc] = useState<string>(product?.image || FALLBACK_PRODUCT_IMAGE);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [isAddedRecently, setIsAddedRecently] = useState<boolean>(false);

  // Safe property extraction to ensure card NEVER disappears even if a field is missing
  const productId = product?.id || 'unknown-product';
  const productName = product?.name || 'Google Merchandise Product';
  const productPrice = typeof product?.price === 'number' ? product.price : 0;
  const originalPrice = product?.originalPrice;
  const rating = typeof product?.rating === 'number' ? product.rating : 4.8;
  const reviewCount = typeof product?.reviewCount === 'number' ? product.reviewCount : 50;
  const category = product?.category || 'Merchandise';
  const brand = product?.brand || 'Google';
  const onSale = Boolean(product?.onSale && originalPrice && originalPrice > productPrice);

  const handleImageError = () => {
    setImageSrc(FALLBACK_PRODUCT_IMAGE);
    setImageLoaded(true);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, e);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1500);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(product, e);
  };

  return (
    <div
      id={`product-card-${productId}`}
      onClick={() => onSelectProduct(productId)}
      className="group relative flex flex-col bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200 cursor-pointer"
    >
      {/* Product Image Container */}
      <div className="relative aspect-square w-full bg-slate-50 overflow-hidden">
        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1">
          {onSale && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200 shadow-2xs">
              Sale
            </span>
          )}
          {product?.isNew && !onSale && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200 shadow-2xs">
              New
            </span>
          )}
          {product?.isBestSeller && !product?.isNew && !onSale && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200 shadow-2xs">
              Best Seller
            </span>
          )}
        </div>

        {/* Wishlist Button - ALWAYS RENDERED */}
        <button
          id={`wishlist-btn-${productId}`}
          type="button"
          onClick={handleWishlistClick}
          aria-label={isWishlisted ? `Remove ${productName} from wishlist` : `Add ${productName} to wishlist`}
          className={`absolute top-2.5 right-2.5 z-10 p-2 rounded-full transition-colors duration-150 ${
            isWishlisted
              ? 'bg-white text-rose-600 shadow-sm'
              : 'bg-white/90 text-slate-500 hover:text-rose-600 hover:bg-white shadow-2xs'
          }`}
        >
          <Heart
            className={`w-4 h-4 transition-transform duration-150 ${
              isWishlisted ? 'fill-rose-500 text-rose-500 scale-110' : ''
            }`}
          />
        </button>

        {/* Product Image - With guaranteed fallback */}
        <img
          src={imageSrc}
          alt={productName}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={handleImageError}
          className={`w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-80'
          }`}
        />
      </div>

      {/* Product Content Details */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between gap-2.5">
        <div>
          {/* Brand & Category info */}
          <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-1">
            <span>{brand}</span>
            <span className="text-slate-400">·</span>
            <span>{category}</span>
          </div>

          {/* Product Name */}
          <h3 className="text-sm font-medium text-slate-900 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
            {productName}
          </h3>

          {/* Rating - ALWAYS RENDERED */}
          <div className="flex items-center gap-1.5 mt-1.5">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            </div>
            <span className="text-xs font-medium text-slate-700">{rating.toFixed(1)}</span>
            <span className="text-xs text-slate-400">({reviewCount})</span>
          </div>
        </div>

        {/* Price and Add to Cart Section */}
        <div className="pt-2 border-t border-slate-100 flex flex-col gap-2.5 mt-auto">
          {/* Price - ALWAYS RENDERED */}
          <div className="flex items-baseline gap-2">
            <span className="text-base sm:text-lg font-semibold text-slate-900">
              ${productPrice.toFixed(2)}
            </span>
            {onSale && originalPrice && (
              <span className="text-xs text-slate-400 line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Add to Cart Button - ALWAYS RENDERED */}
          <button
            id={`add-to-cart-btn-${productId}`}
            type="button"
            onClick={handleAddToCart}
            className={`w-full py-2 px-3 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all duration-150 ${
              isAddedRecently
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-900 text-white hover:bg-slate-800 active:scale-[0.98]'
            }`}
          >
            {isAddedRecently ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
