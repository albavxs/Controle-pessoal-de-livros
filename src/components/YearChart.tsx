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
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5">
      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
        {s.booksByYear}
      </h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" vertical={false} />
            <XAxis
              dataKey="ano"
              type="category"
              tick={{ fontSize: 12, fill: "#71717a" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#71717a" }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
              width={30}
            />
            <Tooltip
              contentStyle={{
                background: "#18181b",
                border: "none",
                borderRadius: "8px",
                color: "#fafafa",
                fontSize: "13px",
              }}
              cursor={{ fill: "rgba(0,0,0,0.04)" }}
            />
            <Bar
              dataKey="quantidade"
              fill="#3f3f46"
              radius={[4, 4, 0, 0]}
              maxBarSize={56}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
