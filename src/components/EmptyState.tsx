"use client";

import Link from "next/link";
import { useLang, t } from "@/lib/i18n";
import { BookIcon } from "./icons/BookIcon";
import { PlusIcon } from "./icons/PlusIcon";

export function EmptyState() {
  const { lang } = useLang();
  const s = t(lang);

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
        <BookIcon className="w-8 h-8 text-zinc-400" />
      </div>
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
        {s.noBooks}
      </h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 max-w-xs">
        {s.noBooksDesc}
      </p>
      <Link
        href="/incluir"
        className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-medium rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
      >
        <PlusIcon className="w-4 h-4" />
        {s.addFirst}
      </Link>
    </div>
  );
}
