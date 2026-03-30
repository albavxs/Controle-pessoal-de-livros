import type { Metadata } from "next";
import { Geist, Literata } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/components/LangProvider";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const literata = Literata({
  variable: "--font-literata",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Minha Estante",
  description: "Gerenciador pessoal de livros - Personal book manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      data-theme="light"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${geistSans.variable} ${literata.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <ThemeProvider>
          <LangProvider>
            <Navbar />
            <main className="relative flex-1">{children}</main>
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
