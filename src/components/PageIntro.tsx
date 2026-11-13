import Link from 'next/link';

export default function PageIntro({
  eyebrow,
  title,
  lede,
  crumb,
  tone = 'light',
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  crumb?: { label: string; href: string }[];
  tone?: 'light' | 'dark';
}) {
  const dark = tone === 'dark';
  return (
    <section className={`relative ${dark ? 'bg-brand-deep text-beige' : 'bg-beige text-brand-deep'}`}>
      <div className="mx-auto w-full max-w-[1440px] px-6 pb-14 pt-32 md:px-16 md:pb-20 md:pt-40">
        {crumb && (
          <nav aria-label="Ruta" className="mb-8 flex flex-wrap items-center gap-2">
            {crumb.map((c, i) => (
              <span key={c.href} className="flex items-center gap-2">
                {i > 0 && <span className={dark ? 'text-beige/25' : 'text-brand-deep/25'}>/</span>}
                <Link
                  href={c.href}
                  className={`t-mono transition-colors ${
                    dark ? 'text-beige/45 hover:text-sun' : 'text-brand-deep/45 hover:text-brand'
                  }`}
                >
                  {c.label}
                </Link>
              </span>
            ))}
          </nav>
        )}
        <p className={`t-mono mb-6 ${dark ? 'text-beige/40' : 'text-brand-deep/45'}`}>{eyebrow}</p>
        <h1 className="t-display max-w-[18ch] text-[clamp(38px,5.6vw,88px)] leading-[0.98] tracking-[-0.03em]">
          {title}
        </h1>
        {lede && (
          <p
            className={`mt-7 max-w-[58ch] text-[15px] leading-[1.55] md:text-[17px] ${
              dark ? 'text-beige/65' : 'text-brand-deep/65'
            }`}
          >
            {lede}
          </p>
        )}
      </div>
    </section>
  );
}
