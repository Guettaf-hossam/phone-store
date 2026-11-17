// ============================================================
// src/components/ProductCard.tsx
// ============================================================

import { useState, useCallback } from 'react';
import type { CatalogItem } from '@/data/catalog';
import { STORE_INFO } from '@/data/store';
import { formatDZD, buildWhatsAppOrderLink, getConditionBadgeStyle } from '@/utils/formatting';
import OrderModal from './OrderModal';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  item: CatalogItem;
}

// ---- Icon Components ----

function ShoppingBagIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

function SmartphoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="2" width="14" height="20" rx="3" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  );
}

// ---- Stock helpers ----

function stockDotColor(status: 'in_stock' | 'low_stock' | 'out_of_stock'): string {
  if (status === 'in_stock') return '#16a34a';
  if (status === 'low_stock') return '#d97706';
  return '#94a3b8';
}

function stockText(status: 'in_stock' | 'low_stock' | 'out_of_stock'): string {
  if (status === 'in_stock') return 'En stock';
  if (status === 'low_stock') return 'Stock limité';
  return 'Épuisé';
}

// ---- Component ----

export default function ProductCard({ item }: ProductCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  const conditionStyle = getConditionBadgeStyle(item.condition);
  const primaryVariant = item.storageOptions[0];
  const displayedColors = item.colors.slice(0, 4);
  const extraColors = item.colors.length > 4 ? item.colors.length - 4 : 0;

  // Best stock status across all variants
  const overallStock = item.storageOptions.reduce<'in_stock' | 'low_stock' | 'out_of_stock'>(
    (best, v) => {
      if (v.stock === 'in_stock') return 'in_stock';
      if (best === 'out_of_stock' && v.stock === 'low_stock') return 'low_stock';
      return best;
    },
    'out_of_stock'
  );

  // Quick WhatsApp link (default to first available variant)
  const quickWaHref = buildWhatsAppOrderLink({
    whatsappNumber: STORE_INFO.whatsapp,
    productName: `${item.brand} ${item.model}`,
    variantLabel: `${primaryVariant.storage}${primaryVariant.ram ? ` • ${primaryVariant.ram} RAM` : ''}`,
    priceDA: item.basePriceDA,
  });

  return (
    <>
      <article className={styles.card} aria-label={`${item.brand} ${item.model}`}>
        {/* ---- Image Pane ---- */}
        <div className={styles.imagePane}>
          {/* Condition + Warranty badges */}
          <div className={styles.badgeRow}>
            <span
              className={styles.conditionBadge}
              style={{ backgroundColor: conditionStyle.bg, color: conditionStyle.color }}
            >
              {item.condition}
            </span>
            {item.hasWarranty && (
              <span className={styles.warrantyBadge}>
                <ShieldCheckIcon />
                Garantie Magasin
              </span>
            )}
          </div>

          {/* Featured star */}
          {item.isFeatured && (
            <div className={styles.featuredPin} title="Produit vedette" aria-label="Produit vedette">
              ★
            </div>
          )}

          {/* Product image */}
          {!imgError && item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt={item.imageAlt}
              className={styles.productImage}
              loading="lazy"
              decoding="async"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className={styles.imagePlaceholder} aria-hidden="true">
              <SmartphoneIcon />
              <span style={{ fontSize: '11px' }}>{item.model}</span>
            </div>
          )}
        </div>

        {/* ---- Body ---- */}
        <div className={styles.body}>
          <p className={styles.brandLabel}>{item.brand}</p>
          <h3 className={styles.modelName}>{item.model}</h3>
          <p className={styles.specSummary}>
            {item.specSummary}
            {item.gradeDisplay !== '10/10' && (
              <> &nbsp;·&nbsp; État {item.gradeDisplay}</>
            )}
          </p>

          {/* Color swatch row */}
          {item.colors.length > 0 && (
            <div className={styles.colorRow} aria-label="Couleurs disponibles">
              {displayedColors.map((c) => (
                <span
                  key={c.name}
                  className={styles.colorDot}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                  aria-label={c.name}
                />
              ))}
              {extraColors > 0 && (
                <span className={styles.moreColors}>+{extraColors}</span>
              )}
            </div>
          )}

          {/* Stock indicator */}
          <div className={styles.stockRow} role="status" aria-live="polite">
            <span
              className={styles.stockDot}
              style={{ backgroundColor: stockDotColor(overallStock) }}
            />
            <span
              className={styles.stockLabel}
              style={{ color: stockDotColor(overallStock) }}
            >
              {stockText(overallStock)}
            </span>
            {item.connectivity && (
              <span
                style={{
                  marginLeft: 'auto',
                  fontSize: '10.5px',
                  fontWeight: 700,
                  padding: '2px 6px',
                  borderRadius: '4px',
                  background: 'var(--color-bg-secondary)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-ink-muted)',
                }}
              >
                {item.connectivity}
              </span>
            )}
          </div>
        </div>

        {/* ---- Footer ---- */}
        <div className={styles.footer}>
          <div className={styles.priceRow}>
            <div className={styles.priceBlock}>
              <span className={styles.priceFrom}>
                {item.storageOptions.length > 1 ? 'À partir de' : 'Prix'}
              </span>
              <span className={styles.priceValue}>{formatDZD(item.basePriceDA)}</span>
            </div>
          </div>

          <div className={styles.ctaRow}>
            <button
              type="button"
              className={styles.btnDetails}
              onClick={openModal}
              aria-label={`Détails et commander ${item.model}`}
            >
              <ShoppingBagIcon />
              Détails &amp; Commander
            </button>
            <a
              href={quickWaHref}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnWa}
              aria-label={`Commander ${item.model} directement via WhatsApp`}
              title="Commande rapide WhatsApp"
            >
              <WhatsAppIcon />
            </a>
          </div>
        </div>
      </article>

      {/* Order Modal */}
      {modalOpen && <OrderModal item={item} onClose={closeModal} />}
    </>
  );
}
