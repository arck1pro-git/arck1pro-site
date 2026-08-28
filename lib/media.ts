// Mídia compartilhada entre rotas.
//
// A URL do vídeo da hero vive aqui, e não dentro do HeroSection, porque a home e
// as 10 páginas de comparação usam a mesma hero. Duplicar a string nos dois
// lugares deixaria um deles apontando para um vídeo antigo no dia em que ela
// mudar. O layout.tsx já faz preconnect para esse domínio.
export const HERO_VIDEO =
  'https://vlxejpotqiodxdlmmqel.supabase.co/storage/v1/object/public/videos/hero.mp4'
