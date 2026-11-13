import Link from 'next/link';
import courses from '@/data/courses.json';
import PageIntro from '@/components/PageIntro';
import Reveal from '@/components/Reveal';

type Course = {
  slug: string; title: string; summary: string; price: string | null;
  hours: string | null; start: string | null; schedule: string | null;
};

export const metadata = {
  title: 'Cursos · PCCAD',
  description: 'Cursos presenciales de software AEC dictados por instructores certificados.',
};

export default function CursosPage() {
  const list = courses as Course[];

  return (
    <>
      <PageIntro
        eyebrow="Formación"
        title="Cursos que se dictan sobre proyectos reales"
        lede="Somos Centro de Entrenamiento Autorizado. Grupos reducidos, ejercicios con casos de obra y certificado de finalización en cada curso."
        crumb={[{ label: 'Inicio', href: '/' }]}
      />

      <section className="bg-beige pb-8">
        <div className="mx-auto grid w-full max-w-[1440px] gap-px overflow-hidden rounded-lg border border-brand-deep/12 bg-brand-deep/12 px-0 sm:grid-cols-2 lg:grid-cols-4 md:mx-16 md:w-auto">
          {[
            { k: 'Presencial', v: 'Salones equipados' },
            { k: '20 h', v: 'Duración típica' },
            { k: 'Español', v: 'Idioma de dictado' },
            { k: 'Certificado', v: 'Incluido' },
          ].map((b) => (
            <div key={b.k} className="bg-beige px-6 py-6">
              <p className="t-display text-[22px] leading-none text-brand-deep">{b.k}</p>
              <p className="t-mono mt-2 text-brand-deep/45">{b.v}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-beige pb-24 pt-16 md:pb-36">
        <div className="mx-auto w-full max-w-[1440px] px-6 md:px-16">
          <div className="mb-8 flex items-end justify-between border-b border-brand-deep/15 pb-5">
            <p className="t-mono text-brand-deep/45">Calendario</p>
            <p className="t-mono text-brand-deep/35">Precios en USD</p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-lg border border-brand-deep/12 bg-brand-deep/12 md:grid-cols-2">
            {list.map((c, i) => (
              <Reveal key={c.slug} delay={Math.min(i * 40, 300)}>
                <Link
                  href={`/cursos/${c.slug}`}
                  className="group flex h-full flex-col justify-between gap-6 bg-beige p-6 transition-colors duration-400 hover:bg-[#FBF1DF] md:p-8"
                >
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <span className="t-mono text-brand-deep/35">{String(i + 1).padStart(2, '0')}</span>
                      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-brand-deep/20 transition-all duration-400 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                          <path d="M1 11L11 1M11 1H3.5M11 1v7.5" stroke="currentColor" strokeWidth="1.3" />
                        </svg>
                      </span>
                    </div>
                    <h2 className="t-display text-[24px] leading-[1.12] text-brand-deep md:text-[27px]">
                      {c.title}
                    </h2>
                    <p className="mt-3 line-clamp-3 text-[13.5px] leading-[1.55] text-brand-deep/55">
                      {c.summary}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5 border-t border-brand-deep/12 pt-4">
                    {c.hours && <span className="t-mono text-brand-deep/45">{c.hours} horas</span>}
                    {c.start && <span className="t-mono text-brand-deep/45">Inicio {c.start}</span>}
                    {c.price && <span className="t-mono text-brand">{c.price}</span>}
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
