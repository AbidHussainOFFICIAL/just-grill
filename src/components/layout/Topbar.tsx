import clsx from "clsx";
import { Icon } from "@/components/ui/Icon";
import { siteConfig } from "@/data/site";
import styles from "./Topbar.module.css";

/** Must be rendered as a sibling *before* <Header> (see the :has() rule in the CSS). */
export function Topbar() {
  const { address, hours, phones, emails } = siteConfig;

  return (
    <div className={styles.topbar}>
      <div className="container">
        <address className={styles.item}>
          <div className="icon">
            <Icon name="location-outline" />
          </div>
          <span className="span">{address.inline}</span>
        </address>

        <div className="separator" />

        <div className={clsx(styles.item, styles.item2)}>
          <div className="icon">
            <Icon name="time-outline" />
          </div>
          <span className="span">{hours.topbar}</span>
        </div>

        <a href={phones.topbar.href} className={clsx(styles.item, styles.link)}>
          <div className="icon">
            <Icon name="call-outline" />
          </div>
          <span className="span">{phones.topbar.label}</span>
        </a>

        <div className="separator" />

        <a href={emails.topbar.href} className={clsx(styles.item, styles.link)}>
          <div className="icon">
            <Icon name="mail-outline" />
          </div>
          <span className="span">{emails.topbar.label}</span>
        </a>
      </div>
    </div>
  );
}
