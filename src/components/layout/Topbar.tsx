import clsx from "clsx";
import { Icon } from "@/components/ui/Icon";
import { Separator } from "@/components/ui/Separator";
import { siteConfig } from "@/data/site";

interface TopbarProps {
  /** Slides the bar away once the header turns solid. */
  hidden: boolean;
}

// Icons get a thicker stroke here (the original set --ionicon-stroke-width: 60px).
const item = "items-center gap-6 [&_svg]:[--ionicon-stroke-width:60px]";

export function Topbar({ hidden }: TopbarProps) {
  const { address, hours, phones, emails } = siteConfig;

  return (
    <div
      className={clsx(
        "fixed top-0 left-0 z-4 hidden w-full border-b border-white-a20 py-10 trans-fast sm:block",
        hidden && "-translate-y-full",
      )}
    >
      <div className="container-x flex items-center justify-center gap-30 xl:max-w-none">
        <address className={clsx(item, "hidden lg:flex")}>
          <div>
            <Icon name="location-outline" />
          </div>
          <span className="text-label-1">{address.inline}</span>
        </address>

        <Separator className="hidden xl:block" />

        <div className={clsx(item, "hidden lg:mr-auto lg:flex")}>
          <div>
            <Icon name="time-outline" />
          </div>
          <span className="text-label-1">{hours.topbar}</span>
        </div>

        <a
          href={phones.topbar.href}
          className={clsx(item, "flex trans-fast hover:text-gold focus-visible:text-gold")}
        >
          <div>
            <Icon name="call-outline" />
          </div>
          <span className="text-label-1">{phones.topbar.label}</span>
        </a>

        <Separator className="hidden xl:block" />

        <a
          href={emails.topbar.href}
          className={clsx(item, "flex trans-fast hover:text-gold focus-visible:text-gold")}
        >
          <div>
            <Icon name="mail-outline" />
          </div>
          <span className="text-label-1">{emails.topbar.label}</span>
        </a>
      </div>
    </div>
  );
}
