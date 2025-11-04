import fs from "fs";
import path from "path";
import matter from "gray-matter";
import TalksClient from "./TalksClient";

export const metadata = {
  title: "Talks - Alexi Canamo",
  description:
    "Workshops and talks I've given on technology and web development",
};

// This is a server component - statically generated at build time
export default function TalksPage() {
  const talksDirectory = path.join(process.cwd(), "src/content/talks");

  // Handle case where talks directory doesn't exist (empty state)
  if (!fs.existsSync(talksDirectory)) {
    return (
      <main className="min-h-screen bg-transparent text-white pt-24">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Talks & Workshops
            </h1>
            <p className="text-white/60 text-lg">
              Workshops and talks I've given on technology and web development
            </p>
          </div>
          <div className="bg-white/5 rounded-lg p-12 text-center border border-white/10">
            <p className="text-white/60">No talks yet. Check back soon!</p>
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
    <main className="min-h-screen bg-transparent text-white pt-24">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Talks & Workshops
          </h1>
          <p className="text-white/60 text-lg">
            {talks.length} workshops and talks on technology and web development
          </p>
        </div>

        {talks.length > 0 ? (
          <TalksClient talks={talks} />
        ) : (
          <div className="bg-white/5 rounded-lg p-12 text-center border border-white/10">
            <p className="text-white/60">No talks yet. Check back soon!</p>
          </div>
        )}
      </div>
    </main>
  );
}
