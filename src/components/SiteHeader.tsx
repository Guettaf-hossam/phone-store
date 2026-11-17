import { Menu, MessageCircle, X } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { STORE_INFO } from '@/data/store';
import { buildWhatsAppUrl } from '@/utils/formatting';
import { MobileMenu } from './MobileMenu';
import { ProductMark } from './ProductMark';

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => setOpen(false), []);
  const { language, setLanguage, t } = useLanguage();
  const whatsApp = buildWhatsAppUrl(STORE_INFO.whatsappNumber, 'Salam Planet Phone, je souhaite avoir des informations sur un modèle.');

  return (
    <header className="fixed left-1/2 top-4 z-50 w-[min(calc(100%-24px),960px)] -translate-x-1/2">
      <nav aria-label="Navigation principale" className="relative flex h-[68px] items-center justify-between rounded-full border border-white/12 bg-[#1c1c1f]/88 px-2.5 shadow-[0_12px_50px_rgba(0,0,0,.24)] backdrop-blur-xl">
        <a href="#" aria-label="Planet Phone, accueil" className="flex items-center gap-3 rounded-full pe-3">
          <ProductMark className="size-12" />
          <span className="hidden flex-col sm:flex">
            <span className="text-xs font-semibold tracking-[0.13em] text-white">PLANET PHONE</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/45">Bouira · DZ</span>
          </span>
        </a>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-full border border-white/10 bg-white/[0.04] p-1 text-[11px] font-medium text-white/70">
            <button
              type="button"
              onClick={() => setLanguage('fr')}
              aria-label="Français"
              className={`rounded-full px-2.5 py-1 transition ${language === 'fr' ? 'bg-[#d9232e] text-white font-semibold shadow-sm' : 'hover:text-white'}`}
            >
              FR
            </button>
            <button
              type="button"
              onClick={() => setLanguage('ar')}
              aria-label="العربية"
              className={`rounded-full px-2.5 py-1 transition ${language === 'ar' ? 'bg-[#d9232e] text-white font-semibold shadow-sm' : 'hover:text-white'}`}
            >
              عربي
            </button>
            <button
              type="button"
              onClick={() => setLanguage('en')}
              aria-label="English"
              className={`rounded-full px-2.5 py-1 transition ${language === 'en' ? 'bg-[#d9232e] text-white font-semibold shadow-sm' : 'hover:text-white'}`}
            >
              EN
            </button>
          </div>

          <button
            ref={triggerRef}
            type="button"
            aria-haspopup="true"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((value) => !value)}
            className="flex min-h-11 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 text-xs font-medium text-white/82 transition hover:bg-white/12 hover:text-white"
          >
            {open ? <X size={17} /> : <Menu size={17} />}
            <span>{t('nav.menu')}</span>
          </button>
        </div>

        <a href={whatsApp} target="_blank" rel="noreferrer" className="flex min-h-12 items-center gap-2 rounded-full bg-silver px-4 text-xs font-semibold text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] transition hover:bg-white">
          <MessageCircle size={16} />
          <bdi dir="ltr" className="hidden tabular-nums sm:inline">{STORE_INFO.phoneDisplay}</bdi>
          <span className="sm:hidden">WhatsApp</span>
        </a>
        <MobileMenu open={open} onClose={close} triggerRef={triggerRef} />
      </nav>
    </header>
  );
}
