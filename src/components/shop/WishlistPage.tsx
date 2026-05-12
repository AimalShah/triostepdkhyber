import React from 'react';
import { useShopStore } from '../../store/shop.store';
import { products } from '../../data/shop.products';
import ProductCard from './ui/ProductCard';

export default function WishlistPage() {
  const { wishlist } = useShopStore();
  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
      <h1 className="text-3xl font-display font-bold uppercase tracking-tighter text-dark mb-8">Your Wishlist</h1>
      
      {wishlistProducts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">Your wishlist is currently empty.</p>
          <a href="/shop" className="inline-block mt-6 px-8 py-3 bg-dark text-white text-sm font-bold tracking-widest uppercase hover:bg-black transition-colors">
            Explore Collection
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
