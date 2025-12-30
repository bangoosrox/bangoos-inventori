import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Inventori System | BangOos Solutions",
  description: "Sistem manajemen inventori modern dengan multi-role access control",
  keywords: "inventory management, system inventori, multi-role, bangOos",
  authors: [{ name: "BangOos Solutions" }],
  creator: "BangOos Solutions",
  publisher: "BangOos Solutions",
  openGraph: {
    title: "Inventori System | BangOos Solutions",
    description: "Sistem manajemen inventori modern dengan multi-role access control",
    url: "https://inventori.bangoos.id",
    siteName: "Inventori System",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
