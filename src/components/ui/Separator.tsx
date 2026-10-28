import clsx from "clsx";

interface SeparatorProps {
  /** Additive utilities only (margins, visibility, animation). */
  className?: string;
}

/**
 * The small gold diamond used between items. It uses the `transform`
 * property (not Tailwind's `rotate-*`) so spinning animations replace the
 * 45deg start instead of adding to it, exactly like the original.
 */
export function Separator({ className }: SeparatorProps) {
  return (
    <div
      aria-hidden="true"
      className={clsx("size-8 [transform:rotate(45deg)] border border-gold", className)}
    />
  );
}
