# Mesa de Trabalho

Um programinha para anotar e organizar as coisas do dia a dia sem precisar decidir nada na hora. Você escreve, a ideia cai numa mesa, e depois organiza com calma em círculos.

## Como funciona

- **Captura rápida:** digite qualquer coisa no campo do topo e aperte **Enter**. O item vai para a seção **Na mesa**, que fica em destaque até ser organizado.
- **Círculos (áreas):** são três por padrão. Use o botão **+** no canto inferior esquerdo para criar mais.
- **Arrastar:** arraste os cards da mesa para dentro de um círculo, de um círculo para outro, ou de volta para a mesa. Você também pode arrastar os círculos para mudar a ordem, segurando em qualquer parte deles.
- **Menu do círculo (☰):** renomeia o círculo ou apaga o círculo. Os cards dele voltam para a mesa, então nada se perde.
- **Lixeira:** no canto inferior direito. Arraste um card até ela para apagá-lo.
- **Crescimento:** cada card a mais deixa o círculo maior, até um limite.

## Classificando pelo teclado

- Digite o texto e depois **/**. Aparece a lista com os nomes dos círculos.
- Use **↑** e **↓** para escolher e **Tab** para selecionar.
- Depois, **Enter** cria o card dentro do círculo escolhido.
- Também funciona digitar direto o nome do círculo, por exemplo `/Casa` ou `comprar pão /Casa`.
- **Esc** fecha a lista.

## Onde os dados ficam

Os dados ficam salvos no próprio navegador, no aparelho em que você está usando. Ainda não há sincronização entre computador e celular.

## Como usar

1. Baixe o arquivo `index.html`, ou use o link do GitHub Pages, se estiver ativado.
2. Dê dois cliques no arquivo para abrir no navegador. Não precisa instalar nada.
3. Para usar no celular, abra o link no Chrome e escolha **Adicionar à tela inicial**.

A página usa a biblioteca SortableJS para arrastar, carregada pela internet. Por isso, a primeira abertura precisa de conexão.

## Próximos passos

- Sincronizar os dados entre computador e celular, com Supabase.
- Lembretes com data que avisam mesmo com a página fechada.
- Atalho global de teclado no computador e widget na tela inicial do Android, com app nativo.

## Arquivos

- `index.html`: o programa inteiro (HTML, CSS e JavaScript em um arquivo só).
- `LEIA-ME.md`: versão curta da descrição do projeto.
