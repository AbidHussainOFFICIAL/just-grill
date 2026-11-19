"use client";

import { useEffect, useState } from "react";
import { getOpenStatus, type OpeningHours, type OpenStatusResult } from "@/lib/hours";

/**
 * The current open or closed status, refreshed every minute. It is `null` on the server and on
 * the first render, so the server HTML and the browser's first paint always match.
 */
export function useOpenStatus(hours: OpeningHours): OpenStatusResult | null {
  const [status, setStatus] = useState<OpenStatusResult | null>(null);

  useEffect(() => {
    const update = () => setStatus(getOpenStatus(hours));
    update();

    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, [hours]);

  return status;
}
