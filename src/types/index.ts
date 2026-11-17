export type ProductCategory =
  | 'Tout'
  | 'Apple'
  | 'Samsung'
  | 'Redmi'
  | 'Realme'
  | 'Smart Watch'
  | 'Accessoires';

export type ProductCondition =
  | 'Neuf Scellé'
  | 'Cabas Garanti'
  | 'Occasion Certifiée';

export type DeliveryMethod =
  | 'Retrait Bazar Dubai, Bouira'
  | 'Livraison 58 Wilayas';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  brand: Exclude<ProductCategory, 'Tout'>;
  condition: ProductCondition;
  priceDzd: number;
  oldPriceDzd?: number;
  storages: string[];
  colors: ProductColor[];
  specs: string;
  warranty: string;
  inStock: boolean;
  featured?: boolean;
  image: string;
}

export interface StoreInfo {
  name: string;
  arabicName: string;
  tagline: string;
  phoneDisplay: string;
  whatsappNumber: string;
  address: string;
  mapsUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  hours: string;
}
