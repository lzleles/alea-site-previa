/* CATALOGO:
   nome: config
   categoria: UTIL
   objetivo: Centraliza contatos, medição, redes, regras comerciais e opções de personalização usadas pelo site.
   entrada: Valores editados diretamente no arquivo
   saida: Objeto global window.ALEA
   status: ativo (cabecalho proposto pelo Codex em 2026-09-20, confianca ALTA; conferir na proxima vez que o script rodar)
   validado_em: TBD
   v38-produto (02/10/2026, prints 5275/5278 + áudios 5277/5279 do Cassiano): `modelos3d[slug].capa` deixa de ser "só
      registro": o Personalize ABRE marcado nela (produto.js v38). Campo novo OPCIONAL `capa.nome` (ver o bloco
      "COR DO NOME DA CAPA" perto do Luke). Só comentários mudaram aqui; nenhum valor. A versão anterior é o 988aa7b.
   v38b-produto (02/10/2026, msg 5284): primeiro valor de `capa.nome` — Cláudia, nome Dourado Perolizado (Elegoo Silk Gold).
   v40-produto (03/10/2026, áudios 5800/5801): `modelos3d['soap-dish']` — a saboneteira na janela 3D, com os campos novos
      `semNome` (personalizar3d.js v13) e `rotuloBotao` (produto.js v40). A versão anterior está em
      03_site/_versoes_anteriores/saboneteira_3d_antes_2026-10-03/js/.
   v41-produto (04/10/2026, msgs 6008-6030): `modelos3d['ephix-vase']` (o vaso, GLB oco do modo vaso) e as fotos do vaso
      em `filamentosPorFoto`. Nenhum campo novo. A versão anterior está em 03_site/_versoes_anteriores/ephix_vase_antes_2026-10-04/js/.
   v42-produto (04/10/2026, msgs 6048-6096): `modelos3d['vase-prismatic']` (o 3º vaso da HOME) e as fotos dele em
      `filamentosPorFoto`. Nenhum campo novo. A versão anterior está em 03_site/_versoes_anteriores/vase_prismatic_antes_2026-10-04/js/.
   v43-produto (04/10/2026, msgs 6122-6148, ālea Stria Planter): `ALEA.formatos` (grupo Formato) + 'stria-planter' em
      `tamanhos` + `modelos3d['stria-planter']` com os campos NOVOS `glbPorEscolha`, `partesCor` e `soUmModo` (produto.js v42)
      + as fotos em `filamentosPorFoto`. A versão anterior está em 03_site/_versoes_anteriores/stria_variantes_antes_2026-10-04/js/.
   v44-produto (04/10/2026, msgs 6228-6243, ajustes da prévia): (1) `tamanhos['stria-planter']` vira POR FORMATO
      ({ Orbis: ['Mini','Pequeno'], Quadrum: ['Pequeno','Grande'] }, áudio 6228 + "Isso" 6231): o Orbis P de antes é o
      Mini e o Orbis G é o Pequeno; as chaves de `glbPorEscolha` mudam junto (os .glb são os mesmos). (2) campo NOVO
      `ALEA.precoPorEscolha[slug]` (preço por Formato|Tamanho; null = sem preço ainda, áudio 6234). (3) campo NOVO
      `ALEA.parcelamento` (null = a linha da parcela não aparece; pergunta 6245). Lidos pelo produto.js v43 e feed.js.
      A versão anterior está em 03_site/_versoes_anteriores/ajustes_previa_antes_2026-10-04/js/.
   v45-produto (04/10/2026, msg 6255 + áudios 6256/6258/6259 do Cassiano): PREÇOS DOS COMEDOUROS em `precoPorEscolha`
      (chave só de Tamanho, 'M'/'G': sem Formato, o produto.js v43 monta a chave só com o tamanho). Ele mandou 2 valores
      por peça; o 1º foi lido como M e o 2º como G (dito a ele na mensagem da prévia). Ayla Pompom, sem tamanho, usa a
      chave '' (vazia). Caesar (produto futuro, ainda sem página) e Poop Bag (fica fora da vitrine, 6258) NÃO entram.
      A versão anterior está em 03_site/_versoes_anteriores/precos_comedouros_antes_2026-10-04/js/.
*/
/* =============================================================================
   config.js — os valores que mudam. Mexe aqui, não no resto do site.
   =============================================================================

   COMO MEXER (vale para quem não programa)
   ----------------------------------------
   Cada linha é  nome: 'valor',  — troque o que está entre aspas e salve.
   Não apague a vírgula do fim da linha nem as aspas.

   whatsapp ........... só números, com 55 na frente e DDD. Sem espaço, sem traço.
                        Exemplo: 5564999998888
   conversao_whatsapp . Google Ads > Metas > Conversões > nova conversão do tipo
                        "site" > copie o trecho AW-000000000/AbCdEfG e cole aqui.
   ========================================================================== */

