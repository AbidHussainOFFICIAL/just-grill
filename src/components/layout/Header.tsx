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
  const closeNav = () => setIsNavOpen(false);

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
          "fixed top-0 left-0 z-sticky w-full border-b trans-fast print:hidden",
          isActive
            ? "border-line-subtle bg-surface-2 py-5"
            : "border-transparent bg-transparent py-10 sm:top-12",
          isHidden && "-translate-y-full delay-250",
        )}
      >
        <div className="container-x flex items-center justify-between gap-2 px-5 xl:max-w-none">
          <a href="#">
            <Image src="/images/logo.svg" width={160} height={50} alt="Grilli - Home" priority />
          </a>

          <Navbar
            isOpen={isNavOpen}
            onClose={toggleNav}
            onNavigate={closeNav}
            closeButtonRef={closeButtonRef}
          />

          <Button
            href="#reservation"
            variant="secondary"
            className="hidden sm:ml-auto sm:block xl:ml-0"
          >
            Find A Table
          </Button>

          {/* 44 x 48 touch target */}
          <button
            ref={openButtonRef}
            type="button"
            className="flex h-12 w-11 flex-col items-start justify-center pl-3 xl:hidden"
            aria-label="open menu"
            aria-expanded={isNavOpen}
            onClick={toggleNav}
          >
            <span className="my-1 h-0.5 w-8 origin-left animate-menu-btn-1 bg-fg-strong" />
            <span className="my-1 h-0.5 w-8 origin-left animate-menu-btn-2 bg-fg-strong" />
            <span className="my-1 h-0.5 w-8 origin-left animate-menu-btn-3 bg-fg-strong" />
          </button>

          <div
            aria-hidden="true"
            onClick={toggleNav}
            className={clsx(
              "fixed inset-0 z-overlay bg-scrim-heavy trans-base xl:hidden",
              isNavOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
            )}
          />
        </div>
      </header>
    </>
  );
}
