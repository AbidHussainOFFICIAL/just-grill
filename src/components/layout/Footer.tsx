import Image from "next/image";
import { Separator } from "@/components/ui/Separator";
import { navLinks, socialLinks } from "@/data/nav";
import { siteConfig } from "@/data/site";
import { NewsletterForm } from "./NewsletterForm";

const mutedLink = "text-fg-muted trans-fast hover:text-gold-400 focus-visible:text-gold-400";

const footerLink = `hover-underline t-label mx-auto py-2 [--ls:var(--tracking-link)] ${mutedLink}`;

export function Footer() {
  const { address, emails, phones, hours, credit } = siteConfig;

  return (
    <footer className="section bg-[url('/images/footer-bg.jpg')] bg-cover bg-center bg-no-repeat text-center">
      <div className="container-x">
        <div className="mb-18 grid gap-10 md:grid-cols-[1fr_1fr] lg:grid-cols-[0.45fr_1fr_0.45fr] lg:items-center">
          <div className="relative bg-surface-0 bg-[url('/images/footer-form-bg.png')] bg-top px-10 py-12 before:absolute before:top-0 before:left-0 before:h-full before:w-4 before:bg-[url('/images/footer-form-pattern.svg')] after:absolute after:top-0 after:right-0 after:h-full after:w-4 after:bg-[url('/images/footer-form-pattern.svg')] md:col-[1/3] lg:order-1 lg:col-auto lg:py-24">
            <div className="sm:mx-auto sm:max-w-narrow">
              <a href="#" className="mx-auto mb-10 max-w-max">
                <Image src="/images/logo.svg" width={160} height={50} alt="grilli home" />
              </a>

              <address className="text-fg-muted">{address.inline}</address>

              <a href={emails.booking.href} className={`my-2 ${mutedLink}`}>
                {emails.booking.label}
              </a>

              <a href={phones.booking.href} className={`my-2 ${mutedLink}`}>
                Booking Request : {phones.booking.label}
              </a>

              <p className="text-fg-muted">{hours.footer}</p>

              <div className="mt-10 mb-6 flex justify-center gap-0.5">
                <Separator className="animate-spin-15" />
                <Separator className="animate-spin-15" />
                <Separator className="animate-spin-15" />
              </div>

              <p className="t-card-title text-fg-strong">Get News &amp; Offers</p>

              <p className="mb-8 text-fg-muted">
                Subscribe us &amp; Get <span className="inline text-fg-strong">25% Off.</span>
              </p>

              <NewsletterForm />
            </div>
          </div>

          <ul className="grid gap-5">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className={footerLink}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <ul className="grid gap-5 lg:order-2">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className={footerLink}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-fg-muted">
            &copy; {credit.year} {siteConfig.name}. All Rights Reserved | Crafted by{" "}
            <a href={credit.url} target="_blank" rel="noopener noreferrer" className="link-inline">
              {credit.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
