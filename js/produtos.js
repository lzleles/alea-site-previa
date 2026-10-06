/* CATALOGO:
   nome: produtos
   categoria: UTIL
   objetivo: Define categorias, itens do feed e fichas de produto e valida referências e materiais do catálogo.
   entrada: Dados comerciais editados diretamente no arquivo
   saida: Objetos globais de categorias, vitrine e produtos, além de alertas no console
   status: ativo (cabecalho proposto pelo Codex em 2026-09-20, confianca ALTA; conferir na proxima vez que o script rodar)
   validado_em: TBD
   05/10/2026 (lote msg6689, áudios 6726/6728/6729/6731): +6 produtos HOME "Em breve" na VITRINE (sem foto) e em PRODUTOS
     (sem texto). A versão anterior está em 03_site/_versoes_anteriores/home_lote_em_breve_antes_2026-10-05/js/.
   04/10/2026 (Poop Bag, msgs 6315-6363): o Poop Bag volta à VITRINE depois da Cláudia (R$ 79, poopbag_capaq) e o bloco
     dele em PRODUTOS ganha o cadastro novo (o de 24/09 fica comentado logo abaixo dele). A versão anterior está em
     03_site/_versoes_anteriores/poop_bag_antes_2026-10-04/js/.
*/
/* =============================================================================
   produtos.js — O CATÁLOGO. É o único arquivo que muda no dia a dia.
   =============================================================================

   COMO MEXER (vale para quem não programa)
   ----------------------------------------
   Cada item é um bloco entre chaves { }, separado por vírgula.
   Copie um bloco inteiro, cole embaixo e troque os valores.

   REGRAS QUE NÃO PODEM SER QUEBRADAS
   - Todo texto fica entre aspas simples:   'Comedouro ālea'
   - Número fica SEM aspas e SEM ponto:     179   (não 'R$ 179,00')
   - Preço que ainda não existe? escreva    null  (o site mostra "sob consulta")
   - A vírgula separa um bloco do outro; o ÚLTIMO bloco não leva vírgula no fim.

   ⚠️ O PREÇO DAQUI É O PREÇO DO ANÚNCIO. O Google reprova (e o CDC pune) anúncio que
   mostra um valor e página que mostra outro. Mudou o preço aqui, muda no anúncio.

   ⚠️ MEXEU AQUI? RODE `python 01_gerar_paginas_v1.py`. As páginas de produto são
   GERADAS a partir deste arquivo — editar o HTML delas à mão é trabalho perdido na
   próxima geração. E é o gerador que PERGUNTA o material (PLA ou PETG) de toda peça
   nova, do jeito que o Cassiano pediu em 15/09/2026: peça sem material não vai pro ar.
   ========================================================================== */


/* ---------------------------------------------------------------------------
   0) AS CATEGORIAS — o menu da abertura (Cassiano, 15/09/2026).
   ---------------------------------------------------------------------------
   A ORDEM DAQUI É A ORDEM DO MENU, e é a ordem alfabética que ele mandou.
   `id` é o que aparece no endereço (index.html#pet) e o que liga produto e categoria;
   não mexer nele depois que um link estiver circulando por aí.

   ⚠️ SÓ A "PET" TEM PEÇA HOJE. As outras seis nasceram do menu que ele mandou, e o
   que falta nelas é PRODUTO, não código: basta pôr `categoria: 'glow'` num bloco lá
   embaixo e a categoria acende sozinha. Enquanto vazia, ela aparece no menu marcada
   "em breve" e não abre feed nenhum — clique que não leva a nada é o defeito que o
   Google trata como experiência ruim, e é o que mais irrita visitante.

   ⚠️ A DESCRIÇÃO ESTÁ VAZIA DE PROPÓSITO. Ele mandou os NOMES, não o que cada um
   quer dizer, e o palpite de quem não vende a peça vira texto errado no ar. O que eu
   imaginaria está no comentário de cada linha — ele confirma ou corrige, aí entra.

   ⚠️ A DESCRIÇÃO APARECE NO TOPO DO FEED (16/09/2026, áudio das 13:11): "a partir da hora
   que ele clica em PET, aí ele já no topo já coloca ali (…) a nossa linha PET é voltada
   pra cachorro (…) um textinho pequeno explicativo, só pra ele ver: ah, não é isso que
   eu quero não, aí ele volta na página e clica no outro". A PET é a primeira com o
   significado dito por ele. UMA LINHA SÓ: no celular pequeno (360×640) o espaço entre o
   cabeçalho e a peça é de 47 px, medido. Frase maior que isso cai em cima da foto. */
window.CATEGORIAS = [
  { id: 'custom', nome: 'CUSTOM', descricao: '' },   // sugestão minha: peça sob projeto, do zero
  { id: 'fan',    nome: 'FAN',    descricao: '' },   // sugestão minha: cultura pop, coleção
  { id: 'glow',   nome: 'GLOW',   descricao: '' },   // sugestão minha: filamento que brilha no escuro
  /* 04/10/2026 (msgs 6339/6343/6345 + áudio 6340 do Cassiano): SUBCATEGORIAS do HOME, nesta ordem. Tocou em HOME,
     aparece TUDO; as subcategorias ficam embaixo do título, no formato do menu, e só filtram se a pessoa tocar.
     Peça liga na subcategoria pelo campo `sub` da VITRINE. Sem peça = "em breve" (igual categoria vazia). */
  { id: 'home',   nome: 'HOME',   descricao: '',     // sugestão minha: casa e decoração
    subcategorias: [ { id: 'desk', nome: 'DESK' }, { id: 'decor', nome: 'DECOR' }, { id: 'daily', nome: 'DAILY' },
                     { id: 'meet', nome: 'MEET' }, { id: 'aura', nome: 'AURA' } ] },
  /* ⚠️ TEXTO PROVISÓRIO (etapa 3, 22/09/2026): o Cassiano pediu um placeholder sobre golden
     retriever "só pra ver o espaçamento do título e da descrição antes das fotos" — ele escreve
     o texto de verdade depois. TROCAR quando ele mandar o definitivo. */
  /* 25/09/2026 10:26 (msg 1473, texto DELE, palavra por palavra) — antes era o texto do golden retriever. */
  { id: 'pet',    nome: 'PET',    descricao: 'Nossa linha PET foi criada para trazer mais alegria e personalidade à sua casa, criando um cantinho especial para quem, mesmo sem dizer uma palavra, transborda amor, alegria e companheirismo.' },
  { id: 'play',   nome: 'PLAY',   descricao: '' },   // sugestão minha: brinquedo e jogo
  { id: 'sense',  nome: 'SENSE',  descricao: '' }    // sugestão minha: sensorial, fidget
];


