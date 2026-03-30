import {
  Book,
  CreateBookInput,
  GoogleBookSearchResult,
} from "@/types/book";

const ISBN_PATTERN = /^(?:\d{9}[\dXx]|\d{13})$/;

export function normalizeOptionalString(value: string | null | undefined) {
  if (typeof value !== "string") return null;
  const normalized = value.trim();
  return normalized ? normalized : null;
}

export function normalizeBookCover(value: string | null | undefined) {
  const cover = normalizeOptionalString(value);
  return cover ? cover.replace(/^http:\/\//i, "https://") : "";
}

export function parsePublishedYear(value: string | null | undefined) {
  const match = normalizeOptionalString(value)?.match(/^(\d{4})/);
  if (!match) return null;

  const year = Number.parseInt(match[1], 10);
  return Number.isFinite(year) ? year : null;
}

export function isLikelyIsbn(value: string) {
  const normalized = normalizeSearchIsbn(value);
  return ISBN_PATTERN.test(normalized);
}

export function normalizeSearchText(value: string | null | undefined) {
  if (typeof value !== "string") return "";

  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function normalizeSearchIsbn(value: string | null | undefined) {
  if (typeof value !== "string") return "";
  return value.toLowerCase().replace(/[^0-9x]/g, "");
}

export function createBookId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `book-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function pickPreferredIsbn(result: GoogleBookSearchResult) {
  return result.isbn13 ?? result.isbn10 ?? null;
}

export function createBook(input: CreateBookInput): Book {
  const titulo = input.titulo.trim();
  const autor = input.autor.trim();
  const publishedDate = normalizeOptionalString(input.publishedDate);
  const ano = input.ano ?? parsePublishedYear(publishedDate);

  return {
    id: createBookId(),
    source: input.source,
    googleBookId: normalizeOptionalString(input.googleBookId),
    titulo,
    autor,
    ano,
    preco: input.preco,
    foto: normalizeBookCover(input.foto),
    publishedDate: publishedDate ?? (ano ? String(ano) : null),
    isbn: normalizeOptionalString(input.isbn),
    createdAt: new Date().toISOString(),
  };
}

export function createGoogleBookInput(
  result: GoogleBookSearchResult,
  preco: number
): CreateBookInput {
  return {
    source: "google",
    googleBookId: result.googleBookId,
    titulo: result.title,
    autor: result.authors.join(", "),
    ano: result.year,
    preco,
    foto: result.thumbnail ?? "",
    publishedDate: result.publishedDate,
    isbn: pickPreferredIsbn(result),
  };
}
