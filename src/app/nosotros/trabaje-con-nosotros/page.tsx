import PageIntro from '@/components/PageIntro';
import Reveal from '@/components/Reveal';
import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'Trabaje con nosotros · PCCAD',
  description: 'Únete al equipo de PCCAD LATAM. Posiciones abiertas en ventas, preventa, formación y coordinación BIM.',
};

const ROLES = [
  { t: 'Ejecutivo de Ventas de Software', d: 'Identificar oportunidades de venta, gestionar relaciones con clientes y alcanzar objetivos comerciales.' },
  { t: 'Ingeniero de Preventa', d: 'Brindar soporte técnico preventa a clientes y prospectos, demostrando conocimiento profundo de las herramientas.' },
  { t: 'Instructor Externo', d: 'Impartir cursos y capacitaciones sobre nuestros productos de software a profesionales del sector AEC.' },
  { t: 'Coordinador BIM', d: 'Coordinar proyectos BIM, gestionar equipos multidisciplinarios y asegurar la implementación efectiva de la metodología.' },
  { t: 'Administración', d: 'Responsable del día a día del negocio: cuentas por cobrar y pagar, contabilidad y apoyo al equipo.' },
];

export default function JobsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Talento"
        title="Trabaje con nosotros"
        lede="En PCCAD LATAM buscamos talento excepcional. Si te apasiona la tecnología, la innovación y el servicio al cliente, nos encantaría conocerte."
        crumb={[
          { label: 'Inicio', href: '/' },
          { label: 'Nosotros', href: '/nosotros' },
        ]}
      />

      <section className="bg-beige pb-20 md:pb-28">
        <div className="mx-auto grid w-full max-w-[1440px] gap-14 px-6 md:grid-cols-[1.1fr_1fr] md:gap-20 md:px-16">
          <div>
            <Reveal>
              <p className="t-mono mb-5 text-brand-deep/45">Por qué trabajar aquí</p>
              <p className="max-w-[50ch] text-[15px] leading-[1.65] text-brand-deep/70">
                Ofrecemos un ambiente dinámico y colaborativo, oportunidades de crecimiento
                profesional y la posibilidad de contribuir al éxito de proyectos innovadores en la
                industria AEC. Valoramos la diversidad, la creatividad y el compromiso con la
                excelencia.
              </p>
            </Reveal>

            <div className="mt-10 border-t border-brand-deep/15">
              {ROLES.map((r, i) => (
                <Reveal key={r.t} delay={Math.min(i * 50, 250)}>
                  <div className="flex flex-col gap-2 border-b border-brand-deep/15 py-6 md:flex-row md:items-baseline md:justify-between md:gap-8">
                    <div className="md:max-w-[55%]">
                      <h2 className="text-[17px] leading-[1.3] text-brand-deep">{r.t}</h2>
                      <p className="mt-1.5 text-[13.5px] leading-[1.55] text-brand-deep/55">{r.d}</p>
                    </div>
                    <span className="t-mono shrink-0 text-brand">Tiempo completo</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <aside className="md:sticky md:top-32 md:self-start">
            <div className="rounded-lg border border-brand-deep/15 bg-[#FBF1DF] p-7">
              <p className="t-mono mb-3 text-brand-deep/45">Aplicación</p>
              <h2 className="t-display text-[26px] leading-[1.1] text-brand-deep">
                Envíanos tu perfil
              </h2>
              <p className="mt-3 text-[14px] leading-[1.55] text-brand-deep/60">
                Cuéntanos qué rol te interesa y comparte tu experiencia. Te respondemos en menos de
                una semana.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-brand-deep py-20 text-beige md:py-28">
        <div className="mx-auto w-full max-w-[1440px] px-6 md:px-16">
          <ContactForm tone="dark" />
        </div>
      </section>
    </>
  );
}
