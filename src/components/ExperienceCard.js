"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function ExperienceCard({ badge, title, company, summary, details }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      onClick={() => setIsExpanded(!isExpanded)}
      className="group relative p-4 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.06] transition-all cursor-pointer"
      whileHover={{ x: 2 }}
      transition={{ duration: 0.15 }}
    >
      <motion.div layout="position" className="relative">
        <div className="flex items-center gap-2 mb-1.5">
          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide ${badge.className}`}>
            {badge.label}
          </span>
          <h4 className="text-white font-semibold text-sm md:text-base">{title}</h4>
        </div>
        <p className="text-white/50 text-xs mb-1.5">{company}</p>
        <p className="text-white/70 text-xs md:text-sm leading-relaxed">
          {summary}
        </p>
      </motion.div>

      <AnimatePresence>
        {isExpanded && details && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-3 pt-3 border-t border-white/[0.08]">
              <ul className="space-y-2">
                {details.map((detail, index) => (
                  <li key={index} className="flex gap-2 text-white/60 text-xs leading-relaxed">
                    <span className="text-white/30 mt-0.5 flex-shrink-0">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {details && (
        <div className="flex items-center gap-1.5 mt-3 text-[10px] text-white/30 group-hover:text-white/50 transition-colors">
          <span className="uppercase tracking-wider font-medium">{isExpanded ? "Less" : "More"}</span>
          <motion.svg
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </div>
      )}
    </motion.div>
  );
}
