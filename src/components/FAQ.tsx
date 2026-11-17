import { Plus } from 'lucide-react';

const questions: ReadonlyArray<readonly [string, string]> = [
  [
    'Garantie Magasin & Facture : comment sont couverts vos appareils ?',
    'Chaque smartphone acheté chez Planet Phone est accompagné d’une facture magasin avec référence IMEI détaillée. La garantie s’étend jusqu’à 12 mois pour le neuf scellé, 3 mois pour le cabas garanti, et 45 jours d’essai pour l’occasion certifiée.',
  ],
  [
    'Retrait & Livraison : retrait à Bazar Dubai ou envoi vers 58 Wilayas ?',
    'Vous pouvez tester et récupérer votre smartphone directement dans notre magasin à Bazar Dubai (Rue Frères Boussendalah, La Cité Ouest, Bouira). Pour les autres wilayas, nous assurons une livraison express sécurisée avec paiement en espèces à la livraison (main à main).',
  ],
  [
    'Service Reprise / Échange : comment échanger mon ancien téléphone sur place ?',
    'Remplissez notre formulaire d’estimation en ligne pour recevoir une première proposition sur WhatsApp. Rendez-vous ensuite en magasin à Bouira : nos techniciens testent votre téléphone en 15 minutes et déduisent directement sa valeur de votre nouvel achat.',
  ],
  [
    'Services Ooredoo : quelles prestations sont disponibles au magasin ?',
    'En tant que point de vente officiel Ooredoo à Bouira, nous prenons en charge l’activation instantanée de puces SIM avec pièce d’identité, les recharges de crédit express, la souscription aux forfaits Internet et la vente de modems/routeurs 4G prêts à l’emploi.',
  ],
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="container-shell grid gap-12 lg:grid-cols-[.6fr_1fr]">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[.18em] text-muted">FAQ / Bouira</span>
          <h2 className="iri-text mt-5 text-5xl font-semibold leading-[.94] tracking-[-.06em] md:text-7xl">
            Avant de passer.
          </h2>
          <p className="mt-6 max-w-sm text-sm leading-7 text-muted">
            Les réponses claires et pratiques pour acheter, échanger ou commander votre prochain smartphone à Bouira.
          </p>
        </div>
        <div className="border-t border-line">
          {questions.map(([question, answer]) => (
            <details key={question} className="group border-b border-line">
              <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-5 py-5 text-base font-medium tracking-[-.02em]">
                <span>{question}</span>
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line transition group-open:rotate-45 group-open:bg-ink group-open:text-white">
                  <Plus size={16} />
                </span>
              </summary>
              <p className="max-w-2xl pb-7 pr-12 text-sm leading-7 text-muted">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
