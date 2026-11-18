// Lixeira: quando um card é solto aqui, ele some.
const Lixeira = {
  iniciar() {
    Sortable.create(document.getElementById('lixeira'), {
      group: 'cabeca',
      sort: false,
      onAdd(evento) {
        const indice = Number(evento.item.dataset.indice);
        evento.item.remove();
        Estado.cards[indice].apagado = true;
        // Espera o fim do arrastar atual antes de redesenhar.
        setTimeout(() => Lixeira.esvaziar(), 0);
      },
    });
  },

  // Tira de vez os cards marcados como apagados.
  esvaziar() {
    Estado.cards = Estado.cards.filter((c) => !c.apagado);
    Estado.salvarCards();
    Desenho.desenhar();
  },
};
