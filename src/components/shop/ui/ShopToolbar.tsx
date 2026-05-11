// ─── ShopToolbar ─────────────────────────────────────────────────────────────
// Search input + sort selector + grid/list toggle + result count
// ──────────────────────────────────────────────────────────────────────────────
import { useShopStore } from '../../../store/shop.store';
import { SORT_OPTIONS } from '../../../data/shop.products';

const GridIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="8" height="8" rx="1"/>
    <rect x="13" y="3" width="8" height="8" rx="1"/>
    <rect x="3" y="13" width="8" height="8" rx="1"/>
    <rect x="13" y="13" width="8" height="8" rx="1"/>
  </svg>
);

const ListIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" strokeLinecap="round"/>
  </svg>
);

export default function ShopToolbar({ totalFiltered }: { totalFiltered: number }) {
  const { searchQuery, sortBy, viewMode, setSearch, setSortBy, setViewMode } = useShopStore();

  return (
    <div className="flex flex-wrap items-center gap-3 py-4 border-b border-gray-100">
      {/* Search */}
      <div className="relative flex-1 min-w-[180px] max-w-xs">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          type="search"
          placeholder="Search products, SKU…"
          value={searchQuery}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-[11px] bg-gray-50 border border-gray-200
            rounded-sm outline-none focus:border-dark focus:bg-white transition-colors
            uppercase placeholder:normal-case placeholder:capitalize"
        />
        {searchQuery && (
          <button onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-dark text-xs">
            ✕
          </button>
        )}
      </div>

      {/* Result count */}
      <span className="text-[10px] uppercase tracking-widest text-gray-400 whitespace-nowrap">
        {totalFiltered} product{totalFiltered !== 1 ? 's' : ''}
      </span>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Sort */}
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value as any)}
        className="text-[10px] uppercase tracking-wider border border-gray-200 px-3 py-2
          bg-white outline-none cursor-pointer hover:border-dark transition-colors"
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>

      {/* View toggle */}
      <div className="flex gap-1">
        {(['grid', 'list'] as const).map((m) => (
          <button key={m} onClick={() => setViewMode(m)} title={`${m} view`}
            className={`w-8 h-8 flex items-center justify-center border rounded-sm transition-all duration-150
              ${viewMode === m ? 'bg-dark text-white border-dark' : 'border-gray-200 text-gray-400 hover:border-dark hover:text-dark'}`}>
            {m === 'grid' ? <GridIcon /> : <ListIcon />}
          </button>
        ))}
      </div>
    </div>
  );
}
