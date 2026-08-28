'use client'

import { useState } from 'react'
import {
  MIN,
  MAX,
  STEP,
  PRAZOS,
  resultado,
  brl0,
  brl2,
  pct,
  taxaPct,
  type Forma,
} from '@/lib/ari-taxas'

// Variante do simulador para a rota /simulador.
//
// O do /ari escolhe capital, prazo e forma e mostra um resultado por vez. Aqui
// o prazo sai dos controles e vira linha de tabela: o visitante define o
// capital, escolhe como quer receber e compara os três prazos lado a lado, sem
// ter que clicar em cada um e guardar o número de cabeça.
//
// As taxas são as mesmas, lidas de lib/ari-taxas.
export default function SimuladorTabela() {
  const [capital, setCapital] = useState(50_000)
  const [forma, setForma] = useState<Forma>('final')

  const linhas = PRAZOS.map((prazo) => ({ prazo, ...resultado(forma, prazo, capital) }))

  const label: React.CSSProperties = {
    fontSize: '1rem',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'var(--text-faint)',
  }

  const segCls = (active: boolean) => `btn ${active ? 'btn--gold' : 'btn--ghost'}`
  const segStyle: React.CSSProperties = { flex: 1, justifyContent: 'center', whiteSpace: 'nowrap' }

  // Muda com a forma de recebimento: no mensal o número que interessa é quanto
  // cai por mês; no final, quanto sai na conta no vencimento.
  const colunaRecebe = forma === 'final' ? 'Você recebe no vencimento' : 'Você recebe por mês'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-8)' }}>
      <div
        className="rounded-lg lift"
        style={{
          border: 'var(--line-1) solid rgba(0,16,49,0.1)',
          background: '#ffffff',
          padding: 'var(--s-8)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--s-8)',
        }}
      >
        <div>
          <p className="font-display" style={{ ...label, marginBottom: 'var(--s-3)' }}>
            Capital a investir
          </p>
          <p
            className="font-display text-navy"
            style={{ fontSize: 'var(--fs-40)', fontWeight: 600, lineHeight: 1, margin: 0 }}
          >
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
              ['--pos' as string]: `${((capital - MIN) / (MAX - MIN)) * 100}%`,
            } as React.CSSProperties}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--s-2)' }}>
            {['R$ 50k', 'R$ 500k', 'R$ 1M'].map((m) => (
              <span key={m} className="font-display" style={{ fontSize: 11, color: 'var(--text-faint)' }}>
                {m}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="font-display" style={{ ...label, marginBottom: 'var(--s-3)' }}>
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
          <p
            className="font-sans"
            style={{ fontSize: 'var(--fs-13)', color: 'var(--text-muted)', lineHeight: 1.6, margin: 'var(--s-3) 0 0' }}
          >
            {forma === 'final'
              ? 'Capital e rendimento pagos integralmente no vencimento.'
              : 'Rendimento pago todo mês; o capital é devolvido no vencimento.'}
          </p>
        </div>
      </div>

      {/* Mesma tabela das páginas de comparação: <th scope> nas duas direções, e
          o wrapper rola sozinho no mobile, onde cinco colunas de números não
          cabem em 375px. */}
      <div className="cmp-wrap">
        <table className="cmp">
          <caption className="sr-only">
            Retorno estimado por prazo para {brl0(capital)}, com recebimento{' '}
            {forma === 'final' ? 'no vencimento' : 'mensal'}
          </caption>
          <thead>
            <tr>
              <th scope="col">Prazo</th>
              <th scope="col">Taxa</th>
              <th scope="col">{colunaRecebe}</th>
              <th scope="col">Retorno total</th>
              <th scope="col">Ganho</th>
            </tr>
          </thead>
          <tbody>
            {linhas.map((l) => (
              <tr key={l.prazo}>
                <th scope="row">{l.prazo} meses</th>
                <td>{taxaPct(l.taxa)} a.m.</td>
                <td style={{ color: 'var(--brand-navy)', fontWeight: 600 }}>
                  {brl0(forma === 'final' ? l.total : l.rendaMensal)}
                </td>
                <td>{brl0(l.retornoTotal)}</td>
                <td>+{pct(l.ganho)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p
        className="font-display text-base"
        style={{
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--brand-gold)',
          textAlign: 'center',
          margin: 0,
        }}
      >
        isento de Imposto de Renda
      </p>
    </div>
  )
}
