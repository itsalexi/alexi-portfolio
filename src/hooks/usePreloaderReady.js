"use client";

import { useSyncExternalStore } from "react";

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
  return document.documentElement.dataset.preloaderReady === "true";
}

export function markPreloaderReady() {
  document.documentElement.dataset.preloaderReady = "true";
  window.dispatchEvent(new Event(PRELOADER_READY_EVENT));
}

function subscribe(onReady) {
  window.addEventListener(PRELOADER_READY_EVENT, onReady);
  return () => window.removeEventListener(PRELOADER_READY_EVENT, onReady);
}

const getServerSnapshot = () => false;

export function usePreloaderReady() {
  return useSyncExternalStore(subscribe, getPreloaderReady, getServerSnapshot);
}
