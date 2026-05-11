// ─── CartDrawer ───────────────────────────────────────────────────────────────
import { useState } from 'react';
import { useShopStore } from '../../../store/shop.store';
import { fmtPrice } from './ShopAtoms';

export default function CartDrawer() {
  const [open, setOpen] = useState(false);
  const { cart, removeFromCart, getCartCount, getCartTotal } = useShopStore();
  const count = getCartCount();
  const total = getCartTotal();

  return (
    <>
      {/* Cart trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="relative flex items-center gap-1 text-[11px] uppercase tracking-widest
          font-medium hover:text-gray-500 transition-colors text-dark"
      >
        Cart
        {count > 0 && (
          <span className="ml-0.5 w-4 h-4 bg-dark text-white text-[9px] font-bold rounded-full
            flex items-center justify-center">
            {count}
          </span>
        )}
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-[150] transition-opacity"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Panel */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-[200] w-80 max-w-full bg-white flex flex-col
          shadow-2xl transition-transform duration-300 ease-out
          ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100">
          <h2 className="font-display text-sm font-bold uppercase tracking-wide text-dark">
            Cart {count > 0 && `(${count})`}
          </h2>
          <button onClick={() => setOpen(false)}
            className="text-gray-400 hover:text-dark text-lg transition-colors">✕</button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {!cart.length ? (
            <div className="text-center py-12 text-gray-400">
              <p className="text-sm">Your cart is empty</p>
            </div>
          ) : cart.map((item) => (
            <div key={`${item.product.id}-${item.size}`} className="flex gap-3">
              <img src={item.product.image} alt={item.product.name}
                className="w-16 h-16 object-contain bg-light p-1.5 mix-blend-multiply flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-tight leading-snug text-dark">
                  {item.product.name}
                </p>
                <p className="text-[10px] text-gray-400 mt-0.5">
                  Size {item.size} · Qty {item.qty}
                </p>
                <p className="text-xs font-bold mt-1 text-dark">{fmtPrice(item.product.price * item.qty)}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.product.id, item.size)}
                className="text-gray-300 hover:text-red-500 text-sm transition-colors flex-shrink-0">
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="px-6 py-5 border-t border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[11px] uppercase tracking-widest text-gray-500">Total</span>
              <strong className="text-base font-bold text-dark">{fmtPrice(total)}</strong>
            </div>
            <button className="w-full bg-dark text-white py-3.5 text-[11px] uppercase
              tracking-widest font-semibold hover:bg-gray-800 transition-colors">
              Checkout
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
