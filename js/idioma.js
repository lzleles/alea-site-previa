/* CATALOGO:
   nome: idioma
   categoria: UTIL
   objetivo: Versão em inglês do site (pedido do Cassiano, áudios 6928/6930/6932/6935 e print 6934, 06/10/2026). Põe no topo as
      duas bandeiras (Brasil "PT" / EUA "EN"), centralizadas entre o logo 3D e os botões da direita; guarda a escolha no
      aparelho e, em inglês, troca na hora todo texto da página pelo dicionário js/idioma-en.js.
   entrada: localStorage alea_idioma ('pt' | 'en'), ?lang=en|pt no endereço, window.ALEA_EN (dicionário) e o DOM de cada página
   saida: as bandeiras no topo; em inglês, os textos e os atributos (aria-label, placeholder, title, alt) traduzidos
   status: ativo (v1)
   validado_em: 06/10/2026 (_testar_idioma_v1_2026-10-06.py)
   COMO FUNCIONA
   - Carregado pelo site.js (toda página tem o site.js): as páginas de produto são GERADAS e uma tag escrita à mão nelas some.
   - Português é o site como ele é: nada é carregado nem trocado. Em inglês, o dicionário é carregado e cada texto da página
     é procurado nele (exato, espaços juntados) ou nas regras com número (window.ALEA_EN_RE). O que aparece depois (feed,
     sacola, 3D, busca, gavetas) entra pelo MutationObserver e é traduzido igual.
   - Texto que não está no dicionário fica em português e entra na lista window.aleaIdioma.faltando() — é por ela que o
     teste acha o que falta traduzir.
   - Nome de peça (ālea …), preço (R$) e categoria (PET, HOME…) não se traduzem: são marca.
   - Trocar de idioma recarrega a página (volta tudo do zero, sem resto de tradução).
*/
(function () {
  var CHAVE = 'alea_idioma';
  var url = null;
  try { url = new URLSearchParams(location.search).get('lang'); } catch (e) { /* navegador antigo */ }
  if (url === 'en' || url === 'pt') { try { localStorage.setItem(CHAVE, url); } catch (e) { /* aba anônima */ } }
  var lang = 'pt';
  try { lang = localStorage.getItem(CHAVE) === 'en' ? 'en' : 'pt'; } catch (e) { /* aba anônima */ }
  if (url === 'en') lang = 'en';

  var eu = document.currentScript;
  var pastaJs = eu && eu.src ? eu.src.replace(/idioma\.js(\?.*)?$/, '') : 'js/';

  /* ------------------------------------------------------------------ as bandeiras */
  var BR = '<svg viewBox="0 0 28 20" aria-hidden="true"><rect width="28" height="20" rx="2.5" fill="#229e45"/>' +
    '<path d="M14 3 25 10 14 17 3 10z" fill="#f8e509"/><circle cx="14" cy="10" r="4.2" fill="#2b49a3"/>' +
    '<path d="M10 9.3c2.7-.6 5.6-.2 7.9 1.1" stroke="#fff" stroke-width=".8" fill="none"/></svg>';
  var US = '<svg viewBox="0 0 28 20" aria-hidden="true"><defs><clipPath id="alea-us"><rect width="28" height="20" rx="2.5"/></clipPath></defs>' +
    '<g clip-path="url(#alea-us)"><rect width="28" height="20" fill="#fff"/>' +
    [0, 2, 4, 6, 8, 10, 12].map(function (i) { return '<rect y="' + (i * 20 / 13) + '" width="28" height="' + (20 / 13) + '" fill="#b22234"/>'; }).join('') +
    '<rect width="12" height="' + (7 * 20 / 13) + '" fill="#3c3b6e"/>' +
    [[2, 2], [5, 2], [8, 2], [3.5, 4.3], [6.5, 4.3], [2, 6.6], [5, 6.6], [8, 6.6], [3.5, 8.9], [6.5, 8.9]].map(function (p) {
      return '<circle cx="' + (p[0] + 1) + '" cy="' + p[1] + '" r=".6" fill="#fff"/>';
    }).join('') + '</g></svg>';

  function montarBandeiras() {
    var topo = document.querySelector('header.topo');
    if (!topo || topo.querySelector('.idiomas')) return;
    var caixa = document.createElement('div');
    caixa.className = 'idiomas';
    caixa.setAttribute('data-sem-traducao', '');
    caixa.setAttribute('role', 'group');
    caixa.setAttribute('aria-label', lang === 'en' ? 'Language' : 'Idioma');
    [['pt', BR, 'PT', 'Português'], ['en', US, 'EN', 'English']].forEach(function (o) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'idioma' + (o[0] === lang ? ' ativo' : '');
      b.setAttribute('data-idioma', o[0]);
      b.setAttribute('aria-pressed', o[0] === lang ? 'true' : 'false');
      b.setAttribute('aria-label', o[3]);
      b.setAttribute('lang', o[0] === 'en' ? 'en' : 'pt-BR');
      b.innerHTML = '<span class="bandeira">' + o[1] + '</span><span class="sigla">' + o[2] + '</span>';
      b.addEventListener('click', function () {
        if (o[0] === lang) return;
        try { localStorage.setItem(CHAVE, o[0]); } catch (e) { /* aba anônima */ }
        var u = new URL(location.href);
        if (u.searchParams.has('lang')) { u.searchParams.delete('lang'); location.replace(u.toString()); return; }
        location.reload();
      });
      caixa.appendChild(b);
    });
    var nav = topo.querySelector('nav');
    if (nav) topo.insertBefore(caixa, nav); else topo.appendChild(caixa);
  }

  /* ------------------------------------------------------------------ a tradução */
  var D = {}, RE = [], FALTA = {};
  var PULA = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, TEXTAREA: 1, CODE: 1, PRE: 1, svg: 1, SVG: 1 };
  var ATRIBUTOS = ['aria-label', 'placeholder', 'title', 'alt'];
  var TEM_LETRA = /[A-Za-zÀ-ÿ]/;

  function junta(s) { s = s.replace(/\s+/g, ' ').trim(); return s.normalize ? s.normalize('NFC') : s; }
  var JA_EN = {};   // o que ja e traducao: nao se traduz de novo nem conta como faltando

  function marca(s) {
    /* nome de peça, categoria e preço ficam como estão */
    return /^ā?lea\b/i.test(s) || /^(PET|HOME|FAN|GLOW|PLAY|SENSE|CUSTOM|DESK|AURA|DECOR|DAILY|MEET)$/.test(s) || /^R\$\s?[\d.,]+$/.test(s) ||
      /^[×x]\s/.test(s) || !TEM_LETRA.test(s);
  }

  function traduz(s) {
    var n = junta(s);
    if (!n) return null;
    if (Object.prototype.hasOwnProperty.call(D, n)) return D[n];
    if (JA_EN[n]) return null;
    for (var i = 0; i < RE.length; i++) {
      var m = n.match(RE[i][0]);
      if (m) return typeof RE[i][1] === 'function' ? RE[i][1].apply(null, m) : n.replace(RE[i][0], RE[i][1]);
    }
    if (!marca(n)) FALTA[n] = (FALTA[n] || 0) + 1;
    return null;
  }

  function pulavel(el) {
    for (var e = el; e && e !== document.body; e = e.parentNode) {
      if (e.nodeType !== 1) continue;
      if (PULA[e.nodeName] || e.__aleaBloco || e.hasAttribute('data-sem-traducao') || e.isContentEditable) return true;
    }
    return false;
  }

  function texto(no) {
    var v = no.nodeValue;
    if (!v || !TEM_LETRA.test(v) || no.__aleaEn === v) return;
    if (pulavel(no.parentNode)) return;
    var t = traduz(v);
    if (t == null) return;
    var antes = v.match(/^\s*/)[0], depois = v.match(/\s*$/)[0];
    var novo = antes + t + depois;
    no.__aleaEn = novo;
    JA_EN[junta(t)] = 1;   // a frase que saiu de uma regra (ex.: "Bag with 2 items") tambem ja e traducao
    if (novo !== v) no.nodeValue = novo;
  }

  function atributos(el) {
    if (pulavel(el)) return;
    for (var i = 0; i < ATRIBUTOS.length; i++) {
      var a = ATRIBUTOS[i], v = el.getAttribute(a);
      if (!v || !TEM_LETRA.test(v)) continue;
      var t = traduz(v);
      if (t != null && t !== v) { JA_EN[junta(t)] = 1; el.setAttribute(a, t); }
    }
    if (el.tagName === 'INPUT' && /^(button|submit)$/i.test(el.type) && el.value) {
      var tv = traduz(el.value);
      if (tv != null && tv !== el.value) el.value = tv;
    }
  }

  /* parágrafo com negrito/link/itálico no meio: traduzido INTEIRO (a chave é o HTML de dentro, espaços juntados), senão
     a frase sairia picada em pedaços. Só bloco cujos filhos são todos de linha. */
  var BLOCOS = 'p,li,h1,h2,h3,h4,h5,h6,dd,dt,label,figcaption,blockquote,td,th,small,button,a,span';
  var DE_LINHA = { STRONG: 1, EM: 1, B: 1, I: 1, A: 1, BR: 1, SPAN: 1, SMALL: 1, U: 1, MARK: 1 };
  function blocoInteiro(el) {
    if (el.__aleaBloco || !el.firstElementChild || pulavel(el)) return;
    for (var c = el.firstElementChild; c; c = c.nextElementSibling) { if (!DE_LINHA[c.tagName] || c.firstElementChild && c.tagName !== 'A') return; }
    var chave = junta(el.innerHTML);
    if (!TEM_LETRA.test(el.textContent || '')) return;
    if (Object.prototype.hasOwnProperty.call(D, chave)) { el.innerHTML = D[chave]; el.__aleaBloco = 1; return; }
    for (var i = 0; i < RE.length; i++) {   // bloco com numero (ex.: "Um detalhe que transforma + R$ 10,00<small>...")
      var m = chave.match(RE[i][0]);
      if (m) { el.innerHTML = typeof RE[i][1] === 'function' ? RE[i][1].apply(null, m) : chave.replace(RE[i][0], RE[i][1]); el.__aleaBloco = 1; return; }
    }
    if (!marca(junta(el.textContent)) && !jaTraduzido(el)) BLOCO_FALTA[chave] = junta(el.textContent);
  }
  var BLOCO_FALTA = {};
  /* bloco cujos pedacos de texto ja sao todos ingles (traduzidos um a um, ou ja traducao): nao conta como faltando */
  function jaTraduzido(el) {
    var w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null), n, algum = false;
    while ((n = w.nextNode())) {
      var j = junta(n.nodeValue || '');
      if (!j || !TEM_LETRA.test(j)) continue;
      algum = true;
      if (!(n.__aleaEn || JA_EN[j] || marca(j))) return false;
    }
    return algum;
  }

  function varrer(raiz) {
    if (!raiz) return;
    if (raiz.nodeType === 3) { texto(raiz); return; }
    if (raiz.nodeType !== 1 && raiz.nodeType !== 9 && raiz.nodeType !== 11) return;
    if (raiz.nodeType === 1 && raiz.matches(BLOCOS)) blocoInteiro(raiz);
    if (raiz.querySelectorAll) Array.prototype.forEach.call(raiz.querySelectorAll(BLOCOS), blocoInteiro);
    if (raiz.nodeType === 1) atributos(raiz);
    var w = document.createTreeWalker(raiz, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, null);
    var n;
    while ((n = w.nextNode())) {
      if (n.nodeType === 3) texto(n); else atributos(n);
    }
  }

  function traduzirTitulo() {
    var t = traduz(document.title);
    if (t != null) document.title = t;
    var m = document.querySelector('meta[name="description"]');
    if (m) { var d = traduz(m.getAttribute('content') || ''); if (d != null) m.setAttribute('content', d); }
  }

  function ligarObservador() {
    var pendentes = [], marcado = false;
    var obs = new MutationObserver(function (lista) {
      for (var i = 0; i < lista.length; i++) {
        var r = lista[i];
        if (r.type === 'childList') { for (var j = 0; j < r.addedNodes.length; j++) pendentes.push(r.addedNodes[j]); }
        else if (r.type === 'characterData') pendentes.push(r.target);
        else if (r.type === 'attributes') pendentes.push(r.target);
      }
      if (marcado) return;
      marcado = true;
      Promise.resolve().then(function () {
        marcado = false;
        var l = pendentes; pendentes = [];
        for (var k = 0; k < l.length; k++) {
          var no = l[k];
          if (no.nodeType === 1 && no.isConnected) varrer(no);
          else if (no.nodeType === 3 && no.isConnected) texto(no);
        }
      });
    });
    obs.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATRIBUTOS });
    new MutationObserver(traduzirTitulo).observe(document.querySelector('title') || document.head, { childList: true, characterData: true, subtree: true });
  }

  function aplicar() {
    D = {};
    var orig = window.ALEA_EN || {};
    Object.keys(orig).forEach(function (k) {
      var kn = k.normalize ? k.normalize('NFC') : k;
      D[kn] = orig[k];
      if (kn !== k) orig[kn] = orig[k];   // as regras com funcao (idioma-en.js) consultam o window.ALEA_EN direto
      var v = orig[k];
      JA_EN[junta(v)] = 1;
      if (v.indexOf('<') >= 0) {   // os pedacos de texto de dentro de um bloco traduzido tambem ja sao traducao
        var tmp = document.createElement('div'); tmp.innerHTML = v;
        var w = document.createTreeWalker(tmp, NodeFilter.SHOW_TEXT, null), n;
        while ((n = w.nextNode())) { var j = junta(n.nodeValue); if (j) JA_EN[j] = 1; }
      }
    });
    RE = window.ALEA_EN_RE || [];
    traduzirTitulo();
    varrer(document.body);
    ligarObservador();
    document.documentElement.classList.remove('idioma-carregando');
    document.dispatchEvent(new CustomEvent('alea:idioma-pronto'));
  }

  window.aleaIdioma = {
    lang: lang,
    traduz: function (s) { return lang === 'en' ? (traduz(s) || s) : s; },
    faltando: function () { return Object.keys(FALTA).sort(); },
    blocosFaltando: function () { return BLOCO_FALTA; }
  };

  function iniciar() {
    montarBandeiras();
    if (lang !== 'en') return;
    if (window.ALEA_EN) { aplicar(); return; }
    var s = document.createElement('script');
    s.src = pastaJs + 'idioma-en.js';
    s.onload = aplicar;
    s.onerror = function () { document.documentElement.classList.remove('idioma-carregando'); };
    document.head.appendChild(s);
  }

  if (lang === 'en') {
    document.documentElement.lang = 'en';
    document.documentElement.classList.add('idioma-carregando');
    setTimeout(function () { document.documentElement.classList.remove('idioma-carregando'); }, 2500);   // nunca deixa a página escondida
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar); else iniciar();
})();
