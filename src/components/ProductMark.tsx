interface ProductMarkProps {
  className?: string;
  label?: boolean;
}

export function ProductMark({ className = '', label = false }: ProductMarkProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 48 48" fill="none" className="h-full w-full shrink-0" role="img" aria-label="Planet Phone">
        <defs>
          <radialGradient id="pp-orb" cx="32%" cy="24%" r="72%">
            <stop offset="0%" stopColor="#2a2a30" />
            <stop offset="58%" stopColor="#0c0c0d" />
            <stop offset="100%" stopColor="#050506" />
          </radialGradient>
        </defs>
        <circle cx="24" cy="24" r="23" fill="url(#pp-orb)" stroke="rgba(255,255,255,0.22)" strokeWidth="1.2" />
        <path
          d="M6.2 28.4C5.5 24.7 12.6 19.6 22.4 17.1C32.2 14.5 40.9 15.5 41.8 19.1"
          stroke="#d9232e"
          strokeOpacity="0.42"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <rect x="17.5" y="10" width="13" height="28" rx="3.8" fill="#f4f4f5" stroke="#0c0c0d" strokeWidth="1.3" />
        <rect x="21.5" y="12.2" width="5" height="1.4" rx="0.7" fill="#0c0c0d" />
        <rect x="19.6" y="15" width="8.8" height="18.5" rx="1.6" fill="#0c0c0d" />
        <path
          d="M19.6 25.5L28.4 19.2V31.9C28.4 32.8 27.7 33.5 26.8 33.5H21.2C20.3 33.5 19.6 32.8 19.6 31.9V25.5Z"
          fill="#d9232e"
        />
        <path
          d="M41.8 19.1C42.6 22.8 35.5 27.9 25.6 30.5C15.8 33 7.1 32 6.2 28.4"
          stroke="#d9232e"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
        <circle cx="37.8" cy="25.2" r="2.2" fill="#d9232e" stroke="#f4f4f5" strokeWidth="0.9" />
      </svg>
      {label && <strong className="text-sm tracking-[-.03em] text-white">PLANET PHONE</strong>}
    </span>
  );
}
