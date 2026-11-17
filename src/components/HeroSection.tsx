// ============================================================
// src/components/HeroSection.tsx
// ============================================================

import { FEATURED_PRODUCTS } from '@/data/products';
import { STORE_INFO } from '@/data/store';
import { formatDZD, buildWhatsAppOrderLink, buildTradeInWhatsAppLink } from '@/utils/formatting';
import styles from './HeroSection.module.css';

// ---- Icon Components ----

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function RefreshCwIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
    </svg>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function WhatsAppSmallIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function SmartphonePlaceholderIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="5" y="2" width="14" height="20" rx="3" ry="3" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  );
}

// ---- Flagship spec rows to display on hero card ----
const HERO_SPEC_KEYS = ['Puce', 'RAM', 'Caméra', 'Batterie'];

// ---- Component ----

export default function HeroSection() {
  const flagship = FEATURED_PRODUCTS[0]; // iPhone 15 Pro Max

  const whatsappOrderHref = flagship
    ? buildWhatsAppOrderLink({
        whatsappNumber: STORE_INFO.whatsapp,
        productName: flagship.name,
        variantLabel: `${flagship.variants[0].storage} — ${flagship.variants[0].colorName}`,
        priceDA: flagship.basePriceDA,
      })
    : '#';

  const tradeInHref = buildTradeInWhatsAppLink(STORE_INFO.whatsapp);

  const heroSpecs = flagship
    ? flagship.specs.filter((s) => HERO_SPEC_KEYS.includes(s.label)).slice(0, 4)
    : [];

  return (
    <section className={styles.hero} aria-label="Présentation de la boutique">
      <div className={`container ${styles.inner}`}>
        {/* ---- Left: Copywriting ---- */}
        <div className={styles.copy}>
          <span className={styles.eyebrow} aria-hidden="true">
            <span className={styles.eyebrowDot} />
            Bouira • Bazar Dubai
          </span>

          <h1 className={styles.headline}>
            Votre Référence{' '}
            <span className={styles.headlineAccent}>Smartphone</span>
            {' '}& Mobile<br />à Bouira
          </h1>

          <p className={styles.subheadline}>
            Smartphones neufs scellés, cabas garantis, Smart Watches & accessoires.
            Services Ooredoo officiels — livraison en wilaya disponible.
          </p>

          <div className={styles.subheadlinePills} aria-label="Garanties">
            <span className={styles.pill}>
              <span className={styles.pillIcon}>✓</span> Neuf Scellé
            </span>
            <span className={styles.pill}>
              <span className={styles.pillIcon}>✓</span> Cabas Garanti
            </span>
            <span className={styles.pill}>
              <span className={styles.pillIcon}>✓</span> Smart Watches
            </span>
            <span className={styles.pill}>
              <span className={styles.pillIcon}>✓</span> Services Ooredoo
            </span>
          </div>

          <div className={styles.ctaRow}>
            <a
              href="#catalogue"
              className={styles.btnPrimary}
              aria-label="Explorer le catalogue de smartphones"
            >
              Explorer le Catalogue
              <ArrowRightIcon className={styles.btnPrimaryIcon} />
            </a>
            <a
              href={tradeInHref}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnSecondary}
              aria-label="Estimer la reprise de votre téléphone via WhatsApp"
            >
              <RefreshCwIcon className={styles.btnPrimaryIcon} />
              Estimer une Reprise
            </a>
          </div>

          <address className={styles.addressNote} aria-label="Adresse de la boutique">
            <MapPinIcon className={styles.addressNoteIcon} />
            <span>
              <strong>Rue Frères Boussendalah</strong> — Bazar Dubai, La Cité Ouest, Bouira
              &nbsp;·&nbsp; Lun–Sam : 09h–20h
            </span>
          </address>
        </div>

        {/* ---- Right: Flagship Showcase Card ---- */}
        {flagship && (
          <div className={styles.showcaseCol}>
            <article className={styles.card} aria-label={`Produit vedette : ${flagship.name}`}>
              {/* Badge Row */}
              <div className={styles.cardBadgeRow}>
                <span className={styles.badgeFeatured}>Produit Vedette</span>
                <span className={styles.badgeStock}>En Stock</span>
              </div>

              {/* Product Image */}
              <div className={styles.cardImageWrapper}>
                {flagship.images[0]?.url ? (
                  <img
                    src={flagship.images[0].url}
                    alt={flagship.images[0].alt}
                    className={styles.cardImage}
                    loading="eager"
                    decoding="async"
                  />
                ) : (
                  <div className={styles.cardImagePlaceholder}>
                    <SmartphonePlaceholderIcon className={styles.cardImagePlaceholderIcon} />
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className={styles.cardBody}>
                <p className={styles.cardBrand}>{flagship.brand}</p>
                <h2 className={styles.cardName}>{flagship.name}</h2>
                {flagship.tagline && (
                  <p className={styles.cardTagline}>{flagship.tagline}</p>
                )}

                {/* Spec Grid */}
                {heroSpecs.length > 0 && (
                  <dl className={styles.cardSpecGrid}>
                    {heroSpecs.map((spec) => (
                      <div key={spec.label} className={styles.cardSpecItem}>
                        <dt className={styles.cardSpecLabel}>{spec.label}</dt>
                        <dd className={styles.cardSpecValue}>{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}

                {/* Price + Order */}
                <div className={styles.cardFooter}>
                  <div className={styles.cardPrice}>
                    <span className={styles.cardPriceLabel}>À partir de</span>
                    <span className={styles.cardPriceValue}>
                      {formatDZD(flagship.basePriceDA)}
                    </span>
                  </div>
                  <a
                    href={whatsappOrderHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.cardOrderBtn}
                    aria-label={`Commander ${flagship.name} via WhatsApp`}
                  >
                    <WhatsAppSmallIcon className={styles.cardOrderBtnIcon} />
                    Commander
                  </a>
                </div>
              </div>
            </article>
          </div>
        )}
      </div>
    </section>
  );
}
