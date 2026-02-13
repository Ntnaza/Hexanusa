import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const aboutTitle = formData.get("aboutTitle") as string;
    const aboutDesc = formData.get("aboutDesc") as string;
    const features = JSON.parse(formData.get("features") as string);
    const imageFile = formData.get("aboutImageFile") as File;

    let imageUrl = undefined;

    if (imageFile && typeof imageFile !== "string" && imageFile.size > 0) {
      const uploadResult = await uploadToCloudinary(imageFile, "hexanusa/about");
      imageUrl = uploadResult.url;
    }

    // 1. Update SiteSettings
    await prisma.sitesettings.update({
      where: { id: 1 },
      data: {
        aboutTitle,
        aboutDesc,
        ...(imageUrl && { aboutImage: imageUrl })
      },
    });

    // 2. Sync Features
    await prisma.aboutfeature.deleteMany({});
    await prisma.aboutfeature.createMany({
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
