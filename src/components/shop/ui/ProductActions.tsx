import React, { useState } from 'react';
import { useShopStore } from '../../../store/shop.store';
import type { Product } from '../../../data/shop.products';
import { fmtPrice } from './ShopAtoms';

export default function ProductActions({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const { addToCart, toggleWishlist, wishlist } = useShopStore();
  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="flex flex-col gap-8">
      {/* Price */}
      <div className="flex items-baseline gap-4">
        <span className="text-3xl font-bold tracking-tighter text-dark">
          {fmtPrice(product.price)}
        </span>
        {product.originalPrice > product.price && (
          <span className="text-xl text-gray-400 line-through tracking-tighter">
            {fmtPrice(product.originalPrice)}
          </span>
        )}
      </div>

      {/* Size Selection */}
      <div className="space-y-4">
        <div className="flex justify-between items-center text-[11px] uppercase tracking-[0.2em] font-bold">
          <span className="text-dark">Select Size (EU)</span>
          <button className="text-gray-400 hover:text-dark transition-colors border-b border-gray-200">Size Guide</button>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`py-4 text-xs font-bold border transition-all duration-300
                ${selectedSize === size 
                  ? 'bg-dark text-white border-dark' 
                  : 'bg-white text-dark border-gray-100 hover:border-dark'}`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Primary Actions */}
      <div className="flex flex-col gap-3 pt-4">
        <button
          onClick={() => selectedSize ? addToCart(product, selectedSize) : alert('Please select a size')}
          disabled={!product.inStock}
          className={`w-full py-6 text-[12px] uppercase tracking-[0.3em] font-black transition-all duration-500
            ${product.inStock 
              ? 'bg-dark text-white hover:bg-black shadow-xl hover:shadow-2xl' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
        >
          {product.inStock ? (selectedSize ? 'Add to Bag' : 'Select Size') : 'Out of Stock'}
        </button>
        
        <button
          onClick={() => toggleWishlist(product.id)}
          className={`w-full py-5 text-[11px] uppercase tracking-[0.25em] font-bold border transition-all duration-300 flex items-center justify-center gap-2
            ${isWishlisted 
              ? 'bg-white text-red-500 border-red-500' 
              : 'bg-white text-dark border-gray-200 hover:border-dark'}`}
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
            <path d="M12 21C12 21 3 14.5 3 8.5C3 5.46 5.46 3 8.5 3C10.24 3 11.91 3.81 13 5.09C14.09 3.81 15.76 3 17.5 3C20.54 3 23 5.46 23 8.5C23 14.5 14 21 12 21Z" />
          </svg>
          {isWishlisted ? 'Saved to Wishlist' : 'Add to Wishlist'}
        </button>
      </div>

      {/* Product Info Accordion / Details */}
      <div className="pt-10 space-y-6 border-t border-gray-100">
        <div className="group cursor-pointer">
          <div className="flex justify-between items-center py-2">
            <span className="text-[11px] uppercase tracking-[0.2em] font-black text-dark">Craftsmanship & Materials</span>
            <span className="text-lg">+</span>
          </div>
          <div className="text-[13px] text-gray-500 leading-relaxed font-light hidden group-hover:block pb-4">
             Every pair is constructed using premium full-grain leather, meticulously stitched and featuring a Goodyear-welted sole for lifetime durability and repairability.
          </div>
        </div>
        <div className="group cursor-pointer border-t border-gray-50 pt-6">
          <div className="flex justify-between items-center py-2">
            <span className="text-[11px] uppercase tracking-[0.2em] font-black text-dark">Shipping & Returns</span>
            <span className="text-lg">+</span>
          </div>
        </div>
      </div>
    </div>
  );
}
