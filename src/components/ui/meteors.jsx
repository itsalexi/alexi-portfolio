"use client";
import { cn } from "@/lib/utils";
import React from "react";

export const Meteors = ({ number, className }) => {
  const meteors = new Array(number || 20).fill(true);

  // Seeded random function for deterministic values
  const seededRandom = (seed) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  return (
    <>
      {meteors.map((el, idx) => {
        const meteorCount = number || 20;
        // Calculate position to evenly distribute meteors across full viewport width
        const positionPercent =
          Math.round((idx / meteorCount) * 100 * 100) / 100;
        const topPercent = Math.round(seededRandom(idx + 50) * 30 * 100) / 100;
        const delay = Math.round(seededRandom(idx + 1) * -20 * 100) / 100;
        const duration = Math.floor(seededRandom(idx + 11) * 5 + 5);

        return (
          <span
            key={"meteor" + idx}
            className={cn(
              "animate-meteor-effect absolute h-0.5 w-0.5 rotate-[45deg] rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10]",
              "before:absolute before:top-1/2 before:h-[1px] before:w-[50px] before:-translate-y-[50%] before:transform before:bg-gradient-to-r before:from-[#64748b] before:to-transparent before:content-['']",
              className
            )}
            style={{
              top: topPercent + "%",
              left: positionPercent + "%",
              animationDelay: delay + "s",
              animationDuration: duration + "s",
            }}
          ></span>
        );
      })}
    </>
  );
};
