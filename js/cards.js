// Ações sobre os cards: criar e mover entre a mesa e os círculos.
const Cards = {
  // Adiciona um card. circulo é o índice do círculo, ou null para a mesa.
  adicionar(texto, circulo) {
    Estado.cards.push({ texto, criadoEm: new Date().toISOString(), circulo });
    Estado.salvarCards();
    Desenho.desenhar();
  },

  // Lê onde cada card ficou no DOM e grava no estado.
  aoSoltar() {
    document.querySelectorAll('[data-circulo]').forEach((zona) => {
      const destino = zona.dataset.circulo === 'mesa' ? null : Number(zona.dataset.circulo);
      zona.querySelectorAll('.card').forEach((el) => {
        Estado.cards[Number(el.dataset.indice)].circulo = destino;
      });
    });
    Estado.salvarCards();
    Desenho.desenhar();
  },
};
