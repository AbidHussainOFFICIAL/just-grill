"use client";

import clsx from "clsx";
import { Icon } from "@/components/ui/Icon";
import { useScrolledPast } from "@/hooks/useScrolledPast";
import styles from "./BackToTop.module.css";

export function BackToTop() {
  // Starts visible like the original page, then follows the 50px scroll threshold.
  const isVisible = useScrolledPast(50, true);

  return (
    <a
      href="#top"
      className={clsx(styles.button, isVisible && styles.active)}
      aria-label="back to top"
    >
      <Icon name="chevron-up" />
    </a>
  );
}
