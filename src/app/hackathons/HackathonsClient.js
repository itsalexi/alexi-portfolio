"use client";

import HackathonCard from "@/components/HackathonCard";

export default function HackathonsClient({ hackathons }) {
  return (
    <div className="flex flex-col gap-10">
      {hackathons.map((h) => (
        <HackathonCard
          key={h.slug}
          slug={h.slug}
          href={`/hackathons/${h.slug}`}
          name={h.title}
          date={h.date}
          event={h.event}
          result={h.result}
          organizer={h.organizer}
          details={h.highlights}
          image={h.image}
          images={h.images}
          imageAlt={h.imageAlt}
        />
      ))}
    </div>
  );
}
