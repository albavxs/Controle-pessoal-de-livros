# Minha Estante

Minha Estante é uma refatoração do meu projeto anterior **Controle Pessoal Livros**.

O projeto original foi criado como um exercício prático ao final de um livro, com foco em consolidar aprendizado e colocar em prática os conceitos estudados. Nesta nova versão, a ideia foi evoluir essa base para algo mais sólido, atual e alinhado com princípios e boas práticas de desenvolvimento.

A aplicação foi reorganizada com uma estrutura mais moderna, melhor separação de responsabilidades e uma stack mais atual, com destaque para o uso de **Next.js 16**.

## Objetivo da refatoração

Esta versão foi criada para:

- modernizar a stack da aplicação
- melhorar a organização do código
- aplicar princípios e boas práticas de desenvolvimento
- evoluir a experiência de uso sem perder a ideia original do projeto

## O que mudou em relação ao projeto original

Comparado ao Controle Pessoal Livros, esta refatoração traz:

- migração para **Next.js 16** com App Router
- componentes mais reutilizáveis e responsabilidades melhor definidas
- integração com a **Google Books API** para importar metadados
- persistência local com migração automática de schema
- interface mais trabalhada, responsiva e com suporte a tema
- base mais preparada para manutenção, evolução e deploy

## Stack atual

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Recharts

## Funcionalidades

- listagem do acervo pessoal
- busca local por título, autor ou ISBN
- inclusão manual de livros
- importação de livros via Google Books
- edição de preço
- exclusão de livros
- resumo com estatísticas da coleção
- persistência dos dados no navegador

## Como rodar localmente

1. Crie um arquivo `.env.local` a partir de `.env.example`.
2. Preencha `GOOGLE_BOOKS_API_KEY`.
3. Instale as dependências com `npm install`.
4. Rode `npm run dev`.

Depois, acesse [http://localhost:3000](http://localhost:3000).

## Fluxo principal

- `/` exibe o acervo salvo no `localStorage`
- `/incluir` permite buscar livros no Google Books ou cadastrar manualmente
- `/resumo` mostra estatísticas da estante

## Google Books API

A busca de livros é feita no servidor por meio do Route Handler em [src/app/api/books/search/route.ts](./src/app/api/books/search/route.ts). Isso evita expor a chave no cliente e padroniza o retorno usado pela interface.

Se `GOOGLE_BOOKS_API_KEY` não estiver configurada corretamente, a busca não funciona.

## Deploy

Para publicar na Vercel:

1. Importe o repositório.
2. Configure `GOOGLE_BOOKS_API_KEY` nas variáveis de ambiente do projeto.
3. Rode o deploy.

## Observação

Mesmo sendo uma evolução de um projeto-exercício, esta versão foi pensada como uma refatoração real: mantendo a proposta original, mas trazendo uma implementação mais madura, atual e mais próxima do que se espera em um projeto moderno com boas práticas.
