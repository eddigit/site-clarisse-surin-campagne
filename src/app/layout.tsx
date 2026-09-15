import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clarisse Surin — Candidate bâtonnière au Barreau de Paris — 2028",
  description: "Clarisse Surin, candidate bâtonnière au Barreau de Paris, 2028.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body className="antialiased">{children}</body></html>;
}
