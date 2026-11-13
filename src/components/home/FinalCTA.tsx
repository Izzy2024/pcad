import Link from 'next/link';
import Reveal from '@/components/Reveal';

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-violet py-24 text-beige md:py-36">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-16">
        <Reveal>
          <p className="t-mono mb-8 text-beige/40">Empecemos</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="t-display max-w-[16ch] text-[clamp(40px,6.4vw,104px)] leading-[0.98] tracking-[-0.03em]">
            ¿Listo para tu próximo proyecto?
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 border-t border-beige/20 pt-10 md:grid-cols-[1fr_auto] md:items-end">
          <Reveal delay={140}>
            <p className="max-w-[46ch] text-[15px] leading-[1.55] text-beige/70 md:text-[16px]">
              Cuéntanos qué necesitas y te conectamos con el especialista del país que corresponda.
              Cotización, demo técnica o diagnóstico BIM, sin compromiso.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="flex flex-wrap gap-2.5">
              <Link href="/contacto" className="btn bg-beige text-violet hover:bg-white">
                Solicitar cotización
              </Link>
              <Link
                href="/cursos"
                className="btn border border-beige/35 bg-transparent text-beige hover:bg-beige/10"
              >
                Ver próximos cursos
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-8 border-t border-beige/20 pt-10 sm:grid-cols-2 md:grid-cols-4">
          {[
            { k: 'Panamá', v: '+507 236-0370' },
            { k: 'Costa Rica', v: 'Oficina regional' },
            { k: 'Honduras', v: 'Cobertura local' },
            { k: 'Guatemala', v: 'Cobertura local' },
          ].map((o) => (
            <div key={o.k}>
              <p className="t-mono text-beige/40">{o.k}</p>
              <p className="mt-1.5 text-[15px] text-beige/80">{o.v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
