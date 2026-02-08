"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { writeFile } from "fs/promises";
import { join } from "path";

export async function saveTeamMember(formData: FormData) {
  const id = formData.get("id") ? Number(formData.get("id")) : undefined;
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const bio = formData.get("bio") as string;
  const linkedin = formData.get("linkedin") as string;
  const github = formData.get("github") as string;
  const instagram = formData.get("instagram") as string;
  const file = formData.get("image_file") as File;
  
  let imageUrl = formData.get("image_url") as string;

  // Jika ada file baru yang diupload
  if (file && file.size > 0) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const path = join(process.cwd(), "public/uploads", filename);
    await writeFile(path, buffer);
    imageUrl = `/uploads/${filename}`;
  }

  const data = {
    name,
    role,
    image: imageUrl,
    bio,
    linkedin,
    github,
    instagram,
  };

  if (id) {
    await prisma.teamMember.update({ where: { id }, data });
  } else {
    await prisma.teamMember.create({ data: { ...data, order: 0 } });
  }
  
  revalidatePath("/");
  revalidatePath("/admin/team");
}

export async function deleteTeamMember(id: number) {
  await prisma.teamMember.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/team");
}