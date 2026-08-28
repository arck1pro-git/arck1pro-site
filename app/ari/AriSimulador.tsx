'use client'

import { useState } from 'react'

// Taxas, faixas e formatação vivem em lib/ari-taxas: o simulador do /simulador
// usa os mesmos números, e duas tabelas separadas acabariam divergindo.
import {
  MIN,
  MAX,
  STEP,
  PRAZOS,
  taxaPara,
  brl2,
  brl0,
  pct,
  taxaPct,
  type Forma,
  type Prazo,
} from '@/lib/ari-taxas'

export default function AriSimulador() {
  const [capital, setCapital] = useState(50_000)
  const [prazo, setPrazo] = useState<Prazo>(36)
  const [forma, setForma] = useState<Forma>('final')

  const taxa = taxaPara(forma, prazo, capital)
  const retornoTotal = capital * taxa * prazo
  const rendaMensal = capital * taxa
  const total = capital + retornoTotal
  const ganho = taxa * prazo * 100

  // Os segmentados são os próprios botões do site: .btn--gold quando ativos,
  // .btn--ghost quando não. Antes eram pílulas de desenho próprio, com dourado
  // chapado e minúsculas — o único par de botões do projeto que não seguia o
  // .btn (reto, versalete, com a rampa dourada).
  const segCls = (active: boolean) => `btn ${active ? 'btn--gold' : 'btn--ghost'}`
  const segStyle: React.CSSProperties = { flex: 1, justifyContent: 'center', whiteSpace: 'nowrap' }

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
        className="ari-sim__ctrl lg:col-span-7 rounded-lg lift"
        style={{
          border: 'var(--line-1) solid rgba(0,16,49,0.1)',
          background: '#ffffff',
          padding: 'var(--s-8)',
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
            style={{
              width: '100%',
              marginTop: 'var(--s-5)',
              // A parcela já percorrida da trilha, lida pelo CSS para pintar o
              // trecho dourado. Sem isto o preenchimento dependeria do
              // accent-color, que cada browser desenha de um jeito.
              ['--pos' as string]: `${((capital - MIN) / (MAX - MIN)) * 100}%`,
            } as React.CSSProperties}
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
            {PRAZOS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPrazo(p)}
                aria-pressed={prazo === p}
                className={segCls(prazo === p)}
                style={segStyle}
              >
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
            <button
              type="button"
              onClick={() => setForma('mensal')}
              aria-pressed={forma === 'mensal'}
              className={segCls(forma === 'mensal')}
              style={segStyle}
            >
              Mensal
            </button>
            <button
              type="button"
              onClick={() => setForma('final')}
              aria-pressed={forma === 'final'}
              className={segCls(forma === 'final')}
              style={segStyle}
            >
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
        className="ari-sim__out lg:col-span-5 rounded-lg lift"
        style={{
          background: 'var(--brand-navy)',
          color: 'var(--brand-cream)',
          padding: 'var(--s-8)',
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
            {taxaPct(taxa)} a.m.
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
