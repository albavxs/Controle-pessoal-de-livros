"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useLang, t } from "@/lib/i18n";

interface YearChartProps {
  data: { ano: number; quantidade: number }[];
}

export function YearChart({ data }: YearChartProps) {
  const { lang } = useLang();
  const s = t(lang);

  if (data.length === 0) return null;

  const chartData = data.map((d) => ({
    ano: String(d.ano),
    quantidade: d.quantidade,
  }));

  return (
    <div className="soft-card section-enter rounded-[2rem] p-5 sm:p-6">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-tertiary">
            {s.summaryHeroEyebrow}
          </p>
          <h3 className="mt-2 font-display text-2xl font-semibold text-ink">
            {s.booksByYear}
          </h3>
        </div>
        <span className="inline-flex self-start rounded-full border border-accent-tertiary/20 bg-accent-tertiary/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-accent-tertiary transition-all duration-200 hover:scale-105 hover:bg-accent-tertiary/20 hover:shadow-[0_10px_22px_-14px_rgba(211,162,77,0.5)]">
          {chartData.length}
        </span>
      </div>
      <div className="h-72 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 8, right: 8, left: -12, bottom: 4 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--color-border)"
              vertical={false}
            />
            <XAxis
              dataKey="ano"
              type="category"
              tick={{ fontSize: 12, fill: "var(--color-muted)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "var(--color-muted)" }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
              width={26}
            />
            <Tooltip
              contentStyle={{
                background: "var(--color-card)",
                border: "1px solid var(--color-border)",
                borderRadius: "18px",
                color: "var(--color-ink)",
                fontSize: "13px",
                boxShadow: "0 22px 45px -32px rgba(36,25,21,0.85)",
              }}
              cursor={{ fill: "rgba(211,162,77,0.12)" }}
            />
            <Bar
              dataKey="quantidade"
              fill="var(--color-accent-tertiary)"
              radius={[10, 10, 0, 0]}
              maxBarSize={52}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
