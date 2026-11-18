// Dados da aplicação (cards, círculos e cores) e como são salvos no navegador.
const Estado = {
  CHAVE: 'mesa.v1',
  CHAVE_CIRCULOS: 'mesa.circulos.v1',
  CHAVE_CORES: 'mesa.cores.v1',
  COR_PADRAO: '#ffffff',

  cards: [],
  circulos: [],
  cores: [],

  // Carrega tudo. Cores dependem dos círculos, então círculos vêm primeiro.
  iniciar() {
    Estado.circulos = Estado.carregarCirculos();
    Estado.cores = Estado.carregarCores();
    Estado.cards = Estado.carregarCards();
  },

  carregarCards() {
    try {
      const dados = JSON.parse(localStorage.getItem(Estado.CHAVE));
      if (!Array.isArray(dados)) return [];
      return dados.map((c) => ({
        texto: String(c.texto ?? ''),
        criadoEm: c.criadoEm ?? new Date().toISOString(),
        circulo: Number.isInteger(c.circulo) ? c.circulo : null,
      }));
    } catch {
      return [];
    }
  },

  salvarCards() {
    localStorage.setItem(Estado.CHAVE, JSON.stringify(Estado.cards));
  },

  carregarCirculos() {
    try {
      const dados = JSON.parse(localStorage.getItem(Estado.CHAVE_CIRCULOS));
      if (Array.isArray(dados) && dados.length > 0 && dados.every((n) => typeof n === 'string')) {
        return dados;
      }
    } catch {
      // cai no padrão abaixo
    }
    return ['Área 1', 'Área 2', 'Área 3'];
  },

  salvarCirculos() {
    localStorage.setItem(Estado.CHAVE_CIRCULOS, JSON.stringify(Estado.circulos));
  },

  // Uma cor por círculo, na mesma ordem de "circulos". Círculos sem cor salva ficam brancos.
  carregarCores() {
    let salvas = [];
    try {
      const dados = JSON.parse(localStorage.getItem(Estado.CHAVE_CORES));
      if (Array.isArray(dados)) salvas = dados;
    } catch {
      // sem cores válidas: todos ficam com a cor padrão
    }
    return Estado.circulos.map((_, i) => (typeof salvas[i] === 'string' ? salvas[i] : Estado.COR_PADRAO));
  },

  salvarCores() {
    localStorage.setItem(Estado.CHAVE_CORES, JSON.stringify(Estado.cores));
  },
};
