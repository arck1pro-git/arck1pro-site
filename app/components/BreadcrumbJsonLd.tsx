import { SITE_URL, absoluteUrl, jsonLdString } from '@/lib/site'

// BreadcrumbList em JSON LD. O Google usa a trilha para entender a hierarquia
// do site e para exibir o caminho no resultado de busca. A home entra sempre
// como primeiro item.
export default function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; path: string }[]
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Início', path: '/' }, ...items].map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.path === '/' ? `${SITE_URL}/` : absoluteUrl(item.path),
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdString(data) }}
    />
  )
}
