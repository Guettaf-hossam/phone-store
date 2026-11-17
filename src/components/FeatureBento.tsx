import { ArrowUpRight, BadgeCheck, LucideIcon, MessageCircle, Radio, RefreshCw, ScanLine, Truck } from 'lucide-react';

interface Feature {
  title: string;
  copy: string;
  meta: string;
  icon: LucideIcon;
  span: string;
  dark?: boolean;
  id?: string;
  href?: string;
}

const features: Feature[] = [
  {
    title: 'Catalogue Live',
    copy: 'Consultez les arrivages Apple, Samsung, Redmi, Realme et Smart Watches avec prix affichés en Dinar Algérien.',
    meta: '12 références · Prix en DA',
    icon: ScanLine,
    span: 'md:col-span-7',
    dark: true,
    href: '#catalogue',
  },
  {
    title: 'Reprise & Échange',
    copy: 'Évaluez votre smartphone actuel et ne réglez que la différence lors du contrôle à Bazar Dubai.',
    meta: 'تبديل الهواتف · Estimation rapide',
    icon: RefreshCw,
    span: 'md:col-span-5',
    href: '#reprise',
  },
  {
    title: 'WhatsApp Direct',
    copy: 'Sélectionnez capacité, couleur et mode de retrait pour générer votre message pré-rempli en un clic.',
    meta: '0550 15 12 93',
    icon: MessageCircle,
    span: 'md:col-span-4',
    href: '#catalogue',
  },
  {
    title: 'Garantie Magasin',
    copy: 'Chaque appareil est remis avec facture, vérification IMEI et suivi SAV directement sur place à Bouira.',
    meta: '45 jours à 12 mois',
    icon: BadgeCheck,
    span: 'md:col-span-4',
    href: '#garantie',
  },
  {
    title: 'Point Ooredoo',
    copy: 'Puces officielles, activation immédiate, recharges express, forfaits data et modems 4G en boutique.',
    meta: 'SIM · Forfaits · Box 4G',
    icon: Radio,
    span: 'md:col-span-4',
    id: 'ooredoo',
  },
];

export function FeatureBento() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-shell">
        <div className="mb-12 max-w-3xl">
          <span className="font-mono text-[10px] uppercase tracking-[.18em] text-muted">Services / Architecture</span>
          <h2 className="iri-text mt-4 text-5xl font-semibold leading-[.95] tracking-[-.065em] md:text-7xl">Pensé pour acheter sans friction.</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
          {features.map(({ title, copy, meta, icon: Icon, span, dark, id, href }) => (
            <article
              id={id}
              key={title}
              className={`${span} card flex min-h-64 flex-col justify-between p-7 md:p-9 ${
                dark ? 'border-white/10 bg-ink text-white shadow-[0_24px_60px_rgba(12,12,13,0.16)]' : ''
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className={`grid size-12 place-items-center rounded-2xl ${dark ? 'bg-white/10 text-white' : 'bg-white/80 text-ink'}`}>
                  <Icon size={21} />
                </div>
                <span className={`font-mono text-[10px] uppercase tracking-[0.12em] ${dark ? 'text-white/46' : 'text-muted'}`}>
                  {meta}
                </span>
              </div>
              <div className="mt-12">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-2xl font-semibold tracking-[-.04em]">{title}</h3>
                  {href && (
                    <a
                      href={href}
                      aria-label={`Aller vers ${title}`}
                      className={`grid size-9 shrink-0 place-items-center rounded-full border transition hover:rotate-45 ${
                        dark ? 'border-white/15 text-white hover:bg-white hover:text-ink' : 'border-black/10 text-ink hover:bg-ink hover:text-white'
                      }`}
                    >
                      <ArrowUpRight size={15} />
                    </a>
                  )}
                </div>
                <p className={`mt-2.5 max-w-md text-sm leading-6 ${dark ? 'text-white/62' : 'text-muted'}`}>{copy}</p>
              </div>
            </article>
          ))}
          <article className="card iri-gradient relative min-h-72 overflow-hidden p-8 md:col-span-12 md:p-10">
            <div className="relative z-10 flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/75 bg-white/65 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink">
                  <Truck size={14} /> Logistique Nationale
                </div>
                <h3 className="mt-8 text-3xl font-semibold tracking-[-.05em] text-ink md:text-5xl">
                  Retrait ou Livraison<br />58 Wilayas.
                </h3>
                <p className="mt-4 max-w-lg text-sm leading-6 text-ink-soft">
                  Retirez votre commande directement à Bazar Dubai (La Cité Ouest, Bouira) avec activation sur place, ou optez pour une expédition protégée vers les 58 wilayas.
                </p>
              </div>
              <a
                href="#catalogue"
                className="inline-flex min-h-12 shrink-0 items-center gap-2 self-start rounded-full bg-ink px-6 text-xs font-semibold text-white transition hover:bg-[#222226] md:self-end"
              >
                Choisir un modèle
                <ArrowUpRight size={15} />
              </a>
            </div>
            <div className="pointer-events-none absolute -bottom-24 right-[-4%] size-80 rounded-full border-[34px] border-white/40 md:size-[430px]" />
          </article>
        </div>
      </div>
    </section>
  );
}
