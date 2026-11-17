import { RefreshCw, ShieldCheck, Truck } from 'lucide-react';
import { Product } from '../types';
import { formatDzd } from '../utils/formatting';
import styles from './HeroSection.module.css';

interface HeroSectionProps {
  featuredProduct: Product;
  onOrderProduct: (product: Product) => void;
}

export function HeroSection({ featuredProduct, onOrderProduct }: HeroSectionProps) {
  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.grid}>
          <div>
            <div className={styles.eyebrow}>
              <span>BOUIRA • BAZAR DUBAI (LA CITÉ OUEST)</span>
            </div>
            <h1 className={styles.title}>
              Votre Référence Smartphone & Mobile à Bouira
            </h1>
            <p className={styles.subtitle}>
              Neuf Scellé, Cabas Garanti, Smart Watches, Accessoires et Services Officiels Ooredoo avec facture et garantie magasin.
            </p>
            <div className={styles.ctaGroup}>
              <a href="#catalogue" className={styles.primaryBtn}>
                Explorer le Catalogue
              </a>
              <a href="#reprise" className={styles.secondaryBtn}>
                <RefreshCw size={16} />
                <span>Estimer une Reprise</span>
              </a>
            </div>
            <div className={styles.trustRow}>
              <span className={styles.trustItem}>
                <ShieldCheck size={16} color="#D9232E" />
                Garantie Magasin Certifiée
              </span>
              <span className={styles.trustItem}>
                <Truck size={16} color="#D9232E" />
                Retrait sur place & Livraison
              </span>
            </div>
          </div>

          <div className={styles.featuredCard}>
            <div className={styles.featuredTop}>
              <span className={styles.featuredBadge}>Arrivage Phare</span>
              <span className={styles.featuredCondition}>{featuredProduct.condition}</span>
            </div>
            <div className={styles.featuredBody}>
              <img
                src={featuredProduct.image}
                alt={featuredProduct.name}
                className={styles.featuredImage}
              />
              <div>
                <h2 className={styles.featuredName}>{featuredProduct.name}</h2>
                <p className={styles.featuredSpecs}>{featuredProduct.specs}</p>
                <span className={styles.featuredCondition}>{featuredProduct.warranty}</span>
              </div>
            </div>
            <div className={styles.featuredFooter}>
              <span className={styles.featuredPrice}>
                {formatDzd(featuredProduct.priceDzd)}
              </span>
              <button
                type="button"
                className={styles.featuredOrderBtn}
                onClick={() => onOrderProduct(featuredProduct)}
              >
                Commander
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}