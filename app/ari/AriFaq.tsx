'use client'

import { useState } from 'react'

type FaqItem = { q: string; a: string }

export default function AriFaq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-3)' }}>
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div
            key={i}
            className="rounded-4xl lift"
            style={{
              position: 'relative',
              overflow: 'hidden',
              border: 'var(--line-1) solid rgba(0,16,49,0.1)',
              background: '#ffffff',
            }}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 'var(--s-4)',
                padding: 'var(--s-6)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <span
                className="font-display text-navy"
                style={{ fontSize: 'var(--fs-16)', fontWeight: 500 }}
              >
                {item.q}
              </span>
              <span
                aria-hidden
                style={{
                  flexShrink: 0,
                  width: 28,
                  height: 28,
                  borderRadius: 'var(--r-pill)',
                  border: `var(--line-1) solid ${isOpen ? 'var(--brand-gold)' : 'rgba(0,16,49,0.15)'}`,
                  background: isOpen ? 'var(--brand-gold)' : 'transparent',
                  color: isOpen ? 'var(--brand-navy)' : 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: isOpen ? 'rotate(45deg)' : 'none',
                  transition:
                    'background var(--dur-2) var(--ease-out), transform var(--dur-2) var(--ease-out), border-color var(--dur-2) var(--ease-out)',
                }}
              >
                +
              </span>
            </button>

            <div
              style={{
                display: 'grid',
                gridTemplateRows: isOpen ? '1fr' : '0fr',
                transition: 'grid-template-rows var(--dur-3) var(--ease-out)',
              }}
            >
              <div style={{ overflow: 'hidden' }}>
                <p
                  className="font-sans"
                  style={{
                    fontSize: 'var(--fs-14)',
                    lineHeight: 1.75,
                    color: 'var(--text-muted)',
                    margin: 0,
                    padding: '0 var(--s-6) var(--s-6)',
                    maxWidth: 720,
                  }}
                >
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
