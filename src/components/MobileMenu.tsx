import { ArrowUpRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { STORE_INFO } from '@/data/store';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const links = [
  ['01', 'Catalogue', '#catalogue'],
  ['02', 'Reprise', '#reprise'],
  ['03', 'Ooredoo', '#ooredoo'],
  ['04', 'Garantie', '#garantie'],
  ['05', 'FAQ', '#faq'],
  ['06', 'Instagram', STORE_INFO.instagramUrl],
  ['07', 'Facebook', STORE_INFO.facebookUrl],
] as const;

export function MobileMenu({ open, onClose, triggerRef }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const firstLink = menuRef.current?.querySelector<HTMLAnchorElement>('a');
    firstLink?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        triggerRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (
        target &&
        !menuRef.current?.contains(target) &&
        !triggerRef.current?.contains(target)
      ) {
        onClose();
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open, onClose, triggerRef]);

  if (!open) return null;

  return (
    <div
      ref={menuRef}
      id="site-menu"
      role="region"
      aria-label="Menu du magasin"
      className="absolute left-0 right-0 top-[calc(100%+10px)] overflow-hidden rounded-[28px] border border-white/12 bg-[#171719]/96 p-2.5 shadow-[0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur-2xl reveal"
    >
      <div className="grid gap-1 sm:grid-cols-2">
        {links.map(([code, label, href]) => {
          const external = href.startsWith('http');
          return (
            <a
              key={label}
              href={href}
              onClick={onClose}
              target={external ? '_blank' : undefined}
              rel={external ? 'noreferrer' : undefined}
              className="group flex min-h-13 items-center justify-between rounded-[18px] px-4 text-sm font-medium text-white/82 transition hover:bg-white/10 hover:text-white"
            >
              <span className="flex items-center gap-3">
                <span className="font-mono text-[10px] text-white/35">{code}</span>
                <span>{label}</span>
              </span>
              <ArrowUpRight
                size={15}
                className={`text-white/40 transition-transform duration-200 group-hover:text-white ${
                  external ? 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5' : 'group-hover:rotate-45'
                }`}
              />
            </a>
          );
        })}
      </div>
      <div className="mt-2 flex items-center justify-between rounded-[18px] border border-white/8 bg-white/[0.04] px-4 py-3 font-mono text-[10px] uppercase tracking-[0.12em] text-white/48">
        <span>Bazar Dubai · La Cité Ouest, Bouira</span>
        <span className="text-[#ef5b64]">Sam – Jeu · 09h–20h</span>
      </div>
    </div>
  );
}
