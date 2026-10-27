"use client";

import { useEffect, useRef } from "react";

/**
 * Moves the element opposite to the mouse, by up to ±5px × `speed`.
 * Returns a ref to attach to the element. Disabled for users who prefer
 * reduced motion.
 */
export function useParallax<T extends HTMLElement>(speed = 1) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const onMouseMove = (event: MouseEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = -((event.clientX / window.innerWidth) * 10 - 5) * speed;
        const y = -((event.clientY / window.innerHeight) * 10 - 5) * speed;
        element.style.transform = `translate3d(${x}px, ${y}px, 0px)`;
      });
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(frame);
    };
  }, [speed]);

  return ref;
}
