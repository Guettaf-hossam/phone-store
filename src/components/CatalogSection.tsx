// ============================================================
// src/components/CatalogSection.tsx
// Full interactive product grid with shelf tabs + filters
// ============================================================

import { useCallback, useMemo } from 'react';
import { CATALOG, ALL_SHELVES, ALL_CONDITIONS } from '@/data/catalog';
import type { ShelfCategory, ConditionTag } from '@/data/catalog';
import { useCatalogFilter } from '@/hooks/useCatalogFilter';
import type { SortMode } from '@/hooks/useCatalogFilter';
import ProductCard from './ProductCard';
import styles from './CatalogSection.module.css';

interface CatalogSectionProps {
  /** Search query forwarded from Navbar */
  searchQuery?: string;
}

// ---- Shelf tab emoji icons ----
const SHELF_ICONS: Record<string, string> = {
  Apple:        '🍎',
  Samsung:      '🌀',
  Redmi:        '🔴',
  Realme:       '⚡',
  'Smart Watch':'⌚',
  Accessoires:  '🎧',
};

// ---- Icon Components ----
function SearchXIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={styles.emptyIcon} aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="8" y1="8" x2="14" y2="14" />
      <line x1="14" y1="8" x2="8" y2="14" />
    </svg>
  );
}

export default function CatalogSection({ searchQuery }: CatalogSectionProps) {
  const {
    filters,
    results,
    setShelf,
    setCondition,
    setAvailability,
    setSort,
  } = useCatalogFilter(searchQuery);

  // Count per shelf for tab badges
  const shelfCounts = useMemo(() => {
    const counts: Record<string, number> = { Tout: CATALOG.length };
    for (const shelf of ALL_SHELVES) {
      counts[shelf] = CATALOG.filter((i) => i.shelf === shelf).length;
    }
    return counts;
  }, []);

  const handleReset = useCallback(() => {
    setShelf('Tout');
    setCondition('Tous les états');
    setAvailability('all');
    setSort('featured');
  }, [setShelf, setCondition, setAvailability, setSort]);

  const isFiltered =
    filters.shelf !== 'Tout' ||
    filters.condition !== 'Tous les états' ||
    filters.availability !== 'all' ||
    (searchQuery && searchQuery.trim().length > 0);

  return (
    <section className={styles.section} id="catalogue" aria-label="Catalogue produits">
      <div className="container">
        {/* ---- Section Header ---- */}
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitleGroup}>
            <span className={styles.sectionEyebrow}>Notre Stock</span>
            <h2 className={styles.sectionTitle}>Catalogue Complet</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
            <p className={styles.resultCount}>
              <strong>{results.length}</strong> produit{results.length !== 1 ? 's' : ''} trouvé{results.length !== 1 ? 's' : ''}
            </p>
            <select
              className={styles.sortSelect}
              value={filters.sort}
              onChange={(e) => setSort(e.target.value as SortMode)}
              aria-label="Trier les produits"
            >
              <option value="featured">Vedettes d'abord</option>
              <option value="price_asc">Prix croissant</option>
              <option value="price_desc">Prix décroissant</option>
              <option value="newest">Nouveautés</option>
            </select>
          </div>
        </div>

        {/* ---- Filter Toolbar ---- */}
        <div className={styles.toolbar}>
          {/* Row 1 — Shelf / Category tabs */}
          <div className={styles.shelfTabsWrapper} role="tablist" aria-label="Rayon">
            <div className={styles.shelfTabs}>
              {/* "Tout" tab */}
              <button
                role="tab"
                type="button"
                aria-selected={filters.shelf === 'Tout'}
                className={[
                  styles.shelfTab,
                  filters.shelf === 'Tout' ? styles.shelfTabActive : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => setShelf('Tout')}
              >
                Tout
                <span className={styles.tabCount}>{shelfCounts['Tout']}</span>
              </button>

              {ALL_SHELVES.map((shelf) => (
                <button
                  key={shelf}
                  role="tab"
                  type="button"
                  aria-selected={filters.shelf === shelf}
                  className={[
                    styles.shelfTab,
                    filters.shelf === shelf ? styles.shelfTabActive : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => setShelf(shelf as ShelfCategory)}
                >
                  {SHELF_ICONS[shelf]} {shelf}
                  <span className={styles.tabCount}>{shelfCounts[shelf]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Row 2 — Condition + Availability pills */}
          <div className={styles.filterRow} role="group" aria-label="Filtres état et disponibilité">
            <span className={styles.filterLabel}>État :</span>

            <button
              type="button"
              className={[
                styles.filterPill,
                filters.condition === 'Tous les états' ? styles.filterPillActive : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => setCondition('Tous les états')}
              aria-pressed={filters.condition === 'Tous les états'}
            >
              Tous les états
            </button>

            {ALL_CONDITIONS.map((cond) => (
              <button
                key={cond}
                type="button"
                className={[
                  styles.filterPill,
                  filters.condition === cond ? styles.filterPillActive : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => setCondition(cond as ConditionTag)}
                aria-pressed={filters.condition === cond}
              >
                {cond}
              </button>
            ))}

            {/* Divider */}
            <span
              aria-hidden="true"
              style={{
                width: '1px',
                height: '20px',
                background: 'var(--color-border)',
                flexShrink: 0,
              }}
            />

            {/* Availability */}
            <button
              type="button"
              className={[
                styles.filterPill,
                filters.availability === 'in_stock' ? styles.filterPillActive : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() =>
                setAvailability(
                  filters.availability === 'in_stock' ? 'all' : 'in_stock'
                )
              }
              aria-pressed={filters.availability === 'in_stock'}
            >
              🟢 En Stock Bouira
            </button>

            {/* Reset — only visible when any filter is active */}
            {isFiltered && (
              <button
                type="button"
                className={styles.resetBtn}
                onClick={handleReset}
                aria-label="Réinitialiser tous les filtres"
              >
                Réinitialiser
              </button>
            )}
          </div>
        </div>

        {/* ---- Product Grid ---- */}
        <div className={styles.grid} role="list" aria-label="Produits">
          {results.length > 0 ? (
            results.map((item) => (
              <div key={item.id} role="listitem">
                <ProductCard item={item} />
              </div>
            ))
          ) : (
            <div className={styles.emptyState} role="status">
              <SearchXIcon />
              <p className={styles.emptyTitle}>Aucun produit trouvé</p>
              <p className={styles.emptyText}>
                {searchQuery?.trim()
                  ? `Aucun résultat pour « ${searchQuery} ». Essayez avec un autre terme ou réinitialisez les filtres.`
                  : 'Aucun produit ne correspond à vos critères. Modifiez les filtres pour voir plus de résultats.'}
              </p>
              <button
                type="button"
                className={styles.emptyResetBtn}
                onClick={handleReset}
              >
                Voir tout le catalogue
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
