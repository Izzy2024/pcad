'use client';
import { useEffect, useRef, useState } from 'react';

/**
 * Pilares con celdas que crecen al entrar en viewport.
 *
 * Mecanismo copiado de la referencia (godaylight.com, sección `.usp-item`):
 * cada fila es un grid asimétrico [lateral | texto | lateral]; el bloque de
 * color de la celda lateral crece de 0% a 100% de su alto mientras la fila
 * cruza el viewport, y la tarjeta interior sube (translateY) y se asienta.
 * El texto central entra con fade y se atenúa al salir.
 */

const ITEMS = [
  {
    eyebrow: 'Software',
    title: 'Catálogo por fabricante',
    body: 'Autodesk, Bentley, Oracle, Adobe, CSI, SketchUp, Chaos y más. Te ayudamos a comparar ediciones y licencias antes de comprar.',
    href: '/software',
    cta: 'Ver catálogo',
    image: '/img/skyline.jpg',
    tint: '#D7E3F4',
  },
  {
    eyebrow: 'Hardware',
    title: 'Plotters y workstations',
    body: 'Plotters HP de gran formato y laptops MSI para modelado, render y trabajo en campo, con asesoría real de rendimiento.',
    href: '/hardware',
    cta: 'Ver equipos',
    image: '/img/pillar-management.png',
    tint: '#F2E3C9',
  },
  {
    eyebrow: 'Capacitación',
    title: 'Centro autorizado',
    body: 'Cursos presenciales dictados por instructores certificados que trabajan en proyectos reales. Certificado incluido.',
    href: '/cursos',
    cta: 'Ver cursos',
    image: '/img/pillar-training.png',
    tint: '#DAE7EE',
  },
  {
    eyebrow: 'Consultoría BIM',
    title: 'Implementación ISO 19650',
    body: 'Estándares, plantillas y flujos de información para todo el ciclo del proyecto, con acompañamiento en obra.',
    href: '/servicios',
    cta: 'Ver servicios',
    image: '/img/consulting.png',
    tint: '#E7E1D3',
  },
];

function Row({ item, index }: { item: (typeof ITEMS)[number]; index: number }) {
  const rowRef = useRef<HTMLLIElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 cuando el borde superior de la fila toca el fondo del viewport,
      // 1 cuando el borde inferior sale por arriba.
      const total = vh + r.height;
      const passed = vh - r.top;
      setP(Math.min(Math.max(passed / total, 0), 1));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // la celda se abre en la primera mitad del recorrido
  const open = Math.min(Math.max((p - 0.12) / 0.45, 0), 1);
  const ease = 1 - Math.pow(1 - open, 3);
  // la tarjeta sube y se asienta
  const rise = Math.min(Math.max((p - 0.2) / 0.45, 0), 1);
  const riseEase = 1 - Math.pow(1 - rise, 3);

  const side = index % 2 === 0 ? 'left' : 'right';

  return (
    <li
      ref={rowRef}
      className="grid grid-cols-1 border-b border-brand-deep/12 lg:grid-cols-[calc(5*var(--col)+4*var(--gut))_1fr_calc(5*var(--col)+4*var(--gut))]"
    >
      {/* celda lateral izquierda */}
      <div className="relative hidden overflow-hidden lg:block lg:order-1">
        {side === 'left' && (
          <>
            <div
              className="absolute inset-x-0 bottom-0"
              style={{ height: `${ease * 100}%`, background: item.tint }}
            />
            <div
              className="absolute inset-0 flex items-center justify-center px-7"
              style={{ transform: `translateY(${(1 - riseEase) * 22}%)`, opacity: riseEase }}
            >
              <div className="w-full overflow-hidden rounded-lg shadow-[0_10px_40px_rgba(76,40,6,0.12)]">
                <img src={item.image} alt="" className="h-[190px] w-full object-cover" />
              </div>
            </div>
          </>
        )}
      </div>

      {/* centro: texto */}
      <div className="order-1 flex flex-col items-center justify-center px-6 py-16 text-center lg:order-2 lg:py-24">
        <p
          className="t-mono text-brand-deep/45 transition-opacity duration-500"
          style={{ opacity: 0.3 + riseEase * 0.7 }}
        >
          {item.eyebrow}
        </p>
        <h3 className="t-display mt-5 max-w-[18ch] text-[clamp(26px,3.2vw,42px)] leading-[1.05] text-brand-deep">
          {item.title}
        </h3>
        <p
          className="mt-5 max-w-[46ch] text-[14.5px] leading-[1.6] text-brand-deep/60 transition-opacity duration-500"
          style={{ opacity: 0.25 + riseEase * 0.75 }}
        >
          {item.body}
        </p>
        <a
          href={item.href}
          className="mt-7 inline-flex items-center gap-2 border-b border-brand-deep/30 pb-1 text-[14px] text-brand-deep transition-colors hover:border-brand hover:text-brand"
        >
          {item.cta}
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M1 11L11 1M11 1H3.5M11 1v7.5" stroke="currentColor" strokeWidth="1.3" />
          </svg>
        </a>
      </div>

      {/* celda lateral derecha */}
      <div className="relative hidden overflow-hidden lg:block lg:order-3">
        {side === 'right' && (
          <>
            <div
              className="absolute inset-x-0 bottom-0"
              style={{ height: `${ease * 100}%`, background: item.tint }}
            />
            <div
              className="absolute inset-0 flex items-center justify-center px-7"
              style={{ transform: `translateY(${(1 - riseEase) * 22}%)`, opacity: riseEase }}
            >
              <div className="w-full overflow-hidden rounded-lg shadow-[0_10px_40px_rgba(76,40,6,0.12)]">
                <img src={item.image} alt="" className="h-[190px] w-full object-cover" />
              </div>
            </div>
          </>
        )}
      </div>

      {/* móvil: imagen propia debajo del texto */}
      <div className="order-2 overflow-hidden lg:hidden">
        <div className="relative mx-6 mb-10 overflow-hidden rounded-lg" style={{ background: item.tint }}>
          <img
            src={item.image}
            alt=""
            className="h-[180px] w-full object-cover"
            style={{ transform: `translateY(${(1 - riseEase) * 14}%) scale(${1.04 - riseEase * 0.04})` }}
          />
        </div>
      </div>
    </li>
  );
}

export default function PillarExpand() {
  return (
    <section
      className="relative bg-beige"
      style={{ ['--col' as string]: '5.17778vw', ['--gut' as string]: '2.66667vw' }}
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 pt-16 md:px-16 md:pt-24">
        <div className="flex flex-col gap-5 pb-10 md:flex-row md:items-end md:justify-between md:pb-14">
          <div>
            <p className="t-mono mb-4 text-brand-deep/45">Qué hacemos</p>
            <h2 className="t-display max-w-[16ch] text-[clamp(30px,4vw,54px)] leading-[1.02] text-brand-deep">
              Un socio para todo el ciclo del proyecto
            </h2>
          </div>
          <p className="max-w-[40ch] text-[14.5px] leading-[1.55] text-brand-deep/60">
            Cuatro frentes que trabajan juntos: desde la licencia hasta el acompañamiento en obra.
          </p>
        </div>
      </div>

      <ul>
        {ITEMS.map((item, i) => (
          <Row key={item.eyebrow} item={item} index={i} />
        ))}
      </ul>
    </section>
  );
}
