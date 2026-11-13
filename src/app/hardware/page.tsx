import Link from 'next/link';
import PageIntro from '@/components/PageIntro';
import Reveal from '@/components/Reveal';

export const metadata = {
  title: 'Hardware · PCCAD',
  description: 'Plotters HP y computadoras MSI para profesionales de arquitectura, ingeniería y construcción.',
};

const LINES = [
  {
    n: '01',
    title: 'Plotters HP',
    body: 'Impresión de gran formato con precisión técnica. Modelos DesignJet para planos, renders y entregables de obra.',
    tags: ['DesignJet T850', 'DesignJet T950', 'Gran formato'],
    image: '/img/pillar-pointcloud.png',
    href: '/contacto',
  },
  {
    n: '02',
    title: 'Computadoras MSI',
    body: 'Laptops para creación de contenido con GPU dedicada, pensadas para modelado BIM, render y trabajo en campo.',
    tags: ['Creator M16', 'RTX dedicada', '32–64 GB RAM'],
    image: '/img/pillar-management.png',
    href: '/contacto',
  },
];

export default function HardwarePage() {
  return (
    <>
      <PageIntro
        eyebrow="Hardware"
        title="Equipos que sostienen el ritmo del proyecto"
        lede="Más de 25 años suministrando workstations, laptops CAD y plotters de gran formato a empresas y corporaciones de la región. Te proponemos la mejor relación rendimiento/precio."
        crumb={[{ label: 'Inicio', href: '/' }]}
      />

      <section className="bg-beige pb-24 md:pb-36">
        <div className="mx-auto w-full max-w-[1440px] px-6 md:px-16">
          <div className="grid gap-8 md:grid-cols-2 md:gap-10">
            {LINES.map((l, i) => (
              <Reveal key={l.n} delay={i * 90}>
                <div className="group overflow-hidden rounded-lg border border-brand-deep/12">
                  <div className="overflow-hidden bg-[#EFE3CD]">
                    <img
                      src={l.image}
                      alt=""
                      className="h-[240px] w-full object-cover transition-transform duration-[1100ms] ease-smooth group-hover:scale-[1.04] md:h-[300px]"
                    />
                  </div>
                  <div className="p-7 md:p-8">
                    <p className="t-mono mb-4 text-brand-deep/35">{l.n}</p>
                    <h2 className="t-display text-[28px] leading-[1.1] text-brand-deep md:text-[32px]">
                      {l.title}
                    </h2>
                    <p className="mt-3 text-[14.5px] leading-[1.55] text-brand-deep/60">{l.body}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {l.tags.map((t) => (
                        <span
                          key={t}
                          className="t-mono rounded-full border border-brand-deep/18 px-3 py-1 text-brand-deep/55"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={l.href}
                      className="mt-6 inline-flex items-center gap-2 border-b border-brand-deep/30 pb-1 text-[14px] text-brand-deep transition-colors hover:border-brand hover:text-brand"
                    >
                      Cotizar
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M1 11L11 1M11 1H3.5M11 1v7.5" stroke="currentColor" strokeWidth="1.3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-12 rounded-lg border border-brand-deep/15 bg-[#FBF1DF] p-7 md:p-10">
              <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <p className="t-mono mb-4 text-brand-deep/45">Asesoría</p>
                  <h3 className="t-display max-w-[26ch] text-[26px] leading-[1.12] text-brand-deep md:text-[32px]">
                    ¿No sabes qué configuración necesita tu equipo?
                  </h3>
                  <p className="mt-3 max-w-[52ch] text-[14.5px] leading-[1.55] text-brand-deep/60">
                    Revisamos tus modelos, el tamaño de tus proyectos y tu flujo de render para
                    proponerte el equipo correcto, sin sobredimensionar.
                  </p>
                </div>
                <Link href="/contacto" className="btn bg-brand text-white hover:bg-[#e56400] md:self-center">
                  Pedir recomendación
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
