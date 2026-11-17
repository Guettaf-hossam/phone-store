import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { ProductCategory } from '@/types';
import { TechText } from './TechText';

interface SignalSectionProps {
  onSelectBrand?: (brand: ProductCategory) => void;
}

interface HubNode {
  id: string;
  labelKey: string;
  defaultLabel: string;
  x: number;
  y: number;
  href: string;
  category?: ProductCategory;
  subFr: string;
  subAr: string;
  subEn: string;
}

const nodes: ReadonlyArray<HubNode> = [
  {
    id: 'apple',
    labelKey: 'Apple',
    defaultLabel: 'Apple',
    x: 500,
    y: 70,
    href: '#catalogue',
    category: 'Apple',
    subFr: 'iPhone 16 Pro & Cabas',
    subAr: 'آيفون 16 وكابا مضمون',
    subEn: 'iPhone 16 & Cabas',
  },
  {
    id: 'samsung',
    labelKey: 'Samsung',
    defaultLabel: 'Samsung',
    x: 770,
    y: 135,
    href: '#catalogue',
    category: 'Samsung',
    subFr: 'S24 Ultra & Série A',
    subAr: 'S24 ألترا وسلسلة A',
    subEn: 'S24 Ultra & A-Series',
  },
  {
    id: 'redmi',
    labelKey: 'Redmi',
    defaultLabel: 'Redmi',
    x: 855,
    y: 300,
    href: '#catalogue',
    category: 'Redmi',
    subFr: 'Note 13 Pro+ & 13C',
    subAr: 'نوت 13 برو بلس و13C',
    subEn: 'Note 13 Pro+ & 13C',
  },
  {
    id: 'realme',
    labelKey: 'Realme',
    defaultLabel: 'Realme',
    x: 755,
    y: 465,
    href: '#catalogue',
    category: 'Realme',
    subFr: 'Série 12 Pro+ Luxe',
    subAr: 'ريلمي 12 برو جلد فاخر',
    subEn: '12 Pro+ Luxury Leather',
  },
  {
    id: 'parfums',
    labelKey: 'Parfums',
    defaultLabel: 'Parfums',
    x: 500,
    y: 530,
    href: '#catalogue',
    category: 'Parfums',
    subFr: 'Assaf, Heesh & Ibraq',
    subAr: 'عساف، هيش وإبراق دبي',
    subEn: 'Assaf, Heesh & Ibraq',
  },
  {
    id: 'smart-watch',
    labelKey: 'Smart Watch',
    defaultLabel: 'Smart Watch',
    x: 245,
    y: 465,
    href: '#catalogue',
    category: 'Smart Watch',
    subFr: 'Apple Watch & Galaxy',
    subAr: 'ساعات آبل وغالاكسي',
    subEn: 'Apple & Galaxy Watch',
  },
  {
    id: 'ooredoo',
    labelKey: 'Ooredoo',
    defaultLabel: 'Ooredoo',
    x: 145,
    y: 300,
    href: '#reprise',
    subFr: 'Puces, Recharges & 4G',
    subAr: 'شرائح، رصيد ومودم 4G',
    subEn: 'SIM, Top-ups & 4G',
  },
  {
    id: 'reprise',
    labelKey: 'Reprise',
    defaultLabel: 'Reprise',
    x: 230,
    y: 135,
    href: '#reprise',
    subFr: 'Estimation en 15 min',
    subAr: 'تقدير فوري في 15 دقيقة',
    subEn: 'Estimate in 15 mins',
  },
];

