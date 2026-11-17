import { ArrowUpRight, Gauge, Radio, RefreshCw, ShieldCheck, Smartphone, Sparkles, Watch, Zap } from 'lucide-react';
import { ProductCategory } from '@/types';
import { TechText } from './TechText';

interface SignalSectionProps {
  onSelectBrand?: (brand: ProductCategory) => void;
}

const hubCards: ReadonlyArray<{
  title: string;
  subtitle: string;
  href: string;
  category?: ProductCategory;
  icon: typeof Smartphone;
}> = [
  { title: 'Apple · iPhone', subtitle: 'Neuf & Cabas', href: '#catalogue', category: 'Apple', icon: Smartphone },
  { title: 'Samsung Galaxy', subtitle: 'Série S & A', href: '#catalogue', category: 'Samsung', icon: Sparkles },
  { title: 'Redmi · Xiaomi', subtitle: 'Garantie 12 mois', href: '#catalogue', category: 'Redmi', icon: Zap },
  { title: 'Realme', subtitle: 'Rapport qualité/prix', href: '#catalogue', category: 'Realme', icon: Gauge },
  { title: 'Smart Watch', subtitle: 'Apple & Galaxy Watch', href: '#catalogue', category: 'Smart Watch', icon: Watch },
  { title: 'Point Ooredoo', subtitle: 'SIM · Recharges · Box 4G', href: '#reprise', icon: Radio },
  { title: 'Reprise & Échange', subtitle: 'Estimation sur place', href: '#reprise', icon: RefreshCw },
  { title: 'Garantie Magasin', subtitle: 'Facture & contrôle', href: '#garantie', icon: ShieldCheck },
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
          <p className="hidden max-w-xs text-sm leading-6 text-white/56 md:block">
            Cliquez ou faites glisser le mot-symbole « PLANET PHONE » — chaque impulsion disperse les pixels avant retour magnétique.
          </p>
        </div>

        <TechText
          text="PLANET PHONE"
          size={360}
          weight={700}
          specks={18}
          className="h-[150px] w-full cursor-grab select-none touch-none active:cursor-grabbing sm:h-[220px] lg:h-[300px]"
        />

        <div className="mt-8 rounded-[32px] border border-white/12 bg-[#141416] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.5)] sm:p-10 lg:p-12">
          <div className="mb-8 flex flex-col items-center justify-center border-b border-white/10 pb-8 text-center sm:mb-10 sm:pb-10">
            <div className="relative">
              <div className="size-36 sm:size-44 rounded-full bg-[#d9232e] shadow-[0_0_60px_rgba(217,35,46,0.45)] flex flex-col items-center justify-center text-white transition-transform duration-300 hover:scale-105">
                <span className="text-4xl sm:text-5xl font-extrabold tracking-[-0.05em] leading-none">PP</span>
              </div>
            </div>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/[0.08] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.06em] text-white">
              <span className="size-2 rounded-full bg-[#d9232e] shadow-[0_0_10px_#d9232e]" />
              <span>PLANET PHONE HUB</span>
            </div>
            <p className="mt-3 max-w-md text-sm text-white/60">
              Bazar Dubai, Rue Frères Boussendalah (La Cité Ouest), Bouira
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
            {hubCards.map((item) => (
              <a
                key={item.title}
                href={item.href}
                onClick={() => {
                  if (item.category && onSelectBrand) {
                    onSelectBrand(item.category);
                  }
                }}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-all duration-200 hover:-translate-y-1 hover:border-[#d9232e]/60 hover:bg-white/[0.08]"
              >
                <div className="flex items-center justify-between">
                  <div className="size-10 rounded-xl bg-white/[0.06] flex items-center justify-center text-white/80 transition-colors group-hover:bg-[#d9232e] group-hover:text-white">
                    <item.icon size={20} />
                  </div>
                  <ArrowUpRight size={16} className="text-white/30 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                </div>
                <div className="mt-4">
                  <h3 className="text-base font-semibold tracking-[-0.02em] text-white">{item.title}</h3>
                  <p className="mt-1 text-xs text-white/60">{item.subtitle}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
