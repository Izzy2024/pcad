import Link from 'next/link';
import PageIntro from '@/components/PageIntro';
import Reveal from '@/components/Reveal';
import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'Certificaciones · PCCAD',
  description: 'Certifica tus conocimientos en herramientas Autodesk a través de los exámenes de Certiport.',
};

export default function CertificacionesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Certificaciones"
        title="Tu conocimiento, acreditado internacionalmente"
        lede="En PCCAD te ofrecemos la oportunidad de certificar tus conocimientos en los productos de Autodesk a través de los exámenes de Certiport."
        crumb={[{ label: 'Inicio', href: '/' }]}
      />

      <section className="bg-beige pb-16">
        <div className="mx-auto grid w-full max-w-[1440px] gap-px overflow-hidden rounded-lg border border-brand-deep/12 bg-brand-deep/12 sm:grid-cols-3 md:mx-16 md:w-auto">
          {[
            { t: 'Desarrollo profesional', d: 'Acelera tu carrera con una credencial reconocida por empleadores de toda la región.' },
            { t: 'Ventaja competitiva', d: 'Destácate en procesos de selección con evidencia verificable de tus competencias.' },
            { t: 'Credibilidad mejorada', d: 'Respalda tu experiencia con una certificación oficial del fabricante.' },
          ].map((b) => (
            <div key={b.t} className="bg-beige px-6 py-7">
              <p className="t-mono mb-2 text-brand-deep/40">Beneficio</p>
              <p className="text-[16px] text-brand-deep">{b.t}</p>
              <p className="mt-2 text-[13.5px] leading-[1.5] text-brand-deep/55">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-beige pb-20 md:pb-28">
        <div className="mx-auto grid w-full max-w-[1440px] gap-14 px-6 md:grid-cols-[1.15fr_1fr] md:gap-20 md:px-16">
          <div>
            <Reveal>
              <h2 className="t-display max-w-[20ch] text-[clamp(26px,3vw,40px)] leading-[1.06] text-brand-deep">
                Sobre las certificaciones
              </h2>
              <p className="mt-5 text-[15px] leading-[1.65] text-brand-deep/70">
                Las certificaciones de Autodesk son una garantía de tus competencias y conocimientos
                en herramientas de diseño y software de Autodesk. No solo mejoran tu credibilidad
                profesional: también pueden acelerar tu desarrollo y aumentar tu productividad.
              </p>
              <p className="mt-4 text-[15px] leading-[1.65] text-brand-deep/70">
                A través de las certificaciones te destacas ante empleadores que buscan a los mejores
                talentos en un mercado altamente competitivo.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {[
                { img: '/img/certiport-partner.jpg', t: 'Certiport', s: 'Authorized Partner' },
                { img: '/img/brand-autodesk.png', t: 'Autodesk', s: 'Certified User' },
              ].map((c) => (
                <div key={c.t} className="flex flex-col items-center justify-center rounded-lg border border-brand-deep/12 bg-[#FBF1DF] p-8">
                  <img src={c.img} alt={c.t} className="h-[64px] w-auto object-contain" />
                  <p className="mt-4 text-[14px] text-brand-deep">{c.t}</p>
                  <p className="t-mono mt-1 text-brand-deep/45">{c.s}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="md:sticky md:top-32 md:self-start">
            <div className="rounded-lg border border-brand-deep/15 p-7">
              <p className="t-mono mb-3 text-brand-deep/45">Más información</p>
              <h3 className="t-display text-[26px] leading-[1.1] text-brand-deep">
                Solicita tu examen
              </h3>
              <p className="mt-3 text-[14px] leading-[1.55] text-brand-deep/60">
                Coordinamos la sede, la fecha y el pago. Exámenes presenciales y remotos supervisados.
              </p>
              <Link href="/contacto" className="btn mt-6 w-full bg-brand text-white hover:bg-[#e56400]">
                Solicitar información
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-sun py-20 md:py-28">
        <div className="mx-auto grid w-full max-w-[1440px] gap-12 px-6 md:grid-cols-[0.85fr_1.15fr] md:gap-20 md:px-16">
          <div>
            <p className="t-mono mb-5 text-brand-deep/50">Formulario</p>
            <h2 className="t-display max-w-[14ch] text-[clamp(28px,3.4vw,44px)] leading-[1.04] text-brand-deep">
              ¿Necesitas más información?
            </h2>
            <p className="mt-5 max-w-[38ch] text-[15px] leading-[1.55] text-brand-deep/70">
              Completa tus datos y te enviamos el detalle de exámenes, sedes y costos.
            </p>
          </div>
          <div className="rounded-lg bg-beige p-7 md:p-9">
            <ContactForm compact />
          </div>
        </div>
      </section>
    </>
  );
}
