import { SITE_NAME, SITE_TELEFONE, SITE_URL, absoluteUrl } from './site'

// Identidade da empresa em um lugar só: dados estruturados, rodapé, /sobre,
// /ari-e-confiavel e llms.txt leem daqui. Buscadores e IAs cruzam essas
// informações entre si e com o registro público; dado divergente entre
// páginas derruba a confiança na entidade.
//
// Dados cadastrais: Receita Federal (CNPJ 43.343.224/0001-09), consultados em
// 25/09/2026 via BrasilAPI. Endereço de rua e sala seguem o que o site exibe;
// o cadastro registra "Sala 01" e o site "Sala 1Z" (divergência a confirmar
// com o cliente). CEP e bairro vêm do cadastro.

export const EMPRESA = {
  nome: SITE_NAME,
  razaoSocial: 'ARCK PRO BUSINESS E1 LTDA',
  nomeFantasiaRegistro: 'ARCK1 PRO',
  cnpj: '43.343.224/0001-09',
  cnpjNumeros: '43343224000109',
  situacao: 'Ativa',
  inicioAtividade: '2021-08-31',
  consultadoEm: '2026-09-25',
  naturezaJuridica: 'Sociedade Empresária Limitada',
  atividadePrincipal: 'Corretagem na compra e venda e avaliação de imóveis',
  email: 'atendimento@arck1pro.com.br',
  instagram: 'https://www.instagram.com/arck1pro/',
  endereco: {
    rua: 'Av. João Manoel Jacques, 160, Sala 1Z',
    bairro: 'Balneário Perequê',
    cidade: 'Porto Belo',
    uf: 'SC',
    cep: '88210-000',
    pais: 'BR',
  },
  /** Trajetória declarada no site (home e /sobre). */
  trajetoria: {
    anos: '+20',
    empreendimentos: '+350',
  },
} as const

export const ORG_ID = `${SITE_URL}/#organization`
export const FABRICIO_ID = `${SITE_URL}/sobre#fabricio-pavesi-junior`
export const PATRICIA_ID = `${SITE_URL}/sobre#patricia-nunes-pavesi`

/** Fundadores, com os textos e cargos que /sobre já publica. */
export const FUNDADORES = [
  {
    id: FABRICIO_ID,
    nome: 'Fabrício Pavesi Junior',
    cargo: 'Fundador',
    formacao: 'Arquiteto',
    foto: '/fabhricio.webp',
    descricao:
      'Arquiteto e fundador da ARCK1PRO. Estruturou incorporações para terceiros no litoral catarinense antes de criar o método da ARCK1PRO, com mais de 20 anos de atuação no mercado imobiliário e mais de 350 empreendimentos estruturados.',
    areas: ['Incorporação imobiliária', 'Estruturação de empreendimentos', 'Arquitetura', 'Captação de capital para incorporação'],
  },
  {
    id: PATRICIA_ID,
    nome: 'Patrícia Nunes Pavesi',
    cargo: 'Cofundadora e administradora',
    formacao: 'Arquiteta',
    foto: '/patricia-card.jpeg',
    descricao:
      'Arquiteta e cofundadora da ARCK1PRO, com carreira focada em gestão e viabilidade de projetos. Trouxe o rigor operacional que transformou a experiência acumulada no método proprietário do ecossistema.',
    areas: ['Arquitetura', 'Gestão de projetos', 'Viabilidade de empreendimentos'],
  },
] as const

function pessoaJsonLd(f: (typeof FUNDADORES)[number]) {
  return {
    '@type': 'Person',
    '@id': f.id,
    name: f.nome,
    jobTitle: f.cargo,
    hasOccupation: { '@type': 'Occupation', name: f.formacao },
    description: f.descricao,
    image: absoluteUrl(f.foto),
    url: `${SITE_URL}/sobre`,
    knowsAbout: f.areas,
    worksFor: { '@id': ORG_ID },
  }
}

/**
 * Grafo de entidades do site: organização, site e fundadores. Emitido pelo
 * layout em todas as páginas; as demais páginas referenciam por @id.
 */
export function entidadesJsonLd() {
  const e = EMPRESA
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'RealEstateAgent'],
        '@id': ORG_ID,
        name: e.nome,
        legalName: e.razaoSocial,
        alternateName: ['Arck1Pro', e.nomeFantasiaRegistro],
        url: SITE_URL,
        logo: absoluteUrl('/logo.png'),
        image: absoluteUrl('/og-arck1pro.jpg'),
        description:
          'Estruturadora de incorporações de alto padrão no litoral catarinense. Capta recursos via SCP com o ARI, Ativo de Renda Imobiliária, com garantia real de 200% em unidades registradas em cartório.',
        taxID: e.cnpj,
        identifier: {
          '@type': 'PropertyValue',
          propertyID: 'CNPJ',
          value: e.cnpj,
        },
        foundingDate: e.inicioAtividade,
        founder: [{ '@id': FABRICIO_ID }, { '@id': PATRICIA_ID }],
        address: {
          '@type': 'PostalAddress',
          streetAddress: `${e.endereco.rua}, ${e.endereco.bairro}`,
          addressLocality: e.endereco.cidade,
          addressRegion: e.endereco.uf,
          postalCode: e.endereco.cep,
          addressCountry: e.endereco.pais,
        },
        telephone: SITE_TELEFONE,
        email: e.email,
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: SITE_TELEFONE,
          contactType: 'customer service',
          email: e.email,
          availableLanguage: 'Portuguese',
        },
        areaServed: [
          { '@type': 'City', name: 'Porto Belo' },
          { '@type': 'Place', name: 'Costa Esmeralda' },
          { '@type': 'State', name: 'Santa Catarina' },
        ],
        knowsAbout: [
          'Incorporação imobiliária',
          'Sociedade em Conta de Participação (SCP)',
          'Estruturação de empreendimentos imobiliários',
          'Investimento imobiliário com garantia real',
          'Mercado imobiliário do litoral catarinense',
        ],
        brand: { '@type': 'Brand', name: 'ARI (Ativo de Renda Imobiliária)', url: absoluteUrl('/ari') },
        sameAs: [e.instagram],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: e.nome,
        publisher: { '@id': ORG_ID },
        inLanguage: 'pt-BR',
      },
      ...FUNDADORES.map(pessoaJsonLd),
    ],
  }
}

/** Autoria dos conteúdos: a organização, referenciada pelo @id do grafo. */
export const AUTOR_ORGANIZACAO = { '@type': 'Organization', '@id': ORG_ID, name: SITE_NAME, url: SITE_URL } as const

export function dataBR(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
