"use client";

import { useLang } from "@/lib/i18n";
import { GlobeIcon } from "./icons/GlobeIcon";

export function LanguageToggle() {
  const { lang, setLang } = useLang();

  return (
    <button
      onClick={() => setLang(lang === "pt" ? "en" : "pt")}
      className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
      title={lang === "pt" ? "Switch to English" : "Mudar para Portugues"}
    >
      <GlobeIcon className="w-4 h-4" />
      <span className="font-medium uppercase tracking-wide text-xs">
        {lang === "pt" ? "EN" : "PT"}
      </span>
    </button>
  );
}
