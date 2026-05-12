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
      className={`relative flex flex-col group cursor-pointer w-full
        ${!product.inStock ? 'opacity-60' : ''}`}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-[#F2F2F2] mb-4">
        <BadgeChip badge={product.badge} />
        
        <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <WishlistBtn
            active={wishlist.includes(product.id)}
            onClick={(e: React.MouseEvent) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product.id); }}
          />
        </div>

        <a href={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover mix-blend-multiply transition-transform duration-[1.5s] ease-out group-hover:scale-110"
          />
          <DiscountBadge pct={pct} />
          {!product.inStock && (
            <div className="absolute inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-10">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-dark bg-white/90 px-6 py-2">
                Sold Out
              </span>
            </div>
          )}
        </a>

        {/* Quick Add Overlay */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-20">
            <button 
              disabled={!product.inStock}
              onClick={(e: React.MouseEvent) => { e.preventDefault(); e.stopPropagation(); addToCart(product, product.sizes[0]); }}
              className="w-full bg-dark/95 backdrop-blur-md text-white py-4 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-black transition-colors"
            >
              Quick Add
            </button>
        </div>
      </div>

      <div className="flex flex-col text-center px-2 pb-2">
        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2">
          {product.category}
        </p>
        <a href={`/product/${product.id}`} className="no-underline text-inherit group-hover:text-gray-600 transition-colors">
          <h3 className="text-[13px] font-bold uppercase tracking-widest mb-2 leading-snug">
            {product.name}
          </h3>
        </a>
        
        <div className="flex justify-center mb-2">
            <StarRating rating={product.rating} reviews={product.reviews} />
        </div>
        
        <div className="flex justify-center items-center gap-3 mt-1">
          <p className="text-[13px] font-bold tracking-widest text-dark">{fmtPrice(product.price)}</p>
          {pct > 0 && (
            <p className="text-[11px] text-gray-400 line-through">
              {fmtPrice(product.originalPrice)}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