window.ALEA = {

  /* O WhatsApp comercial da ālea. Informado pelo Cassiano em 15/09/2026.
     Formato: 55 (Brasil) + 64 (DDD de Jataí) + o número que ele mandou (999569994).
     Ele mandou assim:  64999569994
     Conferir sempre que mexer: tem que ter 12 ou 13 dígitos, só número, sem espaço e
     sem traço — é essa a régua que o site.js usa pra decidir se liga os botões. */
  whatsapp: '5564999569994',

  /* Texto que já vai escrito na conversa. O {produto} é trocado pelo item clicado. */
  mensagem: 'Oi! Vim pelo site da ālea & Co. Queria saber sobre: {produto}',

  /* ⚠️ Sem "conversao_whatsapp" preenchido o Google Ads NÃO sabe quais cliques viraram
     conversa — e o lance inteligente fica sem nada pra aprender. A campanha vira
     aposta. Preencher ANTES de colocar dinheiro, não depois. */
  conversao_whatsapp: '',

  /* Medição. Vazio = nenhum script de terceiro carrega, e a página não precisa de
     banner de cookie. Preencher só quando a campanha começar. */
  google_ads_id: '',          // AW-000000000
  google_analytics: '',       // G-XXXXXXXXXX

  /* A CONTA DE VERDADE E A MEMÓRIA DA VISITA (22/09/2026).
     api_conta ......... endereço do servidor da conta da ālea (ex.: 'https://api.alea3d.co').
                         VAZIO = TUDO DESLIGADO: nenhum script a mais carrega, nenhum aviso
                         aparece, e a gaveta Conta continua sendo a do aparelho, como hoje.
                         Preenchido = a gaveta ganha "Entrar com o Google", a ficha de cadastro
                         (WhatsApp, endereço, pets) e os pedidos em qualquer aparelho; e o site
                         PERGUNTA, uma vez, se pode lembrar o que a pessoa viu.
     login_automatico .. quem já entrou com o Google NESTE aparelho volta logado sozinho, sem
                         clicar (o "One Tap" do Google). Quem nunca entrou não vê janela nenhuma.
     ⚠️ Só preencher DEPOIS de: servidor da ZELES no ar + app do Google NO NOME DO CASSIANO +
     política de privacidade nova publicada. Ordem em ZELES\Conta_Cliente\_INDICE_DA_PASTA.md. */
  api_conta: 'https://api.alea3d.co',   // ligado em 23/09/2026 (ordem do Lázaro): servidor da ZELES + app Google 'ālea' + política v2
  login_automatico: true,

  /* 25/09/2026 09:48 — ORDEM DO CASSIANO (áudio, msg 1460), contra o parecer da porta: a tela de conta mostra
     e-mail+senha, código por e-mail e "Cadastre-se" no ar MESMO antes do servidor fazer isso ("se der erro é normal,
     porque o site ainda não está pronto"). Enquanto o servidor não tiver as rotas, quem tentar recebe
     "Isso ainda não está ligado no servidor." Facebook fica de fora (ordem dele, mesmo áudio).
     ⚠️ Quando a casa ligar código/senha no /api/config ("metodos"), deixar esta lista VAZIA ([]) pra voltar a
     obedecer o servidor.
     25/09/2026 11:07 — a casa LIGOU (janela zeles-alea-servidor-conta): /api/config devolve
     "metodos":["google","codigo","senha"], medido. Lista esvaziada: o site volta a obedecer o servidor. */
  conta_metodos_forcados: [],

  /* A FRASE DA MARCA. Ela abre o site (escrita letra por letra) e fecha o rodapé.
     Um lugar só: mudou aqui, mudou nos dois. */
  assinatura: 'Onde cada impressão começa com um sonho!',

  /* O FEED MOSTRA PRECO?
     O Cassiano pediu "so o produto e nome". Deixei o preco porque preco no feed tira
     duvida antes do clique e porque o Google compara o valor do anuncio com o da
     pagina. Se ele quiser o feed 100% limpo, troque para false: sai so do feed,
     a pagina de produto continua mostrando. */
  mostrar_preco_no_feed: true,

  /* Categoria sem nenhum produto aparece no menu como "em breve" (false) ou some do
     menu (true). Enquanto só a PET tem peça, deixar false é honesto: mostra a régua
     de linhas que ele já registrou, sem prometer clique que não leva a nada. */
  esconder_categorias_vazias: false,

  /* Identificação do negócio — o Google exige isto visível na página de destino.
     ⚠️ CNPJ informado pelo Cassiano em 15/09/2026. Ele fecha metade da exigência de
     "vendedor identificável" da política de destino do Google Ads; ainda faltam
     ENDEREÇO COMERCIAL e E-MAIL. Sem conferir: é o número que ele mandou, escrito
     como ele mandou. */
  cnpj: '61.338.171/0001-10',
  marca: 'ālea',
  responsavel: 'Cassiano Rosado',
  cidade: 'Jataí',
  uf: 'GO',
  email: '',                  // ⚠️ e-mail comercial da ālea — ainda não informado
  /* 28/09/2026 (áudios 3035/3037 do Cassiano): o botão "Orçamentos e personalizados" FICA, mas em vez do WhatsApp abre o
     e-mail da pessoa endereçado a este e-mail ("esse e-mail já existe" — dito por ele; MX do domínio = Google). site.js. */
  email_orcamento: 'comercial@alea3d.co',
  instagram: 'alea.co_',        // trocado em 16/09/2026: o @alea.decor3d deixou de existir; @alea.co_ conferido na API da Meta ("ālea & Co")
  instagram_canal: 'eaibora.3d',

  /* AS REDES DO RODAPÉ. Endereço vazio = o ícone não aparece — nunca vira link morto.
     ⚠️ Faltam do Cassiano: YouTube e Twitch. Assim que ele mandar, é colar.
     17/09/2026 (áudio de 16/09, 23:51): "eu tenho o segundo Instagram, que é do eaibora3d
     […] o link do Linktree". Os dois entraram: o Linktree é o dele (o mesmo da bio do
     @eaibora.3d, lido no retrato de 14/09) e o segundo Instagram ganha ícone próprio. */
  redes: {
    /* ⚠️ O ENDEREÇO DO LINKTREE É O QUE ELE MANDOU, COM TODAS AS LETRAS (4ª rodada, 17/09/2026,
       item 5: "colocar a logo também do linktr, onde quando eu clicar, vai cair nesse domínio").
       O rabicho depois do `?` é rastreamento de quem clicou no link da BIO do Instagram dele
       (utm_* e fbclid). `https://linktr.ee/eaibora.3d` sozinho abre a mesma página; mantive o dele
       porque quem escolhe o link é o dono da conta, e porque o Linktree conta essa visita como
       vinda do Instagram — se um dia ele quiser separar "veio do site", é aqui que se troca. */
    linktree:  'https://linktr.ee/eaibora.3d?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAdGRleAUYWSxwZG9mAmZkaWQWUOkM91TjGzxZsGlPaArH1voSo4_jjGV4dG4DYWVtAjExAHNydGMGYXBwX2lkDzEyNDAyNDU3NDI4NzQxNAABpzXaxi12EnfVzwcyuaOEvwRaWDu6O0_U-Sq64AjEdd39UlRlaIC5LxabGdrK_aem_oa-Nn97SXEFFzUbBcxxXdA',
    /* ⚠️ ETAPA 2 do Cassiano (22/09/2026): "dos 3 ícones abaixo das categorias, tira os 2 do
       Instagram, deixa só o Linktree". Vazio = o ícone não aparece (ver site.js). Os endereços
       ficam aqui guardados pra voltar num piscar se ele mudar de ideia:
         alea.co_        -> https://www.instagram.com/alea.co_/
         eaibora.3d      -> https://www.instagram.com/eaibora.3d/  (o do canal segue no topo, na logo do @eaibora.3d) */
    instagram: '',
    instagram_canal: '',
    youtube:   '',            // https://www.youtube.com/@...
    twitch:    ''             // https://www.twitch.tv/...
  },

  /* A FICHA PADRÃO DA PEÇA (ditada por ele em 15/09/2026).
     Vale pra todo produto que não escrever a sua própria no produtos.js.
     `material` fica de fora de propósito: ele é PERGUNTADO peça a peça pelo
     01_gerar_paginas_v1.py, porque muda de peça pra peça (PLA ou PETG).
     ETAPA 31 (22/09/2026, 21:33): CORES termina com "entre filamento básico, fosco ou perolizado."
     (palavras dele; era "entre filamentos básicos, foscos ou brilhosos." — "perolizado" é o nome
     que ele passou a usar pro acabamento, como no exemplo da cor do nome). */
  /* 27/09/2026 (áudio 2333 + texto 2334 do Cassiano): a linha CORES SAIU da ficha ("é bom ficar menor"), e o
     Material PLA passa a mostrar a frase dele (material_pla). Aplicado nas páginas por
     03_site/_ficha_material_pla_sem_cores_v1_2026-09-27.py. O gerador de páginas ainda escreve o formato antigo:
     rodar esse script depois dele. */
  /* 02/10/2026 (print 5085 + áudio 5087 do Cassiano): "em todas as opções de personalização (...) nome do pet em baixo ou
     alto relevo, na cor do objeto, dependendo da geometria da peça". Era "Nome do pet em baixo relevo na cor do objeto." */
  ficha_padrao: {
    personalizacao: 'Nome do pet em baixo ou alto relevo na cor do objeto, dependendo da geometria da peça.',
    producao: 'Sob encomenda, 3 dias úteis após a confirmação de pagamento!',
    material_pla: 'PLA é um material utilizado na impressão 3D, produzido a partir de fontes renováveis, ' +
                  'como milho e cana-de-açúcar. É leve, versátil e proporciona excelente acabamento.'
  },

  /* ADICIONAIS DE PERSONALIZACAO — o que soma no preco da peca.
     -------------------------------------------------------------------------------
     id ....... nao muda depois que um pedido ja foi feito com ele (o carrinho guarda)
     rotulo ... o que aparece no quadrado pra clicar
     preco .... soma ao valor da peca, na hora, no botao e no carrinho
     libera ... o campo que so pode ser respondido depois de marcar este adicional

     ⚠️ ORIGEM DO VALOR: R$ 30,00, decidido pelo Cassiano em 15/09/2026, 2a rodada de
     retorno do site ("colocar um quadrado pra clicar com o titulo Nome Colorido +
     R$ 30,00, onde a pessoa precisa clicar pra poder responder a cor do nome").
     Nao e' estimativa nossa. Mudou o preco aqui, muda no anuncio e no que o cliente ve. */
  /* ETAPA 20 (22/09/2026, 20:36): o título fica em maiúscula como está, SEM a exclamação; a
     descrição sai em letra normal (CSS .detalhe-extra) e com ponto final. Eram: 'Um detalhe que
     transforma!' e 'Deixe o nome do seu pet ainda mais especial adicionando cores!'. */
  adicionais: [
    { id: 'nome_colorido', rotulo: 'Um detalhe que transforma', preco: 30, libera: 'cor_nome',
      detalhe: 'Deixe o nome do seu pet ainda mais especial adicionando cores.' }
  ],

  /* O TEXTO JURÍDICO DA PEÇA PERSONALIZADA, palavra por palavra como ele mandou.
     Fica aqui, e não espalhado nas páginas, porque ele aparece em DOIS lugares que
     não podem divergir: a aba do produto e a trava do carrinho. Texto de consumo que
     diverge entre a promessa e o aceite não vale nada — e o que o cliente marcou é
     exatamente isto. */
  personalizados: {
    titulo: 'PRODUTOS PERSONALIZADOS',
    /* ETAPA 18 (22/09/2026, 20:27): texto NOVO dele, palavra por palavra ("apague tudo e coloque
       esse texto"). O anterior: "Por se tratar de um produto produzido sob encomenda e personalizado
       especialmente de acordo com as suas escolhas, pedidos personalizados não poderão ser
       cancelados ou devolvidos após a confirmação de pagamento se o produto já estiver sendo
       fabricado, ressalvados casos de defeito, vício ou erro de fabricação." */
    texto: 'Por serem feitos sob encomenda e personalizados conforme suas escolhas, os pedidos ' +
           'não poderão ser cancelados ou devolvidos após a confirmação do pagamento caso a ' +
           'produção já tenha começado, exceto em casos de defeito, vício ou erro de fabricação.',
    aceite: 'Declaro que revisei cuidadosamente todas as informações da ' +
            'personalização, incluindo nome, grafia e cores. Declaro, ainda, estar ' +
            'ciente e de acordo com as condições acima aplicáveis a produtos ' +
            'personalizados, inclusive quanto a cancelamentos e devoluções.'
  },

  /* AS CORES DA PEÇA — deixou de ser um campo de escrita livre (Cassiano, 15/09/2026,
     3ª rodada). Agora o cliente ESCOLHE quantas cores a peça leva, e o site abre um
     retângulo numerado para cada uma.

     `campos` é quantas cores aquela escolha pede. O Degradê pede ZERO e mostra um aviso:
     o filamento é sazonal, e prometer uma cor que pode não existir no dia da impressão é
     promessa que o CDC cobra depois.

     ⚠️ Ele escreveu "serão 3 opções" e listou QUATRO nomes. Deixei as quatro, porque as
     quatro estão escritas com todas as letras na mensagem dele e porque três delas é que
     pedem cor (o Degradê não pede). Se a intenção era outra, é uma linha aqui. */
  cores_da_peca: {
    titulo: 'Cores da peça',
    opcoes: [
      { id: 'tricolor',      rotulo: 'Tricolor',      campos: 3 },
      { id: 'bicolor',       rotulo: 'Bicolor',       campos: 2 },
      { id: 'monocromatico', rotulo: 'Monocromático', campos: 1 }
      /* ETAPA 52 (23/09/2026, 14:03): Degradê DESCARTADO de todos os comedouros — "vai me dar muita dor de
         cabeça (...) às vezes eu não vou ter o filamento, ele vai ficar chateado". Era:
         { id: 'degrade', rotulo: 'Degradê', campos: 0, aviso: 'Por se tratar de filamentos específicos e sazonais...' } */
    ]
  },

  /* FILAMENTOS À VENDA — a lista que vira as opções de cor da peça (23/09/2026, pedido dele às 13:19).
     -------------------------------------------------------------------------------
     O cliente escolhe o ACABAMENTO (Básico, Fosco, Perolizado) e só então a janela da cor abre,
     com as cores DAQUELE acabamento. Ele vê o nome simples; o PEDIDO que chega pro Cassiano leva
     também o nome ORIGINAL do filamento (regra dele: "pra mim aparece o nome original").
       site ...... o que o cliente lê (português, sem Lite/Basic/Matte/Silk)
       original .. Marca · Tipo · Acabamento · Cor, EXATO como ele falou (nunca normalizar)
     25/09/2026: a LISTA REAL dele substituiu as de teste (ver o bloco `filamentos` abaixo). */
  filamentos: {
    /* LISTA REAL do Cassiano (25/09/2026, audios 1786-1815, tudo PLA; nomes do site trocados por ele na
       msg 1827; sem 4a aba - audio 1830; + Rosa Silk msg 1835; + Preto com Azul msg 5779; + Transparente e Dourado com Glitter msgs 6075/6079). Gerado por 03_site/07_gerar_filamentos_config_v6_transparente_e_glitter_2026-10-04.py
       a partir de 03_site/_LISTA_FILAMENTOS_DELE_2026-09-25.json + _TEXTURAS_FILAMENTO.json - nao editar a mao.
       hex = cor OFICIAL do fabricante; eSUN Silk Lime = aproximado (medido na foto oficial da eSUN).
       v4 (26/09/2026): `textura` = filamento com efeito (Marmore: foto IMG_0039 da Chica), `hex_oficial` =
       o do catalogo quando o hex veio da foto dele, `rugosidade`/`metal` = brilho proprio da cor. */
    basico: [
      { site: 'Laranja', hex: '#FF671F', original: 'Bambu Lab · PLA · Lite · Orange (16301)' },
      { site: 'Vermelho', hex: '#C6001A', original: 'Bambu Lab · PLA · Lite · Red (16200)' },
      { site: 'Amarelo Girassol', hex: '#FFB549', original: 'Bambu Lab · PLA · Lite · Sunflower Yellow (16401)' },
      { site: 'Amarelo', hex: '#EFE255', original: 'Bambu Lab · PLA · Lite · Yellow (16400)' },
      { site: 'Azul Bebê', hex: '#4DAFDA', original: 'Bambu Lab · PLA · Lite · Cyan (16600)' },
      { site: 'Azul', hex: '#004EA8', original: 'Bambu Lab · PLA · Lite · Blue (16601)' },
      { site: 'Verde', hex: '#00BB31', original: 'Bambu Lab · PLA · Lite · Green (16501)' },
      { site: 'Verde Oliva', hex: '#57604A', original: 'eSUN · PLA · Basic · Olive Green', hex_oficial: '#1B1F11' },
      { site: 'Preto', hex: '#272729', original: 'eSUN · PLA · PLA-Basic · Black' },
      { site: 'Roxo', hex: '#603BA0', original: 'Elegoo · PLA · PLA · Purple' },
      { site: 'Marrom', hex: '#5F3839', original: 'Multfila · PLA · Mult Speed · Marrom (PCI-PLA-046)' },
      { site: 'Mármore', hex: '#E4E4E4', original: 'SUNLU · PLA · High Speed Marble · Chestnut Brown Marble', textura: { img: 'img/texturas/marmore.png', mm: [78.2, 39.1], contraste: 1 } },
      { site: 'Transparente', hex: '#EEF2F3', original: 'Elegoo · PETG · PETG · Transparente' },
      { site: 'Dourado com Glitter', hex: '#CEA629', original: 'Bambu Lab · PLA · Sparkle · Classic Gold Sparkle' }
    ],
    fosco: [
      { site: 'Branco', hex: '#F6F6F6', original: 'Elegoo · PLA · Matte · Matte White' },
      { site: 'Amarelo', hex: '#F7D863', original: 'Elegoo · PLA · Matte · Sunshine Yellow' },
      { site: 'Laranja', hex: '#E88F13', original: 'Multfila · PLA · Mult Matte · Laranja (4225-PCI-PLM-060)' },
      { site: 'Rosa Claro', hex: '#F9C2D5', original: 'Elegoo · PLA · Matte · Sakura Pink' },
      { site: 'Bordô', hex: '#80012C', original: 'Multfila · PLA · Mult Matte · Bordô (4225-PCI-PLM-118)', hex_oficial: '#B32563' },
      { site: 'Lilás', hex: '#9D85D1', original: 'Elegoo · PLA · Matte · Lavender Purple' },
      { site: 'Azul Bebê', hex: '#B3F3FD', original: 'Elegoo · PLA · Matte · Ice Blue' },
      { site: 'Azul Marinho', hex: '#1C253B', original: 'Elegoo · PLA · Matte · Navy Blue', hex_oficial: '#2D3F6F' },
      { site: 'Verde Menta', hex: '#DBEBBA', original: 'Elegoo · PLA · Matte · Mint Green' },
      { site: 'Cinza', hex: '#C4C6C8', original: 'Bambu Lab · PLA · Matte · Ash Gray (11102)', hex_oficial: '#9B9EA0' },
      { site: 'Cáqui', hex: '#E8DBB7', original: 'Bambu Lab · PLA · Matte · Desert Tan (11401)' },
      { site: 'Areia', hex: '#CBA881', original: 'Multfila · PLA · Mult Matte · Areia (4225-PCI-PLM-123)' },
      { site: 'Caramelo', hex: '#D3B7A7', original: 'Bambu Lab · PLA · Matte · Latte Brown (11800)' },
      { site: 'Terracota', hex: '#AC7362', original: 'Multfila · PLA · Mult Matte · Marrom Terracota (4225-PCI-PLM-124)' }
    ],
    perolizado: [
      { site: 'Branco', hex: '#FFFFFF', original: 'Elegoo · PLA · Silk · Silk White', rugosidade: 0.2, metal: 0.05 },
      { site: 'Prata', hex: '#C4C3C4', original: 'SUNLU · PLA · Silk PLA+ · Silk Silver', hex_oficial: '#B2C1DA' },
      { site: 'Dourado', hex: '#D09531', original: 'Multfila · PLA · Mult Silk · Ouro Envelhecido (4226-PCI-PLS-048)' },
      { site: 'Laranja', hex: '#F15505', original: 'Voolt3D · PLA · V-Silk · Laranja (PL-LJ-SK-1)' },
      { site: 'Vermelho', hex: '#DA342E', original: 'Multfila · PLA · Mult Silk · Vermelho Metalizado (4226-PCI-PLS-026)' },
      { site: 'Rosa', hex: '#E78498', original: 'eSUN · PLA · PLA-Silk · Pink', hex_oficial: '#FF7F6F' },
      { site: 'Azul Aqua', hex: '#6CCCDD', original: 'eSUN · PLA · Silk · Aqua', hex_oficial: '#6BBFE3', rugosidade: 0.2, metal: 0.18 },
      { site: 'Azul', hex: '#1D87E1', original: 'Multfila · PLA · Mult Silk · Azul Safira Metalizado (4226-PCI-PLS-025)', hex_oficial: '#358AE8' },
      { site: 'Azul Céu', hex: '#1B8DCC', original: 'Voolt3D · PLA · V-Silk · Azul Sky (PL-AZ-SY-SK-1)', hex_oficial: '#035EB7' },
      { site: 'Verde Limão', hex: '#A3E810', original: 'eSUN · PLA · PLA-Silk · Lime' },
      { site: 'Verde', hex: '#129856', original: 'Voolt3D · PLA · V-Silk · Verde (PL-VD-SK-1)' },
      { site: 'Preto com Azul', hex: '#213D4E', original: 'Bambu Lab · PLA · Silk Dual Color · Phantom Blue' }
    ]
  },
  /* O ESTOQUE — peça PRONTA, por produto (03/10/2026, áudios 5727/5729/5731 do Cassiano).
     -------------------------------------------------------------------------------
     Com estoque na cor escolhida o botão diz "Comprar agora"; qualquer outra cor (ou produto sem lista aqui) =
     "Encomendar agora" (produto.js v39). `modo` = id das Cores da peça; `escolhas` = acabamento + cor (nome do site,
     igual ALEA.filamentos), uma por campo; `qtd` = peças prontas. Quem diz o estoque é o Cassiano — nunca inventar.
     ⚠ TESTE DE LAYOUT (áudio 5731: "você coloca que tem isso aí só pra gente ver como vai ficar"): a saboneteira NÃO
       tem peça pronta (áudio 5730). Sai daqui quando ele mandar o estoque de verdade. A azul da foto é o Bambu Lab Silk
       Phantom Blue = "Preto com Azul" no Perolizado (msg 5775, áudios 5777/5779; NÃO era o Azul Safira). */
  estoque: {
    'soap-dish': [
      { modo: 'monocromatico', escolhas: [{ acabamento: 'perolizado', cor: 'Branco' }], qtd: 1 },
      { modo: 'monocromatico', escolhas: [{ acabamento: 'perolizado', cor: 'Rosa' }],   qtd: 1 },
      { modo: 'monocromatico', escolhas: [{ acabamento: 'perolizado', cor: 'Preto com Azul' }], qtd: 1 }
    ]
  },

  /* como cada acabamento aparece (a ordem é a da tela) e o que ele acrescenta ao nome da cor:
     Básico não acrescenta nada ("Azul"); Fosco e Perolizado sim ("Azul Fosco", "Azul Perolizado"). */
  acabamentos: [
    { id: 'basico',     rotulo: 'Clássico',   sufixo: '' },   // 27/09/2026, áudio 2341: "Básico" -> "Clássico" (mais elegante); o id fica 'basico' (a sacola guarda o id) e a cor continua sem sufixo ("Azul")
    { id: 'fosco',      rotulo: 'Fosco',      sufixo: ' Fosco' },
    { id: 'perolizado', rotulo: 'Perolizado', sufixo: ' Perolizado' }
  ],

  /* A JANELA 3D "Personalize aqui" (protótipo, 23/09/2026, áudios dele das 14:27 e 14:30).
     -------------------------------------------------------------------------------
     Por produto (slug): o .glb (a peça do arquivo dele, sem o nome), o _nome.json (onde o nome original estava
     gravado), a fonte da gravação e as cores. `original` é a peça como ele fotografou (nome OFICIAL + código);
     as abas trazem as cores pra trocar. Protótipo: só a aba Fosco, com as 5 que ele escolheu (todas Bambu Lab
     PLA Matte, cor = código oficial do Bambu Studio). Os nomes simples estão PROPOSTOS a ele (msg 547). */
  modelos3d: {
    'bowl-wave': {
      /* 28/09/2026 (áudios do Cassiano ~02:14-02:17, msg 3016 "ALEA Pet Bowl"): o Luke ganhou a LOGO NOVA (ālea & Co. +
         capivara, recorte na cor da parte) e a janela 3D passou a mostrar o tamanho M ("lá na prévia do site pode deixar
         sempre o tamanho M (...) ali é só para ele ter uma noção das cores", áudio 3019).
         M = placa 4 "Tri Color - M", objeto 13 · G = placa 7 "Tri Color - G", objeto 21 (mesmo arquivo).
         Exportados por 07_render_capa/exportar_glb_configurador_v5_booleano_tolerante.py, "1=principal,2=base,3=topo",
         --zonas-por-altura, sem decimar. O arquivo M traz "Cacau" gravado -> nomeInicial 'Luke' (a peça abre como na capa).
         TROCAR PRO G (uma linha cada): glb 'modelos/luke_g.glb?v=2026-09-28b' e nome 'modelos/luke_g_nome.json?v=2026-09-28b'
         (o G novo também tem a logo nova e traz "Luke"; o G antigo, logo antiga, está em 03_site/_versoes_anteriores/tamanhos_antes_2026-09-28/). */
      glb: 'modelos/luke_m.glb?v=2026-09-28b',
      nome: 'modelos/luke_m_nome.json?v=2026-09-28b',
      nomeInicial: 'Luke',
      fonte: 'fonts/defante.otf',
      original: {
        topo:      { site: 'Laranja', hex: '#FF671F', acabamento: 'basico', oficial: 'Bambu Lab · PLA · Lite · Orange (16301)' },
        principal: { site: 'Branco',  hex: '#FFFFFF', acabamento: 'fosco',  oficial: 'Bambu Lab · PLA · Matte · Ivory White (11100)' },
        base:      { site: 'Cinza',   hex: '#C4C6C8', acabamento: 'fosco',  oficial: 'Bambu Lab · PLA · Matte · Ash Gray (11102)' }
      },
      abas: [
        { id: 'original', rotulo: 'Original' },
        { id: 'fosco', rotulo: 'Fosco', cores: [
          { site: 'Amarelo',     hex: '#F7D959', oficial: 'Bambu Lab · PLA · Matte · Lemon Yellow (11400)' },
          { site: 'Rosa',        hex: '#E8AFCF', oficial: 'Bambu Lab · PLA · Matte · Sakura Pink (11201)' },
          { site: 'Azul Claro',  hex: '#A3D8E1', oficial: 'Bambu Lab · PLA · Matte · Ice Blue (11601)' },
          { site: 'Azul Escuro', hex: '#042F56', oficial: 'Bambu Lab · PLA · Matte · Dark Blue (11602)' },
          { site: 'Terracota',   hex: '#B15533', oficial: 'Bambu Lab · PLA · Matte · Terracotta (11203)' }
        ] }
      ]
    }
  },

  /* Onde entrega. "a combinar" faz o site dizer "consulte o frete" em vez de prometer
     entrega que não existe.
     ⚠️ A palavra "frete" saiu de perto do preço por pedido dele (15/09/2026). Ela
     continua existindo AQUI e na página de trocas e entrega, porque o CDC exige que o
     custo do frete seja informado antes da compra — só não fica mais colada no valor. */
  entrega: 'Jataí-GO com entrega local; demais cidades por transportadora, frete a combinar'
};

