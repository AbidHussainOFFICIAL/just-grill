"use client";

import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { useHeaderScroll } from "@/hooks/useHeaderScroll";
import { Navbar } from "./Navbar";
import styles from "./Header.module.css";

export function Header() {
  const { isActive, isHidden } = useHeaderScroll();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => setIsNavOpen((open) => !open);

  // Lock page scroll while the mobile menu is open (see body.nav-active in globals.css).
  useEffect(() => {
    document.body.classList.toggle("nav-active", isNavOpen);
    return () => document.body.classList.remove("nav-active");
  }, [isNavOpen]);

  return (
    <header
      className={clsx(styles.header, isActive && styles.active, isHidden && styles.hide)}
      data-scrolled={isActive}
    >
      <div className={clsx("container", styles.inner)}>
        <a href="#">
          <Image src="/images/logo.svg" width={160} height={50} alt="Grilli - Home" priority />
        </a>

        <Navbar isOpen={isNavOpen} onClose={toggleNav} />

        <Button href="#reservation" variant="secondary" className={styles.findTable}>
          Find A Table
        </Button>

        <button
          type="button"
          className={styles.openBtn}
          aria-label="open menu"
          aria-expanded={isNavOpen}
          onClick={toggleNav}
        >
          <span className={clsx(styles.line, styles.line1)} />
          <span className={clsx(styles.line, styles.line2)} />
          <span className={clsx(styles.line, styles.line3)} />
        </button>

        <div
          className={clsx(styles.overlay, isNavOpen && styles.active)}
          onClick={toggleNav}
          aria-hidden="true"
        />
      </div>
    </header>
  );
}
