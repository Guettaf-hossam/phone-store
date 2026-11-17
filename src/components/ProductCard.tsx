import { useState } from 'react';
import { MessageCircle, Smartphone } from 'lucide-react';
import { STORE_INFO } from '../data/store';
import { Product } from '../types';
import { buildWhatsAppUrl, formatDzd } from '../utils/formatting';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
}

export function ProductCard({ product, onSelectProduct }: ProductCardProps) {
  const [imgError, setImgError] = useState(false);

  const quickMessage = `Salam Planet Phone, le modèle *${product.name}* (${product.condition}) affiché à *${formatDzd(product.priceDzd)}* est-il disponible en magasin ?`;
  const quickWaUrl = buildWhatsAppUrl(STORE_INFO.whatsappNumber, quickMessage);

  return (
    <article className={styles.card}>
      <div className={styles.imageBox}>
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            className={styles.image}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={styles.fallbackBox}>
            <Smartphone size={32} />
            <span>{product.brand}</span>
          </div>
        )}
        <span
          className={`${styles.conditionTag} ${
            product.condition === 'Neuf Scellé' ? styles.conditionTagNew : ''
          }`}
        >
          {product.condition}
        </span>
        <span className={styles.brandTag}>{product.brand}</span>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{product.name}</h3>
        <p className={styles.specs}>{product.specs}</p>

        <div className={styles.storagesRow}>
          {product.storages.map((storage) => (
            <span key={storage} className={styles.storagePill}>
              {storage}
            </span>
          ))}
        </div>

        <div className={styles.warranty}>{product.warranty}</div>

        <div className={styles.footer}>
          <div className={styles.priceBlock}>
            {product.oldPriceDzd && (
              <span className={styles.oldPrice}>{formatDzd(product.oldPriceDzd)}</span>
            )}
            <span className={styles.price}>{formatDzd(product.priceDzd)}</span>
          </div>

          <div className={styles.btnGroup}>
            <a
              href={quickWaUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.quickWaBtn}
              aria-label={`Demander ${product.name} sur WhatsApp`}
              title="Disponibilité WhatsApp"
            >
              <MessageCircle size={18} />
            </a>
            <button
              type="button"
              className={styles.orderBtn}
              onClick={() => onSelectProduct(product)}
            >
              Commander
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}