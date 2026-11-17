interface PixelIconProps {
  variant?: number;
  dark?: boolean;
}

const PATTERNS: ReadonlyArray<ReadonlyArray<number>> = [
  [1, 3, 4, 5, 7],
  [0, 2, 4, 6, 8],
  [0, 1, 2, 4, 7],
  [1, 3, 4, 5, 6, 8],
  [0, 1, 3, 4, 5, 7, 8],
];

export function PixelIcon({ variant = 0, dark = false }: PixelIconProps) {
  const activeSet = PATTERNS[variant % PATTERNS.length];
  return (
    <span aria-hidden="true" className="grid grid-cols-3 gap-[2px]">
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((pixel) => (
        <i
          key={pixel}
          className={`size-1.5 rounded-[1px] ${
            activeSet.includes(pixel)
              ? 'bg-[#d9232e]'
              : dark
                ? 'bg-black/12'
                : 'bg-white/18'
          }`}
          style={{ animation: `pixel-glint ${1.8 + pixel * 0.13}s ease-in-out infinite` }}
        />
      ))}
    </span>
  );
}
