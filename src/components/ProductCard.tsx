import { ArrowUpRight, Box, ShieldCheck, Smartphone } from 'lucide-react';
import { useState } from 'react';
import { Product } from '@/types';
import { formatDzd } from '@/utils/formatting';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
}

export function ProductCard({ product, onSelectProduct }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  return (
    <button type="button" onClick={() => onSelectProduct(product)} className="card group flex min-h-[500px] w-full flex-col overflow-hidden text-left transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(12,12,13,.12)]">
      <div className="relative m-2 h-64 overflow-hidden rounded-[26px] bg-[#d7d7dc]">
        {!imageError ? (
          <img src={product.image} alt={product.name} loading="lazy" onError={() => setImageError(true)} className="size-full object-cover grayscale-[18%] transition duration-700 group-hover:scale-[1.04] group-hover:grayscale-0" />
        ) : (
          <span className="flex size-full flex-col items-center justify-center gap-3 text-muted"><Smartphone size={42} /><span className="font-mono text-xs">{product.brand}</span></span>
        )}
        <span className="absolute left-3 top-3 rounded-full border border-white/70 bg-white/75 px-3 py-2 font-mono text-[9px] uppercase backdrop-blur-md">{product.condition}</span>
        <span className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-ink text-white transition-transform duration-300 group-hover:rotate-45"><ArrowUpRight size={16} /></span>
      </div>
      <div className="flex flex-1 flex-col p-6 pt-4">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[.12em] text-muted">
          <span>{product.brand}</span>
          <span className="inline-flex items-center gap-1.5">
            <i className={`size-1.5 rounded-full ${product.inStock ? 'bg-emerald-600' : 'bg-zinc-400'}`} />
            {product.inStock ? 'En stock · Bouira' : 'Sur commande'}
          </span>
        </div>
        <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-[-.045em]">{product.name}</h3>
        <p className="mt-2 text-sm leading-6 text-muted">{product.specs}</p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {product.storages.map((storage) => (
              <span key={storage} className="rounded-full border border-line bg-white/65 px-2.5 py-1 font-mono text-[10px]">
                {storage}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1" aria-label="Couleurs disponibles">
            {product.colors.map((color) => (
              <span
                key={color.name}
                title={color.name}
                className="size-3.5 rounded-full border border-black/15 shadow-2xs"
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
        </div>
        <div className="mt-auto flex items-end justify-between border-t border-black/8 pt-5">
          <div>
            <span className="flex items-center gap-1.5 text-[11px] text-muted">
              <ShieldCheck size={13} className="text-[#d9232e]" />
              {product.warranty}
            </span>
            <div className="mt-1 flex items-baseline gap-2 tabular-nums">
              <strong className="text-xl font-semibold tracking-[-.04em]">{formatDzd(product.priceDzd)}</strong>
              {product.oldPriceDzd && (
                <span className="text-xs text-muted line-through">{formatDzd(product.oldPriceDzd)}</span>
              )}
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/6 px-3 py-1.5 text-[11px] font-medium text-ink transition group-hover:bg-ink group-hover:text-white">
            <Box size={13} />
            Configurer
          </span>
        </div>
      </div>
    </button>
  );
}
