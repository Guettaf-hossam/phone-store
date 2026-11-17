import { PRODUCTS } from '../data/products';
import { Product } from '../types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export async function fetchStoreProducts(): Promise<Product[]> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return PRODUCTS;
  }

  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/products?select=*&order=featured.desc,created_at.desc`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`
        }
      }
    );

    if (!response.ok) {
      return PRODUCTS;
    }

    const rows = await response.json();
    if (!Array.isArray(rows) || rows.length === 0) {
      return PRODUCTS;
    }

    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      brand: row.brand,
      condition: row.condition,
      priceDzd: row.price_dzd,
      oldPriceDzd: row.old_price_dzd ?? undefined,
      storages: row.storages,
      colors: row.colors,
      specs: row.specs,
      warranty: row.warranty,
      inStock: row.in_stock,
      featured: row.featured,
      image: row.image
    }));
  } catch {
    return PRODUCTS;
  }
}
