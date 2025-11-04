"use client";

import { motion } from "motion/react";
import Link from "next/link";

export default function TalkCard({
  slug,
  title,
  event,
  date,
  location,
  description,
  topics,
}) {
  return (
    <Link href={`/talks/${slug}`} className="block">
      <motion.div
        className="group relative p-4 rounded-lg bg-white/3 border border-white/8 hover:border-white/20 hover:bg-white/6 transition-all cursor-pointer"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
      >
        <div className="relative">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h4 className="text-white font-semibold text-sm md:text-base">
              {title}
            </h4>
          </div>
          <p className="text-white/70 text-xs font-medium mb-1">
            {event} • {date}
          </p>
          {location && <p className="text-white/50 text-xs mb-2">{location}</p>}
          <p className="text-white/70 text-xs md:text-sm leading-relaxed mb-3">
            {description}
          </p>
          {topics && topics.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {topics.map((topic, index) => (
                <span
                  key={index}
                  className="px-2 py-0.5 rounded text-[10px] font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20"
                >
                  {topic}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  );
}
