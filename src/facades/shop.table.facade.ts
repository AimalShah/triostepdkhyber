// ─── Shop Table Facade (TanStack React Table v8) ─────────────────────────────
// Single responsibility: derive filtered/sorted/paginated rows from raw data
// All filter logic is driven by the Zustand store state
// ──────────────────────────────────────────────────────────────────────────────

import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table';
import { useMemo } from 'react';
import { PRODUCTS, type Product } from '../data/shop.products';
import { useShopStore } from '../store/shop.store';

// ── Column definitions ────────────────────────────────────────────────────────
const helper = createColumnHelper<Product>();

export const COLUMNS: ColumnDef<Product, any>[] = [
  helper.accessor('name',          { enableSorting: true,  enableColumnFilter: true  }),
  helper.accessor('category',      { enableSorting: true,  enableColumnFilter: true  }),
  helper.accessor('color',         { enableSorting: false, enableColumnFilter: true  }),
  helper.accessor('price',         { enableSorting: true,  enableColumnFilter: false }),
  helper.accessor('rating',        { enableSorting: true,  enableColumnFilter: false }),
  helper.accessor('inStock',       { enableSorting: false, enableColumnFilter: false }),
  helper.accessor('badge',         { enableSorting: false, enableColumnFilter: true  }),
];

// ── Custom global filter fn ───────────────────────────────────────────────────
function fuzzyGlobal(row: any, _colId: string, filterValue: string): boolean {
  const q = filterValue.toLowerCase();
  const p = row.original as Product;
  return (
    p.name.toLowerCase().includes(q)     ||
    p.category.toLowerCase().includes(q) ||
    p.color.toLowerCase().includes(q)    ||
    p.sku.toLowerCase().includes(q)
  );
}
fuzzyGlobal.autoRemove = (v: any) => !v;

// ── Hook: useShopTable ────────────────────────────────────────────────────────
// Returns paged rows + pagination helpers, all driven by the Zustand store
export function useShopTable() {
  const {
    searchQuery, activeCategory, activeColor,
    priceRange, sortBy, inStockOnly, onSaleOnly,
    currentPage, pageSize, setPage,
  } = useShopStore();

  // Derive sorting from sortBy key
  const sorting = useMemo<SortingState>(() => {
    const map: Record<string, SortingState> = {
      'price-asc':  [{ id: 'price',  desc: false }],
      'price-desc': [{ id: 'price',  desc: true  }],
      'rating':     [{ id: 'rating', desc: true  }],
      'name':       [{ id: 'name',   desc: false }],
      'default':    [],
    };
    return map[sortBy] ?? [];
  }, [sortBy]);

  // Pre-filter data for category/color/price/stock/sale (outside TanStack)
  const filteredData = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (activeCategory !== 'All' && p.category !== activeCategory) return false;
      if (activeColor    !== 'All' && p.color    !== activeColor)    return false;
      if (p.price < priceRange[0] || p.price > priceRange[1])        return false;
      if (inStockOnly && !p.inStock)                                  return false;
      if (onSaleOnly  && p.originalPrice <= p.price)                  return false;
      return true;
    });
  }, [activeCategory, activeColor, priceRange, inStockOnly, onSaleOnly]);

  const table = useReactTable({
    data: filteredData,
    columns: COLUMNS,
    state: {
      globalFilter:  searchQuery,
      sorting,
      pagination:    { pageIndex: currentPage - 1, pageSize },
    },
    globalFilterFn:       fuzzyGlobal,
    getCoreRowModel:      getCoreRowModel(),
    getFilteredRowModel:  getFilteredRowModel(),
    getSortedRowModel:    getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination:     false,
    autoResetPageIndex:   true,
    onPaginationChange:   (updater) => {
      const prev  = { pageIndex: currentPage - 1, pageSize };
      const next  = typeof updater === 'function' ? updater(prev) : updater;
      setPage(next.pageIndex + 1);
    },
  });

  const rows          = table.getRowModel().rows;
  const totalFiltered = table.getFilteredRowModel().rows.length;
  const pageCount     = table.getPageCount();

  return { table, rows, totalFiltered, pageCount, currentPage, pageSize };
}
