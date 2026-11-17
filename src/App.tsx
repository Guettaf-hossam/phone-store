import { useCallback, useEffect, useState } from 'react';
import { CatalogSection } from '@/components/CatalogSection';
import { FAQ } from '@/components/FAQ';
import { FeatureBento } from '@/components/FeatureBento';
import { Hero } from '@/components/Hero';
import { OrderModal } from '@/components/OrderModal';
import { SafetySection } from '@/components/SafetySection';
import { ScanModes } from '@/components/ScanModes';
import { SignalSection } from '@/components/SignalSection';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { PRODUCTS } from '@/data/products';
import { useCatalogFilter } from '@/hooks/useCatalogFilter';
import { fetchStoreProducts } from '@/lib/supabase';
import { Product } from '@/types';

export function App() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const closeModal = useCallback(() => setSelectedProduct(null), []);

  useEffect(() => {
    void fetchStoreProducts().then((data) => {
      if (data.length) setProducts(data);
    });
  }, []);

  const filters = useCatalogFilter(products);

  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <FeatureBento />
        <SignalSection onSelectBrand={(brand) => {
          filters.setSelectedCategory(brand);
          filters.setSelectedCondition('Tous les états');
        }} />
        <CatalogSection
          products={filters.filteredProducts}
          searchQuery={filters.searchQuery}
          onSearchChange={filters.setSearchQuery}
          selectedCategory={filters.selectedCategory}
          onSelectCategory={filters.setSelectedCategory}
          selectedCondition={filters.selectedCondition}
          onSelectCondition={filters.setSelectedCondition}
          onlyInStock={filters.onlyInStock}
          onToggleStock={filters.setOnlyInStock}
          onResetFilters={filters.resetFilters}
          onSelectProduct={setSelectedProduct}
        />
        <ScanModes
          onSelectConditionFilter={(condition) => filters.setSelectedCondition(condition)}
          onSelectBrandFilter={(brand) => filters.setSelectedCategory(brand)}
        />
        <SafetySection />
        <FAQ />
      </main>
      <SiteFooter />
      <OrderModal key={selectedProduct?.id ?? 'closed'} product={selectedProduct} onClose={closeModal} />
    </>
  );
}

export default App;
