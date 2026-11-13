import PageIntro from '@/components/PageIntro';
import { SITE } from '@/lib/content';

export const metadata = {
  title: 'Políticas de cumplimiento · PCCAD',
  description: 'Código de conducta, cumplimiento legal y canal de denuncias del Grupo PC-CAD.',
};

export default function CompliancePage() {
  return (
    <>
      <PageIntro
        eyebrow="Grupo PC-CAD"
        title="Políticas de cumplimiento"
        lede="Estamos comprometidos con la transparencia, la ética y el cumplimiento de las normativas aplicables en los países donde operamos."
        crumb={[{ label: 'Inicio', href: '/' }]}
      />

      <section className="bg-beige pb-24 md:pb-36">
        <div className="mx-auto grid w-full max-w-[1440px] gap-14 px-6 md:grid-cols-[1.3fr_1fr] md:gap-20 md:px-16">
          <div>
            <div className="border-t border-brand-deep/15">
              <div className="border-b border-brand-deep/15 py-8">
                <h2 className="t-display mb-4 text-[24px] leading-[1.15] text-brand-deep">
                  Cumplimiento legal y normativo
                </h2>
                <p className="text-[15px] leading-[1.65] text-brand-deep/70">
                  Nuestra misión es garantizar que todas nuestras operaciones y relaciones comerciales
                  se realicen bajo los más altos estándares de integridad. Nuestras empresas cumplen
                  con:
                </p>
                <ul className="mt-5 grid gap-2">
                  {[
                    'Leyes de la República de Panamá y Costa Rica.',
                    'Regulaciones de los Estados Unidos de América.',
                    'Normativas de los países donde tenemos oficinas físicas.',
                    'Requisitos legales de nuestros proveedores y aliados estratégicos.',
                  ].map((l) => (
                    <li key={l} className="flex items-start gap-2.5 text-[14.5px] leading-[1.55] text-brand-deep/65">
                      <span className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-brand" />
                      {l}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-b border-brand-deep/15 py-8">
                <h2 className="t-display mb-4 text-[24px] leading-[1.15] text-brand-deep">
                  El Grupo PC-CAD está conformado por
                </h2>
                <div className="grid gap-2">
                  {[
                    'PC-CAD, S.A. (Panamá)',
                    'Project Solutions and Services, S.A. (Panamá)',
                    'PC-CAD Project Solutions and Services, S.A. (Costa Rica)',
                  ].map((c) => (
                    <p key={c} className="text-[14.5px] text-brand-deep/70">
                      {c}
                    </p>
                  ))}
                </div>
              </div>

              <div className="border-b border-brand-deep/15 py-8">
                <h2 className="t-display mb-4 text-[24px] leading-[1.15] text-brand-deep">
                  Canal de denuncias
                </h2>
                <p className="text-[15px] leading-[1.65] text-brand-deep/70">
                  Promovemos una cultura de transparencia y ética en los negocios. Si conoces alguna
                  conducta irregular relacionada con nuestras empresas o colaboradores, puedes
                  presentar una denuncia de forma anónima o con tu nombre.
                </p>
                <p className="mt-3 text-[15px] leading-[1.65] text-brand-deep/70">
                  Todas las denuncias serán investigadas y, si la hiciste con nombre propio, recibirás
                  información sobre su resolución.
                </p>
              </div>
            </div>
          </div>

          <aside className="md:sticky md:top-32 md:self-start">
            <div className="rounded-lg bg-brand-deep p-7 text-beige">
              <p className="t-mono mb-3 text-beige/40">Contacto directo</p>
              <h3 className="t-display text-[24px] leading-[1.12]">Oficial de cumplimiento</h3>
              <div className="mt-6 space-y-3 text-[14px]">
                <div>
                  <p className="t-mono text-beige/35">Correo de denuncias</p>
                  <a href={`mailto:${SITE.compliance}`} className="text-beige hover:text-sun">
                    {SITE.compliance}
                  </a>
                </div>
                <div>
                  <p className="t-mono text-beige/35">Teléfono de denuncias</p>
                  <a href={`tel:${SITE.compliancePhone.replace(/\s/g, '')}`} className="text-beige hover:text-sun">
                    {SITE.compliancePhone}
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
