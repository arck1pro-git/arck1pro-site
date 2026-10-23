// Links internos no corpo dos artigos.
//
// Os artigos chegam da Airticles quase sem links para outros posts: os poucos
// que existem apontam para o blog hospedado da Airticles
// (arck1pro.blogs.airticles.ai/posts/<slug>), que responde 404. Aqui esses links
// voltam para /blog/<slug> e cada artigo ganha links contextuais para as páginas
// e posts do mesmo tema, a partir do mapa de termos abaixo.
//
// Regras do linker:
// - só em texto de <p> e <li>, nunca em título, sumário, citação ou link;
// - no máximo um link por parágrafo e um por destino;
// - nunca para o próprio post nem para um destino que o artigo já linka;
// - posts ainda não publicados ficam de fora até entrarem no ar.

/** Destino: rota fixa do site ou post do blog pelo id da Airticles. */
export type LinkTarget = { href: string } | { postId: number }

export interface LinkRule {
  target: LinkTarget
  /** Termos que viram âncora. Sigla em maiúsculas casa só em maiúsculas. */
  phrases: string[]
}

const page = (href: string, ...phrases: string[]): LinkRule => ({ target: { href }, phrases })
const post = (postId: number, ...phrases: string[]): LinkRule => ({ target: { postId }, phrases })

