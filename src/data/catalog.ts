// ============================================================
// src/data/catalog.ts
// Planet Phone — Realistic Algerian Market Catalog (12 items)
// Pricing reflects Bouira / DZ market rates (Nov 2026)
// Images: Unsplash hardware photos (reliable, no CDN auth)
// ============================================================

export type ShelfCategory =
  | 'Apple'
  | 'Samsung'
  | 'Redmi'
  | 'Realme'
  | 'Smart Watch'
  | 'Accessoires';

export type ConditionTag = 'Neuf Scellé' | 'Cabas Garanti' | 'Occasion Certifiée';

export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock';

export interface ColorVariant {
  name: string;
  hex: string;
}

export interface StorageVariant {
  storage: string;
  ram?: string;
  priceDA: number;
  stock: StockStatus;
}

export interface CatalogItem {
  id: string;
  shelf: ShelfCategory;
  brand: string;
  model: string;
  /** Short sub-spec displayed below model name */
  specSummary: string;
  condition: ConditionTag;
  /** Display: "10/10", "9/10", "8/10" */
  gradeDisplay: string;
  colors: ColorVariant[];
  storageOptions: StorageVariant[];
  /** Lowest price across variants (for display/sort) */
  basePriceDA: number;
  /** Key selling point shown as tagline */
  tagline: string;
  /** Reliable Unsplash URL — search query locked by photo ID */
  imageUrl: string;
  imageAlt: string;
  isFeatured: boolean;
  hasWarranty: boolean;
  /** Ooredoo / AT / Mobilis compatible */
  network?: string;
  /** e.g. "5G", "4G LTE" */
  connectivity?: string;
}

