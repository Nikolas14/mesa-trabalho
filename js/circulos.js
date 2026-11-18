// Ações sobre os círculos: criar, renomear, apagar e reordenar.
const Circulos = {
  // Cria um círculo novo com nome automático e cor padrão.
  novo() {
    Estado.circulos.push('Área ' + (Estado.circulos.length + 1));
    Estado.cores.push(Estado.COR_PADRAO);
    Estado.salvarCores();
    Estado.salvarCirculos();
    Desenho.desenhar();
  },

  // Troca o título do círculo por um campo para digitar o novo nome.
  editarNome(titulo, numero) {
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'nome-edicao';
    input.value = Estado.circulos[numero];
    titulo.replaceWith(input);
    input.focus();
    input.select();

    let concluido = false;
    const concluir = (salvarAlteracao) => {
      if (concluido) return;
      concluido = true;
      const novo = input.value.trim();
      if (salvarAlteracao && novo) {
        Estado.circulos[numero] = novo;
        Estado.salvarCirculos();
      }
      Desenho.desenhar();
    };

    input.addEventListener('keydown', (evento) => {
      if (evento.key === 'Enter') concluir(true);
      if (evento.key === 'Escape') concluir(false);
    });
    input.addEventListener('blur', () => concluir(true));
  },

  // Apaga o círculo. Os cards dele voltam para a mesa e os demais são reindexados.
  apagarCirculo(numero) {
    Estado.cards.forEach((c) => {
      if (c.circulo === numero) {
        c.circulo = null;
      } else if (c.circulo !== null && c.circulo > numero) {
        c.circulo -= 1;
      }
    });
    Estado.circulos.splice(numero, 1);
    Estado.cores.splice(numero, 1);
    Estado.salvarCores();
    Estado.salvarCirculos();
    Estado.salvarCards();
    Desenho.desenhar();
  },

  // Lê a nova ordem dos círculos no DOM. Os cards guardam o índice do círculo, então são remapeados.
  aoReordenarCirculos() {
    const ordem = [...document.getElementById('circulos').children].map((el) => Number(el.dataset.circulo));
    const novaPosicao = new Map(ordem.map((antigo, novo) => [antigo, novo]));

    Estado.cards.forEach((c) => {
      if (c.circulo !== null) c.circulo = novaPosicao.get(c.circulo);
    });
    Estado.circulos = ordem.map((antigo) => Estado.circulos[antigo]);
    Estado.cores = ordem.map((antigo) => Estado.cores[antigo]);

    Estado.salvarCores();
    Estado.salvarCirculos();
    Estado.salvarCards();
    Desenho.desenhar();
  },
};
