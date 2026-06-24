"use client";

import FilterRail from "./FilterRail";

export default function ExperienceFilter({ activeFilter, setActiveFilter }) {
  const filters = [
    { value: "all", label: "All" },
    { value: "work", label: "Work" },
    { value: "leadership", label: "Leadership" },
    { value: "startup", label: "Startup" },
    { value: "competition", label: "Competition" },
    { value: "education", label: "Education" },
  ];

  return (
    <FilterRail
      ariaLabel="Timeline filters"
      className="mb-8"
      layoutId="timeline-active-filter"
      onChange={setActiveFilter}
      options={filters}
      value={activeFilter}
    />
  );
}
