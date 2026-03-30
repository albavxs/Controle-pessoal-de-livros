"use client";

import { useCallback, useDeferredValue, useState } from "react";
import { Book } from "@/types/book";
import { useBooks } from "@/hooks/useBooks";
import { useBookStats } from "@/hooks/useBookStats";
import { useLang, t } from "@/lib/i18n";
import { SearchBar } from "@/components/SearchBar";
import { BookCard } from "@/components/BookCard";
import { EditPriceModal } from "@/components/EditPriceModal";
import { EmptyState } from "@/components/EmptyState";
import { Toast } from "@/components/Toast";

export default function HomePage() {
  const { lang } = useLang();
  const s = t(lang);
  const { books, loaded, updateBook, deleteBook, filterBooks } = useBooks();
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<Book | null>(null);
  const [toast, setToast] = useState("");
  const deferredSearch = useDeferredValue(search);
  const stats = useBookStats(books);

  const filtered = deferredSearch ? filterBooks(deferredSearch) : books;

  const handleEdit = useCallback((book: Book) => {
    setEditing(book);
  }, []);

  const handleSavePrice = useCallback(
    (id: string, preco: number) => {
      updateBook(id, { preco });
      setEditing(null);
      setToast(s.bookUpdated);
    },
    [updateBook, s.bookUpdated]
  );

  const handleDelete = useCallback(
    (id: string) => {
      if (confirm(s.confirmDelete)) {
        deleteBook(id);
        setToast(s.bookDeleted);
      }
    },
    [deleteBook, s.confirmDelete, s.bookDeleted]
  );

  if (!loaded) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="animate-pulse space-y-4">
          <div className="h-52 rounded-[2rem] bg-card" />
          <div className="h-32 rounded-[1.8rem] bg-card" />
          <div className="space-y-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-40 rounded-[1.7rem] bg-card sm:h-28" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8">
      <section className="surface-panel section-enter relative overflow-hidden rounded-[2.2rem] px-5 py-6 sm:px-8 sm:py-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(191,90,54,0.14),transparent_30%),radial-gradient(circle_at_right,rgba(47,122,109,0.12),transparent_26%)]" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
              {s.shelfHeroEyebrow}
            </p>
            <h1 className="mt-3 max-w-2xl font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl lg:text-5xl">
              {s.shelfHeroTitle}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted sm:text-base">
              {s.shelfHeroDescription}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[22rem]">
            <div className="soft-card rounded-[1.7rem] border-accent/18 bg-accent/10 p-5 hover:border-accent/30 hover:bg-accent/16 hover:shadow-[0_24px_48px_-28px_rgba(191,90,54,0.55)]">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
                {s.totalBooks}
              </p>
              <p className="mt-3 font-display text-3xl font-semibold text-ink">
                {stats.total}
              </p>
              <p className="mt-2 text-sm text-muted">{s.summaryCountHint}</p>
            </div>

            <div className="soft-card rounded-[1.7rem] border-accent-secondary/18 bg-accent-secondary/10 p-5 hover:border-accent-secondary/30 hover:bg-accent-secondary/16 hover:shadow-[0_24px_48px_-28px_rgba(47,122,109,0.5)]">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-secondary">
                {s.totalInvested}
              </p>
              <p className="mt-3 font-display text-3xl font-semibold text-ink">
                {s.currency} {stats.totalInvested.toFixed(2)}
              </p>
              <p className="mt-2 text-sm text-muted">{s.summaryInvestmentHint}</p>
            </div>
          </div>
        </div>
      </section>

      <SearchBar
        value={search}
        onChange={setSearch}
        resultCount={filtered.length}
      />

      {filtered.length === 0 ? (
        search ? (
          <section className="soft-card section-enter rounded-[2rem] px-6 py-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-accent">
              {s.shelfSearchLabel}
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-ink">
              {s.noSearchResults}
            </h2>
            <p className="mt-3 text-sm text-muted">{s.shelfSearchHint}</p>
            <button
              type="button"
              onClick={() => setSearch("")}
              className="editorial-button mt-6"
            >
              {s.clear}
            </button>
          </section>
        ) : (
          <EmptyState />
        )
      ) : (
        <div className="space-y-4">
          {filtered.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {editing && (
        <EditPriceModal
          book={editing}
          onSave={handleSavePrice}
          onClose={() => setEditing(null)}
        />
      )}

      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </div>
  );
}
