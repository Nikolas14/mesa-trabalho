// Campo do topo: Enter cria card, "/" escolhe o círculo.
const Captura = {
  campo: null,

  iniciar() {
    Captura.campo = document.getElementById('captura');
    Captura.campo.addEventListener('input', () => Sugestoes.atualizar());
    Captura.campo.addEventListener('blur', () => Sugestoes.fechar());
    Captura.campo.addEventListener('keydown', (evento) => Captura.aoTeclar(evento));
  },

  aoTeclar(evento) {
    if (Sugestoes.estaAberta()) {
      if (evento.key === 'ArrowDown') {
        evento.preventDefault();
        Sugestoes.proxima();
        return;
      }
      if (evento.key === 'ArrowUp') {
        evento.preventDefault();
        Sugestoes.anterior();
        return;
      }
      if (evento.key === 'Escape') {
        Sugestoes.fechar();
        return;
      }
      if (evento.key === 'Tab') {
        evento.preventDefault();
        Sugestoes.completar(Sugestoes.ativaAtual().indice);
        return;
      }
    }

    if (evento.key !== 'Enter') return;
    if (Captura.classificarPeloNome()) {
      evento.preventDefault();
      return;
    }

    const texto = Captura.campo.value.trim();
    if (!texto) return;
    Cards.adicionar(texto, null);
    Captura.campo.value = '';
    Sugestoes.fechar();
  },

  // Enter com "texto /Círculo" ou "/Círculo texto" cria o card no círculo.
  // Devolve true se tratou o Enter.
  classificarPeloNome() {
    const separado = Captura.separarCirculo(Captura.campo.value);
    if (!separado) return false;
    if (!separado.texto) return true; // sem texto não cria card

    Cards.adicionar(separado.texto, separado.indice);
    Captura.campo.value = '';
    Sugestoes.fechar();
    return true;
  },

  // Devolve {texto, indice} ou null se não há círculo válido no texto.
  separarCirculo(bruto) {
    const pos = bruto.lastIndexOf('/');
    if (pos === -1) return null;

    const depois = bruto.slice(pos + 1).trim();
    const palavras = depois.split(/\s+/).filter(Boolean);

    const exato = Estado.circulos.findIndex((n) => Utilitarios.normalizar(n) === Utilitarios.normalizar(depois));
    if (exato !== -1) {
      // Formato "texto /Círculo": o círculo é o que vem depois da barra.
      return { texto: bruto.slice(0, pos).trim(), indice: exato };
    }

    // Formato "/Círculo texto": o círculo é o nome logo depois da barra; o resto é o card.
    const inicio = Captura.circuloNoInicio(palavras);
    if (!inicio) return null;
    return { texto: palavras.slice(inicio.tamanho).join(' '), indice: inicio.indice };
  },

  // Acha o círculo cujo nome aparece no começo das palavras. Se houver mais de um, vence o nome mais longo.
  circuloNoInicio(palavras) {
    let melhor = null;
    Estado.circulos.forEach((n, i) => {
      const nomePalavras = Utilitarios.normalizar(n).split(/\s+/).filter(Boolean);
      const casa =
        nomePalavras.length > 0 &&
        nomePalavras.length <= palavras.length &&
        nomePalavras.every((p, k) => Utilitarios.normalizar(palavras[k]) === p);
      if (casa && (!melhor || nomePalavras.length > melhor.tamanho)) {
        melhor = { indice: i, tamanho: nomePalavras.length };
      }
    });
    return melhor;
  },
};
