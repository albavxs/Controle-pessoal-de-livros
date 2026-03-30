"use client";

import dynamic from "next/dynamic";
import { useBooks } from "@/hooks/useBooks";
import { useBookStats } from "@/hooks/useBookStats";
import { useLang, t } from "@/lib/i18n";
import { StatCard } from "@/components/StatCard";

const YearChart = dynamic(
  () => import("@/components/YearChart").then((m) => m.YearChart),
  { ssr: false }
);

export default function ResumoPage() {
  const { lang } = useLang();
  const s = t(lang);
  const { books, loaded } = useBooks();
  const stats = useBookStats(books);

  if (!loaded) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="animate-pulse space-y-4">
          <div className="h-44 rounded-[2rem] bg-card" />
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 rounded-[1.7rem] bg-card" />
            ))}
          </div>
          <div className="h-80 rounded-[2rem] bg-card" />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8">
      <section className="surface-panel section-enter rounded-[2.2rem] px-5 py-6 sm:px-8 sm:py-8">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent-tertiary">
          {s.summaryHeroEyebrow}
        </p>
        <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h1 className="font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl lg:text-5xl">
              {s.summaryHeroTitle}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted sm:text-base">
              {s.summaryHeroDescription}
            </p>
          </div>
          <div className="rounded-[1.6rem] border border-accent-tertiary/18 bg-accent-tertiary/12 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-tertiary">
              {s.booksByYear}
            </p>
            <p className="mt-1 text-sm text-muted">{stats.byYear.length}</p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label={s.totalBooks}
          value={stats.total.toString()}
          hint={s.summaryCountHint}
          tone="accent"
        />
        <StatCard
          label={s.totalInvested}
          value={`${s.currency} ${stats.totalInvested.toFixed(2)}`}
          hint={s.summaryInvestmentHint}
          tone="secondary"
        />
        <StatCard
          label={s.highestPrice}
          value={`${s.currency} ${stats.highestPrice.toFixed(2)}`}
          hint={s.summaryHighestHint}
          tone="tertiary"
        />
        <StatCard
          label={s.averagePrice}
          value={`${s.currency} ${stats.averagePrice.toFixed(2)}`}
          hint={s.summaryAverageHint}
        />
      </div>

      <YearChart data={stats.byYear} />
    </div>
  );
}
