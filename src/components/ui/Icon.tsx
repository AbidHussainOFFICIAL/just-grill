import {
  Armchair,
  ArrowRight,
  Calendar,
  Check,
  ChefHat,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CircleX,
  Clock,
  Coffee,
  Info,
  Mail,
  MapPin,
  Menu,
  PartyPopper,
  Pause,
  Phone,
  Play,
  Salad,
  TriangleAlert,
  User,
  Utensils,
  Wine,
  X,
  type LucideIcon,
} from "lucide-react";

/**
 * One library (Lucide), one style: outline, round caps, 24px grid.
 * Sizes come from the icon scale (16, 20, 24, 32, 48, 64). The rendered stroke is
 * 1.5px up to 24px and 2px from 32px, whatever the size, so every icon looks alike.
 * Colour is always currentColor: icons follow the text colour and state.
 */
const icons = {
  // interface
  "map-pin": MapPin,
  clock: Clock,
  phone: Phone,
  mail: Mail,
  user: User,
  calendar: Calendar,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  "chevron-up": ChevronUp,
  "chevron-down": ChevronDown,
  close: X,
  menu: Menu,
  pause: Pause,
  play: Play,
  "arrow-right": ArrowRight,
  // status
  check: Check,
  alert: TriangleAlert,
  error: CircleX,
  info: Info,
  // category
  salad: Salad,
  armchair: Armchair,
  "chef-hat": ChefHat,
  "party-popper": PartyPopper,
  coffee: Coffee,
  utensils: Utensils,
  wine: Wine,
} as const satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;
export type IconSize = 16 | 20 | 24 | 32 | 48 | 64;

interface IconProps {
  name: IconName;
  size?: IconSize;
  className?: string;
}

/** Decorative icon: hidden from screen readers. Controls that contain it carry their own label. */
export function Icon({ name, size = 24, className }: IconProps) {
  const Component = icons[name];

  return (
    <Component
      size={size}
      strokeWidth={size >= 32 ? 2 : 1.5}
      aria-hidden="true"
      focusable="false"
      className={className}
    />
  );
}
