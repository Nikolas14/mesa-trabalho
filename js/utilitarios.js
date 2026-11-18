// Funções puras usadas por vários módulos.
const Utilitarios = {
  // Ignora maiúsculas e acentos: "pao" encontra "Pão".
  normalizar(texto) {
    return texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
  },

  // Texto escuro em fundo claro, texto claro em fundo escuro.
  corDoTexto(hex) {
    const n = parseInt(hex.slice(1), 16);
    const r = (n >> 16) & 255;
    const g = (n >> 8) & 255;
    const b = n & 255;
    return r * 0.299 + g * 0.587 + b * 0.114 > 150 ? '#222' : '#fff';
  },
};
