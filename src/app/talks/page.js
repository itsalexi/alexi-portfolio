import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import EditorialHeader from "@/components/EditorialHeader";
import { createMetadata } from "@/lib/seo";
import TalksClient from "./TalksClient";

export const metadata = createMetadata({
  title: "Talks & Workshops",
  description:
    "Talks and workshops by Alexi Canamo on building, Python, student tools, and starting before you feel ready.",
  path: "/talks",
  image: "/og?page=talks",
});

function TalksHeader() {
  return (
    <EditorialHeader
      eyebrow="Teaching"
      title="Talks and workshops."
      body="A few sessions I’ve helped run for students learning to build."
    />
  );
}

// This is a server component - statically generated at build time
export default function TalksPage() {
  const talksDirectory = path.join(process.cwd(), "src/content/talks");

  // Handle case where talks directory doesn't exist (empty state)
  if (!fs.existsSync(talksDirectory)) {
    return (
      <main className="min-h-screen pt-20 sm:pt-28">
        <div className="mx-auto max-w-[980px] px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
          <TalksHeader />
          <div className="border-y border-white/[0.08] py-12">
            <p className="text-sm text-[var(--portfolio-ink-muted)]">
              No talks yet.
            </p>
          </div>
        </div>
      </main>
    );
  }

  const files = fs.readdirSync(talksDirectory);

  const talks = files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(talksDirectory, file);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data: frontmatter } = matter(fileContents);

      return {
        slug: file.replace(".md", ""),
        ...frontmatter,
      };
    })
    .sort((a, b) => {
      // Sort by date (newest first)
      if (a.date && b.date) {
        return new Date(b.date) - new Date(a.date);
      }
      return 0;
    });

  return (
    <main className="min-h-screen pt-20 sm:pt-28">
      <div className="mx-auto max-w-[980px] px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
        <TalksHeader />

        {talks.length > 0
          ? <TalksClient talks={talks} />
          : <div className="border-y border-white/[0.08] py-12">
              <p className="text-sm text-[var(--portfolio-ink-muted)]">
                No talks yet.
              </p>
            </div>}
      </div>
    </main>
  );
}