export function SignalSection({ onSelectBrand }: SignalSectionProps) {
  const { t, language } = useLanguage();

  const getNodeLabel = (node: HubNode) => {
    if (language === 'ar') {
      switch (node.category) {
        case 'Apple': return 'آبل';
        case 'Samsung': return 'سامسونغ';
        case 'Redmi': return 'ريدمي';
        case 'Realme': return 'ريلمي';
        case 'Smart Watch': return 'ساعات ذكية';
        case 'Parfums': return 'عطور فاخرة';
      }
      if (node.labelKey === 'Ooredoo') return 'أوريدو';
      if (node.labelKey === 'Reprise') return 'استبدال وتغيير';
    }
    if (language === 'en') {
      if (node.labelKey === 'Reprise') return 'Trade-In';
      if (node.category === 'Parfums') return 'Luxury Perfumes';
    }
    return node.defaultLabel;
  };

  const getSubLabel = (node: HubNode) => {
    if (language === 'ar') return node.subAr;
    if (language === 'en') return node.subEn;
    return node.subFr;
  };

  const handleNodeClick = (node: HubNode) => {
    if (node.category && onSelectBrand) {
      onSelectBrand(node.category);
    }
  };

  return (
    <section className="bg-ink py-16 text-white md:py-28">
      <div className="container-shell">
        <div className="flex items-end justify-between gap-8 border-b border-white/12 pb-6">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[.18em] text-white/42">
              {t('signal.badge')}
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-.045em] md:text-5xl">
              {t('signal.title')}
            </h2>
          </div>
          <p className="hidden max-w-xs text-sm leading-6 text-white/56 md:block">
            {t('signal.subtitle')}
          </p>
        </div>

        <TechText />

        <div className="relative mx-auto mt-4 hidden aspect-[5/3] w-full max-w-4xl md:block">
          <svg viewBox="0 0 1000 600" className="absolute inset-0 size-full" role="img" aria-label="Écosystème Planet Phone">
            <circle cx="500" cy="300" r="140" fill="none" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 8" />
            <circle cx="500" cy="300" r="225" fill="none" stroke="rgba(255,255,255,0.08)" />
            <circle cx="500" cy="300" r="285" fill="none" stroke="rgba(217,35,46,0.12)" strokeDasharray="5 10" />

            {nodes.map((node, index) => {
              const label = getNodeLabel(node);
              const isEven = index % 2 === 0;
              return (
                <g key={node.id}>
                  <path
                    d={`M ${node.x} ${node.y} Q ${(node.x + 500) / 2} ${(node.y + 300) / 2 + (isEven ? 30 : -30)} 500 300`}
                    fill="none"
                    stroke={isEven ? 'rgba(217,35,46,0.65)' : 'rgba(255,255,255,0.32)'}
                    strokeWidth="1.6"
                    strokeDasharray="6 8"
                    style={{ animation: `dash-flow ${5 + index * 0.6}s linear infinite` }}
                  />
                  <a
                    href={node.href}
                    onClick={() => handleNodeClick(node)}
                    className="cursor-pointer transition-transform hover:scale-105"
                  >
                    <rect
                      x={node.x - 72}
                      y={node.y - 25}
                      width="144"
                      height="50"
                      rx="25"
                      fill="#18181b"
                      stroke={node.category === 'Parfums' ? 'rgba(217,35,46,0.7)' : 'rgba(255,255,255,0.28)'}
                      strokeWidth="1.2"
                    />
                    <circle cx={node.x - 48} cy={node.y} r="4" fill="#d9232e" />
                    <text
                      x={node.x + 6}
                      y={node.y + 4.5}
                      textAnchor="middle"
                      fill="rgba(255,255,255,0.95)"
                      fontSize="13"
                      fontWeight="600"
                      fontFamily={language === 'ar' ? 'IBM Plex Sans Arabic, sans-serif' : 'Geist, sans-serif'}
                    >
                      {label}
                    </text>
                  </a>
                </g>
              );
            })}

            <circle cx="500" cy="300" r="88" fill="#0c0c0d" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
            <a href="#catalogue" className="cursor-pointer" aria-label="Planet Phone Hub · Aller au catalogue">
              <circle cx="500" cy="300" r="68" fill="#d9232e" className="transition-transform hover:scale-105" />
              <circle cx="500" cy="300" r="106" fill="none" stroke="rgba(217,35,46,0.6)" strokeDasharray="6 12" style={{ animation: 'dash-flow 9s linear infinite reverse' }} />
              <text x="500" y="316" textAnchor="middle" fill="white" fontSize="42" fontWeight="700" fontFamily="Geist, sans-serif" letterSpacing="-0.04em">PP</text>
            </a>
          </svg>
        </div>

        <div className="mt-8 flex flex-col items-center md:hidden">
          <a
            href="#catalogue"
            className="group flex flex-col items-center justify-center"
            aria-label="Planet Phone Hub · Explorer le catalogue"
          >
            <div className="relative grid size-28 place-items-center rounded-full bg-[#d9232e] shadow-[0_0_50px_rgba(217,35,46,0.45)] transition-transform group-hover:scale-105">
              <span className="text-4xl font-extrabold tracking-tight text-white">PP</span>
              <span className="absolute -inset-2 rounded-full border border-[#d9232e]/40 animate-ping" />
            </div>
            <span className="mt-4 rounded-full border border-white/14 bg-white/6 px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest text-white/70">
              PLANET PHONE HUB
            </span>
          </a>

          <div className="mt-8 grid w-full grid-cols-2 gap-2.5">
            {nodes.map((node) => {
              const label = getNodeLabel(node);
              const sub = getSubLabel(node);
              return (
                <a
                  key={node.id}
                  href={node.href}
                  onClick={() => handleNodeClick(node)}
                  className="flex flex-col justify-between rounded-2xl border border-white/12 bg-white/[0.05] p-3.5 transition active:scale-[0.98] active:bg-white/10"
                >
                  <div className="flex items-center justify-between">
                    <span className="size-2 rounded-full bg-[#d9232e]" />
                    <ArrowUpRight size={14} className="text-white/40" />
                  </div>
                  <div className="mt-3">
                    <p className="text-sm font-semibold text-white">{label}</p>
                    <p className="mt-0.5 text-[11px] leading-tight text-white/50">{sub}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