/* ---------------------------------------------------------------------------
   1) O FEED — uma peça por tela, na ordem em que aparecem.
   "Você nunca consegue ver duas imagens ao mesmo tempo" (Cassiano, 14/09/2026).
   ---------------------------------------------------------------------------
   `fotos` é a fila do arrasto horizontal. A PRIMEIRA é a foto-mãe: é dela que sai o
   OBJETO RECORTADO (sem fundo) que ocupa o centro do feed — o `_obj.webp` gerado pelo
   `_recortar_fundo_v1.py`. Da segunda em diante são as FOTOS INTEIRAS, com cenário,
   que só aparecem quando o visitante arrasta pro lado. É o pedido literal de 15/09:
   "tirar as fotos sempre sem fundo, somente o objeto […] deixando as fotos completas
   somente se arrastar pro lado".

   ⚠️ ETAPA 108 (25/09/2026, áudio 1637 do Cassiano): "toda foto que você tiver recortado, esquece, deixa só as fotos
  profissionais" — TODOS os itens passaram a `recorte: false` (os `_obj.webp` continuam no repositório, só não
  entram mais no feed) e a foto profissional, onde existe, é a primeira — no feed, a versão QUADRADA (pro_luke_1q, do\n  recorte do próprio Cassiano, msg 1645; pro_matteo_1q, janela da orelha ao comedouro): o feed desenha num quadrado e a\n  foto em pé saía ESTICADA (áudios 1643-1646: 'nunca cortar nem o cachorro nem o comedouro, ampliar o mínimo').
  `recorte: true` quer dizer que existe o arquivo `<primeira foto>_obj.webp`, o objeto
   sem fundo, gerado pelo `_recortar_fundo_v1.py`. `recorte: false` quer dizer que aquela
   peca ainda NAO tem foto com o objeto inteiro dentro do quadro -- ela aparece no feed
   com moldura, como antes, e e' honesto: melhor uma foto normal do que meia tigela
   flutuando. Assim que chegar uma foto da peca sozinha, vira `true`.

   `categoria` tem que ser um `id` da lista lá em cima. Errou o nome? A peça não
   aparece em feed nenhum — e a conferência do fim deste arquivo reclama no console
   em vez de deixar você descobrir pelo cliente. */
/* ⚠️ 25/09/2026 (lote das 20:01, msg 1884 do Cassiano): "Tira tudo o que está lá, e coloca somente os que te mandei!"
   A vitrine passa a ter SÓ os 4 produtos do lote, NA ORDEM em que ele mandou (áudio 1850: "o Luke é o 1º, o principal").
   Título = nome da pasta/zip dele, com o "ALEA" escrito como o ālea do site (áudio 1852). Preço: "sob consulta"
   (msg 1885) -> `preco: null`, que o site já mostra como "Sob consulta" no feed, na página e na sacola.
   A foto do feed é SÓ a capa quadrada (<prefixo>_capaq, feita pelo 06_fotos_profissionais_v2): o feed desenha num
   quadrado (WebGL) e foto que não é quadrada sai esticada; as outras fotos do lote não são quadradas, e fazê-las
   quadradas seria cortar cachorro ou comedouro (_REGRA_CAPA_DO_FEED.md). Todas as fotos estão na página do produto.
   ⚠ Matteo e Ayla: a Capa.JPG deles NÃO cabe na regra da capa ("essa foto não serve pra capa"): o capaq deles é a foto
   INTEIRA com faixas lisas dos lados, provisório até ele mandar outra capa. Ver 03_site/_LEIA_4_PRODUTOS_2026-09-25.md.
   O que estava aqui antes (Bowl Wave de Luke, Ayla, Tina Preta, Chica, Matteo, Cláudia; Poop Bag; Kit) SAIU da vitrine
   — as páginas e as fotos continuam no disco. A lista antiga, pra voltar num piscar, está no comentário logo abaixo. */
/* ⚠️ NOMES COLLAB (26/09/2026, decididos pelo Cassiano): "Pet Bowl" no lugar de "Dog Bowl", o pet vira "× Nome" no fim
   e a Cláudia leva acento. Antes: ālea Luke Bowl / ālea Matteo Texturized / ālea Ayla Pompom / ālea Cláudia Wave.
   O feed.js (v32) parte o nome no " × " e desenha o "× Nome" pequeno numa 2ª linha; sacola, resumo e WhatsApp usam o
   nome inteiro numa linha (vem do data-nome da página). Slug, página e fotos NÃO mudaram (links continuam valendo).
   Quem aplica a troca: 03_site/_nomes_collab_v1_2026-09-26.py (idempotente). */
