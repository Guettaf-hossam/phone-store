import { useMemo, useState } from 'react';
import { Product, ProductCategory, ProductCondition } from '../types';

export function useCatalogFilter(products: Product[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('Tout');
  const [selectedCondition, setSelectedCondition] = useState<'Tous les états' | ProductCondition>('Tous les états');
  const [onlyInStock, setOnlyInStock] = useState(false);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === 'Tout' || product.brand === selectedCategory;

      const matchesCondition =
        selectedCondition === 'Tous les états' || product.condition === selectedCondition;

      const matchesStock = !onlyInStock || product.inStock;

      const matchesQuery =
        query.length === 0 ||
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.specs.toLowerCase().includes(query) ||
        product.condition.toLowerCase().includes(query);

      return matchesCategory && matchesCondition && matchesStock && matchesQuery;
    });
  }, [products, searchQuery, selectedCategory, selectedCondition, onlyInStock]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Tout');
    setSelectedCondition('Tous les états');
    setOnlyInStock(false);
  };

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedCondition,
    setSelectedCondition,
    onlyInStock,
    setOnlyInStock,
    filteredProducts,
    resetFilters
  };
}