"use client";

import clsx from "clsx";
import { siteConfig } from "@/data/site";
import { useOpenStatus } from "@/hooks/useOpenStatus";

interface OpenStatusProps {
  className?: string;
  /** Always show "until 10:00 pm". By default the detail only shows from 1200px, where the top bar has room. */
  alwaysShowDetail?: boolean;
}

// Reserves the same width before the browser knows the time, so nothing jumps when it appears.
const placeholder = { isOpen: true, state: "Open now", detail: "until 10:00 pm" };

/**
 * "Open now · until 10:00 pm" or "Closed · opens 8:00 am". The dot is decoration: the words say it.
 */
export function OpenStatus({ className, alwaysShowDetail = false }: OpenStatusProps) {
  const status = useOpenStatus(siteConfig.openingHours);
  const shown = status ?? placeholder;

  return (
    <div
      aria-hidden={status ? undefined : true}
      className={clsx("flex items-center gap-inline-sm", !status && "invisible", className)}
    >
      <span aria-hidden="true" className="hidden h-4 w-px bg-line-subtle lg:block" />
      <span
        aria-hidden="true"
        className={clsx(
          "size-2 rounded-circle",
          shown.isOpen ? "bg-success-solid" : "bg-warning-solid",
        )}
      />
      <span className="t-small whitespace-nowrap">
        {shown.state}
        <span className={alwaysShowDetail ? "" : "hidden xl:inline"}> · {shown.detail}</span>
      </span>
    </div>
  );
}
