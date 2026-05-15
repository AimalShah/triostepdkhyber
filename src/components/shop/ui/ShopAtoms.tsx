// ─── Shared utility helpers ───────────────────────────────────────────────────
import type { ProductBadge } from '../../data/shop.products';

export const fmtPrice = (n: number) =>
  new Intl.NumberFormat('ru-RU').format(n) + 'Rs';

export const discountPct = (price: number, orig: number) =>
  orig > price ? Math.round((1 - price / orig) * 100) : 0;

export const COLOR_HEX: Record<string, string> = {
  Black: '#1a1a1a', Brown: '#7c4a19', Tan: '#d2a679',
  White: '#f0f0f0', Olive: '#6b7c3a', Grey: '#9ca3af',
};

export const BADGE_COLOR: Record<string, string> = {
  Bestseller: '#1a1a1a', New: '#2563eb', Sale: '#dc2626', Hot: '#ea580c',
};

// ── Badge chip ────────────────────────────────────────────────────────────────
export function BadgeChip({ badge }: { badge: ProductBadge }) {
  if (!badge) return null;
  return (
    <span
      className="absolute top-5 left-5 z-10 text-[9px] font-bold uppercase tracking-[0.25em]
                 text-white px-3 py-1.5 rounded-none shadow-sm mix-blend-multiply"
      style={{ background: BADGE_COLOR[badge] ?? '#1a1a1a' }}
    >
      {badge}
    </span>
  );
}

// ── Star rating ───────────────────────────────────────────────────────────────
export function StarRating({ rating, reviews }: { rating: number; reviews: number }) {
  const full = Math.round(rating);
  const empty = 5 - full;
  return (
    <div className="flex items-center gap-2 group/stars cursor-help">
      <div className="flex text-dark text-[10px] tracking-[-0.05em] gap-0.5">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < full ? 'opacity-100' : 'opacity-20'}>●</span>
        ))}
      </div>
      <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">({reviews})</span>
    </div>
  );
}

// ── Wishlist button ───────────────────────────────────────────────────────────
export function WishlistBtn({
  active, onClick,
}: { active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Toggle wishlist"
      className="group/wish flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-90"
    >
      <svg viewBox="0 0 24 24" className="w-5 h-5 transition-all duration-500 ease-out"
        fill={active ? '#000' : 'none'}
        stroke={active ? '#000' : 'currentColor'}
        strokeWidth={1.2}>
        <path d="M12 21C12 21 3 14.5 3 8.5C3 5.46 5.46 3 8.5 3C10.24 3 11.91 3.81 13 5.09C14.09 3.81 15.76 3 17.5 3C20.54 3 23 5.46 23 8.5C23 14.5 14 21 12 21Z" />
      </svg>
    </button>
  );
}

// ── Add to cart button ────────────────────────────────────────────────────────
export function AddCartBtn({
  disabled, onClick,
}: { disabled?: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label="Add to cart"
      className={`w-10 h-10 flex items-center justify-center
        transition-all duration-500 ease-in-out
        ${disabled
          ? 'opacity-20 cursor-not-allowed'
          : 'bg-dark text-white hover:bg-black active:scale-95'}`}
    >
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none"
        stroke="currentColor" strokeWidth={1.5}>
        <path d="M12 5v14M5 12h14" />
      </svg>
    </button>
  );
}

// ── Discount badge ────────────────────────────────────────────────────────────
export function DiscountBadge({ pct }: { pct: number }) {
  if (!pct) return null;
  return (
    <span className="absolute bottom-5 right-5 text-red-600 text-[10px]
      font-black tracking-tighter uppercase italic">
      Save {pct}%
    </span>
  );
}
