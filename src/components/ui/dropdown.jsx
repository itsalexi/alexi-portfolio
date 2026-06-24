"use client";

import { IconCheck, IconChevronDown } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export function Dropdown({
  value,
  onChange,
  options,
  placeholder,
  icon: Icon,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="tap-scale flex h-12 w-full items-center justify-between rounded-[12px] bg-white/[0.025] px-3 text-left text-sm text-[var(--portfolio-ink-muted)] shadow-[0_0_0_1px_rgba(255,255,255,0.08)] transition-[background-color,box-shadow,scale] duration-150 ease-out hover:bg-white/[0.04] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.13)]"
        aria-expanded={isOpen}
      >
        <span className="flex min-w-0 items-center gap-2.5">
          {Icon ? (
            <Icon className="h-4 w-4 shrink-0 text-[var(--portfolio-ink-faint)]" />
          ) : null}
          <span className="truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "spring", duration: 0.3, bounce: 0 }}
          className="ml-3 shrink-0 text-[var(--portfolio-ink-faint)]"
        >
          <IconChevronDown className="h-4 w-4" stroke={1.8} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -8, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
            transition={{ duration: 0.16, ease: [0.2, 0, 0, 1] }}
            className="absolute z-50 mt-2 max-h-[18rem] w-full overflow-y-auto rounded-[14px] bg-[var(--portfolio-surface-raised)] p-1.5 shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_18px_42px_rgba(0,0,0,0.28)]"
          >
            {options.map((option) => {
              const selected = value === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`tap-scale flex min-h-10 w-full items-center justify-between rounded-[10px] px-3 text-left text-sm transition-[color,background-color,scale] duration-150 ease-out ${
                    selected
                      ? "bg-white/[0.07] text-[var(--portfolio-ink)]"
                      : "text-[var(--portfolio-ink-muted)] hover:bg-white/[0.045] hover:text-[var(--portfolio-ink)]"
                  }`}
                >
                  <span>{option.label}</span>
                  {selected ? (
                    <IconCheck className="h-4 w-4" stroke={1.8} />
                  ) : null}
                </button>
              );
            })}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
