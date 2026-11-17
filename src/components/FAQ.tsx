import { Plus } from 'lucide-react';

const questions = [
  ['Les prix du site sont-ils ceux du magasin ?', 'Oui, les prix affichés servent de référence au stock Planet Phone à Bouira. Confirmez la disponibilité sur WhatsApp avant votre déplacement.'],
  ['Où se trouve exactement Planet Phone ?', 'À Bazar Dubai, Rue Frères Boussendalah, La Cité Ouest, Bouira. Le lien Google Maps est disponible en bas de page.'],
  ['Livrez-vous hors de Bouira ?', 'Oui, nous organisons la livraison vers les 58 wilayas. Les frais et délais sont confirmés au moment de la commande.'],
  ['Comment fonctionne la garantie ?', 'La durée dépend de l’état du produit. Elle est indiquée sur chaque fiche et rappelée sur votre facture magasin.'],
  ['Puis-je faire reprendre mon téléphone ?', 'Oui. Envoyez le modèle, le stockage et la santé de batterie via notre estimateur. La valeur finale est validée après contrôle en magasin.'],
  ['Les appareils d’occasion sont-ils testés ?', 'Chaque occasion certifiée passe un contrôle fonctionnel de 30 points incluant écran, caméras, réseau, capteurs, charge et batterie.'],
] as const;

export function FAQ() {
  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="container-shell grid gap-12 lg:grid-cols-[.6fr_1fr]">
        <div><span className="font-mono text-[10px] uppercase tracking-[.18em] text-muted">FAQ / Bouira</span><h2 className="iri-text mt-5 text-5xl font-semibold leading-[.94] tracking-[-.06em] md:text-7xl">Avant de passer.</h2><p className="mt-6 max-w-sm text-sm leading-7 text-muted">Les réponses utiles pour acheter, échanger ou faire livrer votre prochain appareil.</p></div>
        <div className="border-t border-line">
          {questions.map(([question, answer]) => (
            <details key={question} className="group border-b border-line">
              <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-5 py-5 text-base font-medium tracking-[-.02em]"><span>{question}</span><span className="grid size-9 shrink-0 place-items-center rounded-full border border-line transition group-open:rotate-45 group-open:bg-ink group-open:text-white"><Plus size={16} /></span></summary>
              <p className="max-w-2xl pb-7 pr-12 text-sm leading-7 text-muted">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
