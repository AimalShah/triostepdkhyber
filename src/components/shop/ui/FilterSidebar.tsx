import React from 'react';
import { CATEGORIES, COLORS } from '../../../data/shop.products';
import { useShopStore } from '../../../store/shop.store';
import { COLOR_HEX } from './ShopAtoms';

// ── Sub-component: FilterSection ──────────────────────────────────────────────
function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-12">
      <h3 className="text-[11px] uppercase tracking-[0.25em] text-dark font-black mb-6">
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
    <label className="flex items-center justify-between cursor-pointer mb-4 group">
      <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-gray-400
        group-hover:text-dark transition-colors">
        {label}
      </span>
      <div
        onClick={() => onChange(!checked)}
        className={`relative w-8 h-4 transition-colors duration-300
          ${checked ? 'bg-dark' : 'bg-gray-100'}`}
      >
        <span className={`absolute top-0 left-0 w-4 h-4 bg-dark shadow-sm
          transition-transform duration-300 ${checked ? 'translate-x-4 bg-white border border-dark' : 'bg-dark opacity-20'}`} />
      </div>
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
    <aside className="w-full pr-8 py-2 sticky top-[100px]">
      {/* Header */}
      <div className="flex justify-between items-end pb-8 mb-10 border-b border-gray-100">
        <h2 className="text-2xl font-bold uppercase tracking-tighter">Filters</h2>
        {hasActiveFilters && (
          <button onClick={clearFilters}
            className="text-[9px] uppercase tracking-[0.2em] text-gray-400 font-bold
              hover:text-dark border-b border-gray-200 hover:border-dark transition-all pb-0.5">
            Reset
          </button>
        )}
      </div>

      {/* Category */}
      <FilterSection title="Collections">
        <div className="flex flex-col items-start gap-4">
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setCategory(c)}
              className={`text-left text-[11px] uppercase tracking-[0.2em] font-bold transition-all duration-300
                relative after:absolute after:bottom-[-2px] after:left-0 after:h-[1.5px] after:bg-dark after:transition-all
                ${activeCategory === c
                  ? 'text-dark after:w-full'
                  : 'text-gray-400 hover:text-dark after:w-0'}`}>
              {c}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Color */}
      <FilterSection title="Palette">
        <div className="grid grid-cols-5 gap-3">
          {COLORS.map((c) => (
            <button key={c} onClick={() => setColor(c)} title={c}
              className={`aspect-square transition-all duration-300 flex items-center justify-center border
                ${activeColor === c
                  ? 'border-dark scale-110 shadow-lg'
                  : 'border-transparent hover:border-gray-200'}`}
              style={{ background: c === 'All' ? '#F3F4F6' : COLOR_HEX[c] }}>
              {c === 'All' && (
                <span className="text-[7px] font-black uppercase text-dark opacity-40">All</span>
              )}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price">
        <div className="space-y-6">
          <div className="flex justify-between text-[11px] font-bold tracking-tighter text-dark italic">
            <span>{new Intl.NumberFormat('ru-RU').format(priceRange[0])} ₽</span>
            <span>{new Intl.NumberFormat('ru-RU').format(priceRange[1])} ₽</span>
          </div>
          <div className="relative h-6 flex items-center">
             <input type="range" min={0} max={35000} step={500}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                className="w-full h-[2px] appearance-none bg-gray-100 accent-dark cursor-pointer" />
          </div>
        </div>
      </FilterSection>

      {/* Availability */}
      <FilterSection title="Availability">
        <div className="space-y-2">
            <ToggleRow label="In Stock"  checked={inStockOnly} onChange={setInStockOnly} />
            <ToggleRow label="On Sale"   checked={onSaleOnly}  onChange={setOnSaleOnly}  />
        </div>
      </FilterSection>
    </aside>
  );
}
