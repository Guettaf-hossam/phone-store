import { ArrowUpRight, Clock, Instagram, MapPin, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { STORE_INFO } from '@/data/store';
import { buildWhatsAppUrl } from '@/utils/formatting';
import { ProductMark } from './ProductMark';

export function SiteFooter() {
  const { t, language } = useLanguage();

  const getGreeting = () => {
    if (language === 'ar') return 'السلام عليكم بلانت فون، أود الاستفسار عن توفر الأجهزة في المتجر.';
    if (language === 'en') return 'Salam Planet Phone, I would like to check in-store stock availability.';
    return 'Salam Planet Phone, je souhaite vérifier la disponibilité en magasin.';
  };

  const whatsAppHref = buildWhatsAppUrl(STORE_INFO.whatsappNumber, getGreeting());

  return (
    <footer className="bg-[#d9d9de] pt-16">
      <div className="container-shell">
        <div className="grid gap-12 border-b border-black/12 pb-16 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <ProductMark className="size-14" />
              <div>
                <p className="text-sm font-semibold tracking-[-0.02em] text-ink">{STORE_INFO.name}</p>
                <p className="text-xs text-muted" lang="ar" dir="rtl">{STORE_INFO.arabicName} · البويرة</p>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-6 text-ink-soft">
              {t('footer.desc')}
            </p>
          </div>

          <div>
            <span className="font-mono text-[10px] uppercase tracking-[.14em] text-muted">
              {t('footer.hoursTitle')}
            </span>
            <p className="mt-4 max-w-xs text-sm leading-6 text-ink">{STORE_INFO.address}</p>
            <p className="mt-2 inline-flex items-center gap-2 text-xs text-ink-soft">
              <Clock size={14} />
              <span>{STORE_INFO.hours}</span>
            </p>
            <div className="mt-4">
              <a
                href={STORE_INFO.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-ink underline underline-offset-4 hover:text-[#d9232e]"
              >
                <MapPin size={14} />
                <span>{t('footer.openMaps')}</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>

          <div>
            <span className="font-mono text-[10px] uppercase tracking-[.14em] text-muted">
              {t('footer.contactTitle')}
            </span>
            <div className="mt-4 flex flex-col items-start gap-3">
              <a
                href={whatsAppHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-[#d9232e]"
              >
                <MessageCircle size={15} />
                <span className="tabular-nums">WhatsApp · {STORE_INFO.phoneDisplay}</span>
                <ArrowUpRight size={13} />
              </a>
              <a
                href={STORE_INFO.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-ink hover:text-[#d9232e]"
              >
                <Instagram size={15} />
                <span>Instagram (@planet_phone10)</span>
                <ArrowUpRight size={13} />
              </a>
              <a
                href={STORE_INFO.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-ink hover:text-[#d9232e]"
              >
                <span>Facebook (PlanetPhonee)</span>
                <ArrowUpRight size={13} />
              </a>
              <a
                href={`tel:${STORE_INFO.phoneDisplay.replace(/\s/g, '')}`}
                className="text-sm tabular-nums text-ink-soft hover:text-ink"
              >
                {t('footer.call')} : {STORE_INFO.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
        <div className="overflow-hidden py-8">
          <p className="whitespace-nowrap text-center text-[clamp(2.6rem,11.5vw,9.8rem)] font-semibold leading-none tracking-[-.08em] text-ink">
            PLANET PHONE
          </p>
        </div>
        <div className="flex flex-col justify-between gap-2 border-t border-black/12 py-5 font-mono text-[10px] uppercase text-muted sm:flex-row">
          <span>© {new Date().getFullYear()} Planet Phone Bouira · {t('footer.rights')}</span>
          <span>Bazar Dubai · Rue Frères Boussendalah · La Cité Ouest</span>
        </div>
      </div>
    </footer>
  );
}
