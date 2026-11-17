import { Clock, ExternalLink, MapPin, Phone } from 'lucide-react';
import { STORE_INFO } from '../data/store';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div>
            <div className={styles.brandTitle}>
              PLANET <span>PHONE</span>
            </div>
            <p className={styles.text}>
              {STORE_INFO.tagline}. Tous nos appareils sont contrôlés et accompagnés d’une garantie magasin.
            </p>
            <div className={styles.socials}>
              <a
                href={STORE_INFO.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className={styles.socialBtn}
              >
                <span>Facebook (48K)</span>
                <ExternalLink size={14} />
              </a>
              <a
                href={STORE_INFO.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className={styles.socialBtn}
              >
                <span>Instagram</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          <div>
            <h4 className={styles.colTitle}>Contact & Horaires</h4>
            <div className={styles.infoList}>
              <a href={`tel:${STORE_INFO.phoneDisplay.replace(/\s/g, '')}`} className={styles.infoRow}>
                <Phone size={16} color="#D9232E" />
                <span>{STORE_INFO.phoneDisplay}</span>
              </a>
              <div className={styles.infoRow}>
                <Clock size={16} color="#D9232E" />
                <span>{STORE_INFO.hours}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className={styles.colTitle}>Localisation Magasin</h4>
            <div className={styles.infoList}>
              <div className={styles.infoRow}>
                <MapPin size={16} color="#D9232E" />
                <span>{STORE_INFO.address}</span>
              </div>
            </div>
            <a
              href={STORE_INFO.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.mapsBtn}
            >
              <span>Ouvrir sur Google Maps</span>
              <ExternalLink size={15} />
            </a>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <span>© {new Date().getFullYear()} PLANET PHONE BOUIRA. Tous droits réservés.</span>
          <span>Bazar Dubai • Rue Frères Boussendalah</span>
        </div>
      </div>
    </footer>
  );
}