"use client";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const Navbar = ({ children, className }) => {
  const ref = useRef(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      className={cn(
        "sticky inset-x-0 top-20 z-50 w-full px-4 sm:px-6",
        className,
      )}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { visible })
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible
          ? "blur(18px) saturate(150%)"
          : "blur(0px) saturate(100%)",
        backgroundColor: visible
          ? "rgba(14, 14, 12, 0.68)"
          : "rgba(8, 8, 7, 0)",
        boxShadow: visible
          ? "0 0 0 1px rgba(255,255,255,0.12), 0 18px 60px rgba(0,0,0,0.34), inset 0 1px 0 rgba(255,255,255,0.16), inset 0 -1px 0 rgba(255,255,255,0.04)"
          : "0 0 0 0 rgba(255,255,255,0), 0 0 0 rgba(0,0,0,0)",
        maxWidth: visible ? 760 : 940,
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        duration: 0.58,
        bounce: 0,
      }}
      className={cn(
        "relative z-[60] mx-auto hidden h-14 w-full flex-row items-center justify-between self-start rounded-full bg-transparent px-2 lg:flex",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }) => {
  const [hovered, setHovered] = useState(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 lg:flex lg:space-x-2",
        className,
      )}
    >
      {items.map((item, idx) => (
        <a
          onMouseEnter={() => setHovered(idx)}
          onClick={(e) => onItemClick?.(e, item.link)}
          className="relative px-4 py-2 text-neutral-600 dark:text-neutral-300"
          key={item.link}
          href={item.link}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full bg-gray-100 dark:bg-neutral-800"
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible
          ? "blur(18px) saturate(150%)"
          : "blur(0px) saturate(100%)",
        backgroundColor: visible
          ? "rgba(14, 14, 12, 0.68)"
          : "rgba(8, 8, 7, 0)",
        boxShadow: visible
          ? "0 0 0 1px rgba(255,255,255,0.12), 0 18px 60px rgba(0,0,0,0.34), inset 0 1px 0 rgba(255,255,255,0.16)"
          : "0 0 0 0 rgba(255,255,255,0), 0 0 0 rgba(0,0,0,0)",
        width: visible ? "calc(100% - 1.5rem)" : "100%",
        paddingRight: visible ? "12px" : "0px",
        paddingLeft: visible ? "12px" : "0px",
        borderRadius: visible ? "999px" : "2rem",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        duration: 0.58,
        bounce: 0,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-0 py-2 lg:hidden",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({ children, className }) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({ children, className, isOpen }) => {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
          transition={{ duration: 0.18, ease: [0.2, 0, 0, 1] }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-[20px] bg-[rgba(17,17,15,0.98)] px-4 py-6 text-sm shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_18px_50px_rgba(0,0,0,0.34)] backdrop-blur-xl",
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({ isOpen, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="tap-scale flex h-10 min-w-10 items-center justify-center rounded-full text-[var(--portfolio-ink)] transition-[background-color,color,scale] duration-150 ease-out hover:bg-white/[0.05] hover:text-white"
      aria-label="Toggle navigation"
      aria-expanded={isOpen}
    >
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={isOpen ? "close" : "menu"}
          initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
          transition={{ type: "spring", duration: 0.3, bounce: 0 }}
          className="flex h-5 w-5 items-center justify-center"
        >
          {isOpen ? (
            <IconX className="h-5 w-5" stroke={1.8} />
          ) : (
            <IconMenu2 className="h-5 w-5" stroke={1.8} />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}) => {
  const baseStyles =
    "tap-scale relative inline-flex h-9 items-center justify-center rounded-full px-3 text-center text-sm transition-[background-color,color,opacity,scale] duration-150 ease-out";

  const variantStyles = {
    primary:
      "bg-[var(--portfolio-ink)] text-[var(--portfolio-bg)] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] hover:opacity-90",
    secondary:
      "bg-transparent text-[var(--portfolio-ink-muted)] shadow-none hover:bg-white/[0.05] hover:text-[var(--portfolio-ink)]",
    dark: "bg-[var(--portfolio-ink)] font-medium text-[var(--portfolio-bg)] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] hover:opacity-90",
    gradient:
      "bg-[var(--portfolio-ink)] text-[var(--portfolio-bg)] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] hover:opacity-90",
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};
