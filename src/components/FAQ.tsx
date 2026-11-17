import { Plus } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { TranslationKey } from '@/data/translations';

const faqItems: ReadonlyArray<readonly [TranslationKey, TranslationKey]> = [
  ['faq.q1', 'faq.a1'],
  ['faq.q2', 'faq.a2'],
  ['faq.q3', 'faq.a3'],
  ['faq.q4', 'faq.a4'],
];

export function FAQ() {
  const { t } = useLanguage();

  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="container-shell grid gap-12 lg:grid-cols-[.6fr_1fr]">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[.18em] text-muted">
            {t('faq.badge')}
          </span>
          <h2 className="iri-text mt-5 text-5xl font-semibold leading-[.94] tracking-[-.06em] md:text-7xl">
            {t('faq.title')}
          </h2>
          <p className="mt-6 max-w-sm text-sm leading-7 text-muted">
            {t('faq.subtitle')}
          </p>
        </div>
        <div className="border-t border-line">
          {faqItems.map(([qKey, aKey]) => (
            <details key={qKey} className="group border-b border-line">
              <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-5 py-5 text-base font-medium tracking-[-.02em]">
                <span>{t(qKey)}</span>
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line transition group-open:rotate-45 group-open:bg-ink group-open:text-white">
                  <Plus size={16} />
                </span>
              </summary>
              <p className="max-w-2xl pb-7 pr-12 text-sm leading-7 text-muted">{t(aKey)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
