import type { Metadata } from 'next'
import ContatoForm from './ContatoForm'
import RouteHeroBg from '../components/RouteHeroBg'

export const metadata: Metadata = {
  title: 'Contato · ARCK1PRO',
  description: 'Fale com a ARCK1PRO — estruturação imobiliária no litoral catarinense.',
}

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function WhatsappIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
    </svg>
  )
}

function MailIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

const canais = [
  {
    label: 'WhatsApp',
    value: '(47) 9 9145-8708',
    href: 'https://wa.me/5547991458708',
    icon: <WhatsappIcon />,
  },
  {
    label: 'E-mail',
    value: 'atendimento@arck1pro.com.br',
    href: 'mailto:atendimento@arck1pro.com.br',
    icon: <MailIcon />,
  },
  {
    label: 'Instagram',
    value: '@arck1pro',
    href: 'https://instagram.com/arck1pro',
    icon: <InstagramIcon />,
  },
]

const passos = [
  {
    n: '01',
    title: 'Qualificação',
    text: 'Recebemos seus dados e analisamos rapidamente o seu perfil de investidor.',
  },
  {
    n: '02',
    title: 'Conversa',
    text: 'Nosso time entra em contato para apresentar as operações abertas e tirar dúvidas.',
  },
  {
    n: '03',
    title: 'Acesso',
    text: 'Você recebe a documentação e as condições para investir no ARI.',
  },
]

export default function ContatoPage() {
  return (
    <main
      style={{
        marginTop: '-74px',
        position: 'relative',
        background: 'var(--brand-navy)',
      }}
    >
      <RouteHeroBg />
      {/* Hero sobre a imagem do footer */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 1,
          minHeight: '75svh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'calc(74px + var(--s-12)) var(--s-6) var(--s-16)',
          textAlign: 'center',
        }}
      >
        <p
          className="font-mono text-gold-soft"
          style={{ fontSize: 'var(--fs-12)', letterSpacing: '0.15em', marginBottom: 'var(--s-3)' }}
        >
          Contato
        </p>
        <h1
          className="font-display text-cream lg:text-5xl text-4xl"
          style={{ fontWeight: 700, lineHeight: 1.15, margin: 0, maxWidth: 820, marginInline: 'auto' }}
        >
          O primeiro passo para acessar o <span className="text-gold-hero">ecossistema</span>
        </h1>
        <p
          className="font-sans"
          style={{
            fontSize: 'var(--fs-16)',
            lineHeight: 1.7,
            color: 'rgba(236,235,231,0.7)',
            maxWidth: 520,
            margin: 'var(--s-5) auto 0',
          }}
        >
          Fale com o nosso time pelos canais diretos ou encaminhe sua candidatura. Tudo começa por
          uma conversa de qualificação.
        </p>
      </div>

      <section
        className="section rounded-4xl overflow-clip relative z-10"
        style={{
          background:
            'radial-gradient(ellipse 55% 55% at 100% 100%, rgba(0,16,49,0.13) 0%, transparent 100%), var(--surface)',
          paddingTop: 'var(--s-20)',
        }}
      >
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-16)' }}>
          {/* Canais diretos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {canais.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="contato-card rounded-4xl lift"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--s-4)',
                  padding: 'var(--s-6)',
                  textDecoration: 'none',
                  border: 'var(--line-1) solid rgba(0,16,49,0.1)',
                  background: '#ffffff',
                  backdropFilter: 'blur(6px)',
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: 48,
                    height: 48,
                    borderRadius: 'var(--r-pill)',
                    background: 'var(--brand-navy)',
                    color: 'var(--brand-cream)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {c.icon}
                </span>
                <span style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                  <span
                    className="font-mono"
                    style={{
                      fontSize: 11,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'var(--text-faint)',
                      marginBottom: 2,
                    }}
                  >
                    {c.label}
                  </span>
                  <span
                    className="font-display text-navy"
                    style={{ fontSize: 'var(--fs-15)', fontWeight: 500, wordBreak: 'break-word' }}
                  >
                    {c.value}
                  </span>
                </span>
              </a>
            ))}
          </div>

          {/* Form + próximos passos */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
            {/* Card "o que acontece depois" (navy) */}
            <div
              className="lg:col-span-5 rounded-4xl lift"
              style={{
                background: 'var(--brand-navy)',
                color: 'var(--brand-cream)',
                padding: 'var(--s-10) var(--s-8)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--s-8)',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-3)' }}>
                <p
                  className="font-mono"
                  style={{
                    fontSize: 'var(--fs-12)',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--brand-gold-soft)',
                  }}
                >
                  Próximos passos
                </p>
                <h2
                  className="font-display"
                  style={{ fontSize: 'var(--fs-24)', fontWeight: 300, lineHeight: 1.25, margin: 0 }}
                >
                  O que acontece depois que você envia
                </h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-6)' }}>
                {passos.map((p) => (
                  <div key={p.n} style={{ display: 'flex', gap: 'var(--s-4)', alignItems: 'flex-start' }}>
                    <span
                      className="font-display text-gold"
                      style={{ fontSize: 'var(--fs-24)', fontWeight: 600, lineHeight: 1, flexShrink: 0 }}
                    >
                      {p.n}
                    </span>
                    <div>
                      <p
                        className="font-display"
                        style={{ fontSize: 'var(--fs-16)', fontWeight: 500, margin: '0 0 var(--s-1)' }}
                      >
                        {p.title}
                      </p>
                      <p
                        className="font-sans"
                        style={{
                          fontSize: 'var(--fs-14)',
                          lineHeight: 1.65,
                          color: 'rgba(236,235,231,0.6)',
                          margin: 0,
                        }}
                      >
                        {p.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <p
                className="font-sans"
                style={{
                  fontSize: 'var(--fs-13)',
                  color: 'rgba(236,235,231,0.4)',
                  marginTop: 'auto',
                  lineHeight: 1.6,
                }}
              >
                Respondemos em horário comercial. Seus dados são tratados com confidencialidade.
              </p>
            </div>

            {/* Formulário */}
            <div className="lg:col-span-7" style={{ display: 'flex' }}>
              <ContatoForm />
            </div>
          </div>

          {/* Mapa + endereço */}
          <div>
            <div style={{ textAlign: 'center', marginBottom: 'var(--s-6)' }}>
              <p
                className="font-mono text-gold"
                style={{ fontSize: 'var(--fs-12)', letterSpacing: '0.15em', marginBottom: 'var(--s-2)' }}
              >
                Onde estamos
              </p>
              <p
                className="font-display text-navy"
                style={{ fontSize: 'var(--fs-16)', fontWeight: 500, lineHeight: 1.6 }}
              >
                Av. João Manoel Jacques, 160 · Sala 1Z — Balneário Perequê, Porto Belo — SC
              </p>
            </div>
            <div
              className="rounded-4xl overflow-clip"
              style={{
                width: '100%',
                aspectRatio: '21 / 9',
                border: 'var(--line-1) solid rgba(0,16,49,0.12)',
              }}
            >
              <iframe
                title="Localização ARCK1PRO — Porto Belo, SC"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3550.153455219122!2d-48.579956423772536!3d-27.151461603223016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94d8af9f35cc08b5%3A0x30f01a56ba6bf93e!2sAv.%20Jo%C3%A3o%20Manoel%20Jacques%2C%20160%20-%201z%20-%20Balne%C3%A1rio%20Perequ%C3%AA%2C%20Porto%20Belo%20-%20SC%2C%2088210-000!5e0!3m2!1spt-BR!2sbr!4v1780494606712!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
