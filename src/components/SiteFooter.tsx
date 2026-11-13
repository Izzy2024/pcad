import Link from 'next/link';
import { BRANDS, SITE } from '@/lib/content';
import Logo from './Logo';

const cols = [
  {
    title: 'Soluciones',
    links: [
      { label: 'Software', href: '/software' },
      { label: 'Hardware', href: '/hardware' },
      { label: 'Servicios', href: '/servicios' },
      { label: 'Certificaciones', href: '/certificaciones' },
    ],
  },
  {
    title: 'Formación',
    links: [
      { label: 'Cursos', href: '/cursos' },
      { label: 'Calendario', href: '/cursos#calendario' },
      { label: 'Certificaciones', href: '/certificaciones' },
      { label: 'Educación superior', href: '/software/sketchup' },
    ],
  },
  {
    title: 'Compañía',
    links: [
      { label: 'Nosotros', href: '/nosotros' },
      { label: 'Trabaje con nosotros', href: '/nosotros/trabaje-con-nosotros' },
      { label: 'Políticas de cumplimiento', href: '/politicas-de-cumplimiento' },
      { label: 'Contacto', href: '/contacto' },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="relative bg-brand-deep text-beige">
      <div className="mx-auto w-full max-w-[1440px] px-6 pb-10 pt-20 md:px-16 md:pb-14 md:pt-28">
        <div className="grid gap-12 md:grid-cols-[1.2fr_repeat(3,minmax(0,0.7fr))]">
          <div>
            <Link href="/" className="inline-flex items-center">
              <Logo variant="white" className="h-[32px]" />
            </Link>
            <p className="mt-6 max-w-[300px] text-[15px] leading-[1.5] text-beige/60">
              Soluciones de software, hardware, formación y consultoría BIM para arquitectura,
              ingeniería y construcción en Latinoamérica.
            </p>
            <div className="mt-8 space-y-1 text-[15px] text-beige/80">
              <p>{SITE.address[0]}</p>
              <p>{SITE.address[1]}</p>
              <p>{SITE.address[2]}</p>
            </div>
            <div className="mt-5 space-y-1 text-[15px]">
              <a href={`mailto:${SITE.email}`} className="block text-beige/80 hover:text-sun">
                {SITE.email}
              </a>
              <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="block text-beige/80 hover:text-sun">
                {SITE.phone}
              </a>
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <p className="t-mono mb-5 text-beige/40">{c.title}</p>
              <ul className="space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-[15px] text-beige/75 transition-colors hover:text-sun">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-beige/15 pt-6">
          <p className="t-mono mb-4 text-beige/35">Fabricantes</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {BRANDS.map((b) => (
              <Link
                key={b.slug}
                href={`/software/${b.slug}`}
                className="text-[13px] text-beige/50 transition-colors hover:text-sun"
              >
                {b.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-beige/15 pt-6 text-[12px] text-beige/40 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Grupo PC-CAD. Todos los derechos reservados.</p>
          <div className="flex flex-wrap items-center gap-5">
            <a href={SITE.social.linkedin} className="hover:text-sun" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={SITE.social.instagram} className="hover:text-sun" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href={SITE.social.facebook} className="hover:text-sun" target="_blank" rel="noreferrer">
              Facebook
            </a>
            <Link href="/politicas-de-cumplimiento" className="hover:text-sun">
              Cumplimiento
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
