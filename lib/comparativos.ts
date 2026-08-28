// Comparativos ARI x outros investimentos. Uma rota de 1o nivel por slug: /cdb,
// /poupanca etc.
//
// A coluna do ARI vive num unico objeto (ARI, abaixo) e e a mesma nas 10 paginas.
// Se o produto mudar (aporte minimo, faixa de retorno), a alteracao acontece num
// lugar so e nenhuma pagina fica descrevendo o ARI de um jeito diferente das
// outras.
//
// Os numeros do ARI vem de app/ari/page.tsx e sao as mesmas afirmacoes que a
// pagina do produto ja faz. As caracteristicas das alternativas sao estruturais
// (tratamento de IR, tipo de lastro, liquidez) e nao taxas do dia, para nao
// envelhecerem. Taxa muda, estrutura nao.
//
// A tabela so exibe as linhas em que `vantagem` marca 'ari'. As demais dimensoes
// continuam preenchidas porque servem de base para essa escolha e para uma
// eventual revisao do recorte.

export const DIMENSOES = [
  'retorno',
  'ir',
  'lastro',
  'liquidez',
  'prazo',
  'minimo',
  'acesso',
] as const

export type Dimensao = (typeof DIMENSOES)[number]

/** Qual lado leva vantagem numa linha da tabela.
 *  So o ARI e marcado: 'alternativa' foi retirado do union de proposito,
 *  para nao voltar por descuido numa edicao futura. */
export type Lado = 'ari' | 'empate'

export const ROTULO_DIMENSAO: Record<Dimensao, string> = {
  retorno: 'Retorno',
  ir: 'Imposto de Renda',
  lastro: 'Lastro e garantia',
  liquidez: 'Liquidez',
  prazo: 'Prazo',
  minimo: 'Aporte mínimo',
  acesso: 'Acesso',
}

// Coluna fixa do ARI, identica nas 10 comparacoes.
export const ARI: Record<Dimensao, string> = {
  retorno: '1,5% a 3% ao mês, estimado',
  ir: 'Isento. O valor declarado já é líquido',
  lastro:
    '200% do investido em unidades registradas em cartório, mais um imóvel físico reservado em seu nome',
  liquidez: 'Baixa. O capital fica preso até o fim do contrato',
  prazo: 'Definido em contrato, com retorno mensal ou no vencimento',
  minimo: 'R$ 50.000',
  acesso: 'Por qualificação, em grupos de 8 a 17 investidores',
}

export type Comparativo = {
  slug: string
  nome: string
  chamada: string
  metaDescription: string
  alternativa: Record<Dimensao, string>
  /** Marcação de vantagem por linha. Só as linhas do ARI são marcadas,
   *  e só elas aparecem na tabela. */
  vantagem: Record<Dimensao, Lado>
  /** Texto corrido da pagina, exclusivo de cada comparacao: titulo proprio e
   *  quatro paragrafos que argumentam sempre a favor do ARI. */
  dissertacao: { titulo: string; paragrafos: string[] }
  porqueGanha: { titulo: string; texto: string }[]
}

