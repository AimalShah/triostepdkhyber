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
    <div className="flex flex-wrap items-center gap-6 py-6 mb-8 border-b border-gray-100">
      {/* Search */}
      <div className="relative flex-1 min-w-[240px] max-w-sm group">
        <svg className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none transition-colors group-focus-within:text-dark"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          type="search"
          placeholder="SEARCH ARCHIVE..."
          value={searchQuery}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-8 pr-4 py-3 text-[10px] bg-transparent outline-none
            uppercase tracking-[0.2em] placeholder:text-gray-300 font-bold"
        />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gray-100 origin-left scale-x-100 group-focus-within:bg-dark transition-all"></div>
        
        {searchQuery && (
          <button onClick={() => setSearch('')}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300 hover:text-dark transition-colors">
            <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Spacer */}
      <div className="hidden md:block flex-1" />

      {/* Right Actions */}
      <div className="flex items-center gap-8">
        {/* Result count */}
        <span className="text-[9px] uppercase tracking-[0.3em] font-black text-dark">
          {totalFiltered} <span className="text-gray-400 ml-1">Results</span>
        </span>

        {/* Sort */}
        <div className="relative group">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-[10px] uppercase tracking-[0.2em] font-black bg-transparent outline-none cursor-pointer pr-6 appearance-none hover:text-gray-500 transition-colors"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
               <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path d="M6 9l6 6 6-6" />
               </svg>
            </div>
        </div>

        {/* View toggle */}
        <div className="flex gap-4 border-l border-gray-100 pl-8">
          {(['grid', 'list'] as const).map((m) => (
            <button key={m} onClick={() => setViewMode(m)} title={`${m} view`}
              className={`transition-all duration-300 flex items-center gap-2
                ${viewMode === m ? 'text-dark scale-110' : 'text-gray-200 hover:text-gray-400'}`}>
              <div className="w-4 h-4 flex items-center justify-center">
                 {m === 'grid' ? <GridIcon /> : <ListIcon />}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
