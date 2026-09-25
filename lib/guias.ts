// Conteúdo das páginas de guia do investidor. Cada guia responde a uma busca
// com demanda medida (volumes do levantamento de SEO de setembro/2026) e leva
// ao simulador e à qualificação.
//
// Regra editorial: nenhum número é escrito à mão. Retornos do ARI saem de
// lib/ari-taxas (a mesma tabela dos simuladores) e as características das
// outras aplicações saem de lib/comparativos (as mesmas das páginas /cdb,
// /poupanca etc.). Os textos sobre o produto repetem o que /ari e o llms.txt
// já afirmam, via lib/ari-conteudo.

import { ARI, COMPARATIVOS } from './comparativos'
import { brl0, PRAZOS, resultado, taxaPct, type Forma, type Prazo } from './ari-taxas'
import { ARI_CONDICOES, ARI_DIFERENCIAIS, ARI_FAQS } from './ari-conteudo'
import { EMPRESA, FUNDADORES, dataBR } from './empresa'

export type GuiaSlug =
  | 'quanto-rende-100-mil'
  | 'investimento-isento-de-imposto-de-renda'
  | 'onde-investir-100-mil'
  | 'ari-e-confiavel'

export type Tabela = {
  legenda: string
  colunas: string[]
  linhas: { celulas: string[]; destaque?: boolean; href?: string }[]
  fonte: string
}

export type Secao = {
  id: string
  titulo: string
  paragrafos?: string[]
  lista?: string[]
  listaOrdenada?: boolean
  tabela?: Tabela
}

export type Guia = {
  slug: GuiaSlug
  /** Nome curto para menus, trilha e links relacionados. */
  nome: string
  /** <title> absoluto, até 60 caracteres. */
  tituloSeo: string
  /** Meta description, até 160 caracteres. */
  descricao: string
  eyebrow: string
  /** H1 da página. */
  titulo: string
  /** Resposta direta de 2 a 3 frases, logo abaixo do H1: é o trecho que buscadores e IAs citam. */
  resposta: string
  /** Fatos-chave em lista, abaixo da resposta. */
  destaques: string[]
  secoes: Secao[]
  simulador?: { capital: number; prazo: Prazo; forma: Forma; titulo: string }
  mostrarProtecoes?: boolean
  faqs: { q: string; a: string }[]
  mensagemWhatsapp: string
  /** Data da última revisão editorial (ISO). */
  atualizadoEm: string
}

const ATUALIZADO_EM = '2026-09-23'
const CEM_MIL = 100_000

const FONTE_TAXAS =
  'Tabela de taxas do simulador ARCK1PRO, juros simples sobre o capital. Taxas estimadas; rentabilidade passada não garante resultado futuro.'
const FONTE_COMPARATIVOS =
  'Características estruturais descritas nos comparativos da ARCK1PRO. Taxas de mercado mudam; a estrutura de cada aplicação, não.'

const faqAri = (inicio: string) => {
  const item = ARI_FAQS.find((f) => f.q.startsWith(inicio))
  if (!item) throw new Error(`FAQ do ARI não encontrado: ${inicio}`)
  return item
}

// ---- Números do ARI para R$ 100 mil, calculados pela tabela oficial ----

const mensal = PRAZOS.map((p) => ({ prazo: p, ...resultado('mensal', p, CEM_MIL) }))
const final = PRAZOS.map((p) => ({ prazo: p, ...resultado('final', p, CEM_MIL) }))
const rendaMin = mensal[0].rendaMensal
const rendaMax = mensal[mensal.length - 1].rendaMensal
const ganhoFinalMin = final[0].retornoTotal
const ganhoFinalMax = final[final.length - 1].retornoTotal
const prazoMin = PRAZOS[0]
const prazoMax = PRAZOS[PRAZOS.length - 1]

