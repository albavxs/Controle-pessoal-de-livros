/* eslint-disable @next/next/no-img-element */
"use client";

import { Book } from "@/types/book";
import { useLang, t } from "@/lib/i18n";
import { EditIcon } from "./icons/EditIcon";
import { TrashIcon } from "./icons/TrashIcon";

interface BookCardProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
}

export function BookCard({ book, onEdit, onDelete }: BookCardProps) {
  const { lang } = useLang();
  const s = t(lang);
  const authorLabel = book.autor || s.unknownAuthor;
  const yearLabel = book.ano ?? s.unknownYear;
  const sourceLabel = book.source === "google" ? s.sourceGoogle : s.sourceManual;
  const priceLabel = `${s.currency} ${book.preco.toFixed(2)}`;
  const metadata = [
    sourceLabel,
    typeof yearLabel === "number" ? String(yearLabel) : yearLabel,
    book.isbn ? `${s.isbn} ${book.isbn}` : null,
  ].filter((item): item is string => Boolean(item));

  return (
    <article className="soft-card group section-enter relative overflow-hidden rounded-[1.9rem] p-4 sm:p-5">
      <div className="absolute inset-y-5 left-0 w-1 rounded-r-full bg-gradient-to-b from-accent via-accent-secondary to-accent-tertiary" />
      <div className="flex flex-col gap-4 md:flex-row md:items-start">
        <div className="flex min-w-0 flex-1 gap-4 sm:gap-5">
          <div className="h-26 w-18 flex-shrink-0 overflow-hidden rounded-[1.1rem] border border-border/70 bg-surface shadow-[0_18px_28px_-26px_rgba(36,25,21,0.8)] sm:h-30 sm:w-20">
            {book.foto ? (
              <img
                src={book.foto}
                alt={book.titulo}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-muted">
                <svg
                  className="h-7 w-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-start gap-2">
              <h3 className="min-w-0 flex-1 font-display text-lg font-semibold leading-tight text-ink sm:text-xl">
                {book.titulo}
              </h3>
              <span className="inline-flex items-center rounded-full border border-accent/15 bg-accent/10 px-3 py-1 text-sm font-semibold text-accent">
                {priceLabel}
              </span>
            </div>

            <p className="mt-2 text-sm text-muted sm:text-base">{authorLabel}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {metadata.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center rounded-full border border-border/80 bg-surface/85 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-muted"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-2 md:min-w-[12rem] md:grid-cols-1">
          <button
            type="button"
            onClick={() => onEdit(book)}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card/85 px-4 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:border-accent/20 hover:text-accent"
            title={s.editPrice}
          >
            <EditIcon className="h-4 w-4" />
            {s.editPrice}
          </button>
          <button
            type="button"
            onClick={() => onDelete(book.id)}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(185,65,51,0.18)] bg-[rgba(185,65,51,0.09)] px-4 py-3 text-sm font-semibold text-[rgb(185,65,51)] transition hover:-translate-y-0.5 hover:bg-[rgba(185,65,51,0.14)]"
            title={s.delete}
          >
            <TrashIcon className="h-4 w-4" />
            {s.delete}
          </button>
        </div>
      </div>
    </article>
  );
}
