import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RupiahDetect | Welcome",
  description: "RupiahDetect, mata uang Indonesia, detektor uang, verifikasi mata uang, pemrosesan gambar, pembelajaran mesin, deteksi uang palsu, verifikasi uang online, verifikasi Rupiah",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
