import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const slides = await prisma.heroSlide.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(slides);
}
