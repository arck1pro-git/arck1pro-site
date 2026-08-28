// Taxas do ARI e formatação dos valores, compartilhadas pelos dois simuladores:
// o do /ari (capital + prazo + forma, um resultado por vez) e o do /simulador
// (capital + forma, os três prazos juntos numa tabela).
//
// Vive aqui porque uma divergência de taxa entre as duas telas seria uma
// divergência de oferta: as duas páginas estariam prometendo retornos
// diferentes para o mesmo produto.

export type Prazo = 18 | 24 | 36
export type Forma = 'mensal' | 'final'

export const PRAZOS: Prazo[] = [18, 24, 36]

export const MIN = 50_000
export const MAX = 1_000_000
export const STEP = 10_000

// Taxa ao mês (juros simples) por faixa de aporte, prazo e forma de retorno.
//
// `ate` é o teto INCLUSIVO da faixa: um aporte de exatamente R$ 400 mil paga a
// taxa da faixa 200k–400k, e só acima disso entra a última. Essa leitura vem do
// próprio enunciado das faixas ("200k a 400k" e depois "acima de 400k"). Para
// inverter a regra, é trocar o <= por < em taxaPara().
type Faixa = { ate: number; taxas: Record<Prazo, number> }

const MENSAL: Faixa[] = [
  { ate: 100_000, taxas: { 18: 0.015, 24: 0.016, 36: 0.018 } },
  { ate: 200_000, taxas: { 18: 0.018, 24: 0.019, 36: 0.021 } },
  { ate: 400_000, taxas: { 18: 0.02, 24: 0.021, 36: 0.023 } },
  { ate: Infinity, taxas: { 18: 0.022, 24: 0.023, 36: 0.025 } },
]

// O retorno no final paga meio ponto percentual a mais que o mensal, na mesma
// faixa e no mesmo prazo — é quanto vale deixar o rendimento no bolo até o
// vencimento. A regra é derivada, e não uma segunda tabela: assim a do mensal
// continua sendo a única fonte, e mexer nela leva as duas junto.
//
// O arredondamento existe porque 0.015 + 0.005 em ponto flutuante dá
// 0.019999999999999997, e esse número chega a ser exibido como taxa aplicada.
const PREMIO_FINAL = 0.005

const maisPremio = (t: number) => Math.round((t + PREMIO_FINAL) * 10000) / 10000

const TAXAS: Record<Forma, Faixa[]> = {
  mensal: MENSAL,
  final: MENSAL.map(({ ate, taxas }) => ({
    ate,
    taxas: { 18: maisPremio(taxas[18]), 24: maisPremio(taxas[24]), 36: maisPremio(taxas[36]) },
  })),
}

export function taxaPara(forma: Forma, prazo: Prazo, capital: number) {
  const faixa = TAXAS[forma].find((f) => capital <= f.ate) ?? TAXAS[forma][TAXAS[forma].length - 1]
  return faixa.taxas[prazo]
}

/** Retorno de uma combinação, em reais. Juros simples sobre o capital. */
export function resultado(forma: Forma, prazo: Prazo, capital: number) {
  const taxa = taxaPara(forma, prazo, capital)
  const retornoTotal = capital * taxa * prazo
  return {
    taxa,
    retornoTotal,
    rendaMensal: capital * taxa,
    total: capital + retornoTotal,
    ganho: taxa * prazo * 100,
  }
}

export const brl0 = (n: number) =>
  n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })

export const brl2 = (n: number) =>
  n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 })

/** Percentual sem casa decimal inútil: 72,0% vira 72%. */
export const pct = (n: number) => `${n.toFixed(1).replace('.0', '').replace('.', ',')}%`

/** Taxa ao mês com as duas casas sempre visíveis: 2,50% e não 2,5%. */
export const taxaPct = (t: number) => `${(t * 100).toFixed(2).replace('.', ',')}%`
