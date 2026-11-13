import Reveal from '@/components/Reveal';

export default function Statement() {
  return (
    <section className="relative overflow-hidden bg-brand-deep py-24 text-beige md:py-40">
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
        <img src="/img/nature-architecture.jpg" alt="" className="h-full w-full object-cover" />
      </div>
      <div className="relative mx-auto w-full max-w-[1440px] px-6 md:px-16">
        <Reveal>
          <p className="t-mono mb-8 text-beige/40">La industria cambió</p>
        </Reveal>
        <Reveal delay={90}>
          <h2 className="t-display max-w-[20ch] text-[clamp(38px,6vw,92px)] leading-[0.98] tracking-[-0.03em]">
            Una herramienta nueva no transforma un proyecto. Un método sí.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 border-t border-beige/15 pt-10 md:mt-20 md:grid-cols-3 md:gap-14">
          {[
            {
              k: '30+',
              t: 'Años en la región',
              d: 'Desde 1992 acompañando a despachos, constructoras y gobiernos en la adopción de tecnología AEC.',
            },
            {
              k: '15',
              t: 'Fabricantes representados',
              d: 'La única conversación que necesitas para encontrar el software y hardware que tu proyecto requiere.',
            },
            {
              k: 'ISO 19650',
              t: 'Implementación BIM',
              d: 'Estrategias alineadas a la norma, con gestión estructurada de la información en todo el ciclo de vida.',
            },
          ].map((s, i) => (
            <Reveal key={s.t} delay={140 + i * 90}>
              <div>
                <p className="t-display text-[clamp(42px,4.8vw,72px)] leading-[0.95] tracking-[-0.03em] text-sun">{s.k}</p>
                <h3 className="mt-4 text-[17px] leading-[1.3] text-beige">{s.t}</h3>
                <p className="mt-2.5 text-[14px] leading-[1.55] text-beige/55">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
