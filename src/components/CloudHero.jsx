"use client";

import { useCallback, useState } from "react";
import CloudWorld from "./CloudWorld";
import Hero from "./Hero";

export default function CloudHero() {
  const [paused, setPaused] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const onReady = useCallback(() => setSceneReady(true), []);

  return (
    <div className="cloud-hero">
      <div className="cloud-hero-stage">
        <CloudWorld paused={paused} onReady={onReady} />
        <div className="cloud-legibility" aria-hidden="true" />
        <div className="cloud-original-introduction">
          <Hero />
        </div>
        <div className="cloud-hero-bottom">
          <a href="#current-work" className="cloud-scroll">
            SCROLL TO EXPLORE <span aria-hidden="true">↓</span>
          </a>
          {sceneReady && (
            <button
              className="cloud-pause"
              aria-pressed={paused}
              type="button"
              onClick={() => setPaused((value) => !value)}
            >
              {paused ? "Resume the sky" : "Pause for a moment"}
              <span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>
            </button>
          )}
        </div>
        <div className="cloud-ground-fade" aria-hidden="true" />
      </div>
    </div>
  );
}
