import type { NextConfig } from "next";

// Cabeçalhos de segurança aplicados a todas as rotas.
const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
];

const nextConfig: NextConfig = {
  // Sem isto o Next elege a raiz do workspace pelo lockfile mais proximo e acaba
  // escolhendo a pasta de usuario (ha um package-lock.json solto la). Raiz errada
  // significa Turbopack vigiando aquela arvore inteira, o que na pratica fez o
  // watcher perder alteracoes do globals.css e servir CSS defasado no dev.
  //
  // ATENCAO ao mexer aqui: trocar `root` NAO invalida o cache do Turbopack.
  // O cache em .next/dev/cache guarda a raiz antiga e segue vigiando a arvore
  // errada mesmo com o config certo - foi assim que 117 processos de postcss
  // vazaram segurando 7 GB de RAM e travando o `npm run dev`.
  // Sempre apague .next antes de subir o dev depois de alterar esta opcao.
  turbopack: {
    root: import.meta.dirname,
  },
  // Libera o acesso ao dev server por outros aparelhos na rede local.
  // Sem isto, o Next 16 bloqueia os assets de dev (JS/HMR) para origens != localhost,
  // e o React não hidrata no celular (toggle, simulador etc. ficam sem reagir).
  allowedDevOrigins: ['192.168.3.110', '192.168.3.*', '192.168.56.*'],
  images: {
    // Entrega AVIF (com fallback WebP) quando o navegador suporta.
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }];
  },
};

export default nextConfig;
