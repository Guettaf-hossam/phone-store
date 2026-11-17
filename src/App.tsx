import { useState } from 'react';
import { CatalogSection } from './components/CatalogSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { OoredooBanner } from './components/OoredooBanner';
import { OrderModal } from './components/OrderModal';
import { TradeInSection } from './components/TradeInSection';
import { PRODUCTS } from './data/products';
import { useCatalogFilter } from './hooks/useCatalogFilter';
import { Product } from './types';

export function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const {
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
  } = useCatalogFilter(PRODUCTS);

  const featuredProduct = PRODUCTS.find((p) => p.featured) ?? PRODUCTS[0];

  return (
    <>
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <main>
        <HeroSection
          featuredProduct={featuredProduct}
          onOrderProduct={setSelectedProduct}
        />
        <CatalogSection
          products={filteredProducts}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedCondition={selectedCondition}
          onSelectCondition={setSelectedCondition}
          onlyInStock={onlyInStock}
          onToggleStock={setOnlyInStock}
          onResetFilters={resetFilters}
          onSelectProduct={setSelectedProduct}
        />
        <TradeInSection />
        <OoredooBanner />
      </main>
      <Footer />
      <OrderModal
        key={selectedProduct?.id ?? 'closed'}
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}

export default App;