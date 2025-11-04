import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import sharp from "sharp";

export async function POST(request) {
  // Only allow in development
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available" }, { status: 403 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const project = formData.get("project");
    const isFeatured = formData.get("featured") === "true";

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Create upload directory
    const uploadDir = path.join(process.cwd(), "public/images/projects");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Generate filename
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const timestamp = Date.now();
    const baseName = file.name.replace(/\.[^/.]+$/, "").replace(/\s+/g, "-").toLowerCase();
    const filename = isFeatured 
      ? `${project}-featured.webp`
      : `${project}-${timestamp}.webp`;
    const filepath = path.join(uploadDir, filename);

    // Convert to WebP and optimize
    await sharp(buffer)
      .webp({ quality: 85 })
      .resize(1920, 1080, { 
        fit: 'inside',
        withoutEnlargement: true 
      })
      .toFile(filepath);

    // Return URL
    const url = `/images/projects/${filename}`;
    return NextResponse.json({ url, filename });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
