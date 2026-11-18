// Desenha a mesa, as áreas (gavetas com aba colorida) e os cards na tela.
const Desenho = {
  arrastaveis: [],

  desenhar() {
    Desenho.destruirArrastaveis();
    Desenho.desenharCirculos();
    Desenho.desenharMesa();
  },

  destruirArrastaveis() {
    Desenho.arrastaveis.forEach((a) => a.destroy());
    Desenho.arrastaveis = [];
  },

  desenharCirculos() {
    const circulosEl = document.getElementById('circulos');
    circulosEl.innerHTML = '';

    Estado.circulos.forEach((nome, numero) => {
      const gaveta = Desenho.criarCirculo(nome, numero);
      circulosEl.appendChild(gaveta);
      Desenho.arrastaveis.push(Desenho.criarArrastavel(gaveta));
    });

    // As áreas podem ser arrastadas pela aba para mudar a ordem.
    Desenho.arrastaveis.push(Sortable.create(circulosEl, {
      group: 'circulos',
      draggable: '.circulo',
      // Qualquer parte da gaveta arrasta, exceto cards, botões e campos de texto.
      filter: '.card, button, input, .menu-circulo-opcoes',
      preventOnFilter: false,
      animation: 150,
      onEnd: () => Circulos.aoReordenarCirculos(),
    }));
  },

  criarCirculo(nome, numero) {
    const cor = Estado.cores[numero] ?? Estado.COR_PADRAO;

    const gaveta = document.createElement('div');
    gaveta.className = 'gaveta circulo';
    gaveta.dataset.circulo = String(numero);
    gaveta.style.setProperty('--cor', cor);
    gaveta.style.setProperty('--texto', Utilitarios.corDoTexto(cor));

    const topo = document.createElement('div');
    topo.className = 'gaveta-topo';

    const titulo = document.createElement('h2');
    titulo.textContent = nome;
    topo.appendChild(titulo);

    const [botaoMenu, menu] = Desenho.criarMenuCirculo(gaveta, titulo, numero, cor);
    topo.appendChild(botaoMenu);
    gaveta.append(topo, menu);

    Estado.cards.forEach((card, indice) => {
      if (card.circulo === numero) gaveta.appendChild(Desenho.criarCard(card, indice));
    });

    return gaveta;
  },

  // Devolve o botão ☰ (na aba) e o menu que ele abre (na gaveta).
  criarMenuCirculo(gaveta, titulo, numero, cor) {
    const botaoMenu = document.createElement('button');
    botaoMenu.type = 'button';
    botaoMenu.className = 'menu-circulo';
    botaoMenu.textContent = '☰';
    botaoMenu.setAttribute('aria-label', 'Menu do círculo');

    const menu = document.createElement('div');
    menu.className = 'menu-circulo-opcoes';
    menu.hidden = true;

    const btnEditar = document.createElement('button');
    btnEditar.type = 'button';
    btnEditar.textContent = 'Editar nome';
    btnEditar.addEventListener('click', () => {
      menu.hidden = true;
      Circulos.editarNome(titulo, numero);
    });

    const btnApagar = document.createElement('button');
    btnApagar.type = 'button';
    btnApagar.textContent = 'Apagar círculo';
    btnApagar.addEventListener('click', () => Circulos.apagarCirculo(numero));

    menu.append(btnEditar, Desenho.criarSeletorCor(gaveta, numero, cor), btnApagar);

    botaoMenu.addEventListener('click', () => {
      menu.hidden = !menu.hidden;
    });

    return [botaoMenu, menu];
  },

  // Seletor de cor: mostra a cor na hora, sem redesenhar (o menu continua aberto).
  criarSeletorCor(gaveta, numero, cor) {
    const rotuloCor = document.createElement('label');
    rotuloCor.className = 'opcao-cor';
    rotuloCor.textContent = 'Cor';

    const seletorCor = document.createElement('input');
    seletorCor.type = 'color';
    seletorCor.value = cor;
    seletorCor.addEventListener('input', () => {
      Estado.cores[numero] = seletorCor.value;
      gaveta.style.setProperty('--cor', seletorCor.value);
      gaveta.style.setProperty('--texto', Utilitarios.corDoTexto(seletorCor.value));
      Estado.salvarCores();
    });

    rotuloCor.appendChild(seletorCor);
    return rotuloCor;
  },

  desenharMesa() {
    const lista = document.getElementById('lista');
    lista.innerHTML = '';

    const naMesa = Estado.cards
      .map((card, indice) => ({ card, indice }))
      .filter(({ card }) => card.circulo === null);

    if (naMesa.length === 0) {
      const vazio = document.createElement('div');
      vazio.className = 'vazio';
      vazio.textContent = 'Nada na mesa.';
      lista.appendChild(vazio);
    }
    for (const { card, indice } of naMesa) {
      lista.appendChild(Desenho.criarCard(card, indice));
    }

    Desenho.arrastaveis.push(Desenho.criarArrastavel(lista));
  },

  criarCard(card, indice) {
    const el = document.createElement('div');
    el.className = 'card';
    el.dataset.indice = String(indice);
    el.textContent = card.texto;
    return el;
  },

  criarArrastavel(el) {
    return Sortable.create(el, {
      group: 'cabeca',
      draggable: '.card',
      animation: 150,
      onEnd: () => Cards.aoSoltar(),
    });
  },
};
