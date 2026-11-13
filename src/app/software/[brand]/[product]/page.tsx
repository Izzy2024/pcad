import Link from 'next/link';
import { notFound } from 'next/navigation';
import software from '@/data/software.json';
import PageIntro from '@/components/PageIntro';
import Reveal from '@/components/Reveal';

type Product = {
  name: string; slug: string; brand: string; summary?: string; lede?: string;
  body?: string[]; images?: string[];
};
type Family = { slug: string; name: string; products: Product[] };

const products = software.products as Product[];
const families = software.families as Family[];

export function generateStaticParams() {
  return products
    .filter((p: any) => !p.selfPage)
    .map((p) => ({ brand: p.brand, product: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ brand: string; product: string }> }) {
  const { product } = await params;
  const p = products.find((x) => x.slug === product);
  return { title: p ? `${p.name} · PCCAD` : 'Producto · PCCAD', description: p?.summary?.slice(0, 155) };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ brand: string; product: string }>;
}) {
  const { brand, product } = await params;
  const p = products.find((x) => x.slug === product && x.brand === brand);
  const fam = families.find((f) => f.slug === brand);
  if (!p || !fam) notFound();

  const siblings = fam.products.filter((x) => x.slug !== p.slug).slice(0, 6);
  const paragraphs = (p.body ?? []).filter((b) => b.length > 40).slice(0, 6);

  return (
    <>
      <PageIntro
        eyebrow={fam.name}
        title={p.name}
        lede={p.summary?.slice(0, 320) || p.lede}
        crumb={[
          { label: 'Inicio', href: '/' },
          { label: 'Software', href: '/software' },
          { label: fam.name, href: `/software/${fam.slug}` },
        ]}
      />

      <section className="bg-beige pb-20 md:pb-28">
        <div className="mx-auto grid w-full max-w-[1440px] gap-14 px-6 md:grid-cols-[1.35fr_1fr] md:gap-20 md:px-16">
          <div>
            {paragraphs.length > 0 ? (
              paragraphs.map((t, i) => (
                <Reveal key={i} delay={i * 40}>
                  <p
                    className={`text-[15px] leading-[1.65] text-brand-deep/70 md:text-[16px] ${
                      i > 0 ? 'mt-5' : ''
                    }`}
                  >
                    {t}
                  </p>
                </Reveal>
              ))
            ) : (
              <p className="text-[15px] leading-[1.65] text-brand-deep/70">
                Solicita una demo o cotización de {p.name}. Nuestro equipo técnico te ayuda a
                dimensionar licencias, comparar ediciones y planear la implementación.
              </p>
            )}

            <div className="mt-12 border-t border-brand-deep/15 pt-8">
              <p className="t-mono mb-5 text-brand-deep/45">También de {fam.name}</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {siblings.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/software/${brand}/${s.slug}`}
                    className="group flex items-center justify-between gap-4 rounded-md border border-brand-deep/12 px-4 py-3 transition-colors hover:border-brand-deep/30"
                  >
                    <span className="text-[14px] text-brand-deep">{s.name}</span>
                    <svg
                      width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true"
                      className="shrink-0 text-brand-deep/35 transition-colors group-hover:text-brand"
                    >
                      <path d="M1 11L11 1M11 1H3.5M11 1v7.5" stroke="currentColor" strokeWidth="1.3" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <aside className="md:sticky md:top-32 md:self-start">
            <div className="rounded-lg border border-brand-deep/15 bg-[#FBF1DF] p-7">
              <p className="t-mono mb-3 text-brand-deep/45">Cotizar</p>
              <h2 className="t-display text-[26px] leading-[1.1] text-brand-deep">
                ¿Te ayudamos a elegir la edición?
              </h2>
              <p className="mt-3 text-[14px] leading-[1.55] text-brand-deep/60">
                Te contactamos con un especialista del país que corresponda. Sin compromiso.
              </p>
              <div className="mt-6 flex flex-col gap-2.5">
                <Link href="/contacto" className="btn bg-brand text-white hover:bg-[#e56400]">
                  Solicitar cotización
                </Link>
                <Link href="/servicios" className="btn btn-outline">
                  Ver servicios de implementación
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
