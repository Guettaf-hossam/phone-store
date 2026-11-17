import { Product, ProductCategory, ProductCondition } from '../types';

export const CATEGORIES: ProductCategory[] = [
  'Tout',
  'Apple',
  'Samsung',
  'Redmi',
  'Realme',
  'Smart Watch',
  'Accessoires'
];

export const CONDITIONS: ('Tous les états' | ProductCondition)[] = [
  'Tous les états',
  'Neuf Scellé',
  'Cabas Garanti',
  'Occasion Certifiée'
];

export const PRODUCTS: Product[] = [
  {
    id: 'iphone-16-pro-max',
    name: 'iPhone 16 Pro Max',
    brand: 'Apple',
    condition: 'Neuf Scellé',
    priceDzd: 298000,
    oldPriceDzd: 310000,
    storages: ['256GB', '512GB', '1TB'],
    colors: [
      { name: 'Titane Désert', hex: '#C5B4A0' },
      { name: 'Titane Noir', hex: '#1E1E1F' },
      { name: 'Titane Naturel', hex: '#9A9892' }
    ],
    specs: 'A18 Pro • Écran 6.9" 120Hz • Caméra 48MP',
    warranty: 'Garantie 12 Mois + Facture',
    inStock: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'iphone-15-pro',
    name: 'iPhone 15 Pro',
    brand: 'Apple',
    condition: 'Cabas Garanti',
    priceDzd: 218000,
    storages: ['128GB', '256GB'],
    colors: [
      { name: 'Titane Bleu', hex: '#2F3B4C' },
      { name: 'Titane Naturel', hex: '#9A9892' }
    ],
    specs: 'Batterie 96% • État 10/10 • Sans boîte',
    warranty: 'Garantie Magasin 3 Mois',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'iphone-13',
    name: 'iPhone 13',
    brand: 'Apple',
    condition: 'Occasion Certifiée',
    priceDzd: 114000,
    oldPriceDzd: 120000,
    storages: ['128GB', '256GB'],
    colors: [
      { name: 'Minuit', hex: '#191F26' },
      { name: 'Lumière Stellaire', hex: '#F3EFEA' }
    ],
    specs: 'Batterie 89% • Pièces d’origine • Testé 30 points',
    warranty: 'Garantie Magasin 45 Jours',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'samsung-s24-ultra',
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    condition: 'Neuf Scellé',
    priceDzd: 234000,
    storages: ['256GB', '512GB'],
    colors: [
      { name: 'Titanium Gray', hex: '#7E7B76' },
      { name: 'Titanium Black', hex: '#222325' }
    ],
    specs: '12GB RAM • Snapdragon 8 Gen 3 • S-Pen inclus',
    warranty: 'Garantie 12 Mois',
    inStock: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'samsung-a55-5g',
    name: 'Samsung Galaxy A55 5G',
    brand: 'Samsung',
    condition: 'Neuf Scellé',
    priceDzd: 68500,
    oldPriceDzd: 72000,
    storages: ['128GB', '256GB'],
    colors: [
      { name: 'Awesome Navy', hex: '#1E293B' },
      { name: 'Awesome Iceblue', hex: '#CBD5E1' }
    ],
    specs: '8GB RAM • Super AMOLED 120Hz • IP67',
    warranty: 'Garantie 12 Mois',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'redmi-note-13-pro-plus',
    name: 'Redmi Note 13 Pro+ 5G',
    brand: 'Redmi',
    condition: 'Neuf Scellé',
    priceDzd: 63500,
    storages: ['256GB', '512GB'],
    colors: [
      { name: 'Midnight Black', hex: '#18181B' },
      { name: 'Moonlight White', hex: '#F1F5F9' }
    ],
    specs: '12GB RAM • Caméra 200MP • Charge 120W incluse',
    warranty: 'Garantie 12 Mois',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'redmi-13c',
    name: 'Xiaomi Redmi 13C',
    brand: 'Redmi',
    condition: 'Neuf Scellé',
    priceDzd: 24500,
    storages: ['128GB', '256GB'],
    colors: [
      { name: 'Clover Green', hex: '#2E5A44' },
      { name: 'Midnight Black', hex: '#18181B' }
    ],
    specs: '8GB RAM • Écran 90Hz • Batterie 5000mAh',
    warranty: 'Garantie 12 Mois',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'realme-12-pro-plus',
    name: 'Realme 12 Pro+ 5G',
    brand: 'Realme',
    condition: 'Neuf Scellé',
    priceDzd: 74500,
    storages: ['256GB', '512GB'],
    colors: [
      { name: 'Submarine Blue', hex: '#1D4ED8' },
      { name: 'Navigator Beige', hex: '#D6C7B2' }
    ],
    specs: '12GB RAM • Zoom Périscope • Finition Cuir Vegan',
    warranty: 'Garantie 12 Mois',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'realme-c67',
    name: 'Realme C67',
    brand: 'Realme',
    condition: 'Neuf Scellé',
    priceDzd: 33500,
    storages: ['128GB', '256GB'],
    colors: [
      { name: 'Sunny Oasis', hex: '#10B981' },
      { name: 'Black Rock', hex: '#1F2937' }
    ],
    specs: '8GB RAM • Snapdragon 685 • Caméra 108MP',
    warranty: 'Garantie 12 Mois',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'apple-watch-s9',
    name: 'Apple Watch Series 9 GPS',
    brand: 'Smart Watch',
    condition: 'Neuf Scellé',
    priceDzd: 76000,
    storages: ['41mm', '45mm'],
    colors: [
      { name: 'Minuit', hex: '#1E293B' },
      { name: 'Lumière Stellaire', hex: '#E2E8F0' }
    ],
    specs: 'Puce S9 • Écran Retina Always-On • Bracelet Sport',
    warranty: 'Garantie 12 Mois',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'galaxy-watch-6',
    name: 'Samsung Galaxy Watch 6',
    brand: 'Smart Watch',
    condition: 'Cabas Garanti',
    priceDzd: 43500,
    storages: ['40mm', '44mm'],
    colors: [
      { name: 'Graphite', hex: '#334155' },
      { name: 'Silver', hex: '#CBD5E1' }
    ],
    specs: 'WearOS • Suivi Santé & Sommeil • Chargeur inclus',
    warranty: 'Garantie Magasin 3 Mois',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pack-charge-rapide',
    name: 'Pack Chargeur Origine 35W + Câble USB-C',
    brand: 'Accessoires',
    condition: 'Neuf Scellé',
    priceDzd: 5800,
    storages: ['USB-C vers USB-C', 'USB-C vers Lightning'],
    colors: [
      { name: 'Blanc', hex: '#FFFFFF' }
    ],
    specs: 'Charge Rapide Certifiée • Protection Surtension',
    warranty: 'Garantie Magasin',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80'
  }
];