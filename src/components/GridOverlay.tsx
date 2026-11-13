'use client';

/** Rejilla superpuesta sobre una imagen o superficie oscura (hero). */
const MARGIN = 4.26667;
const COLUMN = 5.17778;
const GUTTER = 2.66667;
const PITCH = COLUMN + GUTTER;
const COLS = Array.from({ length: 13 }, (_, i) => MARGIN + i * PITCH);

export default function GridOverlay({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const line = tone === 'light' ? 'rgba(255, 247, 233, 0.30)' : 'rgba(76, 40, 6, 0.16)';
  const strong = tone === 'light' ? 'rgba(255, 247, 233, 0.34)' : 'rgba(76, 40, 6, 0.20)';

  return (
    <div className="pointer-events-none absolute inset-0 z-[5] hidden lg:block" aria-hidden="true">
      {COLS.map((left, i) => (
        <span
          key={left}
          className="absolute top-0 h-full w-px"
          style={{
            left: `${left}%`,
            background: i === 0 || i === COLS.length - 1 ? strong : line,
          }}
        />
      ))}
      {/* horizontales: las dos bandas que enmarcan los datos del hero */}
      <span className="absolute inset-x-0 top-[29.9%] h-px" style={{ background: strong }} />
      <span className="absolute inset-x-0 top-[70%] h-px" style={{ background: strong }} />
    </div>
  );
}
