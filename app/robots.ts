import type { MetadataRoute } from 'next'

const SITE_URL = 'https://arck1pro.com.br'

// Robôs de busca conversacional / IA generativa autorizados a indexar e citar.
const aiUserAgents = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'ClaudeBot',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
  'meta-externalagent',
]

// Bots de preview em redes sociais.
const socialUserAgents = ['FacebookExternalHit', 'LinkedInBot', 'Twitterbot']

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/private/',
          '/*?utm_',
          '/*?gclid=',
          '/*?fbclid=',
        ],
      },
      {
        userAgent: aiUserAgents,
        allow: '/',
      },
      {
        userAgent: socialUserAgents,
        allow: '/',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
