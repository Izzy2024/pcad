import Link from 'next/link';
import PageIntro from '@/components/PageIntro';
import Reveal from '@/components/Reveal';

export const metadata = {
  title: 'Servicios · PCCAD',
  description: 'Implementación BIM, capacitación, consultoría y gestión de proyectos para la industria AEC.',
};

const SERVICES = [
  {
    n: '01',
    title: 'Implementación BIM',
    body: 'Adoptar BIM es un proceso estratégico, no una compra de software. Trabajamos alineados a la norma ISO 19650: estándares, plantillas, roles y flujos de información para todo el ciclo de vida del proyecto.',
    bullets: [
      'Diagnóstico de madurez BIM',
      'Plan de ejecución (BEP) y estándares',
      'Plantillas y librerías corporativas',
      'Autodesk Revit, Civil 3D, Navisworks y ACC',
    ],
    image: '/img/pillar-bim.png',
  },
  {
    n: '02',
    title: 'Capacitación y certificación',
    body: 'Programas de formación a la medida, dictados por instructores certificados con experiencia real en obra. Cursos oficiales avalados por partners globales.',
    bullets: [
      'Autodesk, Bentley, Oracle, Adobe y SketchUp',
      'Formación in-house en tus oficinas',
      'Preparación para certificaciones Certiport',
      'Salones equipados y grupos reducidos',
    ],
    image: '/img/pillar-training.png',
  },
  {
    n: '03',
    title: 'Consultoría para proyectos',
    body: 'Integramos tecnologías que transforman la gestión de proyectos: planificación, ejecución y control. Diseñamos la solución según la necesidad real de cada despacho u obra.',
    bullets: [
      'Coordinación y detección de interferencias',
      'Control de cronograma y costos',
      'Gestión documental y transmittals',
      'Auditoría de modelos y entregables',
    ],
    image: '/img/pillar-consulting.png',
  },
  {
    n: '04',
    title: 'Gestión de proyectos y documental',
    body: 'Implantamos plataformas para que la información del proyecto viva en un solo lugar: desde el control de correspondencia hasta la entrega final al cliente.',
    bullets: [
      'Oracle Aconex y Primavera',
      'ProjectWise y entornos comunes de datos',
      'Flujos de aprobación y firmas',
      'Tableros de seguimiento ejecutivo',
    ],
    image: '/img/pillar-management.png',
  },
  {
    n: '05',
    title: 'Nube de puntos y levantamiento',
    body: 'Convertimos el estado real de una edificación en un modelo utilizable. Escaneo, registro y modelado en Revit con precisión verificable.',
    bullets: [
      'Escaneo láser y registro',
      'Modelado as-built en Revit',
      'Medición y verificación en obra',
      'Entregables para remodelación',
    ],
    image: '/img/pillar-pointcloud.png',
  },
];

export default function ServiciosPage() {
  return (
    <>
      <PageIntro
        eyebrow="Servicios"
        title="Soluciones integrales para el sector AEC"
        lede="Optimizamos la eficiencia y productividad de nuestros clientes a través de consultoría especializada, formación certificada y tecnologías que sí se usan en obra."
        crumb={[{ label: 'Inicio', href: '/' }]}
      />

      <section className="bg-beige pb-24 md:pb-36">
        <div className="mx-auto w-full max-w-[1440px] px-6 md:px-16">
          <div className="flex flex-col">
            {SERVICES.map((s, i) => (
              <Reveal key={s.n} delay={Math.min(i * 60, 240)}>
                <div
                  className={`grid gap-8 border-t border-brand-deep/15 py-12 md:grid-cols-[1fr_1.1fr] md:gap-20 md:py-16 ${
                    i === SERVICES.length - 1 ? 'border-b' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-4">
                      <span className="t-mono text-brand">{s.n}</span>
                      <span className="h-px flex-1 bg-brand-deep/15" />
                    </div>
                    <h2 className="t-display mt-5 max-w-[16ch] text-[clamp(26px,3vw,38px)] leading-[1.06] text-brand-deep">
                      {s.title}
                    </h2>
                    <p className="mt-4 max-w-[48ch] text-[14.5px] leading-[1.6] text-brand-deep/65">
                      {s.body}
                    </p>
                    <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-[13.5px] leading-[1.5] text-brand-deep/60">
                          <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-brand" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="overflow-hidden rounded-lg bg-[#EFE3CD]">
                    <img
                      src={s.image}
                      alt=""
                      className="h-[240px] w-full object-cover md:h-full md:min-h-[300px]"
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-14 flex flex-col items-start justify-between gap-6 rounded-lg bg-brand-deep p-8 text-beige md:flex-row md:items-center md:p-12">
              <div>
                <p className="t-mono mb-3 text-beige/40">Siguiente paso</p>
                <h3 className="t-display max-w-[24ch] text-[26px] leading-[1.1] md:text-[34px]">
                  Cuéntanos en qué etapa está tu proyecto.
                </h3>
              </div>
              <Link href="/contacto" className="btn bg-beige text-brand-deep hover:bg-white">
                Cotizar servicios
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
