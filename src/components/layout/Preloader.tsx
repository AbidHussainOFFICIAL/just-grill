"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";

/**
 * Full-screen gold loader. Once the page has loaded it slides away and the
 * `loaded` class on <body> re-enables scrolling (see globals.css).
 */
export function Preloader() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const finish = () => {
      setIsLoaded(true);
      document.body.classList.add("loaded");
    };

    // Hydration can finish after the window "load" event has already fired.
    if (document.readyState === "complete") {
      finish();
      return;
    }

    window.addEventListener("load", finish);
    return () => window.removeEventListener("load", finish);
  }, []);

  return (
    <div
      aria-hidden="true"
      className={clsx(
        "fixed inset-0 z-preloader grid place-content-center justify-items-center bg-gold-400 trans-base *:trans-fast print:hidden",
        isLoaded && "translate-y-full delay-250 *:opacity-0",
      )}
    >
      <div className="mb-12 size-28 animate-spin-1 rounded-circle border-spinner border-fg-strong border-t-surface-0" />
      <p className="loading-text">Grilli</p>
    </div>
  );
}
