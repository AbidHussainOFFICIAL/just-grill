"use client";

import { useEffect, useState } from "react";

/** True once the page has been scrolled `threshold` px (also correct right after a refresh). */
export function useScrolledPast(threshold: number) {
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    const update = () => setIsPast(window.scrollY >= threshold);

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [threshold]);

  return isPast;
}
