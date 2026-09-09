import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  CheckCircle2, 
  Truck, 
  ShieldCheck 
} from 'lucide-react';
import { CartItem } from '../types';
import { FALLBACK_PRODUCT_IMAGE } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  onContinueShopping: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onContinueShopping,
}) => {
  const [checkoutComplete, setCheckoutComplete] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );
  const freeShippingThreshold = 50.0;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const shippingCost = subtotal > 0 ? (isFreeShipping ? 0 : 5.99) : 0;
  const estimatedTax = subtotal * 0.08;
  const orderTotal = subtotal + shippingCost + estimatedTax;

  const handleSimulateCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCheckoutComplete(true);
      onClearCart();
    }, 1200);
  };

  const handleResetCheckout = () => {
    setCheckoutComplete(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-slate-800" />
              <h2 className="text-lg font-bold text-slate-900">Your Cart</h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)} items
              </span>
            </div>
            <button
              id="cart-drawer-close-btn"
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Checkout Success Screen */}
          {checkoutComplete ? (
            <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Order Confirmed!</h3>
              <p className="text-sm text-slate-500 mb-6 max-w-xs">
                Thank you for shopping at the Google Merchandise Store. Your order has been placed and confirmation sent to your email.
              </p>
              <button
                type="button"
                onClick={handleResetCheckout}
                className="w-full py-3 px-4 rounded-xl bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition-colors"
              >
                Continue Exploring Catalogue
              </button>
            </div>
          ) : cartItems.length === 0 ? (
            /* Empty State */
            <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-1">Your cart is empty</h3>
              <p className="text-sm text-slate-500 mb-6 max-w-xs">
                Explore our official Google merchandise apparel, accessories, drinkware, and stationery.
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onContinueShopping();
                }}
                className="py-2.5 px-5 rounded-xl bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition-colors"
              >
                Shop Catalogue
              </button>
            </div>
          ) : (
            /* Cart Items List & Calculations */
            <>
              {/* Free Shipping Progress Indicator */}
              <div className="bg-slate-50 px-6 py-3 border-b border-slate-100">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-700 mb-1.5">
                  <Truck className="w-4 h-4 text-blue-600" />
                  {isFreeShipping ? (
                    <span className="text-emerald-700 font-semibold">
                      You unlocked free standard shipping!
                    </span>
                  ) : (
                    <span>
                      Add <strong className="text-blue-600">${amountToFreeShipping.toFixed(2)}</strong> more for free shipping
                    </span>
                  )}
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${
                      isFreeShipping ? 'bg-emerald-500' : 'bg-blue-600'
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Scrollable Items */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 divide-y divide-slate-100 space-y-4">
                {cartItems.map((item) => {
                  const product = item.product;
                  return (
                    <div key={item.id} className="pt-4 first:pt-0 flex gap-4">
                      <div className="w-18 h-18 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
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
                            <h4 className="text-xs font-semibold text-slate-900 line-clamp-1">
                              {product.name}
                            </h4>
                            <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                              {item.selectedColor && <span>{item.selectedColor}</span>}
                              {item.selectedColor && item.selectedSize && <span>·</span>}
                              {item.selectedSize && <span>{item.selectedSize}</span>}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.id)}
                            className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                              className="px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-200 rounded-l"
                            >
                              -
                            </button>
                            <span className="px-2 text-xs font-semibold text-slate-800">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-200 rounded-r"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-xs font-bold text-slate-900">
                            ${(product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Summary & Checkout */}
              <div className="p-4 sm:p-6 border-t border-slate-200 bg-slate-50/70 space-y-3">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-800">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Shipping</span>
                    <span>
                      {isFreeShipping ? (
                        <span className="text-emerald-600 font-semibold">FREE</span>
                      ) : (
                        `$${shippingCost.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Estimated Tax</span>
                    <span>${estimatedTax.toFixed(2)}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-bold text-slate-900">
                    <span>Total</span>
                    <span>${orderTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  id="cart-drawer-checkout-btn"
                  type="button"
                  onClick={handleSimulateCheckout}
                  disabled={isProcessing}
                  className="w-full py-3 px-4 rounded-xl bg-slate-900 text-white font-medium text-sm hover:bg-slate-800 active:scale-[0.99] flex items-center justify-center gap-2 transition-all shadow-xs"
                >
                  {isProcessing ? (
                    <span>Processing securely...</span>
                  ) : (
                    <>
                      <span>Proceed to Checkout</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Secure 256-bit encrypted checkout</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
