"use client";

import { useEffect, useState } from "react";

/**
 * Returns the id of the section the visitor is currently reading: the one whose
 * top edge has most recently passed `offset` px from the top of the screen.
 * `ids` must be a stable array (define it outside the component).
 */
export function useActiveSection(ids: readonly string[], offset = 120) {
  const [activeId, setActiveId] = useState<string | null>(ids[0] ?? null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      let current = ids[0] ?? null;
      let bestTop = -Infinity;

      for (const id of ids) {
        const element = document.getElementById(id);
        if (!element) continue;

        const top = element.getBoundingClientRect().top - offset;
        if (top <= 0 && top > bestTop) {
          bestTop = top;
          current = id;
        }
      }

      setActiveId(current);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [ids, offset]);

  return activeId;
}
