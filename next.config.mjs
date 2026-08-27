/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
      },
    ],
  },

  experimental: {
    serverActions: {
      bodySizeLimit: '1000mb',
    },
  },

};

export default nextConfig;
