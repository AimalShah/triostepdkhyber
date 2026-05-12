import React from 'react';
import { useShopStore } from '../../../store/shop.store';

export default function WishlistToggle({ productId }: { productId: number }) {
  const { wishlist, toggleWishlist } = useShopStore();
  const isActive = wishlist.includes(productId);

  return (
    <button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(productId); }}
      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-sm
        ${isActive ? 'bg-red-500 text-white' : 'bg-white text-gray-400 hover:text-red-500'}`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isActive ? 'currentColor' : 'none'} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    </button>
  );
}
