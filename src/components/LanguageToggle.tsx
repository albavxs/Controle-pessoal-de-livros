"use client";

import { t, useLang } from "@/lib/i18n";
import { GlobeIcon } from "./icons/GlobeIcon";

export function LanguageToggle() {
  const { lang, setLang } = useLang();
  const s = t(lang);
  const nextLang = lang === "pt" ? "en" : "pt";
  const title = lang === "pt" ? s.switchToEnglish : s.switchToPortuguese;
  const label = lang === "pt" ? "PT" : "EN";

  return (
    <button
      type="button"
      onClick={() => setLang(nextLang)}
      className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/85 px-3 py-2 text-sm font-medium text-ink shadow-[0_14px_30px_-26px_rgba(36,25,21,0.8)] transition hover:-translate-y-0.5 hover:border-accent-secondary/30 hover:text-accent-secondary"
      title={title}
    >
      <GlobeIcon className="h-4 w-4 text-accent-secondary" />
      <span className="text-xs font-medium uppercase tracking-[0.22em] text-muted">
        {label}
      </span>
    </button>
  );
}
