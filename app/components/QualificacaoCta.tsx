'use client'

import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import ContactModal from './ContactModal'

// Botão que abre o mesmo formulário de qualificação do rodapé ("Sou
// investidor"). O ContatoForm registra a página de origem no lead.
export default function QualificacaoCta({
  children = 'Solicitar qualificação',
  variant = 'gold',
}: {
  children?: React.ReactNode
  variant?: 'gold' | 'ghost' | 'ghost-inv'
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button type="button" className={`btn btn--${variant}`} onClick={() => setOpen(true)}>
        {children} <ArrowUpRight className="arrow" size={16} strokeWidth={2} aria-hidden />
      </button>
      <ContactModal open={open} role={open ? 'investidor' : null} onClose={() => setOpen(false)} />
    </>
  )
}
