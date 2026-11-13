'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { NAV, BRANDS, SITE } from '@/lib/content';
import Logo from './Logo';

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [swOpen, setSwOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = menu ? 'hidden' : '';
  }, [menu]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 md:pt-5">
        <div
          className={`flex w-full max-w-[800px] items-center justify-between gap-1 rounded-[10px] bg-white px-2 py-[7px] pl-5 shadow-[0_2px_18px_rgba(0,0,0,0.07)] transition-all duration-500 ease-smooth md:pl-5 ${
            scrolled ? 'backdrop-blur-md' : ''
          }`}
        >
          <Link href="/" aria-label="PCCAD inicio" className="flex shrink-0 items-center">
            <Logo className="h-[26px] md:h-[30px]" />
          </Link>

          <nav className="hidden items-center gap-0.5 md:flex">
            <div
              className="relative"
              onMouseEnter={() => setSwOpen(true)}
              onMouseLeave={() => setSwOpen(false)}
            >
              <button className="rounded-md px-3 py-2 text-[14px] leading-none text-black/85 transition-colors hover:text-black">
                Software
              </button>
              {swOpen && (
                <div className="absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-3">
                  <div className="rounded-xl bg-white p-5 shadow-[0_16px_50px_rgba(0,0,0,0.14)]">
                    <p className="t-mono mb-3 text-brand-deep/45">Fabricantes</p>
                    <div className="grid grid-cols-3 gap-x-4 gap-y-1.5">
                      {BRANDS.map((b) => (
                        <Link
                          key={b.slug}
                          href={`/software/${b.slug}`}
                          className="rounded px-1 py-1.5 text-[13.5px] text-black/75 transition-colors hover:text-brand"
                        >
                          {b.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {NAV.filter((n) => n.label !== 'Software').map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="rounded-md px-3 py-2 text-[14px] leading-none text-black/85 transition-colors hover:text-black"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <Link
              href="/contacto"
              className="hidden rounded-[6px] bg-[var(--logo-blue)] px-4 py-[9px] text-[14px] leading-none text-white transition-colors hover:bg-[var(--logo-blue-hover)] md:inline-flex"
            >
              Contactar
            </Link>
            <button
              onClick={() => setMenu(true)}
              aria-label="Abrir menú"
              className="flex h-9 w-9 items-center justify-center rounded-md md:hidden"
            >
              <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden="true">
                <path d="M0 1h18M0 11h18" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[60] bg-beige transition-opacity duration-400 md:hidden ${
          menu ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <Logo className="h-[28px]" />
          <button onClick={() => setMenu(false)} aria-label="Cerrar menú" className="p-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M1 1l18 18M19 1L1 19" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col px-6 pt-6">
          {[{ label: 'Software', href: '/software' }, ...NAV.filter((x) => x.label !== 'Software')].map(
            (n, i) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setMenu(false)}
                className="t-display border-b border-brand-deep/10 py-4 text-[38px] leading-none text-black"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                {n.label}
              </Link>
            )
          )}
          <Link
            href="/contacto"
            onClick={() => setMenu(false)}
            className="btn btn-brand mt-8 self-start"
          >
            Contactar
          </Link>
          <p className="t-mono mt-10 text-brand-deep/45">{SITE.phone}</p>
        </nav>
      </div>
    </>
  );
}
