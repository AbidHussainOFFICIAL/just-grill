"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Same behaviour as the original script:
 * - past 50px of scroll the header gets its solid "active" background
 * - while active, scrolling down hides it and scrolling up shows it again
 */
export function useHeaderScroll(threshold = 50) {
  const [isActive, setIsActive] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollPos = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY >= threshold) {
        setIsActive(true);
        setIsHidden(lastScrollPos.current < window.scrollY);
        lastScrollPos.current = window.scrollY;
      } else {
        setIsActive(false);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return { isActive, isHidden };
}
