import type { CSSProperties } from "react";

/** Feeds the `aspect-ratio: var(--width) / var(--height)` of the .img-holder utility. */
export const aspect = (width: number, height: number) =>
  ({ "--width": width, "--height": height }) as CSSProperties;
