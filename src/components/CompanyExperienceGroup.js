"use client";

import { IconChevronDown } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function CompanyExperienceGroup({ company, roles, badge }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const firstRole = roles[0];

  return (
    <motion.article
      layout
      className="border-t border-white/[0.08]"
      transition={{ type: "spring", duration: 0.34, bounce: 0 }}
    >
      <button
        type="button"
        onClick={() => setIsExpanded((value) => !value)}
        className="tap-scale block w-full py-5 text-left transition-[scale,background-color] duration-150 ease-out hover:bg-white/[0.018]"
        aria-expanded={isExpanded}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded-[8px] bg-white/[0.05] px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[var(--portfolio-ink-faint)]">
                {badge.label}
              </span>
              <p className="text-xs text-[var(--portfolio-ink-faint)]">
                {roles.length} roles
              </p>
            </div>
            <h4 className="text-lg font-medium leading-tight tracking-[-0.018em] text-[var(--portfolio-ink)]">
              {company}
            </h4>
            <p className="mt-2 text-sm font-medium text-[var(--portfolio-ink-muted)]">
              {firstRole.title} / {firstRole.duration}
            </p>
            <p className="mt-3 line-clamp-1 max-w-2xl text-sm leading-6 text-[var(--portfolio-ink-muted)]">
              {firstRole.summary}
            </p>
          </div>

          <motion.span
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ type: "spring", duration: 0.3, bounce: 0 }}
            className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-white/[0.035] text-[var(--portfolio-ink-faint)]"
          >
            <IconChevronDown className="h-4 w-4" stroke={1.8} />
          </motion.span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded
          ? <motion.div
              initial={{ opacity: 0, y: -12, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="pb-5"
            >
              <div className="space-y-5 border-t border-white/[0.08] pt-5">
                {roles.map((role) => (
                  <div key={`${role.title}-${role.duration}`}>
                    <p className="text-sm font-medium text-[var(--portfolio-ink)]">
                      {role.title} / {role.duration}
                    </p>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--portfolio-ink-muted)]">
                      {role.summary}
                    </p>
                    {role.details?.length
                      ? <ul className="mt-3 space-y-2">
                          {role.details.map((detail) => (
                            <li
                              key={detail}
                              className="grid grid-cols-[0.75rem_1fr] gap-2 text-sm leading-6 text-[var(--portfolio-ink-muted)]"
                            >
                              <span className="mt-3 h-1 w-1 rounded-[2px] bg-[var(--portfolio-ink-faint)]" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      : null}
                  </div>
                ))}
              </div>
            </motion.div>
          : null}
      </AnimatePresence>
    </motion.article>
  );
}
