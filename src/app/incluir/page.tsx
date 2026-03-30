"use client";

import { useState } from "react";
import { createGoogleBookInput, isLikelyIsbn } from "@/lib/books";
import { useBooks } from "@/hooks/useBooks";
import { useLang, t } from "@/lib/i18n";
import {
  GoogleBookSearchResult,
  GoogleBooksSearchErrorCode,
  GoogleBooksSearchResponse,
} from "@/types/book";
import { GoogleBookResultCard } from "@/components/GoogleBookResultCard";
import { ImportBookModal } from "@/components/ImportBookModal";
import { Toast } from "@/components/Toast";

export default function IncluirPage() {
  const { lang } = useLang();
  const s = t(lang);
  const { addBook, hasGoogleBookId } = useBooks();
  const [toast, setToast] = useState("");
  const [searchError, setSearchError] = useState("");
  const [manualError, setManualError] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<GoogleBookSearchResult[]>([]);
  const [selectedBook, setSelectedBook] = useState<GoogleBookSearchResult | null>(
    null
  );

  const [form, setForm] = useState({
    titulo: "",
    autor: "",
    foto: "",
    ano: "",
    preco: "",
  });

  const inputClass = "editorial-input";

  function getSearchErrorMessage(code?: GoogleBooksSearchErrorCode) {
    if (code === "MISSING_API_KEY") return s.searchNeedsApiKey;
    if (code === "QUERY_TOO_SHORT") return s.queryTooShort;
    return s.searchFailed;
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();

    const query = searchQuery.trim();
    if (query.length < 3 && !isLikelyIsbn(query)) {
      setSearchError(s.queryTooShort);
      setResults([]);
      setHasSearched(false);
      return;
    }

    setIsSearching(true);
    setHasSearched(true);
    setSearchError("");

    try {
      const response = await fetch(
        `/api/books/search?q=${encodeURIComponent(query)}`
      );
      const payload: unknown = await response.json().catch(() => null);

      if (!response.ok) {
        const code =
          payload &&
          typeof payload === "object" &&
          "code" in payload &&
          typeof payload.code === "string"
            ? (payload.code as GoogleBooksSearchErrorCode)
            : undefined;

        setResults([]);
        setSearchError(getSearchErrorMessage(code));
        return;
      }

      const data = payload as GoogleBooksSearchResponse;
      setResults(Array.isArray(data.items) ? data.items : []);
    } catch {
      setResults([]);
      setSearchError(s.searchFailed);
    } finally {
      setIsSearching(false);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setManualError("");
  }

  function handleSubmitManual(e: React.FormEvent) {
    e.preventDefault();

    if (!form.titulo.trim() || !form.autor.trim() || !form.preco) {
      setManualError(s.fillAllFields);
      return;
    }

    const preco = parseFloat(form.preco);
    if (Number.isNaN(preco) || preco < 0) {
      setManualError(s.invalidPrice);
      return;
    }

    const parsedYear = form.ano ? Number.parseInt(form.ano, 10) : NaN;
    const ano = Number.isFinite(parsedYear) ? parsedYear : null;

    addBook({
      source: "manual",
      googleBookId: null,
      titulo: form.titulo.trim(),
      autor: form.autor.trim(),
      foto: form.foto.trim(),
      ano,
      preco,
      publishedDate: ano ? String(ano) : null,
      isbn: null,
    });

    setToast(s.bookAdded);
    setManualError("");
    setForm({ titulo: "", autor: "", foto: "", ano: "", preco: "" });
  }

  function handleImportConfirm(preco: number) {
    if (!selectedBook) return;

    const result = addBook(createGoogleBookInput(selectedBook, preco));
    setSelectedBook(null);
    setToast(result.ok ? s.bookImported : s.alreadyInShelf);
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8">
      <section className="surface-panel section-enter overflow-hidden rounded-[2.2rem] px-5 py-6 sm:px-8 sm:py-8">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent-secondary">
          {s.addHeroEyebrow}
        </p>
        <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h1 className="font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl lg:text-5xl">
              {s.addHeroTitle}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted sm:text-base">
              {s.addHeroDescription}
            </p>
          </div>
          <div className="rounded-[1.6rem] border border-accent-secondary/18 bg-accent-secondary/10 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-secondary">
              {s.searchResults}
            </p>
            <p className="mt-1 text-sm text-muted">{results.length}</p>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
        <section className="soft-card section-enter rounded-[2rem] p-5 sm:p-6">
          <div className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-secondary">
              {s.googleSearchTitle}
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-ink">
              {s.googleSearchTitle}
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              {s.googleSearchDescription}
            </p>
          </div>

          <form
            onSubmit={handleSearch}
            className="flex flex-col gap-3 rounded-[1.7rem] border border-accent-secondary/14 bg-accent-secondary/8 p-4 sm:flex-row"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={s.googleSearchPlaceholder}
              className={inputClass}
            />
            <button
              type="submit"
              disabled={isSearching}
              className="editorial-button-secondary min-w-[9rem]"
            >
              {isSearching ? s.searching : s.searchGoogleBooks}
            </button>
          </form>

          {searchError && (
            <p className="mt-3 text-sm text-[rgb(185,65,51)]">{searchError}</p>
          )}

          {results.length > 0 && (
            <div className="mt-6 space-y-3">
              <h3 className="text-sm font-semibold text-ink">
                {s.searchResults} ({results.length})
              </h3>
              {results.map((book) => (
                <GoogleBookResultCard
                  key={book.googleBookId}
                  book={book}
                  isDuplicate={hasGoogleBookId(book.googleBookId)}
                  onImport={setSelectedBook}
                />
              ))}
            </div>
          )}

          {hasSearched && !isSearching && !searchError && results.length === 0 && (
            <div className="mt-6 rounded-[1.6rem] border border-dashed border-border px-4 py-8 text-center text-sm text-muted">
              {s.noSearchResults}
            </div>
          )}
        </section>

        <section className="soft-card section-enter rounded-[2rem] p-5 sm:p-6">
          <div className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
              {s.manualAddTitle}
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-ink">
              {s.manualAddTitle}
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              {s.manualAddDescription}
            </p>
          </div>

          <form onSubmit={handleSubmitManual} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">
                {s.title}
              </label>
              <input
                type="text"
                name="titulo"
                value={form.titulo}
                onChange={handleChange}
                className={inputClass}
                maxLength={80}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">
                {s.author}
              </label>
              <input
                type="text"
                name="autor"
                value={form.autor}
                onChange={handleChange}
                className={inputClass}
                maxLength={60}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">
                {s.coverUrl}
              </label>
              <input
                type="url"
                name="foto"
                value={form.foto}
                onChange={handleChange}
                className={inputClass}
                placeholder="https://..."
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink">
                  {s.year}
                </label>
                <input
                  type="number"
                  name="ano"
                  value={form.ano}
                  onChange={handleChange}
                  className={inputClass}
                  min={0}
                  max={2099}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink">
                  {s.pricePaid} ({s.currency})
                </label>
                <input
                  type="number"
                  name="preco"
                  value={form.preco}
                  onChange={handleChange}
                  className={inputClass}
                  step="0.01"
                  min="0"
                />
              </div>
            </div>

            {manualError && (
              <p className="text-sm text-[rgb(185,65,51)]">{manualError}</p>
            )}

            <div className="grid gap-2 pt-2 sm:grid-cols-2">
              <button type="submit" className="editorial-button">
                {s.save}
              </button>
              <button
                type="button"
                onClick={() => {
                  setForm({ titulo: "", autor: "", foto: "", ano: "", preco: "" });
                  setManualError("");
                }}
                className="editorial-button-muted"
              >
                {s.clear}
              </button>
            </div>
          </form>
        </section>
      </div>

      {selectedBook && (
        <ImportBookModal
          book={selectedBook}
          onSave={handleImportConfirm}
          onClose={() => setSelectedBook(null)}
        />
      )}

      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </div>
  );
}
