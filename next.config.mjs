import path from 'node:path';
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';

initOpenNextCloudflareForDev();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // OpenNext empaqueta el server desde .next/standalone.
  output: 'standalone',
  // Evita que Next infiera una raíz de workspace desde un package.json superior.
  outputFileTracingRoot: path.resolve(process.cwd()),
  // Todas las imágenes se sirven como <img> desde /public.
  images: { unoptimized: true },
};

export default nextConfig;
