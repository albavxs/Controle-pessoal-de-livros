interface StatCardProps {
  label: string;
  value: string;
}

export function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5">
      <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-1">
        {label}
      </p>
      <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        {value}
      </p>
    </div>
  );
}
