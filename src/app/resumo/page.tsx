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
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-40 bg-zinc-200 dark:bg-zinc-800 rounded" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
            ))}
          </div>
          <div className="h-72 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
        {s.summary}
      </h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label={s.totalBooks} value={stats.total.toString()} />
        <StatCard
          label={s.totalInvested}
          value={`${s.currency} ${stats.totalInvested.toFixed(2)}`}
        />
        <StatCard
          label={s.highestPrice}
          value={`${s.currency} ${stats.highestPrice.toFixed(2)}`}
        />
        <StatCard
          label={s.averagePrice}
          value={`${s.currency} ${stats.averagePrice.toFixed(2)}`}
        />
      </div>

      <YearChart data={stats.byYear} />
    </div>
  );
}
