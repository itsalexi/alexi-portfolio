"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { GlowingEffect } from "./ui/glowing-effect";

export default function TalkItem({ slug, title, event, date }) {
  return (
    <Link href={`/talks/${slug}`}>
      <motion.div
        className="relative rounded-lg cursor-pointer"
        whileHover={{ x: 2 }}
        transition={{ duration: 0.15 }}
      >
        <GlowingEffect
          disabled={false}
          proximity={20}
          spread={50}
          borderWidth={2}
          glow={true}
          inactiveZone={0.01}
        />
        <div className="relative z-10 w-full text-left p-4 rounded-lg hover:bg-white/[0.03] transition-all group overflow-hidden">
          <div className="flex items-start justify-between gap-4">
            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-semibold text-sm md:text-base mb-1 group-hover:text-blue-400 transition-colors">
                {title}
              </h3>
              <div className="flex flex-wrap items-center gap-2 text-xs text-white/60">
                <span className="flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-blue-400" />
                  {event}
                </span>
                <span className="text-white/30">•</span>
                <span>{date}</span>
              </div>
            </div>

            {/* Arrow */}
            <motion.svg
              className="w-5 h-5 text-white/40 group-hover:text-blue-400 flex-shrink-0 mt-1 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </motion.svg>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
