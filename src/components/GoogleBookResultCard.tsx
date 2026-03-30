/* eslint-disable @next/next/no-img-element */
"use client";

import { GoogleBookSearchResult } from "@/types/book";
import { useLang, t } from "@/lib/i18n";

interface GoogleBookResultCardProps {
  book: GoogleBookSearchResult;
  isDuplicate: boolean;
  onImport: (book: GoogleBookSearchResult) => void;
}

export function GoogleBookResultCard({
  book,
  isDuplicate,
  onImport,
}: GoogleBookResultCardProps) {
  const { lang } = useLang();
  const s = t(lang);

  const authorLabel =
    book.authors.length > 0 ? book.authors.join(", ") : s.unknownAuthor;
  const primaryIsbn = book.isbn13 ?? book.isbn10;
  const metadata = [
    book.publisher ? `${s.publisher}: ${book.publisher}` : null,
    book.year ? `${s.year}: ${book.year}` : `${s.year}: ${s.unknownYear}`,
    primaryIsbn ? `${s.isbn}: ${primaryIsbn}` : null,
  ].filter((item): item is string => Boolean(item));

  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4">
      <div className="flex gap-4">
        <div className="w-16 h-24 flex-shrink-0 overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800">
          {book.thumbnail ? (
            <img
              src={book.thumbnail}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-400 text-xs px-2 text-center">
              {book.title.slice(0, 18)}
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {book.title}
          </h3>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            {authorLabel}
          </p>
          {metadata.length > 0 && (
            <div className="mt-2 space-y-1">
              {metadata.map((item) => (
                <p
                  key={item}
                  className="text-xs text-zinc-500 dark:text-zinc-400"
                >
                  {item}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {book.previewLink && (
          <a
            href={book.previewLink}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            {s.preview}
          </a>
        )}
        <button
          type="button"
          onClick={() => onImport(book)}
          disabled={isDuplicate}
          className="px-3 py-2 text-sm font-medium rounded-lg transition-colors disabled:cursor-not-allowed disabled:opacity-70 text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200"
        >
          {isDuplicate ? s.alreadyInShelf : s.importBook}
        </button>
      </div>
    </div>
  );
}
