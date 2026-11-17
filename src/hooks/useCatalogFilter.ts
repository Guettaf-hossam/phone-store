import { useMemo, useState } from 'react';
import { Product, ProductCategory, ProductCondition } from '../types';
import { normalizeText } from '../utils/search';

export function useCatalogFilter(products: Product[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('Tout');
  const [selectedCondition, setSelectedCondition] = useState<'Tous les états' | ProductCondition>('Tous les états');
  const [onlyInStock, setOnlyInStock] = useState(false);

  const filteredProducts = useMemo(() => {
    const query = normalizeText(searchQuery);

    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === 'Tout' || product.brand === selectedCategory;

      const matchesCondition =
        selectedCondition === 'Tous les états' || product.condition === selectedCondition;

      const matchesStock = !onlyInStock || product.inStock;

      const searchable = normalizeText(
        [
          product.name,
          product.nameAr || '',
          product.brand,
          product.specs,
          product.specsAr || '',
          product.condition,
          product.warranty,
          product.warrantyAr || '',
          ...product.storages,
          ...product.colors.map((c) => c.name),
        ].join(' ')
      );

      const matchesQuery =
        query.length === 0 || searchable.includes(query);

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
    resetFilters,
  };
}
