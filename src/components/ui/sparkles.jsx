"use client";
import React, { useId } from "react";
import { cn } from "@/lib/utils";

export const SparklesCore = ({
  id,
  background = "transparent",
  minSize = 0.4,
  maxSize = 1,
  particleDensity = 100,
  className,
  particleColor = "#FFF",
}) => {
  const actualId = useId();
  const generatedId = id || actualId;

  return (
    <div className={cn("relative", className)}>
      <svg className="h-full w-full" aria-hidden="true">
        <defs>
          <pattern
            id={`pattern-${generatedId}`}
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            {[...Array(particleDensity)].map((_, index) => {
              const size = Math.random() * (maxSize - minSize) + minSize;
              return (
                <circle
                  key={index}
                  cx={Math.random() * 20}
                  cy={Math.random() * 20}
                  r={size}
                  fill={particleColor}
                  className="animate-sparkle"
                  style={{
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${Math.random() * 2 + 2}s`,
                  }}
                />
              );
            })}
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={`url(#pattern-${generatedId})`}
          style={{ background }}
        />
      </svg>
    </div>
  );
};

export const Sparkles = ({ children, className, ...props }) => {
  return (
    <div className={cn("relative inline-block", className)}>
      <div className="absolute inset-0 -z-10">
        <SparklesCore {...props} />
      </div>
      {children}
    </div>
  );
};
