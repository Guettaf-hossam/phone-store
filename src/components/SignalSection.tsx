import { useLanguage } from '@/context/LanguageContext';
import { ProductCategory } from '@/types';
import { TechText } from './TechText';

interface SignalSectionProps {
  onSelectBrand?: (brand: ProductCategory) => void;
}

interface HubNode {
  labelKey: string;
  defaultLabel: string;
  x: number;
  y: number;
  href: string;
  category?: ProductCategory;
}

const nodes: ReadonlyArray<HubNode> = [
  { labelKey: 'Apple', defaultLabel: 'Apple', x: 500, y: 72, href: '#catalogue', category: 'Apple' },
  { labelKey: 'Samsung', defaultLabel: 'Samsung', x: 785, y: 155, href: '#catalogue', category: 'Samsung' },
  { labelKey: 'Redmi', defaultLabel: 'Redmi', x: 845, y: 350, href: '#catalogue', category: 'Redmi' },
  { labelKey: 'Realme', defaultLabel: 'Realme', x: 690, y: 515, href: '#catalogue', category: 'Realme' },
  { labelKey: 'Smart Watch', defaultLabel: 'Smart Watch', x: 310, y: 515, href: '#catalogue', category: 'Smart Watch' },
  { labelKey: 'Ooredoo', defaultLabel: 'Ooredoo', x: 155, y: 350, href: '#reprise' },
  { labelKey: 'Reprise', defaultLabel: 'Reprise', x: 215, y: 155, href: '#reprise' },
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
      }
      if (node.labelKey === 'Ooredoo') return 'أوريدو';
      if (node.labelKey === 'Reprise') return 'استبدال';
    }
    if (language === 'en') {
      if (node.labelKey === 'Reprise') return 'Trade-In';
    }
    return node.defaultLabel;
  };

  return (
    <section className="bg-ink py-20 text-white md:py-28">
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

        <div className="relative mx-auto mt-4 aspect-[5/3] w-full max-w-4xl">
          <svg viewBox="0 0 1000 600" className="absolute inset-0 size-full" role="img" aria-label="Écosystème Planet Phone">
            <circle cx="500" cy="300" r="215" fill="none" stroke="rgba(255,255,255,0.06)" />
            {nodes.map((node, index) => {
              const label = getNodeLabel(node);
              return (
                <g key={node.labelKey}>
                  <path
                    d={`M ${node.x} ${node.y} Q ${(node.x + 500) / 2} ${node.y * 0.55 + 135} 500 300`}
                    fill="none"
                    stroke={index % 2 === 0 ? 'rgba(217,35,46,0.52)' : 'rgba(255,255,255,0.25)'}
                    strokeWidth="1.4"
                    strokeDasharray="6 10"
                    style={{ animation: `dash-flow ${6 + index * 0.7}s linear infinite` }}
                  />
                  <a
                    href={node.href}
                    onClick={() => {
                      if (node.category && onSelectBrand) onSelectBrand(node.category);
                    }}
                    className="cursor-pointer"
                  >
                    <rect
                      x={node.x - 66}
                      y={node.y - 24}
                      width="132"
                      height="48"
                      rx="24"
                      fill="#18181b"
                      stroke="rgba(255,255,255,0.24)"
                    />
                    <circle cx={node.x - 44} cy={node.y} r="3.5" fill="#d9232e" />
                    <text
                      x={node.x + 6}
                      y={node.y + 4.5}
                      textAnchor="middle"
                      fill="rgba(255,255,255,0.88)"
                      fontSize="13"
                      fontWeight="500"
                      fontFamily={language === 'ar' ? 'IBM Plex Sans Arabic, sans-serif' : 'Geist, sans-serif'}
                    >
                      {label}
                    </text>
                  </a>
                </g>
              );
            })}
            <circle cx="500" cy="300" r="82" fill="#0c0c0d" stroke="rgba(255,255,255,0.24)" strokeWidth="1.5" />
            <a href="#catalogue" className="cursor-pointer" aria-label="Planet Phone Hub · Aller au catalogue">
              <circle cx="500" cy="300" r="66" fill="#d9232e" className="transition-transform hover:scale-105" />
              <circle cx="500" cy="300" r="104" fill="none" stroke="rgba(217,35,46,.5)" strokeDasharray="7 13" style={{ animation: 'dash-flow 10s linear infinite reverse' }} />
              <text x="500" y="315" textAnchor="middle" fill="white" fontSize="42" fontWeight="700" fontFamily="Geist, sans-serif" letterSpacing="-0.04em">PP</text>
            </a>
          </svg>
        </div>
      </div>
    </section>
  );
}
