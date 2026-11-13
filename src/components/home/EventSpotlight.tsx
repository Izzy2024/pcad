import Link from 'next/link';
import courses from '@/data/courses.json';
import Reveal from '@/components/Reveal';

type Course = {
  slug: string; title: string; summary: string; price: string | null;
  hours: string | null; start: string | null; schedule: string | null;
  images: string[];
};

export default function EventSpotlight() {
  const list = courses as Course[];
  const featured = list.find((c) => c.slug.includes('revit-mep')) ?? list[0];
  const others = list.filter((c) => c.slug !== featured.slug).slice(0, 3);

  return (
    <section className="relative bg-brand-deep py-24 text-beige md:py-36">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-16">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="t-mono mb-5 text-beige/40">Formación</p>
              <h2 className="t-display max-w-[18ch] text-[clamp(32px,4.4vw,60px)] leading-[1.02]">
                Cursos presenciales con instructores de obra
              </h2>
            </div>
            <p className="max-w-[40ch] text-[15px] leading-[1.55] text-beige/60">
              Centro de Entrenamiento Autorizado. Grupos reducidos, ejercicios sobre proyectos reales
              y certificado de finalización.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-8 md:mt-20 md:grid-cols-[1.15fr_1fr] md:gap-12">
          <Reveal>
            <Link href={`/cursos/${featured.slug}`} className="group block">
              <div className="relative overflow-hidden rounded-lg bg-[#2f1a04]">
                <img
                  src="/img/courses-banner.jpg"
                  alt=""
                  className="h-[280px] w-full object-cover transition-transform duration-[1200ms] ease-smooth group-hover:scale-[1.04] md:h-[420px]"
                />
                <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-beige px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                  <span className="t-mono text-[10px] text-brand-deep">Próximo inicio</span>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="t-mono mb-2 text-beige/40">Curso</p>
                  <h3 className="t-display text-[clamp(24px,2.4vw,34px)] leading-[1.1]">{featured.title}</h3>
                </div>
                <div className="text-right">
                  {featured.price && (
                    <p className="text-[15px] text-sun">{featured.price}</p>
                  )}
                  <p className="t-mono mt-1 text-beige/40">{featured.hours} horas</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-[13px] text-beige/55">
                {featured.start && <span>Inicio: {featured.start}</span>}
                {featured.schedule && <span>Horario: {featured.schedule}</span>}
                <span>Presencial · Español</span>
              </div>
            </Link>
          </Reveal>

          <div className="flex flex-col justify-between gap-6">
            <div>
              {others.map((c, i) => (
                <Reveal key={c.slug} delay={i * 90}>
                  <Link
                    href={`/cursos/${c.slug}`}
                    className="group flex items-center justify-between gap-4 border-b border-beige/12 py-5 transition-colors hover:border-beige/30"
                  >
                    <div>
                      <h4 className="text-[16px] leading-[1.3] text-beige transition-colors group-hover:text-sun">
                        {c.title}
                      </h4>
                      <p className="t-mono mt-1.5 text-beige/35">
                        {c.hours ? `${c.hours} h` : 'Curso'} {c.price ? `· ${c.price}` : ''}
                      </p>
                    </div>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-beige/20 transition-all duration-400 group-hover:border-sun group-hover:text-sun">
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M1 11L11 1M11 1H3.5M11 1v7.5" stroke="currentColor" strokeWidth="1.3" />
                      </svg>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>

            <Link
              href="/cursos"
              className="btn mt-2 self-start bg-beige text-brand-deep hover:bg-white"
            >
              Ver todos los cursos
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
