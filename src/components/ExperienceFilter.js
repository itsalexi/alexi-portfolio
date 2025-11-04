"use client";

import { motion } from "motion/react";

export default function ExperienceFilter({ activeFilter, setActiveFilter }) {
  const filters = [
    { id: "all", label: "All" },
    { id: "work", label: "Work" },
    { id: "leadership", label: "Leadership" },
    { id: "startup", label: "Startup" },
    { id: "education", label: "Education" },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => setActiveFilter(filter.id)}
          className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeFilter === filter.id
              ? "text-white"
              : "text-white/60 hover:text-white/80"
          }`}
        >
          {activeFilter === filter.id && (
            <motion.div
              layoutId="activeFilter"
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              transition={{ type: "spring", duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{filter.label}</span>
        </button>
      ))}
    </div>
  );
}
