# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Usuário principal:** o Nikolas, no computador, no dia a dia.
- **Equipe:** o usuário disse que a mesa será usada por ele e pela equipe. Quem compõe a equipe e o que ela compartilha **ainda não foi definido**.
- **Situação:** anotar e organizar o que aparece durante o dia, sem parar para decidir onde cada coisa vai.

## Product Purpose

Programa para anotar e organizar as coisas do dia a dia.

Sucesso: uma coisa nova entra com um Enter e fica no lugar certo sem exigir uma decisão no momento da captura. Métrica de sucesso **não definida**.

## Positioning

Captura e classificação no mesmo campo: `texto /Círculo` cria o item já dentro da área, sem sair do teclado. Hoje o diferencial é esse fluxo, não uma funcionalidade a mais.

## Operating Context

- Uso em navegador de computador. A captura é pelo teclado; a organização é com o mouse (arrastar).
- Dados ficam no navegador onde o programa é usado (`localStorage`).
- Ainda não há uso em celular definido.

## Capabilities and Constraints

**Existe hoje:**
- Cards com texto, criados pelo campo do topo.
- Mesa: lugar dos cards ainda não organizados.
- Círculos (áreas) com nome e cor, arrastáveis para reordenar.
- Arrastar cards entre a mesa e os círculos.
- Autocompletar com `/` (setas e Tab).
- Lixeira: arrastar um card para apagá-lo.
- Apagar um círculo devolve os cards dele para a mesa.

**Planejado, ainda não existe:**
- Datas em itens, com aviso no dia.
- Subáreas dentro dos círculos.

**Restrições técnicas:**
- Sem servidor e sem build: HTML, CSS e JS puros, abrindo direto no navegador.
- Arrastar usa Sortable.js por CDN (precisa de internet na primeira carga).
- Não há conta de usuário.

**Terminologia (manter):** "mesa", "círculo" (área) e "card".

**Decisões em aberto:**
- Sincronização entre aparelhos: **não decidida**. Ela depende de como a equipe vai usar a mesa.

## Brand Commitments

- Nome: "Mesa de Trabalho".

## Evidence on Hand

- Não há conteúdo real de clientes, depoimentos, dados de uso ou métricas. Nenhum desses deve ser inventado no design.

## Product Principles

- Capturar antes de organizar: nada pode travar a captura com uma decisão.
- Teclado primeiro para entrar com informação; mouse para organizar.
- O usuário controla os próprios dados.
