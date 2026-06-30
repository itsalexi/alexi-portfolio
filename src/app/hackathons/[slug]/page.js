import fs from "node:fs";
import { use } from "react";
import { getHackathonBySlug, getHackathonsDirectory } from "@/lib/hackathons";
import { createMetadata, dateToIso } from "@/lib/seo";
import HackathonContent from "./HackathonContent";

export async function generateStaticParams() {
  const dir = getHackathonsDirectory();
  if (!fs.existsSync(dir)) {
    return [];
  }
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => ({ slug: file.replace(".md", "") }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const hackathon = getHackathonBySlug(slug);
  if (!hackathon) {
    return { title: "Hackathon Not Found" };
  }
  const description =
    hackathon.highlights?.[0] ||
    `${hackathon.title} — ${hackathon.event} (${hackathon.result})`;
  const filePath = `${getHackathonsDirectory()}/${slug}.md`;
  const stats = fs.existsSync(filePath) ? fs.statSync(filePath) : null;

  return createMetadata({
    title: hackathon.title,
    description,
    path: `/hackathons/${slug}`,
    image: `/hackathons/${slug}/opengraph-image`,
    type: "article",
    publishedTime: dateToIso(hackathon.date),
    modifiedTime: stats?.mtime.toISOString(),
  });
}

export default function HackathonDetailPage({ params }) {
  const { slug } = use(params);
  const hackathon = getHackathonBySlug(slug);

  if (!hackathon) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white">Hackathon not found</p>
      </div>
    );
  }

  return <HackathonContent hackathon={hackathon} />;
}
