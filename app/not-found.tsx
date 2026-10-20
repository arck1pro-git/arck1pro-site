import type { Metadata } from 'next'
import Link from 'next/link'
import RouteHero from './components/RouteHero'
import { GUIAS, GUIA_SLUGS } from '@/lib/guias'

// 404 da marca, em português. A página padrão do Next saía em inglês, com dois
// <title> (o dela e o herdado do layout) e duas metas robots contraditórias
// (noindex e index, follow). Aqui: um título, noindex explícito e caminhos de
// volta para as páginas principais.
export const metadata: Metadata = {
  title: { absolute: 'Página não encontrada · ARCK1PRO' },
  description: 'A página que você procurou não existe ou mudou de endereço.',
  robots: { index: false, follow: true },
}

const CAMINHOS = [
  { label: 'Conhecer o ARI', href: '/ari' },
  { label: 'Simular o retorno', href: '/simulador' },
  { label: 'Ler o blog', href: '/blog' },
  ...GUIA_SLUGS.map((s) => ({ label: GUIAS[s].nome, href: `/${s}` })),
]

export default function NotFound() {
  return (
    <main
      style={{
        marginTop: 'calc(var(--header-h) * -1)',
        position: 'relative',
        background: 'var(--brand-navy)',
      }}
    >
      <RouteHero
        escala="compacta"
        eyebrow="Erro 404"
        titulo="Esta página não existe ou mudou de endereço"
        acoes={
          <>
            <Link href="/" className="btn btn--gold">
              Voltar ao início
            </Link>
            <Link href="/blog" className="btn btn--ghost-inv">
              Ver o blog
            </Link>
          </>
        }
      />
      <section className="section relative z-10" style={{ background: 'var(--surface)' }}>
        <nav aria-label="Páginas principais" className="container">
          <h2 className="font-display text-navy" style={{ fontSize: 'var(--fs-24)', fontWeight: 500, margin: '0 0 var(--s-6)' }}>
            Talvez você esteja procurando
          </h2>
          <ul className="font-sans grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {CAMINHOS.map((c) => (
              <li key={c.href}>
                <Link
                  href={c.href}
                  className="rounded-lg lift block text-navy"
                  style={{
                    padding: 'var(--s-5) var(--s-6)',
                    background: '#ffffff',
                    border: 'var(--line-1) solid rgba(0,16,49,0.1)',
                    textDecoration: 'none',
                    fontSize: 'var(--fs-15)',
                  }}
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>
    </main>
  )
}
