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
    book.publisher,
    book.year ? String(book.year) : s.unknownYear,
    primaryIsbn ? `${s.isbn} ${primaryIsbn}` : null,
  ].filter((item): item is string => Boolean(item));

  return (
    <div className="soft-card rounded-[1.75rem] p-4 sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="h-24 w-16 flex-shrink-0 overflow-hidden rounded-[1rem] border border-border/80 bg-surface shadow-[0_16px_26px_-24px_rgba(36,25,21,0.75)]">
          {book.thumbnail ? (
            <img
              src={book.thumbnail}
              alt={book.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center px-2 text-center text-xs text-muted">
              {book.title.slice(0, 18)}
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex rounded-full border border-accent-secondary/18 bg-accent-secondary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-secondary">
              {s.sourceGoogle}
            </span>
            {book.language && (
              <span className="inline-flex rounded-full border border-border/80 bg-surface/85 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-muted">
                {book.language}
              </span>
            )}
          </div>

          <h3 className="mt-3 font-display text-lg font-semibold text-ink">
            {book.title}
          </h3>
          <p className="mt-2 text-sm text-muted">
            {authorLabel}
          </p>

          {metadata.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {metadata.map((item) => (
                <span
                  key={item}
                  className="inline-flex rounded-full border border-border/80 bg-card/88 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-muted"
                >
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        {book.previewLink && (
          <a
            href={book.previewLink}
            target="_blank"
            rel="noreferrer"
            className="editorial-button-muted flex-1"
          >
            {s.preview}
          </a>
        )}
        <button
          type="button"
          onClick={() => onImport(book)}
          disabled={isDuplicate}
          className="editorial-button-secondary flex-1"
        >
          {isDuplicate ? s.alreadyInShelf : s.importBook}
        </button>
      </div>
    </div>
  );
}
