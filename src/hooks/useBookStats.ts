"use client";

import { useMemo } from "react";
import { Book } from "@/types/book";

export interface BookStats {
  total: number;
  totalInvested: number;
  highestPrice: number;
  averagePrice: number;
  byYear: { ano: number; quantidade: number }[];
}

export function useBookStats(books: Book[]): BookStats {
  return useMemo(() => {
    const total = books.length;
    const totalInvested = books.reduce((acc, b) => acc + b.preco, 0);
    const highestPrice =
      books.length > 0 ? Math.max(...books.map((b) => b.preco)) : 0;
    const averagePrice = total > 0 ? totalInvested / total : 0;

    const yearMap = new Map<number, number>();
    books.forEach((b) => {
      if (typeof b.ano !== "number") return;
      yearMap.set(b.ano, (yearMap.get(b.ano) || 0) + 1);
    });

    const byYear = Array.from(yearMap.entries())
      .map(([ano, quantidade]) => ({ ano, quantidade }))
      .sort((a, b) => a.ano - b.ano);

    return { total, totalInvested, highestPrice, averagePrice, byYear };
  }, [books]);
}
