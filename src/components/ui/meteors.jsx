"use client";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React from "react";

export const Meteors = ({ number, className }) => {
  const meteors = new Array(number || 20).fill(true);
  const prng = (seed) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-full w-full"
    >
      {meteors.map((el, idx) => {
        const meteorCount = number || 20;
        const position = (idx / meteorCount) * 100;

        return (
          <span
            key={"meteor" + idx}
            className={cn(
              "animate-meteor-effect absolute h-0.5 w-0.5 rotate-[45deg] rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10]",
              "before:absolute before:top-1/2 before:h-[1px] before:w-[50px] before:-translate-y-[50%] before:transform before:bg-gradient-to-r before:from-[#64748b] before:to-transparent before:content-['']",
              className
            )}
            style={{
              top: "0",
              left: position + "%",
              animationDelay: (prng(idx + 1) * 5).toFixed(3) + "s",
              animationDuration: 5 + Math.floor(prng(idx + 11) * 5) + "s",
            }}
          ></span>
        );
      })}
    </motion.div>
  );
};
