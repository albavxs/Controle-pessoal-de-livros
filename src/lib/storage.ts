import { Book } from "@/types/book";
import {
  createBookId,
  normalizeBookCover,
  normalizeOptionalString,
  parsePublishedYear,
} from "./books";
import { legacySeedBooks, seedBooks } from "./seed-data";

const STORAGE_KEY = "minha-estante-livros";
const STORAGE_VERSION = 2;
const LANG_KEY = "minha-estante-lang";

interface StoredBooksPayload {
  version: typeof STORAGE_VERSION;
  books: Book[];
}

interface LegacyBook {
  id: number;
  titulo: string;
  autor: string;
  ano: number;
  preco: number;
  foto: string;
}

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isLegacyBook(value: unknown): value is LegacyBook {
  if (!isRecord(value)) return false;

  return (
    typeof value.id === "number" &&
    typeof value.titulo === "string" &&
    typeof value.autor === "string" &&
    typeof value.ano === "number" &&
    typeof value.preco === "number" &&
    typeof value.foto === "string"
  );
}

function buildFallbackCreatedAt(index: number) {
  return new Date(Date.UTC(2024, 0, index + 1)).toISOString();
}

function migrateLegacyBook(book: LegacyBook, index: number): Book {
  return {
    id: `legacy-${book.id}-${index}`,
    source: "manual",
    googleBookId: null,
    titulo: book.titulo.trim(),
    autor: book.autor.trim(),
    ano: Number.isFinite(book.ano) ? book.ano : null,
    preco: book.preco,
    foto: normalizeBookCover(book.foto),
    publishedDate: Number.isFinite(book.ano) ? String(book.ano) : null,
    isbn: null,
    createdAt: buildFallbackCreatedAt(index),
  };
}

function migrateStoredBook(value: unknown, index: number): Book | null {
  if (isLegacyBook(value)) {
    return migrateLegacyBook(value, index);
  }

  if (!isRecord(value)) return null;

  const publishedDate = normalizeOptionalString(
    typeof value.publishedDate === "string" ? value.publishedDate : null
  );

  const year =
    typeof value.ano === "number" && Number.isFinite(value.ano)
      ? value.ano
      : parsePublishedYear(publishedDate);

  const price =
    typeof value.preco === "number" && Number.isFinite(value.preco)
      ? value.preco
      : 0;

  return {
    id:
      typeof value.id === "string" && value.id.trim()
        ? value.id
        : createBookId(),
    source: value.source === "google" ? "google" : "manual",
    googleBookId: normalizeOptionalString(
      typeof value.googleBookId === "string" ? value.googleBookId : null
    ),
    titulo: typeof value.titulo === "string" ? value.titulo.trim() : "",
    autor: typeof value.autor === "string" ? value.autor.trim() : "",
    ano: year,
    preco: price,
    foto: normalizeBookCover(typeof value.foto === "string" ? value.foto : ""),
    publishedDate: publishedDate ?? (year ? String(year) : null),
    isbn: normalizeOptionalString(
      typeof value.isbn === "string" ? value.isbn : null
    ),
    createdAt:
      typeof value.createdAt === "string" && value.createdAt.trim()
        ? value.createdAt
        : buildFallbackCreatedAt(index),
  };
}

function migrateBooksArray(value: unknown): Book[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((book, index) => migrateStoredBook(book, index))
    .filter((book): book is Book => book !== null && book.titulo.length > 0);
}

function booksMatchLegacySeed(left: Book, right: Book) {
  return (
    left.source === "manual" &&
    left.googleBookId === null &&
    left.titulo === right.titulo &&
    left.autor === right.autor &&
    left.ano === right.ano &&
    left.preco === right.preco &&
    left.foto === right.foto &&
    left.publishedDate === right.publishedDate &&
    left.isbn === right.isbn &&
    left.createdAt === right.createdAt
  );
}

function upgradeLegacySeedBooks(books: Book[]) {
  const seedById = new Map(seedBooks.map((book) => [book.id, book]));

  let changed = false;

  const upgraded = books.map((book) => {
    const legacyBook = legacySeedBooks.find((candidate) =>
      booksMatchLegacySeed(book, candidate)
    );
    const seedBook = legacyBook ? seedById.get(legacyBook.id) : undefined;

    if (!legacyBook || !seedBook) {
      return book;
    }

    changed = true;
    return seedBook;
  });

  return changed ? upgraded : books;
}

function readBooksFromStorage(raw: string | null): Book[] {
  if (!raw) return seedBooks;

  try {
    const parsed: unknown = JSON.parse(raw);

    if (
      isRecord(parsed) &&
      parsed.version === STORAGE_VERSION &&
      Array.isArray(parsed.books)
    ) {
      return upgradeLegacySeedBooks(migrateBooksArray(parsed.books));
    }

    return upgradeLegacySeedBooks(migrateBooksArray(parsed));
  } catch {
    return seedBooks;
  }
}

export function getBooks(): Book[] {
  if (!isBrowser()) return [];

  const books = readBooksFromStorage(localStorage.getItem(STORAGE_KEY));
  saveBooks(books);
  return books;
}

export function saveBooks(books: Book[]): void {
  if (!isBrowser()) return;

  const payload: StoredBooksPayload = {
    version: STORAGE_VERSION,
    books,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export function getLang(): "pt" | "en" {
  if (!isBrowser()) return "pt";
  return (localStorage.getItem(LANG_KEY) as "pt" | "en") || "pt";
}

export function saveLang(lang: "pt" | "en"): void {
  if (!isBrowser()) return;
  localStorage.setItem(LANG_KEY, lang);
}
