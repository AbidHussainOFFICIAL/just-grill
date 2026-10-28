"use client";

import clsx from "clsx";
import { Icon } from "@/components/ui/Icon";
import { useScrolledPast } from "@/hooks/useScrolledPast";

export function BackToTop() {
  // Appears once the page is scrolled 50px.
  const isVisible = useScrolledPast(50);

  return (
    <a
      href="#top"
      aria-label="back to top"
      className={clsx(
        "fixed right-20 bottom-20 z-4 grid size-50 place-items-center rounded-circle bg-gold text-[22px] text-smoky-black-1 shadow-soft trans-fast hover:bg-white hover:text-gold focus-visible:bg-white focus-visible:text-gold",
        isVisible ? "visible opacity-100" : "invisible opacity-0",
      )}
    >
      <Icon name="chevron-up" />
    </a>
  );
}
