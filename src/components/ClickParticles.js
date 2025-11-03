"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function ClickParticles() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const handleClick = (e) => {
      const particleCount = 8;
      const newParticles = Array.from({ length: particleCount }).map(
        (_, i) => ({
          id: Math.random(),
          x: e.clientX,
          y: e.clientY,
          angle: Math.random() * 360,
          velocity: 80 + Math.random() * 120,
          color: Math.random() * 60 + 200,
        })
      );

      setParticles((prev) => [...prev, ...newParticles]);

      setTimeout(() => {
        setParticles((prev) => prev.slice(particleCount));
      }, 1500);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      <AnimatePresence>
        {particles.map((particle) => {
          const angleRad = (particle.angle * Math.PI) / 180;
          const vx = Math.cos(angleRad) * particle.velocity;
          const vy = Math.sin(angleRad) * particle.velocity;

          return (
            <motion.div
              key={particle.id}
              className="absolute h-2 w-2 rounded-full"
              style={{
                left: particle.x,
                top: particle.y,
                background: `hsl(${particle.color}, 70%, 60%)`,
              }}
              initial={{
                opacity: 1,
                scale: 1,
              }}
              animate={{
                opacity: 0,
                scale: 0,
                x: vx,
                y: vy,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 1.2,
                ease: "easeOut",
              }}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
}
