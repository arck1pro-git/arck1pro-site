import type { ReactNode } from 'react'
import { HERO_VIDEO } from '@/lib/media'

// Hero das rotas internas, no mesmo desenho da home e das 10 comparações: o
// vídeo em object-cover, o scrim uniforme por cima e o conteúdo separado pelo
// justify-between — título ancorado no topo da dobra, texto e botões no pé.
//
// Substituiu a RouteHeroBg, que era a header.png escurecida com parallax de
// scroll. Cada rota tinha a própria cópia daquele bloco em estilo inline, com
// alturas e escalas de título ligeiramente diferentes entre si; aqui elas
// dividem uma peça só.
//
// O marginTop negativo que puxa a hero para trás do header fica no <main> de
// cada rota, e por isso não se repete aqui.

// Três escalas porque os títulos das rotas variam muito de comprimento. A
// grande é a mesma da h1 da home; a de /ari, com uma frase de 100 caracteres,
// viraria um paredão nessa medida.
const ESCALAS = {
  grande: 'text-5xl lg:text-[clamp(3.5rem,7.2vw,6rem)]',
  media: 'text-4xl lg:text-[clamp(2.75rem,5.4vw,4.25rem)]',
  compacta: 'text-3xl lg:text-[clamp(2.25rem,4vw,3.25rem)]',
} as const

export default function RouteHero({
  eyebrow,
  titulo,
  texto,
  acoes,
  escala = 'media',
}: {
  eyebrow?: string
  titulo: ReactNode
  texto?: ReactNode
  acoes?: ReactNode
  escala?: keyof typeof ESCALAS
}) {
  // Sem texto nem botões não há bloco de pé de dobra, e o justify-between
  // deixaria o título grudado no topo com meia tela de vazio embaixo. Nesse
  // caso ele volta a ser um título centrado na dobra.
  const temPe = Boolean(texto || acoes)

  return (
    <section
      className={`reveal reveal--fade min-h-svh flex flex-col ${
        temPe ? 'justify-between' : 'justify-center'
      } pt-32 px-6 pb-24 relative overflow-hidden`}
    >
      <video
        aria-hidden
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>

      <div aria-hidden className="hero-scrim" />

      <div className="container relative text-center">
        {eyebrow && (
          <p
            className="font-display text-gold-soft text-base"
            style={{ letterSpacing: '0.15em', marginBottom: 'var(--s-4)' }}
          >
            {eyebrow}
          </p>
        )}

        <h1
          className={`font-display text-cream font-light leading-[0.96] tracking-[-0.02em] ${ESCALAS[escala]}`}
          style={{ maxWidth: 1100, marginInline: 'auto' }}
        >
          {titulo}
        </h1>
      </div>

      {/* Descido pelo justify-between da section, e não por margin: o .container
          declara margin: 0 auto fora de cascade layer e venceria a utility. */}
      {temPe && (
        <div className="container relative flex flex-col items-center gap-8 text-center">
          {texto && (
            <p className="font-sans fs-16 leading-[1.75] font-normal text-white max-w-[620px]">
              {texto}
            </p>
          )}
          {acoes && <div className="flex gap-3 flex-wrap justify-center">{acoes}</div>}
        </div>
      )}
    </section>
  )
}
