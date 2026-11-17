import { CheckCircle2, MapPin, Radio, ShieldCheck } from 'lucide-react';
import { PrimaryButton, SecondaryButton } from './Buttons';

export function Hero() {
  return (
    <section className="relative min-h-[880px] overflow-hidden bg-ink pt-36 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_78%,rgba(217,217,222,0.58)_0%,rgba(125,125,134,0.22)_25%,transparent_56%),radial-gradient(circle_at_15%_16%,rgba(255,255,255,0.12),transparent_32%),radial-gradient(circle_at_85%_20%,rgba(217,35,46,0.14),transparent_28%),linear-gradient(165deg,#0c0c0d_18%,#1d1d21_58%,#7e7e87_115%)]" />
      <svg aria-hidden="true" viewBox="0 0 1200 760" className="pointer-events-none absolute bottom-0 left-1/2 h-[82%] w-[1280px] max-w-none -translate-x-1/2 opacity-60">
        {[180, 270, 365, 460].map((radius, index) => (
          <circle
            key={radius}
            cx="600"
            cy="520"
            r={radius}
            fill="none"
            stroke={index === 0 ? '#d9232e' : 'rgba(255,255,255,0.26)'}
            strokeWidth={index === 0 ? '1.3' : '1'}
            strokeDasharray="8 16"
            style={{ animation: `dash-flow ${10 + index * 3}s linear infinite` }}
          />
        ))}
        <path d="M110 620 C340 390 860 390 1090 620" fill="none" stroke="rgba(255,255,255,0.22)" />
        <line x1="600" y1="210" x2="600" y2="700" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 8" />
      </svg>

      <div className="container-shell relative z-10 flex min-h-[744px] flex-col items-center text-center">
        <div className="chip border-white/16 bg-white/[0.08] text-white/82 shadow-none backdrop-blur-md">
          <MapPin size={13} className="text-[#ef5b64]" />
          <span>Bazar Dubai · La Cité Ouest, Bouira</span>
        </div>

        <h1 className="iri-text-on-dark mt-9 max-w-5xl text-balance text-[clamp(3.2rem,8.6vw,8.4rem)] font-semibold leading-[0.88] tracking-[-0.07em]">
          Smartphones Certifiés.<br />Prenez le contrôle.
        </h1>

        <p className="mt-8 max-w-xl text-balance text-base leading-7 text-white/68 md:text-lg">
          Neuf scellé, cabas garanti, Smart Watches et services officiels Ooredoo. Diagnostic rigoureux, prix affichés en DA et accompagnement direct à Bouira.
        </p>

        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <PrimaryButton href="#catalogue">Explorer le catalogue</PrimaryButton>
          <SecondaryButton href="#reprise">Estimer une reprise</SecondaryButton>
        </div>

        <div className="mt-14 w-full max-w-3xl rounded-[28px] border border-white/16 bg-[#131316]/72 p-4 text-left shadow-[0_24px_80px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-xl sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/52">
            <span className="inline-flex items-center gap-2 text-white/85">
              <span className="size-2 rounded-full bg-[#d9232e] shadow-[0_0_10px_#d9232e]" />
              Diagnostic Magasin · Actif
            </span>
            <span>12 Références en rayon · 58 Wilayas</span>
          </div>
          <div className="mt-3.5 grid gap-2.5 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5">
              <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase text-white/46">
                <ShieldCheck size={13} className="text-[#ef5b64]" /> Contrôle 30 points
              </span>
              <p className="mt-1.5 text-sm font-medium text-white/90">IMEI, écran, batterie & capteurs</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5">
              <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase text-white/46">
                <CheckCircle2 size={13} className="text-[#ef5b64]" /> Garantie écrite
              </span>
              <p className="mt-1.5 text-sm font-medium text-white/90">Facture magasin remise sur place</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5">
              <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase text-white/46">
                <Radio size={13} className="text-[#ef5b64]" /> Point Ooredoo
              </span>
              <p className="mt-1.5 text-sm font-medium text-white/90">Puces, forfaits & recharge express</p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid w-full grid-cols-2 border-t border-white/15 text-left md:grid-cols-4">
          {[
            ['01', 'Neuf Scellé', 'Garantie jusqu’à 12 mois'],
            ['02', 'Cabas Garanti', 'Sélection 10/10 vérifiée'],
            ['03', 'Occasion Certifiée', 'Test complet 30 points'],
            ['04', 'Livraison Algérie', 'Retrait Bouira & 58 wilayas'],
          ].map(([number, label, detail]) => (
            <div key={number} className="border-white/15 px-4 py-5 max-md:[&:nth-child(odd)]:border-r max-md:[&:nth-child(-n+2)]:border-b md:border-r md:last:border-r-0">
              <span className="font-mono text-[10px] text-white/42">{number}</span>
              <p className="mt-1.5 text-xs font-semibold text-white/88">{label}</p>
              <p className="mt-0.5 text-[11px] text-white/46">{detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
