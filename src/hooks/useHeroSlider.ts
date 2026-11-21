"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Time each hero slide stays up (the "hero slide 7s" motion token). The progress line and the
 * slow zoom use the same time, and the progress line is what moves the slider on, so the line
 * and the slide can never disagree.
 */
export const HERO_INTERVAL_MS = 7000;

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/**
 * Hero slider state.
 *
 * - Autoplay runs unless the visitor paused it, a pointer is over the controls, keyboard focus is
 *   inside the hero, or the system asks for reduced motion (then slides only change on request).
 * - `onProgressEnd` is called when the active progress line has finished filling.
 */
export function useHeroSlider(slideCount: number) {
  const [current, setCurrent] = useState(0);
  const [hasAdvanced, setHasAdvanced] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [focusPaused, setFocusPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(REDUCED_MOTION);
    setReducedMotion(query.matches);

    const onChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      setCurrent(((index % slideCount) + slideCount) % slideCount);
      setHasAdvanced(true);
    },
    [slideCount],
  );

  const next = useCallback(() => {
    setCurrent((pos) => (pos + 1) % slideCount);
    setHasAdvanced(true);
  }, [slideCount]);

  const prev = useCallback(() => {
    setCurrent((pos) => (pos - 1 + slideCount) % slideCount);
    setHasAdvanced(true);
  }, [slideCount]);

  const toggleAutoplay = useCallback(() => setUserPaused((paused) => !paused), []);

  const canAutoplay = !reducedMotion;
  const isRunning = canAutoplay && !userPaused && !hoverPaused && !focusPaused;

  const onProgressEnd = useCallback(() => {
    // With reduced motion every animation ends instantly, so never let that move the slider.
    if (window.matchMedia(REDUCED_MOTION).matches) return;
    next();
  }, [next]);

  return {
    current,
    hasAdvanced,
    canAutoplay,
    isRunning,
    userPaused,
    next,
    prev,
    goTo,
    toggleAutoplay,
    setHoverPaused,
    setFocusPaused,
    onProgressEnd,
  };
}
