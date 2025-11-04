"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.2,
        ease: "easeInOut",
      }}
      style={{ willChange: "opacity" }}
    >
      {children}
    </motion.div>
  );
}
