// ============================================================
// src/components/OrderModal.tsx
// Full-screen slide-up sheet to pick variant + order via WA
// ============================================================

import { useState, useEffect, useCallback } from 'react';
import type { CatalogItem, StorageVariant, ColorVariant } from '@/data/catalog';
import { STORE_INFO } from '@/data/store';
import { formatDZD, buildWhatsAppOrderLink } from '@/utils/formatting';
import styles from './OrderModal.module.css';

interface OrderModalProps {
  item: CatalogItem;
  onClose: () => void;
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.5 10.84a19.79 19.79 0 01-3.07-8.67A2 2 0 012.4 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" />
    </svg>
  );
}

function XMarkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export default function OrderModal({ item, onClose }: OrderModalProps) {
  const availableVariants = item.storageOptions.filter((v) => v.stock !== 'out_of_stock');
  const [selectedVariant, setSelectedVariant] = useState<StorageVariant>(
    availableVariants[0] ?? item.storageOptions[0]
  );
  const [selectedColor, setSelectedColor] = useState<ColorVariant>(item.colors[0]);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  const variantLabel = `${selectedVariant.storage}${selectedVariant.ram ? ` • ${selectedVariant.ram} RAM` : ''} — ${selectedColor.name}`;

  const whatsappHref = buildWhatsAppOrderLink({
    whatsappNumber: STORE_INFO.whatsapp,
    productName: `${item.brand} ${item.model}`,
    variantLabel,
    priceDA: selectedVariant.priceDA,
  });

  const callHref = `tel:${STORE_INFO.phone.replace(/\s/g, '')}`;

  return (
    <div
      className={styles.overlay}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={`Commander ${item.brand} ${item.model}`}
    >
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <div className={styles.headerTitle}>Passer commande</div>
            <div className={styles.headerSub}>Choisissez vos options ci-dessous</div>
          </div>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Fermer"
            type="button"
          >
            <XMarkIcon />
          </button>
        </div>

        <div className={styles.body}>
          {/* Product strip */}
          <div className={styles.productStrip}>
            <img
              src={item.imageUrl}
              alt={item.imageAlt}
              className={styles.productStripImage}
              loading="lazy"
            />
            <div className={styles.productStripInfo}>
              <div className={styles.productStripBrand}>{item.brand}</div>
              <div className={styles.productStripName}>{item.model}</div>
              <div className={styles.productStripPrice}>
                {formatDZD(selectedVariant.priceDA)}
              </div>
            </div>
          </div>

          {/* Storage selector */}
          {item.storageOptions.length > 1 && (
            <div>
              <div className={styles.sectionLabel}>Capacité / Taille</div>
              <div className={styles.storageGrid}>
                {item.storageOptions.map((v) => {
                  const isActive = v.storage === selectedVariant.storage;
                  const isOut = v.stock === 'out_of_stock';
                  return (
                    <button
                      key={v.storage}
                      type="button"
                      disabled={isOut}
                      onClick={() => !isOut && setSelectedVariant(v)}
                      className={[
                        styles.storageBtn,
                        isActive ? styles.storageBtnActive : '',
                        isOut ? styles.storageBtnOutOfStock : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      aria-pressed={isActive}
                      aria-label={`${v.storage}${v.ram ? ` ${v.ram} RAM` : ''} — ${formatDZD(v.priceDA)}${isOut ? ' (épuisé)' : ''}`}
                    >
                      {v.storage}
                      {v.ram ? ` / ${v.ram}` : ''}
                      <span className={styles.storageBtnPrice}>
                        {formatDZD(v.priceDA)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Color selector */}
          {item.colors.length > 1 && (
            <div>
              <div className={styles.sectionLabel}>
                Couleur —{' '}
                <span style={{ color: 'var(--color-ink-primary)', textTransform: 'none', fontWeight: 600 }}>
                  {selectedColor.name}
                </span>
              </div>
              <div className={styles.colorGrid}>
                {item.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedColor(c)}
                    aria-label={c.name}
                    aria-pressed={c.name === selectedColor.name}
                    className={[
                      styles.colorSwatch,
                      c.name === selectedColor.name ? styles.colorSwatchActive : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* CTA Actions */}
          <div className={styles.actions}>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnWhatsApp}
            >
              <WhatsAppIcon />
              Commander via WhatsApp
            </a>
            <a
              href={callHref}
              className={styles.btnCall}
            >
              <PhoneIcon />
              Appeler le magasin — {STORE_INFO.phone}
            </a>
            <p className={styles.note}>
              Prix confirmé à la commande · Livraison wilaya disponible
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
