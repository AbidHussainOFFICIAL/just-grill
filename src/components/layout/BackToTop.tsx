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
        "fixed right-5 bottom-5 z-sticky grid size-12 place-items-center rounded-circle bg-gold-400 text-surface-0 shadow-soft trans-fast hover:bg-gold-300 focus-visible:bg-gold-300 active:bg-gold-500 print:hidden",
        isVisible ? "visible opacity-100" : "invisible opacity-0",
      )}
    >
      <Icon name="chevron-up" size={24} />
    </a>
  );
}
