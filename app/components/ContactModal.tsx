'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import ContatoForm from '../contato/ContatoForm'

type Role = 'corretor' | 'investidor'

const eyebrows: Record<Role, string> = {
  investidor: 'Candidatura · ARI',
  corretor: 'Parceria comercial',
}

const titles: Record<Role, string> = {
  investidor: 'Qualificação de investidor',
  corretor: 'Quero vender o Tourmaline',
}

const subtitles: Record<Role, string> = {
  investidor:
    'O ARI opera por seleção. Preencha seus dados e nossa equipe avalia o seu perfil antes de apresentar as operações abertas.',
  corretor:
    'Conte um pouco sobre você. Nossa equipe comercial retoma o contato com os próximos passos.',
}

export default function ContactModal({
  open,
  role,
  onClose,
}: {
  open: boolean
  role: Role | null
  onClose: () => void
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  if (!open || !role || !mounted) return null

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={titles[role]}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--s-6)',
        background: 'rgba(0,16,49,0.6)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="rounded-4xl"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 560,
          maxHeight: '92svh',
          overflowY: 'auto',
          background: '#ffffff',
          border: 'var(--line-1) solid rgba(0,16,49,0.1)',
          padding: 'var(--s-8) var(--s-6) var(--s-6)',
          boxShadow: '0 24px 80px rgba(0,16,49,0.35)',
        }}
      >
        <button
          type="button"
          aria-label="Fechar"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 'var(--s-5)',
            right: 'var(--s-5)',
            width: 36,
            height: 36,
            borderRadius: 'var(--r-pill)',
            border: 'var(--line-1) solid rgba(0,16,49,0.15)',
            background: 'transparent',
            color: 'var(--brand-navy)',
            fontSize: 'var(--fs-18)',
            lineHeight: 1,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ×
        </button>

        <p
          className="font-display text-gold text-base"
          style={{
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            textAlign: 'center',
            margin: '0 0 var(--s-2)',
          }}
        >
          {eyebrows[role]}
        </p>
        <p
          className="font-display text-navy"
          style={{
            fontSize: 'var(--fs-20)',
            fontWeight: 300,
            lineHeight: 1.2,
            textAlign: 'center',
            margin: '0 0 var(--s-2)',
          }}
        >
          {titles[role]}
        </p>
        <p
          className={`font-sans ${role === 'investidor' ? 'hidden lg:block' : ''}`}
          style={{
            fontSize: 'var(--fs-14)',
            lineHeight: 1.55,
            color: 'var(--text-muted)',
            textAlign: 'center',
            margin: '0 auto var(--s-5)',
            maxWidth: 440,
          }}
        >
          {subtitles[role]}
        </p>

        <ContatoForm variant="light" initialRole={role} lockRole compact />
      </div>
    </div>,
    document.body
  )
}
