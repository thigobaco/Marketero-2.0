import { Lesson, Project } from './types';

export const LESSONS: Lesson[] = [
  {
    id: '1',
    title: '1. Fundamentos e Evolução',
    description: 'O conceito de marketing e sua jornada do 1.0 ao 5.0.',
    summary: 'Marketing evoluiu de um foco em produção e produto para uma abordagem centrada no ser humano e, finalmente, na integração tecnológica para o bem da humanidade (Marketing 5.0).',
    content: `
# Fundamentos do Marketing

Marketing não é apenas propaganda. Segundo **Peter Drucker**, é o negócio como um todo visto do ponto de vista do cliente.

### Evolução das Orientações:
1. **Produção**: Eficiência e disponibilidade (Revolução Industrial).
2. **Produto**: Qualidade e inovação (Risco: Miopia de Marketing).
3. **Vendas**: Promoções agressivas para escoar estoque.
4. **Marketing (3.0)**: Centrado no ser humano e em valores.
5. **Marketing Digital (4.0)**: Passagem para o onicanal.
6. **Marketing 5.0**: Tecnologia para a humanidade.

**Mantra**: Produto certo, no lugar certo, para a pessoa certa!
    `,
    quiz: [
      { id: 'q1-1', question: 'O que é marketing segundo Peter Drucker?', options: ['Apenas propaganda', 'O negócio visto do ponto de vista do cliente', 'Venda agressiva', 'Criação de logotipos'], correctAnswer: 1 },
      { id: 'q1-2', question: 'Qual era o foco da Orientação para a Produção?', options: ['Relacionamento', 'Inovação', 'Eficiência e disponibilidade', 'Redes sociais'], correctAnswer: 2 },
      { id: 'q1-3', question: 'O que caracteriza o Marketing 3.0?', options: ['Foco no produto', 'Centrado no ser humano e valores', 'Uso de IA', 'Vendas por telefone'], correctAnswer: 1 },
      { id: 'q1-4', question: 'O que é o Marketing 5.0?', options: ['Marketing de massa', 'Tecnologia para a humanidade', 'Apenas e-commerce', 'Venda direta'], correctAnswer: 1 },
      { id: 'q1-5', question: 'Qual o risco da Orientação para o Produto?', options: ['Miopia de Marketing', 'Excesso de vendas', 'Falta de estoque', 'Preço baixo'], correctAnswer: 0 },
      { id: 'q1-6', question: 'Marketing é apenas propaganda?', options: ['Sim', 'Não, é um processo gerencial completo', 'Sim, no Marketing 1.0', 'Apenas no digital'], correctAnswer: 1 },
      { id: 'q1-7', question: 'O que significa o "ing" em Market-ing?', options: ['Mercado', 'Ação/Gerúndio', 'Venda', 'Preço'], correctAnswer: 1 },
      { id: 'q1-8', question: 'Qual geração lidera a transformação digital?', options: ['Baby Boomers', 'Geração X', 'Gerações Y e Z', 'Geração Jones'], correctAnswer: 2 },
      { id: 'q1-9', question: 'O que o Marketing 4.0 introduziu?', options: ['Os 4 Ps', 'A passagem para o digital e onicanal', 'A Revolução Industrial', 'A rádio'], correctAnswer: 1 },
      { id: 'q1-10', question: 'Qual o mantra do marketing?', options: ['Vender a qualquer custo', 'Produto certo, lugar certo, pessoa certa', 'Propaganda é a alma do negócio', 'O cliente nunca tem razão'], correctAnswer: 1 }
    ],
    difficulty: 'Iniciante',
    xp: 150,
    unlocked: true,
    completed: false,
    videoUrl: '',
  },
  {
    id: '2',
    title: '2. Comportamento do Consumidor',
    description: 'Entenda as necessidades e a Pirâmide de Maslow.',
    summary: 'O comportamento do consumidor é moldado por necessidades básicas e desejos influenciados pela cultura, sociedade e fatores psicológicos. A Pirâmide de Maslow ajuda a priorizar essas necessidades.',
    content: `
# Por que as pessoas compram?

O ponto de partida são as **necessidades** e **desejos** humanos.

### Pirâmide de Maslow:
- **Fisiológicas**: Fome, sede, sono.
- **Segurança**: Proteção, estabilidade.
- **Sociais**: Relacionamento, amor, pertencimento.
- **Estima**: Status, reconhecimento.
- **Autorrealização**: Crescimento pessoal.

### Fatores de Influência:
- **Culturais**: Nacionalidade, religião.
- **Sociais**: Família, amigos.
- **Pessoais**: Idade, ocupação.
- **Psicológicos**: Motivação e percepção.

**Insight**: No marketing, as percepções são mais importantes do que a realidade!
    `,
    quiz: [
      { id: 'q2-1', question: 'Qual a base da Pirâmide de Maslow?', options: ['Estima', 'Sociais', 'Fisiológicas', 'Segurança'], correctAnswer: 2 },
      { id: 'q2-2', question: 'O que são necessidades sociais?', options: ['Comida e água', 'Relacionamento e afeto', 'Status', 'Segurança financeira'], correctAnswer: 1 },
      { id: 'q2-3', question: 'Desejos são influenciados por quê?', options: ['Apenas biologia', 'Cultura e personalidade', 'Apenas preço', 'Nada'], correctAnswer: 1 },
      { id: 'q2-4', question: 'O que é percepção no marketing?', options: ['A realidade absoluta', 'Seleção e interpretação de informações', 'O preço do produto', 'A cor da embalagem'], correctAnswer: 1 },
      { id: 'q2-5', question: 'Qual fator inclui "Grupos de Referência"?', options: ['Pessoais', 'Culturais', 'Sociais', 'Psicológicos'], correctAnswer: 2 },
      { id: 'q2-6', question: 'O que é Atenção Seletiva?', options: ['Prestar atenção em tudo', 'Descartar a maioria das informações', 'Lembrar apenas de preços', 'Comprar por impulso'], correctAnswer: 1 },
      { id: 'q2-7', question: 'A busca por autorrealização está em qual nível de Maslow?', options: ['Base', 'Meio', 'Topo', 'Não existe'], correctAnswer: 2 },
      { id: 'q2-8', question: 'O que é Dissonância Pós-Compra?', options: ['Alegria extrema', 'Desconforto ou conflito após a compra', 'Falta de dinheiro', 'Desejo de comprar mais'], correctAnswer: 1 },
      { id: 'q2-9', question: 'Qual fator psicológico leva uma pessoa a agir?', options: ['Aprendizagem', 'Crença', 'Motivação', 'Atitude'], correctAnswer: 2 },
      { id: 'q2-10', question: 'No marketing, o que é mais importante que a realidade?', options: ['O lucro', 'As percepções', 'O estoque', 'A fábrica'], correctAnswer: 1 }
    ],
    difficulty: 'Iniciante',
    xp: 200,
    unlocked: false,
    completed: false,
    videoUrl: '',
  },
  {
    id: '3',
    title: '3. Ambientes de Marketing',
    description: 'Analise o Micro e Macroambiente e a matriz SWOT.',
    summary: 'As empresas operam em ambientes complexos. O macroambiente engloba forças externas incontroláveis, enquanto o microambiente envolve atores próximos. A análise SWOT sintetiza esses fatores.',
    content: `
# Onde a empresa está inserida?

Nenhuma empresa está isolada. Ela sofre influências constantes.

### 1. Macroambiente (Incontrolável)
Fatores amplos: Econômicos, Tecnológicos, Político-Legais, Culturais e Demográficos.

### 2. Microambiente (Influenciável)
Fatores próximos: Fornecedores, Clientes, Concorrentes e Públicos.

### Análise SWOT (FOFA):
- **Forças** (Interno/Positivo)
- **Fraquezas** (Interno/Negativo)
- **Oportunidades** (Externo/Positivo)
- **Ameaças** (Externo/Negativo)
    `,
    quiz: [
      { id: 'q3-1', question: 'O que compõe o Macroambiente?', options: ['Clientes e fornecedores', 'Fatores econômicos e tecnológicos', 'Funcionários', 'Apenas o dono'], correctAnswer: 1 },
      { id: 'q3-2', question: 'Fornecedores fazem parte de qual ambiente?', options: ['Macroambiente', 'Microambiente', 'Ambiente Interno', 'Nenhum'], correctAnswer: 1 },
      { id: 'q3-3', question: 'Na SWOT, o que são Oportunidades?', options: ['Fatores internos positivos', 'Fatores externos positivos', 'Fatores internos negativos', 'Fatores externos negativos'], correctAnswer: 1 },
      { id: 'q3-4', question: 'Inflação é um fator de qual tipo?', options: ['Demográfico', 'Político', 'Econômico', 'Social'], correctAnswer: 2 },
      { id: 'q3-5', question: 'O que é o Microambiente?', options: ['Forças globais', 'Agentes que influenciam a capacidade de conduzir negócios', 'Apenas a concorrência', 'O clima'], correctAnswer: 1 },
      { id: 'q3-6', question: 'Qual destes é um fator Demográfico?', options: ['Leis', 'Idade e população', 'PIB', 'Crenças'], correctAnswer: 1 },
      { id: 'q3-7', question: 'Intermediários de marketing são do Microambiente?', options: ['Sim', 'Não', 'Apenas no digital', 'Apenas no físico'], correctAnswer: 0 },
      { id: 'q3-8', question: 'O que significa o "S" da SWOT?', options: ['Segurança', 'Strengths (Forças)', 'Sociedade', 'Segmentação'], correctAnswer: 1 },
      { id: 'q3-9', question: 'Ameaças são fatores internos?', options: ['Sim', 'Não, são externos', 'Depende da empresa', 'Apenas se houver crise'], correctAnswer: 1 },
      { id: 'q3-10', question: 'Monitorar o macroambiente serve para quê?', options: ['Aumentar o preço', 'Identificar tendências e reduzir riscos', 'Demitir funcionários', 'Mudar o logotipo'], correctAnswer: 1 }
    ],
    difficulty: 'Intermediário',
    xp: 250,
    unlocked: false,
    completed: false,
    videoUrl: '',
  },
  {
    id: '4',
    title: '4. Estratégia e Oceano Azul',
    description: 'Como se diferenciar e tornar a concorrência irrelevante.',
    summary: 'A estratégia do Oceano Azul propõe a criação de novos espaços de mercado onde a competição é irrelevante, em contraste com o Oceano Vermelho da disputa sangrenta por mercados existentes.',
    content: `
# Estratégia do Oceano Azul

### Oceano Vermelho:
- Competição sangrenta em mercados existentes.
- Briga por preço e participação.

### Oceano Azul:
- Criação de espaços de mercado inexplorados.
- A competição torna-se irrelevante.
- Foco em aumentar a demanda.

**Princípio**: Não consumimos produtos, mas sim a imagem que fazemos deles (**Posicionamento**).
    `,
    quiz: [
      { id: 'q4-1', question: 'O que caracteriza o Oceano Vermelho?', options: ['Inovação radical', 'Competição sangrenta em mercados existentes', 'Ausência de concorrentes', 'Preços altos'], correctAnswer: 1 },
      { id: 'q4-2', question: 'Qual o objetivo do Oceano Azul?', options: ['Destruir o concorrente', 'Tornar a concorrência irrelevante', 'Baixar custos apenas', 'Vender mais do mesmo'], correctAnswer: 1 },
      { id: 'q4-3', question: 'O que é Posicionamento?', options: ['Onde o produto fica na prateleira', 'A percepção do público alvo sobre o produto', 'O preço final', 'A logística'], correctAnswer: 1 },
      { id: 'q4-4', question: 'Qual o mantra do Oceano Azul?', options: ['Vencer a guerra', 'Criar e capturar nova demanda', 'Seguir o líder', 'Manter o status quo'], correctAnswer: 1 },
      { id: 'q4-5', question: 'O que significa "reconstruir fronteiras"?', options: ['Mudar de país', 'Olhar além dos limites tradicionais do setor', 'Aumentar o muro da fábrica', 'Diminuir o mercado'], correctAnswer: 1 },
      { id: 'q4-6', question: 'No Oceano Azul, o foco é no valor ou no custo?', options: ['Apenas valor', 'Apenas custo', 'Inovação de valor (ambos)', 'Nenhum'], correctAnswer: 2 },
      { id: 'q4-7', question: 'O que o caso das Havaianas exemplifica?', options: ['Miopia de marketing', 'Reposicionamento de mercado', 'Falência', 'Monopólio'], correctAnswer: 1 },
      { id: 'q4-8', question: 'Qual o risco de focar apenas nos números?', options: ['Ganhar muito dinheiro', 'Perder o panorama geral e a estratégia', 'Aumentar a equipe', 'Melhorar o produto'], correctAnswer: 1 },
      { id: 'q4-9', question: 'Oceano Azul busca mercados explorados?', options: ['Sim', 'Não, busca inexplorados', 'Apenas no digital', 'Sim, com preço baixo'], correctAnswer: 1 },
      { id: 'q4-10', question: 'Quem criou a estratégia do Oceano Azul?', options: ['Philip Kotler', 'W. Chan Kim & Renée Mauborgne', 'Peter Drucker', 'Elon Musk'], correctAnswer: 1 }
    ],
    difficulty: 'Intermediário',
    xp: 300,
    unlocked: false,
    completed: false,
    videoUrl: '',
  },
  {
    id: '5',
    title: '5. O Mix de Marketing (4 Ps)',
    description: 'As ferramentas táticas: Produto, Preço, Praça e Promoção.',
    summary: 'O Mix de Marketing ou 4 Ps é o conjunto de ferramentas táticas que a empresa utiliza para implementar sua estratégia e gerar valor para o cliente.',
    content: `
# O Composto Mercadológico

### 1. Produto
Design, embalagem, marca e qualidade.

### 2. Preço
Estratégias de Skimming (preço alto inicial) ou Penetração (preço baixo inicial).

### 3. Praça
Canais de distribuição e logística. "Produto certo no lugar certo".

### 4. Promoção
Comunicação de valor: Propaganda, RP, Venda Pessoal e Marketing Digital.
    `,
    quiz: [
      { id: 'q5-1', question: 'Quais são os 4 Ps?', options: ['Pessoas, Planos, Preço, Praça', 'Produto, Preço, Praça, Promoção', 'Propaganda, Público, Preço, Produto', 'Poder, Preço, Praça, Promoção'], correctAnswer: 1 },
      { id: 'q5-2', question: 'O que é a estratégia de Skimming (Desnatação)?', options: ['Preço baixo para atrair todos', 'Preço alto inicial para produtos inovadores', 'Preço igual ao concorrente', 'Preço de custo'], correctAnswer: 1 },
      { id: 'q5-3', question: 'O que envolve o "P" de Praça?', options: ['A decoração da loja', 'Canais de distribuição e logística', 'O tamanho do produto', 'A propaganda na TV'], correctAnswer: 1 },
      { id: 'q5-4', question: 'Promoção de Vendas foca em quê?', options: ['Relacionamento longo', 'Incentivos de curto prazo para compra imediata', 'Construção de marca', 'Apenas redes sociais'], correctAnswer: 1 },
      { id: 'q5-5', question: 'Venda Direta sem intermediários é quando...', options: ['Usa atacadistas', 'O fabricante entrega direto ao consumidor', 'Usa varejistas', 'Não vende'], correctAnswer: 1 },
      { id: 'q5-6', question: 'Qual o objetivo da Promoção?', options: ['Aumentar o custo', 'Comunicar valor e engajar o público', 'Mudar o produto', 'Diminuir a praça'], correctAnswer: 1 },
      { id: 'q5-7', question: 'O que determina o "piso" do preço?', options: ['A percepção do cliente', 'Os custos de produção', 'A concorrência', 'O governo'], correctAnswer: 1 },
      { id: 'q5-8', question: 'O que determina o "teto" do preço?', options: ['Os custos', 'A percepção de valor pelo cliente', 'O estoque', 'O fornecedor'], correctAnswer: 1 },
      { id: 'q5-9', question: 'Relações Públicas (RP) serve para quê?', options: ['Vender rápido', 'Gerar credibilidade e construir relacionamento', 'Fazer anúncios pagos', 'Mudar o preço'], correctAnswer: 1 },
      { id: 'q5-10', question: 'O que é Preço de Penetração?', options: ['Preço alto', 'Preço baixo para atrair clientes rapidamente', 'Preço de luxo', 'Preço variável'], correctAnswer: 1 }
    ],
    difficulty: 'Iniciante',
    xp: 250,
    unlocked: false,
    completed: false,
    videoUrl: '',
  },
  {
    id: '6',
    title: '6. Marketing 5.0 e Futuro',
    description: 'IA, IoT e a tecnologia a serviço da humanidade.',
    summary: 'O Marketing 5.0 integra as capacidades humanas (empatia, criatividade) com as tecnologias avançadas (IA, Big Data) para criar experiências personalizadas e resolver problemas sociais.',
    content: `
# Marketing 5.0

A aplicação de tecnologias que mimetizam o comportamento humano para criar valor.

### Next Tech:
- **IA**: Automação e predição.
- **IoT/Sensores**: Conexão físico-digital (Beacons).
- **RA/RV**: Experiências imersivas.
- **Blockchain**: Transparência de dados.

**Foco**: Experiência do Cliente (CX) sem atritos e personalizada.
    `,
    quiz: [
      { id: 'q6-1', question: 'O que é o Marketing 5.0?', options: ['Marketing apenas digital', 'Tecnologia para a humanidade', 'Venda por robôs apenas', 'Marketing de massa'], correctAnswer: 1 },
      { id: 'q6-2', question: 'O que a IA faz no marketing?', options: ['Substitui o humano totalmente', 'Automatiza tarefas e gera insights de dados', 'Apenas faz desenhos', 'Nada'], correctAnswer: 1 },
      { id: 'q6-3', question: 'O que são Beacons?', options: ['Luzes de emergência', 'Sensores de proximidade para resposta contextual', 'Tipos de smartphones', 'Redes sociais novas'], correctAnswer: 1 },
      { id: 'q6-4', question: 'Qual a vantagem do Big Data?', options: ['Ocupar espaço no HD', 'Tomar decisões mais informadas', 'Aumentar o spam', 'Diminuir a segurança'], correctAnswer: 1 },
      { id: 'q6-5', question: 'O que é Realidade Aumentada (RA)?', options: ['Um mundo totalmente digital', 'Informação digital sobreposta ao mundo real', 'Um óculos escuro', 'Uma foto antiga'], correctAnswer: 1 },
      { id: 'q6-6', question: 'O que o Blockchain pode trazer ao marketing?', options: ['Mais spam', 'Transparência e segurança na cadeia de dados', 'Preços mais altos', 'Menos clientes'], correctAnswer: 1 },
      { id: 'q6-7', question: 'O que é CX?', options: ['Customer Experience (Experiência do Cliente)', 'Complexidade X', 'Custo Extra', 'Comunicação Externa'], correctAnswer: 0 },
      { id: 'q6-8', question: 'Qual o papel do humano no Marketing 5.0?', options: ['Nenhum', 'Fornecer empatia, sabedoria e criatividade', 'Apenas ligar as máquinas', 'Limpar os robôs'], correctAnswer: 1 },
      { id: 'q6-9', question: 'O que é Marketing Preditivo?', options: ['Vender o que já passou', 'Antecipar demandas com base em dados', 'Adivinhação sem dados', 'Marketing de sorte'], correctAnswer: 1 },
      { id: 'q6-10', question: 'O que é o "Fosso Digital"?', options: ['Um buraco na internet', 'A desigualdade no acesso e uso da tecnologia', 'Um cabo de fibra óptica', 'Uma senha difícil'], correctAnswer: 1 }
    ],
    difficulty: 'Avançado',
    xp: 400,
    unlocked: false,
    completed: false,
    videoUrl: '',
  },
  {
    id: '7',
    title: '7. Trade Marketing e PDV',
    description: 'A estratégia no Ponto de Venda e a relação com o varejo.',
    summary: 'Trade Marketing foca na visibilidade e disponibilidade do produto no varejo, utilizando materiais de PDV e ações de sampling para impulsionar as vendas.',
    content: `
# Trade Marketing

É a prática de relacionamento com o varejo para impulsionar as vendas.

### Ferramentas de PDV:
- **Displays**: Cartazes, totens e faixas de gôndola.
- **Sampling**: Distribuição de amostras para experimentação.
- **Promoções Conjuntas**: Sorteios e eventos no local.

### Benefícios:
1. Potencializar a visibilidade.
2. Aumentar a disponibilidade.
3. Obter insights do desempenho do varejista.

**Mantra**: Produto certo, no lugar certo!
    `,
    quiz: [
      { id: 'q7-1', question: 'O que é Trade Marketing?', options: ['Venda por telefone', 'Relacionamento com o varejo para impulsionar vendas', 'Marketing apenas online', 'Criação de novos produtos'], correctAnswer: 1 },
      { id: 'q7-2', question: 'O que é Sampling?', options: ['Pesquisa de preço', 'Distribuição de amostras para teste', 'Aumento de estoque', 'Troca de embalagem'], correctAnswer: 1 },
      { id: 'q7-3', question: 'O que significa PDV?', options: ['Preço de Venda', 'Ponto de Venda', 'Plano de Valor', 'Promoção Direta'], correctAnswer: 1 },
      { id: 'q7-4', question: 'Qual material é usado na gôndola?', options: ['Outdoor', 'Faixas de gôndola e adesivos', 'E-mail marketing', 'Comercial de TV'], correctAnswer: 1 },
      { id: 'q7-5', question: 'Trade Marketing conecta quem?', options: ['Indústria e Varejo', 'Governo e Povo', 'Apenas funcionários', 'Dono e Gerente'], correctAnswer: 0 },
      { id: 'q7-6', question: 'Qual o objetivo de um display de chão?', options: ['Esconder o produto', 'Dar destaque e visibilidade ao produto', 'Diminuir o custo', 'Aumentar o estoque'], correctAnswer: 1 },
      { id: 'q7-7', question: 'O que são promoções conjuntas?', options: ['Aumento de preço', 'Sorteios e eventos no varejo', 'Demissão de vendedores', 'Fechamento de lojas'], correctAnswer: 1 },
      { id: 'q7-8', question: 'Trade Marketing ajuda na disponibilidade?', options: ['Sim, garante o produto na prateleira', 'Não, foca apenas em preço', 'Apenas no atacado', 'Não'], correctAnswer: 0 },
      { id: 'q7-9', question: 'O que o varejista ganha com o Trade?', options: ['Menos lucro', 'Melhor desempenho de vendas e suporte da marca', 'Mais trabalho braçal', 'Nada'], correctAnswer: 1 },
      { id: 'q7-10', question: 'Qual o mantra do Trade Marketing?', options: ['Vender caro', 'Produto certo, no lugar certo', 'O cliente sempre tem razão', 'Propaganda é tudo'], correctAnswer: 1 }
    ],
    difficulty: 'Intermediário',
    xp: 250,
    unlocked: false,
    completed: false,
    videoUrl: '',
  },
  {
    id: '8',
    title: '8. Marketing Direto e Permissão',
    description: 'A filosofia de Seth Godin e o funil de vendas.',
    summary: 'O Marketing de Permissão foca em enviar mensagens antecipadas, pessoais e relevantes para quem realmente quer recebê-las, evitando o spam e construindo confiança.',
    content: `
# Marketing de Permissão

Conceito criado por **Seth Godin**. É o privilégio de enviar mensagens para pessoas que querem recebê-las.

### O Funil de Vendas:
1. **Atração**: Captar a atenção.
2. **Permissão**: O cliente aceita ouvir você.
3. **Educação**: Nutrir o lead com valor.
4. **Conversão**: Transformar em cliente.

### CRM (Customer Relationship Management):
Sistemas que ajudam a gerenciar todas as interações com os clientes ao longo do ciclo de vendas.

**Dica**: Trate os clientes como "alunos", não apenas como números.
    `,
    quiz: [
      { id: 'q8-1', question: 'Quem criou o Marketing de Permissão?', options: ['Philip Kotler', 'Seth Godin', 'Peter Drucker', 'Steve Jobs'], correctAnswer: 1 },
      { id: 'q8-2', question: 'O que é Marketing de Permissão?', options: ['Mandar spam para todos', 'Enviar mensagens relevantes para quem aceitou receber', 'Ligar para as pessoas à noite', 'Anunciar no rádio'], correctAnswer: 1 },
      { id: 'q8-3', question: 'O que significa CRM?', options: ['Custo Real de Marketing', 'Customer Relationship Management', 'Criação de Redes Modernas', 'Compra de Recursos Mistos'], correctAnswer: 1 },
      { id: 'q8-4', question: 'Qual a primeira etapa do funil?', options: ['Venda', 'Atração', 'Fidelização', 'Desconto'], correctAnswer: 1 },
      { id: 'q8-5', question: 'Marketing Direto deve parecer o quê?', options: ['Spam', 'Pessoal e relevante', 'Um anúncio genérico', 'Uma ordem'], correctAnswer: 1 },
      { id: 'q8-6', question: 'O que é um "Lead"?', options: ['Um cliente que já comprou', 'Um cliente potencial interessado', 'Um produto novo', 'Um tipo de anúncio'], correctAnswer: 1 },
      { id: 'q8-7', question: 'Por que a permissão é um ativo?', options: ['Porque é cara', 'Porque gera confiança e atenção real', 'Porque é proibida', 'Não é um ativo'], correctAnswer: 1 },
      { id: 'q8-8', question: 'O que o CRM ajuda a identificar?', options: ['Apenas o preço', 'Produtos mais vendidos e sazonalidades', 'O nome do dono da fábrica', 'Nada'], correctAnswer: 1 },
      { id: 'q8-9', question: 'Marketing de interrupção é o mesmo que permissão?', options: ['Sim', 'Não, é o oposto (anúncios que interrompem)', 'Apenas no rádio', 'Sim, no digital'], correctAnswer: 1 },
      { id: 'q8-10', question: 'Qual a vantagem da automação no marketing direto?', options: ['Mandar mais spam', 'Personalização em escala e eficiência', 'Diminuir a qualidade', 'Aumentar o preço'], correctAnswer: 1 }
    ],
    difficulty: 'Intermediário',
    xp: 300,
    unlocked: false,
    completed: false,
    videoUrl: '',
  },
  {
    id: '9',
    title: '9. Marketing Preditivo e Dados',
    description: 'Antecipando demandas com Big Data e IA.',
    summary: 'Marketing Preditivo usa dados históricos e algoritmos para prever comportamentos futuros, como quem tem mais probabilidade de comprar ou cancelar um serviço.',
    content: `
# O Poder dos Dados

O marketing direcionado por dados permite tomar decisões baseadas em fatos, não apenas intuição.

### Casos de Sucesso:
- **Moneyball**: Uso de estatísticas para montar equipes vencedoras com baixo orçamento.
- **Target**: Algoritmo que previu a gravidez de uma cliente antes mesmo da família saber.

### Métricas Chave:
- **CLV (Customer Lifetime Value)**: Valor que o cliente gera ao longo de toda a relação com a empresa.
- **NBA (Next Best Action)**: A próxima melhor ação personalizada para cada cliente.

**Conceito**: Big Data + IA = Previsões precisas e proativas.
    `,
    quiz: [
      { id: 'q9-1', question: 'O que é Marketing Preditivo?', options: ['Vender o que sobrou', 'Usar dados para antecipar demandas futuras', 'Adivinhação por sorte', 'Marketing de massa'], correctAnswer: 1 },
      { id: 'q9-2', question: 'O que o caso Moneyball ensina?', options: ['Que o esporte é sorte', 'O valor da análise de dados para prever desempenho', 'Que dinheiro compra tudo', 'Nada'], correctAnswer: 1 },
      { id: 'q9-3', question: 'O que é CLV?', options: ['Custo de Logo e Visual', 'Customer Lifetime Value (Valor Vitalício)', 'Compra de Leads Variados', 'Ciclo de Venda Longo'], correctAnswer: 1 },
      { id: 'q9-4', question: 'A Target usou dados para prever o quê?', options: ['O tempo', 'A gravidez de uma cliente', 'A queda da bolsa', 'O preço do dólar'], correctAnswer: 1 },
      { id: 'q9-5', question: 'O que é Big Data?', options: ['Um computador grande', 'Grandes volumes de dados variados e velozes', 'Uma rede social nova', 'Um tipo de vírus'], correctAnswer: 1 },
      { id: 'q9-6', question: 'Modelos regressivos servem para quê?', options: ['Voltar no tempo', 'Encontrar relações entre variáveis e prever resultados', 'Diminuir a empresa', 'Mudar a cor do logo'], correctAnswer: 1 },
      { id: 'q9-7', question: 'O que é NBA no marketing?', options: ['Liga de basquete', 'Next Best Action (Próxima Melhor Ação)', 'Novo Bloco de Anúncios', 'Nível Baixo de Atenção'], correctAnswer: 1 },
      { id: 'q9-8', question: 'Dados transformam o quê?', options: ['Água em vinho', 'Opiniões em fatos', 'Preço em valor', 'Fábrica em loja'], correctAnswer: 1 },
      { id: 'q9-9', question: 'IA não supervisionada serve para quê?', options: ['Nada', 'Descobrir padrões e clusters desconhecidos', 'Limpar o escritório', 'Substituir o gerente'], correctAnswer: 1 },
      { id: 'q9-10', question: 'Qual o maior subproduto da digitalização?', options: ['O spam', 'O Big Data', 'O desemprego', 'O papel'], correctAnswer: 1 }
    ],
    difficulty: 'Avançado',
    xp: 400,
    unlocked: false,
    completed: false,
    videoUrl: '',
  },
  {
    id: '10',
    title: '10. Mercado Mínimo Viável',
    description: 'Foco, empatia e a arte de ser extraordinário.',
    summary: 'Para ter sucesso, foque no menor público possível que sustente seu negócio. Seja extraordinário para eles e a mensagem se espalhará organicamente.',
    content: `
# A Filosofia de Seth Godin

Marketing não é uma batalha, é o ato generoso de ajudar alguém a resolver um problema.

### Mercado Mínimo Viável:
Não tente vender para todos. Escolha um grupo específico e seja a resposta perfeita para eles.

### Empatia e Histórias:
- As pessoas não compram o que você faz, mas **como você as faz sentir**.
- **Status e Afiliação**: Entenda se seu cliente quer dominar ou pertencer.

### A Vaca Roxa:
Seja extraordinário. O "bom o suficiente" é invisível. O extraordinário é comentado.

**Pergunta Chave**: "Para quem é isso?" e "Para que serve isso?".
    `,
    quiz: [
      { id: 'q10-1', question: 'O que é o Mercado Mínimo Viável?', options: ['Vender para o mundo todo', 'O menor público que faz o projeto valer a pena', 'Vender o mais barato possível', 'Não ter clientes'], correctAnswer: 1 },
      { id: 'q10-2', question: 'O que é a "Vaca Roxa"?', options: ['Um animal de estimação', 'Algo extraordinário que vale a pena comentar', 'Um tipo de queijo', 'Um erro de design'], correctAnswer: 1 },
      { id: 'q10-3', question: 'Marketing é sobre o quê?', options: ['Gritar mais alto', 'Ajudar os outros a resolverem problemas', 'Enganar o cliente', 'Apenas lucro'], correctAnswer: 1 },
      { id: 'q10-4', question: 'As pessoas compram o quê?', options: ['Apenas o produto físico', 'Sentimentos, status e conexão', 'O que é mais barato sempre', 'O que o governo manda'], correctAnswer: 1 },
      { id: 'q10-5', question: 'O que significa "Sonder"?', options: ['Um tipo de som', 'Perceber que todos têm uma vida complexa como a sua', 'Vender rápido', 'Um software de dados'], correctAnswer: 1 },
      { id: 'q10-6', question: 'Status é sempre sobre dinheiro?', options: ['Sim', 'Não, é sobre posição na hierarquia e percepção', 'Apenas no luxo', 'Sim, nos EUA'], correctAnswer: 1 },
      { id: 'q10-7', question: 'Qual a diferença entre Domínio e Afiliação?', options: ['Nenhuma', 'Domínio é poder/vencer; Afiliação é pertencer/conectar', 'Afiliação é ilegal', 'Domínio é apenas para reis'], correctAnswer: 1 },
      { id: 'q10-8', question: 'O que é o "Efeito de Rede"?', options: ['Um vírus', 'Quando o produto fica melhor quanto mais pessoas usam', 'Falta de internet', 'Uma rede de pesca'], correctAnswer: 1 },
      { id: 'q10-9', question: 'Por que dizer "Não é para você" é importante?', options: ['Para ser rude', 'Para respeitar o público certo e focar energia', 'Para perder dinheiro', 'Não é importante'], correctAnswer: 1 },
      { id: 'q10-10', question: 'O que é trabalho emocional no marketing?', options: ['Chorar no trabalho', 'Fazer o que é preciso para servir o cliente com empatia', 'Apenas vender', 'Nada'], correctAnswer: 1 }
    ],
    difficulty: 'Avançado',
    xp: 500,
    unlocked: false,
    completed: false,
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'p1',
    name: 'Projeto 1: Diagnóstico Sempre Verde',
    description: 'Realize uma análise de ambiente e SWOT para uma marca de cosméticos naturais.',
    category: 'Análise Estratégica',
    progress: 0,
    status: 'A Fazer',
    learningObjectives: [
      'Mapear micro e macroambiente',
      'Identificar forças e fraquezas',
      'Propor ações baseadas em SWOT'
    ],
    steps: [
      {
        id: 's1',
        title: 'Mapeamento Ambiental',
        instruction: 'Classifique os fatores: Nova lei ambiental, entrada de concorrente e postagem de influencer.',
        hint: 'Leis são Macro; Concorrentes e Influencers são Micro.',
        completed: false
      },
      {
        id: 's2',
        title: 'Matriz FOFA',
        instruction: 'Monte a matriz SWOT da Sempre Verde.',
        hint: 'Considere os produtos sustentáveis como uma Força.',
        completed: false
      }
    ]
  },
  {
    id: 'p2',
    name: 'Projeto 2: Lançamento Amora & Limão',
    description: 'Desenvolva o mix de marketing completo para um novo produto inovador.',
    category: 'Mix de Marketing',
    progress: 0,
    status: 'A Fazer',
    learningObjectives: [
      'Definir os 4 Ps do produto',
      'Escolher estratégia de preço',
      'Planejar a distribuição'
    ],
    steps: [
      {
        id: 's1',
        title: 'Produto e Embalagem',
        instruction: 'Descreva o produto e os benefícios da combinação amora + capim-limão.',
        hint: 'Foque no frescor e na exclusividade.',
        completed: false
      },
      {
        id: 's2',
        title: 'Preço e Praça',
        instruction: 'Defina o preço e onde será vendido.',
        hint: 'Um produto "gourmet" pede canais selecionados.',
        completed: false
      }
    ]
  },
  {
    id: 'p3',
    name: 'Projeto 3: Missão Trade Marketing',
    description: 'Planeje a chegada do produto ao varejo com foco no ponto de venda.',
    category: 'Execução Comercial',
    progress: 0,
    status: 'A Fazer',
    learningObjectives: [
      'Criar materiais de PDV',
      'Planejar ações de degustação',
      'Engajar o varejista'
    ],
    steps: [
      {
        id: 's1',
        title: 'Estratégia de Gôndola',
        instruction: 'Como o produto será exposto para atrair o olhar do cliente?',
        hint: 'Displays criativos e faixas de gôndola ajudam muito.',
        completed: false
      },
      {
        id: 's2',
        title: 'Ação de Sampling',
        instruction: 'Planeje uma ação de experimentação no supermercado.',
        hint: 'Degustações aumentam a conversão imediata.',
        completed: false
      }
    ]
  },
  {
    id: 'p4',
    name: 'Projeto 4: Oceano Azul Pet',
    description: 'Crie um novo espaço de mercado para um serviço de cuidados com animais.',
    category: 'Estratégia de Diferenciação',
    progress: 0,
    status: 'A Fazer',
    learningObjectives: [
      'Identificar atributos de valor irrelevantes',
      'Criar novos atributos de valor',
      'Tornar a concorrência irrelevante'
    ],
    steps: [
      {
        id: 's1',
        title: 'Curva de Valor',
        instruction: 'Quais atributos você vai eliminar, reduzir, elevar e criar?',
        hint: 'Pense em algo que nenhum pet shop faz hoje.',
        completed: false
      },
      {
        id: 's2',
        title: 'Proposta de Valor Única',
        instruction: 'Defina o nome e o diferencial do seu novo serviço.',
        hint: 'O foco deve ser na conveniência ou experiência emocional.',
        completed: false
      }
    ]
  },
  {
    id: 'p5',
    name: 'Projeto 5: Régua de Relacionamento',
    description: 'Desenvolva uma estratégia de marketing de permissão para uma academia.',
    category: 'Marketing Direto',
    progress: 0,
    status: 'A Fazer',
    learningObjectives: [
      'Criar iscas digitais para atração',
      'Definir etapas de nutrição de leads',
      'Converter leads em alunos ativos'
    ],
    steps: [
      {
        id: 's1',
        title: 'Atração e Captura',
        instruction: 'Qual conteúdo gratuito você oferecerá em troca do e-mail do cliente?',
        hint: 'E-books de treino ou guias de nutrição são ótimas iscas.',
        completed: false
      },
      {
        id: 's2',
        title: 'Sequência de E-mails',
        instruction: 'Escreva o tema dos 3 primeiros e-mails da sua régua.',
        hint: 'O primeiro deve ser boas-vindas, o segundo valor e o terceiro oferta.',
        completed: false
      }
    ]
  },
  {
    id: 'p6',
    name: 'Projeto 6: Inteligência de Dados',
    description: 'Analise o comportamento de clientes de uma cafeteria usando métricas preditivas.',
    category: 'Marketing de Dados',
    progress: 0,
    status: 'A Fazer',
    learningObjectives: [
      'Calcular o CLV (Customer Lifetime Value)',
      'Identificar padrões de churn',
      'Propor ações de fidelização baseadas em dados'
    ],
    steps: [
      {
        id: 's1',
        title: 'Análise de CLV',
        instruction: 'Como você calcularia o valor de um cliente fiel para a cafeteria?',
        hint: 'Considere a frequência semanal e o ticket médio gasto.',
        completed: false
      },
      {
        id: 's2',
        title: 'Ação Preditiva',
        instruction: 'Qual oferta você enviaria para um cliente que não aparece há 15 dias?',
        hint: 'Use a estratégia de Next Best Action (NBA).',
        completed: false
      }
    ]
  }
];
