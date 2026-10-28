import Image from "next/image";
import { Separator } from "@/components/ui/Separator";
import { navLinks, socialLinks } from "@/data/nav";
import { siteConfig } from "@/data/site";
import { NewsletterForm } from "./NewsletterForm";

const mutedText = "text-body-4 leading-[1.5em] text-quick-silver";

const contactLink = `my-6 ${mutedText} trans-fast hover:text-gold focus-visible:text-gold`;

const footerLink =
  "hover-underline mx-auto text-label-2 font-bold uppercase tracking-l text-quick-silver trans-fast hover:text-gold focus-visible:text-gold";

export function Footer() {
  const { address, emails, phones, hours, credit } = siteConfig;

  return (
    <footer className="section bg-[url('/images/footer-bg.jpg')] bg-cover bg-center bg-no-repeat text-center">
      <div className="container-x">
        <div className="mb-70 grid gap-40 md:grid-cols-[1fr_1fr] lg:grid-cols-[0.45fr_1fr_0.45fr] lg:items-center">
          <div className="relative bg-smoky-black-1 bg-[url('/images/footer-form-bg.png')] bg-top px-40 py-50 before:absolute before:top-0 before:left-0 before:h-full before:w-15 before:bg-[url('/images/footer-form-pattern.svg')] after:absolute after:top-0 after:right-0 after:h-full after:w-15 after:bg-[url('/images/footer-form-pattern.svg')] md:col-[1/3] lg:order-1 lg:col-auto lg:py-100">
            <div className="sm:mx-auto sm:max-w-[460px]">
              <a href="#" className="mx-auto mb-40 max-w-max">
                <Image src="/images/logo.svg" width={160} height={50} alt="grilli home" />
              </a>

              <address className={mutedText}>{address.inline}</address>

              <a href={emails.booking.href} className={contactLink}>
                {emails.booking.label}
              </a>

              <a href={phones.booking.href} className={contactLink}>
                Booking Request : {phones.booking.label}
              </a>

              <p className={mutedText}>{hours.footer}</p>

              <div className="mt-40 mb-25 flex justify-center gap-2">
                <Separator className="animate-spin-15" />
                <Separator className="animate-spin-15" />
                <Separator className="animate-spin-15" />
              </div>

              <p className="font-forum text-title-1">Get News &amp; Offers</p>

              <p className="mb-30 text-label-1 leading-[1.5em] text-quick-silver">
                Subscribe us &amp; Get <span className="inline text-white">25% Off.</span>
              </p>

              <NewsletterForm />
            </div>
          </div>

          <ul className="grid gap-20">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className={footerLink}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <ul className="grid gap-20 lg:order-2">
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
          <p className="leading-[1.5em] text-quick-silver">
            &copy; {credit.year} {siteConfig.name}. All Rights Reserved | Crafted by{" "}
            <a
              href={credit.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline text-gold underline"
            >
              {credit.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
