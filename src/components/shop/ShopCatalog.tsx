import React from 'react';
import { useShopStore } from '../../store/shop.store';
import { useShopTable } from '../../facades/shop.table.facade';
import FilterSidebar  from './ui/FilterSidebar';
import ShopToolbar    from './ui/ShopToolbar';
import ShopPagination from './ui/ShopPagination';
import ProductCard    from './ui/ProductCard';
import ProductRow     from './ui/ProductRow';

// ── Active filter tag strip ───────────────────────────────────────────────────
function ActiveFilterTags() {
  const { activeCategory, activeColor, inStockOnly, onSaleOnly,
    setCategory, setColor, setInStockOnly, setOnSaleOnly } = useShopStore();

  const tags = [
    activeCategory !== 'All'  && { label: activeCategory, onRemove: () => setCategory('All') },
    activeColor    !== 'All'  && { label: activeColor,    onRemove: () => setColor('All')    },
    inStockOnly               && { label: 'In Stock',     onRemove: () => setInStockOnly(false) },
    onSaleOnly                && { label: 'On Sale',      onRemove: () => setOnSaleOnly(false)  },
  ].filter(Boolean) as { label: string; onRemove: () => void }[];

  if (!tags.length) return null;

  return (
    <div className="flex flex-wrap gap-2 py-3">
      {tags.map((t, index) => (
        <span key={`${t.label}-${index}`}
          className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest font-semibold
            border border-dark px-3 py-1 rounded-full text-dark">
          {t.label}
          <button onClick={t.onRemove}
            className="text-gray-400 hover:text-red-500 transition-colors leading-none">✕</button>
        </span>
      ))}
    </div>
  );
}

// ── Empty state ───────────────────────────────────────────────────────────────
function EmptyState() {
  const { clearFilters } = useShopStore();
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
      <h3 className="font-display text-lg uppercase tracking-tight font-bold text-dark">No products found</h3>
      <p className="text-sm text-gray-400">Try adjusting your filters or search.</p>
      <button onClick={clearFilters}
        className="mt-2 px-6 py-2.5 bg-dark text-white text-[10px] uppercase tracking-widest
          font-semibold hover:bg-gray-800 transition-colors">
        Clear Filters
      </button>
    </div>
  );
}

// ── Main ShopCatalog ──────────────────────────────────────────────────────────
export default function ShopCatalog() {
  const { rows, pageCount } = useShopTable();
  const { viewMode } = useShopStore();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <section className="max-w-[1440px] mx-auto px-4 md:px-6 pb-20 bg-white">
      {/* Mobile filter button */}
      <div className="lg:hidden py-4 border-b border-gray-100">
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex items-center gap-2 text-[10px] uppercase tracking-widest
            font-semibold border border-gray-300 px-4 py-2 hover:border-dark transition-all text-dark"
        >
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none"
            stroke="currentColor" strokeWidth={2}>
            <path d="M4 6h16M8 12h8M11 18h2" strokeLinecap="round"/>
          </svg>
          Filters
        </button>
      </div>

      {/* Main layout grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-0 lg:gap-8 items-start pt-8">

        {/* Desktop sidebar */}
        <div className="hidden lg:block sticky top-[80px]">
          <FilterSidebar />
        </div>

        {/* Right content */}
        <div className="min-w-0">
          <ShopToolbar totalFiltered={rows.length} />
          <ActiveFilterTags />

          {rows.length === 0 ? (
            <EmptyState />
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 border-l border-t border-gray-100">
              {rows.map((row) => (
                <ProductCard key={row.original.id} product={row.original} />
              ))}
            </div>
          ) : (
            <div className="border-t border-gray-100">
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
