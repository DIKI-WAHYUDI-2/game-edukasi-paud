import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Game PAUD Literasi Melayu Riau - Anggota Tubuh",
  description: "Game edukatif untuk anak PAUD - Literasi Melayu Riau tentang Anggota Tubuh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`h-full ${nunito.className}`}>
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
