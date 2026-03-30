"use client";

import { useState, useCallback } from "react";
import { Book } from "@/types/book";
import { useBooks } from "@/hooks/useBooks";
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

  const filtered = search ? filterBooks(search) : books;

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
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded-lg w-full" />
          <div className="space-y-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-20 bg-zinc-200 dark:bg-zinc-800 rounded-xl"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="mb-6">
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-3">
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
