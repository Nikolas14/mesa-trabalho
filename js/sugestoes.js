// Lista de círculos que aparece quando o texto tem "/".
const Sugestoes = {
  elemento: null,
  lista: [],
  ativa: 0,

  iniciar() {
    Sugestoes.elemento = document.getElementById('sugestoes');
  },

  estaAberta() {
    return !Sugestoes.elemento.hidden && Sugestoes.lista.length > 0;
  },

  // Recalcula as sugestões a partir do que vem depois da última "/".
  atualizar() {
    const valor = Captura.campo.value;
    const pos = valor.lastIndexOf('/');
    if (pos === -1) {
      Sugestoes.fechar();
      return;
    }
    const termo = valor.slice(pos + 1).trim();
    Sugestoes.lista = Estado.circulos
      .map((nome, indice) => ({ nome, indice }))
      .filter(({ nome }) => Utilitarios.normalizar(nome).includes(Utilitarios.normalizar(termo)));
    Sugestoes.ativa = 0;
    Sugestoes.desenhar();
  },

  desenhar() {
    Sugestoes.elemento.innerHTML = '';
    if (Sugestoes.lista.length === 0) {
      Sugestoes.elemento.hidden = true;
      return;
    }
    Sugestoes.lista.forEach((s, i) => {
      const li = document.createElement('li');
      li.textContent = s.nome;
      if (i === Sugestoes.ativa) li.className = 'ativa';
      // mousedown (e não click) para o campo não perder o foco antes.
      li.addEventListener('mousedown', (evento) => {
        evento.preventDefault();
        Sugestoes.completar(s.indice);
      });
      Sugestoes.elemento.appendChild(li);
    });
    Sugestoes.elemento.hidden = false;
  },

  proxima() {
    Sugestoes.ativa = (Sugestoes.ativa + 1) % Sugestoes.lista.length;
    Sugestoes.desenhar();
  },

  anterior() {
    Sugestoes.ativa = (Sugestoes.ativa - 1 + Sugestoes.lista.length) % Sugestoes.lista.length;
    Sugestoes.desenhar();
  },

  ativaAtual() {
    return Sugestoes.lista[Sugestoes.ativa];
  },

  fechar() {
    Sugestoes.lista = [];
    Sugestoes.elemento.hidden = true;
  },

  // Troca o termo depois de "/" pelo nome completo do círculo.
  completar(indice) {
    const valor = Captura.campo.value;
    const pos = valor.lastIndexOf('/');
    Captura.campo.value = valor.slice(0, pos) + '/' + Estado.circulos[indice];
    Sugestoes.fechar();
    Captura.campo.focus();
  },
};
