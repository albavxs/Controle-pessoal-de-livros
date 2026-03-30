/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { GoogleBookSearchResult } from "@/types/book";
import { useLang, t } from "@/lib/i18n";
import { CloseIcon } from "./icons/CloseIcon";

interface ImportBookModalProps {
  book: GoogleBookSearchResult;
  onSave: (preco: number) => void;
  onClose: () => void;
}

export function ImportBookModal({
  book,
  onSave,
  onClose,
}: ImportBookModalProps) {
  const { lang } = useLang();
  const s = t(lang);
  const [preco, setPreco] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = parseFloat(preco);

    if (Number.isNaN(value) || value < 0) {
      setError(s.invalidPrice);
      return;
    }

    setError("");
    onSave(value);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[rgba(16,11,8,0.48)] px-4 pb-0 pt-8 backdrop-blur-sm sm:items-center sm:px-6 sm:pb-6"
      onClick={onClose}
    >
      <div
        className="sheet-enter w-full max-w-lg rounded-t-[2rem] border border-border bg-card px-5 pb-6 pt-5 shadow-[0_32px_70px_-42px_rgba(36,25,21,0.9)] sm:rounded-[2rem] sm:px-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold text-ink">
            {s.importBook}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/80 bg-surface/90 text-muted transition hover:text-ink"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="mb-5 flex gap-4 rounded-[1.6rem] border border-accent-secondary/14 bg-accent-secondary/8 p-4">
          <div className="h-24 w-17 flex-shrink-0 overflow-hidden rounded-[1rem] border border-border/80 bg-surface">
            {book.thumbnail ? (
              <img
                src={book.thumbnail}
                alt={book.title}
                className="h-full w-full object-cover"
              />
            ) : null}
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-secondary">
              {s.sourceGoogle}
            </p>
            <p className="mt-1 font-display text-lg font-semibold text-ink">
              {book.title}
            </p>
            <p className="mt-1 text-sm text-muted">
              {book.authors.length > 0 ? book.authors.join(", ") : s.unknownAuthor}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {book.year && (
                <span className="rounded-full border border-border/80 bg-card px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-muted">
                  {book.year}
                </span>
              )}
              {book.isbn13 && (
                <span className="rounded-full border border-border/80 bg-card px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-muted">
                  {s.isbn} {book.isbn13}
                </span>
              )}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="mb-2 block text-sm font-medium text-ink">
            {s.pricePaid} ({s.currency})
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            className="editorial-input"
            autoFocus
          />

          {error && (
            <p className="mt-2 text-sm text-[rgb(185,65,51)]">
              {error}
            </p>
          )}

          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={onClose}
              className="editorial-button-muted"
            >
              {s.cancel}
            </button>
            <button
              type="submit"
              className="editorial-button-secondary"
            >
              {s.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
