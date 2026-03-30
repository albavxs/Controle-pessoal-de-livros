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

  return (
    <div className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-700 transition-all hover:shadow-sm">
      <div className="flex items-center gap-5 px-5 py-3">
        <div className="flex-shrink-0 w-12 h-16 rounded-md overflow-hidden bg-zinc-100 dark:bg-zinc-800">
          {book.foto ? (
            <img
              src={book.foto}
              alt={book.titulo}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-400">
              <svg
                className="w-6 h-6"
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

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 truncate text-sm">
            {book.titulo}
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            {authorLabel}
          </p>
        </div>

        <span className="flex-shrink-0 inline-flex items-center px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-xs font-medium text-zinc-600 dark:text-zinc-400">
          {yearLabel}
        </span>

        <span className="flex-shrink-0 text-sm font-semibold text-zinc-900 dark:text-zinc-100 w-24 text-right tabular-nums">
          {s.currency} {book.preco.toFixed(2)}
        </span>

        <div className="flex-shrink-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(book)}
            className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 dark:hover:text-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            title={s.editPrice}
          >
            <EditIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(book.id)}
            className="p-1.5 rounded-md text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:text-red-400 dark:hover:bg-red-950/30 transition-colors"
            title={s.delete}
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
