import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import Team from "@/components/Team";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export default async function Home() {
  // Visitor Tracking Logic
  try {
    const headerList = await headers();
    const ip = headerList.get("x-forwarded-for") || "127.0.0.1";
    const userAgent = headerList.get("user-agent");

    // Catat kunjungan (sederhana: setiap refresh/akses dicatat)
    // Jika ingin unik per hari, kita bisa tambahkan pengecekan IP hari ini
    await prisma.visitor.create({
      data: { ip, userAgent }
    });
  } catch (e) {
    console.error("Visitor tracking error:", e);
  }

  const [heroSlides, settings] = await Promise.all([
    prisma.heroslide.findMany({ orderBy: { order: "asc" } }),
    prisma.sitesettings.findUnique({ where: { id: 1 } })
  ]);

  return (
    <main>
      <Hero initialSlides={heroSlides} />
      <Services />
      <Process />
      <About />
      <Portfolio />
      <Testimonials />
      <Team />
      <Contact />
      <CTA initialSettings={settings} />
    </main>
  );
}