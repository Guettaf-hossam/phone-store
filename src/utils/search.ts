import { Product, ProductCategory, ProductCondition } from '../types';

export function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export function filterProducts(
  products: Product[],
  query: string,
  category: ProductCategory,
  condition: 'Tous les états' | ProductCondition,
  onlyInStock: boolean
): Product[] {
  const normalizedQuery = normalizeText(query);

  return products
    .filter((product) => {
      const matchesCategory = category === 'Tout' || product.brand === category;
      const matchesCondition =
        condition === 'Tous les états' || product.condition === condition;
      const matchesStock = !onlyInStock || product.inStock;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        normalizeText(product.name).includes(normalizedQuery) ||
        normalizeText(product.brand).includes(normalizedQuery) ||
        normalizeText(product.specs).includes(normalizedQuery) ||
        normalizeText(product.condition).includes(normalizedQuery);

      return matchesCategory && matchesCondition && matchesStock && matchesQuery;
    })
    .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
}
