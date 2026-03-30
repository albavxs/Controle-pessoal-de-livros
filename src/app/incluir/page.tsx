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

  const inputClass =
    "w-full px-3 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:focus:ring-zinc-100/10 focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors";

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
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          {s.add}
        </h1>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          {s.googleSearchDescription}
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
        <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {s.googleSearchTitle}
            </h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {s.googleSearchDescription}
            </p>
          </div>

          <form onSubmit={handleSearch} className="flex flex-col gap-3 sm:flex-row">
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
              className="px-4 py-2.5 text-sm font-medium text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSearching ? s.searching : s.searchGoogleBooks}
            </button>
          </form>

          {searchError && (
            <p className="mt-3 text-sm text-red-600 dark:text-red-400">
              {searchError}
            </p>
          )}

          {results.length > 0 && (
            <div className="mt-6 space-y-3">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {s.searchResults}
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
            <div className="mt-6 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 px-4 py-6 text-sm text-zinc-500 dark:text-zinc-400 text-center">
              {s.noSearchResults}
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {s.manualAddTitle}
            </h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {s.manualAddDescription}
            </p>
          </div>

          <form onSubmit={handleSubmitManual} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
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
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
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
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
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
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
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
              <p className="text-sm text-red-600 dark:text-red-400">
                {manualError}
              </p>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
              >
                {s.save}
              </button>
              <button
                type="button"
                onClick={() => {
                  setForm({ titulo: "", autor: "", foto: "", ano: "", preco: "" });
                  setManualError("");
                }}
                className="px-4 py-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
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