// ---------------------------------------------------------------------------
// Helper: Unsplash source locked by photo ID → never breaks
// ---------------------------------------------------------------------------
const U = (id: string, w = 600, h = 600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&q=80&auto=format`;

export const CATALOG: CatalogItem[] = [
  // ── APPLE ────────────────────────────────────────────────────────────────
  {
    id: 'apple-iphone-15-pro-max',
    shelf: 'Apple',
    brand: 'Apple',
    model: 'iPhone 15 Pro Max',
    specSummary: '256 Go • 8 Go RAM • A17 Pro • Titane',
    condition: 'Neuf Scellé',
    gradeDisplay: '10/10',
    colors: [
      { name: 'Titane Naturel', hex: '#B5A898' },
      { name: 'Titane Noir',    hex: '#3D3935' },
      { name: 'Titane Blanc',   hex: '#E8E3DA' },
      { name: 'Titane Bleu',    hex: '#4E6E81' },
    ],
    storageOptions: [
      { storage: '256 Go', ram: '8 Go', priceDA: 229_000, stock: 'in_stock' },
      { storage: '512 Go', ram: '8 Go', priceDA: 269_000, stock: 'low_stock' },
      { storage: '1 To',   ram: '8 Go', priceDA: 319_000, stock: 'low_stock' },
    ],
    basePriceDA: 229_000,
    tagline: 'Puce A17 Pro • Zoom optique 5× • Titane aerospace',
    imageUrl: U('1510557880182-3d4d3cba35a5', 600, 600),
    imageAlt: 'iPhone 15 Pro Max — Titane',
    isFeatured: true,
    hasWarranty: true,
    network: 'Ooredoo / AT / Mobilis',
    connectivity: '5G',
  },
  {
    id: 'apple-iphone-14',
    shelf: 'Apple',
    brand: 'Apple',
    model: 'iPhone 14',
    specSummary: '128 Go • 6 Go RAM • A15 Bionic',
    condition: 'Cabas Garanti',
    gradeDisplay: '9/10',
    colors: [
      { name: 'Minuit',    hex: '#1A1A2E' },
      { name: 'Lumière',   hex: '#F9EFD7' },
      { name: 'Bleu',      hex: '#A2C4D0' },
      { name: 'Rouge',     hex: '#B22222' },
    ],
    storageOptions: [
      { storage: '128 Go', ram: '6 Go', priceDA: 115_000, stock: 'in_stock' },
      { storage: '256 Go', ram: '6 Go', priceDA: 139_000, stock: 'in_stock' },
    ],
    basePriceDA: 115_000,
    tagline: 'Double SIM physique • iOS 17 • Puce A15',
    imageUrl: U('1592750652083-0d6f9bfc0e02', 600, 600),
    imageAlt: 'iPhone 14 — Minuit',
    isFeatured: false,
    hasWarranty: true,
    network: 'Ooredoo / AT / Mobilis',
    connectivity: '5G',
  },

  // ── SAMSUNG ──────────────────────────────────────────────────────────────
  {
    id: 'samsung-s24-ultra',
    shelf: 'Samsung',
    brand: 'Samsung',
    model: 'Galaxy S24 Ultra',
    specSummary: '256 Go • 12 Go RAM • 200 MP • S Pen',
    condition: 'Neuf Scellé',
    gradeDisplay: '10/10',
    colors: [
      { name: 'Titanium Gray',  hex: '#828282' },
      { name: 'Titanium Black', hex: '#1C1C1C' },
      { name: 'Titanium Violet',hex: '#5B4D6E' },
    ],
    storageOptions: [
      { storage: '256 Go', ram: '12 Go', priceDA: 215_000, stock: 'in_stock' },
      { storage: '512 Go', ram: '12 Go', priceDA: 249_000, stock: 'low_stock' },
    ],
    basePriceDA: 215_000,
    tagline: 'Galaxy AI • Zoom 100× • S Pen intégré',
    imageUrl: U('1610945415519-efa5f3bf6e88', 600, 600),
    imageAlt: 'Samsung Galaxy S24 Ultra',
    isFeatured: true,
    hasWarranty: true,
    network: 'Ooredoo / AT / Mobilis',
    connectivity: '5G',
  },
  {
    id: 'samsung-a55',
    shelf: 'Samsung',
    brand: 'Samsung',
    model: 'Galaxy A55 5G',
    specSummary: '256 Go • 8 Go RAM • 50 MP OIS',
    condition: 'Neuf Scellé',
    gradeDisplay: '10/10',
    colors: [
      { name: 'Awesome Navy',    hex: '#1D3461' },
      { name: 'Awesome Lilac',   hex: '#C0A8C8' },
      { name: 'Awesome Iceblue', hex: '#B2D3E0' },
    ],
    storageOptions: [
      { storage: '128 Go', ram: '8 Go',  priceDA: 68_000,  stock: 'in_stock' },
      { storage: '256 Go', ram: '8 Go',  priceDA: 79_000,  stock: 'in_stock' },
    ],
    basePriceDA: 68_000,
    tagline: 'AMOLED 120 Hz • 5000 mAh • 5G',
    imageUrl: U('1618366912421-57b56cee6a7d', 600, 600),
    imageAlt: 'Samsung Galaxy A55 5G',
    isFeatured: false,
    hasWarranty: true,
    network: 'Ooredoo / AT / Mobilis',
    connectivity: '5G',
  },

  // ── REDMI ────────────────────────────────────────────────────────────────
  {
    id: 'redmi-note-13-pro-plus',
    shelf: 'Redmi',
    brand: 'Xiaomi / Redmi',
    model: 'Redmi Note 13 Pro+',
    specSummary: '256 Go • 12 Go RAM • 200 MP • 120W',
    condition: 'Neuf Scellé',
    gradeDisplay: '10/10',
    colors: [
      { name: 'Aurora Purple',   hex: '#7B6FA0' },
      { name: 'Midnight Black',  hex: '#1A1A1A' },
      { name: 'Alpine White',    hex: '#F0EEE9' },
    ],
    storageOptions: [
      { storage: '256 Go', ram: '12 Go', priceDA: 62_000, stock: 'in_stock' },
      { storage: '512 Go', ram: '12 Go', priceDA: 75_000, stock: 'low_stock' },
    ],
    basePriceDA: 62_000,
    tagline: '200 MP Leica • HyperCharge 120W • 5G',
    imageUrl: U('1667372335936-9f06e63d5588', 600, 600),
    imageAlt: 'Redmi Note 13 Pro+',
    isFeatured: false,
    hasWarranty: true,
    network: 'Ooredoo / AT / Mobilis',
    connectivity: '5G',
  },
  {
    id: 'redmi-13c',
    shelf: 'Redmi',
    brand: 'Xiaomi / Redmi',
    model: 'Redmi 13C',
    specSummary: '128 Go • 6 Go RAM • 50 MP • 5000 mAh',
    condition: 'Neuf Scellé',
    gradeDisplay: '10/10',
    colors: [
      { name: 'Startrail Black', hex: '#1C1C1C' },
      { name: 'Startrail Silver',hex: '#C0C0C0' },
      { name: 'Clover Green',    hex: '#4E7B5A' },
    ],
    storageOptions: [
      { storage: '128 Go', ram: '6 Go', priceDA: 24_500, stock: 'in_stock' },
      { storage: '256 Go', ram: '8 Go', priceDA: 29_000, stock: 'in_stock' },
    ],
    basePriceDA: 24_500,
    tagline: 'Budget 4G • Grande batterie • Double SIM',
    imageUrl: U('1584438784560-6b0bfa10b1f4', 600, 600),
    imageAlt: 'Redmi 13C',
    isFeatured: false,
    hasWarranty: true,
    network: 'Ooredoo / AT / Mobilis',
    connectivity: '4G LTE',
  },

  // ── REALME ───────────────────────────────────────────────────────────────
  {
    id: 'realme-12-pro-plus',
    shelf: 'Realme',
    brand: 'realme',
    model: 'realme 12 Pro+',
    specSummary: '256 Go • 12 Go RAM • 50 MP Téléobjectif',
    condition: 'Neuf Scellé',
    gradeDisplay: '10/10',
    colors: [
      { name: 'Submarine Blue', hex: '#2C4A7C' },
      { name: 'Navigator Beige',hex: '#C4B5A0' },
    ],
    storageOptions: [
      { storage: '256 Go', ram: '12 Go', priceDA: 58_000, stock: 'in_stock' },
    ],
    basePriceDA: 58_000,
    tagline: 'Hasselblad Portrait • AMOLED 120 Hz • 5G',
    imageUrl: U('1529336953628-6e1b4be88d4b', 600, 600),
    imageAlt: 'realme 12 Pro+',
    isFeatured: false,
    hasWarranty: true,
    network: 'Ooredoo / AT / Mobilis',
    connectivity: '5G',
  },
  {
    id: 'realme-c67',
    shelf: 'Realme',
    brand: 'realme',
    model: 'realme C67',
    specSummary: '128 Go • 6 Go RAM • 108 MP • 5000 mAh',
    condition: 'Neuf Scellé',
    gradeDisplay: '10/10',
    colors: [
      { name: 'Sunny Oasis',   hex: '#D4A843' },
      { name: 'Black Rock',    hex: '#252525' },
      { name: 'Purple Sea',    hex: '#5A3E8A' },
    ],
    storageOptions: [
      { storage: '128 Go', ram: '6 Go', priceDA: 28_000, stock: 'in_stock' },
      { storage: '256 Go', ram: '8 Go', priceDA: 33_500, stock: 'in_stock' },
    ],
    basePriceDA: 28_000,
    tagline: '108 MP • Charge 67W SuperVOOC • Design primé',
    imageUrl: U('1468495244123-6c6c332eeece', 600, 600),
    imageAlt: 'realme C67',
    isFeatured: false,
    hasWarranty: true,
    network: 'Ooredoo / AT / Mobilis',
    connectivity: '4G LTE',
  },

  // ── SMART WATCH ──────────────────────────────────────────────────────────
  {
    id: 'apple-watch-s9-45',
    shelf: 'Smart Watch',
    brand: 'Apple',
    model: 'Apple Watch Series 9',
    specSummary: '45mm • Aluminium • GPS • Always-On',
    condition: 'Neuf Scellé',
    gradeDisplay: '10/10',
    colors: [
      { name: 'Midnight',   hex: '#1C1C1E' },
      { name: 'Starlight',  hex: '#F2EDDF' },
      { name: 'Red',        hex: '#B22222' },
      { name: 'Silver',     hex: '#C0C0C0' },
    ],
    storageOptions: [
      { storage: '45 mm', priceDA: 72_000, stock: 'in_stock' },
      { storage: '41 mm', priceDA: 68_000, stock: 'in_stock' },
    ],
    basePriceDA: 68_000,
    tagline: 'Double Tap • S9 SiP • ECG & SpO2',
    imageUrl: U('1551816230-b2f74e39f0be', 600, 600),
    imageAlt: 'Apple Watch Series 9',
    isFeatured: true,
    hasWarranty: true,
    connectivity: 'GPS + Bluetooth 5.3',
  },
  {
    id: 'samsung-galaxy-watch6',
    shelf: 'Smart Watch',
    brand: 'Samsung',
    model: 'Galaxy Watch 6 Classic',
    specSummary: '47mm • Lunette tournante • Saphir',
    condition: 'Neuf Scellé',
    gradeDisplay: '10/10',
    colors: [
      { name: 'Black',   hex: '#1A1A1A' },
      { name: 'Silver',  hex: '#C0C0C0' },
    ],
    storageOptions: [
      { storage: '47 mm', priceDA: 48_000, stock: 'in_stock' },
      { storage: '43 mm', priceDA: 42_500, stock: 'low_stock' },
    ],
    basePriceDA: 42_500,
    tagline: 'Lunette tournante • BioActive Sensor • Wear OS 4',
    imageUrl: U('1523275335684-37898b6baf30', 600, 600),
    imageAlt: 'Samsung Galaxy Watch 6 Classic',
    isFeatured: false,
    hasWarranty: true,
    connectivity: 'GPS + LTE',
  },

  // ── ACCESSOIRES ──────────────────────────────────────────────────────────
  {
    id: 'airpods-pro-2',
    shelf: 'Accessoires',
    brand: 'Apple',
    model: 'AirPods Pro 2',
    specSummary: 'Réduction de bruit active • USB-C • H2',
    condition: 'Neuf Scellé',
    gradeDisplay: '10/10',
    colors: [
      { name: 'Blanc MagSafe', hex: '#F5F5F0' },
    ],
    storageOptions: [
      { storage: 'USB-C', priceDA: 32_000, stock: 'in_stock' },
    ],
    basePriceDA: 32_000,
    tagline: 'ANC adaptative • Vision Pro spatial audio • H2 chip',
    imageUrl: U('1588423771073-b8903fdc65d2', 600, 600),
    imageAlt: 'AirPods Pro 2 — boîtier USB-C',
    isFeatured: false,
    hasWarranty: true,
  },
  {
    id: 'anker-chargeur-65w',
    shelf: 'Accessoires',
    brand: 'Anker',
    model: 'Chargeur Anker 65W GaN',
    specSummary: '65W GaN • 2× USB-C + USB-A • Universel',
    condition: 'Neuf Scellé',
    gradeDisplay: '10/10',
    colors: [
      { name: 'Noir', hex: '#1A1A1A' },
      { name: 'Blanc', hex: '#F5F5F5' },
    ],
    storageOptions: [
      { storage: '65W GaN', priceDA: 4_500, stock: 'in_stock' },
    ],
    basePriceDA: 4_500,
    tagline: 'Compatible iPhone / Samsung / Xiaomi — charge rapide universelle',
    imageUrl: U('1588345921-37fd2e14da67', 600, 600),
    imageAlt: 'Chargeur Anker 65W GaN',
    isFeatured: false,
    hasWarranty: true,
  },
];

// ── Derived helpers ────────────────────────────────────────────────────────

export const ALL_SHELVES: ShelfCategory[] = [
  'Apple',
  'Samsung',
  'Redmi',
  'Realme',
  'Smart Watch',
  'Accessoires',
];

export const ALL_CONDITIONS: ConditionTag[] = [
  'Neuf Scellé',
  'Cabas Garanti',
  'Occasion Certifiée',
];

export const FEATURED_ITEMS = CATALOG.filter((i) => i.isFeatured);
