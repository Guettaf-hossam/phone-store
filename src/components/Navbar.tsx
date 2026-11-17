import { MessageCircle, Search, Smartphone } from 'lucide-react';
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
      <nav className={styles.pillNav}>
        <a href="#" className={styles.brand}>
          <span className={styles.mark}>
            <Smartphone size={16} />
          </span>
          <strong className={styles.brandTitle}>
            Planet<span>Phone</span>
          </strong>
        </a>

        <div className={styles.searchWrapper}>
          <Search size={15} className={styles.searchIcon} />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="iPhone 16 Pro, S24 Ultra, Redmi..."
            className={styles.searchInput}
            aria-label="Rechercher un appareil"
          />
        </div>

        <div className={styles.actions}>
          <div className={styles.navLinks}>
            <a href="#catalogue">Catalogue</a>
            <a href="#reprise">Reprise</a>
            <a href="#ooredoo">Ooredoo</a>
          </div>
          <a
            href={directChatUrl}
            target="_blank"
            rel="noreferrer"
            className={styles.ctaPill}
          >
            <MessageCircle size={15} />
            <span>{STORE_INFO.phoneDisplay}</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
