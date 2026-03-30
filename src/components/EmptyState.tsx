"use client";

import Link from "next/link";
import { useLang, t } from "@/lib/i18n";
import { BookIcon } from "./icons/BookIcon";
import { PlusIcon } from "./icons/PlusIcon";

export function EmptyState() {
  const { lang } = useLang();
  const s = t(lang);

  return (
    <div className="soft-card section-enter relative overflow-hidden rounded-[2rem] px-6 py-14 text-center sm:px-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(191,90,54,0.16),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(47,122,109,0.14),transparent_30%)]" />
      <div className="relative mx-auto flex max-w-xl flex-col items-center">
        <div className="mb-5 flex h-18 w-18 items-center justify-center rounded-[1.75rem] border border-accent/20 bg-accent/10 transition-all duration-300 hover:scale-110 hover:rotate-3 hover:shadow-[0_18px_36px_-20px_rgba(191,90,54,0.6)]">
          <BookIcon className="h-9 w-9 text-accent" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-accent">
          {s.home}
        </p>
        <h3 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">
          {s.noBooks}
        </h3>
        <p className="mt-3 max-w-md text-sm leading-6 text-muted sm:text-base">
          {s.noBooksDesc}
        </p>
        <Link href="/incluir" className="editorial-button mt-7">
          <PlusIcon className="h-4 w-4" />
          {s.addFirst}
        </Link>
      </div>
    </div>
  );
}
