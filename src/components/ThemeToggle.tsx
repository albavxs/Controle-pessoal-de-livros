"use client";

import { useLang, t } from "@/lib/i18n";
import { useTheme } from "./ThemeProvider";

function SunIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2.5" />
      <path d="M12 19.5V22" />
      <path d="m4.93 4.93 1.77 1.77" />
      <path d="m17.3 17.3 1.77 1.77" />
      <path d="M2 12h2.5" />
      <path d="M19.5 12H22" />
      <path d="m4.93 19.07 1.77-1.77" />
      <path d="m17.3 6.7 1.77-1.77" />
    </svg>
  );
}

function MoonIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}

export function ThemeToggle() {
  const { lang } = useLang();
  const { theme, toggleTheme } = useTheme();
  const s = t(lang);
  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={s.toggleTheme}
      aria-label={s.toggleTheme}
      className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/85 px-3 py-2 text-sm font-medium text-ink shadow-[0_14px_30px_-26px_rgba(36,25,21,0.8)] transition hover:-translate-y-0.5 hover:border-accent/30 hover:text-accent"
    >
      {isLight ? (
        <MoonIcon className="h-4 w-4 text-accent" />
      ) : (
        <SunIcon className="h-4 w-4 text-accent-tertiary" />
      )}
      <span className="text-xs uppercase tracking-[0.22em] text-muted">
        {isLight ? s.themeLight : s.themeDark}
      </span>
    </button>
  );
}
