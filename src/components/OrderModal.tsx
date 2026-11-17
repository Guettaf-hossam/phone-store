import { MessageCircle, Store, Truck, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { STORE_INFO } from '@/data/store';
import { Product } from '@/types';
import { buildWhatsAppUrl, formatDzd } from '@/utils/formatting';

interface OrderModalProps {
  product: Product | null;
  onClose: () => void;
}

export function OrderModal({ product, onClose }: OrderModalProps) {
  const { t, language } = useLanguage();
  const [storage, setStorage] = useState(product?.storages[0] ?? '');
  const [color, setColor] = useState(product?.colors[0]?.name ?? '');
  const [deliveryType, setDeliveryType] = useState<'bazar' | '58'>('bazar');
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!product) return;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [product, onClose]);

  if (!product) return null;
  const activeStorage = product.storages.includes(storage) ? storage : product.storages[0];
  const activeColor = product.colors.some((item) => item.name === color) ? color : product.colors[0]?.name ?? 'Standard';

  const deliveryLabel = deliveryType === 'bazar' ? t('modal.pickupBazar') : t('modal.delivery58');
  const displayName = language === 'ar' && product.nameAr ? product.nameAr : product.name;
  const displayWarranty = language === 'ar' && product.warrantyAr ? product.warrantyAr : product.warranty;

  const buildOrderMessage = () => {
    if (language === 'ar') {
      return [
        'السلام عليكم *بلانت فون*، أود تأكيد طلب الهاتف / المنتج التالي :',
        `• الموديل : *${displayName}*`,
        `• الحالة : *${product.condition}*`,
        `• السعة / الخيار : *${activeStorage}*`,
        `• اللون / الإصدار : *${activeColor}*`,
        `• طريقة الاستلام : *${deliveryLabel}*`,
        `• السعر المعلن : *${formatDzd(product.priceDzd, language)}*`,
      ].join('\n');
    }
    if (language === 'en') {
      return [
        'Salam *PLANET PHONE*, I would like to reserve the following device :',
        `• Model : *${product.name}*`,
        `• Condition : *${product.condition}*`,
        `• Storage / Option : *${activeStorage}*`,
        `• Color : *${activeColor}*`,
        `• Delivery method : *${deliveryLabel}*`,
        `• Displayed price : *${formatDzd(product.priceDzd, language)}*`,
      ].join('\n');
    }
    return [
      'Salam *PLANET PHONE*, je souhaite réserver :',
      `• Modèle : *${product.name}*`,
      `• État : *${product.condition}*`,
      `• Stockage / option : *${activeStorage}*`,
      `• Couleur : *${activeColor}*`,
      `• Livraison : *${deliveryLabel}*`,
      `• Prix affiché : *${formatDzd(product.priceDzd, language)}*`,
    ].join('\n');
  };

  const href = buildWhatsAppUrl(STORE_INFO.whatsappNumber, buildOrderMessage());

  return (
    <div
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[80] grid place-items-end bg-black/65 p-0 backdrop-blur-sm sm:place-items-center sm:p-5"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-title"
        className="max-h-[94vh] w-full overflow-y-auto rounded-t-[32px] bg-paper text-start shadow-2xl reveal sm:max-w-2xl sm:rounded-[32px]"
      >
        {product.image && (
          <div className="relative overflow-hidden rounded-t-[32px] sm:rounded-t-[32px]">
            <img
              src={product.image}
              alt={displayName}
              className="h-64 w-full object-cover sm:h-80"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label={t('modal.closeAria')}
              className="absolute end-4 top-4 grid size-10 place-items-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60"
            >
              <X size={18} />
            </button>
            <div className="absolute bottom-4 start-5">
              <span className="font-mono text-[9px] uppercase tracking-[.14em] text-white/60">
                {t('modal.liveConfig')}
              </span>
              <h2 id="order-title" className="mt-0.5 text-2xl font-semibold tracking-[-.05em] text-white drop-shadow">
                {displayName}
              </h2>
              <p className="mt-0.5 text-xs text-white/70">
                {product.condition} · {displayWarranty}
              </p>
            </div>
          </div>
        )}
        <div className={`p-5 sm:p-8 ${!product.image ? 'pt-5' : ''}`}>
        {!product.image && (
          <div className="flex items-start justify-between">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-[.14em] text-muted">
                {t('modal.liveConfig')}
              </span>
              <h2 id="order-title" className="mt-2 text-3xl font-semibold tracking-[-.05em]">
                {displayName}
              </h2>
              <p className="mt-1 text-xs text-muted">
                {product.condition} · {displayWarranty}
              </p>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label={t('modal.closeAria')}
              className="grid size-11 shrink-0 place-items-center rounded-full border border-line hover:bg-white"
            >
              <X size={18} />
            </button>
          </div>
        )}

          <OptionGroup label={t('modal.storage')}>
            {product.storages.map((item) => (
              <Option key={item} active={activeStorage === item} onClick={() => setStorage(item)}>
                {item}
              </Option>
            ))}
          </OptionGroup>

          <OptionGroup label={t('modal.color')}>
            {product.colors.map((item) => (
              <Option key={item.name} active={activeColor === item.name} onClick={() => setColor(item.name)}>
                <i className="size-3 rounded-full border border-black/15" style={{ backgroundColor: item.hex }} />
                {item.name}
              </Option>
            ))}
          </OptionGroup>

          <OptionGroup label={t('modal.pickup')}>
            <Option active={deliveryType === 'bazar'} onClick={() => setDeliveryType('bazar')}>
              <Store size={15} />
              {t('modal.pickupBazar')}
            </Option>
            <Option active={deliveryType === '58'} onClick={() => setDeliveryType('58')}>
              <Truck size={15} />
              {t('modal.delivery58')}
            </Option>
          </OptionGroup>

          <div className="mt-8 flex items-center justify-between border-y border-line py-5">
            <span className="text-xs text-muted">{t('modal.displayedPrice')}</span>
            <bdi dir="ltr" className="text-2xl font-bold tracking-[-.04em] text-ink">
              {formatDzd(product.priceDzd, language)}
            </bdi>
          </div>

          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="mt-5 flex min-h-14 items-center justify-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-white transition hover:bg-[#242428]"
          >
            <MessageCircle size={18} />
            {t('modal.whatsappBtn')}
          </a>
        </div>
      </div>
    </div>
  );
}

function OptionGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <fieldset className="mt-7">
      <legend className="mb-3 font-mono text-[9px] uppercase tracking-[.14em] text-muted">{label}</legend>
      <div className="flex flex-wrap gap-2">{children}</div>
    </fieldset>
  );
}

function Option({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-11 items-center gap-2 rounded-full px-4 text-xs transition ${
        active ? 'bg-ink text-white' : 'border border-line bg-white/50 text-ink hover:border-ink'
      }`}
    >
      {children}
    </button>
  );
}
