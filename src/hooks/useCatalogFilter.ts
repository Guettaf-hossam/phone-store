// ============================================================
// src/hooks/useCatalogFilter.ts
// Reactive filter + search state for the catalog
// ============================================================

import { useState, useMemo, useCallback } from 'react';
import { CATALOG } from '@/data/catalog';
import type { ShelfCategory, ConditionTag, CatalogItem } from '@/data/catalog';

export type SortMode = 'featured' | 'price_asc' | 'price_desc' | 'newest';
export type AvailFilter = 'all' | 'in_stock';

interface FilterState {
  shelf: ShelfCategory | 'Tout';
  condition: ConditionTag | 'Tous les états';
  availability: AvailFilter;
  query: string;
  sort: SortMode;
}

function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function useCatalogFilter(externalQuery?: string) {
  const [filters, setFilters] = useState<FilterState>({
    shelf: 'Tout',
    condition: 'Tous les états',
    availability: 'all',
    query: '',
    sort: 'featured',
  });

  // Merge external search query (from Navbar) into local state
  const effectiveQuery = externalQuery ?? filters.query;

  const setShelf = useCallback(
    (shelf: FilterState['shelf']) => setFilters((f) => ({ ...f, shelf })),
    []
  );
  const setCondition = useCallback(
    (condition: FilterState['condition']) =>
      setFilters((f) => ({ ...f, condition })),
    []
  );
  const setAvailability = useCallback(
    (availability: AvailFilter) =>
      setFilters((f) => ({ ...f, availability })),
    []
  );
  const setSort = useCallback(
    (sort: SortMode) => setFilters((f) => ({ ...f, sort })),
    []
  );
  const setQuery = useCallback(
    (query: string) => setFilters((f) => ({ ...f, query })),
    []
  );

  const results = useMemo<CatalogItem[]>(() => {
    const q = normalize(effectiveQuery.trim());

    let items = CATALOG.filter((item) => {
      // Shelf filter
      if (filters.shelf !== 'Tout' && item.shelf !== filters.shelf) return false;

      // Condition filter
      if (
        filters.condition !== 'Tous les états' &&
        item.condition !== filters.condition
      )
        return false;

      // Availability filter
      if (filters.availability === 'in_stock') {
        const hasStock = item.storageOptions.some(
          (v) => v.stock === 'in_stock' || v.stock === 'low_stock'
        );
        if (!hasStock) return false;
      }

      // Full-text search
      if (q) {
        const hay = normalize(
          [
            item.brand,
            item.model,
            item.shelf,
            item.tagline,
            item.specSummary,
            item.condition,
            item.colors.map((c) => c.name).join(' '),
          ].join(' ')
        );
        if (!hay.includes(q)) return false;
      }

      return true;
    });

    // Sort
    switch (filters.sort) {
      case 'price_asc':
        items = [...items].sort((a, b) => a.basePriceDA - b.basePriceDA);
        break;
      case 'price_desc':
        items = [...items].sort((a, b) => b.basePriceDA - a.basePriceDA);
        break;
      case 'featured':
        items = [...items].sort(
          (a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)
        );
        break;
      default:
        break;
    }

    return items;
  }, [filters, effectiveQuery]);

  return {
    filters,
    results,
    totalCount: CATALOG.length,
    setShelf,
    setCondition,
    setAvailability,
    setSort,
    setQuery,
  };
}
