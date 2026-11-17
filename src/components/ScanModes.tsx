import { useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { ProductCategory, ProductCondition } from '@/types';
import { PixelIcon } from './PixelIcon';

interface ScanModesProps {
  onSelectConditionFilter?: (condition: ProductCondition) => void;
  onSelectBrandFilter?: (brand: ProductCategory) => void;
}

const modes: Record<ProductCondition, { intro: string; points: string[]; warranty: string; accessories: string }> = {
  'Neuf Scellé': {
    intro: 'Emballage intact et configuration jamais activée.',
    points: ['Scellés et référence vérifiés', 'IMEI contrôlé avant remise', 'Activation accompagnée'],
    warranty: 'Jusqu’à 12 mois',
    accessories: 'Pack constructeur complet',
  },
  'Cabas Garanti': {
    intro: 'Appareil importé, contrôlé et couvert par le magasin.',
    points: ['Test écran, réseau et capteurs', 'État esthétique documenté', 'Batterie et charge vérifiées'],
    warranty: '3 mois magasin',
    accessories: 'Chargeur selon arrivage',
  },
  'Occasion Certifiée': {
    intro: 'Une seconde vie, après diagnostic technique approfondi.',
    points: ['Contrôle fonctionnel 30 points', 'Santé batterie communiquée', 'Pièces et réparations vérifiées'],
    warranty: '45 jours magasin',
    accessories: 'Câble de charge inclus',
  },
};

const brands: ProductCategory[] = ['Apple', 'Samsung', 'Redmi', 'Realme', 'Smart Watch'];
const modeKeys = Object.keys(modes) as ProductCondition[];

export function ScanModes({ onSelectConditionFilter, onSelectBrandFilter }: ScanModesProps) {
  const [active, setActive] = useState<ProductCondition>('Neuf Scellé');
  const detail = modes[active];
  const activeIndex = modeKeys.indexOf(active);

  return (
    <section id="garantie" className="border-y border-line bg-[#f8f8f9] py-24 text-[#0c0c0d] md:py-32">
      <div className="container-shell">
        <span className="font-mono text-[10px] uppercase tracking-[.18em] text-muted">Diagnostic / États</span>
        <div className="mt-5 grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <h2 className="text-5xl font-semibold leading-[.94] tracking-[-.06em] text-[#0c0c0d] md:text-7xl">
              Choisissez votre niveau de contrôle.
            </h2>
            <div className="mt-10 flex flex-col gap-2.5" role="tablist" aria-label="États des appareils">
              {modeKeys.map((mode, index) => (
                <button
                  key={mode}
                  type="button"
                  role="tab"
                  aria-selected={active === mode}
                  onClick={() => setActive(mode)}
                  className={`flex min-h-16 items-center justify-between rounded-2xl px-5 text-left transition ${
                    active === mode
                      ? 'border-2 border-[#d9232e] bg-white text-[#0c0c0d] shadow-[0_8px_24px_rgba(0,0,0,0.06)]'
                      : 'border border-line bg-white/60 text-muted hover:border-ink/30 hover:bg-white'
                  }`}
                >
                  <span className="text-sm font-semibold text-[#0c0c0d]">{mode}</span>
                  <span className="font-mono text-[10px] text-muted">0{index + 1}</span>
                </button>
              ))}
            </div>
          </div>
          <div key={active} className="reveal rounded-[32px] border border-line bg-white p-7 shadow-[0_16px_40px_rgba(0,0,0,0.04)] md:p-10">
            <div className="flex items-center justify-between">
              <span className="chip border-line bg-[#f0f0f2] text-muted shadow-none">Mode 0{activeIndex + 1} · Actif</span>
              <PixelIcon variant={activeIndex} dark={true} />
            </div>
            <h3 className="mt-10 text-3xl font-semibold tracking-[-.04em] text-[#0c0c0d]">{active}</h3>
            <p className="mt-3 max-w-lg text-base leading-7 text-muted">{detail.intro}</p>
            <div className="mt-10 grid gap-3">
              {detail.points.map((point) => (
                <div key={point} className="flex items-center gap-3 border-b border-line pb-3 text-sm font-medium text-[#0c0c0d]">
                  <Check size={16} className="shrink-0 text-[#d9232e]" />
                  {point}
                </div>
              ))}
            </div>
            <div className="mt-10 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-line bg-[#f8f8f9] p-4">
                <span className="font-mono text-[9px] uppercase text-muted">Garantie</span>
                <p className="mt-2 text-sm font-semibold text-[#0c0c0d]">{detail.warranty}</p>
              </div>
              <div className="rounded-2xl border border-line bg-[#f8f8f9] p-4">
                <span className="font-mono text-[9px] uppercase text-muted">Inclus</span>
                <p className="mt-2 text-sm font-semibold text-[#0c0c0d]">{detail.accessories}</p>
              </div>
            </div>
            <a
              href="#catalogue"
              onClick={() => onSelectConditionFilter?.(active)}
              className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#0c0c0d] px-5 text-xs font-semibold text-white transition hover:bg-[#d9232e]"
            >
              Voir les modèles {active}
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
        <div className="mt-16 grid grid-cols-2 overflow-hidden rounded-2xl border border-line bg-white shadow-sm sm:grid-cols-5">
          {brands.map((brand, index) => (
            <a
              key={brand}
              href="#catalogue"
              onClick={() => onSelectBrandFilter?.(brand)}
              className={`flex min-h-24 flex-col items-center justify-center gap-3 border-line p-4 transition hover:bg-[#f2f2f4] ${
                index === brands.length - 1
                  ? 'max-sm:col-span-2'
                  : 'max-sm:border-b max-sm:[&:nth-child(odd)]:border-r sm:border-r'
              }`}
            >
              <PixelIcon variant={index} dark={true} />
              <span className="text-center text-xs font-semibold text-[#0c0c0d]">{brand}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
