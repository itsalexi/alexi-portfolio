import EditorialHeader from "@/components/EditorialHeader";
import { loadAllHackathons } from "@/lib/hackathons";
import { createMetadata } from "@/lib/seo";
import HackathonsClient from "./HackathonsClient";

export const metadata = createMetadata({
  title: "Hackathons",
  description:
    "Hackathon and competition projects by Alexi Canamo, from logistics marketplaces to offline emergency tools.",
  path: "/hackathons",
});

function HackathonsHeader() {
  return (
    <EditorialHeader
      eyebrow="Competitions"
      title="Hackathon weekends."
      body="Things built with friends, usually on too little sleep."
    />
  );
}

export default function HackathonsPage() {
  const hackathons = loadAllHackathons();

  return (
    <main className="min-h-screen pt-20 sm:pt-28">
      <div className="mx-auto max-w-[980px] px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
        <HackathonsHeader />

        {hackathons.length > 0
          ? <HackathonsClient hackathons={hackathons} />
          : <div className="border-y border-white/[0.08] py-12">
              <p className="text-sm text-[var(--portfolio-ink-muted)]">
                No hackathons yet.
              </p>
            </div>}
      </div>
    </main>
  );
}
