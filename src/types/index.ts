// ============================================================
// src/types/index.ts
// Core domain types for Planet Phone e-commerce storefront
// ============================================================

export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock' | 'coming_soon';

export type ProductCondition = 'new_sealed' | 'cabas' | 'reconditioned';

export type ProductCategory =
  | 'smartphone'
  | 'smartwatch'
  | 'accessories'
  | 'tablet'
  | 'audio';

export type Brand =
  | 'Apple'
  | 'Samsung'
  | 'Xiaomi'
  | 'Huawei'
  | 'OPPO'
  | 'OnePlus'
  | 'realme'
  | 'Tecno'
  | 'Infinix'
  | 'Other';

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductImage {
  url: string;
  alt: string;
  isPrimary?: boolean;
}

export interface ProductVariant {
  id: string;
  storage: string;
  ram?: string;
  colorName: string;
  colorHex: string;
  priceDA: number;
  stock: StockStatus;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: Brand;
  model: string;
  category: ProductCategory;
  condition: ProductCondition;
  images: ProductImage[];
  specs: ProductSpec[];
  variants: ProductVariant[];
  /** Base display price (lowest variant) */
  basePriceDA: number;
  stock: StockStatus;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  /** Short marketing tagline */
  tagline?: string;
  tags: string[];
  createdAt: string;
}

export interface StoreInfo {
  name: string;
  tagline: string;
  address: {
    street: string;
    district: string;
    city: string;
    wilaya: string;
  };
  phone: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
  workingHours: string;
}

export interface SearchState {
  query: string;
  activeCategory: ProductCategory | 'all';
  activeBrand: Brand | 'all';
  sortBy: 'price_asc' | 'price_desc' | 'newest' | 'featured';
  priceRange: [number, number];
}

export interface WhatsAppOrder {
  product: Product;
  variant: ProductVariant;
  customerName?: string;
  message: string;
}
