"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLang, t } from "@/lib/i18n";
import { BookIcon } from "./icons/BookIcon";
import { PlusIcon } from "./icons/PlusIcon";
import { ChartIcon } from "./icons/ChartIcon";
import { MenuIcon } from "./icons/MenuIcon";
import { CloseIcon } from "./icons/CloseIcon";
import { LanguageToggle } from "./LanguageToggle";

export function Navbar() {
  const { lang } = useLang();
  const s = t(lang);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: s.home, icon: <BookIcon className="w-4 h-4" /> },
    { href: "/incluir", label: s.add, icon: <PlusIcon className="w-4 h-4" /> },
    {
      href: "/resumo",
      label: s.summary,
      icon: <ChartIcon className="w-4 h-4" />,
    },
  ];

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-semibold text-lg tracking-tight"
        >
          <BookIcon className="w-6 h-6" />
          <span className="hidden sm:inline">{s.appName}</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800"
              }`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
          <div className="ml-2 pl-2 border-l border-zinc-200 dark:border-zinc-700">
            <LanguageToggle />
          </div>
        </div>

        <button
          className="md:hidden p-2 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          onClick={() => setOpen(!open)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 pb-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
              }`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
          <div className="mt-2 pt-2 border-t border-zinc-200 dark:border-zinc-700">
            <LanguageToggle />
          </div>
        </div>
      )}
    </nav>
  );
}
