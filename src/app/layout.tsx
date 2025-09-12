import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import "./globals.css";

export const metadata: Metadata = {
  title: "LIONFLY | Fly Your Vision",
  description:
    "LIONFLY - Zboară-ți viziunea și evenimentele dintr-o nouă perspectivă. Zburăm împreună! Cele mai bune prețuri pentru filmări aeriene cu drona. Indiferent de ocazie, suntem aici să surprindem momentele tale speciale.",
  icons: {
    icon: "/favicon-16x16.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
