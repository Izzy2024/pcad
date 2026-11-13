import Link from 'next/link';
import software from '@/data/software.json';
import PageIntro from '@/components/PageIntro';
import Reveal from '@/components/Reveal';

type Family = { slug: string; name: string; lede?: string; products: { name: string; slug: string; summary?: string }[] };

export const metadata = {
  title: 'Software · PCCAD',
  description: 'Catálogo de software especializado por fabricante para arquitectura, ingeniería y construcción.',
};

export default function SoftwarePage() {
  const families = software.families as Family[];

  return (
    <>
      <PageIntro
        eyebrow="Catálogo"
        title="Software para cada disciplina del proyecto"
        lede="Representamos a los fabricantes que definen el estándar de la industria AEC. Explora por marca o cuéntanos qué necesitas resolver y te ayudamos a elegir la edición correcta."
        crumb={[{ label: 'Inicio', href: '/' }]}
      />

      <section className="bg-beige pb-24 md:pb-36">
        <div className="mx-auto w-full max-w-[1440px] px-6 md:px-16">
          <div className="grid gap-px overflow-hidden rounded-lg border border-brand-deep/12 bg-brand-deep/12">
            {families.map((f, i) => (
              <Reveal key={f.slug} delay={Math.min(i * 30, 240)}>
                <Link
                  href={`/software/${f.slug}`}
                  className="group grid gap-3 bg-beige px-6 py-7 transition-colors duration-400 hover:bg-[#FBF1DF] md:grid-cols-[48px_1fr_2fr_auto] md:items-center md:gap-8 md:px-8 md:py-8"
                >
                  <span className="t-mono text-brand-deep/35">{String(i + 1).padStart(2, '0')}</span>
                  <h2 className="t-display text-[24px] leading-[1.1] text-brand-deep md:text-[28px]">
                    {f.name}
                  </h2>
                  <p className="text-[14px] leading-[1.5] text-brand-deep/60">
                    {f.lede || `${f.products.length} productos disponibles.`}
                  </p>
                  <span className="flex items-center gap-3">
                    <span className="t-mono text-brand-deep/35">{f.products.length}</span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-deep/20 transition-all duration-400 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M1 11L11 1M11 1H3.5M11 1v7.5" stroke="currentColor" strokeWidth="1.3" />
                      </svg>
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
