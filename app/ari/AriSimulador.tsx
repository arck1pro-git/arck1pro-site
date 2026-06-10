'use client'

import { useState } from 'react'

type Prazo = 18 | 24 | 36
type Forma = 'mensal' | 'final'

// Taxa ao mês (juros simples) por prazo e forma de retorno
const RATES: Record<Forma, Record<Prazo, number>> = {
  mensal: { 18: 0.015, 24: 0.016, 36: 0.018 },
  final: { 18: 0.02, 24: 0.021, 36: 0.023 },
}

const MIN = 50_000
const MAX = 1_000_000
const STEP = 10_000

const prazos: Prazo[] = [18, 24, 36]

const brl0 = (n: number) =>
  n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
const brl2 = (n: number) =>
  n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 })

const pct = (n: number) => {
  const s = n.toFixed(1).replace('.0', '').replace('.', ',')
  return `${s}%`
}

export default function AriSimulador() {
  const [capital, setCapital] = useState(50_000)
  const [prazo, setPrazo] = useState<Prazo>(36)
  const [forma, setForma] = useState<Forma>('final')

  const taxa = RATES[forma][prazo]
  const retornoTotal = capital * taxa * prazo
  const rendaMensal = capital * taxa
  const total = capital + retornoTotal
  const ganho = taxa * prazo * 100

  const segBtn = (active: boolean): React.CSSProperties => ({
    flex: 1,
    padding: 'var(--s-3) var(--s-4)',
    borderRadius: 'var(--r-pill)',
    border: active ? 'none' : 'var(--line-1) solid rgba(0,16,49,0.15)',
    background: active ? 'var(--brand-gold)' : 'transparent',
    color: active ? 'var(--brand-navy)' : 'var(--text-muted)',
    fontWeight: active ? 600 : 400,
    fontSize: 'var(--fs-14)',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'background .15s, color .15s',
  })

  const label: React.CSSProperties = {
    fontSize: '1rem',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'var(--sim-eyebrow, var(--text-faint))',
  }

  return (
    <div className="ari-sim grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
      {/* Controles */}
      <div
        className="ari-sim__ctrl lg:col-span-7 rounded-4xl lift"
        style={{
          border: 'var(--line-1) solid rgba(0,16,49,0.1)',
          background: '#ffffff',
          padding: 'var(--s-10) var(--s-8)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--s-8)',
        }}
      >
        {/* Capital */}
        <div>
          <p className="font-display" style={{ ...label, marginBottom: 'var(--s-3)' }}>
            Capital a investir
          </p>
          <p className="font-display text-navy ari-sim__num" style={{ fontSize: 'var(--fs-40)', fontWeight: 600, lineHeight: 1, margin: 0 }}>
            {brl2(capital)}
          </p>
          <input
            type="range"
            min={MIN}
            max={MAX}
            step={STEP}
            value={capital}
            onChange={(e) => setCapital(Number(e.target.value))}
            aria-label="Capital a investir"
            className="ari-range"
            style={{ width: '100%', marginTop: 'var(--s-5)', accentColor: 'var(--brand-gold)', cursor: 'pointer' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--s-2)' }}>
            {['R$ 50k', 'R$ 500k', 'R$ 1M'].map((m) => (
              <span key={m} className="font-display" style={{ fontSize: 11, color: 'var(--sim-eyebrow, var(--text-faint))' }}>
                {m}
              </span>
            ))}
          </div>
        </div>

        {/* Prazo */}
        <div>
          <p className="font-display lg:block hidden" style={{ ...label, marginBottom: 'var(--s-3)' }}>
            Prazo
          </p>
          <div style={{ display: 'flex', gap: 'var(--s-2)' }}>
            {prazos.map((p) => (
              <button key={p} type="button" onClick={() => setPrazo(p)} className="font-display" style={segBtn(prazo === p)}>
                {p} meses
              </button>
            ))}
          </div>
        </div>

        {/* Forma de retorno */}
        <div>
          <p className="font-display lg:block hidden" style={{ ...label, marginBottom: 'var(--s-3)' }}>
            Forma de retorno
          </p>
          <div style={{ display: 'flex', gap: 'var(--s-2)' }}>
            <button type="button" onClick={() => setForma('mensal')} className="font-display" style={segBtn(forma === 'mensal')}>
              Mensal
            </button>
            <button type="button" onClick={() => setForma('final')} className="font-display" style={segBtn(forma === 'final')}>
              Final
            </button>
          </div>
          <p className="font-sans" style={{ fontSize: 'var(--fs-13)', color: 'var(--sim-muted, var(--text-muted))', lineHeight: 1.6, margin: 'var(--s-3) 0 0' }}>
            {forma === 'final'
              ? 'Capital e rendimento pagos integralmente no vencimento.'
              : 'Rendimento pago todo mês; o capital é devolvido no vencimento.'}
          </p>
        </div>
      </div>

      {/* Resultado */}
      <div
        className="ari-sim__out lg:col-span-5 rounded-4xl lift"
        style={{
          background: 'var(--brand-navy)',
          color: 'var(--brand-cream)',
          padding: 'var(--s-10) var(--s-8)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--s-6)',
          ['--sim-label' as string]: 'rgba(236,235,231,0.6)',
          ['--sim-line' as string]: 'rgba(236,235,231,0.12)',
          ['--sim-accent' as string]: 'var(--brand-gold-soft)',
        } as React.CSSProperties}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span className="font-sans" style={{ fontSize: 'var(--fs-14)', color: 'var(--sim-label)' }}>
            Taxa aplicada
          </span>
          <span className="font-display text-gold" style={{ fontSize: 'var(--fs-20)', fontWeight: 600 }}>
            {(taxa * 100).toFixed(2).replace('.', ',')}% a.m.
          </span>
        </div>

        <div>
          <p className="font-sans" style={{ fontSize: 'var(--fs-14)', color: 'var(--sim-label)', margin: 0 }}>
            {forma === 'final' ? 'Você recebe no vencimento' : 'Você recebe por mês'}
          </p>
          <p className="font-display text-gold ari-sim__num" style={{ fontSize: 'var(--fs-40)', fontWeight: 600, lineHeight: 1.05, margin: 'var(--s-2) 0 var(--s-1)' }}>
            {forma === 'final' ? brl0(total) : brl0(rendaMensal)}
          </p>
          <p className="font-display text-base" style={{ letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--sim-accent)', margin: 0 }}>
            isento de Imposto de Renda
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-4)' }}>
          {[
            ['Retorno total no período', brl0(retornoTotal)],
            ['Capital + retorno', brl0(total)],
            ['Ganho sobre o capital', `+${pct(ganho)}`],
          ].map(([k, v]) => (
            <div
              key={k}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                gap: 'var(--s-4)',
                paddingTop: 'var(--s-4)',
                borderTop: 'var(--hairline) solid var(--sim-line)',
              }}
            >
              <span className="font-sans" style={{ fontSize: 'var(--fs-14)', color: 'var(--sim-label)' }}>
                {k}
              </span>
              <span className="font-display text-gold" style={{ fontSize: 'var(--fs-16)', fontWeight: 500 }}>
                {v}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
