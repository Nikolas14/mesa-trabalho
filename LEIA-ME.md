# Mesa de Trabalho do Nikolas

Programa para anotar e organizar as coisas do dia a dia.

## Como usar

- Digite no campo do topo e aperte Enter. O texto cai na **Mesa**.
- `texto /Nome do círculo` + Enter cria o card direto no círculo. `/Nome do círculo texto` também funciona.
- Digite `/` para ver os círculos. Setas escolhem, Tab completa. Acentos e maiúsculas são ignorados.
- Arraste cards entre a mesa e os círculos. Arraste um círculo pelo título para mudar a ordem.
- Menu ☰ de cada círculo: editar nome, mudar a cor, apagar (os cards voltam para a mesa).
- Botão **+** (canto inferior esquerdo) > **Novo círculo**.
- Arraste um card para a **lixeira** (canto inferior direito) para apagá-lo.

## Como executar

Abra `index.html` no navegador (duplo clique). Não precisa de servidor.
Precisa de JavaScript ativo e de internet na primeira carga, para baixar o Sortable.js (CDN).

## Estrutura

```
index.html          estrutura da página e ordem dos scripts
css/estilo.css      todo o estilo (cantos suaves, abas coloridas)
PRODUCT.md          contexto do produto (usuários, trabalhos, restrições)
.impeccable/        brief da superfície e artefatos do processo de design
js/
  utilitarios.js    normalizar, corDoTexto
  estado.js         cards, círculos, cores e salvamento no navegador
  desenho.js        desenha a mesa, os círculos e os cards
  circulos.js       criar, renomear, apagar e reordenar círculos
  cards.js          adicionar cards e mover entre mesa e círculos
  sugestoes.js      lista de círculos ao digitar "/"
  captura.js        campo do topo: Enter, Tab, setas e "texto /Círculo"
  menu.js           botão "+" e "Novo círculo"
  lixeira.js        apagar cards arrastando para a lixeira
  app.js            ponto de entrada: inicia tudo (sempre o último)
```

Cada arquivo de `js/` é um objeto com métodos (ex.: `Circulos.apagarCirculo()`).

## Dados salvos

Ficam só no navegador onde o programa foi usado (`localStorage`):

- `mesa.v1`: cards
- `mesa.circulos.v1`: nomes dos círculos
- `mesa.cores.v1`: cores dos círculos

## Decisões técnicas

- **Scripts comuns, sem módulos ES.** Assim funciona com duplo clique. Módulos ES são bloqueados por CORS quando a página é aberta como arquivo.
- **Ordem dos scripts importa só para `app.js`**, que fica por último e chama `iniciar()` de cada área.
- **Cor do texto dos cards é fixa (`#222`).** O card tem fundo branco independente da cor do círculo.
- **Visual: "Ficha de Catálogo".** Cada área é uma gaveta com aba na cor escolhida; cada card é uma ficha. A mesa aparece como gaveta "Sem aba". Brief e decisão em `.impeccable/surfaces/index-html.md`. Os rótulos ("círculo", "Novo círculo") continuam os mesmos, por pedido.

## Como adicionar uma área nova

1. Crie `js/nova.js` com um objeto (ex.: `const Nova = { iniciar() { ... } };`).
2. Adicione `<script src="js/nova.js"></script>` em `index.html`, antes de `js/app.js`.
3. Chame `Nova.iniciar()` dentro de `App.iniciar()` em `js/app.js`.

## Próximos passos

- **Testar no navegador** arrastar cards, reordenar áreas, o menu ☰, a cor, a lixeira e o `+`. Só a aparência foi conferida, com captura de tela.
- **Revisão final e `DESIGN.md`** do processo Impeccable. Ainda não foram feitos.
- **Arquivos a versionar** quando o projeto virar repositório: `PRODUCT.md`, `.impeccable/surfaces/`, `.impeccable/config.json` e `.impeccable/design.json` (quando existirem). Não versionar `.impeccable/mocks/` nem `.impeccable/review/`, que são arquivos de execução.

## Planejado

- Cada item pode ter uma data, com aviso no dia.
- Subáreas dentro dos círculos (hoje só existe um nível).

## Plano

Plano completo da primeira versão: no projeto "Cabeça Do Nikolas", documento "claude/plano-primeira-versao.md".

Próximo passo: escolher como executar o plano (nativo ou com subagentes) e começar pela Tarefa 1 (core.js).
