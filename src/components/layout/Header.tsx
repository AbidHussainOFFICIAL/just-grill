"use client";

import clsx from "clsx";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { useHeaderScroll } from "@/hooks/useHeaderScroll";
import { Navbar } from "./Navbar";
import { Topbar } from "./Topbar";

export function Header() {
  const { isActive, isHidden } = useHeaderScroll();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const toggleNav = () => setIsNavOpen((open) => !open);

  // Lock page scroll while the mobile menu is open (see body.nav-active in globals.css).
  useEffect(() => {
    document.body.classList.toggle("nav-active", isNavOpen);
    return () => document.body.classList.remove("nav-active");
  }, [isNavOpen]);

  // Keyboard support: focus moves into the menu, Esc closes it, focus returns afterwards.
  useEffect(() => {
    if (!isNavOpen) return;

    const openButton = openButtonRef.current;
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsNavOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      openButton?.focus();
    };
  }, [isNavOpen]);

  return (
    <>
      <Topbar hidden={isActive} />

      <header
        className={clsx(
          "fixed top-0 left-0 z-4 w-full border-b trans-fast",
          isActive
            ? "border-black-a15 bg-eerie-black-4 py-20"
            : "border-transparent bg-transparent py-40 sm:top-51",
          isHidden && "-translate-y-full delay-250",
        )}
      >
        <div className="container-x flex items-center justify-between gap-8 px-20 xl:max-w-none">
          <a href="#">
            <Image src="/images/logo.svg" width={160} height={50} alt="Grilli - Home" priority />
          </a>

          <Navbar isOpen={isNavOpen} onClose={toggleNav} closeButtonRef={closeButtonRef} />

          <Button
            href="#reservation"
            variant="secondary"
            className="hidden sm:ml-auto sm:block xl:ml-0"
          >
            Find A Table
          </Button>

          <button
            ref={openButtonRef}
            type="button"
            className="p-12 pr-0 xl:hidden"
            aria-label="open menu"
            aria-expanded={isNavOpen}
            onClick={toggleNav}
          >
            <span className="my-4 h-2 w-30 origin-left animate-menu-btn-1 bg-white" />
            <span className="my-4 h-2 w-30 origin-left animate-menu-btn-2 bg-white" />
            <span className="my-4 h-2 w-30 origin-left animate-menu-btn-3 bg-white" />
          </button>

          <div
            aria-hidden="true"
            onClick={toggleNav}
            className={clsx(
              "fixed inset-0 z-1 bg-black-a80 trans-base xl:hidden",
              isNavOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
            )}
          />
        </div>
      </header>
    </>
  );
}
