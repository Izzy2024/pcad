import Link from 'next/link';
import Reveal from '@/components/Reveal';

export default function CertBand() {
  return (
    <section className="relative overflow-hidden bg-sun py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-16">
        <div className="grid gap-12 md:grid-cols-[1fr_1.1fr] md:items-center md:gap-20">
          <Reveal>
            <div>
              <p className="t-mono mb-6 text-brand-deep/50">Certificaciones</p>
              <h2 className="t-display max-w-[16ch] text-[clamp(32px,4.2vw,58px)] leading-[1.02] text-brand-deep">
                Tu conocimiento, acreditado internacionalmente
              </h2>
              <p className="mt-6 max-w-[44ch] text-[15px] leading-[1.55] text-brand-deep/70">
                Somos partner de Certiport y centro autorizado. Certifica tus habilidades en
                Autodesk y valida tu perfil ante empleadores de toda la región.
              </p>
              <Link
                href="/certificaciones"
                className="mt-8 inline-flex items-center gap-2 rounded-[6px] bg-brand-deep px-5 py-3 text-[14px] text-beige transition-colors hover:bg-black"
              >
                Obtener certificación
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M1 11L11 1M11 1H3.5M11 1v7.5" stroke="currentColor" strokeWidth="1.3" />
                </svg>
              </Link>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { img: '/img/certiport-partner.jpg', title: 'Certiport', sub: 'Authorized Partner' },
              { img: '/img/oracle-gold-partner.jpg', title: 'Oracle', sub: 'Gold Partner' },
            ].map((c, i) => (
              <Reveal key={c.title} delay={120 + i * 90}>
                <div className="flex flex-col items-center justify-center rounded-lg bg-beige p-8 text-center">
                  <img src={c.img} alt={c.title} className="h-[74px] w-auto object-contain" />
                  <p className="mt-5 text-[15px] text-brand-deep">{c.title}</p>
                  <p className="t-mono mt-1 text-brand-deep/45">{c.sub}</p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={300} className="sm:col-span-2">
              <div className="flex items-center justify-between gap-6 rounded-lg border border-brand-deep/20 px-7 py-6">
                <div>
                  <p className="t-mono text-brand-deep/45">Modalidad</p>
                  <p className="mt-1.5 text-[15px] text-brand-deep">
                    Exámenes presenciales y remotos supervisados
                  </p>
                </div>
                <img src="/img/brand-autodesk.png" alt="Autodesk" className="h-7 w-auto opacity-70" />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
