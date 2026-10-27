export interface NavLink {
  label: string;
  href: string;
}

export interface HeroSlide {
  id: number;
  subtitle: string;
  titleLines: [string, string];
  text: string;
  image: string;
}

export interface ServiceItem {
  id: number;
  title: string;
  image: string;
  href: string;
}

export interface MenuItem {
  id: number;
  title: string;
  price: string;
  description: string;
  image: string;
  badge?: string;
}

export interface EventItem {
  id: number;
  subtitle: string;
  title: string;
  image: string;
  /** ISO date used for the <time> element */
  datetime: string;
  /** Text shown to the visitor */
  displayDate: string;
}

export interface FeatureItem {
  id: number;
  title: string;
  text: string;
  icon: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

/** Result returned by the form server actions. */
export type ActionResult = { ok: true } | { ok: false; message: string };
