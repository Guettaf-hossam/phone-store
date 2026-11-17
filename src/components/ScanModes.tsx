import { useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { ProductCategory, ProductCondition } from '@/types';
import { PixelIcon } from './PixelIcon';

interface ScanModesProps {
  onSelectConditionFilter?: (condition: ProductCondition) => void;
  onSelectBrandFilter?: (brand: ProductCategory) => void;
}

const modesData: Record<
  ProductCondition,
  Record<'fr' | 'ar' | 'en', { intro: string; points: string[]; warranty: string; accessories: string }>
> = {
  'Neuf Scellé': {
    fr: {
      intro: 'Emballage intact et configuration jamais activée.',
      points: ['Scellés et référence vérifiés', 'IMEI contrôlé avant remise', 'Activation accompagnée'],
      warranty: 'Jusqu’à 12 mois',
      accessories: 'Pack constructeur complet',
    },
    ar: {
      intro: 'تغليف المصنع الأصلي غير مفتوح مع تفعيل أولي برفقتنا.',
      points: ['فحص الأختام والرقم التسلسلي', 'مراقبة الـ IMEI قبل التسليم', 'مرافقة في التفعيل والإعداد'],
      warranty: 'ضمان حتى 12 شهراً',
      accessories: 'العلبة الأصلية كاملة الملحقات',
    },
    en: {
      intro: 'Factory sealed box, untouched and never activated.',
      points: ['Verified manufacturer seals', 'IMEI checked before delivery', 'Assisted on-site activation'],
      warranty: 'Up to 12 months',
      accessories: 'Full manufacturer pack',
    },
  },
  'Cabas Garanti': {
    fr: {
      intro: 'Appareil importé, contrôlé et couvert par le magasin.',
      points: ['Test écran, réseau et capteurs', 'État esthétique documenté', 'Batterie et charge vérifiées'],
      warranty: '3 mois magasin',
      accessories: 'Chargeur selon arrivage',
    },
    ar: {
      intro: 'هاتف مستورد مفحوص بعناية ومغطى بضمان رسمي من المحل.',
      points: ['فحص الشاشة، الشبكة والمستشعرات', 'توثيق دقيق للحالة الجمالية', 'فحص البطارية وسرعة الشحن'],
      warranty: '3 أشهر ضمان محل',
      accessories: 'شاحن أصلي حسب الدفعة',
    },
    en: {
      intro: 'Imported device, thoroughly inspected and store-warranted.',
      points: ['Screen, network & sensor check', 'Documented cosmetic condition', 'Battery health & charging test'],
      warranty: '3 months store warranty',
      accessories: 'Charger included per batch',
    },
  },
  'Occasion Certifiée': {
    fr: {
      intro: 'Une seconde vie, après diagnostic technique approfondi.',
      points: ['Contrôle fonctionnel 30 points', 'Santé batterie communiquée', 'Pièces et réparations vérifiées'],
      warranty: '45 jours magasin',
      accessories: 'Câble de charge inclus',
    },
    ar: {
      intro: 'هاتف مستعمل مجرب يمر بفحص تقني دقيق قبل عرضه للبيع.',
      points: ['فحص وظيفي شامل 30 نقطة', 'إعلان صريح عن صحة البطارية', 'التأكد من أصالة القطع الداخلية'],
      warranty: '45 يوماً تجربة وضمان',
      accessories: 'كابل شحن مرفق',
    },
    en: {
      intro: 'Pre-owned smartphone thoroughly certified through 30 check points.',
      points: ['30-point functional check', 'Transparent battery health', 'Verified original parts'],
      warranty: '45 days trial warranty',
      accessories: 'Charging cable included',
    },
  },
};

const brands: ProductCategory[] = ['Apple', 'Samsung', 'Redmi', 'Realme', 'Smart Watch'];
const modeKeys = Object.keys(modesData) as ProductCondition[];

export function ScanModes({ onSelectConditionFilter, onSelectBrandFilter }: ScanModesProps) {
  const [active, setActive] = useState<ProductCondition>('Neuf Scellé');
  const { t, language } = useLanguage();
  const detail = modesData[active][language] || modesData[active].fr;
  const activeIndex = modeKeys.indexOf(active);

  const getConditionName = (cond: ProductCondition) => {
    if (language === 'ar') {
      if (cond === 'Neuf Scellé') return 'جديد مغلف';
      if (cond === 'Cabas Garanti') return 'كابا مضمون';
      if (cond === 'Occasion Certifiée') return 'مستعمل معتمد';
    }
    if (language === 'en') {
      if (cond === 'Neuf Scellé') return 'Sealed New';
      if (cond === 'Cabas Garanti') return 'Guaranteed Cabas';
      if (cond === 'Occasion Certifiée') return 'Certified Pre-owned';
    }
    return cond;
  };

  const getBrandName = (brand: ProductCategory) => {
    if (language === 'ar') {
      if (brand === 'Apple') return 'آبل';
      if (brand === 'Samsung') return 'سامسونغ';
      if (brand === 'Redmi') return 'ريدمي';
      if (brand === 'Realme') return 'ريلمي';
      if (brand === 'Smart Watch') return 'ساعات ذكية';
    }
    return brand;
  };

  return (
    <section id="garantie" className="border-y border-line bg-[#f8f8f9] py-24 text-[#0c0c0d] md:py-32">
      <div className="container-shell">
        <span className="font-mono text-[10px] uppercase tracking-[.18em] text-muted">
          {t('scan.badge')}
        </span>
        <div className="mt-5 grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <h2 className="text-5xl font-semibold leading-[.94] tracking-[-.06em] text-[#0c0c0d] md:text-7xl">
              {t('scan.title')}
            </h2>
            <div className="mt-10 flex flex-col gap-2.5" role="tablist" aria-label="États des appareils">
              {modeKeys.map((mode, index) => (
                <button
                  key={mode}
                  type="button"
                  role="tab"
                  aria-selected={active === mode}
                  onClick={() => setActive(mode)}
                  className={`flex min-h-16 items-center justify-between rounded-2xl px-5 text-left transition ${
                    active === mode
                      ? 'border-2 border-[#d9232e] bg-white text-[#0c0c0d] shadow-[0_8px_24px_rgba(0,0,0,0.06)]'
                      : 'border border-line bg-white/60 text-muted hover:border-ink/30 hover:bg-white'
                  }`}
                >
                  <span className="text-sm font-semibold text-[#0c0c0d]">{getConditionName(mode)}</span>
                  <span className="font-mono text-[10px] text-muted">0{index + 1}</span>
                </button>
              ))}
            </div>
          </div>
          <div key={active} className="reveal rounded-[32px] border border-line bg-white p-7 shadow-[0_16px_40px_rgba(0,0,0,0.04)] md:p-10">
            <div className="flex items-center justify-between">
              <span className="chip border-line bg-[#f0f0f2] text-muted shadow-none">
                Mode 0{activeIndex + 1} · {getConditionName(active)}
              </span>
              <PixelIcon variant={activeIndex} dark={true} />
            </div>
            <h3 className="mt-10 text-3xl font-semibold tracking-[-.04em] text-[#0c0c0d]">
              {getConditionName(active)}
            </h3>
            <p className="mt-3 max-w-lg text-base leading-7 text-muted">{detail.intro}</p>
            <div className="mt-10 grid gap-3">
              {detail.points.map((point) => (
                <div key={point} className="flex items-center gap-3 border-b border-line pb-3 text-sm font-medium text-[#0c0c0d]">
                  <Check size={16} className="shrink-0 text-[#d9232e]" />
                  {point}
                </div>
              ))}
            </div>
            <div className="mt-10 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-line bg-[#f8f8f9] p-4">
                <span className="font-mono text-[9px] uppercase text-muted">{t('scan.warranty')}</span>
                <p className="mt-2 text-sm font-semibold text-[#0c0c0d]">{detail.warranty}</p>
              </div>
              <div className="rounded-2xl border border-line bg-[#f8f8f9] p-4">
                <span className="font-mono text-[9px] uppercase text-muted">{t('scan.included')}</span>
                <p className="mt-2 text-sm font-semibold text-[#0c0c0d]">{detail.accessories}</p>
              </div>
            </div>
            <a
              href="#catalogue"
              onClick={() => onSelectConditionFilter?.(active)}
              className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#0c0c0d] px-5 text-xs font-semibold text-white transition hover:bg-[#d9232e]"
            >
              {t('scan.viewModels')} {getConditionName(active)}
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
        <div className="mt-16 grid grid-cols-2 overflow-hidden rounded-2xl border border-line bg-white shadow-sm sm:grid-cols-5">
          {brands.map((brand, index) => (
            <a
              key={brand}
              href="#catalogue"
              onClick={() => onSelectBrandFilter?.(brand)}
              className={`flex min-h-24 flex-col items-center justify-center gap-3 border-line p-4 transition hover:bg-[#f2f2f4] ${
                index === brands.length - 1
                  ? 'max-sm:col-span-2'
                  : 'max-sm:border-b max-sm:[&:nth-child(odd)]:border-r sm:border-r'
              }`}
            >
              <PixelIcon variant={index} dark={true} />
              <span className="text-center text-xs font-semibold text-[#0c0c0d]">{getBrandName(brand)}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
