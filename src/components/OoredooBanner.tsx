import { Check, CreditCard, Wifi } from 'lucide-react';
import styles from './OoredooBanner.module.css';

export function OoredooBanner() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.banner}>
          <div>
            <div className={styles.titleRow}>
              <span className={styles.ooredooPill}>OOREDOO</span>
              <h3 className={styles.title}>Point de Vente & Services Mobiles en Magasin</h3>
            </div>
            <div className={styles.servicesList}>
              <span className={styles.serviceItem}>
                <Check size={15} color="#D9232E" />
                Puces & Activation immédiate
              </span>
              <span className={styles.serviceItem}>
                <CreditCard size={15} color="#D9232E" />
                Recharges Express & Forfaits
              </span>
              <span className={styles.serviceItem}>
                <Wifi size={15} color="#D9232E" />
                Modems & Box 4G
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}