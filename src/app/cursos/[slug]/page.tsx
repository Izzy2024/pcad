import Link from 'next/link';
import { notFound } from 'next/navigation';
import courses from '@/data/courses.json';
import PageIntro from '@/components/PageIntro';
import Reveal from '@/components/Reveal';
import ContactForm from '@/components/ContactForm';

type Course = {
  slug: string; title: string; summary: string; description: string;
  price: string | null; hours: string | null; start: string | null; schedule: string | null;
};

const list = courses as Course[];

export function generateStaticParams() {
  return list.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = list.find((x) => x.slug === slug);
  return { title: c ? `${c.title} · PCCAD` : 'Curso · PCCAD', description: c?.summary?.slice(0, 155) };
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = list.find((x) => x.slug === slug);
  if (!c) notFound();

  const facts = [
    { k: 'Duración', v: c.hours ? `${c.hours} horas` : 'Consultar' },
    { k: 'Inicio', v: c.start ?? 'Consultar fecha' },
    { k: 'Horario', v: c.schedule ?? 'Consultar horario' },
    { k: 'Modalidad', v: 'Presencial · Español' },
    { k: 'Inversión', v: c.price ?? 'Consultar' },
    { k: 'Certificado', v: 'Incluido' },
  ];

  return (
    <>
      <PageIntro
        eyebrow="Curso"
        title={c.title}
        lede={c.summary?.slice(0, 300)}
        crumb={[
          { label: 'Inicio', href: '/' },
          { label: 'Cursos', href: '/cursos' },
        ]}
      />

      <section className="bg-beige pb-20 md:pb-28">
        <div className="mx-auto grid w-full max-w-[1440px] gap-14 px-6 md:grid-cols-[1.35fr_1fr] md:gap-20 md:px-16">
          <div>
            <div className="overflow-hidden rounded-lg">
              <img src="/img/courses-banner.jpg" alt="" className="h-[260px] w-full object-cover md:h-[360px]" />
            </div>

            {c.description && (
              <Reveal>
                <div className="mt-10">
                  <p className="t-mono mb-4 text-brand-deep/45">Sobre el curso</p>
                  <p className="text-[15px] leading-[1.7] text-brand-deep/70 md:text-[16px]">
                    {c.description}
                  </p>
                </div>
              </Reveal>
            )}

            <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-brand-deep/12 bg-brand-deep/12 sm:grid-cols-2">
              {facts.map((f) => (
                <div key={f.k} className="bg-beige px-5 py-4">
                  <p className="t-mono text-brand-deep/40">{f.k}</p>
                  <p className="mt-1 text-[15px] text-brand-deep">{f.v}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-lg border border-brand-deep/15 bg-[#FBF1DF] p-7">
              <p className="t-mono mb-3 text-brand-deep/45">Dirigido a</p>
              <p className="text-[15px] leading-[1.6] text-brand-deep/70">
                Profesionales y estudiantes de arquitectura, ingeniería, construcción y diseño que
                quieran dominar la herramienta desde el primer día y aplicarla en su operación real.
              </p>
            </div>
          </div>

          <aside className="md:sticky md:top-32 md:self-start">
            <div className="rounded-lg border border-brand-deep/15 p-7">
              <p className="t-mono mb-2 text-brand-deep/45">Reserva tu cupo</p>
              <p className="t-display mb-6 text-[30px] leading-none text-brand-deep">
                {c.price ?? 'Consultar'}
              </p>
              <div className="flex flex-col gap-2.5">
                <Link href="/contacto" className="btn bg-brand text-white hover:bg-[#e56400]">
                  Reservar fecha
                </Link>
                <Link href="/cursos" className="btn btn-outline">
                  Ver otros cursos
                </Link>
              </div>
              <div className="mt-6 space-y-2 border-t border-brand-deep/12 pt-5 text-[13px] text-brand-deep/55">
                <p>Grupos reducidos</p>
                <p>Ejercicios sobre casos reales</p>
                <p>Certificado de finalización</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-brand-deep py-20 text-beige md:py-28">
        <div className="mx-auto grid w-full max-w-[1440px] gap-12 px-6 md:grid-cols-[0.85fr_1.15fr] md:gap-20 md:px-16">
          <div>
            <p className="t-mono mb-5 text-beige/40">Inscripción</p>
            <h2 className="t-display max-w-[14ch] text-[clamp(28px,3.4vw,44px)] leading-[1.04]">
              Reserva tu cupo en {c.title.toLowerCase().replace('curso de ', '')}
            </h2>
            <p className="mt-5 max-w-[40ch] text-[15px] leading-[1.55] text-beige/60">
              Completa el formulario y te confirmamos disponibilidad, método de pago y logística del
              salón.
            </p>
          </div>
          <ContactForm tone="dark" compact />
        </div>
      </section>
    </>
  );
}
