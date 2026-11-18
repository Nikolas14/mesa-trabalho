// Botão flutuante "+" que abre as opções (hoje: criar círculo).
const Menu = {
  iniciar() {
    const botaoMais = document.getElementById('botao-mais');
    const opcoes = document.getElementById('opcoes');

    botaoMais.addEventListener('click', () => {
      opcoes.hidden = !opcoes.hidden;
      botaoMais.setAttribute('aria-expanded', String(!opcoes.hidden));
    });

    opcoes.addEventListener('click', (evento) => {
      if (evento.target.dataset.acao !== 'novo') return;
      opcoes.hidden = true;
      botaoMais.setAttribute('aria-expanded', 'false');
      Circulos.novo();
    });
  },
};
