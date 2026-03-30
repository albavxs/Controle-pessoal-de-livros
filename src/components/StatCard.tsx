interface StatCardProps {
  label: string;
  value: string;
  hint?: string;
  tone?: "accent" | "secondary" | "tertiary" | "neutral";
}

const toneStyles = {
  accent:
    "border-accent/18 bg-accent/10 text-accent hover:border-accent/30 hover:bg-accent/16 hover:shadow-[0_24px_48px_-28px_rgba(191,90,54,0.55)]",
  secondary:
    "border-accent-secondary/18 bg-accent-secondary/10 text-accent-secondary hover:border-accent-secondary/30 hover:bg-accent-secondary/16 hover:shadow-[0_24px_48px_-28px_rgba(47,122,109,0.5)]",
  tertiary:
    "border-accent-tertiary/18 bg-accent-tertiary/12 text-accent-tertiary hover:border-accent-tertiary/30 hover:bg-accent-tertiary/20 hover:shadow-[0_24px_48px_-28px_rgba(211,162,77,0.5)]",
  neutral:
    "border-border bg-card text-ink hover:border-accent/18 hover:shadow-[0_24px_48px_-28px_rgba(var(--shadow-rgb),0.5)]",
} as const;

export function StatCard({
  label,
  value,
  hint,
  tone = "neutral",
}: StatCardProps) {
  return (
    <div
      className={`soft-card cursor-default rounded-[1.7rem] p-5 sm:p-6 ${toneStyles[tone]}`}
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
