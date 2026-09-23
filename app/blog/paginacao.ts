// Compartilhado entre a página do /blog (servidor) e o BlogList (cliente).
export const BLOG_PER_PAGE = 12

/** /blog para a primeira página, /blog?pagina=N para as demais. */
export function blogPageHref(page: number): string {
  return page <= 1 ? '/blog' : `/blog?pagina=${page}`
}

/** Lê ?pagina= aceitando só inteiros positivos; qualquer outra coisa é null. */
export function parsePagina(raw: string | string[] | undefined): number | null {
  if (raw === undefined) return 1
  const value = Array.isArray(raw) ? raw[0] : raw
  if (!/^\d+$/.test(value)) return null
  const n = Number(value)
  return n >= 1 ? n : null
}
