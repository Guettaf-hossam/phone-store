import { useEffect, useState } from 'react';
import { CatalogSection } from './components/CatalogSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { OoredooBanner } from './components/OoredooBanner';
import { OrderModal } from './components/OrderModal';
import { TradeInSection } from './components/TradeInSection';
import { PRODUCTS } from './data/products';
import { useCatalogFilter } from './hooks/useCatalogFilter';
import { fetchStoreProducts } from './lib/supabase';
import { Product } from './types';

export function App() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchStoreProducts().then((data) => {
      if (data && data.length > 0) {
        setProducts(data);
      }
    });
  }, []);

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
  } = useCatalogFilter(products);

  const featuredProduct = products.find((p) => p.featured) ?? products[0];

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
