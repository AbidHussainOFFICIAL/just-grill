import type { EventItem } from "@/types";

const title = "Flavour so good you’ll try to eat with your eyes.";

export const events: EventItem[] = [
  {
    id: 1,
    subtitle: "Food, Flavour",
    title,
    image: "/images/event-1.jpg",
    datetime: "2022-09-15",
    displayDate: "15/09/2022",
  },
  {
    id: 2,
    subtitle: "Healthy Food",
    title,
    image: "/images/event-2.jpg",
    datetime: "2022-09-08",
    displayDate: "08/09/2022",
  },
  {
    id: 3,
    subtitle: "Recipe",
    title,
    image: "/images/event-3.jpg",
    datetime: "2022-09-03",
    displayDate: "03/09/2022",
  },
];