const tabelaCemMil: Tabela = {
  legenda: 'Quanto R$ 100 mil rendem no ARI, por prazo e forma de recebimento',
  colunas: [
    'Prazo',
    'Taxa (mensal)',
    'Renda por mês',
    'Total recebido no prazo',
    'Taxa (no final)',
    'Ganho no vencimento',
  ],
  linhas: PRAZOS.map((p, i) => ({
    celulas: [
      `${p} meses`,
      `${taxaPct(mensal[i].taxa)} ao mês`,
      brl0(mensal[i].rendaMensal),
      brl0(mensal[i].retornoTotal),
      `${taxaPct(final[i].taxa)} ao mês`,
      brl0(final[i].retornoTotal),
    ],
  })),
  fonte: FONTE_TAXAS,
}

const tabelaRendaMensal: Tabela = {
  legenda: 'Renda mensal do ARI com R$ 100 mil',
  colunas: ['Prazo', 'Taxa ao mês', 'Renda por mês', 'Capital devolvido no vencimento'],
  linhas: mensal.map((m) => ({
    celulas: [`${m.prazo} meses`, taxaPct(m.taxa), brl0(m.rendaMensal), brl0(CEM_MIL)],
  })),
  fonte: FONTE_TAXAS,
}

// ---- Alternativas, a partir dos comparativos ----

const linhaAri = (dimensoes: (keyof typeof ARI)[]) => ({
  celulas: ['ARI', ...dimensoes.map((d) => ARI[d])],
  destaque: true,
  href: '/ari',
})

const tabelaAlternativas = (
  legenda: string,
  dimensoes: (keyof typeof ARI)[],
  rotulos: string[],
): Tabela => ({
  legenda,
  colunas: ['Aplicação', ...rotulos],
  linhas: [
    linhaAri(dimensoes),
    ...COMPARATIVOS.map((c) => ({
      celulas: [c.nome, ...dimensoes.map((d) => c.alternativa[d])],
      href: `/${c.slug}`,
    })),
  ],
  fonte: FONTE_COMPARATIVOS,
})

// Nos comparativos, `vantagem.ir === 'empate'` marca as aplicações que também
// são isentas para pessoa física. A lista sai daí, não de texto fixo.
const isentas = COMPARATIVOS.filter((c) => c.vantagem.ir === 'empate')
const tributadas = COMPARATIVOS.filter((c) => c.vantagem.ir !== 'empate')
// Vírgula antes do último "e" quando algum item já tem "e" no nome
// ("LCI e LCA"), senão a lista fica ambígua.
const listaNomes = (nomes: string[]) => {
  if (nomes.length <= 1) return nomes.join('')
  const sep = nomes.some((n) => n.includes(' e ')) ? ', e ' : ' e '
  return `${nomes.slice(0, -1).join(', ')}${sep}${nomes[nomes.length - 1]}`
}
/** Primeira letra em minúscula, sem mexer no resto (preserva "D+1", "IR", "PF"). */
const inicioMinusculo = (t: string) => t.charAt(0).toLowerCase() + t.slice(1)

const isencaoAri = faqAri('O rendimento é realmente isento')
const aporteMinimo = faqAri('Qual o aporte mínimo')
const mensalOuFinal = faqAri('Qual a diferença entre retorno mensal')
const seguro = faqAri('O ARI é um investimento seguro')
const quemPode = faqAri('Qualquer pessoa pode investir')
const oQueE = faqAri('O que é a ARCK1PRO')

const alternativa = (slug: string) => {
  const c = COMPARATIVOS.find((x) => x.slug === slug)
  if (!c) throw new Error(`Comparativo não encontrado: ${slug}`)
  return c
}

// ---- Guias ----

