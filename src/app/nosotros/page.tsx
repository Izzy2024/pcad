import Link from 'next/link';
import PageIntro from '@/components/PageIntro';
import Reveal from '@/components/Reveal';

export const metadata = {
  title: 'Nosotros · PCCAD',
  description: 'Desde 1992 especializados en soluciones tecnológicas para arquitectura, ingeniería, construcción y diseño.',
};

export default function NosotrosPage() {
  return (
    <>
      <PageIntro
        eyebrow="Nosotros"
        title="Desde 1992 impulsando la transformación digital del sector AEC"
        lede="Nos hemos especializado en proporcionar soluciones tecnológicas de software y hardware para arquitectura, ingeniería, construcción y diseño en Centroamérica y el Caribe."
        crumb={[{ label: 'Inicio', href: '/' }]}
      />

      <section className="bg-beige pb-20">
        <div className="mx-auto w-full max-w-[1440px] px-6 md:px-16">
          <div className="overflow-hidden rounded-lg">
            <img src="/img/about-team.jpg" alt="" className="h-[280px] w-full object-cover md:h-[460px]" />
          </div>
        </div>
      </section>

      <section className="bg-beige pb-20 md:pb-28">
        <div className="mx-auto grid w-full max-w-[1440px] gap-14 px-6 md:grid-cols-2 md:gap-20 md:px-16">
          <Reveal>
            <div>
              <p className="t-mono mb-5 text-brand-deep/45">Trayectoria</p>
              <h2 className="t-display max-w-[18ch] text-[clamp(26px,3vw,40px)] leading-[1.06] text-brand-deep">
                Pioneros en soluciones para el sector
              </h2>
              <p className="mt-5 text-[15px] leading-[1.65] text-brand-deep/70">
                A lo largo de los años hemos sido pioneros en ofrecer soluciones innovadoras que han
                impulsado el desarrollo y la eficiencia en el sector. Nuestra trayectoria se destaca
                por la excelencia en el servicio al cliente y la adaptabilidad a las últimas
                tendencias tecnológicas.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-6 border-t border-brand-deep/15 pt-6">
                {[
                  { k: '1992', t: 'Fundación' },
                  { k: '5', t: 'Países' },
                  { k: '15', t: 'Fabricantes' },
                ].map((s) => (
                  <div key={s.t}>
                    <p className="t-display text-[28px] leading-none text-brand-deep">{s.k}</p>
                    <p className="t-mono mt-2 text-brand-deep/45">{s.t}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="grid gap-8">
            <Reveal delay={80}>
              <div className="rounded-lg border border-brand-deep/15 p-7">
                <p className="t-mono mb-3 text-brand-deep/45">Visión</p>
                <p className="text-[14.5px] leading-[1.6] text-brand-deep/70">
                  Ser el proveedor de tecnología informática para el sector de la arquitectura,
                  ingeniería, administración de proyectos, control de documentos, firma electrónica y
                  construcción más importante y tecnológicamente más avanzado de Centroamérica y el
                  Caribe.
                </p>
              </div>
            </Reveal>
            <Reveal delay={140}>
              <div className="rounded-lg border border-brand-deep/15 p-7">
                <p className="t-mono mb-3 text-brand-deep/45">Misión</p>
                <p className="text-[14.5px] leading-[1.6] text-brand-deep/70">
                  Aportar herramientas tecnológicas, conocimientos e innovación al mercado regional
                  para hacer más eficiente y rentable el negocio de nuestros clientes, en el idioma
                  local y con la calidad exigida por nuestros fabricantes.
                </p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="rounded-lg bg-brand-deep p-7 text-beige">
                <p className="t-mono mb-3 text-beige/40">Talento</p>
                <h3 className="t-display text-[24px] leading-[1.12]">¿Quieres trabajar con nosotros?</h3>
                <Link
                  href="/nosotros/trabaje-con-nosotros"
                  className="mt-5 inline-flex items-center gap-2 border-b border-beige/40 pb-1 text-[14px] text-beige transition-colors hover:border-sun hover:text-sun"
                >
                  Ver posiciones abiertas
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M1 11L11 1M11 1H3.5M11 1v7.5" stroke="currentColor" strokeWidth="1.3" />
                  </svg>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
