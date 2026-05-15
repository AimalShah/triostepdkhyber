// ─── ProductRow (List view) ───────────────────────────────────────────────────
import type { Product } from '../../../data/shop.products';
import { useShopStore } from '../../../store/shop.store';
import {
  BadgeChip, StarRating, WishlistBtn, AddCartBtn,
  fmtPrice, discountPct, COLOR_HEX,
} from './ShopAtoms';

export default function ProductRow({ product }: { product: Product }) {
  const { wishlist, toggleWishlist, addToCart } = useShopStore();
  const pct = discountPct(product.price, product.originalPrice);

  return (
    <div className={`relative flex gap-4 items-center px-4 py-4 border-b border-gray-100
      bg-white hover:bg-gray-50 transition-colors duration-150
      ${!product.inStock ? 'opacity-60' : ''}`}>

      {/* Image */}
      <a href={`/product/${product.id}`} className="relative w-20 h-20 bg-light flex-shrink-0 overflow-hidden group/rowimg">
        <img src={product.image} alt={product.name} loading="lazy"
          className="w-full h-full object-contain mix-blend-multiply p-2 transition-transform group-hover/rowimg:scale-110" />
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="text-[8px] uppercase font-semibold text-gray-400">Out</span>
          </div>
        )}
      </a>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-[9px] uppercase tracking-widest text-gray-400">{product.category}</p>
        <a href={`/product/${product.id}`} className="hover:text-gray-500 transition-colors">
          <h3 className="text-xs font-bold uppercase tracking-tight leading-snug mb-1">{product.name}</h3>
        </a>
        <StarRating rating={product.rating} reviews={product.reviews} />
        <p className="text-[9px] text-gray-400">SKU: {product.sku}</p>
      </div>

      {/* Color + badge */}
      <div className="flex flex-col items-center gap-2 flex-shrink-0">
        <span className="w-4 h-4 rounded-full border border-gray-200"
          style={{ background: COLOR_HEX[product.color] ?? '#ccc' }} title={product.color} />
        {product.badge && (
          <span className="text-[8px] font-bold uppercase tracking-wider
            bg-dark text-white px-1.5 py-0.5 rounded-full">
            {product.badge}
          </span>
        )}
      </div>

      {/* Price */}
      <div className="text-right flex-shrink-0">
        <p className="text-sm font-bold">{fmtPrice(product.price)}</p>
        {pct > 0 && (
          <p className="text-[10px] text-gray-400 line-through">{fmtPrice(product.originalPrice)}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <WishlistBtn active={wishlist.includes(product.id)} onClick={() => toggleWishlist(product.id)} />
        <AddCartBtn disabled={!product.inStock} onClick={() => addToCart(product, product.sizes[0])} />
      </div>
    </div>
  );
}
