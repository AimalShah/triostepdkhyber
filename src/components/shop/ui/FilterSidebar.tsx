// ─── FilterSidebar ────────────────────────────────────────────────────────────
import { CATEGORIES, COLORS } from '../../../data/shop.products';
import { useShopStore } from '../../../store/shop.store';
import { COLOR_HEX } from './ShopAtoms';

// ── Sub-component: FilterSection ──────────────────────────────────────────────
function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h3 className="text-[10px] uppercase tracking-[0.12em] text-gray-400 font-semibold mb-3">
        {title}
      </h3>
      {children}
    </div>
  );
}

// ── Sub-component: ToggleRow ──────────────────────────────────────────────────
function ToggleRow({ label, checked, onChange }: {
  label: string; checked: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer mb-3 group">
      <div
        onClick={() => onChange(!checked)}
        className={`relative w-9 h-5 rounded-full transition-colors duration-200 flex-shrink-0
          ${checked ? 'bg-dark' : 'bg-gray-200'}`}
      >
        <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm
          transition-transform duration-200 ${checked ? 'translate-x-4' : ''}`} />
      </div>
      <span className="text-[10px] uppercase tracking-widest font-medium text-gray-600
        group-hover:text-dark transition-colors">
        {label}
      </span>
    </label>
  );
}

// ── Main FilterSidebar ────────────────────────────────────────────────────────
export default function FilterSidebar() {
  const {
    activeCategory, activeColor, priceRange, inStockOnly, onSaleOnly,
    setCategory, setColor, setPriceRange, setInStockOnly, setOnSaleOnly, clearFilters,
  } = useShopStore();

  const hasActiveFilters =
    activeCategory !== 'All' || activeColor !== 'All' ||
    priceRange[0] > 0 || priceRange[1] < 35000 ||
    inStockOnly || onSaleOnly;

  return (
    <aside className="w-full border-r border-gray-100 pr-6 py-6">
      {/* Header */}
      <div className="flex justify-between items-center pb-4 mb-5 border-b border-gray-100">
        <h2 className="font-display text-sm font-semibold uppercase tracking-wide">Filters</h2>
        {hasActiveFilters && (
          <button onClick={clearFilters}
            className="text-[9px] uppercase tracking-widest text-gray-400
              hover:text-dark border-b border-transparent hover:border-dark transition-all">
            Clear all
          </button>
        )}
      </div>

      {/* Category */}
      <FilterSection title="Category">
        <div className="flex flex-col gap-1">
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setCategory(c)}
              className={`text-left text-[11px] py-1.5 px-3 rounded transition-all duration-150
                uppercase tracking-wider font-medium
                ${activeCategory === c
                  ? 'bg-dark text-white'
                  : 'text-gray-500 hover:text-dark hover:bg-gray-50'}`}>
              {c}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Color */}
      <FilterSection title="Color">
        <div className="flex flex-wrap gap-2">
          {COLORS.map((c) => (
            <button key={c} onClick={() => setColor(c)} title={c}
              className={`w-7 h-7 rounded-full border-2 transition-all duration-150 flex items-center justify-center
                ${activeColor === c
                  ? 'border-dark shadow-[0_0_0_2px_white,0_0_0_4px_#1a1a1a]'
                  : 'border-transparent hover:scale-110'}`}
              style={{ background: c === 'All' ? 'conic-gradient(red,orange,yellow,green,blue,violet,red)' : COLOR_HEX[c] }}>
              {c === 'All' && (
                <span className="text-[7px] font-bold text-white drop-shadow">All</span>
              )}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price Range">
        <div className="flex justify-between text-[10px] text-gray-400 mb-2">
          <span>{new Intl.NumberFormat('ru-RU').format(priceRange[0])} ₽</span>
          <span>{new Intl.NumberFormat('ru-RU').format(priceRange[1])} ₽</span>
        </div>
        <input type="range" min={0} max={35000} step={500}
          value={priceRange[0]}
          onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
          className="w-full h-0.5 appearance-none bg-gray-200 accent-dark mb-2 cursor-pointer" />
        <input type="range" min={0} max={35000} step={500}
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
          className="w-full h-0.5 appearance-none bg-gray-200 accent-dark cursor-pointer" />
      </FilterSection>

      {/* Availability */}
      <FilterSection title="Availability">
        <ToggleRow label="In Stock Only"  checked={inStockOnly} onChange={setInStockOnly} />
        <ToggleRow label="On Sale Only"   checked={onSaleOnly}  onChange={setOnSaleOnly}  />
      </FilterSection>
    </aside>
  );
}