window.VITRINE = [
  { produto: 'ālea Pet Bowl × Luke',                      nome: 'Luke',    categoria: 'pet', preco: null, pagina: 'luke-bowl',         recorte: false, fotos: ['lukebowl_capaq'] },
  { produto: 'ālea Elevated Pet Bowl × Matteo',           nome: 'Matteo',  categoria: 'pet', preco: null, pagina: 'matteo-texturized', recorte: false, fotos: ['matteotex_9262q'] },
  /* 04/10/2026, msg 6255 do Cassiano: Ayla R$ 299 (sem tamanho). Luke/Matteo/Cláudia têm preço por tamanho M/G em
     config.js ALEA.precoPorEscolha (v45): aqui ficam null e o feed mostra "a partir de" o M. */
  { produto: 'ālea Pet Bowl + Poop Bag Holder – Watermelon Edition × Ayla Pompom', nome: 'Ayla Pompom',    categoria: 'pet', preco: 299,  pagina: 'ayla-pompom',       recorte: false, fotos: ['aylapompom_capaq'] },
  { produto: 'ālea Pet Bowl Wave × Cláudia',              nome: 'Cláudia', categoria: 'pet', preco: null, pagina: 'claudia-wave',      recorte: false, fotos: ['claudiawave_anjoq'] },
  /* 04/10/2026 (msgs 6315-6363 do Cassiano): o Poop Bag VOLTA, logo depois do último comedouro (Cláudia), R$ 79. Estava
     fora desde a msg 6258. Capa = recorte quadrado da foto do Luke (poopbag_capaq, 33_produtos_novos_2026-10-04/poop_bag_extra). */
  { produto: 'ālea Poop Bag Holder',                      nome: 'três cores', categoria: 'pet', preco: 79, pagina: 'poop-bag-holder', recorte: false, fotos: ['poopbag_capaq'] },
  /* 03/10/2026: 1º produto da HOME (Cassiano, msgs 5722-5788). `nome` aqui só entra no alt das fotos do feed (não há nome de pet). */
  { produto: 'ālea Soap Dish',                            nome: 'três cores', categoria: 'home', sub: 'aura', preco: 59, pagina: 'soap-dish',       recorte: false, fotos: ['soapdish_capaq'] },
  /* 04/10/2026: 2º produto da HOME (Cassiano, msgs 6008-6030). Capa = a foto da lâmpada (msg 6027). */
  { produto: 'ālea Ephix Vase',                           nome: 'branco', categoria: 'home', sub: 'decor', preco: 89, pagina: 'ephix-vase',      recorte: false, fotos: ['ephixvase_capaq'] },
  /* 04/10/2026: 3º produto da HOME (Cassiano, msgs 6048-6096). Capa = os 4 vasos na sala (IMG_2670, áudio 6100). */
  { produto: 'ālea Vase Prismatic',                       nome: 'quatro cores', categoria: 'home', sub: 'decor', preco: 89, pagina: 'vase-prismatic', recorte: false, fotos: ['vaseprismatic_capaq'] },
  /* 04/10/2026: 4º produto da HOME (Cassiano, msgs 6122-6153). Capa = IMG_2690 (6146). SEM preço até ele fatiar (6092). */
  { produto: 'ālea Stria Planter',                        nome: 'Orbis e Quadrum', categoria: 'home', sub: 'decor', preco: null, pagina: 'stria-planter', recorte: false, fotos: ['striaplanter_capaq'] },
  /* 05/10/2026: os 6 do LOTE msg6689 (áudios 6726/6728/6729/6731 do Cassiano), todos "Em breve" (config.js ALEA.emBreve):
     SEM FOTO por enquanto (fotos: [] -> feed.js v41 mostra o bloco "foto em breve") e sem preço. Subcategorias confirmadas
     por ele (6731): Desk = Laptop Stand, Pen Holder, Nodus Organizer; Aura = Make, Makeup Layer Organizer; Decor = Lamel. */
  { produto: 'ālea Laptop Stand',                         nome: 'Laptop Stand', categoria: 'home', sub: 'desk',  preco: null, pagina: 'laptop-stand', recorte: false, fotos: [] },
  { produto: 'ālea Pen Holder',                           nome: 'Pen Holder', categoria: 'home', sub: 'desk',    preco: null, pagina: 'pen-holder', recorte: false, fotos: [] },
  { produto: 'ālea Nodus Organizer',                      nome: 'Nodus Organizer', categoria: 'home', sub: 'desk', preco: null, pagina: 'nodus-organizer', recorte: false, fotos: [] },
  { produto: 'ālea Make',                                 nome: 'Make', categoria: 'home', sub: 'aura',          preco: null, pagina: 'make', recorte: false, fotos: [] },
  { produto: 'ālea Makeup Layer Organizer',               nome: 'Makeup Layer Organizer', categoria: 'home', sub: 'aura', preco: null, pagina: 'makeup-layer-organizer', recorte: false, fotos: [] },
  { produto: 'ālea Lamel',                                nome: 'Lamel', categoria: 'home', sub: 'decor',        preco: null, pagina: 'lamel', recorte: false, fotos: [] }
];
/* 06/10/2026 (áudios 6772/6773 do Cassiano): "os itens do home, você pode colocar tudo em ordem alfabética (...) os
   comedouros não, a parte do pet pode deixar do jeito que está". Só os itens HOME trocam de lugar entre si (pelo nome do
   produto); o resto da VITRINE fica onde está. Produto novo da Home entra em qualquer lugar acima: a ordem sai daqui. */
(function homeEmOrdemAlfabetica() {
  var lugares = [], itens = [];
  window.VITRINE.forEach(function (v, i) { if (v.categoria === 'home') { lugares.push(i); itens.push(v); } });
  itens.sort(function (a, b) { return a.produto.localeCompare(b.produto, 'pt', { sensitivity: 'base' }); });
  lugares.forEach(function (i, k) { window.VITRINE[i] = itens[k]; });
})();
/* A VITRINE ATÉ 25/09/2026 20:01 (fora do ar por ordem dele, msg 1884) — guardada, não apagada:
window.VITRINE = [
  { produto: 'ālea Bowl Wave', nome: 'Luke',       categoria: 'pet', preco: 179,  pagina: 'bowl-wave',       recorte: false,  fotos: ['pro_luke_1q','luke_1','luke_2','luke_3','luke_4'] },
  { produto: 'ālea Bowl Wave', nome: 'Ayla',       categoria: 'pet', preco: 179,  pagina: 'bowl-wave',       recorte: false, fotos: ['ayla_1','ayla_2','ayla_3','ayla_4'] },
  { produto: 'ālea Bowl Wave', nome: 'Tina Preta', categoria: 'pet', preco: 179,  pagina: 'bowl-wave',       recorte: false,  fotos: ['tina_1','tina_2','tina_3','tina_4'] },
  { produto: 'ālea Bowl Wave', nome: 'Chica',      categoria: 'pet', preco: 179,  pagina: 'bowl-wave',       recorte: false,  fotos: ['chica_1','chica_2','chica_3'] },
  { produto: 'ālea Bowl Wave', nome: 'Matteo',     categoria: 'pet', preco: 179,  pagina: 'bowl-wave',       recorte: false,  fotos: ['matteo_1','matteo_2','matteo_3'] },
  { produto: 'ālea Bowl Wave', nome: 'Cláudia',    categoria: 'pet', preco: 179,  pagina: 'bowl-wave',       recorte: false,  fotos: ['claudia_1','claudia_2','claudia_3','claudia_4'] },
  { produto: 'ālea Poop Bag',  nome: 'Chica',      categoria: 'pet', preco: 59,   pagina: 'poop-bag-holder', recorte: false,  fotos: ['saquinho_1','saquinho_2','saquinho_3'] },
  { produto: 'Kit ālea',       nome: 'Tina Preta', categoria: 'pet', preco: null, pagina: 'kit',             recorte: false,  fotos: ['kit_1','kit_2','kit_3'] }
];
*/


/* ---------------------------------------------------------------------------
   2) AS PÁGINAS DE PRODUTO — aqui mora TODO o texto que saiu do feed.
   "Quando ela clicar lá, que apareça as instruções" (Cassiano, áudio 3, 00:14).
   É esta página que vira a página de destino do Google Ads: é ela que tem conteúdo
   original suficiente pra política de destino, que o feed sozinho não teria.
   ---------------------------------------------------------------------------
   A FICHA (material, personalização, produção, cores) sai do `ficha_padrao` do
   config.js. Só escreva `personalizacao`, `producao` ou `cores` num produto quando
   AQUELA peça fugir do padrão — repetir o padrão em cada bloco é o caminho mais curto
   pra um dia eles divergirem entre si.

   `material` é o único obrigatório peça a peça: PLA e PETG não são a mesma coisa pro
   cliente (PETG aguenta calor e sol; PLA não), e o Cassiano pediu justamente para ser
   perguntado a cada peça nova. */
