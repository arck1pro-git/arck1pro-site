import { ARI, COMPARATIVOS, DIMENSOES, ROTULO_DIMENSAO } from '@/lib/comparativos'
import { comparativoFaqs } from '@/lib/comparativos-faq'
import { ARI_AVISO_REGULATORIO, ARI_DIFERENCIAIS, ARI_FAQS, ARI_PROTECOES } from '@/lib/ari-conteudo'
import { GUIAS, GUIA_SLUGS, type Tabela } from '@/lib/guias'
import { EMPRESA, FUNDADORES, dataBR } from '@/lib/empresa'
import { SITE_URL } from '@/lib/site'

// Versão completa, em texto, do conteúdo institucional para assistentes de IA
// (complementa o /llms.txt, que é o índice). Gerada das mesmas fontes que as
// páginas usam, então nunca diverge delas. Estática: regerada a cada deploy.
export const dynamic = 'force-static'

const tabelaMd = (t: Tabela) =>
  [
    `| ${t.colunas.join(' | ')} |`,
    `| ${t.colunas.map(() => '---').join(' | ')} |`,
    ...t.linhas.map((l) => `| ${l.celulas.join(' | ')} |`),
    '',
    `Fonte: ${t.fonte}`,
  ].join('\n')

const faqMd = (faqs: { q: string; a: string }[]) => faqs.map((f) => `**${f.q}**\n${f.a}`).join('\n\n')

function gerar(): string {
  const e = EMPRESA
  const partes: string[] = []

  partes.push(`# ${e.nome}: conteúdo completo para assistentes de IA

> Estruturadora de incorporações de alto padrão no litoral de Santa Catarina.
> Capta recursos via SCP (Sociedade em Conta de Participação) com o ARI,
> Ativo de Renda Imobiliária. Site: ${SITE_URL}. Índice resumido: ${SITE_URL}/llms.txt

## Empresa

- Razão social: ${e.razaoSocial}
- CNPJ: ${e.cnpj}, situação ${e.situacao.toLowerCase()} desde ${dataBR(e.inicioAtividade)} (Receita Federal, consulta em ${dataBR(e.consultadoEm)})
- Atividade principal: ${e.atividadePrincipal}
- Endereço: ${e.endereco.rua}, ${e.endereco.bairro}, ${e.endereco.cidade}/${e.endereco.uf}, CEP ${e.endereco.cep}
- Contato: ${e.email}

## Fundadores

${FUNDADORES.map((f) => `- ${f.nome} (${f.cargo}, ${f.formacao.toLowerCase()}): ${f.descricao}`).join('\n')}

## ARI: Ativo de Renda Imobiliária

${DIMENSOES.map((d) => `- ${ROTULO_DIMENSAO[d]}: ${ARI[d]}`).join('\n')}

### Três camadas de proteção

${ARI_PROTECOES.map((p) => `- ${p.title}: ${p.text}`).join('\n')}

### Diferenciais verificáveis

${ARI_DIFERENCIAIS.map((d) => `- ${d}`).join('\n')}

### Perguntas frequentes

${faqMd(ARI_FAQS)}`)

  for (const slug of GUIA_SLUGS) {
    const g = GUIAS[slug]
    const secoes = g.secoes
      .map((s) =>
        [
          `### ${s.titulo}`,
          ...(s.paragrafos ?? []),
          ...(s.lista ? [s.lista.map((i, n) => (s.listaOrdenada ? `${n + 1}. ${i}` : `- ${i}`)).join('\n')] : []),
          ...(s.tabela ? [tabelaMd(s.tabela)] : []),
        ].join('\n\n'),
      )
      .join('\n\n')
    partes.push(`## ${g.titulo}

URL: ${SITE_URL}/${g.slug} (revisado em ${dataBR(g.atualizadoEm)})

${g.resposta}

${g.destaques.map((d) => `- ${d}`).join('\n')}

${secoes}

### Perguntas frequentes

${faqMd(g.faqs)}`)
  }

  partes.push(`## ARI comparado a outras aplicações

As características abaixo são estruturais (tributação, garantia, liquidez), não taxas do dia.`)
  for (const c of COMPARATIVOS) {
    partes.push(`### ${c.nome} ou ARI

URL: ${SITE_URL}/${c.slug}

${c.chamada}

| Critério | ${c.nome} | ARI |
| --- | --- | --- |
${DIMENSOES.map((d) => `| ${ROTULO_DIMENSAO[d]} | ${c.alternativa[d]} | ${ARI[d]} |`).join('\n')}

${faqMd(comparativoFaqs(c))}`)
  }

  partes.push(`## Aviso regulatório

${ARI_AVISO_REGULATORIO}`)

  return `${partes.join('\n\n')}\n`
}

export function GET() {
  return new Response(gerar(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
