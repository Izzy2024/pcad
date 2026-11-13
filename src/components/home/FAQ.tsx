'use client';
import { useState } from 'react';
import Link from 'next/link';
import Reveal from '@/components/Reveal';

const ITEMS = [
  {
    q: '¿Qué incluye una licencia comprada con PCCAD?',
    a: 'Cada licencia incluye activación, acompañamiento en la instalación y acceso a nuestro equipo técnico. En Autodesk y Bentley también gestionamos la migración desde suscripciones anteriores y la asignación por usuario.',
  },
  {
    q: '¿Trabajan con empresas de varios países?',
    a: 'Sí. Tenemos operación en Panamá, Costa Rica, Honduras, El Salvador y Guatemala, con equipos locales que facturan y dan soporte en cada mercado.',
  },
  {
    q: '¿En qué consiste la implementación BIM?',
    a: 'Diseñamos el estándar, las plantillas y los flujos de trabajo alineados a ISO 19650, configuramos tus herramientas y acompañamos al equipo hasta que el método queda operando sin nosotros.',
  },
  {
    q: '¿Los cursos entregan certificado?',
    a: 'Todos los cursos incluyen certificado de finalización. Además, preparamos a tus profesionales para las certificaciones internacionales de Autodesk a través de Certiport.',
  },
  {
    q: '¿Puedo capacitar a mi equipo en nuestras oficinas?',
    a: 'Sí, ofrecemos formación in-house. Adaptamos el temario, la duración y el horario al proyecto y a las herramientas que ya usa tu equipo.',
  },
  {
    q: '¿Ofrecen soporte después de la compra?',
    a: 'Sí. El soporte técnico y la consultoría continúan después de la implementación, con acuerdos de acompañamiento por proyecto o por anualidad.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative bg-beige py-20 md:py-32">
      <div className="mx-auto grid w-full max-w-[1440px] gap-12 px-6 md:grid-cols-[0.8fr_1.2fr] md:gap-24 md:px-16">
        <Reveal>
          <div className="md:sticky md:top-32">
            <p className="t-mono mb-5 text-brand-deep/45">Preguntas</p>
            <h2 className="t-display max-w-[12ch] text-[clamp(32px,3.8vw,52px)] leading-[1.04] text-brand-deep">
              Lo que suelen preguntarnos
            </h2>
            <p className="mt-6 max-w-[34ch] text-[15px] leading-[1.55] text-brand-deep/60">
              ¿No encuentras tu respuesta? Escríbenos y un especialista te contacta el mismo día.
            </p>
            <Link
              href="/contacto"
              className="mt-6 inline-flex items-center gap-2 border-b border-brand-deep/30 pb-1 text-[14px] text-brand-deep transition-colors hover:border-brand hover:text-brand"
            >
              Hablar con un especialista
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M1 11L11 1M11 1H3.5M11 1v7.5" stroke="currentColor" strokeWidth="1.3" />
              </svg>
            </Link>
          </div>
        </Reveal>

        <div className="border-t border-brand-deep/15">
          {ITEMS.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={it.q} className="border-b border-brand-deep/15">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start justify-between gap-6 py-6 text-left"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="t-mono shrink-0 text-brand-deep/35">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[17px] leading-[1.35] text-brand-deep md:text-[19px]">
                      {it.q}
                    </span>
                  </span>
                  <span className="relative mt-1 flex h-5 w-5 shrink-0 items-center justify-center">
                    <span className="absolute h-[1.5px] w-3.5 bg-brand-deep/50" />
                    <span
                      className="absolute h-3.5 w-[1.5px] bg-brand-deep/50 transition-transform duration-400 ease-smooth"
                      style={{ transform: isOpen ? 'scaleY(0)' : 'scaleY(1)' }}
                    />
                  </span>
                </button>
                <div
                  className="grid overflow-hidden transition-all duration-500 ease-smooth"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="min-h-0">
                    <p className="max-w-[62ch] pb-7 pl-0 text-[15px] leading-[1.6] text-brand-deep/65 md:pl-9">
                      {it.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
