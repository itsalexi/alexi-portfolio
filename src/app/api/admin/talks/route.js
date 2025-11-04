import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  // Only allow in development
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available" }, { status: 403 });
  }
  
  const talksDirectory = path.join(process.cwd(), "src/content/talks");
  
  if (!fs.existsSync(talksDirectory)) {
    return NextResponse.json([]);
  }
  
  const files = fs.readdirSync(talksDirectory);
  const talks = files
    .filter(file => file.endsWith(".md"))
    .map(file => file.replace(".md", ""));
  
  return NextResponse.json(talks);
}
