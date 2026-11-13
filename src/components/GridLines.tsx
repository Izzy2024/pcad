'use client';

/**
 * Rejilla editorial de 12 columnas.
 * Valores tomados del sistema original: margen 4.26667vw, columna 5.17778vw,
 * gutter 2.66667vw — el mismo paso que usa el sitio de referencia.
 */
const MARGIN = 4.26667;
const COLUMN = 5.17778;
const GUTTER = 2.66667;
const PITCH = COLUMN + GUTTER;

const COLS = Array.from({ length: 13 }, (_, i) => MARGIN + i * PITCH);

export default function GridLines() {
  return (
    <div className="grid-lines hidden lg:block" aria-hidden="true">
      {COLS.map((left) => (
        <span key={left} style={{ left: `${left}%` }} />
      ))}
    </div>
  );
}

export { COLS as GRID_COLUMNS };
