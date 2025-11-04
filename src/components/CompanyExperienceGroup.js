"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GlowingEffect } from "./ui/glowing-effect";

export default function CompanyExperienceGroup({ company, roles, badge }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      onClick={() => setIsExpanded(!isExpanded)}
      className="group relative rounded-lg cursor-pointer"
      whileHover={{ x: 2 }}
      transition={{ duration: 0.15 }}
    >
      <GlowingEffect
        disabled={false}
        proximity={80}
        spread={50}
        borderWidth={2}
        glow={true}
        inactiveZone={0.01}
      />
      <motion.div
        layout="position"
        className="relative z-10 p-4 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition-all overflow-hidden"
      >
        {/* Company header */}
        <div className="flex items-center gap-2 mb-2">
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide ${badge.className}`}
          >
            {badge.label}
          </span>
          <h4 className="text-white font-semibold text-sm md:text-base">
            {company}
          </h4>
        </div>

        {/* Show first role summary when collapsed */}
        {!isExpanded && roles.length > 0 && (
          <div>
            <p className="text-white/70 text-xs font-medium mb-1">
              {roles[0].title} • {roles[0].duration}
            </p>
            <p className="text-white/60 text-xs leading-relaxed">
              {roles[0].summary}
            </p>
            {roles.length > 1 && (
              <p className="text-white/40 text-[10px] mt-2 uppercase tracking-wider">
                +{roles.length - 1} more {roles.length === 2 ? "role" : "roles"}
              </p>
            )}
          </div>
        )}

        {/* Expanded view - all roles */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="mt-3 space-y-4">
                {roles.map((role, index) => (
                  <div
                    key={index}
                    className={
                      index > 0 ? "pt-4 border-t border-white/[0.08]" : ""
                    }
                  >
                    <p className="text-white/70 text-xs font-medium mb-1">
                      {role.title} • {role.duration}
                    </p>
                    <p className="text-white/60 text-xs leading-relaxed mb-2">
                      {role.summary}
                    </p>
                    {role.details && (
                      <ul className="space-y-2 mt-2">
                        {role.details.map((detail, detailIndex) => (
                          <li
                            key={detailIndex}
                            className="flex gap-2 text-white/50 text-xs leading-relaxed"
                          >
                            <span className="text-white/30 mt-0.5 flex-shrink-0">
                              •
                            </span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-1.5 mt-3 text-[10px] text-white/30 group-hover:text-white/50 transition-colors">
          <span className="uppercase tracking-wider font-medium">
            {isExpanded ? "Less" : "More"}
          </span>
          <motion.svg
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M19 9l-7 7-7-7"
            />
          </motion.svg>
        </div>
      </motion.div>
    </motion.div>
  );
}