// Ordem = prioridade. Termos específicos (que aparecem em poucos artigos) vêm
// primeiro para garantir o link de entrada dos posts de apoio; os termos
// genéricos dos artigos centrais de cada grupo ficam no fim, porque aparecem em
// quase todo texto e esgotariam o limite de links antes dos específicos.
export const LINK_RULES: LinkRule[] = [
  // Conversão
  page('/ari', 'Ativo de Renda Imobiliária'),
  page('/quanto-rende-100-mil', 'R$ 100 mil', 'R$ 100.000', '100 mil reais'),
  page('/onde-investir-100-mil', 'onde investir'),
  page('/investimento-isento-de-imposto-de-renda', 'isento de imposto de renda', 'isenção de imposto de renda', 'isentos de imposto de renda'),
  page('/ari-e-confiavel', 'é confiável'),
  page('/simulador', 'simulador', 'simulação de rentabilidade'),
  page('/cdb', 'CDB', 'CDBs'),
  page('/poupanca', 'poupança'),
  page('/tesouro-ipca', 'Tesouro IPCA+', 'Tesouro IPCA'),
  page('/tesouro-selic', 'Tesouro Selic'),
  page('/lci-lca', 'LCI', 'LCA'),
  page('/fundos-imobiliarios', 'fundos imobiliários', 'fundo imobiliário'),

  // ARI e produto estruturado
  post(23629, 'ticket de entrada', 'aporte mínimo', 'aportes a partir de'),
  post(23936, 'produto imobiliário estruturado', 'produto estruturado', 'estruturação de ativos', 'estruturação imobiliária'),
  post(20661, 'investimento imobiliário estruturado', 'investimentos imobiliários estruturados'),
  post(20647, 'ativo estruturado', 'ativos estruturados', 'fundos de investimento imobiliário'),
  post(20648, 'investir com segurança', 'onde investir dinheiro', 'segurança do capital'),
  post(24760, 'reputação'),

  // SCP e estrutura jurídica
  post(24757, 'contrato de sociedade em conta de participação', 'contrato da SCP', 'contrato de SCP'),
  post(20665, 'Sociedade de Propósito Específico', 'SPE', 'estrutura jurídica', 'personalidade jurídica', 'veículo jurídico'),
  post(20715, 'sócio ostensivo', 'sócios ostensivos'),
  post(23935, 'sócio participante', 'sócios participantes'),
  post(24762, 'investimento sem imposto de renda', 'sem imposto de renda', 'isenção'),
  post(20663, 'pessoa física', 'pessoas físicas'),

  // Incorporação
  post(20653, 'Lei 4.591/1964', 'Lei 4.591/64', 'Lei nº 4.591/1964', 'Lei da Incorporação', 'Lei de Incorporação', 'Lei das Incorporações'),
  post(24759, 'patrimônio de afetação'),
  post(26138, 'memorial de incorporação'),
  post(23632, 'registro da incorporação', 'registro de incorporação'),
  post(26128, 'Valor Geral de Vendas', 'VGV'),
  post(26129, 'habite-se'),
  post(26131, 'CUB'),
  post(26141, 'Taxa Interna de Retorno', 'TIR', 'VPL'),
  post(24767, 'construtora ou incorporadora', 'construtora e incorporadora', 'construtoras e incorporadoras'),
  post(20735, 'construir para vender'),
  post(20392, 'investir em incorporação imobiliária', 'investir em incorporação'),
  post(18455, 'participar de uma incorporação', 'participar da incorporação', 'participar de incorporações'),
  post(20716, 'oportunidades de investimento', 'oportunidade de investimento'),
  post(26140, 'distrato'),

  // Garantias e segurança
  post(26132, 'alienação fiduciária'),
  post(24758, 'crédito com garantia real', 'crédito com garantia', 'operações de crédito', 'hipoteca'),
  post(20395, 'garantias em investimento imobiliário', 'proteger seu capital', 'proteção do capital', 'proteção patrimonial'),
  post(18464, 'riscos do investimento imobiliário', 'risco do investimento imobiliário', 'riscos de investimento imobiliário'),
  post(18459, 'due diligence'),
  post(18460, 'avaliar um empreendimento', 'avaliar o empreendimento', 'análise do empreendimento', 'viabilidade do empreendimento'),
  post(18470, 'investimento imobiliário seguro', 'segurança jurídica'),
  post(18454, 'empreendimentos imobiliários'),

  // Investimento e renda
  post(24766, 'como investir em imóveis'),
  post(18453, 'investir em imóveis'),
  post(18452, 'investimento imobiliário em 2026', 'investir em 2026'),
  post(18461, 'pouco dinheiro', 'pouco capital', 'pequenos investidores', 'capital inicial'),
  post(18456, 'FIIs', 'FII'),
  post(18466, 'Certificados de Recebíveis Imobiliários', 'Certificado de Recebíveis Imobiliários', 'CRI', 'CRIs'),
  post(18462, 'crowdfunding imobiliário', 'crowdfunding'),
  post(18469, 'imóveis compactos', 'studios', 'unidades menores'),
  post(20656, 'comprar na planta', 'compra na planta', 'comprar um imóvel na planta', 'compra direta'),
  post(20655, 'apartamento na planta', 'apartamentos na planta'),
  post(18465, 'imóvel na planta', 'imóveis na planta'),
  post(18463, 'valorização imobiliária', 'valorização de imóveis', 'valorização dos imóveis'),
  post(20660, 'melhor investimento', 'melhores investimentos', 'alocação de capital'),
  post(26127, 'R$ 1 milhão'),
  post(26133, 'R$ 2 milhões'),
  post(26130, 'R$ 500 mil'),
  post(26136, 'R$ 300 mil'),
  post(26139, 'R$ 200 mil'),
  post(26134, 'imposto de renda sobre aluguel', 'tributação do aluguel', 'tributação dos aluguéis'),
  post(26137, 'ganho de capital'),

  // Mercado e tributação
  post(18458, 'mercado imobiliário em 2026', 'mercado imobiliário 2026'),
  post(18471, 'tendências do mercado imobiliário'),
  post(18468, 'taxa Selic', 'Selic'),
  post(20654, 'reforma tributária'),

  // Patrimônio e sucessão
  post(26135, 'family office'),
  post(20658, 'holding familiar'),
  post(20651, 'planejamento sucessório', 'sucessão patrimonial'),
  post(20659, 'inventário'),
  post(18467, 'diversificação patrimonial', 'diversificar o patrimônio', 'diversificação de patrimônio', 'diversificar patrimônio'),
  post(20398, 'médicos'),

  // Litoral catarinense
  post(24769, 'branded residences'),
  post(20396, 'Balneário Camboriú'),
  post(20657, 'Porto Belo'),
  post(24768, 'Itapema'),

  // Corretores
  post(20399, 'corretores parceiros', 'corretor parceiro', 'parceria com corretores'),
  post(20649, 'corretor de imóveis', 'corretores de imóveis'),
  post(20399, 'corretores'),

  // Artigos centrais: termos que aparecem em quase todo texto
  post(20390, 'ARI'),
  post(20391, 'Sociedade em Conta de Participação', 'SCP'),
  post(24764, 'incorporação imobiliária', 'incorporações imobiliárias'),
  post(24765, 'investimento imobiliário', 'investimentos imobiliários'),
  post(20652, 'garantia real', 'garantias reais'),
  post(20650, 'holding patrimonial', 'holdings patrimoniais', 'holding'),
  post(20400, 'imóveis de alto padrão'),
  post(18457, 'rentabilidade de imóveis', 'rentabilidade imobiliária', 'rentabilidade do investimento'),
  post(20397, 'litoral catarinense', 'litoral de Santa Catarina'),
  post(20394, 'tese de terreno'),
  post(20401, 'estruturadora', 'estruturadoras'),
  post(20393, 'tecnologia BIM', 'modelagem BIM'),
]

