import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const companyName = formData.get("companyName") as string;
    const contactEmail = formData.get("contactEmail") as string;
    const contactPhone = formData.get("contactPhone") as string;
    const contactAddress = formData.get("contactAddress") as string;
    const contactMaps = formData.get("contactMaps") as string;
    const socialIg = formData.get("socialIg") as string;
    const socialLi = formData.get("socialLi") as string;
    const socialGh = formData.get("socialGh") as string;

    const logoFile = formData.get("logoFile") as File;
    const iconFile = formData.get("iconFile") as File;

    let siteLogo = undefined;
    let siteIcon = undefined;

    // Handle Landscape Logo
    if (logoFile && logoFile.size > 0) {
      const bytes = await logoFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `logo-${Date.now()}-${logoFile.name.replace(/\s+/g, '-')}`;
      const path = join(process.cwd(), "public/uploads", filename);
      await writeFile(path, buffer);
      siteLogo = `/uploads/${filename}`;
    }

    // Handle Square Icon
    if (iconFile && iconFile.size > 0) {
      const bytes = await iconFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `icon-${Date.now()}-${iconFile.name.replace(/\s+/g, '-')}`;
      const path = join(process.cwd(), "public/uploads", filename);
      await writeFile(path, buffer);
      siteIcon = `/uploads/${filename}`;
    }

    await prisma.siteSettings.update({
      where: { id: 1 },
      data: {
        companyName,
        contactEmail,
        contactPhone,
        contactAddress,
        contactMaps,
        socialIg,
        socialLi,
        socialGh,
        ...(siteLogo && { siteLogo }),
        ...(siteIcon && { siteIcon })
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}