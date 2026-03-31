import { loadAllHackathons } from "@/lib/hackathons";
import HackathonsClient from "./HackathonsClient";

export const metadata = {
  title: "Hackathons",
  description:
    "Hackathon builds and competition highlights — civic tech, logistics, and weekend shipping with teams.",
  openGraph: {
    title: "Hackathons - Alexi Canamo",
    description:
      "Hackathon projects, placements, and write-ups with photo carousels.",
    images: ["/og-image.png"],
  },
};

export default function HackathonsPage() {
  const hackathons = loadAllHackathons();

  return (
    <main className="min-h-screen bg-transparent text-white pt-24">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Hackathons</h1>
          <p className="text-white/60 text-lg">
            Weekend builds, civic tech, and shipping under pressure with a team
          </p>
        </div>

        {hackathons.length > 0 ? (
          <HackathonsClient hackathons={hackathons} />
        ) : (
          <div className="bg-white/5 rounded-lg p-12 text-center border border-white/10">
            <p className="text-white/60">No hackathons yet. Check back soon!</p>
          </div>
        )}
      </div>
    </main>
  );
}
