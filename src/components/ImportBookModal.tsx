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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xl w-full max-w-md mx-4 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">
            {s.importBook}
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-4 mb-4">
          <div className="w-16 h-24 flex-shrink-0 overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800">
            {book.thumbnail ? (
              <img
                src={book.thumbnail}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            ) : null}
          </div>

          <div className="min-w-0">
            <p className="font-medium text-zinc-900 dark:text-zinc-100">
              {book.title}
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {book.authors.length > 0 ? book.authors.join(", ") : s.unknownAuthor}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
            {s.pricePaid} ({s.currency})
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:focus:ring-zinc-100/10 focus:border-zinc-400 dark:focus:border-zinc-600"
            autoFocus
          />

          {error && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          )}

          <div className="flex gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              {s.cancel}
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
            >
              {s.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
