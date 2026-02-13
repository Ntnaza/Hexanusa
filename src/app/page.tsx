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

export const dynamic = "force-dynamic";

export default async function Home() {
  const heroSlides = await prisma.heroslide.findMany({
    orderBy: { order: "asc" },
  });

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
      <CTA />
    </main>
  );
}