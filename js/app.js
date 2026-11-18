// Ponto de entrada: carrega os dados, liga os eventos e desenha a tela.
// Precisa ser o último script de index.html.
const App = {
  iniciar() {
    Estado.iniciar();
    Sugestoes.iniciar();
    Captura.iniciar();
    Menu.iniciar();
    Lixeira.iniciar();
    Desenho.desenhar();
  },
};

App.iniciar();
