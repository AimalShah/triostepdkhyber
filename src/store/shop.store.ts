// ─── Shop Store (Zustand) ─────────────────────────────────────────────────────
// Facade Pattern: single source of truth for all shop UI state
// Components read/write ONLY through this store
// ──────────────────────────────────────────────────────────────────────────────

import { create } from 'zustand';
import { PRODUCTS, type Product } from '../data/shop.products';

export interface CartItem {
  product: Product;
  size: number;
  qty: number;
}

export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating' | 'name';
export type ViewMode   = 'grid' | 'list';

interface ShopState {
  // ── Filter state ───────────────────────────────────────────────────────────
  searchQuery:    string;
  activeCategory: string;
  activeColor:    string;
  priceRange:     [number, number];
  sortBy:         SortOption;
  inStockOnly:    boolean;
  onSaleOnly:     boolean;
  viewMode:       ViewMode;
  currentPage:    number;
  pageSize:       number;

  // ── Cart & Wishlist ────────────────────────────────────────────────────────
  cart:     CartItem[];
  wishlist: number[];   // product ids

  // ── Actions ────────────────────────────────────────────────────────────────
  setSearch:      (q: string) => void;
  setCategory:    (c: string) => void;
  setColor:       (c: string) => void;
  setPriceRange:  (r: [number, number]) => void;
  setSortBy:      (s: SortOption) => void;
  setInStockOnly: (v: boolean) => void;
  setOnSaleOnly:  (v: boolean) => void;
  setViewMode:    (m: ViewMode) => void;
  setPage:        (p: number) => void;
  clearFilters:   () => void;

  toggleWishlist: (id: number) => void;
  addToCart:      (product: Product, size: number) => void;
  removeFromCart: (productId: number, size: number) => void;
  clearCart:      () => void;

  // ── Derived helpers ────────────────────────────────────────────────────────
  getCartCount: () => number;
  getCartTotal: () => number;
}

export const useShopStore = create<ShopState>((set, get) => ({
  // Filter defaults
  searchQuery:    '',
  activeCategory: 'All',
  activeColor:    'All',
  priceRange:     [0, 35000],
  sortBy:         'default',
  inStockOnly:    false,
  onSaleOnly:     false,
  viewMode:       'grid',
  currentPage:    1,
  pageSize:       9,

  // Cart / wishlist defaults
  cart:     [],
  wishlist: [],

  // Filter actions (always reset page)
  setSearch:      (q) => set({ searchQuery: q,    currentPage: 1 }),
  setCategory:    (c) => set({ activeCategory: c, currentPage: 1 }),
  setColor:       (c) => set({ activeColor: c,    currentPage: 1 }),
  setPriceRange:  (r) => set({ priceRange: r,     currentPage: 1 }),
  setSortBy:      (s) => set({ sortBy: s }),
  setInStockOnly: (v) => set({ inStockOnly: v,    currentPage: 1 }),
  setOnSaleOnly:  (v) => set({ onSaleOnly: v,     currentPage: 1 }),
  setViewMode:    (m) => set({ viewMode: m }),
  setPage:        (p) => set({ currentPage: p }),

  clearFilters: () => set({
    searchQuery: '', activeCategory: 'All', activeColor: 'All',
    priceRange: [0, 35000], sortBy: 'default',
    inStockOnly: false, onSaleOnly: false, currentPage: 1,
  }),

  toggleWishlist: (id) => set((s) => ({
    wishlist: s.wishlist.includes(id)
      ? s.wishlist.filter((x) => x !== id)
      : [...s.wishlist, id],
  })),

  addToCart: (product, size) => set((s) => {
    const idx = s.cart.findIndex((i) => i.product.id === product.id && i.size === size);
    if (idx > -1) {
      const cart = [...s.cart];
      cart[idx] = { ...cart[idx], qty: cart[idx].qty + 1 };
      return { cart };
    }
    return { cart: [...s.cart, { product, size, qty: 1 }] };
  }),

  removeFromCart: (productId, size) => set((s) => ({
    cart: s.cart.filter((i) => !(i.product.id === productId && i.size === size)),
  })),

  clearCart: () => set({ cart: [] }),

  getCartCount: () => get().cart.reduce((s, i) => s + i.qty, 0),
  getCartTotal: () => get().cart.reduce((s, i) => s + i.product.price * i.qty, 0),
}));
