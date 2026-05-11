// ─── Shared utility helpers ───────────────────────────────────────────────────
import type { ProductBadge } from '../../data/shop.products';

export const fmtPrice = (n: number) =>
  new Intl.NumberFormat('ru-RU').format(n) + ' ₽';

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
      className="absolute top-3 left-3 z-10 text-[9px] font-bold uppercase tracking-widest
                 text-white px-2 py-0.5 rounded-full"
      style={{ background: BADGE_COLOR[badge] ?? '#374151' }}
    >
      {badge}
    </span>
  );
}

// ── Star rating ───────────────────────────────────────────────────────────────
export function StarRating({ rating, reviews }: { rating: number; reviews: number }) {
  const full  = Math.round(rating);
  const empty = 5 - full;
  return (
    <div className="flex items-center gap-1.5 mb-2">
      <span className="text-amber-400 text-[11px] leading-none tracking-tight">
        {'★'.repeat(full)}{'☆'.repeat(empty)}
      </span>
      <span className="text-[10px] text-gray-400">{rating} ({reviews})</span>
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
      className={`absolute top-3 right-3 z-10 w-7 h-7 flex items-center justify-center
        transition-colors ${active ? 'text-red-500' : 'text-gray-300 hover:text-red-400'}`}
    >
      <svg viewBox="0 0 24 24" className="w-4 h-4"
        fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.5}>
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
      className={`w-7 h-7 rounded-full flex items-center justify-center text-white
        transition-all duration-200 flex-shrink-0
        ${disabled
          ? 'bg-gray-200 cursor-not-allowed'
          : 'bg-dark hover:bg-gray-700 hover:scale-110 active:scale-95'}`}
    >
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none"
        stroke="currentColor" strokeWidth={2.5}>
        <path d="M12 5v14M5 12h14" strokeLinecap="round" />
      </svg>
    </button>
  );
}

// ── Discount badge ────────────────────────────────────────────────────────────
export function DiscountBadge({ pct }: { pct: number }) {
  if (!pct) return null;
  return (
    <span className="absolute bottom-2 right-2 bg-red-600 text-white text-[9px]
      font-bold px-1.5 py-0.5 rounded-full">
      -{pct}%
    </span>
  );
}