/* 25/09/2026 (lote das 20:01, msgs 1847-1848): o "ālea Luke Bowl" é a peça do arquivo 3D do Luke — o MESMO
   luke_g.glb que a janela "Personalize aqui" do antigo Bowl Wave já usava (o Cassiano: "o do Luke eu já tenho, é o
   único que tenho"). A página nova (produto-luke-bowl.html) ganha a mesma janela 3D sem copiar a configuração:
   é a mesma peça, uma configuração só. Matteo, Ayla e Cláudia não têm .glb ainda -> formulário na própria página. */
/* FRASE DAS CORES DA PEÇA (msg 2268 do Cassiano, 27/09/2026, texto EXATO): vai bem pequena entre o título "Cores da
   peça" e as opções Tricolor/Bicolor/Monocromático, em todos os produtos (produto.js v31). Trocar AQUI. */
window.ALEA.fraseCoresDaPeca = 'Qualquer dúvida, nas fotos em tela cheia, você encontra os nomes e as tonalidades reais de cada cor.';
window.ALEA.modelos3d['luke-bowl'] = window.ALEA.modelos3d['bowl-wave'];
/* COR DA CAPA (áudio 2253 do Cassiano, 27/09/2026): cores da foto lukebowl_capa — tricolor: topo Laranja (Básico),
   corpo Branco (Fosco), base Cinza (Fosco). A peça 3D já abria nelas (`original`).
   02/10/2026 (print 5275 + áudio 5277): o formulário do Personalize ABRE MARCADO nelas (produto.js v38) — era "começa
   VAZIO" (áudio 2263, revertido por ele).
   COR DO NOME DA CAPA (print 5278 + áudio 5279, 02/10/2026) — campo OPCIONAL `nome` dentro de `capa`:
     capa: { modo: ..., escolhas: [...], nome: { acabamento: 'fosco', cor: 'Azul' } }
   acabamento = 'basico' | 'fosco' | 'perolizado'; cor = o nome simples da lista do site (ALEA.filamentos) daquele
   acabamento. Só se a peça da CAPA tem o nome PINTADO numa cor; aí a "Cor do nome" já aparece nela, apagada, até o
   cliente marcar "Um detalhe que transforma". Nome na cor do corpo (Luke) = SEM `nome`. Nunca preencher por palpite:
   a cor vem do Cassiano. */
