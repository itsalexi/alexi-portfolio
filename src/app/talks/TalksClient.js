"use client";

import { useState, useMemo } from "react";
import { Search, Filter } from "lucide-react";
import TalkCard from "@/components/TalkCard";
import { Dropdown } from "@/components/ui/dropdown";

export default function TalksClient({ talks: initialTalks = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("all");

  // Get all unique topics
  const allTopics = useMemo(() => {
    const topicsSet = new Set();
    initialTalks.forEach((talk) => {
      talk.topics?.forEach((topic) => topicsSet.add(topic));
    });
    return Array.from(topicsSet).sort();
  }, [initialTalks]);

  // Format topics for dropdown
  const topicOptions = useMemo(() => {
    return [
      { value: "all", label: "All Topics" },
      ...allTopics.map((topic) => ({ value: topic, label: topic })),
    ];
  }, [allTopics]);

  // Filter talks based on search and topic filter
  const filteredTalks = useMemo(() => {
    return initialTalks.filter((talk) => {
      const matchesSearch =
        searchQuery === "" ||
        talk.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        talk.event?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        talk.shortDescription
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesTopic =
        selectedTopic === "all" || talk.topics?.includes(selectedTopic);

      return matchesSearch && matchesTopic;
    });
  }, [initialTalks, searchQuery, selectedTopic]);

  return (
    <>
      {/* Search and Filter Controls */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            placeholder="Search talks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
          />
        </div>

        {/* Topic Filter */}
        <div className="min-w-[200px]">
          <Dropdown
            value={selectedTopic}
            onChange={setSelectedTopic}
            options={topicOptions}
            placeholder="All Topics"
            icon={Filter}
          />
        </div>
      </div>

      {/* Results Count */}
      {(searchQuery || selectedTopic !== "all") && (
        <div className="mb-6 text-sm text-white/60">
          Showing {filteredTalks.length} of {initialTalks.length} talks
        </div>
      )}

      {/* Talks List */}
      {filteredTalks.length > 0 ? (
        <div className="space-y-3">
          {filteredTalks.map((talk) => (
            <TalkCard
              key={talk.slug}
              slug={talk.slug}
              title={talk.title}
              event={talk.event}
              date={talk.date}
              location={talk.location}
              description={talk.shortDescription}
              topics={talk.topics}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white/5 rounded-lg p-12 text-center border border-white/10">
          <p className="text-white/60 mb-2">No talks found</p>
          <p className="text-white/40 text-sm">
            Try adjusting your search or filter
          </p>
        </div>
      )}
    </>
  );
}
