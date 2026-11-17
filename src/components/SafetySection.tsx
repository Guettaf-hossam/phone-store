import { BadgeCheck, BatteryCharging, Headphones, MessageCircle, Radio, ScanLine, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { STORE_INFO } from '@/data/store';
import { buildWhatsAppUrl } from '@/utils/formatting';

const guarantees = [
  ['Facture & Garantie', BadgeCheck],
  ['Contrôle 30 points', ScanLine],
  ['Batterie Certifiée', BatteryCharging],
  ['Accessoires Origine', ShieldCheck],
  ['Services Ooredoo', Radio],
  ['SAV sur place', Headphones],
] as const;

export function SafetySection() {
  const [phone, setPhone] = useState('');
  const [storage, setStorage] = useState('128GB');
  const [battery, setBattery] = useState('90');
  const [desired, setDesired] = useState('');
  const message = [
    'Salam *PLANET PHONE*, demande de *Reprise / Échange* :',
    `• Téléphone actuel : *${phone.trim() || 'À préciser'}*`,
    `• Stockage : *${storage}*`,
    `• Batterie : *${battery || 'À vérifier'}%*`,
    `• Modèle souhaité : *${desired.trim() || 'À discuter'}*`,
  ].join('\n');

  return (
    <section id="reprise" className="border-t border-white/10 bg-ink py-24 text-white md:py-32">
      <div className="container-shell">
        <div className="grid gap-16 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[.18em] text-white/38">Reprise / Échange</span>
            <h2 className="iri-text-on-dark mt-5 text-5xl font-semibold leading-[.92] tracking-[-.065em] md:text-7xl">Votre ancien téléphone a encore de la valeur.</h2>
            <p className="mt-7 max-w-lg text-sm leading-7 text-white/60">Décrivez votre appareil actuel. Notre équipe vous répond sur WhatsApp avec une estimation claire de la différence avant le contrôle final à Bazar Dubai.</p>
            <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3" id="garanties">
              {guarantees.map(([label, Icon]) => <div key={label} className="min-h-32 rounded-2xl border border-white/10 bg-white/[.045] p-4"><Icon size={18} className="text-[#ef5b64]" /><p className="mt-8 text-xs font-medium leading-5 text-white/82">{label}</p></div>)}
            </div>
          </div>
          <form onSubmit={(event) => event.preventDefault()} className="rounded-[32px] border border-white/12 bg-white/[.06] p-6 md:p-9">
            <div className="flex items-center justify-between border-b border-white/12 pb-5"><h3 className="text-xl font-semibold tracking-[-.03em]">Estimation Reprise / Échange</h3><span className="font-mono text-[10px] uppercase text-white/45">WhatsApp Direct</span></div>
            <Field label="Téléphone actuel"><input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Ex. iPhone 13 Pro" className="form-input" /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Stockage">
                <select value={storage} onChange={(event) => setStorage(event.target.value)} className="form-input [color-scheme:dark]">
                  {['64GB', '128GB', '256GB', '512GB', '1TB'].map((item) => (
                    <option key={item} value={item} className="bg-[#171719] text-white">
                      {item}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Batterie %">
                <input
                  type="number"
                  min="1"
                  max="100"
                  inputMode="numeric"
                  value={battery}
                  onChange={(event) => setBattery(event.target.value)}
                  className="form-input tabular-nums [color-scheme:dark]"
                />
              </Field>
            </div>
            <Field label="Modèle souhaité"><input value={desired} onChange={(event) => setDesired(event.target.value)} placeholder="Ex. Galaxy S24 Ultra" className="form-input" /></Field>
            <a href={buildWhatsAppUrl(STORE_INFO.whatsappNumber, message)} target="_blank" rel="noreferrer" className="mt-7 flex min-h-14 items-center justify-center gap-2 rounded-full bg-white text-sm font-semibold text-ink transition hover:bg-silver"><MessageCircle size={18} />Recevoir mon estimation</a>
            <p className="mt-4 text-center font-mono text-[10px] leading-4 text-white/42">ESTIMATION INDICATIVE · CONTRÔLE FINAL EN MAGASIN</p>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactElement }) {
  return <label className="mt-5 block"><span className="mb-2 block font-mono text-[10px] uppercase tracking-[.13em] text-white/52">{label}</span><span className="[&_.form-input]:h-13 [&_.form-input]:w-full [&_.form-input]:rounded-2xl [&_.form-input]:border [&_.form-input]:border-white/14 [&_.form-input]:bg-black/25 [&_.form-input]:px-4 [&_.form-input]:text-sm [&_.form-input]:text-white [&_.form-input]:outline-none [&_.form-input]:transition [&_.form-input]:placeholder:text-white/30 [&_.form-input]:focus:border-white/50">{children}</span></label>;
}
