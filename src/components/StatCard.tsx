interface StatCardProps {
  label: string;
  value: string;
  hint?: string;
  tone?: "accent" | "secondary" | "tertiary" | "neutral";
}

const toneStyles = {
  accent: "border-accent/18 bg-accent/10 text-accent",
  secondary:
    "border-accent-secondary/18 bg-accent-secondary/10 text-accent-secondary",
  tertiary:
    "border-accent-tertiary/18 bg-accent-tertiary/12 text-accent-tertiary",
  neutral: "border-border bg-card text-ink",
} as const;

export function StatCard({
  label,
  value,
  hint,
  tone = "neutral",
}: StatCardProps) {
  return (
    <div
      className={`soft-card rounded-[1.7rem] p-5 sm:p-6 ${toneStyles[tone]}`}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
        {label}
      </p>
      <p className="mt-3 font-display text-3xl font-semibold leading-none text-ink sm:text-[2.2rem]">
        {value}
      </p>
      {hint && <p className="mt-3 text-sm text-muted">{hint}</p>}
    </div>
  );
}
