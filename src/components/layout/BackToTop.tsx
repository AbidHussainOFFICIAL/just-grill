"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { useScrolledPast } from "@/hooks/useScrolledPast";

export function BackToTop() {
  // Appears once the hero is almost scrolled past, so it never sits on top of the hero's
  // "Book A Table" badge. (Before the hero is measured, it falls back to 50px.)
  const [threshold, setThreshold] = useState(50);

  useEffect(() => {
    const measure = () => {
      const hero = document.getElementById("home");
      setThreshold(hero ? Math.max(50, hero.offsetHeight - 120) : 50);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const isVisible = useScrolledPast(threshold);

  return (
    <a
      href="#top"
      aria-label="back to top"
      className={clsx(
        "fixed right-5 bottom-5 z-sticky grid size-12 place-items-center rounded-circle bg-gold-400 text-surface-0 shadow-soft trans-fast hover:bg-gold-300 focus-visible:bg-gold-300 active:bg-gold-500 print:hidden",
        isVisible ? "visible opacity-100" : "invisible opacity-0",
      )}
    >
      <Icon name="chevron-up" size={24} />
    </a>
  );
}
