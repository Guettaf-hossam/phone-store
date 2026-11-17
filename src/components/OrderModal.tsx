import { useState } from 'react';
import { MessageCircle, Store, Truck, X } from 'lucide-react';
import { STORE_INFO } from '../data/store';
import { DeliveryMethod, Product } from '../types';
import { buildWhatsAppUrl, formatDzd } from '../utils/formatting';
import styles from './OrderModal.module.css';

interface OrderModalProps {
  product: Product | null;
  onClose: () => void;
}

const DELIVERY_METHODS: DeliveryMethod[] = [
  'Retrait en magasin (Bazar Dubai, Bouira)',
  'Livraison Express (Bouira & 58 Wilayas)'
];

export function OrderModal({ product, onClose }: OrderModalProps) {
  const [selectedStorage, setSelectedStorage] = useState(product?.storages[0] ?? '');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.name ?? '');
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>(DELIVERY_METHODS[0]);
  const [customerName, setCustomerName] = useState('');
  const [wilaya, setWilaya] = useState('10 - Bouira');

  if (!product) {
    return null;
  }

  const activeStorage = product.storages.includes(selectedStorage)
    ? selectedStorage
    : product.storages[0];

  const activeColor = product.colors.some((c) => c.name === selectedColor)
    ? selectedColor
    : product.colors[0]?.name ?? 'Standard';

  const orderLines = [
    'Salam *PLANET PHONE*, je souhaite commander :',
    `• Modèle : *${product.name}* (${product.condition})`,
    `• Capacité / Option : *${activeStorage}*`,
    `• Couleur : *${activeColor}*`,
    `• Prix affiché : *${formatDzd(product.priceDzd)}*`,
    `• Mode : *${deliveryMethod}*`,
    customerName.trim() ? `• Client : ${customerName.trim()}` : '',
    `• Wilaya : ${wilaya.trim() || '10 - Bouira'}`
  ].filter(Boolean);

  const whatsappHref = buildWhatsAppUrl(
    STORE_INFO.whatsappNumber,
    orderLines.join('\n')
  );

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div>
            <h3 className={styles.title}>{product.name}</h3>
            <span className={styles.meta}>
              {product.condition} • {product.warranty}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={styles.closeBtn}
            aria-label="Fermer"
          >
            <X size={20} />
          </button>
        </div>

        <div className={styles.group}>
          <label className={styles.label}>Capacité / Taille</label>
          <div className={styles.optionsRow}>
            {product.storages.map((storage) => (
              <button
                key={storage}
                type="button"
                onClick={() => setSelectedStorage(storage)}
                className={`${styles.optionBtn} ${
                  activeStorage === storage ? styles.optionBtnActive : ''
                }`}
              >
                {storage}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.group}>
          <label className={styles.label}>Couleur souhaitée</label>
          <div className={styles.optionsRow}>
            {product.colors.map((color) => (
              <button
                key={color.name}
                type="button"
                onClick={() => setSelectedColor(color.name)}
                className={`${styles.optionBtn} ${
                  activeColor === color.name ? styles.optionBtnActive : ''
                }`}
              >
                <span
                  className={styles.colorDot}
                  style={{ backgroundColor: color.hex }}
                />
                <span>{color.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.group}>
          <label className={styles.label}>Mode de récupération</label>
          <div className={styles.deliveryGrid}>
            {DELIVERY_METHODS.map((method) => (
              <button
                key={method}
                type="button"
                onClick={() => setDeliveryMethod(method)}
                className={`${styles.optionBtn} ${
                  deliveryMethod === method ? styles.optionBtnActive : ''
                }`}
              >
                {method.startsWith('Retrait') ? <Store size={16} /> : <Truck size={16} />}
                <span>{method}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.group}>
          <div className={styles.inputRow}>
            <div>
              <label className={styles.label}>Nom (Optionnel)</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Votre nom"
                className={styles.input}
              />
            </div>
            <div>
              <label className={styles.label}>Wilaya</label>
              <input
                type="text"
                value={wilaya}
                onChange={(e) => setWilaya(e.target.value)}
                placeholder="10 - Bouira"
                className={styles.input}
              />
            </div>
          </div>
        </div>

        <div className={styles.summaryBar}>
          <span className={styles.totalLabel}>Total Estimé</span>
          <span className={styles.totalValue}>{formatDzd(product.priceDzd)}</span>
        </div>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className={styles.submitBtn}
        >
          <MessageCircle size={19} />
          <span>Confirmer sur WhatsApp</span>
        </a>
      </div>
    </div>
  );
}