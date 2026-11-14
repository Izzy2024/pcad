'use client';

/**
 * Las dos líneas horizontales que enmarcan la banda de datos del hero.
 * Son las únicas que existen en la referencia (medidas en y=269 y y=624
 * sobre 900px de alto → 29.9% y 69.3%). No hay rejilla vertical sobre la
 * imagen: las verticales que se ven en la original son los bordes del
 * panel flotante, no líneas de rejilla.
 */
export default function GridOverlay({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const line = tone === 'light' ? 'rgba(255, 247, 233, 0.30)' : 'rgba(76, 40, 6, 0.16)';

  return (
    <div className="pointer-events-none absolute inset-0 z-[5] hidden lg:block" aria-hidden="true">
      <span className="absolute inset-x-0 top-[29.9%] h-px" style={{ background: line }} />
      <span className="absolute inset-x-0 top-[69.3%] h-px" style={{ background: line }} />
    </div>
  );
}
