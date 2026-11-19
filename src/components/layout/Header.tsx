"use client";

import clsx from "clsx";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { useHeaderScroll } from "@/hooks/useHeaderScroll";
import { Navbar } from "./Navbar";
import { Topbar } from "./Topbar";

/** From this width the menu is an inline row, so the mobile drawer must be closed. */
const DESKTOP_QUERY = "(min-width: 1200px)";

export function Header() {
  const { isActive, isHidden } = useHeaderScroll();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [hasKeyboardFocus, setHasKeyboardFocus] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const toggleNav = () => setIsNavOpen((open) => !open);
  const closeNav = () => setIsNavOpen(false);

  // The header slides away while scrolling down. It stays put while the menu is open and while
  // a keyboard user has focus inside it, so focus is never hidden behind or above the screen.
  const isCovered = isHidden && !isNavOpen && !hasKeyboardFocus;

  // Lock page scroll while the mobile menu is open (see body.nav-active in globals.css).
  useEffect(() => {
    document.body.classList.toggle("nav-active", isNavOpen);
    return () => document.body.classList.remove("nav-active");
  }, [isNavOpen]);

  // Keyboard support for the open menu: focus moves in, Tab stays inside, Esc closes it,
  // and focus returns to the menu button afterwards.
  useEffect(() => {
    if (!isNavOpen) return;

    const openButton = openButtonRef.current;
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsNavOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const nav = document.getElementById("site-nav");
      if (!nav) return;

      const focusable = nav.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      const active = document.activeElement;

      if (!nav.contains(active) || (event.shiftKey && active === first)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      openButton?.focus();
    };
  }, [isNavOpen]);

  // Widening the window past the breakpoint (rotating a tablet, for example) closes the drawer,
  // so the page is never left scroll-locked behind an invisible menu.
  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY);
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setIsNavOpen(false);
    };

    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      {/* Soft ink gradient behind the transparent header, so it reads on any photo. */}
      <div
        aria-hidden="true"
        className={clsx(
          "header-scrim pointer-events-none fixed inset-x-0 top-0 z-sticky h-44 trans-base print:hidden",
          isActive ? "opacity-0" : "opacity-100",
        )}
      />

      <Topbar hidden={isActive} />

      <header
        onFocus={(event) => {
          // Only keyboard focus counts: clicking a link must not stop the header from hiding.
          if (event.target.matches(":focus-visible")) setHasKeyboardFocus(true);
        }}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setHasKeyboardFocus(false);
        }}
        className={clsx(
          "fixed top-0 left-0 z-sticky w-full border-b trans-fast print:hidden",
          isActive
            ? "border-line-subtle bg-surface-2 py-5"
            : "border-transparent bg-transparent py-10 sm:top-12",
          isCovered && "-translate-y-full delay-250",
        )}
      >
        <div className="container-x flex items-center justify-between gap-2 px-4 sm:px-5 xl:max-w-none">
          <a href="#">
            <Image
              src="/images/logo.svg"
              width={160}
              height={50}
              alt="Grilli - Home"
              className="h-auto w-32 sm:w-40"
              priority
            />
          </a>

          <Navbar
            isOpen={isNavOpen}
            onClose={toggleNav}
            onNavigate={closeNav}
            closeButtonRef={closeButtonRef}
          />

          {/* Primary action: always reachable. Phones get a compact "Reserve" next to the menu button. */}
          <div className="ml-auto flex items-center gap-2 xl:ml-0">
            <Button href="#reservation" variant="secondary" className="hidden sm:block">
              Find A Table
            </Button>

            <Button href="#reservation" variant="secondary" className="btn-compact sm:hidden">
              Reserve
            </Button>

            {/* 44 x 48 touch target. The lines only animate on hover and focus. */}
            <button
              ref={openButtonRef}
              type="button"
              className="group/burger flex h-12 w-11 flex-col items-start justify-center pl-3 xl:hidden"
              aria-label="open menu"
              aria-expanded={isNavOpen}
              aria-controls="site-nav"
              onClick={toggleNav}
            >
              <span className="my-1 h-0.5 w-8 origin-left bg-fg-strong group-hover/burger:animate-menu-btn-1 group-focus-visible/burger:animate-menu-btn-1" />
              <span className="my-1 h-0.5 w-8 origin-left bg-fg-strong group-hover/burger:animate-menu-btn-2 group-focus-visible/burger:animate-menu-btn-2" />
              <span className="my-1 h-0.5 w-8 origin-left bg-fg-strong group-hover/burger:animate-menu-btn-3 group-focus-visible/burger:animate-menu-btn-3" />
            </button>
          </div>

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
