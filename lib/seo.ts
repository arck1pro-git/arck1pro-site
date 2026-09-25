import type { Metadata } from 'next'
import { OG_IMAGE, SITE_NAME } from './site'

// Metadados de página num formato só: title, og:title e twitter:title saem do
// mesmo texto. Antes cada página montava o seu openGraph e nenhuma definia
// twitter, que herdava do layout o título da home; e títulos que já traziam a
// marca ganhavam o sufixo do template de novo ("· ARCK1PRO · ARCK1PRO").
//
// Convenção de texto: sem travessão; a marca entra depois de " · ".

type OgImage = { url: string; width?: number; height?: number; alt?: string }

export function pageMetadata({
  title,
  description,
  path,
  ogDescription,
  type = 'website',
  image = OG_IMAGE,
  modifiedTime,
}: {
  /** Título completo, como deve aparecer no Google (até 60 caracteres). */
  title: string
  description: string
  path: string
  /** Texto para compartilhamento, quando diferente da description. */
  ogDescription?: string
  type?: 'website' | 'article'
  image?: OgImage
  /** Data da última revisão (ISO), para páginas do tipo article. */
  modifiedTime?: string
}): Metadata {
  const social = ogDescription ?? description
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      ...(type === 'article' && modifiedTime ? { modifiedTime } : {}),
      locale: 'pt_BR',
      siteName: SITE_NAME,
      url: path,
      title,
      description: social,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: social,
      images: [image.url],
    },
  }
}
