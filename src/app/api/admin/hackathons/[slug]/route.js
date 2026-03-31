import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {
  getHackathonsDirectory,
  normalizeHighlights,
  normalizeGalleryImages,
} from "@/lib/hackathons";

export async function GET(request, { params }) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available" }, { status: 403 });
  }

  const { slug } = await params;
  const dir = getHackathonsDirectory();
  const filePath = path.join(dir, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const highlights = normalizeHighlights(data.highlights);
  const gallery = normalizeGalleryImages(data.images, data.image);

  return NextResponse.json({
    title: data.title || "",
    date: data.date || "",
    event: data.event || "",
    result: data.result || "",
    organizer: data.organizer || "",
    image: data.image || gallery[0] || "",
    imageAlt: data.imageAlt || "",
    images: gallery.join("\n"),
    order: data.order ?? 1,
    highlights: highlights.join("\n"),
    link: data.link || "",
    content: content.trim(),
  });
}

export async function POST(request, { params }) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available" }, { status: 403 });
  }

  const { slug } = await params;
  const body = await request.json();
  const { newSlug } = body;

  const dir = getHackathonsDirectory();
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const highlightsArray = normalizeHighlights(body.highlights);
  const galleryArray = normalizeGalleryImages(body.images, body.image);

  const finalSlug =
    newSlug ||
    (slug === "new"
      ? (body.title || "hackathon")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "")
      : slug);

  const fileContent = matter.stringify(body.content || "", {
    slug: finalSlug,
    title: body.title,
    date: body.date || "",
    event: body.event || "",
    result: body.result || "",
    organizer: body.organizer || "",
    image: galleryArray[0] || body.image || null,
    imageAlt: body.imageAlt || null,
    images: galleryArray.length > 0 ? galleryArray : null,
    order: body.order != null ? Number(body.order) : 1,
    highlights: highlightsArray,
    link: body.link?.trim() || null,
  });

  const newFilePath = path.join(dir, `${finalSlug}.md`);
  const oldFilePath = path.join(dir, `${slug}.md`);

  if (slug !== "new" && slug !== finalSlug && fs.existsSync(oldFilePath)) {
    fs.unlinkSync(oldFilePath);
  }

  fs.writeFileSync(newFilePath, fileContent, "utf8");

  return NextResponse.json({ success: true, slug: finalSlug });
}
