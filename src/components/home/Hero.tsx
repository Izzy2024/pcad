'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import GridOverlay from '@/components/GridOverlay';

const MARQUEE = [
  'Autodesk', 'Bentley Systems', 'Oracle', 'Adobe', 'CSI Software', 'SketchUp',
  'Chaos', 'Microsoft 365', 'Bluebeam', 'Corel', 'Rhinoceros 3D', 'RIB Presto',
  'Transoft Solutions', 'Twinmotion', 'Esri',
];

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 140);
    const onScroll = () => setScroll(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { clearTimeout(t); window.removeEventListener('scroll', onScroll); };
  }, []);

  const p = Math.min(scroll / 900, 1);

  return (
    <section className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-[#141110]">
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: `scale(${1 + p * 0.09})` }}
      >
        <img
          src="/img/hero-architecture.jpg"
          alt="Edificio residencial contemporáneo de concreto y vegetación"
          className={`h-full w-full object-cover transition-all duration-[1600ms] ease-smooth ${
            loaded ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/75" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,transparent_8%,rgba(0,0,0,0.4)_100%)]" />
      </div>

      {/* Rejilla editorial sobre la imagen */}
      <GridOverlay tone="light" />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1440px] flex-col justify-end px-6 pb-28 md:px-16 md:pb-32">
        <p
          className={`t-mono absolute left-6 top-[120px] text-beige/65 transition-all duration-700 ease-smooth md:left-16 md:top-[145px] ${
            loaded ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
          }`}
          style={{ transitionDelay: '320ms' }}
        >
          Desde 1992 · LATAM
        </p>

        <h1 className="t-display max-w-[14ch] text-beige [font-size:clamp(44px,7.4vw,110px)] [line-height:0.95] [letter-spacing:-0.03em]">
          {['Diseñar,', 'construir,', 'operar.'].map((w, i) => (
            <span key={w} className="block overflow-hidden">
              <span
                className="block transition-all duration-[1100ms] ease-smooth"
                style={{
                  transitionDelay: `${240 + i * 120}ms`,
                  transform: loaded ? 'translateY(0)' : 'translateY(105%)',
                }}
              >
                {w}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-[1fr_auto] md:items-end md:gap-16">
          <p
            className={`max-w-[48ch] text-[15px] leading-[1.5] text-beige/85 transition-all duration-700 ease-smooth md:text-[17px] ${
              loaded ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
            }`}
            style={{ transitionDelay: '760ms' }}
          >
            Software, hardware, formación certificada y consultoría BIM para arquitectura,
            ingeniería y construcción. Un solo socio tecnológico para todo el ciclo de tu proyecto.
          </p>

          <div
            className={`flex flex-wrap items-center gap-2.5 transition-all duration-700 ease-smooth ${
              loaded ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
            }`}
            style={{ transitionDelay: '900ms' }}
          >
            <Link href="/software" className="btn bg-beige text-black hover:bg-white">
              Catálogo de productos
            </Link>
            <Link
              href="/cursos"
              className="btn btn-onphoto"
            >
              Conoce nuestros cursos
            </Link>
          </div>
        </div>

        <p
          className={`mt-7 max-w-[60ch] text-[11.5px] leading-[1.5] text-beige/60 transition-opacity duration-700 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '1050ms' }}
        >
          Proveedor autorizado de software AEC · Panamá, Costa Rica, Honduras, El Salvador y Guatemala
        </p>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 border-t border-beige/15 bg-black/20">
        <div className="overflow-hidden py-2.5">
          <div className="marquee-track">
            {[0, 1].map((k) => (
              <div key={k} className="flex shrink-0 items-center">
                {MARQUEE.map((m) => (
                  <span key={`${k}-${m}`} className="t-mono whitespace-nowrap px-5 text-beige/50">
                    {m}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
