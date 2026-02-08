import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const projects = await prisma.portfolio.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(projects);
}
