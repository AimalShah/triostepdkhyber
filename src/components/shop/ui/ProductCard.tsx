// ─── ProductCard (Grid view) ──────────────────────────────────────────────────
import type { Product } from '../../../data/shop.products';
import { useShopStore } from '../../../store/shop.store';
import {
  BadgeChip, DiscountBadge, StarRating, WishlistBtn, AddCartBtn,
  fmtPrice, discountPct,
} from './ShopAtoms';

export default function ProductCard({ product }: { product: Product }) {
  const { wishlist, toggleWishlist, addToCart } = useShopStore();
  const pct = discountPct(product.price, product.originalPrice);

  return (
    <article
      className={`relative flex flex-col border-r border-b border-gray-100 p-4 bg-white
        group transition-colors duration-200 hover:bg-gray-50
        ${!product.inStock ? 'opacity-60' : ''}`}
    >
      <BadgeChip badge={product.badge} />
      <WishlistBtn
        active={wishlist.includes(product.id)}
        onClick={() => toggleWishlist(product.id)}
      />

      {/* Image */}
      <div className="relative aspect-[3/4] bg-light mb-3 overflow-hidden flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-contain mix-blend-multiply p-3
            transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <DiscountBadge pct={pct} />
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="text-[10px] uppercase tracking-widest font-semibold
              text-gray-400 border border-gray-300 px-3 py-1">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <p className="text-[9px] uppercase tracking-widest text-gray-400 mb-1">
        {product.category}
      </p>
      <h3 className="text-xs font-bold uppercase tracking-tight mb-1.5 leading-snug">
        {product.name}
      </h3>
      <StarRating rating={product.rating} reviews={product.reviews} />

      {/* Footer */}
      <div className="mt-auto pt-3 border-t border-gray-100 flex justify-between items-end">
        <div>
          <p className="text-sm font-bold">{fmtPrice(product.price)}</p>
          {pct > 0 && (
            <p className="text-[10px] text-gray-400 line-through">
              {fmtPrice(product.originalPrice)}
            </p>
          )}
        </div>
        <AddCartBtn
          disabled={!product.inStock}
          onClick={() => addToCart(product, product.sizes[0])}
        />
      </div>
    </article>
  );
}
