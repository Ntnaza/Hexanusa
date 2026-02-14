import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hexanusa | Inovasi Teknologi Tanpa Batas",
  description: "Solusi pembuatan website dan perangkat lunak profesional untuk bisnis Anda.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [settings, services] = await Promise.all([
    prisma.sitesettings.findUnique({ where: { id: 1 } }),
    prisma.service.findMany({ orderBy: { order: "asc" }, take: 4 })
  ]);

  return (
    <html lang="id">
      <body className={`${inter.className} antialiased`}>
        <SmoothScroll>
          <Header initialSettings={settings} initialServices={services} />
          {children}
          <Footer initialSettings={settings} initialServices={services} />
        </SmoothScroll>
      </body>
    </html>
  );
}
