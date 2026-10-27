"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Hero slider state: wrap-around next/prev, auto-advance every `intervalMs`,
 * and a pause/resume pair (used while the arrow buttons are hovered).
 */
export function useHeroSlider(slideCount: number, intervalMs = 7000) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(
    () => setCurrent((pos) => (pos >= slideCount - 1 ? 0 : pos + 1)),
    [slideCount],
  );

  const prev = useCallback(
    () => setCurrent((pos) => (pos <= 0 ? slideCount - 1 : pos - 1)),
    [slideCount],
  );

  const pause = useCallback(() => setIsPaused(true), []);
  const resume = useCallback(() => setIsPaused(false), []);

  useEffect(() => {
    if (isPaused) return;

    const id = window.setInterval(next, intervalMs);
    return () => window.clearInterval(id);
  }, [isPaused, next, intervalMs]);

  return { current, next, prev, pause, resume };
}