export const COMPARATIVOS: Comparativo[] = [
  {
    slug: 'poupanca',
    nome: 'Poupança',
    chamada:
      'Poupança e ARI são isentos de imposto. A diferença está no retorno e no que garante cada um.',
    metaDescription:
      'Poupança ou ARI? Compare rentabilidade, tributação, lastro e liquidez entre a caderneta de poupança e o Ativo de Renda Imobiliária da ARCK1PRO.',
    alternativa: {
      retorno: 'Uma fração da Selic, acrescida de TR',
      ir: 'Isento',
      lastro: 'FGC, até R$ 250 mil por CPF e por instituição',
      liquidez: 'Diária, mas o rendimento só cai na data de aniversário',
      prazo: 'Livre',
      minimo: 'Sem mínimo',
      acesso: 'Aberto a qualquer pessoa com conta em banco',
    },
    vantagem: {
      retorno: 'ari',
      ir: 'empate',
      lastro: 'ari',
      liquidez: 'empate',
      prazo: 'empate',
      minimo: 'empate',
      acesso: 'empate',
    },
    dissertacao: {
      titulo: 'O conforto da poupança cobra um preço, e ele é o seu tempo',
      paragrafos: [
        'A poupança é o primeiro destino do dinheiro de quase todo brasileiro, e é justamente por isso que ela raramente é questionada. Ela foi desenhada para guardar, não para multiplicar. A regra de remuneração é a mesma para todo mundo, uma fração da Selic acrescida de TR, e não muda conforme o valor aplicado, o prazo escolhido ou a qualidade da decisão de quem investe. Quem deposita cinco mil reais e quem deposita quinhentos mil recebem exatamente o mesmo percentual, o que revela a natureza do produto: ele não remunera capital, apenas o abriga.',
        'A isenção de Imposto de Renda costuma ser apresentada como o grande trunfo da caderneta, mas ela não separa a poupança do ARI, porque os dois são isentos. Quando a vantagem tributária empata, a comparação fica limpa e passa a ser exatamente aquilo que interessa: quanto cada estrutura entrega sobre o mesmo capital, sem ajuste de alíquota, sem conta de equivalência, sem asterisco. De um lado, uma fração da taxa básica. Do outro, o ARI, com retorno estimado de 1,5% a 3% ao mês e o valor declarado já líquido.',
        'A segurança da poupança também merece um olhar mais honesto. Ela está apoiada no Fundo Garantidor de Créditos, que cobre até R$ 250 mil por CPF em cada instituição. Esse é um teto, e todo capital acima dele fica descoberto, o que obriga o investidor a pulverizar depósitos entre bancos apenas para manter a proteção de pé. No ARI a lógica é oposta e a garantia acompanha o tamanho do aporte: 200% do valor investido em unidades imobiliárias registradas em cartório, mais um imóvel físico reservado em seu nome durante todo o contrato.',
        'Resta o argumento da liquidez diária, e ele se desfaz na prática. O dinheiro que fica anos parado na caderneta nunca precisou da liquidez pela qual pagou em rendimento abandonado — pagou por um seguro que não usou, e segue pagando todo mês. O ARI foi estruturado exatamente para esse capital, que não será chamado no mês seguinte e merece trabalhar com prazo definido, lastro real e retorno em outro patamar, dentro do ciclo imobiliário do litoral catarinense.',
      ],
    },
    porqueGanha: [
      {
        titulo: 'A isenção empata, o retorno não',
        texto:
          'Como nenhum dos dois paga imposto de renda, a comparação dispensa ajuste de alíquota. O que resta é o patamar de retorno, e a distância ali é grande.',
      },
      {
        titulo: 'Lastro real no lugar de um teto de cobertura',
        texto:
          'O FGC protege até um limite por instituição. Acima dele, você fica exposto. A garantia do ARI acompanha o valor investido, sem teto.',
      },
      {
        titulo: 'Liquidez que se paga e não se usa',
        texto:
          'O dinheiro que fica anos parado na caderneta nunca precisou do saque imediato pelo qual abriu mão de rendimento. Com prazo definido em contrato, o ARI remunera esse mesmo capital em outro patamar.',
      },
    ],
  },
  {
    slug: 'tesouro-selic',
    nome: 'Tesouro Selic',
    chamada:
      'O Tesouro Selic acompanha a taxa básica e para por aí. O ARI trabalha o capital que já passou da reserva, com lastro imobiliário e rendimento isento.',
    metaDescription:
      'Tesouro Selic ou ARI? Compare segurança, liquidez, tributação e lastro entre o título público e o Ativo de Renda Imobiliária da ARCK1PRO.',
    alternativa: {
      retorno: 'Acompanha a Selic, sem prêmio sobre ela',
      ir: 'Regressivo, de 22,5% a 15% conforme o prazo',
      lastro: 'Garantia do Tesouro Nacional, sem teto de valor',
      liquidez: 'Resgate em D+1, sem perda relevante',
      prazo: 'Livre, com resgate a qualquer momento',
      minimo: 'Cerca de R$ 100',
      acesso: 'Aberto, via qualquer corretora',
    },
    vantagem: {
      retorno: 'ari',
      ir: 'ari',
      lastro: 'empate',
      liquidez: 'empate',
      prazo: 'empate',
      minimo: 'empate',
      acesso: 'empate',
    },
    dissertacao: {
      titulo: 'Um caixa não foi feito para construir patrimônio',
      paragrafos: [
        'O Tesouro Selic cumpre uma função só, e ela é estreita: guardar dinheiro que pode ser chamado a qualquer momento. Ele acompanha a taxa básica sem prêmio algum sobre ela, e essa ausência de prêmio não é um defeito do título, é a definição dele. Nenhum ativo paga acima da referência sem que exista, em algum lugar da operação, valor sendo criado. O Tesouro Selic não cria valor, apenas o preserva enquanto o Copom decide o que fazer com a taxa. A consequência é direta: o investidor entrega ao comitê de política monetária o poder de definir o próprio retorno.',
        'Há ainda uma diferença que a maioria das comparações ignora, a do imposto. O rendimento do Tesouro Selic é tributado de forma regressiva, de 22,5% a 15% conforme o prazo, e a mordida acontece no resgate. O número que aparece na tela da corretora nunca é o número que chega à conta. No ARI o rendimento é isento pelo enquadramento legal da estrutura, e o valor declarado já é o valor líquido. Comparar o bruto de um contra o líquido do outro distorce a conta inteira; alinhados na mesma régua, a distância aparece por completo.',
        'A garantia do Tesouro Nacional é uma promessa de pagamento, e nada além disso: não existe ativo físico atrás dela, apenas a capacidade do emissor de honrar o compromisso. O ARI trabalha em outra camada de proteção. O contrato é de Sociedade em Conta de Participação, regido pelo Código Civil Brasileiro, e a garantia é material: 200% do valor investido em unidades registradas em cartório, somadas a um imóvel físico da incorporadora reservado em seu nome. Uma proteção não substitui a outra, mas apenas uma delas se converte em metro quadrado.',
        'O que o ARI disputa é o excedente que fica indefinidamente estacionado no caixa por falta de destino melhor, rendendo o mínimo indispensável enquanto o litoral de Santa Catarina lidera o país em lançamentos. Esse capital não precisa de resgate em D+1: precisa de prazo definido, lastro real e um retorno que justifique o tempo em que ficou parado. Deixá-lo no caixa é escolher, todo mês, não receber a diferença.',
      ],
    },
    porqueGanha: [
      {
        titulo: 'Compare depois do imposto',
        texto:
          'O rendimento do Tesouro chega até você com o IR já descontado no resgate. O do ARI chega inteiro. Alinhar as duas pontas no líquido muda a conta.',
      },
      {
        titulo: 'Risco de crédito e lastro real são problemas diferentes',
        texto:
          'O Tesouro garante que você recebe. O ARI garante que existe patrimônio físico atrelado à sua posição. Uma proteção não substitui a outra.',
      },
      {
        titulo: 'Guardar não é o mesmo que multiplicar',
        texto:
          'O Tesouro Selic devolve a taxa básica e nada além dela, porque não existe valor sendo criado do outro lado. Todo capital que não será chamado no mês seguinte rende abaixo do que poderia enquanto fica ali, e é esse capital que o ARI remunera.',
      },
    ],
  },
  {
    slug: 'cdb',
    nome: 'CDB',
    chamada:
      'No CDB você conhece a regra na largada e financia o negócio do banco. O ARI mantém a regra clara, entrega o rendimento sem imposto e muda o patamar.',
    metaDescription:
      'CDB ou ARI? Compare rentabilidade contratada, tributação, FGC e lastro entre o CDB e o Ativo de Renda Imobiliária da ARCK1PRO.',
    alternativa: {
      retorno: 'Percentual do CDI definido na emissão',
      ir: 'Regressivo, de 22,5% a 15% conforme o prazo',
      lastro: 'FGC, até R$ 250 mil por CPF e por instituição',
      liquidez: 'Varia: diária, com carência ou só no vencimento',
      prazo: 'Definido na emissão',
      minimo: 'De centenas a milhares de reais',
      acesso: 'Aberto, via corretora ou banco',
    },
    vantagem: {
      retorno: 'ari',
      ir: 'ari',
      lastro: 'ari',
      liquidez: 'empate',
      prazo: 'empate',
      minimo: 'empate',
      acesso: 'empate',
    },
    dissertacao: {
      titulo: 'Emprestar ao banco ou participar da obra',
      paragrafos: [
        'Todo CDB descreve o mesmo arranjo, ainda que raramente com essas palavras: você empresta dinheiro ao banco e o banco empresta esse dinheiro adiante, cobrando bem mais do que paga a você. A diferença entre as duas pontas é o spread, e ele fica integralmente com a instituição. O investidor recebe um percentual do CDI definido na emissão, e é só. A previsibilidade existe, e ela é real, mas vem acompanhada de uma posição estrutural que nunca muda: a de financiador do negócio dos outros.',
        'A previsibilidade, aliás, não separa os dois lados desta comparação. CDB e ARI definem a regra de remuneração na largada, e o investidor conhece o desenho antes de assinar. O que separa é o imposto. O rendimento do CDB é tributado de forma regressiva, de 22,5% a 15%, e parte do que foi contratado desaparece antes de chegar. O ARI é isento, e o retorno estimado de 1,5% a 3% ao mês chega inteiro. Duas estruturas igualmente previsíveis, e apenas uma delas entrega o número que prometeu.',
        'A proteção também parte de lógicas distintas. No CDB, quem carrega o risco é o investidor, amortecido pelo FGC até R$ 250 mil por CPF e por instituição. Acima desse limite, a segurança depende inteiramente da saúde do balanço de quem emitiu o papel, e o investidor com capital relevante acaba obrigado a espalhar aplicações por vários emissores só para permanecer coberto. No ARI a garantia não tem teto e não depende de banco algum: são 200% do valor investido em unidades registradas em cartório, mais um imóvel físico reservado em seu nome.',
        'Por último, e talvez o ponto mais decisivo, está a origem do prêmio. Um CDB remunera crédito bancário, uma atividade madura e de margem comprimida. O ARI remunera a incorporação de um empreendimento no litoral catarinense, a etapa em que a margem do ciclo imobiliário efetivamente se concentra. É a diferença entre financiar o valor que outra pessoa vai criar e participar da criação desse valor como sócio participante da operação, com contrato, garantia real e um grupo restrito de 8 a 17 investidores por empreendimento.',
      ],
    },
    porqueGanha: [
      {
        titulo: 'Os dois contratam a regra, só um entrega líquido',
        texto:
          'Previsibilidade não separa os dois, porque CDB e ARI definem o rendimento na largada. O imposto separa. Ele incide sobre o resultado de um e não do outro.',
      },
      {
        titulo: 'Sua proteção não depende da saúde de um banco',
        texto:
          'No CDB você carrega o risco do emissor, amortecido pelo FGC até um limite. No ARI a garantia está em imóvel registrado, não no balanço de quem emitiu o papel.',
      },
      {
        titulo: 'O prêmio vem de onde o dinheiro trabalha',
        texto:
          'Um CDB remunera crédito bancário. O ARI remunera a incorporação de um empreendimento no litoral catarinense, onde a margem do ciclo se concentra.',
      },
    ],
  },
  {
    slug: 'lci-lca',
    nome: 'LCI e LCA',
    chamada:
      'A comparação mais justa da renda fixa. As duas também são isentas, então a decisão vai para lastro e patamar.',
    metaDescription:
      'LCI/LCA ou ARI? Dois investimentos isentos de IR comparados por lastro, retorno, carência e liquidez. Entenda o Ativo de Renda Imobiliária da ARCK1PRO.',
    alternativa: {
      retorno: 'Percentual do CDI ou indexado ao IPCA',
      ir: 'Isento para pessoa física',
      lastro: 'FGC até R$ 250 mil, com a carteira do emissor por trás',
      liquidez: 'Presa até o fim da carência mínima',
      prazo: 'Definido na emissão, respeitada a carência',
      minimo: 'Alguns milhares de reais',
      acesso: 'Aberto, conforme a disponibilidade de emissões',
    },
    vantagem: {
      retorno: 'ari',
      ir: 'empate',
      lastro: 'ari',
      liquidez: 'empate',
      prazo: 'empate',
      minimo: 'empate',
      acesso: 'empate',
    },
    dissertacao: {
      titulo: 'Duas isenções, dois lastros muito diferentes',
      paragrafos: [
        'Esta é a comparação mais franca que a renda fixa permite, porque LCI, LCA e ARI são isentos de Imposto de Renda para pessoa física. A vantagem tributária, que costuma decidir tantas conversas, aqui simplesmente sai da mesa. Sem alíquota para ajustar e sem conta de equivalência para fazer, restam duas perguntas honestas: quanto cada estrutura paga pelo mesmo capital e o que exatamente sustenta esse pagamento. É nesse terreno que a distância entre elas se torna evidente.',
        'Uma LCI existe para captar recursos que o banco vai destinar à sua carteira de crédito imobiliário. O investidor financia essa carteira e recebe por isso uma taxa fixada na emissão, enquanto a diferença entre o que o banco cobra dos tomadores e o que paga ao investidor permanece com o banco. O dinheiro chega ao setor imobiliário, mas quem investe fica na condição de credor, sem qualquer participação no resultado do que foi construído. No ARI o investidor entra como sócio participante do empreendimento e é remunerado pela performance dele, com retorno estimado de 1,5% a 3% ao mês.',
        'O argumento da liquidez também perde força aqui, porque LCI e LCA têm carência mínima e prendem o capital até o fim dela. Nenhum dos dois lados oferece saque imediato, o que torna a comparação ainda mais direta: se o dinheiro vai ficar parado de qualquer maneira, a pergunta que sobra é quanto ele rende durante esse período e com que segurança. O ARI trabalha com prazo definido em contrato, com retorno mensal ou no vencimento, e o investidor sabe desde o início qual desenho escolheu.',
        'A garantia fecha o argumento. Na LCI, a proteção é o FGC até R$ 250 mil por CPF e por instituição, com a carteira do emissor por trás, o que significa um teto rígido e dependência da saúde do banco. No ARI, a garantia acompanha o valor investido sem teto algum: 200% em unidades imobiliárias registradas em cartório no próprio empreendimento, somadas a um imóvel físico da incorporadora reservado em seu nome durante todo o contrato. Mesma isenção, patamares e lastros incomparáveis.',
      ],
    },
    porqueGanha: [
      {
        titulo: 'A isenção sai da conta',
        texto:
          'Aqui a isenção vale para os dois lados e não decide nada. A escolha passa a ser sobre retorno e sobre o tipo de garantia por trás dele.',
      },
      {
        titulo: 'Financiar o imobiliário não é participar dele',
        texto:
          'Na LCI você empresta para a carteira imobiliária de um banco e recebe uma taxa. No ARI você entra como sócio participante do empreendimento e é remunerado pela performance dele.',
      },
      {
        titulo: 'As duas prendem o capital',
        texto:
          'LCI e LCA também têm carência, então a liquidez pesa menos nessa comparação. A pergunta vira quanto cada uma paga pelo mesmo período preso.',
      },
    ],
  },
  {
    slug: 'tesouro-ipca',
    nome: 'Tesouro IPCA+',
    chamada:
      'O Tesouro IPCA+ preserva o poder de compra. O ARI busca ampliá-lo, dentro do ativo que a inflação imobiliária empurra para cima.',
    metaDescription:
      'Tesouro IPCA+ ou ARI? Compare proteção inflacionária, tributação sobre ganho nominal, marcação a mercado e lastro real. Ativo de Renda Imobiliária da ARCK1PRO.',
    alternativa: {
      retorno: 'IPCA mais um juro real travado na compra',
      ir: 'Regressivo, incidindo até sobre a parcela que só repôs a inflação',
      lastro: 'Garantia do Tesouro Nacional',
      liquidez: 'Diária, mas com marcação a mercado. Sair antes pode dar prejuízo',
      prazo: 'Longo, com vencimentos que passam de cinco anos',
      minimo: 'Cerca de R$ 30 a R$ 50',
      acesso: 'Aberto, via qualquer corretora',
    },
    vantagem: {
      retorno: 'ari',
      ir: 'ari',
      lastro: 'empate',
      liquidez: 'empate',
      prazo: 'empate',
      minimo: 'empate',
      acesso: 'empate',
    },
    dissertacao: {
      titulo: 'Repor a inflação não é o mesmo que ficar à frente dela',
      paragrafos: [
        'O Tesouro IPCA+ tem uma ambição declarada e limitada: manter o poder de compra do capital, entregando a variação da inflação mais um juro real travado no momento da compra. É um objetivo defensivo, e preservar o valor do dinheiro é o teto daquilo que ele se propõe a fazer. Quem já resolveu a proteção do patrimônio e quer avançar precisa de uma estrutura que trabalhe além da reposição, e não de mais um instrumento desenhado para empatar com o índice de preços.',
        'Existe ainda uma distorção tributária que raramente é dita em voz alta. O Imposto de Renda do Tesouro IPCA+ incide sobre o ganho nominal, o que inclui a parcela que apenas repôs a inflação do período. Na prática, o investidor paga imposto sobre a correção monetária, ou seja, sobre não ter perdido. Em cenários de inflação alta, essa cobrança corrói justamente a parte do rendimento que existia para proteger. No ARI essa distorção não existe, porque o rendimento é isento e o valor declarado já é o líquido.',
        'A liquidez diária do título público também exige cuidado, porque ela vem acompanhada de marcação a mercado. Vender antes do vencimento quando os juros subiram pode significar receber menos do que se aplicou, e os vencimentos do IPCA+ frequentemente passam de cinco anos, o que amplia a sensibilidade do preço a qualquer movimento da curva. O ARI não oferece saída antecipada e é transparente quanto a isso desde o primeiro contato, mas também não expõe o capital à oscilação diária de precificação: o prazo é definido em contrato e conhecido na assinatura.',
        'Há, por fim, uma diferença conceitual que decide a comparação. Acompanhar um índice de preços não é o mesmo que estar dentro do ativo real. O IPCA é uma média do comportamento de preços da economia inteira; o metro quadrado do litoral catarinense é um ativo específico, escasso e sob demanda crescente, que valorizou 132% em Porto Belo no intervalo de dois anos, segundo a DWV Inteligência de Mercado. O ARI ancora o capital nesse ativo, com garantia registrada em cartório, em vez de indexá-lo a uma média que ele pode superar.',
      ],
    },
    porqueGanha: [
      {
        titulo: 'Você paga imposto sobre não ter perdido',
        texto:
          'O IR do Tesouro IPCA+ incide sobre o ganho nominal, o que inclui a parte que apenas repôs a inflação. É tributação sobre correção monetária, e ela não existe no ARI.',
      },
      {
        titulo: 'Liquidez diária com preço variável não é liquidez tranquila',
        texto:
          'Sair do IPCA+ antes do vencimento pode custar caro se os juros subirem. O ARI não oferece saída antecipada, mas também não expõe o capital a essa oscilação.',
      },
      {
        titulo: 'Indexar à inflação não é estar no ativo real',
        texto:
          'O IPCA+ acompanha um índice de preços. O ARI ancora o capital em metro quadrado no litoral catarinense, que historicamente corre à frente desse índice.',
      },
    ],
  },
  {
    slug: 'fundos-imobiliarios',
    nome: 'Fundos Imobiliários (FIIs)',
    chamada:
      'FIIs e ARI atacam o mesmo desejo, renda mensal com lastro imobiliário. Muda a posição que você ocupa e o que acontece com o valor da sua cota.',
    metaDescription:
      'FIIs ou ARI? Compare renda mensal, oscilação de cota, tributação e lastro entre fundos imobiliários e o Ativo de Renda Imobiliária da ARCK1PRO.',
    alternativa: {
      retorno: 'Dividend yield variável, redefinido pela gestão',
      ir: 'Rendimentos isentos para PF. Ganho na venda da cota tributado em 20%',
      lastro: 'Cotas de um fundo. Você é cotista, não dono do imóvel',
      liquidez: 'Bolsa, em D+2, com a cota oscilando todo dia',
      prazo: 'Livre, sem vencimento',
      minimo: 'O preço de uma cota',
      acesso: 'Aberto, via home broker',
    },
    vantagem: {
      retorno: 'ari',
      ir: 'empate',
      lastro: 'ari',
      liquidez: 'empate',
      prazo: 'empate',
      minimo: 'empate',
      acesso: 'empate',
    },
    dissertacao: {
      titulo: 'Renda imobiliária que não depende da cotação da cota',
      paragrafos: [
        'Fundos imobiliários e ARI nascem do mesmo desejo legítimo, o de receber renda recorrente com lastro em imóvel, e é por isso que a comparação aparece com tanta frequência. A diferença começa na posição que o investidor ocupa. Quem compra um FII não se torna dono de imóvel algum: torna-se dono de cotas de um fundo que possui imóveis, e essas cotas são precificadas em bolsa todos os dias, ao sabor do humor do mercado, das taxas de juros e do fluxo de compradores e vendedores.',
        'Essa distinção tem consequência direta sobre a renda. O dividend yield de um FII é variável por natureza e responde a vacância, inadimplência de inquilinos, custos de manutenção, novas emissões que diluem a posição e decisões discricionárias da gestão sobre quanto distribuir em cada mês. É um rendimento revisado periodicamente por terceiros. No ARI a regra de retorno está escrita em contrato antes do aporte, com faixa estimada de 1,5% a 3% ao mês e opção de recebimento mensal ou no vencimento, e não é reescrita mês a mês.',
        'O comportamento do principal também separa as duas estruturas. Um FII pode desvalorizar com todos os aluguéis rigorosamente em dia, porque o preço da cota responde ao mercado e não ao imóvel. O investidor assiste ao patrimônio encolher sem que nada tenha falhado na operação. A garantia do ARI não é cotada: são 200% do valor investido em unidades registradas em cartório e um imóvel físico reservado em seu nome, proteções que não oscilam com o pregão e não dependem de quantos compradores apareceram naquele dia.',
        'Há, por último, a questão da etapa do ciclo. A maior parte dos fundos de tijolo compra imóvel pronto e vive do aluguel, o que significa entrar depois que a maior parte do valor já foi criada e pagar o preço de mercado por ela. O ARI entra antes, na fase de incorporação, exatamente onde a margem do ciclo se concentra, e faz isso em grupos restritos de 8 a 17 investidores, com governança preservada e alinhamento direto com quem executa a obra no litoral catarinense.',
      ],
    },
    porqueGanha: [
      {
        titulo: 'Renda contratada contra renda que a gestão redefine',
        texto:
          'O rendimento de um FII muda com vacância, inadimplência e decisão do gestor. No ARI a regra de retorno está no contrato e não é revisada mês a mês.',
      },
      {
        titulo: 'A cota marca a mercado, a garantia em cartório não',
        texto:
          'Um FII pode desvalorizar com os aluguéis todos em dia, porque o preço da cota responde ao mercado. A garantia do ARI não depende de cotação.',
      },
      {
        titulo: 'Imóvel pronto contra fase de incorporação',
        texto:
          'A maioria dos FIIs de tijolo compra pronto e vive do aluguel. O ARI entra antes, na etapa que concentra a margem do ciclo.',
      },
    ],
  },
  {
    slug: 'acoes',
    nome: 'Ações',
    chamada:
      'Em ações não existe piso, prazo nem garantia: o retorno é o que o mercado decidir. O ARI troca esse intervalo aberto por faixa contratada e lastro registrado em cartório.',
    metaDescription:
      'Ações ou ARI? Compare potencial de valorização, volatilidade, tributação e garantia entre a bolsa e o Ativo de Renda Imobiliária da ARCK1PRO.',
    alternativa: {
      retorno: 'Ilimitado para cima e para baixo, sem piso',
      ir: '15% sobre o ganho, com isenção até R$ 20 mil vendidos por mês',
      lastro: 'Nenhum. A posição vale o que o mercado paga naquele instante',
      liquidez: 'Diária, com liquidação em D+2',
      prazo: 'Livre',
      minimo: 'O preço de uma ação',
      acesso: 'Aberto, via home broker',
    },
    vantagem: {
      retorno: 'empate',
      ir: 'ari',
      lastro: 'ari',
      liquidez: 'empate',
      prazo: 'empate',
      minimo: 'empate',
      acesso: 'empate',
    },
    dissertacao: {
      titulo: 'O que a bolsa nunca coloca no contrato',
      paragrafos: [
        'Ações não prometem nada. O teto é aberto para cima e o chão simplesmente não existe: não há faixa, não há prazo, não há garantia — o resultado é aquilo que o mercado decidir pagar pela posição no dia em que o investidor precisar dela. Esse intervalo aberto é vendido como oportunidade, mas o que ele diz, na prática, é que nenhum número foi contratado. O ARI parte do princípio oposto e formaliza faixa de retorno e prazo em contrato antes que qualquer valor seja aportado.',
        'O detalhe mais desconfortável da bolsa é que a queda não configura descumprimento de nada. Quando uma ação perde metade do valor, ninguém deixou de honrar um compromisso; apenas o preço se moveu, e não há a quem recorrer, porque não existe garantia atrás da posição. O ARI opera dentro de uma Sociedade em Conta de Participação regida pelo Código Civil Brasileiro, com direitos formalizados em contrato e garantia real de 200% em unidades registradas em cartório, além de um imóvel físico reservado em nome do investidor.',
        'A vantagem tributária que costuma ser atribuída às ações também tem fronteira estreita. A isenção vale apenas até R$ 20 mil vendidos por mês no mercado à vista; acima disso, o ganho é tributado em 15%, o que torna o benefício irrelevante justamente para quem opera com capital relevante. No ARI a isenção não tem teto e não depende do tamanho do aporte: o rendimento declarado já é o líquido, seja qual for o valor investido.',
        'Existe ainda um custo que não aparece em corretagem alguma, o do tempo e da competência exigidos. Investir bem em ações demanda tese, acompanhamento de resultados, leitura de setor e disciplina emocional para atravessar quedas sem vender no pior momento. O ARI foi estruturado para o investidor que prefere não operar diretamente: a ARCK1PRO cuida da estruturação, da governança e da gestão do empreendimento, e o retorno chega pela performance de um ativo físico no litoral de Santa Catarina, não pela oscilação de uma tela.',
      ],
    },
    porqueGanha: [
      {
        titulo: 'Faixa contratada contra intervalo aberto',
        texto:
          'Ações não prometem nada. O retorno é o que o mercado decidir, e o teto alto vem junto com um chão sem piso. O ARI formaliza faixa e prazo em contrato.',
      },
      {
        titulo: 'O preço pode cair sem ninguém descumprir nada',
        texto:
          'Uma ação desvalorizar não é falha de contrato, é o preço se movendo, e não existe garantia atrás da posição. No ARI existe ativo real registrado.',
      },
      {
        titulo: 'A isenção da bolsa tem limite, a do ARI não',
        texto:
          'A isenção em ações vale só até R$ 20 mil vendidos por mês. Acima disso, o ganho é tributado. No ARI a isenção não depende do tamanho do aporte.',
      },
    ],
  },
  {
    slug: 'etf',
    nome: 'ETF',
    chamada:
      'O ETF entrega a média do índice, por construção. O ARI entrega posição concentrada, retorno contratado e garantia real que índice nenhum oferece.',
    metaDescription:
      'ETF ou ARI? Compare diversificação, custo, tributação e lastro entre ETFs e o Ativo de Renda Imobiliária da ARCK1PRO.',
    alternativa: {
      retorno: 'Acompanha o índice, para cima e para baixo',
      ir: '15% sobre o ganho, sem a isenção mensal que vale para ações',
      lastro: 'Cesta marcada a mercado, sem garantia de principal',
      liquidez: 'Bolsa, com liquidação em D+2',
      prazo: 'Livre',
      minimo: 'O preço de uma cota',
      acesso: 'Aberto, via home broker',
    },
    vantagem: {
      retorno: 'empate',
      ir: 'ari',
      lastro: 'ari',
      liquidez: 'empate',
      prazo: 'empate',
      minimo: 'empate',
      acesso: 'empate',
    },
    dissertacao: {
      titulo: 'A média do índice não constrói patrimônio de exceção',
      paragrafos: [
        'O ETF resolve um problema real com elegância operacional: com uma ordem só, o investidor compra uma cesta inteira de ativos. O que quase nunca é dito com clareza é a contrapartida matemática dessa conveniência. Diluir risco significa, pela mesma operação, diluir retorno. Um fundo de índice entrega, por construção, a média do que está dentro dele, incluindo os piores componentes da cesta. Ele nunca foi desenhado para gerar resultado extraordinário, e cobrar isso dele é cobrar aquilo que ele não se propôs a fazer.',
        'A tributação reforça a assimetria. ETFs de ações não contam com a isenção mensal disponível no mercado à vista, e o ganho é tributado em 15% desde o primeiro real realizado. O investidor abre mão da concentração, aceita a média do índice e ainda assim entrega parte do resultado ao imposto. No ARI o rendimento é isento pelo enquadramento legal da estrutura, e o valor declarado já é o líquido, sem faixa, sem limite e sem cálculo de alíquota no meio do caminho.',
        'Existe também a questão do que sustenta o preço. A cota de um ETF é uma cesta marcada a mercado, sem garantia de principal: se o índice cai, a cota cai junto, e não há nada atrás dela além da cotação do momento. O ARI mantém, durante todo o prazo do contrato, garantia de 200% do valor investido em unidades imobiliárias registradas em cartório e um imóvel físico da incorporadora reservado em nome do investidor. É lastro que existe fora da tela e continua existindo independentemente do humor do mercado.',
        'No fim, o ETF entrega ao investidor a média de uma cesta que ele não escolheu, tributada e sem garantia. O ARI faz o oposto, e de forma deliberada: posição concentrada em uma operação específica, com retorno contratado, prazo definido e lastro imobiliário no litoral catarinense, acessível a grupos de 8 a 17 investidores por empreendimento. Patrimônio de exceção não nasce de uma média ponderada, e sim de decisões concentradas com garantia real por trás.',
      ],
    },
    porqueGanha: [
      {
        titulo: 'Diluir o risco dilui o retorno junto',
        texto:
          'Um ETF entrega a média do índice por definição, incluindo os piores componentes da cesta. O ARI é o oposto: posição concentrada numa operação específica, com retorno contratado e garantia registrada em cartório.',
      },
      {
        titulo: 'O ETF perde a isenção que a ação tem',
        texto:
          'ETFs de ações não contam com a isenção mensal disponível no mercado à vista. O ganho é tributado desde o primeiro real.',
      },
      {
        titulo: 'Índice não tem garantia real',
        texto:
          'Se o índice cai, a cota cai, e não há nada atrás dela além do preço. O ARI mantém garantia registrada durante todo o contrato.',
      },
    ],
  },
  {
    slug: 'criptomoedas',
    nome: 'Criptomoedas',
    chamada:
      'Cripto oferece assimetria. O ARI oferece o contrário: faixa estreita, prazo definido e ativo físico registrado em cartório.',
    metaDescription:
      'Criptomoedas ou ARI? Compare volatilidade, custódia, tributação e garantia real frente ao Ativo de Renda Imobiliária da ARCK1PRO.',
    alternativa: {
      retorno: 'Extremamente volátil, com quedas históricas acima de 70%',
      ir: '15% a 22,5% sobre o ganho, com obrigações de declaração',
      lastro: 'Nenhum ativo físico. O preço se sustenta em oferta e demanda',
      liquidez: 'Ininterrupta, 24 horas por dia',
      prazo: 'Livre',
      minimo: 'Poucos reais',
      acesso: 'Aberto, via exchange',
    },
    vantagem: {
      retorno: 'empate',
      ir: 'ari',
      lastro: 'ari',
      liquidez: 'empate',
      prazo: 'empate',
      minimo: 'empate',
      acesso: 'empate',
    },
    dissertacao: {
      titulo: 'Quando o preço é a única garantia',
      paragrafos: [
        'Criptomoedas atraem pela assimetria, pela promessa de que um movimento certo compensa todos os errados. O que sustenta esse preço, no entanto, é apenas o encontro entre oferta e demanda: não há imóvel, não há contrato de remuneração, não há ativo físico atrás da posição. O valor existe enquanto houver alguém disposto a pagar por ele, e essa é uma base de sustentação inteiramente diferente da que apoia um ativo registrado em cartório com garantia real formalizada.',
        'A volatilidade do setor costuma ser tratada como característica, e de fato é, mas convém enxergar o que isso significa na prática. Quedas históricas acima de 70% não violaram regra alguma, não configuraram inadimplência e não deram ao investidor qualquer direito a reparação, porque o funcionamento normal do ativo inclui esse tipo de movimento. O ARI trabalha na direção contrária: faixa de retorno estimada entre 1,5% e 3% ao mês, prazo definido e contrato de Sociedade em Conta de Participação regido pelo Código Civil Brasileiro.',
        'A custódia é outro ponto em que a comparação não se equilibra. Em cripto, a posse do ativo é a posse de uma chave privada, e perdê-la significa perder o patrimônio, sem cartório, sem inventário e sem instância a recorrer. Manter os ativos em uma exchange transfere o problema para o balanço de terceiros, e a história recente do setor já mostrou o que acontece quando esse balanço falha. No ARI o lastro está registrado em nome próprio, com um imóvel físico reservado ao investidor durante todo o contrato.',
        'Some-se a isso o tratamento tributário. O ganho em criptoativos é tributado entre 15% e 22,5% e ainda carrega obrigações acessórias de declaração que exigem controle e atenção permanentes do investidor. O rendimento do ARI é isento e chega líquido, sem cálculo de alíquota e sem apuração mensal. Para o capital que já não precisa apostar em assimetria, a combinação de lastro físico, isenção e regra contratada oferece um caminho de construção patrimonial que a volatilidade nunca conseguiu prometer.',
      ],
    },
    porqueGanha: [
      {
        titulo: 'Volatilidade não é risco calculado',
        texto:
          'Uma queda de dois terços não viola regra nenhuma em cripto, é o funcionamento normal do ativo. O ARI trabalha com faixa e prazo definidos em contrato regido pelo Código Civil.',
      },
      {
        titulo: 'Chave privada contra registro em cartório',
        texto:
          'Em cripto a posse é uma chave, e perdê-la significa perder o ativo, sem instância a recorrer. O lastro do ARI está registrado em nome próprio.',
      },
      {
        titulo: 'Ganho tributado contra rendimento isento',
        texto:
          'O ganho em cripto é tributado e vem com obrigações acessórias de declaração. O rendimento do ARI chega líquido.',
      },
    ],
  },
  {
    slug: 'imovel-para-aluguel',
    nome: 'Imóvel para aluguel',
    chamada:
      'A comparação mais próxima que existe. Os dois são imobiliários e os dois pagam renda. A diferença está na etapa do ciclo em que o seu dinheiro entra.',
    metaDescription:
      'Imóvel para alugar ou ARI? Compare yield, tributação do aluguel, custos de aquisição, vacância e gestão frente ao Ativo de Renda Imobiliária da ARCK1PRO.',
    alternativa: {
      retorno: 'Yield de aluguel, bem abaixo da margem da incorporação',
      ir: 'Tabela progressiva sobre o aluguel, até 27,5%, via carnê-leão',
      lastro: 'O próprio imóvel, escriturado no seu nome',
      liquidez: 'Baixa. Vender leva meses, com corretagem e negociação',
      prazo: 'Indefinido',
      minimo: 'O valor do imóvel, mais ITBI, escritura e registro',
      acesso: 'Aberto a quem tiver o capital ou o financiamento',
    },
    vantagem: {
      retorno: 'ari',
      ir: 'ari',
      lastro: 'empate',
      liquidez: 'empate',
      prazo: 'empate',
      minimo: 'ari',
      acesso: 'empate',
    },
    dissertacao: {
      titulo: 'Entrar no ciclo antes que a margem já esteja no preço',
      paragrafos: [
        'Esta é a comparação mais próxima que o ARI enfrenta, porque os dois lados são imobiliários e os dois pagam renda. A diferença decisiva não está no tipo de ativo, e sim no momento do ciclo em que o capital entra. Quem compra um apartamento pronto para alugar chega depois que terreno, aprovação, projeto, obra e lançamento já converteram risco em valor, e paga por esse valor no preço de aquisição. O ARI entra na fase de incorporação, exatamente onde essa margem é criada, e remunera o investidor pela participação nela.',
        'O resultado dessa diferença aparece no retorno. O yield de aluguel praticado no mercado brasileiro fica bem abaixo da margem da incorporação, e ainda é tributado pela tabela progressiva do Imposto de Renda, chegando a 27,5% via carnê-leão, com recolhimento mensal a cargo do proprietário. O ARI trabalha com retorno estimado de 1,5% a 3% ao mês e é isento, com o valor declarado já líquido. São dois caminhos imobiliários com desfechos financeiros que não se encontram.',
        'Há também o que o aluguel exige antes e depois de render o primeiro real. Antes, existem ITBI, escritura e registro, custos que consomem uma fatia relevante do capital sem produzir retorno algum. Depois, existem vacância entre contratos, inadimplência, reforma, IPTU, condomínio nos meses vazios, manutenção, corretagem e a gestão cotidiana do inquilino, tudo isso saindo do seu resultado e do seu tempo. No ARI a operação é executada pela ARCK1PRO, com método próprio construído em mais de vinte anos de atuação no litoral catarinense.',
        'Por fim, há a questão do capital de entrada. Comprar para alugar exige o valor cheio do imóvel, mais os custos de aquisição, o que concentra todo o patrimônio em uma única unidade e em um único inquilino. O ARI tem aporte mínimo de R$ 50 mil e entrega ao investidor garantia de 200% em unidades registradas em cartório, além de um imóvel físico reservado em seu nome. É o lastro imobiliário na condição de proteção, sem os custos, os prazos e as obrigações de ser proprietário.',
      ],
    },
    porqueGanha: [
      {
        titulo: 'Comprar pronto é chegar depois da margem',
        texto:
          'Quem compra para alugar entra no ciclo quando a maior parte do valor já foi criada. O ARI entra na incorporação, a etapa em que essa margem aparece.',
      },
      {
        titulo: 'Sem vacância, sem inadimplência, sem gestão',
        texto:
          'Aluguel só rende com inquilino pagando. Vacância, reforma entre contratos, IPTU, condomínio e manutenção saem do seu retorno e do seu tempo. No ARI a operação é executada pela ARCK1PRO.',
      },
      {
        titulo: 'Entra com menos capital e sem custo de aquisição',
        texto:
          'Além do preço do imóvel, a compra carrega ITBI, escritura e registro antes de render o primeiro real. No ARI o aporte mínimo é de R$ 50 mil.',
      },
    ],
  },
]

export function getComparativo(slug: string): Comparativo | undefined {
  return COMPARATIVOS.find((c) => c.slug === slug)
}
