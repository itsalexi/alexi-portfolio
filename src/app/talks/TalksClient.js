"use client";

import { IconSearch, IconX } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import FilterRail from "@/components/FilterRail";
import TalkCard from "@/components/TalkCard";

const normalize = (value = "") => value.toString().trim().toLowerCase();

export default function TalksClient({ talks: initialTalks = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("all");

  const normalizedSearch = normalize(searchQuery);

  const topicOptions = useMemo(() => {
    const topicSet = new Set();

    initialTalks.forEach((talk) => {
      talk.topics?.forEach((topic) => {
        topicSet.add(topic);
      });
    });

    return [
      { value: "all", label: "All" },
      ...Array.from(topicSet)
        .sort((a, b) => a.localeCompare(b))
        .map((topic) => ({ value: topic, label: topic })),
    ];
  }, [initialTalks]);

  const filteredTalks = useMemo(() => {
    return initialTalks.filter((talk) => {
      const searchable = [
        talk.title,
        talk.event,
        talk.location,
        talk.shortDescription,
        ...(talk.topics || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        normalizedSearch === "" || searchable.includes(normalizedSearch);
      const talkTopics = (talk.topics || []).map(normalize);
      const matchesTopic =
        selectedTopic === "all" ||
        talkTopics.includes(normalize(selectedTopic));

      return matchesSearch && matchesTopic;
    });
  }, [initialTalks, normalizedSearch, selectedTopic]);

  const hasFilters = searchQuery || selectedTopic !== "all";

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedTopic("all");
  };

  return (
    <>
      <div className="mb-8 border-b border-white/[0.08] pb-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <label className="relative min-w-0 flex-1">
            <span className="sr-only">Search talks</span>
            <IconSearch
              className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--portfolio-ink-faint)]"
              stroke={1.8}
            />
            <input
              type="search"
              placeholder="Search talks"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="h-11 w-full bg-transparent pl-7 pr-3 text-sm text-[var(--portfolio-ink)] transition-colors duration-150 ease-out placeholder:text-[var(--portfolio-ink-faint)] focus:outline-none"
            />
          </label>

          <div className="flex min-h-10 items-center gap-3 text-sm text-[var(--portfolio-ink-faint)]">
            <span>{filteredTalks.length} shown</span>
            {hasFilters
              ? <button
                  type="button"
                  onClick={resetFilters}
                  className="tap-scale inline-flex h-9 items-center gap-1.5 rounded-[9px] bg-white/[0.035] px-3 text-xs text-[var(--portfolio-ink-muted)] transition-[background-color,color,scale] duration-150 ease-out hover:bg-white/[0.06] hover:text-[var(--portfolio-ink)]"
                >
                  <IconX className="h-3.5 w-3.5" stroke={1.8} />
                  Reset
                </button>
              : null}
          </div>
        </div>

        <FilterRail
          ariaLabel="Talk topic filters"
          className="mt-4"
          layoutId="talk-active-filter"
          onChange={setSelectedTopic}
          options={topicOptions}
          value={selectedTopic}
        />
      </div>

      {filteredTalks.length > 0
        ? <div className="grid gap-4">
            {filteredTalks.map((talk) => (
              <TalkCard
                key={talk.slug}
                slug={talk.slug}
                title={talk.title}
                event={talk.event}
                date={talk.date}
                location={talk.location}
                topics={talk.topics}
                image={talk.images?.[0]}
              />
            ))}
          </div>
        : <div className="border-y border-white/[0.08] py-12 text-center">
            <p className="mb-2 text-[var(--portfolio-ink-muted)]">
              Nothing matches that filter.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="text-link tap-scale text-sm"
            >
              Clear filters
            </button>
          </div>}
    </>
  );
}
