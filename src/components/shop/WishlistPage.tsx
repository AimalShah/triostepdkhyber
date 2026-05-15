import React from 'react';
import { useShopStore } from '../../store/shop.store';
import { PRODUCTS } from '../../data/shop.products';
import ProductCard from './ui/ProductCard';

export default function WishlistPage() {
  const { wishlist } = useShopStore();
  const wishlistProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 pb-8 border-b border-gray-100">
        <div>
          <h1 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter text-dark">Your Wishlist</h1>
          <p className="text-gray-400 uppercase tracking-widest text-[11px] mt-2 font-medium">
            {wishlistProducts.length} {wishlistProducts.length === 1 ? 'Item' : 'Items'} Saved
          </p>
        </div>
      </div>
      
      {wishlistProducts.length === 0 ? (
        <div className="text-center py-32 bg-white rounded-sm border border-dashed border-gray-200">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 21C12 21 3 14.5 3 8.5C3 5.46 5.46 3 8.5 3C10.24 3 11.91 3.81 13 5.09C14.09 3.81 15.76 3 17.5 3C20.54 3 23 5.46 23 8.5C23 14.5 14 21 12 21Z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold uppercase tracking-wider text-dark mb-4">Nothing here yet</h2>
          <p className="text-gray-400 text-sm max-w-xs mx-auto mb-10 leading-relaxed uppercase tracking-widest font-medium">
            Items added to your wishlist will appear here for you to explore later.
          </p>
          <a href="/shop" className="inline-block px-12 py-5 bg-dark text-white text-[11px] font-bold tracking-[0.25em] uppercase hover:bg-black transition-all shadow-lg hover:shadow-xl">
            Explore Collection
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {wishlistProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
