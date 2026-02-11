import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const aboutTitle = formData.get("aboutTitle") as string;
    const aboutDesc = formData.get("aboutDesc") as string;
    const features = JSON.parse(formData.get("features") as string);
    const imageFile = formData.get("aboutImageFile") as File;

    let imagePath = undefined;

    if (imageFile && typeof imageFile !== "string") {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `about-${Date.now()}-${imageFile.name.replace(/\s/g, "-")}`;
      const uploadPath = path.join(process.cwd(), "public/uploads", filename);
      await writeFile(uploadPath, buffer);
      imagePath = `/uploads/${filename}`;
    }

    // 1. Update SiteSettings
    await prisma.siteSettings.update({
      where: { id: 1 },
      data: {
        aboutTitle,
        aboutDesc,
        ...(imagePath && { aboutImage: imagePath })
      },
    });

    // 2. Sync Features
    await prisma.aboutFeature.deleteMany({});
    await prisma.aboutFeature.createMany({
      data: features.map((f: any, idx: number) => ({
        title: f.title,
        desc: f.desc,
        icon: f.icon || "Zap",
        order: idx
      })),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Gagal update" }, { status: 500 });
  }
}