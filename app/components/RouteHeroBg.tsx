'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

// Imagem de fundo do topo das rotas internas, com o mesmo parallax da home hero.
// A altura (75svh desktop / 100svh mobile) vem da classe .route-hero-bg no globals.css.
export default function RouteHeroBg() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let top = 0
    let rafId = 0

    const calibrate = () => {
      const rect = wrapRef.current?.getBoundingClientRect()
      top = rect ? rect.top + window.scrollY : 0
    }

    const tick = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${(window.scrollY - top) * 0.3}px)`
      }
    }

    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(tick)
    }

    calibrate()
    tick()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', calibrate, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', calibrate)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="route-hero-bg"
      style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 0, overflow: 'hidden' }}
    >
      <div
        ref={bgRef}
        className="absolute top-[-30%] bottom-[-30%] left-0 right-0 will-change-transform"
      >
        <Image
          src="/header.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: 'center 30%' }}
        />
        {/* Escurecimento para legibilidade do conteúdo do hero */}
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.62)' }} />
      </div>
    </div>
  )
}
