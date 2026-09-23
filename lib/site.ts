import { WHATSAPP_NUMERO } from './contato'

// Constantes de identidade usadas em metadata, sitemap e dados estruturados.
// Antes cada arquivo tinha sua cópia de SITE_URL e o schema da empresa usava
// um telefone diferente do WhatsApp exibido no site.
export const SITE_URL = 'https://arck1pro.com.br'
export const SITE_NAME = 'ARCK1PRO'

/** Telefone em formato E.164 legível (+55-47-99200-6498), derivado do WhatsApp do site. */
export const SITE_TELEFONE = `+${WHATSAPP_NUMERO.slice(0, 2)}-${WHATSAPP_NUMERO.slice(2, 4)}-${WHATSAPP_NUMERO.slice(4, 9)}-${WHATSAPP_NUMERO.slice(9)}`

/** Imagem de compartilhamento leve (1200x630, abaixo de 300 KB). */
export const OG_IMAGE = {
  url: '/og-arck1pro.jpg',
  width: 1200,
  height: 630,
  alt: 'ARCK1PRO — hub de estruturação imobiliária no litoral catarinense',
}

// Caracteres que não podem aparecer crus dentro de um <script>: "<" e ">"
// permitiriam fechar a tag, "&" e os separadores de linha U+2028/U+2029
// quebram alguns parsers. Viram escape Unicode, que o JSON lê igual.
const JSON_LD_UNSAFE = new RegExp(`[<>&${String.fromCharCode(0x2028, 0x2029)}]`, 'g')
const BACKSLASH = String.fromCharCode(92)

/**
 * Serializa dados estruturados para <script type="application/ld+json">.
 * JSON.stringify não escapa "<", e um texto vindo da API com "</script>"
 * fecharia a tag e abriria espaço para injeção de HTML.
 */
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data).replace(
    JSON_LD_UNSAFE,
    (c) => `${BACKSLASH}u${c.charCodeAt(0).toString(16).padStart(4, '0')}`,
  )
}

export function absoluteUrl(path: string): string {
  if (path.startsWith('http')) return path
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}
