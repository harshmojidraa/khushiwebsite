import React, { useState } from 'react';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  ArrowLeft, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Check, 
  Share2 
} from 'lucide-react';
import { Product } from '../types';
import { getProductById, getRelatedProducts, FALLBACK_PRODUCT_IMAGE } from '../data/products';
import { ProductCard } from './ProductCard';

interface ProductDetailProps {
  productId: string;
  wishlistIds: Set<string>;
  onSelectProduct: (id: string) => void;
  onAddToCart: (product: Product, quantity?: number, selectedColor?: string, selectedSize?: string) => void;
  onToggleWishlist: (product: Product) => void;
  onBack: () => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  productId,
  wishlistIds,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  onBack,
}) => {
  // Safe lookup: if invalid ID passed, retrieve first product to never show blank broken page
  const product: Product = getProductById(productId) || getProductById('apparel-pixel-eco-hoodie')!;
  
  const [selectedColor, setSelectedColor] = useState<string>(product.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[1] || product.sizes?.[0] || '');
  const [quantity, setQuantity] = useState<number>(1);
  const [imageSrc, setImageSrc] = useState<string>(product.image || FALLBACK_PRODUCT_IMAGE);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // When productId changes, sync state
  React.useEffect(() => {
    if (product) {
      setSelectedColor(product.colors?.[0] || '');
      setSelectedSize(product.sizes?.[1] || product.sizes?.[0] || '');
      setQuantity(1);
      setImageSrc(product.image || FALLBACK_PRODUCT_IMAGE);
    }
  }, [product?.id]);

  const relatedProducts = getRelatedProducts(product.id, 4);
  const isWishlisted = wishlistIds.has(product.id);

  const handleAddToCart = () => {
    onAddToCart(product, quantity, selectedColor || undefined, selectedSize || undefined);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Back to Catalogue Navigation */}
      <button
        id="detail-back-btn"
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors mb-6 group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span>Back to catalogue</span>
      </button>

      {/* Main Product Presentation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Product Photography */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="relative aspect-4/3 w-full bg-slate-100 rounded-2xl overflow-hidden border border-slate-200">
            <img
              src={imageSrc}
              alt={product.name}
              onError={() => setImageSrc(FALLBACK_PRODUCT_IMAGE)}
              className="w-full h-full object-cover object-center"
            />
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5">
              {product.onSale && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-500 text-white shadow-sm">
                  Special Offer
                </span>
              )}
              {product.isNew && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white shadow-sm">
                  New Arrival
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Product Config & Purchase Details */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div>
            {/* Brand & Category Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
              <span className="text-blue-600 font-semibold">{product.brand}</span>
              <span>·</span>
              <span>{product.category}</span>
            </div>

            {/* Product Title */}
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 leading-tight">
              {product.name}
            </h1>

            {/* Rating & Review count */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'fill-slate-200 text-slate-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-slate-800">{product.rating.toFixed(1)}</span>
              <span className="text-sm text-slate-400">({product.reviewCount} customer reviews)</span>
            </div>

            {/* Price block */}
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-slate-900">
                ${product.price.toFixed(2)}
              </span>
              {product.onSale && product.originalPrice && (
                <>
                  <span className="text-lg text-slate-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-rose-100 text-rose-700">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="pt-4 border-t border-slate-100">
            <p className="text-sm text-slate-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Color Variations (if available) */}
          {product.colors && product.colors.length > 0 && (
            <div className="pt-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Color: <span className="text-slate-900 font-medium">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      selectedColor === color
                        ? 'border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-500/20'
                        : 'border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Variations (if available) */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Size: <span className="text-slate-900 font-medium">{selectedSize}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      selectedSize === size
                        ? 'border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-500/20'
                        : 'border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Actions */}
          <div className="pt-2 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              {/* Quantity Stepper */}
              <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50/50 p-1">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:bg-white transition-colors"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="w-10 text-center text-sm font-semibold text-slate-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:bg-white transition-colors"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                id="detail-add-to-cart-btn"
                type="button"
                onClick={handleAddToCart}
                className={`flex-1 py-3 px-6 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all shadow-xs ${
                  addedSuccess
                    ? 'bg-emerald-600 text-white'
                    : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.99]'
                }`}
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added {quantity} to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart — ${(product.price * quantity).toFixed(2)}</span>
                  </>
                )}
              </button>

              {/* Wishlist Button */}
              <button
                id="detail-wishlist-toggle-btn"
                type="button"
                onClick={() => onToggleWishlist(product)}
                className={`p-3 rounded-xl border transition-colors ${
                  isWishlisted
                    ? 'border-rose-300 bg-rose-50 text-rose-600'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                }`}
                aria-label="Toggle Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>

              {/* Share Button */}
              <button
                type="button"
                onClick={handleCopyLink}
                className="p-3 rounded-xl border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition-colors"
                title="Share product link"
              >
                {copiedLink ? <Check className="w-5 h-5 text-emerald-600" /> : <Share2 className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Key Features List */}
          {product.features && product.features.length > 0 && (
            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Key Highlights
              </h4>
              <ul className="space-y-1.5">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="text-xs text-slate-600 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Guarantee Badges */}
          <div className="pt-4 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
            <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-slate-50">
              <ShieldCheck className="w-4 h-4 text-slate-700" />
              <span className="text-[11px] font-medium text-slate-700">Official Merch</span>
            </div>
            <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-slate-50">
              <Truck className="w-4 h-4 text-slate-700" />
              <span className="text-[11px] font-medium text-slate-700">Free $50+ Shipping</span>
            </div>
            <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-slate-50">
              <RotateCcw className="w-4 h-4 text-slate-700" />
              <span className="text-[11px] font-medium text-slate-700">30-Day Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section - ALWAYS rendered from master catalogue */}
      <div className="mt-16 pt-12 border-t border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Related Products You Might Like
            </h2>
            <p className="text-sm text-slate-500">
              Complementary official merchandise from the Google catalogue
            </p>
          </div>
        </div>

        {/* 4 products per row grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {relatedProducts.map((relProduct) => (
            <ProductCard
              key={relProduct.id}
              product={relProduct}
              isWishlisted={wishlistIds.has(relProduct.id)}
              onSelectProduct={onSelectProduct}
              onAddToCart={(p) => onAddToCart(p, 1)}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
