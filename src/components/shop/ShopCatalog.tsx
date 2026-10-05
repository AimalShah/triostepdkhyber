import React, { useState } from 'react';
import { useShopStore } from '../../store/shop.store';
import { useShopTable } from '../../facades/shop.table.facade';
import { CATEGORIES, PRODUCTS } from '../../data/shop.products';
import FilterSidebar  from './ui/FilterSidebar';
import ShopToolbar    from './ui/ShopToolbar';
import ShopPagination from './ui/ShopPagination';
import ProductCard    from './ui/ProductCard';
import ProductRow     from './ui/ProductRow';

// ── Horizontal Category Pill Strip ─────────────────────────────────────────────
function CategoryPills() {
  const { activeCategory, setCategory } = useShopStore();

  return (
    <div className="w-full overflow-x-auto no-scrollbar py-2 border-b border-gray-100 mb-6">
      <div className="flex items-center gap-2 min-w-max pb-1">
        {CATEGORIES.map((cat) => {
          const count = cat === 'All'
            ? PRODUCTS.length
            : PRODUCTS.filter((p) => p.category === cat).length;
          const isActive = activeCategory === cat;

          return (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-bold rounded-full transition-all duration-300 flex items-center gap-2 ${
                isActive
                  ? 'bg-dark text-white shadow-md scale-105'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-200 hover:text-dark border border-gray-200'
              }`}
            >
              <span>{cat === 'All' ? 'All Archive' : cat}</span>
              <span
                className={`text-[9px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-500'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Active filter tag strip ───────────────────────────────────────────────────
function ActiveFilterTags() {
  const {
    activeCategory, activeColor, inStockOnly, onSaleOnly,
    setCategory, setColor, setInStockOnly, setOnSaleOnly, clearFilters,
  } = useShopStore();

  const tags = [
    activeCategory !== 'All' && { label: `Category: ${activeCategory}`, onRemove: () => setCategory('All') },
    activeColor !== 'All'    && { label: `Color: ${activeColor}`,       onRemove: () => setColor('All') },
    inStockOnly              && { label: 'In Stock Only',              onRemove: () => setInStockOnly(false) },
    onSaleOnly               && { label: 'On Sale Only',               onRemove: () => setOnSaleOnly(false) },
  ].filter(Boolean) as { label: string; onRemove: () => void }[];

  if (!tags.length) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 py-3 mb-4">
      <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold mr-1">
        Active Filters:
      </span>
      {tags.map((t, index) => (
        <span
          key={`${t.label}-${index}`}
          className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest font-semibold
            bg-dark text-white px-3 py-1 rounded-full shadow-sm"
        >
          {t.label}
          <button
            onClick={t.onRemove}
            className="text-gray-300 hover:text-red-300 transition-colors leading-none ml-0.5"
            aria-label="Remove filter"
          >
            ✕
          </button>
        </span>
      ))}
      <button
        onClick={clearFilters}
        className="text-[9px] uppercase tracking-widest font-bold text-gray-400 hover:text-dark underline underline-offset-2 ml-2"
      >
        Reset All
      </button>
    </div>
  );
}

// ── Empty state ───────────────────────────────────────────────────────────────
function EmptyState() {
  const { clearFilters } = useShopStore();
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4 text-center bg-gray-50 border border-gray-100 my-8">
      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-gray-400 shadow-sm mb-1">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <circle cx="11" cy="11" r="8" />
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35" />
        </svg>
      </div>
      <h3 className="font-display text-base uppercase tracking-widest font-bold text-dark">
        No Matching Articles Found
      </h3>
      <p className="text-xs text-gray-400 max-w-sm">
        We couldn't find any products matching your active criteria. Try broadening your filters or clearing search terms.
      </p>
      <button
        onClick={clearFilters}
        className="mt-2 px-8 py-3 bg-dark text-white text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-gray-800 transition-colors shadow-md"
      >
        Reset All Filters
      </button>
    </div>
  );
}

// ── Main ShopCatalog ──────────────────────────────────────────────────────────
export default function ShopCatalog() {
  const { rows, pageCount } = useShopTable();
  const { viewMode } = useShopStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <section className="max-w-[1440px] mx-auto px-4 md:px-6 pb-24 bg-white">
      {/* Top Editorial Bar */}
      <div className="py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px] uppercase tracking-widest text-gray-500">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span>Complimentary Express Shipping On Orders Above 25,000Rs</span>
        </div>
        <div className="text-gray-400 hidden sm:block">
          Handcrafted In Small Batches · Khyber Heritage
        </div>
      </div>

      {/* Horizontal Category Pill Strip for instant visual navigation */}
      <CategoryPills />

      {/* Mobile filter button */}
      <div className="lg:hidden py-3 flex items-center justify-between border-b border-gray-100 mb-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex items-center gap-2 text-[10px] uppercase tracking-widest
            font-bold border border-dark bg-white px-4 py-2 hover:bg-dark hover:text-white transition-all text-dark shadow-sm"
        >
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none"
            stroke="currentColor" strokeWidth={2}>
            <path d="M4 6h16M8 12h8M11 18h2" strokeLinecap="round"/>
          </svg>
          Filter & Refine
        </button>
        <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
          {rows.length} Articles
        </span>
      </div>

      {/* Mobile Filter Slide-out Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-[250] lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed top-0 left-0 bottom-0 w-full max-w-xs bg-white shadow-2xl p-6 overflow-y-auto flex flex-col z-[260]">
            <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-6">
              <h2 className="text-lg font-bold uppercase tracking-tight text-dark">Filter Archive</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-dark hover:bg-gray-100 text-lg"
              >
                ✕
              </button>
            </div>
            <FilterSidebar />
            <div className="mt-auto pt-6 border-t border-gray-100">
              <button
                onClick={() => setSidebarOpen(false)}
                className="w-full py-3.5 bg-dark text-white text-[10px] uppercase tracking-[0.25em] font-bold text-center"
              >
                View {rows.length} Results
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main layout grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-0 lg:gap-10 items-start">
        {/* Desktop sidebar */}
        <div className="hidden lg:block sticky top-[90px]">
          <FilterSidebar />
        </div>

        {/* Right content */}
        <div className="min-w-0">
          <ShopToolbar totalFiltered={rows.length} />
          <ActiveFilterTags />

          {rows.length === 0 ? (
            <EmptyState />
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
              {rows.map((row) => (
                <ProductCard key={row.original.id} product={row.original} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {rows.map((row) => (
                <ProductRow key={row.original.id} product={row.original} />
              ))}
            </div>
          )}

          <ShopPagination pageCount={pageCount} />
        </div>
      </div>
    </section>
  );
}
