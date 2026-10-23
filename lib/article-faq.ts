import { articleText } from './article-html'

// A maioria dos artigos traz uma seção visível "Perguntas Frequentes", mas
// nenhum FAQPage nos dados estruturados. Aqui a seção vira FAQPage com
// exatamente o texto que está na página, que é o que buscadores e IAs usam
// para citar respostas.
//
// O formato varia entre artigos: pergunta em h2, h3, h4 ou num parágrafo só em
// negrito, com ou sem div em volta de cada item. Pergunta é o título que termina
// em "?"; a resposta vai até a próxima pergunta, o fim do bloco (</div>), uma
// linha horizontal ou um título que não é pergunta.

const FAQ_HEADING_RE = /<h2\b[^>]*>([\s\S]*?)<\/h2>/gi
const FAQ_TITLE_RE = /perguntas\s+frequentes|d[uú]vidas\s+frequentes|\bfaq\b/i
const MARKER_RE =
  /<h([2-4])\b[^>]*>([\s\S]*?)<\/h\1>|<p\b[^>]*>\s*<(?:strong|b)\b[^>]*>([\s\S]*?)<\/(?:strong|b)>\s*<\/p>|<hr\b[^>]*>|<\/div>/gi
const MIN_PERGUNTAS = 2

export interface FaqItem {
  pergunta: string
  resposta: string
}

/** Pares pergunta/resposta da seção de perguntas frequentes do artigo. */
export function extractFaq(html: string): FaqItem[] {
  let start = -1
  for (const m of html.matchAll(FAQ_HEADING_RE)) {
    if (FAQ_TITLE_RE.test(articleText(m[1]))) {
      start = m.index! + m[0].length
      break
    }
  }
  if (start === -1) return []

  const section = html.slice(start)
  const items: FaqItem[] = []
  let pergunta: string | null = null
  let answerFrom = 0

  const close = (until: number) => {
    if (pergunta === null) return
    const resposta = articleText(section.slice(answerFrom, until))
    if (resposta) items.push({ pergunta, resposta })
    pergunta = null
  }

  for (const m of section.matchAll(MARKER_RE)) {
    const at = m.index!
    if (/^<hr/i.test(m[0])) {
      close(at)
      break
    }
    if (/^<\/div/i.test(m[0])) {
      close(at)
      continue
    }
    const text = articleText(m[2] ?? m[3] ?? '')
    if (text.endsWith('?')) {
      close(at)
      pergunta = text
      answerFrom = at + m[0].length
      continue
    }
    // Título que não é pergunta encerra a seção; negrito solto faz parte da resposta.
    if (m[1]) {
      close(at)
      break
    }
  }
  close(section.length)
  return items
}

/** FAQPage do artigo, ou null quando não há seção com perguntas suficientes. */
export function faqJsonLd(html: string, url: string) {
  const items = extractFaq(html)
  if (items.length < MIN_PERGUNTAS) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.pergunta,
      acceptedAnswer: { '@type': 'Answer', text: item.resposta },
    })),
  }
}
