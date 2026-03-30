import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/components/LangProvider";
import { Navbar } from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
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
    <html lang="pt-BR" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <LangProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
        </LangProvider>
      </body>
    </html>
  );
}