window.PRODUTOS = [

  /* ===================================================================================================
     OS 4 PRODUTOS DO LOTE DE 25/09/2026 20:01 (msgs 1847-1865 do Cassiano). Páginas geradas pelo
     01_gerar_paginas_v18_quatro_produtos_2026-09-25.py; fotos pelo 06_fotos_profissionais_v2_lote_4_produtos_2026-09-25.py.
     - DESCRIÇÃO VAZIA DE PROPÓSITO (resumo e paragrafos): ele vai mandar a de cada um (áudio 1856: "uma por uma").
       A página só mostra o "*Ps.: Acompanha tigela em inox." (regra dele de 22/09 pra TODO comedouro, gerador v10).
     - PREÇO null = "Sob consulta" (msg 1885).
     - MATERIAL 'PLA': lido do arquivo 3D DELE de cada peça (Metadata/project_settings.config do .3mf: filament_type =
       PLA em todos os filamentos), não suposto. O do Luke é o mesmo arquivo do antigo Bowl Wave.
     - `cores_peca`: as opções de "Cores da peça" daquela página (regra geral dele, áudio 1865: o MONOCROMÁTICO NUNCA
       sai da personalização). `personalizavel: false` = sem botão/formulário de personalização (Ayla, áudio 1864).
     - ÁLBUM só existe se houver foto daquela configuração (áudio 1865). Ordem: Tricolor · Bicolor · Monocromático.
     ⚠ ORDEM DOS CAMPOS: slug, nome, ... capa ANTES de configuracoes (o leitor por regex da v17 pega o 1º `nome:`/`capa:`).
     =================================================================================================== */

  {
    slug: 'luke-bowl',
    nome: 'ālea Pet Bowl × Luke',
    linha: 'Comedouro',
    categoria: 'pet',
    preco: null,
    material: 'PLA',
    /* ⚠ CAPA TROCÁVEL: ele autorizou MELHORAR a capa (áudio 1849: o comedouro é branco e o nome some), com aprovação
       dele antes. A versão nova entra pelo 06_fotos_profissionais_v2 (_capas_novas/luke-bowl.jpg) SEM mexer aqui. */
    capa: 'lukebowl_capa',
    /* medidas: as do antigo Bowl Wave, que SÃO do arquivo 3D do Luke (caixa do objeto, tamanho G) e o peso que ele
       mandou em 24/09 01:39 (198 g com a tigela; a ficha mostra +10%, regra dele). Mesma peça, mesmo número. */
    medidas: { peso_g: 198, altura_cm: 8.4, largura_cm: 21.3, comprimento_cm: 21.2 },
    cores_peca: ['tricolor', 'bicolor', 'monocromatico'],   // as mesmas do Bowl Wave de hoje (a janela 3D é a do Luke)
    /* SEM álbum bicolor: não há foto de bicolor do Luke (áudio 1848). */
    configuracoes: [
      { id: 'tricolor',      nome: 'Tricolor',      capa: 'lukebowl_capa', fotos: ['lukebowl_capa', 'lukebowl_0005', 'lukebowl_9148', 'lukebowl_9170', 'lukebowl_9185', 'lukebowl_9189', 'lukebowl_wa182751', 'lukebowl_wa182753', 'lukebowl_wa183050'] },
      { id: 'monocromatico', nome: 'Monocromático', capa: 'lukebowl_0241', fotos: ['lukebowl_0241', 'lukebowl_9291', 'lukebowl_9295', 'lukebowl_9304', 'lukebowl_9307', 'lukebowl_9312', 'lukebowl_9313', 'lukebowl_9318'] }
    ],
    resumo: '',
    paragrafos: [   // 27/09/2026: texto DELE aprovado no Telegram (msgs 2371-2427)
      "A ideia deste comedouro veio da vontade de criar algo com muita personalidade, um presente pro meu cachorro. Pra quem não sabe, eu tenho dois Goldens, e o meu primeiro se chama Luke, que é o lindão/gordão aí da capa! Haha’",
      "Eu queria uma peça bonita, leve, colorida e, CLARO, em low poly.",
      "Só que foram muitos desafios. Eu não sabia modelar, muito menos fazer low poly. Pedi ajuda à minha cunhada, que é arquiteta, e depois de muito trabalho e testes, a gente chegou nessa peça, que eu achei incrível.",
      "Então fique à vontade para usar e abusar da sua criatividade pra também deixar ela do jeitinho que seu pet merece!"
    ],
    galeria: ['lukebowl_0005', 'lukebowl_9148', 'lukebowl_9170', 'lukebowl_wa182751', 'lukebowl_wa182753', 'lukebowl_wa183050']
  },

  {
    slug: 'matteo-texturized',
    nome: 'ālea Elevated Pet Bowl × Matteo',
    linha: 'Comedouro',
    categoria: 'pet',
    preco: null,
    material: 'PLA',          // .3mf dele: Bambu PLA Lite + Bambu PLA Matte
    capa: 'matteotex_capa',
    cores_peca: ['bicolor', 'monocromatico'],               // áudio 1863: "NÃO existe tricolor"
    /* SEM álbuns (áudio 1863): não há foto monocromática dele, e ele não mandou mais fotos. */
    resumo: '',
    paragrafos: [   // 27/09/2026: texto DELE aprovado no Telegram (msgs 2371-2427)
      "Depois de criar o meu primeiro comedouro, bateu aquele sentimento de justiça de pai: tudo que se dá pra um filho, tem que dar pro outro! Haha’",
      "Se o Luke tinha ganhado o dele, o Matteo também tinha que ganhar. Só que não podia ser igual, tinha que ser diferente.",
      "Foi aí que surgiu a ideia de um comedouro elevado: o pote fica mais perto da altura do peito dele, e ele come sem precisar abaixar tanto o pescoço.",
      "E, pra não ficar igual mesmo, ele ganhou textura: na impressão, o bico faz pequenos movimentos aleatórios nas paredes, e a peça sai com um toque áspero, diferente do liso."
    ],
    galeria: ['matteotex_0094', 'matteotex_9202', 'matteotex_9220', 'matteotex_9240', 'matteotex_9255', 'matteotex_9262']
  },

  {
    slug: 'ayla-pompom',
    nome: 'ālea Pet Bowl + Poop Bag Holder – Watermelon Edition × Ayla Pompom',
    linha: 'Comedouro',
    categoria: 'pet',
    preco: null,
    material: 'PLA',          // .3mf dele: Bambu PLA Silk + PLA Matte + PLA Lite
    capa: 'aylapompom_capa',
    /* áudio 1864: melancia com as sementes, "único e exclusivo, SEM personalização" -> sem botão de personalização,
       sem álbuns; só as fotos e o comprar. A ficha mostra Personalização e Cores como "a informar" (escondidas no ar)
       até ele dizer o texto: o padrão ("Totalmente personalizável") seria falso nesta peça. */
    personalizavel: false,
    resumo: '',
    paragrafos: [   // 27/09/2026: texto DELE aprovado no Telegram (msgs 2371-2427)
      "O comedouro da Ayla veio de mais um sentimento de justiça. Eu já tinha criado um pra cada um dos meus filhos, e ainda faltava a minha irmã caçula, a filha preferida da minha mãe! Haha’",
      "A Ayla não é uma cachorra, é uma artista! Tem milhares de seguidores no Instagram (@aylapompom) e, acima de tudo, é muito fotogênica. Pra ela, tinha que ser algo jamais visto, surpreendente e muito chamativo.",
      "E como ela é muito comilona, na hora de criar lembrei da Magali, da Turma da Mônica, que também é associada à melancia, a fruta preferida dela. Pra mim, melancia tem uma combinação de cores linda, que sempre funciona em objeto, textura e desenho. Tinha tudo a ver com ela.",
      "Por isso, esse comedouro é uma edição especial, feita exclusivamente para ela."
    ],
    galeria: ['aylapompom_0145', 'aylapompom_9120', 'aylapompom_9737', 'aylapompom_9859', 'aylapompom_9931', 'aylapompom_9935']
  },

  {
    slug: 'claudia-wave',
    /* ⚠ TÍTULO A CONFIRMAR COM ELE: o zip diz "ALEA Cláudia Wave"; a transcrição do áudio 1856 ouviu "Cloud Wave". */
    nome: 'ālea Pet Bowl Wave × Cláudia',
    linha: 'Comedouro',
    categoria: 'pet',
    preco: null,
    material: 'PLA',          // .3mf dele: Bambu PLA Marble + PLA Silk + PLA Lite
    /* ⚠ CAPA TROCÁVEL: vai virar a versão com a homenagem (coroa com asas, áudio 1856), feita à parte. Entra pelo
       06_fotos_profissionais_v2 (_capas_novas/claudia-wave.jpg) SEM mexer aqui. */
    capa: 'claudiawave_anjo',   // 27/09/2026 msgs 2361-2363: a homenagem (anjinho)
    cores_peca: ['tricolor', 'bicolor', 'monocromatico'],   // áudio 1865: sem ÁLBUM mono, mas a personalização mono FICA
    configuracoes: [
      /* tricolor: 2 fotos, sem Capa.JPG -> a 1ª é a capa do álbum */
      { id: 'tricolor', nome: 'Tricolor', capa: 'claudiawave_0020', fotos: ['claudiawave_0020', 'claudiawave_0104'] },
      { id: 'bicolor',  nome: 'Bicolor',  capa: 'claudiawave_capa', fotos: ['claudiawave_capa', 'claudiawave_0166', 'claudiawave_0196', 'claudiawave_9528', 'claudiawave_9566', 'claudiawave_9569', 'claudiawave_9570', 'claudiawave_9572', 'claudiawave_9587', 'claudiawave_9590', 'claudiawave_9647', 'claudiawave_9648', 'claudiawave_9654', 'claudiawave_9674', 'claudiawave_9676', 'claudiawave_9695', 'claudiawave_9698'] }
    ],
    resumo: '',
    paragrafos: [   // 27/09/2026: texto DELE aprovado no Telegram (msgs 2371-2427)
      "O ālea Pet Bowl Wave foi criado pensando em dar mais cor a um comedouro elevado. O do Matteo a gente quis texturizado e com poucas cores. Já o Wave tem essas ondas na base e foi pensado desde o início pra três cores.",
      "Mas você pode personalizar do seu jeito, com três cores, com duas ou com uma só. Nele dá pra brincar com a imaginação!",
      "Foi nele também que experimentei, pela primeira vez, o filamento em tom de mármore. Ele não é áspero como o texturizado, mas lembra muito um mármore de verdade. Chama muita atenção e é muito bonito, como dá pra ver nas fotos dos álbuns.",
      "E vocês devem ter reparado no anjinho da foto de capa, né? Esse anjinho é a Cláudia.",
      "A Cláudia foi a nossa modelo na divulgação da coleção Pet Bowl Wave. Muito fotogênica, foi quem mais fez a equipe rir na hora das fotos, com seu jeito brincalhão e medroso.",
      "Infelizmente, um dia depois das fotos, ela foi atropelada e não resistiu. Por isso resolvi fazer essa collab com o nome dela, pra que a Cláudia siga com a gente em cada peça."
    ],
    galeria: ['claudiawave_0039', 'claudiawave_0196', 'claudiawave_9569', 'claudiawave_9590', 'claudiawave_9676', 'claudiawave_9698']
  },

  /* ===================================================================================================
     ālea SOAP DISH — a saboneteira, 1º produto da linha HOME (03/10/2026). Página: 01_gerar_paginas_v27_saboneteira_home;
     fotos: 06_fotos_profissionais_v4_saboneteira (as dele por ARQUIVO, msgs 5749-5757; registro dourado limpo quando há).
     - nome 5730 · categoria HOME 5725/5733 · preço R$ 59 msg 5759 · só Monocromático 5767 · SEM nome gravado 5769/5771.
     - texto DELE, palavra por palavra (msg 5788); resumo vazio, como nas outras com texto dele.
     - material PLA: o .3mf dele (ALEA Soap Dish.3mf) é PLA. Medidas: a informar (ele manda; nunca estimadas).
     =================================================================================================== */
  {
    slug: 'soap-dish',
    nome: 'ālea Soap Dish',
    linha: 'Home',
    categoria: 'home',
    preco: 59,
    material: 'PLA',
    capa: 'soapdish_capa',
    cores_peca: ['monocromatico'],
    sem_nome: true,   // msg 5771: "daqui pra frente também não terá nome gravado! Será somente cor!"
    resumo: '',
    paragrafos: [   // msg 5788, texto DELE
      'Com formas orgânicas e uma superfície marcada por ondas suaves, nossa saboneteira traz movimento e personalidade para um objeto presente todos os dias.',
      'Seu desenho elevado ajuda a manter o sabonete apoiado sem perder a leveza visual da peça, enquanto as curvas criam um acabamento moderno e diferente em todos os ângulos.',
      'Produzida em impressão 3D, é uma peça funcional que também faz parte da decoração — porque até os pequenos detalhes merecem ser especiais.'
    ],
    galeria: ['soapdish_2620', 'soapdish_2622', 'soapdish_2624', 'soapdish_2621']
  },

  /* ===================================================================================================
     ālea Ephix Vase — 2º produto da linha HOME (04/10/2026). Página: 03_site/01_gerar_paginas_v30_ephix_vase_2026-10-04.py
     (clone da página da saboneteira); fotos: 06_fotos_profissionais_v5_ephix_vase_2026-10-04.py (os 5 quadros do vídeo
     IMG_2651 dele, msg 6025); 3D: modelos/ephixvase.glb (modo vaso, oco e de boca aberta - ver config.js).
     - nome (6012), HOME (6014: "tudo o que te mandar agora vai pro Home"), R$ 89 (6016), monocromático em todas as cores
       (6020/6021), sem nome gravado (regra 5771), texto DELE palavra por palavra (6023).
     - material PLA: o filamento é Elegoo PLA Silk White (6018) = "Branco Perolizado" no site.
     - medidas do ARQUIVO (6029): caixa do EPHYX.stl = 179,8 x 159,5 x 85,1 mm (oval). Peso FATIADO no Studio desta máquina
       com o 3MF dele (04/10/2026, msgs 6201/6206): 74 g, 4h53 (fatiar_peso_peca_v2_sem_suporte.py). Ficha só mostra dimensões.
     =================================================================================================== */
  {
    slug: 'ephix-vase',
    nome: 'ālea Ephix Vase',
    linha: 'Home',
    categoria: 'home',
    preco: 89,
    material: 'PLA',
    capa: 'ephixvase_capa',
    cores_peca: ['monocromatico'],
    sem_nome: true,
    resumo: '',
    paragrafos: [   // msg 6023, texto DELE
      'Com formas suaves e linhas que percorrem toda a peça, este vaso foi pensado para trazer textura e movimento à decoração de forma leve e elegante.',
      'Seu desenho arredondado cria um efeito delicado de luz e sombra, valorizando cada detalhe e fazendo com que a peça se destaque mesmo nas composições mais simples.',
      'Ideal para flores secas, pequenos arranjos ou até mesmo para ser usado sozinho, como objeto decorativo.',
      'Uma peça versátil, delicada e cheia de presença — feita para transformar pequenos espaços em cantinhos especiais.'
    ],
    galeria: ['ephixvase_1', 'ephixvase_3', 'ephixvase_4', 'ephixvase_5']
  },

  /* ===================================================================================================
     ālea Vase Prismatic — 3º produto da linha HOME (04/10/2026). Página: 03_site/01_gerar_paginas_v31_vase_prismatic_2026-10-04.py
     (clone da página do Ephix Vase); fotos: 06_fotos_profissionais_v7_capa_da_sala_2026-10-04.py (as 5 originais dele,
     msgs 6048-6052); 3D: modelos/vaseprismatic.glb (do 3MF DELE, msg 6064 - ver config.js).
     - nome (6067), HOME (6014), R$ 89 (6069), monocromático em todas as cores (6080), sem nome gravado (regra 5771),
       texto DELE palavra por palavra (6096).
     - material PLA na ficha: o Transparente é PETG, mas ele mandou deixar PLA (áudio 6103: "o único PETG que eu uso é esse").
     - medidas do ARQUIVO: 173 x 89,4 x 89,4 mm. Peso FATIADO aqui (04/10/2026): 139 g, 4h07, sem suporte; o dele deu 128 g e
       ele mandou ficar o daqui ("pode colocar sempre esse a mais", msg 6206).
     =================================================================================================== */
  {
    slug: 'vase-prismatic',
    nome: 'ālea Vase Prismatic',
    linha: 'Home',
    categoria: 'home',
    preco: 89,
    material: 'PLA',
    capa: 'vaseprismatic_capa',
    cores_peca: ['monocromatico'],
    sem_nome: true,
    resumo: '',
    paragrafos: [   // msg 6096, texto DELE
      'O Vase Prismatic é formado por uma sequência de faces marcadas e volumes geométricos que criam diferentes reflexos ao longo de toda a sua superfície. O resultado é um desenho contemporâneo, cheio de movimento, que ganha novas formas conforme o ângulo de quem observa e a incidência da luz.',
      'Mesmo com uma composição marcante, suas linhas mantêm a peça elegante e fácil de combinar. Sozinho, funciona como um objeto decorativo; com folhagens, flores secas ou arranjos naturais, ganha ainda mais personalidade.',
      'Uma peça criada para levar textura, forma e um toque de design para pequenos cantos da casa — daqueles detalhes que chamam atenção sem precisar disputar espaço com o restante da decoração.'
    ],
    galeria: ['vaseprismatic_1', 'vaseprismatic_2', 'vaseprismatic_3', 'vaseprismatic_4']
  },

  /* ===================================================================================================
     ālea Stria Planter — 4º produto da linha HOME (04/10/2026). Página: 03_site/01_gerar_paginas_v33_stria_planter_2026-10-04.py
     (clone da página do Vase Prismatic); fotos: 06_fotos_profissionais_v8_stria_planter_2026-10-04.py (IMG_2686-2690,
     msgs 6141-6145, capa 2690 por 6146); 3D: modelos/stria_{orbis,quadrum}_{p,g}.glb, 1 por variante MONTADA (6127).
     - nome (6122/6124/6153): "ālea Stria Planter — Orbis e Quadrum"; formatos e tamanhos POR FORMATO (config.js, 6228/6231):
       Orbis Mini e Pequeno (o P e o G de antes), Quadrum Pequeno e Grande.
     - 2 cores só, Exterior (corpo) e Interior (vaso interno + pés + divisória), sem monocromático (6135-6140).
     - PREÇO POR ESCOLHA (msg 6250): Orbis Mini R$ 79 · Orbis Pequeno R$ 169 · Quadrum Pequeno R$ 189 · Quadrum Grande R$ 289,
       em config.js ALEA.precoPorEscolha (o `preco` daqui fica null; feed.js v39 mostra "a partir de R$ 79,00").
       Texto DELE (6150), "Vasum" trocado por "Planter" (6153).
     - Peso FATIADO aqui (04/10/2026, 6207/6208, peça + interno + 4 pés, sem suporte): Orbis Mini (era P) 104 g · Orbis Pequeno (era G) 253 g ·
       Quadrum P 272 g · Quadrum G 452 g (pé normal fit 1,8 g; pé pequeno 1,0 g).
     =================================================================================================== */
  {
    slug: 'stria-planter',
    nome: 'ālea Stria Planter',
    linha: 'Home',
    categoria: 'home',
    preco: null,
    material: 'PLA',
    capa: 'striaplanter_capa',
    cores_peca: ['bicolor'],
    sem_nome: true,
    resumo: '',
    paragrafos: [   // msg 6150, texto DELE (6153: "Stria Planter")
      'A coleção Stria Planter nasce da combinação entre textura e simplicidade. Suas ranhuras verticais acompanham toda a peça, criando movimento e valorizando a luz e as sombras ao longo da superfície.',
      'Elevado por pequenos pés, o vaso ganha leveza visual e presença, transformando plantas e flores em parte da composição do espaço.',
      'Disponível em diferentes formatos e cores, foi criado para se adaptar a diversos ambientes sem perder sua identidade.',
      'Mais do que acomodar uma planta, Stria Planter foi pensado para fazer parte da decoração.'
    ],
    galeria: ['striaplanter_1', 'striaplanter_2', 'striaplanter_3', 'striaplanter_4']
  },

  /* ===================================================================================================
     OS 6 DO LOTE msg6689 (05/10/2026, áudios 6726/6728/6729/6731 do Cassiano) — "Em breve" (config.js ALEA.emBreve).
     Página: 03_site/01_gerar_paginas_v35_lote_home_em_breve_2026-10-05.py (clone do Vase Prismatic, sem foto, sem texto).
     3D: modelos/*.glb do 37_produtos_home_lote_2026-10-05/montar_lote_home_v1_encaixe_por_colisao.py (montados, logo recortada).
     - SEM TEXTO (paragrafos vazios): "amanhã eu vou organizando um por um, falando de descrição e tudo" (6726) — nunca inventar.
     - capa 'em_breve' = a capa PROVISÓRIA bege "foto em breve" (03_site/_gerar_capa_em_breve_v1_2026-10-05.py), só pra busca
       e lista de desejos não quebrarem; sai quando chegar a foto dele.
     - Lamel: formatos Vase/Wavy (nomes provisórios, 6728). Nodus Organizer: Opção 1/2/3 (provisórios, 6729/6731; a Opção 3 é o
       Centrum, que NÃO é produto separado — 6731).
     =================================================================================================== */
  { slug: 'laptop-stand', nome: 'ālea Laptop Stand', linha: 'Home', categoria: 'home', preco: null, material: 'PLA',
    capa: 'em_breve', cores_peca: ['monocromatico'], sem_nome: true, resumo: '', paragrafos: [], galeria: [] },
  { slug: 'pen-holder', nome: 'ālea Pen Holder', linha: 'Home', categoria: 'home', preco: null, material: 'PLA',
    capa: 'em_breve', cores_peca: ['monocromatico'], sem_nome: true, resumo: '', paragrafos: [], galeria: [] },
  { slug: 'nodus-organizer', nome: 'ālea Nodus Organizer', linha: 'Home', categoria: 'home', preco: null, material: 'PLA',
    capa: 'em_breve', cores_peca: ['monocromatico'], sem_nome: true, resumo: '', paragrafos: [], galeria: [] },
  { slug: 'make', nome: 'ālea Make', linha: 'Home', categoria: 'home', preco: null, material: 'PLA',
    capa: 'em_breve', cores_peca: ['monocromatico'], sem_nome: true, resumo: '', paragrafos: [], galeria: [] },
  { slug: 'makeup-layer-organizer', nome: 'ālea Makeup Layer Organizer', linha: 'Home', categoria: 'home', preco: null, material: 'PLA',
    capa: 'em_breve', cores_peca: ['monocromatico'], sem_nome: true, resumo: '', paragrafos: [], galeria: [] },
  { slug: 'lamel', nome: 'ālea Lamel', linha: 'Home', categoria: 'home', preco: null, material: 'PLA',
    capa: 'em_breve', cores_peca: ['monocromatico'], sem_nome: true, resumo: '', paragrafos: [], galeria: [] },

  /* ===================================================================================================
     OS PRODUTOS ANTIGOS — fora da vitrine desde 25/09/2026 (msg 1884). As páginas continuam no disco e
     estes blocos ficam pra elas não quebrarem (e pra voltar, se ele quiser). Não aparecem no feed.
     =================================================================================================== */

  {
    slug: 'bowl-wave',
    /* peso: 198 g com a tigela de inox (Cassiano, 24/09/2026 01:39) — guardado COMO ELE MANDOU; a ficha mostra +10%
       (regra dele, 01:46: "todo peso que eu te passar, você coloca 10% a mais"), feita pelo gerador v14. Medidas: caixa do objeto no arquivo 3D do Luke,
       tamanho G (o do configurador 3D) — 211,9 × 212,9 × 83,7 mm. O tamanho M do mesmo arquivo: 186,4 × 187,3 × 73,6 mm. */
    medidas: { peso_g: 198, altura_cm: 8.4, largura_cm: 21.3, comprimento_cm: 21.2 },
    nome: 'ālea Bowl Wave',
    linha: 'Comedouro',
    categoria: 'pet',
    preco: 179,
    capa: 'luke_1',
    /* OS ÁLBUNS POR CONFIGURAÇÃO (Cassiano, áudios 25/09/2026 11:19-11:30, msgs 1493, 1517, 1518): a colmeia das 7
       fotos de cima NÃO muda ("são as sete capas, padrão pra todos os produtos"). Embaixo dela entram 3 favos menores,
       os ÁLBUNS, com o nome escrito em cima no estilo do rótulo "PET": tricolor, bicolor e monocromático. Clicou, abre
       uma tela quase cheia com as miniaturas daquele álbum; a foto expande dentro dela e clicar fora volta pras
       miniaturas. O Bowl Wave sai em 3 combinações de cor — monocromático (Matteo, verde), bicolor (Catrina, azul e
       branco) e tricolor (Luke: branco/laranja/cinza; Cacau: bege/dourado/marrom). Ele alimenta: "coloca essa daqui
       no álbum monocromático". Quem monta a página é o 01_gerar_paginas_v15_colmeia_configuracoes; a tela é do produto.js. */
    configuracoes: [
      { id: 'tricolor',      nome: 'Tricolor',      capa: 'pro_luke_1',    fotos: ['pro_luke_1', 'pro_cacau_1', 'luke_1', 'luke_2', 'luke_3', 'luke_4'] },
      { id: 'bicolor',       nome: 'Bicolor',       capa: 'pro_catrina_1', fotos: ['pro_catrina_1'] },
      { id: 'monocromatico', nome: 'Monocromático', capa: 'pro_matteo_1',  fotos: ['pro_matteo_1', 'matteo_1', 'matteo_2', 'matteo_3'] }
    ],
    material: 'PLA',          /* ⚠️ era o que o texto de 14/09 dizia. Se esta peça hoje
                                 sai em PETG, trocar aqui e regerar as páginas. */
    resumo: 'Comedouro elevado com o nome do seu cão impresso no corpo da peça.',
    paragrafos: [
      'A onda que dá nome à peça vem do grafismo da marca — é o mesmo desenho que ' +
      'aparece na embalagem e na tag, aplicado na curva do comedouro.',
      'O nome não é adesivo colado. Ele é impresso junto com a peça, em baixo relevo ' +
      'na cor do objeto, então não descasca, não desbota e não sai na lavagem. A ' +
      'tigela interna é de inox e sai pra lavar.',
      'A base elevada deixa o cão comer com o pescoço em posição mais natural, sem ' +
      'ter que abaixar a cabeça até o chão.'
    ],
    /* PESO E DIMENSÕES (24/09/2026, pedido do Cassiano): base do frete e da caixa padrão. Preencher com o que
       ELE mandar, nunca estimado — e rodar 01_gerar_paginas_v14_peso_e_dimensoes. Sem número = linha escondida no ar.
       medidas: { peso_g: 0, altura_cm: 0, largura_cm: 0, comprimento_cm: 0 }, */
    /* linhas EXTRA da ficha, além das quatro padrão */
    ficha_extra: [
      ['Acompanha', 'Tigela interna em inox, removível pra lavar']
    ],
    galeria: ['ayla_1', 'tina_1', 'chica_1', 'matteo_1', 'claudia_1', 'luke_2']
  },

  /* ===================================================================================================
     ālea Poop Bag Holder — VOLTA à vitrine (04/10/2026, cadastro campo por campo, msgs 6315-6363 do Cassiano).
     Página: 03_site/_poop_bag_pagina_v1_2026-10-04.py (a página de 24/09 reescrita no lugar); fotos: recortes das fotos dos
     comedouros (33_produtos_novos_2026-10-04/poop_bag_extra/recortar_fotos_poopbag_v1.py, áudio 6290); 3D: modelos/poopbag.glb.
     - nome 6315 · Pet 6321 · todas as cores mono/bi/tri 6324 · original Caramelo/Mármore/Marrom 6326/6328 · nome GRAVADO e
       de graça 6330/6334 · nome colorido + R$ 10 6331/6333 · R$ 79 (msg 6255) · texto DELE 6360 com "low poly" 6361.
     - medidas do ARQUIVO 3D, montado: 4,5 × 4,5 × 8,2 cm. Peso FATIADO no Studio desta máquina (fatiar_gramas_v1, A1, placa 6):
       74 g, 5h20 — guardado cru; a ficha mostra só as dimensões, como as outras peças.
     =================================================================================================== */
  {
    slug: 'poop-bag-holder',
    medidas: { peso_g: 74, altura_cm: 8.2, largura_cm: 4.5, comprimento_cm: 4.5 },
    nome: 'ālea Poop Bag Holder',
    linha: 'Passeio',
    categoria: 'pet',
    preco: 79,
    capa: 'poopbag_1',
    material: 'PLA',
    cores_peca: ['tricolor', 'bicolor', 'monocromatico'],
    resumo: '',
    paragrafos: [   // msg 6360, texto DELE (6361: "desenho low poly")
      'Criado para levar os saquinhos higiênicos de forma prática e discreta, este porta-saquinhos combina funcionalidade com um desenho low poly e cheio de personalidade. Seu corpo facetado traz a estética geométrica característica da ālea & Co., enquanto a abertura lateral permite retirar os saquinhos com facilidade durante o passeio.',
      'Compacto e leve, pode ser preso à guia, mochila ou bolsa pela alça superior, ficando sempre à mão quando você precisar.'
    ],
    galeria: ['poopbag_2', 'poopbag_3', 'poopbag_4', 'poopbag_5']
  },
  /* A VERSÃO DE 24/09 (fora do ar), guardada:
  { slug: 'poop-bag-holder', medidas_exemplo: { peso_g: 45, altura_cm: 10, largura_cm: 6, comprimento_cm: 7 },
    nome: 'ālea Poop Bag Holder', linha: 'Passeio', categoria: 'pet', preco: 59, capa: 'saquinho_1', material: 'PLA',
    resumo: 'Porta-saquinho que sai na mesma estampa do comedouro.', ficha_extra: [['Combina com', 'A mesma estampa do ālea Bowl Wave']],
    galeria: ['saquinho_2', 'saquinho_3', 'chica_2'] }, */

  {
    slug: 'kit',
    /* ⚠ EXEMPLO pra ver o layout (pedido dele, 01:39: "inventa desses dois por enquanto") — NÃO É MEDIDA. Some no ar. */
    medidas_exemplo: { peso_g: 250, altura_cm: 10, largura_cm: 23, comprimento_cm: 23 },
    nome: 'Kit ālea',
    linha: 'Kit',
    categoria: 'pet',
    /* ⚠️ TBD: o kit aparece nas fotos mas nunca teve preço publicado. Perguntar ao
       Cassiano. Enquanto for null o site diz "sob consulta", que é honesto — inventar
       valor aqui vira preço errado no anúncio, e o Google compara. */
    preco: null,
    capa: 'kit_1',
    material: 'PLA',
    resumo: 'Comedouro e porta-saquinho na mesma estampa, com o mesmo nome.',
    paragrafos: [
      'É como as fotos do Instagram foram feitas: as duas peças na mesma estampa, ' +
      'personalizadas com o mesmo nome, embaladas juntas com a tag da marca.',
      'O valor do kit sai por WhatsApp, junto com as opções de estampa.'
    ],
    ficha_extra: [
      ['Contém', 'ālea Bowl Wave + ālea Poop Bag Holder'],
      ['Embalagem', 'Caixa com a tag da marca — serve de presente']
    ],
    galeria: ['kit_2', 'kit_3', 'tina_2']
  }

];


