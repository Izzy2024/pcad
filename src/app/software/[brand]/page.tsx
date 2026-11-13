import Link from 'next/link';
import { notFound } from 'next/navigation';
import software from '@/data/software.json';
import PageIntro from '@/components/PageIntro';
import Reveal from '@/components/Reveal';

type Product = { name: string; slug: string; summary?: string; lede?: string };
type Family = { slug: string; name: string; lede?: string; summary?: string; products: Product[] };

export function generateStaticParams() {
  return (software.families as Family[]).map((f) => ({ brand: f.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ brand: string }> }) {
  const { brand } = await params;
  const fam = (software.families as Family[]).find((f) => f.slug === brand);
  return {
    title: fam ? `${fam.name} · PCCAD` : 'Software · PCCAD',
    description: fam?.summary?.slice(0, 155),
  };
}

export default async function BrandPage({ params }: { params: Promise<{ brand: string }> }) {
  const { brand } = await params;
  const fam = (software.families as Family[]).find((f) => f.slug === brand);
  if (!fam) notFound();
  const single = fam.products.length === 1 && (fam.products[0] as any).selfPage;

  return (
    <>
      <PageIntro
        eyebrow="Software"
        title={fam.name}
        lede={fam.summary?.slice(0, 300) || `Productos ${fam.name} disponibles en PCCAD.`}
        crumb={[
          { label: 'Inicio', href: '/' },
          { label: 'Software', href: '/software' },
        ]}
      />

      {single ? (
        <section className="bg-beige pb-24 md:pb-36">
          <div className="mx-auto grid w-full max-w-[1440px] gap-14 px-6 md:grid-cols-[1.35fr_1fr] md:gap-20 md:px-16">
            <div>
              <p className="text-[15px] leading-[1.7] text-brand-deep/70 md:text-[16px]">
                {fam.summary || `Trabajamos con ${fam.name} como parte de nuestro catálogo de soluciones para la industria AEC.`}
              </p>
              <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-brand-deep/12 bg-brand-deep/12 sm:grid-cols-2">
                {[
                  { k: 'Fabricante', v: fam.name },
                  { k: 'Representación', v: 'Autorizada en LATAM' },
                  { k: 'Soporte', v: 'Técnico local' },
                  { k: 'Implementación', v: 'Disponible' },
                ].map((f) => (
                  <div key={f.k} className="bg-beige px-5 py-4">
                    <p className="t-mono text-brand-deep/40">{f.k}</p>
                    <p className="mt-1 text-[15px] text-brand-deep">{f.v}</p>
                  </div>
                ))}
              </div>
            </div>
            <aside className="md:sticky md:top-32 md:self-start">
              <div className="rounded-lg border border-brand-deep/15 bg-[#FBF1DF] p-7">
                <p className="t-mono mb-3 text-brand-deep/45">Cotizar</p>
                <h2 className="t-display text-[26px] leading-[1.1] text-brand-deep">
                  ¿Quieres una licencia de {fam.name}?
                </h2>
                <div className="mt-6 flex flex-col gap-2.5">
                  <Link href="/contacto" className="btn bg-brand text-white hover:bg-[#e56400]">
                    Solicitar cotización
                  </Link>
                  <Link href="/software" className="btn btn-outline">
                    Ver otras marcas
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </section>
      ) : (
      <section className="bg-beige pb-24 md:pb-36">
        <div className="mx-auto w-full max-w-[1440px] px-6 md:px-16">
          <div className="mb-8 flex items-end justify-between border-b border-brand-deep/15 pb-5">
            <p className="t-mono text-brand-deep/45">{fam.products.length} productos</p>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 text-[14px] text-brand-deep transition-colors hover:text-brand"
            >
              Cotizar {fam.name}
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M1 11L11 1M11 1H3.5M11 1v7.5" stroke="currentColor" strokeWidth="1.3" />
              </svg>
            </Link>
          </div>

          <div className="grid gap-px overflow-hidden rounded-lg border border-brand-deep/12 bg-brand-deep/12 sm:grid-cols-2 lg:grid-cols-3">
            {fam.products.filter((p: any) => !p.selfPage).map((p, i) => (
              <Reveal key={p.slug} delay={Math.min(i * 40, 300)}>
                <Link
                  href={`/software/${fam.slug}/${p.slug}`}
                  className="group flex h-full flex-col justify-between gap-8 bg-beige p-6 transition-colors duration-400 hover:bg-[#FBF1DF] md:p-7"
                >
                  <div>
                    <h2 className="t-display text-[24px] leading-[1.12] text-brand-deep">{p.name}</h2>
                    {p.summary && (
                      <p className="mt-3 line-clamp-3 text-[13.5px] leading-[1.5] text-brand-deep/55">
                        {p.summary}
                      </p>
                    )}
                  </div>
                  <span className="flex items-center gap-2 text-[13px] text-brand-deep/50 transition-colors group-hover:text-brand">
                    Ver producto
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M1 11L11 1M11 1H3.5M11 1v7.5" stroke="currentColor" strokeWidth="1.3" />
                    </svg>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      )}
    </>
  );
}
