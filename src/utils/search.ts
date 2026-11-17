// ============================================================
// src/utils/search.ts
// Client-side fuzzy search for the catalog
// ============================================================

import type { Product, ProductCategory, Brand } from '@/types';

interface FilterOptions {
  query: string;
  category: ProductCategory | 'all';
  brand: Brand | 'all';
  sortBy: 'price_asc' | 'price_desc' | 'newest' | 'featured';
}

function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function filterAndSortProducts(
  products: Product[],
  { query, category, brand, sortBy }: FilterOptions
): Product[] {
  const q = normalize(query.trim());

  let result = products.filter((p) => {
    // Category filter
    if (category !== 'all' && p.category !== category) return false;
    // Brand filter
    if (brand !== 'all' && p.brand !== brand) return false;
    // Text search across name, model, brand, tags, tagline, specs
    if (q) {
      const haystack = normalize(
        [
          p.name,
          p.model,
          p.brand,
          p.tagline ?? '',
          p.tags.join(' '),
          p.specs.map((s) => `${s.label} ${s.value}`).join(' '),
        ].join(' ')
      );
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

  // Sort
  switch (sortBy) {
    case 'price_asc':
      result = result.sort((a, b) => a.basePriceDA - b.basePriceDA);
      break;
    case 'price_desc':
      result = result.sort((a, b) => b.basePriceDA - a.basePriceDA);
      break;
    case 'newest':
      result = result.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      break;
    case 'featured':
      result = result.sort(
        (a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)
      );
      break;
  }

  return result;
}
