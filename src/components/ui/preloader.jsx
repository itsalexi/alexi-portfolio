"use client";

import { useEffect, useState } from "react";
import {
  hasSeenPreloader,
  markPreloaderReady,
  PRELOADER_SEEN_KEY,
} from "../../hooks/usePreloaderReady";
import { SvgLoader } from "./svg-loader";

export function Preloader() {
  const [phase, setPhase] = useState("visible");

  useEffect(() => {
    if (hasSeenPreloader()) {
      document.documentElement.dataset.preloaderSeen = "true";
      markPreloaderReady();
      setPhase("done");
      return;
    }

    document.documentElement.dataset.preloaderReady = "false";
    setPhase("visible");

    const fadeTimer = setTimeout(() => {
      setPhase("fading");
    }, 1900);
    const doneTimer = setTimeout(() => {
      window.sessionStorage.setItem(PRELOADER_SEEN_KEY, "1");
      document.documentElement.dataset.preloaderSeen = "true";
      markPreloaderReady();
      setPhase("done");
    }, 2450);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div className="preloader-overlay" data-phase={phase} aria-hidden="true">
      <SvgLoader size={80} />
    </div>
  );
}