window.ALEA.modelos3d['luke-bowl'].capa = { modo: 'tricolor', escolhas: [
  { acabamento: 'basico', cor: 'Laranja' }, { acabamento: 'fosco', cor: 'Branco' }, { acabamento: 'fosco', cor: 'Cinza' }] };

/* 26/09/2026 (pedido do Cassiano: "o Matteo e a Cláudia iguais ao Luke"): as duas ganham a janela 3D "Personalize aqui",
   cada uma com o SEU arquivo. A Ayla fica sem (áudio 1864: peça sem personalização).
   Os .glb saem do 07_render_capa/exportar_glb_configurador_v3_varias_partes_e_logo.py, SEM decimar (alvo 999999):
   decimado a 16-20 mil faces, a divisa das cores virava serrote e o Matteo perdia a forma (visto em 26/09).
   `original` = as cores que o PRÓPRIO arquivo 3D dele traz (project_settings do .3mf), com o nome oficial do filamento.
   Os campos novos (zonaNome, bicolor, fonteInvertida, nomeInicial) estão explicados no personalizar3d.js v7. */
window.ALEA.modelos3d['matteo-texturized'] = {
  /* 28/09/2026 (áudio 01:17 do Cassiano, "o Personalize aqui do Elevated Pet Bowl Texturized, que é o do Matteo", msg 2979):
     o arquivo NOVO dele (corpo novo, logo nova ālea & Co.). A msg 2979 é byte a byte o arquivo que ele mandou às 00:00
     (msg 2940); o que ele IMPRIME é a versão com a logo no padrão que ele aprovou ("perfeito", áudio 2948):
     05_bambu/elevated_2026-09-27/"ALEA Elevated Dog Bowl Texturized v1 logo padrao.3mf", objeto 4 (placa "G").
     Zonas: extrusora 1 = topo (onde o nome e a logo estão), 2 = base (pintada até ~44 mm).
     Exportado por 07_render_capa/exportar_glb_configurador_v5_booleano_tolerante.py (sem decimar).
     ANTES (26/09): 13_lote_2026-09-25_2001/02_ALEA Matteo Texturized_msg1851.zip, objeto 5 (placa "P"), logo antiga.
     ?v= força o navegador a baixar o arquivo novo (o nome do arquivo não mudou). */
  /* 28/09/2026 02:17 (áudio 3019): a janela 3D mostra o tamanho MENOR do arquivo, placa 1 "P", objeto 6 (mesmo arquivo,
     mesma logo, exportador v5). TROCAR PRO G (uma linha cada): 'modelos/matteo_g.glb?v=2026-09-28' e
     'modelos/matteo_g_nome.json?v=2026-09-28' (placa 2 "G", objeto 4). */
  glb: 'modelos/matteo_p.glb?v=2026-09-28b',
  nome: 'modelos/matteo_p_nome.json?v=2026-09-28b',
  /* o arquivo grava o nome em Arial; no site vai a Arimo (licença livre SIL OFL 1.1, em fonts/arimo_LICENSE.txt; mesma medida de letra da Arial) */
  fonte: 'fonts/arimo.ttf',
  fonteInvertida: false,
  zonaNome: 'topo',
  /* 26/09/2026 (vídeos dele msgs 2067-2068: "o do Matteo é texturizado (...) lá na pré-visualização ele já tem que
     estar com essa textura"): a PELE FELPUDA que o fatiador aplica em TODAS as paredes. Não é forma do arquivo (a
     malha é lisa); é ajuste do projeto, copiado do .3mf (Metadata/project_settings.config): fuzzy_skin = allwalls,
     modo displacement, ruído billow, 4 oitavas, persistência 0,5, escala 1 mm, espessura 0,2 mm, pontos a cada 0,8 mm.
     Conferido no G-code fatiado (07_render_capa/textura_2026-09-26/fatiado): a parede externa foge da lisa até
     +0,35-0,37 mm, com um ponto a cada 0,85-0,88 mm. A janela 3D desenha o relevo na luz (sem peso de malha). */
  pele: { ruido: 'billow', oitavas: 4, persistencia: 0.5, escalaMm: 1, espessuraMm: 0.2 },
  /* COR DA CAPA (áudio 2253, 27/09/2026): cores da foto matteotex_capa — topo preto, base cáqui (as mesmas do `original`,
     que já batiam com a capa). A peça abre no `original` e, desde 02/10/2026 (áudio 5277), o formulário abre marcado
     nesta `capa` (produto.js v38). Sem `nome`: a cor do nome da capa não foi informada (ver o bloco do Luke). */
  capa: { modo: 'bicolor', escolhas: [{ acabamento: 'basico', cor: 'Preto' }, { acabamento: 'fosco', cor: 'Cáqui' }] },
  /* só bicolor e monocromático (áudio 1863). Bicolor: cor 1 = topo, cor 2 = base. */
  bicolor: { topo: 0, principal: 0, base: 1 },
  original: {
    topo:      { site: 'Preto', hex: '#000000', acabamento: 'basico', oficial: 'Bambu Lab · PLA · Lite · Black' },
    principal: { site: 'Preto', hex: '#000000', acabamento: 'basico', oficial: 'Bambu Lab · PLA · Lite · Black' },
    base:      { site: 'Cáqui', hex: '#E8DBB7', acabamento: 'fosco',  oficial: 'Bambu Lab · PLA · Matte · Desert Tan (11401)' }
  }
};
window.ALEA.modelos3d['claudia-wave'] = {
  /* 28/09/2026 (áudio 01:17 do Cassiano, "o Personalize aqui do Wave", msg 2977): a msg 2977 é o MESMO projeto da
     msg 1859 (todos os arquivos internos iguais), ainda com a logo ANTIGA. O que ele imprime é a versão com a logo nova
     aprovada em 27/09: 05_bambu/logo_wave_2026-09-27/"ALEA Dog Bowl Wave v3 logo em todas.3mf", objeto 32 (placa
     "Wave - G"; mesma malha, mesmas cores, só a logo trocada). Exportado pelo exportar_glb_configurador_v5.
     Zonas: extrusora 3 = topo (o aro), 1 = principal (o corpo, onde o nome e a logo estão), 2 = base (a onda).
     ANTES (26/09): 13_lote_2026-09-25_2001/04_ALEA Claudia Wave_separados/ALEA Cláudia Wave_msg1859.3mf, obj 32. */
  /* 28/09/2026 02:17 (áudio 3019): a janela 3D mostra o tamanho MENOR do arquivo, placa 2 "Wave Tri - P", objeto 5 (mesmas
     partes top/bottom, mesma logo nova, exportador v5). TROCAR PRO G (uma linha cada): 'modelos/claudia_g.glb?v=2026-09-28'
     e 'modelos/claudia_g_nome.json?v=2026-09-28' (placa 10 "Wave - G", objeto 32). */
  glb: 'modelos/claudia_p.glb?v=2026-09-28b',
  nome: 'modelos/claudia_p_nome.json?v=2026-09-28b',
  fonte: 'fonts/defante.otf',
  /* o arquivo traz "Chica" (a cachorrinha das fotos); a peça se chama Cláudia, e o mesmo arquivo tem "Cláudia" no objeto 20 */
  nomeInicial: 'Cláudia',
  /* bicolor como ele imprime (foto claudiawave_capa): cor 1 = aro e corpo, cor 2 = a onda de baixo */
  bicolor: { topo: 0, principal: 0, base: 1 },
  /* COR DA CAPA (áudio 2253 do Cassiano, 27/09/2026): "o comedouro tem que ficar na COR DA CAPA quando abre a
     personalização. A capa da Cláudia é bicolor: BRANCO PEROLIZADO com AQUA PEROLIZADO". A peça abre assim (aro e
     corpo = cor 1, a onda = cor 2, como na foto claudiawave_capa). Desde 02/10/2026 (áudio 5277) o formulário abre
     marcado nesta `capa` (produto.js v38; era "começa VAZIO", áudio 2263). Sem `nome`: a cor do nome da capa não foi
     informada (ver o bloco do Luke).
     ANTES: as cores que o .3mf trazia — aro Vermelho (Bambu PLA Lite Red), corpo Mármore, onda Azul Silk. O aro
     vermelho parecia "solto" em cima da peça: medido no .glb, ele ENCOSTA no corpo (corpo até y 120,3 mm, aro de
     120,2 a 136,3 mm, os dois com raio 82-88 mm) — era só a cor diferente, que não existe na peça da capa. */
  original: {
    topo:      { site: 'Branco',    hex: '#FFFFFF', acabamento: 'perolizado', oficial: 'Elegoo · PLA · Silk · Silk White' },
    principal: { site: 'Branco',    hex: '#FFFFFF', acabamento: 'perolizado', oficial: 'Elegoo · PLA · Silk · Silk White' },
    base:      { site: 'Azul Aqua', hex: '#6CCCDD', acabamento: 'perolizado', oficial: 'eSUN · PLA · Silk · Aqua' }
  },
  /* COR DO NOME DA CAPA (msg 5284 do Cassiano, 02/10/2026: "Claudia Elegoo Silk Gold"): o nome da Cláudia é pintado em
     Elegoo · PLA · Silk · Gold = "Dourado Perolizado" no site (tabela de nomes, áudio 2293). Matteo: "não tem". */
  capa: { modo: 'bicolor', escolhas: [{ acabamento: 'perolizado', cor: 'Branco' }, { acabamento: 'perolizado', cor: 'Azul Aqua' }],
          nome: { acabamento: 'perolizado', cor: 'Dourado' } }
};
/* 03/10/2026 (áudios 5800/5801 do Cassiano: "aquela animação igual dos comedouros (...) ao invés de você colocar
   monocromático, você vai colocar personalize agora (...) a peça lá em 3D do arquivo que eu mandei"): a ālea Soap Dish
   ganha a janela 3D. O .glb sai de 32_produtos_novos_2026-10-03/soap_dish/"ALEA Soap Dish.3mf", objeto 3, pelo
   07_render_capa/exportar_glb_configurador_v6_peca_sem_nome_deitada.py ("1=principal", 80000 faces, --deitar +x):
   a peça DEITADA como se usa (ondas pra cima), a logo Circular NEGATIVA no fundo (0,5 mm, recorte na cor da peça, nunca
   pintada), os 4 furos dos pés. Uma zona só: 'principal' (topo/base iguais, só existem porque a janela pede as 3).
   `semNome` (personalizar3d.js v13): sem nome gravado (msg 5771) — a janela não baixa _nome.json nem fonte.
   `rotuloBotao` (produto.js v40): o botão diz "Personalize agora", palavra dele (os comedouros seguem "Personalize aqui").
   CAPA: a foto soapdish_capa tem as 3 peças (Rosa, Preto com Azul e Branco). A peça abre em BRANCO PEROLIZADO (Elegoo
   Silk White, a da foto 2620) — escolha da casa, a confirmar com ele. */