// Links novos por artigo, e teto contando os links internos que o texto já traz.
export const MAX_LINKS_POR_ARTIGO = 8
export const MAX_LINKS_INTERNOS_TOTAL = 10

const AIRTICLES_BLOG_RE =
  /<a\b([^>]*?)\shref=(["'])https?:\/\/[a-z0-9-]+\.blogs\.airticles\.ai\/posts\/([^"'#?]+)[^"']*\2([^>]*)>/gi
const TARGET_REL_RE = /\s(?:target|rel)=(["'])[^"']*\1/gi

/**
 * Links que a Airticles gera para o blog hospedado dela viram links internos.
 * `slugAtual` mapeia slugs antigos para a rota que os substituiu.
 */
export function rewriteAirticlesLinks(html: string, slugAtual: Record<string, string> = {}): string {
  return html.replace(AIRTICLES_BLOG_RE, (_m, before: string, _q, slug: string, after: string) => {
    // Slug só com caracteres de URL de post: nada de aspas ou escapes vindos do HTML.
    const clean = slug.toLowerCase().replace(/[^a-z0-9-]/g, '')
    if (!clean) return `<a${`${before}${after}`.replace(TARGET_REL_RE, '')}>`
    const href = slugAtual[clean] ?? `/blog/${clean}`
    const attrs = `${before}${after}`.replace(TARGET_REL_RE, '')
    return `<a${attrs} href="${href}">`
  })
}

// Elementos onde o linker não entra.
const SKIP_TAGS = new Set(['a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'figure', 'figcaption', 'table', 'code', 'pre', 'button', 'nav', 'summary'])
// Blocos de texto corrido onde o link pode entrar.
const BLOCK_TAGS = new Set(['p', 'li'])
const VOID_TAGS = new Set(['br', 'hr', 'img', 'input', 'meta', 'link', 'source', 'wbr', 'col', 'area', 'base', 'embed', 'track'])

const WORD = 'A-Za-z0-9À-ÖØ-öø-ÿ'

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

interface CompiledRule {
  href: string
  regexes: RegExp[]
}

function compile(rules: LinkRule[], resolve: (t: LinkTarget) => string | null): CompiledRule[] {
  const out: CompiledRule[] = []
  for (const rule of rules) {
    const href = resolve(rule.target)
    if (!href) continue
    const regexes = rule.phrases.map((phrase) => {
      // Sigla (ARI, SCP, CRI) casa só em maiúsculas; o resto ignora caixa.
      const sigla = phrase === phrase.toUpperCase() && /[A-Z]/.test(phrase)
      return new RegExp(`(?<![${WORD}])${escapeRegex(phrase)}(?![${WORD}])`, sigla ? '' : 'i')
    })
    out.push({ href, regexes })
  }
  return out
}

function normalizeHref(href: string): string {
  const path = href.replace(/^https?:\/\/(?:www\.)?arck1pro\.com\.br/i, '').split(/[?#]/)[0]
  return path.replace(/\/+$/, '') || '/'
}

export interface LinkOptions {
  /** Caminho do próprio artigo, para não linkar para si mesmo. */
  selfHref: string
  /** Resolve o destino de uma regra; null deixa a regra de fora. */
  resolve: (target: LinkTarget) => string | null
  rules?: LinkRule[]
  max?: number
}

/** Insere links contextuais no HTML já limpo do artigo. */
export function addContextualLinks(html: string, opts: LinkOptions): string {
  const self = normalizeHref(opts.selfHref)

  // Destinos que o artigo já linka não ganham um segundo link.
  const linked = new Set<string>([self])
  let existentes = 0
  for (const m of html.matchAll(/<a\b[^>]*\shref=(["'])([^"']+)\1/gi)) {
    const href = m[2]
    if (href.startsWith('#')) continue
    linked.add(normalizeHref(href))
    if (href.startsWith('/') || /^https?:\/\/(?:www\.)?arck1pro\.com\.br/i.test(href)) existentes++
  }
  const max = Math.min(opts.max ?? MAX_LINKS_POR_ARTIGO, MAX_LINKS_INTERNOS_TOTAL - existentes)
  if (max <= 0) return html

  const rules = compile(opts.rules ?? LINK_RULES, opts.resolve).filter((r) => !linked.has(r.href))
  if (rules.length === 0) return html

  const parts = html.split(/(<[^>]+>)/)
  const stack: { tag: string; skip: boolean }[] = []
  let skipDepth = 0
  let blockDepth = 0
  let blockLinked = false
  let added = 0

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i]
    if (!part) continue

    if (part.startsWith('<')) {
      const m = part.match(/^<(\/?)([a-zA-Z0-9]+)/)
      if (!m) continue
      const closing = m[1] === '/'
      const tag = m[2].toLowerCase()
      if (VOID_TAGS.has(tag) || part.endsWith('/>')) continue
      if (!closing) {
        // O sumário (div#summary ou .summary) é lista de âncoras, não texto corrido.
        const skip = SKIP_TAGS.has(tag) || (tag === 'div' && /\b(?:id|class)=["'][^"']*\bsummary\b/i.test(part))
        stack.push({ tag, skip })
        if (skip) skipDepth++
        if (BLOCK_TAGS.has(tag)) {
          blockDepth++
          if (blockDepth === 1) blockLinked = false
        }
      } else {
        // Fecha até a tag correspondente; HTML malformado não trava o linker.
        let idx = -1
        for (let j = stack.length - 1; j >= 0; j--) {
          if (stack[j].tag === tag) {
            idx = j
            break
          }
        }
        if (idx === -1) continue
        while (stack.length > idx) {
          const open = stack.pop()!
          if (open.skip) skipDepth--
          if (BLOCK_TAGS.has(open.tag)) blockDepth--
        }
      }
      continue
    }

    if (added >= max || skipDepth > 0 || blockDepth === 0 || blockLinked) continue

    for (let r = 0; r < rules.length; r++) {
      const rule = rules[r]
      let hit: RegExpExecArray | null = null
      for (const re of rule.regexes) {
        const m = re.exec(part)
        if (m && (!hit || m.index < hit.index)) hit = m
      }
      if (!hit) continue
      const end = hit.index + hit[0].length
      parts[i] = `${part.slice(0, hit.index)}<a href="${rule.href}">${hit[0]}</a>${part.slice(end)}`
      rules.splice(r, 1)
      blockLinked = true
      added++
      break
    }
  }

  return parts.join('')
}
