import clsx from "clsx";
import Image from "next/image";
import type { Ref } from "react";
import { Icon } from "@/components/ui/Icon";
import { Separator } from "@/components/ui/Separator";
import { navLinks } from "@/data/nav";
import { siteConfig } from "@/data/site";

interface NavbarProps {
  isOpen: boolean;
  onClose: () => void;
  closeButtonRef?: Ref<HTMLButtonElement>;
}

const quietText = "text-body-4 text-quick-silver";

/** Slide-out menu on mobile, inline link row from 1200px up. */
export function Navbar({ isOpen, onClose, closeButtonRef }: NavbarProps) {
  const { address, hours, emails, phones } = siteConfig;

  return (
    <nav
      className={clsx(
        // mobile drawer
        "fixed top-0 bottom-0 -left-360 z-2 w-full max-w-360 overflow-y-auto bg-smoky-black-1 px-30 pb-50 trans-base [&::-webkit-scrollbar-thumb]:bg-white-a10",
        isOpen ? "visible translate-x-360" : "invisible",
        // desktop: plain inline row (the drawer styles are switched off)
        "xl:visible xl:static xl:z-auto xl:mr-20 xl:ml-auto xl:w-auto xl:max-w-none xl:translate-x-0 xl:overflow-visible xl:bg-transparent xl:p-0 xl:transition-none 2xl:mx-auto",
      )}
    >
      <button
        ref={closeButtonRef}
        type="button"
        className="mt-30 mb-20 ml-auto rounded-circle border border-current p-4 text-white hover:text-gold focus-visible:text-gold xl:hidden [&_svg]:[--ionicon-stroke-width:40px]"
        aria-label="close menu"
        onClick={onClose}
      >
        <Icon name="close-outline" />
      </button>

      <a href="#" className="mx-auto mb-60 max-w-max xl:hidden">
        <Image src="/images/logo.svg" width={160} height={50} alt="Grilli - Home" />
      </a>

      <ul className="mb-100 border-b border-white-a20 md:mx-30 xl:mx-0 xl:mb-0 xl:flex xl:gap-30 xl:border-b-0">
        {navLinks.map((link, index) => {
          const isActive = index === 0; // the original page highlights "Home" only

          return (
            <li key={link.label} className="border-t border-white-a20 xl:border-t-0">
              <a
                href={link.href}
                className={clsx(
                  "group/link hover-underline max-w-none py-10 text-label-2 uppercase after:hidden xl:font-bold xl:tracking-s xl:after:block",
                  isActive && "xl:after:[transform:scaleX(1)] xl:after:opacity-100",
                )}
              >
                <span
                  className={clsx(
                    "absolute top-1/2 left-0 size-8 [transform:translateY(-50%)_rotate(45deg)] border border-gold opacity-0 trans-fast group-hover/link:opacity-100 group-focus-visible/link:opacity-100 xl:hidden",
                    isActive && "opacity-100",
                  )}
                />

                <span
                  className={clsx(
                    "trans-fast group-hover/link:translate-x-20 group-hover/link:text-gold group-focus-visible/link:translate-x-20 group-focus-visible/link:text-gold xl:group-hover/link:translate-x-0 xl:group-focus-visible/link:translate-x-0",
                    isActive && "translate-x-20 text-gold xl:translate-x-0",
                  )}
                >
                  {link.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>

      <div className="text-center xl:hidden">
        <p className="mb-15 font-forum text-headline-1">Visit Us</p>

        <address className={quietText}>
          {address.lines[0]} <br />
          {address.lines[1]}
        </address>

        <p className={clsx("my-10", quietText)}>{hours.navbar}</p>

        <a
          href={emails.booking.href}
          className={clsx(quietText, "trans-fast hover:text-gold focus-visible:text-gold")}
        >
          {emails.booking.label}
        </a>

        <Separator className="mx-auto my-30" />

        <p className="mb-10 font-bold">Booking Request</p>

        <a
          href={phones.booking.href}
          className="hover-underline mx-auto text-body-1 text-gold after:-bottom-5 sm:text-[3rem]"
        >
          {phones.booking.label}
        </a>
      </div>
    </nav>
  );
}
