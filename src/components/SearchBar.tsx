"use client";

import { SearchIcon } from "./icons/SearchIcon";
import { useLang, t } from "@/lib/i18n";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  resultCount?: number;
}

export function SearchBar({
  value,
  onChange,
  resultCount,
}: SearchBarProps) {
  const { lang } = useLang();
  const s = t(lang);

  return (
    <section className="soft-card section-enter rounded-[1.9rem] p-4 sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-accent">
            {s.shelfSearchLabel}
          </p>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            {s.shelfSearchHint}
          </p>
        </div>

        {typeof resultCount === "number" && (
          <span className="inline-flex items-center self-start rounded-full border border-accent/15 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-accent">
            {resultCount}
          </span>
        )}
      </div>

      <div className="relative mt-4">
        <SearchIcon className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted opacity-70" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={s.search}
          className="editorial-input min-h-14 text-sm sm:text-base"
          style={{ paddingLeft: "3.5rem", paddingRight: "3rem" }}
          autoComplete="off"
          spellCheck={false}
        />

        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-3 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-accent/10 text-accent transition hover:bg-accent/16"
            aria-label={s.clear}
            title={s.clear}
          >
            <span className="text-lg leading-none">&times;</span>
          </button>
        )}
      </div>
    </section>
  );
}
