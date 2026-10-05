import React from 'react';
import { CATEGORIES, COLORS, PRODUCTS } from '../../../data/shop.products';
import { useShopStore } from '../../../store/shop.store';
import { COLOR_HEX, fmtPrice } from './ShopAtoms';

// ── Sub-component: FilterSection ──────────────────────────────────────────────
function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10 pb-8 border-b border-gray-100 last:border-b-0">
      <h3 className="text-[10px] uppercase tracking-[0.3em] text-dark font-black mb-5 flex items-center justify-between">
        <span>{title}</span>
      </h3>
      {children}
    </div>
  );
}

// ── Sub-component: ToggleRow ──────────────────────────────────────────────────
function ToggleRow({
  label, checked, onChange,
}: {
  label: string; checked: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between cursor-pointer py-1.5 group select-none">
      <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 group-hover:text-dark transition-colors">
        {label}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
          checked ? 'bg-dark' : 'bg-gray-200'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            checked ? 'translate-x-4' : 'translate-x-0'
          }`}
        />
      </button>
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
    <aside className="w-full pr-4 py-2">
      {/* Header */}
      <div className="flex justify-between items-baseline pb-5 mb-6 border-b border-gray-100">
        <div>
          <span className="text-[9px] uppercase tracking-[0.3em] text-gray-400 font-bold block mb-1">Curation</span>
          <h2 className="text-xl font-bold uppercase tracking-tight text-dark">Filter</h2>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-[9px] uppercase tracking-[0.2em] text-gray-400 font-bold hover:text-dark border-b border-gray-300 hover:border-dark transition-all pb-0.5"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Category */}
      <FilterSection title="Silhouette">
        <div className="flex flex-col items-start space-y-2.5">
          {CATEGORIES.map((c) => {
            const count = c === 'All'
              ? PRODUCTS.length
              : PRODUCTS.filter((p) => p.category === c).length;
            const isSelected = activeCategory === c;

            return (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`w-full flex items-center justify-between text-left text-[11px] uppercase tracking-[0.2em] font-bold transition-all duration-200 py-1 ${
                  isSelected
                    ? 'text-dark font-black translate-x-1'
                    : 'text-gray-400 hover:text-dark hover:translate-x-1'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className={`w-1 h-3 rounded-full transition-all ${isSelected ? 'bg-dark' : 'bg-transparent'}`}></span>
                  {c}
                </span>
                <span className={`text-[9px] font-normal ${isSelected ? 'text-dark font-bold' : 'text-gray-300'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </FilterSection>

      {/* Color */}
      <FilterSection title="Palette">
        <div className="grid grid-cols-4 gap-2.5">
          {COLORS.map((c) => {
            const isSelected = activeColor === c;
            return (
              <button
                key={c}
                onClick={() => setColor(c)}
                title={c}
                className={`relative flex flex-col items-center gap-1.5 p-2 rounded-none transition-all duration-200 border ${
                  isSelected
                    ? 'border-dark bg-gray-50 shadow-sm'
                    : 'border-gray-100 hover:border-gray-300'
                }`}
              >
                {c === 'All' ? (
                  <div className="w-5 h-5 rounded-full border border-dashed border-gray-400 flex items-center justify-center text-[7px] font-bold text-gray-400 uppercase">
                    All
                  </div>
                ) : (
                  <div
                    className="w-5 h-5 rounded-full border border-black/10 shadow-inner flex items-center justify-center"
                    style={{ backgroundColor: COLOR_HEX[c] ?? '#999' }}
                  >
                    {isSelected && (
                      <span className={`text-[10px] font-bold ${c === 'White' || c === 'Grey' ? 'text-dark' : 'text-white'}`}>
                        ✓
                      </span>
                    )}
                  </div>
                )}
                <span className="text-[8px] uppercase tracking-wider font-semibold text-gray-600 truncate max-w-full">
                  {c}
                </span>
              </button>
            );
          })}
        </div>
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price Ceiling">
        <div className="space-y-4">
          <div className="flex justify-between items-baseline text-[11px] font-bold tracking-tight text-dark">
            <span className="text-gray-400 font-normal">Up to</span>
            <span className="text-sm font-black">{fmtPrice(priceRange[1])}</span>
          </div>

          <div className="relative pt-2">
            <input
              type="range"
              min={10000}
              max={35000}
              step={1000}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
              className="w-full h-1.5 appearance-none bg-gray-200 accent-dark cursor-pointer rounded-lg"
            />
            <div className="flex justify-between text-[9px] text-gray-400 font-medium mt-2">
              <span>{fmtPrice(10000)}</span>
              <span>{fmtPrice(35000)}</span>
            </div>
          </div>
        </div>
      </FilterSection>

      {/* Availability */}
      <FilterSection title="Availability">
        <div className="space-y-1">
          <ToggleRow label="In Stock Only" checked={inStockOnly} onChange={setInStockOnly} />
          <ToggleRow label="On Sale" checked={onSaleOnly} onChange={setOnSaleOnly} />
        </div>
      </FilterSection>

      {/* Craftsmanship Note */}
      <div className="p-4 bg-gray-50 border border-gray-100 text-[10px] leading-relaxed text-gray-500">
        <strong className="block uppercase tracking-wider text-dark font-black mb-1">
          Custom Fit Inquiries
        </strong>
        All boots are hand-lasted. For bespoke widths or half-sizes, contact our atelier team.
      </div>
    </aside>
  );
}
