import fs from "fs";
import matter from "gray-matter";
import { NextResponse } from "next/server";
import path from "path";
import { getHackathonsDirectory } from "@/lib/hackathons";

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available" }, { status: 403 });
  }

  const dir = getHackathonsDirectory();
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const files = fs.readdirSync(dir);
  const items = files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(".md", "");
      const filePath = path.join(dir, file);
      const { data } = matter(fs.readFileSync(filePath, "utf8"));
      return {
        slug,
        title: data.title || slug,
        order: data.order ?? 999,
      };
    })
    .sort((a, b) => {
      if (a.order !== b.order) return a.order - b.order;
      return a.title.localeCompare(b.title);
    });

  return NextResponse.json(items);
}
