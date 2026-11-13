import type { Metadata } from 'next';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import GridLines from '@/components/GridLines';

export const metadata: Metadata = {
  title: 'PCCAD · Soluciones tecnológicas para la industria AEC',
  description:
    'Tu socio integral en software, hardware, formación y consultoría BIM para arquitectura, ingeniería y construcción en Latinoamérica.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-beige font-sans antialiased">
        <SmoothScroll />
        <GridLines />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