window.ALEA.modelos3d['soap-dish'] = {
  glb: 'modelos/soapdish.glb?v=2026-10-03',
  semNome: true,
  rotuloBotao: 'Personalize agora',
  folgaEnquadrar: 1.1,   // personalizar3d v13: larga e baixa, com 0,82 (o do comedouro) saía cortada dos lados
  capa: { modo: 'monocromatico', escolhas: [{ acabamento: 'perolizado', cor: 'Branco' }] },
  original: {
    topo:      { site: 'Branco', hex: '#FFFFFF', acabamento: 'perolizado', oficial: 'Elegoo · PLA · Silk · Silk White' },
    principal: { site: 'Branco', hex: '#FFFFFF', acabamento: 'perolizado', oficial: 'Elegoo · PLA · Silk · Silk White' },
    base:      { site: 'Branco', hex: '#FFFFFF', acabamento: 'perolizado', oficial: 'Elegoo · PLA · Silk · Silk White' }
  }
};
/* 04/10/2026 — ālea Ephix Vase (msgs 6008-6030 do Cassiano): a mesma janela 3D "Personalize agora" da saboneteira.
   O .glb sai de 33_produtos_novos_2026-10-04/IMG_2651/"ALEA Ephix Vase.3mf", objeto 3, pelo
   07_render_capa/exportar_glb_configurador_v6_peca_sem_nome_deitada.py ("1=principal", 40000 faces, EM PÉ como se usa)
   e depois pelo 07_render_capa/glb_modo_vaso_oco_v1.py: o arquivo é MODO VASO (spiral_mode=1, 1 parede, 0%, sem topo),
   então a peça que sai do fatiador é OCA e de BOCA ABERTA, com parede de 0,42 mm (regra 3.1.3: "a peça como sai do
   fatiador"). A logo NEGATIVA fica no fundo (0,46 mm, recorte na cor da peça). Abre em BRANCO PEROLIZADO = o filamento
   dele (Elegoo Silk White, msg 6018). Sem nome gravado (`semNome`). */
window.ALEA.modelos3d['ephix-vase'] = {
  glb: 'modelos/ephixvase.glb?v=2026-10-04',
  semNome: true,
  rotuloBotao: 'Personalize agora',
  capa: { modo: 'monocromatico', escolhas: [{ acabamento: 'perolizado', cor: 'Branco' }] },
  original: {
    topo:      { site: 'Branco', hex: '#FFFFFF', acabamento: 'perolizado', oficial: 'Elegoo · PLA · Silk · Silk White' },
    principal: { site: 'Branco', hex: '#FFFFFF', acabamento: 'perolizado', oficial: 'Elegoo · PLA · Silk · Silk White' },
    base:      { site: 'Branco', hex: '#FFFFFF', acabamento: 'perolizado', oficial: 'Elegoo · PLA · Silk · Silk White' }
  }
};

