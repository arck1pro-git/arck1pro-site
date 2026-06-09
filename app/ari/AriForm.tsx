'use client'

import { useState } from 'react'

const capitalOptions = [
  'R$ 50 mil a R$ 100 mil',
  'R$ 100 mil a R$ 300 mil',
  'R$ 300 mil a R$ 500 mil',
  'R$ 500 mil a R$ 1 milhão',
  'Acima de R$ 1 milhão',
]

const modalidadeOptions = [
  'Imóveis',
  'Renda fixa',
  'Fundos imobiliários',
  'Não invisto atualmente',
]

const prazoOptions = ['15 dias', '30 dias', '60 dias', 'Ainda estou avaliando']

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: 'var(--s-3) var(--s-5)',
  borderRadius: 'var(--r-pill)',
  border: 'var(--line-1) solid rgba(0,16,49,0.15)',
  background: 'rgba(255,255,255,0.6)',
  backdropFilter: 'blur(6px)',
  color: 'var(--text)',
  fontSize: 'var(--fs-15)',
  outline: 'none',
}

export default function AriForm() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    profession: '',
    capital: '',
    modalidade: '',
    prazo: '',
  })

  const selectStyle = (value: string): React.CSSProperties => ({
    ...inputStyle,
    cursor: 'pointer',
    color: value ? 'var(--text)' : 'var(--text-faint)',
  })

  if (sent) {
    return (
      <div
        className="rounded-4xl"
        style={{
          width: '100%',
          padding: 'var(--s-12) var(--s-8)',
          textAlign: 'center',
          border: 'var(--line-1) solid rgba(0,16,49,0.12)',
          background: 'rgba(255,255,255,0.5)',
          backdropFilter: 'blur(6px)',
        }}
      >
        <p
          className="font-display text-navy"
          style={{ fontSize: 'var(--fs-24)', fontWeight: 500, marginBottom: 'var(--s-3)' }}
        >
          Recebemos sua candidatura.
        </p>
        <p className="font-sans" style={{ fontSize: 'var(--fs-15)', color: 'var(--text-muted)' }}>
          Nossa equipe de estruturação avalia o seu perfil e retoma o contato com os próximos passos.
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
        border: 'var(--line-1) solid rgba(0,16,49,0.12)',
        background: 'rgba(255,255,255,0.5)',
        backdropFilter: 'blur(6px)',
      }}
    >
      <input
        type="text"
        required
        placeholder="Nome completo"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="font-sans"
        style={inputStyle}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="tel"
          required
          placeholder="Telefone / WhatsApp"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
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
      </div>
      <input
        type="text"
        placeholder="Profissão"
        value={form.profession}
        onChange={(e) => setForm({ ...form, profession: e.target.value })}
        className="font-sans"
        style={inputStyle}
      />
      <select
        required
        value={form.capital}
        onChange={(e) => setForm({ ...form, capital: e.target.value })}
        className="font-sans"
        style={selectStyle(form.capital)}
      >
        <option value="" disabled>
          Capital disponível para investimento
        </option>
        {capitalOptions.map((opt) => (
          <option key={opt} value={opt} style={{ color: 'var(--brand-navy)' }}>
            {opt}
          </option>
        ))}
      </select>
      <select
        required
        value={form.modalidade}
        onChange={(e) => setForm({ ...form, modalidade: e.target.value })}
        className="font-sans"
        style={selectStyle(form.modalidade)}
      >
        <option value="" disabled>
          Já investe em alguma modalidade?
        </option>
        {modalidadeOptions.map((opt) => (
          <option key={opt} value={opt} style={{ color: 'var(--brand-navy)' }}>
            {opt}
          </option>
        ))}
      </select>
      <select
        required
        value={form.prazo}
        onChange={(e) => setForm({ ...form, prazo: e.target.value })}
        className="font-sans"
        style={selectStyle(form.prazo)}
      >
        <option value="" disabled>
          Horizonte para iniciar a alocação
        </option>
        {prazoOptions.map((opt) => (
          <option key={opt} value={opt} style={{ color: 'var(--brand-navy)' }}>
            {opt}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="btn btn--gold"
        style={{ width: 'fit-content', margin: 'auto auto 0' }}
      >
        Solicitar qualificação <span className="arrow">→</span>
      </button>
    </form>
  )
}
