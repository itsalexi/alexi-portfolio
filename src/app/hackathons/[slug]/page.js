import fs from "fs";
import { use } from "react";
import { getHackathonBySlug, getHackathonsDirectory } from "@/lib/hackathons";
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
  const ogImage = hackathon.images?.[0] || hackathon.image || "/og-image.png";

  return {
    title: `Hackathon | ${hackathon.title}`,
    description,
    openGraph: {
      title: `Hackathon | ${hackathon.title}`,
      description,
      images: [ogImage],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `Hackathon | ${hackathon.title}`,
      description,
      images: [ogImage],
    },
  };
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