export const GUIAS: Record<GuiaSlug, Guia> = {
  'quanto-rende-100-mil': {
    slug: 'quanto-rende-100-mil',
    nome: 'Quanto rende R$ 100 mil',
    tituloSeo: 'Quanto rende 100 mil reais no ARI por mês e no prazo',
    descricao: `R$ 100 mil no ARI rendem de ${brl0(rendaMin)} a ${brl0(rendaMax)} por mês, isentos de IR, conforme o prazo. Veja a tabela completa e simule.`,
    eyebrow: 'Guia do investidor',
    titulo: 'Quanto rende R$ 100 mil no ARI',
    resposta: `Com R$ 100 mil no ARI, a renda mensal fica entre ${brl0(rendaMin)} e ${brl0(rendaMax)}, conforme o prazo de ${prazoMin} a ${prazoMax} meses, com rendimento isento de Imposto de Renda. Na opção de receber tudo no vencimento, o ganho vai de ${brl0(ganhoFinalMin)} a ${brl0(ganhoFinalMax)}.`,
    destaques: [
      `Renda mensal de ${brl0(rendaMin)} a ${brl0(rendaMax)} com R$ 100 mil.`,
      `Ganho no vencimento de ${brl0(ganhoFinalMin)} a ${brl0(ganhoFinalMax)}.`,
      'Rendimento isento de IR: o valor declarado já é líquido.',
      `Garantia real de ${inicioMinusculo(ARI.lastro)}.`,
    ],
    secoes: [
      {
        id: 'tabela',
        titulo: 'Quanto R$ 100 mil rendem, prazo a prazo',
        paragrafos: [
          'A taxa do ARI depende da faixa de aporte, do prazo e da forma de recebimento. No retorno mensal, o rendimento cai todo mês e o capital volta no vencimento. No retorno no final, capital e rendimento são pagos de uma vez, com taxa maior.',
        ],
        tabela: tabelaCemMil,
      },
      {
        id: 'outras-aplicacoes',
        titulo: 'E nas outras aplicações?',
        paragrafos: [
          'As taxas de poupança, CDB e Tesouro mudam com a Selic, por isso não as fixamos aqui. O que não muda é a estrutura de cada aplicação: como o rendimento é tributado e quando o dinheiro pode ser resgatado. É isso que define quanto sobra no seu bolso ao final.',
        ],
        tabela: tabelaAlternativas(
          'Tributação e liquidez: ARI e outras aplicações',
          ['ir', 'liquidez'],
          ['Imposto de Renda', 'Liquidez'],
        ),
      },
      {
        id: 'antes-de-investir',
        titulo: 'O que considerar antes de investir R$ 100 mil no ARI',
        lista: [
          `Liquidez: ${inicioMinusculo(ARI.liquidez)}.`,
          `Aporte mínimo de ${ARI_CONDICOES.aporteMinimo}, com prazos de ${ARI_CONDICOES.prazos}.`,
          `Acesso ${ARI_CONDICOES.acesso}, em ${ARI_CONDICOES.grupo}.`,
          'A taxa é estimada e definida em contrato conforme aporte, prazo e forma de recebimento.',
        ],
      },
    ],
    simulador: { capital: CEM_MIL, prazo: 36, forma: 'mensal', titulo: 'Simule com o seu valor' },
    faqs: [
      {
        q: 'Quanto rende R$ 100 mil por mês no ARI?',
        a: `Entre ${brl0(rendaMin)} e ${brl0(rendaMax)} por mês no retorno mensal, conforme o prazo de ${prazoMin} a ${prazoMax} meses. O rendimento é isento de Imposto de Renda e o capital é devolvido no vencimento.`,
      },
      {
        q: 'Quanto R$ 100 mil rendem no total?',
        a: `No retorno mensal, o total recebido no prazo vai de ${brl0(mensal[0].retornoTotal)} (${prazoMin} meses) a ${brl0(mensal[mensal.length - 1].retornoTotal)} (${prazoMax} meses). No retorno no final, o ganho vai de ${brl0(ganhoFinalMin)} a ${brl0(ganhoFinalMax)}.`,
      },
      isencaoAri,
      mensalOuFinal,
      aporteMinimo,
      { q: 'Posso resgatar antes do prazo?', a: `${ARI.liquidez}. O prazo é definido em contrato: ${ARI_CONDICOES.prazos}.` },
    ],
    mensagemWhatsapp: 'Oi, vim pela página Quanto rende R$ 100 mil e quero saber mais sobre o ARI',
    atualizadoEm: ATUALIZADO_EM,
  },

  'investimento-isento-de-imposto-de-renda': {
    slug: 'investimento-isento-de-imposto-de-renda',
    nome: 'Investimento isento de IR',
    tituloSeo: 'Investimento isento de Imposto de Renda: quais são',
    descricao: `${listaNomes([...isentas.map((c) => c.nome), 'ARI'])}: veja quais investimentos são isentos de IR e compare garantia e liquidez.`,
    eyebrow: 'Guia do investidor',
    titulo: 'Investimento isento de Imposto de Renda: quais são e onde entra o ARI',
    resposta: `Entre as aplicações comparadas pela ARCK1PRO, são isentas de Imposto de Renda para pessoa física: ${listaNomes(isentas.map((c) => c.nome))}. O ARI também tem rendimento isento, pelo enquadramento legal da estrutura em SCP, e o valor declarado já é o rendimento líquido.`,
    destaques: [
      ...isentas.map((c) => `${c.nome}: ${inicioMinusculo(c.alternativa.ir)}.`),
      `ARI: ${inicioMinusculo(ARI.ir)}.`,
    ],
    secoes: [
      {
        id: 'tabela',
        titulo: 'Como cada aplicação é tributada',
        paragrafos: [
          'A isenção muda a conta: numa aplicação tributada, parte do rendimento fica com a Receita; numa isenta, o rendimento chega inteiro. A tabela mostra o tratamento de Imposto de Renda e a garantia de cada alternativa.',
        ],
        tabela: tabelaAlternativas(
          'Imposto de Renda e garantia por aplicação',
          ['ir', 'lastro'],
          ['Imposto de Renda', 'Lastro e garantia'],
        ),
      },
      {
        id: 'tributadas',
        titulo: 'Onde o Imposto de Renda pesa',
        lista: tributadas.map((c) => `${c.nome}: ${inicioMinusculo(c.alternativa.ir)}.`),
      },
      {
        id: 'ari',
        titulo: 'Como funciona a isenção no ARI',
        paragrafos: [
          isencaoAri.a,
          `Além da isenção, o ARI tem garantia real: ${inicioMinusculo(ARI.lastro)}. O retorno estimado é de ${ARI.retorno.replace(', estimado', '')}.`,
        ],
      },
      {
        id: 'nao-e-so-isencao',
        titulo: 'Isenção não é o único critério',
        paragrafos: [
          `Poupança, LCI e LCA também são isentas, mas diferem em retorno, liquidez e garantia. No ARI, a liquidez é baixa: ${inicioMinusculo(ARI.liquidez)}. Por isso ele faz sentido para o capital que pode ficar aplicado pelo prazo do contrato.`,
        ],
      },
    ],
    simulador: { capital: CEM_MIL, prazo: 36, forma: 'final', titulo: 'Simule o rendimento isento do ARI' },
    faqs: [
      {
        q: 'Quais investimentos são isentos de Imposto de Renda?',
        a: `Entre as aplicações comparadas pela ARCK1PRO: ${listaNomes(isentas.map((c) => `${c.nome} (${inicioMinusculo(c.alternativa.ir)})`))}. O rendimento do ARI também é isento, e o valor declarado já é líquido.`,
      },
      isencaoAri,
      {
        q: 'Fundo imobiliário é isento de IR?',
        a: `${alternativa('fundos-imobiliarios').alternativa.ir}.`,
      },
      {
        q: 'CDB e Tesouro Direto pagam Imposto de Renda?',
        a: `Sim. CDB: ${inicioMinusculo(alternativa('cdb').alternativa.ir)}. Tesouro Selic: ${inicioMinusculo(alternativa('tesouro-selic').alternativa.ir)}.`,
      },
      aporteMinimo,
    ],
    mensagemWhatsapp: 'Oi, vim pela página Investimento isento de IR e quero saber mais sobre o ARI',
    atualizadoEm: ATUALIZADO_EM,
  },

  'onde-investir-100-mil': {
    slug: 'onde-investir-100-mil',
    nome: 'Onde investir R$ 100 mil',
    tituloSeo: 'Onde investir 100 mil reais para ter renda mensal',
    descricao: `Onde investir R$ 100 mil: compare liquidez, imposto e renda mensal. No ARI, R$ 100 mil pagam de ${brl0(rendaMin)} a ${brl0(rendaMax)} por mês, isentos de IR.`,
    eyebrow: 'Guia do investidor',
    titulo: 'Onde investir R$ 100 mil para ter renda mensal',
    resposta: `Depende de quanto tempo o dinheiro pode ficar aplicado. Para resgatar a qualquer momento, ${alternativa('tesouro-selic').nome} (${inicioMinusculo(alternativa('tesouro-selic').alternativa.liquidez)}) e ${alternativa('poupanca').nome.toLowerCase()} (liquidez ${inicioMinusculo(alternativa('poupanca').alternativa.liquidez)}) atendem melhor. Para renda mensal com garantia real e isenção de IR, o ARI paga de ${brl0(rendaMin)} a ${brl0(rendaMax)} por mês com R$ 100 mil, com o capital aplicado até o fim do contrato.`,
    destaques: [
      `Renda mensal no ARI: ${brl0(rendaMin)} a ${brl0(rendaMax)} com R$ 100 mil.`,
      'Rendimento isento de IR no ARI.',
      `Liquidez do ARI: ${inicioMinusculo(ARI.liquidez)}.`,
      `Aporte mínimo de ${ARI_CONDICOES.aporteMinimo}.`,
    ],
    secoes: [
      {
        id: 'perguntas',
        titulo: 'Três perguntas antes de decidir',
        listaOrdenada: true,
        lista: [
          'Vou precisar desse dinheiro antes de 18 meses? Se sim, priorize liquidez.',
          'Quero renda todo mês ou prefiro receber tudo no vencimento? No ARI dá para escolher, e o retorno no final tem taxa maior.',
          'Quanto do rendimento vai para o Imposto de Renda? Aplicações isentas entregam o rendimento inteiro.',
        ],
      },
      {
        id: 'renda-mensal',
        titulo: 'Renda mensal com R$ 100 mil no ARI',
        paragrafos: [mensalOuFinal.a],
        tabela: tabelaRendaMensal,
      },
      {
        id: 'liquidez',
        titulo: 'Liquidez e imposto de cada alternativa',
        tabela: tabelaAlternativas(
          'Liquidez e Imposto de Renda por aplicação',
          ['liquidez', 'ir'],
          ['Liquidez', 'Imposto de Renda'],
        ),
      },
      {
        id: 'quando-nao',
        titulo: 'Quando o ARI não é a melhor escolha',
        lista: [
          'Se você pode precisar do dinheiro antes do fim do prazo: o capital fica aplicado até o vencimento.',
          `Se o valor disponível é menor que ${ARI_CONDICOES.aporteMinimo}, o aporte mínimo.`,
          'Se você busca liquidez diária para reserva de emergência.',
        ],
      },
    ],
    simulador: { capital: CEM_MIL, prazo: 36, forma: 'mensal', titulo: 'Simule a renda mensal' },
    faqs: [
      {
        q: 'Quanto R$ 100 mil pagam por mês no ARI?',
        a: `De ${brl0(rendaMin)} a ${brl0(rendaMax)} por mês, conforme o prazo de ${prazoMin} a ${prazoMax} meses, isentos de Imposto de Renda.`,
      },
      mensalOuFinal,
      { q: 'O capital fica preso?', a: `${ARI.liquidez}. Os prazos são de ${ARI_CONDICOES.prazos}.` },
      aporteMinimo,
      quemPode,
    ],
    mensagemWhatsapp: 'Oi, vim pela página Onde investir R$ 100 mil e quero saber mais sobre o ARI',
    atualizadoEm: ATUALIZADO_EM,
  },

  'ari-e-confiavel': {
    slug: 'ari-e-confiavel',
    nome: 'O ARI é confiável?',
    tituloSeo: 'O ARI é confiável? Garantias, governança e riscos',
    descricao:
      'O ARI é confiável? Veja as três camadas de proteção, a governança da operação, os riscos e o que conferir antes de investir.',
    eyebrow: 'Segurança e governança',
    titulo: 'O ARI é confiável?',
    resposta:
      'O ARI tem três camadas de proteção formalizadas em contrato: estrutura em SCP regida pelo Código Civil, garantia de 200% do valor investido em unidades registradas em cartório e um imóvel físico da incorporadora reservado em nome do investidor. O capital do ARI é segregado do caixa operacional da incorporadora, e o acesso é por qualificação.',
    destaques: [
      'Contrato de SCP regido pelo Código Civil.',
      'Garantia de 200% em unidades registradas em cartório.',
      'Imóvel físico da incorporadora reservado no seu nome.',
      'Capital segregado do caixa da incorporadora.',
      `Empresa registrada: ${EMPRESA.razaoSocial}, CNPJ ${EMPRESA.cnpj}.`,
    ],
    secoes: [
      {
        id: 'governanca',
        titulo: 'Governança que você pode verificar',
        lista: ARI_DIFERENCIAIS,
      },
      {
        id: 'riscos',
        titulo: 'Os riscos, com todas as letras',
        lista: [
          `Liquidez baixa: ${inicioMinusculo(ARI.liquidez)}.`,
          'O retorno de 1,5% a 3% ao mês é estimado, e rentabilidade passada não garante resultado futuro.',
          `O acesso é ${ARI_CONDICOES.acesso}: nem todo perfil é aceito.`,
        ],
      },
      {
        id: 'o-que-conferir',
        titulo: 'O que conferir antes de investir',
        listaOrdenada: true,
        lista: [
          'Leia o contrato da SCP e confirme prazo, taxa e forma de recebimento.',
          'Peça as matrículas das unidades dadas em garantia e do imóvel reservado em seu nome, registradas em cartório.',
          'Confirme que o valor das unidades em garantia corresponde a 200% do seu aporte.',
          'Tire suas dúvidas com a equipe de estruturação antes de assinar.',
        ],
      },
      {
        id: 'dados-cadastrais',
        titulo: 'Dados cadastrais que você pode consultar',
        paragrafos: [
          `A empresa responsável é registrada na Receita Federal e pode ser consultada pelo CNPJ ${EMPRESA.cnpj}.`,
        ],
        lista: [
          `Razão social: ${EMPRESA.razaoSocial}.`,
          `CNPJ: ${EMPRESA.cnpj}, situação ${EMPRESA.situacao.toLowerCase()} desde ${dataBR(EMPRESA.inicioAtividade)}.`,
          `Atividade principal: ${EMPRESA.atividadePrincipal.toLowerCase()}.`,
          `Endereço: ${EMPRESA.endereco.rua}, ${EMPRESA.endereco.bairro}, ${EMPRESA.endereco.cidade}/${EMPRESA.endereco.uf}.`,
          `Fundadores: ${FUNDADORES.map((f) => `${f.nome} (${f.formacao.toLowerCase()})`).join(' e ')}.`,
        ],
      },
      {
        id: 'quem-esta-por-tras',
        titulo: 'Quem está por trás',
        paragrafos: [oQueE.a],
      },
    ],
    mostrarProtecoes: true,
    faqs: [
      seguro,
      {
        q: 'Qual é o CNPJ da ARCK1PRO?',
        a: `${EMPRESA.cnpj}, razão social ${EMPRESA.razaoSocial}, em ${EMPRESA.endereco.cidade}/${EMPRESA.endereco.uf}. A situação cadastral pode ser consultada na Receita Federal.`,
      },
      quemPode,
      oQueE,
      isencaoAri,
      aporteMinimo,
    ],
    mensagemWhatsapp: 'Oi, vim pela página O ARI é confiável e quero tirar dúvidas sobre a segurança',
    atualizadoEm: ATUALIZADO_EM,
  },
}

export const GUIA_SLUGS = Object.keys(GUIAS) as GuiaSlug[]
