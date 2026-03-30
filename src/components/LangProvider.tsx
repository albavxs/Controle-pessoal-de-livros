"use client";

import { useState, useEffect, ReactNode } from "react";
import { LangContext, Lang } from "@/lib/i18n";
import { getLang, saveLang } from "@/lib/storage";

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("pt");

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setLangState(getLang());
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  function setLang(l: Lang) {
    setLangState(l);
    saveLang(l);
  }

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}
