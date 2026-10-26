import type { IconType } from "react-icons";
import {
  IoCalendarClearOutline,
  IoCallOutline,
  IoChevronBack,
  IoChevronDown,
  IoChevronForward,
  IoChevronUp,
  IoCloseOutline,
  IoLocationOutline,
  IoMailOutline,
  IoPersonOutline,
  IoTimeOutline,
} from "react-icons/io5";

/**
 * Same Ionicons v5 icons the original page loaded from a CDN, now bundled.
 * Stroke thickness is still driven by the --ionicon-stroke-width custom
 * property (see globals.css), so every icon renders as before.
 */
const icons = {
  "calendar-clear-outline": IoCalendarClearOutline,
  "call-outline": IoCallOutline,
  "chevron-back": IoChevronBack,
  "chevron-down": IoChevronDown,
  "chevron-forward": IoChevronForward,
  "chevron-up": IoChevronUp,
  "close-outline": IoCloseOutline,
  "location-outline": IoLocationOutline,
  "mail-outline": IoMailOutline,
  "person-outline": IoPersonOutline,
  "time-outline": IoTimeOutline,
} as const satisfies Record<string, IconType>;

export type IconName = keyof typeof icons;

interface IconProps {
  name: IconName;
  className?: string;
}

export function Icon({ name, className }: IconProps) {
  const Component = icons[name];
  return <Component aria-hidden="true" focusable="false" className={className} />;
}
