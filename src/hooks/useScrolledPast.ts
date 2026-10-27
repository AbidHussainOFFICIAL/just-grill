"use client";

import { useEffect, useState } from "react";

/**
 * True once the page has been scrolled `threshold` px.
 * `initial` is used until the first scroll event (the original back-to-top
 * button starts visible, so BackToTop passes `true`).
 */
export function useScrolledPast(threshold: number, initial = false) {
  const [isPast, setIsPast] = useState(initial);

  useEffect(() => {
    const onScroll = () => setIsPast(window.scrollY >= threshold);

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return isPast;
}