/* 04/10/2026 — ālea Vase Prismatic (msgs 6048-6096 do Cassiano): a mesma janela 3D "Personalize agora" do Ephix Vase.
   O .glb sai do 3MF que ELE fez (msg 6064, "usa esse"): 33_produtos_novos_2026-10-04/vase_prismatic/"ALEA Vase Prismatic 6064.3mf",
   objeto 3 (TESSURA vase.stl), pelo 07_render_capa/exportar_glb_configurador_v6_peca_sem_nome_deitada.py ("1=principal",
   40000 faces, EM PÉ como se usa). NÃO é modo vaso (spiral_mode 0, 2 paredes, 15%): o STL já tem a cavidade, a boca sai
   aberta sem o glb_modo_vaso_oco. A Logo Circular NEGATIVA fica no fundo (0,5 mm, recorte na cor da peça, medido no GLB:
   raio até 32,5 mm). Abre em MÁRMORE (a 1ª foto de perto, msg 6049). Sem nome gravado (`semNome`). */
window.ALEA.modelos3d['vase-prismatic'] = {
  glb: 'modelos/vaseprismatic.glb?v=2026-10-04',
  semNome: true,
  rotuloBotao: 'Personalize agora',
  capa: { modo: 'monocromatico', escolhas: [{ acabamento: 'basico', cor: 'Mármore' }] },
  original: {
    topo:      { site: 'Mármore', hex: '#E4E4E4', acabamento: 'basico', oficial: 'SUNLU · PLA · High Speed Marble · Chestnut Brown Marble' },
    principal: { site: 'Mármore', hex: '#E4E4E4', acabamento: 'basico', oficial: 'SUNLU · PLA · High Speed Marble · Chestnut Brown Marble' },
    base:      { site: 'Mármore', hex: '#E4E4E4', acabamento: 'basico', oficial: 'SUNLU · PLA · High Speed Marble · Chestnut Brown Marble' }
  }
};

/* TAMANHOS À VENDA (28/09/2026, áudios do Cassiano ~02:14-02:17: "pra Shih Tzu e pra Golden é diferente o tamanho (...)
   arrumar uma opção lá no site"). A página ganha o grupo "Tamanho" (produto.js v36) logo acima do "Personalize aqui";
   escolher é OBRIGATÓRIO e o tamanho vai no item da sacola, no Resumo do Pedido e na mensagem do pedido ("Tamanho: M").
   O rótulo saiu do ARQUIVO dele (nome da placa no Bambu Studio):
     luke-bowl ......... msg 3016 "ALEA Pet Bowl": "Tri Color - M" (placa 4) e "Tri Color - G" (placa 7)
     matteo-texturized . "ALEA Elevated Dog Bowl Texturized v1 logo padrao": placa 1 (escrita "P") e "G" (placa 2)
     claudia-wave ...... "ALEA Dog Bowl Wave v3 logo em todas": placa 2 (escrita "Wave Tri - P") e "Wave - G" (placa 10)
   ⚠ 28/09/2026 02:44, áudio 3033 do Cassiano: "eu escrevi errado, todos são M e G, não tem P". O "P" das placas do
     Elevated e do Wave foi ERRO DE DIGITAÇÃO dele: o menor dos 3 é M. O cliente vê M/G nas 3 peças. Os arquivos .glb
     continuam com o nome antigo (matteo_p.glb, claudia_p.glb) — é nome de arquivo, o cliente não vê.
   A janela 3D NÃO troca de tamanho (áudio 3019): é só pra ver as cores. PREÇO por tamanho: não existe aqui (as 3 peças
   estão "Sob consulta"); se um dia o G custar mais, é decisão do Cassiano/Lázaro e entra como campo novo, não aqui.
   Produto fora desta lista = sem o grupo Tamanho (nada muda na página). */
window.ALEA.tamanhos = {
  'luke-bowl':         ['M', 'G'],
  'matteo-texturized': ['M', 'G'],   // era ['P','G'] até o áudio 3033
  'claudia-wave':      ['M', 'G'],   // era ['P','G'] até o áudio 3033
  /* POR FORMATO (04/10/2026, áudio 6228: "o Orbis vai ser mini e pequeno e o Quadrum vai ser pequeno e grande"; 6229: o
     Tamanho só aparece depois do Formato). Lista simples = vale pra qualquer formato; objeto = a lista de cada formato. */
  'stria-planter':     { Orbis: ['Mini', 'Pequeno'], Quadrum: ['Pequeno', 'Grande'] }
};
/* PREÇO POR ESCOLHA (04/10/2026, áudio 6234 do Cassiano): produto com variantes de preço diferente. A chave é
   'Formato|Tamanho' (a mesma do glbPorEscolha). Antes da escolha, a página e o feed mostram "a partir de" + o MENOR preço
   preenchido; escolhido, a página mostra o preço daquela escolha (em cima e logo acima de "Encomendar agora", 6237).
   null = ainda sem preço ("Sob consulta"). Os valores vêm DELE — nunca preencher por conta própria. */
window.ALEA.precoPorEscolha = {
  // msg 6250 do Cassiano (04/10/2026 17:51): "Stria Orbis Mini 79,00 · P 169,00 · Stria Quadrum P 189,00 · G 289,00"
  'stria-planter': { 'Orbis|Mini': 79, 'Orbis|Pequeno': 169, 'Quadrum|Pequeno': 189, 'Quadrum|Grande': 289 },
  /* v45 — msg 6255 do Cassiano (04/10/2026 18:08): "Pet Bowl Matteo 149,00 179,00 / Ayla 299,00 / Luke 149,00 189,00 /
     Claudia 169,00 219,00" (+ Caesar 149/179 e Poop Bag 79, que NÃO entram: Caesar ainda não tem página, 6256; Poop Bag
     fica fora, 6258). 1º valor = M, 2º = G. Sem Formato, a chave é só o tamanho; sem tamanho (Ayla), a chave é ''. */
  'luke-bowl':         { 'M': 149, 'G': 189 },
  'matteo-texturized': { 'M': 149, 'G': 179 },
  'claudia-wave':      { 'M': 169, 'G': 219 },
  'ayla-pompom':       { '': 299 }
};
/* PARCELAMENTO (04/10/2026, áudio 6237: "10 vezes de tanto, o valor da parcela" embaixo do preço). Regra DELE, perguntada
   na msg 6245: { vezes: 10, minimo: 30 } = "ou até 10x de R$ X sem juros", com a parcela nunca abaixo de R$ 30 (o número de
   vezes cai até caber). null = a linha não aparece. */
window.ALEA.parcelamento = null;
/* FORMATOS À VENDA (04/10/2026, ālea Stria Planter, msgs 6122/6124 "ālea Stria Planter — Orbis e Quadrum"): o grupo
   "Formato" (produto.js v42) logo ACIMA do Tamanho, mesma trava (obrigatório) e vai no pedido ("Formato: Orbis"). */
window.ALEA.formatos = {
  'stria-planter': ['Orbis', 'Quadrum']
};

/* 04/10/2026 — ālea Stria Planter (msgs 6122-6148 do Cassiano). UMA PEÇA 3D POR ESCOLHA (áudio 6127: "se ela colocou o
   Orbis pequeno (...) na hora que ela clicar e personalizar, você vai puxar somente aquela escolha dela"; "não quero que você
   mostre ele desmontado"). Os 4 .glb saem do 3MF DELE (msg 6126, "ALEA Stria Planter.3mf") pelo
   33_produtos_novos_2026-10-04/stria_planter/montar_stria_v2_duas_zonas_fora_e_dentro.py: corpo + 4 pés nos 4 furos do fundo
   (Orbis P = pé da placa 1; os outros = "leg normal fit" da placa 6, áudio 6129) + vaso interno dentro (+ divisória no Quadrum G),
   logo negativa do fundo recortada. Orbis P = placa 1 · Orbis G = placa 2 · Quadrum P = placa 3 · Quadrum G = placas 4+5.
   DUAS CORES SÓ (áudios 6135/6136/6138): EXTERIOR = o corpo listrado (zona principal); INTERIOR = vaso interno + pés + divisória
   (zona topo) — "o pezinho tem que ser a mesma cor da parte interna", sem Monocromático. Abre na cor das fotos (msg 6148):
   Exterior Mármore (SUNLU Marble Chestnut Brown), Interior Cáqui (Bambu Matte Desert Tan). Sem nome gravado. */
window.ALEA.modelos3d['stria-planter'] = {
  glb: 'modelos/stria_orbis_p.glb?v=2026-10-04',
  glbPorEscolha: {
    'Orbis|Mini':      'modelos/stria_orbis_p.glb?v=2026-10-04',   // v44: o Orbis P de antes virou Mini (6231)
    'Orbis|Pequeno':   'modelos/stria_orbis_g.glb?v=2026-10-04',   // v44: o Orbis G de antes virou Pequeno (6231)
    'Quadrum|Pequeno': 'modelos/stria_quadrum_p.glb?v=2026-10-04',
    'Quadrum|Grande':  'modelos/stria_quadrum_g.glb?v=2026-10-04'
  },
  semNome: true,
  soUmModo: true,
  partesCor: { 2: ['Exterior', 'Interior'] },
  bicolor: { principal: 0, topo: 1, base: 0 },   // 1ª caixa (Exterior) = corpo; 2ª (Interior) = vaso interno, pés e divisória
  rotuloBotao: 'Personalize agora',
  folgaEnquadrar: 1.1,
  capa: { modo: 'bicolor', escolhas: [{ acabamento: 'basico', cor: 'Mármore' }, { acabamento: 'fosco', cor: 'Cáqui' }] },
  original: {
    topo:      { site: 'Cáqui',   hex: '#E8DBB7', acabamento: 'fosco',  oficial: 'Bambu Lab · PLA · Matte · Desert Tan (11401)' },
    principal: { site: 'Mármore', hex: '#E4E4E4', acabamento: 'basico', oficial: 'SUNLU · PLA · High Speed Marble · Chestnut Brown Marble' },
    base:      { site: 'Mármore', hex: '#E4E4E4', acabamento: 'basico', oficial: 'SUNLU · PLA · High Speed Marble · Chestnut Brown Marble' }
  }
};
/* A LOGO NUNCA É PINTADA (Cassiano, 28/09/2026 ~02:16: "a logo nunca vai ser pintada. Sempre baixo-relevo (...) a nossa logo
   não muda de cor, não muda de formato, nada"). Conferido no personalizar3d.js v11: a logo está DENTRO do .glb, como parte
   da malha de cada zona (o exportador põe as paredes da gravação na zona da parede em volta), então ela só pega a cor da
   PARTE onde está. O "Um detalhe que transforma" (nome colorido) pinta SÓ o material da letra do nome (matLetra: o corte
   do nome gravado ao vivo + a letra preenchida) — nunca a logo. Não há opção no site que mexa na logo. */

