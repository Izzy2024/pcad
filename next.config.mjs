import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';

initOpenNextCloudflareForDev();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Todas las imágenes se sirven como <img> desde /public.
  images: { unoptimized: true },
};

export default nextConfig;
