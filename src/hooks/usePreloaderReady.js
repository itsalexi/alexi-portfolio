"use client";

import { useEffect, useState } from "react";

export const PRELOADER_SEEN_KEY = "preloader-seen";
export const PRELOADER_READY_EVENT = "portfolio-preloader-ready";

export function hasSeenPreloader() {
  if (typeof window === "undefined") return false;

  try {
    return window.sessionStorage.getItem(PRELOADER_SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

export function getPreloaderReady() {
  if (typeof window === "undefined") return false;

  try {
    return (
      document.documentElement.dataset.preloaderReady === "true" ||
      hasSeenPreloader()
    );
  } catch {
    return true;
  }
}

export function markPreloaderReady() {
  document.documentElement.dataset.preloaderReady = "true";
  window.dispatchEvent(new Event(PRELOADER_READY_EVENT));
}

export function usePreloaderReady() {
  const [isReady, setIsReady] = useState(getPreloaderReady);

  useEffect(() => {
    if (getPreloaderReady()) {
      setIsReady(true);
      return;
    }

    const handleReady = () => setIsReady(true);
    window.addEventListener(PRELOADER_READY_EVENT, handleReady, { once: true });

    return () => {
      window.removeEventListener(PRELOADER_READY_EVENT, handleReady);
    };
  }, []);

  return isReady;
}
