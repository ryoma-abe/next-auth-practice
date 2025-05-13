import { writeFile } from "fs/promises";
import { supabase } from "@/lib/supabase";
import path from "path";

export async function saveImage(file: File): Promise<string | null> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = `${Date.now()}_${file.name}`;
  const uploadDir = path.join(process.cwd(), "public/images");

  try {
    const fillPass = path.join(uploadDir, fileName);
    await writeFile(fillPass, buffer);
    return `/images/${fileName}`;
  } catch (error) {
    console.error("画像保存エラー", error);

    return null;
  }
}
