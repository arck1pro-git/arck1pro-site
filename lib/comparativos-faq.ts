import { ARI, DIMENSOES, ROTULO_DIMENSAO, type Comparativo } from './comparativos'

// Perguntas frequentes de cada comparativo, montadas só com os dados da
// própria comparação (mesmos textos da tabela). É o formato pergunta e
// resposta que buscadores e assistentes de IA extraem para citar.

const listar = (itens: string[]) =>
  itens.length <= 1 ? itens.join('') : `${itens.slice(0, -1).join(', ')} e ${itens[itens.length - 1]}`

export function comparativoFaqs(c: Comparativo): { q: string; a: string }[] {
  const vantagens = DIMENSOES.filter((d) => c.vantagem[d] === 'ari').map((d) =>
    ROTULO_DIMENSAO[d].toLowerCase(),
  )
  const par = (d: (typeof DIMENSOES)[number]) => `${c.nome}: ${c.alternativa[d]}. ARI: ${ARI[d]}.`

  return [
    {
      q: `${c.nome} ou ARI: qual escolher?`,
      a: vantagens.length
        ? `${c.chamada} Na comparação da ARCK1PRO, o ARI leva vantagem em ${listar(vantagens)}.`
        : c.chamada,
    },
    { q: `Como o Imposto de Renda incide: ${c.nome} ou ARI?`, a: par('ir') },
    { q: `Qual oferece mais garantia: ${c.nome} ou ARI?`, a: par('lastro') },
    { q: `Qual tem mais liquidez: ${c.nome} ou ARI?`, a: par('liquidez') },
    { q: `Qual o aporte mínimo: ${c.nome} ou ARI?`, a: par('minimo') },
  ]
}