/* FILAMENTOS DE CADA FOTO — aparecem SÓ com a foto em TELA CHEIA, no canto de baixo à direita (produto.js v32, 27/09/2026).
   É PALPITE da casa, olhando as fotos: o Cassiano corrige a lista aqui (um filamento por linha, de CIMA pra BAIXO na
   peça, nome EXATO como na lista dele ou como ele confirmou, ex.: Ivory White, Silk Yellow Green, Charcoal). Foto sem
   linha ou com [] = nada aparece. A chave é o caminho da foto grande.
   Origem: 03_site/_FILAMENTOS_POR_FOTO_PALPITE_2026-09-27.json (com a confiança e o motivo de cada palpite). */
/* O QUE O CLIENTE LÊ na tela cheia (27/09/2026, áudio 2295 do Cassiano): "aqueles códigos, aquela nomenclatura é só entre
   eu e você. Entre o cliente e a foto vai ter que ser os nomes lá da personalização. Básico, fosco, perolizado e os nomes
   em português." A lista abaixo guarda o nome ORIGINAL (pra ele); o produto.js mostra o nome da personalização
   (cor + sufixo do acabamento, ex.: "Cinza Fosco"). Filamento que NÃO está à venda cai aqui, com o nome em português: */
window.ALEA.filamentosNomeCliente = {
  "Bambu Lab · PLA · Matte · Ivory White": "Branco Fosco",                          // À VENDA (é o Branco fosco, 11100 — áudio 2332); fica aqui só pra casar o nome sem código
  "Bambu Lab · PLA · Matte · Charcoal": "Preto Fosco",                              // ele: Charcoal = "Preto"
  "Fulljoy · PLA · Silk · Yellow Green": "Verde e Amarelo Perolizado",              // dual color verde+amarelo
  "Elegoo · PLA · Silk · Gold": "Dourado Perolizado",                               // áudio 2293
  "Multfila · PLA · Silk Dual Color · Dourado e Vermelho": "Dourado e Vermelho Perolizado", // áudio 2290
  "Elegoo · PLA · Silk Dual Color · Black Purple": "Preto e Roxo Perolizado"        // áudio 2292
};
window.ALEA.filamentosPorFoto = {
  "img/produtos/lukebowl_capa.jpg": ["Bambu Lab · PLA · Lite · Orange (16301)", "Bambu Lab · PLA · Matte · Ivory White", "Bambu Lab · PLA · Matte · Ash Gray (11102)"],
  "img/produtos/lukebowl_0005.jpg": ["Bambu Lab · PLA · Lite · Orange (16301)", "Bambu Lab · PLA · Matte · Ivory White", "Bambu Lab · PLA · Matte · Ash Gray (11102)"],
  "img/produtos/lukebowl_9148.jpg": ["Bambu Lab · PLA · Lite · Orange (16301)", "Bambu Lab · PLA · Matte · Ivory White", "Bambu Lab · PLA · Matte · Ash Gray (11102)"],
  "img/produtos/lukebowl_9170.jpg": ["Bambu Lab · PLA · Lite · Orange (16301)", "Bambu Lab · PLA · Matte · Ivory White", "Bambu Lab · PLA · Matte · Ash Gray (11102)"],
  "img/produtos/lukebowl_wa182751.jpg": ["Bambu Lab · PLA · Matte · Latte Brown (11800)", "SUNLU · PLA · High Speed Marble · Chestnut Brown Marble", "Multfila · PLA · Mult Speed · Marrom (PCI-PLA-046)"],
  "img/produtos/lukebowl_wa182753.jpg": ["Bambu Lab · PLA · Matte · Latte Brown (11800)", "SUNLU · PLA · High Speed Marble · Chestnut Brown Marble", "Multfila · PLA · Mult Speed · Marrom (PCI-PLA-046)"],
  "img/produtos/lukebowl_wa183050.jpg": ["Bambu Lab · PLA · Matte · Latte Brown (11800)", "SUNLU · PLA · High Speed Marble · Chestnut Brown Marble", "Multfila · PLA · Mult Speed · Marrom (PCI-PLA-046)"],
  "img/produtos/lukebowl_9185.jpg": ["Bambu Lab · PLA · Lite · Orange (16301)", "Bambu Lab · PLA · Matte · Ivory White", "Bambu Lab · PLA · Matte · Ash Gray (11102)"],
  "img/produtos/lukebowl_9189.jpg": ["Bambu Lab · PLA · Lite · Orange (16301)", "Bambu Lab · PLA · Matte · Ivory White", "Bambu Lab · PLA · Matte · Ash Gray (11102)"],
  "img/produtos/lukebowl_0241.jpg": ["Fulljoy · PLA · Silk · Yellow Green"],
  "img/produtos/lukebowl_9291.jpg": ["Fulljoy · PLA · Silk · Yellow Green"],
  "img/produtos/lukebowl_9295.jpg": ["Fulljoy · PLA · Silk · Yellow Green"],
  "img/produtos/lukebowl_9304.jpg": ["Fulljoy · PLA · Silk · Yellow Green"],
  "img/produtos/lukebowl_9307.jpg": ["Fulljoy · PLA · Silk · Yellow Green"],
  "img/produtos/lukebowl_9312.jpg": ["Fulljoy · PLA · Silk · Yellow Green"],
  "img/produtos/lukebowl_9313.jpg": ["Fulljoy · PLA · Silk · Yellow Green"],
  "img/produtos/lukebowl_9318.jpg": ["Fulljoy · PLA · Silk · Yellow Green"],
  "img/produtos/matteotex_capa.jpg": ["Bambu Lab · PLA · Matte · Charcoal", "Bambu Lab · PLA · Matte · Desert Tan (11401)"],
  "img/produtos/matteotex_0094.jpg": ["Bambu Lab · PLA · Matte · Charcoal", "Bambu Lab · PLA · Matte · Desert Tan (11401)"],
  "img/produtos/matteotex_9202.jpg": ["Bambu Lab · PLA · Matte · Charcoal", "Bambu Lab · PLA · Matte · Desert Tan (11401)"],
  "img/produtos/matteotex_9220.jpg": ["Bambu Lab · PLA · Matte · Charcoal", "Bambu Lab · PLA · Matte · Desert Tan (11401)"],
  "img/produtos/matteotex_9240.jpg": ["Bambu Lab · PLA · Matte · Charcoal", "Bambu Lab · PLA · Matte · Desert Tan (11401)"],
  "img/produtos/matteotex_9255.jpg": ["Bambu Lab · PLA · Matte · Charcoal", "Bambu Lab · PLA · Matte · Desert Tan (11401)"],
  "img/produtos/matteotex_9262.jpg": ["Bambu Lab · PLA · Matte · Charcoal", "Bambu Lab · PLA · Matte · Desert Tan (11401)"],
  "img/produtos/aylapompom_capa.jpg": ["Bambu Lab · PLA · Lite · Red (16200)", "eSUN · PLA · PLA-Basic · Black", "Elegoo · PLA · Matte · Matte White", "Voolt3D · PLA · V-Silk · Verde (PL-VD-SK-1)"],
  "img/produtos/aylapompom_0145.jpg": ["Bambu Lab · PLA · Lite · Red (16200)", "eSUN · PLA · PLA-Basic · Black", "Elegoo · PLA · Matte · Matte White", "Voolt3D · PLA · V-Silk · Verde (PL-VD-SK-1)"],
  "img/produtos/aylapompom_9120.jpg": ["Bambu Lab · PLA · Lite · Red (16200)", "eSUN · PLA · PLA-Basic · Black", "Elegoo · PLA · Matte · Matte White", "Voolt3D · PLA · V-Silk · Verde (PL-VD-SK-1)"],
  "img/produtos/aylapompom_9737.jpg": ["Bambu Lab · PLA · Lite · Red (16200)", "eSUN · PLA · PLA-Basic · Black", "Elegoo · PLA · Matte · Matte White", "Voolt3D · PLA · V-Silk · Verde (PL-VD-SK-1)"],
  "img/produtos/aylapompom_9859.jpg": ["Bambu Lab · PLA · Lite · Red (16200)", "eSUN · PLA · PLA-Basic · Black", "Elegoo · PLA · Matte · Matte White", "Voolt3D · PLA · V-Silk · Verde (PL-VD-SK-1)"],
  "img/produtos/aylapompom_9931.jpg": [],
  "img/produtos/aylapompom_9935.jpg": [],
  "img/produtos/claudiawave_capa.jpg": ["Elegoo · PLA · Silk · Silk White", "Elegoo · PLA · Silk · Gold", "eSUN · PLA · Silk · Aqua"],
  "img/produtos/claudiawave_anjo.jpg": ["Elegoo · PLA · Silk · Silk White", "Elegoo · PLA · Silk · Gold", "eSUN · PLA · Silk · Aqua"],   // 27/09 capa homenagem (msg 2362): PALPITE = mesmas cores da capa antiga; perguntado a ele
  "img/produtos/claudiawave_0039.jpg": ["Elegoo · PLA · Matte · Sakura Pink", "SUNLU · PLA · High Speed Marble · Chestnut Brown Marble", "Bambu Lab · PLA · Lite · Cyan (16600)"],
  "img/produtos/claudiawave_0196.jpg": ["Multfila · PLA · Silk Dual Color · Dourado e Vermelho", "Elegoo · PLA · Silk Dual Color · Black Purple"],
  "img/produtos/claudiawave_9569.jpg": ["Elegoo · PLA · Silk · Silk White", "Elegoo · PLA · Silk · Gold", "eSUN · PLA · Silk · Aqua"],
  "img/produtos/claudiawave_9590.jpg": ["Elegoo · PLA · Silk · Silk White", "Elegoo · PLA · Silk · Gold", "eSUN · PLA · Silk · Aqua"],
  "img/produtos/claudiawave_9676.jpg": ["Multfila · PLA · Silk Dual Color · Dourado e Vermelho", "Elegoo · PLA · Silk Dual Color · Black Purple"],
  "img/produtos/claudiawave_9698.jpg": ["Multfila · PLA · Silk Dual Color · Dourado e Vermelho", "Elegoo · PLA · Silk Dual Color · Black Purple"],
  "img/produtos/claudiawave_0020.jpg": ["Elegoo · PLA · Matte · Sakura Pink", "SUNLU · PLA · High Speed Marble · Chestnut Brown Marble", "Bambu Lab · PLA · Lite · Cyan (16600)"],
  "img/produtos/claudiawave_0104.jpg": ["Elegoo · PLA · Matte · Sakura Pink", "SUNLU · PLA · High Speed Marble · Chestnut Brown Marble", "Bambu Lab · PLA · Lite · Cyan (16600)"],
  "img/produtos/claudiawave_0166.jpg": ["Multfila · PLA · Silk Dual Color · Dourado e Vermelho", "Elegoo · PLA · Silk Dual Color · Black Purple"],
  "img/produtos/claudiawave_9528.jpg": ["Elegoo · PLA · Silk · Silk White", "Elegoo · PLA · Silk · Gold", "eSUN · PLA · Silk · Aqua"],
  "img/produtos/claudiawave_9566.jpg": ["Elegoo · PLA · Silk · Silk White", "Elegoo · PLA · Silk · Gold", "eSUN · PLA · Silk · Aqua"],
  "img/produtos/claudiawave_9570.jpg": ["Elegoo · PLA · Silk · Silk White", "Elegoo · PLA · Silk · Gold", "eSUN · PLA · Silk · Aqua"],
  "img/produtos/claudiawave_9572.jpg": ["Elegoo · PLA · Silk · Silk White", "Elegoo · PLA · Silk · Gold", "eSUN · PLA · Silk · Aqua"],
  "img/produtos/claudiawave_9587.jpg": ["Elegoo · PLA · Silk · Silk White", "Elegoo · PLA · Silk · Gold", "eSUN · PLA · Silk · Aqua"],
  "img/produtos/claudiawave_9647.jpg": ["Multfila · PLA · Silk Dual Color · Dourado e Vermelho", "Elegoo · PLA · Silk Dual Color · Black Purple"],
  "img/produtos/claudiawave_9648.jpg": ["Multfila · PLA · Silk Dual Color · Dourado e Vermelho", "Elegoo · PLA · Silk Dual Color · Black Purple"],
  "img/produtos/claudiawave_9654.jpg": ["Multfila · PLA · Silk Dual Color · Dourado e Vermelho", "Elegoo · PLA · Silk Dual Color · Black Purple"],
  "img/produtos/claudiawave_9674.jpg": ["Multfila · PLA · Silk Dual Color · Dourado e Vermelho", "Elegoo · PLA · Silk Dual Color · Black Purple"],
  "img/produtos/claudiawave_9695.jpg": ["Multfila · PLA · Silk Dual Color · Dourado e Vermelho", "Elegoo · PLA · Silk Dual Color · Black Purple"],
  "img/produtos/lukebowl_capaq.jpg": ["Bambu Lab · PLA · Lite · Orange (16301)", "Bambu Lab · PLA · Matte · Ivory White", "Bambu Lab · PLA · Matte · Ash Gray (11102)"],
  "img/produtos/matteotex_9262q.jpg": ["Bambu Lab · PLA · Matte · Charcoal", "Bambu Lab · PLA · Matte · Desert Tan (11401)"],
  "img/produtos/aylapompom_capaq.jpg": ["Bambu Lab · PLA · Lite · Red (16200)", "eSUN · PLA · PLA-Basic · Black", "Elegoo · PLA · Matte · Matte White", "Voolt3D · PLA · V-Silk · Verde (PL-VD-SK-1)"],
  "img/produtos/claudiawave_capaq.jpg": ["Elegoo · PLA · Silk · Silk White", "Elegoo · PLA · Silk · Gold", "eSUN · PLA · Silk · Aqua"],
  /* 03/10/2026 — ālea Soap Dish: NÃO é palpite, é o filamento que ELE disse (msgs 5775, 5780, 5782). */
  "img/produtos/soapdish_capa.jpg": ["eSUN · PLA · PLA-Silk · Pink", "Bambu Lab · PLA · Silk Dual Color · Phantom Blue", "Elegoo · PLA · Silk · Silk White"],
  "img/produtos/soapdish_2620.jpg": ["Elegoo · PLA · Silk · Silk White"],
  "img/produtos/soapdish_2622.jpg": ["eSUN · PLA · PLA-Silk · Pink"],
  "img/produtos/soapdish_2624.jpg": ["Bambu Lab · PLA · Silk Dual Color · Phantom Blue"],
  "img/produtos/soapdish_2621.jpg": ["eSUN · PLA · PLA-Silk · Pink", "Bambu Lab · PLA · Silk Dual Color · Phantom Blue", "Elegoo · PLA · Silk · Silk White"],
  "img/produtos/soapdish_capaq.jpg": ["eSUN · PLA · PLA-Silk · Pink", "Bambu Lab · PLA · Silk Dual Color · Phantom Blue", "Elegoo · PLA · Silk · Silk White"],
  /* 04/10/2026 — ālea Ephix Vase: o filamento que ELE disse (msg 6018, "Elegoo Pla Silk White"); as 5 fotos são o mesmo vaso. */
  "img/produtos/ephixvase_capa.jpg": ["Elegoo · PLA · Silk · Silk White"],
  "img/produtos/ephixvase_1.jpg": ["Elegoo · PLA · Silk · Silk White"],
  "img/produtos/ephixvase_3.jpg": ["Elegoo · PLA · Silk · Silk White"],
  "img/produtos/ephixvase_4.jpg": ["Elegoo · PLA · Silk · Silk White"],
  "img/produtos/ephixvase_5.jpg": ["Elegoo · PLA · Silk · Silk White"],
  "img/produtos/ephixvase_capaq.jpg": ["Elegoo · PLA · Silk · Silk White"],
  /* 04/10/2026 — ālea Vase Prismatic: os 4 filamentos que ELE disse (msg 6071). ORDEM = a da foto, de cima pra baixo e
     da esquerda pra direita (áudios 6101/6102). Capa = a da sala (6100): dourado, transparente, mármore, preto. */
  "img/produtos/vaseprismatic_capa.jpg": ["Bambu Lab · PLA · Sparkle · Classic Gold Sparkle", "Elegoo · PETG · PETG · Transparente", "SUNLU · PLA · High Speed Marble · Chestnut Brown Marble", "eSUN · PLA · PLA-Basic · Black"],
  "img/produtos/vaseprismatic_1.jpg": ["Elegoo · PETG · PETG · Transparente", "eSUN · PLA · PLA-Basic · Black", "Bambu Lab · PLA · Sparkle · Classic Gold Sparkle", "SUNLU · PLA · High Speed Marble · Chestnut Brown Marble"],
  "img/produtos/vaseprismatic_2.jpg": ["SUNLU · PLA · High Speed Marble · Chestnut Brown Marble"],
  "img/produtos/vaseprismatic_3.jpg": ["eSUN · PLA · PLA-Basic · Black"],
  "img/produtos/vaseprismatic_4.jpg": ["Elegoo · PETG · PETG · Transparente"],
  /* ālea Stria Planter (msg 6148): as 5 fotos têm as mesmas 2 cores. Ordem da foto (cima -> baixo, áudio 6101): a borda do
     vaso interno (Cáqui) aparece primeiro, depois o corpo listrado (Mármore); os pés são Cáqui de novo. */
  "img/produtos/striaplanter_capa.jpg": ["Bambu Lab · PLA · Matte · Desert Tan (11401)", "SUNLU · PLA · High Speed Marble · Chestnut Brown Marble"],
  "img/produtos/striaplanter_1.jpg": ["Bambu Lab · PLA · Matte · Desert Tan (11401)", "SUNLU · PLA · High Speed Marble · Chestnut Brown Marble"],
  "img/produtos/striaplanter_2.jpg": ["Bambu Lab · PLA · Matte · Desert Tan (11401)", "SUNLU · PLA · High Speed Marble · Chestnut Brown Marble"],
  "img/produtos/striaplanter_3.jpg": ["Bambu Lab · PLA · Matte · Desert Tan (11401)", "SUNLU · PLA · High Speed Marble · Chestnut Brown Marble"],
  "img/produtos/striaplanter_4.jpg": ["Bambu Lab · PLA · Matte · Desert Tan (11401)", "SUNLU · PLA · High Speed Marble · Chestnut Brown Marble"],
  "img/produtos/vaseprismatic_capaq.jpg": ["Bambu Lab · PLA · Sparkle · Classic Gold Sparkle", "Elegoo · PETG · PETG · Transparente", "SUNLU · PLA · High Speed Marble · Chestnut Brown Marble", "eSUN · PLA · PLA-Basic · Black"]
};
