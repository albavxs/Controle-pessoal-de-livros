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
import { ThemeToggle } from "./ThemeToggle";

type NavTone = "accent" | "accent-secondary" | "accent-tertiary";

function getLinkToneClasses(tone: NavTone, active: boolean) {
  if (!active) {
    return "border-transparent text-muted hover:border-border hover:bg-card/85 hover:text-ink";
  }

  if (tone === "accent-secondary") {
    return "border-accent-secondary/20 bg-accent-secondary/12 text-accent-secondary shadow-[0_18px_34px_-26px_rgba(47,122,109,0.9)]";
  }

  if (tone === "accent-tertiary") {
    return "border-accent-tertiary/20 bg-accent-tertiary/16 text-accent-tertiary shadow-[0_18px_34px_-26px_rgba(211,162,77,0.85)]";
  }

  return "border-accent/20 bg-accent/12 text-accent shadow-[0_18px_34px_-26px_rgba(191,90,54,0.95)]";
}

export function Navbar() {
  const { lang } = useLang();
  const s = t(lang);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    {
      href: "/",
      label: s.home,
      icon: <BookIcon className="h-4 w-4" />,
      tone: "accent" as const,
    },
    {
      href: "/incluir",
      label: s.add,
      icon: <PlusIcon className="h-4 w-4" />,
      tone: "accent-secondary" as const,
    },
    {
      href: "/resumo",
      label: s.summary,
      icon: <ChartIcon className="h-4 w-4" />,
      tone: "accent-tertiary" as const,
    },
  ];

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }
  return (
    <nav className="sticky top-0 z-50 border-b border-border/80 bg-surface/78 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-3 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-accent/20 bg-accent/12 text-accent shadow-[0_16px_30px_-24px_rgba(191,90,54,0.85)] transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-[0_20px_36px_-22px_rgba(191,90,54,1)] group-hover:scale-110">
            <BookIcon className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-lg font-semibold text-ink sm:text-xl">
              {s.appName}
            </span>
            <span className="hidden truncate text-xs text-muted sm:block">
              {s.appTagline}
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-[220ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-[3px] hover:scale-[1.04] hover:shadow-[0_16px_32px_-22px_rgba(var(--shadow-rgb),0.5)] active:translate-y-[-1px] active:scale-[0.97] ${getLinkToneClasses(
                link.tone,
                isActive(link.href)
              )}`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
          <div className="ml-2 flex items-center gap-2 pl-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-label={open ? s.closeMenu : s.menu}
          className="inline-flex cursor-pointer items-center justify-center rounded-full border border-border/80 bg-card/85 p-2.5 text-ink shadow-[0_14px_30px_-26px_rgba(36,25,21,0.8)] transition-all duration-[220ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-[3px] hover:scale-[1.04] hover:border-[color-mix(in_srgb,var(--accent)_20%,var(--border))] hover:text-accent hover:shadow-[0_16px_32px_-22px_rgba(var(--shadow-rgb),0.5)] active:translate-y-[-1px] active:scale-[0.97] md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={`overflow-hidden border-t border-border/70 transition-[max-height,opacity] duration-200 md:hidden ${
          open ? "max-h-[24rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="menu-enter mx-4 my-3 space-y-3 rounded-[1.75rem] border border-border/80 bg-card/88 p-4 shadow-[0_24px_52px_-36px_rgba(36,25,21,0.75)] sm:mx-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-medium transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_14px_28px_-18px_rgba(var(--shadow-rgb),0.4)] active:scale-[0.98] ${getLinkToneClasses(
                link.tone,
                isActive(link.href)
              )}`}
            >
              <span className="flex items-center gap-3">
                {link.icon}
                {link.label}
              </span>
              <span className="text-xs uppercase tracking-[0.22em] text-muted">
                {link.href === "/" ? "01" : link.href === "/incluir" ? "02" : "03"}
              </span>
            </Link>
          ))}

          <div className="grid grid-cols-2 gap-2 border-t border-border/70 pt-3">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
