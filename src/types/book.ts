export type BookSource = "google" | "manual";

export interface Book {
  id: string;
  source: BookSource;
  googleBookId: string | null;
  titulo: string;
  autor: string;
  ano: number | null;
  preco: number;
  foto: string;
  publishedDate: string | null;
  isbn: string | null;
  createdAt: string;
}

export interface CreateBookInput {
  source: BookSource;
  googleBookId: string | null;
  titulo: string;
  autor: string;
  ano: number | null;
  preco: number;
  foto: string;
  publishedDate: string | null;
  isbn: string | null;
}

export interface GoogleBookSearchResult {
  googleBookId: string;
  title: string;
  authors: string[];
  thumbnail: string | null;
  publishedDate: string | null;
  year: number | null;
  publisher: string | null;
  description: string | null;
  language: string | null;
  previewLink: string | null;
  isbn10: string | null;
  isbn13: string | null;
}

export interface GoogleBooksSearchResponse {
  items: GoogleBookSearchResult[];
}

export type GoogleBooksSearchErrorCode =
  | "MISSING_API_KEY"
  | "QUERY_TOO_SHORT"
  | "UPSTREAM_ERROR";
