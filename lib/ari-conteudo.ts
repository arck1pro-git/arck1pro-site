// Textos do ARI compartilhados entre /ari e as páginas de guia
// (/quanto-rende-100-mil, /investimento-isento-de-imposto-de-renda,
// /onde-investir-100-mil, /ari-e-confiavel). Moram num lugar só pelo mesmo
// motivo das taxas em lib/ari-taxas: duas páginas descrevendo o produto de
// jeitos diferentes seriam duas ofertas diferentes.

export const ARI_METRICAS = [
  { value: '200%', label: 'de garantia real em ativos registrados em cartório' },
  { value: '0%', label: 'de IR sobre os rendimentos: o valor declarado já é líquido' },
  { value: 'R$ 50 mil', label: 'de aporte mínimo' },
  { value: '1,5% a 3%', label: 'de retorno estimado ao mês' },
]

export const ARI_PROTECOES = [
  {
    n: '01',
    title: 'Contrato regido pelo Código Civil',
    text: 'A estrutura de Sociedade em Conta de Participação (SCP) é regida pelo Código Civil Brasileiro. Seus direitos ficam formalizados em contrato, e não em prospectos.',
  },
  {
    n: '02',
    title: 'Garantia de 200% em unidades futuras',
    text: 'Cada participação é garantida por 200% do valor investido em unidades imobiliárias registradas em cartório no próprio empreendimento em que você investe.',
  },
  {
    n: '03',
    title: 'Imóvel físico reservado como garantia',
    text: 'Um imóvel físico de propriedade da incorporadora fica reservado como garantia no seu nome durante todo o prazo do contrato.',
  },
]

export const ARI_FAQS: { q: string; a: string }[] = [
  {
    q: 'Qualquer pessoa pode investir?',
    a: 'Não. O ARI opera por seleção: somente investidores qualificados e criteriosamente selecionados poderão participar. Para cada nova incorporação formamos um grupo restrito de 8 a 17 investidores, o que preserva a governança da operação e o alinhamento entre os sócios. Por isso o acesso acontece mediante qualificação. Você preenche seus dados, nossa equipe avalia o seu perfil e havendo aderência, apresenta as operações abertas.',
  },
  {
    q: 'O ARI é um investimento seguro?',
    a: 'Sim. O ARI conta com três camadas de proteção: contrato regido pelo Código Civil, garantia de 200% em unidades futuras do empreendimento em que você investe e um imóvel físico de propriedade da incorporadora reservado como garantia no seu nome.',
  },
  {
    q: 'O rendimento é realmente isento de IR?',
    a: 'Sim. A operação é estruturada para se enquadrar nas regras legais que permitem a isenção de Imposto de Renda sobre os rendimentos. É o enquadramento correto da operação, e o rendimento declarado já é o rendimento líquido.',
  },
  {
    q: 'Qual a diferença entre retorno mensal e no final?',
    a: 'No retorno mensal, você recebe o rendimento todo mês durante o prazo contratado. No retorno no final, o capital e todo o rendimento são pagos de uma só vez no vencimento, e por isso o retorno aplicado é superior.',
  },
  {
    q: 'Qual o aporte mínimo?',
    a: 'O aporte mínimo é de R$ 50.000. Investidores com aportes maiores podem negociar condições específicas com a equipe de estruturação.',
  },
  {
    q: 'Preciso de experiência com mercado imobiliário?',
    a: 'Não. O ARI foi estruturado para o investidor que compreende o valor do litoral catarinense e prefere não operar diretamente no mercado. A ARCK1PRO cuida de toda a estruturação, governança e gestão do empreendimento.',
  },
  {
    q: 'O que é a ARCK1PRO?',
    a: 'A ARCK1PRO é a estruturadora do ecossistema, o hub de método, capital intelectual e governança que viabiliza empreendimentos de alto padrão no litoral catarinense. Funciona como o motor operacional que estrutura cada empreendimento do terreno ao lançamento, com método próprio desenvolvido em mais de vinte anos de atuação na região. O ARI é o instrumento de capital criado pela ARCK1PRO para financiar a fase mais estratégica desse ciclo.',
  },
]

/** Aviso regulatório, o mesmo do llms.txt. */
export const ARI_AVISO_REGULATORIO =
  'O ARI é um produto de investimento estruturado que requer qualificação prévia do investidor. As informações deste site têm caráter informativo e não constituem oferta pública de valores mobiliários.'

/** Diferenciais que o investidor consegue verificar (fonte: llms.txt do site). */
export const ARI_DIFERENCIAIS = [
  'Estrutura SCP em conformidade com o Código Civil Brasileiro.',
  'Remuneração atrelada à operação de incorporação, e não ao lastro em construção.',
  'Garantia de 200% lastreada em unidades registradas em cartório.',
  'Imóvel físico da incorporadora reservado em nome do investidor durante todo o contrato.',
  'Capital do ARI segregado do caixa operacional da incorporadora.',
  'Especialização geográfica no litoral catarinense.',
]

/** Condições do produto (fonte: llms.txt e /ari). */
export const ARI_CONDICOES = {
  aporteMinimo: 'R$ 50.000',
  prazos: '18, 24 ou 36 meses',
  recebimento: 'mensal ou no vencimento',
  grupo: 'grupos de 8 a 17 investidores por empreendimento',
  acesso: 'por qualificação',
}
