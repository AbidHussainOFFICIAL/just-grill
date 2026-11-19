"use client";

import clsx from "clsx";
import Image from "next/image";
import type { Ref } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Separator } from "@/components/ui/Separator";
import { navLinks } from "@/data/nav";
import { siteConfig } from "@/data/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { OpenStatus } from "./OpenStatus";

interface NavbarProps {
  isOpen: boolean;
  onClose: () => void;
  /** Called when an in-page link is tapped, so the mobile menu can close. */
  onNavigate: () => void;
  closeButtonRef?: Ref<HTMLButtonElement>;
}

// Links that point at a section of this page ("#" alone is a placeholder).
const sectionIds = navLinks
  .filter((link) => link.href.startsWith("#") && link.href.length > 1)
  .map((link) => link.href.slice(1));

/** Slide-out menu on mobile, inline link row from 1200px up. */
export function Navbar({ isOpen, onClose, onNavigate, closeButtonRef }: NavbarProps) {
  const { address, hours, emails, phones } = siteConfig;
  const activeId = useActiveSection(sectionIds);

  return (
    <nav
      id="site-nav"
      aria-label="Primary"
      className={clsx(
        // mobile drawer
        "fixed top-0 bottom-0 -left-[var(--container-drawer)] z-drawer flex w-full max-w-drawer flex-col overflow-y-auto bg-surface-0 px-8 trans-base [&::-webkit-scrollbar-thumb]:bg-line-subtle",
        isOpen ? "visible translate-x-[var(--container-drawer)]" : "invisible",
        // desktop: plain inline row (the drawer styles are switched off)
        "xl:visible xl:static xl:z-auto xl:mr-5 xl:ml-auto xl:block xl:w-auto xl:max-w-none xl:translate-x-0 xl:overflow-visible xl:bg-transparent xl:p-0 xl:transition-none 2xl:mx-auto",
      )}
    >
      {/* The visible circle is 36px with a 16px icon; the tappable area stays 44 x 44. */}
      <button
        ref={closeButtonRef}
        type="button"
        className="mt-4 mb-2 ml-auto grid size-11 shrink-0 place-items-center text-fg-body hover:text-gold-400 focus-visible:text-gold-400 xl:hidden"
        aria-label="close menu"
        onClick={onClose}
      >
        <span className="grid size-9 place-items-center rounded-circle border border-current">
          <Icon name="close" size={16} />
        </span>
      </button>

      <a href="#" onClick={onNavigate} className="mx-auto mb-6 max-w-max xl:hidden">
        <Image src="/images/logo.svg" width={160} height={50} alt="Grilli - Home" />
      </a>

      <ul className="mb-10 border-b border-line-subtle md:mx-8 xl:mx-0 xl:mb-0 xl:flex xl:gap-8 xl:border-b-0">
        {navLinks.map((link) => {
          const isActive = link.href === `#${activeId}`;

          return (
            <li key={link.label} className="border-t border-line-subtle xl:border-t-0">
              <a
                href={link.href}
                onClick={onNavigate}
                aria-current={isActive ? "location" : undefined}
                className={clsx(
                  "group/link hover-underline max-w-none py-4 t-label after:hidden xl:after:block",
                  isActive && "xl:after:[transform:scaleX(1)] xl:after:opacity-100",
                )}
              >
                <span
                  className={clsx(
                    "absolute top-1/2 left-0 size-2 [transform:translateY(-50%)_rotate(45deg)] border border-gold-400 opacity-0 trans-fast group-hover/link:opacity-100 group-focus-visible/link:opacity-100 xl:hidden",
                    isActive && "opacity-100",
                  )}
                />

                <span
                  className={clsx(
                    "trans-fast group-hover/link:translate-x-5 group-hover/link:text-gold-400 group-focus-visible/link:translate-x-5 group-focus-visible/link:text-gold-400 xl:group-hover/link:translate-x-0 xl:group-focus-visible/link:translate-x-0",
                    isActive && "translate-x-5 text-gold-400 xl:translate-x-0",
                  )}
                >
                  {link.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>

      <div className="mb-8 text-center xl:hidden">
        <p className="mb-4 t-heading text-fg-strong">Visit Us</p>

        <address className="text-fg-muted">
          {address.lines[0]} <br />
          {address.lines[1]}
        </address>

        <p className="mt-3 text-fg-muted">{hours.navbar}</p>

        <OpenStatus className="mt-1 mb-3 justify-center" alwaysShowDetail />

        <a
          href={emails.booking.href}
          className="text-fg-muted trans-fast hover:text-gold-400 focus-visible:text-gold-400"
        >
          {emails.booking.label}
        </a>

        <Separator className="mx-auto my-8" />

        <p className="mb-3 t-label">Booking Request</p>

        <a
          href={phones.booking.href}
          className="hover-underline mx-auto t-figure text-gold-400 after:-bottom-inline-xs"
        >
          {phones.booking.label}
        </a>
      </div>

      {/* Pinned to the bottom of the menu, where a thumb reaches. */}
      <div className="sticky bottom-0 mt-auto grid grid-cols-2 gap-3 border-t border-line-subtle bg-surface-0 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] xl:hidden">
        <Button
          href="#reservation"
          variant="secondary"
          className="btn-compact w-full max-w-full"
          onClick={onNavigate}
        >
          Reserve
        </Button>

        <a
          href={phones.booking.href}
          onClick={onNavigate}
          className="flex items-center justify-center gap-inline-sm border-2 border-line-ui px-4 py-3 t-label text-fg-body trans-fast hover:border-gold-400 hover:text-gold-400 focus-visible:border-gold-400 focus-visible:text-gold-400"
        >
          <Icon name="phone" size={16} />
          Call
        </a>
      </div>
    </nav>
  );
}
