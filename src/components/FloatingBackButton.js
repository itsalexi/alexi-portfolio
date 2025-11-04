"use client";

import { ArrowLeft } from "lucide-react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FloatingBackButton() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <div className="hidden lg:block fixed top-4 inset-x-0 z-40 w-full pointer-events-none">
      <div className="max-w-7xl mx-auto px-4 flex justify-start">
        <motion.button
          type="button"
          onClick={() => router.back()}
          animate={{
            opacity: visible ? 1 : 0,
            y: visible ? 20 : 0,
            backdropFilter: visible ? "blur(10px)" : "none",
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 50,
          }}
            className="pointer-events-auto flex items-center gap-2 px-4 py-4 rounded-full bg-white/80 dark:bg-neutral-950/80 border border-white/20 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors"
            style={{
              boxShadow: visible
                ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
                : "none",
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back</span>
          </motion.button>
      </div>
    </div>
  );
}
