"use client";

import { createContext, useContext } from "react";

export type Lang = "pt" | "en";

const strings = {
  pt: {
    appName: "Minha Estante",
    home: "Acervo",
    add: "Incluir",
    summary: "Resumo",
    search: "Buscar por titulo, autor ou ISBN...",
    title: "Titulo",
    author: "Autor",
    year: "Ano",
    price: "Preco",
    coverUrl: "URL da Capa",
    save: "Salvar",
    clear: "Limpar",
    cancel: "Cancelar",
    delete: "Excluir",
    editPrice: "Editar Preco",
    newPrice: "Novo Preco",
    confirmDelete: "Tem certeza que deseja excluir este livro?",
    bookAdded: "Livro adicionado com sucesso!",
    bookImported: "Livro importado com sucesso!",
    bookUpdated: "Preco atualizado com sucesso!",
    bookDeleted: "Livro excluido com sucesso!",
    fillAllFields: "Preencha titulo, autor e preco.",
    invalidPrice: "Informe um preco valido.",
    totalBooks: "Total de Livros",
    totalInvested: "Total Investido",
    highestPrice: "Maior Preco",
    averagePrice: "Preco Medio",
    booksByYear: "Livros por Ano",
    noBooks: "Nenhum livro encontrado",
    noBooksDesc: "Adicione livros ao seu acervo para comecar.",
    addFirst: "Adicionar Primeiro Livro",
    currency: "R$",
    googleSearchTitle: "Buscar no Google Books",
    googleSearchDescription:
      "Pesquise por titulo, autor ou ISBN para importar metadados do livro.",
    googleSearchPlaceholder: "Ex.: Clean Code, Machado de Assis, 978...",
    searchGoogleBooks: "Buscar",
    searching: "Buscando...",
    searchResults: "Resultados encontrados",
    noSearchResults: "Nenhum resultado encontrado para essa busca.",
    searchFailed: "Nao foi possivel consultar o Google Books agora.",
    searchNeedsApiKey:
      "Configure GOOGLE_BOOKS_API_KEY para habilitar a busca no Google Books.",
    queryTooShort: "Digite pelo menos 3 caracteres ou um ISBN valido.",
    manualAddTitle: "Adicionar manualmente",
    manualAddDescription:
      "Use este formulario quando o livro nao aparecer no Google Books.",
    importBook: "Importar",
    alreadyInShelf: "Ja esta na estante",
    preview: "Preview",
    pricePaid: "Preco pago",
    unknownAuthor: "Autor desconhecido",
    unknownYear: "Sem ano",
    publisher: "Editora",
    isbn: "ISBN",
  },
  en: {
    appName: "My Bookshelf",
    home: "Collection",
    add: "Add",
    summary: "Summary",
    search: "Search by title, author or ISBN...",
    title: "Title",
    author: "Author",
    year: "Year",
    price: "Price",
    coverUrl: "Cover URL",
    save: "Save",
    clear: "Clear",
    cancel: "Cancel",
    delete: "Delete",
    editPrice: "Edit Price",
    newPrice: "New Price",
    confirmDelete: "Are you sure you want to delete this book?",
    bookAdded: "Book added successfully!",
    bookImported: "Book imported successfully!",
    bookUpdated: "Price updated successfully!",
    bookDeleted: "Book deleted successfully!",
    fillAllFields: "Fill in title, author and price.",
    invalidPrice: "Enter a valid price.",
    totalBooks: "Total Books",
    totalInvested: "Total Invested",
    highestPrice: "Highest Price",
    averagePrice: "Average Price",
    booksByYear: "Books by Year",
    noBooks: "No books found",
    noBooksDesc: "Add books to your collection to get started.",
    addFirst: "Add First Book",
    currency: "R$",
    googleSearchTitle: "Search Google Books",
    googleSearchDescription:
      "Search by title, author or ISBN to import book metadata.",
    googleSearchPlaceholder: "Ex.: Clean Code, Jane Austen, 978...",
    searchGoogleBooks: "Search",
    searching: "Searching...",
    searchResults: "Search results",
    noSearchResults: "No results were found for this search.",
    searchFailed: "Google Books could not be reached right now.",
    searchNeedsApiKey:
      "Set GOOGLE_BOOKS_API_KEY to enable Google Books search.",
    queryTooShort: "Enter at least 3 characters or a valid ISBN.",
    manualAddTitle: "Add manually",
    manualAddDescription:
      "Use this form when a book does not appear in Google Books.",
    importBook: "Import",
    alreadyInShelf: "Already in shelf",
    preview: "Preview",
    pricePaid: "Price paid",
    unknownAuthor: "Unknown author",
    unknownYear: "Unknown year",
    publisher: "Publisher",
    isbn: "ISBN",
  },
} as const;

export type Strings = { [K in keyof typeof strings.pt]: string };

export function t(lang: Lang): Strings {
  return strings[lang] as Strings;
}

export const LangContext = createContext<{
  lang: Lang;
  setLang: (lang: Lang) => void;
}>({
  lang: "pt",
  setLang: () => {},
});

export function useLang() {
  return useContext(LangContext);
}
