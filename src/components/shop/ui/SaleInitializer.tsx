import React, { useEffect } from 'react';
import { useShopStore } from '../../../store/shop.store';

export default function SaleInitializer() {
  const { setOnSaleOnly, clearFilters } = useShopStore();

  useEffect(() => {
    // Reset filters first to ensure a clean state
    clearFilters();
    // Then apply sale filter
    setOnSaleOnly(true);
    
    // Cleanup on unmount if needed, but usually we want to stay in sale mode while on this page
  }, []);

  return null;
}
