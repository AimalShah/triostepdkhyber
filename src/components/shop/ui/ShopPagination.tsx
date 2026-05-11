// ─── ShopPagination ───────────────────────────────────────────────────────────
import { useShopStore } from '../../../store/shop.store';

export default function ShopPagination({ pageCount }: { pageCount: number }) {
  const { currentPage, setPage } = useShopStore();
  if (pageCount <= 1) return null;

  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-1.5 py-10">
      <button
        disabled={currentPage === 1}
        onClick={() => setPage(currentPage - 1)}
        className="px-4 h-9 text-[10px] uppercase tracking-widest border border-gray-200
          disabled:opacity-30 disabled:cursor-not-allowed hover:bg-dark hover:text-white
          hover:border-dark transition-all duration-150"
      >
        ← Prev
      </button>

      {pages.map((p) => {
        const isActive = p === currentPage;
        const show = p === 1 || p === pageCount ||
          Math.abs(p - currentPage) <= 1;
        const showDots = !show && (p === 2 || p === pageCount - 1);

        if (showDots) return <span key={p} className="text-gray-300 text-xs px-1">…</span>;
        if (!show) return null;

        return (
          <button key={p} onClick={() => setPage(p)}
            className={`w-9 h-9 text-[11px] font-semibold border transition-all duration-150
              ${isActive
                ? 'bg-dark text-white border-dark'
                : 'border-gray-200 text-gray-500 hover:bg-dark hover:text-white hover:border-dark'}`}>
            {p}
          </button>
        );
      })}

      <button
        disabled={currentPage === pageCount}
        onClick={() => setPage(currentPage + 1)}
        className="px-4 h-9 text-[10px] uppercase tracking-widest border border-gray-200
          disabled:opacity-30 disabled:cursor-not-allowed hover:bg-dark hover:text-white
          hover:border-dark transition-all duration-150"
      >
        Next →
      </button>
    </div>
  );
}
