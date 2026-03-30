"use client";

import { useState, useEffect, useCallback } from "react";
import { createBook } from "@/lib/books";
import { getBooks, saveBooks } from "@/lib/storage";
import { Book, CreateBookInput } from "@/types/book";

export type AddBookResult =
  | { ok: true; book: Book }
  | { ok: false; reason: "duplicate-google-book" };

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setBooks(getBooks());
      setLoaded(true);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (loaded) saveBooks(books);
  }, [books, loaded]);

  const addBook = useCallback((book: CreateBookInput): AddBookResult => {
    let result: AddBookResult = {
      ok: false,
      reason: "duplicate-google-book",
    };

    setBooks((prev) => {
      if (
        book.source === "google" &&
        book.googleBookId &&
        prev.some((item) => item.googleBookId === book.googleBookId)
      ) {
        result = { ok: false, reason: "duplicate-google-book" };
        return prev;
      }

      const newBook = createBook(book);
      result = { ok: true, book: newBook };
      return [...prev, newBook];
    });

    return result;
  }, []);

  const updateBook = useCallback((id: string, data: Partial<Book>) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...data } : b))
    );
  }, []);

  const deleteBook = useCallback((id: string) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  }, []);

  const hasGoogleBookId = useCallback(
    (googleBookId: string) =>
      books.some((book) => book.googleBookId === googleBookId),
    [books]
  );

  const filterBooks = useCallback(
    (query: string) => {
      if (!query.trim()) return books;

      const q = query.toLowerCase();
      return books.filter((b) => {
        const isbn = b.isbn?.toLowerCase() ?? "";
        return (
          b.titulo.toLowerCase().includes(q) ||
          b.autor.toLowerCase().includes(q) ||
          isbn.includes(q)
        );
      });
    },
    [books]
  );

  return {
    books,
    loaded,
    addBook,
    updateBook,
    deleteBook,
    hasGoogleBookId,
    filterBooks,
  };
}
