import Link from 'next/link';
import { PILLARS } from '@/lib/content';
import Reveal from '@/components/Reveal';

export default function Pillars() {
  return (
    <section className="relative bg-beige py-20 md:py-32">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-16">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="t-mono mb-5 text-brand-deep/45">Qué hacemos</p>
              <h2 className="t-display max-w-[16ch] text-[clamp(34px,4.4vw,62px)] leading-[1.02] text-brand-deep">
                Un socio para todo el ciclo del proyecto
              </h2>
            </div>
            <p className="max-w-[42ch] text-[15px] leading-[1.55] text-brand-deep/65">
              Potenciamos tu negocio con soluciones tecnológicas de vanguardia: desde la licencia
              hasta la implementación, la formación y el acompañamiento en obra.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-lg bg-brand-deep/12 md:mt-20 md:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <Reveal key={p.n} delay={i * 90}>
              <Link
                href={p.href}
                className="group relative flex h-full min-h-[400px] flex-col justify-between overflow-hidden bg-beige p-7 transition-colors duration-500 hover:bg-[#FBF1DF] md:min-h-[440px] md:p-8"
              >
                <div className="relative z-10 flex items-start justify-between">
                  <span className="t-mono text-brand-deep/40">{p.n}</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-deep/20 transition-all duration-500 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M1 11L11 1M11 1H3.5M11 1v7.5" stroke="currentColor" strokeWidth="1.3" />
                    </svg>
                  </span>
                </div>

                <div className="relative z-10 mt-10">
                  <img
                    src={p.image}
                    alt=""
                    className="mb-6 h-[130px] w-full rounded-md object-cover opacity-90 transition-transform duration-[900ms] ease-smooth group-hover:scale-[1.04] md:h-[150px]"
                  />
                  <h3 className="t-display text-[26px] leading-[1.1] text-brand-deep md:text-[30px]">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.5] text-brand-deep/60">{p.body}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
