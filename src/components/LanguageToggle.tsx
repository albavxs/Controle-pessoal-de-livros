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
      className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border/80 bg-card/85 px-3 py-2 text-sm font-medium text-ink shadow-[0_14px_30px_-26px_rgba(36,25,21,0.8)] transition-all duration-[220ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-[3px] hover:scale-[1.04] hover:border-[color-mix(in_srgb,var(--accent-secondary)_30%,var(--border))] hover:text-accent-secondary hover:bg-[color-mix(in_srgb,var(--accent-secondary)_10%,transparent)] hover:shadow-[0_18px_34px_-22px_rgba(47,122,109,0.55)] active:translate-y-[-1px] active:scale-[0.97]"
      title={title}
    >
      <GlobeIcon className="h-4 w-4 text-accent-secondary" />
      <span className="text-xs font-medium uppercase tracking-[0.22em] text-muted">
        {label}
      </span>
    </button>
  );
}
