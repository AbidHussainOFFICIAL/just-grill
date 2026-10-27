import clsx from "clsx";
import Image from "next/image";
import type { Ref } from "react";
import { Icon } from "@/components/ui/Icon";
import { navLinks } from "@/data/nav";
import { siteConfig } from "@/data/site";
import styles from "./Navbar.module.css";

interface NavbarProps {
  isOpen: boolean;
  onClose: () => void;
  closeButtonRef?: Ref<HTMLButtonElement>;
}

/** Slide-out menu on mobile, inline link row from 1200px up. */
export function Navbar({ isOpen, onClose, closeButtonRef }: NavbarProps) {
  const { address, hours, emails, phones } = siteConfig;

  return (
    <nav className={clsx(styles.navbar, isOpen && styles.active)}>
      <button
        ref={closeButtonRef}
        type="button"
        className={styles.closeBtn}
        aria-label="close menu"
        onClick={onClose}
      >
        <Icon name="close-outline" />
      </button>

      <a href="#" className={styles.logo}>
        <Image src="/images/logo.svg" width={160} height={50} alt="Grilli - Home" />
      </a>

      <ul className={styles.navList}>
        {navLinks.map((link, index) => (
          <li key={link.label} className={styles.navItem}>
            {/* The original page highlights "Home" only; it never follows the scroll. */}
            <a
              href={link.href}
              className={clsx("hover-underline", styles.navLink, index === 0 && styles.active)}
            >
              <div className={clsx("separator", styles.linkSeparator)} />
              <span className={styles.linkText}>{link.label}</span>
            </a>
          </li>
        ))}
      </ul>

      <div className={clsx("text-center", styles.panel)}>
        <p className={clsx("headline-1", styles.title)}>Visit Us</p>

        <address className={clsx("body-4", styles.quiet)}>
          {address.lines[0]} <br />
          {address.lines[1]}
        </address>

        <p className={clsx("body-4", styles.quiet, styles.text)}>{hours.navbar}</p>

        <a href={emails.booking.href} className={clsx("body-4", styles.quiet, styles.sidebarLink)}>
          {emails.booking.label}
        </a>

        <div className={clsx("separator", styles.panelSeparator)} />

        <p className="contact-label">Booking Request</p>

        <a href={phones.booking.href} className="body-1 contact-number hover-underline">
          {phones.booking.label}
        </a>
      </div>
    </nav>
  );
}