/* ---------------------------------------------------------------------------
   3) A CONFERÊNCIA DO CATÁLOGO — erra alto, não calado.
   ---------------------------------------------------------------------------
   Categoria escrita errada não levanta erro nenhum: a peça simplesmente some do site,
   e você só descobre quando o cliente reclama. Aqui ela grita no console do navegador.
   Custa 15 linhas e paga sozinho. */
(function conferirCatalogo() {
  var ids = (window.CATEGORIAS || []).map(function (c) { return c.id; });
  var reclamacoes = [];
  (window.VITRINE || []).forEach(function (c, i) {
    if (ids.indexOf(c.categoria) < 0) {
      reclamacoes.push('feed #' + (i + 1) + ' (' + c.produto + ' de ' + c.nome +
        '): categoria "' + c.categoria + '" nao existe em CATEGORIAS');
    }
  });
  (window.PRODUTOS || []).forEach(function (p) {
    if (ids.indexOf(p.categoria) < 0) {
      reclamacoes.push('produto "' + p.slug + '": categoria "' + p.categoria + '" nao existe');
    }
    if (!p.material) {
      reclamacoes.push('produto "' + p.slug + '": falta o material (PLA ou PETG)');
    }
  });
  if (reclamacoes.length) {
    console.error('[alea] CATALOGO COM PROBLEMA:\n- ' + reclamacoes.join('\n- '));
    window.__aleaCatalogoRuim = reclamacoes;
  }
})();
