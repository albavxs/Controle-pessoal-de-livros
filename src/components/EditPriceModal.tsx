"use client";

import { useState } from "react";
import { Book } from "@/types/book";
import { useLang, t } from "@/lib/i18n";
import { CloseIcon } from "./icons/CloseIcon";

interface EditPriceModalProps {
  book: Book;
  onSave: (id: string, preco: number) => void;
  onClose: () => void;
}

export function EditPriceModal({ book, onSave, onClose }: EditPriceModalProps) {
  const { lang } = useLang();
  const s = t(lang);
  const [preco, setPreco] = useState(book.preco.toString());

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = parseFloat(preco);
    if (!isNaN(value) && value >= 0) {
      onSave(book.id, value);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[rgba(16,11,8,0.48)] px-4 pb-0 pt-8 backdrop-blur-sm sm:items-center sm:px-6 sm:pb-6"
      onClick={onClose}
    >
      <div
        className="sheet-enter w-full max-w-md rounded-t-[2rem] border border-border bg-card px-5 pb-6 pt-5 shadow-[0_32px_70px_-42px_rgba(36,25,21,0.9)] sm:rounded-[2rem] sm:px-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold text-ink">
            {s.editPrice}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/80 bg-surface/90 text-muted transition hover:text-ink"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="rounded-[1.5rem] border border-accent/12 bg-accent/8 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
            {s.newPrice}
          </p>
          <p className="mt-1 text-sm text-muted">{book.titulo}</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-5">
          <label className="mb-2 block text-sm font-medium text-ink">
            {s.newPrice} ({s.currency})
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
              className="editorial-button"
            >
              {s.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
