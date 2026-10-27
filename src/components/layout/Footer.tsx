import clsx from "clsx";
import Image from "next/image";
import { navLinks, socialLinks } from "@/data/nav";
import { siteConfig } from "@/data/site";
import { NewsletterForm } from "./NewsletterForm";
import styles from "./Footer.module.css";

export function Footer() {
  const { address, emails, phones, hours, credit } = siteConfig;

  return (
    <footer className={clsx("footer section has-bg-image text-center", styles.footer)}>
      <div className="container">
        <div className={clsx("grid-list", styles.top)}>
          <div className={clsx("has-before has-after", styles.brand)}>
            <a href="#" className={styles.logo}>
              <Image src="/images/logo.svg" width={160} height={50} alt="grilli home" />
            </a>

            <address className={clsx("body-4", styles.muted)}>{address.inline}</address>

            <a
              href={emails.booking.href}
              className={clsx("body-4", styles.muted, styles.contactLink)}
            >
              {emails.booking.label}
            </a>

            <a
              href={phones.booking.href}
              className={clsx("body-4", styles.muted, styles.contactLink)}
            >
              Booking Request : {phones.booking.label}
            </a>

            <p className={clsx("body-4", styles.muted)}>{hours.footer}</p>

            <div className={styles.dots}>
              <div className={clsx("separator", styles.dot)} />
              <div className={clsx("separator", styles.dot)} />
              <div className={clsx("separator", styles.dot)} />
            </div>

            <p className="title-1">Get News &amp; Offers</p>

            <p className={clsx("label-1", styles.muted, styles.subscribeText)}>
              Subscribe us &amp; Get <span className={styles.highlight}>25% Off.</span>
            </p>

            <NewsletterForm />
          </div>

          <ul className={styles.list}>
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className={clsx("label-2 hover-underline", styles.link)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <ul className={styles.list}>
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className={clsx("label-2 hover-underline", styles.link)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className={styles.copyright}>
            &copy; {credit.year} {siteConfig.name}. All Rights Reserved | Crafted by{" "}
            <a
              href={credit.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.creditLink}
            >
              {credit.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
