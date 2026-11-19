import type { ChefItem } from "@/types";

const bio =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry, trained in classic kitchens.";

/**
 * Dummy team. Add a portrait with `image: "/images/chef-1.jpg"` (3:4, about 700 x 934)
 * and the card shows the photo instead of the gold placeholder.
 */
export const chefs: ChefItem[] = [
  { id: 1, name: "Marco Bellini", role: "Executive Chef", bio, signature: "Lobster tortellini" },
  { id: 2, name: "Elena Rossi", role: "Head Pastry Chef", bio, signature: "Saffron panna cotta" },
  { id: 3, name: "Daniel Okafor", role: "Sous Chef", bio, signature: "Charcoal grilled lamb" },
];
