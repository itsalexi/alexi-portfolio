"use client";

import { motion } from "motion/react";

export const GradientBackground = ({ className = "" }) => {
  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            "radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.1) 0%, transparent 60%)",
            "radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.1) 0%, transparent 60%)",
            "radial-gradient(circle at 50% 20%, rgba(168, 85, 247, 0.1) 0%, transparent 60%)",
            "radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.1) 0%, transparent 60%)",
          ],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};
