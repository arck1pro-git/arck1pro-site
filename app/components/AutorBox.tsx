import Link from 'next/link'
import { EMPRESA, FUNDADORES } from '@/lib/empresa'

// Quadro de autoria no fim dos posts e guias: quem publica, com identificação
// legal e os fundadores. Sinal de experiência e confiança (E-E-A-T) para o
// leitor e para buscadores e IAs, que cruzam com o grafo de lib/empresa.
export default function AutorBox() {
  return (
    <aside
      aria-label="Sobre quem publica"
      className="rounded-lg"
      style={{
        marginTop: 'var(--s-12)',
        padding: 'var(--s-8)',
        background: '#ffffff',
        border: 'var(--line-1) solid rgba(0,16,49,0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--s-3)',
      }}
    >
      <p
        className="font-display text-gold"
        style={{ fontSize: 'var(--fs-13)', letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}
      >
        Publicado por
      </p>
      <p className="font-display text-navy" style={{ fontSize: 'var(--fs-20)', fontWeight: 500, margin: 0 }}>
        {EMPRESA.nome}
      </p>
      <p className="font-sans" style={{ fontSize: 'var(--fs-14)', lineHeight: 1.7, color: 'var(--text-muted)', margin: 0 }}>
        Estruturadora de incorporações de alto padrão no litoral catarinense, fundada pelos arquitetos{' '}
        {FUNDADORES.map((f, i) => (
          <span key={f.id}>
            {i > 0 && ' e '}
            <Link href={`/sobre#${f.id.split('#')[1]}`} className="text-navy" style={{ textDecoration: 'underline' }}>
              {f.nome}
            </Link>
          </span>
        ))}
        , com {EMPRESA.trajetoria.anos} anos de atuação e {EMPRESA.trajetoria.empreendimentos} empreendimentos
        estruturados.
      </p>
      <p className="font-sans" style={{ fontSize: 'var(--fs-12)', color: 'var(--text-faint)', margin: 0 }}>
        {EMPRESA.razaoSocial} · CNPJ {EMPRESA.cnpj} ·{' '}
        <Link href="/sobre#dados-da-empresa" style={{ color: 'inherit', textDecoration: 'underline' }}>
          dados da empresa
        </Link>
      </p>
    </aside>
  )
}
