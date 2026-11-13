import Link from 'next/link';
import PageIntro from '@/components/PageIntro';
import ContactForm from '@/components/ContactForm';
import { SITE } from '@/lib/content';

export const metadata = {
  title: 'Contacto · PCCAD',
  description: 'Escríbenos y un especialista de tu país te contacta en breve.',
};

const OFFICES = [
  { country: 'Panamá', lines: ['Altos del Chase N° 46-F', 'Ave. de La Amistad', 'El Dorado, Panamá'], tel: '+507 236-0370' },
  { country: 'Costa Rica', lines: ['Oficina regional', 'San José, Costa Rica'], tel: 'Contacto local' },
  { country: 'Honduras', lines: ['Cobertura nacional', 'Tegucigalpa'], tel: 'Contacto local' },
  { country: 'Guatemala', lines: ['Cobertura nacional', 'Ciudad de Guatemala'], tel: 'Contacto local' },
  { country: 'El Salvador', lines: ['Cobertura nacional', 'San Salvador'], tel: 'Contacto local' },
];

export default function ContactoPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contacto"
        title="Queremos conectar contigo"
        lede="Descubre cómo nuestros innovadores software de la industria AEC pueden potenciar tus proyectos. Cuéntanos qué necesitas y un especialista te contacta en breve."
        crumb={[{ label: 'Inicio', href: '/' }]}
      />

      <section className="bg-beige pb-20 md:pb-28">
        <div className="mx-auto grid w-full max-w-[1440px] gap-14 px-6 md:grid-cols-[1fr_1.15fr] md:gap-20 md:px-16">
          <div>
            <div className="border-t border-brand-deep/15">
              <div className="border-b border-brand-deep/15 py-6">
                <p className="t-mono mb-2 text-brand-deep/40">Oficina principal</p>
                {SITE.address.map((l) => (
                  <p key={l} className="text-[15px] leading-[1.5] text-brand-deep/75">
                    {l}
                  </p>
                ))}
              </div>
              <div className="border-b border-brand-deep/15 py-6">
                <p className="t-mono mb-2 text-brand-deep/40">Email</p>
                <a href={`mailto:${SITE.email}`} className="block text-[15px] text-brand-deep hover:text-brand">
                  {SITE.email}
                </a>
                <a href={`mailto:${SITE.emailInfo}`} className="mt-1 block text-[15px] text-brand-deep hover:text-brand">
                  {SITE.emailInfo}
                </a>
              </div>
              <div className="border-b border-brand-deep/15 py-6">
                <p className="t-mono mb-2 text-brand-deep/40">Teléfono</p>
                <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="text-[15px] text-brand-deep hover:text-brand">
                  {SITE.phone}
                </a>
              </div>
              <div className="border-b border-brand-deep/15 py-6">
                <p className="t-mono mb-2 text-brand-deep/40">Cumplimiento</p>
                <a href={`mailto:${SITE.compliance}`} className="block text-[15px] text-brand-deep hover:text-brand">
                  {SITE.compliance}
                </a>
                <p className="mt-1 text-[15px] text-brand-deep/75">{SITE.compliancePhone}</p>
              </div>
            </div>

            <div className="mt-8">
              <p className="t-mono mb-4 text-brand-deep/40">Oficinas por país</p>
              <div className="grid gap-px overflow-hidden rounded-lg border border-brand-deep/12 bg-brand-deep/12 sm:grid-cols-2">
                {OFFICES.map((o) => (
                  <div key={o.country} className="bg-beige px-5 py-4">
                    <p className="text-[14px] text-brand-deep">{o.country}</p>
                    <p className="mt-1 text-[12px] leading-[1.5] text-brand-deep/45">
                      {o.lines.join(' · ')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="rounded-lg border border-brand-deep/15 p-7 md:p-9">
              <p className="t-mono mb-3 text-brand-deep/45">Comencemos esta conversación</p>
              <h2 className="t-display mb-7 text-[clamp(24px,2.6vw,32px)] leading-[1.1] text-brand-deep">
                Cuéntanos sobre tus requerimientos
              </h2>
              <ContactForm />
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-lg bg-[#FBF1DF] px-6 py-5">
              <p className="text-[14px] text-brand-deep/65">¿Buscas soporte técnico?</p>
              <Link href="/servicios" className="t-mono text-brand hover:underline">
                Ver servicios
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
