'use client';
import Link from 'next/link';
import { useState } from 'react';
import software from '@/data/software.json';
import Reveal from '@/components/Reveal';

type Family = { slug: string; name: string; products: { name: string; slug: string }[] };

export default function BrandGrid() {
  const families = software.families as Family[];
  const [hover, setHover] = useState<string | null>(null);
  const active = families.find((f) => f.slug === hover);

  return (
    <section className="relative bg-beige pb-24 pt-8 md:pb-36">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-16">
        <Reveal>
          <div className="flex flex-col gap-6 border-t border-brand-deep/15 pt-10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="t-mono mb-5 text-brand-deep/45">Catálogo</p>
              <h2 className="t-display max-w-[18ch] text-[clamp(32px,4vw,56px)] leading-[1.04] text-brand-deep">
                15 fabricantes. Una sola conversación.
              </h2>
            </div>
            <Link
              href="/software"
              className="inline-flex shrink-0 items-center gap-2 self-start border-b border-brand-deep/30 pb-1 text-[14px] text-brand-deep transition-colors hover:border-brand hover:text-brand md:self-auto"
            >
              Ver todo el catálogo
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M1 11L11 1M11 1H3.5M11 1v7.5" stroke="currentColor" strokeWidth="1.3" />
              </svg>
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-brand-deep/12 bg-brand-deep/12 md:grid-cols-3 lg:grid-cols-5">
          {families.map((f, i) => (
            <Reveal key={f.slug} delay={Math.min(i * 40, 320)}>
              <Link
                href={`/software/${f.slug}`}
                onMouseEnter={() => setHover(f.slug)}
                onMouseLeave={() => setHover(null)}
                className="group flex h-[112px] flex-col justify-between bg-beige p-5 transition-colors duration-400 hover:bg-[#FBF1DF]"
              >
                <span className="t-mono text-brand-deep/35">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-[16px] leading-[1.2] text-brand-deep transition-transform duration-500 group-hover:translate-x-1">
                  {f.name}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 h-6">
          {active && (
            <p className="t-mono text-brand-deep/50">
              {active.products.length} productos · {active.products.slice(0, 4).map((p) => p.name).join(' · ')}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
