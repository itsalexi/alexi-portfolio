"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export const Lens = ({
  children,
  zoomFactor = 1.5,
  lensSize = 170,
  isStatic = false,
  position = { x: 200, y: 150 },
}) => {
  const [isHovering, setIsHovering] = useState(isStatic);
  const [mousePosition, setMousePosition] = useState(
    isStatic ? position : { x: 100, y: 100 }
  );
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current || isStatic) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePosition({ x, y });
  };

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-lg"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !isStatic && setIsHovering(true)}
      onMouseLeave={() => !isStatic && setIsHovering(false)}
    >
      {children}
      <AnimatePresence>
        {isHovering && (
          <motion.div
            initial={{ opacity: 0, scale: 0.58 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-50 overflow-hidden pointer-events-none"
          >
            <div
              className="absolute rounded-full border-2 border-white/50 shadow-2xl"
              style={{
                width: `${lensSize}px`,
                height: `${lensSize}px`,
                left: `${mousePosition.x}px`,
                top: `${mousePosition.y}px`,
                transform: "translate(-50%, -50%)",
                overflow: "hidden",
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(4px)",
              }}
            >
              <div
                style={{
                  transform: `scale(${zoomFactor}) translate(${
                    (-mousePosition.x * (zoomFactor - 1)) / zoomFactor
                  }px, ${
                    (-mousePosition.y * (zoomFactor - 1)) / zoomFactor
                  }px)`,
                  transformOrigin: "0 0",
                  width: containerRef.current
                    ? `${containerRef.current.offsetWidth}px`
                    : "100%",
                  height: containerRef.current
                    ? `${containerRef.current.offsetHeight}px`
                    : "100%",
                }}
              >
                {children}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const LensContainer = ({ children, className }) => {
  return <div className={cn("relative group", className)}>{children}</div>;
};
