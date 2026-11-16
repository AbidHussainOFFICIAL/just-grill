import clsx from "clsx";
import { Icon } from "@/components/ui/Icon";
import { Separator } from "@/components/ui/Separator";
import { siteConfig } from "@/data/site";

interface TopbarProps {
  /** Slides the bar away once the header turns solid. */
  hidden: boolean;
}

// Address and hours show from 992px; the two links show from 575px.
// The links fill the whole 48px bar, so the touch target is 48px tall; icon-to-label gap is space-inline-sm (8px).
const linkClass =
  "flex h-12 items-center gap-inline-sm trans-fast hover:text-gold-400 focus-visible:text-gold-400";

/** Fixed 48px high: the header sits directly below it (sm:top-12 in Header.tsx). */
export function Topbar({ hidden }: TopbarProps) {
  const { address, hours, phones, emails } = siteConfig;

  return (
    <div
      className={clsx(
        "fixed top-0 left-0 z-sticky hidden h-12 w-full items-center border-b border-line-subtle trans-fast sm:flex print:hidden",
        hidden && "-translate-y-full",
      )}
    >
      <div className="container-x flex w-full items-center justify-center gap-8 xl:max-w-none">
        <address className="hidden items-center gap-inline-sm lg:flex">
          <Icon name="map-pin" size={16} />
          <span className="t-small">{address.inline}</span>
        </address>

        <Separator className="hidden xl:block" />

        <div className="hidden items-center gap-inline-sm lg:mr-auto lg:flex">
          <Icon name="clock" size={16} />
          <span className="t-small">{hours.topbar}</span>
        </div>

        <a href={phones.topbar.href} className={linkClass}>
          <Icon name="phone" size={16} />
          <span className="t-small">{phones.topbar.label}</span>
        </a>

        <Separator className="hidden xl:block" />

        <a href={emails.topbar.href} className={linkClass}>
          <Icon name="mail" size={16} />
          <span className="t-small">{emails.topbar.label}</span>
        </a>
      </div>
    </div>
  );
}
