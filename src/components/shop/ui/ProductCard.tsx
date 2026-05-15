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
      className={`relative flex flex-col group w-full bg-white transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
        ${!product.inStock ? 'opacity-60' : ''}`}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#F9F9F9] mb-6">
        <BadgeChip badge={product.badge} />
        
        {/* Wishlist Button - Top Right */}
        <div className="absolute top-5 right-5 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
          <WishlistBtn
            active={wishlist.includes(product.id)}
            onClick={(e: React.MouseEvent) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product.id); }}
          />
        </div>

        <a href={`/product/${product.id}`} className="block w-full h-full relative group/img">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-all duration-[1.5s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-110"
          />
          
          {/* Subtle Overlay on Hover */}
          <div className="absolute inset-0 bg-dark/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <DiscountBadge pct={pct} />
          
          {!product.inStock && (
            <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] flex items-center justify-center z-10">
              <span className="text-[10px] uppercase tracking-[0.4em] font-black text-dark border-b-2 border-dark pb-1">
                Out of Stock
              </span>
            </div>
          )}
        </a>

        {/* Integrated Quick Add - Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] z-20">
            <button 
              disabled={!product.inStock}
              onClick={(e: React.MouseEvent) => { e.preventDefault(); e.stopPropagation(); addToCart(product, product.sizes[0]); }}
              className="w-full bg-white text-dark py-4 text-[10px] uppercase tracking-[0.3em] font-black hover:bg-dark hover:text-white transition-all duration-300 shadow-xl border border-gray-100"
            >
              Quick Add +
            </button>
        </div>
      </div>

      {/* Information Section */}
      <div className="flex flex-col items-start px-1">
        <div className="flex justify-between items-start w-full mb-2">
          <span className="text-[9px] uppercase tracking-[0.3em] text-gray-400 font-bold">
            {product.category}
          </span>
          <StarRating rating={product.rating} reviews={product.reviews} />
        </div>

        <a href={`/product/${product.id}`} className="block group/link">
          <h3 className="text-[15px] font-bold tracking-[-0.01em] text-dark mb-3 group-hover/link:text-gray-500 transition-colors duration-300">
            {product.name}
          </h3>
        </a>
        
        <div className="flex items-baseline gap-3">
          <span className="text-[14px] font-bold text-dark tracking-tighter">
            {fmtPrice(product.price)}
          </span>
          {pct > 0 && (
            <span className="text-[11px] text-gray-400 line-through tracking-tighter font-medium">
              {fmtPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
