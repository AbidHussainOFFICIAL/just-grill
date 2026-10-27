/**
 * Central place for site-wide content. Values are still the template's dummy
 * data; replace them here and every section updates.
 */
export const siteConfig = {
  name: "Grilli",
  /** Public address of the site (set NEXT_PUBLIC_SITE_URL in production). */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  title: "Grilli - Amazing & Delicious Food",
  description: "This is a Restaurant Website made by Abid Hussain",

  address: {
    inline: "Restaurant St, Delicious City, London 9578, UK",
    lines: ["Restaurant St, Delicious City,", "London 9578, UK"] as const,
  },

  phones: {
    topbar: { label: "+1 123 456 7890", href: "tel:+11234567890" },
    booking: { label: "+88-123-123456", href: "tel:+88123123456" },
    story: { label: "+80 (400) 123 4567", href: "tel:+804001234567" },
  },

  emails: {
    topbar: { label: "booking@restaurant.com", href: "mailto:booking@restaurant.com" },
    booking: { label: "booking@grilli.com", href: "mailto:booking@grilli.com" },
  },

  hours: {
    topbar: "Daily : 8.00 am to 10.00 pm",
    navbar: "Open: 9.30 am - 2.30pm",
    footer: "Open : 09:00 am - 01:00 pm",
    lunch: { days: "Monday to Sunday", time: "11.00 am - 2.30pm" },
    dinner: { days: "Monday to Sunday", time: "05.00 pm - 10.00pm" },
  },

  credit: {
    year: 2024,
    name: "Abid Hussain",
    url: "https://github.com/AbidHussainOFFICIAL",
  },
} as const;
