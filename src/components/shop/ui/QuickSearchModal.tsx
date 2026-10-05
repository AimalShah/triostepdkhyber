import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { PRODUCTS, type Product } from '../../../data/shop.products';
import { fmtPrice } from './ShopAtoms';

export default function QuickSearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Keyboard shortcut: Cmd/Ctrl + K or Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const filteredProducts = query.trim()
    ? PRODUCTS.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.color.toLowerCase().includes(q)
        );
      }).slice(0, 8)
    : [];

  const quickTags = ['Chelsea Boots', 'Derby Shoes', 'Loafers', 'Sneakers', 'Black', 'Sale'];

  const modalContent = isOpen && mounted ? (
    <div className="fixed inset-0 z-[99999] flex flex-col justify-start items-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-dark/70 backdrop-blur-md transition-opacity duration-300"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-3xl mx-auto mt-12 md:mt-24 px-4">
        <div className="bg-white shadow-2xl border border-gray-100 overflow-hidden rounded-sm transition-all duration-300">
          
          {/* Header & Input */}
          <div className="flex items-center px-6 py-5 border-b border-gray-100 gap-4">
            <svg
              className="w-5 h-5 text-gray-400 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by silhouette, leather, color, or collection..."
              className="flex-1 text-sm md:text-base font-medium outline-none placeholder:text-gray-400 text-dark bg-transparent"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-xs uppercase tracking-widest text-gray-400 hover:text-dark px-2 py-1 font-bold"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-dark hover:text-white transition-colors flex items-center justify-center text-dark text-xs"
              aria-label="Close search"
            >
              ✕
            </button>
          </div>

          {/* Quick Suggestions / Popular Tags */}
          {!query && (
            <div className="px-6 py-6 bg-gray-50/60 border-b border-gray-100">
              <span className="text-[9px] uppercase tracking-[0.3em] font-black text-gray-400 block mb-3">
                Curated Suggestions
              </span>
              <div className="flex flex-wrap gap-2">
                {quickTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 bg-white border border-gray-200 text-dark text-[10px] uppercase tracking-wider font-bold hover:bg-dark hover:text-white hover:border-dark transition-all rounded-sm"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results List */}
          <div className="max-h-[60vh] overflow-y-auto divide-y divide-gray-100">
            {query.trim() && filteredProducts.length === 0 && (
              <div className="py-12 text-center text-gray-400">
                <p className="text-sm font-medium mb-1">No matching pairs found for "{query}"</p>
                <p className="text-xs text-gray-400">Try searching for "Chelsea", "Loafer", or "Derby"</p>
              </div>
            )}

            {filteredProducts.map((p) => (
              <a
                key={p.id}
                href={`/product/${p.id}`}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-4 px-6 py-3.5 hover:bg-gray-50 transition-colors group"
              >
                <div className="w-14 h-16 bg-gray-100 overflow-hidden shrink-0">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">
                      {p.category}
                    </span>
                    {p.badge && (
                      <span className="text-[8px] uppercase tracking-widest px-1.5 py-0.5 bg-dark text-white font-bold">
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-dark group-hover:text-gray-600 transition-colors truncate">
                    {p.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-black text-dark">{fmtPrice(p.price)}</span>
                    {p.originalPrice > p.price && (
                      <span className="text-[10px] text-gray-400 line-through">
                        {fmtPrice(p.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
                <div className="shrink-0 text-gray-300 group-hover:text-dark transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            ))}
          </div>

          {/* Footer Bar */}
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-[10px] uppercase tracking-widest text-gray-400 font-bold">
            <span>Press ESC or click outside to dismiss</span>
            <a
              href="/shop"
              onClick={() => setIsOpen(false)}
              className="text-dark hover:underline flex items-center gap-1 font-black"
            >
              <span>Explore all catalog</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Search Catalog (Cmd+K)"
        className="text-dark hover:text-gray-500 transition-colors p-1.5 flex items-center gap-2 group"
        title="Search Catalog (Cmd+K)"
      >
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:scale-110"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <span className="hidden xl:inline text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 group-hover:text-dark">
          Search
        </span>
      </button>

      {mounted && createPortal(modalContent, document.body)}
    </>
  );
}
