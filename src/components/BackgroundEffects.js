"use client";

import { DotGrid } from "./ui/dot-grid";
import { GradientBackground } from "./ui/gradient-bg";
import ClickParticles from "./ClickParticles";

export default function BackgroundEffects() {
  return (
    <>
      <ClickParticles />

      {/* Background Layers */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <DotGrid />
        <GradientBackground />
      </div>
    </>
  );
}
