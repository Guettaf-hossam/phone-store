import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { CATEGORIES, CONDITIONS } from '@/data/products';
import { Product, ProductCategory, ProductCondition } from '@/types';
import { ProductCard } from './ProductCard';

interface CatalogSectionProps {
  products: Product[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  selectedCondition: 'Tous les états' | ProductCondition;
  onSelectCondition: (condition: 'Tous les états' | ProductCondition) => void;
  onlyInStock: boolean;
  onToggleStock: (value: boolean) => void;
  onResetFilters: () => void;
  onSelectProduct: (product: Product) => void;
}

export function CatalogSection(props: CatalogSectionProps) {
  const { t, language } = useLanguage();

  const getCategoryLabel = (cat: ProductCategory) => {
    if (language === 'ar') {
      switch (cat) {
        case 'Tout': return 'الكل';
        case 'Apple': return 'آبل';
        case 'Samsung': return 'سامسونغ';
        case 'Redmi': return 'ريدمي';
        case 'Realme': return 'ريلمي';
        case 'Smart Watch': return 'ساعات ذكية';
        case 'Accessoires': return 'إكسسوارات';
      }
    }
    if (language === 'en') {
      switch (cat) {
        case 'Tout': return 'All';
        case 'Accessoires': return 'Accessories';
      }
    }
    return cat;
  };

  const getConditionLabel = (cond: 'Tous les états' | ProductCondition) => {
    if (language === 'ar') {
      switch (cond) {
        case 'Tous les états': return 'جميع الحالات';
        case 'Neuf Scellé': return 'جديد مغلف';
        case 'Cabas Garanti': return 'كابا مضمون';
        case 'Occasion Certifiée': return 'مستعمل معتمد';
      }
    }
    if (language === 'en') {
      switch (cond) {
        case 'Tous les états': return 'All Conditions';
        case 'Neuf Scellé': return 'Sealed New';
        case 'Cabas Garanti': return 'Guaranteed Cabas';
        case 'Occasion Certifiée': return 'Certified Pre-owned';
      }
    }
    return cond;
  };

  return (
    <section id="catalogue" className="py-24 md:py-32">
      <div className="container-shell">
        <div className="grid gap-8 border-b border-line pb-9 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[.18em] text-muted">
              {t('catalog.badge')}
            </span>
            <h2 className="iri-text mt-4 text-5xl font-semibold leading-[.92] tracking-[-.065em] md:text-8xl">
              {t('catalog.title')}
            </h2>
          </div>
          <div className="relative w-full lg:w-96">
            <Search size={17} className={`absolute top-1/2 -translate-y-1/2 text-muted ${language === 'ar' ? 'right-5' : 'left-5'}`} />
            <input
              type="search"
              value={props.searchQuery}
              onChange={(event) => props.onSearchChange(event.target.value)}
              placeholder={t('catalog.searchPlaceholder')}
              aria-label={t('catalog.searchPlaceholder')}
              className={`h-14 w-full rounded-full border border-line bg-white/72 text-sm outline-none transition focus:border-ink ${
                language === 'ar' ? 'pl-5 pr-12' : 'pl-12 pr-5'
              }`}
            />
          </div>
        </div>

        <div className="no-scrollbar mt-8 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Catégories">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={props.selectedCategory === category}
              onClick={() => props.onSelectCategory(category)}
              className={`min-h-11 shrink-0 rounded-full px-5 text-xs font-medium transition ${
                props.selectedCategory === category
                  ? 'bg-ink text-white'
                  : 'border border-line bg-white/55 text-muted hover:border-ink'
              }`}
            >
              {getCategoryLabel(category)}
            </button>
          ))}
        </div>

        <div className="mt-3 flex flex-col justify-between gap-3 md:flex-row md:items-center">
          <div className="no-scrollbar flex gap-2 overflow-x-auto">
            {CONDITIONS.map((condition) => (
              <button
                key={condition}
                type="button"
                onClick={() => props.onSelectCondition(condition)}
                className={`min-h-10 shrink-0 rounded-full px-4 font-mono text-[9px] uppercase transition ${
                  props.selectedCondition === condition
                    ? 'bg-silver text-ink'
                    : 'text-muted hover:bg-white'
                }`}
              >
                {getConditionLabel(condition)}
              </button>
            ))}
          </div>
          <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-full border border-line px-4 text-xs font-medium">
            <input
              type="checkbox"
              checked={props.onlyInStock}
              onChange={(event) => props.onToggleStock(event.target.checked)}
              className="accent-[#d9232e]"
            />
            {t('catalog.inStockOnly')}
          </label>
        </div>

        <div className="mt-5 flex items-center gap-2 font-mono text-[10px] uppercase text-muted">
          <SlidersHorizontal size={13} /> {props.products.length} {t('catalog.resultsCount')}
        </div>

        {props.products.length ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {props.products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={props.onSelectProduct}
              />
            ))}
          </div>
        ) : (
          <div className="card mt-8 flex min-h-72 flex-col items-center justify-center p-8 text-center">
            <X size={24} />
            <h3 className="mt-4 text-xl font-semibold">{t('catalog.noResults')}</h3>
            <p className="mt-2 text-sm text-muted">{t('catalog.noResultsSub')}</p>
            <button
              type="button"
              onClick={props.onResetFilters}
              className="mt-6 min-h-11 rounded-full bg-ink px-5 text-xs font-semibold text-white transition hover:bg-[#d9232e]"
            >
              {t('catalog.reset')}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
