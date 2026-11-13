'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Reveal from '@/components/Reveal';

const STEPS = [
  {
    n: '01',
    eyebrow: 'Descubrir',
    title: 'Encuentra tu herramienta',
    copy: 'Explora el catálogo por fabricante y por disciplina. Te ayudamos a comparar ediciones, licencias y requerimientos reales de tu equipo antes de comprar.',
    cta: { label: 'Ver catálogo', href: '/software' },
    image: '/img/skyline.jpg',
  },
  {
    n: '02',
    eyebrow: 'Implementar',
    title: 'Ponemos el método a trabajar',
    copy: 'Implementación BIM bajo ISO 19650, plantillas, estándares y flujos de trabajo. Configuramos tus herramientas para que produzcan desde el primer día.',
    cta: { label: 'Ver servicios', href: '/servicios' },
    image: '/img/pillar-bim.png',
  },
  {
    n: '03',
    eyebrow: 'Capacitar',
    title: 'Tu equipo, certificado',
    copy: 'Cursos presenciales dictados por instructores certificados que trabajan en proyectos reales. Certificación internacional avalada por Certiport.',
    cta: { label: 'Ver cursos', href: '/cursos' },
    image: '/img/pillar-training.png',
  },
  {
    n: '04',
    eyebrow: 'Sostener',
    title: 'Acompañamiento en obra',
    copy: 'Consultoría continua, soporte técnico y gestión documental. Seguimos ahí cuando el proyecto entra en ejecución.',
    cta: { label: 'Hablar con un especialista', href: '/contacto' },
    image: '/img/pillar-consulting.png',
  },
];

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = wrapRef.current;
      if (!el) return;
      const start = el.offsetTop - 80;
      const total = el.offsetHeight - window.innerHeight;
      const p = (window.scrollY - start) / total;
      setPinned(p > 0 && p < 1);
      const idx = Math.floor(Math.min(Math.max(p, 0), 0.999) * STEPS.length);
      setActive(Math.min(idx, STEPS.length - 1));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section ref={wrapRef} className="relative bg-beige" style={{ height: `${STEPS.length * 100}vh` }}>
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-6 md:grid-cols-[1fr_1fr] md:items-center md:gap-20 md:px-16">
          <div>
            <p className="t-mono mb-8 text-brand-deep/45">Cómo funciona</p>

            <div className="relative">
              {STEPS.map((s, i) => (
                <div
                  key={s.n}
                  className="transition-all duration-700 ease-smooth"
                  style={{
                    display: active === i ? 'block' : 'none',
                  }}
                >
                  <div className="flex items-center gap-4">
                    <span className="t-mono text-brand">{s.n}</span>
                    <span className="t-mono text-brand-deep/45">{s.eyebrow}</span>
                  </div>
                  <h3 className="t-display mt-4 text-[clamp(32px,3.6vw,54px)] leading-[1.02] text-brand-deep">
                    {s.title}
                  </h3>
                  <p className="mt-5 max-w-[46ch] text-[15px] leading-[1.55] text-brand-deep/65 md:text-[16px]">
                    {s.copy}
                  </p>
                  <Link
                    href={s.cta.href}
                    className="mt-7 inline-flex items-center gap-2 border-b border-brand-deep/30 pb-1 text-[14px] text-brand-deep transition-colors hover:border-brand hover:text-brand"
                  >
                    {s.cta.label}
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M1 11L11 1M11 1H3.5M11 1v7.5" stroke="currentColor" strokeWidth="1.3" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>

            <div className="mt-12 flex items-center gap-2">
              {STEPS.map((s, i) => (
                <button
                  key={s.n}
                  onClick={() => {
                    const el = wrapRef.current;
                    if (!el) return;
                    const start = el.offsetTop - 80;
                    const total = el.offsetHeight - window.innerHeight;
                    window.scrollTo({ top: start + (total * (i + 0.5)) / STEPS.length, behavior: 'smooth' });
                  }}
                  aria-label={`Paso ${s.n}`}
                  className={`h-[3px] rounded-full transition-all duration-500 ${
                    active === i ? 'w-12 bg-brand' : 'w-6 bg-brand-deep/20 hover:bg-brand-deep/40'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-[#EFE3CD] md:aspect-[5/6]">
            {STEPS.map((s, i) => (
              <img
                key={s.n}
                src={s.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-all duration-[1100ms] ease-smooth"
                style={{
                  opacity: active === i ? 1 : 0,
                  transform: active === i ? 'scale(1)' : 'scale(1.06)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
