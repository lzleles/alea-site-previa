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
   v46-produto (04/10/2026, ajuste 2 da lista, print 6227 + áudio 6228 do Cassiano: "vamos ver qual fica melhor"): campo NOVO
      `ALEA.iconeFormato[slug]` — o desenho ao lado do nome no botão Formato. Duas opções pra ele escolher: A = miniatura do
      vaso (render do 3D dele) e B = símbolo (bolinha no Orbis, quadrado de canto arredondado no Quadrum). Na prévia, o
      `?icone=A` ou `?icone=B` na URL troca a opção (produto.js v44). A versão anterior está em
      03_site/_versoes_anteriores/icone_formato_antes_2026-10-04/js/.
   v47-produto (04/10/2026, print 6268 + áudios 6269/6271 do Cassiano): escolheu a B (símbolo), "sem preenchimento, só a
      borda", a bolinha de marcar fica. `modo` vira 'simbolo' e entra o campo `lado` ('antes'|'depois' do nome; "na frente do
      nome" — conferindo com ele qual dos dois). Na prévia, ?lado=antes|depois troca. A versão anterior está em
      03_site/_versoes_anteriores/simbolo_borda_antes_2026-10-04/js/.
   v48-produto (04/10/2026, print 6274 + áudio 6275 do Cassiano: "pensando melhor, vamos colocar essa miniatura aí, fica mais
      bonitinho (…) na frente da palavra (…) a cor dela parece que tá cinza, vamos colocar ela na cor de mármore"): `modo` volta
      pra 'miniatura', `lado` 'depois' do nome, e as miniaturas img/stria_formato_*.png são refeitas em MÁRMORE + Cáqui
      (33_produtos_novos_2026-10-04/stria_planter/icone_formato/miniatura_formato_v2_marmore.py). As anteriores (cinza) e
      esta config estão em 03_site/_versoes_anteriores/miniatura_marmore_antes_2026-10-04/.
   v49-produto (04/10/2026, POOP BAG, cadastro campo por campo com o Cassiano, msgs 6315-6363, "Pode montar!" 6363):
      (1) `modelos3d['poop-bag-holder']` — a janela 3D do porta-saquinho (GLB da versão "Negative Name" do 3MF dele, nome
      GRAVADO pra dentro, de graça, 6330/6334), abrindo nas cores originais Caramelo/Mármore/Marrom (6326/6328);
      (2) `precoPorEscolha` NÃO muda: o Poop Bag não tem tamanho, o R$ 79 está na página e na VITRINE (produtos.js);
      (3) campo NOVO `ALEA.extraPoopBag` — a caixinha "Adicionar Poop Bag Holder + R$ 49,00" com a miniatura, nos
      comedouros Luke/Matteo/Cláudia, só depois do Pronto do Personalize (produto.js v46, personalizar3d.js v14).
      A versão anterior está em 03_site/_versoes_anteriores/poop_bag_antes_2026-10-04/js/.
   v50-produto (04/10/2026, msg 6399 do Cassiano): `modelos3d['poop-bag-holder'].limiteNome` — o nome só cabe no corpo
      (38,9 mm centrados, da faixa à borda da tampa, medidos na peça; tabela de larguras da Defante gerada por código). A v49 é o commit 4f3aeaf da prévia.
   v51-produto (05/10/2026, msgs 6601/6602 do Cassiano: "coloca esse arquivo no Poop Bag do site, é o atualizado, o bonitinho no
      nome"): o 3D do Poop Bag sai do 3MF NOVO dele (a v3 aprovada no áudio 6594, faixa do nome cortada rente igual o Petra),
      placa 6 "Negative Name" (corpo obj 24 + tampa obj 19), mesmo exportador; `limiteNome` passa a ser a FAIXA RETA
      (medir_limite_nome_poopbag_v3_faixa_reta.py). Os anteriores estão em 03_site/_versoes_anteriores/poop_bag_nome_rente_antes_2026-10-05/.
   v52-produto (05/10/2026, áudios 6726/6728/6729/6731 do Cassiano): os 6 produtos HOME do lote msg6689 — `ALEA.emBreve` (campo
      NOVO: "Em breve" no lugar do preço, sem compra; produto.js v49 / feed.js v41 / carrinho.js), `formatos` do Lamel (Vase/Wavy)
      e do Nodus Organizer (Opção 1/2/3) e os 6 `modelos3d` (glbPorEscolha no Lamel e no Nodus). A versão anterior está em
      03_site/_versoes_anteriores/home_lote_em_breve_antes_2026-10-05/js/.
   v55-produto (06/10/2026, fotos 6809/6810 do Cassiano): os formatos do Lamel ganham os nomes DELE — Ovatum (o oval,
      lamel_vase) e Longum (o alto, lamel_wavy) — em `formatos` e no `glbPorEscolha`, e entra `iconeFormato['lamel']`
      (miniatura depois do nome, como o Stria). A versão anterior está em
      03_site/_versoes_anteriores/lamel_ovatum_longum_antes_2026-10-06/js/.
   v56-produto (06/10/2026, ālea Urubu Mascote Flamengo, msgs 6884-6926 do Cassiano): `tamanhos` Pequeno/Médio/Gigante e
      `modelos3d['urubu-mascote-flamengo']` com 3 campos NOVOS: `filamentoFixo` (produto.js v51: a caixa de cor vira
      "Filamento" Clássico/Perolizado, cor fixa Vermelho), `nomeAtras` (personalizar3d.js v17: o nome fica nas COSTAS — o
      campo do nome gira a peça pra trás) e `textoFaltaNome`. A versão anterior está em
      03_site/_versoes_anteriores/urubu_antes_2026-10-06/js/.
   v57-produto (06/10/2026, msg 7047 do Cassiano: Caesar, Prisma e Petra "o campo deles lá", descrição depois):
      `modelos3d` 'pet-bowl-caesar' / 'pet-bowl-prisma' / 'pet-petra' com o campo NOVO `nomeRelevo` (personalizar3d.js v18),
      `tamanhos` do Caesar e do Prisma (Petra tem um tamanho só no arquivo) e o preço do Caesar (149/179) em
      `precoPorEscolha`. E os rótulos dos 2 tamanhos de TODOS os comedouros viram 'Pequeno porte' / 'Médio e grande porte'
      (áudio 7054; eram 'M'/'G'), nas listas e nas chaves de `precoPorEscolha`. A versão anterior está em 03_site/_versoes_anteriores/caesar_prisma_petra_antes_2026-10-06/js/.
   v58-produto (06/10/2026, áudios 7201/7203/7205 do Cassiano, ofício 3.1.13): Caesar/Prisma/Petra PERDEM o `nomeRelevo`
      (comedouro = nome gravado pra dentro; com cor escolhida a letra sai na cor) e o Urubu ganha `nomeRente` + `corNomeFixa`
      (personalizar3d.js v19: nome rente, BRANCO fixo = o filamento do modificador no arquivo). Nenhum campo novo de formulário.
      A versão anterior está em 03_site/_versoes_anteriores/urubu_nome_branco_antes_2026-10-06/js/.
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

/* 06/10/2026 — CAESAR, PRISMA e PETRA (msg 7047 do Cassiano: "pode adicionar os três, depois a gente faz a descrição, pode
   fazer o campo deles lá"; os 3MF dele, msgs 7044-7046, em 42_comedouros_site_caesar_prisma_petra_2026-10-06/_original/).
   Os .glb saem do 07_render_capa/exportar_glb_configurador_v6_peca_sem_nome_deitada.py (80000 faces, EM PÉ), depois do
   42_.../ferramentas/preparar_3mf_para_glb_v1.py, que só troca na CÓPIA o subtipo do nome e da logo de MODIFICADOR pra
   negativo (o exportador só lê o quadro do nome a partir do negativo; logo de comedouro é sempre recorte, ofício 3.1.4).
   A janela mostra o tamanho MENOR do arquivo (áudio 3019), placa 1 dos três (objeto 4). Uma zona só (o arquivo é de uma
   cor por peça) -> só Monocromático. As cores `original` são as do project_settings do 3MF.
   NOME (06/10/2026, áudios 7203/7205 do Cassiano, ofício 3.1.13): "comedouro é SEMPRE em baixo relevo; só vira modificador
   se o cliente escolher a cor do nome". Até aqui os 3 saíam com `nomeRelevo` (pra fora, na cor da peça); agora SEM a flag:
   gravados pra DENTRO com a profundidade do arquivo (thickness: Caesar 2 mm, Prisma 2 mm, Petra 1 mm), como Luke/Matteo/
   Cláudia; com "Um detalhe que transforma" + cor, a letra aparece na cor escolhida. A versão anterior está em
   03_site/_versoes_anteriores/urubu_nome_branco_antes_2026-10-06/js/.
   Caesar: corpo SUNLU PLA Marble (= Mármore); o nome do arquivo é dourado (Bambu PLA Silk+ #F4A925, que NÃO está na
     lista do site) -> sem `capa.nome` até ele dizer a cor (nunca por palpite).
   Prisma: corpo Bambu PLA Sparkle #2D2B28 (NÃO está na lista do site; a mais perto é o Preto) -> abre na cor do arquivo,
     SEM `capa` (o formulário não pré-marca uma cor que o site não vende) até ele dizer.
   Petra: corpo Bambu PLA Sparkle Classic Gold = "Dourado com Glitter" (Clássico); nome branco no arquivo (Bambu PLA Basic
     White, fora da lista) -> sem `capa.nome`. */
window.ALEA.modelos3d['pet-bowl-caesar'] = {
  glb: 'modelos/caesar.glb?v=2026-10-06',
  nome: 'modelos/caesar_nome.json?v=2026-10-06',
  fonte: 'fonts/defante.otf',
  capa: { modo: 'monocromatico', escolhas: [{ acabamento: 'basico', cor: 'Mármore' }] },
  original: {
    topo:      { site: 'Mármore', hex: '#E4E4E4', acabamento: 'basico', oficial: 'SUNLU · PLA · High Speed Marble · Chestnut Brown Marble' },
    principal: { site: 'Mármore', hex: '#E4E4E4', acabamento: 'basico', oficial: 'SUNLU · PLA · High Speed Marble · Chestnut Brown Marble' },
    base:      { site: 'Mármore', hex: '#E4E4E4', acabamento: 'basico', oficial: 'SUNLU · PLA · High Speed Marble · Chestnut Brown Marble' }
  }
};
window.ALEA.modelos3d['pet-bowl-prisma'] = {
  glb: 'modelos/prisma.glb?v=2026-10-06',
  nome: 'modelos/prisma_nome.json?v=2026-10-06',
  fonte: 'fonts/defante.otf',
  original: {
    topo:      { site: 'Preto', hex: '#2D2B28', acabamento: 'basico', oficial: 'Bambu Lab · PLA · Sparkle (cor do arquivo #2D2B28)' },
    principal: { site: 'Preto', hex: '#2D2B28', acabamento: 'basico', oficial: 'Bambu Lab · PLA · Sparkle (cor do arquivo #2D2B28)' },
    base:      { site: 'Preto', hex: '#2D2B28', acabamento: 'basico', oficial: 'Bambu Lab · PLA · Sparkle (cor do arquivo #2D2B28)' }
  }
};
window.ALEA.modelos3d['pet-petra'] = {
  glb: 'modelos/petra.glb?v=2026-10-06',
  nome: 'modelos/petra_nome.json?v=2026-10-06',
  fonte: 'fonts/defante.otf',
  capa: { modo: 'monocromatico', escolhas: [{ acabamento: 'basico', cor: 'Dourado com Glitter' }] },
  original: {
    topo:      { site: 'Dourado com Glitter', hex: '#CEA629', acabamento: 'basico', oficial: 'Bambu Lab · PLA · Sparkle · Classic Gold Sparkle' },
    principal: { site: 'Dourado com Glitter', hex: '#CEA629', acabamento: 'basico', oficial: 'Bambu Lab · PLA · Sparkle · Classic Gold Sparkle' },
    base:      { site: 'Dourado com Glitter', hex: '#CEA629', acabamento: 'basico', oficial: 'Bambu Lab · PLA · Sparkle · Classic Gold Sparkle' }
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
  /* v57 (06/10/2026, áudio 7054 do Cassiano: "ao invés de P, M, G (...) vai ser pequeno porte, uma opção. A segunda opção vai ser
     médio e grande porte"): os 2 tamanhos de TODO comedouro passam a ser 'Pequeno porte' (era o M = 1º valor) e 'Médio e
     grande porte' (era o G = 2º valor). O rótulo vai no pedido ("Tamanho: Pequeno porte"). Antes: ['M', 'G']. */
  'luke-bowl':         ['Pequeno porte', 'Médio e grande porte'],
  'matteo-texturized': ['Pequeno porte', 'Médio e grande porte'],   // era ['P','G'] até o áudio 3033, ['M','G'] até o 7054
  'claudia-wave':      ['Pequeno porte', 'Médio e grande porte'],   // idem
  /* POR FORMATO (04/10/2026, áudio 6228: "o Orbis vai ser mini e pequeno e o Quadrum vai ser pequeno e grande"; 6229: o
     Tamanho só aparece depois do Formato). Lista simples = vale pra qualquer formato; objeto = a lista de cada formato. */
  'stria-planter':     { Orbis: ['Mini', 'Pequeno'], Quadrum: ['Pequeno', 'Grande'] },
  /* v56 (06/10/2026, áudio 6895: "pequeno, médio e gigante"; escalas 6902/6910: P 100%, M 180%, G 230% do arquivo dele) */
  'urubu-mascote-flamengo': ['Pequeno', 'Médio', 'Gigante'],
  /* v57 (06/10/2026, msg 7047): os 2 tamanhos com os rótulos do áudio 7054 (acima). Medido nos
     3MF dele: Caesar Pequeno porte = placas 1/2 (15,9 cm), Médio e grande porte = placas 4/5 (18,2 cm); Prisma Pequeno porte = placa 1, Médio e grande = placa 2 "Ampulheta".
     Petra: o arquivo tem UM tamanho só (20,0 × 6,8 cm, boca do M) -> sem o grupo Tamanho até ele dizer. */
  'pet-bowl-caesar':   ['Pequeno porte', 'Médio e grande porte'],
  'pet-bowl-prisma':   ['Pequeno porte', 'Médio e grande porte']
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
  /* v57 (áudio 7054): a chave é o rótulo novo do tamanho (era 'M'/'G'); os valores não mudaram */
  'luke-bowl':         { 'Pequeno porte': 149, 'Médio e grande porte': 189 },
  'matteo-texturized': { 'Pequeno porte': 149, 'Médio e grande porte': 179 },
  'claudia-wave':      { 'Pequeno porte': 169, 'Médio e grande porte': 219 },
  /* v57 (06/10/2026): o Caesar anotado em 04/10 18:08 (msg 6255: 149/179; 1º = Pequeno porte, 2º = Médio e grande porte). Prisma e Petra sem preço = Sob consulta. */
  'pet-bowl-caesar':   { 'Pequeno porte': 149, 'Médio e grande porte': 179 },
  'ayla-pompom':       { '': 299 }
};
/* PARCELAMENTO (04/10/2026, áudio 6237: "10 vezes de tanto, o valor da parcela" embaixo do preço). Regra DELE, perguntada
   na msg 6245: { vezes: 10, minimo: 30 } = "ou até 10x de R$ X sem juros", com a parcela nunca abaixo de R$ 30 (o número de
   vezes cai até caber). null = a linha não aparece. */
window.ALEA.parcelamento = null;
/* FORMATOS À VENDA (04/10/2026, ālea Stria Planter, msgs 6122/6124 "ālea Stria Planter — Orbis e Quadrum"): o grupo
   "Formato" (produto.js v42) logo ACIMA do Tamanho, mesma trava (obrigatório) e vai no pedido ("Formato: Orbis"). */
window.ALEA.formatos = {
  'stria-planter': ['Orbis', 'Quadrum'],
  /* v52 (05/10/2026): ālea Lamel — "a família vai ser só ālea Lamel e lá dentro a opção de escolher qual dos dois vasos" (áudio
     6728). Nomes PROVISÓRIOS (o nome de cada objeto no arquivo dele: lamel_vase e lamel_wavy) — ele dá os nomes depois. */
  /* v55 (06/10/2026, fotos 6809/6810 do Cassiano): os nomes DELE — Vase (o oval) vira Ovatum, Wavy (o alto) vira Longum. */
  'lamel': ['Ovatum', 'Longum'],
  /* v52: ālea Nodus Organizer — áudios 6729/6731: Opção 1 = 5 peças (placa 1 + placa 9), Opção 2 = 3 peças (placa 2 + placa 8),
     Opção 3 = o Centrum (part A + part B). "Opção 1/2/3" são PROVISÓRIOS, ele escolhe os nomes depois. */
  'nodus-organizer': ['Opção 1', 'Opção 2', 'Opção 3']
};
/* v52 — EM BREVE (05/10/2026, áudio 6726 do Cassiano: "você deixa na frente escrito em breve, no lugar do valor (...) amanhã eu vou
   organizar questão de foto, imprimir"). Produto listado aqui: card e página dizem "Em breve" no lugar do preço, o botão de compra
   fica desligado e a sacola não aceita (produto.js v49, feed.js v41, carrinho.js); o "Personalize agora" com o 3D funciona.
   Pra pôr à venda: tirar o slug daqui e dar o preço (VITRINE/PRODUTOS em produtos.js ou precoPorEscolha). */
window.ALEA.emBreve = ['laptop-stand', 'pen-holder', 'nodus-organizer', 'make', 'makeup-layer-organizer', 'lamel'];
/* v46 — ÍCONE DO FORMATO (ajuste 2, áudio 6228: mostrar que o Orbis é redondo e o Quadrum é quadrado). `modo` 'miniatura'
   (opção A: a foto pequenininha do vaso, img/stria_formato_*.png, render do .glb pelo
   33_produtos_novos_2026-10-04/stria_planter/icone_formato/miniatura_formato_v1_blender.py) ou 'simbolo' (opção B: só a forma,
   desenhada no CSS v44). Fica o que ELE escolher; até lá a prévia abre na A e o ?icone=B mostra a B.
   Miniatura de 04/10 (v48): em Mármore + Cáqui, pelo miniatura_formato_v2_marmore.py. */
window.ALEA.iconeFormato = {
  'stria-planter': {
    modo: 'miniatura',   // v48: "pensando melhor, vamos colocar essa miniatura" (6275); a B (símbolo, só borda) ficou de reserva
    lado: 'depois',      // v48: "na frente da palavra" (6269/6271/6275) lido como DEPOIS do nome; 'antes' se ele disser o contrário
    miniatura: { Orbis: 'img/stria_formato_orbis.png?v=marmore', Quadrum: 'img/stria_formato_quadrum.png?v=marmore' },   // v48: ?v= pra o celular não mostrar a cinza do cache
    simbolo:   { Orbis: 'redondo', Quadrum: 'quadrado' }
  },
  /* v55 (06/10/2026, foto 6810: "com a miniatura depois da palavra", igual ao Stria): render do .glb do site em Branco (a cor
     em que o Lamel abre) pelo 37_produtos_home_lote_2026-10-05/miniatura_formato_lamel_v1_branco.py. */
  'lamel': {
    modo: 'miniatura',
    lado: 'depois',
    miniatura: { Ovatum: 'img/lamel_formato_ovatum.png?v=2026-10-06', Longum: 'img/lamel_formato_longum.png?v=2026-10-06' }
  }
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
/* v52 — 05/10/2026, OS PRODUTOS HOME DO LOTE msg6689 (áudios 6726/6728/6729/6731 do Cassiano), todos "Em breve" (ALEA.emBreve).
   Os .glb saem dos 3MF OFICIAIS dele (05_bambu/lote_produtos_msg6689_2026-10-05/oficial_msg6720/_OFICIAIS.md) pelo
   37_produtos_home_lote_2026-10-05/montar_lote_home_v1_encaixe_por_colisao.py: cada peça MONTADA como o cliente recebe (o encaixe
   medido por colisão, nada chutado — medidas em 37_.../glb/_montagem.json), a logo NEGATIVA de cada arquivo recortada, uma cor só
   (zona principal). Nenhum é modo vaso (spiral_mode 0 nos 7). Abre em Branco fosco (PROVISÓRIO: sem foto ainda, não há "cor da
   capa" dele) — trocar `capa`/`original` quando ele mandar as fotos e os filamentos. Sem nome gravado. */
(function () {
  var branco = { site: 'Branco', hex: '#F6F6F6', acabamento: 'fosco', oficial: 'Elegoo · PLA · Matte · Matte White' };
  function cfg(glb, extra) {
    var c = { glb: glb, semNome: true, rotuloBotao: 'Personalize agora',
              capa: { modo: 'monocromatico', escolhas: [{ acabamento: 'fosco', cor: 'Branco' }] },
              original: { topo: branco, principal: branco, base: branco } };
    for (var k in (extra || {})) c[k] = extra[k];
    return c;
  }
  /* v53 (06/10/2026): os .glb saem do montar_lote_home_v2_logo_inteira_e_pecas_separadas.py (gravação da logo em malha
     própria, Nodus Opção 1 em escadinha, Make com a tampa assentada e a gaveta 25 mm pra fora) e o Make, o Makeup e o
     Nodus ganham `pecas: true` = TOQUE NA PEÇA com tutorial (personalizar3d.js v15; áudios 6744/6750/6757/6763/6768).
     `soUmModo`: some a linha "Monocromático" — a janela de cor pinta a peça tocada. Tudo abre branco (6759). */
  /* v54 (06/10/2026): os .glb saem do montar_lote_home_v3_logo_rompe_o_fundo.py (a gravação da logo estava TAPADA por uma
     película do fundo no Make, Makeup, Nodus, Lamel e parte do Pen Holder — áudios 6796/6798/6807); ?v sobe pra 2026-10-06b. */
  var V = '?v=2026-10-06b';
  var P = { pecas: true, soUmModo: true };
  window.ALEA.modelos3d['laptop-stand'] = cfg('modelos/laptopstand.glb' + V);   // os 2 holders, 40 mm entre eles (provisório); 1 cor (6770)
  window.ALEA.modelos3d['pen-holder'] = cfg('modelos/penholder.glb' + V);
  window.ALEA.modelos3d['make'] = cfg('modelos/make.glb' + V, P);                // peca_0 fundo, peca_1 gaveta, peca_2 tampa
  window.ALEA.modelos3d['makeup-layer-organizer'] = cfg('modelos/makeup.glb' + V, P);   // peca_0..2 camadas de baixo pra cima, peca_3 copinho
  window.ALEA.modelos3d['lamel'] = cfg('modelos/lamel_vase.glb' + V, { glbPorEscolha: {
    'Ovatum': 'modelos/lamel_vase.glb' + V,    // placa 1 (lamel_vase) — v55: era 'Vase'
    'Longum': 'modelos/lamel_wavy.glb' + V     // placa 2 (lamel_wavy) — v55: era 'Wavy'
  } });
  window.ALEA.modelos3d['nodus-organizer'] = cfg('modelos/nodus_opcao1.glb' + V, { pecas: true, soUmModo: true, glbPorEscolha: {
    'Opção 1': 'modelos/nodus_opcao1.glb' + V,   // 5 peças: bandeja grande (placa 1) + placa 9, encaixadas
    'Opção 2': 'modelos/nodus_opcao2.glb' + V,   // 3 peças: bandeja 4 gomos (placa 2) + placa 8
    'Opção 3': 'modelos/nodus_opcao3.glb' + V    // Centrum: part A + part B no centro
  },
  /* v54 (06/10/2026, foto 6799 + áudio 6800 e foto 6802 + msg 6803 do Cassiano): abre nas cores que ELE deixou na prévia.
     Nome de cada cor = o tom medido nas fotos dele contra a lista Fosco (o dropdown mostrava Caramelo na 6799 e Areia na
     6802); peça = altura medida no .glb (peca_0 = base). */
  coresIniciais: {
    'nodus_opcao1': [
      { peca: 0, acabamento: 'fosco', cor: 'Branco' },        // base
      { peca: 4, acabamento: 'fosco', cor: 'Cáqui' },         // 31 mm
      { peca: 2, acabamento: 'fosco', cor: 'Caramelo' },      // 51 mm
      { peca: 1, acabamento: 'fosco', cor: 'Azul Bebê' },     // 71 mm
      { peca: 3, acabamento: 'fosco', cor: 'Verde Menta' },   // 91 mm
      { peca: 5, acabamento: 'fosco', cor: 'Amarelo' }        // 111 mm
    ],
    'nodus_opcao2': [
      { peca: 0, acabamento: 'fosco', cor: 'Branco' },        // base
      { peca: 1, acabamento: 'fosco', cor: 'Terracota' },     // 51 mm (a dupla)
      { peca: 2, acabamento: 'fosco', cor: 'Caramelo' },      // 31 mm
      { peca: 3, acabamento: 'fosco', cor: 'Areia' }          // 111 mm
    ],
    'nodus_opcao3': [                                         // foto 6804 + msg 6805 ("e esse assim")
      { peca: 0, acabamento: 'fosco', cor: 'Verde Menta' },   // a flor de fora (part A)
      { peca: 1, acabamento: 'fosco', cor: 'Amarelo' }        // o tubo do centro (part B)
    ]
  } });
})();
/* v49 — 04/10/2026, ālea Poop Bag Holder (msg 6285 do Cassiano: "ALEA Poop Bag Holder.3mf"; cadastro 6315-6363). O .glb
   sai da placa 6 "Negative Name" do 3MF dele (corpo obj 22 + tampa obj 17), pelo
   33_produtos_novos_2026-10-04/poop_bag_extra/glb/exportar_glb_configurador_v6_poopbag_v1.py ("1=principal,2=base,3=topo",
   sem decimar, --tampa 17 --assento 15.1): o reservatório com a TAMPA ROSQUEADA por cima (montado, 81,7 mm de altura) e a
   capivara negativa no fundo. Zonas: topo = a tampa · principal = o corpo · base = a faixa de baixo e o fundo.
   NOME GRAVADO pra dentro, de graça (msgs 6330/6334): o mesmo corte ao vivo dos comedouros, na parede do corpo.
   NOME COLORIDO = + R$ 10 nesta página (6331/6333; a página traz data-extra-preco="10").
   ORIGINAL = as cores que ELE disse (6326/6328, "iguais ao Luke" da foto lukebowl_wa182751): tampa Caramelo, corpo Mármore,
   faixa de baixo Marrom. Bicolor como a placa 11 do arquivo: cor 1 = a tampa, cor 2 = corpo e faixa.
   ACESSÓRIOS (msg 6367 "B" sobre o áudio 6365 + msg 6369, 04/10/2026): a ARGOLA do arquivo dele (schluesselring v9, obj 35,
   30 × 30 × 3,16 mm) SEMPRE TRANSPARENTE e uma CORDINHA BEGE passando pelos 2 furinhos do topo da tampa — nenhum dos dois muda
   com as cores do formulário (personalizar3d.js v14). Malhas em modelos/poopbag_acessorios.glb, geradas por
   33_produtos_novos_2026-10-04/poop_bag_extra/glb/gerar_acessorios_poopbag_v2_alca_pendurada.py (a alça sobe ~7 mm, cai\n   pelo lado e a argola fica PENDURADA, em pé; a v1, alça reta pra cima, foi recusada na conferência dos prints). TROCAR A COR DA CORDINHA = a linha `cordinha`. */
window.ALEA.modelos3d['poop-bag-holder'] = {
  glb: 'modelos/poopbag.glb?v=2026-10-05',
  acessorios: {
    glb: 'modelos/poopbag_acessorios.glb?v=2026-10-04',
    materiais: {
      argola:   { cor: '#EEF2F3', transparente: true, opacidade: 0.45 },   // PETG transparente (o "Transparente" da lista dele)
      cordinha: { cor: '#CDB99A' }                                          // bege de cordão de algodão (msg 6369)
    }
  },
  nome: 'modelos/poopbag_nome.json?v=2026-10-05',
  fonte: 'fonts/defante.otf',
  zonaNome: 'principal',
  folgaEnquadrar: 0.95,   // personalizar3d v13: com a alça da cordinha a peça fica alta; 0,82 cortava a alça no computador
  bicolor: { topo: 0, principal: 1, base: 1 },
  capa: { modo: 'tricolor', escolhas: [
    { acabamento: 'fosco', cor: 'Caramelo' }, { acabamento: 'basico', cor: 'Mármore' }, { acabamento: 'basico', cor: 'Marrom' }] },
  original: {
    topo:      { site: 'Caramelo', hex: '#D3B7A7', acabamento: 'fosco',  oficial: 'Bambu Lab · PLA · Matte · Latte Brown (11800)' },
    principal: { site: 'Mármore',  hex: '#E4E4E4', acabamento: 'basico', oficial: 'SUNLU · PLA · High Speed Marble · Chestnut Brown Marble' },
    base:      { site: 'Marrom',   hex: '#5F3839', acabamento: 'basico', oficial: 'Multfila · PLA · Mult Speed · Marrom (PCI-PLA-046)' }
  }
};
/* LIMITE-NOME-POOPBAG:INICIO */
/* v51 — O NOME DO POOP BAG CABE NA FAIXA RETA (msgs 6601/6602 do Cassiano, 05/10/2026: o arquivo novo, "o bonitinho no nome",
   com a faixa reta cortada rente igual o Petra — regra 3.1.12). Na parte low poly o nome não sai perfeito (áudio 6471), então
   o limite agora é a FAIXA RETA na coluna das letras (y 25,1 a 53,5 mm), com o nome centrado no quadro do arquivo (38,8 mm)
   e 1 mm de folga de cada lado: 25,4 mm. O limite antigo (corpo inteiro, 38,9 mm, v50) fica no histórico.
   `larguras` = por letra, [avanço, início da tinta, fim da tinta] em mm na Defante, na escala do arquivo ("Cacau" = 24,88 mm).
   Gerado por 33_produtos_novos_2026-10-04/poop_bag_extra/glb/medir_limite_nome_poopbag_v3_faixa_reta.py
   + aplicar_limite_nome_no_config_v3_faixa_reta.py — não editar à mão. Letra fora da tabela conta como o W (a mais larga).
   Quem aplica: produto.js v47. */
window.ALEA.modelos3d['poop-bag-holder'].limiteNome = {"mm":25.4,"folgaMm":2.0,"larguras":{" ":[2.3,0,0],"!":[2.5,0.94,2.01],"\"":[2.95,0.32,2.62],"#":[7.08,0.33,6.74],"$":[5.95,0.43,5.51],"%":[7.36,0.39,6.97],"&":[6.94,0.43,6.43],"'":[1.73,0.32,1.4],"(":[2.78,0.45,2.53],")":[2.78,0.25,2.33],"*":[3.49,0.35,3.13],"+":[3.41,0.34,3.07],",":[1.68,0.3,1.38],"-":[3.32,0.29,3.02],".":[1.68,0.3,1.37],"/":[3.24,0.26,2.97],"0":[5.5,0.46,5.03],"1":[2.97,0.32,2.46],"2":[5.44,0.43,5.0],"3":[5.44,0.41,4.98],"4":[5.82,0.31,5.42],"5":[5.41,0.44,4.99],"6":[5.57,0.42,5.12],"7":[4.71,0.5,4.36],"8":[5.48,0.45,5.02],"9":[5.57,0.44,5.14],":":[1.8,0.36,1.43],";":[1.8,0.36,1.44],"<":[3.14,0.34,2.74],"=":[3.43,0.35,3.08],">":[3.14,0.4,2.79],"?":[5.2,0.26,4.83],"@":[8.47,0.39,8.04],"A":[5.56,0.05,5.5],"B":[5.89,0.5,5.58],"C":[5.96,0.24,5.75],"D":[5.82,0.5,5.58],"E":[5.26,0.5,5.07],"F":[5.23,0.5,5.07],"G":[6.04,0.24,5.78],"H":[6.07,0.5,5.57],"I":[2.07,0.5,1.57],"J":[5.63,0.15,5.22],"K":[5.73,0.5,5.58],"L":[5.23,0.5,5.07],"M":[7.22,0.5,6.72],"N":[6.08,0.5,5.58],"O":[6.08,0.24,5.84],"P":[5.69,0.5,5.58],"Q":[6.08,0.24,5.84],"R":[5.79,0.5,5.58],"S":[5.7,0.31,5.39],"T":[4.88,0.15,4.72],"U":[6.35,0.37,5.97],"V":[5.56,0.05,5.5],"W":[9.88,0.05,9.82],"X":[5.7,0.05,5.65],"Y":[5.7,0.05,5.65],"Z":[4.94,0.18,4.75],"[":[2.36,0.5,2.1],"\\":[3.24,0.26,2.97],"]":[2.36,0.25,1.85],"^":[3.36,0.28,3.07],"_":[4.29,0.29,4.0],"`":[1.9,0.26,1.58],"a":[4.87,0.21,4.5],"b":[5.11,0.46,4.84],"c":[4.69,0.25,4.5],"d":[5.11,0.27,4.65],"e":[4.86,0.25,4.58],"f":[3.25,0.46,3.37],"g":[5.08,0.26,4.83],"h":[5.21,0.46,4.84],"i":[2.0,0.46,1.53],"j":[2.01,-0.6,1.54],"k":[4.88,0.46,4.84],"l":[2.0,0.46,1.53],"m":[7.71,0.46,7.32],"n":[5.2,0.46,4.84],"o":[4.87,0.25,4.62],"p":[5.11,0.46,4.84],"q":[5.11,0.27,4.65],"r":[3.8,0.46,3.64],"s":[4.41,0.29,4.12],"t":[3.13,0.37,2.9],"u":[5.19,0.36,4.74],"v":[4.48,0.05,4.43],"w":[7.74,0.05,7.68],"x":[4.52,0.07,4.45],"y":[4.48,0.05,4.43],"z":[4.86,0.24,4.62],"{":[2.9,0.36,2.64],"|":[1.84,0.5,1.34],"}":[2.9,0.25,2.53],"~":[4.79,0.31,4.47]," ":[3.11,0,0],"¡":[2.02,0.47,1.54],"¢":[5.01,0.39,4.64],"£":[6.24,0.39,5.82],"¤":[4.62,0.38,4.24],"¥":[6.6,0.5,6.1],"¦":[1.81,0.48,1.32],"§":[6.0,0.46,5.54],"¨":[3.29,0.3,2.98],"©":[7.8,0.4,7.4],"ª":[4.05,0.38,3.62],"«":[5.71,0.28,5.41],"­":[0.0,0,0],"®":[7.81,0.4,7.4],"¯":[3.32,0.29,3.02],"°":[3.51,0.36,3.15],"±":[3.5,0.38,3.11],"²":[3.41,0.4,3.0],"³":[3.4,0.38,2.98],"´":[1.9,0.31,1.63],"¶":[7.55,0.32,7.2],"·":[1.68,0.3,1.37],"¸":[0.67,-0.1,0.83],"¹":[2.01,0.35,1.57],"»":[5.71,0.29,5.42],"¼":[7.22,0.34,6.84],"½":[7.17,0.34,6.78],"¾":[7.9,0.36,7.52],"¿":[5.18,0.35,4.92],"À":[5.56,0.05,5.5],"Á":[5.56,0.05,5.5],"Â":[6.06,0.55,6.0],"Ã":[5.56,0.05,5.5],"Ä":[5.56,0.05,5.5],"Å":[5.56,0.05,5.5],"Æ":[7.54,0.05,7.35],"Ç":[5.96,0.24,5.75],"È":[5.26,0.5,5.07],"É":[5.26,0.5,5.07],"Ê":[5.26,0.5,5.07],"Ë":[5.26,0.5,5.07],"Ì":[2.08,0.37,1.69],"Í":[2.08,0.38,1.7],"Î":[2.07,-0.22,2.29],"Ï":[2.09,-0.3,2.38],"Ñ":[6.08,0.5,5.58],"Ò":[6.08,0.24,5.84],"Ó":[6.08,0.24,5.84],"Ô":[6.08,0.24,5.84],"Õ":[6.08,0.24,5.84],"Ö":[6.08,0.24,5.84],"×":[3.21,0.34,2.86],"Ø":[6.17,0.28,5.88],"Ù":[6.35,0.37,5.97],"Ú":[6.35,0.37,5.97],"Û":[6.35,0.37,5.97],"Ü":[6.35,0.37,5.97],"Ý":[5.4,-0.1,5.5],"ß":[5.83,0.46,5.54],"à":[4.87,0.21,4.5],"á":[4.87,0.21,4.5],"â":[4.87,0.21,4.5],"ã":[4.87,0.21,4.5],"ä":[4.87,0.21,4.5],"å":[4.87,0.21,4.5],"æ":[8.04,0.21,7.75],"ç":[4.69,0.25,4.5],"è":[4.86,0.25,4.58],"é":[4.86,0.25,4.58],"ê":[4.86,0.25,4.58],"ë":[4.86,0.25,4.58],"ì":[1.99,0.33,1.65],"í":[1.99,0.33,1.65],"î":[1.99,-0.26,2.25],"ï":[1.98,-0.35,2.33],"ñ":[5.2,0.46,4.84],"ò":[4.87,0.25,4.62],"ó":[4.87,0.25,4.62],"ô":[4.87,0.25,4.62],"õ":[4.87,0.25,4.62],"ö":[4.87,0.25,4.62],"÷":[3.34,0.3,3.03],"ø":[4.93,0.28,4.65],"ù":[5.2,0.36,4.74],"ú":[5.2,0.36,4.74],"û":[5.2,0.36,4.74],"ü":[5.2,0.36,4.74],"ý":[4.48,0.05,4.43],"ÿ":[4.48,0.05,4.43],"Ā":[5.56,0.05,5.5],"ā":[4.87,0.21,4.5],"Ă":[5.56,0.05,5.5],"ă":[4.87,0.21,4.5],"Ą":[5.56,0.05,5.5],"ą":[4.88,0.21,4.5],"Ć":[5.96,0.24,5.75],"ć":[4.69,0.25,4.5],"Ĉ":[5.96,0.24,5.75],"ĉ":[4.69,0.25,4.5],"Ċ":[5.96,0.24,5.75],"ċ":[4.69,0.25,4.5],"Č":[5.96,0.24,5.75],"č":[4.69,0.25,4.5],"Ď":[5.82,0.5,5.58],"ď":[5.11,0.27,6.12],"Đ":[6.13,0.17,5.88],"đ":[5.11,0.27,5.28],"Ē":[5.26,0.5,5.07],"ē":[4.86,0.25,4.58],"Ĕ":[5.26,0.5,5.07],"ĕ":[4.86,0.25,4.58],"Ė":[5.26,0.5,5.07],"ė":[4.86,0.25,4.58],"Ę":[5.26,0.5,5.07],"ę":[4.86,0.25,4.57],"Ě":[5.26,0.5,5.07],"ě":[4.86,0.25,4.58],"Ĝ":[6.04,0.24,5.78],"ĝ":[5.09,0.26,4.84],"Ğ":[6.04,0.24,5.78],"ğ":[5.09,0.26,4.83],"Ġ":[6.04,0.24,5.78],"ġ":[5.09,0.26,4.83],"Ģ":[6.04,0.24,5.78],"ģ":[5.09,0.26,4.83],"Ĥ":[6.07,0.5,5.57],"ĥ":[5.2,0.46,4.84],"Ħ":[6.57,0.19,6.37],"ħ":[5.2,-0.18,4.83],"Ĩ":[2.07,-0.53,2.6],"ĩ":[1.99,-0.57,2.56],"Ī":[2.08,-0.33,2.4],"ī":[2.0,-0.37,2.36],"Ĭ":[2.07,-0.36,2.43],"ĭ":[1.99,-0.4,2.39],"Į":[2.07,0.5,1.57],"į":[2.0,0.46,1.53],"Ĵ":[5.56,0.08,5.87],"ĵ":[2.01,-0.6,2.26],"Ķ":[5.73,0.5,5.58],"ķ":[4.88,0.46,4.84],"Ĺ":[5.22,0.37,5.07],"ĺ":[1.99,0.33,1.65],"Ļ":[5.23,0.5,5.07],"ļ":[1.98,0.45,1.53],"Ľ":[5.23,0.5,5.07],"ľ":[1.99,0.46,3.01],"Ŀ":[5.23,0.5,5.07],"ŀ":[3.36,0.46,3.28],"Ł":[5.53,0.17,5.37],"ł":[3.0,0.13,2.86],"Ń":[6.08,0.5,5.58],"ń":[5.2,0.46,4.84],"Ņ":[6.08,0.5,5.58],"ņ":[5.19,0.45,4.83],"Ň":[6.08,0.5,5.58],"ň":[5.2,0.46,4.84],"Ō":[6.09,0.24,5.84],"ō":[4.87,0.25,4.62],"Ŏ":[6.08,0.24,5.84],"ŏ":[4.87,0.25,4.62],"Ő":[6.08,0.24,5.84],"ő":[4.87,0.25,4.62],"Œ":[9.53,0.24,9.34],"œ":[8.16,0.25,7.87],"Ŕ":[5.79,0.5,5.58],"ŕ":[3.8,0.46,3.64],"Ŗ":[5.79,0.5,5.58],"ŗ":[3.79,0.45,3.63],"Ř":[5.79,0.5,5.58],"ř":[3.8,0.46,3.64],"Ś":[5.7,0.31,5.39],"Ŝ":[5.71,0.31,5.39],"Ş":[5.7,0.31,5.39],"Š":[5.7,0.31,5.39],"Ţ":[4.88,0.15,4.72],"ţ":[3.12,0.37,2.9],"Ť":[4.88,0.15,4.72],"ť":[3.12,0.37,2.9],"Ŧ":[4.88,0.15,4.72],"ŧ":[3.54,0.14,3.25],"Ũ":[6.34,0.37,5.97],"ũ":[5.2,0.36,4.74],"Ū":[6.35,0.37,5.97],"ū":[5.2,0.36,4.74],"Ŭ":[6.35,0.37,5.97],"ŭ":[5.2,0.36,4.74],"Ů":[6.34,0.37,5.97],"ů":[5.2,0.36,4.74],"Ű":[6.35,0.37,5.97],"ű":[5.2,0.36,4.74],"Ų":[6.35,0.37,5.97],"ų":[5.21,0.36,4.74],"Ŵ":[9.76,-0.01,9.76],"ŵ":[7.74,0.05,7.68],"Ŷ":[5.4,-0.1,5.5],"ŷ":[4.48,0.05,4.43],"Ÿ":[5.4,-0.1,5.5],"Ź":[4.94,0.18,4.75],"ź":[4.86,0.24,4.62],"Ż":[4.94,0.18,4.75],"ż":[4.86,0.24,4.62],"Ž":[4.94,0.18,4.75],"ž":[4.86,0.24,4.62]}};
/* LIMITE-NOME-POOPBAG:FIM */
/* v49 — A CAIXINHA DO POOP BAG NOS COMEDOUROS (áudios 6281-6290 do Cassiano, 04/10/2026): depois que o cliente aperta
   "Pronto" no Personalize (sem falta lá dentro), aparece entre o "Personalize agora" e a declaração:
   [caixinha] [miniatura do Poop Bag nas CORES escolhidas e com o NOME do pet] "Adicionar Poop Bag Holder + R$ 49,00".
   Marcou = + R$ 49 no item (vai em `extras`, com a miniatura). Comprado junto, o nome colorido do comedouro vale pro Poop
   Bag sem cobrar de novo (6330): a miniatura já sai com o nome na cor do comedouro, e o pedido diz isso.
   `slugs` = onde a caixinha existe (a Ayla já vem com o porta-saquinho, fica fora). Quem desenha: produto.js v46;
   quem fotografa a miniatura: personalizar3d.js v14 (fotoDoPoopBag). Preço DELE (áudios 6281-6290), nunca mexer sem ele. */
window.ALEA.extraPoopBag = {
  slugs: ['luke-bowl', 'matteo-texturized', 'claudia-wave'],
  preco: 49,
  rotulo: 'Poop Bag Holder',
  texto: 'Adicionar Poop Bag Holder',
  pagina: 'produto-poop-bag-holder.html'   // v50 (áudio 6402): miniatura e texto levam pra cá; só o quadradinho marca
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

/* v56 — 06/10/2026, ālea Urubu Mascote Flamengo (cadastro campo por campo, msgs 6884-6926 do Cassiano). O 3D sai do 3MF DELE
   ("Urubu Flamengo - A1.3mf", msg 6884), placa 1 = o boneco MONTADO (objeto 161, 44 partes), pelo
   38_urubu_mascote_2026-10-06/site_3d/ferramentas/montar_urubu_glb_v1.py, com a COR DE FORA de cada triângulo lida da pintura
   do arquivo (as chuteiras são pintadas: dourado silk + branco silk):
     urubu.glb ........ SÓ as partes VERMELHAS (filamento 4 do arquivo = Bambu Lab PLA Lite Red) = a zona 'principal', a que o
                        campo "Filamento" pinta e onde o nome é gravado
     urubu_fixas.glb .. o resto, FIXO nas cores do arquivo (acessórios do personalizar3d v14), uma malha por filamento
     urubu_nome.json .. o text_shape "Cacá" (Defante 11) da placa 13 — a BARRINHA das costas, acima do número — levado pra
                        barrinha igual do boneco montado (casada por forma: distância média 0,78 mm)
   FILAMENTO (6897-6904, 6912/6913): só o vermelho muda — Clássico = Vermelho Clássico (Bambu Lab PLA Lite Red, o do arquivo);
   Perolizado = Vermelho Perolizado da lista dele (Multfila Silk Vermelho Metalizado). Branco, preto, amarelo e o resto ficam.
   NOME GRÁTIS (6926), sem cor (6887): gravado na barrinha, na cor dela — no ARQUIVO o nome é um modificador na extrusora 1
   (branco). ATÉ a v57 o site gravava o nome pra dentro na cor da barrinha; DESDE a v58 (áudio 7201 do Cassiano, 06/10/2026:
   "esse nome não é negativo, é modificador, e tem que ser branco, obrigatoriamente branco") ele sai RENTE e BRANCO,
   a cor do modificador no arquivo. Abre com o nome do arquivo, "Cacá" (como os outros).
   O limite de letras é a barrinha útil na altura das letras (65,7 mm) menos 2 mm de cada lado: medir_limite_nome_urubu_v1.py.
   A janela 3D não troca de tamanho (como os comedouros, áudio 3019): o tamanho vai no pedido. */
window.ALEA.modelos3d['urubu-mascote-flamengo'] = {
  glb: 'modelos/urubu.glb?v=2026-10-06',
  acessorios: {
    glb: 'modelos/urubu_fixas.glb?v=2026-10-06',
    materiais: {   // a cor do ARQUIVO dele (Metadata/project_settings.config, filament_colour) — nada inventado
      branco:      { cor: '#F6F6F6', rugosidade: 0.95 },   // f1 ELEGOO PLA Matte White (o hex do site pra ela)
      preto:       { cor: '#272729', rugosidade: 0.75 },   // f2 eSUN PLA+ preto (#161616 no arquivo; o tom do Preto do site)
      amarelo:     { cor: '#FEC600', rugosidade: 0.7 },    // f3 Bambu PLA Basic (o bico)
      laranja:     { cor: '#FF671F', rugosidade: 0.7 },    // f5 Bambu PLA Lite Orange (as pupilas)
      dourado:     { cor: '#FFC107', rugosidade: 0.35 },   // f6 Multfila PLA Silk (as chuteiras)
      branco_silk: { cor: '#FFFFFF', rugosidade: 0.35 }    // f7 ELEGOO PLA Silk branco (cadarço, sola, detalhe da chuteira)
    }
  },
  nome: 'modelos/urubu_nome.json?v=2026-10-06',
  fonte: 'fonts/defante.otf',
  zonaNome: 'principal',
  /* v58 (06/10/2026, áudio 7201): o nome é MODIFICADOR no arquivo (text_shape "Cacá", subtype modifier_part, extruder 1 =
     ELEGOO PLA Matte White, filament_colour #FFFFFF; no site esse branco é o #F6F6F6 dos acessórios). MEDIDO no 3MF (trimesh,
     placa 13): 92% do volume da letra fica DENTRO da barrinha e a face passa no máximo 0,44 mm pra fora — o modificador só
     troca o filamento, não soma volume -> o nome sai RENTE à barrinha (`nomeRente`, personalizar3d.js v19), BRANCO SEMPRE:
     não segue o Filamento Clássico/Perolizado */
  nomeRente: true,
  corNomeFixa: { hex: '#F6F6F6', rugosidade: 0.95, acabamento: 'fosco', fonte: '3MF dele, modificador do nome = extrusora 1 (ELEGOO PLA Matte White)' },
  nomeAtras: true,
  textoFaltaNome: 'Por favor, digite o nome.',
  soUmModo: true,
  filamentoFixo: { titulo: 'Filamento', cor: 'Vermelho', acabamentos: ['basico', 'perolizado'] },
  folgaEnquadrar: 0.9,
  capa: { modo: 'monocromatico', escolhas: [{ acabamento: 'basico', cor: 'Vermelho' }] },
  original: {
    topo:      { site: 'Vermelho', hex: '#C6001A', acabamento: 'basico', oficial: 'Bambu Lab · PLA · Lite · Red (16200)' },
    principal: { site: 'Vermelho', hex: '#C6001A', acabamento: 'basico', oficial: 'Bambu Lab · PLA · Lite · Red (16200)' },
    base:      { site: 'Vermelho', hex: '#C6001A', acabamento: 'basico', oficial: 'Bambu Lab · PLA · Lite · Red (16200)' }
  }
};
/* LIMITE-NOME-URUBU (gerado por medir_limite_nome_urubu_v1.py — não editar à mão) */
window.ALEA.modelos3d['urubu-mascote-flamengo'].limiteNome = {"mm":61.7,"folgaMm":2.0,"larguras":{" ":[2.53,0,0],"!":[2.75,1.03,2.21],"\"":[3.24,0.35,2.88],"#":[7.79,0.36,7.41],"$":[6.54,0.47,6.06],"%":[8.09,0.43,7.66],"&":[7.63,0.47,7.08],"'":[1.9,0.35,1.54],"(":[3.06,0.49,2.78],")":[3.06,0.27,2.56],"*":[3.84,0.38,3.45],"+":[3.75,0.37,3.38],",":[1.85,0.33,1.52],"-":[3.65,0.32,3.32],".":[1.85,0.33,1.51],"/":[3.56,0.29,3.27],"0":[6.05,0.51,5.53],"1":[3.27,0.35,2.71],"2":[5.98,0.47,5.5],"3":[5.98,0.45,5.48],"4":[6.4,0.34,5.96],"5":[5.95,0.48,5.49],"6":[6.13,0.46,5.63],"7":[5.18,0.55,4.79],"8":[6.03,0.49,5.52],"9":[6.13,0.48,5.66],":":[1.98,0.4,1.58],";":[1.98,0.4,1.58],"<":[3.45,0.37,3.01],"=":[3.77,0.38,3.39],">":[3.45,0.44,3.07],"?":[5.72,0.29,5.31],"@":[9.32,0.43,8.85],"A":[6.11,0.05,6.05],"B":[6.48,0.55,6.14],"C":[6.55,0.26,6.33],"D":[6.4,0.55,6.13],"E":[5.78,0.55,5.58],"F":[5.75,0.55,5.58],"G":[6.64,0.26,6.36],"H":[6.68,0.55,6.13],"I":[2.28,0.55,1.73],"J":[6.19,0.16,5.74],"K":[6.3,0.55,6.13],"L":[5.75,0.55,5.58],"M":[7.94,0.55,7.39],"N":[6.69,0.55,6.13],"O":[6.69,0.26,6.42],"P":[6.26,0.55,6.14],"Q":[6.69,0.26,6.42],"R":[6.37,0.55,6.13],"S":[6.27,0.34,5.93],"T":[5.37,0.16,5.19],"U":[6.98,0.41,6.57],"V":[6.11,0.05,6.05],"W":[10.87,0.05,10.8],"X":[6.27,0.05,6.21],"Y":[6.27,0.05,6.21],"Z":[5.43,0.2,5.23],"[":[2.6,0.55,2.31],"\\":[3.56,0.29,3.27],"]":[2.6,0.27,2.04],"^":[3.7,0.31,3.38],"_":[4.72,0.32,4.4],"`":[2.09,0.29,1.74],"a":[5.36,0.23,4.95],"b":[5.62,0.51,5.32],"c":[5.16,0.27,4.96],"d":[5.62,0.3,5.11],"e":[5.34,0.27,5.04],"f":[3.57,0.51,3.71],"g":[5.59,0.29,5.32],"h":[5.73,0.51,5.32],"i":[2.2,0.51,1.69],"j":[2.21,-0.66,1.7],"k":[5.37,0.51,5.32],"l":[2.2,0.51,1.69],"m":[8.48,0.51,8.06],"n":[5.72,0.51,5.32],"o":[5.36,0.27,5.08],"p":[5.62,0.51,5.32],"q":[5.62,0.3,5.11],"r":[4.18,0.51,4.01],"s":[4.85,0.32,4.53],"t":[3.44,0.41,3.19],"u":[5.71,0.4,5.21],"v":[4.93,0.05,4.87],"w":[8.51,0.05,8.45],"x":[4.97,0.08,4.89],"y":[4.93,0.05,4.87],"z":[5.34,0.26,5.08],"{":[3.19,0.4,2.91],"|":[2.02,0.55,1.47],"}":[3.19,0.27,2.79],"~":[5.27,0.34,4.92]," ":[3.42,0,0],"¡":[2.22,0.52,1.7],"¢":[5.51,0.43,5.11],"£":[6.86,0.43,6.41],"¤":[5.08,0.42,4.66],"¥":[7.26,0.55,6.71],"¦":[1.99,0.53,1.45],"§":[6.6,0.51,6.09],"¨":[3.62,0.33,3.28],"©":[8.58,0.44,8.14],"ª":[4.45,0.42,3.99],"«":[6.28,0.31,5.95],"­":[0.0,0,0],"®":[8.59,0.44,8.14],"¯":[3.65,0.32,3.32],"°":[3.86,0.4,3.46],"±":[3.85,0.42,3.42],"²":[3.75,0.44,3.3],"³":[3.74,0.42,3.28],"´":[2.09,0.34,1.8],"¶":[8.3,0.35,7.92],"·":[1.85,0.33,1.51],"¸":[0.74,-0.11,0.91],"¹":[2.21,0.38,1.73],"»":[6.28,0.32,5.96],"¼":[7.94,0.37,7.52],"½":[7.89,0.37,7.46],"¾":[8.69,0.4,8.28],"¿":[5.7,0.38,5.41],"À":[6.11,0.05,6.05],"Á":[6.11,0.05,6.06],"Â":[6.66,0.6,6.6],"Ã":[6.11,0.05,6.05],"Ä":[6.11,0.05,6.05],"Å":[6.11,0.05,6.05],"Æ":[8.29,0.05,8.08],"Ç":[6.55,0.26,6.32],"È":[5.78,0.55,5.58],"É":[5.78,0.55,5.58],"Ê":[5.78,0.55,5.58],"Ë":[5.78,0.55,5.58],"Ì":[2.29,0.41,1.86],"Í":[2.29,0.42,1.87],"Î":[2.28,-0.24,2.52],"Ï":[2.3,-0.33,2.62],"Ñ":[6.69,0.55,6.13],"Ò":[6.69,0.26,6.42],"Ó":[6.69,0.26,6.42],"Ô":[6.69,0.26,6.42],"Õ":[6.69,0.26,6.42],"Ö":[6.69,0.26,6.42],"×":[3.53,0.37,3.15],"Ø":[6.79,0.31,6.47],"Ù":[6.98,0.41,6.57],"Ú":[6.98,0.41,6.57],"Û":[6.98,0.41,6.57],"Ü":[6.98,0.41,6.57],"Ý":[5.94,-0.11,6.05],"ß":[6.41,0.51,6.09],"à":[5.36,0.23,4.95],"á":[5.36,0.23,4.95],"â":[5.36,0.23,4.95],"ã":[5.36,0.23,4.95],"ä":[5.36,0.23,4.95],"å":[5.36,0.23,4.95],"æ":[8.84,0.23,8.53],"ç":[5.16,0.27,4.95],"è":[5.34,0.27,5.04],"é":[5.34,0.27,5.04],"ê":[5.34,0.27,5.04],"ë":[5.34,0.27,5.04],"ì":[2.19,0.36,1.82],"í":[2.19,0.36,1.82],"î":[2.19,-0.29,2.47],"ï":[2.18,-0.38,2.56],"ñ":[5.72,0.51,5.32],"ò":[5.36,0.27,5.08],"ó":[5.36,0.27,5.08],"ô":[5.36,0.27,5.08],"õ":[5.36,0.27,5.08],"ö":[5.36,0.27,5.08],"÷":[3.67,0.33,3.33],"ø":[5.42,0.31,5.11],"ù":[5.72,0.4,5.21],"ú":[5.72,0.4,5.21],"û":[5.72,0.4,5.21],"ü":[5.72,0.4,5.21],"ý":[4.93,0.05,4.87],"ÿ":[4.93,0.05,4.87],"Ā":[6.11,0.05,6.06],"ā":[5.36,0.23,4.95],"Ă":[6.11,0.05,6.05],"ă":[5.36,0.23,4.95],"Ą":[6.11,0.05,6.06],"ą":[5.37,0.23,4.95],"Ć":[6.55,0.26,6.33],"ć":[5.16,0.27,4.96],"Ĉ":[6.55,0.26,6.33],"ĉ":[5.16,0.27,4.96],"Ċ":[6.55,0.26,6.33],"ċ":[5.16,0.27,4.96],"Č":[6.55,0.26,6.33],"č":[5.16,0.27,4.96],"Ď":[6.4,0.55,6.13],"ď":[5.62,0.3,6.73],"Đ":[6.74,0.19,6.47],"đ":[5.62,0.3,5.81],"Ē":[5.78,0.55,5.58],"ē":[5.34,0.27,5.04],"Ĕ":[5.78,0.55,5.58],"ĕ":[5.34,0.27,5.04],"Ė":[5.78,0.55,5.58],"ė":[5.34,0.27,5.04],"Ę":[5.78,0.55,5.58],"ę":[5.34,0.27,5.03],"Ě":[5.78,0.55,5.58],"ě":[5.34,0.27,5.04],"Ĝ":[6.64,0.26,6.36],"ĝ":[5.6,0.29,5.32],"Ğ":[6.64,0.26,6.36],"ğ":[5.6,0.29,5.32],"Ġ":[6.64,0.26,6.36],"ġ":[5.6,0.29,5.32],"Ģ":[6.64,0.26,6.36],"ģ":[5.6,0.29,5.32],"Ĥ":[6.68,0.55,6.13],"ĥ":[5.72,0.51,5.32],"Ħ":[7.23,0.21,7.01],"ħ":[5.72,-0.2,5.31],"Ĩ":[2.28,-0.58,2.86],"ĩ":[2.19,-0.63,2.81],"Ī":[2.29,-0.36,2.64],"ī":[2.2,-0.41,2.6],"Ĭ":[2.28,-0.4,2.67],"ĭ":[2.19,-0.44,2.62],"Į":[2.28,0.55,1.73],"į":[2.2,0.51,1.69],"Ĵ":[6.11,0.09,6.45],"ĵ":[2.21,-0.66,2.49],"Ķ":[6.3,0.55,6.13],"ķ":[5.37,0.51,5.32],"Ĺ":[5.74,0.41,5.57],"ĺ":[2.19,0.36,1.82],"Ļ":[5.75,0.55,5.58],"ļ":[2.18,0.49,1.68],"Ľ":[5.75,0.55,5.58],"ľ":[2.19,0.51,3.31],"Ŀ":[5.75,0.55,5.58],"ŀ":[3.7,0.51,3.61],"Ł":[6.08,0.19,5.91],"ł":[3.3,0.14,3.15],"Ń":[6.69,0.55,6.13],"ń":[5.72,0.51,5.32],"Ņ":[6.69,0.55,6.13],"ņ":[5.71,0.49,5.31],"Ň":[6.69,0.55,6.14],"ň":[5.72,0.51,5.32],"Ō":[6.7,0.26,6.42],"ō":[5.36,0.27,5.08],"Ŏ":[6.69,0.26,6.42],"ŏ":[5.36,0.27,5.08],"Ő":[6.69,0.26,6.42],"ő":[5.36,0.27,5.08],"Œ":[10.48,0.26,10.28],"œ":[8.97,0.27,8.66],"Ŕ":[6.37,0.55,6.14],"ŕ":[4.18,0.51,4.01],"Ŗ":[6.37,0.55,6.14],"ŗ":[4.17,0.49,3.99],"Ř":[6.37,0.55,6.14],"ř":[4.18,0.51,4.01],"Ś":[6.27,0.34,5.93],"Ŝ":[6.28,0.34,5.93],"Ş":[6.27,0.34,5.93],"Š":[6.27,0.34,5.93],"Ţ":[5.37,0.16,5.19],"ţ":[3.43,0.41,3.19],"Ť":[5.37,0.16,5.19],"ť":[3.43,0.41,3.19],"Ŧ":[5.37,0.16,5.19],"ŧ":[3.89,0.15,3.57],"Ũ":[6.97,0.41,6.57],"ũ":[5.72,0.4,5.21],"Ū":[6.98,0.41,6.57],"ū":[5.72,0.4,5.21],"Ŭ":[6.98,0.41,6.57],"ŭ":[5.72,0.4,5.21],"Ů":[6.97,0.41,6.57],"ů":[5.72,0.4,5.21],"Ű":[6.98,0.41,6.57],"ű":[5.72,0.4,5.21],"Ų":[6.98,0.41,6.57],"ų":[5.73,0.4,5.21],"Ŵ":[10.73,-0.01,10.74],"ŵ":[8.51,0.05,8.45],"Ŷ":[5.94,-0.11,6.05],"ŷ":[4.93,0.05,4.87],"Ÿ":[5.94,-0.11,6.05],"Ź":[5.43,0.2,5.23],"ź":[5.34,0.26,5.08],"Ż":[5.43,0.2,5.23],"ż":[5.34,0.26,5.08],"Ž":[5.43,0.2,5.23],"ž":[5.34,0.26,5.08]}};
