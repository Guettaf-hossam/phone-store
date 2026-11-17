import { ProductCategory } from '@/types';
import { TechText } from './TechText';

interface SignalSectionProps {
  onSelectBrand?: (brand: ProductCategory) => void;
}

const nodes: ReadonlyArray<{
  label: string;
  x: number;
  y: number;
  href: string;
  category?: ProductCategory;
}> = [
  { label: 'Apple', x: 500, y: 72, href: '#catalogue', category: 'Apple' },
  { label: 'Samsung', x: 785, y: 155, href: '#catalogue', category: 'Samsung' },
  { label: 'Redmi', x: 845, y: 350, href: '#catalogue', category: 'Redmi' },
  { label: 'Realme', x: 690, y: 515, href: '#catalogue', category: 'Realme' },
  { label: 'Smart Watch', x: 310, y: 515, href: '#catalogue', category: 'Smart Watch' },
  { label: 'Ooredoo', x: 155, y: 350, href: '#ooredoo' },
  { label: 'Reprise', x: 215, y: 155, href: '#reprise' },
];

export function SignalSection({ onSelectBrand }: SignalSectionProps) {
  return (
    <section className="bg-ink py-20 text-white md:py-28">
      <div className="container-shell">
        <div className="flex items-end justify-between gap-8 border-b border-white/12 pb-6">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[.18em] text-white/42">Signal / 01</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-.045em] md:text-5xl">Un magasin. Tout l’écosystème.</h2>
          </div>
          <p className="hidden max-w-xs text-sm leading-6 text-white/56 md:block">Cliquez ou faites glisser le mot-symbole « PLANET PHONE » — chaque impulsion disperse les pixels avant retour magnétique.</p>
        </div>
        <TechText />
        <div className="relative mx-auto mt-4 aspect-[5/3] w-full max-w-4xl">
          <svg viewBox="0 0 1000 600" className="absolute inset-0 size-full" role="img" aria-label="Écosystème Planet Phone">
            <circle cx="500" cy="300" r="215" fill="none" stroke="rgba(255,255,255,0.06)" />
            {nodes.map(({ label, x, y, href, category }, index) => (
              <g key={label}>
                <path
                  d={`M ${x} ${y} Q ${(x + 500) / 2} ${y * 0.55 + 135} 500 300`}
                  fill="none"
                  stroke={index % 2 === 0 ? 'rgba(217,35,46,0.52)' : 'rgba(255,255,255,0.25)'}
                  strokeWidth="1.4"
                  strokeDasharray="6 10"
                  style={{ animation: `dash-flow ${6 + index * 0.7}s linear infinite` }}
                />
                <a
                  href={href}
                  onClick={() => {
                    if (category && onSelectBrand) onSelectBrand(category);
                  }}
                  className="cursor-pointer"
                >
                  <rect
                    x={x - 66}
                    y={y - 24}
                    width="132"
                    height="48"
                    rx="24"
                    fill="#18181b"
                    stroke="rgba(255,255,255,0.24)"
                  />
                  <circle cx={x - 44} cy={y} r="3.5" fill="#d9232e" />
                  <text
                    x={x + 6}
                    y={y + 4.5}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.88)"
                    fontSize="13"
                    fontWeight="500"
                    fontFamily="Geist, sans-serif"
                  >
                    {label}
                  </text>
                </a>
              </g>
            ))}
            <circle cx="500" cy="300" r="82" fill="#0c0c0d" stroke="rgba(255,255,255,0.24)" strokeWidth="1.5" />
            <circle cx="500" cy="300" r="66" fill="#d9232e" />
            <circle cx="500" cy="300" r="104" fill="none" stroke="rgba(217,35,46,.5)" strokeDasharray="7 13" style={{ animation: 'dash-flow 10s linear infinite reverse' }} />
            <text x="500" y="315" textAnchor="middle" fill="white" fontSize="42" fontWeight="700" fontFamily="Geist, sans-serif" letterSpacing="-0.04em">PP</text>
          </svg>
        </div>
      </div>
    </section>
  );
}
