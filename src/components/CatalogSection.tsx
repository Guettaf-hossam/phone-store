import { CATEGORIES, CONDITIONS } from '../data/products';
import { Product, ProductCategory, ProductCondition } from '../types';
import { ProductCard } from './ProductCard';
import styles from './CatalogSection.module.css';

interface CatalogSectionProps {
  products: Product[];
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  selectedCondition: 'Tous les états' | ProductCondition;
  onSelectCondition: (condition: 'Tous les états' | ProductCondition) => void;
  onlyInStock: boolean;
  onToggleStock: (value: boolean) => void;
  onResetFilters: () => void;
  onSelectProduct: (product: Product) => void;
}

export function CatalogSection({
  products,
  selectedCategory,
  onSelectCategory,
  selectedCondition,
  onSelectCondition,
  onlyInStock,
  onToggleStock,
  onResetFilters,
  onSelectProduct
}: CatalogSectionProps) {
  return (
    <section id="catalogue" className={styles.section}>
      <div className="container">
        <div className={styles.headerRow}>
          <h2 className={styles.heading}>Catalogue Disponible en Magasin</h2>
          <span className={styles.count}>{products.length} article(s) affiché(s)</span>
        </div>

        <div className={styles.categoryTabs} role="tablist">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => onSelectCategory(category)}
              className={`${styles.tabBtn} ${
                selectedCategory === category ? styles.tabBtnActive : ''
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className={styles.secondaryFilters}>
          <div className={styles.conditionGroup}>
            {CONDITIONS.map((condition) => (
              <button
                key={condition}
                type="button"
                onClick={() => onSelectCondition(condition)}
                className={`${styles.conditionPill} ${
                  selectedCondition === condition ? styles.conditionPillActive : ''
                }`}
              >
                {condition}
              </button>
            ))}
          </div>

          <label className={styles.stockToggle}>
            <input
              type="checkbox"
              checked={onlyInStock}
              onChange={(e) => onToggleStock(e.target.checked)}
            />
            <span>En Stock Bouira uniquement</span>
          </label>
        </div>

        {products.length > 0 ? (
          <div className={styles.grid}>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p>Aucun appareil ne correspond à votre recherche actuelle.</p>
            <button type="button" onClick={onResetFilters} className={styles.resetBtn}>
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>
    </section>
  );
}