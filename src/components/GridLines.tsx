'use client';

/**
 * Rejilla de referencia: en el sitio original no hay una retícula global
 * de columnas. Las líneas visibles son bordes de tarjetas y paneles.
 * Se conserva este componente sin líneas verticales para no añadir ruido;
 * se mantiene el export de columnas por si alguna sección lo necesita.
 */
const MARGIN = 4.26667;
const COLUMN = 5.17778;
const GUTTER = 2.66667;
const PITCH = COLUMN + GUTTER;
const COLS = Array.from({ length: 13 }, (_, i) => MARGIN + i * PITCH);

export default function GridLines() {
  return null;
}

export { COLS as GRID_COLUMNS };
