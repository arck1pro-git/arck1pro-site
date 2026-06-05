import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Libera o acesso ao dev server por outros aparelhos na rede local.
  // Sem isto, o Next 16 bloqueia os assets de dev (JS/HMR) para origens != localhost,
  // e o React não hidrata no celular (toggle, simulador etc. ficam sem reagir).
  allowedDevOrigins: ['192.168.3.110', '192.168.3.*', '192.168.56.*'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
