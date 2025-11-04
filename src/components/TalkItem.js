"use client";

import Link from "next/link";
import { motion } from "motion/react";

export default function TalkItem({ slug, title, event, date }) {
  return (
    <Link href={`/talks/${slug}`}>
      <motion.div
        className="w-full text-left p-4 rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/[0.03] transition-all group cursor-pointer"
        whileHover={{ x: 2 }}
        transition={{ duration: 0.15 }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-white font-semibold text-sm md:text-base">
                "{title}"
              </h3>
            </div>
            <p className="text-white/60 text-xs md:text-sm">
              by {event} on {date}
            </p>
          </div>
          <motion.svg
            className="w-5 h-5 text-white/40 group-hover:text-white/60 flex-shrink-0 mt-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </motion.svg>
        </div>
      </motion.div>
    </Link>
  );
}
