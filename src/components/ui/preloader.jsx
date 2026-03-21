"use client";

import { useState, useEffect } from "react";
import { SvgLoader } from "./svg-loader";

export function Preloader() {
  const [phase, setPhase] = useState("visible");

  useEffect(() => {
    if (sessionStorage.getItem("preloader-seen")) {
      setPhase("done");
      return;
    }

    const fadeTimer = setTimeout(() => setPhase("fading"), 2400);
    const doneTimer = setTimeout(() => {
      setPhase("done");
      sessionStorage.setItem("preloader-seen", "1");
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className="preloader-overlay"
      style={{ opacity: phase === "fading" ? 0 : 1 }}
      aria-hidden="true"
    >
      <SvgLoader size={80} />
    </div>
  );
}
