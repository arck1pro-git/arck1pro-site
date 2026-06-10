'use client'

import { useState } from 'react'

const investOptions = [
  'R$ 50 mil',
  'R$ 100 mil',
  'R$ 250 mil',
  'R$ 500 mil',
  'R$ 1 milhão ou mais',
]

type Variant = 'light' | 'dark'
type Role = '' | 'corretor' | 'investidor'

export default function ContatoForm({
  variant = 'light',
  initialRole = '',
  lockRole = false,
}: {
  variant?: Variant
  initialRole?: Role
  lockRole?: boolean
}) {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({
    role: initialRole as Role,
    name: '',
    email: '',
    phone: '',
    estado: '',
    cidade: '',
    alreadyInvests: '',
    investFrom: '',
  })

  const isInvestidor = form.role === 'investidor'

  const submitLabel =
    form.role === 'corretor'
      ? 'Quero vender o Tourmaline'
      : form.role === 'investidor'
        ? 'Quero me qualificar'
        : 'Enviar'

  const dark = variant === 'dark'

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: 'var(--s-3) var(--s-5)',
    borderRadius: 'var(--r-pill)',
    border: `var(--line-1) solid ${dark ? 'rgba(236,235,231,0.2)' : 'rgba(0,16,49,0.15)'}`,
    background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.6)',
    backdropFilter: 'blur(6px)',
    color: dark ? 'var(--brand-cream)' : 'var(--text)',
    fontSize: 'var(--fs-15)',
    outline: 'none',
  }

  // Cor de placeholder para selects ainda não escolhidos
  const selectStyle = (value: string): React.CSSProperties => ({
    ...inputStyle,
    cursor: 'pointer',
    color: value
      ? inputStyle.color
      : dark
        ? 'rgba(236,235,231,0.45)'
        : 'var(--text-faint)',
  })

  const cardStyle: React.CSSProperties = {
    border: `var(--line-1) solid ${dark ? 'rgba(236,235,231,0.12)' : 'rgba(0,16,49,0.12)'}`,
    background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.5)',
    backdropFilter: 'blur(6px)',
  }

  if (sent) {
    return (
      <div
        className="rounded-4xl"
        style={{
          maxWidth: 560,
          margin: '0 auto',
          padding: 'var(--s-12) var(--s-8)',
          textAlign: 'center',
          ...cardStyle,
        }}
      >
        <p
          className={`font-display ${dark ? '' : 'text-navy'}`}
          style={{
            fontSize: 'var(--fs-24)',
            fontWeight: 500,
            marginBottom: 'var(--s-3)',
            color: dark ? 'var(--brand-cream)' : undefined,
          }}
        >
          Recebemos seu contato.
        </p>
        <p
          className="font-sans"
          style={{
            fontSize: 'var(--fs-15)',
            color: dark ? 'rgba(236,235,231,0.6)' : 'var(--text-muted)',
          }}
        >
          Nossa equipe retornará em breve.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        setSent(true)
      }}
      className="rounded-4xl"
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--s-4)',
        padding: 'var(--s-8) var(--s-6)',
        ...cardStyle,
      }}
    >
      {!lockRole && (
        <select
          required
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value as Role })}
          className="font-sans"
          style={selectStyle(form.role)}
        >
          <option value="" disabled>
            Sou…
          </option>
          <option value="corretor" style={{ color: 'var(--brand-navy)' }}>
            Sou corretor e quero representar o Tourmaline
          </option>
          <option value="investidor" style={{ color: 'var(--brand-navy)' }}>
            Sou investidor
          </option>
        </select>
      )}
      <input
        type="text"
        required
        placeholder="Nome completo"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="font-sans"
        style={inputStyle}
      />
      <input
        type="email"
        required
        placeholder="E-mail"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="font-sans"
        style={inputStyle}
      />
      <input
        type="tel"
        required
        placeholder={form.role === 'corretor' ? 'WhatsApp' : 'Telefone'}
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        className="font-sans"
        style={inputStyle}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          required
          placeholder="Estado"
          value={form.estado}
          onChange={(e) => setForm({ ...form, estado: e.target.value })}
          className="font-sans"
          style={inputStyle}
        />
        <input
          type="text"
          required
          placeholder="Cidade"
          value={form.cidade}
          onChange={(e) => setForm({ ...form, cidade: e.target.value })}
          className="font-sans"
          style={inputStyle}
        />
      </div>
      {isInvestidor && (
        <>
          <select
            required
            value={form.alreadyInvests}
            onChange={(e) => setForm({ ...form, alreadyInvests: e.target.value })}
            className="font-sans"
            style={selectStyle(form.alreadyInvests)}
          >
            <option value="" disabled>
              Você já investe?
            </option>
            <option value="imobiliario" style={{ color: 'var(--brand-navy)' }}>
              Sim, no mercado imobiliário
            </option>
            <option value="financeiro" style={{ color: 'var(--brand-navy)' }}>
              Sim, no mercado financeiro
            </option>
            <option value="nao" style={{ color: 'var(--brand-navy)' }}>
              Ainda não invisto
            </option>
          </select>
          <select
            required
            value={form.investFrom}
            onChange={(e) => setForm({ ...form, investFrom: e.target.value })}
            className="font-sans"
            style={selectStyle(form.investFrom)}
          >
            <option value="" disabled>
              Capital disponível para investir?
            </option>
            {investOptions.map((opt) => (
              <option key={opt} value={opt} style={{ color: 'var(--brand-navy)' }}>
                {opt}
              </option>
            ))}
          </select>
        </>
      )}
      <button
        type="submit"
        className="btn btn--gold"
        style={{ width: 'fit-content', margin: 'var(--s-4) auto 0' }}
      >
        {submitLabel} <span className="arrow">→</span>
      </button>
    </form>
  )
}
