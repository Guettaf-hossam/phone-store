import { MessageCircle, Store, Truck, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { STORE_INFO } from '@/data/store';
import { DeliveryMethod, Product } from '@/types';
import { buildWhatsAppUrl, formatDzd } from '@/utils/formatting';

interface OrderModalProps { product: Product | null; onClose: () => void; }
const DELIVERY_METHODS: DeliveryMethod[] = ['Retrait Bazar Dubai, Bouira', 'Livraison 58 Wilayas'];

export function OrderModal({ product, onClose }: OrderModalProps) {
  const [storage, setStorage] = useState(product?.storages[0] ?? '');
  const [color, setColor] = useState(product?.colors[0]?.name ?? '');
  const [delivery, setDelivery] = useState<DeliveryMethod>(DELIVERY_METHODS[0]);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!product) return;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', onKey); };
  }, [product, onClose]);

  if (!product) return null;
  const activeStorage = product.storages.includes(storage) ? storage : product.storages[0];
  const activeColor = product.colors.some((item) => item.name === color) ? color : product.colors[0]?.name ?? 'Standard';
  const message = [
    'Salam *PLANET PHONE*, je souhaite réserver :',
    `• Modèle : *${product.name}*`,
    `• État : *${product.condition}*`,
    `• Stockage / option : *${activeStorage}*`,
    `• Couleur : *${activeColor}*`,
    `• Livraison : *${delivery}*`,
    `• Prix affiché : *${formatDzd(product.priceDzd)}*`,
  ].join('\n');
  const href = buildWhatsAppUrl(STORE_INFO.whatsappNumber, message);

  return (
    <div role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }} className="fixed inset-0 z-[80] grid place-items-end bg-black/65 p-0 backdrop-blur-sm sm:place-items-center sm:p-5">
      <div role="dialog" aria-modal="true" aria-labelledby="order-title" className="max-h-[94vh] w-full overflow-y-auto rounded-t-[32px] bg-paper p-5 shadow-2xl reveal sm:max-w-2xl sm:rounded-[32px] sm:p-8">
        <div className="flex items-start justify-between">
          <div><span className="font-mono text-[9px] uppercase tracking-[.14em] text-muted">Configuration live</span><h2 id="order-title" className="mt-2 text-3xl font-semibold tracking-[-.05em]">{product.name}</h2><p className="mt-1 text-xs text-muted">{product.condition} · {product.warranty}</p></div>
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Fermer la configuration" className="grid size-11 shrink-0 place-items-center rounded-full border border-line hover:bg-white"><X size={18} /></button>
        </div>
        <OptionGroup label="Stockage / option">{product.storages.map((item) => <Option key={item} active={activeStorage === item} onClick={() => setStorage(item)}>{item}</Option>)}</OptionGroup>
        <OptionGroup label="Couleur">{product.colors.map((item) => <Option key={item.name} active={activeColor === item.name} onClick={() => setColor(item.name)}><i className="size-3 rounded-full border border-black/15" style={{ backgroundColor: item.hex }} />{item.name}</Option>)}</OptionGroup>
        <OptionGroup label="Récupération">{DELIVERY_METHODS.map((item) => <Option key={item} active={delivery === item} onClick={() => setDelivery(item)}>{item.startsWith('Retrait') ? <Store size={15} /> : <Truck size={15} />}{item}</Option>)}</OptionGroup>
        <div className="mt-8 flex items-center justify-between border-y border-line py-5"><span className="text-xs text-muted">Prix affiché</span><strong className="text-2xl tracking-[-.04em]">{formatDzd(product.priceDzd)}</strong></div>
        <a href={href} target="_blank" rel="noreferrer" className="mt-5 flex min-h-14 items-center justify-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-white transition hover:bg-[#242428]"><MessageCircle size={18} />Continuer sur WhatsApp</a>
      </div>
    </div>
  );
}

function OptionGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return <fieldset className="mt-7"><legend className="mb-3 font-mono text-[9px] uppercase tracking-[.14em] text-muted">{label}</legend><div className="flex flex-wrap gap-2">{children}</div></fieldset>;
}

function Option({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return <button type="button" onClick={onClick} className={`flex min-h-11 items-center gap-2 rounded-full px-4 text-xs transition ${active ? 'bg-ink text-white' : 'border border-line bg-white/50 text-ink hover:border-ink'}`}>{children}</button>;
}
