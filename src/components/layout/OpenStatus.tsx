"use client";

import clsx from "clsx";
import { siteConfig } from "@/data/site";
import { useOpenStatus } from "@/hooks/useOpenStatus";

/**
 * "Open now · until 10:00 pm" or "Closed · opens 8:00 am". The wrapper always renders, so the
 * phone link next to it does not jump when the status appears. The dot is decoration: the words
 * say it.
 */
export function OpenStatus() {
  const status = useOpenStatus(siteConfig.openingHours);

  return (
    <div className="mr-auto flex items-center gap-inline-sm">
      {status && (
        <>
          <span aria-hidden="true" className="hidden h-4 w-px bg-line-subtle lg:block" />
          <span
            aria-hidden="true"
            className={clsx(
              "size-2 rounded-circle",
              status.isOpen ? "bg-success-solid" : "bg-warning-solid",
            )}
          />
          <span className="t-small">{status.label}</span>
        </>
      )}
    </div>
  );
}
