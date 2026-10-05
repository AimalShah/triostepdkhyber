import { useState } from 'react';
import type { Product } from '../../../data/shop.products';
import { useShopStore } from '../../../store/shop.store';
import {
  BadgeChip, DiscountBadge, StarRating, WishlistBtn,
  fmtPrice, discountPct, COLOR_HEX,
} from './ShopAtoms';

export default function ProductCard({ product }: { product: Product }) {
  const { wishlist, toggleWishlist, addToCart } = useShopStore();
  const [justAddedSize, setJustAddedSize] = useState<number | null>(null);
  const [showSizes, setShowSizes] = useState(false);
  const pct = discountPct(product.price, product.originalPrice);

  const handleQuickAdd = (e: React.MouseEvent, size: number) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, size);
    setJustAddedSize(size);
    window.dispatchEvent(new CustomEvent('open-cart'));
    setTimeout(() => {
      setJustAddedSize(null);
    }, 1800);
  };

  return (
    <article
      className={`relative flex flex-col group w-full bg-white transition-all duration-500 ease-out border border-gray-100 hover:border-dark/60 hover:shadow-xl p-3 sm:p-4 ${
        !product.inStock ? 'opacity-60' : ''
      }`}
      onMouseLeave={() => setShowSizes(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#F7F7F7] mb-5">
        <BadgeChip badge={product.badge} />

        {/* Wishlist Button - Top Right */}
        <div className="absolute top-3.5 right-3.5 z-20 transition-all duration-300 transform">
          <div className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center shadow-sm hover:bg-white hover:scale-110 transition-all">
            <WishlistBtn
              active={wishlist.includes(product.id)}
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                e.stopPropagation();
                toggleWishlist(product.id);
              }}
            />
          </div>
        </div>

        <a href={`/product/${product.id}`} className="block w-full h-full relative group/img">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-108"
          />

          {/* Vignette on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <DiscountBadge pct={pct} />

          {!product.inStock && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center z-10">
              <span className="text-[9px] uppercase tracking-[0.3em] font-black text-dark bg-white px-3 py-1.5 border border-dark">
                Sold Out
              </span>
            </div>
          )}
        </a>

        {/* Quick Add Overlay on Hover */}
        {product.inStock && (
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-20 bg-white/95 backdrop-blur-md border-t border-gray-100">
            {justAddedSize ? (
              <div className="w-full py-2 bg-emerald-600 text-white text-[9px] uppercase tracking-[0.25em] font-bold text-center flex items-center justify-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>Size EU {justAddedSize} Added!</span>
              </div>
            ) : showSizes ? (
              <div>
                <div className="flex justify-between items-center mb-1.5 px-0.5">
                  <span className="text-[8px] uppercase tracking-[0.2em] font-bold text-gray-500">
                    Select EU Size:
                  </span>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setShowSizes(false);
                    }}
                    className="text-[8px] uppercase tracking-wider text-gray-400 hover:text-dark"
                  >
                    Back
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-1">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={(e) => handleQuickAdd(e, sz)}
                      className="py-1.5 bg-gray-100 hover:bg-dark hover:text-white text-dark text-[9px] font-bold transition-all duration-200"
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowSizes(true);
                  }}
                  className="flex-1 py-2.5 bg-dark text-white text-[9px] uppercase tracking-[0.25em] font-bold hover:bg-black transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Quick Add +</span>
                </button>
                <a
                  href={`/product/${product.id}`}
                  className="px-3 py-2.5 border border-dark text-dark text-[9px] uppercase tracking-wider font-bold hover:bg-dark hover:text-white transition-all flex items-center justify-center"
                  title="View Details"
                >
                  →
                </a>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Product Metadata & Price */}
      <div className="flex flex-col flex-1 justify-between px-1">
        <div>
          {/* Category & Color dot */}
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full border border-gray-300"
                style={{ backgroundColor: COLOR_HEX[product.color] ?? '#999' }}
                title={product.color}
              />
              <span className="text-[9px] uppercase tracking-[0.25em] text-gray-400 font-bold">
                {product.category}
              </span>
            </div>
            <StarRating rating={product.rating} reviews={product.reviews} />
          </div>

          {/* Name */}
          <a href={`/product/${product.id}`} className="block group/link mb-2.5">
            <h3 className="text-sm font-bold tracking-tight text-dark group-hover/link:text-gray-500 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </a>
        </div>

        {/* Price & Stock info */}
        <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-black text-dark tracking-tight">
              {fmtPrice(product.price)}
            </span>
            {pct > 0 && (
              <span className="text-[10px] text-gray-400 line-through font-medium">
                {fmtPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <span className="text-[8px] uppercase tracking-widest text-emerald-700 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            In Stock
          </span>
        </div>
      </div>
    </article>
  );
}
