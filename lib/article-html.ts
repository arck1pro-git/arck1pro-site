// O HTML de cada artigo chega da Airticles como documento completo
// (<html><head><title>…<meta name="description">…</head><body>…). Injetado
// cru no corpo da página, ele colocava um segundo <title> e uma segunda
// description no DOM, e o <h1> do artigo competia com o <h1> da hero.
//
// Aqui o documento é separado em corpo limpo + dados estruturados próprios do
// artigo (FAQPage, por exemplo), que são reemitidos pela página.

const HEAD_RE = /<head[\s\S]*?<\/head>/gi
const BODY_RE = /<body[^>]*>([\s\S]*?)<\/body>/i
const JSON_LD_RE = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
const DOC_TAGS_RE = /<\/?(?:html|body|head)[^>]*>|<!doctype[^>]*>/gi
const HEAD_ONLY_TAGS_RE = /<(?:title)[^>]*>[\s\S]*?<\/title>|<(?:meta|link|base)\b[^>]*>/gi
const SCRIPT_RE = /<script\b[\s\S]*?<\/script>/gi

export interface CleanArticle {
  /** Corpo do artigo pronto para dangerouslySetInnerHTML. */
  html: string
  /** Blocos JSON LD que vieram no documento, já validados como JSON. */
  jsonLd: unknown[]
}

function extractJsonLd(raw: string): unknown[] {
  const blocks: unknown[] = []
  for (const match of raw.matchAll(JSON_LD_RE)) {
    try {
      blocks.push(JSON.parse(match[1].trim()))
    } catch {
      // bloco malformado vindo da API: ignorado para não quebrar a página
    }
  }
  return blocks
}

// Tipos que a própria página já emite com dados canônicos do site.
const TIPOS_EMITIDOS_PELA_PAGINA = new Set(['Article', 'BlogPosting', 'NewsArticle', 'BreadcrumbList', 'Organization', 'WebSite', 'WebPage'])

function keepArticleOwnSchema(block: unknown): boolean {
  if (!block || typeof block !== 'object') return false
  const type = (block as { '@type'?: unknown })['@type']
  const types = Array.isArray(type) ? type : [type]
  return !types.some((t) => typeof t === 'string' && TIPOS_EMITIDOS_PELA_PAGINA.has(t))
}

// Endurecimento do HTML externo antes do dangerouslySetInnerHTML. <script>
// inserido via innerHTML não executa, mas atributos de evento, URLs
// javascript: e alguns elementos executam código ou capturam dados.
const DANGEROUS_BLOCK_TAGS_RE =
  /<(style|noscript|template|object|embed|applet|form|textarea|select|button)\b[\s\S]*?<\/\1\s*>/gi
const DANGEROUS_LOOSE_TAGS_RE =
  /<\/?(?:object|embed|applet|form|input|button|textarea|select|option|frame|frameset|base)\b[^>]*>/gi
const EVENT_ATTR_RE = /\s+on[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi
const SCRIPT_URL_ATTR_RE =
  /\s+(?:href|src|action|formaction|xlink:href|data|poster|background)\s*=\s*(?:"\s*(?:javascript|vbscript|data:text\/html)[^"]*"|'\s*(?:javascript|vbscript|data:text\/html)[^']*'|(?:javascript|vbscript|data:text\/html)[^\s>]*)/gi
const IFRAME_RE = /<iframe\b[^>]*>(?:[\s\S]*?<\/iframe\s*>)?/gi
const SRCDOC_ATTR_RE = /\s+srcdoc\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi
const SAFE_EMBED_SRC_RE = /^https:\/\/(?:www\.)?(?:youtube(?:-nocookie)?\.com|player\.vimeo\.com)\//i

// Embeds de vídeo em https (YouTube, Vimeo) ficam; qualquer outro iframe sai.
function keepSafeIframe(tag: string): string {
  const src = tag.match(/\ssrc\s*=\s*["']([^"']+)["']/i)?.[1] ?? ''
  return SAFE_EMBED_SRC_RE.test(src) ? tag.replace(SRCDOC_ATTR_RE, '') : ''
}

export function hardenHtml(html: string): string {
  return html
    .replace(SCRIPT_RE, '')
    .replace(DANGEROUS_BLOCK_TAGS_RE, '')
    .replace(DANGEROUS_LOOSE_TAGS_RE, '')
    .replace(IFRAME_RE, keepSafeIframe)
    .replace(EVENT_ATTR_RE, '')
    .replace(SCRIPT_URL_ATTR_RE, '')
}

export function cleanArticleHtml(raw: string | null | undefined): CleanArticle {
  if (!raw) return { html: '', jsonLd: [] }

  const jsonLd = extractJsonLd(raw).filter(keepArticleOwnSchema)
  const bodyMatch = raw.match(BODY_RE)
  const body = bodyMatch ? bodyMatch[1] : raw.replace(HEAD_RE, '')

  const html = hardenHtml(body)
    .replace(DOC_TAGS_RE, '')
    .replace(HEAD_ONLY_TAGS_RE, '')
    // A hero da rota já é o <h1> da página; o do artigo vira <h2>.
    .replace(/<h1(\s[^>]*)?>/gi, '<h2$1>')
    .replace(/<\/h1>/gi, '</h2>')
    .trim()

  return { html, jsonLd }
}

/** Texto puro do artigo, para description de fallback e wordCount. */
export function articleText(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Texto do primeiro parágrafo com conteúdo, para description de fallback.
 * O corpo começa pelo título do artigo; usar o texto inteiro repetiria o título.
 */
export function leadText(html: string): string {
  for (const match of html.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)) {
    const text = articleText(match[1])
    if (text.length >= 40) return text
  }
  return articleText(html)
}

/** Corta em até `max` caracteres sem partir palavra. */
export function truncate(text: string, max = 158): string {
  if (text.length <= max) return text
  const cut = text.slice(0, max - 1)
  const lastSpace = cut.lastIndexOf(' ')
  return `${(lastSpace > 80 ? cut.slice(0, lastSpace) : cut).replace(/[\s,.;:]+$/, '')}…`
}
