// ─── CartDrawer ───────────────────────────────────────────────────────────────
import { useState, useEffect } from 'react';
import { useShopStore } from '../../../store/shop.store';
import { fmtPrice } from './ShopAtoms';

const FREE_SHIPPING_THRESHOLD = 25000;

export default function CartDrawer() {
  const [open, setOpen] = useState(false);
  const [checkoutNotice, setCheckoutNotice] = useState(false);
  const { cart, removeFromCart, updateQty, clearCart, getCartCount, getCartTotal } = useShopStore();
  const count = getCartCount();
  const total = getCartTotal();

  // Prevent body scroll when drawer is open and listen for open-cart events
  useEffect(() => {
    const handleOpenCart = () => setOpen(true);
    window.addEventListener('open-cart', handleOpenCart);

    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setCheckoutNotice(false);
    }
    return () => {
      window.removeEventListener('open-cart', handleOpenCart);
      document.body.style.overflow = '';
    };
  }, [open]);

  const freeShippingProgress = Math.min(100, Math.round((total / FREE_SHIPPING_THRESHOLD) * 100));
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - total);

  return (
    <>
      {/* Cart trigger button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open Shopping Bag"
        className="group relative flex items-center gap-2 text-[11px] uppercase tracking-widest font-semibold text-dark hover:text-gray-500 transition-colors"
      >
        <span className="relative flex items-center">
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:scale-110"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          {count > 0 && (
            <span className="absolute -top-2 -right-2 w-4 h-4 bg-dark text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
              {count}
            </span>
          )}
        </span>
        <span className="hidden sm:inline">Bag {count > 0 ? `(${count})` : ''}</span>
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] transition-opacity duration-300 animate-fade-in"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer Panel */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-[210] w-full max-w-[430px] bg-white flex flex-col shadow-2xl transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100 bg-[#FAFAFA]">
          <div>
            <span className="text-[9px] uppercase tracking-[0.3em] text-gray-400 font-bold block mb-0.5">
              Triostepdekhyaber
            </span>
            <h2 className="font-display text-base font-bold uppercase tracking-wider text-dark flex items-center gap-2">
              Shopping Bag
              <span className="text-xs font-normal text-gray-400 tracking-normal">
                ({count} {count === 1 ? 'item' : 'items'})
              </span>
            </h2>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close bag"
            className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-dark hover:bg-gray-100 transition-all duration-200"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="px-6 py-3 bg-gray-50 border-b border-gray-100 text-[10px] uppercase tracking-wider font-bold text-dark">
          {remainingForFreeShipping > 0 ? (
            <p className="flex justify-between items-center mb-1.5 text-gray-600">
              <span>Add <strong className="text-dark">{fmtPrice(remainingForFreeShipping)}</strong> for Free Express Delivery</span>
              <span className="text-gray-400 font-normal">{freeShippingProgress}%</span>
            </p>
          ) : (
            <p className="flex items-center gap-1.5 text-emerald-700 font-bold mb-1.5">
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Complimentary Express Delivery Unlocked</span>
            </p>
          )}
          <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-dark h-full transition-all duration-500 ease-out"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-gray-100">
          {!cart.length ? (
            <div className="h-full flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-5">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="font-display text-sm font-bold uppercase tracking-widest text-dark mb-2">
                Your Bag Is Empty
              </h3>
              <p className="text-xs text-gray-400 max-w-xs mb-6 leading-relaxed">
                Discover handcrafted leather footwear, engineered with timeless architectural precision.
              </p>
              <button
                onClick={() => {
                  setOpen(false);
                  window.location.href = '/shop';
                }}
                className="px-8 py-3.5 bg-dark text-white text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-gray-800 transition-all duration-300"
              >
                Explore The Catalog →
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={`${item.product.id}-${item.size}`} className="py-4 flex gap-4 items-start group">
                {/* Thumbnail */}
                <a
                  href={`/product/${item.product.id}`}
                  onClick={() => setOpen(false)}
                  className="w-20 h-24 bg-[#F7F7F7] flex-shrink-0 overflow-hidden relative block border border-gray-100"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </a>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-[9px] uppercase tracking-[0.25em] text-gray-400 font-bold">
                        {item.product.category}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.size)}
                        aria-label="Remove item"
                        className="text-gray-300 hover:text-red-600 transition-colors p-1 -mr-1"
                      >
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>

                    <a
                      href={`/product/${item.product.id}`}
                      onClick={() => setOpen(false)}
                      className="font-bold text-xs uppercase tracking-tight text-dark hover:text-gray-600 transition-colors line-clamp-1 mt-0.5"
                    >
                      {item.product.name}
                    </a>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 uppercase tracking-wider">
                        Size {item.size}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {item.product.color}
                      </span>
                    </div>
                  </div>

                  {/* Quantity and Price */}
                  <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-50">
                    {/* Stepper */}
                    <div className="flex items-center border border-gray-200">
                      <button
                        onClick={() => updateQty(item.product.id, item.size, -1)}
                        className="w-7 h-7 flex items-center justify-center text-xs text-gray-500 hover:bg-gray-100 hover:text-dark transition-colors"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-dark">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.product.id, item.size, 1)}
                        className="w-7 h-7 flex items-center justify-center text-xs text-gray-500 hover:bg-gray-100 hover:text-dark transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-dark tracking-tight">
                        {fmtPrice(item.product.price * item.qty)}
                      </span>
                      {item.qty > 1 && (
                        <span className="block text-[9px] text-gray-400">
                          {fmtPrice(item.product.price)} each
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="px-6 py-5 border-t border-gray-100 bg-[#FAFAFA] space-y-4">
            {/* Price breakdown */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-gray-500">
                <span className="uppercase tracking-widest text-[10px]">Subtotal</span>
                <span className="font-bold text-dark">{fmtPrice(total)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span className="uppercase tracking-widest text-[10px]">Estimated Shipping</span>
                <span className="font-bold text-dark">
                  {total >= FREE_SHIPPING_THRESHOLD ? (
                    <span className="text-emerald-700 uppercase tracking-widest text-[10px]">Free</span>
                  ) : (
                    'Calculated at checkout'
                  )}
                </span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-gray-200">
                <span className="text-[11px] uppercase tracking-[0.2em] font-black text-dark">Estimated Total</span>
                <strong className="text-lg font-bold text-dark tracking-tight">{fmtPrice(total)}</strong>
              </div>
            </div>

            {/* Notice if checkout clicked */}
            {checkoutNotice && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] leading-relaxed">
                ✓ Order created! Thank you for ordering with Triostepdekhyaber. In this demonstration storefront, demo orders are stored in your session.
              </div>
            )}

            {/* Actions */}
            <div className="space-y-2">
              <button
                onClick={() => setCheckoutNotice(true)}
                className="w-full bg-dark text-white py-4 text-[10px] uppercase tracking-[0.3em] font-black hover:bg-black transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg"
              >
                <span>Proceed to Checkout</span>
                <svg
                  viewBox="0 0 24 24"
                  className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

              <div className="flex justify-between items-center text-[9px] uppercase tracking-widest text-gray-400 pt-1">
                <button
                  onClick={clearCart}
                  className="hover:text-red-500 transition-colors underline underline-offset-2"
                >
                  Clear Bag
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="hover:text-dark transition-colors"
                >
                  Continue Shopping →
                </button>
              </div>
            </div>

            {/* Trust badge */}
            <div className="pt-2 text-center text-[9px] uppercase tracking-wider text-gray-400 flex items-center justify-center gap-2">
              <svg className="w-3 h-3 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>100% Genuine Leather · Handcrafted · Complimentary Exchanges</span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
