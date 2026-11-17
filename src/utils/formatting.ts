// ============================================================
// src/utils/formatting.ts  (updated — added catalog helpers)
// ============================================================

import type { StockStatus } from '@/data/catalog';

/**
 * Format a price in Algerian Dinar.
 * e.g. 229000 → "229 000 DA"
 */
export function formatDZD(amount: number): string {
  return (
    new Intl.NumberFormat('fr-DZ', {
      style: 'decimal',
      maximumFractionDigits: 0,
    }).format(amount) + ' DA'
  );
}

/**
 * Build a WhatsApp deep-link for ordering a catalog item.
 */
export function buildWhatsAppOrderLink({
  whatsappNumber,
  productName,
  variantLabel,
  priceDA,
}: {
  whatsappNumber: string;
  productName: string;
  variantLabel: string;
  priceDA: number;
}): string {
  const message = encodeURIComponent(
    `Bonjour PLANET PHONE 👋\n\n` +
      `Je suis intéressé(e) par :\n` +
      `📱 *${productName}* — ${variantLabel}\n` +
      `💰 Prix affiché : *${formatDZD(priceDA)}*\n\n` +
      `Pouvez-vous confirmer la disponibilité et le prix actuel ? Merci !`
  );
  return `https://wa.me/${whatsappNumber}?text=${message}`;
}

/**
 * Build a WhatsApp link for a trade-in estimation request.
 */
export function buildTradeInWhatsAppLink(whatsappNumber: string): string {
  const message = encodeURIComponent(
    `Bonjour PLANET PHONE 👋\n\n` +
      `Je souhaite estimer la reprise de mon smartphone actuel.\n` +
      `Pouvez-vous m'indiquer la procédure ? Merci !`
  );
  return `https://wa.me/${whatsappNumber}?text=${message}`;
}

/** Map stock status to French label */
export function getStockLabel(status: StockStatus): string {
  const map: Record<StockStatus, string> = {
    in_stock: 'En stock',
    low_stock: 'Stock limité',
    out_of_stock: 'Épuisé',
  };
  return map[status];
}

/** Map stock status to CSS color token */
export function getStockColor(status: StockStatus): string {
  const map: Record<StockStatus, string> = {
    in_stock: 'var(--color-success)',
    low_stock: 'var(--color-warning)',
    out_of_stock: 'var(--color-ink-faint)',
  };
  return map[status];
}

/** Map condition tag to badge color variant */
export function getConditionBadgeStyle(
  condition: 'Neuf Scellé' | 'Cabas Garanti' | 'Occasion Certifiée'
): { bg: string; color: string } {
  const map = {
    'Neuf Scellé':       { bg: '#D9232E', color: '#fff' },
    'Cabas Garanti':     { bg: '#1e40af', color: '#fff' },
    'Occasion Certifiée':{ bg: '#374151', color: '#fff' },
  };
  return map[condition];
}

/**
 * Slug a string for use in URLs or IDs.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
