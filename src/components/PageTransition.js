"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { usePreloaderReady } from "../hooks/usePreloaderReady";

export default function PageTransition({ children }) {
  const pathname = usePathname();
  const isReady = usePreloaderReady();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
      animate={
        isReady
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y: 10, filter: "blur(4px)" }
      }
      transition={{
        duration: 0.52,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
