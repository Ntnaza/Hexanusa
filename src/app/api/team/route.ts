import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const team = await prisma.teammember.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(team);
}
