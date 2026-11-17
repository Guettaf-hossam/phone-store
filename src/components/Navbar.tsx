import { MapPin, MessageCircle, Search, Smartphone } from 'lucide-react';
import { STORE_INFO } from '../data/store';
import { buildWhatsAppUrl } from '../utils/formatting';
import styles from './Navbar.module.css';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function Navbar({ searchQuery, onSearchChange }: NavbarProps) {
  const directChatUrl = buildWhatsAppUrl(
    STORE_INFO.whatsappNumber,
    'Salam Planet Phone, je souhaite avoir des informations sur un modèle.'
  );

  return (
    <header className={styles.header}>
      <div className={styles.topStrip}>
        <div className={`container ${styles.topStripInner}`}>
          <span className={styles.locationBadge}>
            <MapPin size={13} />
            {STORE_INFO.address}
          </span>
          <span>{STORE_INFO.hours}</span>
        </div>
      </div>

      <div className="container">
        <div className={styles.mainNav}>
          <a href="#" className={styles.brand}>
            <div className={styles.logoBox}>
              <Smartphone size={20} />
            </div>
            <div className={styles.brandText}>
              <span className={styles.brandTitle}>
                PLANET <span>PHONE</span>
              </span>
              <span className={styles.brandSub}>BOUIRA • BAZAR DUBAI</span>
            </div>
          </a>

          <div className={styles.searchWrapper}>
            <Search size={17} className={styles.searchIcon} />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Rechercher iPhone 15, S24 Ultra, Redmi, Watch..."
              className={styles.searchInput}
              aria-label="Rechercher un produit"
            />
          </div>

          <div className={styles.actions}>
            <a
              href={STORE_INFO.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.socialLink}
              aria-label="Instagram Planet Phone"
            >
              IG
            </a>
            <a
              href={STORE_INFO.facebookUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.socialLink}
              aria-label="Facebook Planet Phone"
            >
              FB
            </a>
            <a
              href={directChatUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.whatsappBtn}
            >
              <MessageCircle size={17} />
              <span>{STORE_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}