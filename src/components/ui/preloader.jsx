"use client";

import { useEffect, useRef, useState } from "react";
import {
  markPreloaderReady,
  PRELOADER_SEEN_KEY,
} from "../../hooks/usePreloaderReady";
import { waitForSceneReady } from "../../lib/sceneReadiness";
import styles from "./preloader.module.css";
import { SvgLoader } from "./svg-loader";

// Initial screen slots of the same eight hero fireflies; available before Three loads.
const FIREFLIES = [
  [0, "21.85%", "62.71%", "19.13%", "60.84%", "255 194 77", "255 215 115"],
  [4, "76.30%", "62.94%", "88.87%", "61.04%", "163 240 74", "195 245 113"],
  [8, "55.15%", "60.81%", "60.62%", "59.23%", "255 194 77", "255 215 115"],
  [15, "23.82%", "53.50%", "20.10%", "52.99%", "163 240 74", "195 245 113"],
  [19, "70.09%", "56.99%", "74.00%", "55.96%", "213 215 75", "228 229 114"],
  [24, "24.63%", "81.73%", "10.41%", "77.07%", "171 236 74", "200 243 113"],
  [28, "79.82%", "45.49%", "85.41%", "46.15%", "246 198 76", "249 218 115"],
  [38, "45.97%", "64.51%", "45.92%", "62.38%", "163 240 74", "195 245 113"],
];

async function decodeVisibleImages() {
  const images = Array.from(document.images).filter((image) => {
    const bounds = image.getBoundingClientRect();
    return (
      bounds.width > 0 &&
      bounds.height > 0 &&
      bounds.top < innerHeight &&
      bounds.bottom > 0 &&
      bounds.left < innerWidth &&
      bounds.right > 0
    );
  });
  await Promise.allSettled(images.map((image) => image.decode()));
}

export function Preloader() {
  const [phase, setPhase] = useState("loading");
  const [longWait, setLongWait] = useState(false);
  const revealRef = useRef(() => {});
  const signatureRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const root = document.documentElement;
    const content = document.querySelector("[data-portfolio-content]");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers = new Set();
    let frame;
    let releasing = false;
    const previousOverflow = root.style.overflow;

    const later = (callback, delay) => {
      const timer = setTimeout(() => {
        timers.delete(timer);
        if (!signal.aborted) callback();
      }, delay);
      timers.add(timer);
    };
    const unlock = () => {
      root.style.overflow = previousOverflow;
      if (content) content.inert = false;
      delete root.dataset.preloaderPhase;
    };
    const reveal = () => {
      if (signal.aborted || releasing) return;
      releasing = true;
      setLongWait(false);
      root.dataset.preloaderPhase = "revealing";
      setPhase("revealing");
      markPreloaderReady();
      later(
        () => {
          try {
            sessionStorage.setItem(PRELOADER_SEEN_KEY, "1");
          } catch {}
          unlock();
          setPhase("done");
        },
        reduced ? 160 : 1200,
      );
    };
    revealRef.current = reveal;

    if (location.pathname.startsWith("/admin")) {
      if (content) content.inert = false;
      markPreloaderReady();
      setPhase("done");
      return () => controller.abort();
    }

    root.dataset.preloaderReady = "false";
    root.dataset.preloaderPhase = "loading";
    root.style.overflow = "hidden";
    if (content) content.inert = true;
    later(() => {
      if (!releasing) setLongWait(true);
    }, 10000);

    // Keep the original signature drawing, then reveal only a prepared page.
    frame = requestAnimationFrame(() => {
      const signature = signatureRef.current?.querySelector(".loader-path");
      const drawing = signature?.getAnimations() ?? [];
      // Fallback for client-only mounts. The inline bootstrap normally starts
      // the stroke before hydration; never restart it once running or finished.
      for (const animation of drawing) {
        if (animation.playState === "paused") animation.play();
      }
      const signatureDrawn = Promise.allSettled(
        drawing.map((animation) => animation.finished),
      );
      const assetsReady = Promise.allSettled([
        Promise.resolve(document.fonts?.ready),
        decodeVisibleImages(),
        waitForSceneReady(location.pathname, { signal }),
      ]);
      Promise.all([assetsReady, signatureDrawn]).then(() => {
        if (!signal.aborted) reveal();
      });
    });

    return () => {
      controller.abort();
      cancelAnimationFrame(frame);
      timers.forEach(clearTimeout);
      unlock();
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div className={styles.overlay} data-phase={phase}>
      <div className={styles.veil} aria-hidden="true" />
      <div
        className={styles.ambient}
        data-ambient-entrance="true"
        data-ambient-owner="preloader"
        aria-hidden="true"
      >
        {FIREFLIES.map(([index, x, y, mobileX, mobileY, color, core]) => (
          <span
            key={index}
            className={styles.firefly}
            data-entrance-firefly={index}
            style={{
              "--firefly-x": x,
              "--firefly-y": y,
              "--firefly-mobile-x": mobileX,
              "--firefly-mobile-y": mobileY,
              "--firefly-color": color,
              "--firefly-core": core,
              "--firefly-opacity": 0.2 + (index % 4) * 0.04,
              "--firefly-duration": `${8 + (index % 5)}s`,
              "--firefly-delay": `${-(index % 7)}s`,
            }}
          />
        ))}
      </div>
      <div ref={signatureRef} className={styles.signature} aria-hidden="true">
        <SvgLoader size={80} />
      </div>
      <output className="sr-only" aria-live="polite">
        {phase === "revealing" ? "Page ready." : "Loading the page."}
      </output>
      {longWait && (
        <button
          className={styles.continue}
          type="button"
          onClick={() => revealRef.current()}
        >
          Continue to the site <span aria-hidden="true">↗</span>
        </button>
      )}
    </div>
  );
}
