"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function FilterRail({
  options,
  value,
  onChange,
  ariaLabel,
  layoutId = "filter-rail",
  className = "",
}) {
  const [hoveredValue, setHoveredValue] = useState(null);

  return (
    <div className={cn("relative max-w-full overflow-hidden", className)}>
      <div className="-mx-5 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
        <fieldset
          onMouseLeave={() => setHoveredValue(null)}
          className="inline-flex min-w-max items-center gap-1 rounded-[12px] bg-white/[0.025] p-1 shadow-[0_0_0_1px_rgba(255,255,255,0.07)]"
        >
          <legend className="sr-only">{ariaLabel}</legend>
          {options.map((option) => {
            const active = value === option.value || value === option.id;
            const optionValue = option.value ?? option.id;
            const hovered = hoveredValue === optionValue;

            return (
              <button
                key={optionValue}
                type="button"
                aria-pressed={active}
                onMouseEnter={() => setHoveredValue(optionValue)}
                onClick={() => onChange(optionValue)}
                className={cn(
                  "tap-scale relative isolate flex h-9 shrink-0 items-center overflow-hidden rounded-[9px] px-3 text-sm font-medium transition-[color,scale] duration-150 ease-out",
                  active
                    ? "text-[var(--portfolio-bg)]"
                    : hovered
                      ? "text-[var(--portfolio-ink)]"
                      : "text-[var(--portfolio-ink-faint)]",
                )}
              >
                {hovered && !active
                  ? <motion.span
                      layoutId={`${layoutId}-hover`}
                      className="absolute inset-0 z-0 rounded-[9px] bg-white/[0.07]"
                      transition={{ type: "spring", duration: 0.38, bounce: 0 }}
                    />
                  : null}
                {active
                  ? <motion.span
                      layoutId={layoutId}
                      className="absolute inset-0 z-0 rounded-[9px] bg-[var(--portfolio-ink)]"
                      transition={{ type: "spring", duration: 0.34, bounce: 0 }}
                    />
                  : null}
                <span className="relative z-10 whitespace-nowrap">
                  {option.label}
                </span>
              </button>
            );
          })}
        </fieldset>
      </div>
    </div>
  );
}
