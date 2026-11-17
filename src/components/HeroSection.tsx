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
        <div className={styles.headline}>
          <div className={styles.kicker}>
            <span className={styles.kickerDot} />
            <span>Bazar Dubai • La Cité Ouest, Bouira</span>
          </div>
          <h1 className={styles.title}>
            Smartphones Certifiés.
            <br />
            Disponibles à Bouira.
          </h1>
          <p className={styles.subtitle}>
            Neuf Scellé, Cabas contrôlé, Smart Watches et services officiels Ooredoo avec garantie magasin.
          </p>
          <div className={styles.ctaGroup}>
            <a href="#catalogue" className={styles.primaryBtn}>
              Voir le catalogue
            </a>
            <a href="#reprise" className={styles.secondaryBtn}>
              <RefreshCw size={15} />
              <span>Estimer une reprise</span>
            </a>
          </div>
        </div>

        <div className={styles.stage}>
          <div className={styles.floatingChips}>
            <div className={styles.chip}>
              <ShieldCheck size={15} color="#D9232E" />
              <span>Garantie Magasin & Facture</span>
            </div>
            <div className={styles.chip}>
              <Truck size={15} color="#D9232E" />
              <span>Retrait sur place & 58 Wilayas</span>
            </div>
          </div>

          <div className={styles.phoneFrame}>
            <div className={styles.island} />
            <div className={styles.phoneHeader}>
              <span>ARRIVAGE DU JOUR</span>
              <span className={styles.phoneBadge}>{featuredProduct.condition}</span>
            </div>
            <div className={styles.phoneImageWrap}>
              <img
                src={featuredProduct.image}
                alt={featuredProduct.name}
                className={styles.phoneImage}
              />
            </div>
            <h2 className={styles.phoneTitle}>{featuredProduct.name}</h2>
            <p className={styles.phoneSpecs}>{featuredProduct.specs}</p>
            <div className={styles.phoneBottom}>
              <span className={styles.phonePrice}>
                {formatDzd(featuredProduct.priceDzd)}
              </span>
              <button
                type="button"
                className={styles.phoneBtn}
                onClick={() => onOrderProduct(featuredProduct)}
              >
                Commander
              </button>
            </div>
          </div>

          <div className={styles.statusPill}>
            <span className={styles.statusDot} />
            <span>+48 000 clients nous suivent à Bouira</span>
          </div>
        </div>
      </div>
    </section>
  );
}
