import { ArrowUpRight } from 'lucide-react';
import { ReactNode } from 'react';

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
}

export function PrimaryButton({ href, children }: ButtonLinkProps) {
  return (
    <a
      href={href}
      className="group relative inline-flex min-h-14 items-center rounded-full p-px shadow-[0_14px_34px_rgba(0,0,0,0.34)] transition duration-200 hover:-translate-y-0.5 iri-gradient"
    >
      <span className="flex h-full min-h-[54px] items-center gap-4 rounded-full bg-ink ps-6 pe-2 py-1.5 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
        {children}
        <span className="grid size-10 place-items-center rounded-full bg-white text-ink transition-transform duration-300 ease-out group-hover:rotate-45">
          <ArrowUpRight size={17} />
        </span>
      </span>
    </a>
  );
}

export function SecondaryButton({ href, children }: ButtonLinkProps) {
  return (
    <a
      href={href}
      className="inline-flex min-h-14 items-center rounded-full border border-white/25 bg-silver/16 px-6 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.24)] backdrop-blur-md transition duration-200 hover:border-white/40 hover:bg-white/22"
    >
      {children}
    </a>
  );
}
