"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import styles from "./Preloader.module.css";

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
    <div className={clsx(styles.preload, isLoaded && styles.loaded)} aria-hidden="true">
      <div className={styles.circle} />
      <p className={styles.text}>Grilli</p>
    </div>
  );
}
